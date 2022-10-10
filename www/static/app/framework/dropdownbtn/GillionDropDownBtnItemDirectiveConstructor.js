define('framework/dropdownbtn/GillionDropDownBtnItemDirectiveConstructor',
    ['angular'], function (angular) {
        return function() {
            return {
                restrict: 'E',
                replace:true,
                transclude:true,
                scope:{
                    minorClick:"&clickEvent",
                    disabled:'@'
                },
                require:'^?gDropdownBtn',
                template:'<li><a ng-disabled="disabled" ng-click="callClick()" href="{{hrefProp}}">{{display}}</a></li>',
            link:function($scope,$element,$attrs,parentCtrl){
                    var ngClick = $attrs.ngClick,
                        role=$attrs.role;
                    $scope.role = role==='separator';
                    if($scope.role){
                        $element.attr("role","separator");
                        $element.addClass("divider");
                        $scope.disabled="disabled";
                        $element.empty();
                    }

                    $scope.display = $attrs.display;
                    $scope.hrefProp = $attrs.hrefProp || 'javascript:;';

                    $scope.callClick = function(){
                        var backValue,display,primaryClick,exchangeButton;
                        if(angular.isDefined($attrs.clickEvent)){
                            if(angular.isFunction($scope.minorClick)){
                                backValue = $scope.minorClick();
                                if(backValue!==true){
                                    $scope.hrefProp = "javascript:;";
                                }
                            }
                        }
                        exchangeButton = parentCtrl.isExchangeButton();
                        if(exchangeButton==="true"){
                            //与主按钮交换
                            display = parentCtrl.getDisplay();
                            primaryClick = parentCtrl.getPrimaryClick();
                            parentCtrl.exchangeItem($scope.minorClick,$scope.display);
                            $scope.minorClick = primaryClick;
                            $scope.display = display;
                        }
                        //隐藏下拉框
                        parentCtrl.hiddenItems();
                    }
                    if(angular.isDefined($scope.disabled)){
                        $element.unbind("click");
                        $scope.hrefProp = "javascript:;";
                    }
                    parentCtrl.addItem($scope);
                }
            }
        }
    });