define('framework/textsearch/GillionTextSearchDirectiveConstructor',['angular'], function (angular) {
    return function ($parse, $dataSourceManager,$timeout,$document,GillionMsg) {
            return {
            scope:{
                source: '=',
                searchEvent:'&',
                valueProp: '@',
                sourceName:'@',
                displayExpress: '@',
                iframeObjectName:'@',
                placeholder:'@',
                disabled:'@',
                searchUrl:'@',
                delayTime:'@',
                sourceKeywordName:'@',
                params:'='
            },
            replace:true,
            require:'^?ngModel',
            template:'<div class="form-position">'+
        '<input type="text" value="" class="form-text" ng-disabled="disabled" ondragstart="return false" />'+
        '<a type="button" class="btn dropdown-toggle">'+
        '<i ng-click="$searchEvent()"  class="fi fi-search"></i>'+
        '</a>'+
        '<ul class="dropdown-menu" ng-show="isShow" style="display:block">'+
        '<li ng-click="selectItem(element)" ng-repeat="element in source" value="{{valueGetter(element)}}"><a href="javascript:void(0);">{{displayGetter(element)}}</a></li>'+
        '</ul></div>',
            restrict: 'E',
            compile:function(tElement, tAttrs){

                return function (scope, element,attrs,ngModel) {
                    /*初始化参数*/
                    var keyIndex = -1,
                        timer,
                        param,
                        paramStr='',
                        iframe,
                        iframeWindow,
                        windowName,
                        newWindowName;
                    scope.isShow =false;
                    scope.displayName = '';
                    scope.delayTime = scope.delayTime || 400;
                    scope.iframeWidth = attrs.iframeWidth || 800;
                    scope.iframeHeight = attrs.iframeHeight || 600;
                    scope.sourceKeywordName = scope.sourceKeywordName || "keyword";


                    //宽度
                    if (angular.isDefined(attrs.width)) {
                        element.find("input").css("width", attrs.width);
                    }
                    if (angular.isDefined(attrs.cssClass)) {
                        element.addClass(attrs.cssClass);
                    }
                    scope.setModelValue = function(val){
                        if(ngModel) {
                            ngModel.$setViewValue(val);
                        }
                    };
                    scope.inputText = element.find("input");
                    if(ngModel){
                        ngModel.$formatters.push(function(value){
                            ngModel.$setViewValue(value);
                        });
                    }
                    var returnParamFn = function (arg) {
                        return arg;
                    };

                    scope.displayGetter = !!scope.displayExpress ? $parse(scope.displayExpress) : returnParamFn;
                    scope.valueGetter = !!scope.valueProp ? $parse(scope.valueProp) : scope.displayGetter;

                    scope.$searchEvent = attrs.searchEvent?function(){if(!scope.disabled) scope.searchEvent()}:
                        function(){
                            if(scope.disabled) return;
                            if(scope.params){
                                for(param in scope.params){
                                    if(typeof params[param]  === 'string'){
                                        paramStr +=  param+"="+params[param] + "&";
                                    }
                                }
                            }
                            if(scope.inputText.val()){
                                paramStr += scope.sourceKeywordName +"="+scope.inputText.val() + "&";
                            }
                            if(scope.searchUrl.indexOf('?')==-1){
                                paramStr = "?"+paramStr;
                            }else{
                                paramStr = "&"+paramStr;
                            }
                            //iframe = GillionMsg.showUrl('提示',scope.searchUrl+paramStr, scope.iframeWidth, scope.iframeHeight, false);
                            iframe = GillionMsg.showUrl({
                                onBeforeClose: function(){
                                    newWindowName = attrs.iframeObjectName?iframeWindow[attrs.iframeObjectName]: iframeWindow.name;
                                    if(!attrs.iframeObjectName && newWindowName){
                                        newWindowName = JSON.parse(newWindowName);
                                    }
                                    ngModel.$setViewValue(scope.displayGetter(newWindowName));
                                    if(!scope.$root.$$phase){
                                        scope.$apply();
                                    }

                                },
                                title: '提示',
                                url:scope.searchUrl+paramStr,
                                closable:true,
                                width:  scope.iframeWidth,
                                height:scope.iframeHeight,
                                modal: false
                            });
                            iframeWindow = iframe.getIframe()[0].contentWindow;

                        };

                    if(scope.placeholder){
                        scope.inputText.attr("placeholder",scope.placeholder);
                    }
                    //数据源请求
                    scope.$on(scope.sourceName,function(context,dataSource){
                        scope.source =  dataSource.records;
                        if(!scope.$root.$$phase){
                            scope.$apply();
                        }
                    });

                    //外部点击隐藏
                    $document.on('click', function (event) {
                        if(timer){
                            $timeout.cancel(timer);
                        }

                        if (element.parent().find(event.srcElement || event.target).length === 0) {
                            scope.isShow =false;
                            scope.$digest();
                        }
                    });
                    //失去焦点
                    scope.inputText.on('blur', function (event) {
                        timer = $timeout(function () {
                            scope.isShow =false;
                            scope.$digest();
                        }, 200);
                    });
                    //聚焦显示
                    scope.inputText.on('focus', function (event) {
                        scope.isShow = true;
                        scope.$digest();
                    });
                    //点击事件
                    scope.selectItem = function(item){
                        scope.inputText.val(scope.displayGetter(item));
                        ngModel.$setViewValue(scope.valueGetter(item));
                    };

                    //输入框键盘输入事件
                    scope.inputText.on("keyup", function (e) {
                        var currKey = e.keyCode || e.which || e.charCode,
                            params;
                        switch (currKey) {

                            //方向上键
                            case 38:

                                break;
                            //方向下键
                            case 40:

                                break;
                            //空格键
                            case 32:

                                break;
                            //回车键
                            case 13:
                                break;
                            default:
                                if (scope.reSearchTimer) {
                                    $timeout.cancel(scope.reSearchTimer);
                                    scope.reSearchTimer = undefined;
                                }
                                scope.reSearchTimer = $timeout(function () {
                                    params = angular.extend({}, $dataSourceManager.dataSources[scope.sourceName].params  || {});
                                    params[scope.sourceKeywordName] = scope.inputText.val();
                                    $dataSourceManager.dataSources[scope.sourceName].params=params;

                                }, scope.delayTime);
                                break;

                        }
                    });
                }
            }
        }
    }
});