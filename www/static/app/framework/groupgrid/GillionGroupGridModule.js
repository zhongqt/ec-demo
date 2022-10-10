define('framework/groupgrid/GillionGroupGridModule', [
    'angular',
    'jquery',
    'underscore',
    'artTmpl',
    'ngContextMenu',
    'framework/colGroupSettings/ColGroupSettingsModule',
    'framework/groupDataSource/GroupDataSourceModule',
    'framework/clickbox/GillionClickBoxModule',
    'framework/gridlayout/GridLayoutModule'
], function (angular, $, _, artTmpl) {
    var CONSTANTS = {
            CHECK_ROW_WIDTH: 40,
            SPACE_CELL_WIDTH: 19,
            MIN_CELL_WIDTH: 40,
            DATA_COLUMN_INSTANCE_KEY: '$column-ins',
            REFRESH_ROWS: '$grid-refresh-rows'
        },
        ORDER = {
            ASC: 'asc',
            DESC: 'desc'
        };

    return angular.module('GillionGroupGridModule', ['GroupDataSourceModule', 'ColGroupSettingsModule', 'GillionClickBoxModule', 'ng-context-menu', 'GridLayoutModule'])
        .directive('gGroupGrid', function ($parse, $filter, $window, $document, $compile, $timeout, ColGroupSettings, gridLayoutService, Arrays, Functions, LocalStorages, GroupDataSources) {

                function _toWidthClassBlock(className, width) {
                    return '.' + className + '{width:' + width + 'px;}';
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

                function getColClassReg(colWidthClassName) {
                    var matched = colWidthClassName.match(/grid-(.+)-col-(\d+)/),
                        colIndex = matched[2];
                    return new RegExp('(?:\\' + colWidthClassName + '|\\\.grid-' + matched[1] + '-col-[0-' + colIndex + ']-[' + (colIndex + 1) + '-9])\\\{width:([\\\d\\\.]+)px;}', 'g');
                }

                function GroupGrid(scope, element, attrs) {
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
                    me.footCellIndex = 0;
                    me.actions = {};

                    me.$headerBox = me.element.find('thead');
                    me.$colResizeLine = me.element.find('div.col-resize-line');

                    me.$$modifiedRecords = {};

                    me.tbody = me.element.find('tbody')[0];
                    if (me._hasCheckedBox()) {
                        me.scope.checkedRows = [];
                        me.scope.checkedLeafRows = [];//勾选实际行
                    }
                }

                GroupGrid.prototype = {

                    _hasCheckedBox: function () {
                        return !!this.attrs['checkedRows'] || !!this.attrs['checkedLeafRows'];//勾选实际行
                    },

                    _registerHeaderDraggable: function () {
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
                            mousemoveFun = _.throttle(function ($event) {
                                var target = $event.target,
                                    $th = angular.element(target).closest('th'),
                                    width, offset, eX, inRightEdge, dragging;
                                if ($th.length > 0) {
                                    width = $th.outerWidth();
                                    offset = $th.offset();
                                    eX = $event.clientX;
                                    inRightEdge = (eX - offset.left) > (width - 5);
                                    dragging = angular.isDefined($headerBox.data('_start_x'));
                                    if (!$(target).is('i[data-col-settings]') && (inRightEdge || dragging)) {
                                        $headerBox.addClass('resizeable');
                                        if (me.scope.draggable) {
                                            $th.attr("draggable", "false");
                                        }
                                        if (dragging) {
                                            $headerInput.on('focus', preventInputFocus);
                                            $colResizeLine.css('left', $event.clientX + me.element.scrollLeft() - me.element.offset().left);
                                        }
                                    } else {
                                        $headerBox.removeClass('resizeable');
                                        if (me.scope.draggable) {
                                            $th.attr("draggable", "true");
                                        }
                                    }
                                }
                            }, 50);
                        me.element.on('mouseup', function () {
                            $headerInput.off('focus', preventInputFocus);
                        });
                        me.element.on('scroll', function () {
                            var menuElement = angular.element(document.getElementById('dropdownMenu_' + me.scope.colSettingsKey));
                            menuElement.removeClass("open");
                        });
                        $headerBox.mousemove(mousemoveFun);
                        $headerBox.mousedown(function ($event) {
                            var target = $event.target,
                                $th = angular.element(target).closest('th');
                            if ($th.length > 0 && $headerBox.hasClass('resizeable')) {
                                me._startColResize($event, $th);
                                angular.element($document).one('mouseup', function ($event) {
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
                    },

                    _startColResize: function ($event) {
                        $('body').css({
                            webkitUserSelect: 'none',
                            mozUserSelect: 'none',
                            msUserSelect: 'none',
                            userSelect: 'none'
                        });
                        var me = this,
                            $headerBox = me.$headerBox,
                            $colResizeLine = me.$colResizeLine;
                        $colResizeLine.css('left', $event.clientX + me.element.scrollLeft() - me.element.offset().left);
                        // $colResizeLine.css('left', $event.clientX - me.element.offset().left + me.element.children('div.grid-body').scrollLeft());
                        $colResizeLine.show();
                        $headerBox.data('_start_x', $event.clientX);
                        $window.document.onselectstart = function () {
                            return false;
                        };
                    },

                    _finishColResize: function ($event, $th) {
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
                            headerScope = $th.isolateScope();
                        if (headerScope) {
                            var col = headerScope.column,
                                colWidthClassName = col.colWidthClassName,
                                $styleBlock = me.element.children('style'),
                                oldStyleContent = $styleBlock.html(),
                                newStyleContent;
                            newStyleContent = oldStyleContent.replace(getColClassReg(colWidthClassName), function (block, width) {
                                var newWidth = Number(width) + added;
                                newWidth = _.isNaN(newWidth) ? CONSTANTS.MIN_CELL_WIDTH : newWidth;
                                newWidth = Math.max(newWidth, CONSTANTS.MIN_CELL_WIDTH);
                                col.width = newWidth;
                                return block.replace(width, newWidth);
                            });
                            $styleBlock.html(newStyleContent);
                            me._reCalculateWidth();
                        }
                        $colResizeLine.hide();
                        $headerBox.removeData('_start_x');
                        me._resetBodyWidth();
                        $window.document.onselectstart = angular.noop;
                    },

                    /**
                     * 重新渲染列 `title`
                     * @param rowData {T} 记录
                     * @param column {object} Column对象
                     * @param cell {HTMLTableCellElement} 单元格 Dom
                     * @private
                     */
                    _renderCellTitle: function (rowData, column, cell) {
                        var me = this,
                            cellValue = me.getCellValue(rowData, column);
                        if (cellValue) {
                            angular.element(cell).attr('title', cellValue);
                        }
                    },
                    _addColumn: function (column) {
                        this._renderColumnFilter(column);
                        return this.columns.push(column);
                    },
                    _renderColumnFilter: function (column) {
                        var me = this,
                            scope = me.scope,
                            filter = column.filter,
                            $eleCol = column.element,
                            filterTmpl = column.filterTmpl,
                            condition = me.filterCondition || (me.filterCondition = {}),
                            $filter;

                        if (!filterTmpl) {
                            if (!filter) return;
                            switch (filter) {
                                case 'text':
                                    filterTmpl = '<input type="text" class="form-text" />';
                                    break;
                                case 'number-spinner':
                                    filterTmpl = '<g-number-spinner></g-number-spinner>';
                                    break;
                            }
                        }
                        if (!filterTmpl) return;
                        $filter = angular.element(filterTmpl);
                        $filter.attr({
                            'ng-model': 'filter.' + column.field
                        });
                        $eleCol.parent().addClass('has-filters');
                        $eleCol.append($filter);
                        $compile($filter)(scope);
                        $filter.wrap('<div class="column-filter"></div>');
                        condition[column.field] = column.filterCondition || 'EQ';
                        if ($filter.length) {
                            me.hasColumnFilter = true;
                        }
                    },
                    _getCellValue: function (row, column) {
                        var me = this,
                            cellValueGetterCache = me.cellValueGetterCache;
                        if (!cellValueGetterCache[column.data]) {
                            cellValueGetterCache[column.data] = me.generateCellValueGetter(column);
                        }
                        return cellValueGetterCache[column.data](row);
                    },
                    generateCellValueGetter: function (column) {
                        if (column.data) {
                            return $parse(column.data);
                        }
                        return angular.noop;
                    },
                    getGridTransLayout: function () {
                        var me = this, result = {}, content,
                            colSetting = me.scope.colSettingsKey;
                        result.tableId = colSetting;
                        content = _(me.__originalCols).map(function (col) {
                            var _col = {};
                            _col[col.columnName] = col.index
                            return _col;
                        });
                        result.layout = content;
                        return result;
                    },
                    _getSortName: function (sortingIcon) {
                        var me = this,
                            columnIndex = me._getColumnIndex(sortingIcon.closest('th'));
                        return me.columns[columnIndex].sortable;
                    },

                    _isSort: function (sortName, sortDirection) {
                        var me = this,
                            sortNames = me.sortName || [],
                            sortDirections = me.sortDirection || [],
                            index = _.indexOf(sortNames, sortName);
                        if (index < 0) return false;
                        return sortDirections[index] == sortDirection;
                    },

                    _sortIndex: function (sortName) {
                        var me = this,
                            sortNames = me.sortName || [],
                            index = _.indexOf(sortNames, sortName),
                            len = sortNames.length;
                        if (index > -1 && len > 1) {
                            return index + 1;
                        } else {
                            return '';
                        }
                    },

                    _specifySort: function ($event, $sortingIcon, multiSort) {
                        var me = this,
                            $header = $sortingIcon.closest('th'),
                            column = $header.isolateScope().column,
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
                    },

                    _toggleSort: function ($event, multiSort) {
                        var me = this,
                            $target = angular.element($event.target),
                            $header = $target.closest('th'),
                            isolateScope = $header.isolateScope(),
                            sortNames = me.sortName = me.sortName || [],
                            sortDirections = me.sortDirection = me.sortDirection || [],
                            column, newSortName, oldSortDirection, newSortDirection, index;
                        if (!(isolateScope && isolateScope.column && isolateScope.column.sortable)) return;

                        column = isolateScope.column;
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
                    },

                    _doSort: function (sortName, sortDirection) {
                        if (this.__rendered !== true) return;
                        var me = this,
                            scope = me.scope,
                            onBeforeSortColumn = scope.onBeforeSortColumn || angular.noop,
                            onSortColumn = scope.onSortColumn || angular.noop,
                            dataSource = me.dataSource,
                            sortEventParam = {
                                grid: this,
                                sortName: sortName,
                                sortDirection: sortDirection
                            };
                        if (onBeforeSortColumn(sortEventParam) !== false) {
                            //标记当前是排序动作，在监听数据源清除该标记
                            me.sorting = true;
                            //为了触发数据源请求
                            dataSource.sortName = me.sortName = sortName;
                            dataSource.sortDirection = me.sortDirection = sortDirection;
                            var allowAutoLoad = dataSource.$scope.allowAutoLoad;
                            if (!(allowAutoLoad === 'true' || allowAutoLoad === true)) {
                                dataSource.doRequestData();
                            }
                            onSortColumn(sortEventParam);
                        }
                    },

                    _desortIfSameAsOld: function (newSortName, newDirection) {
                        var me = this,
                            oldSortName = me.sortName,
                            oldSortDirection = me.sortDirection;
                        if (oldSortName === newSortName && oldSortDirection === newDirection) {
                            return undefined;
                        }
                        return newDirection;
                    },

                    isAllRowsChecked: function () {
                        return this.scope.allChecked;
                    },

                    _toggleAllChecked: function ($event, $target) {
                        var me = this;
                        if ($target.is('thead .grid-col-checkbox .form-clickbox a.fi')) {
                            if (!me.scope.allChecked) {
                                me.scope.checkedRows = [];
                                me.scope.checkedLeafRows = [];//勾选实际行
                                me._updateRowCheckbox();
                            } else {
                                me._checkAll();
                                me._updateRowCheckbox();
                            }
                        }
                    },

                    _checkAll: function () {
                        var me = this;
                        me.scope.checkedRows = me.source;
                        me.setCheckedLeafRows();//勾选实际行
                    },

                    _toggleRowChecked: function ($event, $target) {
                        var me = this;
                        if ($target.is('tbody .grid-col-checkbox .form-clickbox a.fi')) {
                            var $row = $target.closest('tr');
                            var nodeId = $row.data('node-id');
                            var node, rowIndex, record, isChecked, checkedRows;
                            if (nodeId) {
                                node = me.dataSource.$node(nodeId);
                                record = node.origin;
                            } else {
                                //rowIndex = $row.index();
                                rowIndex = $row.attr("data-record-index") - 1;
                                record = me.source[rowIndex];
                            }
                            isChecked = me._isCheckedRow(record);
                            checkedRows = me.scope.checkedRows;
                            if (!isChecked) {
                                checkedRows.push(record);
                            } else {
                                checkedRows = _.without(checkedRows, record);
                            }
                            me.scope.checkedRows = checkedRows;
                            me.setCheckedLeafRows();//勾选实际行
                            if (nodeId) {
                                me._toggleChildrenChecked(record, !isChecked);
                                me._toggleParentChecked(record, !isChecked);
                            }
                            me._updateRowCheckbox();
                            me.setCheckedLeafRows();//勾选实际行
                        }
                    },

                    _toggleChildrenChecked: function (record, checked) {
                        var me = this;
                        var dataSource = me.dataSource;
                        var $node = dataSource.$node;
                        var node = $node(record);
                        var children = node.children;
                        if (children.length) {
                            _.forEach(children, function (childNodeId) {
                                var node = $node(childNodeId);
                                var childRecord = node.origin;
                                if (checked) {
                                    if (!me._isCheckedRow(childRecord)) {
                                        me.scope.checkedRows.push(childRecord);
                                    }
                                } else {
                                    me.scope.checkedRows = _.without(me.scope.checkedRows, childRecord);
                                }
                                me._toggleChildrenChecked(childRecord, checked);
                            });
                        }
                    },

                    _toggleParentChecked: function (record, checked) {
                        var me = this;
                        var dataSource = me.dataSource;
                        var $node = dataSource.$node;
                        var node = $node(record);
                        var parentId = node.parentId;
                        var parentNode, parentRecord;
                        if (parentId) {
                            parentNode = $node(parentId);
                            parentRecord = parentNode.origin;
                            if (!checked) {
                                me.scope.checkedRows = _.without(me.scope.checkedRows, parentRecord);
                            } else if (me._isAllChildrenChecked(parentRecord)) {
                                if (!me._isCheckedRow(parentRecord)) {
                                    me.scope.checkedRows.push(parentRecord);
                                }
                            }
                            me._toggleParentChecked(parentRecord, me._isCheckedRow(parentRecord));
                        }
                    },

                    _isAllChildrenChecked: function (record) {
                        var me = this;
                        var dataSource = me.dataSource;
                        var $node = dataSource.$node;
                        var node = $node(record);
                        var children = node.children;
                        var checked = true;
                        if (children.length) {
                            _.forEach(children, function (childNodeId) {
                                var node = $node(childNodeId);
                                var childRecord = node.origin;
                                if (!me._isCheckedRow(childRecord)) {
                                    checked = false;
                                    return false;
                                }
                            });
                        } else {
                            checked = false;
                        }
                        return checked;
                    },

                    _updateRowCheckbox: function () {
                        var me = this;
                        var checkedNodeIds = me._hasGroup() ? me._getCheckedNodeIds() : me.scope.checkedRow;
                        var $trs = $(me.tbody).find('tr');
                        var allChecked = true;
                        var checkedRowIndex = [];
                        _.forEach(me.scope.checkedRows, function (record) {
                            checkedRowIndex.push(_.findIndex(me.source, function (v) {
                                return v === record
                            }));
                        });
                        if (!checkedRowIndex.length) {
                            allChecked = false;
                        }
                        $trs.each(function (i, tr) {
                            var $tr = $(tr);
                            var nodeId = $tr.data('node-id');
                            var recordIndex = $tr.attr("data-record-index") - 1;
                            var $checkbox;
                            if (nodeId) {
                                $checkbox = $tr.find('.grid-col-checkbox').find('.form-clickbox');
                            } else {
                                $checkbox = $tr.find('.form-clickbox');
                            }
                            if (nodeId && _.indexOf(checkedNodeIds, nodeId) < 0) {
                                $checkbox.removeClass('selected');
                                allChecked = false;
                            } else if (!nodeId && _.indexOf(checkedRowIndex, recordIndex) < 0) {
                                $checkbox.removeClass('selected');
                                allChecked = false;
                            } else {
                                $checkbox.addClass('selected');
                            }
                        });
                        me.scope.allChecked = allChecked;
                    },

                    _getCheckedNodeIds: function () {
                        var me = this;
                        var nodeIds = [];
                        _.forEach(me.scope.checkedRows, function (row) {
                            nodeIds.push(me._getNodeId(row));
                        });
                        return nodeIds;
                    },

                    _headClick: function ($event) {
                        var me = this,
                            target = $event.target,
                            $target = angular.element(target),
                            multiSort = $event.ctrlKey,
                            $columnFilter = $target.closest('.column-filter').not($target),
                            $dropFilter = $target.closest('.drop-filter'),
                            $dropFilterUl;

                        if ($target.is('.drop-filter-toggle')) {
                            var $filterList = $target.siblings('.drop-filter-list');
                            var columnScope = $target.scope();
                            var column = columnScope.column;
                            columnScope.groupGrid = me;
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
                                        column.pageFiltersValues = _.uniq(column.values.concat());
                                    }
                                }
                                $dropFilterUl = $filterList.children('ul');
                                if (!$dropFilterUl.length) {
                                    $dropFilterUl = $('<ul g-checkbox-group ng-model="column.pageFilters">\n    <li ng-repeat="display in column.uniqDisplays track by groupGrid._trackColumn($index)" ng-hide="display.length==0 && column.group">\n        <g-checkbox display="{{display}}" value="{{display}}" on-check="groupGrid._updateColumnHiddenRows(column);"></g-checkbox>\n    </li>\n</ul>');
                                    $filterList.append($dropFilterUl);
                                    $compile($dropFilterUl)(columnScope);
                                }
                            }
                            $('.drop-filter-list', me.$headerBox).not($filterList).hide();
                            $filterList.toggle();
                            if ($filterList.is(':visible')) {
                                var bodyHeight = $(me.tbody).height();
                                var maxHeight = _.min([bodyHeight, 200]);
                                $filterList.css('max-height', maxHeight);
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
                        } else if (!me.$headerBox.hasClass('resizeable')) {
                            me._toggleSort($event, multiSort);
                        }
                    },

                    _rowClick: function ($event, $row) {
                        var me = this,
                            scope = me.scope,
                            oldSelected = scope.selectedRow,
                            rowIndex = $row.index(),
                            isSelected,
                            onBeforeSelect = scope.onBeforeSelect,
                            onSelect = scope.onSelect,
                            selectParam,
                            selectedRecord,
                            nodeId = $row.data("node-id"),
                            node;
                        if (angular.isDefined(nodeId)) {
                            node = me.dataSource.$node(nodeId);
                            selectedRecord = node.origin;
                        } else {
                            selectedRecord = me.source[rowIndex];
                        }
                        isSelected = !(oldSelected === selectedRecord);
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
                            if (me.__oldSelectedRow) {
                                me.__oldSelectedRow.removeAttr('active');
                            }
                            if (isSelected) {
                                $row.attr('active', true);
                            }
                            me.__oldSelectedRow = $row;
                            onSelect(selectParam);
                        }
                    },

                    _rowDbClick: function ($event, $row) {
                        var me = this,
                            scope = me.scope,
                            onBeforeRowDbclick = scope.onBeforeRowDbclick,
                            onRowDbclick = scope.onRowDbclick,
                            nodeId = $row.data('node-id'),
                            rowIndex = (parseInt($row.attr("data-record-index")) - 1),
                            record;
                        if (nodeId) {
                            var node = me.dataSource.$node(nodeId);
                            record = node.origin;
                        } else {
                            record = me.source[rowIndex];
                        }
                        var eventParam = {
                            $event: $event,
                            record: record,
                            grid: me,
                            $row: $row
                        };
                        if (onBeforeRowDbclick(eventParam) !== false) {
                            onRowDbclick(eventParam);
                        }
                    },

                    _cellDbClick: function ($event, $cell) {
                        var me = this,
                            scope = me.scope,
                            selectedRecord = scope.selectedRow,
                            columnIndex = me._getColumnIndex($cell),
                            column = me.columns[columnIndex],
                            globalBeforeCellDbclick = scope.onBeforeCellDbclick,
                            globalCellDbclick = scope.onCellDbclick,
                            onBeforeCellDbClick = angular.isFunction(column.onBeforeCellDbclick) ? column.onBeforeCellDbclick : angular.noop,
                            onCellDbClick = angular.isFunction(column.onCellDbclick) ? column.onCellDbclick : angular.noop,
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
                    },

                    _getScopeEvent: function (eventDefineAttrVal) {
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
                    },

                    /**
                     *
                     * @param cellScope.rowIndex
                     * @param cellScope.column
                     * @param cellScope.row
                     * @param cellScope.columnIndex
                     * @returns {void|*}
                     */
                    _getCellTmplScope: function (cellScope) {
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
                    },

                    /**
                     * 重置表格状态
                     * 包括：   1、 全选状态
                     *        2、 勾选行
                     *        3、 选中行
                     */
                    _reset: function () {
                        var me = this,
                            scope = me.scope;
                        // 清空选中行
                        scope.selectedRow = scope.$selectedRow = undefined;

                    },

                    _getClassName: function (classNameList) {
                        if (_.isObject(classNameList)) {
                            var result = "";
                            _.each(classNameList, function (v, className) {
                                if (!v)return;
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
                    },

                    _rowClassName: function (record) {
                        if (!_.isFunction(this.scope.gItemClass)) return "";
                        var classNameList = this.scope.gItemClass({row: angular.copy(record)});
                        return this._getClassName(classNameList);
                    },

                    _columnClassName: function (record, columnIndex) {
                        var me = this,
                            column = me.columns[columnIndex];

                        if (!_.isFunction(column.gItemClass))return "";
                        var row = angular.copy(record);
                        var classNameList = column.gItemClass(me.scope.$parent, {row: row});
                        return this._getClassName(classNameList);
                    },

                    _getRowTmpl: function () {
                        var me = this, columnsTmpl;
                        if (!me.rowTmpl) {
                            columnsTmpl = _
                                .chain(me.columns)
                                .filter(angular.isDefined)
                                .map(function (column, index) {
                                    if (column.hide === true) return '';
                                    var cellTmpl = '<td class="' + column.colWidthClassName + ' ' + column.cellAlignClass + '{{if isGroupingBy(record, "' + column.field + '")}} has-icon{{/if}}';
                                    if (column.gItemClass) {
                                        cellTmpl += ' {{columnClassName(record, ' + index + ')}}';
                                    }
                                    cellTmpl += ' "';
                                    if (column.tmpl) {
                                        cellTmpl += 'cell-templated><span data-role="display" ></span>';
                                    } else if (column.data) {
                                        cellTmpl += 'title="{{record.' + column.data + '}}"><span data-role="display">{{record.' + column.data + '}}</span>';
                                    } else {
                                        cellTmpl += '>';
                                    }

                                    if (column.editable || column.editorTmpl) {
                                        cellTmpl += '<span data-role="editor"></span>';
                                    }

                                    cellTmpl += '{{if isGroupingBy(record, "' + column.field + '")}}<i class="table-down-icon iconfont icon-xiangshang icon-shouqi"></i>{{/if}}';
                                    return cellTmpl + '</td>';
                                })
                                .join('');
                            me.rowTmpl = '<tr data-record-index="{{getIndex(record)}}" {{if isNode(originRecord || record)}} data-node-id="{{getNodeId(originRecord || record)}}" {{if isLeaf(originRecord || record)}} class="group-table-inner {{if isHiddenRow(getIndex(record)-1)}}page-filter-hide{{/if}} {{rowClassName(record)}}"{{/if}}{{else}} class="group-table-inner {{if isHiddenRow(getIndex(record)-1)}}page-filter-hide{{/if}} {{rowClassName(record)}}"{{/if}}>';
                            var checkboxColTmpl = '';
                            var indexColTmpl = '';
                            if (me.hasCheckbox) {
                                checkboxColTmpl += '<td class="grid-col-checkbox grid-body-col-checkbox" style="{{getDragStyle()}}">';
                                checkboxColTmpl += '<div class="form-clickbox {{if isCheckedRow(record)}} selected{{/if}}"><a href="javascript:void(0);" class="fi"></a></div>';
                                checkboxColTmpl += '</td>';
                            }
                            if (me.hasIndex) {
                                indexColTmpl += '<td class="grid-col-index grid-body-col-index" style="{{getDragStyle()}}">';
                                indexColTmpl += '{{getIndex(record)}}';
                                indexColTmpl += '</td>';
                            }
                            if (me.checkboxColumnIdx < me.indexColumnIdx) {
                                me.rowTmpl += checkboxColTmpl + indexColTmpl;
                            } else {
                                me.rowTmpl += indexColTmpl + checkboxColTmpl;
                            }
                            me.rowTmpl += columnsTmpl;
                            me.rowTmpl += '<td class="table-scroll-space"></td>';
                            me.rowTmpl += '</tr>';
                        }
                        return me.rowTmpl;
                    },

                    _getCompiledRowTmpl: function () {
                        var me = this;
                        if (!me.compiledRowTmpl) {
                            me.compiledRowTmpl = artTmpl.compile(me._getRowTmpl());
                        }
                        return me.compiledRowTmpl;
                    },


                    _getCompiledBodyTmpl: function () {
                        var me = this;
                        if (!me.compiledTableTmpl) {
                            me.compiledTableTmpl = artTmpl.compile('<tbody>{{each source as record rowIndex}}' + me._getRowTmpl() + '{{/each}}</tbody>');
                        }
                        return me.compiledTableTmpl;
                    },

                    _registerHelpers: function () {
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
                                        return $filter(helperName).apply(me, arguments);
                                    });
                                });
                            artTmpl.helper('isNode', _.bind(me._isNode, me));
                            artTmpl.helper('getNodeId', _.bind(me._getNodeId, me));
                            artTmpl.helper('isGroupingBy', _.bind(me._isGroupingBy, me));
                            artTmpl.helper('getIndex', _.bind(me._getIndex, me));
                            artTmpl.helper('isCheckedRow', _.bind(me._isCheckedRow, me));
                            artTmpl.helper('getDragStyle', _.bind(me._getDragStyle, me));
                            artTmpl.helper('isLeaf', _.bind(me._isLeaf, me));
                            artTmpl.helper('isHiddenRow', _.bind(me._isHiddenRow, me));
                            artTmpl.helper('rowClassName', _.bind(me._rowClassName, me));
                            artTmpl.helper('columnClassName', _.bind(me._columnClassName, me));
                            me.doneRegisterHelpers = true;
                        }
                    },

                    _syncRows: function (newSource, oldSource) {
                        if (_.isUndefined(newSource)) return;
                        var me = this,
                            scope = me.scope,
                            tbody = me.tbody,
                            trs = tbody.rows,
                            $rows = me.element.find('.table-body tr'),
                            added = Arrays.subtract(newSource, oldSource),
                            removed = Arrays.subtract(oldSource, newSource),
                            balanceCount = added.length - removed.length,
                            minRowIndex = $rows.length,
                            rowIndex, row, $newRow;
                        angular.forEach(removed, function (r) {
                            rowIndex = Arrays.indexOf(oldSource, r);
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
                            $compile(trs[rowIndex])(scope);
                            minRowIndex = Math.min(minRowIndex, rowIndex);
                        });
                        me._keepLazyViewLength(balanceCount);
                        me._refreshRows(minRowIndex);
                    },

                    _refreshRows: function (start, end) {
                        var me = this,
                            scope = me.scope,
                            gridOuterScope = scope.$parent,
                            trs = Array.prototype.slice.apply(me.tbody.rows, arguments),
                            ending = end || scope.source.length,
                            range = _.range(start, ending);
                        if (start >= 0 && start < ending) {
                            angular.forEach(trs, function (index, tr) {
                                var rowIndex = $(tr).index();
                                angular.element(tr).toggleClass('table-body-tr-even', rowIndex % 2 === 1);
                            });
                            gridOuterScope.$broadcast(CONSTANTS.REFRESH_ROWS, range);
                        }
                    },

                    _render: function () {
                        var me = this,
                            tmpl, bodyHtml;
                        me._renderCellsStyle();
                        me._registerHelpers();

                        //懒加载处理****************************BEGIN
                        if (me.scope.lazy === 'true') {
                            me._renderNextLazyPage("");
                            me.element.find("tbody").on("scroll", function () {
                                me._scrollRenderNextLazyPage();
                            });
                        } else {
                            tmpl = me._getCompiledBodyTmpl();
                            bodyHtml = tmpl(me);
                            angular.element(me.tbody).replaceWith(bodyHtml);
                        }
                        //懒加载处理****************************END

                        me.tbody = me.element.find('tbody')[0];
                        me._setTbodyHeight();
                        $document.on('click.hideDropFilter' + me.hash, function () {
                            $('.drop-filter-list').hide();
                        });
                        if (me.$gridPageFiltersContent) {
                            me.$gridPageFiltersContent.width(me.$headerBox.width());
                        }
                    },

                    _handleToggleExpand: function ($event, $target) {
                        var me = this,
                            dataSource = me.dataSource,
                            trs = me.tbody.rows,
                            rowTmpl = me._getCompiledRowTmpl(),
                            isToggleChildren = $target.is('i.table-down-icon'),
                            isExpand, $row, nodeId, node, record, childrenCount, start, childrenRows, isChecked;
                        if (isToggleChildren) {
                            $row = $target.closest('tr');
                            nodeId = $row.data('node-id');
                            node = dataSource.$node(nodeId);
                            record = node.origin;
                            isExpand = $target.hasClass('icon-xiangshang icon-shouqi');
                            if (isExpand && !$row.data('fetchedChildren')) {
                                isChecked = me._isCheckedRow(record);
                                var childrenGroupParams = me.getChildrenGroupParams(record);
                                dataSource.fetchChildren(nodeId, childrenGroupParams, function (children) {
                                    start = _.findIndex(me.source, function (v) {
                                        return v === record
                                    });
                                    var sourceHead = _.head(me.source, start + 1);
                                    var sourceTail = _.tail(me.source, start + 1);
                                    var fetchChildrenCount = children.length;
                                    if (angular.isNumber(me.__editingRowIndex) && me.__editingRowIndex > start - 1) {
                                        me.__editingRowIndex += fetchChildrenCount;
                                    }
                                    if (me.$$modifiedRecords) {
                                        _.forEach(me.$$modifiedRecords, function (record, key) {
                                            console.log(key);
                                        });
                                    }
                                    me._reviseModifiedRecords(start, fetchChildrenCount);
                                    me.source = sourceHead.concat(children).concat(sourceTail);
                                    me._setChildrenIndex(start, children);
                                    //懒加载处理****************************BEGIN
                                    if (me.scope.lazy === 'true') {
                                        me._renderNextLazyPage();
                                    } else {
                                        _.chain(children).reverse().each(function (child) {
                                            $row.after(rowTmpl({record: child}));
                                        });
                                    }
                                    //懒加载处理****************************END
                                    me._changePage();
                                    if (isChecked) {
                                        me.scope.checkedRows = me.scope.checkedRows.concat(children);
                                        me.setCheckedLeafRows();//勾选实际行
                                        me._updateRowCheckbox();
                                        $row.click();
                                    }
                                });
                                $row.data('fetchedChildren', true);
                                $target.addClass('icon-xiangxia icon-zhankai').removeClass('icon-xiangshang icon-shouqi');
                            } else {
                                var hidStart = $row.index();
                                childrenCount = me._getRenderChildrenCount(record); //dataSource.countChildren(record);
                                childrenRows = Array.prototype.slice.call(trs, hidStart + 1, hidStart + childrenCount + 1);
                                if (isExpand) {
                                    me._setChildrenExpandStatus(record, true);
                                    var closedRows = $([]);
                                    _.each(childrenRows, function (children) {
                                        var $children = $(children);
                                        var $icon = $children.find('.table-down-icon');
                                        var childrenIsExpand = $icon.hasClass('icon-xiangshang icon-shouqi');
                                        if (childrenIsExpand) {
                                            closedRows = closedRows.add($children);
                                        }
                                        children.style.display = '';
                                    });
                                    closedRows.each(function (index, el) {
                                        var $el = $(el);
                                        if ($el.is(':hidden')) {
                                            return;
                                        }
                                        var tdIndex = $el.find('.table-down-icon').closest('td').index();
                                        var $currentTr = $el;
                                        var isEnd = false;
                                        while (!isEnd) {
                                            var $nextTr = $currentTr.next('tr');
                                            if ($nextTr.length) {
                                                var nextTdIndex = $nextTr.find('.table-down-icon').closest('td').index();
                                                if (nextTdIndex < 0 || nextTdIndex > tdIndex) {
                                                    $nextTr.hide();
                                                    $currentTr = $nextTr;
                                                } else {
                                                    isEnd = true;
                                                }
                                            } else {
                                                isEnd = true;
                                            }
                                        }
                                    });
                                    $target.addClass('icon-xiangxia icon-zhankai').removeClass('icon-xiangshang icon-shouqi');
                                } else {
                                    me._setChildrenExpandStatus(record, false);
                                    _.each(childrenRows, function (children) {
                                        children.style.display = 'none';
                                    });
                                    $target.addClass('icon-xiangshang icon-shouqi').removeClass('icon-xiangxia icon-zhankai');
                                }
                            }
                        }
                    },
                    //懒加载处理****************************BEGIN
                    _setChildrenExpandStatus: function (record, status) {
                        var me = this,
                            idx = _.findIndex(me.source, function (v) {
                                return v === record
                            }),
                            curIndex = me.rowsIndex[idx].index;

                        for (var i = idx; i < me.rowsIndex.length; i++) {
                            var newIndex = _.head(me.rowsIndex[i].index, curIndex.length);
                            if (_.isEqual(newIndex, curIndex)) {
                                me.rowsIndex[i].isExpand = status;
                            } else {
                                break;
                            }
                        }
                    },
                    _getRenderChildrenCount: function (record) {
                        var me = this,
                            idx = _.findIndex(me.source, function (v) {
                                return v === record
                            }),
                            curIndex = me.rowsIndex[idx].index,
                            rowsIndex = me.rowsIndex,
                            childrenCount = 0;

                        for (var i = idx + 1; i < rowsIndex.length; i++) {
                            var newIndex = _.head(rowsIndex[i].index, curIndex.length);
                            if (_.isEqual(newIndex, curIndex)) {
                                if (me.scope.lazy !== 'true' || rowsIndex[i].isRender) {
                                    childrenCount++;
                                }
                            } else {
                                break;
                            }
                        }
                        return childrenCount;
                    },
                    _scrollRenderNextLazyPage: function () {
                        var me = this,
                            st = me.tbody.scrollTop,
                            gridbodyHeight = $(me.tbody).height(),
                            loadedHeight = $(me.tbody)[0].scrollHeight,
                            offset = 50,
                            lastRenderIndex = -1;

                        if (me._hasGroup()) {
                            for (var i = 0; i < me.rowsIndex.length; i++) {
                                if (!me.rowsIndex[i].isRender && me.rowsIndex[i].isExpand && !me.rowsIndex[i].isHidden) {
                                    lastRenderIndex = i;
                                    break;
                                }
                            }

                            if (lastRenderIndex > 0) {
                                var nodeid = me._getNodeId(me.source[lastRenderIndex - 1]);
                                var $lastRender = me.element.find("tbody tr[data-node-id='" + nodeid + "']");
                                if ($lastRender.length > 0) {
                                    loadedHeight = $lastRender[0].offsetTop;
                                }
                            }
                        }

                        if (loadedHeight < st + gridbodyHeight + offset) {
                            me._renderNextLazyPage();
                        }
                    },
                    _renderNextLazyPage: function () {
                        var me = this,
                            source = me.source || [],
                            pageSize = Math.ceil(me.element.height() / 26),
                            pageData = [];

                        if (source.length == 0) return;
                        for (var i = 0; i < source.length; i++) {
                            if (!me.rowsIndex[i].isRender && me.rowsIndex[i].isExpand && !me.rowsIndex[i].isHidden && pageData.length < pageSize) {
                                pageData.push(source[i]);
                            }
                            if (pageData.length > pageSize) {
                                break;
                            }
                        }

                        if (!_.isEmpty(pageData)) {
                            me._appendRows(pageData);
                        }
                    },
                    _appendRows: function (rowDatas) {
                        var me = this,
                            rowTmpl = me._getCompiledRowTmpl(),
                            $tbody = me.element.find('tbody'),
                            $rows;

                        if ($tbody.find("tr").length == 0) {
                            if (me.doneRegisterHelpers !== true) {
                                me._registerHelpers();
                            }
                            _.chain(rowDatas).each(function (child) {
                                $tbody.append(rowTmpl({record: child}));
                            });
                        } else {
                            _.forEach(rowDatas, function (rowData) {
                                var index = _.findIndex(me.source, function (v) {
                                    return v === rowData
                                });
                                if (me._hasGroup()) {
                                    var nodeid = me._getNodeId(me.source[index - 1]);
                                    $rows = $tbody.find("tr[data-node-id='" + nodeid + "']");
                                } else {
                                    var rowIndex = $tbody.find("tr").length;
                                    if (rowIndex > index) {
                                        $rows = $tbody.find("tr:eq(" + (index - 1) + ")");
                                    } else {
                                        $rows = $tbody.find("tr:eq(" + (rowIndex - 1) + ")");
                                    }
                                }
                                $rows.after(rowTmpl({record: rowData}));
                            });
                        }
                        me._updateDataRenderStatus(rowDatas);
                    },
                    _updateDataRenderStatus: function (rowDatas) {
                        var me = this,
                            source = me.source;

                        _.forEach(rowDatas, function (rowData) {
                            var idx = _.findIndex(source, function (v) {
                                return v === rowData
                            });
                            me.rowsIndex[idx].isRender = true;
                        });
                    },
                    //懒加载处理****************************END

                    //下拉筛选处理**************************BEGIN
                    _valToString: function (val) {
                        if (val === void 0 || val === null) {
                            return '';
                        }
                        return String(val);
                    },
                    _getColumnsDisplay: function (column, uniq) {
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
                                source = me.source;
                                _.forEach(source, function (record) {
                                    var display = me._filterData(data, record);
                                    displays.push((_.isUndefined(display) || _.isNull(display)) ? "" : display);
                                    values.push((_.isUndefined(record[field]) || _.isNull(record[field])) ? "" : record[field]);
                                });
                                uniqDisplays = _.chain(displays).map(me._valToString).uniq().value();
                            }
                            column.displays = displays;
                            column.uniqDisplays = uniqDisplays;
                            column.values = values;
                        }
                        return uniq ? column.uniqDisplays : column.displays;
                    },
                    _filterData: function (data, record) {
                        try {
                            var ret = $parse(data)(record);
                            return ret;
                        } catch (e) {
                            return;
                        }
                    },
                    _trackColumn: function (index) {
                        var me = this;
                        return String(me.dataSource.currentPage) + '_' + String(index);
                    },
                    _isPageFilterCheckAll: function (column) {
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
                    },
                    _hasPageFilter: function (column) {
                        return !!column.savedPageFilters;
                    },
                    _getChildrenRows: function (hidRows) {
                        var me = this,
                            rowsIndex = me.rowsIndex,
                            hiddenRows = [];

                        _.forEach(hidRows, function (hidRow) {
                            var currIndex = rowsIndex[hidRow].index;
                            for (var i = hidRow; i < rowsIndex.length; i++) {
                                var newIndex = _.head(rowsIndex[i].index, currIndex.length);
                                if (_.isEqual(newIndex, currIndex)) {
                                    hiddenRows.push(i);
                                } else {
                                    break;
                                }
                            }
                        });
                        return hiddenRows;
                    },
                    _togglePageFilterCheckAll: function (column) {
                        if (!column) return;
                        var me = this;
                        var isCheckAll = me._isPageFilterCheckAll(column);
                        if (isCheckAll) {
                            column.pageFilters = [];
                        } else {
                            column.pageFilters = _.clone(column.uniqDisplays);
                        }
                        me._updateColumnHiddenRows(column);
                    },
                    _updateColumnHiddenRows: function (column) {
                        var me = this;
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
                            column.pageFiltersValues = _.uniq(pageFiltersValues);
                            column.hiddenRows = me._getChildrenRows(columnHiddenRows);
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

                        var $trs = me.element.find("tbody").find("tr");
                        if (addValues.length > 0 || $trs.length == 0 || _.every($trs, function (tr) {
                                var $tr = $(tr);
                                return $tr.hasClass("page-filter-hide");
                            })) {
                            me.scope.allChecked = false;
                        }
                        if (me.scope.onFilter && _.isFunction(me.scope.onFilter)) {
                            var param = {
                                grid: me,
                                hiddenRows: me.hiddenRows
                            };
                            me.scope.onFilter(param);
                        }
                    },
                    _updateHiddenRows: function () {
                        var me = this;
                        var scope = me.scope;
                        var oldHiddenRows = me.hiddenRows || [];
                        var hiddenRows = me._getHiddenRows();
                        me.hiddenRows = hiddenRows;
                        var addHiddenRows = _.difference(hiddenRows, oldHiddenRows);
                        var removeHiddenRows = _.difference(oldHiddenRows, hiddenRows);
                        var source = me.source;
                        var newCheckedRows;
                        var $tbody = me.element.find("tbody");
                        _.forEach(addHiddenRows, function (i) {
                            var $rows;
                            if (me._hasGroup()) {
                                var nodeid = me._getNodeId(source[i]);
                                $rows = $tbody.find("tr[data-node-id='" + nodeid + "']");
                            } else {
                                //$rows = $tbody.find(".grid-col-index:contains('" + (i + 1) + "')").eq(0).parent();
                                $rows = $tbody.children("tr").eq(i);
                            }
                            if ($rows.length > 0) {
                                $rows.addClass('page-filter-hide');
                                $rows.find(".grid-col-checkbox").find(".form-clickbox").removeClass("selected");
                            }
                            me.rowsIndex[i].isHidden = true;
                        });
                        newCheckedRows = _.difference(scope.checkedRows, _.map(addHiddenRows, function (i) {
                            return source[i];
                        }));
                        scope.checkedRows = newCheckedRows;
                        me.setCheckedLeafRows();//勾选实际行
                        _.forEach(removeHiddenRows, function (i) {
                            var $rows;
                            if (me._hasGroup()) {
                                var nodeid = me._getNodeId(source[i]);
                                $rows = $tbody.find("tr[data-node-id='" + nodeid + "']");
                            } else {
                                //$rows = $tbody.find(".grid-col-index:contains('" + (i + 1) + "')").eq(0).parent();
                                $rows = $tbody.children("tr").eq(i);
                            }
                            if ($rows.length > 0) {
                                $rows.removeClass('page-filter-hide');
                            }
                            me.rowsIndex[i].isHidden = false;
                        });
                        if (scope.lazy === 'true') {
                            if ($tbody.find("tr:visible").length < Math.ceil(me.element.height() / 26)) {
                                me._renderNextLazyPage();
                            }
                        }
                    },
                    _isHiddenRow: function (rowIndex) {
                        return _.contains(this.hiddenRows, rowIndex);
                    },
                    _renderPageFilters: function () {
                        var me = this;
                        if (!me.hasDropFilter) {
                            return;
                        }
                        var $gridPageFiltersContent;
                        if (!me.$gridPageFilters) {
                            var $tfoot = me.element.find("table tfoot");
                            if ($tfoot.length == 0) {
                                $tfoot = me.element.find("table").append("<tfoot></tfoot>").find("tfoot");
                            }
                            var $gridPageFilters = me.$gridPageFilters = $('<div class="grid-page-filters"><div class="content"></div></div>');
                            $gridPageFiltersContent = me.$gridPageFiltersContent = me.$gridPageFilters.children('div');
                            $tfoot.append($gridPageFilters);
                            $gridPageFilters.on('click', 'button', function () {
                                var $this = $(this);
                                var field = $this.data('field');
                                me._clearColumnPageFilters(field);
                            });
                            $gridPageFilters.on('dblclick', function () {
                                $gridPageFilters.toggleClass('expand');
                            });
                        } else {
                            $gridPageFiltersContent = me.$gridPageFiltersContent;
                        }
                        var compiledTmpl;
                        if (!me.gridPageFiltersTmplCompiled) {
                            var gridPageFiltersArtTmpl = '{{each columns as column}}\n  {{if column.savedPageFilters}}\n  <span class="filter-item"><button data-field="{{#column.field}}">×</button>\n  <span class="page-filter-text field">{{#column.text}} = </span>\n  <span class="page-filter-text values">[\n    {{each column.savedPageFilters as value}}\n    {{#value}},\n    {{/each}}\n  ]</span></span>\n  {{/if}}\n{{/each}}\n';
                            me.gridPageFiltersTmplCompiled = artTmpl.compile(gridPageFiltersArtTmpl);
                        }
                        compiledTmpl = me.gridPageFiltersTmplCompiled;
                        var html = compiledTmpl(me);
                        $gridPageFiltersContent.empty().append(html).width(me.$headerBox.width());
                    },
                    _clearColumnPageFilters: function (column) {
                        var me = this;
                        if (_.isString(column)) {
                            column = me._getColumnByField(column);
                        }
                        if (column.displays) {
                            column.pageFilters = column.uniqDisplays.concat();
                        } else {
                            delete column.pageFilters;
                        }
                        if (column.values) {
                            column.pageFiltersValues = _.uniq(column.values.concat());
                        } else {
                            delete column.pageFiltersValues;
                        }
                        delete column.savedPageFilters;
                        delete column.savedPageFiltersValues;
                        delete column.hiddenRows;
                        var oldHiddenRows = me.hiddenRows;
                        var newHiddenRows = me._getHiddenRows();
                        me.hiddenRows = newHiddenRows;
                        _.chain(oldHiddenRows)
                            .difference(newHiddenRows)
                            .forEach(function (rowIndex) {
                                var $rows;
                                if (me._hasGroup()) {
                                    var nodeid = me._getNodeId(me.source[rowIndex]);
                                    $rows = me.element.find("tbody tr[data-node-id='" + nodeid + "']");
                                } else {
                                    $rows = me.element.find("tbody tr:eq(" + rowIndex + ")");
                                }
                                $rows.removeClass('page-filter-hide');
                            })
                            .value();
                        me._renderPageFilters();
                        me.element.find('thead th .filter-column').removeClass('filter-column');
                    },
                    _getColumnByField: function (field) {
                        var me = this;
                        var columns = me.columns;
                        var column = _.find(columns, function (col) {
                            return col.field === field;
                        });
                        return column;
                    },
                    _getHiddenRows: function () {
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
                    },
                    _resetPageFilters: function () {
                        var me = this;
                        var columns = me.__originalCols || me.columns;
                        //delete me.hiddenRows;
                        _.forEach(columns, function (column) {
                            delete column.displays;
                            delete column.uniqDisplays;
                            delete column.values;
                            delete column.hiddenRows;
                            delete column.pageFilters;
                            delete column.pageFiltersValues;
                        });
                    },
                    _changePage: function () {
                        var me = this;
                        me._resetPageFilters();
                        me._applySavedPageFiltersValues();
                        //me.element.find("tbody").scrollTop(0);
                    },
                    _applySavedPageFiltersValues: function () {
                        var me = this;
                        var columns = me.columns;
                        _.forEach(columns, function (column) {
                            me._applyColumnSavedPageFiltersValues(column);
                        });
                        var hiddenRowsIndex = me._getHiddenRows();
                        me.hiddenRows = hiddenRowsIndex;
                    },
                    _applyColumnSavedPageFiltersValues: function (column) {
                        if (!column.savedPageFiltersValues) {
                            return;
                        }
                        var me = this;
                        var source = me.source;
                        var savedPageFiltersValues = column.savedPageFiltersValues;
                        var field = column.field;
                        var hiddenRowsIndex = [];
                        _.forEach(source, function (record, index) {
                            var value = record[field];
                            if (!_.contains(savedPageFiltersValues, value)) {
                                hiddenRowsIndex.push(index);
                                me.rowsIndex[index].isHidden = true;
                            }
                        });
                        column.hiddenRows = hiddenRowsIndex;
                    },
                    //下拉筛选处理**************************END

                    /*============================
                     * 以下是树节点判断函数
                     *============================
                     */

                    _isNode: function (record) {
                        return !!this._getNodeId(record);
                    },

                    _getNodeId: function (record) {
                        try {
                            return this.dataSource.$id(record);
                        } catch (e) {
                        }
                    },

                    _isCheckedRow: function (record) {
                        var me = this;
                        var checkedRows = me.scope.checkedRows;
                        var isChecked = _.contains(checkedRows, record);
                        return isChecked;
                    },

                    _isGroupingBy: function (record, colField) {
                        try {
                            var node = this.dataSource.$node(record);
                            return !node.isLeaf() && _.last(node.groupParams).property === colField;
                        } catch (e) {
                            return false;
                        }
                    },

                    _isLeaf: function (record) {
                        var me = this;
                        var node = me.dataSource.$node(record);
                        return node.isLeaf();
                    },

                    _getIndex: function (record) {
                        var me = this;
                        var source = me.source;
                        var rowIndex = _.findIndex(source, function (v) {
                            return v === record
                        });
                        var indexObj = me.rowsIndex[rowIndex];
                        var indexStr;
                        if (indexObj.group) {
                            indexStr = 'G-' + indexObj.index.join('.');
                        } else {
                            indexStr = _.last(indexObj.index);
                        }
                        return indexStr;
                    },

                    _initRowsIndex: function () {
                        var me = this;
                        var source = me.source;
                        var dataSource = me.dataSource;
                        var pageSize = dataSource.pageSize;
                        var currentPage = dataSource.currentPage;
                        var hasGroup = me._hasGroup();
                        var rowsIndex = _.map(source, function (record, rowIndex) {
                            var index = pageSize * (currentPage - 1) + rowIndex + 1;
                            if (!hasGroup) {
                                return {
                                    group: false,
                                    index: [index],
                                    isRender: false,
                                    isHidden: false,
                                    isExpand: true
                                };
                            } else {
                                return {
                                    group: true,
                                    index: [index],
                                    isRender: false,
                                    isHidden: false,
                                    isExpand: true
                                };
                            }
                        });
                        me.rowsIndex = rowsIndex;
                    },

                    _setChildrenIndex: function (parentRowIndex, childrenRecord) {
                        var me = this;
                        var rowsIndex = me.rowsIndex;
                        var parentIndex = rowsIndex[parentRowIndex];
                        var head = _.head(rowsIndex, parentRowIndex + 1);
                        var tail = _.tail(rowsIndex, parentRowIndex + 1);
                        var isLeaf;
                        var childrenIndex = _.map(childrenRecord, function (record, index) {
                            var indexObj = {};
                            if (_.isUndefined(isLeaf)) {
                                isLeaf = me._isLeaf(record);
                            }
                            indexObj.group = !isLeaf;
                            indexObj.index = parentIndex.index.concat(index + 1);
                            indexObj.isRender = false;
                            indexObj.isHidden = false;
                            indexObj.isExpand = true;
                            return indexObj;
                        });
                        me.rowsIndex = head.concat(childrenIndex).concat(tail);
                    },

                    _hasGroup: function () {
                        if (this.groups) {
                            return !!this.groups.length;
                        }
                        return false;
                    },

                    //校验布局对象
                    validLayout: function (data) {
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
                    },

                    //加载布局并渲染
                    loadLocalStorageLayout: function () {
                        var me = this,
                            scope = me.scope,
                            layout = LocalStorages.get(scope.colSettingsKey);
                        return layout;
                    },

                    //保存布局
                    storeLocalStorageLayout: function (layout) {
                        var version,
                            me = this,
                            scope = me.scope;
                        if (!!scope.colSettingsKey && angular.isObject(layout)) {
                            version = layout.version ? (layout.version + 1) : new Date().getTime;
                            layout.version = version;
                            LocalStorages.set(scope.colSettingsKey, layout);
                        }
                    },

                    _enterCols: function (cols) {
                        var me = this;
                        if (!me.__originalCols) {
                            me.__originalCols = me.columns;
                        }
                        me.columns = cols;
                        me.groups = evalGroups(cols);
                        me._reSortHeaders();
                        me._reSortFooters();
                        me._restColSettingsBtn();
                        me._restAllTmpl();
                        me.dataSource.setGroups(me.groups);
                        me._render();
                        me._renderPageFilters();
                        me._resetPageFilters();
                        if (me.dataSource.allowAutoLoad) {
                            me.dataSource.doRequestData(1, {groups: [_.first(me.groups)]}, function () {
                                me._render();
                            });
                        }

                        function evalGroups(cols) {
                            return _.chain(cols)
                                .map(function (col) {
                                    if (col.group === true) {
                                        return {property: col.field};
                                    }
                                })
                                .filter(_.negate(_.isUndefined))
                                .value();
                        }
                    },

                    _restAllTmpl: function () {
                        delete this.rowTmpl;
                        delete this.compiledRowTmpl;
                        delete this.compiledTableTmpl;
                        delete this.doneRegisterHelpers;
                    },

                    /**
                     * 将表头按照表格设置（列排序、显示隐藏）重新渲染
                     * @private
                     */
                    _reSortHeaders: function () {
                        var me = this,
                            tmpledCells,
                            $headRow = me.element.find('thead tr:last'),
                            headers = $headRow.children('th'),
                            funcCellsCount = 0;
                        if (me.hasCheckbox) {
                            funcCellsCount++;
                        }
                        if (me.hasIndex) {
                            funcCellsCount++;
                        }
                        tmpledCells = _.rest(headers, funcCellsCount);
                        tmpledCells.pop(); // 滚动条位置
                        _.chain(tmpledCells)
                            .map(angular.element)
                            .map(function ($cell) {
                                return {
                                    $cell: $cell,
                                    idx: _.indexOf(me.columns, getColumn($cell))
                                };
                            })
                            .filter(function (x) {
                                if (x.idx === -1) {
                                    x.$cell.hide();
                                    return false;
                                }
                                x.$cell.show();
                                return true;
                            })
                            .sortBy(_.property('idx'))
                            .map(_.property('$cell'))
                            .reduce(function ($left, $right) {
                                return $right.insertAfter($left);
                            });

                        function getColumn($cell) {
                            return $cell.isolateScope().column;
                        }
                    },

                    _reSortFooters: function () {
                        var me = this,
                            $footerRow = me.element.find('tfoot > tr'),
                            footers = $footerRow.children('th'),
                            funcCellsCount = 0,
                            tmpledCells, pairs;
                        if (me.hasCheckbox) {
                            funcCellsCount++;
                        }
                        if (me.hasIndex) {
                            funcCellsCount++;
                        }
                        tmpledCells = _.rest(footers, funcCellsCount);
                        tmpledCells.pop(); // 滚动条位置
                        pairs = _.map(tmpledCells, function (cell) {
                            "use strict";
                            var $cell = angular.element(cell),
                                column = $cell.data(CONSTANTS.DATA_COLUMN_INSTANCE_KEY),
                                idx = _.indexOf(me.columns, column);
                            return {
                                $cell: $cell,
                                idx: idx
                            };
                        });

                        _.chain(pairs)
                            .filter(_.matcher({idx: -1}))
                            .pluck('$cell')
                            .invoke('hide');

                        _.chain(pairs)
                            .filter(_.negate(_.matcher({idx: -1})))
                            .sortBy(_.property('idx'))
                            .pluck('$cell')
                            .invoke('show')
                            .reduce(function ($left, $right) {
                                return $right.insertAfter($left);
                            });
                    },


                    /**
                     * 获取请求子集的分组参数，
                     * @param parentRecord 父记录
                     */
                    getChildrenGroupParams: function (parentRecord) {
                        var me = this,
                            ds = me.dataSource,
                            allGroups = me.groups,
                            node = ds.$node(parentRecord),
                            parentGroups = node.groupParams,
                            groups = [],
                            last;
                        angular.copy(parentGroups, groups);
                        last = _.last(groups);
                        last.value = parentRecord[last.property];
                        if (groups.length < allGroups.length) {
                            groups[groups.length] = angular.copy(allGroups[groups.length]);
                        }
                        return groups;
                    },
                    _restColSettingsBtn: function () {
                        var me = this,
                            scope = me.scope,
                            funcCellsCount = 0,
                            $headRow, $headers;
                        if (me.hasCheckbox) {
                            funcCellsCount++;
                        }
                        if (me.hasIndex) {
                            funcCellsCount++;
                        }
                        if (!!scope.colSettingsKey) {
                            $headRow = me.element.find('thead > tr:last');
                            $headRow.find('.set-btns').remove();
                            $headers = $headRow.find('th:visible');
                            $headers = $(_.rest($headers, funcCellsCount));
                            $headers.first().append($compile('<div class="set-btns"><i data-col-settings class="iconfont2 fi-set set-btn" ng-click="groupGrid._startSetting($event)"></i>' + (me.hasColumnFilter ? '<i data-col-settings class="fi fi-refresh-small set-btn" ng-click="groupGrid._clearFilter($event)"></i>' : '') + '</div>')(scope));
                        }
                    },

                    _startSetting: function ($event) {
                        var me = this, menuElement;
                        ColGroupSettings._startSetting(me);
                        menuElement = angular.element(document.getElementById('dropdownMenu_' + me.scope.colSettingsKey));
                        menuElement.removeClass("open");
                        $event.stopPropagation();
                    },

                    _findColByField: function (field) {
                        var me = this, columns;
                        columns = _(me.__originalCols).filter(function (col) {
                            return col.columnName === field;
                        });
                        return columns[0];
                    },

                    _loadAndReSortHeadersIfStored: function () {
                        var me = this, colSettings;
                        if (me.scope.colSettingsKey) {
                            colSettings = LocalStorages.get(me.scope.colSettingsKey);
                        }
                        if (colSettings) {
                            me.columns = _.map(colSettings, function (colSetting) {
                                return me._findColByField(colSetting.field);
                            });
                        } else {
                            me.columns = me.__originalCols;
                        }
                        me._reSortHeaders();
                        me._reSortFooters();
                    },
                    _registerLayoutService: function () {
                        var me = this, menuDiv,
                            tableId = me.scope.colSettingsKey;
                        if (!tableId || tableId === "") {
                            return;
                        }
                        menuDiv = angular.element('<div data-target="dropdownMenu_' + tableId + '" context-menu="" class="ng-isolate-scope" data-hitarea="thead"></div>');
                        me.element.wrap($compile(menuDiv)(me.scope));
                        gridLayoutService.registerLayout(me.scope, me);

                        me.$headerBox.on('mousedown', ':input', function (e) {
                            if (e.button === 2) {
                                this.blur();
                                e.preventDefault();
                            }
                        });
                    },

                    getLayout: function () {
                        var me = this,
                            curColSettings,
                            allColWidths = me._getAllColWidths();
                        curColSettings = _.map(me.columns, function (col) {
                            var field = col.columnName;
                            var width = allColWidths[col.index];
                            return {field: field, width: width, group: col.group};
                        });
                        return JSON.stringify({
                            layout: curColSettings,
                            sortName: me.sortName,
                            sortDirection: me.sortDirection
                        });
                    },

                    storeLayout: function (layout) {
                        var me = this,
                            dataSource = me.dataSource;
                        if (!me.__originalCols) {
                            me.__originalCols = me.columns;
                        }
                        me.storeLocalStorageLayout(layout);
                        if (layout && !_(layout.content).isEmpty()) {
                            var layoutContent = layout.content;
                            me.colSettings = layoutContent.layout;
                            me.columns = _.map(me.colSettings, function (colSetting) {
                                var col = me._findColByField(colSetting.field);
                                return _.extend(col, {
                                    width: colSetting.width,
                                    group: colSetting.group
                                });
                            });
                            me.sortName = layoutContent.sortName;
                            me.sortDirection = layoutContent.sortDirection;
                        } else {
                            me.colSettings = {};
                            me.columns = _(me.__originalCols).map(function (col) {
                                delete col.width;
                                delete col.group;
                                return col;
                            });
                            me.sortName = [];
                            me.sortDirection = [];
                        }
                        me.columns = _.without(me.columns, void 0, null);
                        if (dataSource) {
                            if (dataSource.allowAutoLoad) {
                                dataSource.sortName = me.sortName;
                                dataSource.sortDirection = me.sortDirection;
                                dataSource.doRequestData();
                            }
                        } else {
                            GroupDataSources.get(me.attrs.sourceName).then(function (dataSource) {
                                dataSource.sortName = me.sortName;
                                dataSource.sortDirection = me.sortDirection;
                                if (me.__rendered) {
                                    dataSource.doRequestData();
                                }
                            });
                        }
                    },
                    reload: function () {
                        var me = this;
                        me.scope.allChecked = false;
                        if (me._hasCheckedBox()) {
                            me.scope.checkedRows = [];
                            me.scope.checkedLeafRows = [];//勾选实际行
                        }
                        me._enterCols(me.columns);
                    },

                    _hasHorizontalScroll: function () {
                        var me = this;
                        var tbody = me.tbody;
                        var tbodyScrollWidth = tbody.scrollWidth;
                        var tbodyWidth = me.element.width();
                        return tbodyScrollWidth > tbodyWidth;
                    },

                    _hasVerticalScroll: function () {
                        var me = this;
                        var tbody = me.tbody;
                        var tbodyScrollHeight = tbody.scrollHeight;
                        var tbodyHeight = $(tbody).height();
                        return tbodyScrollHeight > tbodyHeight;
                    },

                    _getContentWidth: function () {
                        var me = this,
                            gridWidth = me.element.width(),
                            gridContentWidth = gridWidth - 2;
                        if (me._hasVerticalScroll()) {
                            gridContentWidth -= CONSTANTS.SPACE_CELL_WIDTH;
                        }
                        return gridContentWidth;
                    },

                    _getSingleColWidth: function (columnWidthDef, gridContentWidth) {
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
                    },

                    _getAllColWidths: function () {
                        var me = this,
                            __originalCols = me.__originalCols || me.columns,
                            gridContentWidth = me._getContentWidth(),
                            columnWidths,
                            colSettings = me.colSettings;
                        columnWidths = Arrays.transform(__originalCols, function (col) {
                            var field = col.columnName, colSetting;
                            if (col.width) {
                                return col.width;
                            }
                            if (_.isArray(colSettings)) {
                                colSetting = _.findWhere(colSettings, {field: field});
                                if (colSetting && colSetting.width) {
                                    return colSetting.width;
                                }
                            }
                            return me._getSingleColWidth(col.widthDef, gridContentWidth);
                        });
                        paddingWithSpentAvg(columnWidths, gridContentWidth, CONSTANTS.MIN_CELL_WIDTH);
                        return columnWidths;

                    },

                    _getColWidthClassBlocks: function (allColWidths) {
                        var me = this,
                            colWidthClassBlocks = [],
                            colWidthClassName, colWidthClassBlock;
                        angular.forEach(allColWidths, function (colWidth, colIndex) {
                            if (me.hasCheckbox) {
                                colIndex++;
                            }
                            if (me.hasIndex) {
                                colIndex++;
                            }
                            colWidthClassName = me._getColWidthClassName(colIndex);
                            colWidthClassBlock = _toWidthClassBlock(colWidthClassName, colWidth);
                            colWidthClassBlocks.push(colWidthClassBlock);
                        });
                        return colWidthClassBlocks;
                    },

                    _renderCellsStyle: function () {
                        var me = this,
                            element = me.element,
                            allColWidths = me._getAllColWidths(),
                            colWidthClassBlocks = me._getColWidthClassBlocks(allColWidths),
                            cellWidthStyleBlockContent = _.reduce(colWidthClassBlocks, Functions.sum),
                            $newCellStyleBlock = angular.element('<style>' + cellWidthStyleBlockContent + (me.indexColStyle || '') + '</style>');
                        element.children('style').remove();
                        element.append($newCellStyleBlock);
                        me._reCalculateWidth();
                    },

                    _reCalculateWidth: function () {
                        var me = this,
                            groupGrid = me.element.children('table'),
                            restWidth = me.element.width() - groupGrid.width(),
                            scrollSpaceWidth = _.max([restWidth, 17]);
                        me.element.append('<style>table.com-table th.table-scroll-space,table.com-table td.table-scroll-space{width:' + scrollSpaceWidth + 'px;}</style>');
                        if (me.$gridPageFiltersContent) {
                            me._setTbodyHeight();
                            me.$gridPageFiltersContent.width(me.$headerBox.width());
                        }
                    },

                    _setColWidth: function () {
                        var me = this,
                            i, len, width, thElements;
                        thElements = me.$headerBox.find("th:visible");
                        for (i = 0, len = me.columns.length; i < len; i++) {
                            width = angular.element(thElements[i]).width();
                            me.columns[i].width = width;
                        }
                    },

                    _getColWidthClassName: function (startColIndex) {
                        return 'grid-' + this.hash + '-col-' + startColIndex;
                    },

                    autoWidthColumns: function () {
                        var me = this;
                        var $table = me.element.find('.com-table');
                        var $th = me.$headerBox.find('th:visible');
                        var $style = me.element.find('style');
                        var styleText = '';
                        var tableWidth = me.$headerBox.find('.grid-col-checkbox').outerWidth();
                        $th.removeAttr('width');
                        $table.addClass('autoWidthColumns');
                        $th.each(function (index, el) {
                            var $el = $(el);
                            var headerScope = $el.isolateScope();
                            var classArr = $el.attr('class').split(' ');
                            _.forEach(classArr, function (cls) {
                                if (cls.indexOf('grid-') === 0 && cls.indexOf('checkbox') < 0) {
                                    var width = $el.outerWidth();
                                    tableWidth += width;
                                    styleText += '.' + cls + '{width:' + width + 'px;}';
                                    if (headerScope) {
                                        var col = headerScope.column;
                                        col.width = width;
                                    }
                                    return false;
                                }
                            });
                        });
                        $style.html(styleText);
                        $table.removeClass('autoWidthColumns');
                        //$table.css('width', tableWidth + 'px');
                    },

                    _clearFilter: function ($event) {
                        var me = this;
                        me.scope.filter = {};
                        $event.stopPropagation();
                    },

                    _setTbodyHeight: function () {
                        var me = this;
                        var $tbody = $(me.tbody);
                        var element = me.element;
                        var $thead = me.$headerBox;
                        var $tfoot = element.find('tfoot');
                        var headHeight = $thead.outerHeight();
                        var footHeight = $tfoot.outerHeight();
                        var elementHeight = element.height();
                        var elementWidth = element.width();
                        var bodyHeight = elementHeight - headHeight - footHeight;
                        if (me._hasHorizontalScroll()) {
                            bodyHeight -= getScrollBarWidth();
                        }
                        $tbody.height(bodyHeight);
                        me.bodyWidth = elementWidth;
                        me._resetBodyWidth();
                        function getScrollBarWidth() {
                            var noScroll, scroll, oDiv = document.createElement("DIV");
                            oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
                            noScroll = document.body.appendChild(oDiv).clientWidth;
                            oDiv.style.overflowY = "scroll";
                            scroll = oDiv.clientWidth;
                            document.body.removeChild(oDiv);
                            return noScroll - scroll;
                        }
                    },

                    _resetBodyWidth: function () {
                        var me = this;
                        if (!me.bodyWidth) {
                            return;
                        }
                        var element = me.element;
                        var $thead = me.$headerBox;
                        var $tbody = $(me.tbody);
                        var scrollLeft = element.scrollLeft();
                        var bodyWidth = me.bodyWidth;
                        var realBodyWidth = bodyWidth + scrollLeft;
                        var headWidth = $thead.outerWidth();
                        realBodyWidth = _.min([realBodyWidth, headWidth]);
                        $tbody.width(realBodyWidth);
                    },

                    _renderLayout: function () {
                        var me = this;
                        var scope = me.scope;
                        if (me._layoutRendered) {
                            return;
                        }
                        me._layoutRendered = true;

                        //监听筛选器
                        scope.$watch('filter', function (newFilters, oldFilters) { //懒加载处理
                            var dataSource = me.dataSource,
                                dataSourceProxy = dataSource.pageDataSourceProxy,
                                params = {
                                    filterName: [],
                                    filterValue: []
                                };
                            dataSourceProxy.currentPage = 1;
                            if (dataSourceProxy) {
                                _.each(newFilters, function (filterVal, filterName) {
                                    if (filterVal === 0 || !!filterVal) {
                                        params.filterName.push(filterName);
                                        params.filterValue.push(filterVal);
                                    }
                                });
                                dataSourceProxy.params = _.extendOwn(params, _.omit(dataSourceProxy.params, 'filterName', 'filterValue'));
                                if (dataSource.allowAutoLoad && newFilters !== oldFilters) { //懒加载处理
                                    dataSource.doRequestData();
                                }
                            }
                        }, true);

                        me._registerHeaderDraggable();

                        scope.gridDbClick = function ($event) {
                            var target, $target;
                            target = $event.target || $event.srcElement;
                            $target = angular.element(target);
                            if (!$target.closest('tbody').is(me.element.find('tbody'))) {
                                return;
                            }
                            var $cell = $target.closest('td'),
                                $row = $cell.closest('tr');
                            me._rowDbClick($event, $row);
                        };

                        if (scope.draggable) {
                            var columns = me.__originalCols || me.columns;
                            _.forEach(columns, function (col) {
                                col.element.attr("draggable", "true");
                            });
                        }

                        if (scope.dragCheck === 'true') {
                            me._bindDragCheckEvent();
                        }
                    },

                    _bindDragCheckEvent: function () {
                        var me = this;
                        var scope = me.scope;
                        var element = me.element;
                        scope.isMouseDown = false;
                        scope.isMouseMove = false;
                        element.on('mousedown', function (event) {
                            var target = event.target;
                            var $target = $(target);
                            if ($target.hasClass('grid-body-col-index') || $target.hasClass('grid-body-col-checkbox')) {
                                scope.isMouseDown = true;
                                //var rowIndex = $target.closest('tr').index();
                                var rowIndex = $target.closest('tr').attr("data-record-index") - 1;
                                scope.startIndex = scope.endIndex = rowIndex;
                                element.addClass('no-user-select');
                                return false;
                            }
                        });
                        element.on('mousemove', function () {
                            if (scope.isMouseDown) {
                                var target = event.target;
                                var $target = $(target);
                                var $rows = $(me.tbody).find('tr');
                                scope.isMouseMove = true;
                                if ($target.hasClass('grid-body-col-index') || $target.hasClass('grid-body-col-checkbox')) {
                                    //var rowIndex = $target.closest('tr').index();
                                    var rowIndex = $target.closest('tr').attr("data-record-index") - 1;
                                    scope.endIndex = rowIndex;
                                    var _startIndex = scope.startIndex > scope.endIndex ? scope.endIndex : scope.startIndex,
                                        _endIndex = scope.startIndex > scope.endIndex ? scope.startIndex : scope.endIndex;
                                    $rows.each(function (index, row) {
                                        var $row = $(row);
                                        var n = $row.attr("data-record-index") - 1;
                                        if (n >= _startIndex && n <= _endIndex) {
                                            $row.addClass('checking-row');
                                        } else {
                                            $row.removeClass('checking-row');
                                        }
                                    });
                                    return false;
                                }
                            }
                        });
                        $document.on("mouseup.dragcheck" + me.hash, function () {
                            if (scope.isMouseDown && scope.isMouseMove) {
                                var _startIndex = scope.startIndex > scope.endIndex ? scope.endIndex : scope.startIndex,
                                    _endIndex = scope.startIndex > scope.endIndex ? scope.startIndex : scope.endIndex;
                                scope.startIndex = scope.endIndex = null;
                                me._finishDragCheck(_startIndex, _endIndex);
                            }
                            scope.isMouseDown = false;
                            scope.isMouseMove = false;
                        });
                    },

                    _finishDragCheck: function (start, end) {
                        var me = this;
                        var scope = me.scope;
                        var source = me.source;
                        var element = me.element;
                        var $rows = $(me.tbody).find('tr');
                        var checkedRows = scope.checkedRows.concat();
                        var addRows = [];
                        var removeRows = [];
                        var rowsIndex = me.rowsIndex;
                        var isLast, currentRowIndexObj, nextRowIndexObj, currentGroupIndex, checked;
                        $rows.removeClass('checking-row');
                        element.removeClass('no-user-select');
                        for (var i = start; i <= end; i++) {
                            currentRowIndexObj = rowsIndex[i];
                            nextRowIndexObj = rowsIndex[i + 1];
                            currentGroupIndex = currentRowIndexObj.index.length;
                            if (i < end && nextRowIndexObj && (nextRowIndexObj.index.length > currentGroupIndex)) {
                                isLast = false;
                            } else {
                                isLast = true;
                            }
                            if (!isLast) {
                                continue;
                            }
                            if (me._isCheckedRow(source[i])) {
                                removeRows.push(source[i]);
                                checked = false;
                            } else {
                                addRows.push(source[i]);
                                checked = true;
                            }
                            if (i === end && rowsIndex[i].group) {
                                var j = i + 1;
                                while (rowsIndex[j] && rowsIndex[j].index.length > currentGroupIndex) {
                                    if (checked) {
                                        if (!me._isCheckedRow(source[j])) {
                                            addRows.push(source[j]);
                                        }
                                    } else {
                                        removeRows.push(source[j]);
                                    }
                                    j++;
                                }
                            }
                        }
                        var newCheckedRows = _.difference(checkedRows, removeRows).concat(addRows);
                        scope.checkedRows = newCheckedRows;
                        me.setCheckedLeafRows();//勾选实际行
                        if (me._hasGroup()) {
                            nextRowIndexObj = null;
                            for (var i = end; i >= start; i--) {
                                currentRowIndexObj = rowsIndex[i];
                                if (nextRowIndexObj && nextRowIndexObj.index.length === currentRowIndexObj.index.length) {
                                    continue;
                                }
                                nextRowIndexObj = currentRowIndexObj;
                                me._toggleParentChecked(source[i], me._isCheckedRow(source[i]));
                            }
                        }
                        me._updateRowCheckbox();
                        me.setCheckedLeafRows();//勾选实际行
                    },

                    _getDragStyle: function () {
                        if (this.scope.dragCheck === 'true') {
                            return 'cursor: s-resize';
                        }
                        return '';
                    },

                    _setDataSourceParamOfLayout: function () {
                        var me = this,
                            groups,
                            dataSourceProxy,
                            dataSource = me.dataSource;
                        if (!dataSource) {
                            dataSource = GroupDataSources.get(me.attrs.sourceName);
                        }
                        dataSource.sortName = me.sortName;
                        dataSource.sortDirection = me.sortDirection;
                        dataSourceProxy = dataSource.pageDataSourceProxy;
                        if (dataSourceProxy) {
                            dataSourceProxy.sortName = me.sortName;
                            dataSourceProxy.sortDirection = me.sortDirection;
                            groups = _(me.columns).chain().filter(function (item) {
                                return (!angular.isUndefined(item.group) && item.group === true);
                            }).map(function (col) {
                                return col.field;
                            }).value();
                            dataSource.setGroups(groups);
                            dataSourceProxy.currentPage = 1;
                            if (!_(groups).isEmpty()) {
                                if (!dataSourceProxy.params) {
                                    dataSourceProxy.params = {};
                                }
                                dataSourceProxy.params['groups[0].property'] = groups[0];
                            }

                        }
                    },
                    _applyLocalStorageLayout: function () {
                        var me = this,
                            layout;
                        if (!me.__originalCols) {
                            me.__originalCols = me.columns;
                        }
                        if (me.scope.colSettingsKey && me.scope.colSettingsKey.length > 0) {
                            //加载LocalStorage布局
                            layout = me.loadLocalStorageLayout();
                            if (layout && !_(layout.content).isEmpty()) {
                                var layoutContent = layout.content;
                                me.colSettings = layoutContent.layout;
                                me.columns = _.map(me.colSettings, function (colSetting) {
                                    var col = me._findColByField(colSetting.field);
                                    return _.extend(col, {
                                        width: colSetting.width,
                                        group: colSetting.group
                                    });
                                });
                                me.sortName = layoutContent.sortName;
                                me.sortDirection = layoutContent.sortDirection;
                                me._setDataSourceParamOfLayout();
                                me.reload();
                            }
                        }
                    },
                    getVisibleFields: function () {
                        var columns = this.columns;
                        var fields = [];
                        _(columns).forEach(function (column) {
                            if (column.field && !column.hidden && !column.noPermit) {
                                fields.push(column.field);
                            }
                        });
                        return fields;
                    },
                    getGroupFields: function () {
                        var columns = this.columns;
                        var fields = [];
                        _(columns).forEach(function (column) {
                            if (column.field && column.group === true) {
                                fields.push(column.field);
                            }
                        });
                        return fields;
                    },
                    getQueryParams: function () {
                        var me = this;
                        var dataSource = me.dataSource;
                        var requestParams = {};
                        if (dataSource && dataSource.pageDataSourceProxy) {
                            requestParams = dataSource.pageDataSourceProxy.requestParams || {};
                        }
                        return requestParams;
                    },
                    getParentGroupValue: function (rowData, fieldName, idx) {
                        var me = this,
                            rowIndex,
                            newIndex,
                            parentRowIndex,
                            parentIndex,
                            parentData;

                        rowIndex = me.rowsIndex[_.findIndex(me.source, function (v) {
                            return v === rowData
                        })];
                        newIndex = _.head(rowIndex.index, rowIndex.index.length - (rowIndex.index.length - idx - 1));

                        parentRowIndex = _.find(me.rowsIndex, function (row) {
                            return _.isEqual(row.index, newIndex);
                        });

                        parentIndex = _.findIndex(me.rowsIndex, parentRowIndex);
                        parentData = me.source[parentIndex];

                        return parentData[fieldName] || "";
                    },
                    getAllQueryParams: function () {
                        var me = this;
                        var filters = [],
                            trunks = _.difference(me.scope.checkedRows, me.scope.checkedLeafRows),
                            groups = [],
                            leafs = me.scope.checkedLeafRows;

                        _.forEach(me.columns, function (column) {
                            if (column.savedPageFiltersValues === undefined) return;
                            if (column.savedPageFiltersValues.length > 0) {
                                var filterObj = {
                                    field: column.field,
                                    value: column.savedPageFiltersValues
                                };
                                filters.push(filterObj);
                            } else if (column.savedPageFiltersValues.length == 0) {
                                var filterObj = {
                                    field: column.field,
                                    value: false
                                };
                                filters.push(filterObj);
                            }
                        });

                        _.forEach(trunks, function (trunk) {
                            var gg = [];
                            var recordIndex = _.findIndex(me.source, trunk);
                            _.each(me.groups, function (el, idx) {
                                var fieldValue = '';
                                if (idx >= me.rowsIndex[recordIndex].index.length) return;
                                if (trunk.hasOwnProperty(el.property)) {
                                    fieldValue = trunk[el.property];
                                } else {
                                    fieldValue = me.getParentGroupValue(trunk, el.property, idx);
                                }
                                gg.push({field: el.property, value: fieldValue});
                            });
                            groups.push(_.flatten(gg));
                        });

                        return {
                            groups: groups,
                            filters: filters,
                            rows: leafs
                        };
                    },

                    /* 分组表格编辑 */
                    startEdit: function (rowIndex) {
                        var me = this;
                        var scope = me.scope;
                        var outerScope = scope.$parent;
                        var columns = me.columns;
                        var rowScope, tr, originRecord, originNgModel, node, nodeId, isLeaf;
                        var sourceIndex = me.rowIndexToSourceIndex(rowIndex);
                        tr = me.tbody.rows[rowIndex];
                        if (angular.isNumber(me.__editingRowIndex) || !tr || !tr.cells) {
                            return;
                        }
                        nodeId = $(tr).data('node-id');
                        originRecord = me.source[sourceIndex];
                        if (nodeId) {
                            node = me.dataSource.$node(nodeId);
                            isLeaf = node.isLeaf();
                        }
                        if (node && !isLeaf) {
                            return;
                        }
                        me._editingRecord = _.clone(originRecord);
                        rowScope = getNewerEditingScope();
                        console.log('===== startEdit:', rowIndex, '=====');
                        console.log('sourceIndex:', sourceIndex);
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
                                originNgModel = $editor.attr('ng-model');
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
                                if (!$editor.attr('name')) {
                                    $editor.attr('name', column.field);
                                }
                                if (me.scope.validatorName) {
                                    $editor.attr('g-field-validator', '');
                                    $editor.data('$formController', me.formController);
                                    $editor.data('$gValidatorController', me.gValidatorController);
                                    $editor.data('$dataSource', me.source);
                                }
                                $displayPlace.hide();
                                $editorPlace.append($editor);
                            }
                        });
                        $compile(tr)(rowScope);
                        me.__editingRowIndex = sourceIndex;

                        function getNewerEditingScope() {
                            var copy = me.$$modifiedRecords[sourceIndex];
                            if (!copy) {
                                copy = me.$$modifiedRecords[sourceIndex] = {};
                                angular.copy(originRecord, copy);
                            }

                            var newerScope = outerScope.$new(false);
                            newerScope.row = originRecord;
                            newerScope.record = originRecord;
                            newerScope.rowIndex = sourceIndex;
                            newerScope.grid = me;
                            newerScope.source = me.source;

                            newerScope.editingRecord = originRecord;
                            return newerScope;
                        }
                    },

                    /* 已渲染的行序号对应的实际 source 的序号 */
                    rowIndexToSourceIndex: function (rowIndex) {
                        var me = this;
                        var source = me.source;
                        var rowsIndex = me.rowsIndex;
                        var sourceIndex = -1;
                        var renderedCount = 0;
                        _.find(rowsIndex, function (v, i) {
                            if (v.isRender) {
                                renderedCount++;
                                if (renderedCount - 1 === rowIndex) {
                                    sourceIndex = i
                                    return true;
                                }
                            }
                        });
                        return sourceIndex;
                    },

                    /* 实际 source 的序号对应的已渲染的行序号 */
                    sourceIndexToRowIndex: function (sourceIndex) {
                        var me = this;
                        var source = me.source;
                        var rowsIndex = me.rowsIndex;
                        var rowIndex = -1;
                        var renderedCount = 0;
                        _.find(rowsIndex, function (v, i) {
                            if (v.isRender) {
                                renderedCount++;
                            }
                            if (i === sourceIndex) {
                                if (v.isRender) {
                                    rowIndex = renderedCount - 1;
                                }
                                return true;
                            }
                        });
                        return rowIndex;
                    },

                    finishEdit: function (force) {
                        var me = this;
                        var formController = me.formController;
                        var gValidatorController = me.gValidatorController;
                        var rowIndex;
                        if (angular.isNumber(me.__editingRowIndex)) {
                            rowIndex = me.sourceIndexToRowIndex(me.__editingRowIndex);
                            if (!force && formController) {
                                formController.verify();
                                if (!formController.$valid) {
                                    return false;
                                }
                            }

                            var trs = me.tbody.rows;
                            var row = trs[rowIndex];
                            angular.element(row)
                                .find('input.form-suggestbox')
                                .each(function (index, td) {
                                    angular.element(td).scope().$destroy();
                                });
                            $('.form-suggestbox-dropdown').hide();

                            me._reRenderRow(rowIndex);
                            if (gValidatorController) {
                                gValidatorController.clearCurrentGroupVerifyFns();
                            }
                            delete me._editingRecord;
                            delete me.__editingRowIndex;
                        }
                        return true;
                    },

                    getModifiedRows: function () {
                        return angular.element(this.tbody).find('tr.-grid-row-modified');
                    },

                    getModifiedRecords: function () {
                        return _(this.getModifiedRecordMap()).values();
                    },

                    getModifiedRecordMap: function () {
                        var me = this;
                        var source = me.source;
                        var ret = _.chain(me.getModifiedRows())
                            .map(function (tr) {
                                var $tr = $(tr);
                                var rowIndex = $tr.index();
                                var sourceIndex = me.rowIndexToSourceIndex(rowIndex);
                                var record = source[rowIndex];
                                return [rowIndex, record];
                            })
                            .object()
                            .value();
                        return ret;
                    },

                    reverseModified: function () {
                        var me = this;
                        me.getModifiedRows().each(function (i, tr) {
                            var rowIndex = $(tr).index(),
                                sourceIndex = me.rowIndexToSourceIndex(rowIndex),
                                originRecord = me.source[sourceIndex];
                            makeEmpty(originRecord);
                            angular.copy(me.$$modifiedRecords[sourceIndex], originRecord);
                            delete me.$$modifiedRecords[sourceIndex];
                            me._reRenderRow(rowIndex);
                        });
                        function makeEmpty(obj) {
                            for (var key in obj) {
                                if (obj.hasOwnProperty(key))
                                    delete obj[key];
                            }
                        }
                    },

                    _reviseModifiedRecords: function (start, count) {
                        var countAbs = Math.abs(count);
                    },

                    _getColumnIndex: function (cellIndexOrDom) {
                        var cellIndex;
                        if (angular.isNumber(cellIndexOrDom)) {
                            cellIndex = cellIndexOrDom;
                        } else {
                            cellIndex = angular.element(cellIndexOrDom)[0].cellIndex;
                        }
                        cellIndex = this.hasCheckbox ? (cellIndex - 1) : cellIndex;
                        cellIndex = this.hasIndex ? (cellIndex - 1) : cellIndex;
                        return cellIndex;
                    },

                    _getEditorTmpl: function (column) {
                        var me = this;
                        var columnTmplMap = {};
                        GroupGrid.prototype._getEditorTmpl = function (column) {
                            if (column) {
                                var field = column.field;
                                var columnTmpl;
                                if (field) {
                                    if (column.canEdit) {
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
                    },

                    _reRenderRow: function (rowIndex) {
                        var me = this;
                        var trs = me.tbody.rows;
                        var oldTr = trs[rowIndex];
                        var $oldTr = angular.element(oldTr);
                        var sourceIndex = me.rowIndexToSourceIndex(rowIndex);
                        var isHiddenRow = me._isHiddenRow(sourceIndex);
                        var originRecord = me.source[sourceIndex];
                        var styleDisplay = oldTr ? oldTr.style.display : null;
                        if (!originRecord) return;

                        if (me.$$modifiedRecords.hasOwnProperty(sourceIndex)) {
                            var copy = me.$$modifiedRecords[sourceIndex];
                            var newRow, i, len, field, cellIndex, cell;

                            newRow = replaceRow(originRecord);
                            for (i = 0, len = me.columns.length; i < len; i++) {
                                field = me.columns[i].field;
                                if (field) {
                                    var cpVal = copy[field], oldVal = originRecord[field];
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
                                }
                            }
                            if (cellIndex && cellIndex > 0) {
                                angular.element(newRow).addClass('-grid-row-modified');
                            }
                            if (isHiddenRow) {
                                angular.element(newRow).addClass('page-filter-hide');
                            }
                        } else {
                            replaceRow(originRecord);
                        }

                        function isEmpty(val) {
                            return _.isNull(val) || _.isUndefined(val) || val === '';
                        }

                        function compareDate(left, right) {
                            var leftDate = angular.isDate(left) ? left : dateParser(left);
                            var rightDate = angular.isDate(right) ? right : dateParser(right);
                            leftDate.setMilliseconds(0);
                            rightDate.setMilliseconds(0);
                            return leftDate.getTime() === rightDate.getTime();
                        }

                        function replaceRow(record, originRecord) {
                            var newRow;
                            $oldTr.children('[cell-templated]').each(function () {
                                "use strict";
                                angular.element(this).scope().$destroy();
                            });
                            $oldTr.replaceWith(me._getCompiledRowTmpl()({
                                record: record,
                                originRecord: originRecord,
                                rowIndex: sourceIndex,
                                grid: me
                            }));
                            newRow = trs[rowIndex];
                            $compile(newRow)(me.scope);
                            if (styleDisplay) {
                                newRow.style.display = styleDisplay;
                            }
                            return newRow;
                        }

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
                    },

                    //勾选实际行
                    setCheckedLeafRows: function () {
                        var me = this;
                        var checkedRows = me.scope.checkedRows || [],
                            checkedLeafRows = [];

                        _.forEach(checkedRows, function (checkedRow) {
                            var index = _.findIndex(me.source, function (v) {
                                return v === checkedRow
                            });
                            if (!me.rowsIndex[index].group) {
                                checkedLeafRows.push(checkedRow);
                            }
                        });
                        this.scope.checkedLeafRows = checkedLeafRows;
                    }
                };

                return {
                    restrict: 'E',
                    template: '<div class="group-table" ng-click="gridClick($event)" ng-dblclick="gridDbClick($event);">\n    <table class="com-table" border="0" cellspacing="0" cellpadding="0">\n        <thead>\n            <tr>\n            </tr>\n        </thead>\n        <tbody ng-dblclick="bodyDbClick($event)">\n        </tbody>\n    </table>\n    <div class="col-resize-line"></div>\n</div>',
                    replace: true,
                    transclude: true,
                    require: 'gGroupGrid',
                    scope: {
                        sourceName: '@',
                        colSettingsKey: '@',
                        selectedRow: '@',
                        $selectedRow: '=selectedRow',
                        onBeforeSelect: '&',
                        onSelect: '&',
                        checkedRows: '=?checkedRows',//勾选实际行
                        checkedLeafRows: '=?checkedLeafRows',//勾选实际行
                        onBeforeRowDbclick: '&',
                        onRowDbclick: '&',
                        onRender: '&',
                        validatorName: '@',
                        dragCheck: '@',
                        lazy: '@', //懒加载处理
                        gItemClass: '&',
                        sortKeepCheck: '@',
                        onFilter: '&'
                    },
                    compile: function (tEle, tAttrs, transclude) {
                        var $head = tEle.find('thead tr');
                        return function (scope, ele, attrs, groupGrid) {
                            var $table = ele.children('table');
                            var $tbody = $table.children('tbody');
                            scope.lazyRenderLayout = attrs.lazyRenderLayout === 'true';
                            scope.firstLoad = true;
                            scope.draggable = attrs.draggable != "false";
                            scope.checkedRows = [];
                            scope.checkedLeafRows = [];
                            groupGrid.dataSource = GroupDataSources.get(attrs.sourceName);
                            groupGrid.colSettingsHeight = parseInt(attrs.colSettingsHeight) || null;
                            groupGrid.rowsIndex = [];
                            if (groupGrid.colSettingsHeight) {
                                var minHeight = 300;
                                var colSettingsHeight = _.max([groupGrid.colSettingsHeight, minHeight]);
                                var baseHeight = 434;
                                var baseUlHeight = 303;
                                var baseCenterMarginTop = 105;
                                var gapHeight = colSettingsHeight - baseHeight;
                                var ulHeight = baseUlHeight + gapHeight;
                                var centerMarginTop = baseCenterMarginTop + gapHeight / 2;
                                scope.colSettingStyleHtml = '<style class="col-group-setting-style">'
                                    + '.table-group-settings {height: ' + colSettingsHeight + 'px; margin-top: ' + (-colSettingsHeight / 2) + 'px;}'
                                    + '.table-group-settings .box ul {height: ' + ulHeight + 'px;}'
                                    + '.table-group-settings .center {margin-top: ' + centerMarginTop + 'px;}'
                                    + 'style';
                            }

                            scope.$on(scope.sourceName, function (event, result) {
                                //懒加载处理****************************BEGIN
                                if (groupGrid.dataSource !== result) {
                                    return;
                                }
                                groupGrid.element.find("tbody").empty();
                                //懒加载处理****************************END

                                groupGrid.__rendered = true;
                                groupGrid.$$modifiedRecords = {};
                                groupGrid.source = result['records'];
                                if (scope.sortKeepCheck == "true" && groupGrid.sorting) {
                                    var checkedRows = [];
                                    if (scope.checkedLeafRows.length > 0)
                                        scope.checkedLeafRows.splice(0, scope.checkedLeafRows.length);

                                    if (scope.checkedRows && scope.checkedRows.length > 0) {
                                        for (var i = 0; i < groupGrid.source.length; i++) {
                                            for (var j = 0; j < scope.checkedRows.length; j++) {
                                                var checkedRow = scope.checkedRows[j];
                                                var row = groupGrid.source[i];
                                                var eq = true;
                                                for (var key in row) {
                                                    if (row[key] != checkedRow[key]) {
                                                        eq = false;
                                                        break;
                                                    }
                                                }

                                                if (eq) checkedRows.push(groupGrid.source[i]);
                                            }
                                        }
                                    }
                                    scope.checkedRows.splice(0, scope.checkedRows.length);
                                    scope.checkedRows = checkedRows;
                                } else {
                                    if (scope.checkedLeafRows.length > 0)
                                        scope.checkedLeafRows.splice(0, scope.checkedLeafRows.length);
                                    if (scope.checkedRows.length > 0)
                                        scope.checkedRows.splice(0, scope.checkedRows.length);
                                }
                                delete groupGrid.sorting;

                                groupGrid._initRowsIndex();

                                if (scope.lazyRenderLayout && scope.firstLoad && groupGrid.source.length) {
                                    groupGrid._renderLayout();
                                    scope.firstLoad = false;
                                }
                                groupGrid._changePage();
                                groupGrid._render();
                                if (result.hasOwnProperty('moreAttrs')) {
                                    scope.moreAttrs = result['moreAttrs'];
                                }
                                /*if (groupGrid._hasCheckedBox()) {
                                 groupGrid.scope.checkedRows = [];
                                 groupGrid.scope.checkedLeafRows = [];//勾选实际行
                                 groupGrid._updateRowCheckbox();
                                 }*/
                            });

                            if (scope.validatorName) {
                                groupGrid.formName = 'groupGrid' + groupGrid.hash + 'form';
                                var $form = angular.element('<form>', {
                                    name: groupGrid.formName,
                                    'g-validator': scope.validatorName,
                                    'data-invalid-msg': 'tooltipMessenger',
                                    'onsubmit': 'return false'
                                });
                                $tbody.wrap($form);
                                $compile($form)(scope);
                                groupGrid.formController = $form.data('$formController');
                                groupGrid.gValidatorController = $form.data('$gValidatorController');
                                groupGrid.gValidatorController.isInGrid = true;
                                $tbody.data('$formController', groupGrid.formController);
                                $tbody.data('$gValidatorController', groupGrid.gValidatorController);
                            }

                            transclude(scope, function (clone) {
                                var $foot = clone.filter('tfoot');
                                angular.forEach(clone, function (obj) {
                                    if (obj.tagName === 'TH') {
                                        $head.append(obj);
                                    }
                                });
                                $head.append('<th class="table-scroll-space"></th>'); // 滚动条位置

                                if ($foot.length > 0) {
                                    // init footData
                                    ele.children('table').append($foot);
                                }
                            }, groupGrid);

                            groupGrid.element.removeClass('hidden');
                            groupGrid._applyLocalStorageLayout();
                            groupGrid._renderPageFilters();

                            if (!scope.lazyRenderLayout) {
                                groupGrid._renderLayout();
                            }
                            groupGrid._restColSettingsBtn();
                            if (angular.isFunction(scope.onRender)) {
                                scope.onRender({
                                    grid: groupGrid
                                });
                            }

                            groupGrid._registerLayoutService();

                            groupGrid.element.on('scroll', function () {
                                groupGrid._resetBodyWidth();
                            });

                            $($window).on('resize', _.throttle(function () {
                                groupGrid._setTbodyHeight();
                            }, 500));

                            $($window).trigger('fixgrid');

                            if (angular.isDefined(attrs.selectedRow)) {
                                scope.$watch('$selectedRow', function (newRow, oldRow) {
                                    var rowIndex, $row;
                                    if (newRow !== oldRow && scope.selectedRow !== newRow) {
                                        rowIndex = Arrays.indexOf(groupGrid.source, newRow) + 1;
                                        $row = angular.element('tr:nth-child(' + rowIndex + ')', groupGrid.tbody);
                                        if ($row.length) {
                                            groupGrid._rowClick({target: $row[0]}, $row);
                                        }
                                    }
                                });
                                scope.$watch("selectedRow", function (newRow, oldRow) {
                                    if (newRow !== oldRow) {
                                        scope.$selectedRow = newRow;
                                    }
                                });
                            }

                            scope.gridClick = function ($event) {
                                var target, $target, $cell, $row, $tbody;
                                target = $event.target || $event.srcElement;
                                $target = angular.element(target);
                                $cell = $target.closest('td');
                                $row = $cell.closest('tr');
                                $tbody = $row.closest('tbody');
                                groupGrid._handleToggleExpand($event, $target);
                                groupGrid._headClick($event);
                                if (groupGrid._hasCheckedBox()) {
                                    groupGrid._toggleRowChecked($event, $target);
                                    groupGrid._toggleAllChecked($event, $target);
                                }
                                if ($tbody.length > 0) {
                                    groupGrid._rowClick($event, $row);
                                }
                            };

                            scope.$on('$destroy', function () {
                                $document.off('mouseup.dragcheck' + groupGrid.hash);
                            });
                        };
                    },
                    controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                        $scope.groupGrid = new GroupGrid($scope, $element, $attrs);
                        return $scope.groupGrid;
                    }]
                };
            }
        )
        .directive('gGroupCheckboxColumn', function () {
            return {
                restrict: 'E',
                template: '<th class="grid-col-checkbox"><g-checkbox ng-model="allChecked"></g-checkbox></th>',
                replace: true,
                scope: false,
                require: ['^gGroupGrid'],
                link: function (scope, element, attrs, controllers) {
                    var gridController = controllers[0],
                        gItemDisabled = controllers[1];
                    gridController.hasCheckbox = true;
                    gridController.checkboxesDisabledController = gItemDisabled;
                    /** @namespace attrs.gItemDisabled */
                    gridController.checkboxesDisabledExpress = attrs.gItemDisabled;
                    gridController.checkboxColumnIdx = gridController.hasIndex ? 1 : 0;
                }
            };
        })
        .directive('gGroupIndexColumn', function () {
            return {
                restrict: 'E',
                template: '<th class="grid-col-index">{{title}}</th>',
                replace: true,
                scope: false,
                link: function (scope, element, attrs) {
                    var groupGrid = scope.groupGrid;
                    var indexColWidth = parseInt(attrs.width);
                    scope.widthClass = '';
                    if (indexColWidth) {
                        var gridClass = 'grid-' + groupGrid.hash;
                        groupGrid.element.addClass(gridClass);
                        groupGrid.indexColStyle = '.group-table.' + gridClass + ' .grid-col-index' + '{' + 'width: ' + indexColWidth + 'px;' + '}';
                    } else {
                        groupGrid.indexColStyle = '';
                    }
                    groupGrid.hasIndex = true;
                    scope.title = attrs.title;
                    groupGrid.indexColumnIdx = groupGrid.hasCheckbox ? 1 : 0;
                }
            };
        })
        .directive('gGroupColumn', function (Arrays, $parse) {

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

            function getCellAlignClass(scope) {
                return 'align-' + (scope.cellAlign || scope.align || 'left');
            }

            return {
                template: '<th>\n    <div class="grid-head-sort">\n        <button class="btn">\n            <span ng-class="{\'selected\': grid._isSort(sortable, \'asc\')}" class="caret caret-up"></span>\n        </button>\n        <button class="btn">\n            <span ng-class="{\'selected\': grid._isSort(sortable, \'desc\')}" class="caret caret-down"></span>\n        </button>\n    </div>\n    <sub ng-if="grid._sortIndex(sortable)!==\'\'">{{grid._sortIndex(sortable)}}</sub>\n    <div class="drop-filter" ng-if="dropFilter">\n        <div class="drop-filter-toggle" ng-class="{\'filter-column\': grid._hasPageFilter(column)}"></div>\n        <div class="drop-filter-list" style="display: none;">\n            <div class="drop-filter-check-all">\n                <div ng-click="grid._togglePageFilterCheckAll(column, $event)" class="form-clickbox" ng-class="{selected: grid._isPageFilterCheckAll(column)}">\n                    <a href="javascript:void(0);" class="fi"></a>\n                    <label>全选</label>\n                </div>\n            </div>\n        </div>\n    </div>\n</th>',
                replace: true,
                restrict: 'E',
                transclude: true,
                scope: {
                    $sortable: '@sortable',
                    data: '@',
                    width: '@',
                    filter: '@',
                    tmpl: '@',
                    align: '@',
                    cellAlign: '@',
                    editable: '@'
                },
                require: '^gGroupGrid',
                compile: function (tElement, tAttrs, transclude) {
                    return function (scope, element, attrs, gridController) {
                        transclude(scope, function (clone) {
                            angular.forEach(clone, function (node) {
                                if (!/G-GROUP-COLUMN-TMPL|G-GROUP-COLUMN-EDITOR|G-GROUP-COLUMN-FILTER/i.test(node.tagName)) {
                                    element.append(node);
                                }
                            });
                        }, gridController);

                        if(attrs.sortable === undefined) element.find(".grid-head-sort").remove();
                        var columnInstance = {
                            field: getRealField(scope.data),
                            data: formatDataFilters(scope.data),
                            text: $.trim(element.text()),
                            widthDef: scope.width,
                            tmpl: scope.tmpl,
                            filter: scope.filter,
                            filterTmpl: scope.filterTmpl,
                            filterCondition: scope.filterCondition,
                            element: element,
                            cellAlignClass: getCellAlignClass(scope),
                            editable: scope.editable,
                            columnIdentity: attrs.columnIdentity,
                            scope: scope
                        };
                        if (attrs.gItemClass) {
                            columnInstance.gItemClass = $parse(attrs.gItemClass);
                        }
                        columnInstance.columnName = columnInstance.field || columnInstance.columnIdentity || JSON.stringify(columnInstance.text);
                        var newLength = gridController._addColumn(columnInstance),
                            colIndex = newLength - 1,
                            cellIndex = element[0].cellIndex,
                            onBeforeCellDbclickDef = attrs.onBeforeCellDbclick,
                            onCellDbclickDef = attrs.onCellDbclick,
                            sortable;
                        // 如果需要排序， data中有空格视为包含过滤器， 截取空格前字符串作为排序字段
                        if (attrs.hasOwnProperty('sortable')) {
                            sortable = columnInstance.field;
                        }

                        if (attrs.hasOwnProperty('dropFilter')) {
                            scope.dropFilter = true;
                            gridController.hasDropFilter = true;
                        }

                        if (!!scope.editorTmpl) {
                            columnInstance.editorTmpl = scope.editorTmpl;
                        }
                        if (columnInstance.field && (columnInstance.editable || columnInstance.editorTmpl)) {
                            columnInstance.canEdit = true;
                        }
                        // 列双击事件
                        if (onBeforeCellDbclickDef) {
                            columnInstance.onBeforeCellDbclick = gridController._getScopeEvent(onBeforeCellDbclickDef);
                        }
                        if (onCellDbclickDef) {
                            columnInstance.onCellDbclick = gridController._getScopeEvent(onCellDbclickDef);
                        }

                        columnInstance.colWidthClassName = gridController._getColWidthClassName(cellIndex);
                        columnInstance.index = colIndex;
                        columnInstance.sortable = scope.sortable = sortable;

                        scope.column = columnInstance;
                        scope.grid = gridController;
                        attrs.$addClass(columnInstance.colWidthClassName);

                        //拖拽功能 *****begin*******
                        if (gridController.scope.draggable) {
                            if (gridController.lazyRenderLayout && gridController.firstLoad) {
                                element.attr("draggable", "true");
                            }
                            element[0].addEventListener("dragover", function (event) {
                                event.preventDefault();
                            });
                            element[0].addEventListener("drop", function (event) {
                                event.preventDefault();
                                if (!gridController._layoutRendered) {
                                    return;
                                }
                                var begin_column = gridController.element.data("_begin_column");
                                if (!begin_column) {
                                    return;
                                }
                                if (begin_column.group || scope.column.group || begin_column.group != scope.column.group) {//懒加载处理
                                    return;
                                }
                                if (Arrays.indexOf(gridController.columns, begin_column) <= Arrays.indexOf(gridController.columns, scope.column)) {
                                    gridController.columns = Arrays.moveAfter(gridController.columns, begin_column, scope.column);
                                } else {
                                    gridController.columns = Arrays.moveBefore(gridController.columns, begin_column, scope.column);
                                }
                                if (gridController._hasCheckedBox()) {
                                    scope.grid.scope.checkedRows = [];
                                    scope.grid.scope.checkedLeafRows = [];//勾选实际行
                                }
                                gridController._enterCols(gridController.columns);
                            });
                            element[0].ondragstart = function () {
                                gridController.element.data("_begin_column", columnInstance);
                            };
                        }
                        //拖拽功能 *****end*******
                    };
                }
            };
        })
        .directive('gGroupColumnEditor', function () {
            return {
                restrict: 'E',
                scope: false,
                compile: function (tElement) {
                    var editorTmpl = $.trim(tElement.html());
                    if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0") {
                        editorTmpl = editorTmpl.replace('<:', '<').replace('<:/', '</');
                    }
                    return function (scope) {
                        scope.editorTmpl = editorTmpl;
                    };
                }
            };
        })
        .directive('gGroupColumnFilter', function () {
            return {
                restrict: 'E',
                scope: false,
                compile: function (tElement, tAttrs) {
                    var filterTmpl = $.trim(tElement.html()),
                        condition = tAttrs.condition;
                    if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0") {
                        filterTmpl = filterTmpl.replace('<:', '<').replace('<:/', '</');
                    }
                    return function (scope) {
                        scope.filterTmpl = filterTmpl;
                        scope.filterCondition = condition;
                    };
                }
            };
        })
        .directive('cellTemplated', function ($compile) {
            return {
                restrict: 'A',
                scope: true,
                require: '^gGroupGrid',
                link: function (scope, element, attrs, grid) {
                    //noinspection JSUnresolvedVariable
                    var columnIndex = grid._getColumnIndex(element),
                        tr = element.parent()[0],
                        rowIndex = $(tr).index(),
                        row = grid.scope.source[rowIndex],
                        column = grid.columns[columnIndex],
                        $displayPlace = element.children('[data-role=display]'),
                        tmplScope = grid._getCellTmplScope({
                            rowIndex: rowIndex,
                            column: column,
                            row: row,
                            columnIndex: columnIndex
                        });
                    $displayPlace.html(column.tmpl);
                    $compile($displayPlace)(tmplScope);
                    tmplScope.$on(CONSTANTS.REFRESH_ROWS, function (event, range) {
                        if (_.contains(range, tmplScope.rowIndex)) {
                            tmplScope.rowIndex = rowIndex;
                        }
                    });
                }
            };
        })
        .directive('gGroupFooter', function () {
            return {
                restrict: 'E',
                template: '<tfoot><tr></tr></tfoot>',
                replace: true,
                transclude: true,
                scope: false,
                compile: function (tElement, tAttrs, transclude) {
                    return function (scope, element, attrs, gridController) {
                        var $footRow = element.children('tr');
                        transclude(scope, function (clone) {
                            $footRow.append(clone.filter('th'))
                                .append('<th class="table-scroll-space"></th>'); // 滚动条位置
                        }, gridController);
                    };
                }
            };
        })
        .directive('gGroupFooterCell', function () {
            return {
                restrict: 'E',
                template: '<th><div ng-transclude/> </th>',
                replace: true,
                transclude: true,
                scope: false,
                require: '^gGroupGrid',
                link: function (scope, element, attrs, groupGrid) {
                    "use strict";
                    var colIdx = element[0].cellIndex;
                    var funcCellsCount = 0;
                    if (groupGrid.hasCheckbox) {
                        funcCellsCount++;
                    }
                    if (groupGrid.hasIndex) {
                        funcCellsCount++;
                    }
                    if (colIdx < funcCellsCount) {
                        if (colIdx === groupGrid.checkboxColumnIdx) {
                            attrs.$addClass('grid-col-checkbox');
                        } else if (colIdx === groupGrid.indexColumnIdx) {
                            attrs.$addClass('grid-col-index');
                        }
                    } else {
                        element.data(CONSTANTS.DATA_COLUMN_INSTANCE_KEY, groupGrid.columns[colIdx - funcCellsCount]);
                        attrs.$addClass(groupGrid._getColWidthClassName(colIdx));
                    }
                    groupGrid._renderCellsStyle();
                }
            };
        });
});