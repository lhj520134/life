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


        $scope.BeginDay = '12';
        $scope.ClassName = '2';
        var time = [
            {
                BeginWeek:'2',
                EndWeek:'3',
                BeginSubjectDate:'1',
                EndSubjectDate:'2',
                SubjectName:'2',
                SubjectTeacher:'1',
                Build:'1',
                ClassRoom:'1'
            }
        ]
        //console.log(time)
        //alert($scope.time[0]);

        $scope.add = function () {
            grid.setColumns(columns);
        }



        var paginationOptions = {
            pageNumber: 1,
            pageSize: 25,
            totalPage: 1
        };
        $scope.addData = function() {
            var n = $scope.gridOptions.data.length + 1;
            $scope.gridOptions.data.push({
                "BeginWeek": "New " + n,
                "lastName": "Person " + n,
                "company": "abc",
                "employed": true,
                "gender": "male"
            });
            console.log($scope.gridOptions.data)
            console.log($scope.gridOptions.data[2])
        };

        $scope.gridOptions = {
            paginationPageSizes: [20, 50, 75],
            paginationPageSize: 25,
            enableCellEditOnFocus: true,
            showColumnFooter: true,
            useExternalPagination: true,
            columnDefs: [
                {
                    name: '课程名',
                    field: 'BeginWeek'
                    //footerCellTemplate: '<div class="ui-grid-cell-contents" ng-click="" ><a ng-click="add()">增加</a></div>'
                },
                {
                    name: '星期',
                    field: 'BeginWeek'

                    //field: 'Number'
                    //footerCellTemplate: '<div class="ui-grid-cell-contents" ng-click="" ><a ng-click=" $event.stopPropagation();grid.appScope.add()">增加</a></div>'
                },
                {
                    name:'上课时间',
                    field: 'BeginWeek'

                },
                {
                    name:'上课周期',
                    field: 'BeginWeek'

                },
                {
                    name:'任课老师',
                    field: 'BeginWeek'

                },
                {
                    name:'上课地点',
                    field: 'BeginWeek'

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
