'use strict';

angular.module('myApp.course', ['ngRoute','NewfileDialog', 'datePicker', 'angularModalService', 'ngFileUpload', 'cgBusy', 'ngRoute', 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav', 'ui.grid.treeView', 'ui.grid.selection', 'ui.grid.pagination'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/course', {
            templateUrl: 'course/course.html',
            controller: 'courseCtrl'
        });
    }])

    .controller('courseCtrl', function($scope,$http,ModalService,$filter) {
        var paginationOptions = {
            pageNumber: 1,
            pageSize: 25,
            totalPage: 1
        };
        $scope.College = '';
        $scope.Profession = '';
        $scope.Classes ='';
        $scope.teacher = '';
        $scope.Message = '';


        $scope.delDoctor = function (entity) {
            //
            //

            $scope.myPromise = $http.put(URL+'updateSignIn', {ClassId: window.localStorage['DeleteId'],old_BeginSubjectDate:entity.BeginSubjectDate,new_BeginSubjectDate:entity.new_BeginSubjectDate,new_EndSubjectDate:entity.new_EndSubjectDate}).success(function (data) {
                //

                        alert("yes")

            }).error(function (data) {

            });
            //
        }

        $scope.gridOptions = {
            paginationPageSizes: [20, 50, 75],
            paginationPageSize: 25,
            //enableCellEditOnFocus: true,
            showColumnFooter: true,
            useExternalPagination: true,
            columnDefs: [
                {
                    name: '课程名',
                    field: 'SubjectName',
                    disabled: true
                },
                {
                    name: '开始时间',
                    cellTemplate: '<input style="ime-mode: disabled"  width="100%" height="30" ng-model="row.entity.BeginSubjectDate" ">'
                },
                {
                    name: '修改开始时间',
                    cellTemplate: '<input type="datetime" width="100%" height="30" ng-model="row.entity.new_BeginSubjectDate" ">'
                },

                {
                    name: '结束时间',
                    field: 'EndSubjectDate'
                },
                {
                    name: '修改结束时间',
                    cellTemplate: '<input type="datetime" width="100%" height="30" ng-model="row.entity.new_EndSubjectDate" ">'
                },
                {
                    name: '调课',
                    cellTemplate: '<a ng-if="row.entity.$$treeLevel != 0" class="btn" ng-click="$event.stopPropagation();grid.appScope.delDoctor(row.entity)">修改</a>'
                }



            ],
            onRegisterApi: function (gridApi) {

                gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
                    rowEntity[colDef.field] = newValue;
                    //updateDoctor(rowEntity);
                });
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    if (paginationOptions.pageSize != pageSize) {
                        paginationOptions.pageNumber = 1;
                        paginationOptions.pageSize = pageSize;
                    } else {
                        paginationOptions.pageNumber = newPage;
                    }
                    loaction();
                });
            }
        }




        $scope.myPromise = $http.get(URL+'ViewCollege', {}).success(function (data) {
            $scope.College = data
        }).error(function (data) {
            alert("服务器错误")
        }).finally(function () {

        });
        $scope.change = function (e) {

            $scope.myPromise = $http.get(URL+'ViewProfession', {params: {CollegeId: e}})
                .success(function (data) {
                    $scope.Profession = data;
                }).error(function (data) {

                }).finally(function () {

                });
        }
        $scope.change1 = function (e) {
            console.log($scope.Message.ProfessionId)
            $scope.myPromise = $http.get(URL+'ViewClasses', {params: {ProfessionId: e}})
                .success(function (data) {
                    $scope.Classes = data;
                }).error(function (data) {

                }).finally(function () {

                });
        }
        $scope.change2 = function (e) {
            window.localStorage['DeleteId'] = e;
            console.log($scope.Message.ClassId)
            $scope.myPromise = $http.get(URL+'getTeacher', {params: {ClassId: e}})
                .success(function (data) {
                    $scope.teacher = data;
                }).error(function (data) {

                }).finally(function () {

                });
        }
        $scope.change3 = function (e) {

            console.log($scope.Message.teacher)
            $scope.myPromise = $http.get(URL+'getTeacherSubject', {params: {ClassId: window.localStorage['DeleteId'] ,TeacherName:e}})
                .success(function (data) {
                    $scope.gridOptions.data = data;
                    $scope.gridOptions.data.forEach(function (e) {
                        e.BeginSubjectDate = $filter('date')(e.BeginSubjectDate, 'yyyy-MM-dd HH:mm:ss');
                        e.EndSubjectDate = $filter('date')(e.EndSubjectDate, 'yyyy-MM-dd HH:mm:ss');
                    })

                }).error(function (data) {

                }).finally(function () {

                });
        }


    })
