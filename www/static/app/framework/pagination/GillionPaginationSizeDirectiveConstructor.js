define('framework/pagination/GillionPaginationSizeDirectiveConstructor',
    ['angular'], function (angular) {
        return function ($parse, $dataSourceManager, $timeout, $document, GillionLocationService) {

            var Pagination = function ($scope, $element, $attrs) {
                var me = this;
                me.scope = $scope;
                me.element = $element;
                me.attrs = $attrs;
            }

            Pagination.prototype.setPageSizeList = function (pageSizeList) {
                if (angular.isArray(pageSizeList)) {
                    this.scope.pageSizeList = pageSizeList;
                } else if (pageSizeList) {
                    this.scope.pageSizeList = pageSizeList.split(',');
                } else {
                    this.scope.pageSizeList = [5, 10, 20, 30, 50];
                }

            }

            Pagination.prototype.initDataSource = function () {
                var scope = this.scope;
                //$dataSourceManager.getDataSource(scope.sourceName).then(function(dataSource) {
                scope.$on(scope.sourceName, function (event, dataSource) {
                    scope.totalRecord = dataSource.totalRecord;
                    scope.pageSize = dataSource.pageSize;
                    scope.currentPage = dataSource.currentPage;

                    scope.dataSource = dataSource.records;
                    scope.totalPage = dataSource.totalPage;

                    scope.recordFrom = (dataSource.currentPage - 1) * dataSource.pageSize + 1;
                    if (dataSource.records) {
                        scope.recordTo = scope.recordFrom + dataSource.records.length - 1;
                        if (scope.recordFrom + dataSource.records.length - 1 > scope.totalRecord) {
                            scope.recordTo = scope.totalRecord;
                        }
                    } else {
                        scope.recordTo = scope.recordFrom;
                    }
                    if (!scope.$root.$$phase) {
                        scope.$digest();
                    }
                });

            }

            Pagination.prototype.refresh = function () {
                var params,
                    scope = this.scope;
                params = angular.extend({}, $dataSourceManager.dataSources[scope.sourceName].params || {});
                //$dataSourceManager.dataSources[scope.sourceName].params=params;
                $dataSourceManager.dataSources[scope.sourceName].doRequestData(null, params, function (_dataSource) {
                    //
                });
                //this.initDataSource();
            }

            Pagination.prototype.goPage = function (pageNum) {
                if (Number(pageNum)) {
                    var scope = this.scope;
                    $dataSourceManager.dataSources[scope.sourceName].currentPage = pageNum;
                    $dataSourceManager.dataSources[scope.sourceName].doRequestData();
                    //this.initDataSource();
                }
            }

            return {
                scope: {
                    sourceName: '@',
                    onBeforeChangePage:'&',
                    disabled:"="
                },
                replace: true,
                template: '<div class="pagesize pager-skin-tp">' +
                ($config.i18nInfo.beforePageSize ? '<span class="pager-desc"> ' + $config.i18nInfo.beforePageSize + ' </span>' : '') +
                '<div class="form-dorpdown">' +
                '<input type="text"  class="form-text" value="{{pageSize}}" readonly="readonly">' +
                '<a type="button" class="btn dropdown-toggle"><i class="fi fi-caret" ng-click="showPageSize()"></i></a>' +
                '</div>' +
                ($config.i18nInfo.afterPageSize ? '<span class="pager-desc"> ' + $config.i18nInfo.afterPageSize + ' </span>' : '') +
                '</div>',
                restrict: 'E',
                compile: function (tElement, tAttrs) {

                    return function (scope, element, attrs) {
                        /*初始化参数*/
                        var keyIndex = -1,
                            inputText = element.find("input"),
                            ulElement, timer, ulTmpl;
                        inputText.attr("id", "grid-pageSize-" + attrs.sourceName);
                        scope.isShow = false;
                        scope.pagination = new Pagination(scope, element, attrs);
                        ulTmpl = '';
                        ulTmpl += '<ul class="dropdown-menu form-dorpdown-menu"  ng-show="isShow" style="display:block">';
                        ulTmpl += '<li ng-repeat="ps in pageSizeList" ng-click="changePageSize(ps)"  class="fi"><a>{{ps}}</a></li>';
                        ulTmpl += '</ul>';
                        ulElement = GillionLocationService.createHtmltoTop(ulTmpl);
                        GillionLocationService.getTopCompile()(ulElement)(scope);
                        ulElement.css("top", 0);
                        ulElement.css("left", 0);
                        

                        scope.showPageSize = function () {
                            if(scope.disabled || $dataSourceManager.dataSources[scope.sourceName].records===undefined){
                                return;
                            }
                            scope.isShow = !scope.isShow;
                            if (scope.isShow) {
                                var location = GillionLocationService.calculateLocation(inputText);
                                ulElement.removeClass("ng-hide");
                                var ulWidth = ulElement[0].offsetWidth,
                                    ulHeight = ulElement[0].offsetHeight;
                                if (ulElement.css("display") === "none") {
                                    ulElement.css("display", "block");
                                    ulWidth = ulElement[0].offsetWidth;
                                    ulHeight = ulElement[0].offsetHeight;
                                    ulElement.css("display", "none");
                                }
                                ulElement.css("left", location.left);
                                if (location.bottom > ulHeight) {
                                    ulElement.css("top", location.top + inputText[0].offsetHeight);
                                } else {
                                    ulElement.css("top", location.top - ulHeight - 1);
                                }
                                ulElement.css("min-width", inputText.closest('div').width());
                                ulElement.css("display", "block");
                            }
                        }

                        scope.pagination.setPageSizeList(attrs.pageSizeList);
                        scope.pagination.initDataSource();
                        scope.changePageSize = function (pageSize) {
                            if (scope.onBeforeChangePage() !== false) {
                                $dataSourceManager.dataSources[scope.sourceName].pageSize = pageSize;
                                $dataSourceManager.dataSources[scope.sourceName].currentPage = 1;
                                //scope.pagination.initDataSource();
                                $dataSourceManager.dataSources[scope.sourceName].action="changePageSize"; 
                                $dataSourceManager.dataSources[scope.sourceName].doRequestData();
                                scope.pageSize = pageSize;
                                scope.isShow = false;
                            }
                        }

                        //点击隐藏
                        $document.on('click', function (event) {
                            if (element.find(event.srcElement || event.target).length === 0) {
                                if (scope.isShow) {
                                    scope.isShow = false;
                                    if (!scope.$root.$$phase) {
                                        scope.$digest();
                                    }
                                }
                            }
                        });

                        function getTopWindow(win) {
                            var href = win.location.href,
                                mainWin = win;
                            if (href.indexOf('__showUrl=true') > -1) {
                                mainWin = getTopWindow(mainWin.parent);
                            }
                            return mainWin;
                        }

                        var topWin = getTopWindow(window);
                        topWin.angular.element(topWin.document).on('click', function (event) {
                            if (element.find(event.srcElement || event.target).length === 0) {
                                if (scope.isShow) {
                                    scope.isShow = false;
                                    if (!scope.$root.$$phase) {
                                        scope.$digest();
                                    }
                                }
                            }
                        });
                    }
                }
            }
        }
    });
