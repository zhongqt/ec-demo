define('framework/grid/GillionPaginationDirectiveConstructor', ['angular'], function (angular) {
    return function ($http, $parse) {

        return {
            priority: 1,
            template: '<div ng-hide="uninitialized()"> <div class="dataTables_info"><span ng-if="totalCount > 0">展示 <span ng-bind="(page - 1) * pageSize + 1"></span> 到 <span ng-bind="page * pageSize>totalCount?totalCount:page*pageSize"></span> 条，</span> 总共 <span ng-bind="totalCount"></span> 条记录。</div> <div class="dataTables_paginate paging_simple_numbers"> <a class="paginate_button previous ng-class:{\'disabled\': page === 1};" ng-click="page === 1 || goPage(page -1)">上一页</a><span> <a class="paginate_button ng-class:{\'current\': page === 1};" ng-click="goPage(1)">1</a> <a class="paginate_button ng-class:{\'current\': page === 2};" ng-click="goPage(1)" ng-if="start === 3">2</a> <a class="paginate_button" ng-click="goPage(page - 5)" ng-if="start > 3">...</a> <a class="paginate_button ng-class:{\'current\': page === ele};" ng-repeat="ele in getPageRange()" ng-click="goPage(ele)">{{ele}}</a> <a class="paginate_button" ng-click="goPage(page + 5)" ng-if="end < (totalPage - 2)">...</a></span> <a class="paginate_button ng-class:{\'current\': page === totalPage - 1};" ng-click="goPage(totalPage - 1)" ng-if="end === (totalPage - 2)">{{totalPage - 1}}</a></span> <a class="paginate_button ng-class:{\'current\': page === totalPage};" ng-click="goPage(totalPage)" ng-if="totalPage > 1" ng-bind="totalPage"></a></span> <a class="paginate_button next ng-class:{\'disabled\': page === totalPage || totalPage < 1};" ng-click="(page === totalPage || totalPage < 1) || goPage(page +1)">下一页</a> </div> </div>',
            restrict: 'EA',
            replace: true,
            require: '?^gGrid',
            scope: {
                source: "=",
                params: "=",
                url: "@",
                pageField: "@",
                pageSizeField: "@",
                totalCountField: "@",
                rootField: "@",
                columnField: "@",
                autoLoad: "@",
                api: "=",
                currentPage: "="
            },
            link: function (scope, element, attrs, gGrid) {
                var pageField = scope.pageField || 'pageNum',
                    pageSetter = $parse(pageField).assign,
                    pageSizeField = scope.pageSizeField || 'pageSize',
                    pageSizeSetter = $parse(pageSizeField).assign,
                    totalCountField = scope.totalCountField || 'data.totalRecord',
                    totalCountGetter = $parse(totalCountField),
                    rootField = scope.rootField || 'data.source',
                    rootGetter = $parse(rootField),
                    columnField = scope.columnField || 'data.columns',
                    columnGetter = $parse(columnField),
                    grid;

                // set grid and url
                if (gGrid) {
                    grid = gGrid.grid;
                    grid.url = scope.url;
                    grid.sourceFieldSetter(rootField);
                    grid.columnSetter(columnField);
                }
                scope.page = scope.page || 1;
                scope.pageSize = Number(attrs.pageSize) || 10;
                function getPageParams(page, pageSize) {
                    var pageParams = {};
                    pageSetter(pageParams, page);
                    pageSizeSetter(pageParams, pageSize);
                    return pageParams;
                }

                function setSource(source) {
                    if (grid) {
                        grid.setRawSource(source);
                    } else {
                        scope.source = source;
                    }
                }

                function setColumn(columns) {
                    if (grid && angular.isArray(columns))
                        grid.setColumn(columns);
                }

                scope.uninitialized = function () {
                    if (grid) {
                        return grid.rawSource.length === 0;
                    }
                    return scope.source === undefined;
                };

                scope.goPage = function (page, params, callback) {
                    if (!!params) scope.params = params;
                    var page = (!angular.isNumber(page) || page < 1) ? 1 : page,
                        pageSize = scope.pageSize,
                        pageParams = getPageParams(page, pageSize),
                        params = scope.params || {},
                        params = angular.extend({}, params, pageParams);
                    if (grid)
                        grid.genRequestParam(params);
                    $http.get(scope.url, {params: params})
                        .success(function (result) {
                            scope.page = page;
                            if (attrs.hasOwnProperty("currentPage"))
                                scope.currentPage = scope.page;
                            scope.totalCount = totalCountGetter(result) || 0;
                            setSource(rootGetter(result));
                            setColumn(columnGetter(result));
                            scope.totalPage = Math.ceil(scope.totalCount / pageSize);
                            if (angular.isFunction(callback)) {
                                callback();
                            }
                        });
                };

                scope.getPageRange = function () {
                    var page = scope.page,
                        totalPage = scope.totalPage,
                        pageRange = [],
                        start = page - 2 < 2 ? 2 : (page - 2),
                        end = page + 2 > (totalPage - 1) ? (totalPage - 1) : (page + 2),
                        i;
                    for (i = end; i < totalPage; i++) {
                        if (i - start < 5) {
                            end = i;
                        }
                    }
                    for (i = start; i > 1; i--) {
                        if (end - i < 5) {
                            start = i;
                        }
                    }
                    for (i = start; i <= end; i++) {
                        pageRange.push(i);
                    }
                    scope.start = start;
                    scope.end = end;
                    return pageRange;
                };

                if (grid) {
                    grid.goPage = scope.goPage;
                } else if (attrs.hasOwnProperty('api')) {
                    scope.api = angular.extend({}, grid, {
                        goPage: scope.goPage
                    });
                }

                if (scope.autoLoad !== 'false') {
                    scope.goPage(1);
                }
            }
        }
    }
})