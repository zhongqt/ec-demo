/**
 * Created by yanpp on 15-2-9.
 */
define([
    'angular',
    'framework/comboPort/NewComboPortDirectiveConstructor',
    'framework/comboPort/NewPortGridCellDirectiveConstructor',
    "css!../../../css/comboPort.css"
], function (angular, NewComboPortDirectiveConstructor, NewPortGridCellDirectiveConstructor) {
    return angular.module("NewComboPortModule", [], ["$compileProvider", function ($compileProvider) {
        $compileProvider.directive("gNewComboPort", NewComboPortDirectiveConstructor);
        NewComboPortDirectiveConstructor.$inject = ['$compile', '$http', '$parse', '$timeout', '$filter'];
        $compileProvider.directive('gPortGridCell', NewPortGridCellDirectiveConstructor);
        NewPortGridCellDirectiveConstructor.$inject = ['$compile'];
    }]);
});