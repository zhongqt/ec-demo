define('framework/associate/AssociateModule', [
    'angular',
    'framework/associate/AssociateDirectiveConstructor',
    'framework/associate/GridCellDirectiveConstructor',
    'css!../../../css/associate.css'
], function (angular, AssociateDirectiveConstructor, GridCellDirectiveConstructor) {
    return angular.module('AssociateModule', [], ['$compileProvider', function ($compileProvider) {

        $compileProvider.directive('gAssociate', AssociateDirectiveConstructor);
        AssociateDirectiveConstructor.$inject = ['$compile', '$http', '$parse', '$timeout', '$filter'];

        $compileProvider.directive('gAssociateGridCell', GridCellDirectiveConstructor);
        GridCellDirectiveConstructor.$inject = ['$compile'];
    }]);
});