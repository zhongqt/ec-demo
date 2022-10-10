define([
  'angular',
  'ds',
  'underscore',
  'framework/dropdown/GillionDropdownModule',
  'framework/datasource/DataSourceModule',
  'framework/hotTable/HotTableModule',
  'framework/pagination/GillionPaginationModule',
  'framework/associate/GillionAssociateModule',
  'framework/date/DateModule'], function (angular, ds, _) {
  var app = angular.module('studentListModule', [
    'GillionDropdownModule',
    'DataSourceModule',
    'HotTableModule',
    'GillionPaginationModule',
    'GillionAssociateModule',
    'DateModule'])
  app.controller('studentListController',
    function ($scope, $dataSourceManager, $http, Arrays, GillionMsg) {
      var student = ds.QStudent
      var teacher = ds.QTeacher

    var currentPage=1
        var pageSize=10
        $scope.myExportFile=function (){

            dsc.withModel(student)
                .forExport(student.name,student.email,student.age,student.birthday,student.teacherId)
                .async(false)
                .paging(currentPage,pageSize)
                .tag("export_test1")
                .execute(this.callable);
        }
        $scope.myImport = function () {
            dsc.forImport()
                .tag("import_student_list")
                .execute(this.onFileUploadOk, this.onFileUploadFail);
        }
      $scope.testParams = function () {
      }

      $scope.query = function () {
        $dataSourceManager.dataSources['source1'].doRequestData()
      }

      //页面初始化后获取表格对象
      $scope.empGridSuccess = function (grid, source) {
        $scope.gridInstance = grid
      }

      //双击进入编辑状态：grid.startEdit(physicalRow, field)
      $scope.onRowDbClick = function (physicalRow, field) {
        $scope.gridInstance.startEdit(physicalRow, field)
      }
      $scope.onFileUploadOk  =function (data) {

        //alert(JSON.stringify(data, null, 4));
        console.log(data)

        $scope.query()

      }
      //grid.getModifiedRecords() 获取所有修改行集
      $scope.update = function () {
        $scope.gridInstance.finishEdit().then(function () {
          let modifiedRecords = $scope.gridInstance.getModifiedRecords()
          _.each(modifiedRecords, function (record) {
            record.rowStatus = ds.RowStatusEnum.ROW_STATUS_MODIFIED
          })
          student.save(modifiedRecords).then(function () {
            $scope.gridInstance.clearModifedInfo()
            $dataSourceManager.dataSources['source1'].doRequestData()
          })
        })
      }

      $scope.delete = function () {
        var ids = Arrays.extract($scope.gridInstance.getCheckedRows(),
          'id')
        student.deleteById(ids).
          then(function () {
            //删除后刷新数据源，表格里重新显示最新的学生列表信息
            $dataSourceManager.dataSources['source1'].doRequestData()
          })
      }

      //显示编辑界面
      $scope.showEditForm = function () {
        var row = $scope.gridInstance.getCheckedRows()
        if (row.length > 0) {
          if (row.length === 1) {
            var student = row[0]
            $scope.dialog = GillionMsg.showUrl({
              title: '编辑',
              url: 'studentEdit',
              data: student,
              width: 750,
              height: 400,
              onClose: function (data) {
                console.log(data)
                $dataSourceManager.dataSources['source1'].doRequestData()
              },
            })

          } else {
            GillionMsg.alert('消息提示', '只能选择一行')
          }
        } else {
          GillionMsg.alert('消息提示', '请选择记录行')
        }
      }

      $scope.studentDataProvider = function () {
        var params = this.requestParams
          currentPage=params.currentPage
          pageSize=params.pageSize
        return student.select(
          student.fieldContainer().append(
            student.teacher.chain(teacher.teacherName).as('teacherName'),
          )).
          where(student.teacher.chain(teacher.teacherName).
            like$(params.teacherName)).
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
  app.filter('SexTransfer',function (){
    return function (sex){
      if(sex!=null)
        return sex===1?'女':'男'

    }
  })
})



