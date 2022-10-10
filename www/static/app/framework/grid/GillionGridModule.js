define('framework/grid/GillionGridModule', [
    'angular',
    'framework/grid/GillionGridDirectiveConstructor',
    'framework/grid/GillionGridCellDirectiveConstructor',
    'framework/grid/GillionPaginationDirectiveConstructor'
], function (angular, GillionGridDirectiveConstructor, GillionGridCellDirectiveConstructor, GillionPaginationDirectiveConstructor) {
    return angular.module('GillionGridModule', [], ['$compileProvider', function ($compileProvider) {
        $compileProvider.directive('gGrid', GillionGridDirectiveConstructor);
        $compileProvider.directive('gGridCell', GillionGridCellDirectiveConstructor);
        $compileProvider.directive('gPagination', GillionPaginationDirectiveConstructor);
    }]);
})