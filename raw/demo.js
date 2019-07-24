/**
 * 日期时间选择demo
 *
 * Author:   zhoumh
 * */
var angular = require('angular');
require('./index');
$(document).ready(function(){
    angular.module('kit4DateTimePickerDemo', ['kit4DateTimePicker'])
        .controller('dateTimePickerDemoCtrl',['$scope',function ($scope) {
            $scope.model = {date:new Date()};
            //=================================单选日期  start==================================
            //dialog控制器
            $scope.dialogCtrl = {};
            //打开日期选择
            $scope.showDialog = function () {
                $scope.dialogCtrl.show();
            };
            //清空日期
            $scope.clear = function () {
               $scope.dialogCtrl.clear();
            };

            $scope.onChange = function () {
                console.log('选择日期后…………');
            }
            //=================================单选日期  end====================================

            //=================================日期时间  start==================================
            $scope.dialogCtrlDateTime = {};
            $scope.showDialogDateTime = function () {
                $scope.dialogCtrlDateTime.show();
            };
            $scope.clearDateTime = function () {
                $scope.dialogCtrlDateTime.clear();
            };
            //=================================日期时间  end====================================
            //=================================最小，最大日期限制  start=========================
            $scope.limit = {
                testMinDate : new Date(),
                testMaxDate:new Date().getTime()+3*24*60*60*1000
            }

            $scope.dialogCtrlLimit = {};
            $scope.showDialogLimit = function () {
                $scope.dialogCtrlLimit.show();
            };
            $scope.clearLimit = function () {
                $scope.dialogCtrlLimit.clear();
            };
            //=================================最小，最大日期限制  end============================
            //=================================日期联动选择  start==========================
            $scope.dialogCtrlStart = {};
            $scope.showDialogStart = function () {
                $scope.dialogCtrlStart.show();
            };
            $scope.clearStart = function () {
                $scope.dialogCtrlStart.clear();
            };

            $scope.dialogCtrlEnd = {};
            $scope.showDialogEnd = function () {
                $scope.dialogCtrlEnd.show();
            };
            $scope.clearEnd = function () {
                $scope.dialogCtrlEnd.clear();
            };
            //=================================日期联动选择  end============================


            //=================================月份选择  start==================================
            $scope.dialogCtrlMonths = {};
            $scope.showDialogMonths = function () {
                $scope.dialogCtrlMonths.show();
            };
            $scope.clearMonths = function () {
                $scope.dialogCtrlMonths.clear();
            };
            //=================================月份选择  end====================================

            //=================================年份选择  start==================================
            // $scope.dialogCtrlYears = {};
            // $scope.showDialogYears = function () {
            //     $scope.dialogCtrlYears.show();
            // };
            // $scope.clearYears = function () {
            //     $scope.dialogCtrlYears.clear();
            // };
            //=================================年份选择  end====================================




        }]);
    angular.bootstrap(document.body, ['kit4DateTimePickerDemo']);
});
