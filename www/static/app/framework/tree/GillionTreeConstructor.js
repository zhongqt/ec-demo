define('framework/tree/GillionTreeConstructor', function () {
    return function ($http) {

        function getTreeData(scope, attrs, callback) {
            if (angular.isObject(scope.treeData)) {
                callback(scope.treeData);
            } else if (attrs.hasOwnProperty('url') && angular.isString(attrs.url)) {
                $http.get(attrs.url).success(function (result) {
                    if (result.success) {
                        callback(result.data);
                    }
                });
            } else {
                throw new Error("构造树形缺乏必要数据。");
            }
        }

        return {
            template: "<ul class=\"ztree\"></ul>",
            replace: true,
            restrict: 'AE',
            scope: {
                treeOpts: "=",
                treeData: "=",
                onLoadSuccess:"&"
            },
            link: function (scope, $element, attrs) {
                var settings = {};
                if (attrs.hasOwnProperty("hasCheck") && attrs.hasCheck === "true") {
                    require(["ztree_check"], function () {
                        settings.check = {
                            enable: true
                        };

                        getTreeData(scope, attrs, function (data) {
                            var paramArg;
                            paramArg={
                                data:data
                            }
                            $.fn.zTree.init($element, angular.extend(settings, scope.treeOpts), data);
                            scope.onLoadSuccess(paramArg);
                        });
                    });
                } else {
                    getTreeData(scope, attrs, function (data) {
                        var paramArg;
                        paramArg={
                            data:data
                        }
                        $.fn.zTree.init($element, angular.extend(settings, scope.treeOpts), data);
                        scope.onLoadSuccess(paramArg);
                    });
                }
            }
        }
    };
});