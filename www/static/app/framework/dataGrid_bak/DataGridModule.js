define('framework/dataGrid/DataGridModule', [
    'angular',
    'jquery',
    'underscore',
    'framework/datasource/DataSourceModule',
    'framework/clickbox/GillionClickBoxModule'
], function (angular, $, _) {
    angular.module('DataGridModule', ['DataSourceModule', 'GillionClickBoxModule'])
        .directive('gDataGrid', function ($window, $document, $parse, $compile, $dataSourceManager, Arrays, Functions, Predicates) {
            var GridProto = Grid.prototype,
                ORDER = {
                    ASC: 'asc',
                    DESC: 'desc'
                },
                CONSTANTS = {
                    CHECK_ROW_WIDTH: 40,
                    SPACE_CELL_WIDTH: 19,
                    MIN_CELL_WIDTH: 50
                };

            function Grid(scope, element, attrs) {
                var me = this;
                me.scope = scope;
                me.element = element;
                me.attrs = attrs;
                me.width = element.width();
                me.hash = scope.$id;
                me.widthStyleBlock = element.children('style').get();

                me.cellValueGetterCache = {};
                me.scopeEventCache = {};
                scope.columns = me.columns = [];
                if (attrs.$columns) {
                    scope.$columns = me.columns;
                }
                me.rowStates = [];
                me.footCellIndex = 0;
                /**
                 * @type {{String: [Number, Number]}}
                 */
                me.requiredClassNameColSpanRange = {};
                me.actions = {};
            }

            GridProto.saveRecord = function (param) {
                var me = this,
                    source = me.scope.source,
                    recordIndex;
                if (angular.isNumber(param)) {
                    recordIndex = param;
                } else if (angular.isObject(param)){
                    recordIndex = _.findIndex(source, param);
                }
                if (angular.isNumber(recordIndex)) {
                    me.renderRowTitle(recordIndex)
                }
            };

            /**
             * @public
             *  重新生成行 `title`
             * @param param {Number/HTMLTableRowElement/jqLite/function(rowData:Object):Boolean} 行号或行DOM
             */
            GridProto.renderRowTitle = function (param) {
                var me = this,
                    columns = me.columns,
                    source = me.scope.source,
                    hasCheckbox = me.hasCheckbox,
                    $rows = me.element.find('.table-body tr'),
                    row, $row, rowIndex, rowData, $cells;
                if (angular.isNumber(param)) {
                    row = $rows.get(param);
                    if (row) {
                        $row = angular.element(row);
                        rowIndex = $row.attr('data-row-index');
                        rowData = source[rowIndex];
                    }
                } else if (angular.isFunction(param)) {
                    rowIndex = _.findIndex(source, param);
                    rowData = source[rowIndex];

                    $row = angular.element($rows.get(rowIndex));
                } else if (($row = angular.element(param)).is('tr')) {
                    rowIndex = $row.attr('data-row-index');
                    rowData = source[rowIndex];
                }
                if (rowData && $row) {
                    $cells = $row.children('td');
                    if (hasCheckbox) {
                        $cells = $cells.slice(1);
                    }
                    $cells.each(function (i, cell) {
                        var column = columns[i];
                        me._renderCellTitle(rowData, column, cell);
                    });
                }
            };

            /**
             * @param rowData 行数据
             * @param column 列对象
             * @param $cellDom {HTMLTableCellElement/jqLite} 列`dom`
             * @private
             */
            GridProto._renderCellTitle = function (rowData, column, $cellDom) {
                var me = this;
                if (!column.disableTitle) {
                    var cellValue = me.getCellValue(rowData, column);
                    angular.element($cellDom).attr('title', cellValue);
                }
            };

            GridProto.addColumn = function (column) {
                return this.columns.push(column);
            };

            GridProto.getCellValue = function (row, column) {
                var me = this,
                    cellValueGetterCache = me.cellValueGetterCache;
                if (!cellValueGetterCache[column.data]) {
                    cellValueGetterCache[column.data] = me.generateCellValueGetter(column);
                }
                return cellValueGetterCache[column.data](row);
            };

            GridProto.generateCellValueGetter = function (column) {
                if (column.data) {
                    return $parse(column.data);
                }
                return angular.noop;
            };

            GridProto.getSortName = function (sortingIcon) {
                var columnIndex = sortingIcon.closest('th').data('col-index');
                return this.columns[columnIndex].sortable;
            };

            /**
             * @param $event
             * @param $sortingIcon
             */
            GridProto.doSort = function ($event, $sortingIcon) {
                var me = this,
                    scope = me.scope,
                    onBeforeSortColumn = scope.onBeforeSortColumn,
                    onSortColumn = scope.onSortColumn,
                    oldSortDirection = me.sortDirection,
                    sortName = this.getSortName($sortingIcon),
                    direction = $sortingIcon.hasClass('caret-up') ? ORDER.ASC : ORDER.DESC,
                    dataSource = scope.dataSource,
                    sortEventParam;

                if (oldSortDirection === direction) {
                    direction = undefined;
                }
                sortEventParam = {
                    grid: this,
                    sortName: sortName,
                    sortDirection: direction
                };

                if (onBeforeSortColumn(sortEventParam) !== false) {
                    console.log(dataSource);
                    dataSource.sortName = me.sortName = sortName;
                    dataSource.sortDirection = me.sortDirection = direction;
                    if (!!dataSource.$scope.allowAutoLoad) {
                        dataSource.doRequestData();
                    }
                    onSortColumn(sortEventParam);
                }
            };

            function rowStateCheckedPredicate(rowState) {
                return rowState.checked === true;
            }

            GridProto.isAllRowsChecked = function () {
                var me = this,
                    enableCheckRowStates = me.getEnableCheckRowStates();
                return Arrays.allAre(enableCheckRowStates, rowStateCheckedPredicate)
            };

            GridProto.checkboxCellClick = function () {
                var me = this;
                me.scope.allChecked = me.isAllRowsChecked();
                me.checkRowByContrl = true;
                me.resetCheckedRows();
            };


            GridProto.toggleAllChecked = function () {
                var me = this,
                    scope = me.scope,
                    enableCheckRowStates = me.getEnableCheckRowStates();
                angular.forEach(enableCheckRowStates, function (rowStatus) {
                    rowStatus.checked = scope.allChecked;
                });
                me.checkRowByContrl = true;
                me.resetCheckedRows();
            };

            GridProto.getEnableCheckRowStates = function () {
                var me = this,
                    rowStates = me.rowStates,
                    enableCheckRowStates = [],
                    enabledCheckRowIndexes = me.element
                        .find('.grid-body td:first-child > .form-clickbox[disabled!=disabled]')
                        .closest('tr')
                        .map(function (row) {
                            return angular.element(this).attr('data-row-index');
                        });

                angular.forEach(enabledCheckRowIndexes, function (rowIndex) {
                    enableCheckRowStates.push(rowStates[rowIndex]);
                });
                return enableCheckRowStates;
            };

            /**
             * 根据 rowStates 重置checkedRows
             */
            GridProto.resetCheckedRows = function () {
                var me = this,
                    scope = me.scope,
                    source = scope.source,
                    checkedRows = scope.checkedRows,
                    rowStates = me.rowStates,
                    checkedRowStates = Arrays.filter(rowStates, rowStateCheckedPredicate),
                    checkedRowIndexes = Arrays.transform(checkedRowStates, function (rowState) {
                        return rowState.rowIndex;
                    });
                checkedRows.length = 0;
                angular.forEach(checkedRowIndexes, function (checkedRowIndex) {
                    checkedRows.push(source[checkedRowIndex]);
                });
            };

            GridProto.checkRowsByOuter = function () {
                var me = this,
                    scope = me.scope,
                    checkedRows = scope.checkedRows,
                    source = scope.source;
                if (angular.isArray(source)) {
                    angular.forEach(checkedRows, function (checkedRow) {
                        var recordIndex = Arrays.indexOf(source, checkedRow);
                        me.rowStates[recordIndex].checked = true;
                    });
                    var uncheckedRows = Arrays.subtract(source, checkedRows);
                    angular.forEach(uncheckedRows, function (uncheckedRow) {
                        var uncheckedRowIdx = Arrays.indexOf(source, uncheckedRow);
                        me.rowStates[uncheckedRowIdx].checked = false;
                    });
                }
            };

            GridProto.rowClick = function ($event, $row) {
                var me = this,
                    scope = me.scope,
                    rowIndex = $row.attr('data-row-index'),
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

                if (onBeforeSelect(selectParam) !== false) {
                    scope.selectedRow = isSelected ? selectedRecord : undefined;
                    onSelect(selectParam);
                }

            };

            GridProto.rowDbClick = function ($event, $row) {
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

            GridProto.cellDbClick = function ($event, $cell) {
                var me = this,
                    scope = me.scope,
                    selectedRecord = scope.selectedRow,
                    cellIndex = $cell.data('cell-index'),
                    column = me.columns[cellIndex],
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
            };

            /**
             * 子指令scope定义方法属性时， 指定到grid外scope的某个方法， 通过本方法获取
             * @param eventDefineAttrVal 方法属性指定的值
             * @return {*}
             */
            GridProto.getScopeEvent = function (eventDefineAttrVal) {
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

            GridProto.renderCellsStyle = function () {
                var me = this,
                    element = me.element,
                    allColWidths = me.getAllColWidths(),
                    colWidthClassBlocks = me.getColWidthClassBlocks(allColWidths),
                    requiredSpanColClassBlocks = me.getRequiredSpanColClassBlocks(allColWidths),
                    allColWidthClassBlocks = colWidthClassBlocks.concat(requiredSpanColClassBlocks),
                    cellWidthStyleBlockContent = Arrays.reduce(allColWidthClassBlocks, Functions.sum),
                    $newCellStyleBlock = angular.element('<style>' + cellWidthStyleBlockContent + '</style>');
                element.children('style').remove();
                element.append($newCellStyleBlock);
            };

            /**
             * 获取列的宽度样式片段
             *
             * @param allColWidths {Array<Number>} 所有列的宽度
             * @return {Array<String>} 宽度样式片段
             */
            GridProto.getColWidthClassBlocks = function (allColWidths) {
                var me = this,
                    colWidthClassBlocks = [],
                    colWidthClassName, colWidthClassBlock;
                angular.forEach(allColWidths, function (colWidth, colIndex) {
                    colWidthClassName = me.getColWidthClassName(colIndex);
                    colWidthClassBlock = toWidthClassBlock(colWidthClassName, colWidth);
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
            GridProto.getRequiredSpanColClassBlocks = function (allColWidths) {
                var me = this,
                    spanColClassBlocks = [],
                    requiredClassNameColSpanRange = me.requiredClassNameColSpanRange,
                    start, end, spanColWidths, spanColWidthSum, spanColWidthClassBlock;
                angular.forEach(requiredClassNameColSpanRange, function (spanRange, requiredClassName) {
                    start = spanRange[0];
                    end = spanRange[1];
                    spanColWidths = allColWidths.slice(start, end);
                    spanColWidthSum = Arrays.reduce(spanColWidths, Functions.sum);
                    spanColWidthClassBlock = toWidthClassBlock(requiredClassName, spanColWidthSum);
                    spanColClassBlocks.push(spanColWidthClassBlock);
                });
                return spanColClassBlocks;
            };

            function toWidthClassBlock(className, width) {
                return '.' + className + '{width:' + width + 'px;}'
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
            GridProto.getAllColWidths = function () {
                var me = this,
                    columns = me.columns,
                    gridContentWidth = me.getContentWidth(),
                    columnWidths;
                columnWidths = Arrays.transform(columns, function (col) {
                    return me.getSingleColWidth(col.widthDef, gridContentWidth);
                });
                paddingWithSpentAvg(columnWidths, gridContentWidth, CONSTANTS.MIN_CELL_WIDTH);
                if (me.hasCheckbox) {
                    columnWidths.unshift(CONSTANTS.CHECK_ROW_WIDTH);
                }
                if (me.hasVerticalScroll()) {
                    columnWidths.push(CONSTANTS.SPACE_CELL_WIDTH);
                }
                return columnWidths;
            };

            GridProto.hasVerticalScroll = function () {
                var me = this,
                    $gridBody = me.element.find('.grid-body'),
                    $bodyTable = $gridBody.children('.table-body');
                return $gridBody.width() < $bodyTable.width();
            };

            /**
             * 获取表格单列宽度
             * @param columnWidthDef {String} 列指令的宽度定义字符串 例: 100 、100px 、 10%
             * @param gridContentWidth {Number} 表格主体宽度, 即数据展示部分的宽度
             * @return {number} 列宽度
             */
            GridProto.getSingleColWidth = function (columnWidthDef, gridContentWidth) {
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
            GridProto.getContentWidth = function () {
                var me = this,
                    gridWidth = me.element.width(),
                    gridContentWidth = gridWidth - 2;
                if (me.hasCheckbox) {
                    gridContentWidth -= CONSTANTS.CHECK_ROW_WIDTH;
                }
                if (me.hasVerticalScroll()) {
                    gridContentWidth -= CONSTANTS.SPACE_CELL_WIDTH
                }
                return gridContentWidth;
            };

            GridProto.registerFootCellWidthClass = function (span) {
                var me = this,
                    startColIndex = me.footCellIndex,
                    colspan = isNaN(span) ? 1 : span,
                    endColIndex = startColIndex + colspan,
                    colWidthClassName = me.getColWidthClassName(startColIndex);
                if (colspan > 1) {
                    colWidthClassName += ('-' + endColIndex);
                    me.requiredClassNameColSpanRange[colWidthClassName] = [startColIndex, endColIndex];
                }
                me.footCellIndex += colspan;
                return colWidthClassName;
            };

            /**
             *
             * @param startColIndex {Number} 开始的`column`的`index`
             * @return {string}
             */
            GridProto.getColWidthClassName = function (startColIndex) {
                return 'grid-' + this.hash + '-col-' + startColIndex;
            };

            GridProto.startEdit = function (rowIndex) {
                var me = this,
                    rowState = me.rowStates[rowIndex],
                    editingRowState = Arrays.findOne(me.rowStates, Predicates.newPropValEqPredicate('editing', true)),
                    $cells = me.element.find('.grid-body tr[data-row-index=' + rowIndex + '] > td');
                if (editingRowState === undefined && rowState.editing !== true) {
                    angular.forEach($cells, function (cell) {
                        var $cell = angular.element(cell),
                            $editorPlace = $cell.children('[data-role=editor]'),
                            cellScope = $cell.scope(),
                            column = cellScope.column,
                            columnEditorTmpl = me.getEditorTmpl(column),
                            cellTmplScope, $editor;

                        if (columnEditorTmpl) {
                            cellTmplScope = me.getCellTmplScope(cellScope);
                            $editor = angular.element(columnEditorTmpl);
                            $editor.attr({
                                'ng-model': 'row.' + column.field,
                                'name': column.field
                            });
                            if (me.scope.validatorName) {
                                $editor.attr('g-field-validator', '');
                                $editor.data('$formController', me.formController);
                                $editor.data('$gValidatorController', me.gValidatorController);
                            }
                            $editorPlace.append($editor);
                            $compile($editor)(cellTmplScope);
                        }
                    });
                    rowState.editing = true;
                }
            };

            GridProto.finishEdit = function () {
                var me = this,
                    rowStates = me.rowStates,
                    formController = me.formController,
                    editingRowState = Arrays.findOne(rowStates, Predicates.newPropValEqPredicate('editing', true)),
                    editingRowIndex, $editingCells;
                if (editingRowState) {
                    editingRowIndex = Arrays.indexOf(rowStates, editingRowState);
                    if (formController) {
                        formController.verify();
                        if (!formController.$valid) return;
                    }
                    $editingCells = me.element.find('.grid-body tr[data-row-index=' + editingRowIndex + '] > td');
                    angular.forEach($editingCells, function (editingCell) {
                        var $editingCell = angular.element(editingCell),
                            cellScope = $editingCell.scope(),
                            column = cellScope.column;
                        // 清空编辑器， 不然其它行无法启用编辑
                        $editingCell.children('[data-role=editor]').empty();
                        if (column && column.canEdit && !column.tmpl) {
                            me.renderCellDisplay(cellScope, $editingCell);
                        }
                    });
                    me.renderRowTitle(editingRowIndex);
                    editingRowState.editing = false;
                }
            };

            GridProto.getEditorTmpl = function (column) {
                var me = this,
                    columnTmplMap = {};
                GridProto.getEditorTmpl = function getEditorTmpl(column) {
                    if (column) {
                        var field = column.field,
                            columnTmpl;
                        if (field) {
                            if (column.canEdit) {
                                if (!columnTmplMap.hasOwnProperty(field)) {
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
                                }
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
                me.getEditorTmpl(column);
            };

            GridProto.getCellTmplScope = function getCellTmplScope(cellScope) {
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
                        rowState: me.rowStates[rowIndex],
                        row: cellScope.row
                    });
                if (formName) {
                    cellTmplScope[formName] = scope[formName];
                }
                return cellTmplScope;
            };

            GridProto.renderCellDisplay = function (cellScope, $cell) {
                var me = this,
                    row = cellScope.row,
                    column = cellScope.column,
                    $displayPlace = $cell.children('[data-role=display]'),
                    html;
                html = me.getCellValue(row, column);
                $displayPlace.html(html);
            };

            /**
             * 重置表格状态
             * 包括： 1、 全选状态
             *       2、 rowStates
             *       3、 选中行集
             */
            GridProto.reset = function () {
                var me = this,
                    scope = me.scope,
                    source = scope.source,
                    rowStates = me.rowStates;
                // 清空选中行
                rowStates.length = 0;
                //noinspection JSUnresolvedVariable
                angular.forEach(source, function (row, rowIndex) {
                    rowStates.push({rowIndex: rowIndex});
                });
                me.resetCheckedRows();
                scope.allChecked = false;
                scope.selectedRow = scope.$selectedRow = undefined;
            };

            return {
                template: '<div class="grid">\n    <div class="grid-head" ng-click="headClick($event)">\n        <table class="table-head">\n            <tbody>\n            <tr>\n                <th class="table-scroll-space"></th>\n            </tr>\n            </thead> </table>\n    </div>\n    <div class="grid-body" ng-click="bodyClick($event)" ng-dblclick="bodyDbClick($event)">\n        <table class="table-body">\n            <tbody>\n            <tr ng-repeat="(rowIndex, row) in source"\n                active="{{selectedRow === row}}"\n                ng-class-even="{\'table-body-tr-even\': enableEvenClass === \'true\'}"\n                data-row-index="{{rowIndex}}" \n                outer-scope="grid.scope.$parent"\n                render-item-class>\n                <td class="grid-col-checkbox" ng-if="grid.hasCheckbox" data-checkbox-cell="true">\n                    <g-checkbox ng-model="grid.rowStates[rowIndex].checked" \n                                render-item-disabled="grid.checkboxesDisabledController"\n                                render-item-disabled-locals="row,rowIndex"\n                                outer-scope="grid.scope.$parent"></g-checkbox>\n                </td>\n                <td g-cell ng-repeat="(columnIndex, column) in columns" \n                    data-row-index="{{rowIndex}}"\n                    data-cell-index="{{columnIndex}}" \n                    outer-scope="grid.scope.$parent"\n                    render-item-class="column.gItemClass"\n                    render-item-class-locals="row,columnIndex,column"\n                    ng-class="{\'left\':\'align-left\', \'right\':\'align-right\', \'center\':\'align-center\'}[column.align || \'left\']">\n                    <span data-role="display" \n                          ng-show="!(column.canEdit && grid.rowStates[rowIndex].editing)"></span> \n                    <span data-role="editor" \n                          ng-show="column.canEdit && grid.rowStates[rowIndex].editing"></span>\n                </td>\n            </tr>\n            </tbody>\n        </table>\n    </div>\n</div> ',
                replace: true,
                restrict: 'E',
                transclude: true,
                scope: {
                    sourceName: '@sourceName',
                    validatorName: '@',
                    $columns: '=columns',
                    $selectedRow: '=selectedRow',
                    $checkedRows: '=checkedRows',
                    onLoadSuccess: '&',
                    onRender: '&',
                    onBeforeSortColumn: '&',
                    onSortColumn: '&',
                    onBeforeSelect: '&',
                    onSelect: '&',
                    canToggleSelected: '@',
                    enableEvenClass: '@',
                    onBeforeRowDbclick: '&',
                    onRowDbclick: '&',
                    onBeforeCellDbclick: '&',
                    onCellDbclick: '&'
                },
                require: 'gDataGrid',
                compile: function (tElement, tAttributes, transclude) {
                    return function (scope, element, attrs, grid) {
                        var $head = element.find('.grid-head'),
                            $body = element.find('.grid-body'),
                            $bodyTable = $body.children('table'),
                            $headTableBody = $head.find('tbody'),
                            isBindCheckedRows = attrs.hasOwnProperty('checkedRows'),
                            isBindSelectedRow = attrs.hasOwnProperty('selectedRow');

                        if (scope.validatorName) {
                            grid.formName = 'grid' + grid.hash + 'form';
                            var $form = angular.element('<form>', {
                                name: grid.formName,
                                'g-validator': scope.validatorName,
                                'data-invalid-msg': 'tooltipMessenger',
                                'onsubmit': 'return false'
                            });
                            $bodyTable.wrap($form);
                            $form = $bodyTable.parent();
                            $compile($form)(scope);
                            grid.formController = $form.data('$formController');
                            grid.gValidatorController = $form.data('$gValidatorController');
                        }

                        $dataSourceManager.getDataSource(attrs.sourceName).then(function (result) {
                            scope.dataSource = result;
                        });

                        scope.$on(scope.sourceName, function (event, result) {
                            var body = $document[0].body;

                            if (body.hasAttribute('g-dict') && !!body.getAttribute('g-dict') && scope.$root.$dictReturned !== true) {
                                scope.$on('$dictReturned', function () {
                                    doLayer();
                                });
                            } else {
                                doLayer();
                            }

                            function doLayer() {
                                scope.source = result['records'];
                                if (result.hasOwnProperty('moreAttrs')) {
                                    scope.moreAttrs = result['moreAttrs'];
                                }

                                grid.reset();

                                if (angular.isFunction(scope.onLoadSuccess)) {
                                    scope.onLoadSuccess({
                                        source: scope.source,
                                        grid: grid,
                                        result: result
                                    });
                                }
                            }
                        });

                        transclude(scope, function (clone) {
                            var headCells = clone.filter('th'),
                                $headSpaceCol = $headTableBody.find('tr th.table-scroll-space'),
                                $foot = clone.filter('.grid-foot');
                            if (headCells.length > 0) {
                                angular.forEach(headCells, function (cell) {
                                    $headSpaceCol.before(cell);
                                });
                            }
                            if ($foot.length > 0) {
                                // init footData
                                grid.footCells = [];
                                //gridController.footColGroup = foot.find('colgroup');
                                element.append($foot);
                                // 绑定 scroll
                                $body.bind('scroll', function (event) {
                                    $foot[0].scrollLeft = (event.target || event.srcElement).scrollLeft;
                                });
                            }
                        }, grid);

                        scope.headClick = function ($event) {
                            var target = $event.target || $event.srcElement,
                                $target = angular.element(target);
                            if ($target.is('span.caret')) {
                                grid.doSort($event, $target);
                            }
                            if ($target.is('a.fi') && $target.parent().is('.form-clickbox')) {
                                grid.toggleAllChecked();
                            }
                        };

                        scope.bodyClick = function ($event) {
                            var target = $event.target || $event.srcElement,
                                $target = angular.element(target),
                                $cell = $target.closest('td'),
                                $row = $cell.closest('tr');
                            if ($target.is('a.fi') && $target.closest('td').data('checkbox-cell') === true) {
                                grid.checkboxCellClick();
                            }
                            if ($row.length === 1) {
                                grid.rowClick($event, $row);
                            }
                        };

                        scope.bodyDbClick = function ($event) {
                            var target = $event.target || $event.srcElement,
                                $target = angular.element(target),
                                $cell = $target.closest('td'),
                                $row = $cell.closest('tr');
                            grid.rowDbClick($event, $row);
                            grid.cellDbClick($event, $cell);
                        };

                        // 实现 grid选中行双向绑定 start
                        scope.$watch('selectedRow', function (newRow, oldRow) {
                            if (newRow !== oldRow) {
                                if (isBindSelectedRow) {
                                    scope.$selectedRow = newRow;
                                }
                            }
                        });

                        if (isBindSelectedRow) {
                            scope.$watch('$selectedRow', function (newRow, oldRow) {
                                var $allRows = element.find('.scroll-table-mian tr'),
                                    recordIndex, $row;
                                if (newRow !== oldRow && scope.selectedRow !== newRow) {
                                    recordIndex = Arrays.indexOf(scope.source, newRow);
                                    $row = angular.element($allRows.get(recordIndex));
                                    grid.rowClick({}, $row);
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
                                    grid.checkRowsByOuter();
                                }
                                grid.checkRowByContrl = false;
                            });
                        } else {
                            scope.checkedRows = [];
                        }

                        // 实现 grid选中行双向绑定 end

                        // 表格宽度js设定
                        setTimeout(function () {
                            grid.renderCellsStyle();
                        }, 0);

                        if (angular.isFunction(scope.onRender)) {
                            scope.onRender({
                                grid: grid,
                                source: scope.source
                            });
                        }

                        // 绑定 scroll
                        $body.bind('scroll', function (event) {
                            $head[0].scrollLeft = (event.target || event.srcElement).scrollLeft;
                        });

                        $($window).on('resize', function () {
                            grid.renderCellsStyle();
                        });

                        scope.$on('show', function () {
                            grid.renderCellsStyle();
                        });
                    };
                },
                controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                    $scope.grid = new Grid($scope, $element, $attrs);
                    return $scope.grid;
                }]
            };
        })
        .directive('gCheckboxColumn', function () {
            return {
                restrict: 'E',
                template: '<th class="grid-col-checkbox"><g-checkbox ng-model="allChecked"></g-checkbox></th>',
                replace: true,
                scope: false,
                require: ['^gDataGrid', '?gItemDisabled'],
                link: function (scope, element, attrs, controllers) {
                    var gridController = controllers[0],
                        gItemDisabled = controllers[1];
                    gridController.hasCheckbox = true;
                    gridController.checkboxesDisabledController = gItemDisabled;
                },
                controller: ['$scope', '$attrs', function ($scope, $attrs) {
                    var itemDisabledExpress = $attrs['gItemDisabled'];
                    return function (scope, element) {
                        scope.$watch(itemDisabledExpress, function (newVal) {
                            if (newVal === true) {
                                element.attr('disabled', 'disabled');
                            } else {
                                element.removeAttr('disabled');
                            }
                        });
                    };
                }]
            };
        })
        .directive('gColumn', function () {
            return {
                template: '<th> <div class="grid-head-sort" ng-if="$sortable !== undefined"> <button class="btn"><span ng-class="{\'selected\': grid.sortName === sortable && grid.sortDirection === \'asc\'}" class="caret caret-up"></span></button> <button class="btn"><span ng-class="{\'selected\': grid.sortName === sortable && grid.sortDirection === \'desc\'}" class="caret caret-down"></span></button> </div> </th>',
                replace: true,
                restrict: 'E',
                transclude: true,
                scope: {
                    $sortable: '@sortable',
                    data: '@',
                    width: '@',
                    editable: '@',
                    tmpl: '@',
                    disableTitle: '@',
                    align: '@',
                    cellAlign: '@'
                },
                require: ['^gDataGrid', '?gItemClass'],
                compile: function (tElement, tAttrs, transclude) {
                    return function (scope, element, attrs, controllers) {
                        var gridController = controllers[0],
                            gItemClass = controllers[1];
                        transclude(scope, function (clone) {
                            angular.forEach(clone, function (node) {
                                if (!/G-COLUMN-TMPL|G-COLUMN-EDITOR/i.test(node.tagName)) {
                                    element.append(node);
                                } else {
                                    //element.remove();
                                }
                            });
                        }, gridController);
                        var columnInstance = {
                                field: scope.data,
                                data: scope.data,
                                hash: scope.$id,
                                widthDef: scope.width,
                                editable: scope.editable,
                                tmpl: scope.tmpl,
                                element: element,
                                align: scope.cellAlign || scope.align,
                                gItemClass: gItemClass,
                                disableTitle: scope.disableTitle === 'true'
                            },
                            newLength = gridController.addColumn(columnInstance),
                            colIndex = newLength - 1,
                            realColIndex = gridController.hasCheckbox ? (colIndex + 1) : colIndex,
                            onBeforeCellDbclickDef = attrs.onBeforeCellDbclick,
                            onCellDbclickDef = attrs.onCellDbclick,
                            sortable;
                        if (/\|/.test(columnInstance.field)) {
                            columnInstance.field = $.trim(columnInstance.field.split('|')[0]);
                        }
                        // 如果需要排序， data中有空格视为包含过滤器， 截取空格前字符串作为排序字段
                        if (attrs.hasOwnProperty('sortable')) {
                            sortable = columnInstance.field;
                        }

                        if (!!scope.editorTmpl) {
                            columnInstance.editorTmpl = scope.editorTmpl;
                        }
                        if (columnInstance.field && (columnInstance.editable || columnInstance.editorTmpl)) {
                            columnInstance.canEdit = true;
                        }
                        // 列双击事件
                        if (onBeforeCellDbclickDef) {
                            columnInstance.onBeforeCellDbclick = gridController.getScopeEvent(onBeforeCellDbclickDef);
                        }
                        if (onCellDbclickDef) {
                            columnInstance.onCellDbclick = gridController.getScopeEvent(onCellDbclickDef);
                        }

                        columnInstance.colWidthClassName = gridController.getColWidthClassName(realColIndex);
                        columnInstance.index = colIndex;
                        columnInstance.sortable = scope.sortable = sortable;

                        scope.grid = gridController;

                        element.data('col-index', colIndex);
                        attrs.$addClass(columnInstance.colWidthClassName);
                    };
                }
            };
        })
        .directive('gCell', function ($compile) {
            return {
                restrict: 'A',
                scope: false,
                require: '^gDataGrid',
                link: function (scope, element, attrs, grid) {
                    //noinspection JSUnresolvedVariable
                    var column = scope.column,
                        tmpl = column.tmpl,
                        colIndex = grid.hasCheckbox ? (column.index + 1) : column.index,
                        $displayPlace = element.children('[data-role=display]'),
                        tmplScope;
                    if (tmpl) {
                        tmplScope = grid.getCellTmplScope(scope);
                        $displayPlace.append($compile(tmpl)(tmplScope));
                    } else {
                        grid.renderCellDisplay(scope, element);
                    }
                    if (!column.disableTitle) {
                        attrs.$set('title', grid.getCellValue(scope.row, column));
                    }
                    attrs.$addClass('grid-' + grid.hash + '-col-' + colIndex);
                }
            };
        })
        .directive('gFooter', function () {
            return {
                restrict: 'E',
                template: '<div class="grid-foot"> <table class="table-foot"> <tbody> <tr> <th class="table-scroll-space"></th> </tr> </tbody> </table> </div>',
                replace: true,
                transclude: true,
                scope: false,
                require: '^gDataGrid',
                compile: function (tElement, tAttrs, transclude) {
                    return function (scope, element, attrs, gridController) {
                        var $footSpaceCell = element.find('.table-scroll-space');
                        transclude(scope, function (clone) {
                            var footCells = clone.filter('th');
                            $footSpaceCell.before(footCells);
                        }, gridController);
                    }
                }
            };
        })
        .directive('gFooterCell', function () {
            return {
                restrict: 'E',
                template: '<th><div ng-transclude/> </th>',
                replace: true,
                transclude: true,
                scope: false,
                require: '^gDataGrid',
                link: function (scope, element, attrs, gridController) {
                    var span = Number(element.attr('colspan')),
                        spanColWidthClassName = gridController.registerFootCellWidthClass(span);

                    attrs.$addClass(spanColWidthClassName);
                }
            };
        })
        // just for stored column's template
        .directive('gColumnTmpl', function () {
            return {
                restrict: 'E',
                scope: false,
                compile: function (tElement) {
                    var columnTmpl = $.trim(tElement.html());
                    if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0") {
                        columnTmpl = columnTmpl.replace('<:', '<').replace('<:/', '</');
                    }
                    return function (scope) {
                        scope.tmpl = columnTmpl;
                    }
                }
            };
        })
        // NOTE 一个表格中只能定义一个删除按钮
        .directive('gActionRemove', function () {
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
                            onBeforeAction = grid.getScopeEvent(onBeforeActionAttrVal);
                        }
                        if (!!onActionAttrVal) {
                            onAction = grid.getScopeEvent(onActionAttrVal);
                        }
                    }

                    scope.removeRecord = function ($event) {
                        var element = $event.target || $event.srcElement,
                            $row = angular.element(element).closest('tr'),
                            rowIndex = $row.attr('data-row-index'),
                            source = grid.scope.source,
                            row = source[rowIndex];
                        //noinspection JSUnresolvedVariable
                        var eventParams = {
                            $event: $event,
                            record: row
                        };
                        if (onBeforeAction(eventParams) !== false) {
                            source.splice(rowIndex, 1);
                            onAction(eventParams);
                        }
                    }
                }
            };
        })
        .directive('gColumnEditor', function () {
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
                    }
                }
            };
        });
});