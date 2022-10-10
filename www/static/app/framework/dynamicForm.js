define('framework/dynamicForm', ['angular'], function (angular) {
    return angular.module('dynamicFormModule', [])
        .directive('gDynamicForm', function () {
            return {
                template: '<div class="form-group" ng-repeat="rowIndex in getRowRange()"> <span ng-repeat="control in controls.slice(rowIndex * colCount, getRowLimit(rowIndex))"> <label for="{{control.boAttributeName}}" class="col-sm-1 control-label">{{control.displayLabel}}</label> <div class="col-sm-{{controlWidth}}" g-dynamic-control></div> </span> </div>',
                restrict: 'E',
                replace: true,
                scope: true,
                link: function (scope, element, attrs) {
                    var colCountProp = attrs.colCount;
                    scope.getRowRange = function () {
                        var range = [], i;
                        for (i = 0; i < scope.rowCount; i++) {
                            range.push(i);
                        }
                        return range;
                    };
                    scope.getRowLimit = function (rowIndex) {
                        return Math.min((rowIndex + 1) * scope.colCount, scope.controls.length);
                    };
                    scope.$watch(attrs.formSource, function (formSource) {
                        scope.controls = formSource;
                        scope.colCount = angular.isString(colCountProp) ? scope.$eval(colCountProp) : 2;
                        scope.rowCount = Math.ceil(formSource.length / scope.colCount);
                        scope.groupWidth = Math.floor(12 / scope.colCount);
                        scope.controlWidth = scope.groupWidth - 1;
                    });
                }
            }
        }).directive('gDynamicControl', function ($compile) {
            return {
                scope: false,
                link: function (scope, element) {
                    var control = scope.control,
                        attrName = control.boAttributeName,
                        ngModel = control.boName + '.' + attrName,
                        uiType = control.uiType,
                        buildAttrs = {
                            id: attrName,
                            name: attrName,
                            'ng-model': ngModel,
                            'class': 'form-control'
                        },
                        $control;
                    switch (uiType) {
                        case '1':
                            buildAttrs.type = 'text';
                            $control = $('<input>', buildAttrs);
                            break;
                    }
                    // ng-repeat => ng-repeat => gDynamicFormScope => {parentControllerScope}
                    element.append($compile($control)(scope.$parent.$parent.$parent));
                }
            }
        });
});