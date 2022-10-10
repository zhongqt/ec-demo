/**
 * Created by wengms on 2016/4/7.
 */
define("framework/datasource/PageDataSource",["angular"], function (angular) {
    var generatorParams = function () {
        var me, params, requestParams;
        me = this;
        requestParams = {};
        params = this.params;
        requestParams = {};

        /*设置分页以及排序参数 */
        this.$scope.pageSizeSetter(requestParams, this.pageSize);
        this.$scope.currentPageSetter(requestParams, this.currentPage);
        this.$scope.sortNameSetter(requestParams, this.sortName);
        this.$scope.sortDirectionSetter(requestParams, this.sortDirection);
        /*加入请求参数 */
        if (angular.isFunction(this.params)) {
            angular.extend(requestParams, this.params.call());
        } else {
            angular.extend(requestParams, this.params);
        }
        me.requestParams = requestParams;
        return requestParams;
    };
    /*组合分页参数 */
    var combinationPageParams = function (page, params) {
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

    /*请求分页数据 */
    var doRequestPageData = function (requestParams, callback) {
        var caculateTotalPage, handleResult, me, requestArg, url;
        me = this;
        requestArg = [me.url];
        url = me.url;
        requestArg.push({
            "params": requestParams,
            "failHandler": me.$scope.failHandler
        });
        caculateTotalPage = function () {
            if (me.totalRecord % me.pageSize > 0) {
                me.totalPage = parseInt(me.totalRecord / me.pageSize, 10) + 1;
            } else {
                me.totalPage = parseInt(me.totalRecord / me.pageSize, 10);
            }
        };
        handleResult = function (result) {
            me.totalRecord = me.$scope.totalRecordGetter(result);

            /*计算总页数 */
            caculateTotalPage();
            me.records = me.$scope.recordsGetter(result);
            me.moreAttrs = me.$scope.moreAttrsGetter(result);
            if (result.fetchAll) {
                me.fetchAll = result.fetchAll;
            }
            if (angular.isFunction(callback)) {
                callback.call(me, me);
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
            .then(function(result){
                handleRequest(result);
            })
            .catch(function(e){
                console.log(e);
            });
        } else {
            me.$http.get.apply(null, requestArg).success(function (result) {
                handleRequest(result);
            });
        }
        handleRequest = function(result) {
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

    return (function () {
        function PageDataSource($scope, $http, $timeout, $q, $dataSourceManager,sourceName) {
            this.$scope = $scope;
            this.$http = $http;
            this.$timeout = $timeout;
            this.$q = $q;
            this.$dataSourceManager = $dataSourceManager;
            if(sourceName){
                this.sourceName = sourceName;
            }else{
                this.sourceName = this.$scope.sourceName;
            }
            this.url = this.$scope.url;
            this.records = [];
            this.totalRecord = 0;
            this.totalPage = 0;
            this.pageSize = parseInt(this.$scope.pageSize) || 10;
            this.currentPage = parseInt(this.$scope.currentPage) || 1;
            this.params = this.$scope.params;
            this.moreAttrs = undefined;
            this.reqTimer = undefined;
            this.sortName = this.$scope.sortName;
            this.sortDirection = this.$scope.sortDirection;
            this.first = {
                currentPage: true,
                pageSize: true,
                totalPage: true,
                params: true,
                extraParams: true,
                sortName: true,
                sortDirection: true
            };
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
                doRequestPageData.call(me, requestParams, callback);
                return;
            }
            if (angular.isUndefined(this.reqTimer)) {
                requestParams = combinationPageParams.call(me, page, params);
                this.reqTimer = this.$timeout(function () {
                    doRequestPageData.call(me, requestParams, callback);
                });
            } else {
                this.$timeout.cancel(this.reqTimer);
                requestParams = combinationPageParams.call(me, page, params);
                this.reqTimer = this.$timeout(function () {
                    doRequestPageData.call(me, requestParams, callback);
                });
            }
        };


        /*初始化属性监听 */

        PageDataSource.prototype._initSourceListener = function () {
            var me;
            me = this;

            /*监听分页大小 */
            me.$scope.$watch("dataSource.pageSize", function () {
                me.currentPage = 1;
                return me.doRequestData();
            });

            /*监听当前分页 */
            me.$scope.$watch("dataSource.currentPage", function (newVal, oldVal) {
                newVal = parseInt(newVal);
                if (angular.isNumber(newVal)) {
                    if (newVal >= 1) {
                        if (newVal <= me.totalPage || (newVal === 1 && me.totalPage === 0)) {
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
            });

            /*监听当前请求参数 */
            me.$scope.$watch("dataSource.params", function () {
                me.currentPage = 1;
                return me.doRequestData();
            }, this.$scope.allowParamDepthListener);

            /*监听当前排序字段名称 */
            me.$scope.$watch("dataSource.sortName", function () {
                me.currentPage = 1;
                return me.doRequestData();
            }, true);

            /*监听当前排序方向 */
            me.$scope.$watch("dataSource.sortDirection", function () {
                me.currentPage = 1;
                return me.doRequestData();
            }, true);
        };

        return PageDataSource;

    })();

})
