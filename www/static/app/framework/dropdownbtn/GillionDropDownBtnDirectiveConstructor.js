define('framework/dropdownbtn/GillionDropDownBtnDirectiveConstructor',
['angular'], function (angular) {
    return function($timeout) {
        /**
         * 将文本中的数据转换为数字
         * @param text
         */
        function getNumFromStr(text){
            var lengthNumRegExp = /^[0-9]+/,
                matches,result;
            result =0;
            if(text){
                matches = lengthNumRegExp.exec(text);
                result = parseFloat(matches[0]);
            }
            return result;
        }

        return {
            restrict: 'E',
            replace:true,
            transclude:true,
            scope:{
                primaryClick:"&clickEvent",
                disabled:'@'
            },
            template:  '<div class="btn-group">'+
                        '     <button ng-if="isButton" ng-disabled="disabled" ng-click="callClick()" type="button" class="btn btn-default"><i class="fi"></i>{{display}}</button>'+
                        '     <button ng-if="isButton" ng-disabled="disabled" type="button" class="btn  dropdown-toggle" ng-click="expandItem()">'+
                        '           <i class="fi fi-caret"></i>'+
                        '     </button>'+
                        '     <a ng-if="!isButton" ng-disabled="disabled" ng-click="callClick()" type="button" class="btn btn-default" href="{{hrefProp}}"><i class="fi"></i> {{display}}</a>'+
                        '     <a ng-if="!isButton" ng-disabled="disabled" type="button" class="btn  dropdown-toggle" ng-click="expandItem()">'+
                        '           <i class="fi fi-caret"></i>'+
                        '     </a>'+
                        '     <ul class="dropdown-menu"  ng-reapt="item in itemList" ng-transclude>'+
                        '     </ul>'+
                        '</div>',

        controller:function($scope, $element, $attrs){
                $scope.itemList=[];
                this.addItem=function(item){
                    $scope.itemList.push(item);
                }
                this.hiddenItems = function(){
                    $scope.isShow = false;
                    if(!$scope.isShow){
                        $element.find("ul").css("display","none");
                    }else{
                        $element.find("ul").css("display","block");
                    }
                }

                this.getPrimaryClick = function(){
                    return $scope.primaryClick;
                }

                this.getDisplay = function(){
                    return $scope.display;
                }

                this.isExchangeButton = function(){
                    return  $scope.exchangeButton;
                }

                this.exchangeItem = function(minorClick,display){
                    $scope.primaryClick = minorClick;
                    $scope.display = display;
                }
            },
            link: function($scope,$element,$attrs){
                var className = $attrs.className,
                    width = $attrs.width,
                    isButton = $attrs.isButton || 'true',
                    buttonIcon = $attrs.buttonIcon,
                    dropdwoniocn;
                $scope.hrefProp = $attrs.hrefProp || 'javascript:;';
                $scope.display = $attrs.display;
                $scope.isShow = false;
                $scope.exchangeButton = $attrs.exchangeButton || 'false';

                $scope.isButton = isButton==='true';
                //执行点击事件
                $scope.callClick = function(){
                    var backValue;
                    if(angular.isDefined($attrs.clickEvent)){
                        if(angular.isFunction($scope.primaryClick)){
                            backValue = $scope.primaryClick();
                            if(backValue!==true){
                                $scope.hrefProp= 'javascript:;';
                            }
                        }
                    }
                }
                //设置宽度
                if(width){
                    width = parseInt(width);
                    $timeout(function(){
                        dropdwoniocn = $element.find(".dropdown-toggle").css("width");
                        dropdwoniocn = getNumFromStr(dropdwoniocn);
                        $element.find(".btn-default").css("width", width-dropdwoniocn);
                        $element.css("width",width);
                    });

                }
                //设置按钮图标
                if(angular.isDefined(buttonIcon) && buttonIcon){
                    $timeout(function() {
                        $element.find(".btn-default").children().addClass(buttonIcon);
                    });
                }
                //设置额外class属性
                if(className){
                    $element.addClass(className);
                }

                $element.unbind("click");
                if(angular.isDefined($scope.disabled)){
                    $scope.hrefProp = "javascript:;";
                    $scope.primaryClick=undefined;
                }
                //点击页面其他地方，隐藏下拉按钮
                angular.element(document).on('click', function (event) {
                    if ($element.parent().find(event.srcElement || event.target).length === 0) {
                        $scope.isShow = false;
                        if(!$scope.isShow){
                            $element.find("ul").css("display","none");
                        }else{
                            $element.find("ul").css("display","block");
                        }
                        $scope.$digest// $scope.$digest();
                        if ($scope.$$phase || $scope.$root.$$phase) {
                          $scope.$apply()// 脏检查
                        }
                    }
                });
                $scope.expandItem = function(){
                    if(!angular.isDefined($scope.disabled)){
                        $scope.isShow = !$scope.isShow;
                        if(!$scope.isShow){
                            $element.find("ul").css("display","none");
                        }else{
                            $element.find("ul").css("display","block");
                        }
                    }
                }
            }
        }
    }
});