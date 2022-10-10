/**
 * Created by linxh on 2015/5/29.
 */
define('framework/snapshot/GillionSnapshotModule', [
    'angular',
    'framework/snapshot/GillionSnapshotDirectiveConstructor',
    'framework/snapshot/GillionLocationServiceConstructor'

], function (angular,GillionSnapshotDirectiveConstructor,GillionLocationServiceConstructor) {
    var GillionSnapshotModule = angular.module('GillionSnapshotModule', [], ['$compileProvider', function ($compileProvider) {
        $compileProvider.directive('gSnapshot',GillionSnapshotDirectiveConstructor);
    }]);
    GillionSnapshotModule.service('GillionLocationService',GillionLocationServiceConstructor);
    return GillionSnapshotModule;
})
