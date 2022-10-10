define('framework/control/GillionDropDownDirectiveConstructor',['angular'], function (angular) {
    return function ($parse) {
        return {
            scope:{
                source: '=',
                valueProp: '@',
                displayProp: '@',
                valueSeparator:'@',
                submitName:'@',
                submitModel:'@',
                ifAdd:'@',
                multi:'@',
                addElement:'&',
                ngDisabled: '=',
                disabled: '=',
                ngReadonly: '=',
                readonly: '='
            },
            replace:true,
            transclude: true,
            template:'<div class="select-box select-mid"><input type="text" ng-readonly="ngReadonly || readonly" ng-disabled="ngDisabled || disabled" class="inp-text inp-auto" value="请选择"><input ng-model="displayName" disabled />' +
                      '<button ng-click="showDropDown()">show</button>' +
                      '<span ng-show="isShow"  ng-click="chooseValue(element)" ng-repeat="element in source">' +
                      '<input ng-show="multi" type="checkbox" value="{{$index}}" /><label>{{displayGetter(element)}}</label></span>' +
                      '<span ng-transclude></span>'+
                      '<span ng-show="ifAdd && isShow" ng-click="addElement()"><label>╋添加</label></span>' +
                      '<input type="hidden" name="{{submitName}}"  /></div>',
            restrict: 'E',
            compile:function(tElement, tAttrs){

                var $hidden = tElement.children(':hidden'),
                    submitModelExpress = '$parent.' + tAttrs.submitModel;
                if (tAttrs.hasOwnProperty('submitModel')) {
                    $hidden.attr('ng-model', submitModelExpress);
                }else{
                    submitModelExpress = 'submitModel';
                    $hidden.attr('ng-model','submitModel');
                }

                return function (scope, element,attrs) {
                    scope.isShow =false;
                    scope.displayName = '';
                    scope.submitName = '';
                    scope.showDropDown = function(){
                        scope.isShow = !scope.isShow;
                    };
                    var returnParamFn = function (arg) {
                        return arg;
                    };
                    var valueGetter = !!scope.valueProp ? $parse(scope.valueProp) : returnParamFn,
                        valueSeparator = scope.valueSeparator || ',',
                        submitValueSetter = $parse(submitModelExpress).assign;
                    scope.displayGetter = !!scope.displayProp ? $parse(scope.displayProp) : returnParamFn;

                    scope.chooseValue = function(ele){
                        var submitValue = '';
                        if(scope.multi){
                            scope.checkedValues = [];
                            var checkboxs = element.find("input[type='checkbox']");

                            scope.displayName='';
                            for(var i=0;i<checkboxs.length;i++){
                                var cb =checkboxs[i];
                                if(cb.checked){
                                    var role = scope.source[i];
                                    scope.displayName += (scope.displayName?valueSeparator:'')+scope.displayGetter(role);
                                    submitValue += (submitValue?valueSeparator:'')+valueGetter(role);
                                }
                            }
                        }else{
                            scope.displayName = scope.displayGetter(ele);
                            submitValue = valueGetter(ele);
                        }
                        submitValueSetter(scope,submitValue);
                    };
                }
            }
        }
    }
});