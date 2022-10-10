define('framework/textsearch/GillionTextSearchModule', [
    'angular',
    'framework/textsearch/GillionTextSearchDirectiveConstructor',
    'framework/msg/GillionMsgModule'

], function (angular, GillionTextSearchDirectiveConstructor) {
        var myModule = angular.module('GillionTextSearchModule',  ['GillionMsgModule'], ['$compileProvider', function ($compileProvider) {
        $compileProvider.directive('gTextSearch', GillionTextSearchDirectiveConstructor);
            //GillionTextSearchDirectiveConstructor.$inject = [  '$parse','$dataSourceManager', '$timeout', '$document','GillionMsg'];

    }]);
    return myModule;
});