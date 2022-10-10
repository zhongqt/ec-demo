/**
 * g-combo-grid 联想控件
 * Created by liuqq on 14-12-05.
 */
define('framework/comboGrid/GillionComboGridConstructor', [
    'angular-sanitize',
    'css!' + window.ctx + '/bower_components/bootstrap/css/bootstrap.min.css',
    'css!' + window.ctx + '/bower_components/massautocomplete/massautocomplete.theme.css'
], function () {
    return function ($timeout, $window, $document, $q, $http) {
        'use strict';
        return {
            restrict: "A",
            scope: {
                url: '=',
                colModel: '=',
                pagination: '@',
                valueField: '@',
                pageSize: '@',
                orderFields: '@',
                filterFields: '@',
                totalField: '@',
                dataField: '@'
            },
            transclude: true,
            template: '<div ng-transclude></div>' +
            '<div class="ac-container" ng-show="show_autocomplete && results.length > 0" style="position:absolute;">' +
            '   <table class="ac-menu">' +
            '       <tr class="ac-menu-item">' +
            '           <td ng-repeat="colName in options.colModel" align="center">' +
            '               <span ng-bind="colName.label" class="ac-menu-item-title"></span>' +
            '           </td>' +
            '       </tr>' +
            '       <tr height="30" ng-repeat="result in results" ng-click="apply_selection($index, $event)" ng-if="$index > 0"' +
            '           class="ac-menu-item" ng-class="$index == selected_index ? \'ac-state-focus\': \'\'">' +
            '           <td ng-repeat="colName in options.colModel"><span ng-bind="result.obj[colName.name]"></span></td>' +
            '       </tr>' +
            '       <tr ng-show="options.pagination" class="ac-menu-item">' +
            '           <td colspan="{{options.colModel.length}}" align="right">' +
            '               <div class="pagebar"><a href nohide ng-click="goPage(-1)">上一页</a>&nbsp;' +
            '               <a href nohide ng-click="goPage(1)">下一页</a>&nbsp;' +
            '               <span ng-bind="pager.pageNum"></span>/<span ng-bind="pager.totalPage"></span>&nbsp;' +
            '               总记录：<span ng-bind="pager.total"></span>' +
            '               </div>' +
            '           </td>' +
            '       </tr>' +
            '   </table>' +
            '</div>',
            /**
             *
             * @param $attrs
             * @param $attrs.url {String} 数据地址
             * @param $attrs.pagination {Boolean} 是否分页,默认为false
             * @param $attrs.valueField {String} 绑定文本框显示的属性名称
             * @param $attrs.pageSize {Number} 每页显示数据个数,默认为10
             * @param $attrs.orderFields {String} 排序字段，格式可自定义，跟后台匹配即可
             * @param $attrs.colModel {String} 表格显示列配置，格式为[{label:'',name=''}],label 为表头名称,name 为绑定列属性名称
             * @param $attrs.filterFields {String} 指定过滤的字段名称,默认为valueField
             * @param $attrs.totalField {String} 返回数据中，总记录数的属性名称,默认为: total
             * @param $attrs.dataField {String} 返回数据中，表格数据的属性名称,默认为：rows
             */
            controller: function ($scope, $element, $attrs) {
                var that = this;
                var KEYS = {
                    TAB: 9,
                    ESC: 27,
                    ENTER: 13,
                    UP: 38,
                    DOWN: 40
                };
                // Create events in a unique autocomplete namespace.
                var EVENTS = {
                    KEYDOWN: 'keydown.ac' + $scope.$id,
                    RESIZE: 'resize.ac' + $scope.$id,
                    BLUR: 'blur.ac' + $scope.$id
                };

                var _user_options = {};
                var user_options = {
                    debounce_position: _user_options.debounce_position || 150,
                    debounce_attach: _user_options.debounce_attach || 300,
                    debounce_suggest: _user_options.debounce_suggest || 1000,
                    debounce_blur: _user_options.debounce_blur || 150
                };

                var current_element,
                    current_model,//当前ngModel
                    current_options,//当前配置项,主要是方法的回调
                    previous_value,
                    value_watch,
                    last_selected_value;

                $scope.show_autocomplete = false;

                function initOptionConfig(scope, attrs) {
                    var options = {};
                    options.url = scope.url;
                    options.pagination = scope.pagination;
                    options.valueField = scope.valueField;
                    if (scope.pageSize)
                        $scope.pager.pageSize = scope.pageSize;
                    options.orderFields = scope.orderFields;
                    options.colModel = scope.colModel;
                    options.filterFields = scope.filterFields || options.valueField;
                    options.totalField = scope.totalField || 'data.totalRecord';
                    options.dataField = scope.dataField || 'data.records';
                    return options;
                }

                $scope.pager = {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0,
                    totalPage: 0
                };
                $scope.options = initOptionConfig($scope, $attrs);

                // Debounce - taken from underscore
                function debounce(func, wait, immediate) {
                    var timeout;
                    return function () {
                        var context = this, args = arguments;
                        var later = function () {
                            timeout = null;
                            if (!immediate) func.apply(context, args);
                        };
                        var callNow = immediate && !timeout;
                        clearTimeout(timeout);
                        timeout = setTimeout(later, wait);
                        if (callNow) func.apply(context, args);
                    };
                }

                function _position_autocomplete() {
                    var pos = current_element.offset(),     // Top & left including scroll
                        h = current_element.outerHeight(),  // Height including inner padding & border
                        w = current_element.outerWidth();   // Width including inner padding & border
                    $scope.container.css({
                        top: pos.top + h,
                        left: pos.left,
                        width: w
                    });
                }
                var position_autocomplete = debounce(_position_autocomplete, user_options.debounce_position);

                // Attach autocomplete behaviour to an input element.
                function _attach(ngmodel, target_element, options) {
                    // Element is already attached.
                    if (current_element === target_element) return;
                    // Safe: clear previously attached elements.
                    if (current_element) that.detach();
                    // The element is still the active element.
                    if (target_element[0] !== $document[0].activeElement) return;

                    options.on_attach && options.on_attach();

                    current_element = target_element;
                    current_model = ngmodel;
                    current_options = options;
                    previous_value = ngmodel.$viewValue;
                    $scope.results = [];
                    $scope.selected_index = -1;
                    bind_element();

                    value_watch = $scope.$watch(
                        function () {
                            return ngmodel.$modelValue;
                        },
                        function (nv, ov) {
                            // Prevent suggestion cycle when the value is the last value selected.
                            // When selecting from the menu the ng-model is updated and this watch
                            // is triggered. This causes another suggestion cycle that will provide as
                            // suggestion the value that is currently selected - this is unnecessary.
                            if (nv === last_selected_value)
                                return;
                            $scope.pager.pageNum = 1;
                            if ($scope.results)
                                $scope.results.length = 0;

                            _position_autocomplete();
                            suggest(nv);
                        }
                    );
                }
                that.attach = debounce(_attach, user_options.debounce_attach);

                $scope.goPage = function (cont) {
                    var pageNum = $scope.pager.pageNum,
                        newPageNum = pageNum + cont;
                    if (newPageNum >= 1 && newPageNum <= $scope.pager.totalPage) {
                        $scope.pager.pageNum = newPageNum;
                        $scope.selected_index = 0;
                        current_element.focus();
                    }
                };
                $scope.$watch('pager.pageNum',
                    function (nv, ov) {
                        if (nv === ov)
                            return;
                        getData(current_model.$viewValue);
                    }
                );
                //根据属性名称获取数据
                function getDataByProp(data, prop) {
                    var totalData = data,
                        totalFieldArray = prop.split('.');
                    for (var i = 0; i < totalFieldArray.length; i++) {
                        totalData = totalData[totalFieldArray[i]];
                    }
                    return totalData;
                }

                //获取数据
                function getData(term) {
                    var pageNum = $scope.pager.pageNum,
                        pageSize = $scope.pager.pageSize;
                    $http({
                        method: 'GET',
                        url: $scope.options.url,
                        params: {
                            'q': term,
                            'pageSize': pageSize,
                            'pageNum': pageNum,
                            'orderFields': $scope.options.orderFields,
                            'filterFields': $scope.options.filterFields
                        }
                    }).success(function (resultData, status, headers, config) {
                        if (resultData) {
                            var rowDatas = [], results = [];
                            if ($scope.options.pagination) {
                                $scope.pager.total = getDataByProp(resultData, $scope.options.totalField) || 0;
                                $scope.pager.totalPage = Math.ceil($scope.pager.total / pageSize);
                            }
                            rowDatas = getDataByProp(resultData, $scope.options.dataField);
                            if (rowDatas) {
                                var i, valueData, len = rowDatas.length;
                                for (i = 0; i < len; i++) {
                                    var obj = rowDatas[i];
                                    if (typeof obj === 'object' && $scope.options.valueField) {
                                        valueData = obj[$scope.options.valueField];
                                    } else {
                                        valueData = obj;
                                    }
                                    results.push({
                                        value: valueData,
                                        obj: obj
                                    });
                                }
                            }
                            if (results && results.length > 0) {
                                $scope.results = [{value: term, label: ''}].concat(results);
                                $scope.show_autocomplete = true;
                            } else {
                                $scope.results = [];
                            }
                        }
                    }).error(function (data, status, headers, config) {
                        current_options.on_error && current_options.on_error(error);
                    })['finally'](function () {
                        $scope.waiting_for_suggestion = false;
                    });
                }

                function _suggest(term) {
                    $scope.selected_index = 0;
                    $scope.show_autocomplete = false;
                    $scope.waiting_for_suggestion = true;

                    if (typeof(term) === 'string' && term.length > 0) {
                        getData(term);
                    } else {
                        $scope.waiting_for_suggestion = false;
                        $scope.$apply();
                    }
                }
                var suggest = debounce(_suggest, user_options.debounce_suggest);

                // Trigger end of editing and remove all attachments made by
                // this directive to the input element.
                that.detach = function () {
                    if (current_element) {
                        update_model_value();
                        current_options.on_detach && current_options.on_detach(current_element.val());
                    }

                    // Clear references and events.
                    $scope.show_autocomplete = false;
                    current_element.unbind(EVENTS.KEYDOWN);
                    current_element.unbind(EVENTS.BLUR);
                    angular.element($window).unbind(EVENTS.RESIZE);
                    value_watch();
                    $scope.selected_index = $scope.results = undefined;
                    current_model = current_element = previous_value = undefined;
                };

                // Update angular's model view value.
                // It is important that before triggering hooks the model's view
                // value will be synced with the visible value to the user. This will
                // allow the consumer controller to rely on its local ng-model.
                function update_model_value() {
                    var val = current_element.val();
                    if (current_model.$modelValue !== val) {
                        current_model.$setViewValue(val);
                        current_model.$render();
                    }
                    return val;
                }

                // Set the current selection while navigating through the menu.
                function set_selection(i) {
                    // We use jquery val instead of setting the model's view value
                    // because we watch the model value and setting it will trigger
                    // a new suggestion cycle.
                    current_element.val($scope.results[i].value);

                    $scope.selected_index = i;
                }

                // Apply and accept the current selection made from the menu.
                // When selecting from the menu directly (using click or touch) the
                // selection is directly applied.
                $scope.apply_selection = function (i) {
                    current_element.focus();
                    if (!$scope.show_autocomplete || i > $scope.results.length || i < 0)
                        return;

                    set_selection(i);
                    last_selected_value = update_model_value();
                    $scope.show_autocomplete = false;

                    current_options.on_select && current_options.on_select($scope.results[$scope.selected_index]);
                };

                function bind_element() {
                    //调整大小
                    angular.element($window).bind(EVENTS.RESIZE, position_autocomplete);
                    current_element.bind(EVENTS.BLUR, function () {
                        // Detach the element from the auto complete when input loses focus.
                        // Focus is lost when a selection is made from the auto complete menu
                        // using the mouse (or touch). In that case we don't want to detach so
                        // we wait several ms for the input to regain focus.
                        $timeout(function () {
                            var activeElement = $document[0].activeElement;
                            //控制点击分页栏时，不隐藏列表区
                            var tagFlag = !activeElement.hasAttribute('nohide');
                            if ((!current_element || current_element[0] !== activeElement) && tagFlag)
                                that.detach();
                        }, user_options.debounce_blur);
                    });

                    current_element.bind(EVENTS.KEYDOWN, function (e) {
                        // Reserve key combinations with shift for different purposes.

                        if (e.shiftKey) return;
                        switch (e.keyCode) {
                            // Close the menu if it's open. Or, undo changes made to the value
                            // if the menu is closed.
                            case KEYS.ESC:
                                if ($scope.show_autocomplete) {
                                    $scope.show_autocomplete = false;
                                    $scope.$apply();
                                } else {
                                    current_element.val(previous_value);
                                }
                                break;

                            // Select an element and close the menu. Or, if a selection is
                            // unavailable let the event propagate.
                            case KEYS.ENTER:
                                // Accept a selection only if results exist, the menu is
                                // displayed and the results are valid (no current request
                                // for new suggestions is active).
                                if ($scope.show_autocomplete &&
                                    $scope.selected_index > 0 && !$scope.waiting_for_suggestion) {
                                    $scope.apply_selection($scope.selected_index);
                                    // When selecting an item from the AC list the focus is set on
                                    // the input element. So the enter will cause a keypress event
                                    // on the input itself. Since this enter is not intended for the
                                    // input but for the AC result we prevent propagation to parent
                                    // elements because this event is not of their concern. We cannot
                                    // prevent events from firing when the event was registered on
                                    // the input itself.
                                    e.stopPropagation();
                                }

                                $scope.show_autocomplete = false;
                                $scope.$apply();
                                break;

                            // Navigate the menu when it's open. When it's not open fall back
                            // to default behavior.
                            case KEYS.TAB:
                                if (!$scope.show_autocomplete)
                                    break;

                                e.preventDefault();
                            /* falls through */

                            // Open the menu when results exists but are not displayed. Or,
                            // select the next element when the menu is open. When reaching
                            // bottom wrap to top.
                            case KEYS.DOWN:
                                if ($scope.results.length > 0) {
                                    if ($scope.show_autocomplete) {
                                        set_selection($scope.selected_index + 1 > $scope.results.length - 1 ? 0 : $scope.selected_index + 1);
                                    } else {
                                        $scope.show_autocomplete = true;
                                        $scope.selected_index = 0;
                                    }
                                    $scope.$apply();
                                }
                                break;

                            // Navigate up in the menu. When reaching the top wrap to bottom.
                            case KEYS.UP:
                                if ($scope.show_autocomplete) {
                                    e.preventDefault();
                                    set_selection($scope.selected_index - 1 >= 0 ? $scope.selected_index - 1 : $scope.results.length - 1);
                                    $scope.$apply();
                                }
                                break;
                        }
                    });
                }

                $scope.$on('$destroy', function () {
                    that.detach();
                    $scope.container.remove();
                });
            },
            link: function (scope, element) {
                scope.container = element.find('.ac-container');
            }
        };
    };
});

