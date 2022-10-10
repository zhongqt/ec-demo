define([
  'angular',
  'ds',
  'framework/dropdown/GillionDropdownModule',
  'framework/datasource/DataSourceModule',
  'framework/associate/GillionAssociateModule',
  'framework/date/DateModule',
  'framework/msg/GillionMsgModule'], function (angular, ds) {

  angular.module('ExportModule', [
    'DateModule',
    'GillionDropdownModule',
    'DataSourceModule',
    'GillionAssociateModule',
    'GillionMsgModule']).
  controller('ExportController',
    function ($scope, GillionMsg) {

      var waybillFee = ds.QWaybillFee
      var waybillInfo = ds.QWaybillInfo
      var dsc = ds.client


      $scope.export = function () {
        dsc.withModel(waybillInfo)
          .forExport(waybillInfo.collectEmployeeMobile,
            waybillInfo.consigneeCname,
            waybillInfo.consigneeMobile,
            waybillInfo.deliveryAreaCode,
            waybillInfo.collectEmployeeCname,
            waybillInfo.shipperMobile,
            waybillInfo.productTypeCode,
            waybillInfo.collectDatetime,
            waybillInfo.shipperCname,
            waybillInfo.sendAreaCode,
            waybillInfo.sendAddressDetail,
            waybillInfo.deliveryAddressDetail,
            waybillInfo.waybillFee.chain(waybillFee.totalFreight),
            waybillInfo.waybillFee.chain(waybillFee.weight),
            waybillInfo.waybillFee.chain(waybillFee.insuranceFee),
            waybillInfo.waybillFee.chain(waybillFee.volume))
          .async(false)
          .where(waybillInfo.consigneeCname.like$("赵%"))
          .sorting(waybillInfo.collectDatetime.desc())
          .tag("export_waybill_info")
          .execute(this.callable);
      }

      $scope.import = function () {
        dsc.forImport()
          .tag("import_waybill_info_test")
          .execute(this.onFileUploadOk, this.onFileUploadFail);
      }

      $scope.onFileUploadOk = function(data) {
        GillionMsg.alert("导入成功", JSON.stringify(data, null, 4))
      }

      $scope.onFileUploadFail = function(data) {
        GillionMsg.alert("导入失败", JSON.stringify(data, null, 4))
      }
    })
})