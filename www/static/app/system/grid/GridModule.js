define([
    'angular',
    'system/grid/GridControllerConstructor',
    'framework/grid/GillionGridModule'
], function (angular, GridControllerConstructor) {
     return angular
        .module('GridModule', ['GillionGridModule'])
        .controller('GridController', function ($scope) {

             $scope.employeeColumns=[
                 {
                     header: "姓名",
                     data: 'name'
                 },{
                     header: "年龄",
                     data: 'age'
                 },{
                     header: "电子邮箱",
                     data: 'email'
                 },{
                     header: "移动电话",
                     data: 'mobile'
                 }
             ];

             $scope.GridColumns = [
                 {
                     header: "编号",
                     data: 'id'
                 },
                 {
                     header: "姓名",
                     data: 'name'
                 }, {
                     header: "性别",
                     data: 'sex',
                     filters: 'sexToCn'
                 }, {
                     header: '电话',
                     data: 'telephone'
                 }, {
                     header: '生日',
                     data: 'dateTime',
                     filters: 'date:\'yyyy-MM-dd\''
                 }, {
                     header: '操作',
                     template: '<a ng-click="grid.actions.edit(row)" ng-if="row.checked">编辑</a>'
                 }];
             $scope.grids = [
                 {
                     "id": 1,
                     "name": "liaowj",
                     "age": 26,
                     "sex": "male",
                     "tel": "18659297460",
                     "birthDay": 1420353337104
                 },
                 {
                     "id": 2,
                     "name": "zhangs",
                     "age": 18,
                     "sex": null,
                     "tel": "12345678901"
                 },
                 {
                     "id": 3,
                     "name": "lis",
                     "age": 15,
                     "sex": "male",
                     "tel": "18478415474"
                 },
                 {
                     "id": 4,
                     "name": "wangw",
                     "age": 48,
                     "sex": "male",
                     "tel": "48798187487"
                 },
                 {
                     "id": 5,
                     "name": "zhaol",
                     "age": 24,
                     "sex": "female",
                     "tel": "15487921474"
                 },
                 {
                     "id": 6,
                     "name": "chenq",
                     "age": 34,
                     "sex": "female",
                     "tel": "1547856141"
                 },
                 {
                     "id": 7,
                     "name": "zhoub",
                     "age": 94,
                     "sex": "male",
                     "tel": "4877848745"
                 }
             ];
             $scope.search = function () {
                 $scope.gridApi.allChecked = true;
                 $scope.gridApi.toggleAll();//全选
             };
             $scope.rowClick = function (row) {
                 alert(row);//获取行对象
             };
             $scope.nextPage = function () {

             };
         });
});