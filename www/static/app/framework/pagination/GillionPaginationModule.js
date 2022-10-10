define('framework/pagination/GillionPaginationModule', [
    'angular',
    "framework/datasource/DataSourceModule",
    "framework/snapshot/GillionLocationServiceConstructor",
    'framework/pagination/GillionPaginationNaviDirectiveConstructor',
    'framework/pagination/GillionPaginationSizeDirectiveConstructor',
    'framework/pagination/GillionPaginationPageDirectiveConstructor',
    'framework/pagination/GillionPaginationSimpleDirectiveConstructor',
], function (angular, DataSourceModule, GillionLocationServiceConstructor, GillionPaginationNaviDirectiveConstructor, GillionPaginationSizeDirectiveConstructor, GillionPaginationPageDirectiveConstructor, GillionPaginationSimpleDirectiveConstructor) {
    var myModule = angular.module('GillionPaginationModule', ['DataSourceModule'], ['$compileProvider', function ($compileProvider) {
        $compileProvider.directive('gPaginationNavi', GillionPaginationNaviDirectiveConstructor);
        $compileProvider.directive('gPaginationSize', GillionPaginationSizeDirectiveConstructor);
        $compileProvider.directive('gPaginationPage', GillionPaginationPageDirectiveConstructor);
        $compileProvider.directive('gPaginationSimple', GillionPaginationSimpleDirectiveConstructor);
        //GillionTextSearchDirectiveConstructor.$inject = [  '$parse','$dataSourceManager', '$timeout', '$document'];

    }]);
    myModule.service('GillionLocationService', GillionLocationServiceConstructor);
    return myModule;
});