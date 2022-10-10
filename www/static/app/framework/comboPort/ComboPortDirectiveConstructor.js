/**
 * Created by yanpp on 15-3-23.
 */
define("framework/comboPort/NewComboPortDirectiveConstructor", ['angular', 'jquery'], function (angular, $) {
    var NewComboPortDirectiveConstructor = function ($compile, $http, $parse, $timeout) {
        var template = '<div class="divDialog" symbol="dialog" ng-show="displayProperty" ng-click="comboPort.portClick($event)">\n    <div class="area"><span ng-repeat="region in comboRegion" data-region-code="{{region.areaCode}}"><a\n            onclick="javascript:void(0);">{{region.areaName}}</a></span></div>\n    <table cellpadding="0" cellspacing="0">\n        <tbody>\n        <tr ng-repeat="region in portData.region" data-row-index="{{$index}}" ng-class-even="\'old-region\'">\n            <th>{{region.provinceName}}</th>\n            <td width="{{tdWidth}}" ng-mouseover="comboPort.mouseOver($event)" ng-mouseout="comboPort.mouseOut($event)">\n                <span ng-repeat="port in region.ports"><a href="javascript:void(0);" title="{{port.portName}}" data-code="{{port.portCode}}"\n                                                          data-port-index="{{$index}}">{{port.portShowName}}</a></span></td>\n            <td></td>\n        </tr>\n        </tbody>\n    </table>\n</div>\n<div class="associate" ng-show="displayGridProperty">\n    <div class="table-wrapper">\n        <table cellpadding="0" cellspacing="0" style="{{tableCssStyle}}">\n            <thead>\n            <th ng-repeat="col in comboPort.grid.column" ng-if="col.type !== \'hidden\'">{{col.header}}</th>\n            </thead>\n            <tbody ng-click="comboPort.bodyClick($event)">\n            <tr ng-repeat="(rowIndex, row) in comboPort.grid.source" data-row-index="{{rowIndex}}"\n                ng-class="{\'hover\':hoverId!==undefined&&hoverId==={{rowIndex}},\'selected\':comboPort.getColumnDisplay(row)===display}">\n                <td g-port-grid-cell ng-repeat="(cellIndex, col) in comboPort.grid.column" ng-if="col.type !== \'hidden\'"\n                    data-cell-index="{{cellIndex}}">\n                </td>\n            </tr>\n            </tbody>\n        </table>\n        <div class="paginate"><a class="paginate-button previous ng-class:{\'disabled\': page === 1};"\n                                 ng-click="page === 1 || comboPort.goPage(page -1)">&lt;</a><span\n                class="paginate-button">{{page}}</span><a\n                class="paginate-button next ng-class:{\'disabled\': page === totalPage || totalPage <= 1};"\n                ng-click="comboPort.nextPage()">&gt;</a><span style="float: right; margin-right: 10px;">共 <span\n                ng-bind="totalPage"></span> 页</span></div>\n    </div>\n</div><input type="hidden" name="{{submitName||\'hiddenPort\'}}" ng-value="submitValue"/>';

        function ComboPort($scope, $element, $attributes) {
            var me = this;
            me.element = $element;
            me.attributes = $attributes;
            me.scope = $scope;
            me.grid = {};
            me._initEnvOptions();
            me.getPortData(); //获取港口所有数据
            me.initShowLineAndWidth(); //初始化港口数据显示的行数和在页面中显示的宽度
            me.template = template; //港口控件的模板
            me.cellValueGetterCache = {}; //显示单元格缓存数据
            me.isNext = false; //用于在点击港口控件时赋值，判断点击后是否隐藏控件
        }


        /**
         * 获取所有的港口数据
         * @return {[type]} [description]
         */
        ComboPort.prototype.getPortData = function () {
            var me = this,
                scope = me.scope,
                url = scope.comboUrl;
            $http.get(url).success(function (data) {
                scope.comboRegion = scope.comboRegionGetter(data);
                me.initRegions(scope.comboRegion);
            });
        };

        /**
         * 获取指定行中指定列的数据
         * @param  {[type]} row [description]
         * @param  {[type]} col [description]
         * @return {[type]}     [description]
         */
        ComboPort.prototype.getCellValue = function (row, col) {
            if (!this.cellValueGetterCache[col.data]) {
                this.cellValueGetterCache[col.data] = this.generateCellValueGetter(col.data);
            }
            return this.cellValueGetterCache[col.data](row);
        };

        /**
         * 生成获取港口单元值的函数
         * @param  {[type]} propertyPath [description]
         * @return {[type]}              [description]
         */
        ComboPort.prototype.generateCellValueGetter = function (propertyPath) {
            if (propertyPath) {
                return $parse(propertyPath);
            }
            return angular.noop; //返回无用的一个函数
        };


        /**
         * 过滤
         * @param  {[type]} val       [description]
         * @param  {[type]} cellScope [description]
         * @return {[type]}           [description]
         */
        ComboPort.prototype.doFilters = function (val, cellScope) {

            var col = cellScope.col,
                filters = col.filters,
                i,
                len,
                filter;
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
         * 初始化地区分类信息
         * @param {[type]} source [description]
         */
        ComboPort.prototype.initRegions = function (regionDatas) {
            var me = this,
                scope = me.scope,
                regions = {
                    "region": []
                },
                provinces;
            angular.forEach(regionDatas, function (regionData) {
                provinces = scope.comboProvinceGetter(regionData);
                if (angular.isDefined(provinces)) {
                    angular.forEach(provinces, function (province) {
                        regions.region.push(province);
                        //根据显示的名称，设置显示容器的宽度，防止变形溢出
                        angular.forEach(province.ports, function (port) {
                            port.portShowName = port.portName.length > 11 ? port.portName.substr(0, 7) + "..." : port.portName;
                        });
                    });
                }
            });
            me.regions = scope.portData = regions;
            if (angular.isDefined(scope.showNameWidth)) {
                scope.showNameWidth = {width : scope.showNameWidth + "px"};
            }
        };

        /**
         * 港口面板点击事件
         * @param  {[type]} event [description]
         * @return {[type]}       [description]
         */
        ComboPort.prototype.portClick = function (event) {
            var $row = $(event.srcElement || event.target).closest('tr'),
                rowIndex = $row.data('row-index'),
                rowData = this.regions.region[rowIndex];

            if (rowData) {
                var aElement = (event.srcElement || event.target);
                if (aElement.tagName.toLowerCase() === "a") {
                    var selectedPort = $(aElement).data("code");
                    var port = $(aElement).data("port-index");
                    var me = this,
                        scope = me.scope;
                    scope.selectedPort = selectedPort;

                    var selectedDataTemp = {
                        "regionName": rowData.provinceName,
                        "regionCode": rowData.provinceCode,
                        "portName": rowData.ports[port].portName,
                        "portCode": rowData.ports[port].portCode
                    };
                    scope.display = me.getDisplay(selectedDataTemp);
                    scope.submitValue = me.getSubmitValue(selectedDataTemp);
                    if (this.attributes.hasOwnProperty("selectedData")) {
                        scope.selectedData = selectedDataTemp;
                    }
                    if (scope.isReplaceElementText && angular.isString(scope.isReplaceElementText) && scope.isReplaceElementText.toLowerCase() === "true") {
                        if (this.element.context.tagName.toLowerCase() === "input") {
                            this.element.val(scope.display);
                        } else {
                            this.element.html(scope.display);
                        }
                        scope.$keyword = scope.display;
                    }
                    this.isNext = false;
                    this.hiddenAll();
                }
            } else {
                this.isNext = true;
                var $span = $(event.srcElement || event.target).closest('span'),
                    regionCode = String($span.data("region-code"));
                if (angular.isDefined(regionCode) && regionCode.length > 0) {
                    this.regionFilter(regionCode);

                } else {
                    this.initRegions(this.scope.comboRegion);
                }

            }
        };

        /**
         * [regionFilter description]
         * @param  {[type]} input [description]
         * @return {[type]}       [description]
         */
        ComboPort.prototype.regionFilter = function (input) {
            var me = this,
                scope = me.scope,
                regions = scope.comboRegion,
                filterResult = [];
            angular.forEach(regions, function (region) {
                if (region.areaCode === input) {
                    filterResult.push(region);
                }
            });
            if (filterResult.length > 0) {
                this.initRegions(filterResult);
            }
        };


        ComboPort.prototype.setSelectedData = function (rowData, index) {
            var me = this,
                scope = me.scope,
                selectedDataTemp;

            scope.hoverId = index;


            selectedDataTemp = {
                "regionName": scope.regionNameGetter(rowData),
                "regionCode": scope.regionCodeGetter(rowData),
                "portName": scope.portNameGetter(rowData),
                "portCode": scope.portGetter(rowData)
            };

            scope.display = me.getDisplay(selectedDataTemp);
            scope.submitValue = me.getSubmitValue(selectedDataTemp);
            //if (this.attributes.hasOwnProperty("selectedData")) {
            scope.selectedData = selectedDataTemp;
            //}

            if (scope.isReplaceElementText && angular.isString(scope.isReplaceElementText) && scope.isReplaceElementText.toLowerCase() === "true") {
                if (this.element.context.tagName.toLowerCase() === "input") {
                    this.element.val(scope.display);
                } else {
                    this.element.html(scope.display);
                }
            }
            me.isNext = false;
            me.hiddenAll();
        };

        ComboPort.prototype.getColumnDisplay = function (rowData) {
            var me = this,
                scope = me.scope,
                selectedDataTemp;
            selectedDataTemp = {
                "regionName": scope.regionNameGetter(rowData),
                "regionCode": scope.regionCodeGetter(rowData),
                "portName": scope.portNameGetter(rowData),
                "portCode": scope.portGetter(rowData)
            };
            return me.getDisplay(selectedDataTemp);
        };


        ComboPort.prototype.toggleDisplay = function () {
            var me = this,
                scope = me.scope;
            scope.displayProperty = !scope.displayProperty;
        };


        ComboPort.prototype.mouseOver = function (event) {
            var $row = $(event.srcElement || event.target).closest('a');
            $row.addClass("spanMouseover");
        };

        ComboPort.prototype.mouseOut = function (event) {
            var $row = $(event.srcElement || event.target).closest('a');
            $row.removeClass("spanMouseover");
        };


        ComboPort.prototype.initShowLineAndWidth = function () {
            var me = this,
                scope = me.scope,
                number = parseInt(scope.perLineDisplayCount, 10);
            if (!angular.isNumber(number)) {
                number = scope.defaultDisplayNumber;
            }
            number = (number * 65) + (number * 5);
            scope.tdWidth = number;
        };

        ComboPort.prototype.getSubmitValue = function (value) {
            return $parse(this.getSubmitExpress())(value);
        };

        ComboPort.prototype.getSubmitExpress = function () {
            var defaultSubmitExpress = "portCode",
                submitValueExpress = this.scope.submitValueExpress || defaultSubmitExpress;
            if (!angular.isString(submitValueExpress)) {
                return defaultSubmitExpress;
            }
            return submitValueExpress;
        };

        ComboPort.prototype.getDisplay = function (value) {

            return $parse(this.getDisplayExpress())(value);
        };

        ComboPort.prototype.showGrid = function () {
            this.scope.displayProperty = false;
            this.scope.displayGridProperty = true;
        };

        ComboPort.prototype.hiddenAll = function () {

            if (!this.isNext) {
                this.scope.displayProperty = false;
                this.scope.displayGridProperty = false;
            }
            this.isNext = false;


        };
        ComboPort.prototype.showComboPort = function () {
            this.scope.displayProperty = true;
            this.scope.displayGridProperty = false;
        };


        ComboPort.prototype.getDisplayExpress = function () {
            var columns = this.columns,
                defaultExpress = "'地区：'+regionName +',港口：' + portName",
                displayExpress = this.scope.displayExpress || defaultExpress,
                i,
                len,
                column;

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

        ComboPort.prototype.bodyClick = function (event) {
            var $row = $(event.srcElement || event.target).closest('tr'),
                rowIndex = $row.data('row-index'),
                rowData = this.grid.source[rowIndex];
            this.setSelectedData(rowData, rowIndex);
        };

        ComboPort.prototype.rowClick = function (rowData) {
            var me = this,
                scope = me.scope;
            scope.display = me.getDisplay(rowData);
            if (scope.isReplaceElementText && angular.isString(scope.isReplaceElementText) && scope.isReplaceElementText.toLowerCase() === "true") {
                if (this.element.context.tagName.toLowerCase() === "input") {
                    this.element.val(scope.display);
                } else {
                    this.element.html(scope.display);
                }
            }
        };

        ComboPort.prototype.getPageRange = function () {
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


        ComboPort.prototype.goPage = function (page, callback) {
            var me = this,
                scope = me.scope,
                url = scope.url,
                keyword = $.trim(scope.$keyword), //屏蔽空格
                params = angular.extend({}, scope.params || {});


            if (!!$.trim(me.element.val())) {
                scope.keywordPropertySetter(params, keyword);
            }
            scope.pageSetter(params, page);
            scope.pageSizeSetter(params, scope.pageSize);

            $http.get(url, {
                params: params
            }).success(function (result) {
                if (result && result.success) {
                    var data = result;
                    me.grid.column = scope.columnsGetter(data);
                    me.grid.source = scope.sourceGetter(data);
                    scope.page = page;
                    scope.totalCount = scope.totalCountGetter(data);
                    scope.totalPage = Math.ceil(scope.totalCount / scope.pageSize);
                    scope.pageRange = me.getPageRange();
                    scope.start = scope.pageRange[0];
                    scope.end = scope.pageRange[scope.pageRange.length - 1];
                    callback.call(me, result);
                }
            });
        };

        ComboPort.prototype.reSearch = function (callback) {
            var me = this;
            me.scope.selectedData = undefined;
            if (me.reSearchTimer) {
                $timeout.cancel(me.reSearchTimer);
                me.reSearchTimer = undefined;
            }

            me.reSearchTimer = $timeout(function () {
                me.scope.$keyword = me.toCDB(me.element.val());
                me.element.val(me.toCDB(me.element.val()));
                me.goPage(1, function (data) {
                    me.reSearchTimer = undefined;
                    me.scope.hoverId = undefined;
                    if (angular.isFunction(callback)) {
                        callback.call(me, data);
                    }

                });
            }, 300);
        };

        ComboPort.prototype.toCDB = function (str) {
            var tmp = "",
                length = str.length,
                i;
            for (i = 0; i < length; i++) {
                if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
                    tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
                } else {
                    tmp += String.fromCharCode(str.charCodeAt(i));
                }
            }
            tmp.replace("　", ' ');
            return tmp;
        };

        ComboPort.prototype.nextPage = function () {
            this.isNext = true;
            if (this.scope.page >= this.scope.totalPage) {
                this.scope.page = 0;
            }
            this.goPage(this.scope.page + 1);

        };

        /**
         * 初始化港口控件所需的
         * @return {[type]} [description]
         */
        ComboPort.prototype._initEnvOptions = function () {
            var scope = this.scope,
                portProperty = scope.portProperty || "portCode",
                portNameProperty = scope.portNameProperty || 'portName',
                regionCodeProperty = scope.regionCodeProperty || 'areaCode',
                regionNameProperty = scope.regionNameProperty || 'areaName',
                columnsProperty = scope.columnsProperty || 'data.columns',
                sourceProperty = scope.sourceProperty || 'data.source',
                totalCountProperty = scope.totalCountProp || 'data.totalCount',
                comboRegionProperty = scope.comboRegionProperty || 'data',
                comboProvinceProperty = scope.comboProvinceProperty || 'provinces',

                pageProperty = scope.pageProp || 'page',
                pageSizeProperty = scope.pageSizeProp || 'pageSize',
                keywordProperty = scope.keywordProp || 'keyword';
            //getter
            scope.portGetter = $parse(portProperty);
            scope.portNameGetter = $parse(portNameProperty);
            scope.regionCodeGetter = $parse(regionCodeProperty);
            scope.regionNameGetter = $parse(regionNameProperty);
            scope.columnsGetter = $parse(columnsProperty);
            scope.sourceGetter = $parse(sourceProperty);
            scope.totalCountGetter = $parse(totalCountProperty);
            scope.comboRegionGetter = $parse(comboRegionProperty);
            scope.comboProvinceGetter = $parse(comboProvinceProperty);

            //setter
            scope.pageSetter = $parse(pageProperty).assign;
            scope.pageSizeSetter = $parse(pageSizeProperty).assign;
            scope.keywordPropertySetter = $parse(keywordProperty).assign;

            scope.displayProperty = false;
            scope.displayGridProperty = false;
            scope.selectedPort = scope.selectedPort || "";
            scope.portData = [];
            scope.defaultDisplayNumber = 5;

            // default properties
            scope.page = 1;
            scope.pageSize = Number(this.attributes.pageSize) || 10;
        };


        return {
            restrict: 'A',
            priority: 1000,
            scope: {
                url: '@', //输入时获取数据的url
                comboUrl: '@', //未输入任何数据时 显示所有的地区项
                submitName: '@', //不知道有什么用
                api: "=", //对外的API接口，将实例化后的comboport传出
                submitValueExpress: "@", //提交值的表达式
                displayExpress: '@',//显示值的表达式
                perLineDisplayCount: '@',//每行显示数量
                selectedData: "=",//已选择的数据
                isReplaceElementText: "@",
                comboRegionProperty: "@",//地区属性名
                comboProvinceProperty: "@",//省份属性名
                portProperty: "@",//港口属性名
                regionProperty: "@",//地区属性
                portNameProperty: '@',//港口名称属性名
                regionNameProperty: '@',//地区名称属性名
                columnsProperty: "@",//列名属性名
                sourceProperty: '@',//数据源属性名
                //getter
                totalCountProp: '@',//总数量属性
                // setter
                keywordProp: "@",//关键字属性
                pageProp: "@",//分页属性名
                pageSizeProp: "@",//分页大小属性名
                initData: "="
            },
            link: function (scope, element, attributes) {
                var timer,
                    comboPort = new ComboPort(scope, element, attributes),
                    el;

                scope.comboPort = comboPort;

                /*判断是否配置API接口，如果有，则将API对象暴露给上级scope中配置的API名称*/
                if (attributes.api) {
                    scope.api = comboPort;
                }


                //将联想控件框放入绑定的控件上
                el = scope.$tableWrapper = $compile(template)(scope);
                el.css({
                    top: element.offsetTop,
                    left: element.offsetLeft
                });
                el.insertAfter(element);


                //判断是否有初始值,若有初始值则将值赋值到显示页面和提交隐藏域上
                scope.$watch("initData", function () {
                    scope.submitValue = comboPort.getSubmitValue(scope.initData);
                    scope.display = scope.$keyword = comboPort.getDisplay(scope.initData);
                    if (element.context.tagName.toLowerCase() === "input") {
                        element.val(scope.display);
                    } else {
                        element.html(scope.display);
                    }
                });



                //绑定控件的点击事件
                element.on("click", function () {
                    scope.$apply(function () {
                        if (scope.displayProperty || scope.displayGridProperty) {
                            comboPort.hiddenAll();
                        } else {
                            if (scope.$keyword) {
                                comboPort.reSearch(comboPort.showGrid);
                            } else {
                                comboPort.showComboPort();
                            }
                        }
                    });
                });

                //绑定控件的移开操作，隐藏联想控件
                element.on('blur', function () {
                    scope.$apply(function () {
                        timer = $timeout(function () {
                            if (!comboPort.isNext) {
                                comboPort.hiddenAll();
                            }
                        }, 250);

                    });
                });

                //
                $(document).on('click', function (event) {
                    comboPort.isNext = false;
                    scope.$apply(function () {
                        if (element.parent().find(event.srcElement || event.target).length === 0) {
                            comboPort.hiddenAll();
                        } else if (timer) {
                            $timeout.cancel(timer);
                        }
                    });
                });

                //输入框键盘输入事件
                element.on("keyup", function (e) {
                    var currKey = e.keyCode || e.which || e.charCode;
                    switch (currKey) {
                        //方向左键
                    case 37:
                        if (1 < scope.page) {
                            comboPort.goPage(scope.page - 1);
                        }
                        scope.$apply(function () {
                            comboPort.showGrid();
                        });
                        break;
                        //方向右键
                    case 39:
                        var tempPage = scope.page + 1 > scope.totalPage ? 1 : scope.page + 1;
                        comboPort.goPage(tempPage);
                        scope.$apply(function () {
                            comboPort.showGrid();
                        });
                        break;
                        //方向上键
                    case 38:
                        scope.$apply(function () {
                            comboPort.showGrid();
                        });
                        if (angular.isUndefined(scope.hoverId)) {
                            scope.hoverId = comboPort.grid.source.length - 1;
                        } else {
                            scope.hoverId = scope.hoverId < 0 ? comboPort.grid.source.length - 1 : scope.hoverId - 1;
                        }
                        scope.$apply();
                        break;
                        //方向下键
                    case 40:
                        scope.$apply(function () {
                            comboPort.showGrid();
                        });

                        if (angular.isUndefined(scope.hoverId)) {
                            scope.hoverId = 0;
                        } else {
                            scope.hoverId = scope.hoverId >= comboPort.grid.source.length ? 0 : scope.hoverId + 1;
                        }
                        scope.$apply();
                        break;
                        //回车键
                    case 13:
                        if (angular.isDefined(scope.hoverId)) {
                            var rowData = comboPort.grid.source[scope.hoverId];
                            comboPort.setSelectedData(rowData, scope.hoverId);
                            comboPort.isNext = false;
                            scope.$apply(function () {
                                comboPort.showGrid();
                            });
                            comboPort.hiddenAll();
                            scope.$apply();
                        }
                        break;
                    default:
                        comboPort.reSearch();
                        scope.display = undefined;
                        scope.$apply(function () {
                            comboPort.showGrid();
                        });
                        break;
                    }
                });
            }
        };
    };

    return NewComboPortDirectiveConstructor;
});