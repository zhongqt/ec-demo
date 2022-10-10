define('framework/pagination/GillionPaginationPageDirectiveConstructor', ['angular'], function (angular) {
    return function ($parse, $dataSourceManager, $timeout, $document) {

        var Pagination = function ($scope, $element, $attrs) {
            var me = this;
            me.scope = $scope;
            me.element = $element;
            me.attrs = $attrs;
        };

        Pagination.prototype.initDataSource = function () {
            var me = this,
                scope = me.scope;
            scope.$on(scope.sourceName, function (context, dataSource) {
                scope.totalRecord = dataSource.totalRecord || 0;
                scope.pageSize = dataSource.pageSize || 0;
                scope.currentPage = dataSource.currentPage || 1;
                scope.jumpPageNum = scope.currentPage;

                scope.dataSource = dataSource.records;
                scope.totalPage = dataSource.totalPage || 0;

                me.pageStyle(scope.currentPage);
                me.pageListInit();
                if (!scope.$root.$$phase) {
                    scope.$digest();
                }
            });
        };

        Pagination.prototype.refresh = function () {
            var params,
                scope = this.scope;
            params = angular.extend({}, $dataSourceManager.dataSources[scope.sourceName].params || {});
            $dataSourceManager.dataSources[scope.sourceName].doRequestData(null, params, function (_dataSource) {
                //
            });
        };

        Pagination.prototype.pageStyle = function (pageNum) {
            if (pageNum == 1) {
                this.element.find(".pager-simple-btn-prev").attr("disabled", "disabled");
            }
            if (pageNum > 1) {
                this.element.find(".pager-simple-btn-prev").removeAttr("disabled");
            }
            if (pageNum == this.scope.totalPage) {
                this.element.find(".pager-simple-btn-next").attr("disabled", "disabled");
            }
            if (pageNum < this.scope.totalPage) {
                this.element.find(".pager-simple-btn-next").removeAttr("disabled");
            }
        };

        /**
         * 构造长度
         */
        Pagination.prototype.pageListInit = function () {
            var i = 0,
                count = 0,
                half, begin
            me = this,
                scope = me.scope;
            scope.pageList = [];

            half = Math.floor((scope.addLength + 3) / 2);
            i = scope.currentPage - half;
            if (i + 5 + scope.addLength > scope.totalPage) {
                i = scope.totalPage - scope.addLength - 4;
            }
            if (i < 1) {
                i = 1;
            }
            begin = i;
            while (i <= ( scope.totalPage - 2)
            && i <= scope.totalPage
            && count < (scope.addLength + 3)) {
                scope.pageList.push(i);
                i++;
                count++;
            }

            if (begin + count <= scope.totalPage) {
                if (scope.totalPage - (count + begin) > 1) {
                    scope.pageList.push('...');
                } else if (begin + count <= scope.totalPage - 1) {
                    scope.pageList.push(scope.totalPage - 1);
                }
                scope.pageList.push(scope.totalPage);
            }
        };

        Pagination.prototype.goPage = function (pageNum) {
            if (Number(pageNum)) {
                var scope = this.scope;
                //$dataSourceManager.dataSources[scope.sourceName].currentPage=pageNum;
                $dataSourceManager.dataSources[scope.sourceName].doRequestData(pageNum);
                //this.initDataSource();
                this.pageStyle(pageNum);
                this.pageListInit();
            }
        };

        Pagination.prototype.jumpPage = function () {
            var scope = this.scope,
                pageNum = scope.jumpPageNum;
            if (pageNum > scope.totalPage) pageNum = scope.totalPage;
            else if (pageNum < 1) pageNum = 1;
            $dataSourceManager.dataSources[scope.sourceName].doRequestData(pageNum);
            this.pageStyle(pageNum);
            this.pageListInit();
        };

        var template = '<div class="section_body"><ul class="control_List"><li>' +
            '<ul class="pager-simple"><li><button id="btn-page-prev-{{sourceName}}" type="button" ng-click="previousPage()" class="btn pager-simple-btn-prev">' +
            '<span class="caret caret-left"></span></button></li>' +
            '<li ng-repeat="p in pageList"><button id="btn-page-{{p}}-{{sourceName}}" type="button" ng-click="goPage(p)" class="btn" ng-class={\'current\':p==currentPage}>{{p}}</button></li>' +
            /*'<li><button class="btn current">{{currentPage}}</button></li>'+
            '<li><button class="btn">... </button></li>'+
            '<li><button class="btn">{{totalPage}}</button></li>'+*/
            '<li class="pager-simple-next"><button id="btn-page-next-{{sourceName}}" type="button" ng-click="nextPage()" class="btn pager-simple-btn-next">' +
            '<span class="caret caret-right"></span>' +
            '</button></li></ul>' +
            '</li>' +
            '<li id="li-totalpage-{{sourceName}}" ng-show="showInfo">共{{totalPage}}页 <span>到第 <input id="input-current-page-{{sourceName}}" type="number" value="{{currentPage}}" ng-model="jumpPageNum" class="form-text pager-index" style="float: none;" /> 页</span> <button id="btn-page-jump-{{sourceName}}" class="btn" ng-click="jumpPage()">确定</button></li>' +
            '</ul></div>';

        return {
            scope: {
                sourceName: '@'
            },
            replace: true,
            template: template,
            restrict: 'E',
            compile: function (tElement, tAttrs) {

                return function (scope, element, attrs) {
                    /*初始化参数*/
                    var keyIndex = -1,
                        timer;
                    scope.isShow = false;
                    scope.pagination = new Pagination(scope, element, attrs);
                    if (!attrs.addLength) {
                        scope.addLength = 0;
                    } else {
                        scope.addLength = parseInt(attrs.addLength);
                    }
                    if (attrs.disabled === "true") {
                        scope.disabled = true;
                    } else {
                        scope.disabled = false;
                    }
                    scope.showInfo = attrs.showInfo === "true";

                    scope.pagination.initDataSource();

                    scope.goPage = function (pageNum) {
                        scope.pagination.goPage(pageNum);
                    };

                    scope.nextPage = function () {
                        if (scope.currentPage + 1 <= scope.totalPage && !scope.disabled) {
                            scope.pagination.goPage(scope.currentPage + 1);
                        }
                    };

                    scope.jumpPage = function () {
                        scope.pagination.jumpPage();
                    };

                    scope.previousPage = function () {
                        if (scope.currentPage - 1 >= 1 && !scope.disabled) {
                            scope.pagination.goPage(scope.currentPage - 1);
                        }
                    }
                }
            }
        }
    }
});