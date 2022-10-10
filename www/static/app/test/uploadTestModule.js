define(['angular',
    'framework/uploader/UploadGroupModule'],function(angular){
    angular.module('uploadTestModule',['UploadGroupModule'])
        .controller('uploadTestController',function ($scope,$http) {
            $http.get('/ec-demo/cloud/filesystem/getFileInfos', {
                params: {
                    fileKeys: ["dc0884efa5964d0baace5300d1235f78"]
                }
            }).success(function (fileInfos) {
                $scope.fileInfos= fileInfos;
            });
            $scope.myBeforeUpload=function (fileInfo,uploaderStrategy) {
                alert("确认上传"+fileInfo.name+"吗？");

            }
            $scope.myBeforeDelete=function (fileInfo){
                alert("确认删除"+fileInfo.name+"吗？");
            }

        })
})