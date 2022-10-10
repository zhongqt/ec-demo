/**
 * Created by yanpp on 15-2-9.
 */
define("framework/comboPort/ComboPortModule",[
        'angular',
        'framework/comboPort/ComboPortDirectiveConstructor',
        "css!../../../css/comboPort.css"
    ],
    function(angular,ComboPortDirectiveConstructor){
        return angular.module("ComboPortModule",[],["$compileProvider",function($compileProvider){
            $compileProvider.directive("gComboPort",ComboPortDirectiveConstructor);
            ComboPortDirectiveConstructor.$inject=['$http', '$parse', '$timeout','$compile'];
        }]);


});