(function () {
    define('framework/datatree/GillionDataTreeModule', [
        'angular',
        'framework/datatree/GillionDataTreeDirectiveConstructor',
        'framework/datatree/DataTreeDirective',
        'framework/datatree/TreeNodeDirective',
        'framework/datatree/TreeNodesDirective',
        'framework/datatree/DataTreeHelper',
        'framework/datatree/DataTreeManagerService',
        'framework/datasource/DataSourceModule'
    ], function (angular,GillionDataTreeDirectiveConstructor,DataTreeDirective, TreeNodeDirective, TreeNodesDirective, DataTreeHelper,DataTreeManagerService) {
        var GillionDataTreeModule = angular.module('GillionDataTreeModule', ['DataSourceModule']);
        GillionDataTreeModule.service('$treeHelper',DataTreeHelper);
        GillionDataTreeModule.directive('gDataTree', DataTreeDirective);
        //GillionDataTreeModule.directive('gDataTree', GillionDataTreeDirectiveConstructor);
        GillionDataTreeModule.directive('treeNode', TreeNodeDirective);
        GillionDataTreeModule.directive('treeNodes', TreeNodesDirective);
        GillionDataTreeModule.service("$dataTreeManager", DataTreeManagerService);
        return GillionDataTreeModule;
    })
})();
