define('framework/databind/GillionDataBindDirectiveConstructor', ['angular'], function (angular) {

    return function ($compile, $parse, $timeout, $filter) {
        return {
            restrict: 'A',
            scope: {
                gDataBind: '=',
                ngModelInit:'=ngModel',
                valueProp:'@'

            },
            require: '^?ngModel',
            compile:function (tElement, tAttrs) {
                return function (scope, element, attrs, ngModel) {
                    scope.ngModelGetter = $parse(attrs.ngModel);
                    scope.valuePropGetter = $parse(scope.valueProp);
                    scope.gDataBindGetter = $parse(attrs.gDataBind);
                    scope.valuePropSetter = scope.valuePropGetter.assign;
                    scope.valueSeparator = attrs.valueSeparator || ',';//分隔符
                    scope.cascade = attrs.cascade != "false" ;//是否级联 默认true
                    scope.multi = attrs.multi == "true" ;//是否多选 默认false
                    scope.emptyClear =  attrs.emptyClear != "false"  ;//空值是否清除 默认true
                    scope.gridEdit = false;
                    var valueText = '',
                        submitValue;

                    // if(!window.associateSelectedRow) window.associateSelectedRow = {};
                    // if(!scope.gDataBind){
                    //     scope.gDataBind = window.associateSelectedRow[attrs.gDataBind];
                    // }
                    // if(!scope.gDataBind && scope.$parent.$editingScope){
                    //     if(scope.$parent.$editingScope[attrs.gDataBind] == undefined)
                    //         scope.gDataBind = scope.$parent.$editingScope[attrs.gDataBind] = {};
                    //     else scope.gDataBind = scope.$parent.$editingScope[attrs.gDataBind];
                    // }
                    scope.$on("gridEdit"+attrs.gDataBind, function() {
                        var parentNgModelValue = scope.ngModelGetter(scope.$parent);
                        var parentSelectedRow = scope.gDataBindGetter(scope.$parent);
                        if(parentSelectedRow){
                            if(!scope.multi){
                                if (angular.isUndefined(scope.valuePropGetter(parentSelectedRow))) {
                                    scope.valuePropSetter(parentSelectedRow,parentNgModelValue);
                                }
                            }else{
                                var ngModelArr = (parentNgModelValue || '').split(scope.valueSeparator);
                                for(var i=0;i<ngModelArr.length;i++){
                                    if(!parentSelectedRow[i]){
                                        parentSelectedRow[i] ={};
                                    }else{
                                        scope.valuePropSetter(parentSelectedRow[i],ngModelArr[i]);
                                    }
                                }
                            }
                        }
                        scope.gridEdit = false;
                    });
                    scope.$on("gridEdit", function(e, data) {
                        if (scope._isInGrid === void 0) {
                            var gridElement = element.closest('div.grid');
                            if (gridElement.length) {
                                scope._isInGrid = true;
                                scope._outerGrid = gridElement;
                            } else {
                                scope._isInGrid = false;
                            }
                        }
                        if (data.element.is(scope._outerGrid)) {
                            scope.gridEdit = true;
                        }
                    });
                    if(scope.multi){
                        //有初始值
                        var init =true;
                        scope.$watchCollection("gDataBind",function(){
                            if(scope.gDataBind){

                                //判断是否已经构造好对象（初始化时 需要构造对象）
                                angular.forEach(scope.gDataBind,function(item){
                                    if(item[scope.valueProp]!=undefined){
                                        init = false;
                                    }
                                });
                                if(init && scope.ngModelInit && scope.arrayNotEmpty(scope.gDataBind)){
                                    var ngModelArr = scope.ngModelInit.split(scope.valueSeparator);
                                    for(var i=0;i<ngModelArr.length;i++){
                                        if(!scope.gDataBind[i]){
                                            scope.gDataBind[i] ={};
                                        }
                                        scope.valuePropSetter(scope.gDataBind[i],ngModelArr[i]);
                                    }
                                    init = false;
                                }else{
                                    submitValue = [];
                                    angular.forEach(scope.gDataBind,function(item){
                                        submitValue.push(scope.valuePropGetter(item));
                                    });
                                    ngModel.$setViewValue(submitValue.join(scope.valueSeparator));
                                    ngModel.$render();
                                }
                            }

                        });
                    }else{
                        var init = true;//第一次初始化要赋值
                        scope.$watch("gDataBind",function(){
                            if(scope.valuePropGetter(scope.gDataBind) != undefined){
                                if (ngModel.$modelValue && ngModel.$modelValue.length != undefined && ngModel.$modelValue.length > 0) return;
                                ngModel.$setViewValue(scope.valuePropGetter(scope.gDataBind));
                                ngModel.$render();
                                if(scope.ngModelInit || scope.ngModelInit === 0){
                                    init = false;
                                }
                            }else{
                                if(scope.gDataBind && init && (scope.ngModelInit || scope.ngModelInit === 0)){
                                    scope.valuePropSetter(scope.gDataBind , scope.ngModelInit);
                                    init = false;
                                }else if(scope.gDataBind || (!init && !scope.gridEdit) || !(scope.ngModelInit || scope.ngModelInit === 0)){
                                    //排除刚进来的时候 gDataBind没值  ngModelInit有值的时候变为空
                                    ngModel.$setViewValue('');
                                    ngModel.$render();
                                }
                            }
                        });

                        if(ngModel){
                            ngModel.$formatters.push(function(value){

                                if(scope.gDataBind && init && (scope.ngModelInit || scope.ngModelInit === 0)){
                                    scope.valuePropSetter(scope.gDataBind , scope.ngModelInit);
                                    init = false;
                                }

                                if(!value && value !== 0 && scope.gDataBind){
                                    scope.valuePropSetter(scope.gDataBind,value);
                                }
                                return value;
                            });
                        }
                    }

                    scope.dupRemoval= function(rowDatas){
                        var result = [], hash = {},value;
                        for (var i = 0, elem; (elem = rowDatas[i]) != null; i++) {
                            value = scope.valuePropGetter(elem);
                            if (!hash[value]) {
                                result.push(elem);
                                hash[value] = true;
                            }
                        }
                        return result;
                    };

                    scope.arrayNotEmpty = function(array){
                        return (!array || array.length >0);
                    };

                    if(scope.cascade){
                        element.on('keyup', function (event) {
                            var e = e || event,
                                currKey = e.keyCode || e.which || e.charCode,
                                inputVal,keywordArr = [],selectedRow=[];

                            switch (currKey) {
                                //删除时触发
                                case 8:
                                    inputVal = element.val();
                                    if(inputVal){
                                        if(angular.isArray(scope.gDataBind)){
                                            keywordArr = inputVal.split(scope.valueSeparator);
                                            angular.forEach(keywordArr,function(each){
                                                angular.forEach(scope.gDataBind,function(item){
                                                    if(scope.valuePropGetter(item)==each){
                                                        selectedRow.push(item);
                                                    }
                                                });
                                            });
                                            angular.forEach(keywordArr,function(each){
                                                angular.forEach(scope.gDataBind,function(item){
                                                    if(scope.valuePropGetter(item)==each){
                                                        selectedRow.push(item);
                                                    }
                                                });
                                            });
                                            selectedRow = scope.dupRemoval(selectedRow);
                                            scope.gDataBind = selectedRow;
                                        }else{
                                            if(scope.valuePropGetter(scope.gDataBind)!=inputVal){
                                                scope.gDataBind = undefined;
                                            }
                                        }
                                    }else{
                                        if(angular.isArray(scope.gDataBind)){
                                            scope.gDataBind = [];
                                        }else{
                                            scope.gDataBind = undefined;
                                        }
                                    }
                                    if(!scope.$root.$$phase){
                                        scope.$apply();
                                    }
                                    break;
                                default :
                                    break;
                            }
                        });
                    }
                };
            }
        };
    };
});
