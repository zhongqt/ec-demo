define([
  'angular',
  'ds',
  'framework/dropdown/GillionDropdownModule',
  'framework/datasource/DataSourceModule',
  'framework/associate/GillionAssociateModule',
  'framework/date/DateModule',
    'framework/uploader/UploadGroupModule',
  'framework/msg/GillionMsgModule'], function (angular, ds) {
  angular.module('StudentEditModule', [
    'DateModule',
    'GillionDropdownModule',
    'DataSourceModule',
    'GillionAssociateModule',
    'UploadGroupModule',
    'GillionMsgModule']).
    controller('StudentEditController',
      function ($scope, $http, Resource, GillionMsg, GillionMsgService) {
        var student = ds.QStudent
        var teacher = ds.QTeacher

        var studentRecord = GillionMsgService.getInputData()
        $scope.teacher = {
          'teacherId': studentRecord.teacherId,
          'teacherGender': studentRecord.teacherGender,
          'teacherName': studentRecord.teacherName,
        }
        $scope.student = studentRecord

        $scope.saveStudent = function () {
          $scope.student.rowStatus = ds.RowStatusEnum.ROW_STATUS_MODIFIED;
          console.log($scope.fileInfos.length)
            if($scope.fileInfos.length!==0){
                $scope.student.fileKey=$scope.fileInfos[0].fileKey
            }

            student.save($scope.student).then(function (data) {
            GillionMsgService.setOutputData(data)
            GillionMsgService.close()
          })
        }

        $scope.teacherDataProvider = function () {
          var params = this.requestParams
          return teacher.select().
            where(teacher.teacherName.
              _like$_(params.keyword)).
            paging(params.currentPage, params.pageSize).
            execute()
        }
          $http.get('/ec-demo/cloud/filesystem/getFileInfos', {
              params: {
                  fileKeys: [$scope.student.fileKey]
              }
          }).success(function (fileInfos) {
              $scope.fileInfos= fileInfos;
          });
          $scope.myBeforeUpload=function (fileInfo) {
              alert("确认 上传"+fileInfo.name+"吗？");

          }
          $scope.myBeforeDelete=function (fileInfo){
              alert("确认删除"+fileInfo.name+"吗？");
          }
      })
})