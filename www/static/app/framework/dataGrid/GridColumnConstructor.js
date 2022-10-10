define('framework/dataGridGridColumnConstructor',[
    '../../../../bower_components/angular/angular',
    'jquery',
    'underscore',
], function (angular, _, $) {
    return function () {
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
    };
});