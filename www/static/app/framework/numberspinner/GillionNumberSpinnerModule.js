/**
 * Created by huangzx on 2015/7/22.
 */
define('framework/numberspinner/GillionNumberSpinnerModule', [
    'angular',
    'framework/control/GillionControlDirectiveModule'
], function (angular) {

    function parseValue(value) {
        value = parseFloat(value);
        return isNaN(value) ? '' : value;
    }

    //四舍五入
    function round(value, precision){
        if (precision == 0) return Math.round(value);
        var pow = Math.pow(10, precision);
        return (Math.round(value * pow) / pow).toFixed(precision);
    }

    //截断
    function truncate(value, precision){
        var arrSt = value.toString().split('.'),
            fixedSt,
            i, len;
        fixedSt = arrSt[1] || '';
        len = fixedSt.length;
        if (precision > len) {
            for(i=len; i<precision; i++){
                fixedSt += '0';
            }
        } else{
            fixedSt = fixedSt.slice(0, precision);
        }
        if(fixedSt != '') fixedSt = '.' + fixedSt;
        return arrSt[0] + fixedSt;
    }

    return angular.module('GillionNumberSpinnerModule', []).
        directive('gNumberSpinner', function(){
            return {
                restrict: 'E',
                scope:{
                    max: '@',
                    min: '@',
                    increment: '@',
                    disabled: '@',
                    precision: '@',
                    rounding: '@'
                },
                require: '?ngModel',
                replace: true,
                template: '<div class="form-numberbox">\n    <a class="btn" ng-click="minus()"><i class="fi fi-minus"></i></a>\n    <input on-blur="blur()" ng-disabled="{{disabled}}" g-dbc g-numeric allow-negative="true" g-precision="{{precision}}" rounding="{{rounding}}" class="form-text" type="text" />\n    <a class="btn" ng-click="plus()"><i class="fi fi-add"></i></a>\n</div>',
                compile: function(tEle, tAttrs){
                    angular.isDefined(tAttrs.width) && tEle.css("width",tAttrs.width);
                    return function(scope, ele, attrs, ngModel) {
                        var max = parseValue(scope.max),
                            min = parseValue(scope.min) || 0,
                            increment = parseValue(scope.increment) || 1,
                            precision = parseValue(scope.precision) || 0,
                            rounding = scope.rounding !== 'false',
                            $input = ele.find('.form-text');

                        if(max === undefined || max === "" || isNaN(max)) max = Number.MAX_VALUE;
                        scope.rounding = rounding;
                        if(attrs.ngModel){
                            $input.attr("id", attrs.ngModel);
                        }

                        ngModel.$formatters.push(function (rawValue) {
                            if (rawValue){
                                rawValue = rounding?round(rawValue, precision):truncate(rawValue,precision);
                                ngModel.$setViewValue(rawValue);
                                ngModel.$render();
                            }
                            return rawValue;
                        });

                        $input.on('blur', function(){
                            scope.$apply(function(){
                                var value = parseValue($input.val());
                                if (value<min) {
                                    value = min;
                                } else if(max != Number.MAX_VALUE && value > max) {
                                    value = max;
                                }
                                if (!!value || value === 0) {
                                    $input.val(value.toFixed(precision));
                                }
                                ngModel.$setViewValue($input.val());
                            });
                        });

                        ngModel.$render = function(){
                            $input.val(ngModel.$viewValue);
                        }

                        //递增
                        scope.plus = function(){
                            var pow;
                            if (scope.disabled === 'true') return;
                            var value = parseValue($input.val());
                            if(value === '') value = min;
                            pow = precision > 0 ? Math.pow(10, precision):1;
                            value = (value*pow + increment*pow)/pow;
                            value = rounding?round(value, precision):truncate(value,precision);
                            if (max != Number.MAX_VALUE && value > max) value = max.toFixed(precision);
                            ngModel.$setViewValue(value);
                            ngModel.$render();
                            $input.trigger('blurVerify');
                        };

                        //递减
                        scope.minus = function(){
                            var pow;
                            if (scope.disabled === 'true') return;
                            var value = parseValue($input.val());
                            if(value === '') {
                                if (max != Number.MAX_VALUE) value = max;
                                else return ;
                            }
                            pow = precision > 0 ? Math.pow(10, precision):1;
                            value = (value*pow - increment*pow)/pow;
                            value = rounding?round(value, precision):truncate(value,precision);
                            if (value < min) value = min.toFixed(precision);
                            ngModel.$setViewValue(value);
                            ngModel.$render();
                            $input.trigger('blurVerify');
                        }
                    };
                }
            };
        });
});