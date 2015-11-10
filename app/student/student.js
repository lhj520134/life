/**
 * Created by yuguihu on 15/7/23.
 */
angular.module('myApp.student', ['ngRoute', 'ui.grid', 'ui.grid.treeView', 'ui.grid.selection', 'ui.grid.pagination'])

    .config(['$routeProvider', function ($routeProvider, $http) {
        $routeProvider.when('/student', {
            templateUrl: 'student/student.html',
            controller: 'studentCtrl'
        });
    }])
    .controller('studentCtrl', function ($scope, $http) {
        //
        $scope.Message = {
            CollegeId: '',
            ProfessionId: '',
            ClassId: '',
            TeacherId: window.localStorage['TeacherId']
        }
        $scope.College = '';
        $scope.Profession = '';
        $scope.Classes ='';
        $scope.Student ='';

        var paginationOptions = {
            pageNumber: 1,
            pageSize: 25,
            totalPage: 1
        };

        $scope.gridOptions = {
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            enableCellEditOnFocus: true,
            showColumnFooter: true,
            useExternalPagination: true,
            columnDefs: [
                {
                    name: '学号',
                    field: 'Number',
                    footerCellTemplate: '<div class="ui-grid-cell-contents" ng-click="" ><a ng-click=" $event.stopPropagation();grid.appScope.add()">增加</a></div>'
                },
                {
                    name: '姓名',
                    field: 'StudentName',
                    footerCellTemplate: '<div class="ui-grid-cell-contents" ng-click="" ><a ng-click=" $event.stopPropagation();grid.appScope.add()">增加</a></div>'
                },

                {
                    name: '头像',
                    field: 'Photo'
                },
                {
                    name: '性别',
                    field: 'Sex'

                },
                {
                    name: '删除',
                    cellTemplate: '<a ng-if="row.entity.$$treeLevel != 0" class="btn" ng-click="$event.stopPropagation();grid.appScope.delDoctor(row.entity)">删除</a>'
                }

            ],
            onRegisterApi: function (gridApi) {

                gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
                    rowEntity[colDef.field] = newValue;
                    updateDoctor(rowEntity);
                });
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    if (paginationOptions.pageSize != pageSize) {
                        paginationOptions.pageNumber = 1;
                        paginationOptions.pageSize = pageSize;
                    } else {
                        paginationOptions.pageNumber = newPage;
                    }

                });
            }
        }

        $http.get('http://172.16.20.110:3000/ViewCollege', {}).success(function (data) {
            $scope.College = data
        }).error(function (data) {

        }).finally(function () {

        });
        $scope.change = function (e) {
            console.log($scope.Message.CollegeId)
            $http.get('http://172.16.20.110:3000/ViewProfession', {params: {CollegeId: e}})
                .success(function (data) {
                    $scope.Profession = data;
                }).error(function (data) {

                }).finally(function () {

                });
        }
        $scope.change1 = function (e) {
            console.log($scope.Message.ProfessionId)
            $http.get('http://172.16.20.110:3000/ViewClasses', {params: {ProfessionId: e}})
                .success(function (data) {
                    $scope.Classes = data;
                }).error(function (data) {

                }).finally(function () {

                });
        }
        $scope.change2 = function (e) {
            console.log($scope.Message.ClassId)
            $http.get('http://172.16.20.110:3000/ViewStudents', {params: {ClassId: e}})
                .success(function (data) {
                    $scope.gridOptions.data = data;
                }).error(function (data) {

                }).finally(function () {

                });
        }

        //
    })