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
                TodayWeek:'0'

            }
        ]

        var paginationOptions = {
            pageNumber: 1,
            pageSize: 25,
            totalPage: 1
        };

        //增加行数
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
                TodayWeek:'0'
            });
            console.log($scope.gridOptions.data);
            console.log($scope.gridOptions.data[2])
        };

        //保存数据
        $scope.save = function () {
            $http.post('http://172.16.20.110:3000/ImportSignIn', $scope.gridOptions.data,$scope.BeginDay,$scope.ClassName)
                .success(function (data) {

                alert("保存成功")
            }).error(function (data) {

            }).finally(function () {

            });
        }

        //创建表格
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
                    field: 'TodayWeek',
                    cellTemplate: '<select ng-model="row.entity.TodayWeek" style="background-color:white;width: 100%;border-radius: 0;height: 100%;border: 0;"><option value="0">请选择</option><option  value ="1">星期一</option><option value ="2">星期二</option><option value="3">星期三</option><option value="4">星期四</option><option value="5">星期五</option> </select>  '
                },
                {
                    name:'上课开始时间',
                    field: 'BeginSubjectDate',
                    cellTemplate:'<select ng-model="row.entity.BeginSubjectDate" style="background-color:white;width: 100%;border-radius: 0;height: 100%;border: 0;">'

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
