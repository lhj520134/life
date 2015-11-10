/**
 * Created by fish on 15/10/29.
 */
angular.module('myApp.import', ['ngRoute', 'cipchk', 'NewfileDialog', 'datePicker', 'angularModalService', 'ngFileUpload', 'cgBusy', 'ngRoute', 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav', 'ui.grid.treeView', 'ui.grid.selection', 'ui.grid.pagination'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/import', {
            templateUrl: 'import/import.html',
            controller: 'importCtrl'
        });
    }])
    .controller('importCtrl', function ($scope, $http, fileDialog, Upload) {

        var vm = this;
        vm.gridOptions = {};

        $scope.Message = {
            CollegeId: '',
            ProfessionId: '',
            ClassId: window.localStorage['ClassId'],
            TeacherId: window.localStorage['TeacherId']
        }

        $scope.yuan = '';
        $scope.ye = '';

        $scope.changePortait = function () {
            fileDialog.openFile(function (e) {

                var files = e.target.files;
                $scope.myPromise = Upload.upload({
                    url: 'http://172.16.20.110:3000/UploadExcel',
                    fields: {'postImg': 'default'},
                    file: files[0]
                })
                    .progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                        if (progressPercentage === 100) {
                            alert("导入成功" + evt.config.file.name);
                        }

                    }).success(function (data, status, headers, config) {

                    }).error(function (data, status, headers, config) {
                        console.log('error status: ' + status);
                    })
            });
        }

        $http.get('http://172.16.20.110:3000/ChooseCollege', {}).success(function (data) {
            $scope.yuan = data
        }).error(function (data) {

        }).finally(function () {

        });

        $scope.change = function (e) {
            $http.get('http://172.16.20.110:3000/ChooseProfession', {params: {CollegeId: e}})
                .success(function (data) {
                    $scope.ye = data;
                }).error(function (data) {

                }).finally(function () {

                });
        }

        $scope.send = function () {
            if ($scope.Message.CollegeId === '') {
                alert("请选择学院")
            } else if ($scope.Message.ProfessionId === '') {
                alert("请选择专业")
            } else {
                $http.post('http://172.16.20.110:3000/AddStudentIntoDB', $scope.Message)
                    .success(function (data) {
                        alert("保存成功")
                    }).error(function (data) {

                    }).finally(function () {

                    });
            }
        }
    })


