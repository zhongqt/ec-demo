// Generated by CoffeeScript 1.9.3
(function() {
    define('framework/combotree/GillionComboTreeModule', [
        'angular',
        'framework/combotree/GillionComboTreeDirectiveConstructor',
        'framework/snapshot/GillionLocationServiceConstructor',
        'framework/datasource/DataSourceModule'
    ],function (angular,GillionComboTreeDirectiveConstructor,GillionLocationServiceConstructor) {
        var GillionComboTreeModule = angular.module('GillionComboTreeModule', ['DataSourceModule']);
        GillionComboTreeModule.directive('gComboTree',GillionComboTreeDirectiveConstructor);
        GillionComboTreeModule.service('GillionLocationService',GillionLocationServiceConstructor);
        return GillionComboTreeModule;
    })
})(this)