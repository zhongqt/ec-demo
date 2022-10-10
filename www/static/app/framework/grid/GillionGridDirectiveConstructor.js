define('framework/grid/GillionGridDirectiveConstructor', ['angular'], function (angular) {

        return function ($filter, $parse, $compile, $http, Arrays, Predicates) {
            function Grid($scope, $element, $attrs) {
                var me = this;
                me.$element = $element;
                me.$attrs = $attrs;
                me.$scope = $scope;
                me.columns = $scope.columns;
                me.cellValueGetterCache = {};
                me.hasCheckbox = $scope.hasCheckbox;
                me.allChecked = false;
                me.displayNull = false;
                me.displayNullExpress = me.$scope.displayNullExpress;
                me.sortMsg = {};
                me.url = $scope.url;
                me.actions = {};
                me.requestParams = {};
                me.sourceField = me.$scope.rootField;

                me.columnField = me.$scope.columnField;
                me.sort = {
                    predicate: "",
                    reverse: false,
                    notSort: true,
                    sortNameFile: me.$scope.sortNameField,
                    sortDirectionField: me.$scope.sortDirectionField,
                    sortItem: me.$scope.gridSortItem
                };
                me.sortable = $scope.sortable;

                me.genRequestParam(me.$scope.params);
                me.doRequestData();
                me.setRawSource($scope.source);
                $scope.$watch('rawSource', function () {
                    me.initSource($scope);
                });
            }

            Grid.prototype.getAllCheckedRows = function () {
                if (this.source && this.source.length > 0) {
                    var arrays = Arrays.filter(this.source, Predicates.newPropValEqPredicate('checked', true));
                    return Arrays.transform(arrays, function (row) {
                        return row.entity;
                    });
                }
            };

            Grid.prototype.setRawSource = function (source) {
                this.displayNull = false;
                if (!angular.isDefined(source) || source.length < 1) {
                    this.displayNull = true;
                }
                this.rawSource = this.$scope.rawSource = source || [];
                if (this.$attrs.hasOwnProperty('source')) {
                    this.$scope.source = this.rawSource;
                }
            };

            Grid.prototype.setColumn = function (columns) {
                var me = this;
                me.columns = columns;
                this.$scope.columns = columns;
            };

            Grid.prototype.toggleAll = function () {
                if (this.allChecked === true) {
                    Arrays.doForAll(this.source, function (element) {
                        element.checked = true;
                    });
                } else {
                    Arrays.doForAll(this.source, function (element) {
                        element.checked = false;
                    });
                }
            };

            /**
             * @private
             */
            Grid.prototype.toggle = function () {
                if (Arrays.allAre(this.source, Predicates.newPropValEqPredicate('checked', true))) {
                    this.allChecked = true;
                } else {
                    this.allChecked = false;
                }
            };

            /**
             * @private
             */
            Grid.prototype.doRequestData = function () {
                var me = this,
                    requestArg = [me.url],
                    url = this.url,
                    params = this.requestParams;


                if (angular.isString(url)) {
                    if (angular.isDefined(params)) {
                        requestArg.push({
                            'params': params
                        });
                    }
                    $http.get.apply(window, requestArg).success(function (result) {
                        if (angular.isArray(result)) {
                            me.setRawSource(result);
                        } else if (result.success) {
                            me.setRawSource(me.sourceGetter(result));
                            if (angular.isUndefined(me.columns)){
                                me.columns = me.columnGetter(result);
                            }
                        }
                    });
                }
            };

            /**
             * @private
             */
            Grid.prototype.initSource = function () {
                var rawSource = this.$scope.rawSource,
                    source = [],
                    i, len;
                if (angular.isArray(rawSource)) {
                    if (rawSource.length > 0) {
                        for (i = 0, len = rawSource.length; i < len; i++) {
                            source.push({
                                checked: false,
                                entity: rawSource[i]
                            });
                        }
                    }
                    this.source = source;
                }
            };

            /**
             * @private
             * @param row
             * @param col
             * @return {*}
             */
            Grid.prototype.getCellValue = function (row, col) {
                if (!this.cellValueGetterCache[col.data]) {
                    this.cellValueGetterCache[col.data] = this.generateCellValueGetter(col);
                }
                return this.cellValueGetterCache[col.data](row);
            };

            /**
             * @private
             * @param col
             * @return {*}
             */
            Grid.prototype.generateCellValueGetter = function (col) {
                if (col.data) {
                    return $parse('entity.' + col.data);
                }
                return angular.noop;
            };

            /**
             * @private
             * @param val
             * @param cellScope
             * @return {*}
             */
            Grid.prototype.doFilters = function (val, cellScope) {
                var col = cellScope.col,
                    filters = col.filters,
                    i, len, filter;
                if (angular.isString(filters)) {
                    return this.doFilter(val, filters, cellScope)
                } else if (angular.isArray(filters)) {
                    for (i = 0, len = filters.length; i < len; i++) {
                        filter = filters[i];
                        if (angular.isString(filter)) {
                            val = this.doFilter(val, filter, cellScope);
                        }
                    }
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
            Grid.prototype.doFilter = function (val, filterName, cellScope) {
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

            /**
             * 表头单击排序,冒泡事件
             * @param header    表头名
             */
            Grid.prototype.headerClick = function (event) {
                if (!this.sortable)
                    return;
                var $row = $(event.srcElement || event.target).closest('th');
                var me = this,
                    header = $row.data("column-mark"),
                    params = this.$scope.params,
                    direction = "desc";

                if (angular.isDefined(header) && this.hasSortItem(header)) {
                    me.sort.predicate = header;
                    me.sort.notSort = true;
                    if (header === me.sortMsg.sortName) {
                        if (me.sortMsg.sortDirection === "desc") {
                            direction = "asc";
                            me.sort.reverse = true;
                            me.sort.notSort = false;
                        }
                        else if (me.sortMsg.sortDirection === "asc") {
                            direction = "";
                            me.sort.reverse = false;
                            me.sort.notSort = true;
                        }
                        else if (me.sortMsg.sortDirection === "") {
                            direction = "desc";
                            me.sort.reverse = false;
                            me.sort.notSort = false;
                        }
                    } else {
                        me.sort.reverse = false;
                        me.sort.notSort = false;
                    }
                    me.sortMsg.sortName = header;
                    me.sortMsg.sortDirection = direction;
                    var sortObj = {};
                    sortObj[me.sort.sortNameFile] = header;
                    sortObj[me.sort.sortDirectionField] = direction;
                    me.genRequestParam(sortObj);
                    me.doRequestData();
                }
            };

            Grid.prototype.genRequestParam = function (obj) {
                var me = this;
                if (angular.isDefined(obj)) {
                    for (var temp in obj)
                        me.requestParams[temp] = obj[temp];
                }
            };

            Grid.prototype.sourceFieldSetter = function (sourceField) {
                this.sourceField = sourceField;
            };

            Grid.prototype.sourceGetter = function (data) {
                var me = this,
                    theSourceField = me.sourceField;
                if (angular.isString(theSourceField) && theSourceField.length > 0) {
                    return $parse(theSourceField)(data);
                }
                return me.$scope.source;
            };

            Grid.prototype.columnSetter = function (columnField) {
                this.columnField = columnField;
            };

            Grid.prototype.columnGetter = function (data) {
                return $parse(this.columnField)(data);
            };

            Grid.prototype.hasSortItem = function (item) {


                if (angular.isUndefined(this.$scope.sortItem))
                    return true;
                for (var i = 0; i < this.sort.sortItem.length && this.sort.sortItem[i] != item; i++);
                return !(i == this.sort.sortItem.length);
            };


            return {
                template: '<div class="dataTables_wrapper"> <table class="dataTable cell-border compact"> <thead ng-click="grid.headerClick($event)"> <th ng-if="grid.hasCheckbox"><input type="checkbox" ng-model="grid.allChecked" ng-change="grid.toggleAll()"/></th> <th  ng-repeat="col in grid.columns"　 ng-if="col.type !== \'hidden\'" data-column-mark="{{col.data}}"   ng-class="{sorting_asc:grid.sort.predicate===col.data&&grid.sort.reverse&&!grid.sort.notSort&&grid.sortable&&grid.hasSortItem(\'{{col.data}}\'),sorting_desc:grid.sort.predicate===col.data&&!grid.sort.reverse&&!grid.sort.notSort&&grid.sortable&&grid.hasSortItem(\'{{col.data}}\'),sorting:grid.sort.notSort&&grid.sortable&&grid.hasSortItem(\'{{col.data}}\')}" >{{col.header}}</th> </thead> <tbody> <tr ng-repeat="(rowIndex, row) in grid.source" data-row-index="{{rowIndex}}"> <th ng-if="grid.hasCheckbox" action="$grid-checkbox"><input type="checkbox" ng-model="row.checked" ng-change="grid.toggle()"/></th> <td g-grid-cell ng-repeat="(cellIndex, col) in grid.columns" ng-if="col.type !== \'hidden\'" data-cell-index="{{cellIndex}}"></td> </tr><tr ng-show="grid.displayNull"> <td colspan="{{grid.columns.length+1}}"><center>{{grid.displayNullExpress}}</center></td>  </tr> </tbody> </table> <div ng-transclude></div> </div>',
                replace: true,
                priority: 0,
                restrict: 'EA',
                transclude: true,
                scope: {
                    columns: "=",
                    source: "=",
                    params: "=",
                    url: "@",

                    /**
                     * @scope {HTMLTableRowElement} row
                     * @param {DocumentEvent} event
                     * @param {Number} rowIndex
                     */
                    onRowClick: '=',
                    hasCheckbox: '@',
                    api: "=",

                    /**
                     * @param {Grid} grid
                     */
                    initCallback: '=',

                    /**
                     * {sortParamName,sortDireName}
                     */


                    rootField: "@",
                    columnField: "@",
                    sortNameField: '@',
                    sortDirectionField: '@',
                    displayNullExpress: "@",
                    sortable: "@",
                    sortItem: "="
                },
                controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                    $scope.sortNameField = $scope.sortNameField || "sortName";
                    $scope.sortDirectionField = $scope.sortDirectionField || "sortDirect";
                    $scope.displayNullExpress = $scope.displayNullExpress || "暂无数据!";
                    $scope.rootField = $scope.rootField || 'data.source';
                    $scope.columnField = $scope.columnField || "data.columns";
                    $scope.sortable = $scope.sortable || true;
                    if (angular.isString($scope.sortable) && $scope.sortable === "false") {
                        $scope.sortable = false;
                    } else
                        $scope.sortable = true;
                    $scope.gridSortItem = $scope.sortItem || [];


                    var me = this;
                    me.grid = $scope.grid = new Grid($scope, $element, $attrs);
                    // 开发接口给外面调用
                    if ($attrs.hasOwnProperty('api')) {
                        $scope.api = me.grid;
                    }
                    if (angular.isFunction($scope.initCallback)) {
                        $scope.initCallback(me.grid);
                    }
                    $('tbody', $element).click(function (event) {
                        var element = event.srcElement || event.target,
                            $element = angular.element(element),
                            $row = $element.closest('tr'),
                            rowIndex = $row.data('row-index');
                        if ($row.length > 0 && angular.isFunction($scope.onRowClick)) {
                            $scope.onRowClick.call($row[0], event, me.grid.source[rowIndex], rowIndex);
                        }
                    });
                }]
            }
        };
    }
)
;