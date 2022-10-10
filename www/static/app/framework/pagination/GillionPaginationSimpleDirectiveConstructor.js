define('framework/pagination/GillionPaginationSimpleDirectiveConstructor', ['angular'], function (angular) {
    return function ($parse, $dataSourceManager, $timeout, $document, $http, GillionLocationService) {

        var Pagination = function ($scope, $element, $attrs) {
            var me = this;
            me.scope = $scope;
            me.element = $element;
            me.attrs = $attrs;
        }

        Pagination.prototype.setPageSizeList = function (pageSizeList) {
            if (angular.isArray(pageSizeList)) {
                this.scope.pageSizeList = pageSizeList;
            } else if (angular.isString(pageSizeList)) {
                this.scope.pageSizeList = pageSizeList.split(',');
            } else {
                this.scope.pageSizeList = [5, 10, 20, 30, 50];
            }
        }

        Pagination.prototype.initDataSource = function () {
            var me = this,
                scope = me.scope;
            scope.$on(scope.sourceName, function (context, dataSource) {
                scope.totalRecord = dataSource.totalRecord || 0;
                scope.pageSize = dataSource.pageSize || 0;
                scope.currentPage = dataSource.currentPage || 1;

                scope.dataSource = dataSource.records;
                scope.totalPage = dataSource.totalPage || 0;
                scope.hasNextPage = dataSource.hasNextPage || false;

                scope.recordFrom = (dataSource.currentPage - 1) * dataSource.pageSize + 1;
                if (dataSource.records) {
                    scope.recordTo = scope.recordFrom + dataSource.records.length - 1;
                    if (scope.recordFrom + dataSource.records.length - 1 > scope.totalRecord) {
                        scope.recordTo = scope.totalRecord;
                    }
                    if (scope.recordFrom > scope.recordTo) {
                        scope.recordFrom = scope.recordTo;
                    }
                } else {
                    scope.recordFrom = 0;
                    scope.recordTo = scope.recordFrom;
                }
                me.pageStyle(scope.currentPage);
                scope.hideInfo();
                if (!scope.$root.$$phase) {
                    scope.$digest();
                }
            });
        }

        Pagination.prototype.pageStyle = function (pageNum) {
            if (pageNum == 1) {
                this.element.find(".pager-btn-prev").attr("disabled", "disabled");
            } else if (pageNum > 1) {
                this.element.find(".pager-btn-prev").removeAttr("disabled");
            }
            if (this.scope.hasNextPage) {
                this.element.find(".pager-btn-next").removeAttr("disabled");
            } else {
                this.element.find(".pager-btn-next").attr("disabled", "disabled");
            }
        }

        Pagination.prototype.goPage = function (pageNum) {
            if (Number(pageNum)) {
                var scope = this.scope;
                $dataSourceManager.dataSources[scope.sourceName].doRequestData(pageNum);
                this.pageStyle(pageNum);
            }
        }

        return {
            scope: {
                sourceName: '@',
                infoUrl: '@'
            },
            replace: true,
            template:
            '<div class="pagesize pager-skin-tp">' +
            '<button type="button" class="btn pager-btn-prev fl" ng-click="previousPage()"><i class="fi fi-prev"></i></button>' +
            '<button type="button" class="btn pager-btn-next fl" ng-click="nextPage()"><i class="fi fi-next"></i></button>' +
            '<div class="form-dorpdown">' +
            '<input type="text" class="form-text page-size" value="{{pageSize}}" readonly="readonly">' +
            '<a type="button" class="btn dropdown-toggle"><i class="fi fi-caret" ng-click="showPageSize()"></i></a>' +
            '</div>' +
            // '<button type="button" class="btn fl" ng-click="showInfo()"><i class="fi fi-camera"></i></button>' +
            '<span class="pager-desc">共<a href="javascript:void(0);" class="pager-btn-info" ng-click="showInfo()" style="font-size: 10px; text-decoration: underline;">点我</a><span class="pager-txt-info"></span>条</span>' +
            '</div>',
            restrict: 'E',
            compile: function (tElement, tAttrs) {

                return function (scope, element, attrs) {
                    /*初始化参数*/
                    var pageSizeInputText = element.find("input.page-size"),
                        infoText = element.find(".pager-txt-info"),
                        infoBtn = element.find(".pager-btn-info"),
                        ulElement, ulTmpl;

                    scope.disabled = attrs.disabled == "true";
                    scope.isShow = false;
                    scope.pagination = new Pagination(scope, element, attrs);
                    ulTmpl = '';
                    ulTmpl += '<ul class="dropdown-menu form-dorpdown-menu"  ng-show="isShow" style="display:block">';
                    ulTmpl += '<li ng-repeat="ps in pageSizeList" ng-click="changePageSize(ps)"  class="fi"><a>{{ps}}</a></li>';
                    ulTmpl += '</ul>';
                    ulElement = GillionLocationService.createHtmltoTop(ulTmpl);
                    GillionLocationService.getTopCompile()(ulElement)(scope);

                    scope.pagination.setPageSizeList(attrs.pageSizeList);
                    scope.pagination.initDataSource();
                    scope.pageSize = scope.pageSizeList[0];
                    scope.showPageSize = function () {
                        scope.isShow = !scope.isShow;
                        if (scope.isShow) {
                            var location = GillionLocationService.calculateLocation(pageSizeInputText);
                            ulElement.removeClass("ng-hide");
                            var ulWidth = ulElement[0].offsetWidth,
                                ulHeight = ulElement[0].offsetHeight;
                            if (ulElement.css("display") == "none") {
                                ulElement.css("display", "block");
                                ulWidth = ulElement[0].offsetWidth;
                                ulHeight = ulElement[0].offsetHeight;
                                ulElement.css("display", "none");
                            }
                            ulElement.css("left", location.left);
                            if (location.bottom > ulHeight) {
                                ulElement.css("top", location.top + pageSizeInputText[0].offsetHeight);
                            } else {
                                ulElement.css("top", location.top - ulHeight - 1);
                            }
                            ulElement.css("display", "block");
                            ulElement.css("min-width", pageSizeInputText.closest('div').width());
                        }
                    }

                    scope.changePageSize = function (pageSize) {
                        $dataSourceManager.dataSources[scope.sourceName].pageSize = pageSize;
                        $dataSourceManager.dataSources[scope.sourceName].currentPage = 1;
                        $dataSourceManager.dataSources[scope.sourceName].doRequestData();
                        scope.pageSize = pageSize;
                        scope.isShow = false;
                    }

                    scope.nextPage = function () {
                        if (scope.hasNextPage && !scope.disabled) {
                            scope.pagination.goPage(scope.currentPage + 1);
                        }
                    }

                    scope.previousPage = function () {
                        if (scope.currentPage - 1 >= 1 && !scope.disabled) {
                            scope.pagination.goPage(scope.currentPage - 1);
                        }
                    }

                    scope.hideInfo = function () {
                        infoText.html("");
                        infoText.hide();
                        infoBtn.show();
                    }

                    scope.showInfo = function () {
                        var params = {};
                        if (angular.isFunction($dataSourceManager.dataSources[scope.sourceName].params)) {
                            params = $dataSourceManager.dataSources[scope.sourceName].params();
                        } else {
                            params = angular.extend({}, $dataSourceManager.dataSources[scope.sourceName].params || {});
                        }
                        $http({
                            method: "GET",
                            url: scope.infoUrl,
                            data: params
                        }).then(function (result) {
                            if (angular.isString(result)) result = JSON.parse(result);
                            if(result && result.data){
                                infoText.html(result.data.totalRecord);
                                infoText.show();
                                infoBtn.hide();
                            }
                        });
                    }
                }
            }
        }
    }
});
