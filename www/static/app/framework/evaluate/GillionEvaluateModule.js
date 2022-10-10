/**
 * Created by yanpp on 15-3-3.
 */
define('framework/evaluate/GillionEvaluateModule', [
    'angular',
    'framework/evaluate/RatingDirectiveConstructor'
], function (angular, RatingDirectiveConstructor) {
    return angular.module('GillionEvaluateModule', [], ['$compileProvider', function ($compileProvider) {
        $compileProvider.directive('gRating', RatingDirectiveConstructor);

    }]);
});