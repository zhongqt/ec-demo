define(['angular',
        'framework/dropdown/GillionDropdownModule'],function(angular){
    angular.module('i18nModule',['GillionDropdownModule'])
        .controller('i18nController',function ($scope) {

            $scope.selectItem = function () {
                localStorage.setItem('locale',$scope.currentLanguage);
            }
            $scope.login = function () {
                window.location.href = '/html/test/studentList'
            }

        })
})