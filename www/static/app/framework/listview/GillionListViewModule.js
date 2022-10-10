define('framework/listview/GillionListViewModule', [
    'angular',
    'jquery',
    'underscore',
    'config.properties',
    'artTmpl',
    'framework/datasource/DataSourceModule',
    'framework/clickbox/GillionClickBoxModule',
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

    angular.module('GillionListViewModule', ['DataSourceModule', 'GillionClickBoxModule', 'GillionPermitModule', 'GillionDirectiveModule'])
        .directive('gListView', function ($rootScope, $window, $document, $parse, $compile, $filter, $q, $dataSourceManager,
                                          Arrays, Functions, tooltipMessenger, $timeout, GillionMsg) {
            var Proto = ListView.prototype,
                ORDER = {
                    ASC: 'asc',
                    DESC: 'desc'
                };

            function ListView(scope, element, attrs, Permissions) {
                var me = this;
                me.scope = scope;
                me.element = element;
                me.attrs = attrs;
                me.width = element.width();
                me.hash = scope.$id;
                me.Permissions = Permissions;
                scope.columns = me.columns = [];
            }

            Proto._isIE8 = function () {
                return document.documentMode === 8;
            };

            Proto._reset = function () {
                var me = this,
                    scope = me.scope;
                // 清空选中行
                scope.allChecked = false;
                if (me.isBindSelectedRow) me.scope.$selectedRow = undefined;
                scope.selectedRow = undefined;
                if (_.isArray(scope.$checkedRows)) {
                    scope.$checkedRows.splice(0, scope.$checkedRows.length);
                }
                me._setCheckAllStatus();
            };

            Proto._getColWidthClassName = function (startColIndex, colspan) {
                var className = 'grid-' + this.hash + '-col-' + startColIndex;
                if (angular.isNumber(colspan) && colspan > 1) {
                    className += '-' + (startColIndex + colspan);
                }
                return className;
            };

            Proto._addColumn = function (column) {
                return this.columns.push(column);
            };

            Proto._addHiddenColumns = function (column) {
                var me = this;
                if (!me.hiddenColumns) {
                    me.hiddenColumns = [];
                }
                me.hiddenColumns.push(column);
            };

            Proto._getColumns = function (tElement) {
                var me = this;
                me.funcCellsCount = 0;
                _.forEach(tElement.context.children, function (node, index) {
                    var $node = $(node);
                    switch (node.tagName.toUpperCase()) {
                        case 'G-LIST-ITEM':
                            var data = $.trim($node.attr('data'));
                            var colIdx = index - me.funcCellsCount;
                            var column = {
                                field: getRealField(data),
                                data: formatDataFilters(data),
                                text: getText(node),
                                title: $node.attr('title'),
                                widthDef: $node.attr('width'),
                                editable: $node.attr('editable'),
                                alignClass: getAlignClass($node.attr('align')),
                                cellAlignClass: getCellAlignClass($node.attr('cell-align'), $node.attr('align')),
                                index: colIdx,
                                sortable: angular.isDefined($node.attr('sortable')),
                                required: angular.isDefined($node.attr('required')),
                                hidden: angular.isDefined($node.attr('hidden')),
                                colWidthClassName: me._getColWidthClassName(index),
                                onBeforeCellDbClickDef: $node.attr('on-before-cell-dbclick'),
                                onCellDbClickDef: $node.attr('on-cell-dbclick'),
                                columnIdentity: $node.attr('column-identity'),
                                style: $node.attr('style')
                            };

                            if ($node.attr("css-class")) column.cssClass = $parse($node.attr("css-class"));
                            column.hasTitleRequired = column.title.indexOf('require') >= 0;
                            column.columnName = column.field || column.columnIdentity || JSON.stringify(column.columnTitle);
                            setColumnPermit($node, column);

                            _.forEach(node.children, function (child) {
                                switch (child.tagName.toUpperCase()) {
                                    case 'G-LIST-ITEM-TMPL':
                                        setColumnTmpl(child, column);
                                        break;
                                    default:
                                        break;
                                }
                            });
                            if (column.hidden) me._addHiddenColumns(column);
                            me._addColumn(column);
                            break;
                        case 'G-INDEX-ITEM':
                            me.hasIndex = true;
                            me.indexColumn = {
                                title: $node.attr('title') || '',
                                width: parseInt($node.attr('width')) || 0
                            };
                            me.indexColumnIdx = me.hasCheckbox ? 1 : 0;
                            me.funcCellsCount++;
                            break;
                        case 'G-CHECKBOX-ITEM':
                            me.checkboxesDisabledExpress = $node.attr('g-item-disabled');
                            me.hasCheckbox = true;
                            me.checkboxColumnIdx = me.hasIndex ? 1 : 0;
                            me.funcCellsCount++;
                            me.checkboxColumn = {
                                width: parseInt($node.attr('width')) || 0
                            };
                            break;
                        default:
                            break;
                    }
                });
                me.__originalCols = me.columns;

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
                    if (!!rawData) return rawData.replace(/\s*\|\s*/g, ' | ');
                    return rawData;
                }

                function getAlignClass(align) {
                    return 'align-' + (align || 'center');
                }

                function getCellAlignClass(cellAlign, align) {
                    return 'align-' + (cellAlign || align || 'left');
                }

                function getText(node) {
                    return _.chain(node.childNodes)
                        .filter(function (childNode) {
                            return childNode.nodeType === 3;
                        })
                        .reduce(function (text, childNode) {
                            return text + $.trim(childNode.data);
                        }, '')
                        .value();
                }

                function setColumnPermit($node, column) {
                    var gPer = $node.attr('g-per');
                    if (gPer) column.noPermit = me.Permissions.noPermit(gPer);
                }

                function setColumnTmpl(node, column) {
                    var columnTmpl = $.trim($(node).html());
                    if (navigator.appName === "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") === "MSIE8.0") {
                        columnTmpl = columnTmpl.replace('<:', '<').replace('<:/', '</');
                    }
                    column.tmpl = columnTmpl;
                }
            };

            Proto._isSort = function (sortName, sortDirection) {
                var me = this,
                    sortNames = me.sortName || [],
                    sortDirections = me.sortDirection || [],
                    index = _.indexOf(sortNames, sortName);
                if (index < 0) return false;
                return sortDirections[index] === sortDirection;
            };

            Proto._sortIndex = function (sortName) {
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

            Proto._renderHeader = function () {
                var me = this;
                var scope = me.scope;
                var columns = me.columns;
                var headerIndexCell = '';
                var headerCheckboxCell = '';
                var headerColumnCells = '';
                var headerFuncCells = '';
                var headerScrollSpaceCell = '<th class="table-scroll-space"></th>';
                var sortIndexStr = '{{grid._sortIndex(column.field)}}';
                var headerRowTmpl = '{{each columns as column index}}\n<th class="header-column-cell {{column.colWidthClassName}} {{column.alignClass}} {{if column.dropFilter}}has-drop-filter{{/if}} {{if column.hidden || column.noPermit}}hidden{{/if}}" draggable="true" style="{{column.style}}">\n    {{if column.sortable}}\n    <div class="grid-head-sort">\n        <button class="btn">\n            <span class="caret caret-up" ng-class="{\'selected\': grid._isSort(column.field, \'asc\')}"></span>\n        </button>\n        <button class="btn">\n            <span class="caret caret-down" ng-class="{\'selected\': grid._isSort(column.field, \'desc\')}"></span>\n        </button>\n    </div>\n    {{/if}}\n    <sub ng-if="grid._sortIndex(column.field)!==\'\'">{{#sortIndexStr}}</sub>\n    {{if column.required && !column.hasTitleRequired}}<span class="required">*</span>{{/if}}\n    <span>{{#column.title}}</span>\n    {{if column.dropFilter}}\n    <div class="drop-filter">\n        <div class="drop-filter-toggle" ng-class="{\'filter-column\': grid._hasPageFilter(column)}"></div>\n        <div class="drop-filter-list" style="display: none;">\n            <div class="drop-filter-check-all">\n                <div ng-click="grid._togglePageFilterCheckAll(column, $event)" class="form-clickbox" ng-class="{selected: grid._isPageFilterCheckAll(column)}">\n                    <a href="javascript:void(0);" class="fi"></a>\n                    <label>全选</label>\n                </div>\n            </div>\n        </div>\n    </div>\n    {{/if}}\n</th>\n{{/each}}';
                var headerRowTmplCompiled = artTmpl.compile(headerRowTmpl);
                if (me.hasCheckbox) {
                    if (me._isIE8())
                        headerCheckboxCell = '<th class="grid-col-checkbox"><input type="checkbox" class="checkall" /></th>';
                    else
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
                me.$headRow = $('<tr>' + headerFuncCells + headerColumnCells + '</tr>');
                me.$head.find("table").empty().append(me.$headRow);
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
                });
                $compile(me.$headRow.find('.grid-col-checkbox'))(scope);
            };

            Proto._headClick = function ($event) {
                var me = this,
                    scope = me.scope,
                    target = $event.target,
                    $target = angular.element(target),
                    $headTab = me.$head,
                    multiSort = $event.ctrlKey,
                    $columnFilter = $target.closest('.column-filter').not($target),
                    $dropFilter = $target.closest('.drop-filter'),
                    $gridBody = $('div.grid-body', me.element),
                    $dropFilterUl;

                if ($target.is('span.caret')) {
                    me._specifySort($event, $target, multiSort);
                } else if (!$headTab.hasClass('resizeable')) {
                    me._toggleSort($event, multiSort);
                }
                if (($target.is('a.fi') && $target.parent().is('.form-clickbox')) || ($target.is('input') && $target.is(".checkall"))) {
                    me._toggleAllChecked($event);
                }
            };

            /**
             * @param $event
             * @param $sortingIcon
             * @param multiSort 多列排序
             */
            Proto._specifySort = function ($event, $sortingIcon, multiSort) {
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
            Proto._toggleSort = function ($event, multiSort) {
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

            Proto._doSort = function (sortName, sortDirection) {
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

            /**
             * 子指令scope定义方法属性时， 指定到grid外scope的某个方法， 通过本方法获取
             * @param eventDefineAttrVal 方法属性指定的值
             * @return {*}
             */
            Proto._getScopeEvent = function (eventDefineAttrVal) {
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

            Proto._disabledRowPredicate = function () {
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

            Proto._isAllRowsChecked = function () {
                var me = this,
                    scope = me.scope,
                    disabledRows = [],//me._getDisabledRows(true),
                    disabledCount = disabledRows.length,
                    sourceLen = scope.source ? scope.source.length : 0,
                    enableCount = sourceLen - disabledCount,
                    checkedEnableCount = _.difference(scope.checkedRows, disabledRows).length;
                return enableCount !== 0 && checkedEnableCount === enableCount;
            };

            function _disabledLocalsTrans(row, index) {
                return {
                    row: row,
                    rowIndex: index
                };
            }

            Proto._getDisabledRows = function (withHiddenRows) {
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

            Proto._toggleCellChecked = function ($event) {
                var $target = angular.element($event.target),
                    $checkbox, me, scope, source, checkedRows, rowIndex, row, checked, $tr;
                //if ($checkbox.is('[disabled=disabled]')) return;
                me = this;
                if (me._isIE8()) $checkbox = $target.closest('input');
                else $checkbox = $target.closest('.form-clickbox');
                scope = me.scope;
                source = scope.source;
                checkedRows = scope.checkedRows;
                $tr = $checkbox.closest('tr')[0];
                rowIndex = $checkbox.closest('tr')[0].rowIndex;
                row = source[rowIndex];
                if (me._isIE8()) {
                    checked = !!$checkbox[0].checked;
                    if (checked && !_.contains(checkedRows, row)) {
                        me.scope.checkedRows.push(row);
                    } else if (!checked) {
                        Arrays.remove(checkedRows, row);
                    }
                } else {
                    checked = _.contains(checkedRows, row);
                    $checkbox.toggleClass('selected', !checked);
                    if (checked) {
                        Arrays.remove(checkedRows, row);
                    } else {
                        me.scope.checkedRows.push(row);
                    }
                }
                // binded
                me.scope.allChecked = me._isAllRowsChecked();
                //alert(checked);
                //alert(me.scope.checkedRows.length);
                me._setCheckAllStatus();
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

            Proto._toggleAllChecked = function ($event) {
                var me = this,
                    trs = me.tbody.rows,
                    scope = me.scope,
                    source = scope.source,
                    checkedRows = scope.checkedRows,
                    disabledRows = [],//me._getDisabledRows(true),
                    enabledRows = Arrays.subtract(source, disabledRows),
                    i, len, record;
                checkedRows.length = 0;

                if (me._isIE8()) {
                    scope.allChecked = !scope.allChecked;
                }
                if (scope.allChecked) {
                    Arrays.pushAll(enabledRows, checkedRows);
                }

                for (i = 0, len = source.length; i < len; i++) {
                    record = source[i];
                    if (_.contains(enabledRows, record)) {
                        if (me._isIE8())
                            $(trs[i]).find(".grid-col-checkbox > input")[0].checked = scope.allChecked;
                        else
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

            Proto.toggleRowHeight = function () {
                if (isNaN(this.scope.narrowHeight) || this.scope.narrowHeight === -1) return;
                var $tr = $(event.target).closest("tr"),
                    $tdList = $tr.find("td"),
                    $lastTd = $tdList.last();
                if ($lastTd.length === 0) return;
                var height = $lastTd[0].style.height;
                if (height && height !== "auto") {
                    $tdList.css("height", "auto");
                } else {
                    $tdList.css("height", this.scope.narrowHeight);
                }
            };

            Proto._getRowTmpl = function () {
                var me = this, columnsTmpl;
                if (!me.rowTmpl) {
                    columnsTmpl = _.chain(me.columns)
                        .filter(angular.isDefined)
                        .map(function (column, index) {
                            var hiddenClass = column.hidden ? 'hidden' : '';
                            if (column && column.noPermit) {
                                return '';
                            }
                            if (column.hide === true) return '';
                            var cellTmpl = '<td ';

                            cellTmpl += 'class="' + column.colWidthClassName;
                            if (column.cssClass) {
                                cellTmpl += ' {{grid._columnClassName(rowIndex, ' + index + ')}}';
                            }

                            cellTmpl += ' ' + column.cellAlignClass + ' ' + hiddenClass + '"';
                            if (!isNaN(me.scope.narrowHeight) && me.scope.narrowHeight !== -1) {
                                cellTmpl += ' style="height: ' + me.scope.narrowHeight + 'px"';
                            }
                            if (column.tmpl) {
                                cellTmpl += ' cell-templated><span data-role="display" >' + column.tmpl + '</span>';
                            } else if (column.data) {
                                cellTmpl += 'title="{{record.' + column.data + '}}">';
                                cellTmpl += '<span data-role="display">{{record.' + column.data + '}}</span>';
                            } else {
                                cellTmpl += '>';
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
                        if (me._isIE8())
                            checkboxColTmpl += '<td class="grid-col-checkbox" ng-style="dragStyle"><input type="checkbox" name="rowIndex" value="{{rowIndex}}" {{if grid._isChecked(grid._getRowRecord(rowIndex))}} checked="checked"{{/if}} outer-scope="grid.scope.$parent" /></td>';
                        else
                            checkboxColTmpl += '<td class="grid-col-checkbox"  ng-style="dragStyle">\n    {{if (grid.scope.treeView && !grid.treeColumn)}}\n    {{# grid._getRowTreeTmpl(rowIndex)}}\n    {{/if}}\n    <div\n      class="form-clickbox{{if grid._isChecked(grid._getRowRecord(rowIndex))}} selected{{/if}}" \n      outer-scope="grid.scope.$parent" \n      {{if grid._isDisabledRow(grid._getRowRecord(rowIndex))}}disabled="disabled"{{/if}}>\n      <a href="javascript:void(0);" class="fi"></a>\n    </div>\n</td>';
                    }
                    if (me.indexColumnIdx < me.checkboxColumnIdx) {
                        funcColTmpl += indexColTmpl + checkboxColTmpl;
                    } else {
                        funcColTmpl += checkboxColTmpl + indexColTmpl;
                    }
                    me.rowTmpl = '<tr data-index="{{rowIndex}}" {{if (grid._isActiveRow(rowIndex))}}active="true"{{/if}} class="{{if (grid.scope.cssClass)}} {{grid._rowClassName(rowIndex)}} {{/if}} {{if enableEvenClass === \'true\' && rowIndex % 2 === 1}}table-body-tr-even{{/if}}">' + funcColTmpl + columnsTmpl + '</tr>';
                }
                return me.rowTmpl;
            };

            Proto._getCompiledRowTmpl = function () {
                var me = this;
                if (!me.__compiledRowTmpl) me.__compiledRowTmpl = artTmpl.compile(me._getRowTmpl());
                return me.__compiledRowTmpl;
            };

            Proto._getCompiledTableTmpl = function () {
                var me = this;
                if (!me.compiledTableTmpl) {
                    me.compiledTableTmpl = artTmpl.compile('{{each source as record rowIndex}} {{if (row = record)}}{{/if}}' + me._getRowTmpl() + '{{/each}}');
                }
                return me.compiledTableTmpl;
            };

            Proto._rowClick = function ($event, $row) {
                var me = this;
                var $target = $($event.target);
                var $tr = $target.closest('tr');
                var $td = $target.closest('td');
                if (!$tr.closest('table.table-body').length) {
                    return;
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
                        angular.element(me.tbody.rows[index]).removeClass("active");
                    }
                }
                //end拖选功能

                if (onBeforeSelect(selectParam) !== false) {
                    scope.selectedRow = isSelected ? selectedRecord : undefined;
                    angular.element(me.tbody.rows).removeClass("active");
                    if (isSelected) {
                        $row.addClass("active");
                    }
                    onSelect(selectParam);
                }
            };

            Proto._rowDbClick = function ($event, $row) {
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

            Proto._getColumnIndex = function (cellIndexOrDom) {
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

            Proto._cellDbClick = function ($event, $cell) {
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

            Proto._getTableBodyScope = function () {
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

            Proto._syncCheckStatus = function () {
                var me = this;
                $(this.tbody).find("input[name=rowIndex]").each(function (i, ck) {
                    var rowIndex = ck.value;
                    var record = me._getRowRecord(parseInt(rowIndex));
                    ck.checked = me._isChecked(record);
                })
            };

            Proto._render = function () {
                var me = this,
                    scope = me.scope;

                me._reset();
                var html = me._getCompiledTableTmpl()(scope);
                $(this.tbody).html(html);
                var tableBodyScope = me._getTableBodyScope();
                $compile(this.tbody)(tableBodyScope);
                $timeout(function () {
                    me._syncCheckStatus();
                    $(me.tbody).find("tr").each(function(i,tr){
                        var $tr = $(tr);
                        $tr.find("td").height($tr.height());
                    });
                }, 300);
                $($window).resize();
            };

            Proto._getClassName = function (classNameList) {
                if (_.isObject(classNameList)) {
                    var result = "";
                    _.each(classNameList, function (v, className) {
                        if (!v) return;
                        if (result !== "") result += " ";
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

            Proto._rowClassName = function (rowIndex) {
                if (!_.isFunction(this.scope.cssClass) || _.isEmpty(this.scope.source)) return "";
                if (this.scope.source.length < rowIndex) return "";
                var record = angular.copy(this.scope.source[rowIndex]);
                var classNameList = this.scope.cssClass({row: record});
                return this._getClassName(classNameList);
            };

            Proto._columnClassName = function (rowIndex, columnIndex) {
                var me = this,
                    scope = me.scope,
                    column = me.columns[columnIndex];

                if (!_.isFunction(column.cssClass) || _.isEmpty(scope.source)) return "";
                var record = angular.copy(scope.source[rowIndex]);
                var classNameList = column.cssClass(scope.$parent, {row: record});
                var className = this._getClassName(classNameList);
                return className;
            };

            Proto._setFuncCellWidth = function () {
                var me = this,
                    indexColumnWidth = me.indexColumn ? me.indexColumn.width : 0,
                    checkboxColumnWidth = me.checkboxColumn ? me.checkboxColumn.width : 0,
                    styleText, gridClass;
                if (indexColumnWidth || checkboxColumnWidth) {
                    styleText = '<style>';
                    gridClass = '.list-view.grid-' + me.hash;
                    styleText += indexColumnWidth
                        ? gridClass + ' .grid-col-index{width:' + indexColumnWidth + 'px;}'
                        : gridClass + ' .grid-col-index{width: 40px;}';
                    styleText += checkboxColumnWidth
                        ? gridClass + ' .grid-col-checkbox{width:' + checkboxColumnWidth + 'px;}'
                        : gridClass + ' .grid-col-checkbox{width: 60px;}';
                    styleText += '</style>';
                } else {
                    styleText = '<style>.grid-col-index{width: 40px;} .grid-col-checkbox{width: 60px;}</style>';
                }
                $('head').append(styleText);
            };

            Proto._registerHelpers = function () {
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

            Proto._doLayout = function (autoSetWidthHeight) {
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

            Proto._renderCellsStyle = function () {
                var me = this,
                    element = me.element,
                    allColWidthsObj = me._getAllColWidths(),
                    allColWidths = allColWidthsObj.allColWidths,
                    cols = allColWidthsObj.cols,
                    colWidthClassBlocks = me._getColWidthClassBlocks(allColWidths),
                    allColWidthClassBlocks = colWidthClassBlocks,
                    cellWidthStyleBlockContent = _.reduce(allColWidthClassBlocks, Functions.sum),
                    $newCellStyleBlock = angular.element('<style>' + cellWidthStyleBlockContent + '</style>');
                element.children('style').remove();
                element.append($newCellStyleBlock);
                //me._reSortBody();
            };

            function _toWidthClassBlock(className, width) {
                if (!width) {
                    return '';
                }
                return '.list-view .' + className + '{width:' + width + 'px;}';
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
             * 获取表格主体部分宽度，即数据展示部分的总宽度， 为表格外层div宽度减去勾选列和空白列的宽度
             * @private
             */
            Proto._getContentWidth = function () {
                var me = this,
                    gridWidth = me.element.width(),
                    gridContentWidth = gridWidth - 2;
                if (me.hasIndex) {
                    gridContentWidth -= CONSTANTS.CHECK_ROW_WIDTH;
                }
                if (me.hasCheckbox) {
                    gridContentWidth -= CONSTANTS.CHECK_ROW_WIDTH;
                }
                return gridContentWidth;
            };

            //把当前表格每一列的宽度设置到columns中去
            Proto._setColWidth = function (columnWidths) {
                var me = this,
                    cols = me.__originalCols,
                    len = cols.length,
                    i, col;
                for (i = 0; i < len; i++) {
                    col = cols[i];
                    col.width = "" + Number(columnWidths[i]).toFixed(1);
                }
            };

            /**
             * 获取表格单列宽度
             * @param columnWidthDef {String} 列指令的宽度定义字符串 例: 100 、100px 、 10%
             * @param gridContentWidth {Number} 表格主体宽度, 即数据展示部分的宽度
             * @return {number} 列宽度
             */
            Proto._getSingleColWidth = function (columnWidthDef, gridContentWidth) {
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
             * 获取所有列的宽度， 包括勾选列和补白列
             *
             * @return {Array<Number>} 所有列的宽度
             */
            Proto._getAllColWidths = function () {
                var me = this,
                    __originalCols = me.__originalCols,
                    gridContentWidth = me._getContentWidth(),
                    columnWidths;
                var colSettings = [];
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
                if (me.hasCheckbox) checkColWidth = me.scope.showHeader ? me.$headRow.children('th.grid-col-checkbox').outerWidth() : 40;
                if (me.hasIndex) indexColWidth = me.scope.showHeader ? me.$headRow.children('th.grid-col-index').outerWidth() : 40;
                funcColsWidth = me.indexColumnIdx < me.checkboxColumnIdx ? [indexColWidth, checkColWidth] : [checkColWidth, indexColWidth];
                funcColsWidth = _.without(funcColsWidth, void 0);
                Array.prototype.unshift.apply(columnWidths, funcColsWidth);
                return {allColWidths: columnWidths, cols: __originalCols};
            };

            /**
             * @private
             * @param startColIndex {Number} 开始的`column`的`index`
             * @param colspan {Number}
             * @return {string}
             */
            Proto._getColWidthClassName = function (startColIndex, colspan) {
                var className = 'grid-' + this.hash + '-col-' + startColIndex;
                if (angular.isNumber(colspan) && colspan > 1) {
                    className += '-' + (startColIndex + colspan);
                }
                return className;
            };

            /**
             * 获取列的宽度样式片段
             *
             * @param allColWidths {Array<Number>} 所有列的宽度
             * @return {Array<String>} 宽度样式片段
             */
            Proto._getColWidthClassBlocks = function (allColWidths) {
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

            Proto._setHeight = function (height) {
                if (height) this.element.css("height", height);
            };

            Proto._isActiveRow = function (rowIndex) {
                var activeRowIndex = this.getActiveRowIndex();
                if (activeRowIndex >= 0 && activeRowIndex === rowIndex) {
                    return true;
                }
                return false;
            };

            /**
             * @return {number} 激活行序号，从0开始计算，没有则返回-1
             */
            Proto.getActiveRowIndex = function () {
                var selectedRecord = this.scope.selectedRow;
                if (!selectedRecord) {
                    return -1;
                }
                var records = this.scope.source;
                var idx = _.findIndex(records, selectedRecord);
                return idx;
            };

            Proto._getIndex = function (rowIndex) {
                var me = this;
                var scope = me.scope;
                var dataSource = me.scope.dataSource;
                var currentPage = dataSource.currentPage;
                var pageSize = dataSource.pageSize;
                var rowTreeInfo;
                if (!angular.isNumber(rowIndex)) {
                    rowIndex = parseInt(rowIndex);
                }
                return currentPage && pageSize
                    ? pageSize * (currentPage - 1) + rowIndex + 1
                    : rowIndex + 1;
            };

            Proto._getRowRecord = function (row) {
                var source = this.scope.source;
                var record;
                if (_.isNumber(row)) {
                    record = source[row];
                } else {
                    record = row;
                }
                return record || null;
            };

            Proto._isChecked = function (record) {
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

            Proto._isDisabledRow = function (record) {
                var me = this;
                return _.contains(me.disabledRows, record);
            };

            Proto._syncCheckRowsByOuter = function () {
                var me = this,
                    scope = me.scope,
                    checkedRows = scope.checkedRows,
                    source = scope.source;

                if (angular.isArray(source) && source.length > 0 && angular.isArray(checkedRows)) {
                    angular.forEach(me.tbody.rows, function (tr) {
                        var rowIndex = tr.rowIndex,
                            rowData = source[rowIndex],
                            $checkbox;
                        if (me._isIE8()) {
                            $checkbox = angular.element(tr).find('td.grid-col-checkbox > input');
                            if ($checkbox.length > 0) {
                                if (_.contains(checkedRows, rowData)) {
                                    $checkbox[0].checked = true;
                                } else {
                                    $checkbox[0].checked = false;
                                }
                            }
                        } else {
                            $checkbox = angular.element(tr).find('td.grid-col-checkbox > div.form-clickbox');
                            if (_.contains(checkedRows, rowData)) {
                                $checkbox.addClass('selected');
                            } else {
                                $checkbox.removeClass('selected');
                            }
                        }
                    });
                    me.scope.allChecked = me._isAllRowsChecked();
                    me._setCheckAllStatus();
                }
            };

            Proto._updateSelectedRow = function (newRow, oldRow) {
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
                trs.removeClass("active");
                if (activeIndex >= 0) {
                    trs.eq(activeIndex).addClass("active");
                }
            };

            Proto._isHiddenRow = function (rowIndex) {
                return _.contains(this.hiddenRows, rowIndex);
            };

            Proto._clearDragSelectClass = function () {
                var me = this;
                var $trs = me.element.find('table.table-body tr');
                $trs.removeClass('checking-row');
            };

            Proto._toggleChecked = function (index, event) {
                var me, scope, source, checkedRows, rowIndex, row, checked, $checkbox;
                me = this;
                var $row = angular.element(me.tbody.rows[index]);
                if (me._isIE8())
                    $checkbox = $row.find(".grid-col-checkbox > input");
                else
                    $checkbox = $row.find('.grid-col-checkbox > .form-clickbox');
                //if ($checkbox.is('[disabled=disabled]')) return;
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
                    if (me._isIE8()) {
                        if (scope.startIndex != scope.endIndex)
                            $checkbox[0].checked = false;
                    } else {
                        $checkbox.toggleClass('selected', false);
                    }
                    checkParam.isChecked = false;
                } else {
                    me.scope.checkedRows.push(source[rowIndex]);
                    if (me._isIE8()) {
                        if (scope.startIndex != scope.endIndex)
                            $checkbox[0].checked = true;
                    } else {
                        $checkbox.toggleClass('selected', true);
                    }
                    checkParam.isChecked = true;
                }
                me.scope.allChecked = me._isAllRowsChecked();
                me._setCheckAllStatus();
                me.checkRowByContrl = true;

                if (onCheck) {
                    onCheck(checkParam);
                }
            };

            Proto._setCheckAllStatus = function () {
                if (this._isIE8()) {
                    var checkall = this.element.find(".checkall")[0];
                    if (!checkall) return;
                    checkall.checked = this.scope.allChecked;
                }
            };

            Proto._toggleDragChecked = function ($event, startIndex, endIndex) {
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

            Proto._bindDragEvent = function () {
                var me = this,
                    scope = me.scope,
                    $gridBody = me.element.find('div.list-view-body');
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
                        //me._updateSelectedRow();
                        me._clearDragSelectClass();
                    });
                }
            };

            Proto.renderRow = function (rowIndex) {
                var me = this,
                    trs = me.tbody.rows,
                    oldTr = trs[rowIndex],
                    $oldTr = angular.element(oldTr),
                    record = me.scope.source[rowIndex];
                if (!record) return;
                var newRow;
                $oldTr.children('[cell-templated]').each(function () {
                    "use strict";
                    angular.element(this).scope().$destroy();
                });
                $oldTr.replaceWith(me._getCompiledRowTmpl()({
                    row: record,
                    record: record,
                    rowIndex: rowIndex,
                    grid: me
                }));
                newRow = trs[rowIndex];
                var rowScope = me._getTableBodyScope();
                $compile(newRow)(rowScope);
            };

            Proto._getRecordIndex = function (row) {
                return $(row)[0].rowIndex;
            };

            Proto._getColumnIndex = function (cellIndexOrDom) {
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

            return {
                template: '<div class="list-view">\n    <div class="list-view-head" ng-click="headClick($event)">\n        <table class="table-head">\n        </table>\n    </div>\n    <div class="list-view-body" ng-click="bodyClick($event)" ng-dblclick="bodyDbClick($event)">\n        <table class="table-body"><tbody></tbody></table>    \n    </div>\n    <div class="col-resize-line">\n    </div>\n</div>',
                replace: true,
                restrict: 'E',
                transclude: false,
                scope: {
                    sourceName: '@sourceName',
                    $selectedRow: '=selectedRow',
                    $checkedRows: '=checkedRows',
                    dragCheck: '@',
                    onLoadSuccess: '&',
                    onRender: '&',
                    onCheck: '&',
                    onCheckAll: '&',
                    onBeforeSortColumn: '&',
                    onSortColumn: '&',
                    onBeforeRowDbclick: '&',
                    onRowDbclick: '&',
                    onBeforeCellDbclick: '&',
                    onCellDbclick: '&',
                    onBeforeSelect: '&',
                    onSelect: '&',
                    cssClass: '&'
                },
                require: ['gListView'],
                compile: function (tElement) {
                    return function (scope, element, attrs, controllers) {
                        var self = controllers[0],
                            height = attrs["gHeight"],
                            isBindCheckedRows = attrs.hasOwnProperty('checkedRows'),
                            isBindSelectedRow = attrs.hasOwnProperty('selectedRow'),
                            $head = element.find("div.list-view-head"),
                            $body = element.find("div.list-view-body");

                        scope.showHeader = attrs.showHeader !== "false";
                        scope.narrowHeight = parseInt(attrs.narrowHeight || -1);
                        self.$head = $head;
                        self.$body = $body;
                        self.tbody = $body.find("tbody")[0];
                        self.isBindSelectedRow = isBindSelectedRow;
                        self.isBindCheckedRows = isBindCheckedRows;
                        scope.allChecked = false;


                        element.addClass('grid-' + self.hash);
                        self._bindDragEvent();
                        self._setHeight(height);
                        self._getColumns(tElement);
                        self._setFuncCellWidth();
                        if (!scope.showHeader) element.find(".list-view-head").hide();
                        else self._renderHeader();

                        self._doLayout();
                        element.removeClass('hidden');
                        self._renderCellsStyle();

                        if (angular.isFunction(scope.onRender)) {
                            scope.onRender({
                                grid: self,
                                source: scope.source
                            });
                        }
                        $($window).trigger('fixgrid');

                        if (isBindSelectedRow) {
                            scope.$watch('$selectedRow', function (newRow, oldRow) {
                                var rowIndex, $row;
                                if (newRow !== oldRow && scope.selectedRow !== newRow) {
                                    rowIndex = Arrays.indexOf(scope.source, newRow) + 1;
                                    $row = angular.element('tr:nth-child(' + rowIndex + ')', self.tbody);
                                    if ($row.length) self._rowClick({target: $row[0]}, $row);
                                }
                            });

                        }

                        if (isBindCheckedRows) {
                            if (angular.isArray(scope.$checkedRows)) {
                                scope.checkedRows = scope.$checkedRows;
                            } else {
                                scope.checkedRows = scope.$checkedRows = [];
                            }
                            scope.$watchCollection('$checkedRows', function (v) {
                                if (self.checkRowByContrl !== true) {
                                    self._syncCheckRowsByOuter();
                                }
                                self.checkRowByContrl = false;
                            });
                        } else {
                            scope.checkedRows = [];
                        }

                        $dataSourceManager.getDataSource(attrs.sourceName).then(function (result) {
                            scope.dataSource = result;
                            scope.dataSource.sortName = self.sortName;
                            scope.dataSource.sortDirection = self.sortDirection;
                        });

                        scope.$on(scope.sourceName, function (event, result) {
                            var body = $document[0].body;
                            if (body.hasAttribute('g-dict') && !!body.getAttribute('g-dict') && scope.$root.$dictReturned !== true) {
                                scope.$on('$dictReturned', function () {
                                    self._registerHelpers();
                                    doLayer();
                                });
                            } else {
                                self._registerHelpers();
                                doLayer();
                            }

                            function doLayer() {
                                scope.source = result['records'];
                                scope.firstLoad = false;
                                self._render();
                                if (angular.isFunction(scope.onLoadSuccess)) {
                                    scope.onLoadSuccess({
                                        source: scope.source,
                                        grid: self,
                                        result: result
                                    });
                                }
                            }
                        });

                        scope.headClick = function ($event) {
                            self._headClick($event);
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
                            if (row) rowIndex = row.rowIndex;
                            if (($target.is('a.fi') && $target.closest('td').is('.grid-col-checkbox')) || ($target.is('input') && $target.closest('td').is('.grid-col-checkbox'))) {
                                self._toggleCellChecked($event);
                            }
                            if ($row.length === 1) {
                                self._rowClick($event, $row);
                            }
                        };

                        scope.bodyDbClick = function ($event) {
                            var target = $event.target || $event.srcElement,
                                $target = angular.element(target),
                                $cell = $target.closest('td'),
                                $row = $cell.closest('tr');
                            self._rowDbClick($event, $row);
                            self._cellDbClick($event, $cell);
                        };

                        scope.$watch('selectedRow', function (newRow, oldRow) {
                            self._updateSelectedRow(newRow, oldRow);
                        });

                        scope.$watch('checkedRows', function () {
                            var $trs = $(self.tbody).find('tr');
                            $trs.each(function (index, tr) {
                                var $tr = $(tr);
                                if (self._isChecked(self._getRowRecord(index))) {
                                    $tr.addClass('checked-row');
                                } else {
                                    $tr.removeClass('checked-row');
                                }
                            });
                        }, true);

                        $($window).on('resize.gridResize' + self.hash, _.throttle(function () {
                            self._renderCellsStyle();
                            self._doLayout();
                        }, 500));
        
                        scope.$on('show', function () {
                            self._renderCellsStyle();
                        });

                        scope.$on('$destroy', function () {
                            $($window).off('resize.gridResize' + self.hash);
                            $document.off('click.hideDropFilter' + self.hash);
                            $document.off('mouseup.dragcheck' + self.hash);
                            element.remove();
                            if (angular.isDefined(scope.menuDiv)) {
                                scope.menuDiv.remove();
                                scope.menuDiv = undefined;
                                delete scope.menuDiv;
                            }
                            scope.dataSource = undefined;
                            scope.source = self.source = [];
                            delete self.source;
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
                    $scope.listView = $scope.grid = new ListView($scope, $element, $attrs, Permissions);
                    return $scope.listView;
                }]
            };
        })
        .directive('cellTemplated', function ($compile) {
            return {
                require: ['^?gListView'],
                restrict: 'A',
                scope: true,
                link: function (scope, element, attrs, controllers) {
                    //noinspection JSUnresolvedVariable
                    var view = controllers[0],
                        columnIndex = view._getColumnIndex(element),
                        column = view.columns[columnIndex],
                        $tr = element.closest('tr'),
                        $displayPlace = element.children('[data-role=display]');
                    // 懒加载表格行是单独作用域， 不会执行这段
                    // 但普通表格使用的是一个作用域， 需要执行这段为当前scope赋值行相关对象
                    if (!scope.row) {
                        var recordIndex = view._getRecordIndex($tr);
                        scope.rowIndex = recordIndex;
                        scope.row = view.scope.source[recordIndex];
                    }
                    scope.column = column;
                    scope.columnIndex = columnIndex;
                    $displayPlace.html(column.tmpl);
                    $compile($displayPlace)(scope);
                    scope.$on(CONSTANTS.REFRESH_ROWS, function (event, range) {
                        if (_.contains(range, scope.rowIndex)) {
                            scope.rowIndex = view._getRecordIndex($tr);
                        }
                    });
                }
            };
        });
});