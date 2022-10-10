(function (window) {

    define('framework/groupDataSource/GroupDataSourceModule', [
        'angular',
        'underscore',
        'jquery',
        'framework/datasource/PageDataSource',
        'framework/datasource/DataSourceModule'
    ], function (angular, _, $, PageDataSource) {

        var NodeMap = {
            /**
             * @type {Object<String, Node>}
             */
            idNode: {}
        };

        /**
         * 添加节点到 `NodeMap`
         * @param node {Node} 节点实例
         */
        function addNode(node) {
            NodeMap.idNode[node.id] = node;
        }

        /**
         * 获取节点
         * @param idOrRecordOrNode {String/Node/Object<String, *>} 原始记录或节点编号或节点
         * @return {Node}
         */
        function $node(idOrRecordOrNode) {
            if (idOrRecordOrNode instanceof Node && NodeMap.idNode.hasOwnProperty(idOrRecordOrNode.id)) {
                return idOrRecordOrNode;
            }
            return NodeMap.idNode[$id(idOrRecordOrNode)];
        }

        /**
         * 删除节点
         * @param idOrRecordOrNode {String/Node/Object<String, *>} 原始记录或节点编号或节点
         */
        function removeNode(idOrRecordOrNode) {
            var node = $node(idOrRecordOrNode);
            delete NodeMap.idNode[node.id];
        }

        /**
         * 获取节点 `ID`
         * @param idOrRecordOrNode {String/Node/Object<String, *>} 原始记录或节点编号或节点
         * @return {String}
         */
        function $id(idOrRecordOrNode) {
            var id;
            if (angular.isString(idOrRecordOrNode)) {
                id = idOrRecordOrNode;
            } else if (idOrRecordOrNode instanceof Node) {
                id = idOrRecordOrNode.id;
            } else { // record
                id = _.findKey(NodeMap.idNode, function (v) {
                    return v.origin === idOrRecordOrNode
                })
            }
            if (id && NodeMap.idNode.hasOwnProperty(id)) {
                return id;
            }
            throw new TypeError('获取不到节点编号， 或缓存中没有匹配的节点 predicate(idOrRecordOrNode)' + idOrRecordOrNode);
        }

        /**
         * 创建一个分页数据源代理对象
         * @returns {*}
         */
        function createPageDataSourceProxy($scope) {
            var document = window.document,
                docInjector = angular.element(document).injector(),
                $http = docInjector.get('$http'),
                $parse = docInjector.get('$parse'),
                $timeout = docInjector.get('$timeout'),
                $q = docInjector.get('$q'),
                $dataSourceManager = docInjector.get('$dataSourceManager');

            $scope.allowAutoLoad = false;
            $scope.allowParamDepthListener = false;
            /*初始化属性 */

            $scope.totalRecordProp = "totalRecord";
            $scope.recordsProp = "records";
            $scope.pageSizeParam = "pageSize";
            $scope.currentPageParam = "currentPage";
            $scope.sortNameParam = "sortName";
            $scope.sortDirectionParam = "sortDirection";
            $scope.moreAttrsProp = "moreAttrs";

            /*初始化Getter */
            $scope.totalRecordGetter = $parse($scope.totalRecordProp);
            $scope.recordsGetter = $parse($scope.recordsProp);
            $scope.pageSizeGetter = $parse($scope.pageSizeParam);
            $scope.currentPageGetter = $parse($scope.currentPageParam);
            $scope.sortNameGetter = $parse($scope.sortNameParam);
            $scope.sortDirectionGetter = $parse($scope.sortDirectionParam);
            $scope.moreAttrsGetter = $parse($scope.moreAttrsProp);

            /*初始化Setter */
            $scope.pageSizeSetter = $scope.pageSizeGetter.assign;
            $scope.currentPageSetter = $scope.currentPageGetter.assign;
            $scope.sortNameSetter = $scope.sortNameGetter.assign;
            $scope.sortDirectionSetter = $scope.sortDirectionGetter.assign;
            $scope.moreAttrsSetter = $scope.moreAttrsGetter.assign;

            return new PageDataSource($scope, $http, $timeout, $q, $dataSourceManager);
        }

        /**
         * 根据分页代理数据源的内容，刷新分组数据源的内部属性
         */
        function freshGroupDataSource(pageDataSourceProxy, groupDataSource) {
            groupDataSource.totalRecord = pageDataSourceProxy.totalRecord;
            groupDataSource.records = pageDataSourceProxy.records;
            groupDataSource.totalPage = pageDataSourceProxy.totalPage;
            groupDataSource.pageSize = pageDataSourceProxy.pageSize;
            groupDataSource.currentPage = pageDataSourceProxy.currentPage;
            groupDataSource.moreAttrs = pageDataSourceProxy.moreAttrs;
            groupDataSource.sortName = pageDataSourceProxy.sortName;
            groupDataSource.sortDirection = pageDataSourceProxy.sortDirection;
        }


        /**
         * 树形数据源
         *
         * @param config 树形数据源设置
         * @param config.sourceName {String} 树形数据源编号
         * @param config.url 树形数据源请求数据的地址
         * @param [config.childrenProp="children"] {String} 节点记录的子集在节点中的组合的命名
         * @param [config.allowAutoLoad=false] {Boolean} 是否自动加载数据
         * @param $rootScope
         *
         * @constructor
         */
        function GroupDataSource(config, $rootScope, GillionMsg) {
            var me = this,
                childrenProp = config.childrenProp || 'children',
                allowAutoLoad = Boolean(config.allowAutoLoad),
                docInjector = angular.element(document).injector();
            if (config.allowAutoLoad === void 0 || config.allowAutoLoad === 'false') {
                allowAutoLoad = false;
            } else {
                allowAutoLoad = true;
            }
            me.GillionMsg = GillionMsg;
            me.paramsGetter = config['paramsGetter'];
            me.$timeout = docInjector.get('$timeout');
            me.sourceName = config.sourceName;
            me.url = config.url;
            me.$rootScope = $rootScope;
            config.allowAutoLoad = allowAutoLoad;
            me.allowAutoLoad = allowAutoLoad;
            me.pageDataSourceProxy = createPageDataSourceProxy(config);
            me.$scope = config;
            me.$scope.groupDataSource = me;
            me.childRecordCount = 0;


            freshGroupDataSource(me.pageDataSourceProxy, me);

            angular.injector(['ng']).invoke(function ($http, $parse) {
                me.$http = $http;
                me.childrenGetter = $parse(childrenProp);
                me.childrenSetter = me.childrenGetter.assign;
            });

            if (allowAutoLoad) {
                me.doRequestData();
            }



            me._initSourceListener();
        }

        /**
         *
         * @param param
         * @param [paramPrefix]
         * @returns {{}}
         */
        function paramSerializer(param, paramPrefix) {
            var rs = {},
                prefix = paramPrefix || '';
            _.each(param, function (v, k) {
                var prop = prefix ? (prefix + '.' + k) : k;
                if (_.isArray(v)) {
                    _.each(v, function (e, idx) {
                        _.extend(rs, paramSerializer(e, prop + '[' + idx + ']'));
                    });
                } else if (_.isObject(v)) {
                    _.extend(rs, paramSerializer(v, prop));
                } else {
                    rs[prop] = v;
                }
            });
            return rs;
        }

        GroupDataSource.prototype = {

            /**
             * 手动调用数据源请求数据"
             * @param page 分页参数
             * @param params 其它参数
             * @param [callback] {function(records:Array<object>)} 回调
             */
            doRequestData: function (page, params, callback) {
                var me = this,
                    dsProxy = me.pageDataSourceProxy,
                    extantParams = me.paramsGetter();
                me.allowAutoLoad = true;
                if (me.frontEndGroup || !me.groups || _.isEmpty(me.groups) || (params && params.groups)) { // 当前分组表格未设置分组时或者参数没有分组信息，清除原来的分组参数
                    dsProxy.params = _.omit(dsProxy.params, function (v, k) {
                        return /^groups/.test(k);
                    });
                }
                if (extantParams && !_.isEmpty(extantParams)) {
                    _.extend(dsProxy.params, extantParams);
                }
                if (!!params) {
                    if (!_.isEmpty(me.groups) && !params.groups) {
                        params = {
                            "groups": [_.first(me.groups)]
                        };
                    }
                    _.extend(dsProxy.params, paramSerializer(params));
                }
                if (me.frontEndGroup) { // 前端分组不需要传分组信息
                    dsProxy.params = _.omit(dsProxy.params, function (v, k) {
                        return /^groups/.test(k);
                    });
                }
                if (me.timer) {
                    me.$timeout.cancel(me.timer);
                }
                me.timer = me.$timeout(function () {
                    me.pageDataSourceProxy.doRequestData(page, null, function (result) {
                        var records = result.records;
                        freshGroupDataSource(me.pageDataSourceProxy, me);
                        if (!_.isEmpty(me.groups)) {
                            _.each(records, function (x) {
                                addNode(new Node(x, null, (params ? params.groups : [_.first(me.groups)])));
                            });
                        }
                        (callback || _.noop)(records);
                        me.$rootScope.$broadcast(me.sourceName, me, result);
                    });
                    if (dsProxy && dsProxy.params) {
                        delete dsProxy.params.fetchAll;
                    }
                }, 50);
            },
            getTotalCount: function () {
                var me = this,
                    extantParams = me.paramsGetter(),
                    params = angular.extend(extantParams, {
                        "getTotal": true
                    }),
                    requestArg = [me.url];

                requestArg.push({
                    "params": params
                });
                var requestFunc = me.$http.get;
                return requestFunc.apply(null, requestArg);
            },


            fetchChildren: function (parent, groupParams, callback) {
                var me = this,
                    lastGroup = _.last(groupParams);
                me.$http
                    .get(me.url, {
                        params: _.extend({}, me.pageDataSourceProxy.params,
                            paramSerializer({
                                groups: groupParams,
                                fetchLeaf: !!(lastGroup && _.has(lastGroup, 'value'))
                            }), {
                                sortName: me.pageDataSourceProxy.sortName,
                                sortDirection: me.pageDataSourceProxy.sortDirection
                            }),
                        client_record_count: me.childRecordCount
                    })
                    .then(function (result) {
                        if (result.success === false) {
                            me.GillionMsg.alert("提示", result.msg);
                            return;
                        }
                        var response = result.data;
                        var records = response.records;
                        if (!records && response.data.records) {
                            records = response.data.records;
                        }
                        me.childRecordCount += records.length;
                        _.each(records, function (x) {
                            addNode(new Node(x, parent, groupParams));
                        });
                        (callback || _.noop)(records);
                    });
            },

            $id: $id,
            $node: $node,
            countChildren: function (record) {
                var me = this,
                    node = $node(record),
                    children = node.children,
                    len = children.length;
                _.each(children, function (childrenId) {
                    len += me.countChildren(childrenId);
                });
                return len;
            },

            _initSourceListener: function () {
                var me;
                me = this;

                /*监听分页大小 */
                me.$scope.$watch("groupDataSource.pageSize", function (newPageSize) {
                    if (me.pageDataSourceProxy.first.pageSize) {
                        me.pageDataSourceProxy.first.pageSize = false;
                        return;
                    }
                    me.pageDataSourceProxy.pageSize = newPageSize;
                });

                /*监听当前分页 */
                me.$scope.$watch("groupDataSource.currentPage", function (newVal, oldVal) {
                    if (me.pageDataSourceProxy.first.currentPage) {
                        me.pageDataSourceProxy.first.currentPage = false;
                        return;
                    }
                    newVal = parseInt(newVal);
                    if (angular.isNumber(newVal)) {
                        if (newVal >= 1) {
                            if (newVal <= me.totalPage || (newVal === 1 && me.totalPage === 0)) {
                                me.pageDataSourceProxy.currentPage = newVal;
                                //me.doRequestData();
                            } else {
                                me.pageDataSourceProxy.currentPage = newVal;
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
                me.$scope.$watch("groupDataSource.params", function (newVal, oldVal) {
                    if (me.pageDataSourceProxy.first.params) {
                        me.pageDataSourceProxy.first.params = false;
                        return;
                    }
                    me.currentPage = 1;
                    me.pageDataSourceProxy.params = newVal;
                    me.doRequestData();
                }, this.$scope.allowParamDepthListener);

                /*监听当前排序字段名称 */
                me.$scope.$watch("groupDataSource.sortName", function (newVal, oldVal) {
                    if (me.pageDataSourceProxy.first.sortName) {
                        me.pageDataSourceProxy.first.sortName = false;
                        return;
                    }
                    me.currentPage = 1;
                    me.pageDataSourceProxy.sortName = newVal;
                    me.doRequestData();
                }, true);

                /*监听当前排序方向 */
                me.$scope.$watch("groupDataSource.sortDirection", function (newVal, oldVal) {
                    if (me.pageDataSourceProxy.first.sortDirection) {
                        me.pageDataSourceProxy.first.sortDirection = false;
                        return;
                    }
                    me.currentPage = 1;
                    me.pageDataSourceProxy.sortDirection = newVal;
                    me.doRequestData();
                }, true);
            },

            setGroups: function (groups) {
                this.groups = groups
            }
        };



        function Node(originalRecord, parent, groupParams) {
            var me = this,
                parentNode;
            me.id = _.uniqueId('node_');
            me.origin = originalRecord;
            me.groupParams = groupParams;
            me.children = [];

            if (parent) {
                parentNode = $node(parent);
                me.parentId = parentNode.id;
                me.level = parentNode.level + 1;
                parentNode.children.push(me.id);
            } else {
                me.level = 1;
            }
        }

        function getNodeGroupParams(parent, groupProp) {
            var groupParams, last;
            if (!parent && groupProp) {
                groupParams = [{
                    property: groupProp
                }];
            } else if (parent) {
                var parentNode = $node(parent);
                if (groupProp) {
                    groupParams = getNodeGroupParams(parentNode);
                    groupParams.push({
                        property: groupProp
                    });
                } else {
                    groupParams = _.map(parentNode.groupParams, _.partial($.extend, null));
                    last = _.last(groupParams);
                    last.value = parentNode.origin[last.property];
                }
            }
            return groupParams;
        }

        Node.prototype = {

            isLeaf: function () {
                var lastGroup = _.last(this.groupParams);
                return !!(lastGroup && _.has(lastGroup, 'value'));
            },

            destroy: function () {
                var me = this,
                    id = me.id,
                    parentId = me.parentId,
                    children = me.children,
                    parent;
                if (_.isEmpty(children)) {
                    _.each(children, function (nodeId) {
                        $node(nodeId).destroy();
                    });
                }
                if (parentId) {
                    parent = $node(parentId);
                    parent.children.splice(_.indexOf(parent.children, id), 1);
                }
                removeNode(id);
            }
        };

        return angular.module('GroupDataSourceModule', ['DataSourceModule'])
            .directive('gGroupDataSource', function ($parse, GroupDataSources, $dataSourceManager, GillionMsg) {
                return {
                    restrict: "E",
                    scope: {
                        sourceName: '@',
                        url: '@',
                        allowAutoLoad: '@',
                        childrenProp: '@',
                        paramsGetter: '&',
                        pageSize: '@'
                    },
                    controller: ['$scope', function (scope) {
                        var groupDataSource = new GroupDataSource(scope, scope.$root, GillionMsg);
                        $dataSourceManager.registerDataSource(scope.sourceName, groupDataSource);
                        GroupDataSources.register(scope.sourceName, groupDataSource);
                    }]
                }
            })
            .factory('GroupDataSources', function () {
                /**
                 * @type {Object<String, GroupDataSource>}
                 */
                var groupDataSources = {};

                return {
                    /**
                     * @param sourceName {String} 数据源编号
                     * @param sourceOrConfig {GroupDataSource/{sourceName, url, childrenProp, allowAutoLoad}} 数据源实例或者数据源设置
                     * 如果传入数据源实例， 将被注册到数据源集， 随时可供调用
                     * 如果传入数据源设置， 将自动创建实例并注册
                     */
                    register: function (sourceName, sourceOrConfig) {
                        var $rootScope;
                        if (!sourceName) {
                            throw new Error('必须为数据源指定sourceName');
                        }
                        if (groupDataSources[sourceName]) {
                            throw new Error('sourceName为' + sourceName + '的数据源已经被创建过了，请检查数据源sourceName是否冲突');
                        }

                        if (sourceOrConfig instanceof GroupDataSource) {
                            groupDataSources[sourceName] = sourceOrConfig;
                        } else {
                            $rootScope = angular.element(window.document).scope.injector.get('$rootScope');
                            this.register(sourceName, new GroupDataSource(sourceOrConfig, $rootScope));
                        }
                    },

                    get: function (sourceName) {
                        return groupDataSources[sourceName];
                    }
                };
            });
    });

}(window));