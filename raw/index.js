/**
 * 日期时间选择器
 * Author:   zhoumh
 * */
var angular = require('angular');
window.moment = require('../public/moment/moment');
require('../public/moment/locate/zh-cn');
moment.locale('zh-cn');
require('../public/bootstrap-datetimepicker/bootstrap-datetimepicker');


angular.module('kit4DateTimePicker', [])
    .directive('dateTimePicker', ['$parse', '$timeout', function ($parse, $timeout) {
        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {
                // 【可选】obj，联动参数
                linkedPickers: '=',
                // 【可选】obj，日期初始化参数
                pickerOption: '=',
                // 【可选】obj，提供给外层主动控制的方法，目前提供控件初始化方法，清空数据
                dialogCtrl: '=?'
                // 【可选】function，选择日期后的回调方法
                , onChange: '&'
            },//与父scope隔离
            link: function ($scope, $element, attrs, ngModelCtrl) {
                //-- =======================================参数===========================================
                var formatter = attrs.dateTimePicker || 'YYYY-MM-DD',
                    onchanged = attrs.dateChanged && $scope.$parent[attrs.dateChanged],
                    hasLinkedPickers = $scope.hasOwnProperty('linkedPickers');

                var options = $.extend(true, {
                    locale: 'zh-cn',          //国际化--中文
                    format: formatter,        //格式化
                    sideBySide: true,          //时间和日期并排显示
                    useCurrent: false,        //不要默认选中当日当时
                    ignoreReadonly: true    //只读状态激活日期选择窗口
                }, $scope.pickerOption);

                var _picker = {};       //日期或时间对象

                //-- =======================================函数===========================================
                function _setModel(date) {
                    var _result = date ? new Date(moment(date)).getTime() : date;
                    ngModelCtrl.$setViewValue(_result);
                    $timeout(function () {
                        $scope.$apply();
                        $scope.onChange();
                    }, 0);
                }


                /**
                 *将对象转为数组
                 * @param obj
                 */
                function _objToArray(obj) {
                    var _thisArray = [];
                    for (var key in obj) {
                        _thisArray.push([key, obj[key]]);
                    }
                    return _thisArray;
                }

                /**
                 * 初始化
                 * @private
                 */
                function _dateTimePickerInit() {
                    $element.datetimepicker(options).on('dp.change', function (e) {
                        //更新ngModel
                        var _pickerDate = $($element).data('date');
                        _setModel(_pickerDate);

                        //linkedPickers
                        if (hasLinkedPickers) {
                            _objToArray($scope.linkedPickers).map(function (picker) {
                                if (['minDate', 'maxDate'].indexOf(picker[1]) === -1) {
                                    console.error('linkedPickers的value值只能为"minDate"或者"maxDate"');
                                    return;
                                }
                                var target = $('#' + picker[0]);
                                if (!target.length) {
                                    console.error('#' + picker[0] + '不存在');
                                    return;
                                }
                                target.data("DateTimePicker")[picker[1]](e.date);
                            });
                        }
                        if (onchanged) onchanged(e.date, e); // (date, args)
                    })
                    if (formatter == 'YYYY-MM') {
                        $element.on('dp.hide', function (event) {
                            setTimeout(function () {
                                $($element).data('DateTimePicker').viewMode('months');
                            }, 1);
                        });
                    }
                }

                /**
                 * 清除日期
                 * @returns {boolean}
                 */
                function clear() {
                    _picker = $element.data("DateTimePicker");
                    if (!_picker) return false;
                    _picker.clear();
                    ngModelCtrl.$setViewValue(null);
                }

                /**
                 * 触发日期
                 * @returns {boolean}
                 */
                function showWidget() {
                    _picker = $element.data("DateTimePicker");
                    if (!_picker) return false;
                    _picker.show();
                }

                /**
                 * 有联动属性时，下一节点获取焦点
                 */
                $element.on("blur", function () {
                    _objToArray($scope.linkedPickers).map(function (picker) {
                        if (picker[1] == 'minDate' && $element.val() != '') {
                            $('#' + picker[0]).focus();
                        }
                    });
                });

                /**
                 * $formatters 将Model的数据转换为View交互控件显示的值
                 */
                ngModelCtrl.$formatters.unshift(function (value) {
                    if (typeof (value) == 'object' && angular.equals(value, {}))
                        return "";
                    else if (value)
                        return moment(new Date(value)).format(formatter);
                    else
                        return "";
                });
                //-- =======================================初始化===========================================
                if (!attrs.readonly) {
                    $element.attr("readonly", "readonly").css({'background-color': 'inherit', 'cursor': 'pointer'});
                }

                _dateTimePickerInit();

                // 记得加{} ，否则当页面没有传递dialogCtrl时，会报错
                $scope.dialogCtrl = $scope.dialogCtrl ? $scope.dialogCtrl : {};
                Object.assign($scope.dialogCtrl, {
                    show: showWidget,
                    //清空选择
                    clear: clear,
                })

                //-- =======================================watch===========================================
                $scope.$parent.$watch(attrs.minDate, function (timer, oldTimer) {
                    if (!timer) return false;
                    _picker = $element.data("DateTimePicker");
                    if (!_picker) return false;
                    _picker.minDate(moment(new Date(timer)));
                });

                $scope.$parent.$watch(attrs.maxDate, function (timer, oldTimer) {
                    if (!timer) return false;
                    _picker = $element.data("DateTimePicker");
                    if (!_picker) return false;
                    _picker.maxDate(moment(new Date(timer)));
                });

            }
        };

    }]);












