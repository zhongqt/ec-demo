/**
 * Created by linxh on 2015/5/29.
 */
define('framework/message/GillionMessageModule', [
    'angular',
    'framework/control/GillionMessageDirectiveConstructor',
    'framework/control/GillionDropDownDirectiveConstructor',
    'framework/message/GillionMessageServiceConstructor',
    'framework/control/GillionRadiosConstructor'

], function (angular, GillionMessageDirectiveConstructor,GillionDropDownDirectiveConstructor,GillionMessageServiceConstructor,GillionRadiosConstructor) {
    var GillionMessageModule = angular.module('GillionMessageModule', [], ['$compileProvider', function ($compileProvider) {
        $compileProvider.directive('gMessage', GillionMessageDirectiveConstructor);
        $compileProvider.directive('gDropdown', GillionDropDownDirectiveConstructor);
        $compileProvider.directive('gRadio',GillionRadiosConstructor);
    }]);
    GillionMessageModule.controller('DropdownController',["$scope",function($scope){
        $scope.roles = [
            {roleId: 1, roleName: '管理员'},
            {roleId: 2, roleName: '数据录入员'},
            {roleId: 3, roleName: '普通用户'}
        ];
        $scope.addEle = function(){
            var roleId=prompt("请输入角色id","4");
            var roleName=prompt("请输入角色名","超级用户");
            $scope.roles.push({roleId:roleId,roleName:roleName});
        };
    }]);
    GillionMessageModule.service('GillionMessageService',GillionMessageServiceConstructor);
    return GillionMessageModule;
})
