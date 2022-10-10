define('framework/star/GillionStarDirectiveConstructor', ['angular', 'jquery'], function (angular, $) {
    return function ($timeout) {
        return {
            restrict: 'E',
            scope: {
                disabled: '=ngDisabled',
                readonly: '=ngReadonly'
            },
            require: '?ngModel',
            template: '<div class="form-starbox" verify-target>' +
            '  <a verify-target ng-show="starCount>0" href="javascript:void(0)" class="fi fivalue1"></a>' +
            '  <a verify-target ng-show="starCount>1" href="javascript:void(0)" class="fi fivalue2"></a>' +
            '  <a verify-target ng-show="starCount>2" href="javascript:void(0)" class="fi fivalue3"></a>' +
            '  <a verify-target ng-show="starCount>3" href="javascript:void(0)" class="fi fivalue4"></a>' +
            '  <a verify-target ng-show="starCount>4" href="javascript:void(0)" class="fi fivalue5"></a>' +
            '</div>',
            replace: true,
            link: function (scope, element, attrs, ngModel) {
                var className = attrs.className,
                    disabled = attrs.disabled,
                    readonly = attrs.readonly;
                scope.starCount = Number(attrs.starCount);
                if (isNaN(scope.starCount)) {
                    scope.starCount = 5;
                }
                scope.value = 0;
                //添加class属性
                if (className) {
                    element.addClass(className);
                }
                scope.$watch("disabled", function (value) {
                    if (value === true || value === "disabled") {
                        element.attr("disabled", "disabled");
                        disabled = true;
                    } else if (value === false) {
                        element.removeAttr("disabled");
                        disabled = false;
                    }
                    //针对ie8浏览器的处理
                    if(window.document.documentMode <= 9){
                        element.removeAttr("disabled");
                        if(disabled){
                            element.addClass("disabledStar");
                        }else{
                            element.removeClass("disabledStar");
                        }
                    }
                    handleEvent();
                });
                scope.$watch("readonly", function (value) {
                    if (value === true || value === "readonly") {
                        element.attr("readonly", "readonly");
                        readonly = true;
                    } else if (value === false) {
                        element.removeAttr("readonly");
                        readonly = false;
                    }
                    handleEvent();
                });

                disabled = (scope.disabled === true || scope.disabled === "disabled" || disabled === "true" || disabled === "disabled");
                readonly = (scope.readonly === true || scope.readonly === "readonly" || readonly === "true" || readonly === "readonly");

                if (disabled) {
                    element.attr("disabled", "disabled");
                }
                if (readonly) {
                    element.attr("readonly", "readonly");
                }
                function handleEvent() {
                    if (!(disabled || readonly)) {
                        element.find(".fi").each(function (index, item) {
                            angular.element(item).on("mouseover", function () {
                                setStarValue(index + 1);
                            });
                            angular.element(item).on("mouseout", function () {
                                var value = scope.value;
                                if (angular.isUndefined(value)) value = 0;
                                setStarValue(value);
                            });
                            angular.element(item).on("click", function () {
                                scope.value = index + 1;
                                if (ngModel) {
                                    if (scope.value !== ngModel.$modelValue) {
                                        ngModel.$setViewValue(scope.value);
                                        scope.$apply();
                                    }
                                }
                                setStarValue(scope.value);
                                this.blur();
                            });
                        });

                    } else {
                        element.find(".fi").each(function (index, item) {
                            angular.element(item).unbind("mouseover");
                            angular.element(item).unbind("click");
                            angular.element(item).unbind("mouseout");
                        });
                    }
                }

                handleEvent();

                //ngModel改变时，修改控件的值
                if (ngModel) {
                    ngModel.$render = function () {
                        scope.value = ngModel.$viewValue;
                        if (angular.isUndefined(scope.value)) {
                            scope.value = 0;
                        }
                        setStarValue(scope.value);
                    };
                }


                function setStarValue(value) {
                    if (value < 0.2) {
                        element.find("a:eq(0)").removeAttr("mode");
                        element.find("a:eq(1)").removeAttr("mode");
                        element.find("a:eq(2)").removeAttr("mode");
                        element.find("a:eq(3)").removeAttr("mode");
                        element.find("a:eq(4)").removeAttr("mode");
                    } else if (value >= 0.2 && value < 0.7) {
                        element.find("a:eq(0)").attr("mode", "half");
                        element.find("a:eq(1)").removeAttr("mode");
                        element.find("a:eq(2)").removeAttr("mode");
                        element.find("a:eq(3)").removeAttr("mode");
                        element.find("a:eq(4)").removeAttr("mode");
                    } else if (value >= 0.7 && value < 1.2) {
                        element.find("a:eq(0)").attr("mode", "full");
                        element.find("a:eq(1)").removeAttr("mode");
                        element.find("a:eq(2)").removeAttr("mode");
                        element.find("a:eq(3)").removeAttr("mode");
                        element.find("a:eq(4)").removeAttr("mode");
                    } else if (value >= 1.2 && value < 1.7) {
                        element.find("a:eq(0)").attr("mode", "full");
                        element.find("a:eq(1)").attr("mode", "half");
                        element.find("a:eq(2)").removeAttr("mode");
                        element.find("a:eq(3)").removeAttr("mode");
                        element.find("a:eq(4)").removeAttr("mode");
                    } else if (value >= 1.7 && value < 2.2) {
                        element.find("a:eq(0)").attr("mode", "full");
                        element.find("a:eq(1)").attr("mode", "full");
                        element.find("a:eq(2)").removeAttr("mode");
                        element.find("a:eq(3)").removeAttr("mode");
                        element.find("a:eq(4)").removeAttr("mode");
                    } else if (value >= 2.2 && value < 2.7) {
                        element.find("a:eq(0)").attr("mode", "full");
                        element.find("a:eq(1)").attr("mode", "full");
                        element.find("a:eq(2)").attr("mode", "half");
                        element.find("a:eq(3)").removeAttr("mode");
                        element.find("a:eq(4)").removeAttr("mode");
                    } else if (value >= 2.7 && value < 3.2) {
                        element.find("a:eq(0)").attr("mode", "full");
                        element.find("a:eq(1)").attr("mode", "full");
                        element.find("a:eq(2)").attr("mode", "full");
                        element.find("a:eq(3)").removeAttr("mode");
                        element.find("a:eq(4)").removeAttr("mode");
                    } else if (value >= 3.2 && value < 3.7) {
                        element.find("a:eq(0)").attr("mode", "full");
                        element.find("a:eq(1)").attr("mode", "full");
                        element.find("a:eq(2)").attr("mode", "full");
                        element.find("a:eq(3)").attr("mode", "half");
                        element.find("a:eq(4)").removeAttr("mode");
                    } else if (value >= 3.7 && value < 4.2) {
                        element.find("a:eq(0)").attr("mode", "full");
                        element.find("a:eq(1)").attr("mode", "full");
                        element.find("a:eq(2)").attr("mode", "full");
                        element.find("a:eq(3)").attr("mode", "full");
                        element.find("a:eq(4)").removeAttr("mode");
                    } else if (value >= 4.2 && value < 4.7) {
                        element.find("a:eq(0)").attr("mode", "full");
                        element.find("a:eq(1)").attr("mode", "full");
                        element.find("a:eq(2)").attr("mode", "full");
                        element.find("a:eq(3)").attr("mode", "full");
                        element.find("a:eq(4)").attr("mode", "half");
                    } else if (value >= 4.7) {
                        element.find("a:eq(0)").attr("mode", "full");
                        element.find("a:eq(1)").attr("mode", "full");
                        element.find("a:eq(2)").attr("mode", "full");
                        element.find("a:eq(3)").attr("mode", "full");
                        element.find("a:eq(4)").attr("mode", "full");
                    }
                }

                scope.$on("$destroy", function () {
                    element.remove();
                });

            }
        }
    }
});
