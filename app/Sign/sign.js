/**
 * Created by fish on 15/10/23.
 */
'use strict';

angular.module('myApp.sign', ['ngRoute', 'NewfileDialog', 'datePicker', 'angularModalService', 'ngFileUpload', 'cgBusy', 'ngRoute', 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav', 'ui.grid.treeView', 'ui.grid.selection', 'ui.grid.pagination'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/sign', {
            templateUrl: 'Sign/sign.html',
            controller: 'signCtrl'
        });
    }])
    .controller('writeinCtrl', function ($scope, $http) {

    })
    .controller('signCtrl', function ($scope, $http,ModalService) {

        var example = [
            {
                BeginWeek:'2',
                EndWeek:'3',
                BeginSubjectDate:'7:50',
                EndSubjectDate:'10:30',
                SubjectName:'计算机基础',
                SubjectTeacher:'康康',
                Build:'S3',
                ClassRoom:'214'
            }
        ]
        $scope.BeginDay = '';
        $scope.ClassName = '';
        var time = [
            {
                BeginWeek:'2',
                EndWeek:'3',
                BeginSubjectDate:'7:50',
                EndSubjectDate:'10:30',
                SubjectName:'计算机基础',
                SubjectTeacher:'康康',
                Build:'S3',
                ClassRoom:'214',
                TodayWeek:'2'

            }
        ]
        //console.log(time)
        //alert($scope.time[0]);




        var paginationOptions = {
            pageNumber: 1,
            pageSize: 25,
            totalPage: 1
        };
        $scope.addData = function() {
            var n = $scope.gridOptions.data.length + 1;
            $scope.gridOptions.data.push({
                BeginWeek: "New " + n,
                EndWeek:"New " + n,
                BeginSubjectDate:'blank',
                EndSubjectDate:'blank',
                SubjectName:'blank',
                SubjectTeacher:'blank',
                Build:'blank',
                ClassRoom:'blank',
                TodayWeek:'blank'
            });
            console.log($scope.gridOptions.data)
            console.log($scope.gridOptions.data[2])
        };

        $scope.save = function () {
            $http.post('http://172.16.20.110:3000/ImportSignIn', $scope.gridOptions.data,$scope.BeginDay,$scope.ClassName)
                .success(function (data) {

                alert("保存成功")
            }).error(function (data) {

            }).finally(function () {

            });
        }

        $scope.gridOptions = {
            paginationPageSizes: [20, 50, 75],
            paginationPageSize: 25,
            enableCellEditOnFocus: true,
            showColumnFooter: true,
            useExternalPagination: true,
            columnDefs: [
                {
                    name: '课程名',
                    field: 'SubjectName'
                    //footerCellTemplate: '<div class="ui-grid-cell-contents" ng-click="" ><a ng-click="add()">增加</a></div>'
                },
                {
                    name: '星期',
                    field: 'TodayWeek'

                    //field: 'Number'
                    //footerCellTemplate: '<div class="ui-grid-cell-contents" ng-click="" ><a ng-click=" $event.stopPropagation();grid.appScope.add()">增加</a></div>'
                },
                {
                    name:'上课开始时间',
                    field: 'BeginSubjectDate'

                },
                {
                    name:'上课结束时间',
                    field: 'EndSubjectDate'

                },
                {
                    name:'上课周期开始周',
                    field: 'BeginWeek'

                },
                {
                    name:'上课周期结束周',
                    field: 'EndWeek'

                },
                {
                    name:'任课老师',
                    field: 'SubjectTeacher'

                },
                {
                    name:'上课地点',
                    field: 'Build'

                },
                {
                    name:'具体教室',
                    field: 'ClassRoom'

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
                    //loaction();
                    //console.log(time)
                });
                $scope.gridOptions.data = time;
            }

        }

    })
