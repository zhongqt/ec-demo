define('framework/associate/GillionAssociateModule', [
    'angular',
    'framework/associate/GillionAssociateDirectiveConstructor',
    'framework/associate/GillionAssociateColumnDirectiveConstructor',
    'framework/associate/AssociateSettingServiceConstructor',
    'framework/databind/GillionDataBindDirectiveConstructor',
    'framework/snapshot/GillionLocationServiceConstructor',
    'framework/associate/GillionRepeatFinishDirectiveConstructor',
    'framework/datasource/DataSourceModule',
    'framework/tabindex/TabindexModule',
    'framework/msg/GillionMsgModule',
    'angular-underscore'
], function (angular, GillionAssociateDirectiveConstructor, GillionAssociateColumnDirectiveConstructor, AssociateSettingServiceConstructor,
             GillionDataBindDirectiveConstructor, GillionLocationServiceConstructor, GillionRepeatFinishDirectiveConstructor) {
    var myModule = angular.module('GillionAssociateModule', ['DataSourceModule', 'TabindexModule', 'GillionMsgModule'], ['$compileProvider', function ($compileProvider) {
        $compileProvider.directive('gAssociateColumn', GillionAssociateColumnDirectiveConstructor);
        $compileProvider.directive('gAssociate', GillionAssociateDirectiveConstructor);
        $compileProvider.directive('gDataBind', GillionDataBindDirectiveConstructor);
        $compileProvider.directive('gRepeatFinish', GillionRepeatFinishDirectiveConstructor);

        //GillionAssociateDirectiveConstructor.$inject = ['$compile', '$dataSourceManager', '$parse', '$timeout', '$filter','$document','$tabindex'];

    }]);
    myModule.service('GillionLocationService', GillionLocationServiceConstructor);
    myModule.service('AssociateSettingService', AssociateSettingServiceConstructor);
    return myModule;
});