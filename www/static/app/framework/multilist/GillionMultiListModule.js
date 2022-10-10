define('framework/multilist/GillionMultiListModule', [
    'angular',
    "framework/datasource/DataSourceModule",
    'framework/multilist/GillionMultiListDirectiveConstructor'

], function (angular,DataSourceModule,GillionMultiListDirectiveConstructor ) {
        var myModule = angular.module('GillionMultiListModule',  ['DataSourceModule'], ['$compileProvider', function ($compileProvider) {
        $compileProvider.directive('gMultiList', GillionMultiListDirectiveConstructor);

    }]);
    return myModule;
});