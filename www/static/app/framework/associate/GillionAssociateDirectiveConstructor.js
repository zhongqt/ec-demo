//20170401
define('framework/associate/GillionAssociateDirectiveConstructor', ['angular', 'artTmpl', 'underscore', 'config.properties',
], function (angular, artTmpl, _, config) {

    var defPreventTabindex = (function () {
        try {
            return config.controls.associate.preventTabindex;
        } catch (e) {
            return true;
        }
    }());

    return function ($window, $document, $compile, $dataSourceManager, $parse, $timeout, $q, $filter, $tabindex, GillionLocationService, GillionMsgService, $rootScope, AssociatePromiseService, GillionMsg, AssociateSettingService) {
        var CREATEDOBJ = "isCreatedObj";
        var extend = function (child, parent) {
                for (var key in parent) {
                    if (hasProp.call(parent, key)) child[key] = parent[key];
                }

                function ctor() {
                    this.constructor = child;
                }

                ctor.prototype = parent.prototype;
                child.prototype = new ctor();
                child.__super__ = parent.prototype;
                return child;
            },
            hasProp = {}.hasOwnProperty;
        var AssociateMulti;

        if ($config.i18nInfo === undefined) $config.i18nInfo = {};
        var associateArtTmpl = '<div class="form-suggestbox-pager" {{if !pageShow}}style="display: none;"{{/if}}>\n    <span>' + ($config.i18nInfo.beforeAssociateTotalRecord ? $config.i18nInfo.beforeAssociateTotalRecord : '找到') + ' {{totalRecord}} ' + ($config.i18nInfo.afterAssociateTotalRecord ? $config.i18nInfo.afterAssociateTotalRecord : '条记录') + '　' + ($config.i18nInfo.beforeAssociateRecordFrom ? $config.i18nInfo.beforeAssociateRecordFrom : '显示') + '{{recordFrom}}' + ($config.i18nInfo.betweenAssociateRecordFromAndRecordTo ? $config.i18nInfo.betweenAssociateRecordFromAndRecordTo : '到') + '{{recordTo}}</span>\n    <button type="button" class="btn" data-role="prevPage"><i class="fi fi-reverse"></i></button>\n    <button type="button" class="btn" data-role="nextPage"><i class="fi fi-forward"></i></button>\n</div>\n<table class="form-suggestbox-table">\n    <thead {{if !isShow}}style="display: none;"{{/if}}>\n        <tr>\n            {{if multi==="true"}}\n            <th width="30">&nbsp;</th>\n            {{/if}}\n            {{each columns as column}}\n            <th{{if (column.width)}} width="{{column.width}}"{{/if}}>{{column.text}}</th>\n            {{/each}}    \n        </tr>\n    </thead>\n    <tbody>\n    {{each dataSource as record}}\n    <tr>\n        {{if multi==="true"}}\n        <td>\n            <div class="form-clickbox"{{if associate._isSelected(record)}} selected="selected"{{/if}}><i class="fi"></i></div>\n        </td>\n        {{/if}}\n        {{each columns as column}}\n            <td>{{column.getDisplay(record)}}</td>\n        {{/each}}\n    </tr>\n    {{/each}}\n    </tbody>\n</table>\n';

        //判断是否空对象或空数组
        function isEmptyObject(obj) {
            if (obj == undefined) return true;
            if (angular.isArray(obj)) {
                return obj.length == 0;
            } else {
                for (var name in obj) {
                    return false;
                }
                return true;
            }
        }

        function clearObject(obj) {
            if (obj == undefined) return;
            if (angular.isArray(obj)) {
                obj.length = 0;
                return;
            } else {
                for (var name in obj) {
                    obj[name] = undefined;
                }
            }
        }

        function Associate($scope, $element, $attrs, ngModel) {
            var me = this;
            me.element = $element;
            me.attrs = $attrs;
            me.scope = $scope;
            me.ngModel = ngModel;
            me.associateDeferred = [];
        }

        Associate.prototype.getCompiledAssociateTemplate = function () {
            "use strict";
            var me = this;
            if (!me.compiledAssociateTemplate) {
                me.compiledAssociateTemplate = artTmpl.compile(associateArtTmpl);
            }
            return me.compiledAssociateTemplate;
        };

        Associate.prototype.validateValueMatch = function () {
            var me = this,
                scope = me.scope,
                source = scope.dataSource;

            return;
            if (scope.multi === true && scope.multi === "true") return;
            if (_.isEmpty(scope.$selectedRow) || _.isEmpty(source)) return;
            var display = scope.$selectedRow[me.attrs.displayExpress];
            var value = scope.$selectedRow[me.attrs.valueProp];
            if (_.isEmpty(display) && _.isEmpty(value)) return;
            var record = _.find(source, function (item) {
                return item[me.attrs.displayExpress] == display;
            });
            if (record && record[me.attrs.valueProp] == value) {
                return;
            } else {
                scope.$selectedRow = {};
                scope.selectedRow = {};
                scope.keyword = scope.$keyword = scope.blurText = '';
                me.focusEvent();
                if (record && display) {
                    GillionMsg.alert("提示", "值与记录不匹配");
                }
            }
        };

        Associate.prototype.blurHandle = function () {
            var associate = this;
            var scope = associate.scope;
            scope.isOperSelf = false;

            if (scope.ngDisabled || scope.disabled || scope.ngReadonly || scope.readonly) return;
            if (scope.firstTime || scope.justSelected) {
                associate.hideView();
                /*associate.selectedRowToModelValue();
                 if (scope.unmatchRemove) {
                 associate.selectedRowToDisplay();
                 }
                 associate.apply();*/
                return;
            }
            scope.blurText = scope.inputText.val();
            if (!scope.searchIng) {
                if (scope.unmatchRemove) {
                    scope.deleteOperate = true;
                    scope.bluring = true;
                    associate.showSelected(true);
                    associate.selectedRowToModelValue();
                    associate.selectedRowToDisplay();
                } else {
                    associate.unmatchKeep();
                }
                associate.hideView();
                associate.apply();
                scope.timer = $timeout(function () {
                    if (associate.scope) {
                        associate.validateValueMatch();
                        associate.apply();
                    }
                }, 200);
            } else {
                scope.bluring = true;
                associate.hideView();
                //associate.reSearch();
            }
            if ((associate.attrs.multi === true || associate.attrs.multi === 'true') && scope.blurText == "") associate.emptyOnSelect();
            this.finishLoading();
        };

        Associate.prototype._appendTableWrapper = function () {
            var me = this,
                scope = me.scope,
                $tableWrapper;
            if (scope.$tableWrapper) {
                //scope.$tableWrapper.css({top:0,left:0});
                return;
            }
            $tableWrapper = scope.$tableWrapper = GillionLocationService.getTopJq()('<div ng-show="tableShow" class="form-suggestbox-dropdown"></div>');
            $tableWrapper.css({top:0,left:0});
            GillionLocationService.createHtmltoTop($tableWrapper[0]);
            me._bindEvents();
        };

        Associate.prototype._getOuterGrid = function () {
            var me = this;
            var scope = me.scope;
            if (scope._isInGrid === void 0) {
                var gridElement = scope.inputText.closest('div.grid');
                if (gridElement.length) {
                    scope._isInGrid = true;
                    scope._outerGrid = gridElement;
                } else {
                    scope._isInGrid = false;
                }
            }
        };

        Associate.prototype._bindEvents = function () {
            var me = this,
                scope = me.scope,
                $tableWrapper = scope.$tableWrapper;
            $tableWrapper.on("mousedown", function () {
                if (scope.unmatchRemove && scope.inputText.val() == '') {
                    //scope.inputText.val(scope.blurText);
                    scope.keywordSetter(scope.$parent, "");
                }
                scope.isMouseDown = true;
                if (scope.timer) {
                    $timeout.cancel(scope.timer);
                }
                me._getOuterGrid();
                if (scope._isInGrid && me.attrs.multi === 'true') return;
            });

            //为了解决IE8事件绑定问题, 将$document改为$(window.parent.document)
            $(window.parent.document).on('mousedown.associate' + scope.$id, function (event) {
                var target = event.target;
                var $input = scope.inputText;
                var $table = scope.$tableWrapper;
                if (($input.is(target) && $input[0] != document.activeElement) || ($table && ($table.is(target) || $table.find(target).length))) {
                    if (scope.tableShow) {
                        //me.blurHandle();
                        me.pageMouseDown();
                    }
                    return;
                } else if ($input[0] != document.activeElement || target.className.indexOf("wtHolder") != -1) {
                    me.hideView();
                }
                if (scope.timer) $timeout.cancel(scope.timer);
            });

            $document.on('focus.associate' + scope.$id, '*', function (event) {
                if (event && event.type != "focus") return;
                var target = event.target;
                var $input = $(scope.inputText);
                var $table = scope.$tableWrapper;
                if (!($input.is(target) || ($table && ($table.is(target) || $table.find(target).length)))) {
                    if (scope.tableShow) {
                        //me.apply();
                        me.hideView();
                    }
                }
            });

            $document.on('mouseup.associate' + scope.$id, _.bind(function () {
                this.scope.isMouseDown = false;
            }, me));
            $tableWrapper.on('mouseup.associate' + scope.$id, _.bind(function () {
                this.scope.isMouseDown = false;
            }, me));

            $tableWrapper.on('click', function (event) {
                var $target = GillionLocationService.getTopJq()(event.target),
                    role = $target.closest('button').data('role');
                if (role) {
                    switch (role) {
                        case 'prevPage':
                            me.goPrePage();
                            break;
                        case 'nextPage':
                            me.goNextPage();
                            break;
                    }
                } else {
                    var $row = $target.closest('tr');
                    if ($row.length > 0) {
                        me._rowClick(event, $target, $row, true);
                    }
                }
            });

            $tableWrapper.on('mousedown', function (event) {
                var $target = GillionLocationService.getTopJq()(event.target),
                    role = $target.closest('button').data('role');
                if (role) {
                    switch (role) {
                        case 'prevPage':

                        case 'nextPage':
                            me.pageMouseDown();
                            break;
                    }
                } else {
                    var $row = $target.closest('tr');
                    if ($row.length > 0) {
                        me.pageMouseDown();
                    }
                }
            });
        };

        Associate.prototype._rowClick = function (event, $target, $row, isRowClick) {
            var me = this,
                scope = me.scope,
                rowIndex = $row ? $row[0].rowIndex : 1,
                record = scope.dataSource[rowIndex - 1],
                eventParam = {
                    list: me,
                    $event: event,
                    item: record,
                    isRowClick: isRowClick
                };
            if (scope.timer) {
                $timeout.cancel(scope.timer);
            }
            if (angular.isDefined(me.attrs.onBeforeSelect)) {
                if (scope.onBeforeSelect(eventParam) === false) {
                    return;
                }
            }
            scope.isClick = true;
            scope.justSelected = true;
            scope.setModelValue(scope.valuePropGetter(record));
            scope.inputText.val(me.getDisplay(record));
            scope.$selectedRow = me.mapToSelectedRecord(record);

            var newKeyword = me.getDisplay(record);
            if (me.attrs.gCase = "upper") {
                newKeyword = newKeyword.toUpperCase();
            }
            scope.keywordSetter(scope.$parent, newKeyword);

            if (event && event.currentTarget) me.focusEvent();
            me.hideView();
            me.apply();
            if (angular.isDefined(me.attrs.onSelect)) {
                scope.onSelect(eventParam);
            }
        };

        Associate.prototype.focusEvent = function () {
            var scope = this.scope;
            if (scope.showEvent === 'focus') scope._autoFocus = true;
            if (window.document.documentMode <= 9) {
                var pos = scope.inputText.val().length;
                var range = scope.inputText[0].createTextRange();
                range.collapse(true);
                range.moveStart('character', pos);
                range.moveEnd('character', pos);
                range.select();
            } else {
                scope.inputText[0].focus();
            }
            scope.bluring = false;
        };

        Associate.prototype.mapToSelectedRecord = function (record) {
            var me = this,
                columns = me.scope.columns;
            if (!record) record = {};
            //rs = angular.extend({}, record);
            _(columns).each(function (column) {
                if (column.filter) {
                    record[column.data + '_$bak'] = record[column.data];
                    record[column.data] = column.getDisplay(record);
                }
            });
            return record;
        };

        Associate.prototype._isSelected = function (record) {
            var scope = this.scope;
            return scope.valuePropGetter(record) === scope.valuePropGetter(scope.$selectedRow);
        };

        Associate.prototype.doFilters = function (record, columns, filterNames) {
            var i, len, col, filterToken, tokens;
            for (i = 0, len = columns.length; i < len; i++) {
                col = columns[i];
                filterToken = filterNames[i];
                if (col && filterToken && record[col]) {
                    if (filterToken.indexOf('|') == -1) {
                        if (!record[col + "_$bak"]) {
                            record[col + "_$bak"] = record[col];
                        }
                        record[col] = $filter(filterToken)(record[col]);
                    } else {
                        tokens = filterToken.split('|');
                        angular.forEach(tokens, function (item) {
                            if (item.indexOf(":") != -1) {
                                item = item.split(":");
                                if (!record[col + "_$bak"]) {
                                    record[col + "_$bak"] = record[col];
                                }
                                record[col] = $filter(item[0])(record[col], item[1]);
                            } else {
                                if (!record[col + "_$bak"]) {
                                    record[col + "_$bak"] = record[col];
                                }
                                record[col] = $filter(item)(record[col]);
                            }
                        });
                    }
                }
            }

        };
        /**
         * 跳页
         */
        Associate.prototype.goPage = function (page, callback) {
            var me = this,
                scope = me.scope;
            me.startLoading(true);
            scope.isOperSelf = true;
            var newKeyword = scope.blurText;
            if (me.attrs.gCase = "upper") {
                newKeyword = newKeyword.toUpperCase();
            }
            scope.keywordSetter(scope.$parent, newKeyword);
            if (scope.timer) {
                $timeout.cancel(scope.timer);
            }
            $dataSourceManager.dataSources[scope.sourceName].currentPage = page;
            $dataSourceManager.dataSources[scope.sourceName].doRequestData();
            scope.searchIng = true;
            $rootScope['$$associate_ready'] = !scope.searchIng;
            //this.initDataSource(callback);
        };

        Associate.prototype.pageMouseDown = function () {
            this.scope.clickPage = true;
        };

        Associate.prototype.setPagingButtonStatus = function () {
            var me = this,
                scope = me.scope,
                $tableWrapper = scope.$tableWrapper;
            if (!$tableWrapper) return;

            var $prevButton = $tableWrapper.find("button[data-role=prevPage]");
            var $nextButton = $tableWrapper.find("button[data-role=nextPage]");

            if (scope.page > 1) $prevButton[0].disabled = false;
            else $prevButton[0].disabled = true;

            if ((scope.page != scope.totalPage && scope.totalPage > 1) || scope.hasNextPage) $nextButton[0].disabled = false;
            else $nextButton[0].disabled = true;
        };

        Associate.prototype.goPrePage = function () {
            var me = this,
                scope = me.scope,
                attrs = me.attrs;
            if (scope.page != 1) {
                me.goPage(scope.page - 1);
            }
            me.focusEvent();
        };

        Associate.prototype.goNextPage = function () {
            var me = this,
                scope = me.scope;
            if ((scope.hasNextPage && scope.dataSource && scope.dataSource.length > 0) || (scope.page != scope.totalPage && scope.totalPage > 1)) {
                me.goPage(scope.page + 1);
            }
            me.focusEvent();
        };

        Associate.prototype.apply = function () {
            var me = this;
            var scope = me.scope;
            if (!scope.$root.$$phase) {
                scope.$apply();
                return true;
            }
            return false;
        };

        /**
         * rowData去重
         */
        Associate.prototype.dupRemoval = function (rowDatas) {

            var result = [], hash = {}, value;
            if (rowDatas) {
                for (var i = 0, elem; (elem = rowDatas[i]) != null; i++) {
                    value = this.scope.valuePropGetter(elem);
                    if (!hash[value]) {
                        result.push(elem);
                        hash[value] = true;
                    }
                }
            }
            return result;
        };

        Associate.prototype.displayInit = function (display, value) {

            var me = this,
                myScope = this.scope,
                selectedRow = {};

            if (myScope.$selectedRow && !isEmptyObject(myScope.$selectedRow) && !myScope.initSelectedRow) {
                selectedRow = myScope.$selectedRow;
            } else {
                if (this.attrs.selectedRow) {
                    myScope.selectedRowSetter(myScope.$parent, selectedRow);
                }
            }
            selectedRow[myScope.displayExpress] = display;
            selectedRow[myScope.valueProp] = value;
            selectedRow = me.mapToSelectedRecord(selectedRow);
            myScope.$selectedRow = selectedRow;
            myScope.selectedRow = selectedRow;

            this.selectedRowToDisplay();
            this.keywordSelected();
            this.selectedRowToModelValue();
        };

        Associate.prototype.editRowBroadCast = function () {
            $rootScope.$broadcast("gridEdit" + this.attrs.selectedRow);
        };

        /**
         * 选择第一个
         */
        Associate.prototype.choseFirst = function () {
            var me = this,
                scope = me.scope;
            if (scope.dataSource && scope.dataSource.length >= 1) {
                me._rowClick(scope.dataSource[0]);
                return true;
            }
            return false;
        };

        Associate.prototype._render = function () {
            var me = this,
                attrs = me.attrs,
                scope = me.scope;

            me._appendTableWrapper();

            var $tableWrapper = scope.$tableWrapper,
                tableWrapper = $tableWrapper[0];
            $tableWrapper.html(me.getCompiledAssociateTemplate()(scope));
            $compile($tableWrapper)(scope);

            var tableWidth = tableWrapper.offsetWidth;
            var pagerWidth = $tableWrapper.find(".form-suggestbox-pager").outerWidth();
            var textWidth = scope.inputText.width();
            var tableElWidth = scope.$tableWrapper.find("table").width();
            if ($tableWrapper.css("display") == "none") {
                $tableWrapper.css({top: 0, left: 0});
                $tableWrapper.attr('style', $tableWrapper.attr('style') + 'display: block !important;');
                tableElWidth = scope.$tableWrapper.find("table").width();
                tableWidth = tableWrapper.offsetWidth;
                pagerWidth = $tableWrapper.children("div.form-suggestbox-pager").outerWidth();
                $tableWrapper.attr('style', $tableWrapper.attr('style').split('display: block !important;').join(''));
                $tableWrapper.css('display', 'none');
            }
            $tableWrapper.children("table").css("min-width", "auto");
            if (tableElWidth < pagerWidth)
                $tableWrapper.children("table").css("min-width", tableWidth + "px");
            else
                $tableWrapper.children("table").css("min-width", textWidth + "px");
            if (attrs.pagerWidth) {
                scope.$tableWrapper.find(".form-suggestbox-pager").css("width", attrs.pagerWidth);
            }
        };

        /**
         * 每次请求数据初始化
         * @param callback
         */
        Associate.prototype.initDataSource = function (callback) {
            var me = this,
                scope = me.scope,
                attrs = me.attrs,
                clear = false,
                dataFunc = function (context, dataSource) {
                    scope.searchIng = false;
                    $rootScope['$$associate_ready'] = !scope.searchIng;
                    scope.searched = true;
                    if (angular.element(me.element).parents("body").size() == 0) {
                        //此处是防止dom被remove掉的时候 还会执行回调（表格中）
                        scope.$$listeners = {};
                        return;
                    }
                    scope.totalRecord = dataSource.totalRecord;
                    if (!scope.totalRecord) {
                        scope.recordFrom = 0;
                        scope.recordTo = 0;
                    } else {
                        scope.recordFrom = (dataSource.currentPage - 1) * dataSource.pageSize + 1;
                        if (dataSource.records) {
                            scope.recordTo = scope.recordFrom + dataSource.records.length - 1;
                        } else {
                            scope.recordTo = scope.recordFrom;
                        }
                    }
                    scope.dataSource = dataSource.records;
                    if (scope.dataSource) {
                        angular.forEach(scope.dataSource, function (item) {
                            me.doFilters(item, scope.columns, scope.filters);
                        });
                    }
                    if (document.activeElement == scope.inputText[0]) {
                        scope.isOperSelf = true;
                    }
                    scope.page = dataSource.currentPage;
                    scope.totalPage = dataSource.totalPage;
                    scope.pageShow = attrs.pageShow != "false"; //scope.totalRecord > 10 && attrs.pageShow != "false";
                    scope.hasNextPage = dataSource.hasNextPage;
                    if (me.attrs.multi === true || me.attrs.multi === 'true') {
                        if (scope.unmatchRemove) {
                            me.showSelected();
                        } else {
                            if (!me.choseFirst()) {
                                me.unmatchKeep();
                            }
                        }
                    } else {
                        if (scope.unmatchRemove && scope.bluring) {
                            if (!scope.dataSource || scope.dataSource.length == 0) {
                                clear = true;
                            } else {
                                clear = true;
                                angular.forEach(scope.dataSource, function (item) {
                                    if (scope.inputText.val().toLowerCase() === me.getDisplay(item).toLowerCase()) {
                                        clear = false;
                                    }
                                })
                            }
                            if (clear) {
                                if (scope.$selectedRow) {
                                    scope.$selectedRow[scope.displayExpress] = undefined;
                                    scope.$selectedRow[scope.valueProp] = undefined;
                                    scope.$selectedRow = angular.extend({}, scope.$selectedRow);
                                }
                                //clearObject(scope.$selectedRow);
                                //scope.setModelValue('');
                            }
                        }
                    }

                    if (attrs.requestStatus) {
                        scope.requestStatusSetter(scope.$parent, false);
                    }
                    if (document.activeElement == scope.inputText[0]) {
                        me.showView();
                        scope.$tableWrapper.css("display", "block");
                    }
                    scope.currIndex = -1;
                    if (scope.enterClick) {
                        me.choseFirst();//回车键的时候 等此时加载回来的时候才触发
                        scope.enterClick = false;
                    }

                    if (scope.bluring) {
                        if (scope.unmatchRemove) {
                            scope.deleteOperate = true;
                            me.showSelected(true);
                            me.selectedRowToModelValue();
                            me.selectedRowToDisplay();
                        } else {
                            me.unmatchKeep();
                            scope.bluring = false;
                        }
                        scope.isOperSelf = false;
                        me.apply();
                        scope.inputText.trigger('blurVerify');
                        scope.timer = $timeout(function () {
                            me.hideView();
                            me.validateValueMatch();
                            me.apply();
                        }, 200);
                    }
                    if (me.loadingByPage === true) {
                        me._render();
                        me.finishLoading();
                    }
                    // todo redner
                    var applyed = me.apply();
                    if (applyed) {
                        if (dataSource.params) AssociatePromiseService.resolve(dataSource.params.___promiseId);
                    } else {
                        $timeout(function () {
                            if (dataSource.params) AssociatePromiseService.resolve(dataSource.params.___promiseId);
                        }, 250);
                    }
                    if (angular.isFunction(callback)) {
                        callback.call(me);
                    }
                    me.setPagingButtonStatus();
                };
            //判断数据源是否有数据
            if ($dataSourceManager.dataSources[scope.sourceName] && $dataSourceManager.dataSources[scope.sourceName].records) {
                dataFunc(null, $dataSourceManager.dataSources[scope.sourceName]);
            }
            scope.$on(scope.sourceName, dataFunc);
        };

        Associate.prototype.gridSelectedRowKeepListen = function () {
            var me = this;
            var scope = this.scope;
            scope.$on("gridEdit", function (e, data) {
                me._getOuterGrid();
                if (data.element.is(scope._outerGrid)) {
                    scope.initSelectedRow = true;
                    if (!data._newEditorRow) {
                        scope.selectedRow = undefined;
                    }
                }
            });
        };

        Associate.prototype.startLoading = function (byPage) {
            var me = this;
            me.loading = true;
            me.loadingByPage = byPage;
            //me.scope.inputText.addClass('loading');
        };

        Associate.prototype.finishLoading = function () {
            var me = this;
            if (me.loading === true) {
                delete me.loadingByPage;
                //me.scope.inputText.removeClass('loading');
            }
        };

        /**
         * 重新搜索
         */
        Associate.prototype.reSearch = function (delayTime, promiseId) {
            var me = this,
                scope = me.scope,
                attrs = me.attrs,
                params,
                myDataSource;
            delayTime = delayTime || 0;
            if (!promiseId) {
                promiseId = AssociatePromiseService.register(scope.$id);
            }
            if (me.reSearchTimer) {
                AssociatePromiseService.resolve(me.reSearchTimer.promiseId);
                $timeout.cancel(me.reSearchTimer);
                me.reSearchTimer = undefined;
            }
            //myDataSource = $dataSourceManager.dataSources[scope.sourceName];
            //if (!angular.isUndefined(myDataSource) && !angular.isUndefined(myDataSource.reqTimer)){
            //    $dataSourceManager.dataSources[scope.sourceName].$timeout.cancel(myDataSource.reqTimer);
            //}
            if (attrs.requestStatus) {
                scope.requestStatusSetter(scope.$parent, true);
            }
            scope.searchIng = true;
            scope.justSelected = false;
            $rootScope['$$associate_ready'] = !scope.searchIng;

            me.reSearchTimer = $timeout(function () {
                (function (promiseId) {
                    //请求关键词
                    /*if (me.attrs.multi === true || me.attrs.multi === 'true') {
                     scope.$keyword = me.showSelected().join(scope.valueSeparator);
                     } else {
                     scope.$keyword = scope.inputText.val();
                     }*/
                    scope.$keyword = scope.inputText.val();
                    //字符串是否搜索最短长度
                    var charLength = scope.$keyword ? scope.$keyword.length : 0;
                    if ((scope.$keyword == scope.valueSeparator && scope.charLengthSearch > 0)
                        || scope.charLengthSearch > charLength) {
                        AssociatePromiseService.resolve(promiseId);
                        return;
                    }

                    if (angular.isFunction($dataSourceManager.dataSources[scope.sourceName].params)) {
                        if (!me.oldParamFun) {
                            me.oldParamFun = $dataSourceManager.dataSources[scope.sourceName].params;
                        }

                        //对参数的函数封装
                        function paramsFun() {
                            var paramNew = me.oldParamFun.call(window, me);
                            scope.keywordPropertySetter(paramNew, scope.$keyword);
                            return paramNew;
                        }

                        if ($dataSourceManager.dataSources[scope.sourceName].params.toString().indexOf("paramsFun()") == -1) {
                            params = paramsFun;
                        } else {
                            params = $dataSourceManager.dataSources[scope.sourceName].params;
                        }

                    } else {
                        params = angular.extend({}, $dataSourceManager.dataSources[scope.sourceName].params || {});
                        scope.keywordPropertySetter(params, scope.$keyword);
                    }

                    if (params.___promiseId) {
                        AssociatePromiseService.resolve(params.___promiseId);
                    }
                    params.___promiseId = promiseId;
                    //更新keyword参数 会重新刷新请求
                    $dataSourceManager.dataSources[scope.sourceName].currentPage = 1;
                    $dataSourceManager.dataSources[scope.sourceName].params = params;
                    $dataSourceManager.dataSources[scope.sourceName].doRequestData();
                    //console.log('ass-research sended >>>', $dataSourceManager.dataSources[scope.sourceName].url, JSON.stringify(params));
                    me.startLoading();
                    me.reSearchTimer = undefined;
                    if (scope.dataSource
                        && scope.dataSource.length > 0
                        && document.activeElement == scope.inputText[0]) {
                        me.showView();
                    }
                }(promiseId))
            }, delayTime);
            me.reSearchTimer.promiseId = promiseId;
        };

        Associate.prototype.rowClick = function (rowData, $event) {
            //取消blur事件
            if (this.scope.timer) {
                $timeout.cancel(this.scope.timer);
            }
            var self = this;
            if (angular.isDefined(self.attrs.onBeforeSelect)) {
                if (self.scope.onBeforeSelect({
                        list: self,
                        $event: $event,
                        item: rowData
                    }) === false) {
                    return;
                }
            }

            var me = this,
                scope = me.scope,
                display = me.getDisplay(rowData);
            scope.isClick = true;
            scope.justSelected = true;
            scope.firstTime = false;
            scope.setModelValue(scope.valuePropGetter(rowData));
            scope.inputText.val(display);
            scope.$selectedRow = angular.extend({}, rowData);

            var newKeyword = me.getDisplay(rowData);
            if (me.attrs.gCase = "upper") {
                newKeyword = newKeyword.toUpperCase();
            }
            scope.keywordSetter(scope.$parent, newKeyword);

            if (angular.isDefined(self.attrs.onSelect)) {
                self.scope.onSelect({
                    list: self,
                    $event: $event,
                    item: rowData
                });
            }
            me.hideView();
        };

        Associate.prototype.getDisplay = function (rowData) {
            var scope = this.scope,
                value = $parse(scope.displayExpress)(rowData);

            value = !!value ? value.toString().replace(/<[^>]+>/g, "") : '';
            return value || '';
        };

        Associate.prototype.getMatchPropDisplay = function (rowData) {
            var scope = this.scope,
                value = $parse(scope.matchProp)(rowData);

            value = !!value ? value.toString().replace(/<[^>]+>/g, "") : '';
            return value || '';
        };

        Associate.prototype.hideView = function () {
            if (!this.scope) {
                return;
            }
            if (!this.scope.$tableWrapper) {
                this.finishLoading();
                return;
            }
            if (this.scope.isMouseDown !== true) {
                try {
                    this.scope.$tableWrapper.hide();
                    this.scope.tableShow = false;
                } catch (e) {
                }
            }
        };

        Associate.prototype.showView = function () {
            var me = this,
                scope = this.scope;
            if (me.loading === true) {
                me._render();
            }
            var location = GillionLocationService.calculateLocation(this.element);
            //移除angular的隐藏属性 为了计算得到宽度
            if (!scope.$tableWrapper) return;
            scope.$tableWrapper.removeClass("ng-hide");
            var tableWidth = scope.$tableWrapper[0].offsetWidth,
                tableHeight = scope.$tableWrapper[0].offsetHeight;
            if (scope.$tableWrapper.css("display") == "none") {
                var _top = scope.$tableWrapper.css("top"),
                    _left = scope.$tableWrapper.css("left");
                scope.$tableWrapper.css({top: 0, left: 0});
                scope.$tableWrapper.css("display", "block");
                tableWidth = scope.$tableWrapper[0].offsetWidth;
                tableHeight = scope.$tableWrapper[0].offsetHeight;
                scope.$tableWrapper.css("display", "none");
                scope.$tableWrapper.css({top: _top, left: _left});
            }
            if (location.right < tableWidth) {
                location.left = location.left - (tableWidth - location.right);
            }
            scope.$tableWrapper.css("left", location.left);//scope.inputText.position().left);
            if (location.bottom > tableHeight + scope.inputText[0].offsetHeight || !scope.dataSource || scope.dataSource.length == 0) {
                scope.$tableWrapper.css("top", location.top + scope.inputText[0].offsetHeight);//scope.inputText.position().top+scope.inputText[0].offsetHeight);
            } else if (location.top - tableHeight>0){
                scope.$tableWrapper.css("top", location.top - tableHeight);
            } else {
                scope.$tableWrapper.css("top", 0);
            }
            me.finishLoading();
            scope.tableShow = true;
        };

        Associate.prototype.emptyOnSelect = function () {
            var self = this;
            if (angular.isDefined(self.attrs.onSelect)) {
                self.scope.onSelect({
                    list: self,
                    $event: null,
                    item: false
                });
            }
        };

        Associate.prototype.showSelected = function (exact) {
            var me = this,
                scope = me.scope;
            if (
                (!exact && scope.dataSource && scope.dataSource.length >= 1) ||
                (exact && scope.dataSource && scope.dataSource.length === 1 && scope.totalPage === 1 && !scope.tabClick)
            ) {
                var rowData = scope.dataSource[0];

                if (scope.isClick) {
                    //表示已经是选的
                } else if (scope.unmatchRemove && scope.inputText.val()) {
                    if (scope.bluring === true) {
                        me.choseFirst();
                        scope.justSelected = true;
                    }
                } else {
                    scope.setModelValue('');
                    scope.$selectedRow = {};
                    scope.selectedRow = {};
                    scope.keyword = scope.$keyword = scope.blurText = '';
                    scope.justSelected = true;
                    me.emptyOnSelect();
                }
            } else {
                var match = false;
                if (scope.bluring === true && scope.inputText.val()) {
                    match = me.matchSelectFirst(scope.inputText.val());
                }
                if (!match) {
                    scope.setModelValue('');
                    scope.$selectedRow = {};
                    scope.selectedRow = {};
                    scope.keyword = scope.$keyword = scope.blurText = '';
                    scope.justSelected = true;
                    me.emptyOnSelect();
                }
            }
            scope.bluring = false;

        };

        Associate.prototype.matchSelectFirst = function (text) {
            var me = this,
                scope = me.scope,
                index = 0,
                item = {},
                match = false;
            if (!scope.dataSource) {
                return false;
            }
            if (scope.dataSource.length == 1) {
                item = scope.dataSource[0];
                match = true;
            } else {
                for (; index < scope.dataSource.length; index++) {
                    item = scope.dataSource[index];
                    if (me.getMatchPropDisplay(item).toLowerCase() === text.toLowerCase()) {
                        match = true;
                        break;
                    }
                }
            }

            if (match) {
                var eventParam = {
                    list: me,
                    $event: {},
                    item: item
                };
                if (angular.isDefined(me.attrs.onBeforeSelect)) {
                    if (scope.onBeforeSelect(eventParam) === false) {
                        return false;
                    }
                }
                scope.$selectedRow = item;
                scope.setModelValue(scope.valuePropGetter(item));
                scope.inputText.val(text);
                scope.keyword = scope.$keyword = scope.blurText = text;
                scope.justSelected = true;
                if (angular.isDefined(me.attrs.onSelect)) {
                    if (scope.onSelect(eventParam) === false) {
                        return;
                    }
                }
            }
            return match;
        }

        /**
         * 未匹配的保留处理
         */
        Associate.prototype.unmatchKeep = function () {
            var self = this,
                scope = this.scope,
                selectedRow = {},
                rowData = {},
                index, length = 0;

            rowData[scope.displayExpress] = scope.inputText.val();
            rowData[scope.valueProp] = scope.inputText.val();
            if (angular.isDefined(self.attrs.onBeforeSelect)) {
                if (self.scope.onBeforeSelect({
                        list: this,
                        $event: null,
                        item: rowData
                    }) === false) {
                    return;
                }
            }

            if (scope.dataSource) {
                length = scope.dataSource.length;
            }
            if (length == 1 && self.getDisplay(scope.dataSource[0]) == scope.inputText.val()) {
                self.choseFirst();
            } else if (scope.$selectedRow &&
                scope.$selectedRow[scope.displayExpress] == scope.$selectedRow[scope.valueProp]) {

                //存在于选择列表 则无需构造
                // for (index = 0; index < length; index++) {
                //     if (scope.dataSource[index][scope.valueProp]
                //         == scope.$selectedRow[scope.valueProp]) {
                //         return;
                //     }
                // }

                selectedRow = angular.extend({}, scope.$selectedRow);
                delete selectedRow[scope.valueProp + "_$bak"];
                selectedRow[scope.displayExpress] = scope.inputText.val();
                selectedRow[CREATEDOBJ] = true;

                selectedRow[scope.valueProp] = scope.inputText.val();
                scope.setModelValue(scope.inputText.val());
                scope.$selectedRow = selectedRow;

            }
            if (angular.isDefined(self.attrs.onSelect)) {
                self.scope.onSelect({
                    list: self,
                    $event: null,
                    item: rowData
                });
            }
        };

        Associate.prototype.selectedRowToDisplay = function () {
            var me = this,
                scope = me.scope;
            scope.inputText.val(me.getDisplay(scope.$selectedRow));
            if (me.attrs.keyword) {
                scope.keyword = scope.inputText.val();
            }
        };

        Associate.prototype.selectedRowToModelValue = function () {
            var me = this,
                scope = me.scope;

            scope.setModelValue(scope.valuePropGetter(scope.$selectedRow));
        };

        Associate.prototype.keywordSelected = function () {

        };

        AssociateMulti = (function (superClass) {
            extend(AssociateMulti, superClass);

            function AssociateMulti($scope, $element, $attrs, ngModel) {
                this.scope = $scope;
                this.attrs = $attrs;
                this.element = $element;
                this.ngModel = ngModel;
                AssociateMulti.__super__.constructor.call(this, this.scope, this.element, this.attrs, this.ngModel);
            }

            AssociateMulti.prototype._rowClick = function ($event, $target, $row, isRowClick) {
                var me = this,
                    scope = me.scope,
                    rowIndex = $row[0].rowIndex,
                    recordIndex = rowIndex - 1,
                    displayArray = [],
                    submitArray = [],
                    selectLength, i,
                    record = scope.dataSource[recordIndex],
                    eventParam = {
                        list: me,
                        $event: $event,
                        item: record,
                        isRowClick: isRowClick
                    },
                    length = scope.dataSource.length;
                if (scope.timer) {
                    $timeout.cancel(scope.timer);
                }
                scope.justSelected = true;
                if (angular.isDefined(me.attrs.onBeforeSelect)) {
                    if (scope.onBeforeSelect(eventParam) === false) {
                        return;
                    }
                }
                var $checkbox = $row.find("div.form-clickbox");
                if (recordIndex == undefined) {
                    recordIndex = 0;
                }
                scope.isClick = true;
                scope.selected[recordIndex] = !scope.selected[recordIndex];
                //scope.isOperSelf = true;
                //已选中的处理
                if (scope.selected[recordIndex]) {
                    $checkbox.attr("selected", "selected");
                    $checkbox.closest("tr").attr("selected", "selected");
                    scope.$selectedRow.push(me.mapToSelectedRecord(record));
                } else {
                    $checkbox.removeAttr("selected");
                    $checkbox.closest("tr").removeAttr("selected");
                    selectLength = scope.$selectedRow.length;
                    for (i = 0; i < selectLength; i++) {
                        var each = scope.$selectedRow[i];
                        if (scope.valuePropGetter(record) === scope.valuePropGetter(each)) {
                            scope.$selectedRow.splice(i, 1);
                            break;
                        }
                    }
                }
                selectLength = scope.$selectedRow.length;
                for (i = 0; i < selectLength; i++) {
                    var each = scope.$selectedRow[i];
                    if (scope.valuePropGetter(each)) {
                        submitArray.push(scope.valuePropGetter(each));
                    }
                    if (me.getDisplay(each)) {
                        displayArray.push(me.getDisplay(each));
                    }
                }
                scope.setModelValue(submitArray.join(scope.valueSeparator));
                scope.inputText.val(displayArray.join(scope.valueSeparator));
                scope.blurText = displayArray.join(scope.valueSeparator);
                var newKeyword = displayArray.join(scope.valueSeparator);
                if (me.attrs.gCase = "upper") {
                    newKeyword = newKeyword.toUpperCase();
                }
                scope.keywordSetter(scope.$parent, newKeyword);
                if (angular.isDefined(me.attrs.onSelect)) {
                    scope.onSelect(eventParam);
                }
                me.apply();
                if ($event && $event.currentTarget) me.focusEvent();
            };

            AssociateMulti.prototype._isSelected = function (record) {
                var scope = this.scope,
                    valueGetter = scope.valuePropGetter,
                    value = valueGetter(record) || '';
                var result = _(scope.$selectedRow).any(function (x) {
                    var xValue = valueGetter(x);
                    if (angular.isString(xValue)) {
                        xValue = xValue.toLowerCase();
                        value = value.toLowerCase();
                    }
                    return xValue === value;
                });
                return result;
            };

            AssociateMulti.prototype.rowClick = function (rowData, $event, index) {
                var self = this;
                var scope = self.scope;
                if (self.scope.timer) {
                    $timeout.cancel(self.scope.timer);
                }
                scope.justSelected = true;
                if (angular.isDefined(self.attrs.onBeforeSelect)) {
                    if (self.scope.onBeforeSelect({
                            list: self,
                            $event: $event,
                            item: rowData
                        }) === false) {
                        return;
                    }
                }

                var displayArray = [],
                    submitArray = [],
                    me = this,
                    selectLength, i,
                    myScope = me.scope,
                    length = myScope.dataSource.length;
                if (index == undefined) {
                    index = 0;
                }
                myScope.isClick = true;
                myScope.selected[index] = !myScope.selected[index];
                var checkbox = myScope.$tableWrapper.find("div.form-clickbox:eq(" + index + ")");
                //myScope.isOperSelf = true;
                scope.firstTime = false;
                //已选中的处理
                if (myScope.selected[index]) {
                    checkbox.attr("selected", "selected");
                    checkbox.closest("tr").attr("selected", "selected");
                    myScope.$selectedRow.push(rowData);
                } else {
                    checkbox.removeAttr("selected");
                    checkbox.closest("tr").removeAttr("selected", "selected");
                    selectLength = myScope.$selectedRow.length;
                    for (i = 0; i < selectLength; i++) {
                        var each = myScope.$selectedRow[i];
                        if (myScope.valuePropGetter(rowData) === myScope.valuePropGetter(each)) {
                            myScope.$selectedRow.splice(i, 1);
                            break;
                        }
                    }
                }
                selectLength = myScope.$selectedRow.length;
                for (i = 0; i < selectLength; i++) {
                    var each = myScope.$selectedRow[i];
                    if (myScope.valuePropGetter(each)) {
                        submitArray.push(myScope.valuePropGetter(each));
                    }
                    if (me.getDisplay(each)) {
                        displayArray.push(me.getDisplay(each));
                    }
                }
                var display = displayArray.join(myScope.valueSeparator);
                myScope.setModelValue(submitArray.join(myScope.valueSeparator));
                myScope.inputText.val(display);
                myScope.blurText = display;

                var newKeyword = display;
                if (self.attrs.gCase = "upper") {
                    newKeyword = newKeyword.toUpperCase();
                }
                self.scope.keywordSetter(scope.$parent, newKeyword);

                if (angular.isDefined(self.attrs.onSelect)) {
                    self.scope.onSelect({
                        list: self,
                        $event: $event,
                        item: rowData
                    });
                }
            };

            /**根据输入框显示勾选和更改selectedRow 并返回未匹配的key数组*/
            AssociateMulti.prototype.showSelected = function () {
                var me = this;
                var selectedRowLength = me.scope.$selectedRow.length;
                var selectedArr = me.keywordSelected();
                var missKeyArr = me.keywordSelectedRow(selectedArr);
                me.selectedRowToModelValue();
                if ((missKeyArr.length > 0 && me.scope.unmatchRemove && (missKeyArr.length == 1 && missKeyArr[0] != "")) || selectedRowLength !== me.scope.$selectedRow.length) {
                    //如果仍有未选中的 则只显示出最后一个未选中的
                    me.selectedRowToDisplay(missKeyArr[missKeyArr.length - 1]);
                    if (angular.isDefined(me.attrs.onSelect)) {
                        me.scope.onSelect({
                            list: me,
                            $event: null,
                            item: false
                        });
                    }
                }
                return missKeyArr;
            };
            //根据输入框内容 更改显示checkbox 并返回已选的行数组
            AssociateMulti.prototype.keywordSelected = function () {
                var me = this,
                    scope = me.scope,
                    index = 0,
                    inputVal = scope.inputText.val(),
                    selectedArr = [], doMatch = false;
                if (!scope.$selectedRow) {
                    scope.$selectedRow = [];
                }
                if (inputVal) {
                    var keywordArr = inputVal.split(scope.valueSeparator);
                    var valueArr = (scope.ngModelInit || "").split(scope.valueSeparator);
                    if (scope.$selectedRow.length !== keywordArr.length) {
                        //非删除的时候 最后一个不勾选
                        keywordArr = keywordArr.splice(0, keywordArr.length - 1);
                    }
                    if (scope.$selectedRow.length === keywordArr.length) {
                        doMatch = true;
                    }
                    //勾选checkbox
                    if (scope.dataSource) {
                        angular.forEach(scope.dataSource, function (each) {
                            var filterIndex = -1;
                            if (_(keywordArr).filter(function (item) {
                                    if (doMatch) {
                                        filterIndex++;
                                        return me.getDisplay(each).toLowerCase() == item.toLowerCase() &&
                                            scope.valuePropGetter(each) == valueArr[filterIndex];
                                    }
                                    return me.getDisplay(each).toLowerCase() == item.toLowerCase();
                                }).length == 1) {
                                // scope.$tableWrapper.find("div.form-clickbox:eq(" + index + ")").attr("selected", "selected");
                                scope.selected[index] = true;
                                selectedArr.push(each);
                            } else {
                                scope.selected[index] = false;
                            }
                            index++;
                        });
                    }

                } else {
                    if (scope.dataSource) {
                        angular.forEach(scope.dataSource, function () {
                            scope.selected[index] = false;
                            index++;
                        });

                    }
                }
                return selectedArr;
            };

            //根据输入框内容 和已选数组 重新构造 selectedRow 并返回未匹配的key数组
            AssociateMulti.prototype.keywordSelectedRow = function (selectedArr) {
                var me = this,
                    scope = me.scope,
                    missKeyArr = [],
                    inputVal = scope.inputText.val();
                if (inputVal) {
                    if (angular.isArray(selectedArr)) {
                        angular.forEach(selectedArr, function (each) {
                            scope.$selectedRow.push(each);
                        })
                    }
                    var arr = [],
                        keywordArr = inputVal.split(scope.valueSeparator);
                    angular.forEach(keywordArr, function (each) {
                        if (_(scope.$selectedRow).filter(function (item) {
                                if (me.getDisplay(item).toLowerCase() == each.toLowerCase()) {
                                    arr.push(item);
                                    return true;
                                }
                                return false;
                            }).length > 0) {
                        } else {
                            missKeyArr.push(each);
                        }
                    });

                    scope.$selectedRow = me.dupRemoval(arr);
                } else {
                    scope.$selectedRow = [];
                }
                scope.selectedRow = scope.$selectedRow;
                scope.selectedRowSetter(scope.$parent, scope.$selectedRow);
                return missKeyArr;
            };

            AssociateMulti.prototype.selectedRowToModelValue = function (val) {
                var me = this,
                    scope = me.scope,
                    modelValue;
                var submitArray = [];
                angular.forEach(scope.$selectedRow, function (each) {
                    if (scope.valuePropGetter(each)) {
                        submitArray.push(scope.valuePropGetter(each));
                    }
                });
                if (val) {
                    submitArray.push(val);
                }
                modelValue = submitArray.join(scope.valueSeparator);
                scope.setModelValue(modelValue);
                return modelValue;
            };

            AssociateMulti.prototype.selectedRowToDisplay = function (val) {
                var me = this,
                    scope = me.scope,
                    lastChar = '';
                var displayArray = [];
                angular.forEach(scope.$selectedRow, function (each) {
                    if (me.getDisplay(each)) {
                        displayArray.push(me.getDisplay(each));
                    }
                });
                if (val) {
                    displayArray.push(val);
                }
                if (scope.inputText.val().charAt(scope.inputText.val().length - 1) === scope.valueSeparator) {
                    lastChar = scope.valueSeparator;
                }
                scope.inputText.val(displayArray.join(scope.valueSeparator) + lastChar);
                if (me.attrs.keyword) {
                    scope.keyword = scope.inputText.val();
                }
            };

            AssociateMulti.prototype.displayInit = function (display, value) {
                if (!display) {
                    display = '';
                }
                if (!value) {
                    value = '';
                }
                var me = this,
                    myScope = this.scope,
                    displayArr = display.split(myScope.valueSeparator),
                    valueArr = value.split(myScope.valueSeparator),
                    i,
                    length = displayArr.length;
                if (!myScope.$selectedRow || myScope.initSelectedRow) {
                    myScope.$selectedRow = [];
                }
                for (i = 0; i < length; i++) {
                    if (!myScope.$selectedRow[i]) {
                        myScope.$selectedRow[i] = {};
                    }
                    myScope.$selectedRow[i][myScope.displayExpress] = displayArr[i];
                    myScope.$selectedRow[i][myScope.valueProp] = valueArr[i];
                    myScope.$selectedRow[i] = me.mapToSelectedRecord(myScope.$selectedRow[i]);
                }
                //if (myScope.initSelectedRow) {
                myScope.inputText.val(display);
                //}
                myScope.selectedRow = myScope.$selectedRow;
            };

            AssociateMulti.prototype.choseFirst = function () {
                var me = this,
                    scope = me.scope;
                if (scope.dataSource && scope.dataSource.length == 1) {
                    var rowData = scope.dataSource[0];
                    if (scope.inputText.val().toLowerCase() === me.getDisplay(rowData).toLowerCase()) {
                        if (scope.selectedRow.length === 0 || me.getDisplay(rowData).toLowerCase() !== me.getDisplay(scope.selectedRow[0]).toLowerCase()) {
                            me.rowClick(scope.dataSource[0]);
                        }
                        return true;
                    } else {
                        if (scope.unmatchRemove && scope.isOperSelf) {
                            scope.$selectedRow = [];
                            scope.setModelValue('');
                            scope.keyword = scope.$keyword = scope.blurText = '';
                        }
                    }
                }
                return false;
            };

            AssociateMulti.prototype.unmatchKeep = function () {
                var me = this,
                    textValue,
                    textTemp,
                    modelTemp,
                    selectedArr = me.keywordSelected(),
                    missKeyArr = me.keywordSelectedRow(selectedArr),
                    scope = me.scope;
                var modelValue = me.selectedRowToModelValue();
                var displayArray = [];
                angular.forEach(scope.$selectedRow, function (each) {
                    displayArray.push(me.getDisplay(each));
                });
                if (missKeyArr.length > 0) {
                    var missKeyArrTemp = [];
                    //on-before执行
                    angular.forEach(missKeyArr, function (misskey) {
                        var obj = {};
                        obj[scope.displayExpress] = misskey;
                        obj[scope.valueProp] = misskey;
                        if (angular.isDefined(me.attrs.onBeforeSelect)) {
                            if (scope.onBeforeSelect({
                                    list: me,
                                    $event: null,
                                    item: obj
                                }) === false) {

                            } else {
                                missKeyArrTemp.push(misskey);
                            }
                        } else {
                            missKeyArrTemp.push(misskey);
                        }
                    });
                    missKeyArr = missKeyArrTemp;

                    textValue = scope.inputText.val();
                    if (textValue) {
                        textTemp = displayArray.join(scope.valueSeparator);
                        modelTemp = modelValue;
                        if (textTemp.length > 0) {
                            textTemp += scope.valueSeparator;
                            modelTemp += scope.valueSeparator;
                        }
                        if (textValue !== textTemp + missKeyArr.join(scope.valueSeparator)) {
                            scope.inputText.val(textTemp + missKeyArr.join(scope.valueSeparator));
                        }
                        scope.setModelValue(modelTemp + missKeyArr.join(scope.valueSeparator));
                    } else {
                        scope.inputText.val(missKeyArr.join(scope.valueSeparator));
                        scope.setModelValue(missKeyArr.join(scope.valueSeparator));
                    }
                    angular.forEach(missKeyArr, function (misskey) {
                        if (angular.isDefined(me.attrs.onSelect)) {
                            var obj = {};
                            obj[scope.displayExpress] = misskey;
                            obj[scope.valueProp] = misskey;
                            scope.onSelect({
                                list: me,
                                $event: null,
                                item: obj
                            });
                        }
                    });
                }
            };

            return AssociateMulti;
        })(Associate);
        return {
            restrict: 'E',
            template: '<div><input ng-disabled="ngDisabled || disabled || ngReadonly || readonly" ondrop="return false;" ondragstart="return false" ng-class="{\'is-show-menu\': tableShow, \'is-bluring\': bluring}" type="text" autocomplete="off" class="form-text form-suggestbox" value="" g-tabindex-prevent="{{preventTabindex}}" /></div>',
            priority: 100,
            replace: true,
            transclude: true,
            scope: {
                multi: '@',
                valueProp: '@',
                sourceName: '@',
                keywordProp: '@',
                displayExpress: '@',
                settingName: '@',
                ngModelInit: '=ngModel',
                keyword: '@',
                requestStatus: '=',
                selectedRow: '=',
                displayInit: '=',
                onSelect: '&',
                onClear: '&',
                onBeforeSelect: '&',
                receiver: '=',
                ngDisabled: '=',
                disabled: '=',
                ngReadonly: '=',
                readonly: '=',
                ngFocus: '&',
                ngBlur: '&',
                asyncDisplayInit: '&',
                hideView: '&'
            },
            require: ['^?ngModel', 'gAssociate', '^?form'],
            controller: function ($scope, $element, $attrs, $parse) {
                $tabindex.register($element.find(".form-text"), $element);
                $scope.columns = $scope.columns || [];
                $scope.filters = $scope.filters || [];

                function myController() {
                    this.addColumn = function (col) {
                        if (!!col.filterName) {
                            col.filter = $filter(col.filterName);
                        }
                        col.getDisplay = function (record) {
                            if (col.filter) {
                                return col.filter(record[col.data]);
                            } else {
                                try {
                                    return $parse(col.data)(record);
                                } catch (e) {
                                    return record[col.data] || '';
                                }
                            }
                        };
                        $scope.columns.push(col);
                    };
                    this.addFilterName = function (filterName) {
                        $scope.filters.push(filterName);
                    }
                }

                return new myController();
            },
            compile: function (tElement, tAttrs, transclude) {
                var inputText = tElement.find(".form-text");
                if (tAttrs.gFieldValidator !== undefined) {
                    inputText.attr("g-field-validator", tAttrs.gFieldValidator);
                    tElement.removeAttr("g-field-validator");
                }
                if (tElement.attr("name")) {
                    inputText.attr("name", tElement.attr("name"));
                }
                if (tAttrs.ngModel) {
                    inputText.attr("id", tAttrs.ngModel);
                    var valueHidden = angular.element('<input type="hidden" class="associate-value"/>');
                    valueHidden.attr("ng-model", tAttrs.ngModel);
                    tElement.removeAttr("ng-model");
                    if (tAttrs.name) {
                        valueHidden.attr("name", tAttrs.name);
                    }
                    tElement.append(valueHidden);
                }
                tElement.removeAttr("name");

                return function (scope, element, attrs, controllers) {
                    var keywordProperty = scope.keywordProp || scope.displayExpress || 'keyword',
                        valueProp = scope.valueProp || scope.displayExpress || 'id',
                        myController = controllers[1],
                        ngModel = controllers[0],
                        formController = controllers[2],
                        tempWord = '',
                        stopWatchDisplay, stopWatchSelectedRow;
                    scope.valueSeparator = attrs.valueSeparator || ',';
                    scope.isSeparatorSelected = attrs.isSeparatorSelected != "false";
                    scope.multi = attrs.multi == "true";

                    if (!scope.selectedRow && attrs.selectedRow) {
                        scope.selectedRow = (scope.multi ? [] : {});
                    }
                    scope.$selectedRow = scope.selectedRow || (scope.multi ? [] : {});
                    //scope.emptySearch = attrs.emptySearch=="true" || false;
                    scope.charLengthSearch = attrs.charLengthSearch || 0;
                    scope.focusSearch = attrs.focusSearch != "false";
                    scope.spaceClear = attrs.spaceClear != "false";
                    scope.pageShow = attrs.pageShow != "false";
                    scope.isShow = attrs.isShow !== "false";
                    scope.showEvent = attrs.showEvent ? attrs.showEvent : "focus";
                    scope.unmatchRemove = attrs.unmatchRemove == "true";//不匹配的是否自动删除
                    scope.emptyClear = attrs.emptyClear != "false";
                    scope.matchProp = attrs.matchProp ? attrs.matchProp : scope.displayExpress;
                    scope.isClick = false;
                    scope.tabClick = false;
                    scope.deleteOperate = false;//是否删除操作
                    scope.delayTime = attrs.delayTime || 300;
                    scope.columns = scope.columns || [];
                    scope.filters = scope.filters || [];
                    var inputText = element.find(".form-text");
                    scope.inputText = inputText.length > 0 ? inputText : element;
                    scope.isMouseDown = false;
                    scope.searched = false;
                    scope.tableShow = false;
                    scope.isOperSelf = false;//判断是否是自己在操作 用于更改数组时判断是否更新视图
                    scope.firstTime = true;
                    scope.initSelectedRow = false;//表格编辑 切换改成会清空selectedRow 需要重新构造的标记
                    scope.selected = [];
                    scope.enterSelectFirst = (attrs.enterSelectFirst !== "false");
                    if (!attrs.asyncDisplayInit || attrs.asyncDisplayInit === "false") scope.asyncDisplayInit = false;
                    if (attrs.businessKey) scope.businessKey = attrs.businessKey;
                    $rootScope['$$associate_ready'] = !scope.searchIng;

                    //默认取配置文件的
                    if (config.controls.associate && config.controls.associate.showEvent) {
                        scope.showEvent = config.controls.associate.showEvent;
                    }

                    if (angular.isDefined(attrs.preventTabindex)) {
                        scope.preventTabindex = !(attrs.preventTabindex === 'false');
                    } else {
                        scope.preventTabindex = defPreventTabindex;
                    }
                    // default properties
                    scope.page = 1;
                    scope.pageSize = Number(attrs.pageSize) || 10;
                    // settergi
                    scope.keywordPropertySetter = $parse(keywordProperty).assign;
                    scope.selectedRowSetter = $parse(attrs.selectedRow).assign;
                    // getter
                    scope.ngModelGetter = $parse(attrs.ngModel);
                    scope.displayGetter = $parse(attrs.displayInit);
                    scope.valuePropGetter = function (row) {
                        //$parse(valueProp);
                        if (!row) {
                            return '';
                        }
                        if (row[valueProp + "_$bak"]) {
                            return row[valueProp + "_$bak"];
                        } else {
                            return row[valueProp];
                        }
                    };
                    scope.isInKeydownNewRowGrid = function () {
                        "use strict";
                        var rs = scope.inputText.closest('div.grid-keydown-new-row, div.hot-table').length > 0;
                        scope.isInKeydownNewRowGrid = _.identity(rs);
                        return rs;
                    };

                    scope.associate =
                        scope.multi ? new AssociateMulti(scope, element, attrs, ngModel) : new Associate(scope, element, attrs, ngModel);
                    var associate = scope.associate;

                    scope.rowClick = function (val, $event, index) {
                        associate.rowClick(val, $event, index);
                        if (!scope.multi && !scope.enterClick) {
                            //scope.inputText.blur();
                            if (scope.inputText[0] != document.activeElement) {
                                if (scope.showEvent == "focus") {
                                    scope.needFocus = true;
                                }
                            }
                        } else {
                            scope.enterClick = false;
                        }
                    };

                    if (ngModel) {
                        if (scope.asyncDisplayInit) scope.initTime = 0;
                        ngModel.$formatters.push(function (value) {
                            //清空的时候
                            if (!value) {
                                if (scope.selectedRow) {
                                    scope.selectedRow[scope.displayExpress] = "";
                                    scope.selectedRow[scope.valueProp] = "";
                                }
                                scope.inputText.val('');
                            }
                            if (scope.asyncDisplayInit && scope.initTime === 0) {
                                var func = function (display) {
                                    scope.associate.displayInit(display, value);
                                };
                                var params = {value: value, callback: func};
                                if (scope.businessKey) params["key"] = scope.businessKey;
                                scope.asyncDisplayInit(params);
                                scope.initTime++;
                            }
                            if (ngModel) ngModel.$setViewValue(value);
                            return value;
                        });
                    }

                    scope.setModelValue = function (val) {
                        if (ngModel) {
                            ngModel.$setViewValue(val);
                        }
                    };

                    if (attrs.displayInit && (!attrs.asyncDisplayInit || attrs.asyncDisplayInit === "false")) {
                        scope.initTime = 0;//只执行一次
                        if (scope.initTime === 0 && scope.displayInit && scope.ngModelInit) {
                            // scope.$evalAsync(function () {
                            associate.displayInit(scope.displayInit, scope.ngModelInit);
                            scope.initTime += 1;
                            // });
                        }
                        //异步加载的时候 执行
                        stopWatchDisplay = scope.$watch("displayInit", function () {
                            if (scope.displayInit && scope.ngModelInit) {
                                //if (!scope.isOperSelf) {
                                //加个操作判断 防止出现中文输入时候 执行这里
                                associate.displayInit(scope.displayInit, scope.ngModelInit);
                                //}
                                //scope.initTime +=1;
                                //stopWatchDisplay();
                            }
                        });
                    }

                    angular.element($window).on("mousewheel", function () {
                        if (scope.tableShow) {
                            scope.inputText[0].blur();
                        }
                    });
                    angular.element($window).resize(function () {
                        if (document.activeElement != scope.inputText[0])
                            associate.hideView();
                    });

                    var columns = [];
                    if (scope.settingName) {
                        columns = AssociateSettingService.getColumns(scope.settingName);
                        _(columns).each(function (column) {
                            "use strict";
                            var text = column.text;
                            if (scope.receiver) text = artTmpl.compile(text)({receiver: scope.receiver});
                            myController.addColumn({
                                width: column.width || 60,
                                data: column.displayExpress,
                                filterName: column.filterName,
                                text: text
                            });
                        });
                    } else {
                        var columns = [];
                        transclude(scope, function (clone) {
                            angular.forEach(clone, function (item) {
                                if (item.tagName === 'TH') {
                                    columns.push(item);
                                }
                            });
                        }, myController);
                        _(columns).each(function (x) {
                            "use strict";
                            var text = x.innerText;
                            if (scope.receiver) text = artTmpl.compile(text)({receiver: scope.receiver});
                            myController.addColumn({
                                width: x.getAttribute('width'),
                                data: x.getAttribute('display-express'),
                                filterName: x.getAttribute('filter-name'),
                                text: text
                            });
                            $(x).remove();
                        });
                    }
                    columns.splice(0, columns.length);

                    //双向绑定
                    if (angular.isString(attrs.selectedRow)) {
                        if (scope.multi) {
                            stopWatchSelectedRow = scope.$watchCollection("$selectedRow", function (val) {
                                scope.$selectedRow = associate.dupRemoval(val);
                                scope.selectedRow = scope.$selectedRow;
                            });
                            stopWatchSelectedRow = scope.$watchCollection("selectedRow", function (val) {
                                scope.$selectedRow = val;
                                if (!scope.isOperSelf) {
                                    if (scope.initSelectedRow) {
                                        var parentNgModelValue = scope.ngModelGetter(scope.$parent);
                                        var parentDisplayInit = scope.displayGetter(scope.$parent);
                                        if (!parentDisplayInit) {
                                            parentDisplayInit = parentNgModelValue;
                                        }
                                        associate.displayInit(parentDisplayInit, parentNgModelValue);
                                        scope.selectedRowSetter(scope.$parent, scope.selectedRow);
                                        associate.editRowBroadCast();
                                        scope.initSelectedRow = false;
                                    } else {
                                        associate.keywordSelected();
                                        associate.selectedRowToModelValue();
                                        associate.selectedRowToDisplay();
                                    }
                                }
                            });
                        } else {
                            scope.$watch("$selectedRow", function (val) {
                                scope.selectedRow = val;
                            });
                            stopWatchSelectedRow = scope.$watch('selectedRow', function (val) {
                                scope.$selectedRow = val;
                                if (!scope.isOperSelf) {
                                    if (scope.initSelectedRow) {
                                        associate.displayInit(scope.inputText.val(), scope.ngModelInit);
                                        associate.editRowBroadCast();
                                        scope.initSelectedRow = false;
                                    } else {
                                        associate.keywordSelected();
                                        associate.selectedRowToModelValue();
                                        associate.selectedRowToDisplay();
                                    }
                                } else {
                                    if (scope.initSelectedRow) {
                                        associate.displayInit(scope.inputText.val(), scope.ngModelInit);
                                        scope.initSelectedRow = false;
                                    } else {
                                        associate.selectedRowToModelValue();
                                    }
                                }
                            })
                        }
                    }
                    if (attrs.width) {
                        scope.inputText.css("width", attrs.width);
                    }

                    //初显示回选值
                    if (attrs.selectedRow && !isEmptyObject(scope.$selectedRow)) {
                        scope.$evalAsync(function () {
                            associate.keywordSelected();
                            associate.selectedRowToModelValue();
                            associate.selectedRowToDisplay();
                        });
                    }

                    scope.inputText.on("blur", function (event) {
                        if (scope.clickPage) {
                            scope.clickPage = false;
                            scope.blurText = scope.inputText.val();
                            return;
                        }
                        associate.blurHandle();
                        if (scope.ngBlur) {
                            scope.ngBlur();
                        }
                    });

                    scope.inputText.on("focus", function () {
                        scope.blurText = scope.inputText.val();
                        scope.clickPage = false;
                        scope.tabClick = false;
                        scope.__keydownVal = scope.inputText.val();
                        if (attrs.gFocusSelect != undefined) {
                            this.select();
                        }

                        if (scope.ngFocus) {
                            scope.ngFocus();
                        }
                    });

                    /* scope.$tableWrapper.on('mouseup', function () {
                     scope.isMouseDown = false;
                     })*/

                    function showHandle() {
                        if (scope.ngDisabled || scope.disabled || scope.ngReadonly || scope.readonly || scope.inputText.attr("readonly") == "readonly" || scope.inputText.attr("readonly") == "true") return;
                        if (GillionMsgService.isUnderMasked(scope.inputText[0])) {
                            return;
                        }
                        if (!scope.focusSearch) {
                            return;
                        }
                        if (scope.needFocus) {
                            scope.needFocus = false;
                            return;
                        }
                        scope.isOperSelf = true;
                        tempWord = scope.inputText.val();
                        var newKeyword = tempWord;
                        if (attrs.gCase = "upper") {
                            newKeyword = newKeyword.toUpperCase();
                        }
                        scope.bluring = false;
                        scope.firstTime = false;
                        scope.keywordSetter(scope.$parent, newKeyword);
                        associate.startLoading();
                        associate.reSearch(1);
                    }

                    scope.inputText.on(scope.showEvent, function (event) {
                        try {
                            var _autoFocus = scope._autoFocus;
                            delete scope._autoFocus;
                            if (scope.showEvent === 'focus' && _autoFocus) {
                                return;
                            }
                            showHandle();
                        } catch (e) {
                            $rootScope.$broadcast('associateError', e.stack)
                        }
                    });

                    scope.inputText.mousedown(function () {
                        try {
                            if (scope.showEvent != 'focus') return;
                            showHandle();
                        } catch (e) {
                            $rootScope.$broadcast('associateError', e.stack)
                        }
                    });

                    // if (attrs.keyword) {
                    //     scope.keywordSetter = $parse(attrs.keyword).assign;
                    // }
                    scope.keywordSetter = function (parentScope, newKeyword) {
                        if (attrs.keyword) {
                            $parse(attrs.keyword).assign(parentScope, newKeyword);
                        }
                        $dataSourceManager.dataSources[scope.sourceName].$$keyword = newKeyword;
                    };
                    if (attrs.requestStatus) {
                        scope.requestStatusSetter = $parse(attrs.requestStatus).assign;
                    }
                    scope.currIndex = scope.currIndex || -1;
                    associate.initDataSource();
                    scope.inputText.on("keydown", function (event) {
                        var e = e || event,
                            currKey = e.keyCode || e.which || e.charCode,
                            trs = scope.getTrs(),
                            keyLength = trs.length + 1;
                        scope.tabClick = false;
                        scope.__keydownVal = scope.inputText.val();

                        // 粘贴时
                        if (e.ctrlKey && currKey === 86) scope.firstTime = false;
                        if (currKey === 13) {
                            if (scope.tableShow && scope.enterSelectFirst) {
                                scope.enterClick = true;
                                if (!scope.searchIng) {
                                    if (trs.length) {
                                        if (scope.currIndex > -1) {
                                            trs[scope.currIndex].click();
                                        } else {
                                            trs[0].click();
                                        }
                                    }
                                    scope.enterClick = false;
                                    associate.hideView();
                                } else {
                                    associate.reSearch();
                                }
                                //associate.apply();
                            }
                            event.stopPropagation();
                            event.preventDefault();
                        } else if (currKey == 37 || currKey == 39) {
                            if (document.activeElement != scope.inputText[0]) {
                                event.stopPropagation();
                                event.preventDefault();
                            }
                        } else if (currKey === 40 || currKey === 38) {
                            if (!(!scope.tableShow && !scope.searchIng && scope.isInKeydownNewRowGrid && scope.isInKeydownNewRowGrid())) {
                                event.stopPropagation();
                                event.preventDefault();
                            }
                        } else if (currKey === 9) {
                            scope.tabClick = true;
                        } else if (currKey === 32) {
                            if (scope.currIndex && trs[scope.currIndex]) {
                                event.stopPropagation();
                                event.preventDefault();
                            }
                        }
                    });

                    associate.gridSelectedRowKeepListen();

                    scope.$on("showView", function () {
                        if (scope.tableShow == true) {
                            $timeout(function () {
                                associate.showView();
                            });

                        }
                    });
                    //析构函数  用于表格
                    scope.$on("$destroy", function () {
                        associate.hideView();
                        if (stopWatchSelectedRow) stopWatchSelectedRow();
                        if (stopWatchDisplay) stopWatchDisplay();
                        scope.inputText.off();
                        if (scope.$tableWrapper) {
                            scope.$tableWrapper.off().remove();
                            delete scope.$tableWrapper;
                        }
                        $document.off(".associate" + scope.$id);
                        for (var key in associate) {
                            delete associate[key];
                        }
                        delete scope.associate;
                        delete scope.setModelValue;
                        //console.log(associate);
                        ngModel = null;
                    });

                    scope.getTrs = function () {
                        if (scope.$tableWrapper) {
                            return scope.$tableWrapper.find("tbody tr");
                        }
                        return $();
                    };
                    var lastKeyup = ''; //处理ctrl + c 先放开ctrl会弹出框的问题
                    scope.inputText.on('keyup', function (event) {
                        if (scope.ngDisabled || scope.disabled || scope.ngReadonly || scope.readonly || scope.inputText.attr("readonly") == "readonly" || scope.inputText.attr("readonly") == "true") return;
                        // 按 shift 键导致值清空
                        if (event.keyCode === 16) {
                            return;
                        }
                        var newVal = scope.inputText.val();
                        var oldVal = scope.__keydownVal || '';
                        delete scope.__keydownVal;
                        var e = e || event,
                            currKey = e.keyCode || e.which || e.charCode,
                            trs = scope.getTrs(),
                            keyLength = trs.length + 1;
                        if ((e.ctrlKey && currKey !== 86) || currKey === 17 || (lastKeyup === 17 && currKey === 67)) {
                            lastKeyup = currKey;
                            return;
                        }
                        lastKeyup = currKey;
                        scope.isOperSelf = true;
                        scope.isClick = false;
                        /*if (oldVal !== newVal && currKey !== 13 && currKey !== 9) {
                            scope.justSelected = false;
                        }
                        if (oldVal !== newVal && currKey !== 18) { //排除按快捷键后, 失去焦点清空值
                            scope.firstTime = false;
                        }*/

                        /* 输入分隔符，选中第一条 */
                        if (scope.multi
                            && scope.isSeparatorSelected
                            && _.last(newVal) === scope.valueSeparator
                            && newVal.length > oldVal.length
                            && _.last(oldVal) !== scope.valueSeparator
                            && (scope.$keyword !== '' || oldVal === '')
                        ) {
                            trs = scope.getTrs();
                            //if (trs.length && scope.tableShow) {
                            var textArr = scope.inputText.val().split(scope.valueSeparator);
                            if (trs.length && scope.tableShow && textArr.length <= scope.selectedRow.length + 2) {
                                if (scope.currIndex > -1) {
                                    trs.eq(scope.currIndex).click();
                                } else {
                                    if ($(trs.eq(0)).find(".form-clickbox").attr("selected") != "selected")
                                        trs.eq(0).click();
                                }
                                var showVal = $.trim(scope.inputText.val());
                                var tailChar = (showVal && _.last(showVal) !== scope.valueSeparator) ? scope.valueSeparator : '';
                                scope.inputText.val(showVal + tailChar);
                            }
                            // scope.tableShow = false;
                            associate.apply();
                            event.stopPropagation();
                            event.preventDefault();
                            return;
                        }
                        /* 输入分隔符，选中第一条 end */
                        switch (currKey) {
                            //方向左键
                            case 37:
                                if (1 < scope.page) {
                                    scope.$apply(function () {
                                        scope.blurText = scope.inputText.val();
                                        associate.goPage(scope.page - 1);
                                    })
                                }
                                if (document.activeElement != scope.inputText[0]) {
                                    event.stopPropagation();
                                    event.preventDefault();
                                }
                                break;
                            //方向右键
                            case 39:
                                if (scope.page + 1 <= scope.totalPage) {
                                    var tempPage = scope.page + 1;
                                    scope.$apply(function () {
                                        scope.blurText = scope.inputText.val();
                                        associate.goPage(tempPage);
                                    })
                                }
                                if (document.activeElement != scope.inputText[0]) {
                                    event.stopPropagation();
                                    event.preventDefault();
                                }
                                break;
                            //方向上键
                            case 38:
                                trs.removeClass("current");
                                scope.currIndex = (scope.currIndex + keyLength - 1) % keyLength;
                                trs.eq([scope.currIndex]).addClass("current");
                                event.stopPropagation();
                                event.preventDefault();
                                break;
                            //方向下键
                            case 40:
                                if (!scope.tableShow && !scope.searchIng && scope.isInKeydownNewRowGrid && scope.isInKeydownNewRowGrid()) {
                                    break;
                                }
                                trs.removeClass("current");
                                scope.currIndex = (scope.currIndex + keyLength + 1) % keyLength;
                                trs.eq([scope.currIndex]).addClass("current");
                                event.stopPropagation();
                                event.preventDefault();
                                break;
                            //空格键
                            // case 32:
                            //     var inputTextVal = scope.inputText.val();
                            //     if (inputTextVal.length > 0 && scope.spaceClear) {
                            //         if (inputTextVal.charAt(0) == ' ' || inputTextVal.charAt(inputTextVal.length - 1) == ' ') {
                            //             scope.inputText.val(scope.inputText.val().replace(/(^\gillions*)|(\s*$)/g, ""));
                            //         }
                            //     }
                            //     if (trs[scope.currIndex]) {
                            //         trs[scope.currIndex].click();
                            //     } else {
                            //         tempWord = scope.inputText.val();
                            //         //因为延迟 所以在这里直接赋值父scope的keyword属性
                            //         var newKeyword = tempWord;
                            //         if (attrs.gCase = "upper") {
                            //             newKeyword = newKeyword.toUpperCase();
                            //         }
                            //         scope.keywordSetter(scope.$parent, newKeyword);
                            //         associate.reSearch(scope.delayTime);
                            //     }
                            //     return false;
                            //     break;
                            //回车键
                            case 13:
                                //TODO

                                break;
                            case 9:
                                if (scope.showEvent != "focus") {
                                    break;
                                }
                            default:
                                if (currKey == 18 || currKey == 17 || currKey == 16 || event.altKey || event.shiftKey || (event.ctrlKey && currKey !== 86)) return;
                                currKey == 8 ? scope.deleteOperate = true : scope.deleteOperate = false;
                                //scope.firstTime = false;
                                //if (currKey !== 9) scope.justSelected = false;
                                if (scope.deleteOperate && scope.inputText.val() == "") {
                                    if (scope.multi) {
                                        scope.selectedRow = [];
                                        scope.selectedRowSetter(scope.$parent, []);
                                    } else {
                                        if (scope.emptyClear) {
                                            scope.$selectedRow = {};
                                        } else {
                                            scope.$selectedRow[scope.displayExpress] = "";
                                            scope.$selectedRow[scope.valueProp] = "";

                                            if (scope.$selectedRow[scope.valueProp + "_$bak"]) {
                                                scope.$selectedRow[scope.valueProp + "_$bak"] = "";
                                            }
                                        }
                                    }

                                    if (!angular.isUndefined(attrs.onClear)) {
                                        scope.onClear();
                                    }
                                }
                                // if (tempWord == scope.inputText.val() && tempWord != "") {
                                //     //防止重复提交
                                //     associate.showView();
                                //     associate.apply();
                                //     break;
                                // }
                                // tempWord = scope.inputText.val();
                                //
                                // if (scope.selectedRow && !scope.unmatchRemove) {
                                //     scope.selectedRow[scope.displayExpress] = tempWord;
                                //     scope.selectedRow[scope.valueProp] = tempWord;
                                // }
                                //
                                // if (attrs.keyword) {
                                //     //因为延迟 所以在这里直接赋值父scope的keyword属性
                                //     var newKeyword = tempWord;
                                //     if(attrs.gCase="upper"){
                                //         newKeyword = newKeyword.toUpperCase();
                                //     }
                                //     scope.keywordSetter(scope.$parent, newKeyword);
                                // }
                                // associate.reSearch(scope.delayTime);

                                //IE8兼容性问题的处理
                                if (currKey == 8 || currKey == 46) {
                                    if (window.document.documentMode == 8) {
                                        scope.inputText.trigger("propertychange");
                                    }
                                    if (window.document.documentMode == 9) {
                                        scope.inputText.trigger("input");
                                    }
                                }
                                break;
                                return false;
                        }
                    });
                    //针对中文输入的处理
                    /*var cpLock = true;
                    scope.inputText.bind('compositionstart',function(){
                        cpLock = false;
                    });
                    scope.inputText.bind('compositionend',function(){
                        cpLock = true;
                    });*/
                    scope.inputText.bind('input propertychange', function (event) {
                        //针对中文输入的处理
                        //if (!cpLock && window.document.documentMode !== 8) return;

                        //IE8兼容性问题的处理
                        if (window.document.documentMode == 8) {
                            if (scope.justSelected || (window.event.propertyName != "" && window.event.propertyName != "value") ||
                                (tempWord == scope.inputText.val() && scope.inputText.val() != "")) {
                                return;
                            }
                        }
                        var promiseId = AssociatePromiseService.register(scope.$id);
                        // if (tempWord == scope.inputText.val() && tempWord != "") {
                        //     //防止重复提交
                        //     associate.showView();
                        //     associate.apply();
                        //     return;
                        // }
                        tempWord = scope.inputText.val();
                        if (window.document.documentMode !== 8) {
                            scope.justSelected = false;
                            scope.firstTime = false;
                        }
                        scope.bluring = false;
                        if (scope.selectedRow && !scope.unmatchRemove) {
                            scope.selectedRow[scope.displayExpress] = tempWord;
                            scope.selectedRow[scope.valueProp] = tempWord;
                        }

                        //因为延迟 所以在这里直接赋值父scope的keyword属性
                        var newKeyword = tempWord;
                        if (attrs.gCase == "upper") {
                            newKeyword = newKeyword.toUpperCase();
                        }
                        scope.keywordSetter(scope.$parent, newKeyword);

                        associate.reSearch(scope.delayTime, promiseId);
                    });

                    function readonlySetting() {
                        $timeout(function () {
                            if (scope.ngDisabled || scope.disabled || scope.ngReadonly || scope.readonly || scope.inputText.attr("readonly") == "readonly" || scope.inputText.attr("readonly") == "true") scope.inputText.attr("readonly", "readonly");
                            else scope.inputText.removeAttr("readonly");
                        }, 100);
                    }

                    if (attrs.ngDisabled) {
                        scope.$watch("ngDisabled", function () {
                            readonlySetting();
                        });
                    }
                    if (attrs.ngReadonly) {
                        scope.$watch("ngReadonly", function () {
                            readonlySetting();
                        });
                    }
                }
            }
        };
    };
});
