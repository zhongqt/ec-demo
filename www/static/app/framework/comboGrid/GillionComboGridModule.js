/**
 * Created by liuqq on 14-12-5.
 */
define('framework/comboGrid/GillionComboGridModule', [
    'angular',
    'framework/comboGrid/GillionComboGridConstructor',
    'framework/comboGrid/GillionComboGridItemConstructor'
], function (angular, GillionComboGridConstructor, GillionComboGridItemConstructor) {
    return angular.module('GillionComboGridModule', [], ['$compileProvider', function ($compileProvider) {

        $compileProvider.directive('gComboGrid', GillionComboGridConstructor);
        GillionComboGridConstructor.$inject = ['$timeout', '$window', '$document', '$q', '$http'];

        $compileProvider.directive('gComboGridItem', GillionComboGridItemConstructor);
    }]);

});