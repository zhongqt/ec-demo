define('framework/tree/GillionTreeModule', [
    'angular',
    'framework/tree/GillionTreeConstructor',
    'css!' + window.ctx + '/bower_components/ztree_v3/css/zTreeStyle/zTreeStyle.css',
    'ztree',
    'ztree_check'
], function (angular, GillionTreeConstructor) {
    angular.module('GillionTreeModule', [], ['$compileProvider', function ($compileProvider) {
        $compileProvider.directive("gTree", GillionTreeConstructor);
        GillionTreeConstructor.$inject = ['$http'];
    }]);
});