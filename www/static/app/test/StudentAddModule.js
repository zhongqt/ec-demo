define([
  'angular',
  'ds',
  'framework/dropdown/GillionDropdownModule',
  'framework/datasource/DataSourceModule',
  'framework/associate/GillionAssociateModule',
  'framework/date/DateModule',
  'framework/msg/GillionMsgModule'], function (angular, ds) {

  angular.module('StudentAddModule', [
    'DateModule',
    'GillionDropdownModule',
    'DataSourceModule',
    'GillionAssociateModule',
    'GillionMsgModule']).
    controller('StudentAddController',
      function ($scope, GillionMsg) {

        var student = ds.QStudent
        var teacher = ds.QTeacher

/*
       $scope.teacherDataProvider = function () {
          var params = this.requestParams;

          return teacher.select()
            .where(teacher.teacherName.like$(params.teacherName))
            .execute();
        }
*/

        $scope.saveStudent = function () {
            var data=$scope.student
            console.log(data)
            data.teacherId=1555102124839124994
          $scope.student.rowStatus = ds.RowStatusEnum.ROW_STATUS_ADDED
          student.save(data).
            then(function () {
              GillionMsg.alert(null,"保存成功！");
              // window.location.href = '/html/test/studentList.html'
            })
        }

          $scope.teacherDataProvider = function () {
              var params = this.requestParams
              console.log($scope.student.sex)
              var teacherSex1=""
              if($scope.student.sex==='0'){
                  teacherSex1='男'
              }else if($scope.student.sex==='1'){
                  teacherSex1='女'
              }
              console.log(teacherSex1)
              return teacher.select().
              where(teacher.teacherName.
              _like$_(params.keyword.substring(params.keyword.lastIndexOf("，")+1)).and(teacher.sex.eq$(teacherSex1))).
              paging(params.currentPage, params.pageSize).
              execute()
          }




      })
})