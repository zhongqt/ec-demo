define([
  'angular',
  'ds',
  'framework/datasource/DataSourceModule',
  'framework/hotTable/HotTableModule',
  'framework/pagination/GillionPaginationModule',
  'framework/date/DateModule',
  'framework/dropdown/GillionDropdownModule',
  'framework/associate/GillionAssociateModule'], function (angular, ds) {
  angular.module('angularTestMudule', [
    'DataSourceModule',
    'HotTableModule',
    'GillionPaginationModule',
    'DateModule',
    'GillionDropdownModule',
    'GillionAssociateModule']).
    controller('myCtrl', function ($scope, $dataSourceManager, Arrays, $http) {
      var student = ds.QStudent
      var teacher = ds.QTeacher

      $scope.query = function () {
        $dataSourceManager.dataSources['studentSource'].doRequestData()
      }
      $scope.params = function () {
      }

      $scope.empGridSuccess = function (grid, source) {
        $scope.gridInstance = grid
      }

      $scope.delete = function () {
        var ids = Arrays.extract(
          $scope.gridInstance.getCheckedRows(),
          'studentId')
        student.deleteById(ids).then(function () {
          $scope.query()
        })
      }

      $scope.studentDataProvider = function () {
        var params = this.requestParams
        var studentsTeacherName = student.teacher.chain(teacher.teacherName)
        return student.select(
          student.fieldContainer().append(studentsTeacherName)).
          where(studentsTeacherName.
            _like$_(params.teacherName)).
          paging(params.currentPage, params.pageSize).
          execute()
      }

      $scope.teacherDataProvider = function () {
        var params = this.requestParams
        return teacher.select().
          where(teacher.teacherName.
            _like$_(params.keyword)).
          paging(params.currentPage, params.pageSize).
          execute()
      }
    })
})