/**
 * Created by huangzx on 2015/6/24.
 */
define('framework/dict/GillionDictModule', [
    'angular',
    'config.properties'
], function (angular, config) {
    return angular.module('GillionDictModule', [], ['$filterProvider', '$compileProvider', function ($filterProvider, $compileProvider) {
        var dictConfig = config.dict_config || {},
            gDictValue = angular.element('body').attr('g-dict') || '',
            filterFn = angular.noop,
            requested = false,
            dictUrl = dictConfig.url,
            daoService = dictConfig.daoService,
            dictData,     //ajax返回的数据字典数据
            filterNames,  //过滤器数组名称
            params,
            i,len;

        //http请求调用初始化
        function requestFn($http, $rootScope, $q) {
            if (!dictData && requested === false) {
                requested = true;
                if (angular.isFunction(daoService)) {
                    $q.when(daoService())
                    .then(function(result){
                        handleDictData (result);
                    })
                    .catch(function(e){
                        console.log(e);
                    })
                } else {
                    $http({
                        method:dictConfig.method || 'get',
                        url: dictUrl,
                        data:dictConfig.data || ''
                    }).then(function (result) {
                        handleDictData (result)
                    });
                }
            }
            function handleDictData (result) {
                var $dict = $rootScope.$dict || {};
                dictData = result.data;
                //返回的数据放入到$rootScope属性中，以便后续的获取
                angular.forEach(dictData, function(dictObj, dictKey){
                    $dict[dictKey] = [];
                    if (angular.isArray(dictObj)) {
                        angular.forEach(dictObj, function (dictRow) {
                            $dict[dictKey].push(dictRow);
                        });
                    } else {
                        angular.forEach(dictObj, function(value, key){
                            $dict[dictKey].push({key:key, value:value});
                        });
                    }
                });
                $rootScope.$dict = $dict;
                filterFn = function (filterName, input, reverse) {
                    var data, key;
                    if(dictData) data = dictData[filterName];
                    if (!data) return input;
                    if (input == undefined) return '';
                    reverse = !!reverse;
                    if (!reverse) {
                        if (typeof input === 'boolean' && !data[input]) {
                            input = input?1:0;
                        }
                        if (angular.isArray(data)) {
                            var n = data.length;
                            for (var i=0;i<=n-1;i++)
                            {
                                var dictRow = data[i];
                                var key = String(dictRow.key);
                                if (key === String(input)) {
                                    return dictRow.value;
                                }
                            }
                        } else {
                            return data[input];
                        }
                    }
                    if (angular.isArray(data)) {
                        var n = data.length;
                        for (var i=0;i<=n-1;i++)
                        {
                            var dictRow = data[i];
                            var key = String(dictRow.value);
                            if (key === String(input)) {
                                return dictRow.key;
                            }
                        }
                    } else {
                        for (key in data) {
                            if (data[key] == input) return key;
                        }
                    }
                    return input;
                };
                $rootScope.$dictReturned = true;
                $rootScope.$broadcast('$dictReturned');
            }            
        }

        if (!gDictValue || !dictUrl) return;
        params = 'params='+gDictValue;
        if (dictUrl.indexOf('?')>-1) {
            dictUrl += '&' + params;
        } else {
            dictUrl += '?' + params;
        }

        $compileProvider.directive('gDict', ['$http', '$rootScope', '$q', function($http, $rootScope, $q){
            requestFn($http, $rootScope, $q);
            return {
                restrict: 'A'
            };
        }]);

        filterNames = gDictValue.split(',');
        len = filterNames.length;
        //定义多个过滤器
        for (i=0;i<len;i++){
            (function (filerName) {
                $filterProvider.register(filerName, ['$http', '$rootScope', '$q', function($http, $rootScope, $q){
                    requestFn($http, $rootScope, $q);
                    return function(input, reverse) {
                        return filterFn(filerName, input, reverse);
                    };
                }]);
            })(filterNames[i]);
        }
    }]);
});
