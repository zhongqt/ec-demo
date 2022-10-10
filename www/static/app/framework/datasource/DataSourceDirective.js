// Generated by CoffeeScript 1.9.3

define(["angular", "underscore", "jquery", "config.properties"], function (angular, _, $, config) {

    /*生成请求参数 */
    var DataSource, PageDataSource, combinationPageParams, combinationParams, doRequestNotPageData, doRequestPageData,
        generatorParams, initEnv;
    generatorParams = function () {
        var me = this,
            params = this.params,
            requestParams = {};

        /*设置分页以及排序参数 */
        if (me instanceof PageDataSource) {
            this.$scope.pageSizeSetter(requestParams, this.pageSize);
            this.$scope.currentPageSetter(requestParams, this.currentPage);
            this.$scope.sortNameSetter(requestParams, this.sortName);
            this.$scope.sortDirectionSetter(requestParams, this.sortDirection);
        }

        /*加入请求参数 */
        if (angular.isFunction(this.params)) {
            angular.extend(requestParams, this.params.call());
        } else {
            angular.extend(requestParams, this.params);
        }

        //加入额外参数
        if (angular.isFunction(this.extraParams)) {
            angular.extend(requestParams, this.extraParams.call());
        } else {
            angular.extend(requestParams, this.extraParams);
        }
        me.requestParams = requestParams;
        return requestParams;
    };

    /*组合分页参数 */
    combinationPageParams = function (page, params) {
        var me, requestParams;
        me = this;
        if (!!params) {
            me.params = params;
        }
        if (angular.isDefined(page)) {
            me.currentPage = !angular.isNumber(page || page < 1) ? 1 : page;
        }

        /*2.组合分页参数 */
        requestParams = generatorParams.call(me);
        return requestParams;
    };

    /*组合参数 */
    combinationParams = function (params) {
        var me, requestParams;
        me = this;
        if (!!params) {
            this.params = params;
        }

        /*2.组合参数 */
        requestParams = generatorParams.call(me);
        return requestParams;
    };

    var transformRequest = function (params) {
        var str = [];
        for (var p in params) {
            if (params[p] === undefined) continue;
            if (_.isArray(params[p])) {
                _.each(params[p], function (item) {
                    var v = (_.isArray(item) || _.isObject(item) ? JSON.stringify(item) : item);
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(v));
                })
            } else {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
            }
        }
        return str.join("&");
    };
    /*请求分页数据 */
    doRequestPageData = function (requestParams, callback, method, paramParser) {
        var caculateTotalPage, handleResult, me, requestArg, url,handleRequest;
        me = this;
        requestArg = [me.url];
        url = me.url;
        var currentVersion = me.requestVersion = me.requestVersion + 1;

        if (method == "post" && paramParser == "form") {
            requestArg.push(transformRequest(requestParams));
            requestArg.push({
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        } else {
            requestArg.push({
                "params": requestParams,
                "failHandler": me.$scope.failHandler
            });
        }
        caculateTotalPage = function () {
            if (me.totalRecord % me.pageSize > 0) {
                me.totalPage = parseInt(me.totalRecord / me.pageSize, 10) + 1;
            } else {
                if(me.totalRecord == -1){
                    me.totalPage = -1;
                }else{
                    me.totalPage = parseInt(me.totalRecord / me.pageSize, 10);
                }
            }
        };
        handleResult = function (result) {
            me.totalRecord = me.$scope.totalRecordGetter(result);

            /*计算总页数 */
            caculateTotalPage();
            me.records = me.$scope.recordsGetter(result);
            me.moreAttrs = me.$scope.moreAttrsGetter(result);
            me.hasNextPage = !!result.hasNextPage;
            if (angular.isFunction(callback)) {
                callback.call(me, me);
            }
            //临时处理,数据加载完成去除loading图片
            if ($(".layui-layer-loading").length > 0) {
                $(".layui-layer-loading").empty();
            }

            /*触发sourceManager的promise */
            if (angular.isUndefined(me.$dataSourceManager.defereds[me.sourceName])) {
                me.$dataSourceManager.getDataSource(me.sourceName);
            }
            me.$dataSourceManager.defereds[me.sourceName].resolve();
            return me.$dataSourceManager.defereds[me.sourceName] = me.$q.defer();
        };
        if (angular.isDefined(this.$scope.beforeLoad)) {
            this.$scope.beforeLoad.call(this, this);
        }
        if (angular.isDefined(this.$scope.daoService)) {
            me.$q.when(this.$scope.daoService.call(this, requestArg))
                .then(function (result) {
                    handleRequest(result);
                })
                .catch(function (e) {
                    console.log(e);
                });
        } else {
            var requestFunc = method == "post" ? me.$http.post : me.$http.get;
            requestFunc.apply(null, requestArg).success(function (result) {
                handleRequest(result);
            });
        }
        handleRequest = function (result) {
            if (currentVersion < me.requestVersion) {
                return;
            }
            if (me.$scope.$root.$$phase) {
                handleResult(result);
            } else {
                me.$scope.$apply(function () {
                    return handleResult(result);
                });
            }
            me.$dataSourceManager.$rootScope.$broadcast(me.sourceName, me);
            if (angular.isDefined(me.$scope.afterLoad)) {
                me.$scope.afterLoad.call(me, me);
            }
        }
    };
    doRequestNotPageData = function (requestParams, callback, method, paramParser) {
        var me, requestArg, url,handleRequest;
        me = this;
        requestArg = [me.url];
        url = me.url;

        var params = angular.extend(requestParams, {});
        this.$scope.sortNameSetter(params, this.sortName);
        this.$scope.sortDirectionSetter(params, this.sortDirection);
        if (method == "post" && paramParser == "form") {
            requestArg.push(transformRequest(requestParams));
            requestArg.push({
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        } else {
            requestArg.push({
                "params": requestParams,
                "failHandler": me.$scope.failHandler
            });
        }
        if (angular.isDefined(this.$scope.beforeLoad)) {
            this.$scope.beforeLoad.call(this, this);
        }
        if (angular.isDefined(this.$scope.daoService)) {
            me.$q.when(this.$scope.daoService.call(this, requestArg))
                .then(function (result) {
                    handleRequest(result);
                })
                .catch(function (e) {
                    console.log(e);
                });
        } else {
            var requestFunc = method == "post" ? me.$http.post : me.$http.get;
            requestFunc.apply(null, requestArg).success(function (result) {
                handleRequest(result)
            });
        }
        handleRequest = function (result) {
            if (angular.isDefined(me.$scope.recordsProp)) {
                me.records = me.$scope.recordsGetter(result);
            } else {
                me.records = result;
            }
            if (angular.isFunction(callback)) {
                callback.call(me, me);
            }

            /*触发sourceManager的promise */
            if (angular.isUndefined(me.$dataSourceManager.defereds[me.sourceName])) {
                me.$dataSourceManager.getDataSource(me.sourceName);
            }
            me.$dataSourceManager.defereds[me.sourceName].resolve();
            me.$dataSourceManager.defereds[me.sourceName] = me.$q.defer();
            me.$dataSourceManager.$rootScope.$broadcast(me.sourceName, me);
            if (angular.isDefined(me.$scope.afterLoad)) {
                me.$scope.afterLoad.call(me, me);
            }
        }
    };

    /*简单后台数据源 */
    DataSource = (function () {
        function DataSource($scope1, $http1, $timeout1, $q1, $dataSourceManager1) {
            this.$scope = $scope1;
            this.$http = $http1;
            this.$timeout = $timeout1;
            this.$q = $q1;
            this.$dataSourceManager = $dataSourceManager1;
            this.sourceName = this.$scope.sourceName;
            this.url = this.$scope.url;
            this.records = void 0;
            this.params = this.$scope.params;
            this.extraParams = this.$scope.extraParams || {};
            this.reqTimer = void 0;
            this.requestVersion = 0;
            this.sortName = this.$scope.sortName;
            this.sortDirection = this.$scope.sortDirection;
            this.first = {
                params: true,
                sortName: true,
                sortDirection: true
            };
            if (this.$scope.allowAutoLoad) {
                this._initSourceListener();
            }

        }


        /*请求数据 */

        DataSource.prototype.doRequestData = function (params, callback, forceRequest) {
            var me, requestParams;
            me = this;
            if (forceRequest) {
                requestParams = combinationParams.call(me, params);
                doRequestNotPageData.call(me, requestParams, callback, me.$scope.method, me.$scope.paramParser);
                return;
            }
            if (angular.isUndefined(this.reqTimer)) {
                requestParams = combinationParams.call(me, params);
                this.reqTimer = this.$timeout(function () {
                    doRequestNotPageData.call(me, requestParams, callback, me.$scope.method, me.$scope.paramParser);
                });
            } else {
                this.$timeout.cancel(this.reqTimer);
                requestParams = combinationParams.call(me, params);
                this.reqTimer = this.$timeout(function () {
                    doRequestNotPageData.call(me, requestParams, callback, me.$scope.method, me.$scope.paramParser);
                });
            }
        };

        /**
         * 展开子节点数据
         * @type {fetchChildren}
         */
        DataSource.prototype.fetchChildren = fetchChildren;

        DataSource.prototype._initSourceListener = function () {
            var me;
            me = this;
            this.$scope.$watch("dataSource.params", function () {
                return me.doRequestData();
            }, this.$scope.allowParamDepthListener);

            /*监听当前排序字段名称 */
            me.$scope.$watch("dataSource.sortName", function () {
                if (me.first.sortName) {
                    me.first.sortName = false;
                }
                return me.doRequestData();
            }, true);

            /*监听当前排序方向 */
            me.$scope.$watch("dataSource.sortDirection", function () {
                if (me.first.sortDirection) {
                    me.first.sortDirection = false;
                }
                return me.doRequestData();
            }, true);

        };

        DataSource.prototype.loadData = function (data) {
            var me = this;
            me.records = data;
            me.$dataSourceManager.$rootScope.$broadcast(me.sourceName, me);
        };

        return DataSource;

    })();

    /*分页数据源 */
    PageDataSource = (function () {
        function PageDataSource($scope1, $http1, $timeout1, $q1, $dataSourceManager1) {
            this.$scope = $scope1;
            this.$http = $http1;
            this.$timeout = $timeout1;
            this.$q = $q1;
            this.$dataSourceManager = $dataSourceManager1;
            this.sourceName = this.$scope.sourceName;
            this.url = this.$scope.url;
            this.records = void 0;
            this.totalRecord = 0;
            this.totalPage = 0;
            this.pageSize = parseInt(this.$scope.pageSize) || 10;
            this.currentPage = parseInt(this.$scope.currentPage) || 1;
            this.params = this.$scope.params;
            this.extraParams = this.$scope.extraParams || {};
            this.moreAttrs = void 0;
            this.reqTimer = void 0;
            this.sortName = this.$scope.sortName;
            this.sortDirection = this.$scope.sortDirection;
            this.requestVersion = 0;
            this.first = {
                currentPage: true,
                pageSize: true,
                totalPage: true,
                params: true,
                extraParams: true,
                sortName: true,
                sortDirection: true
            };
            this.$scope.$watch("sourceName", function (newVal) {
                if (!$dataSourceManager1.dataSources) return;
                var ds = $dataSourceManager1.dataSources[newVal];
                if (!ds && $scope1.dataSource) {
                    $dataSourceManager1.registerDataSource(newVal, $scope1.dataSource);
                }
            });
            if (this.$scope.allowAutoLoad) {
                this._initSourceListener();
            }
        }


        /*请求分页数据 */

        PageDataSource.prototype.doRequestData = function (page, params, callback, forceRequest) {
            var me, requestParams;
            me = this;
            if (forceRequest) {
                requestParams = combinationPageParams.call(me, page, params);
                doRequestPageData.call(me, requestParams, callback, me.$scope.method, me.$scope.paramParser);
                return;
            }
            if (angular.isUndefined(this.reqTimer)) {
                requestParams = combinationPageParams.call(me, page, params);
                this.reqTimer = this.$timeout(function () {
                    doRequestPageData.call(me, requestParams, callback, me.$scope.method, me.$scope.paramParser);
                });
            } else {
                this.$timeout.cancel(this.reqTimer);
                requestParams = combinationPageParams.call(me, page, params);
                this.reqTimer = this.$timeout(function () {
                    doRequestPageData.call(me, requestParams, callback, me.$scope.method, me.$scope.paramParser);
                });
            }
        };

        /** 获取记录总条数 */
        PageDataSource.prototype.getTotalCount = function () {
            var me, requestParams, requestArg;
            me = this;
            requestParams = combinationPageParams.call(me, 1, params);
            requestArg = [me.url];
            var params = angular.extend(requestParams, {
                getTotal: true
            });
            if (me.$scope.method == "post" && me.$scope.paramParser == "form") {
                requestArg.push(transformRequest(requestParams));
                requestArg.push({
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            } else {
                requestArg.push({
                    "params": requestParams,
                    "failHandler": me.$scope.failHandler
                });
            }
            var requestFunc = me.$scope.method == "post" ? me.$http.post : me.$http.get;
            return requestFunc.apply(null, requestArg);
        };

        /**
         * 展开子节点数据
         * @type {fetchChildren}
         */
        DataSource.prototype.fetchChildren = fetchChildren;

        /*初始化属性监听 */

        PageDataSource.prototype._initSourceListener = function () {
            var me;
            me = this;

            /*监听分页大小 */
            me.$scope.$watch("dataSource.pageSize", function () {

                if (me.first.pageSize) {
                    me.first.pageSize = false;
                } else {
                    me.currentPage = 1;
                }
                return me.doRequestData();
            });


            /*监听当前分页 */
            me.$scope.$watch("dataSource.currentPage", function (newVal, oldVal) {
                if (me.first.currentPage) {
                    me.first.currentPage = false;
                    me.doRequestData();
                } else {
                    newVal = parseInt(newVal);
                    if (angular.isNumber(newVal)) {
                        if (newVal >= 1) {
                            if (me.totalPage===-1 ||  newVal <= me.totalPage || (newVal === 1 && me.totalPage === 0) || me.hasNextPage) {
                                return me.doRequestData();
                            } else {
                                me.currentPage = oldVal;
                                throw new Error("当前请求分页大于总页数");
                            }
                        } else {
                            me.currentPage = oldVal;
                            throw new Error("当前页码必须大于1");
                        }
                    } else {
                        me.currentPage = oldVal;
                        throw new Error("当前页码必须为数字");
                    }
                }

            });

            /*监听当前请求参数 */
            me.$scope.$watch("dataSource.params", function () {

                if (me.first.params) {
                    me.first.params = false;
                } else {
                    me.currentPage = 1;
                }
                return me.doRequestData();
            }, this.$scope.allowParamDepthListener);

            me.$scope.$watch("dataSource.extraParams", function (newParams, oldParams) {

                if (me.first.extraParams) {
                    me.first.extraParams = false;
                } else {
                    me.currentPage = 1;
                }
                if (isEmpty(newParams) && isEmpty(oldParams)) {
                    return;
                }
                return me.doRequestData();

                function isEmpty(obj) {
                    if (!obj) return true;
                    return !_.chain(obj)
                        .values()
                        .filter(function (v) {
                            return v && v.length;
                        })
                        .value().length;
                }
            }, this.$scope.allowParamDepthListener);

            /*监听当前排序字段名称 */
            me.$scope.$watch("dataSource.sortName", function () {

                if (me.first.sortName) {
                    me.first.sortName = false;
                } else {
                    me.currentPage = 1;
                }
                return me.doRequestData();
            }, true);

            /*监听当前排序方向 */
            me.$scope.$watch("dataSource.sortDirection", function () {

                if (me.first.sortDirection) {
                    me.first.sortDirection = false;
                } else {
                    me.currentPage = 1;
                }
                return me.doRequestData();
            }, true);
        };

        PageDataSource.prototype.loadData = function (data, totalRecord) {
            var me = this,
                caculateTotalPage = function () {
                    if (me.totalRecord % me.pageSize > 0) {
                        me.totalPage = parseInt(me.totalRecord / me.pageSize, 10) + 1;
                    } else {
                        me.totalPage = parseInt(me.totalRecord / me.pageSize, 10);
                    }
                };

            me.totalRecord = totalRecord;
            caculateTotalPage();
            me.records = data;
            me.hasNextPage = totalRecord > me.pageSize;
            me.$dataSourceManager.$rootScope.$broadcast(me.sourceName, me);
        };

        return PageDataSource;

    })();

    /*初始化属性环境 */
    initEnv = function ($scope, $attr, $parse, $http, $timeout, $q, $dataSourceManager) {
        var dataSource;
        $scope.allowAutoLoad = $scope.$eval($attr.allowAutoLoad) || false;
        $scope.allowParamDepthListener = $scope.$eval($scope.allowParamDepthListener) || false;
        $scope.page = $scope.$eval($scope.page) || false;
        $scope.failHandler = $scope.failHandler();
        $scope.beforeLoad = $scope.beforeLoad();
        $scope.afterLoad = $scope.afterLoad();
        $scope.daoService = $scope.daoService();

        $scope.sortNameParam = $scope.sortNameParam || "sortName";
        $scope.sortDirectionParam = $scope.sortDirectionParam || "sortDirection";
        $scope.sortNameGetter = $parse($scope.sortNameParam);
        $scope.sortDirectionGetter = $parse($scope.sortDirectionParam);
        $scope.sortNameSetter = $scope.sortNameGetter.assign;
        $scope.sortDirectionSetter = $scope.sortDirectionGetter.assign;

        /*初始化属性 */
        if ($scope.page) {
            $scope.totalRecordProp = $scope.totalRecordProp || "totalRecord";
            $scope.recordsProp = $scope.recordsProp || "records";
            $scope.pageSizeParam = $scope.pageSizeParam || "pageSize";
            $scope.currentPageParam = $scope.currentPageParam || "currentPage";
            $scope.moreAttrsProp = $scope.moreAttrsProp || "moreAttrs";

            /*初始化Getter */
            $scope.totalRecordGetter = $parse($scope.totalRecordProp);
            $scope.recordsGetter = $parse($scope.recordsProp);
            $scope.pageSizeGetter = $parse($scope.pageSizeParam);
            $scope.currentPageGetter = $parse($scope.currentPageParam);

            $scope.moreAttrsGetter = $parse($scope.moreAttrsProp);

            /*初始化Setter */
            $scope.pageSizeSetter = $scope.pageSizeGetter.assign;
            $scope.currentPageSetter = $scope.currentPageGetter.assign;
            $scope.moreAttrsSetter = $scope.moreAttrsGetter.assign;
            $scope.treeSettings = getTreeSettings($scope);

            /*初始化DataSource */
            dataSource = new PageDataSource($scope, $http, $timeout, $q, $dataSourceManager);
        } else {
            if (angular.isDefined($scope.recordsProp)) {
                $scope.recordsGetter = $parse($scope.recordsProp);
            }
            dataSource = new DataSource($scope, $http, $timeout, $q, $dataSourceManager);
        }
        $scope.dataSource = dataSource;
    };

    /**
     *
     * @param $scope
     * @return {object} return.lazy 是否延迟加载子集顺序
     * @return {function} return.childrenGetter 子集 Getter
     * @return {function} return.childrenSetter 子集 Setter
     * @return {object} 树形数据源设置
     */
    function getTreeSettings($scope) {
        var isTreeDataSource = $scope.$tree === 'true',
            treeSettings = {},
            childrenProp,
            parentProp;
        if (isTreeDataSource) {
            treeSettings.lazy = $scope.$treeLazy === 'true';
            childrenProp = $scope.treeChildrenProp || 'children';
            parentProp = $scope.treeParentProp || 'parent';
            treeSettings.parentGetter = $parse(parentProp);
            treeSettings.parentSetter = treeSettings.parentGetter.assign;
            treeSettings.childrenGetter = $parse(childrenProp);
            treeSettings.childrenSetter = treeSettings.childrenGetter.assign;
            if ($scope.treeLazyUrl) {
                treeSettings.LazyUrl = $scope.treeLazyUrl || $scope.url;
            }
            return treeSettings;
        }
    }


    /**
     * 展开子节点数据
     * @param record
     * @param callback
     */
    function fetchChildren(record, callback) {
        var me = this,
            $scope = me.$scope,
            requestParams = {},
            children = $scope.treeSettings.childrenGetter(record);
        if ($scope.treeSettings.lazy) {
            if (angular.isUndefined(children) && children === null) {
                //懒加载的url
                requestParams = combinationParams.call(me, {});
                this.$http({
                    method: "GET",
                    url: $scope.treeSettings.LazyUrl,
                    data: requestParams
                }).then(function (result) {
                    //设置子节点数据
                    if (angular.isArray(result) || angular.isUndefined(result)) {
                        $scope.treeSettings.childrenSetter(record, result);
                    } else {
                        $scope.treeSettings.childrenSetter(record, result.records);
                    }
                    //设置子节点和父节点的level，同时设置当前子节点指向父节点
                    _.each($scope.treeSettings.childrenGetter(record), function (childRecord) {
                        if (angular.isUndefined(record.__level)) {
                            record.__level = 1;
                        }
                        childRecord.__level = record.__level + 1;

                        $scope.treeSettings.parentSetter(childRecord, record);
                    });
                    callback.apply(this, [record, children]);
                });
            } else {
                callback.apply(this, [record, children]);
            }
        } else {
            if (angular.isUndefined(children) && children === null) {
                throw "children data not found";
            } else {
                callback.apply(this, [record, children]);
            }
        }
    }


    return function ($window, $http, $parse, $timeout, $q, $dataSourceManager) {
        return {
            restrict: "E",
            scope: {
                url: "@",
                params: "=",
                sourceName: "@",
                page: "@",
                pageSize: "@",
                currentPage: "@",
                sortName: "@",
                sortDirection: "@",

                /*从结果中取值 */
                totalRecordProp: "@",
                recordsProp: "@",
                moreAttrsProp: "@",

                /*用于获取参数 */
                pageSizeParam: "@",
                currentPageParam: "@",
                sortNameParam: "@",
                sortDirectionParam: "@",

                /*是否进行自动加载 */
                /*allowAutoLoad: "@",*/

                failHandler: "&",

                /*加载前和加载后事件*/
                beforeLoad: "&",
                afterLoad: "&",
                daoService: "&",

                /*请求参数是否进行深度监听 */
                allowParamDepthListener: "@",
                // 以下下是树形数据源设置
                /**
                 * @cfg {'true'/'false'} 是否树形
                 */
                $tree: '@tree',
                /**
                 * @cfg {'true'/'false'} 是否懒加载树形数据
                 */
                $treeLazy: '@treeLazy',
                /**
                 * @cfg {string} ["children"]
                 */
                treeChildrenProp: '@',
                treeLazyUrl: '@',
                treeParentProp: '@'
            },
            link: function ($scope, $element, $attr) {
                /*初始化数据源环境参数 */
                initEnv($scope, $attr, $parse, $http, $timeout, $q, $dataSourceManager);
                $scope.api = $scope.dataSource;
                if ($attr.method) $scope.method = $attr.method;
                else if (config && config.controls.datasource && config.controls.datasource.method)
                    $scope.method = config.controls.datasource.method;
                else $scope.method = "get";

                if ($attr.paramParser) $scope.paramParser = $attr.paramParser;
                else if (config && config.controls.datasource && config.controls.datasource.paramParser)
                    $scope.paramParser = config.controls.datasource.paramParser;
                else $scope.paramParser = "json";

                /*在Manager中注册当前数据源 */
                $dataSourceManager.registerDataSource($scope.sourceName, $scope.dataSource);

                /*触发sourceManager的promise */
                $timeout(function () {
                    if (angular.isUndefined($dataSourceManager.defereds[$scope.sourceName])) {
                        $dataSourceManager.getDataSource($scope.sourceName);
                    }
                    $dataSourceManager.defereds[$scope.sourceName].resolve();
                    return $dataSourceManager.defereds[$scope.sourceName] = $q.defer();
                });

                angular.element(document).injector().get("$rootScope").$on("$destroy", function () {
                    $element.empty();
                    $element.remove();
                    $dataSourceManager.destroy();
                    delete $scope.dataSource.$dataSourceManager;
                    delete $scope.dataSource;
                });
            }
        };
    };
});
