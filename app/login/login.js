'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'loginCtrl'
  });
}])

.controller('loginCtrl', function($scope,$http) {
      $scope.user = {
        Number:'14631818',
        Password:'123'
      }
      $scope.login = function() {
          //alert('33');
        $http.get('http://huyugui.eicp.net:4343/manage_login', {
          params: {
            Number:$scope.user.Number,
            Password:$scope.user.Password
          }
        })
            .success(function (data) {
              if(data === "请输入正确的信息"){
                  alert(data)
              }else{
                  alert('登录成功')
              }
            })
      };
});