define('framework/multilist/GillionMultiListDirectiveConstructor', ['angular'], function (angular) {
    return function ($parse, $dataSourceManager, $timeout, $document) {

        var MultiList = function ($scope, $element, $attrs) {
            var me = this;
            me.scope = $scope;
            me.element = $element;
            me.attrs = $attrs;
        }

        /**
         * 每次请求数据初始化
         * @param callback
         */
        MultiList.prototype.initDataSource = function (callback) {
            var me = this,
                scope = me.scope;
            scope.$on(scope.sourceName, function (context, dataSource) {
                scope.dataSource = dataSource.records;

                if (!scope.$root.$$phase) {
                    scope.$apply();
                }

                if (angular.isFunction(callback)) {
                    callback.call(me);
                }
            });
        }
        /**
         * 取消所有已选
         */
        MultiList.prototype.cancelAll = function () {
            var me = this,
                scope = me.scope;
            scope.rightSelected = false;
            if (scope.$selectedRow) {
                scope.$selectedRow = [];
                scope.$dataSource = scope.dataSource;
                $timeout(function () {
                    me.syncLeftAllChecked();
                }, 50);
            }
        }

        /**
         * 选择所有
         */
        MultiList.prototype.selectAll = function () {
            var me = this,
                scope = me.scope;
            scope.leftSelected = false;
            if (scope.$dataSource) {
                scope.$dataSource = [];
                scope.$selectedRow = scope.dataSource;
                $timeout(function () {
                    me.syncRightAllChecked();
                }, 50);
            }
        }

        MultiList.prototype.selectItem = function () {
            var me = this,
                i,
                scope = me.scope,
                element = me.element;
            var leftItems = element.find(".left-li .form-clickbox");
            var length = scope.$dataSource.length;
            scope.leftSelected = false;
            var noSelectedRow = [];
            for (i = 0; i < length; i++) {
                var item = leftItems[i];
                if (angular.element(item).hasClass("selected")) {
                    if (!angular.isArray(scope.$selectedRow)) {
                        scope.$selectedRow = [];
                    }
                    scope.$selectedRow.push(scope.$dataSource[i]);
                } else {
                    noSelectedRow.push(scope.$dataSource[i]);
                }

            }
            scope.$dataSource = noSelectedRow;
            $timeout(function () {
                me.syncRightAllChecked();
            }, 50);
        }

        MultiList.prototype.cancelItem = function () {
            var me = this,
                i,
                scope = me.scope,
                element = me.element;
            var rightItems = element.find(".right-li .form-clickbox");
            var length = scope.$selectedRow.length;
            scope.rightSelected = false;
            var noSelectedRow = [];
            for (i = 0; i < length; i++) {
                var item = rightItems[i];
                if (angular.element(item).hasClass("selected")) {
                    if (!angular.isArray(scope.$dataSource)) {
                        scope.$dataSource = [];
                    }
                    scope.$dataSource.push(scope.$selectedRow[i]);
                } else {
                    noSelectedRow.push(scope.$selectedRow[i]);
                }

            }
            scope.$selectedRow = noSelectedRow;
            $timeout(function () {
                me.syncLeftAllChecked();
            }, 50);
        }

        MultiList.prototype.selectLeftAll = function ($event) {
            var me = this,
                scope = me.scope,
                element = me.element;

            if (scope.leftSelected) {
                scope.leftSelected = false;
                angular.forEach(element.find(".left-li .form-clickbox"), function (item) {
                    setTimeout(function () {
                        angular.element(item).removeClass("selected");
                    }, 0);
                })
            } else {
                //angular.element($event.currentTarget).addClass("selected");
                scope.leftSelected = true;
                angular.forEach(element.find(".left-li .form-clickbox"), function (item) {
                    setTimeout(function () {
                        angular.element(item).addClass("selected");
                    }, 0);
                });
            }
        }

        MultiList.prototype.selectRightAll = function ($event) {
            var me = this,
                scope = me.scope,
                element = me.element;

            if (scope.rightSelected) {
                scope.rightSelected = false;
                element.find(".right-li .form-clickbox").removeClass("selected");
            } else {
                scope.rightSelected = true;
                element.find(".right-li .form-clickbox").addClass("selected");
            }
        }

        MultiList.prototype.displayInit = function (display, value) {
            var myScope = this.scope,
                displayArr = display.split(myScope.valueSeparator),
                valueArr = value.split(myScope.valueSeparator),
                i,
                length = displayArr.length;
            for (i = 0; i < length; i++) {
                if (!myScope.$selectedRow[i]) {
                    myScope.$selectedRow[i] = {};
                }
                myScope.$selectedRow[i][myScope.displayExpress] = displayArr[i];
                myScope.$selectedRow[i][myScope.valueProp] = valueArr[i];
            }
            myScope.selectedRow = myScope.$selectedRow;
        }
        /**
         * 根据已选和得出未选的
         * @param display
         * @param value
         */
        MultiList.prototype.getNoSelectedRow = function () {
            if (!this.scope.$selectedRow) {
                this.scope.$dataSource = this.scope.dataSource || [];
                return;
            }

            var myScope = this.scope,
                length = myScope.$selectedRow.length,
                totalLength = myScope.dataSource ? myScope.dataSource.length : 0,
                i;

            var noSelectedRow = _(myScope.dataSource).filter(function (item) {
                for (i = 0; i < length; i++) {
                    if (myScope.valueGetter(myScope.$selectedRow[i]) == myScope.valueGetter(item)) {
                        return false;
                    }
                }
                return true;
            });

            myScope.$dataSource = noSelectedRow;

        }

        MultiList.prototype.syncLeftAllChecked = function () {
            var me = this, flag = true, list = $(".left-li");
            if(list.length === 0){
                flag = false;
            } else {
                list.each(function (i, li) {
                    if (!$(li.firstChild).hasClass("selected")) {
                        flag = false;
                        return false;
                    }
                });
            }

            me.scope.leftSelected = flag;
        }

        MultiList.prototype.syncRightAllChecked = function () {
            var me = this, flag = true, list = $(".right-li");
            if(list.length === 0){
                flag = false;
            } else {
                list.each(function (i, li) {
                    if (!$(li.firstChild).hasClass("selected")) {
                        flag = false;
                        return false;
                    }
                });
            }
            me.scope.rightSelected = flag;
        }

        return {
            scope: {
                sourceName: '@',
                displayExpress: '@',
                valueProp: '@',
                titleContent: '@',
                ngModelInit: '=ngModel',
                displayInit: '=',
                selectedRow: '='
            },
            replace: true,
            require: '?ngModel',
            template:
            '<div class="form-multlist"><div class="form-multlist-list">' +
            '<div class="form-multlist-list-head"><div class="form-clickbox" ng-class="{\'selected\':leftSelected}" ng-click="selectLeftAll($event)"><i class="fi"></i><label>可选{{titleContent}}</label></div></div>' +
            '<ul class="form-multlist-list-body">' +
            '<li class="form-multlist-list-odd left-li" ng-repeat="item in $dataSource" ng-click="clickItem(item,$event)"><div class="form-clickbox"><i class="fi"></i><label>{{displayGetter(item)}}</label></div></li>' +
            '</ul></div>' +
            '<div class="form-multlist-operate">' +
            '<button type="button" ng-show="selectAllShow" class="btn form-multlist-operate-cancelall" ng-click="cancelAll()"></button>' +
            '<button type="button" class="btn form-multlist-operate-cancel" ng-click="cancelItem()"></button>' +
            '<button type="button" class="btn form-multlist-operate-selected" ng-click="selectItem()"></button>' +
            '<button type="button" ng-show="selectAllShow" class="btn form-multlist-operate-selectedall" ng-click="selectAll()"></button></div>' +
            '<div class="form-multlist-list"><div class="form-multlist-list-head">' +
            '<div class="form-clickbox" ng-click="selectRightAll($event)" ng-class="{\'selected\':rightSelected}"><i class="fi"></i><label>已选{{titleContent}}</label></div></div>' +
            '<ul class="form-multlist-list-body">' +
            '<li class="form-multlist-list-odd right-li" ng-repeat="item in $selectedRow" ng-click="clickItem(item,$event)"><div class="form-clickbox"><i class="fi"></i><label>{{displayGetter(item)}}</label></div></li>' +
            '</ul></div></div>',
            restrict: 'E',
            compile: function (tElement, tAttrs) {

                return function (scope, element, attrs, ngModel) {
                    /*初始化参数*/
                    var keyIndex = -1,
                        timer;

                    scope.multiList = new MultiList(scope, element, attrs);
                    scope.$selectedRow = attrs.selectedRow ? scope.selectedRow : [];
                    scope.valueSeparator = attrs.valueSeparator || ',';
                    scope.selectAllShow = attrs.selectAllShow != "false";

                    var returnParamFn = function (arg) {
                        return arg;
                    };
                    scope.valueGetter = !!scope.valueProp ? $parse(scope.valueProp) : returnParamFn;
                    scope.displayGetter = !!scope.displayExpress ? $parse(scope.displayExpress) : returnParamFn;
                    //初始化数据源
                    scope.multiList.initDataSource();

                    if (attrs.displayInit && scope.displayInit && scope.ngModelInit) {
                        scope.multiList.displayInit(scope.displayInit, scope.ngModelInit);

                    }

                    scope.clickItem = function (item, $event) {
                        var li = $event.currentTarget.firstChild,
                            $li = angular.element(li);

                        if ($li.hasClass("selected")) {
                            $li.removeClass("selected");
                            if (angular.element($event.currentTarget).hasClass("left-li")) {
                                scope.leftSelected = false;
                            } else if (angular.element($event.currentTarget).hasClass("right-li")) {
                                scope.rightSelected = false;
                            }

                        } else {
                            $li.addClass("selected");
                            if ($li.parent().hasClass("left-li"))
                                scope.multiList.syncLeftAllChecked();
                            else if ($li.parent().hasClass("right-li"))
                                scope.multiList.syncRightAllChecked();
                        }
                    };

                    scope.selectAll = function () {
                        scope.multiList.selectAll()
                    };
                    scope.cancelAll = function () {
                        scope.multiList.cancelAll()
                    };
                    scope.cancelItem = function () {
                        scope.multiList.cancelItem()
                    };
                    scope.selectItem = function () {
                        scope.multiList.selectItem()
                    };

                    scope.selectLeftAll = function ($event) {
                        scope.multiList.selectLeftAll($event)
                    };
                    scope.selectRightAll = function ($event) {
                        scope.multiList.selectRightAll($event)
                    };

                    scope.$watchCollection("dataSource", function () {
                        scope.multiList.getNoSelectedRow();
                        //scope.$dataSource = newVal;
                    });
                    scope.$watchCollection("$selectedRow", function (val) {
                        scope.selectedRow = val;
                        if (val) {
                            var submitArr = [];
                            angular.forEach(val, function (item) {
                                submitArr.push(scope.valueGetter(item));
                            });
                            ngModel.$setViewValue(submitArr.join(scope.valueSeparator));
                        }
                    });

                    scope.$watchCollection('selectedRow', function (val) {
                        scope.$selectedRow = val;

                    })
                    if (ngModel) {
                        ngModel.$formatters.push(function (value) {
                            ngModel.$setViewValue(value);
                        });
                    }
                }
            }
        }
    }
});