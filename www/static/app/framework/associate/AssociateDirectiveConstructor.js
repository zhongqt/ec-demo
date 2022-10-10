define('framework/associate/AssociateDirectiveConstructor', ['angular', 'jquery'], function (angular, $) {

    return function ($compile, $http, $parse, $timeout, $filter) {

        var associateTmpl = '<div class="table-wrapper" style="display: none;"> <table cellpadding="0" cellspacing="0" style="{{tableCssStyle}}"> <thead> <th ng-repeat="col in associate.columns" ng-if="col.type !== \'hidden\'">{{col.header}}</th> </thead> <tbody ng-click="associate.bodyClick($event)"> <tr ng-repeat="(rowIndex, row) in associate.source" data-row-index="{{rowIndex}}" ng-class="{\'selected\': selectedId !== undefined && selectedId === associate.getSelectedId(row),\'hover\':hoverId!==undefined&&hoverId==={{rowIndex}}}"> <td g-associate-grid-cell ng-repeat="(cellIndex, col) in associate.columns" ng-if="col.type !== \'hidden\'" data-cell-index="{{cellIndex}}"></td> </tr> </tbody> </table> <div class="paginate"> <a class="paginate-button previous ng-class:{\'disabled\': page === 1};" ng-click="page === 1 || associate.goPage(page -1)">&lt;</a> <span class="paginate-button">{{page}}</span> <a class="paginate-button next ng-class:{\'disabled\': page === totalPage || totalPage <= 1};" ng-click="(page === totalPage || totalPage <= 1) || associate.goPage(page +1)">&gt;</a> <span style="float: right; margin-right: 10px;">共 <span ng-bind="totalPage"></span> 页</span> </div> <input type="hidden" ng-model="selectedId"/> </div>';

        function Associate($scope, $element, $attributes,ngModel) {
            var me = this;
            me.element = $element;
            me.attributes = $attributes;
            me.scope = $scope;
            me.ngModel = ngModel;
            me.cellValueGetterCache = {};
        }

        /**
         * @private
         * @param row
         * @param col
         * @return {*}
         */
        Associate.prototype.getCellValue = function (row, col) {
            if (!this.cellValueGetterCache[col.data]) {
                this.cellValueGetterCache[col.data] = this.generateCellValueGetter(col.data);
            }
            return this.cellValueGetterCache[col.data](row);
        };

        /**
         * @private
         * @param col
         * @return {*}
         */
        Associate.prototype.generateCellValueGetter = function (propertyPath) {
            if (propertyPath) {
                return $parse(propertyPath);
            }
            return angular.noop;
        };

        /**
         * @private
         * @param val
         * @param cellScope
         * @return {*}
         */
        Associate.prototype.doFilters = function (val, cellScope) {
            var col = cellScope.col,
                filters = col.filters,
                i, len, filter;
            if (!angular.isString(filters)) {
                if (angular.isArray(filters)) {
                    for (i = 0, len = filters.length; i < len; i++) {
                        filter = filters[i];
                        if (angular.isString(filter)) {
                            val = this.doFilter(val, filter, cellScope);
                        }
                    }
                }
            } else {
                return this.doFilter(val, filters, cellScope);
            }
            return val;
        };

        /**
         * @private
         * @param val
         * @param filterName
         * @param cellScope
         * @return {*}
         */
        Associate.prototype.doFilter = function (val, filterName, cellScope) {
            var args = [val],
                i, len, token, filterTokens;
            if (filterName.indexOf(':') !== -1) {
                filterTokens = filterName.split(':');
                for (i = 1, len = filterTokens.length; i < len; i++) {
                    token = filterTokens[i];
                    args.push(cellScope.$eval(token));
                }
                return $filter(filterTokens[0]).apply(window, args);
            }
            return $filter(filterName)(val);
        };

        Associate.prototype.getPageRange = function () {
            var scope = this.scope,
                page = scope.page,
                totalPage = scope.totalPage,
                pageRange = [],
                start = page - 2 < 2 ? 2 : (page - 2),
                end = page + 2 > (totalPage - 1) ? (totalPage - 1) : (page + 2),
                i;
            for (i = end; i < totalPage; i++) {
                if (i - start < 5) {
                    end = i;
                }
            }
            for (i = start; i > 1; i--) {
                if (end - i < 5) {
                    start = i;
                }
            }
            for (i = start; i <= end; i++) {
                pageRange.push(i);
            }
            return pageRange;
        };

        Associate.prototype.goPage = function (page, callback) {
            var me = this,
                scope = me.scope,
                url = scope.url,
                keyword = scope.$keyword,
                params = angular.extend({}, scope.params || {});
            if (!!$.trim(me.element.val())) {
                scope.keywordPropertySetter(params, keyword);
            }

            scope.pageSetter(params, page);
            scope.pageSizeSetter(params, scope.pageSize);

            $http.get(url, {params: params}).success(function (result) {
                if (result && result.success) {
                    var data = result.data;
                    me.columns = scope.columnsGetter(data);
                    me.source = scope.sourceGetter(data);

                    scope.page = page;

                    scope.totalCount = scope.totalCountGetter(data);
                    scope.totalPage = Math.ceil(scope.totalCount / scope.pageSize);
                    scope.pageRange = me.getPageRange();
                    scope.start = scope.pageRange[0];
                    scope.end = scope.pageRange[scope.pageRange.length - 1];
                    if (angular.isFunction(callback)) {
                        callback();
                    }
                }
            });
        };

        Associate.prototype.reSearch = function () {
            var me = this;
            if (me.reSearchTimer) {
                $timeout.cancel(me.reSearchTimer);
                me.reSearchTimer = undefined;
            }
            me.reSearchTimer = $timeout(function () {
                /**modify by wengms V1.00.01 2015-05-12 增加对空值的判断，防止在表单的空值时第一次翻页会刷新页面的问题 begin**/
                if (me.scope.$keyword === undefined && me.element.val()==="") {
                    me.showView();
                    return;
                }else{
                    me.scope.$keyword = me.element.val();
                    me.goPage(1, function () {
                        me.reSearchTimer = undefined;
                        me.showView();
                    });
                }


            }, 300);

        };


        Associate.prototype.bodyClick = function (event) {
            var $row = $(event.srcElement || event.target).closest('tr'),
                rowIndex = $row.data('row-index'),
                rowData = this.source[rowIndex];

            this.rowClick(rowData, rowIndex);
        };

        Associate.prototype.getSelectedId = function (rowData) {
            return this.scope.idGetter(rowData);
        };

        Associate.prototype.rowClick = function (rowData, rowIndex) {
            var me = this,
                ngModel = me.ngModel,
                scope = me.scope,
                element = me.element;
            //scope.display = me.getDisplay(rowData);

            if (angular.isDefined(ngModel)) {
                ngModel.$setViewValue(me.getDisplay(rowData));
                ngModel.$render();
            } else {
                element.val(me.getDisplay(rowData));
            }
            scope.selectedId = me.getSelectedId(rowData);
            scope.selectedIndex = rowIndex;
            scope.$selectedRow = rowData;
            if (angular.isString(me.attributes.selectedRow)) {
                scope.selectedRow = rowData;
            }
            me.hideView();
        };

        Associate.prototype.getDisplay = function (rowData) {
            var value = $parse(this.getDisplayExpress())(rowData);
            value =!!value?value.toString().replace(/<[^>]+>/g, ""):'';
            return value;
        };

        Associate.prototype.getDisplayExpress = function () {
            var columns = this.columns,
                displayExpress = this.scope.displayExpress,
                i, len, column;
            if (!angular.isString(displayExpress)) {
                for (i = 0, len = columns.length; i < len; i++) {
                    column = columns[i];
                    if (column.data && column.type !== 'hidden') {
                        return column.data;
                    }
                }
                return '';
            }

            return displayExpress;
        };

        Associate.prototype.hideView = function () {
            var me = this,
                scope = me.scope,
                element = me.element,
                ngModel = me.ngModel,
                $tableWrapper = scope.$tableWrapper;
            if ($tableWrapper.is(":visible")) {
                if (scope.$selectedRow ===undefined && element.val() !== undefined) {
                    $tableWrapper.hide();
                    return;
                }
                if (scope.$selectedRow === undefined || element.val() !== me.getDisplay(scope.$selectedRow)) {
                    scope.$apply(function () {
                        if (angular.isString(me.attributes.selectedRow)) {
                            scope.selectedRow = undefined;
                        }
                        scope.$keyword = undefined;
                        scope.$selectedRow = undefined;

                        if (angular.isDefined(ngModel)) {
                            ngModel.$setViewValue(undefined);
                            ngModel.$render();
                        } else {
                            element.val(undefined);
                        }
                        scope.selectedId = undefined;
                    });
                }
                $tableWrapper.hide();
            }
        };

        Associate.prototype.showView = function () {
            var me = this,
                scope = me.scope,
                tableWrapper = scope.$tableWrapper,
                element = me.element,
                $elementPosition = element.position();
            tableWrapper.css({
                top: $elementPosition.top + element.outerHeight(),
                left: $elementPosition.left
            });
            /**delete by wengms V1.00.00 2015-05-12 删除此处调用，防止在reSearch与showView相互调用，导致堆栈内存溢出 begin**/
            /*if (scope.$keyword && (!me.source || me.source.length === 0)) {
             me.reSearch();
             }*/
            /**delete by wengms V1.00.00 2015-05-12 删除此处调用，防止在reSearch与showView相互调用，导致堆栈内存溢出 end**/

            tableWrapper.show();
        };


        return {
            restrict: 'A',
            priority: 100,
            scope: {
                url: '@gAssociate',
                // setter
                pageProp: '@',
                pageSizeProp: '@',
                keywordProp: '@',

                //getter
                totalCountProp: '@',
                sourceProp: '@',
                columnsProp: '@',
                // require
                idProp: '@',

                displayExpress: '@',
                submitName: '@',

                //displayModel:'=',
                // require
                submitModel: '=',

                tableCssStyle: '@',

                selectedRow: '=',
                relationShip:'@',

                params: "="
            },
            require: '?ngModel',

            compile:function (tElement, tAttrs) {
                tElement.attr('ng-change', 'associate.reSearch()');

                tElement.removeAttr('g-associate');
                return function (scope, element, attributes, ngModel) {

                    var pageProperty = scope.pageProp || 'page',
                        pageSizeProperty = scope.pageSizeProp || 'pageSize',
                        keywordProperty = scope.keywordProp || 'keyword',
                        totalCountProperty = scope.totalCountProp || 'totalCount',
                        sourceProperty = scope.sourceProp || 'source',
                        columnsProperty = scope.columnsProp || 'columns',
                        idProperty = scope.idProp || 'id',
                        timer;

                    $compile(element)(scope);
                    element.wrap('<span class="associate"></span>');
                    scope.$tableWrapper = $compile(associateTmpl)(scope);
                    element.after(scope.$tableWrapper);


                    // default properties
                    scope.page = 1;
                    scope.pageSize = Number(attributes.pageSize) || 10;
                    // setter                                                                                                                                     .
                    scope.pageSetter = $parse(pageProperty).assign;
                    scope.pageSizeSetter = $parse(pageSizeProperty).assign;
                    scope.keywordPropertySetter = $parse(keywordProperty).assign;
                    // getter
                    scope.totalCountGetter = $parse(totalCountProperty);
                    scope.sourceGetter = $parse(sourceProperty);
                    scope.columnsGetter = $parse(columnsProperty);
                    scope.idGetter = $parse(idProperty);

                    var associate = scope.associate = new Associate(scope, element, attributes,ngModel);
                    if (attributes.api) {
                        scope.api = associate;
                    }

                    element.on('blur', function () {
                        timer = $timeout(function () {
                            associate.hideView();
                        }, 200);
                    });
                    $(document).on('click', function (event) {
                        if (element.parent().find(event.srcElement || event.target).length === 0) {
                            associate.hideView();
                        } else if (timer) {
                            $timeout.cancel(timer);
                        }
                    });
                    element.on('focus', function (event) {
                        if (element.val() !== scope.$keyword ) {
                            scope.$keyword = element.val();
                        }
                        //if (!scope.$keyword) {
                        associate.reSearch();
                        //};
                    });

                    element.on('keydown', function (event) {
                        var e = e || event;
                        var currKey = e.keyCode || e.which || e.charCode;
                        switch (currKey) {
                            //方向左键
                            case 37:
                                if (1 < scope.page) {
                                    associate.goPage(scope.page - 1);
                                }
                                break;
                            //方向右键
                            case 39:
                                var tempPage = scope.page + 1 > scope.totalPage ? 1 : scope.page + 1;
                                associate.goPage(tempPage);
                                break;
                            //方向上键
                            case 38:
                                if (angular.isUndefined(scope.hoverId))
                                    scope.hoverId = associate.source.length - 1;
                                else {
                                    scope.hoverId = scope.hoverId < 0 ? associate.source.length - 1 : scope.hoverId - 1;
                                }
                                scope.$apply();
                                break;
                            //方向下键
                            case 40:
                                if (angular.isUndefined(scope.hoverId))
                                    scope.hoverId = 0;
                                else {
                                    scope.hoverId = scope.hoverId >= associate.source.length ? 0 : scope.hoverId + 1;
                                }
                                scope.$apply();
                                break;
                            //回车键
                            case 13:
                                if (angular.isDefined(scope.hoverId)) {
                                    var rowData = associate.source[scope.hoverId]
                                    associate.rowClick(rowData, scope.hoverId);
                                    scope.$apply();
                                }
                                break;
                            default :
                                break;
                        }
                    });

                    if (!!attributes.submitModel) {
                        scope.$watch('selectedId', function (newVal) {
                            scope.submitModel = newVal;
                        });
                        scope.$watch('submitModel', function (newVal) {
                            scope.selectedId = newVal;
                            //!!scope.displayModel?ngModel.$setViewValue(scope.displayModel):ngModel.$setViewValue(newVal);
                            //ngModel.$render();
                        });
                        if(!!attributes.selectedRow){
                            scope.$watch('selectedRow',function(newVal){
                                if(newVal!==undefined){
                                    if (angular.isDefined(ngModel)) {
                                        ngModel.$setViewValue(associate.getDisplay(newVal));
                                        ngModel.$render();
                                    } else {
                                        element.val(associate.getDisplay(newVal));
                                    }
                                    scope.selectedId = associate.getSelectedId(newVal);
                                }
                            });
                        }
                    }

                    if (!!attributes.submitName) {
                        element.next().children(':hidden').attr('name', attributes.submitName);
                    }

                    associate.goPage(1);
                }
            }
        };
    };
});