/**
 * Created by fish on 15/10/23.
 */
'use strict';

angular.module('myApp.sign', ['pickadate','ngRoute', 'NewfileDialog', 'datePicker', 'angularModalService', 'ngFileUpload', 'cgBusy', 'ngRoute', 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav', 'ui.grid.treeView', 'ui.grid.selection', 'ui.grid.pagination'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/sign', {
            templateUrl: 'Sign/sign.html',
            controller: 'signCtrl'
        });
    }])

    .controller('signCtrl', function ($scope, $http,ModalService) {

        $scope.BeginDay = '';
        $scope.ClassName = '';

        $scope.ff = {
            BeginDay : '',
            ClassName : '',
            time: [

                {
                    BeginWeek: '2',
                    EndWeek: '3',
                    BeginSubjectDate: '8:10',
                    EndSubjectDate: '9:50',
                    SubjectName: '计算机基础',
                    SubjectTeacher: '康康',
                    Build: 'S3',
                    ClassRoom: '214',
                    TodayWeek: '星期一'
                }
            ]

        }



    //    var time = [
    //        {
    //            BeginWeek:'2',
    //            EndWeek:'3',
    //            BeginSubjectDate:'8:10',
    //            EndSubjectDate:'9:50',
    //            SubjectName:'计算机基础',
    //            SubjectTeacher:'康康',
    //            Build:'S3',
    //            ClassRoom:'214',
    //            TodayWeek:'星期一'
    //        }
    //]

        var paginationOptions = {
            pageNumber: 1,
            pageSize: 25,
            totalPage: 1
        };

        //增加行数
        $scope.addData = function() {
            var n = $scope.gridOptions.data.length + 1;
            $scope.ff.time.push({
                BeginWeek: "New",
                EndWeek:"New",
                BeginSubjectDate:'0',
                EndSubjectDate:'0',
                SubjectName:'blank',
                SubjectTeacher:'blank',
                Build:'0',
                ClassRoom:'blank',
                TodayWeek:'0'
            });
            console.log($scope.gridOptions.data);
            console.log($scope.gridOptions.data[2])
        };



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
                    cellTemplate: '<select ng-model="row.entity.TodayWeek" style="background-color:white;width: 100%;border-radius: 0;height: 100%;border: 0;"><option value="0">请选择</option><option  value ="星期一">星期一</option><option value ="星期二">星期二</option><option value="星期三">星期三</option><option value="星期四">星期四</option><option value="星期五">星期五</option> </select>  '
                },
                {
                    name:'上课开始时间',
                    field: 'BeginSubjectDate',
                    cellTemplate:'<select ng-model="row.entity.BeginSubjectDate" style="background-color:white;width: 100%;border-radius: 0;height: 100%;border: 0;"><option value="0">请选择</option><option value="8:00">第一节</option><option value="10:00">第三节</option><option value="14:20">第五节</option><option value="18:50">第八节</option></select>'

                },
                {
                    name:'上课结束时间',
                    field: 'EndSubjectDate',
                    cellTemplate:'<select ng-model="row.entity.EndSubjectDate" style="background-color:white;width: 100%;border-radius: 0;height: 100%;border: 0;"><option value="0">请选择</option><option value="9:50">第二节</option><option value="11:50">第四节</option><option value="17:05">第七节</option><option value="21:40">第十节</option></select>'


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
                    field: 'Build',
                    cellTemplate:'<select ng-model="row.entity.Build" style="background-color:white;width: 100%;border-radius: 0;height: 100%;border: 0;"><option value="0">请选择</option><option value="J1">J1</option><option value="J2">J2</option><option value="J3">J3</option><option value="S1">S1</option><option value="S2">S2</option><option value="S3">S3</option><option value="S4">S4</option></select>'


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
                $scope.gridOptions.data = $scope.ff.time;
            }

        }

        $scope.opendateModal = function () {
            ModalService.showModal({
                templateUrl: "Sign/datepick.html",
                controller: "datepickCtrl",
                scope: $scope
            }).then(function (modal1) {
                //$scope.datemodal = modal;
                modal1.element.modal();
                modal1.close.then(function (result) {
                console.log(result);
                    if(result !== ''){
                       $scope.ff.BeginDay = result;
                        console.log($scope.ff.BeginDay)
                        //$scope.datemodal.hide();
                        //document.getElementById('sd').style.display = "none";
                    }
                });
            });
        }

        $scope.determinemodal = function () {
            //    BeginWeek: "New " + n,
            //    EndWeek:"New " + n,
            //    BeginSubjectDate:'0',
            //    EndSubjectDate:'0',
            //    SubjectName:'blank',
            //    SubjectTeacher:'blank',
            //    Build:'0',
            //    ClassRoom:'blank',
            //    TodayWeek:'0'
            var Fill = 0;
            var n = $scope.gridOptions.data.length;
            console.log("n="+n);
            for(var i=0;i<n;i++){
                if($scope.gridOptions.data[i].BeginWeek == 'New'
                || $scope.gridOptions.data[i].EndWeek == 'New'
                || $scope.gridOptions.data[i].BeginSubjectDate == '0'
                || $scope.gridOptions.data[i].EndSubjectDate == '0'
                || $scope.gridOptions.data[i].SubjectName == 'blank'
                || $scope.gridOptions.data[i].SubjectTeacher == 'blank'
                || $scope.gridOptions.data[i].Build == '0'
                || $scope.gridOptions.data[i].ClassRoom == 'blank'
                || $scope.gridOptions.data[i].TodayWeek == '0'
                || $scope.ff.BeginDay == ''
                || $scope.ff.ClassName == '')
                {
                    Fill = 1;
                    break;
                }
            }
            if(Fill == '1'){
                window.localStorage['ngshow']  = '1';
                ModalService.showModal({
                    templateUrl: "Sign/determinemodal.html",
                    controller: "DetermineCtrl"
                }).then(function (modal) {
                    modal.element.modal();
                    modal.close.then(function (result) {
                        if (result == "Yes") {
                            //
                            $http.post('http://172.16.20.110:3000/ImportSignIn', $scope.ff)
                                .success(function (data) {
                                    alert("保存成功")
                                }).error(function (data) {

                                }).finally(function () {

                                });

                        }
                    });
                });
            }else{
                window.localStorage['ngshow'] = '2';
                ModalService.showModal({
                    templateUrl: "Sign/determinemodal.html",
                    controller: "DetermineCtrl"
                }).then(function (modal) {

                    modal.element.modal();
                    modal.close.then(function (result) {
                        if (result == "Yes") {
                            //
                            $http.post('http://172.16.20.110:3000/ImportSignIn', $scope.ff)
                                .success(function (data) {
                                    alert("保存成功")
                                }).error(function (data) {

                                }).finally(function () {

                                });

                        }
                    });
                });
            }
        }

    })
    .controller('DetermineCtrl',function($scope,close){
        $scope.ngshow = window.localStorage['ngshow'];
        $scope.closeModal = function (result) {
            window.localStorage['ngshow'] = '';
            close(result, 500);
        };
    })

