define('framework/slider/GillionSliderDirectiveConstructor', ['angular'], function (angular) {
    return function () {

        /**
         * 将文本中的数据转换为数字
         * @param text
         */
        function getNumFromStr(text) {
            var lengthNumRegExp = /^[0-9]+/,
                matches, result;
            result = 0;
            if (text) {
                matches = lengthNumRegExp.exec(text);
                result = parseFloat(matches[0]);
            }
            return result;
        }

        //创建滑块
        function Slider(min, max, mode, pos, total, element, callback, otherElement) {
            this.min = min;
            this.max = max;
            this.mode = mode;
            this.pos = pos;
            this.total = total;
            this.element = element;
            this.callback = callback;
            this.otherElement = otherElement;
            this.step = (this.max - this.min) !== 0 ? this.total / (this.max - this.min) : 1;
            //临界点
            this.cutOff = false;
            this.value = 0;
        }

        Slider.prototype.setValue = function (value) {
            var valModStep, alignValue, compare, otherLength;
            if (value > this.total) {
                value = this.total;
            }
            if (value < 0) {
                value = 0;
            }

            if (this.otherElement) {
                if (this.mode === 0) {
                    compare = getNumFromStr(this.otherElement.css("width"));
                } else {
                    compare = getNumFromStr(this.otherElement.css("height"));
                }
                if (value > this.total + 2 - compare) {
                    value = this.total + 2 - compare;
                }
            }


            if (value + compare === this.total + 2) {
                if (this.mode === 0) {
                    otherLength = getNumFromStr(this.otherElement.css("width"));
                    this.element.css("width", (this.total + 2 - otherLength) + "px");
                } else {
                    otherLength = getNumFromStr(this.otherElement.css("height"));
                    this.element.css("height", (this.total + 2 - otherLength) + "px");
                }
                this.element.css("zIndex", 100);
                valModStep = (value - this.min * this.step) % this.step;
                alignValue = value - valModStep;
                if (Math.abs(valModStep) * 2 >= this.step) {
                    alignValue += ( valModStep > 0 ) ? this.step : ( -this.step );
                }
                value = alignValue;
                this.cutOff = true;
            } else {
                valModStep = (value - this.min * this.step) % this.step;
                alignValue = value - valModStep;
                if (Math.abs(valModStep) * 2 >= this.step) {
                    alignValue += ( valModStep > 0 ) ? this.step : ( -this.step );
                }
                if (value !== this.total) {
                    value = alignValue;
                }
                if (this.mode === 0) {
                    this.element.css("width", (value + 2) + "px");
                } else {
                    this.element.css("height", ((value + 2)) + "px");
                }
                this.element.css("zIndex", "");
                this.cutOff = false;
            }
            this.value = value;
        }

        /**
         * 滑块的滑动
         */
        Slider.prototype.drag = function () {
            var me = this,
                original, value, x, y, clientX, clientY,
                mouseDown, mouseMove, mouseUp, validate;
            mouseDown = function (event) {
                clientX = event.clientX;
                clientY = event.clientY;
                if (me.mode === 0) {
                    original = getNumFromStr(me.element.css("width"));
                } else {
                    original = getNumFromStr(me.element.css("height"));
                }
                angular.element(document).mousemove(mouseMove).mouseup(mouseUp);

                var isIE = /(MSIE|Trident\/|Edge\/)/i.test(navigator.userAgent);
                if (isIE && window.parent.document) {
                    angular.element(window.parent.document).mouseup(mouseUp);
                }
            }
            //滑动
            mouseMove = function (event) {
                var x, y;
                x = event.clientX - clientX;
                y = event.clientY - clientY;
                if (me.pos === 0 && me.mode === 0) {
                    value = original + x;
                } else if (me.pos === 1 && me.mode === 0) {
                    value = original - x;
                } else if (me.pos === 0 && me.mode === 1) {
                    value = original + y;
                } else if (me.pos === 1 && me.mode === 1) {
                    value = original - y;
                }

                me.setValue(value);
                event.preventDefault();
                me.callback(me.pos, me.mode, me.value, me.cutOff);
            }
            mouseUp = function (event) {
                angular.element(document).unbind('mousemove', mouseMove).unbind('mouseup', mouseUp);
            }
            me.element.find("button").on("mousedown", mouseDown);
        }
        return {
            restrict: 'E',
            replace: true,
            scope: {
                secondValue: '=secondValue',
                disabled: '@'
            },
            require: '^?ngModel',
            template: '<div class="form-slider"><div class="form-slider-block"><button class="btn"><i ng-disabled="disabled" class="fi fi-slider"></i></button></div><div ng-show="!single" class="form-slider-block"><button class="btn"><i  ng-disabled="disabled" class="fi fi-slider"></i></button></div></div>',
            link: function ($scope, $element, $attrs, ngModel) {
                var gLength = $attrs.gLength,
                    maxValue = $attrs.maxValue,
                    minValue = $attrs.minValue,
                    single = $attrs.single || 'true',
                    orientation = $attrs.orientation || 'horizontal',
                    firstElement, secondElement, firstSlider, secondSlider, totalLength, callback;
                $scope.single = (single === 'true');
                if (orientation === "vertical") {
                    $element.attr("mode", "vertical");
                }

                if ($scope.single) {
                    $element.attr("single", "true");
                }
                //设置控件长度
                if (gLength) {
                    if (orientation === "vertical") {
                        $element.css("height", gLength);
                    } else {
                        $element.css("width", gLength);
                    }
                }

                if (orientation === "vertical") {
                    totalLength = getNumFromStr($element.css("height")) - 2;
                } else {
                    totalLength = getNumFromStr($element.css("width")) - 2;
                }

                if ($scope.single) {
                    firstElement = $element.find("div:first");
                    if (orientation === "vertical") {
                        firstElement.css("height", 2 + "px");
                    } else {
                        firstElement.css("width", (totalLength + 2) + "px");
                    }
                } else {
                    firstElement = $element.find("div:last");
                    secondElement = $element.find("div:first");
                    if (orientation === "vertical") {
                        firstElement.css("height", "2px");
                        secondElement.css("height", "2px");
                    } else {
                        firstElement.css("width", "2px");
                        secondElement.css("width", "2px");
                    }

                }
                callback = function (pos, model, value, cutOff) {
                    var firstValue, secondValue;
                    value = parseFloat(value.toFixed(5));
                    maxValue = parseFloat(maxValue);
                    totalLength = parseFloat(totalLength)
                    minValue = parseFloat(minValue);
                    if ($scope.single) {
                        if (orientation === "vertical") {
                            firstValue = (value / totalLength) * (maxValue - minValue) + minValue;
                            firstValue = parseInt(firstValue);
                        } else {
                            firstValue = ((totalLength - value) / totalLength) * (maxValue - minValue) + minValue;
                            firstValue = parseInt(firstValue);
                        }
                        if (ngModel) {
                            if ($scope.$root.$$phase) {
                                ngModel.$setViewValue(firstValue);
                            } else {
                                $scope.$apply(function () {
                                    ngModel.$setViewValue(firstValue);
                                });
                            }
                        }
                    } else {
                        if (orientation === "vertical") {
                            if (pos === 0) {
                                if (cutOff) {
                                    $scope.secondValue = ngModel.$viewValue;
                                    $scope.$apply();
                                } else {
                                    firstValue = ((totalLength - value) / totalLength) * (maxValue - minValue) + minValue;
                                    firstValue = parseInt(firstValue);
                                    $scope.secondValue = firstValue;
                                    $scope.$apply();
                                }
                            } else if (pos === 1) {
                                if (cutOff) {
                                    secondValue = $scope.secondValue;
                                } else {
                                    secondValue = ((value) / totalLength) * (maxValue - minValue) + minValue;
                                    secondValue = parseInt(secondValue);
                                }
                                if (ngModel) {
                                    if ($scope.$root.$$phase) {
                                        ngModel.$setViewValue(secondValue);
                                    } else {
                                        $scope.$apply(function () {
                                            ngModel.$setViewValue(secondValue);
                                        });
                                    }
                                }
                            }
                        } else {
                            if (pos === 0) {
                                if (cutOff) {
                                    firstValue = $scope.secondValue;
                                } else {
                                    firstValue = (value / totalLength) * (maxValue - minValue) + minValue;
                                    firstValue = parseInt(firstValue);
                                }
                                if (ngModel) {
                                    if ($scope.$root.$$phase) {
                                        ngModel.$setViewValue(firstValue);
                                    } else {
                                        $scope.$apply(function () {
                                            ngModel.$setViewValue(firstValue);
                                        });
                                    }
                                }
                            } else if (pos === 1) {
                                if (cutOff) {
                                    secondValue = ngModel.$viewValue;
                                } else {
                                    secondValue = ((totalLength - value) / totalLength) * (maxValue - minValue) + minValue;
                                    secondValue = parseInt(secondValue);
                                }
                                $scope.secondValue = secondValue;
                                $scope.$apply();
                            }
                        }
                    }
                }


                if ($scope.single) {
                    if (orientation === "vertical") {
                        firstSlider = new Slider(minValue, maxValue, 1, 1, totalLength, firstElement, callback);
                        if (angular.isUndefined($scope.disabled)) {
                            firstSlider.drag();
                        }
                    } else {
                        firstSlider = new Slider(minValue, maxValue, 0, 1, totalLength, firstElement, callback);
                        if (angular.isUndefined($scope.disabled)) {
                            firstSlider.drag();
                        }
                    }
                } else {
                    if (orientation === "vertical") {
                        firstSlider = new Slider(minValue, maxValue, 1, 0, totalLength, firstElement, callback, secondElement);
                        if (angular.isUndefined($scope.disabled)) {
                            firstSlider.drag();
                        }
                        secondSlider = new Slider(minValue, maxValue, 1, 1, totalLength, secondElement, callback, firstElement);
                        if (angular.isUndefined($scope.disabled)) {
                            secondSlider.drag();
                        }
                    } else {
                        firstSlider = new Slider(minValue, maxValue, 0, 0, totalLength, firstElement, callback, secondElement);
                        if (angular.isUndefined($scope.disabled)) {
                            firstSlider.drag();
                        }
                        secondSlider = new Slider(minValue, maxValue, 0, 1, totalLength, secondElement, callback, firstElement);
                        if (angular.isUndefined($scope.disabled)) {
                            secondSlider.drag();
                        }
                    }
                }

                //ng-model值 改变的时候
                if (ngModel) {
                    ngModel.$render = function () {
                        var modelValue;
                        modelValue = ngModel.$viewValue;
                        if ($scope.single) {
                            if (orientation === "vertical") {
                                modelValue = (totalLength / (maxValue - minValue)) * (modelValue - minValue);
                                firstSlider.setValue(modelValue);
                            } else {
                                modelValue = (totalLength / (maxValue - minValue)) * (modelValue - minValue);
                                firstSlider.setValue(totalLength - modelValue);
                            }
                        } else {
                            if (orientation === "vertical") {
                                modelValue = (totalLength / (maxValue - minValue)) * (modelValue - minValue);
                                secondSlider.setValue(modelValue);
                            } else {
                                modelValue = (totalLength / (maxValue - minValue)) * (modelValue - minValue);
                                firstSlider.setValue(modelValue);
                            }

                        }
                    }
                }
                $scope.$watch('secondValue', function () {
                    var elementval;
                    elementval = (totalLength / (maxValue - minValue)) * ($scope.secondValue - minValue);
                    if (single === 'false') {
                        if (orientation === "vertical") {
                            firstSlider.setValue(totalLength - elementval);
                        } else {
                            secondSlider.setValue(totalLength - elementval);
                        }
                    }
                });


            }
        }
    }
})
