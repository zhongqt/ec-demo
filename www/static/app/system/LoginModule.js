define(['angular'], function (angular) {
    return angular.module('LoginModule', [])
        .controller('LoginController', function ($scope,$http) {
            $scope.loginUser = {};
             $scope.login = function () {
                 $http.post('/ec-demo/users/login',$scope.loginUser)
                     .success(function (data) {
                         if (data.success){
                             window.location.href = '/html/test/studentList'
                         }
                     })
            };
            $scope.logout = function () {
                $http.get('/ec-demo/users/logout')
                    .success(function () {
                        alert("注销成功");
                    })
            }
        });
})