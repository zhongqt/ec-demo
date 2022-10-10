define([
  'angular',
  'ds',
  'framework/date/DateModule'], function (angular, ds) {
  angular.module('EmployeeSaveModule', ['DateModule']).
    controller('EmployeeSaveController', function ($scope, Resource) {
      var employee = ds.QEmployee

      $scope.saveEmp = function () {
        $scope.EmployeeForm.verify().then(function () {
          var record = $scope.emp
          record.rowStatus = ds.RowStatusEnum.ROW_STATUS_ADDED
          employee.save(record).then(function (response) {
            if (response && response.data && response.data.success) {
              $scope.emp = response.data
            }
          })
        }).catch(function () {
          alert('校验不通过')
        })

      }
    })
})