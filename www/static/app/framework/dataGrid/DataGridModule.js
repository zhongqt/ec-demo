define('framework/dataGrid/DataGridModule', [
    'angular',
    'jquery',
    'underscore',
    'config.properties',
    'artTmpl',
    'ngContextMenu',
    'framework/datasource/DataSourceModule',
    'framework/colSettings/ColSettingsModule',
    'framework/clickbox/GillionClickBoxModule',
    'framework/gridlayout/GridLayoutModule',
    'framework/permit/GillionPermitModule',
    'framework/directive/GillionDirectiveModule'
], function (angular, $, _, config, artTmpl) {
    var CONSTANTS = {
        CHECK_ROW_WIDTH: 40,
        SPACE_CELL_WIDTH: 19,
        MIN_CELL_WIDTH: 40,
        REFRESH_ROWS: '$grid-refresh-rows',
        DATA_COLUMN_INSTANCE_KEY: '$column-ins'
    }, defDisableCopyEditing = (function () {
        try {
            return config.controls.dataGrid.disableCopyEditing;
        } catch (e) {
        }
    }()), defKeydownNewRow = (function () {
        try {
            return config.controls.dataGrid.keydownNewRow;
        } catch (e) {
        }
    }());

    angular.module('DataGridModule', ['DataSourceModule', 'ColSettingsModule', 'GillionClickBoxModule', 'ng-context-menu', 'GridLayoutModule', 'GillionPermitModule', 'GillionDirectiveModule'])
        .directive('gDataGrid', function ($window, $document, $parse, $compile, $filter, $q, $dataSourceManager,
                                          ColSettings, Arrays, Functions, gridLayoutService, Permissions, ValidationHolder,
                                          tooltipMessenger, LocalStorages, $timeout, GillionMsg, $rootScope) {
            var GridProto = Grid.prototype,
                ORDER = {
                    ASC: 'asc',
                    DESC: 'desc'
                };

            function Grid(scope, element, attrs, Permissions) {
                var me = this;
                me.scope = scope;
                me.element = element;
                me.attrs = attrs;
                me.width = element.width();
                me.hash = scope.$id;
                me.widthStyleBlock = element.children('style')[0];

                me.cellValueGetterCache = {};
                me.scopeEventCache = {};
                scope.columns = me.columns = [];
                if (attrs.$columns) {
                    scope.$columns = me.columns;
                }
                /**
                 * @type {{String: [Number, Number]}}
                 */
                me.requiredClassNameColSpanRange = {};
                me.actions = {};

                me.tbody = element.find('table.table-body tbody')[0];
                me._disabledCheckboxRowIndexes = [];

                me.$headerBox = me.element.children('div.grid-head');
                me.$headerTable = me.$headerBox.children('.table-head');
                me.$colResizeLine = me.element.find('div.col-resize-line');
                me.layoutSetting = {};
                me.$$modifiedRecords = {};
                me.Permissions = Permissions;
                me.ColSettings = ColSettings;
                me._nkey = 0;
            }

            GridProto.getVisibleFields = function () {
                var me = this;
                var columns = me.columns;
                var fields = [];
                _.forEach(columns, function (column) {
                    if (column.field && !column.hidden && !column.noPermit) {
                        fields.push(column.field);
                    }
                });
                return fields;
            };

            GridProto.getColumnDropFilters = function () {
                var me = this;
                var columns = me.columns;
                var outPut = {};
                _.forEach(columns, function (column) {
                    if (column.savedPageFiltersValues) {
                        var field = column.field;
                        outPut[field] = column.savedPageFiltersValues;
                    }
                });
                return outPut;
            };

            GridProto._getColumnDropFilter = function (column) {
                return column.savedPageFiltersValues;
            };

            GridProto.clearColumnPageFilters = function (column) {
                var me = this;
                if (_.isString(column)) {
                    column = me._getColumnByField(column);
                }
                if (column.displays) {
                    column.pageFilters = column.displays.concat();
                } else {
                    delete column.pageFilters;
                }
                if (column.values) {
                    column.pageFiltersValues = column.values.concat();
                } else {
                    delete column.pageFiltersValues;
                }
                delete column.savedPageFilters;
                delete column.savedPageFiltersValues;
                delete column.hiddenRows;
                var oldHiddenRows = me.hiddenRows;
                var newHiddenRows = me.getHiddenRows();
                me.hiddenRows = newHiddenRows;
                _.chain(oldHiddenRows)
                    .difference(newHiddenRows)
                    .forEach(function (rowIndex) {
                        $(me.tbody.rows[rowIndex]).removeClass('page-filter-hide');
                    })
                    .value();
                me._renderPageFilters();
                me.$headRow.children('.' + column.colWidthClassName).find('.filter-column').removeClass('filter-column');
            };

            /**
             * 向表格新增一行数据
             * @param record {Object} 新增数据初始值，表格如有配置 'newRowRecord'，则合并二者
             * @param index {Number} 新增行序号，默认为最后一行
             */
            GridProto.addRow = function (record, index) {
                var me = this;
                var source = me.scope.source;
                if (!source) {
                    source = me.scope.source = [];
                }
                var count = source.length;
                var newRow = {};
                var scopeNewRow = me.scope.newRowRecord || {};
                if (index === void 0 || index > count) {
                    index = count;
                }
                newRow.$$hashKey = 'N-' + me._nkey++;
                newRow = _.extend(newRow, scopeNewRow, record);
                var sourceHead = _.head(source, index);
                var sourceTail = _.tail(source, index);
                me.scope.source = sourceHead.concat(newRow).concat(sourceTail);
                me.finishEdit(true);
                $('.popover').hide();
                me.changeDataSourced = false;
                $timeout(function () {
                    me.startEdit(index);
                    if (me.isBindSelectedRow) me.scope.$selectedRow = newRow;
                    me.scope.selectedRow = newRow;
                    var gridbody = me.$gridBody[0];
                    if (gridbody) {
                        gridbody.scrollLeft = 0;
                        if (index >= count) {
                            gridbody.scrollTop = gridbody.scrollHeight;
                        }
                    }
                    try {
                        var input = $(me.tbody).find('tr').eq(index).find('span[data-role=editor]').find(':input')[0];
                        $timeout(function () {
                            input.focus();
                        });
                    } catch (e) {
                        return;
                    }
                }, 100);
            };

            /* 下拉过滤 */
            GridProto._filterData = function (data, record) {
                try {
                    var ret = $parse(data)(record);
                    return ret;
                } catch (e) {
                    return;
                }
            };

            GridProto._valToString = function (val) {
                if (val === void 0 || val === null) {
                    return '';
                }
                return String(val);
            };

            GridProto._getColumnsDisplay = function (column, uniq) {
                var me = this;
                var data, source;
                if (!column) return [];
                if (angular.isUndefined(column.displays) || angular.isUndefined(column.uniqDisplays)) {
                    var field = column.field;
                    var displays = [];
                    var uniqDisplays = [];
                    var values = [];
                    if (!column || !column.data || !column.field) {
                        column.displays = [];
                        column.uniqDisplays = [];
                        column.values = [];
                    } else {
                        data = column.data;
                        source = me.scope.source;
                        _.forEach(source, function (record) {
                            var display = me._filterData(data, record);
                            displays.push(display);
                            values.push(record[field]);
                        });
                        uniqDisplays = _.chain(displays).map(me._valToString).uniq().value();
                    }
                    column.displays = displays;
                    column.uniqDisplays = uniqDisplays;
                    column.values = values;
                }
                return uniq ? column.uniqDisplays : column.displays;
            };

            GridProto._displaysReady = function (column) {
                return !!column.displays;
            };

            GridProto._isPageFilterCheckAll = function (column) {
                if (!column) return true;
                var uniqDisplays = column.uniqDisplays;
                var pageFilters = column.pageFilters;
                if (!pageFilters) {
                    return true;
                }
                if (uniqDisplays && pageFilters && uniqDisplays.length === pageFilters.length) {
                    return true;
                }
                return false;
            };

            GridProto._hasPageFilter = function (column) {
                return !!column.savedPageFilters;
            };

            GridProto._togglePageFilterCheckAll = function (column) {
                if (!column) return;
                var me = this;
                var isCheckAll = me._isPageFilterCheckAll(column);
                if (isCheckAll) {
                    column.pageFilters = [];
                } else {
                    column.pageFilters = _.clone(column.uniqDisplays);
                }
                me._updateColumnHiddenRows(column);
            };

            GridProto._isHiddenRow = function (rowIndex) {
                return _.contains(this.hiddenRows, rowIndex);
            };

            GridProto._updateColumnDisplays = function (rowIndex, column) {
                var me = this;
                if (!me.hasDropFilter || !column.displays) return;
                var source = me.scope.source;
                var record = source[rowIndex];
                var display = $parse(column.data)(record);
                var value = record[column.field];
                column.displays[rowIndex] = display;
                column.values[rowIndex] = value;
                column.uniqDisplays = _.chain(column.displays)
                    .map(me._valToString)
                    .uniq()
                    .value();
            };

            GridProto._removeColumnDisplay = function (rowIndex, column) {
                var me = this;
                if (!me.hasDropFilter || !column.displays) return;
                var displays = column.displays;
                var head = _.head(displays, rowIndex);
                var tail = _.tail(displays, rowIndex + 1);
                var newDisplays = head.concat(tail);
                var values = column.values;
                var valuesHead = _.head(values, rowIndex);
                var valuesTail = _.tail(values, rowIndex + 1);
                var newValues = valuesHead.concat(valuesTail);
                column.displays = newDisplays;
                column.values = newValues;
                column.uniqDisplays = _.chain(column.displays)
                    .map(me._valToString)
                    .uniq()
                    .value();
            };

            /* 下拉过滤 end */

            GridProto._clearDragSelectClass = function () {
                var me = this;
                var $trs = me.element.find('table.table-body tr');
                $trs.removeClass('checking-row');
            };

            GridProto._updateSelectedRow = function (newRow, oldRow) {
                var me = this;
                var scope = me.scope;
                if (!newRow) {
                    newRow = me.scope.selectedRow;
                }
                if (newRow !== oldRow) {
                    if (me.isBindSelectedRow) {
                        scope.$selectedRow = newRow;
                    }
                }
                var activeIndex = me.getActiveRowIndex();
                var trs = $(me.tbody).find('tr');
                trs.removeAttr('active');
                if (activeIndex >= 0) {
                    trs.eq(activeIndex).attr('active', true);
                }
            };

            GridProto.autoWidthColumns = function () {
                var me = this;
                var $style = me.element.find('style');
                var $headerTh = me.$headerBox.find('th:visible');
                var $footTh = me.element.find('table.table-foot').find('th:visible');
                var classList = [];
                var colSettings = me._getColSettings();
                $style.empty();
                $headerTh.removeAttr('width');
                var headerScopeList = [];
                $headerTh.each(function (index, el) {
                    var $el = $(el);
                    var headerScope = $el.scope();
                    var classArr = $(el).attr('class').split(' ');
                    _.forEach(classArr, function (cls) {
                        if (cls.indexOf('grid-') === 0 && cls.indexOf('checkbox') < 0) {
                            classList.push(cls);
                            headerScopeList.push(headerScope);
                            return false;
                        } else if (cls.indexOf('checkbox') >= 0) {
                            if (!$footTh.length) {
                                return false;
                            }
                            var footClass = $footTh.first().attr('class').split(' ');
                            _.forEach(footClass, function (fcls) {
                                if (fcls.indexOf('grid-') === 0) {
                                    headerScopeList.push(headerScope);
                                    classList.push(fcls);
                                    return false;
                                }
                            });
                            return false;
                        }
                    });
                });
                var cssText = '';
                _.forEach(classList, function (cls, index) {
                    var $tds = me.element.find('.' + cls);
                    var maxWidth = 0;
                    if (!me.$headerBox.find('.' + cls).length) {
                        cssText += '.' + cls + '{width:' + me.$headerBox.find('.grid-col-checkbox').outerWidth() + 'px;}';
                        return;
                    }
                    $tds.each(function (index, el) {
                        var $el = $(el);
                        var width = $el.outerWidth();
                        if (width > maxWidth) {
                            maxWidth = width;
                        }
                    });
                    cssText += '.' + cls + '{width:' + maxWidth + 'px;}';
                    var col, field, colSetting;
                    var headerScope = headerScopeList[index];
                    if (headerScope && headerScope.column) {
                        col = headerScope.column;
                        field = col.columnName;
                        colSetting = _.findWhere(colSettings, {field: field});
                        colSetting.width = maxWidth;
                        col.width = colSetting.width;
                    }
                });
                $style.html(cssText);
            };

            GridProto._registerHeaderDraggable = function () {
                var me = this;
                if (!me.scope.colSettingsKey) {
                    return;
                }
                var $headerBox = me.$headerBox,
                    $headerInput = $headerBox.find(':input'),
                    $colResizeLine = me.$colResizeLine,
                    preventInputFocus = function () {
                        $headerInput.each(function (i, el) {
                            el.blur();
                        });
                    },
                    mousemoveFun = function ($event) {
                        var target = $event.target,
                            $th = angular.element(target).closest('th'),
                            width, offset, eX, inRightEdge, dragging;
                        var inDropFilter = !!($(target).closest('.drop-filter').length);
                        if ($th.length > 0) {
                            width = $th.outerWidth();
                            offset = $th.offset();
                            eX = $event.clientX;
                            inRightEdge = eX - offset.left > width - 5;
                            dragging = angular.isDefined($headerBox.data('_start_x'));
                            if (inRightEdge && !inDropFilter || dragging) {
                                $headerBox.addClass('resizeable');
                                if (me.scope.draggable) {
                                    $th.attr("draggable", "false");
                                }
                                if (dragging) {
                                    $headerInput.on('focus', preventInputFocus);
                                    $colResizeLine.css('left', $event.clientX - me.element.offset().left + me.element.scrollLeft());
                                }
                            } else {
                                $headerBox.removeClass('resizeable');
                                if (me.scope.draggable) {
                                    $th.attr("draggable", "true");
                                }
                            }
                        }
                    };

                me.element.on('mouseup', function () {
                    $headerInput.off('focus', preventInputFocus);
                });
                $headerBox.mousemove(mousemoveFun);
                $headerBox.mousedown(function ($event) {
                    var target = $event.target,
                        $th = angular.element(target).closest('th');
                    if ($th.length > 0 && $headerBox.hasClass('resizeable')) {
                        me._startColResize($event, $th);
                        $document.one('mouseup', function ($event) {
                            me._finishColResize($event, $th);
                        });
                    }
                });

                /** 头部输入框的时候 可以拖动 begin **/
                if ($headerBox.find("input").size() > 0) {
                    var $input = $headerBox.find("input"),
                        $th = $input.parents("th");

                    $input.bind("focus", function () {
                        $headerBox.unbind("mousemove");
                        if (me.scope.draggable) {
                            $th.attr("draggable", "false");
                        }
                    });
                    $input.bind("blur", function () {
                        if (me.scope.draggable) {
                            $th.attr("draggable", "false");
                            $headerBox.mousemove(mousemoveFun);
                        }
                    });
                }
                /** 头部输入框的时候 可以拖动  end **/
            };

            GridProto._registerHeaderResort = function () {
                var me = this;
                var scope = me.scope;
                var $headerBox = me.$headerBox;
                if (!scope.draggable) return;
                $headerBox.on('dragover', 'th', function (e) {
                    e.preventDefault();
                });
                $headerBox.on('drop', 'th', function (e) {
                    e.preventDefault();
                    var toColumn = $(this).data('column');
                    var beginColumn = me._beginColumn;
                    delete me._beginColumn;
                    if (!beginColumn || !toColumn || beginColumn === toColumn) return;
                    me.swapColumn(beginColumn, toColumn);
                    me._enterCols();
                });
                $headerBox.on('dragstart', 'th', function () {
                    me._beginColumn = $(this).data('column');
                });
            };

            GridProto.swapColumn = function (beginColumn, toColumn) {
                var me = this;
                var columns = me.columns;
                var beginIndex = _.findIndex(columns, beginColumn);
                var toIndex = _.findIndex(columns, toColumn);
                columns[beginIndex] = toColumn;
                columns[toIndex] = beginColumn;
            };

            GridProto._startColResize = function ($event) {
                $('body').css({
                    webkitUserSelect: 'none',
                    mozUserSelect: 'none',
                    msUserSelect: 'none',
                    userSelect: 'none'
                });
                var me = this,
                    $headerBox = me.$headerBox,
                    $colResizeLine = me.$colResizeLine;
                $colResizeLine.css('left', $event.clientX - me.element.offset().left + me.element.scrollLeft());
                $colResizeLine.show();
                $headerBox.data('_start_x', $event.clientX);
                $window.document.onselectstart = function () {
                    return false;
                };
            };

            GridProto._finishColResize = function ($event, $th) {
                $('body').css({
                    webkitUserSelect: 'auto',
                    mozUserSelect: 'auto',
                    msUserSelect: 'auto',
                    userSelect: 'auto'
                });
                var me = this,
                    $colResizeLine = me.$colResizeLine,
                    $headerBox = me.$headerBox,
                    startX = $headerBox.data('_start_x'),
                    endX = $event.clientX,
                    added = endX - startX,
                    column = $th.data('column');

                if (column) {
                    var colSettings = me._getColSettings(),
                        field = column.columnName,
                        colSetting = _.findWhere(colSettings, {field: field}),
                        $styleBlock = me.element.children('style'),
                        colWidthClassName = column.colWidthClassName,
                        oldStyleContent = $styleBlock.html(),
                        newStyleContent;
                    newStyleContent = oldStyleContent.replace(getColClassReg(colWidthClassName), function (block, width) {
                        var newWidth = Number(width) + added;
                        newWidth = _.isNaN(newWidth) ? CONSTANTS.MIN_CELL_WIDTH : newWidth;
                        newWidth = Math.max(newWidth, CONSTANTS.MIN_CELL_WIDTH);
                        colSetting.width = newWidth;
                        column.width = colSetting.width;
                        me.layoutSetting = colSettings;
                        return block.replace(width, newWidth);
                    });

                    $styleBlock.html(newStyleContent);
                    me._renderCellsStyle();
                    me._reSortBody();
                    me.element.scroll();
                }
                $colResizeLine.hide();
                $headerBox.removeData('_start_x');
                $window.document.onselectstart = angular.noop;
            };

            function getColClassReg(colWidthClassName) {
                var matched = colWidthClassName.match(/grid-(.+)-col-(\d+)/),
                    colIndex = matched[2];
                return new RegExp('(?:\\' + colWidthClassName + ')\\\{width:([\\\d\\\.]+)px;}', 'g');
            }

            /**
             * @public
             * @param recordOrIndex {Object/Number} 记录或记录在表格中的 index
             */
            GridProto.saveRecord = function (recordOrIndex) {
                var me = this,
                    recordIndex;
                if (_.isObject(recordOrIndex)) {
                    recordIndex = _.chain(me.scope.source).indexOf(recordOrIndex).value();
                } else if (_.isNumber(recordOrIndex)) {
                    recordIndex = recordOrIndex;
                }
                if (_.isNumber(recordIndex)) {
                    me.renderRowTitle(recordIndex);
                    me._reRenderRow(recordIndex);
                }
            };

            /**
             * @see Grid#saveRecord
             * @private
             *  重新生成行 `title`,
             *  <b>请不要使用这个方法， 这个方法被修改为私有了。</b>
             * @param param {Number/HTMLTableRowElement/function(rowData:Object):Boolean} 行号或行DOM
             */
            GridProto.renderRowTitle = function (param) {
                var me = this,
                    columns = me.columns,
                    source = me.scope.source,
                    trs = me.tbody.rows,
                    row, $row, rowIndex, rowData;
                if (angular.isNumber(param)) {
                    rowIndex = param;
                } else if (angular.isFunction(param)) {
                    rowIndex = _.findIndex(source, param);
                } else if (($row = angular.element(param)).is('tr')) {
                    rowIndex = $row[0].rowIndex;
                }
                if (row && rowIndex) {
                    row = trs[param];
                    rowData = source[rowIndex];
                    _.each(row.cells, function (i, cell) {
                        var columnIndex = me._getColumnIndex(cell),
                            column = columns[columnIndex];
                        me._renderCellTitle(rowData, column, cell);
                    });
                }
            };

            /**
             * @param rowData 行数据
             * @param column 列对象
             * @param $cellDom {HTMLTableCellElement} 列`dom`
             * @private
             */
            GridProto._renderCellTitle = function (rowData, column, $cellDom) {
                var me = this;
                if (!column.disableTitle) {
                    var cellValue = me.getCellValue(rowData, column);
                    angular.element($cellDom).attr('title', cellValue);
                }
            };

            GridProto._addColumn = function (column) {
                return this.columns.push(column);
            };

            //渲染查询列
            GridProto._renderColumnFilter = function (column) {
                var me = this,
                    scope = me.scope,
                    filter = column.filter,
                    $eleCol = column.element,
                    filterTmpl = column.filterTmpl,
                    $filter,
                    i, item;

                if (!filterTmpl) {
                    if (!filter) return;
                    switch (filter) {
                        case 'text':
                            filterTmpl = '<input type="text" class="form-text">';
                            break;
                        case 'number-spinner':
                            filterTmpl = '<g-number-spinner></g-number-spinner>';
                            break;
                    }
                }
                if (!filterTmpl) return;
                $filter = angular.element(filterTmpl);
                for (i = 0; i < $filter.length; i++) {
                    if ($filter[i].nodeType === 3) {
                        continue;
                    }
                    item = $filter.eq(0);
                    if (!item.attr('ng-model')) {
                        item.attr({
                            'ng-model': 'filter.' + column.field
                        });
                    }
                }

                $eleCol.closest('table.table-head').addClass('has-filters');
                $eleCol.append($filter);
                $compile($filter)(scope);
                $filter.wrap('<div class="column-filter"></div>');
                if (!me.hasColumnFilter && $filter.length) {
                    me.hasColumnFilter = true;
                }
            };

            GridProto._getCellValue = function (row, column) {
                var me = this,
                    cellValueGetterCache = me.cellValueGetterCache;
                if (!cellValueGetterCache[column.data]) {
                    cellValueGetterCache[column.data] = me.generateCellValueGetter(column);
                }
                return cellValueGetterCache[column.data](row);
            };

            GridProto._generateCellValueGetter = function (column) {
                if (column.data) {
                    return $parse(column.data);
                }
                return angular.noop;
            };

            GridProto._getSortName = function (sortingIcon) {
                var me = this,
                    columnIndex = me._getColumnIndex(sortingIcon.closest('th'));
                return me.columns[columnIndex].sortable;
            };

            GridProto._isSort = function (sortName, sortDirection) {
                var me = this,
                    sortNames = me.sortName || [],
                    sortDirections = me.sortDirection || [],
                    index = _.indexOf(sortNames, sortName);
                if (index < 0) return false;
                return sortDirections[index] == sortDirection;
            };

            GridProto._sortIndex = function (sortName) {
                var me = this,
                    sortNames = me.sortName || [],
                    index = _.indexOf(sortNames, sortName),
                    len = sortNames.length;
                if (index > -1 && len > 1) {
                    return index + 1;
                } else {
                    return '';
                }
            };

            /**
             * @param $event
             * @param $sortingIcon
             * @param multiSort 多列排序
             */
            GridProto._specifySort = function ($event, $sortingIcon, multiSort) {
                var me = this,
                    $header = $sortingIcon.closest('th'),
                    column = $header.scope().column,
                    newSortName = column.field,
                    newSortDirection = $sortingIcon.hasClass('caret-up') ? ORDER.ASC : ORDER.DESC,
                    sortNames = me.sortName = me.sortName || [],
                    sortDirections = me.sortDirection = me.sortDirection || [],
                    index = _.indexOf(sortNames, newSortName),
                    oldSortDirection;
                if (multiSort) {
                    if (index > -1) {
                        sortDirections[index] = newSortDirection;
                    } else {
                        sortNames.push(newSortName);
                        sortDirections.push(newSortDirection);
                    }
                } else {
                    if (sortNames.length == 1 && index > -1) {
                        oldSortDirection = sortDirections[index];
                        if (oldSortDirection === newSortDirection) {
                            sortNames = [];
                            sortDirections = [];
                        } else {
                            sortNames = [newSortName];
                            sortDirections = [newSortDirection];
                        }
                    } else {
                        sortNames = [newSortName];
                        sortDirections = [newSortDirection];
                    }
                }
                me._doSort(sortNames, sortDirections);
            };

            //修改增加多列排序
            GridProto._toggleSort = function ($event, multiSort) {
                var me = this,
                    $target = angular.element($event.target),
                    $header = $target.closest('th'),
                    columnScope = $header.scope(),
                    sortNames = me.sortName = me.sortName || [],
                    sortDirections = me.sortDirection = me.sortDirection || [],
                    column, newSortName, oldSortDirection, newSortDirection, index;
                if (!(columnScope && columnScope.column && columnScope.column.sortable)) return;

                column = columnScope.column;
                newSortName = column.field;
                newSortDirection = ORDER.ASC;
                index = _.indexOf(sortNames, newSortName);

                if (multiSort) {
                    if (index > -1) {
                        oldSortDirection = sortDirections[index];
                        if (oldSortDirection === ORDER.ASC) {
                            sortDirections[index] = ORDER.DESC;
                        } else if (oldSortDirection === ORDER.DESC) {
                            sortNames.splice(index, 1);
                            sortDirections.splice(index, 1);
                        }
                    } else {
                        sortNames.push(newSortName);
                        sortDirections.push(newSortDirection);
                    }
                } else {
                    if (sortNames.length == 1 && index > -1) {
                        oldSortDirection = sortDirections[index];
                        if (oldSortDirection === ORDER.ASC) {
                            sortDirections[index] = ORDER.DESC;
                        } else if (oldSortDirection === ORDER.DESC) {
                            sortNames = [];
                            sortDirections = [];
                        }
                    } else {
                        sortNames = [newSortName];
                        sortDirections = [newSortDirection];
                    }
                }
                me._doSort(sortNames, sortDirections);
            };

            GridProto._doSort = function (sortName, sortDirection) {
                if (this.__rendered !== true) return;
                var me = this,
                    scope = me.scope,
                    onBeforeSortColumn = scope.onBeforeSortColumn,
                    onSortColumn = scope.onSortColumn,
                    dataSource = scope.dataSource,
                    sortEventParam = {
                        grid: this,
                        sortName: sortName,
                        sortDirection: sortDirection
                    };
                if (onBeforeSortColumn(sortEventParam) !== false) {
                    //为了触发数据源请求
                    dataSource.sortName = me.sortName = sortName;
                    dataSource.sortDirection = me.sortDirection = sortDirection;
                    var allowAutoLoad = dataSource.$scope.allowAutoLoad;
                    if (!(allowAutoLoad === 'true' || allowAutoLoad === true)) {
                        dataSource.doRequestData();
                        me.$$modifiedRecords = {};
                    }
                    onSortColumn(sortEventParam);
                }
            };

            GridProto._desortIfSameAsOld = function (newSortName, newDirection) {
                var me = this,
                    oldSortName = me.sortName,
                    oldSortDirection = me.sortDirection;
                if (oldSortName === newSortName && oldSortDirection === newDirection) {
                    return undefined;
                }
                return newDirection;
            };

            GridProto.isAllRowsChecked = function () {
                return this.scope.allChecked;
            };

            GridProto._isAllRowsChecked = function () {
                var me = this,
                    scope = me.scope,
                    disabledRows = me._getDisabledRows(true),
                    disabledCount = disabledRows.length,
                    sourceLen = scope.source ? scope.source.length : 0,
                    enableCount = sourceLen - disabledCount,
                    checkedEnableCount = _.difference(scope.checkedRows, disabledRows).length;
                return enableCount !== 0 && checkedEnableCount === enableCount;
            };

            GridProto._getDisabledRows = function (withHiddenRows) {
                var me = this;
                var hiddenRowsIndex = me.hiddenRows;
                var disabledRows = [];
                var hiddenRows = [];
                disabledRows = _.chain(this.scope.source)
                    .map(_disabledLocalsTrans)
                    .filter(this._disabledRowPredicate())
                    .map(_.property("row"))
                    .value();
                if (withHiddenRows && hiddenRowsIndex && hiddenRowsIndex.length) {
                    hiddenRows = _.map(hiddenRowsIndex, function (i) {
                        return me.scope.source[i];
                    });
                    disabledRows = _.uniq(disabledRows.concat(hiddenRows));
                }
                return disabledRows;
            };

            GridProto._updateDisabledRows = function () {
                var me = this;
                me.disabledRows = me._getDisabledRows();
            };

            GridProto._isDisabledRow = function (record) {
                var me = this;
                return _.contains(me.disabledRows, record);
            };

            function _disabledLocalsTrans(row, index) {
                return {
                    row: row,
                    rowIndex: index
                };
            }

            GridProto._disabledRowPredicate = function () {
                var me = this,
                    express = me.checkboxesDisabledExpress;
                if (express) {
                    if (/\([$\w]+(?:,\s*[$\w]+)*\)$/.test(express)) {
                        return me._getScopeEvent(express);
                    } else {
                        return $parse(express);
                    }
                }
                return _.constant(false);
            };

            GridProto._toggleCellChecked = function ($event) {
                var $target = angular.element($event.target),
                    $checkbox = $target.closest('.form-clickbox'),
                    me, scope, source, checkedRows, rowIndex, row, checked, $tr;
                if ($checkbox.is('[disabled=disabled]')) return;
                me = this;
                scope = me.scope;
                source = scope.source;
                checkedRows = scope.checkedRows;
                $tr = $checkbox.closest('tr')[0];
                rowIndex = $checkbox.closest('tr')[0].rowIndex;
                row = source[rowIndex];
                checked = _.contains(checkedRows, row);

                $checkbox.toggleClass('selected', !checked);
                if (checked) {
                    Arrays.remove(checkedRows, row);
                } else {
                    me.scope.checkedRows.push(source[rowIndex]);
                }
                // binded
                me.scope.allChecked = me._isAllRowsChecked();
                me.checkRowByContrl = true;

                // if (scope.treeView) {
                //     childrenRows = me._getTreeChildrenRows(rowIndex);
                //     _.forEach(childrenRows, function (i) {
                //         if (me._isChecked(source[i]) === checked) {
                //             me._toggleChecked(i, {});
                //         }
                //     });
                // }

                var onCheck = scope.onCheck;
                var checkParam = {
                    $event: $event,
                    record: row,
                    grid: me,
                    $row: $tr,
                    isChecked: !checked
                };
                if (onCheck) {
                    onCheck(checkParam);
                }
            };

            GridProto._toggleAllChecked = function ($event) {
                var me = this,
                    trs = me.tbody.rows,
                    scope = me.scope,
                    source = scope.source,
                    checkedRows = scope.checkedRows,
                    disabledRows = me._getDisabledRows(true),
                    enabledRows = Arrays.subtract(source, disabledRows),
                    i, len, record;
                checkedRows.length = 0;
                if (scope.allChecked) {
                    Arrays.pushAll(enabledRows, checkedRows);
                }
                for (i = 0, len = source.length; i < len; i++) {
                    record = source[i];
                    if (_.contains(enabledRows, record)) {
                        me.element.find('td.grid-col-checkbox > div.form-clickbox', trs[i]).toggleClass('selected', scope.allChecked);
                        var $row = $(trs[i]);
                        var onCheck = scope.onCheck;
                        var checkParam = {
                            $event: $event,
                            record: record,
                            grid: me,
                            $row: $row,
                            isChecked: scope.allChecked
                        };
                        if (onCheck) {
                            onCheck(checkParam);
                        }
                    }
                }

                if (scope.onCheckAll) {
                    var checkAllParam = {
                        $event: $event,
                        grid: me,
                        isChecked: scope.allChecked
                    };
                    scope.onCheckAll(checkAllParam);
                }
                me.checkRowByContrl = true;
            };

            GridProto._getRowRecord = function (row) {
                var source = this.scope.source;
                var record;
                if (_.isNumber(row)) {
                    record = source[row];
                } else {
                    record = row;
                }
                return record || null;
            };

            GridProto._isChecked = function (record) {
                var me = this,
                    scope = me.scope;
                if (_(scope.source).contains(record)) {
                    return _(scope.checkedRows).contains(record);
                } else {
                    var rowIdx = _(me.$$modifiedRecords).findKey(function (val) {
                            return val === record;
                        }),
                        originRecord = scope.source[rowIdx];
                    return _.contains(scope.checkedRows, originRecord);
                }
            };

            GridProto._getEnableCheckboxes$ = function () {
                return angular.element('td:first-child > div[disabled!=disabled]', this.tbody);
            };

            GridProto._syncCheckRowsByOuter = function () {
                var me = this,
                    scope = me.scope,
                    checkedRows = scope.checkedRows,
                    source = scope.source;
                if (angular.isArray(source) && source.length > 0 && angular.isArray(checkedRows)) {
                    angular.forEach(me.tbody.rows, function (tr) {
                        var rowIndex = tr.rowIndex,
                            rowData = source[rowIndex],
                            $checkbox = angular.element(tr).find('td.grid-col-checkbox > div.form-clickbox');
                        if (_.contains(checkedRows, rowData)) {
                            $checkbox.addClass('selected');
                        } else {
                            $checkbox.removeClass('selected');
                        }
                    });
                    me.scope.allChecked = me._isAllRowsChecked();
                }
            };

            GridProto._headClick = function ($event) {
                var me = this,
                    scope = me.scope,
                    target = $event.target,
                    $target = angular.element(target),
                    $headTab = me.$headerBox,
                    multiSort = $event.ctrlKey,
                    $columnFilter = $target.closest('.column-filter').not($target),
                    $dropFilter = $target.closest('.drop-filter'),
                    $gridBody = $('div.grid-body', me.element),
                    $dropFilterUl;

                if ($target.is('.drop-filter-toggle')) {
                    if (!scope.firstLoad) {
                        var $filterList = $target.siblings('.drop-filter-list');
                        var columnScope = $target.scope();
                        var column = columnScope.column;
                        if (!column.uniqDisplays) {
                            me._getColumnsDisplay(column);
                            if (!column.pageFilters) {
                                if (column.hiddenRows && column.hiddenRows.length) {
                                    column.pageFiltersValues = [];
                                    column.pageFilters = [];
                                    _.forEach(column.values, function (value, index) {
                                        if (!_.contains(column.hiddenRows, index)) {
                                            column.pageFiltersValues.push(value);
                                            column.pageFilters.push(column.displays[index]);
                                        }
                                    });
                                } else {
                                    column.pageFilters = column.uniqDisplays.concat();
                                    column.pageFiltersValues = column.values.concat();
                                }
                            }
                            $dropFilterUl = $filterList.children('ul');
                            if (!$dropFilterUl.length) {
                                $dropFilterUl = $('<ul g-checkbox-group ng-model="column.pageFilters">\n    <li ng-repeat="display in column.uniqDisplays track by grid._trackColumn($index)">\n        <g-checkbox display="{{display}}" value="{{display}}" on-check="grid._updateColumnHiddenRows(column);"></g-checkbox>\n    </li>\n</ul>');
                                $filterList.append($dropFilterUl);
                                $compile($dropFilterUl)(columnScope);
                            }
                        }
                        $('.drop-filter-list', me.$headerBox).not($filterList).hide();
                        $filterList.toggle();
                        if ($filterList.is(':visible')) {
                            var bodyHeight = $gridBody.height();
                            var maxHeight = _.min([bodyHeight, 200]);
                            $filterList.css('max-height', maxHeight);
                        }
                    }
                }
                if ($dropFilter.length) {
                    $event.stopPropagation();
                    return;
                }
                if ($columnFilter.length) {
                    return;
                }
                if ($target.is('span.caret')) {
                    me._specifySort($event, $target, multiSort);
                } else if (!$headTab.hasClass('resizeable')) {
                    me._toggleSort($event, multiSort);
                }
                if ($target.is('a.fi') && $target.parent().is('.form-clickbox')) {
                    me._toggleAllChecked($event);
                }
            };

            GridProto._rowClick = function ($event, $row) {
                var me = this;
                var $target = $($event.target);
                var $tr = $target.closest('tr');
                var $td = $target.closest('td');
                if (!$tr.closest('table.table-body').length) {
                    return;
                }
                if (me.gValidatorController && $td.hasClass('high-light-border'))
                    me.getMessenger().clear($td);
                var editingRowIndex = this.getEditingRowIndex();
                if ($tr.length && $tr[0].rowIndex !== editingRowIndex) {
                    $('.popover').hide();
                }
                var scope = me.scope,
                    rowIndex = $row[0].rowIndex,
                    oldSelected = scope.selectedRow,
                    selectedRecord = scope.source[rowIndex],
                    isSelected = !(scope.canToggleSelected === 'true' && oldSelected === selectedRecord),
                    onBeforeSelect = scope.onBeforeSelect,
                    onSelect = scope.onSelect,
                    selectParam = {
                        $event: $event,
                        record: selectedRecord,
                        grid: me,
                        $row: $row,
                        isSelected: isSelected
                    };

                //拖选功能start
                if (me.scope.dragSelected && me.scope.dragSelected.length > 0) {
                    for (var i = 0; i < me.scope.dragSelected.length; i++) {
                        var index = me.scope.dragSelected[i];
                        angular.element(me.tbody.rows[index]).removeAttr("active");
                    }
                }
                //end拖选功能

                if (onBeforeSelect(selectParam) !== false) {
                    scope.selectedRow = isSelected ? selectedRecord : undefined;
                    angular.element(me.tbody.rows).removeAttr("active");
                    //if (me.__oldSelectedRow) {
                    //    me.__oldSelectedRow.removeAttr('active');
                    //}
                    if (isSelected) {
                        $row.attr('active', true);
                    }
                    //me.__oldSelectedRow = $row;
                    onSelect(selectParam);
                }

            };

            GridProto._rowDbClick = function ($event, $row) {
                var me = this,
                    scope = me.scope,
                    selectedRecord = scope.selectedRow,
                    onBeforeRowDbclick = scope.onBeforeRowDbclick,
                    onRowDbclick = scope.onRowDbclick,
                    eventParam = {
                        $event: $event,
                        record: selectedRecord,
                        grid: me,
                        $row: $row
                    };

                if (onBeforeRowDbclick(eventParam) !== false) {
                    onRowDbclick(eventParam);
                }
            };

            GridProto._cellDbClick = function ($event, $cell) {
                var me = this,
                    scope = me.scope,
                    selectedRecord = scope.selectedRow,
                    columnIndex = me._getColumnIndex($cell),
                    column = me.columns[columnIndex],
                    globalBeforeCellDbclick = scope.onBeforeCellDbclick,
                    globalCellDbclick = scope.onCellDbclick,
                    onBeforeCellDbClick = column && angular.isFunction(column.onBeforeCellDbclick) ? column.onBeforeCellDbclick : angular.noop,
                    onCellDbClick = column && angular.isFunction(column.onCellDbclick) ? column.onCellDbclick : angular.noop,
                    eventParam = {
                        $event: $event,
                        record: selectedRecord,
                        grid: me,
                        $cell: $cell,
                        column: column
                    };

                if (globalBeforeCellDbclick(eventParam) !== false) {
                    globalCellDbclick(eventParam);
                }
                if (onBeforeCellDbClick(eventParam) !== false) {
                    onCellDbClick(eventParam);
                }
            };

            /**
             * 子指令scope定义方法属性时， 指定到grid外scope的某个方法， 通过本方法获取
             * @param eventDefineAttrVal 方法属性指定的值
             * @return {*}
             */
            GridProto._getScopeEvent = function (eventDefineAttrVal) {
                var me = this,
                    scopeEventCache = me.scopeEventCache,
                    gridOuterScope = me.scope.$parent;
                if (!!eventDefineAttrVal) {
                    if (!scopeEventCache[eventDefineAttrVal]) {
                        var parentGet = $parse(eventDefineAttrVal);
                        return function (locals) {
                            return parentGet(gridOuterScope, locals);
                        };
                    }
                    return scopeEventCache[eventDefineAttrVal];
                }
                return angular.noop;
            };

            GridProto._renderCellsStyle = function () {
                var me = this,
                    element = me.element,
                    allColWidthsObj = me._getAllColWidths(),
                    allColWidths = allColWidthsObj.allColWidths,
                    cols = allColWidthsObj.cols,
                    colWidthClassBlocks = me._getColWidthClassBlocks(allColWidths),
                    requiredSpanColClassBlocks = me._getRequiredSpanColClassBlocks(allColWidths, cols),
                    allColWidthClassBlocks = colWidthClassBlocks.concat(requiredSpanColClassBlocks),
                    cellWidthStyleBlockContent = _.reduce(allColWidthClassBlocks, Functions.sum),
                    $newCellStyleBlock = angular.element('<style>' + cellWidthStyleBlockContent + '</style>');
                element.children('style').remove();
                element.append($newCellStyleBlock);
                me._reSortBody();
            };

            GridProto._getVisibleColWidths = function () {
                var me = this,
                    visiableColWidths = [],
                    $th = me.$headRow.children("th");

                angular.forEach($th, function (th) {
                    var width,
                        display = angular.element(th).css("display");
                    if (display !== "none") {
                        width = angular.element(th).outerWidth();
                        visiableColWidths.push(width);
                    }
                });
                return visiableColWidths;
            };

            /**
             * 获取列的宽度样式片段
             *
             * @param allColWidths {Array<Number>} 所有列的宽度
             * @return {Array<String>} 宽度样式片段
             */
            GridProto._getColWidthClassBlocks = function (allColWidths) {
                var me = this,
                    colWidthClassBlocks = [],
                    colWidthClassName, colWidthClassBlock;
                angular.forEach(allColWidths, function (colWidth, colIndex) {
                    colWidthClassName = me._getColWidthClassName(colIndex);
                    colWidthClassBlock = _toWidthClassBlock(colWidthClassName, colWidth);
                    colWidthClassBlocks.push(colWidthClassBlock);
                });
                return colWidthClassBlocks;
            };

            /**
             * 获取跨列列的宽度样式片段
             *
             * @param allColWidths {Array<Number>} 所有列的宽度
             * @return {Array<String>} 宽度样式片段
             */
            GridProto._getRequiredSpanColClassBlocks = function (allColWidths) {
                var me = this,
                    spanColClassBlocks = [],
                    requiredClassNameColSpanRange = me.requiredClassNameColSpanRange,
                    start, end, spanColWidths, spanColWidthSum, spanColWidthClassBlock;
                angular.forEach(requiredClassNameColSpanRange, function (spanRange, requiredClassName) {
                    start = spanRange[0];
                    end = spanRange[1];
                    spanColWidths = _.chain(allColWidths)
                        .tail(start)
                        .filter(function (n) {
                            return n;
                        })
                        .head(end - start)
                        .value();
                    spanColWidthSum = Arrays.reduce(spanColWidths, function (a, b) {
                        return parseFloat(a) + parseFloat(b);
                    });
                    spanColWidthClassBlock = _toWidthClassBlock(requiredClassName, spanColWidthSum);
                    spanColClassBlocks.push(spanColWidthClassBlock);
                });
                return spanColClassBlocks;
            };

            function _toWidthClassBlock(className, width) {
                if (!width) {
                    return '';
                }
                return '.grid .' + className + '{width:' + width + 'px;}';
            }

            /**
             * 将 Array 中未定义的位置用余数的平均值填充, 如果平均值比最小值小， 用最小值填充
             * @example paddingWidthSpentAvg([1, undefined, 3, 4, undefined], 20, 2) -> [1, 6, 3, 4, 6]
             * @example paddingWidthSpentAvg([1, undefined, 3, 4, undefined], 20, 7) -> [1, 7, 3, 4, 7]
             * @param array {Array<Number>} 需要填充的数组
             * @param total {Number} 总值
             * @param min {Number} 最小值
             */
            function paddingWithSpentAvg(array, total, min) {
                var definedEls = Arrays.filter(array, angular.isDefined),
                    definedSum = Arrays.isNotEmptyArray(definedEls) ? Arrays.reduce(definedEls, Functions.sum) : 0,
                    undefinedCount = array.length - definedEls.length,
                    spent = total - definedSum,
                    spentAvg = spent / undefinedCount,
                    padding = Math.max(spentAvg, min);
                angular.forEach(array, function (el, index) {
                    if (angular.isUndefined(el)) {
                        array[index] = padding;
                    }
                });
            }

            /**
             * 获取所有列的宽度， 包括勾选列和补白列
             *
             * @return {Array<Number>} 所有列的宽度
             */
            GridProto._getAllColWidths = function () {
                var me = this,
                    __originalCols = me.__originalCols,
                    gridContentWidth = me._getContentWidth(),
                    columnWidths;
                var colSettings = me._getColSettings();
                columnWidths = Arrays.transform(__originalCols, function (col) {
                    var field = col.columnName, colSetting;
                    if (_.isArray(colSettings)) {
                        colSetting = _.findWhere(colSettings, {field: field});
                        if (colSetting && colSetting.width) {
                            return colSetting.width;
                        }
                    }
                    return me._getSingleColWidth(col.widthDef, gridContentWidth);
                });
                paddingWithSpentAvg(columnWidths, gridContentWidth, CONSTANTS.MIN_CELL_WIDTH);
                me._setColWidth(columnWidths);
                var checkColWidth;
                var indexColWidth;
                var funcColsWidth;
                if (me.hasCheckbox) {
                    checkColWidth = me.$headRow.children('th.grid-col-checkbox').outerWidth();
                }
                if (me.hasIndex) {
                    indexColWidth = me.$headRow.children('th.grid-col-index').outerWidth();
                }
                funcColsWidth = me.indexColumnIdx < me.checkboxColumnIdx ? [indexColWidth, checkColWidth] : [checkColWidth, indexColWidth];
                funcColsWidth = _.without(funcColsWidth, void 0);
                Array.prototype.unshift.apply(columnWidths, funcColsWidth);
                if (me._hasVerticalScroll()) {
                    columnWidths.push(CONSTANTS.SPACE_CELL_WIDTH);
                }
                return {allColWidths: columnWidths, cols: __originalCols};
            };
            //把当前表格每一列的宽度设置到columns中去
            GridProto._setColWidth = function (columnWidths) {
                var me = this,
                    cols = me.__originalCols,
                    len = cols.length,
                    i, col;
                for (i = 0; i < len; i++) {
                    col = cols[i];
                    col.width = "" + Number(columnWidths[i]).toFixed(1);
                }
            };

            GridProto._hasVerticalScroll = function () {
                var me = this,
                    $gridBody = me.$gridBody,
                    $tbody = $(me.tbody);
                return $gridBody.width() < $tbody.width();
            };

            GridProto._hasHorizontalScroll = function () {
                var me = this,
                    $gridBody = me.$gridBody,
                    $tbody = $(me.tbody);
                return $gridBody.height() < $tbody.height();
            };

            /**
             * 获取表格单列宽度
             * @param columnWidthDef {String} 列指令的宽度定义字符串 例: 100 、100px 、 10%
             * @param gridContentWidth {Number} 表格主体宽度, 即数据展示部分的宽度
             * @return {number} 列宽度
             */
            GridProto._getSingleColWidth = function (columnWidthDef, gridContentWidth) {
                var widthPercent;
                if (!!columnWidthDef) {
                    if (/^[\d\.]+%$/.test(columnWidthDef)) {
                        widthPercent = Number(columnWidthDef.substring(0, columnWidthDef.length - 1));
                        return gridContentWidth * widthPercent / 100;
                    } else if (/^[\d\.]+px$/.test(columnWidthDef)) {
                        return Number(columnWidthDef.substring(0, columnWidthDef.length - 2));
                    } else if (/^[\d\.]+$/.test(columnWidthDef)) {
                        return Number(columnWidthDef);
                    }
                }
            };

            /**
             * 获取表格主体部分宽度，即数据展示部分的总宽度， 为表格外层div宽度减去勾选列和空白列的宽度
             * @private
             */
            GridProto._getContentWidth = function () {
                var me = this,
                    gridWidth = me.element.width(),
                    gridContentWidth = gridWidth - 2;
                if (me.hasIndex) {
                    gridContentWidth -= CONSTANTS.CHECK_ROW_WIDTH;
                }
                if (me.hasCheckbox) {
                    gridContentWidth -= CONSTANTS.CHECK_ROW_WIDTH;
                }
                if (me._hasVerticalScroll()) {
                    gridContentWidth -= CONSTANTS.SPACE_CELL_WIDTH;
                }
                return gridContentWidth;
            };

            GridProto._registerFootCellWidthClass = function (span) {
                var me = this,
                    startColIndex = me.footCellIndex,
                    colspan = isNaN(span) ? 1 : span,
                    endColIndex = startColIndex + colspan,
                    colWidthClassName = me._getColWidthClassName(startColIndex);
                if (colspan > 1) {
                    colWidthClassName += ('-' + endColIndex);
                    me.requiredClassNameColSpanRange[colWidthClassName] = [startColIndex, endColIndex];
                }
                me.footCellIndex += colspan;
                return colWidthClassName;
            };

            /**
             * @private
             * @param startColIndex {Number} 开始的`column`的`index`
             * @param colspan {Number}
             * @return {string}
             */
            GridProto._getColWidthClassName = function (startColIndex, colspan) {
                var className = 'grid-' + this.hash + '-col-' + startColIndex;
                if (angular.isNumber(colspan) && colspan > 1) {
                    className += '-' + (startColIndex + colspan);
                }
                return className;
            };

            GridProto.getEditingRowIndex = function () {
                var me = this;
                return angular.isNumber(me.__editingRowIndex)
                    ? me.__editingRowIndex
                    : -1;
            };

            /**
             * @return {number} 激活行序号，从0开始计算，没有则返回-1
             */
            GridProto.getActiveRowIndex = function () {
                var selectedRecord = this.scope.selectedRow;
                if (!selectedRecord) {
                    return -1;
                }
                var records = this.scope.source;
                var idx = _.findIndex(records, selectedRecord);
                return idx;
            };

            GridProto._isActiveRow = function (rowIndex) {
                var activeRowIndex = this.getActiveRowIndex();
                if (activeRowIndex >= 0 && activeRowIndex === rowIndex) {
                    return true;
                }
                return false;
            };

            GridProto.startEdit = function (rowIndex) {
                var me = this,
                    scope = me.scope,
                    isActive = me._isActiveRow(rowIndex),
                    tr, originRecord, editorRow, funcCellCount, rowClass, $tableTree, $editorRowTableTree;
                if (!scope.source || !scope.source.length) return;
                me._createEditorRow(rowIndex);
                if (!angular.isNumber(me.__editingRowIndex)) {
                    originRecord = me.scope.source[rowIndex];
                    me._editingRecord = angular.copy(originRecord);
                    tr = me.tbody.rows[rowIndex];
                    if (!tr || !tr.cells) {
                        return;
                    }
                    rowClass = $(tr).attr('class');
                    if (!me.$$modifiedRecords[rowIndex]) {
                        me.$$modifiedRecords[rowIndex] = angular.copy(originRecord);
                    }
                    editorRow = me.$tableBodyClone.find('tr');
                    if (isActive) {
                        editorRow.attr('active', true);
                    } else {
                        editorRow.removeAttr('active');
                    }
                    editorRow.attr('class', rowClass);
                    funcCellCount = 0;
                    if (me.hasCheckbox) funcCellCount++;
                    if (me.hasIndex) funcCellCount++;
                    angular.forEach(tr.cells, function (cell, idx) {
                        var $cell = $(cell);
                        var $editorRowCells = editorRow.children('td');
                        var $editorRowCell = $editorRowCells.eq(idx);
                        var $editorRowDisplay, style, $display;
                        if (idx < funcCellCount) {
                            $editorRowCell.replaceWith($cell.clone());
                        } else {
                            $display = $cell.children('[data-role=display]');
                            //if (typeof($editorRowCell.attr("title")) != "undefined")
                            if ($display.find(".form-upload").length == 0) {
                                $editorRowCell.attr("title", $display.text());
                            }
                            $editorRowDisplay = $editorRowCell.children('[data-role=display]');
                            style = $editorRowDisplay.attr('style');
                            $editorRowDisplay.replaceWith($display.attr('style', style));
                            if (me.scope.treeView) {
                                $tableTree = $cell.children('[data-role="table-tree"]');
                                $editorRowTableTree = $editorRowCell.children('[data-role="table-tree"]');
                                $editorRowTableTree.replaceWith($tableTree);
                            }
                        }
                    });
                    editorRow.attr('editing', true);
                    $rootScope.$broadcast('gridEdit', me);
                    me._updateEditorRowScope(rowIndex);
                    $(tr).replaceWith(editorRow);
                    $compile($(me.tbody.rows[rowIndex]).find('[data-role=display]').filter(function (index, el) {
                        return !$(el).find('.form-upload, [ng-click]').length;
                    }))(me.editorRowScope);
                    me.__editingRowIndex = rowIndex;
                    $timeout(function () {
                        me._syncScroll();
                    }, 10);
                }
            };

            /**
             * @param force {boolean} 是否跳过验证强制结束编辑
             */
            GridProto.finishEdit = function (force) {
                var me = this,
                    formController = me.formController;
                if (angular.isNumber(me.__editingRowIndex)) {
                    if (!force && formController) {
                        formController.verify();
                        if (!formController.$valid) return false;
                    }
                    var trs = me.tbody.rows;
                    var row = trs[me.__editingRowIndex];
                    var $row = $(row);
                    var tableTreeClass;
                    if (me.scope.treeView) {
                        tableTreeClass = _.map($row.find('.table-tree'), function (el) {
                            return $(el).attr('class');
                        });
                    }
                    $('.form-suggestbox-dropdown').hide();
                    var rowModified = $row.hasClass("-grid-row-modified");
                    $row.after('<tr>');

                    if ($row.attr('editing')) {
                        $row.removeAttr('editing');
                        me.$tableBodyClone.append(row);
                    } else {
                        me._resetEditorRow();
                    }
                    me._reRenderRow(me.__editingRowIndex, tableTreeClass);
                    //if(me.editorRowScope) me.editorRowScope.$destroy();
                    //作用：编辑行状态已变更时，状态传递
                    if (rowModified) $(trs[me.__editingRowIndex]).addClass("-grid-row-modified");
                    delete me._editingRecord;
                    delete me.__editingRowIndex;
                    return true;
                }
            };

            GridProto.getModifiedRows = function () {
                return angular.element(this.tbody).find('tr.-grid-row-modified');
            };

            GridProto.getModifiedRecords = function () {
                return _(this.getModifiedRecordMap()).values();
            };

            GridProto.getModifiedRecordMap = function () {
                var me = this,
                    source = me._isCopyEditingDisabled() ? me.scope.source : me.$$modifiedRecords;
                return _.chain(me.getModifiedRows())
                    .map(_.property('rowIndex'))
                    .map(function (rowIndex) {
                        return [rowIndex, source[rowIndex]];
                    })
                    .object()
                    .value();
            };

            GridProto.flushModified = function () {
                var me = this,
                    source = me.scope.source;
                me.getModifiedRows().each(function (i, tr) {
                    var rowIndex = tr.rowIndex;

                    if (!me._isCopyEditingDisabled()) {
                        source.splice(rowIndex, 1, me.$$modifiedRecords[rowIndex]);
                    }

                    delete me.$$modifiedRecords[rowIndex];
                    me._reRenderRow(rowIndex);
                });
            };

            function makeEmpty(obj) {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key))
                        delete obj[key];
                }
            }

            /**
             * 导出表格内容到 EXCEL 文件
             * @param fileName {String} 文件名，不需要扩展名
             */
            GridProto.exportToFile = function (fileName) {
                var me = this;
                var $grid = me.element;
                var $trs = $grid.find('tr:visible');
                var $trsClone = $trs.clone();
                var $temp = $('<div style="height: 1px; position: absolute; position: fixed; left: 99999px;">');
                var content = '';
                var BOM = "\uFEFF";
                $temp.append($trsClone);
                $('body').append($temp);
                $trsClone.each(function (iTr, tr) {
                    var $tr = $(tr);
                    var $tds = $tr.find('th:visible, td:visible');
                    var tdLen = $tds.length;
                    $tds.each(function (iTd, td) {
                        var $td = $(td);
                        $td.find(':input, :button, :checkbox, [data-role="editor"], .drop-filter, .column-filter').remove();
                        var tdTxt = wrapQuotes(replaceAll($.trim($td.text()), '"', '""'));
                        content += tdTxt + '\t';
                        if (iTd < tdLen - 1) {
                            content += ',';
                        }
                    });
                    content += '\r\n';
                });
                $temp.remove();
                downloadFile(fileName + '.csv', BOM + content);

                function wrapQuotes(str) {
                    return '"' + str + '"';
                }

                function replaceAll(str, oldChar, newChar) {
                    return str.split('oldChar').join(newChar);
                }

                function downloadFile(fileName, content) {
                    var aLink = document.createElement('a');
                    var blob = new Blob([content], {type: 'text/csv'});
                    var evt = document.createEvent("HTMLEvents");
                    evt.initEvent("click", false, false);
                    aLink.download = fileName;
                    aLink.href = URL.createObjectURL(blob);
                    aLink.dispatchEvent(evt);
                }
            };

            GridProto.reverseModified = function () {
                var me = this;
                if (me._isCopyEditingDisabled()) {
                    me.getModifiedRows().each(function (i, tr) {
                        var rowIndex = tr.rowIndex,
                            originRecord = me.scope.source[rowIndex];
                        makeEmpty(originRecord);
                        angular.copy(me.$$modifiedRecords[rowIndex], originRecord);
                        delete me.$$modifiedRecords[rowIndex];
                        me._reRenderRow(rowIndex);
                    });
                } else {
                    me.getModifiedRows().each(function (i, tr) {
                        var rowIndex = tr.rowIndex;
                        delete me.$$modifiedRecords[rowIndex];
                        me._reRenderRow(rowIndex);
                    });
                }
            };

            GridProto._isCopyEditingDisabled = function () {
                if (this.scope.disableCopyEditing) {
                    return this.scope.disableCopyEditing === 'true';
                }
                return defDisableCopyEditing;
            };

            GridProto._reRenderRow = function (rowIndex, tableTreeClass) {
                var me = this,
                    trs = me.tbody.rows,
                    oldTr = trs[rowIndex],
                    $oldTr = angular.element(oldTr),
                    originRecord = me.scope.source[rowIndex];
                if (!originRecord) return;
                if (me.$$modifiedRecords.hasOwnProperty(rowIndex)) {
                    var copy = me.$$modifiedRecords[rowIndex],
                        newRow, i, len, field, cellIndex, cell;
                    var editingRecord = me._editingRecord;
                    if (me._isCopyEditingDisabled()) {
                        newRow = replaceRow(originRecord);
                    } else {
                        newRow = replaceRow(copy);
                    }

                    function associateFunc(f, index) {
                        var cpVal = copy[f], oldVal = originRecord[f];
                        if (!(
                            (isEmpty(cpVal) && isEmpty(oldVal)) ||
                            ((angular.isDate(cpVal) || angular.isDate(oldVal)) && compareDate(cpVal, oldVal)) ||
                            (String(cpVal) === String(oldVal)) ||
                            ((_.isNumber(cpVal) || _.isNumber(oldVal)) && Number(cpVal) === Number(oldVal))
                        )) {
                            cellIndex = me.hasCheckbox ? index + 1 : index;
                            cellIndex = me.hasIndex ? cellIndex + 1 : cellIndex;
                            cell = newRow.cells[cellIndex];
                            angular.element(cell).addClass('-grid-cell-modified');
                        }
                    }

                    for (i = 0, len = me.columns.length; i < len; i++) {
                        var column = me.columns[i];
                        field = column.field;
                        if (field) {
                            var cpVal = copy[field], oldVal = originRecord[field];
                            var tmpfilter = column.data.split("|");
                            if (tmpfilter.length > 1 && tmpfilter[1].indexOf("date:") >= 0) {
                                var dataformat = $.trim(tmpfilter[1].replace("date:", "").replace(/\'/g, ""));
                                if (!isEmpty(cpVal)) cpVal = $filter('date')(cpVal, dataformat);
                                if (!isEmpty(oldVal)) oldVal = $filter('date')(oldVal, dataformat);
                            }
                            if (!(
                                (isEmpty(cpVal) && isEmpty(oldVal)) ||
                                ((angular.isDate(cpVal) || angular.isDate(oldVal)) && compareDate(cpVal, oldVal)) ||
                                (String(cpVal) === String(oldVal)) ||
                                ((_.isNumber(cpVal) || _.isNumber(oldVal)) && Number(cpVal) === Number(oldVal))
                            )) {
                                cellIndex = me.hasCheckbox ? i + 1 : i;
                                cellIndex = me.hasIndex ? cellIndex + 1 : cellIndex;
                                cell = newRow.cells[cellIndex];
                                angular.element(cell).addClass('-grid-cell-modified');
                            }

                            if (column.editorTmpl && column.editorTmpl.indexOf("g-associate") != -1) {
                                var modelField, displayField;
                                var match = column.editorTmpl.match(/ng-model="([a-zA-Z0-9\.]*)"/);
                                if (match) {
                                    modelField = match[1];
                                    if (modelField.indexOf(".") !== -1) modelField = modelField.substr(modelField.indexOf(".") + 1);
                                }
                                match = column.editorTmpl.match(/ng-model="([a-zA-Z0-9\.]*)"/);
                                if (match) {
                                    displayField = match[1];
                                    if (displayField.indexOf(".") !== -1) displayField = displayField.substr(displayField.indexOf(".") + 1);
                                }

                                if (displayField && displayField !== field) {
                                    associateFunc(displayField, i);
                                }

                                if (modelField && modelField !== field) {
                                    associateFunc(modelField, i);
                                }
                            }
                            if (!me.hasDropFilter) continue;
                            if (column.displays && editingRecord[field] !== originRecord[field]) {
                                me._updateColumnDisplays(rowIndex, column);
                            }
                        }
                    }
                    if (cellIndex && cellIndex > 0) { // cellIndex > 0 说明有列被更改过
                        angular.element(newRow).addClass('-grid-row-modified');
                    }
                } else {
                    replaceRow(originRecord);
                }
                var $row = angular.element(me.tbody.rows[rowIndex]);
                var $tableTree;
                //$row.toggleClass('table-body-tr-even', rowIndex % 2 === 1);
                if (tableTreeClass) {
                    $tableTree = $row.find('.table-tree');
                    _.forEach(tableTreeClass, function (className, i) {
                        $tableTree.eq(i).attr('class', className);
                    });
                }

                function isEmpty(val) {
                    return _.isNull(val) || _.isUndefined(val) || val === '';
                }

                function compareDate(left, right) {
                    if ((isEmpty(left) && angular.isDate(right)) || (isEmpty(right) && angular.isDate(left))) return false;
                    var leftDate = angular.isDate(left) ? left : dateParser(left);
                    var rightDate = angular.isDate(right) ? right : dateParser(right);
                    leftDate.setMilliseconds(0);
                    rightDate.setMilliseconds(0);
                    return leftDate.getTime() === rightDate.getTime();
                }

                function replaceRow(record) {
                    var newRow;
                    $oldTr.children('[cell-templated]').each(function () {
                        "use strict";
                        angular.element(this).scope().$destroy();
                    });
                    $oldTr.replaceWith(me._getCompiledRowTmpl()({
                        record: record,
                        rowIndex: rowIndex,
                        grid: me
                    }));
                    newRow = trs[rowIndex];
                    var rowScope = me._getRowScope(rowIndex, record);
                    $compile(newRow)(rowScope);
                    return newRow;
                }

                if (me.scope.grid.hookAfterRender && _.isFunction(me.scope.grid.hookAfterRender)) {
                    me.scope.grid.hookAfterRender(me.scope);
                }
            };


            function dateParser(value) {
                var timeRegExp = /(\d{4})-(\d{2})-(\d{2})?(.*)/;
                var currentDate, dateInfos, day, hour, minute, month, timeInfos, timeStr, year;
                currentDate = new Date();
                if (!value) {
                    value = '';
                }
                dateInfos = value.match(timeRegExp);
                if (dateInfos === null) {
                    dateInfos = value.match(/(\d{4})-(\d{2})?(.*)/);
                    if (dateInfos === null) {
                        dateInfos = value.match(/(\d{4})?(.*)/);
                        if (dateInfos === null) {
                            return currentDate;
                        } else {
                            year = dateInfos[1];
                        }
                    } else {
                        year = dateInfos[1];
                        month = dateInfos[2];
                    }
                } else {
                    year = dateInfos[1];
                    month = dateInfos[2];
                    day = dateInfos[3];
                    timeStr = dateInfos[4];
                }
                year = parseInt(year, 10);
                month = parseInt(month, 10) - 1;
                day = parseInt(day, 10);
                if (!isNaN(year)) {
                    currentDate.setFullYear(year);
                }

                if (!isNaN(day)) {
                    currentDate.setDate(day);
                }
                if (!isNaN(month)) {
                    currentDate.setMonth(month);
                }
                //再次赋值，防止日期天数超出造成天数不正常
                if (!isNaN(day)) {
                    currentDate.setDate(day);
                }

                if (timeStr) {
                    timeInfos = timeStr.split(":");
                    hour = timeInfos[0];
                    minute = timeInfos[1];
                    if (hour) {
                        hour = parseInt(hour);
                        if (!isNaN(hour)) {
                            currentDate.setHours(hour);
                        }
                    } else {
                        currentDate.setHours(0);
                    }
                    if (minute) {
                        minute = parseInt(minute);
                        if (!isNaN(minute)) {
                            currentDate.setMinutes(minute);
                        }
                    } else {
                        currentDate.setMinutes(0);
                    }
                    currentDate.setSeconds(0);
                } else {
                    currentDate.setHours(0);
                    currentDate.setMinutes(0);
                    currentDate.setSeconds(0);
                    currentDate.setMilliseconds(0);
                }
                return currentDate;
            }

            GridProto._getEditorTmpl = function (column) {
                var me = this,
                    columnTmplMap = {};
                GridProto._getEditorTmpl = function (column) {
                    if (column) {
                        var field = column.field,
                            columnTmpl;
                        if (field) {
                            if (column.canEdit) {
                                // if (!columnTmplMap.hasOwnProperty(field)) {
                                if (column.editorTmpl) {
                                    columnTmplMap[field] = column.editorTmpl;
                                } else if (column.editable) {
                                    switch (column.editable) {
                                        case 'text':
                                            columnTmplMap[field] = '<input type="text" class="form-text">';
                                            break;
                                        case 'number-spinner':
                                            columnTmplMap[field] = '<g-number-spinner></g-number-spinner>';
                                            break;
                                        case 'checkbox':
                                            columnTmplMap[field] = '<g-checkbox></g-checkbox>';
                                            break;
                                    }
                                }
                                // }
                                // 如果能编辑， 返回模板
                                columnTmpl = columnTmplMap[field];
                                if (!columnTmpl) {
                                    column.canEdit = false;
                                } else {
                                    return columnTmpl;
                                }
                            }
                        }
                    }
                };
                return me._getEditorTmpl(column);
            };

            /**
             *
             * @param cellScope.rowIndex
             * @param cellScope.column
             * @param cellScope.row
             * @param cellScope.columnIndex
             * @returns {void|*}
             */
            GridProto._getCellTmplScope = function (cellScope) {
                var me = this,
                    scope = me.scope,
                    gridOuterScope = scope.$parent,
                    rowIndex = cellScope.rowIndex,
                    formName = me.formName,
                    cellTmplScope = angular.extend(gridOuterScope.$new(), {
                        grid: me,
                        column: cellScope.column,
                        rowIndex: rowIndex,
                        columnIndex: cellScope.columnIndex,
                        row: cellScope.row
                    });
                if (formName) {
                    cellTmplScope[formName] = scope[formName];
                }
                return cellTmplScope;
            };

            /**
             * 重置表格状态
             * 包括：   1、 全选状态
             *        2、 勾选行
             *        3、 选中行
             */
            GridProto._reset = function () {
                var me = this,
                    scope = me.scope;
                // 清空选中行
                scope.allChecked = false;
                if (me.isBindSelectedRow) me.scope.$selectedRow = undefined;
                me.finishEdit(true);
                me._resetEditorRow();
                scope.selectedRow = undefined;
                delete me.__editingRowIndex;
                if (_.isArray(scope.$checkedRows)) {
                    scope.$checkedRows.splice(0, scope.$checkedRows.length);
                }
            };

            GridProto._getRowTmpl = function () {
                var me = this, columnsTmpl;
                if (!me.rowTmpl) {
                    columnsTmpl = _
                        .chain(me.columns)
                        .filter(angular.isDefined)
                        .map(function (column, index) {
                            var hiddenClass = column.hidden ? 'hidden' : '';
                            if (column && column.noPermit) {
                                return '';
                            }
                            if (column.hide === true) return '';
                            var cellTmpl = '<td ';

                            cellTmpl += 'class="' + column.colWidthClassName;
                            if (column.gItemClass) {
                                //cellTmpl += 'render-cell-class outer-scope="grid.scope.$parent" g-item-class="' + column.gItemClass + '" ';
                                cellTmpl += ' {{grid._columnClassName(rowIndex, ' + index + ')}}';
                            }
                            cellTmpl += ' ' + column.cellAlignClass + ' ' + hiddenClass + '"';
                            if (column.tmpl) {
                                cellTmpl += 'cell-templated>';
                                if (column.isTreeColumn) {
                                    cellTmpl += '{{# grid._getRowTreeTmpl(rowIndex)}}';
                                }
                                cellTmpl += '<span data-role="display" ></span>';
                            } else if (column.data) {
                                cellTmpl += 'title="{{record.' + column.data + '}}">';
                                if (column.isTreeColumn) {
                                    cellTmpl += '{{# grid._getRowTreeTmpl(rowIndex)}}';
                                }
                                cellTmpl += '<span data-role="display">{{record.' + column.data + '}}</span>';
                            } else {
                                cellTmpl += '>';
                                if (column.isTreeColumn) {
                                    cellTmpl += '{{# grid._getRowTreeTmpl(rowIndex)}}';
                                }

                            }
                            if (column.editable || column.editorTmpl) {
                                cellTmpl += '<span data-role="editor"></span>';
                            }
                            return cellTmpl + '</td>';
                        })
                        .join('');
                    var funcColTmpl = '';
                    var indexColTmpl = '';
                    var checkboxColTmpl = '';
                    if (me.hasIndex) {
                        indexColTmpl += '<td class="grid-col-index" ng-style="dragStyle">{{grid._getIndex(rowIndex)}}</td>\n';
                    }
                    if (me.hasCheckbox) {
                        checkboxColTmpl += '<td class="grid-col-checkbox"  ng-style="dragStyle">\n    {{if (grid.scope.treeView && !grid.treeColumn)}}\n    {{# grid._getRowTreeTmpl(rowIndex)}}\n    {{/if}}\n    <div\n      class="form-clickbox{{if grid._isChecked(grid._getRowRecord(rowIndex))}} selected{{/if}}" \n      outer-scope="grid.scope.$parent" \n      {{if grid._isDisabledRow(grid._getRowRecord(rowIndex))}}disabled="disabled"{{/if}}>\n      <a href="javascript:void(0);" class="fi"></a>\n    </div>\n</td>';
                    }
                    if (me.indexColumnIdx < me.checkboxColumnIdx) {
                        funcColTmpl += indexColTmpl + checkboxColTmpl;
                    } else {
                        funcColTmpl += checkboxColTmpl + indexColTmpl;
                    }
                    me.rowTmpl = '<tr {{if (grid._isActiveRow(rowIndex))}}active="true"{{/if}} class="{{if (grid.scope.gItemClass)}} {{grid._rowClassName(rowIndex)}} {{/if}} {{if enableEvenClass === \'true\' && rowIndex % 2 === 1}}table-body-tr-even{{/if}} {{if grid._isHiddenRow(rowIndex)}}page-filter-hide{{/if}} {{if grid.scope.treeView && !grid.scope.treeAsync && grid._isTreeHiddenRow(rowIndex)}}tree-hide{{/if}}">' + funcColTmpl + columnsTmpl + '</tr>';
                }
                return me.rowTmpl;
            };

            GridProto._getRowTreeTmpl = function (rowIndex) {
                var me = this;
                var scope = me.scope;
                var treeIdProp = scope.treeIdProp;
                var treeInfo = me._getRowTreeInfo(rowIndex);
                var rowRecord = me._getRowRecord(rowIndex) || {};
                var rowIdStr = String(rowRecord[treeIdProp]) || '';
                var parentsTreeInfo = treeInfo.parentsTreeInfo || [];
                var tableTreeTmpl = '<span data-role="table-tree">';
                var count = (treeInfo.level || 0) + 1;
                var parentLevelInfo;
                _.times(count, function (i) {
                    tableTreeTmpl += '<div class="table-tree';
                    if (count === i + 1) {
                        tableTreeTmpl += treeInfo.isLast ? ' is-last' : '';
                        tableTreeTmpl += (treeInfo.isFirst && treeInfo.level === 0) ? ' is-first' : '';
                    } else {
                        parentLevelInfo = parentsTreeInfo[i] || {};
                        if (parentLevelInfo.isLast) {
                            tableTreeTmpl += ' is-empty';
                        } else {
                            tableTreeTmpl += ' is-middle';
                        }
                    }
                    tableTreeTmpl += '">';
                    tableTreeTmpl += count === i + 1 && treeInfo.hasChildren ? '<div class="expand-toggle" ng-class="{expanded: grid._isTreeExpand(grid._getRowIndexByTreeId(\'' + rowIdStr + '\')), \'is-loading\': grid._isTreeFetching(grid._getRowIndexByTreeId(\'' + rowIdStr + '\'))}"></div>' : '';
                    tableTreeTmpl += '</div>';
                });
                tableTreeTmpl += '</span>';
                return tableTreeTmpl;
            };

            GridProto._getColumnByClass = function (className) {
                var me = this;
                var columns = me.columns;
                var column = _.find(columns, function (col) {
                    return col.colWidthClassName === className;
                });
                return column;
            };

            GridProto._getColumnByField = function (field) {
                var me = this;
                var columns = me.columns;
                var column = _.find(columns, function (col) {
                    return col.field === field;
                });
                return column;
            };

            GridProto._updateColumnHiddenRows = function (column) {
                var me = this;
                me._lockScroll = true;
                var oldPageFilterValues = column.pageFiltersValues.concat() || [];
                var addValues = [];
                var removedValues = [];
                var addDisplays = [];
                var removedDisplays = [];
                if (!column.savedPageFiltersValues) {
                    column.savedPageFiltersValues = column.pageFiltersValues.concat();
                    column.savedPageFilters = column.pageFilters.concat();
                }
                if (me._isPageFilterCheckAll(column)) {
                    column.hiddenRows = [];
                    column.pageFiltersValues = _.uniq(column.values.concat());
                    column.pageFilters = column.uniqDisplays.concat();
                } else {
                    var columnHiddenRows = [];
                    var pageFiltersValues = [];
                    _.chain(column.displays)
                        .map(me._valToString)
                        .forEach(function (valStr, i) {
                            if (_.contains(column.pageFilters, valStr)) {
                                pageFiltersValues.push(column.values[i]);
                            } else {
                                columnHiddenRows.push(i);
                            }
                        });
                    column.pageFiltersValues = pageFiltersValues;
                    column.hiddenRows = columnHiddenRows;
                }
                addValues = _.difference(column.pageFiltersValues, oldPageFilterValues);
                removedValues = _.difference(oldPageFilterValues, column.pageFiltersValues);
                addDisplays = _.chain(addValues)
                    .map(function (value) {
                        var r = {};
                        r[column.field] = value;
                        return me._filterData(column.data, r);
                    })
                    .uniq()
                    .value();
                removedDisplays = _.chain(removedValues)
                    .map(function (value) {
                        var r = {};
                        r[column.field] = value;
                        return me._filterData(column.data, r);
                    })
                    .uniq()
                    .value();
                var savedPageFiltersValues = column.savedPageFiltersValues.concat(addValues);
                column.savedPageFiltersValues = _.chain(savedPageFiltersValues)
                    .uniq()
                    .difference(removedValues)
                    .value();
                var savedPageFilters = column.savedPageFilters.concat(addDisplays);
                column.savedPageFilters = _.chain(savedPageFilters)
                    .uniq()
                    .difference(removedDisplays)
                    .value();
                me._updateHiddenRows();
                me._renderPageFilters();
                $timeout(function () {
                    me._syncScroll();
                    delete me._lockScroll;
                });

                var source = me.scope.source,
                    hiddenRows = me.hiddenRows,
                    showRecords = [];
                _.each(source, function (row, i) {
                    if (!_.contains(hiddenRows, i)) showRecords.push(row);
                });
                me.scope.onFilter({records: showRecords, grid: me});
            };

            GridProto._updateHiddenRows = function () {
                var me = this;
                var scope = me.scope;
                var oldHiddenRows = me.hiddenRows || [];
                var hiddenRows = me.getHiddenRows();
                me.hiddenRows = hiddenRows;
                var addHiddenRows = _.difference(hiddenRows, oldHiddenRows);
                var removeHiddenRows = _.difference(oldHiddenRows, hiddenRows);
                var rows = me.tbody.rows;
                var rowsCount = rows.length;
                var source = scope.source;
                var newCheckedRows;
                _.forEach(addHiddenRows, function (i) {
                    var subRows;
                    if (i < rowsCount) {
                        angular.element(rows[i]).addClass('page-filter-hide');
                        if (scope.treeView) {
                            subRows = me._getTreeSubRows(i);
                            _.forEach(subRows, function (subIndex) {
                                var $tableTree = angular.element(rows[subIndex]).find('.table-tree');
                                var len = $tableTree.length;
                                $tableTree.eq(len - 1).attr('class', 'table-tree').addClass('is-join-line');
                                $tableTree.eq(len - 2).attr('class', 'table-tree');
                            });
                        }
                    }
                });
                newCheckedRows = _.difference(scope.checkedRows, _.map(addHiddenRows, function (i) {
                    return source[i];
                }));
                if (_.isArray(scope.$checkedRows)) {
                    scope.$checkedRows = newCheckedRows;
                }
                scope.checkedRows = newCheckedRows;
                _.forEach(removeHiddenRows, function (i) {
                    var subRows;
                    if (i < rowsCount) {
                        angular.element(rows[i]).removeClass('page-filter-hide');
                        if (scope.treeView) {
                            subRows = me._getTreeSubRows(i);
                            _.forEach(subRows, function (subIndex) {
                                var $tableTree = angular.element(rows[subIndex]).find('.table-tree');
                                var len = $tableTree.length;
                                var subRowTreeInfo = me.treeInfo[subIndex];
                                $tableTree.eq(len - 1).attr('class', 'table-tree' + (subRowTreeInfo.isLast ? ' is-last' : ''));
                                $tableTree.eq(len - 2).attr('class', 'table-tree').addClass('is-middle');
                            });
                        }
                    }
                });
                if (scope.lazy === 'true') {
                    me._scrollRenderNextLazyPage();
                }
            };

            GridProto.getHiddenRows = function () {
                var me = this;
                var columns = me.columns;
                var hiddenRows = _.chain(columns)
                    .map(function (column) {
                        return column.hiddenRows || [];
                    })
                    .flatten(true)
                    .uniq()
                    .value();
                return hiddenRows;
            };

            GridProto._getIndex = function (rowIndex) {
                var me = this;
                var scope = me.scope;
                var dataSource = me.scope.dataSource;
                var currentPage = dataSource.currentPage;
                var pageSize = dataSource.pageSize;
                var rowTreeInfo;
                if (!angular.isNumber(rowIndex)) {
                    rowIndex = parseInt(rowIndex);
                }
                if (!scope.treeView || !scope.treeAsync) {
                    return currentPage && pageSize
                        ? pageSize * (currentPage - 1) + rowIndex + 1
                        : rowIndex + 1;
                }
                rowTreeInfo = me._getRowTreeInfo(rowIndex);
                if (rowTreeInfo.level === 0) {
                    return currentPage && pageSize
                        ? pageSize * (currentPage - 1) + rowTreeInfo.levelIndex + 1
                        : rowTreeInfo.levelIndex + 1;
                }
                return _.map(rowTreeInfo.parentsTreeInfo, function (parentTreeInfo) {
                    if (parentTreeInfo.level === 0) {
                        return pageSize * (currentPage - 1) + parentTreeInfo.levelIndex + 1;
                    }
                    return parentTreeInfo.levelIndex + 1;
                })
                    .concat(rowTreeInfo.levelIndex + 1)
                    .join('-');
            };

            GridProto._getCompiledRowTmpl = function () {
                var me = this;
                if (!me.compiledRowTmpl) {
                    me.compiledRowTmpl = artTmpl.compile(me._getRowTmpl());
                }
                return me.compiledRowTmpl;
            };

            GridProto._getCompiledTableTmpl = function () {
                var me = this;
                if (!me.compiledTableTmpl) {
                    me.compiledTableTmpl = artTmpl.compile('{{each source as record rowIndex}}' + me._getRowTmpl() + '{{/each}}');
                }
                return me.compiledTableTmpl;
            };

            GridProto._registerHelpers = function () {
                var me = this,
                    columns;
                if (me.doneRegisterHelpers !== true) {
                    columns = me.columns;
                    _.chain(columns)
                        .map(_.property('data'))
                        .filter(_.negate(_.isEmpty))
                        .map(function (data) {
                            var firstVLPos = data.indexOf('|'),
                                filterString;
                            if (firstVLPos !== -1) {
                                filterString = data.substring(firstVLPos);
                                return filterString.match(/\|\s*[\$_\w\d]+/g);
                            }
                        })
                        .filter(_.negate(_.isEmpty))
                        .flatten()
                        .map(function (x) {
                            return $.trim(x.substring(1));
                        })
                        .each(function (helperName) {
                            artTmpl.helper(helperName, function () {
                                return $filter(helperName).apply($window, arguments);
                            });
                        });
                    me.doneRegisterHelpers = true;
                }
            };

            GridProto._syncRows = function (newSource, oldSource) {
                if (_.isUndefined(newSource)) return;
                var me = this,
                    tbody = me.tbody,
                    trs = tbody.rows,
                    $rows = me.element.find('table.table-body tr'),
                    added = Arrays.subtract(newSource, oldSource),
                    removed = Arrays.subtract(oldSource, newSource),
                    balanceCount = added.length - removed.length,
                    minRowIndex = $rows.length,
                    rowIndex, row, $newRow;
                angular.forEach(removed, function (r) {
                    rowIndex = Arrays.indexOf(oldSource, r);
                    Arrays.remove(oldSource, r);
                    row = trs[rowIndex];
                    row.parentNode.removeChild(row);
                    minRowIndex = Math.min(minRowIndex, rowIndex);
                });
                angular.forEach(added, function (r) {
                    rowIndex = Arrays.indexOf(newSource, r);
                    $newRow = angular.element(tbody.insertRow(rowIndex));
                    $newRow.replaceWith(me._getCompiledRowTmpl()({
                        record: r,
                        rowIndex: rowIndex,
                        grid: me
                    }));
                    var rowScope = me._getRowScope(rowIndex, r);
                    $compile(trs[rowIndex])(rowScope);
                    minRowIndex = Math.min(minRowIndex, rowIndex);
                });
                me._keepLazyViewLength(balanceCount);
                me._refreshRows(minRowIndex);
            };

            GridProto._keepLazyViewLength = function (balanceCount) {
                var me = this,
                    scope = me.scope,
                    $renderedRows, renderedCount;
                if (scope.lazy === 'true') {
                    if (balanceCount > 0) {
                        $renderedRows = me.element.find('div.grid-body tr');
                        renderedCount = $renderedRows.length;
                        $renderedRows.slice(renderedCount - balanceCount, renderedCount).remove();
                    } else {
                        var nextPage = me._getLazyNextPage(),
                            limit = nextPage * me._getLazyPageSize(),
                            rowDatas = scope.source.slice(limit + balanceCount, limit);
                        me._appendRowsAndStates(rowDatas);
                    }
                }
            };

            /**
             * 将指定<b>位置</b>或<b>数据对象</b>的行移动到指定位置， 默认移动到第一行
             *
             * @param rowDataOrIndex [Object/Number] 行数据或在`source`中的位置
             * @param [index=0] 移动到第几行， 默认移动到第一行
             */
            GridProto.moveRowTo = function (rowDataOrIndex, index) {
                var me = this,
                    scope = me.scope,
                    source = scope.source,
                    tbody = me.tbody,
                    trs = tbody.rows,
                    fromIndex = angular.isNumber(rowDataOrIndex) ? rowDataOrIndex : _.indexOf(source, rowDataOrIndex),
                    toIndex = angular.isNumber(index) ? index : 0,
                    rowData, fromTr, toTr;
                if (fromIndex >= 0 && toIndex >= 0 && (fromIndex !== toIndex)) {
                    if (_.has(me.$$modifiedRecords, fromIndex)) {
                        me.$$modifiedRecords[toIndex] = me.$$modifiedRecords[fromIndex];
                        delete me.$$modifiedRecords[fromIndex];
                    }
                    if (_.has(me.$$modifiedRecords, toIndex)) {
                        me.$$modifiedRecords[toIndex + 1] = me.$$modifiedRecords[toIndex];
                        delete me.$$modifiedRecords[toIndex];
                    }

                    rowData = source[fromIndex];
                    source.splice(fromIndex, 1);
                    source.splice(toIndex, 0, rowData);

                    fromTr = trs[fromIndex];
                    toTr = trs[toIndex];
                    if (fromTr && toTr) {
                        if (fromIndex < toIndex) {
                            $(toTr).after(fromTr);
                        } else {
                            $(toTr).before(fromTr);
                        }
                        me._refreshRows(Math.min(fromIndex, toIndex), Math.max(fromIndex, toIndex) + 1);
                    } else if (scope.lazy === 'true' && (fromTr || toTr)) {
                        if (fromTr && !toTr) {
                            tbody.removeChild(fromTr);
                            me._keepLazyViewLength(-1);
                        } else {
                            tbody.insertRow(index);
                            $(trs[index]).replaceWith(me._getCompiledRowTmpl()({
                                rowIndex: fromIndex,
                                record: rowData,
                                grid: me,
                                enableEvenClass: scope.enableEvenClass
                            }));
                            $compile(trs[index])(scope);
                            me._keepLazyViewLength(1);
                        }
                        me._refreshRows(Math.min(fromIndex, toIndex), trs.length);
                    }
                }
            };

            GridProto._refreshRows = function (start, end) {
                var me = this,
                    scope = me.scope,
                    gridOuterScope = scope.$parent,
                    trs = Array.prototype.slice.apply(me.tbody.rows, arguments),
                    ending = end || scope.source.length,
                    range = _.range(start, ending);
                if (start >= 0 && start < ending) {
                    angular.forEach(trs, function (index, tr) {
                        angular.element(tr).toggleClass('table-body-tr-even', tr.rowIndex % 2 === 1);
                    });
                    gridOuterScope.$broadcast(CONSTANTS.REFRESH_ROWS, range);
                }
            };

            GridProto._getLazyPageSize = function () {
                var me = this;
                return _.result(me, '_lazyPageSize', function () {
                    var height = me.element.height();
                    return me._lazyPageSize = Math.ceil(height / 21);
                });
            };

            GridProto._getLazyNextPage = function () {
                if (_.isNumber(this._lazyPage)) {
                    return (this._lazyPage + 1);
                }
                return 0;
            };

            GridProto._getLazyPageData = function (page, pageSize) {
                var me = this,
                    source = me.scope.source,
                    start = page * pageSize,
                    end;
                if (start >= source.length) {
                    return [];
                } else {
                    end = Math.min(source.length, start + pageSize);
                    return source.slice(start, end);
                }
            };

            GridProto._renderNextLazyPage = function () {
                var me = this,
                    page = me._getLazyNextPage(),
                    pageSize = me._getLazyPageSize(),
                    pageData = me._getLazyPageData(page, pageSize),
                    hasNextPage = !_.isEmpty(pageData);
                if (hasNextPage) {
                    me._lazyPage = page;
                    me._appendRowsAndStates(pageData);
                }
                return [];
            };

            GridProto._scrollRenderNextLazyPage = function () {
                var me = this;
                var st = me.$gridBody.scrollTop(),
                    gridbodyHeight = me._getGridBodyHeight(),
                    loadedHeight = $(me.tbody).height(),
                    offset = 50;
                if (loadedHeight < st + gridbodyHeight + offset) {
                    me._renderNextLazyPage();
                }
            };

            GridProto._appendRowsAndStates = function (rowDatas) {
                var me = this,
                    scope = me.scope,
                    outerScope = scope.$parent,
                    $tbody = me.element.find('div.grid-body .table-body tbody'),
                    firstRowIndex = _.indexOf(me.scope.source, rowDatas[0]),
                    rowIndexRange = _.range(firstRowIndex, firstRowIndex + me._getLazyPageSize()),
                    rowsSelector = firstRowIndex === 0 ? 'tr' : 'tr:gt(' + (firstRowIndex - 2) + ')',
                    $rows;
                $tbody.append(_.chain(rowDatas)
                    .map(function (record, index) {
                        return {
                            rowIndex: rowIndexRange[index],
                            record: record,
                            grid: me,
                            enableEvenClass: scope.enableEvenClass
                        };
                    })
                    .map(me._getCompiledRowTmpl())
                    .value()
                    .join(''));
                $rows = $tbody.children(rowsSelector);
                $compile($rows)(me.scope);
                if (!outerScope.$$phase && !outerScope.$root.$$phase) {
                    outerScope.$digest();
                }
            };

            GridProto._getColumnIndex = function (cellIndexOrDom) {
                var cellIndex;
                if (angular.isNumber(cellIndexOrDom)) {
                    cellIndex = cellIndexOrDom;
                } else {
                    cellIndex = angular.element(cellIndexOrDom)[0].cellIndex;
                }
                cellIndex = this.hasCheckbox ? (cellIndex - 1) : cellIndex;
                cellIndex = this.hasIndex ? (cellIndex - 1) : cellIndex;
                return cellIndex;
            };

            GridProto._getTableBodyScope = function () {
                var me = this,
                    scope = me.scope,
                    gridOuterScope = scope.$parent,
                    formName = me.formName;
                if (!me.__tableBodyScope) {
                    me.__tableBodyScope = gridOuterScope.$new(false);
                    me.__tableBodyScope.grid = me;
                    if (formName) {
                        me.__tableBodyScope[formName] = scope[formName];
                    }
                }
                return me.__tableBodyScope;
            };

            GridProto._destroyTableBodyScope = function () {
                if (this.__tableBodyScope) {
                    this.__tableBodyScope.$destroy();
                    delete this.__tableBodyScope;
                }
            };

            /**
             *
             * @param recordIndex
             * @param [record]
             * @returns {void|*}
             */
            GridProto._getRowScope = function (recordIndex, record) {
                var me = this;
                var tableBodyScope = this._getTableBodyScope();
                return tableBodyScope;
                if (me._isLazy()) {
                    var newRowScope = tableBodyScope.$new(false);
                    newRowScope.rowIndex = recordIndex;
                    newRowScope.row = record || me.scope.source[recordIndex];
                    return newRowScope;
                } else {
                    return tableBodyScope;
                }
            };

            GridProto._render = function () {
                var me = this,
                    scope = me.scope,
                    oldTbody = me.element.find('table.table-body tbody'),
                    tbody, editingRow, $editingRow;

                if (angular.isNumber(this.__editingRowIndex)) {
                    editingRow = me.tbody.rows[me.__editingRowIndex];
                    $editingRow = $(editingRow);
                    if ($editingRow.attr('editing')) {
                        $editingRow.removeAttr('editing');
                        me.$tableBodyClone.append(editingRow);
                    } else {
                        me._resetEditorRow();
                    }
                    delete me.__editingRowIndex;
                }
                if (me._editorRowReady) {
                    me.$tableBodyClone.find('[ng-model]').data('$dataSource', me.scope.source);
                }

                // 销毁原来的 tbody 编译的scope， 防止内存溢出
                me._destroyTableBodyScope();

                oldTbody.replaceWith('<tbody></tbody>').data('$gDataGridController', me);
                tbody = me.tbody = me.element.find('table.table-body tbody')[0];

                if (scope.lazy === 'true') {
                    delete me._lazyPage;
                    me._renderNextLazyPage();
                    me._renderNextLazyPage();
                } else {
                    $(tbody).html(me._getCompiledTableTmpl()(scope));
                    var tableBodyScope = me._getTableBodyScope();
                    $compile(tbody)(tableBodyScope);
                }

                if (!_(me.$$modifiedRecords).isEmpty()) {
                    _(me.$$modifiedRecords).forEach(function (v, k) {
                        me._reRenderRow(k);
                    });
                }

                setTimeout(function () {
                    if (me.scope.grid.hookAfterRender && _.isFunction(me.scope.grid.hookAfterRender)) {
                        me.scope.grid.hookAfterRender(me.scope);
                    }
                }, 200);

                //重载数据里添加对拖选功能支持
                if (me.scope.dragCheck === "true") {
                    me.element.find('table.table-body tbody').on("mouseover", 'tr', function ($event) {
                        var target = $event.target;
                        var $target = $(target);
                        if (
                            me.scope.isMouseDown === true &&
                            (!($target.hasClass('fi') || $target.hasClass('expand-toggle')) && ($target.closest('.grid-col-checkbox').length || $target.closest('.grid-col-index').length))
                        ) {
                            var rowIndex,
                                rowIndex = $target.closest('tr')[0].rowIndex;
                            me.scope.endIndex = rowIndex;
                            me._toggleDragChecked($event, me.scope.startIndex, me.scope.endIndex);
                        }
                    });
                }

                me._reset();
                var $scrollSpace = me.$headRow.find('th.table-scroll-space');
                var $scrollSpaceFoot;
                if (me.hasFooter) $scrollSpaceFoot = me.$footerRow.find('th.table-scroll-space');
                if (me._hasHorizontalScroll()) {
                    $scrollSpace.show();
                    if (me.hasFooter) $scrollSpaceFoot.show();
                } else {
                    $scrollSpace.hide();
                    if (me.hasFooter) $scrollSpaceFoot.hide();
                }
                me._syncScroll();
                $($window).resize();

                if (scope.onGridRender) scope.onGridRender({grid: me});
            };

            GridProto._restColSettingsBtn = function () {
                var me = this,
                    scope = me.scope,
                    btnColIndex = 0,
                    headers;
                if (!!scope.colSettingsKey) {
                    if (!me.$setBtns) {
                        me.$setBtns = $('<div class="set-btns"><i data-col-settings class="iconfont2 fi-set set-btn" ng-click="grid._startSetting($event)"></i> <i data-col-settings class="fi fi-refresh-small set-btn" ng-click="grid._freshFilter($event, false, null, true);" ng-if="grid.hasColumnFilter"></i></div>');
                    }
                    if (me.firstHeadCell) {
                        angular.element(me.firstHeadCell).append(me.$setBtns);
                        return;
                    }
                    if (me.hasIndex) btnColIndex++;
                    if (me.hasCheckbox) btnColIndex++;
                    headers = me.$headRow.children('th');
                    angular.element(headers.eq(btnColIndex)).append(me.$setBtns);
                    $compile(me.$setBtns)(scope);
                }
            };

            //校验布局对象
            GridProto.validLayout = function (data) {
                var laytout, i, len;
                if (!angular.isObject(data)) return false;
                if (!angular.isObject(data.content)) return false;
                laytout = data.content.layout;
                if (!angular.isArray(laytout)) return false;
                for (i = 0, len = laytout.length; i < len; i++) {
                    if (!angular.isObject(laytout[i])) return false;
                    if (typeof laytout[i]['field'] != 'string') return false;
                    if (!laytout[i]['width']) return false;
                }
                return true;
            };

            //加载布局并渲染
            GridProto.loadLocalStorageLayout = function () {
                var me = this,
                    scope = me.scope,
                    layout = LocalStorages.get(scope.colSettingsKeyWithName || scope.colSettingsKey);
                return layout;
            };

            //保存布局
            GridProto.storeLocalStorageLayout = function (layout) {
                var version,
                    me = this,
                    scope = me.scope;
                if (!!scope.colSettingsKey && angular.isObject(layout)) {
                    version = layout.version ? (layout.version + 1) : new Date().getTime;
                    layout.version = version;
                    LocalStorages.set(scope.colSettingsKeyWithName || scope.colSettingsKey, layout);
                }
            };

            GridProto._enterCols = function (cols) {
                var me = this,
                    scope = me.scope;
                if (!cols) cols = me.columns;
                _.forEach(me.hiddenColumns, function (hiddenColumn) {
                    if (!_.contains(cols, hiddenColumn)) {
                        cols.push(hiddenColumn);
                    }
                });
                me.finishEdit(true);
                me._resetEditorRow();
                me._storeColumns(cols);
                me._renderHeaders();
                me._renderFooters();
                me._renderPageFilters();
                me._reSortBody();
                me._restColSettingsBtn();
                me._restAllTmpl();
                me._registerHelpers();
                me._renderCellsStyle();
                me._resetPageFilters();
                if (!(scope.$$phase || scope.$root.$$phase)) {
                    scope.$apply(function () {
                        me._render();
                    });
                } else {
                    me._render();
                }
            };

            GridProto._reSortBody = function () {
                var me = this,
                    totalWidth = 0,
                    allColWidths = me._getVisibleColWidths(),
                    gridHeadChild = angular.element(me.element.find("div.grid-head").children()[0]),
                    gridBodyChild = angular.element(me.element.find("div.grid-body").children()[0]),
                    gridHeadHeight = gridHeadChild.height(),
                    $ths = gridHeadChild.find("th");
                angular.forEach(allColWidths, function (width) {
                    totalWidth = totalWidth + Number(width);
                });
                gridBodyChild.width(totalWidth - 22);
                gridBodyChild.css("min-height", 1);
                // 针对列头添加<br>标签的特殊处理
                if (gridHeadHeight > 0 && $ths.find("br").length > 0) {
                    if (gridHeadChild.find(".grid-col-checkbox").length > 0) {
                        gridHeadHeight = gridHeadHeight - 4;
                    }
                    angular.forEach($ths, function (th) {
                        if ($(th).attr("style") == "" || $(th).attr("style") == undefined || $(th).attr("style").indexOf("height") < 0) {
                            if ($(th).hasClass("grid-col-checkbox")) {
                                $(th).css("height", (gridHeadHeight + 4) + "px");
                                $(th).find("div").removeAttr("style").css("margin-top", (gridHeadHeight - 18) / 2 + "px");
                            } else if ($(th).find("br").length == 0) {
                                $(th).css("line-height", gridHeadHeight + "px");
                            }
                        }
                    });
                }
            };

            GridProto._loadAndReSortHeadersIfStored = function () {
                var me = this;
                if (me.scope.colSettingsKey) {
                    if (_(me.layoutSetting).isEmpty()) {
                        me.layoutSetting = _(me.__originalCols).map(function (col) {
                            return {
                                field: col.columnName
                            };
                        });
                    }
                }
                if (!_(me.layoutSetting).isEmpty()) {
                    me.columns = _(me.layoutSetting).map(function (colSetting) {
                        return me._findColByField(colSetting.field);
                    });
                } else {
                    me.columns = me.__originalCols;
                }
                me.columns = _.without(me.columns, void 0);

                _(me.hiddenColumns).forEach(function (hiddenColumn) {
                    if (!_(me.columns).contains(hiddenColumn)) {
                        me.columns.push(hiddenColumn);
                    }
                });
            };

            GridProto._findColByField = function (field) {
                var me = this, columns;
                columns = _(me.__originalCols).filter(function (col) {
                    return col.columnName === field;
                });
                return columns[0];
            };


            GridProto._getColSettings = function () {
                var me = this;
                return me.layoutSetting;
            };

            GridProto._storeColumns = function (cols) {
                var me = this;
                if (_.isUndefined(me.__originalCols)) {
                    me.__originalCols = me.columns;
                }
                me.columns = cols;

                me.layoutSetting = _(cols).map(function (col) {
                    var field = col.columnName, group, width;
                    width = col.width;
                    group = col.group;
                    return {
                        field: field,
                        group: group,
                        width: width
                    };
                });
            };

            GridProto._restAllTmpl = function () {
                delete this.rowTmpl;
                delete this.compiledRowTmpl;
                delete this.compiledTableTmpl;
                delete this.doneRegisterHelpers;
            };

            GridProto._startSetting = function ($event) {
                var me = this, menuElement;
                if (ColSettings.get) {
                    ColSettings.get()._startSetting(me);
                } else {
                    ColSettings._startSetting(me);
                }
                menuElement = angular.element('#dropdownMenu_' + me.scope.colSettingsKey);
                menuElement.removeClass("open");
                $event.stopPropagation();
            };

            GridProto.doLayout = function (autoSetWidthHeight) {
                var me = this,
                    document = $document[0],
                    documentElement = document.documentElement,
                    body = document.body,
                    bodyWidth = documentElement.clientWidth || body.clientWidth,
                    bodyHeight = documentElement.clientHeight || body.clientHeight,
                    attrs = me.attrs;
                if (!autoSetWidthHeight) {
                    if (attrs.gTop && attrs.gBottom) {
                        me.element.css("height", bodyHeight - attrs.gTop - attrs.gBottom);
                    }
                } else if (attrs.gBottom) {
                    me.element.css("height", bodyHeight - (me.element[0].getBoundingClientRect().top || attrs.gTop) - attrs.gBottom);
                }
                if (attrs.gLeft && attrs.gRight) {
                    me.element.css("width", bodyWidth - attrs.gLeft - attrs.gRight);
                }
            };

            //布局功能
            GridProto.storeLayout = function (layout) {
                var me = this, layoutSetting, content;
                if (layout && !_(layout.content).isEmpty()) {
                    me.storeLocalStorageLayout(layout);
                    layoutSetting = layout.content;
                    me.layoutSetting = layoutSetting.layout;
                    me.sortName = layoutSetting.sortName;
                    me.sortDirection = layoutSetting.sortDirection;
                } else {
                    // 默认布局
                    content = _(me.__originalCols).map(function (col) {
                        return {field: col.columnName};
                    });
                    me.layoutSetting = content;
                    me.sortName = [];
                    me.sortDirection = [];
                }
            };

            //此处是处理布局修改时,重绘grid
            GridProto.reload = function () {
                var me = this,
                    dataSource = me.scope.dataSource;
                me.$gridBody.scrollLeft(0);
                me._loadAndReSortHeadersIfStored();
                me._restAllTmpl();
                me._registerHelpers();
                me._renderHeaders();
                me._renderFooters();
                me._renderPageFilters();
                me._restColSettingsBtn();
                me._renderCellsStyle();
                me._render();

                if (dataSource) {
                    dataSource.sortName = me.sortName;
                    dataSource.sortDirection = me.sortDirection;
                    if (me.__rendered) {
                        dataSource.doRequestData();
                    }
                } else {
                    $dataSourceManager.getDataSource(me.attrs.sourceName).then(function (dataSource) {
                        dataSource.sortName = me.sortName;
                        dataSource.sortDirection = me.sortDirection;
                        if (me.__rendered) {
                            dataSource.doRequestData();
                        }
                    });
                }
                me.$$modifiedRecords = {};
            };

            GridProto.getLayout = function () {
                var me = this, layout,
                    colSettings = me.layoutSetting;
                colSettings = _(colSettings).filter(function (col) {
                    var column = me._findColByField(col.field);
                    return !(column.hidden || column.noPermit);
                });
                layout = _(colSettings).map(function (colSetting) {
                    var group, width, col;
                    col = me._findColByField(colSetting.field);
                    width = colSetting.width || col.width;
                    group = colSetting.group || col.group;
                    return {
                        field: colSetting.field,
                        width: width,
                        group: group
                    };
                });
                return JSON.stringify({
                    layout: layout,
                    sortName: me.sortName,
                    sortDirection: me.sortDirection
                });
            };

            GridProto._registerLayoutService = function () {
                var me = this, menuDiv,
                    tableId = me.scope.colSettingsKey;
                if (!tableId || tableId === "") {
                    return;
                }
                menuDiv = angular.element('<div data-target="dropdownMenu_' + tableId + '" context-menu="" class="ng-isolate-scope" data-hitarea=".grid-head"></div>');
                me.element.wrap($compile(menuDiv)(me.scope));
                me.scope.menuDiv = menuDiv;
                gridLayoutService.registerLayout(me.scope, me);

                me.$headerBox.on('mousedown', ':input', function (e) {
                    if (e.button === 2) {
                        this.blur();
                        e.preventDefault();
                    }
                });
            };


            //拖选功能
            GridProto._toggleDragChecked = function ($event, startIndex, endIndex) {
                var me = this, _startIndex, _endIndex;
                _startIndex = startIndex > endIndex ? endIndex : startIndex;
                _endIndex = startIndex > endIndex ? startIndex : endIndex;
                for (var i = 0; i < me.tbody.rows.length; i++) {
                    if (i < _startIndex || i > _endIndex) {
                        angular.element(me.tbody.rows[i]).removeClass('checking-row');
                    } else {
                        angular.element(me.tbody.rows[i]).addClass('checking-row');
                    }
                }
            };

            GridProto._toggleChecked = function (index, event) {
                var me, scope, source, checkedRows, rowIndex, row, checked, $checkbox;
                me = this;
                var $row = angular.element(me.tbody.rows[index]);
                $checkbox = $row.find('.form-clickbox');
                if ($checkbox.is('[disabled=disabled]')) return;
                scope = me.scope;
                source = scope.source;
                checkedRows = scope.checkedRows;
                rowIndex = $row[0].rowIndex;
                row = source[rowIndex];
                checked = _.contains(checkedRows, row);

                var onCheck = scope.onCheck;
                var checkParam = {
                    $event: event,
                    record: row,
                    grid: me,
                    $row: $row
                };

                if (checked) {
                    var newCheckedRows = _.filter(checkedRows, function (record) {
                        return !_.isEqual(record, row);
                    });
                    if (_.isArray(scope.$checkedRows)) {
                        scope.$checkedRows = newCheckedRows;
                    }
                    scope.checkedRows = newCheckedRows;
                    $checkbox.toggleClass('selected', false);
                    checkParam.isChecked = false;
                } else {
                    me.scope.checkedRows.push(source[rowIndex]);
                    $checkbox.toggleClass('selected', true);
                    checkParam.isChecked = true;
                }
                me.scope.allChecked = me._isAllRowsChecked();
                me.checkRowByContrl = true;

                if (onCheck) {
                    onCheck(checkParam);
                }
            };

            GridProto._syncScroll = function () {
                var me = this;
                var $grid = me.element;
                var $gridBody = me.$gridBody;
                var $gridBodyContent = $gridBody.children();
                var $gridPageFilters = me.$gridPageFilters;
                var $scrollSpace = me.element.find('th.table-scroll-space');
                var scrollLeft = $grid.scrollLeft();
                var bodyWidth = $gridBody.width();
                var bodyHeight = $gridBody.height();
                var bodyContentWidth = $gridBodyContent.width();
                var bodyContentHeight = $gridBodyContent.height();
                var maxScrollLeft = bodyContentWidth - bodyWidth;
                var hasScrollBar = bodyContentHeight > bodyHeight;
                var isIE = /(MSIE|Trident\/|Edge\/)/i.test(navigator.userAgent);
                if (!hasScrollBar) {
                    $scrollSpace.hide();
                } else {
                    $scrollSpace.show();
                }
                if (maxScrollLeft < 0) {
                    maxScrollLeft = 0;
                }
                if (scrollLeft > maxScrollLeft) {
                    scrollLeft = maxScrollLeft;
                }
                scrollLeft = $grid.scrollLeft();
                if (isIE && $grid[0].scrollWidth > me.$headerBox[0].scrollWidth) {
                    $gridBody
                        .css('left', scrollLeft - 1)
                        .scrollLeft(scrollLeft - 1);
                    return;
                }
                $gridBody
                    .css('left', scrollLeft)
                    .scrollLeft(scrollLeft);
                if ($gridPageFilters) {
                    $gridPageFilters.css({
                        left: scrollLeft
                    });
                }
            };

            GridProto._setGridBodyHeight = function () {
                var me = this;
                var $grid = me.element;
                var $gridBody = me.$gridBody;
                var gHeight = $grid[0].style.height;
                if (gHeight) {
                    $gridBody.css('height', gHeight);
                }
                $grid.on('scroll', function () {
                    if (me._lockScroll) return;
                    me._syncScroll();
                });
                $gridBody.on('scroll', _.throttle(function () {
                    if (me._lockScroll) return;
                    var bodyScrollLeft = $gridBody.scrollLeft();
                    $grid.scrollLeft(bodyScrollLeft);
                    var menuElement = angular.element('#dropdownMenu_' + me.scope.colSettingsKey);
                    menuElement.removeClass("open");
                    /* 控件面板隐藏 */
                    $('.form-dorpdown-menu').hide();
                    $('.form-region').hide();
                    $('.calendar').hide();
                    $('.timepane').hide();
                    $('.form-suggestbox-dropdown').hide();
                    /* 下拉过滤隐藏 */
                }, 100, {trailing: false}));

                function getScrollBarWidth() {
                    var noScroll, scroll, oDiv = document.createElement("DIV");
                    oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
                    noScroll = document.body.appendChild(oDiv).clientWidth;
                    oDiv.style.overflowY = "scroll";
                    scroll = oDiv.clientWidth;
                    document.body.removeChild(oDiv);
                    return noScroll - scroll;
                }

                $('head').append('<style>th.table-scroll-space{width: ' + getScrollBarWidth() + 'px;}</style>');
            };

            GridProto._getGridBodyHeight = function () {
                var me = this;
                if (!me.gridbodyHeight) {
                    me.gridbodyHeight = me.$gridBody.height();
                }
                return me.gridbodyHeight;
            };

            GridProto._clearFilter = function ($event, notReload, callback) {
                this._freshFilter($event, notReload, callback);
            };

            GridProto._freshFilter = function ($event, notReload, callback, resetPageFilters) {
                var me = this;
                delete me.scope.filter;
                me.notReload = true;
                setTimeout(function () {
                    me.notReload = true;
                    me.scope.filter = {};
                    if (resetPageFilters) {
                        me._resetPageFilters();
                    }
                    if (!notReload) {
                        me.reload();
                    }
                    if (callback) {
                        callback();
                    }
                }, 0);
                if ($event) {
                    $event.stopPropagation();
                }
            };

            GridProto._resetPageFilters = function () {
                var me = this;
                var columns = me.__originalCols || me.columns;
                delete me.hiddenRows;
                _.forEach(columns, function (column) {
                    delete column.displays;
                    delete column.uniqDisplays;
                    delete column.values;
                    delete column.hiddenRows;
                    delete column.pageFilters;
                    delete column.pageFiltersValues;
                });
            };

            GridProto._changePage = function () {
                var me = this;
                me._resetPageFilters();
                me._applySavedPageFiltersValues();
                me.$gridBody.scrollTop(0);
            };

            GridProto._applySavedPageFiltersValues = function () {
                var me = this;
                var columns = me.columns;
                _.forEach(columns, function (column) {
                    me._applyColumnSavedPageFiltersValues(column);
                });
                var hiddenRowsIndex = me.getHiddenRows();
                me.hiddenRows = hiddenRowsIndex;
            };

            GridProto._applyColumnSavedPageFiltersValues = function (column) {
                if (!column.savedPageFiltersValues) {
                    return;
                }
                var me = this;
                var source = me.scope.source;
                var savedPageFiltersValues = column.savedPageFiltersValues;
                var field = column.field;
                var hiddenRowsIndex = [];
                _.forEach(source, function (record, index) {
                    var value = record[field];
                    if (!_.contains(savedPageFiltersValues, value)) {
                        hiddenRowsIndex.push(index);
                    }
                });
                column.hiddenRows = hiddenRowsIndex;
            };

            GridProto._bindAddRowKey = function () {
                var me = this;
                var element = me.element;
                var scope = me.scope;
                element.addClass('grid-keydown-new-row');
                element.on('keydown', function (e) {
                    var keyCode = e.keyCode;
                    var activeElement = document.activeElement;
                    var $lastTr = $(me.tbody).find('tr').last();
                    if (keyCode === 40 && $lastTr.find(activeElement).length) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (scope.hasNewRowFunc) {
                            scope.newRowFunc({
                                grid: me,
                                source: scope.source
                            });
                        } else {
                            me.addRow();
                        }
                    }
                });
            };

            GridProto.getMessenger = function () {
                var scope = this.scope;
                var messenger = "tooltipMessenger";
                if (config && config.controls && config.controls.validation && config.controls.validation.messenger)
                    messenger = config.controls.validation.messenger;
                return angular.element(document).injector().get(messenger);
            };

            GridProto.verifySourceRequires = function () {
                var me = this,
                    columns = me.columns,
                    source = me.scope.source,
                    gValidator = me.gValidatorController,
                    rejected = false,
                    deferred = $q.defer();

                if (!gValidator) return;
                me.clearSourceRequireErrors();
                ValidationHolder.loadRules(gValidator.$currentGroupName, function (rules) {
                    var requires = [];
                    $.extend(true, requires, _(rules).filter({ruleName: 'require'}));
                    _(requires).each(function (x) {
                        var lastDotIdx = x.property.lastIndexOf('.');
                        if (lastDotIdx !== -1) {
                            x.property = x.property.substr(lastDotIdx + 1);
                        }
                    });
                    var errors = [];
                    var messenger = me.getMessenger();
                    for (var i = 0, sourceLen = source.length; i < sourceLen; i++) {
                        var record = source[i];
                        for (var j = 0, requiresLen = requires.length; j < requiresLen; j++) {
                            var require = requires[j];
                            var prop = require.property;
                            var messageKey = require.message;
                            if (!_.require(record[prop])) {
                                var colIndex = _.findIndex(columns, function (column) {
                                    "use strict";
                                    return column.field === prop && !column.hide && !column.noPermit;
                                });
                                if (colIndex >= 0) {
                                    var cell = me._findCell(i, colIndex);
                                    var $cell = angular.element(cell);
                                    ValidationHolder.loadI18ns(gValidator.$currentGroupName, function (i18ns) {
                                        messenger.handle({
                                            $verifyTarget: $cell,
                                            $outerContainer: $cell,
                                            ruleName: 'require',
                                            message: i18ns[messageKey],
                                            isValid: false
                                        });
                                        errors.push(i18ns[messageKey]);
                                    }, me.scope.validatorConfigKey);
                                    me.$$requireGridValid = false;
                                    if (rejected === false) {
                                        // deferred.reject();
                                        rejected = true;
                                    }
                                }
                            }
                        }
                    }
                    if (rejected === false) {
                        deferred.resolve();
                    } else {
                        deferred.reject(errors);
                    }
                }, me.scope.validatorConfigKey);
                return deferred.promise;
            };

            GridProto.clearSourceRequireErrors = function () {
                var me = this;
                $('td.high-light-border', this.tbody).each(function () {
                    var $cell = angular.element(this);
                    me.getMessenger().clear($cell);
                });
            };

            GridProto._findCell = function (rowIndex, colIndex) {
                var me = this,
                    row = me.tbody.rows[rowIndex],
                    hasCheckbox = me.hasCheckbox,
                    hasIndex = me.hasIndex,
                    cellIdx = colIndex;
                if (hasCheckbox) {
                    cellIdx += 1;
                }
                if (hasIndex) {
                    cellIdx += 1;
                }
                return row.cells[cellIdx];
            };

            GridProto._trackColumn = function (index) {
                var me = this;
                return String(me.scope.dataSource.currentPage) + '_' + String(index);
            };

            GridProto._addHiddenColumns = function (column) {
                var me = this;
                if (!me.hiddenColumns) {
                    me.hiddenColumns = [];
                }
                me.hiddenColumns.push(column);
            };

            GridProto._isNullFilters = function (filters) {
                if (!filters) {
                    return true;
                }
                var values = _.chain(filters)
                    .values()
                    .compact()
                    .value();
                return !values.length;
            };

            GridProto._renderLayout = function () {
                var me = this;
                var scope = me.scope;
                if (me._layoutRendered) {
                    return;
                }
                me._layoutRendered = true;
                var element = me.element;
                var $gridBody = element.find('div.grid-body');
                me._registerHeaderDraggable();
                me._registerHeaderResort();
                me._registerHelpers();
                if (scope.keydownNewRow) {
                    me._bindAddRowKey();
                }
                me.doLayout();

                me._firstFilterChange = true;
                //监听筛选器
                scope.$watch('filter', function (newFilters, oldFilters) {
                    var dataSource = scope.dataSource,
                        params = {
                            filterName: [],
                            filterValue: []
                        };
                    if (dataSource) {
                        _.each(newFilters, function (filterVal, filterName) {
                            if (filterVal === 0 || !!filterVal) {
                                params.filterName.push(filterName);
                                params.filterValue.push(filterVal);
                            }
                        });
                        scope.dataSource.extraParams = _.extendOwn(params, _.omit(dataSource.extraParams, 'filterName', 'filterValue'));
                        if (me.notReload) {
                            delete me.notReload;
                            return;
                        }
                        if (!dataSource.allowAutoLoad && !me._firstFilterChange) {
                            if (!(me._isNullFilters(newFilters) && me._isNullFilters(oldFilters))) {
                                dataSource.doRequestData();
                                me.$$modifiedRecords = {};
                            }
                        }
                    }
                    delete me._firstFilterChange;
                }, true);

                //设置拖选功能事件
                scope.dragSelected = [];
                scope.isMouseDown = false;
                scope.startIndex = 0;
                scope.endIndex = 0;

                if (scope.dragCheck === "true") {
                    scope.dragStyle = {"cursor": "s-resize"};
                    $gridBody.on("mousedown", function ($event) {
                        var target = $event.target;
                        var $target = $(target);
                        scope.isMouseDown = false;
                        if (!($target.hasClass('fi') || $target.hasClass('expand-toggle')) && ($target.closest('.grid-col-checkbox').length || $target.closest('.grid-col-index').length)) {
                            scope.isMouseDown = true;
                            var rowIndex = $target.closest('tr')[0].rowIndex;
                            scope.startIndex = scope.endIndex = rowIndex;
                            me._toggleDragChecked($event, scope.startIndex, scope.endIndex);
                            return false;
                        }
                    });
                    $gridBody.on('mousemove', function () {
                        if (scope.isMouseDown) {
                            scope.isMouseMove = true;
                        }
                    });
                    $document.on("mouseup.dragcheck" + me.hash, function (event) {
                        var _startIndex = scope.startIndex > scope.endIndex ? scope.endIndex : scope.startIndex,
                            _endIndex = scope.startIndex > scope.endIndex ? scope.startIndex : scope.endIndex;
                        if (scope.isMouseDown && scope.isMouseMove) {
                            for (var i = _startIndex; i <= _endIndex; i++) {
                                if (me._isHiddenRow(i)) {
                                    continue;
                                }
                                scope.dragSelected.push(i);
                                me._toggleChecked(i, event);
                            }
                        }
                        scope.startIndex = scope.endIndex = 0;
                        scope.isMouseDown = false;
                        scope.isMouseMove = false;
                        me._updateSelectedRow();
                        me._clearDragSelectClass();
                    });
                }

                $document.on('click.hideDropFilter' + me.hash, function () {
                    $('.drop-filter-list').hide();
                });

                scope.headClick = function ($event) {
                    me._headClick($event);
                };

                scope.bodyClick = function ($event) {
                    var target = $event.target || $event.srcElement,
                        $target = angular.element(target),
                        $cell = $target.closest('td'),
                        $row = $cell.closest('tr'),
                        row = $row[0], rowIndex;

                    /*
                     * 显示模板为checkbox或radio时，点击控件会直接修改值，值的改变会直接变更数据源对应值，导致无法获取变更数据
                     * 处理方式：切换行编辑状态时直接把当前记录置为已修改
                     */
                    if (target.tagName == "INPUT" && (target.type == "checkbox" || target.type == "radio")) {
                        angular.element($row).addClass('-grid-row-modified');
                    }
                    if (row) {
                        rowIndex = row.rowIndex;
                    }
                    if ($target.is('a.fi') && $target.closest('td').is('.grid-col-checkbox')) {
                        me._toggleCellChecked($event);
                    }
                    if (scope.treeView && $target.is('.expand-toggle')) {
                        me._toggleTreeExpand(rowIndex);
                    }
                    if ($row.length === 1) {
                        me._rowClick($event, $row);
                    }
                };

                scope.bodyDbClick = function ($event) {
                    var target = $event.target || $event.srcElement,
                        $target = angular.element(target),
                        $cell = $target.closest('td'),
                        $row = $cell.closest('tr');
                    me._rowDbClick($event, $row);
                    me._cellDbClick($event, $cell);
                };

                // 实现 grid选中行双向绑定 start
                scope.$watch('selectedRow', function (newRow, oldRow) {
                    me._updateSelectedRow(newRow, oldRow);
                });

                scope.$watch('checkedRows', function () {
                    var $trs = $(me.tbody).find('tr');
                    $trs.each(function (index, tr) {
                        var $tr = $(tr);
                        if (me._isChecked(me._getRowRecord(index))) {
                            $tr.addClass('checked-row');
                        } else {
                            $tr.removeClass('checked-row');
                        }
                    });
                }, true);
                // 实现 grid选中行双向绑定 end

                $($window).on('resize.gridResize' + me.hash, _.throttle(function () {
                    me._renderCellsStyle();
                    me.doLayout(true);
                }, 500));

                scope.$on('show', function () {
                    me._renderCellsStyle();
                    me._syncScroll();
                });

                me._firstEnterSource = true;
                scope.$watchCollection('source', function (newSource, oldSource) {
                    me._updateDisabledRows();
                    if (me._firstEnterSource) {
                        oldSource = [];
                        delete me._firstEnterSource;
                    }
                    if (me.changeDataSourced !== true) {
                        me._syncRows(newSource, oldSource);
                    }
                    me.changeDataSourced = false;
                });

                if (scope.lazy === 'true') {
                    element.children('.grid-body').on('scroll', function () {
                        me._scrollRenderNextLazyPage();
                    });
                }
            };

            GridProto._applyLocalStorageLayout = function () {
                var me = this, layout;
                if (me.scope.colSettingsKey && me.scope.colSettingsKey.length > 0) {
                    layout = me.loadLocalStorageLayout();
                    if (me.validLayout(layout)) {
                        me.layoutSetting = layout.content.layout;
                        me.sortName = layout.content.sortName;
                        me.sortDirection = layout.content.sortDirection;
                    }
                }
            };

            GridProto._createEditorRow = function (rowIndex) {
                var me = this;
                if (this._editorRowReady) {
                    me._newEditorRow = false;
                    return;
                }
                me._newEditorRow = true;
                var rowTmpl = me._getCompiledRowTmpl();
                var $tableBodyClone, originNgModel;
                if (!me.$tableBodyClone) {
                    $tableBodyClone = $('<table class="table-body-clone" style="display: none;"></table>');
                    me.$tableBodyClone = $tableBodyClone;
                    me.$gridBody.append($tableBodyClone);
                }
                var record = me.scope.source[rowIndex];
                var rowHtml = rowTmpl({
                    record: record,
                    rowIndex: rowIndex,
                    grid: me
                });
                var $tr = $(rowHtml);
                var tr = $tr[0];
                me.$tableBodyClone.append($tr);

                var columns = me.columns;
                var outerScope = me.scope.$parent;
                var rowScope = getNewerEditingScope();
                me.editorRowScope = rowScope;
                angular.forEach(tr.cells, function (cell) {
                    var $cell = angular.element(cell);
                    var columnIndex = me._getColumnIndex($cell);
                    var column = columns[columnIndex];
                    var $editorPlace = $cell.children('[data-role=editor]');
                    var $displayPlace = $cell.children('[data-role=display]');
                    var columnEditorTmpl = me._getEditorTmpl(column);
                    var $editor;
                    if (columnEditorTmpl) {
                        $editor = angular.element(columnEditorTmpl);
                        if ($editor.length == 1) {
                            originNgModel = $editor.attr('ng-model');
                        } else if ($editor.length > 1) {
                            for (var i = 0; i < $editor.length; i++) {
                                if ($($editor[i]).attr('ng-model')) {
                                    originNgModel = $($editor[i]).attr('ng-model');
                                    break;
                                }
                            }
                        }
                        if (originNgModel) {
                            if (!/^editingRecord\./.test(originNgModel)) {
                                if (/^row\./.test(originNgModel)) {
                                    $editor.attr('ng-model', originNgModel.replace(/^row\./, "editingRecord."));
                                } else {
                                    $editor.attr('ng-model', ("editingRecord." + originNgModel));
                                }
                            }
                        } else {
                            $editor.attr('ng-model', ('editingRecord.' + column.field));
                        }
                        $editor.each(function (i, el) {
                            var $el = $(el);
                            if (!$el.attr('name')) {
                                $el.attr('name', column.field);
                            }
                        });
                        if (me.scope.validatorName) {
                            $editor.attr('g-field-validator', '');
                            $editor.data('$formController', me.formController);
                            $editor.data('$gValidatorController', me.gValidatorController);
                            $editor.data('$dataSource', me.scope.source);
                        }
                        $displayPlace.hide();
                        $editorPlace.append($editor);
                    }
                });
                $compile(tr)(rowScope);
                me._editorRowReady = true;

                function getNewerEditingScope() {
                    var copy = angular.copy(record);
                    var newerScope = outerScope.$new(false);
                    newerScope.row = copy;
                    newerScope.record = copy;
                    newerScope.rowIndex = rowIndex;
                    newerScope.grid = me;
                    newerScope.$editingScope = {};
                    newerScope.source = me.scope.source;
                    newerScope.editingRecord = copy;

                    return newerScope;
                }
            };

            GridProto._updateEditorRowScope = function (rowIndex) {
                var me = this;
                var record = me.scope.source[rowIndex];
                var editorRowScope = me.editorRowScope;
                editorRowScope.row = record;
                editorRowScope.record = record;
                editorRowScope.rowIndex = rowIndex;
                editorRowScope.editingRecord = record;
            };

            GridProto._resetEditorRow = function () {
                var me = this;
                if (me.$tableBodyClone) {
                    me.$tableBodyClone
                        .find('input.form-suggestbox')
                        .each(function (index, input) {
                            var $input = angular.element(input);
                            $.event.remove(input);
                            $.removeData(input);
                            $input.scope().$destroy();
                        });

                    me.$tableBodyClone
                        .find('.form-clickbox')
                        .each(function (index, el) {
                            var $el = angular.element(el);
                            $.event.remove(el);
                            $.removeData(el);
                            var $elScope = $el.scope();
                            if ($elScope) $elScope.$destroy();
                        });

                    me.$tableBodyClone.empty();
                    delete me.$tableBodyClone;
                }
                if (me.gValidatorController) {
                    me.gValidatorController.clearCurrentGroupVerifyFns();
                }
                me._editorRowReady = false;
                delete me.editorRowScope;
            };

            GridProto._isVisibleTagHidden = function (column) {
                var me = this;
                var scope = me.scope;
                var visibleTagsArr = scope.visibleTagsArr;
                if (!column.visibleFor) {
                    return;
                }
                var concat = visibleTagsArr.concat(column.visibleFor);
                var count = concat.length;
                var uniqCount = _.uniq(concat).length;
                return count === uniqCount;
            };

            GridProto._getColumns = function (tElement) {
                var me = this;
                me.funcCellsCount = 0;
                _.forEach(tElement.context.children, function (node, index) {
                    var $node = $(node);
                    switch (node.tagName.toUpperCase()) {
                        case 'G-COLUMN':
                            var data = $.trim($node.attr('data'));
                            var colIdx = index - me.funcCellsCount;
                            var column = {
                                field: getRealField(data),
                                data: formatDataFilters(data),
                                text: getText(node),
                                columnTitle: getColumnTitle($node),
                                widthDef: $node.attr('width'),
                                editable: $node.attr('editable'),
                                tmpl: $node.attr('tmpl'),
                                filter: $node.attr('filter'),
                                filterTmpl: $node.attr('filterTmpl'),
                                alignClass: getAlignClass($node.attr('align')),
                                cellAlignClass: getCellAlignClass($node.attr('cell-align'), $node.attr('align')),
                                disableTitle: $node.attr('disableTitle') === 'true',
                                index: colIdx,
                                sortable: angular.isDefined($node.attr('sortable')),
                                required: angular.isDefined($node.attr('required')),
                                requiredExpr: angular.isDefined($node.attr('required-expr')) ? $parse($node.attr('required-expr'))(me.scope.$parent) : false,
                                hidden: angular.isDefined($node.attr('hidden')),
                                dropFilter: angular.isDefined($node.attr('drop-filter')),
                                colWidthClassName: me._getColWidthClassName(index),
                                onBeforeCellDbclickDef: $node.attr('on-before-cell-dbclick'),
                                onCellDbclickDef: $node.attr('on-cell-dbclick'),
                                columnIdentity: $node.attr('column-identity'),
                                style: $node.attr('style'),
                                visibleFor: getVisibleFor($node),
                                isTreeColumn: !me.treeColumn && angular.isDefined($node.attr('tree-column'))
                            };

                            if ($node.attr("g-item-class")) {
                                column.gItemClass = $parse($node.attr("g-item-class"));
                            }
                            if (column.isTreeColumn) {
                                me.treeColumn = column;
                                column.cellAlignClass = 'left';
                            }
                            column.hasTitleRequired = column.columnTitle.indexOf('require') >= 0;
                            column.columnName = column.field || column.columnIdentity || JSON.stringify(column.columnTitle);
                            if (column.dropFilter) {
                                me.hasDropFilter = true;
                            }
                            if (column.visibleFor) {
                                column.hidden = me._isVisibleTagHidden(column);
                            }
                            setColumnPermit($node, column);
                            _.forEach(node.children, function (child) {
                                switch (child.tagName.toUpperCase()) {
                                    case 'G-COLUMN-EDITOR':
                                        setColumnEditor(child, column);
                                        break;
                                    case 'G-COLUMN-TMPL':
                                        setColumnTmpl(child, column);
                                        break;
                                    case 'G-COLUMN-FILTER':
                                        setColumnFilter(child, column);
                                        break;
                                    default:
                                        break;
                                }
                            });
                            column.canEdit = !!(column.field && (column.editable || column.editorTmpl));
                            if (column.hidden) {
                                me._addHiddenColumns(column);
                            }
                            me._addColumn(column);
                            break;
                        case 'G-INDEX-COLUMN':
                            me.hasIndex = true;
                            me.indexColumn = {
                                title: $node.attr('title') || '',
                                width: parseInt($node.attr('width')) || 0
                            };
                            me.indexColumnIdx = me.hasCheckbox ? 1 : 0;
                            me.funcCellsCount++;
                            break;
                        case 'G-CHECKBOX-COLUMN':
                            me.checkboxesDisabledExpress = $node.attr('g-item-disabled');
                            me.hasCheckbox = true;
                            me.checkboxColumnIdx = me.hasIndex ? 1 : 0;
                            me.funcCellsCount++;
                            me.checkboxColumn = {
                                width: parseInt($node.attr('width')) || 0
                            };
                            break;
                        case 'G-FOOTER':
                            me._getFooterCells(node);
                            break;
                        default:
                            break;
                    }
                });
                me.__originalCols = me.columns;

                function getVisibleFor($node) {
                    var visibleFor = $node.attr('visible-for');
                    if (!visibleFor) {
                        return null;
                    }
                    return _.map(visibleFor.split(','), $.trim);
                }

                function getRealField(rawData) {
                    var firstFilterIdx;
                    if (rawData) {
                        firstFilterIdx = rawData.indexOf('|');
                        if (firstFilterIdx !== -1) {
                            return $.trim(rawData.substring(0, firstFilterIdx));
                        }
                    }
                    return rawData;
                }

                function formatDataFilters(rawData) {
                    if (!!rawData) {
                        return rawData.replace(/\s*\|\s*/g, ' | ');
                    }
                    return rawData;
                }

                function getAlignClass(align) {
                    return 'align-' + (align || 'center');
                }

                function getCellAlignClass(cellAlign, align) {
                    return 'align-' + (cellAlign || align || 'left');
                }

                function getText(node) {
                    var text = _.chain(node.childNodes)
                        .filter(function (childNode) {
                            return childNode.nodeType === 3;
                        })
                        .reduce(function (text, childNode) {
                            return text + $.trim(childNode.data);
                        }, '')
                        .value() || '';
                    if (text.indexOf('{{') >= 0 && text.indexOf('}}') >= 0) {
                        text = text.replace(/({{|}})/g, '');
                        try {
                            text = $parse(text)(me.scope);
                        } catch (e) {
                        }
                        ;
                    }
                    return text;
                }

                function getColumnTitle($node) {
                    var $clone = $node.clone();
                    $clone.children('g-column-editor, g-column-tmpl, g-column-filter').remove();
                    return $.trim($clone.html());
                }

                function setColumnPermit($node, column) {
                    var gPer = $node.attr('g-per');
                    if (gPer) {
                        var noPermit = me.Permissions.noPermit(gPer);
                        column.noPermit = noPermit;
                    }
                }

                function setColumnTmpl(node, column) {
                    var columnTmpl = $.trim($(node).html());
                    if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0") {
                        columnTmpl = columnTmpl.replace('<:', '<').replace('<:/', '</');
                    }
                    column.tmpl = columnTmpl;
                }

                function setColumnEditor(node, column) {
                    var editorTmpl = $.trim($(node).html());
                    if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0") {
                        editorTmpl = editorTmpl.replace('<:', '<').replace('<:/', '</');
                    }
                    column.editorTmpl = editorTmpl;
                }

                function setColumnFilter(node, column) {
                    var filterTmpl = $.trim($(node).html());
                    if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0") {
                        filterTmpl = filterTmpl.replace('<:', '<').replace('<:/', '</');
                    }
                    column.filterTmpl = filterTmpl;
                }
            };

            GridProto._getFooterCells = function (footerNode) {
                var me = this;
                var columns = me.columns;
                var footerCells = [];
                var colIdx = 0;
                var funcCellsCount = me.funcCellsCount;
                var checkboxColumnIdx = me.checkboxColumnIdx;
                var indexColumnIdx = me.indexColumnIdx;
                var footerFuncCellsClassName = [];
                if (angular.isNumber(checkboxColumnIdx)) {
                    footerFuncCellsClassName[checkboxColumnIdx] = 'grid-col-checkbox';
                }
                if (angular.isNumber(indexColumnIdx)) {
                    footerFuncCellsClassName[indexColumnIdx] = 'grid-col-index';
                }
                _.forEach(footerNode.children, function (cellNode) {
                    var $cellNode = $(cellNode);
                    var colspan = parseInt($cellNode.attr('colspan')) || 1;
                    var tmpl = $.trim($cellNode.html());
                    var colWidthClassName = me._getColWidthClassName(colIdx, colspan);
                    var columnIndex = colIdx - funcCellsCount;
                    var column = columns[columnIndex];
                    var footerCell = {
                        colspan: colspan,
                        colIdx: colIdx,
                        colWidthClassName: colWidthClassName,
                        tmpl: tmpl,
                        columnIndex: columnIndex,
                        funcCellClassName: footerFuncCellsClassName[colIdx] || '',
                        column: column
                    };
                    if (colspan > 1) {
                        me.requiredClassNameColSpanRange[colWidthClassName] = [colIdx, colIdx + colspan];
                    }
                    colIdx += colspan;
                    footerCells.push(footerCell);
                });
                me.hasFooter = true;
                me.footerCells = footerCells;
            };

            GridProto._renderHeaders = function () {
                var me = this;
                var scope = me.scope;
                var columns = me.columns;
                var headerIndexCell = '';
                var headerCheckboxCell = '';
                var headerFuncCells = '';
                var headerColumnCells = '';
                var headerScrollSpaceCell = '<th class="table-scroll-space"></th>';
                var sortIndexStr = '{{grid._sortIndex(column.field)}}';
                var headerRowTmpl = '{{each columns as column index}}\n<th class="header-column-cell {{column.colWidthClassName}} {{column.alignClass}} {{if column.dropFilter}}has-drop-filter{{/if}} {{if column.hidden || column.noPermit}}hidden{{/if}}" draggable="true" style="{{column.style}}">\n    {{if column.sortable}}\n    <div class="grid-head-sort">\n        <button class="btn">\n            <span class="caret caret-up" ng-class="{\'selected\': grid._isSort(column.field, \'asc\')}"></span>\n        </button>\n        <button class="btn">\n            <span class="caret caret-down" ng-class="{\'selected\': grid._isSort(column.field, \'desc\')}"></span>\n        </button>\n    </div>\n    {{/if}}\n    <sub  ng-if="grid._sortIndex(column.field)!==\'\'">{{#sortIndexStr}}</sub>\n    {{if column.required && !column.hasTitleRequired}}<span class="required">*</span>{{/if}}\n    <span>{{#column.columnTitle}}</span>\n    {{if column.dropFilter}}\n    <div class="drop-filter">\n        <div class="drop-filter-toggle" ng-class="{\'filter-column\': grid._hasPageFilter(column)}"></div>\n        <div class="drop-filter-list" style="display: none;">\n            <div class="drop-filter-check-all">\n                <div ng-click="grid._togglePageFilterCheckAll(column, $event)" class="form-clickbox" ng-class="{selected: grid._isPageFilterCheckAll(column)}">\n                    <a href="javascript:void(0);" class="fi"></a>\n                    <label>全选</label>\n                </div>\n            </div>\n        </div>\n    </div>\n    {{/if}}\n</th>\n{{/each}}';
                var headerRowTmplCompiled = artTmpl.compile(headerRowTmpl);
                if (me.hasCheckbox) {
                    headerCheckboxCell = '<th class="grid-col-checkbox"><g-checkbox ng-model="allChecked"></g-checkbox></th>';
                }
                if (me.hasIndex) {
                    headerIndexCell = '<th class="grid-col-index">' + me.indexColumn.title + '</th>';
                }
                if (me.checkboxColumnIdx === 0) {
                    headerFuncCells = headerCheckboxCell + headerIndexCell;
                } else {
                    headerFuncCells = headerIndexCell + headerCheckboxCell;
                }
                headerColumnCells = headerRowTmplCompiled({
                    columns: columns,
                    grid: me,
                    sortIndexStr: sortIndexStr
                });
                me.$headRow = $('<tr>' + headerFuncCells + headerColumnCells + headerScrollSpaceCell + '</tr>');
                me.$headerTable.empty().append(me.$headRow);
                var $headerColumnCells = me.$headRow.find('.header-column-cell');
                _.forEach(columns, function (column, index) {
                    var columnScope = scope.$new(true);
                    columnScope.column = column;
                    columnScope.grid = me;
                    columnScope.receiver = scope.receiver;
                    var columnElement = $headerColumnCells.eq(index);
                    column.element = columnElement;
                    columnElement.data('column', column);
                    $compile(columnElement)(columnScope);
                    me._renderColumnFilter(column);
                });
                $compile(me.$headRow.find('.grid-col-checkbox'))(scope);
            };

            GridProto._renderFooters = function () {
                if (!this.hasFooter) return;
                var me = this;
                var scope = me.scope;
                var footerCells = me.footerCells;
                var columns = me.columns;
                var $footer, $footerRow, first;
                if (!me.$footer) {
                    first = true;
                    $footer = me.$footer = $('<div class="grid-foot">\n    <table class="table-foot">\n        <tbody>\n            <tr>\n            </tr>\n        </tbody>\n    </table> \n</div>');
                    $footerRow = me.$footerRow = $footer.find('tr');
                } else {
                    $footer = me.$footer;
                    $footerRow = me.$footerRow;
                }
                var $footerCells = $([]);
                var footerCells = me.footerCells;
                var footerCellTmpl = '<th class="{{colWidthClassName}} {{funcCellClassName}} {{if column && (column.hidden || column.noPermit)}}hidden{{/if}}" colspan="{{colspan}}"><div>{{#tmpl}}<div/></th>';
                var footerCellTmplCompiled = artTmpl.compile(footerCellTmpl);
                var $footerScrollSpaceCell = $('<th class="table-scroll-space"></th>');
                var columnFooterCells = [];
                var funcFooterCells = _.filter(footerCells, function (footerCell) {
                    return footerCell.columnIndex < 0;
                });
                var visibleFooterCells;
                _.each(columns, function (column) {
                    var columnIndex = column.index;
                    var footerCell = _.find(footerCells, function (obj) {
                        return obj.columnIndex === columnIndex;
                    });
                    if (footerCell) columnFooterCells.push(footerCell);
                });
                visibleFooterCells = funcFooterCells.concat(columnFooterCells);
                _.forEach(visibleFooterCells, function (footerCell) {
                    var $footerCell = $(footerCellTmplCompiled(footerCell));
                    $footerCells = $footerCells.add($footerCell);
                });
                $footerCells = $footerCells.add($footerScrollSpaceCell);
                $footerRow.empty().append($footerCells);
                if (first) me.element.append($footer);
                $compile($footer)(scope);
            };

            GridProto._renderPageFilters = function () {
                var me = this;
                if (!me.hasDropFilter) {
                    return;
                }
                var $gridPageFiltersContent;
                if (!me.$gridPageFilters) {
                    var $gridPageFilters = me.$gridPageFilters = $('<div class="grid-page-filters"><div class="content"></div></div>');
                    $gridPageFiltersContent = me.$gridPageFiltersContent = me.$gridPageFilters.children('div');
                    me.element.append($gridPageFilters);
                    $gridPageFilters.on('click', 'button', function () {
                        var $this = $(this);
                        var field = $this.data('field');
                        me.clearColumnPageFilters(field);
                    });
                    $gridPageFilters.on('dblclick', function () {
                        $gridPageFilters.toggleClass('expand');
                    });
                } else {
                    $gridPageFiltersContent = me.$gridPageFiltersContent;
                }
                var compiledTmpl;
                if (!me.gridPageFiltersTmplCompiled) {
                    var gridPageFiltersArtTmpl = '{{each columns as column}}\n  {{if column.savedPageFilters}}\n  <span class="filter-item"><button data-field="{{#column.field}}">×</button>\n  <span class="page-filter-text field">{{#column.columnTitle}} = </span>\n  <span class="page-filter-text values">[\n    {{each column.savedPageFilters as value}}\n    {{#value}},\n    {{/each}}\n  ]</span></span>\n  {{/if}}\n{{/each}}\n';
                    me.gridPageFiltersTmplCompiled = artTmpl.compile(gridPageFiltersArtTmpl);
                }
                compiledTmpl = me.gridPageFiltersTmplCompiled;
                var html = compiledTmpl(me);
                $gridPageFiltersContent.empty().append(html);
            };

            GridProto.getQueryParams = function () {
                var me = this;
                var dataSource = me.scope.dataSource;
                var requestParams = {};
                if (dataSource) {
                    requestParams = dataSource.requestParams || {};
                }
                return requestParams;
            };

            GridProto._watchVisibleTags = function () {
                var me = this;
                var scope = me.scope;
                scope.$watch('visibleTags', function (newTag, oldTag) {
                    if (oldTag === newTag) return;
                    scope.visibleTagsArr = _.map(newTag.split(','), $.trim);
                    var changed = me._setVisibleTags();
                    if (changed) {
                        me.reload();
                    }
                });
            };

            GridProto._setVisibleTags = function () {
                var me = this;
                var columns = me.__originalCols || me.columns;
                var changed = false;
                _.forEach(columns, function (column) {
                    if (!column.visibleFor) {
                        return;
                    }
                    var oldHidden = column.hidden;
                    column.hidden = me._isVisibleTagHidden(column);
                    if (column.hidden !== oldHidden) {
                        changed = true;
                    }
                });
                return changed;
            };

            GridProto._initTreeInfo = function () {
                var me = this;
                var scope = me.scope;
                var source = scope.source;
                if (!scope.treeView) {
                    return;
                } else if (!scope.treeAsync) {
                    me._initSyncTreeInfo();
                    return;
                }
                me.treeInfo = me._getSourceTreeInfo(source);
            };

            GridProto._initSyncTreeInfo = function () {
                var me = this;
                var scope = me.scope;
                var source = scope.source;
                var idProp = scope.treeIdProp;
                var parentProp = scope.treeParentProp;
                var count = source.length;
                var treeInfo = [];
                _.forEach(source, function (record, index) {
                    var preRecord = source[index - 1];
                    var preInfo = treeInfo[index - 1];
                    var curInfo = {};
                    curInfo.hasChildren = me._treeHasChildren(record);
                    curInfo.expanded = scope.treeExpandInit;
                    curInfo.isLast = index === count - 1;
                    curInfo.isFetching = false;
                    curInfo.childrenFetched = true;

                    if (preRecord) {
                        if (record[parentProp] && preRecord[idProp] && record[parentProp] === preRecord[idProp]) {
                            curInfo.level = preInfo.level + 1;
                            curInfo.levelIndex = 0;
                            curInfo.parentsTreeInfo = preInfo.parentsTreeInfo.concat(preInfo);
                        } else if (record[parentProp] && preRecord[idProp] && record[parentProp] === preRecord[parentProp]) {
                            curInfo.level = preInfo.level;
                            curInfo.levelIndex = preInfo.levelIndex + 1;
                            curInfo.parentsTreeInfo = preInfo.parentsTreeInfo.concat();
                        } else {
                            for (var i = index - 1; i >= 0; i--) {
                                preRecord = source[i];
                                preInfo = treeInfo[i];
                                if ((record[parentProp] && preRecord[idProp] && record[parentProp] === preRecord[parentProp]) || preInfo.level === 0) {
                                    curInfo.level = preInfo.level;
                                    curInfo.levelIndex = preInfo.levelIndex + 1;
                                    curInfo.parentsTreeInfo = preInfo.parentsTreeInfo.concat();
                                    break;
                                }
                            }
                        }
                    } else {
                        curInfo.level = 0;
                        curInfo.levelIndex = 0;
                        curInfo.parentsTreeInfo = [];
                    }
                    treeInfo.push(curInfo);
                });
                _.chain(treeInfo).groupBy(function (info) {
                    return _.map(info.parentsTreeInfo, function (pInfo) {
                        return pInfo.levelIndex;
                    }).join('-');
                }).forEach(function (group) {
                    _.last(group).isLast = true;
                })
                    .value();
                me.treeInfo = treeInfo;
            };

            GridProto._getSourceTreeInfo = function (source, parentTreeInfo) {
                var me = this;
                var count = source.length;
                var treeAsync = me.scope.treeAsync;
                var treeInfo = _.map(source, function (record, index) {
                    return {
                        hasChildren: me._treeHasChildren(record),
                        level: parentTreeInfo ? parentTreeInfo.level + 1 : 0,
                        levelIndex: index,
                        expanded: false,
                        parentsTreeInfo: parentTreeInfo ? parentTreeInfo.parentsTreeInfo.concat(parentTreeInfo) : [],
                        isLast: index === count - 1,
                        isFetching: false,
                        childrenFetched: !treeAsync
                    };
                });
                return treeInfo;
            };

            GridProto._treeHasChildren = function (record) {
                var me = this;
                var scope = me.scope;
                var element = me.element;
                if (element.attr('tree-has-children')) {
                    me._treeHasChildren = function (record) {
                        return scope.treeHasChildren({record: record});
                    };
                } else {
                    me._treeHasChildren = function (record) {
                        return record.hasChildren;
                    };
                }
                return me._treeHasChildren(record);
            };

            GridProto._getRowTreeInfo = function (row) {
                var me = this;
                var treeInfo = me.treeInfo;
                var rowIndex = me._getRowIndex(row);
                return treeInfo[rowIndex] || {};
            };

            GridProto._getRowIndexByTreeId = function (idStr) {
                var me = this;
                var scope = me.scope;
                var source = scope.source;
                var treeIdProp = scope.treeIdProp;
                var index = _.findIndex(source, function (record) {
                    return String(record[treeIdProp]) === idStr;
                });
                return index;
            };

            GridProto._isTreeHiddenRow = function (row) {
                var treeInfo = this._getRowTreeInfo(row);
                var parentsTreeInfo = treeInfo.parentsTreeInfo || [];
                if (!parentsTreeInfo.length) {
                    return false;
                }
                var foldParent = _.find(parentsTreeInfo, function (info) {
                    return !info.expanded;
                });
                return !!foldParent;
            };

            GridProto._getTreeChildrenRows = function (row, returnRecords) {
                var me = this;
                var treeInfo = me.treeInfo;
                var rowTreeInfo = this._getRowTreeInfo(row);
                var source;
                if (!rowTreeInfo.hasChildren) {
                    return [];
                }
                var childrenRows = [];
                _.forEach(treeInfo, function (info, index) {
                    if (_.contains(info.parentsTreeInfo, rowTreeInfo)) {
                        childrenRows.push(index);
                    }
                });
                if (returnRecords) {
                    source = me.scope.source;
                    return _.map(childrenRows, function (i) {
                        return source[i];
                    });
                }
                return childrenRows;
            };

            GridProto._getTreeSubRows = function (row, returnRecords) {
                var me = this;
                var treeInfo = me.treeInfo;
                var count = treeInfo.length;
                var rowTreeInfo = this._getRowTreeInfo(row);
                var source;
                if (!rowTreeInfo.hasChildren) {
                    return [];
                }
                var subLevel = rowTreeInfo.level + 1;
                var childrenRows = [];
                var info;
                for (var i = row + 1; i < count; i++) {
                    info = treeInfo[i];
                    if (info.level !== subLevel) {
                        break;
                    }
                    childrenRows.push(i);
                }
                if (returnRecords) {
                    source = me.scope.source;
                    return _.map(childrenRows, function (i) {
                        return source[i];
                    });
                }
                return childrenRows;
            };

            GridProto._toggleTreeExpand = function (row) {
                var me = this;
                var scope = me.scope;
                var treeAsync = scope.treeAsync;
                var treeInfo = me._getRowTreeInfo(row);
                var record = me._getRowRecord(row);
                if (treeInfo.isFetching) {
                    return;
                }
                if (!treeAsync || treeInfo.childrenFetched) {
                    treeInfo.expanded = !treeInfo.expanded;
                    me._updateTreeHide(treeInfo);
                } else {
                    treeInfo.isFetching = true;
                    scope.treeAsyncFetchChildren({
                        record: record,
                        callback: me._treeFetchedChildrenCb.bind(me)
                    });
                }
            };

            GridProto._updateTreeHide = function (parentRowTreeInfo) {
                var me = this;
                var treeInfo = me.treeInfo;
                var trs = me.tbody.rows;
                _.forEach(treeInfo, function (info, index) {
                    if (_.contains(info.parentsTreeInfo, parentRowTreeInfo)) {
                        if (parentRowTreeInfo.expanded) {
                            $(trs[index]).toggleClass('tree-hide', me._isTreeHiddenRow(index));
                        } else {
                            $(trs[index]).addClass('tree-hide');
                        }
                    }
                });
            };

            GridProto._treeFetchedChildrenCb = function (result) {
                var me = this;
                var scope = me.scope;
                var parentProp = scope.treeParentProp;
                var grouped = _.groupBy(result, parentProp);
                _.mapObject(grouped, function (childrenSource, parentId) {
                    me._appendTreeChildren(parentId, childrenSource);
                });
            };

            GridProto._appendTreeChildren = function (parentId, childrenSource) {
                var me = this;
                var treeInfo = me.treeInfo;
                var scope = me.scope;
                var source = scope.source;
                var idProp = scope.treeIdProp;
                var parentIndex;
                var parentRecord = _.find(source, function (record, index) {
                    var b = record[idProp] === parentId;
                    if (b) {
                        parentIndex = index;
                    }
                    return b;
                });
                if (!parentRecord) {
                    return;
                }
                var parentTreeInfo = me._getRowTreeInfo(parentIndex);
                if (parentTreeInfo.childrenFetched) {
                    return;
                }
                parentTreeInfo.isFetching = false;
                parentTreeInfo.childrenFetched = true;
                parentTreeInfo.expanded = true;
                var childrenTreeInfo = me._getSourceTreeInfo(childrenSource, parentTreeInfo);
                var treeInfoHead = _.head(treeInfo, parentIndex + 1);
                var treeInfoTail = _.tail(treeInfo, parentIndex + 1);
                me.treeInfo = treeInfoHead.concat(childrenTreeInfo).concat(treeInfoTail);
                var sourceHead = _.head(source, parentIndex + 1);
                var sourceTail = _.tail(source, parentIndex + 1);
                scope.source = sourceHead.concat(childrenSource).concat(sourceTail);
                scope.$apply();
                // if (me._isChecked(parentRecord)) {
                //     for (var i = 0; i < childrenCount; i++) {
                //         me._toggleChecked(i + parentIndex + 1, {});
                //     }
                //     scope.$apply();
                // }
            };

            GridProto._isTreeExpand = function (row) {
                var rowTreeInfo = this._getRowTreeInfo(row);
                return rowTreeInfo.expanded;
            };

            GridProto._isTreeFetching = function (row) {
                var rowTreeInfo = this._getRowTreeInfo(row);
                return rowTreeInfo.isFetching;
            };

            GridProto._getRowIndex = function (row) {
                var rowIndex;
                var source = this.scope.source;
                if (_.isNumber(row)) {
                    rowIndex = row;
                } else {
                    rowIndex = _.findIndex(source, row);
                }
                return rowIndex;
            };

            GridProto._getRecordIndex = function (row) {
                return $(row)[0].rowIndex;
            };

            GridProto.treeExpandAll = function () {
                var me = this;
                var scope = me.scope;
                if (!scope.treeView) {
                    return;
                }
                var source = scope.source;
                var treeInfo = me.treeInfo;
                var unFetchedRows = [];
                _.forEach(treeInfo, function (info, index) {
                    if (info.childrenFetched) {
                        info.expanded = true;
                    } else if (info.hasChildren) {
                        treeInfo.isFetching = true;
                        unFetchedRows.push(index);
                    }
                });
                _.forEach(treeInfo, function (info) {
                    me._updateTreeHide(info);
                });
                if (!unFetchedRows.length) {
                    return;
                }
                scope.treeAsyncFetchChildren({
                    record: _.map(unFetchedRows, function (i) {
                        return source[i];
                    }),
                    callback: me._treeFetchedChildrenCb.bind(me)
                });
            };

            GridProto.treeFoldAll = function () {
                var me = this;
                var scope = me.scope;
                if (!scope.treeView) {
                    return;
                }
                var treeInfo = me.treeInfo;
                _.forEach(treeInfo, function (info) {
                    info.expanded = false;
                });
                _.forEach(treeInfo, function (info) {
                    me._updateTreeHide(info);
                });
            };

            GridProto._setFuncCellWidth = function () {
                var me = this,
                    indexColumnWidth = me.indexColumn ? me.indexColumn.width : 0,
                    checkboxColumnWidth = me.checkboxColumn ? me.checkboxColumn.width : 0,
                    styleText, gridClass;
                if (indexColumnWidth || checkboxColumnWidth) {
                    styleText = '<style>';
                    gridClass = '.grid.grid-' + me.hash;
                    styleText += indexColumnWidth
                        ? gridClass + ' .grid-col-index{width:' + indexColumnWidth + 'px;}'
                        : '';
                    styleText += checkboxColumnWidth
                        ? gridClass + ' .grid-col-checkbox{width:' + checkboxColumnWidth + 'px;}'
                        : '';
                    styleText += '</style>';
                    $('head').append(styleText);
                }
            };

            GridProto._isLazy = function () {
                if (!this.hasOwnProperty('__isLazy')) {
                    this.__isLazy = (this.scope.lazy === 'true');
                }
                return this.__isLazy;
            };

            GridProto._getClassName = function (classNameList) {
                if (_.isObject(classNameList)) {
                    var result = "";
                    _.each(classNameList, function (v, className) {
                        if (!v) return;
                        if (result != "") result += " ";
                        result += className;
                    });
                    return result;
                } else if (_.isArray(classNameList)) {
                    return classNameList.join(" ");
                } else if (angular.isString(classNameList)) {
                    return classNameList;
                } else {
                    return "";
                }
            };

            GridProto._rowClassName = function (rowIndex) {
                if (!_.isFunction(this.scope.gItemClass) || _.isEmpty(this.scope.source)) return "";
                if (this.scope.source.length < rowIndex) return "";
                var record = angular.copy(this.scope.source[rowIndex]);
                var classNameList = this.scope.gItemClass({row: record});
                return this._getClassName(classNameList);
            };

            GridProto._columnClassName = function (rowIndex, columnIndex) {
                var me = this,
                    scope = me.scope,
                    column = me.columns[columnIndex];

                if (!_.isFunction(column.gItemClass) || _.isEmpty(scope.source)) return "";
                var record = angular.copy(scope.source[rowIndex]);
                var classNameList = column.gItemClass(scope.$parent, {row: record});
                var className = this._getClassName(classNameList);
                return className;
            };

            /**
             * 添加布局列
             * @param {string | string[]} fields 要添加的列字段
             * @param {boolean} saveLayout 是否保存调整后的布局
             */
            GridProto.addLayoutCols = function (fields, saveLayout) {
                this._amendLayoutCols(fields, 'add', saveLayout);
            };

            /**
             * 删除布局列
             * @param {string | string[]} fields 要删除的列字段
             * @param {boolean} saveLayout 是否保存调整后的布局
             */
            GridProto.removeLayoutCols = function (fields, saveLayout) {
                this._amendLayoutCols(fields, 'remove', saveLayout);
            };

            /**
             * 调整布局列
             * @param {string | string[]} fields 要添加或删除的列字段
             * @param {string} operator 操作方法，可选值:'add','remove'。默认为 'add'
             * @param {boolean} saveLayout 是否保存调整后的布局，默认为 true
             */
            GridProto._amendLayoutCols = function (fields, operator, saveLayout) {
                var me = this;
                var columns = me.columns;
                var originalCols = me.__originalCols;
                var amendCols, currentLayout;
                if (_.isString(fields)) {
                    fields = [fields];
                }
                amendCols = _.map(fields, function (field) {
                    return _.find(originalCols, function (col) {
                        return col.field === field;
                    })
                });
                if (operator === 'remove') {
                    columns = _.difference(columns, amendCols);
                } else {
                    columns = columns.concat(amendCols);
                }
                columns = _.chain(columns)
                    .uniq()
                    .compact()
                    .value();
                me._enterCols(columns);
                if (saveLayout !== false) {
                    currentLayout = gridLayoutService.gridLayout && gridLayoutService.gridLayout[me.scope.colSettingsKey] && gridLayoutService.gridLayout[me.scope.colSettingsKey].currentLayout;
                    if (currentLayout && currentLayout.name) {
                        gridLayoutService.saveLayout(me.scope.colSettingsKey);
                    } else {
                        gridLayoutService.newLayoutName = 'amended_layout';
                        gridLayoutService.confirm(me.scope.colSettingsKey);
                    }
                }
            }

            return {
                template: '<div class="grid">\n    <div class="grid-head" ng-click="headClick($event)">\n        <table class="table-head">\n        </table>\n    </div>\n    <div class="grid-body" ng-click="bodyClick($event)" ng-dblclick="bodyDbClick($event)">\n        <table class="table-body"><tbody></tbody></table>    \n    </div>\n    <div class="col-resize-line">\n    </div>\n</div>',
                replace: true,
                restrict: 'E',
                transclude: false,
                scope: {
                    sourceName: '@sourceName',
                    validatorName: '@',
                    validatorConfigKey: '@',
                    $columns: '=columns',
                    $selectedRow: '=selectedRow',
                    $checkedRows: '=checkedRows',
                    onLoadSuccess: '&',
                    onRender: '&',
                    onBeforeSortColumn: '&',
                    onSortColumn: '&',
                    onBeforeSelect: '&',
                    onSelect: '&',
                    onCheck: '&',
                    onCheckAll: '&',
                    onFilter: '&',
                    canToggleSelected: '@',
                    enableEvenClass: '@',
                    onBeforeRowDbclick: '&',
                    onRowDbclick: '&',
                    onBeforeCellDbclick: '&',
                    onCellDbclick: '&',
                    onGridRender: '&',
                    lazy: '@',
                    colSettingsKey: '@',
                    gTop: '@',
                    gBottom: '@',
                    gLeft: '@',
                    gRight: '@',
                    dragCheck: '@',
                    disableCopyEditing: '@',
                    forbiddenColumns: '=',
                    newRowRecord: '=',
                    newRowFunc: '&',
                    receiver: '=',
                    visibleTags: '=',
                    treeIdProp: '@',
                    treeParentProp: '@',
                    treeHasChildren: '&',
                    treeAsyncFetchChildren: '&',
                    gItemClass: '&'
                },
                require: ['gDataGrid'],
                compile: function (tElement) {
                    return function (scope, element, attrs, controllers) {
                        var grid = controllers[0],
                            $head = grid.$headerBox,
                            $gridBody = element.children('div.grid-body'),
                            $table = $gridBody.children('table'),
                            $tbody = $table.children('tbody'),
                            isBindCheckedRows = attrs.hasOwnProperty('checkedRows'),
                            isBindSelectedRow = attrs.hasOwnProperty('selectedRow'),
                            tBodyHeight = attrs.tbodyHeight,
                            colSettingsHeight = parseInt(attrs.colSettingsHeight) || null;

                        if (attrs["columnRequiredExpr"]) scope.columnRequiredExpr = $parse(attrs["columnRequiredExpr"])(scope.$parent);
                        
                        if (!attrs.onBeforeSortColumn) {
                            scope.onBeforeSortColumn = function () {
                                var editingRowIndex = grid.__editingRowIndex;
                                var modifiedRecords = grid.getModifiedRecords();
                                var newRecord = _.find(grid.scope.source, {rowStatus: 4});
                                if (angular.isNumber(editingRowIndex) && !newRecord && !(modifiedRecords && modifiedRecords.length)) {
                                    grid.finishEdit(true);
                                    grid.startEdit(editingRowIndex);
                                    modifiedRecords = grid.getModifiedRecords();
                                }
                                if (modifiedRecords && modifiedRecords.length || newRecord) {
                                    GillionMsg.alert('提示', '数据已修改，请保存后再排序！');
                                    return false;
                                }
                            };
                        }

                        if (scope.colSettingsKey && scope.$root.$sessionAttrs && scope.$root.$sessionAttrs.loginUser) {
                            scope.colSettingsKeyWithName = scope.colSettingsKey + '_' + scope.$root.$sessionAttrs.loginUser.username;
                        }

                        grid.isBindSelectedRow = isBindSelectedRow;
                        grid.isBindCheckedRows = isBindCheckedRows;
                        grid.colSettingsHeight = colSettingsHeight;
                        grid.$gridBody = $gridBody;
                        grid.$headRow = angular.element('tr', $head);
                        scope.draggable = attrs.draggable == "false" ? false : true;
                        scope.keydownNewRow = defKeydownNewRow;
                        scope.hasNewRowFunc = !!attrs.newRowFunc;
                        scope.lazyRenderLayout = attrs.lazyRenderLayout === 'true';
                        scope.firstLoad = true;
                        element.addClass('grid-' + grid.hash);
                        if (scope.treeIdProp && scope.treeParentProp) {
                            scope.treeView = true;
                            scope.treeExpandInit = attrs.treeExpandInit === 'true';
                            grid.element.addClass('grid-tree');
                            if (attrs.treeAsyncFetchChildren) {
                                scope.treeAsync = true;
                            }
                        }
                        if (scope.visibleTags) {
                            scope.visibleTagsArr = _.map(scope.visibleTags.split(','), $.trim) || [];
                        } else {
                            scope.visibleTagsArr = [];
                        }
                        if (!(attrs.keydownNewRow === void 0)) {
                            scope.keydownNewRow = attrs.keydownNewRow === 'false' ? false : true;
                        }
                        if (tBodyHeight) {
                            $gridBody.css("height", tBodyHeight);
                        }

                        $tbody.data('$gDataGridController', grid);
                        if (scope.validatorName) {
                            grid.formName = 'grid' + grid.hash + 'form';
                            var $form = angular.element('<form>', {
                                name: grid.formName,
                                'g-validator': scope.validatorName,
                                'data-invalid-msg': 'tooltipMessenger',
                                'onsubmit': 'return false'
                            });
                            $table.wrap($form);
                            $form = $gridBody.children('form');
                            $compile($form)(scope);
                            grid.formController = $form.data('$formController');
                            grid.gValidatorController = $form.data('$gValidatorController');
                            grid.gValidatorController.isInGrid = true;
                            grid.gValidatorController.requireDisabledInGrid = attrs.hasOwnProperty('validationRequireDisabled');
                            $tbody.data('$formController', grid.formController);
                            $tbody.data('$gValidatorController', grid.gValidatorController);
                        }

                        grid._watchVisibleTags();
                        grid._getColumns(tElement);
                        grid._setFuncCellWidth();
                        grid._applyLocalStorageLayout();
                        grid._loadAndReSortHeadersIfStored();
                        grid._renderHeaders();
                        grid._renderFooters();
                        grid._renderPageFilters();

                        if (grid.colSettingsHeight) {
                            var minHeight = 300;
                            colSettingsHeight = _.max([grid.colSettingsHeight, minHeight]);
                            var baseHeight = 434;
                            var baseUlHeight = 303;
                            var baseCenterMarginTop = 105;
                            var gapHeight = colSettingsHeight - baseHeight;
                            var ulHeight = baseUlHeight + gapHeight;
                            var centerMarginTop = baseCenterMarginTop + gapHeight / 2;
                            scope.colSettingStyleHtml = '<style class="col-setting-style">'
                                + '.table-settings {height: ' + colSettingsHeight + 'px; margin-top: ' + (-colSettingsHeight / 2) + 'px;}'
                                + '.table-settings .box ul {height: ' + ulHeight + 'px;}'
                                + '.table-settings .center {margin-top: ' + centerMarginTop + 'px;}'
                                + 'style';
                        }

                        if (isBindSelectedRow) {
                            scope.$watch('$selectedRow', function (newRow, oldRow) {
                                var rowIndex, $row;
                                if (newRow !== oldRow && scope.selectedRow !== newRow) {
                                    rowIndex = Arrays.indexOf(scope.source, newRow) + 1;
                                    $row = angular.element('tr:nth-child(' + rowIndex + ')', grid.tbody);
                                    if ($row.length) {
                                        grid._rowClick({target: $row[0]}, $row);
                                    }
                                }
                            });
                        }

                        if (isBindCheckedRows) {
                            if (angular.isArray(scope.$checkedRows)) {
                                scope.checkedRows = scope.$checkedRows;
                            } else {
                                scope.checkedRows = scope.$checkedRows = [];
                            }
                            scope.$watchCollection('$checkedRows', function () {
                                if (grid.checkRowByContrl !== true) {
                                    grid._syncCheckRowsByOuter();
                                }
                                grid.checkRowByContrl = false;
                            });
                        } else {
                            scope.checkedRows = [];
                        }

                        if (!scope.lazyRenderLayout) {
                            grid._renderLayout();
                        }

                        grid.doLayout();
                        grid._setGridBodyHeight();

                        $dataSourceManager.getDataSource(attrs.sourceName).then(function (result) {
                            scope.dataSource = result;
                            scope.dataSource.sortName = grid.sortName;
                            scope.dataSource.sortDirection = grid.sortDirection;
                        });

                        scope.$on(scope.sourceName, function (event, result) {
                            grid.__rendered = true;
                            grid.$$modifiedRecords = {};
                            var body = $document[0].body;
                            if (body.hasAttribute('g-dict') && !!body.getAttribute('g-dict') && scope.$root.$dictReturned !== true) {
                                scope.$on('$dictReturned', function () {
                                    grid._registerHelpers();
                                    doLayer();
                                });
                            } else {
                                grid._registerHelpers();
                                doLayer();
                            }

                            function doLayer() {
                                scope.source = result['records'];
                                if (scope.source != undefined) grid.changeDataSourced = true; //为了标示不是外部改变了数据源
                                grid._initTreeInfo();
                                grid._updateDisabledRows();
                                if (result.hasOwnProperty('moreAttrs')) {
                                    scope.moreAttrs = result['moreAttrs'];
                                }

                                if (scope.lazyRenderLayout && scope.firstLoad && scope.source.length) {
                                    grid._renderLayout();
                                }
                                scope.firstLoad = false;
                                grid._changePage();
                                grid._render();
                                if (angular.isFunction(scope.onLoadSuccess)) {
                                    scope.onLoadSuccess({
                                        source: scope.source,
                                        grid: grid,
                                        result: result
                                    });
                                }
                                grid._syncScroll();
                            }
                        });

                        if (angular.isFunction(scope.onRender)) {
                            scope.onRender({
                                grid: grid,
                                source: scope.source
                            });
                        }
                        element.removeClass('hidden');
                        grid._renderCellsStyle();

                        if (scope.lazyRenderLayout) {
                            var unwatchSource = scope.$watchCollection('source', function (newSource) {
                                if (newSource && newSource.length > 0) {
                                    unwatchSource();
                                    if (scope.lazyRenderLayout && scope.firstLoad) {
                                        grid._renderLayout();
                                    }
                                }
                            });
                        }

                        grid._restColSettingsBtn();
                        //加载数据库布局
                        grid._registerLayoutService();
                        $($window).trigger('fixgrid');
                        scope.$on('$destroy', function () {
                            $($window).off('resize.gridResize' + grid.hash);
                            $document.off('click.hideDropFilter' + grid.hash);
                            $document.off('mouseup.dragcheck' + grid.hash);
                            element.remove();
                            if (angular.isDefined(scope.menuDiv)) {
                                scope.menuDiv.remove();
                                scope.menuDiv = undefined;
                                delete scope.menuDiv;
                            }
                            scope.dataSource = undefined;
                            scope.source = grid.source = [];
                            delete grid.source;
                            delete scope.source;
                            if (angular.isDefined(scope.$dom)) {
                                scope.$dom.remove();
                                delete scope.$dom;
                            }
                            if (angular.isDefined(scope.$rightMenu)) {
                                scope.$rightMenu.remove();
                                delete scope.$rightMenu;
                            }
                        });
                    };
                },
                controller: ['$scope', '$element', '$attrs', 'Permissions', function ($scope, $element, $attrs, Permissions) {
                    $scope.grid = new Grid($scope, $element, $attrs, Permissions);
                    return $scope.grid;
                }]
            };
        })
        .directive('cellTemplated', function ($compile) {
            return {
                restrict: 'A',
                scope: true,
                link: function (scope, element) {
                    //noinspection JSUnresolvedVariable
                    var grid = scope.grid,
                        columnIndex = grid._getColumnIndex(element),
                        column = grid.columns[columnIndex],
                        $tr = element.closest('tr'),
                        $displayPlace = element.children('[data-role=display]');
                    // 懒加载表格行是单独作用域， 不会执行这段
                    // 但普通表格使用的是一个作用域， 需要执行这段为当前scope赋值行相关对象
                    if (!scope.row) {
                        var recordIndex = grid._getRecordIndex($tr);
                        scope.rowIndex = recordIndex;
                        scope.row = grid.scope.source[recordIndex];
                    }
                    scope.column = column;
                    scope.columnIndex = columnIndex;
                    $displayPlace.html(column.tmpl);
                    $compile($displayPlace)(scope);
                    scope.$on(CONSTANTS.REFRESH_ROWS, function (event, range) {
                        if (_.contains(range, scope.rowIndex)) {
                            scope.rowIndex = grid._getRecordIndex($tr);
                        }
                    });
                }
            };
        })
        // NOTE 一个表格中只能定义一个删除按钮
        .directive('gActionRemove', function (Arrays) {
            return {
                restrict: 'E',
                replace: 'true',
                template: '<a href="javascript:;" ng-click="removeRecord($event)" class="btn" title="删除"><i class="fi fi-del"></i></a>',
                scope: false,
                link: function (scope, element, attrs) {
                    var grid = scope.grid,
                        onBeforeActionAttrVal = attrs['onBeforeAction'],
                        onActionAttrVal = attrs['onAction'],
                        onBeforeAction = angular.noop,
                        onAction = angular.noop;
                    if (grid) {
                        if (!!onBeforeActionAttrVal) {
                            onBeforeAction = grid._getScopeEvent(onBeforeActionAttrVal);
                        }
                        if (!!onActionAttrVal) {
                            onAction = grid._getScopeEvent(onActionAttrVal);
                        }
                    }

                    scope.removeRecord = function ($event) {
                        var element = $event.target || $event.srcElement,
                            $row = angular.element(element).closest('tr'),
                            rowIndex = $row[0].rowIndex,
                            source = grid.scope.source,
                            row = source[rowIndex];
                        //noinspection JSUnresolvedVariable
                        var eventParams = {
                            $event: $event,
                            record: row
                        };
                        if (onBeforeAction(eventParams) !== false) {
                            grid.finishEdit(true);
                            Arrays.remove(grid.scope.checkedRows, source[rowIndex]);
                            source.splice(rowIndex, 1);
                            _.forEach(grid.__originalCols, function (column) {
                                grid._removeColumnDisplay(rowIndex, column);
                            });
                            onAction(eventParams);
                        }
                    };
                }
            };
        })
        .directive('renderRowClass', function () {
            return {
                require: ['outerScope', '^?gDataGrid'],
                scope: {},
                link: function (scope, element, attrs, controllers) {
                    var outerScopeController = controllers[0],
                        grid = controllers[1],
                        rowClassController = grid.rowClassController,
                        locals, rowIndex, tr;
                    if (angular.isFunction(rowClassController)) {
                        tr = element.closest('tr')[0];
                        rowIndex = tr.rowIndex;
                        locals = {
                            rowIndex: rowIndex,
                            row: grid.scope.source[rowIndex]
                        };
                        //angular.extend(scope, locals);
                        rowClassController({
                            locals: locals,
                            scope: grid.scope,
                            element: element,
                            attrs: attrs,
                            outerScopeController: outerScopeController
                        });

                        scope.$on(CONSTANTS.REFRESH_ROWS, function (event, range) {
                            rowIndex = tr.rowIndex;
                            if (_.contains(range, rowIndex)) {
                                grid.scope.rowIndex = rowIndex;
                            }
                        });
                    }
                }
            };
        })
        .directive('renderCellClass', function () {
            return {
                require: ['outerScope', '^?gItemClass', '^?gDataGrid'],
                scope: {},
                link: function (scope, element, attrs, controllers) {
                    var cell = element.closest('td')[0],
                        grid = controllers[2],// scope.grid,
                        columnIndex = grid._getColumnIndex(cell),
                        column = grid.columns[columnIndex],
                        outerScopeController = controllers[0],
                        gItemClass = controllers[1],// column.gItemClass,
                        locals, rowIndex, tr;

                    if (column && angular.isFunction(gItemClass)) {
                        tr = cell.parentNode;
                        rowIndex = tr.rowIndex;
                        locals = {
                            columnIndex: columnIndex,
                            column: column,
                            rowIndex: rowIndex,
                            row: grid.scope.source[rowIndex]
                        };
                        //angular.extend(scope, locals);
                        gItemClass({
                            locals: locals,
                            scope: grid.scope,
                            attrs: attrs,
                            element: element,
                            outerScopeController: outerScopeController
                        });
                    }
                    scope.$on(CONSTANTS.REFRESH_ROWS, function (event, range) {
                        rowIndex = tr.rowIndex;
                        if (_.contains(range, rowIndex)) {
                            grid.rowIndex = rowIndex;
                        }
                    });
                }
            };
        });
});
