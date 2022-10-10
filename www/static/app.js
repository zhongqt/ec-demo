/**
 * Created with IntelliJ IDEA.
 * User: zhengry
 * Date: 2014/11/6
 * Time: 15:48
 */

require.config({
    baseUrl: window.ctx + "/static/app",
    waitSeconds: 2000,
    paths: {
        "jquery": window.ctx + "/bower_components/jquery/dist/jquery.min",
        "angular": window.ctx + "/bower_components/angular/angular.min",
        "angular-route": window.ctx + "/bower_components/angular-route/angular-route.min",
        "angular-resource": window.ctx + "/bower_components/angular-resource/angular-resource",
        "angular-local-storage": window.ctx + "/bower_components/angular-local-storage/dist/angular-local-storage",
        "angular-base64": window.ctx + "/bower_components/angular-base64/angular-base64",
        "tooltipster": window.ctx + "/bower_components/tooltipster/js/jquery.tooltipster",
        "laydate": window.ctx + "/bower_components/laydate/laydate.dev",
        'angular-sanitize': window.ctx + "/bower_components/angular-sanitize/angular-sanitize",
        'ztree': window.ctx + "/bower_components/ztree_v3/js/jquery.ztree.core-3.5.min",
        'ztree_check': window.ctx + "/bower_components/ztree_v3/js/jquery.ztree.excheck-3.5.min",
        'underscore':window.ctx + "/bower_components/underscore/underscore",
        'angular-underscore':window.ctx + "/bower_components/angular-underscore/angular-underscore",
        'artTmpl': window.ctx + '/bower_components/artTemplate/dist/template-debug',
        'ngContextMenu': window.ctx + '/bower_components/context-menu/ng-context-menu',
        'Handsontable': window.ctx + '/bower_components/handsontable-pro/dist/handsontable.full',
        'moment': window.ctx + '/bower_components/handsontable-pro/dist/moment/moment',
        'hot-formula-parser': window.ctx + '/bower_components/handsontable-pro/dist/hot-formula-parser/formula-parser',
        'pikaday': window.ctx + '/bower_components/handsontable-pro/dist/pikaday/pikaday',
        'numbro': window.ctx + '/bower_components/handsontable-pro/dist/numbro/numbro',
        'zeroclipboard': window.ctx + '/bower_components/handsontable-pro/dist/zeroclipboard/ZeroClipboard',
        'angular-placeholder': window.ctx + '/bower_components/angular-placeholder/src/angularjs-placeholder',
        'ds': window.ctx + '/static/app/daoService/DaoServiceClient',
        'ModelGraph': window.ctx + '/static/app/daoService/ModelGraph'
    },
    shim: {
        "angular": {
            exports: "angular",
            deps: ["jquery"]
        },
        "angular-underscore":{
            deps:["angular","underscore"]
        },
        "angular-resource": {
            deps: ["angular"]
        },
        "angular-route": {
            deps: ["angular"]
        },
        "angular-local-storage": {
            deps: ["angular"]
        },
        "angular-base64": {
            deps: ["angular"]
        },
        "tooltipster": {
            deps: ["jquery"]
        },
        "laydate": {
            exports: "laydate"
        },
        "angular-sanitize": {
            deps: ["angular"]
        },
        "ztree": {
            deps: ["jquery"]
        },
        "ztree_check": {
            deps: ["jquery", "ztree"]
        },
        'artTmpl': {
            exports: 'artTmpl'
        },
        'ngContextMenu': {
            deps: ["angular"]
        },
        'Handsontable': {
            deps: ["css!" + window.ctx + "/bower_components/handsontable-pro/dist/handsontable.full.css"]
        },
        "angular-placeholder": {
            deps: ["angular"]
        },
        'ds': {
            exports: 'ds',
            deps: [
                'config.properties',
                'angular',
                'ModelGraph',
                '/static/app/daoService/Uploader.js'
            ],
            init: function () {
                function autoTagging(args) {
                    return 'DS_' + args.modelName + '_' + args.operator;
                }

                var _document = window.document,
                    ds = window._ds = this.ds,
                    dsc = ds.client = new ds.types.DaoServiceClient(),
                    dscPrototype = ds.types.DaoServiceClient.prototype;

                dscPrototype.execute = function(requestBody) {
                    var _this = this;
                    // noinspection JSCheckFunctionSignatures
                    var injector = angular.element(_document).injector();
                    var $http = injector.get('$http');
                    if (!requestBody.tag) {
                        requestBody.tag = autoTagging({
                            modelName: requestBody.mainModelName,
                            operator: requestBody.action,
                        });
                    }
                    var url = _this.serverUrl +
                        _this.projectId +
                        '/auto-api/' +
                        requestBody.mainModelName + '/' +
                        requestBody.action + '/' +
                        _this.serviceCode + '/' +
                        requestBody.tag;


                    return $http.post(url, requestBody).then(function (response) {
                        if (response && response.data) {
                            response = response.data;
                            if (response.success) {
                                return response.data;
                            }
                        }
                        if (console && console.error) {
                            console.error(response);
                        }
                        throw new Error('执行请求报错');
                    });
                };

                dscPrototype.executeCustom = function(requestBody) {
                    // noinspection JSCheckFunctionSignatures
                    var _this = this;
                    var injector = angular.element(_document).injector();
                    var $http = injector.get('$http');
                    var url = _this.serverUrl +
                        _this.projectId +
                        '/custom-api/' +
                        requestBody.apiKey + '/' +
                        _this.serviceCode + '/' +
                        requestBody.tag;
                    return $http.post(url, requestBody).then(function (response) {
                        if (response && response.data && response.data.success) {
                            return response.data;
                        }
                        return response;
                    });
                }

                dsc.config({
                    projectKey: 'daoservice-quickstart',
                    serverUrl: 'http://localhost:/ec-demo/',
                    serviceCode: 'QS',
                    restfulPlainCodeArguments: true,
                    excelImportConfig: {
                        filter: 'csv,xls,xlsx',              // 文件类型过滤器
                        maxsize: 10,                         // 文件上传大小限制，单位：M
                    },
                })
                return ds;
            }
        }
    },
    config: {
        i18n: {
            locale: localStorage.getItem('locale') || 'zh-cn'
        }
    },
    deps: ["dynamicBootstrap"]
});
