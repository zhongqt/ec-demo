/**
 * Created with IntelliJ IDEA.
 * User: zhengry
 * Date: 2014/11/6
 * Time: 16:42
 */
define([
    'require',
    'angular',
    'framework/commonsModules',
    'system/user/UserModule',
    'test/TestModule',
    'system/user/UserController'
    ], function (require, angular, commonsModules) {
    // Utils 、 ExceptionHandler 、 RestfulResource 是公用模块， 默认导入
    /*angular.mockData= {
     dir: 'mock'
     };*/

    commonsModules = commonsModules.concat('UserModule')
    angular.bootstrap(document, commonsModules.concat('TestModule'));

});