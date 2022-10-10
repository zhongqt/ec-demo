(function (window) {
    define('framework/colSettings/ColSettingsModule', [
        'angular',
        'jquery',
        'underscore'
    ], function (angular, $, _) {

        var mainWindow = getMainWindow(window);

        function getMainWindow(win) {
            var href = win.location.href;
            if (href.indexOf('__showUrl=true') !== -1) {
                return getMainWindow(win.parent);
            }
            return win;
        }

        return angular.module('ColSettingsModule', [])
            .directive('gColSettings', function ($parse, $rootScope, $window, GillionMsg, GillionLocationService, Arrays, gridLayoutService) {

                var ColSettingsProto = ColSettings.prototype;
                var $style = $('<style>body{overflow:hidden !important;}</style>');

                function ColSettings(scope, element) {
                    var me = this;
                    me.scope = scope;
                    me.element = element;
                    me.selections = {
                        L: [],
                        R: []
                    };
                }

                ColSettingsProto._startSetting = function (grid, notShowPanel) {
                    var me = this;
                    me.__currentGrid = grid;
                    me.colSettingStyleHtml = grid.scope.colSettingStyleHtml;
                    var columns = _.filter(grid.columns, function (column) {
                        if (!column || column.noPermit || column.hidden || column.data === '$$checked') {
                            return false;
                        }
                        if (column && column.data === '$$checked') {
                            return false;
                        }
                        return true;
                    });
                    var originalCols = _.filter(grid.__originalCols, function (column) {
                        if (!column || column.noPermit || column.hidden || column.data === '$$checked') {
                            return false;
                        }
                        return true;
                    });
                    me.source = originalCols || columns;
                    me.selected = [];
                    me.fixedColumns = grid.scope.fixedColumns || 0;
                    me.columnCount = me.source.length || 0;
                    Arrays.pushAll(columns.filter(function (item) {
                        return !item.operateColumn
                    }), me.selected);
                    if (!notShowPanel) {
                        me.show();
                    }
                };

                ColSettingsProto._appendColSettingsStyle = function () {
                    var colSettingStyleHtml = this.colSettingStyleHtml;
                    this.element.find('.col-setting-style').remove();
                    if (colSettingStyleHtml) {
                        this.element.append(colSettingStyleHtml);
                    }
                }


                ColSettingsProto.show = function () {
                    var me = this;
                    $('head').append($style);
                    me._appendColSettingsStyle();
                    if (!(me.scope.$$phase || me.scope.$root.$$phase)) {
                        me.scope.$apply(function () {
                            var $element = me.element;
                            $element.show();
                            GillionMsg.mask($element);
                        });
                    } else {
                        me.scope.$evalAsync(function () {
                            var $element = me.element;
                            $element.show();
                            GillionMsg.mask($element);
                        });
                    }
                };

                ColSettingsProto.hide = function () {
                    $style.remove();
                    this.element.find('.col-setting-style').remove();
                    this.element.hide();
                    GillionMsg.unMask();
                };

                ColSettingsProto.enter = function () {
                    var me = this,
                        operateColumn = me.source.filter(function (item) {
                            return item.operateColumn
                        }),
                        enteredCols = me._getSelected();
                    if (_.isEmpty(enteredCols)) {
                        GillionMsg.alert(null, '不允许隐藏所有列。');
                        return;
                    }
                    me.__currentGrid._enterCols(operateColumn.concat(enteredCols), null, me.getFixedColumns());
                    me.hide();
                };

                ColSettingsProto.getFixedColumns = function () {
                    var fixedColumns = parseInt(this.fixedColumns) || 0;
                    if (fixedColumns < 0) {
                        fixedColumns = 0;
                    }
                    return fixedColumns;
                };

                ColSettingsProto.createLayout = function (title) {
                    var me = this,
                        operateColumn = me.source.filter(function (item) {
                            return item.operateColumn
                        }),
                        enteredCols = me._getSelected(),
                        tableId = me.__currentGrid.scope.colSettingsKey;
                    if (!enteredCols.length) {
                        return GillionMsg.alert(null, '不允许隐藏所有列。');
                    }
                    var callback = function() {
                        me.__currentGrid._enterCols(operateColumn.concat(enteredCols), null, me.getFixedColumns());
                    }
                    me.hide();
                    gridLayoutService.createLayout(tableId, title, false, callback);
                };

                ColSettingsProto.saveLayout = function () {
                    var me = this,
                        operateColumn = me.source.filter(function (item) {
                            return item.operateColumn
                        }),
                        enteredCols = me._getSelected(),
                        tableId = me.__currentGrid.scope.colSettingsKey;
                    if (!me._getSelected().length) {
                        return GillionMsg.alert(null, ($config.i18nInfo.layoutCannotHideAllCol ? $config.i18nInfo.layoutCannotHideAllCol : '不允许隐藏所有列!'));
                    }
                    me.__currentGrid._enterCols(operateColumn.concat(enteredCols), null, me.getFixedColumns());
                    me.hide();
                    gridLayoutService.saveLayout(tableId);
                };

                ColSettingsProto._getSelected = function () {
                    return this.selected;
                };

                ColSettingsProto._getUnSelected = function () {
                    var me = this,
                        selected = me.selected,
                        source = me.source;
                    return _.partial(_.without, source.filter(function (item) {
                        return !item.operateColumn
                    })).apply(null, selected);
                };

                ColSettingsProto._addSelection = function ($event, item, type) {
                    var me = this,
                        selections = me.selections;
                    if (!$event.ctrlKey) {
                        selections.L.length = 0;
                        selections.R.length = 0;
                    }
                    selections[type].push(item);
                };

                ColSettingsProto._anySelection = function (item, type) {
                    return _.contains(this.selections[type], item);
                };

                ColSettingsProto._last = function () {
                    var me = this,
                        selected = me.selected,
                        leftSelections = me.selections.L,
                        withoutSelection;
                    withoutSelection = _.partial(_.without, selected).apply(null, leftSelections);
                    me.selected = withoutSelection.concat(leftSelections);
                };

                ColSettingsProto._down = function () {
                    var me = this,
                        selected = me.selected,
                        leftSelections = me.selections.L,
                        i, item;
                    for (i = (selected.length - 2); i >= 0; i--) {
                        item = selected[i];
                        if (_.contains(leftSelections, item)
                            && !_.contains(leftSelections, selected[i + 1])) {
                            selected.splice(i, 1);
                            selected.splice(i + 1, 0, item);
                        }
                    }
                };
                ColSettingsProto._up = function () {
                    var me = this,
                        selected = me.selected,
                        leftSelections = me.selections.L,
                        i, len, item;
                    for (i = 1, len = selected.length; i < len; i++) {
                        item = selected[i];
                        if (_.contains(leftSelections, item)
                            && !_.contains(leftSelections, selected[i - 1])) {
                            selected.splice(i, 1);
                            selected.splice(i - 1, 0, item);
                        }
                    }
                };
                ColSettingsProto._first = function () {
                    var me = this,
                        selected = me.selected,
                        leftSelections = me.selections.L,
                        withoutSelection;
                    withoutSelection = _.partial(_.without, selected).apply(null, leftSelections);
                    me.selected = leftSelections.concat(withoutSelection);
                };

                ColSettingsProto._deselect = function () {
                    var me = this;
                    if (me.selected.length == 0) {
                        GillionMsg.alert(null, ($config.i18nInfo.layoutShowColNone ? $config.i18nInfo.layoutShowColNone : '已显示列已无数据!'));
                        return;
                    }
                    var l = me.selections.L;
                    if (l.length == 0) {
                        GillionMsg.alert(null, ($config.i18nInfo.layoutSelectItem ? $config.i18nInfo.layoutSelectItem : '请选择列名!'));
                        return;
                    }
                    l = _.filter(l, function (o) {
                        if (o.required) return false;
                        if (o.requiredExpr) return o.requiredExpr(o);
                        if (me.__currentGrid && me.__currentGrid.scope && me.__currentGrid.scope.columnRequiredExpr) return me.__currentGrid.scope.columnRequiredExpr(o);
                        return true;
                    });
                    if (!l.length) {
                        GillionMsg.alert(null, ($config.i18nInfo.layoutItemCannotHide ? $config.i18nInfo.layoutItemCannotHide : '必输项不可隐藏!'));
                    }
                    me.selected = _.partial(_.without, me.selected).apply(null, l);
                    me.selections.L.length = 0;
                };

                ColSettingsProto._deselectAll = function () {
                    var me = this;
                    var oldSelected = me.selected;
                    if (oldSelected.length == 0) {
                        GillionMsg.alert(null, ($config.i18nInfo.layoutShowColNone ? $config.i18nInfo.layoutShowColNone : '已显示列已无数据!'));
                        return;
                    }
                    var newSelected = _.filter(oldSelected, function (o) {
                        if (o.required) return true;
                        if (o.requiredExpr) return !o.requiredExpr(o);
                        if (me.__currentGrid && me.__currentGrid.scope && me.__currentGrid.scope.columnRequiredExpr) return !me.__currentGrid.scope.columnRequiredExpr(o);
                        return false;
                    })
                    if (newSelected.length > 0 && newSelected.length === oldSelected.length) {
                        GillionMsg.alert(null, '必输项不可隐藏!');
                        return;
                    }
                    me.selected = newSelected;
                    me.selections.L.length = 0;
                };
                ColSettingsProto._select = function () {
                    var me = this;
                    if (me.source.length == 0 || me.selected.length == me.source.length) {
                        GillionMsg.alert(null, ($config.i18nInfo.layoutHideColNone ? $config.i18nInfo.layoutHideColNone : '未显示列已无数据!'));
                        return;
                    }
                    if (me.selections.R.length == 0) {
                        GillionMsg.alert(null, ($config.i18nInfo.layoutSelectItem ? $config.i18nInfo.layoutSelectItem : '请选择列名!'));
                        return;
                    }
                    Arrays.pushAll(me.selections.R, me.selected);
                    me.selections.R.length = 0;
                };
                ColSettingsProto._selectAll = function () {
                    var me = this;
                    if (me.source.length == 0 || me.selected.length == me.source.length) {
                        GillionMsg.alert(null, ($config.i18nInfo.layoutHideColNone ? $config.i18nInfo.layoutHideColNone : '未显示列已无数据!'));
                        return;
                    }
                    me.selected.length = 0;
                    Arrays.pushAll(me.source.filter(function (item) {
                        return !item.operateColumn
                    }), me.selected);
                    me.selections.R.length = 0;
                };

                return {
                    restrict: 'E',
                    template: '<div class="table-settings" id="colSettings" style="display: none;">\n  <div class="title"><span class="fl">' + ($config.i18nInfo.layoutList ? $config.i18nInfo.layoutList : '自定义列表项') + '</span>\n    <button class="fr" ng-click="colSettings.hide()"><i class="iconfont2 icon-guanbi2"></i></button>\n    <div class="fixed-columns-setting" ng-if="colSettings.__currentGrid.gridType === \'HotTable\'">\n      <label>' + ($config.i18nInfo.layoutFixedColCount ? $config.i18nInfo.layoutFixedColCount : '固定列数：') + '</label>\n      <input type="number" ng-model="colSettings.fixedColumns" min=0 max={{colSettings.columnCount}}>\n    </div>\n  </div>\n  <div class="body">\n    <div class="box fl">\n      <h3> ' + ($config.i18nInfo.layoutShowCol ? $config.i18nInfo.layoutShowCol : '已显示列') + '\n        <button ng-click="colSettings._first()" type="button" class="fr">\n                      <i class="iconfont2 icon-dingbu"></i>\n                </button>\n        <button ng-click="colSettings._up()" type="button" class="fr mt-2">\n                      <i class="iconfont2 icon-shangyi"></i>\n                </button>\n        <button ng-click="colSettings._down()" type="button" class="fr mt-2">\n                      <i class="iconfont2 icon-xiayi"></i>\n                </button>\n        <button ng-click="colSettings._last()" type="button" class="fr">\n                      <i class="iconfont2 icon-dibu"></i>\n                </button>\n      </h3>\n      <ul>\n        <li ng-class="{\'act\': colSettings._anySelection(item, \'L\')}" ng-repeat="item in colSettings._getSelected() track by $index"\n          ng-click="colSettings._addSelection($event, item, \'L\')"><span ng-if="item.required" style="color: red">*</span><span ng-bind="item.text"></span></li>\n      </ul>\n    </div>\n    <div class="center fl">\n      <a ng-click="colSettings._deselect()" href="javascript:;"><i class="iconfont2 icon-xiangyou"></i></a>\n      <a ng-click="colSettings._deselectAll()" href="javascript:;"><i class="iconfont2 icon-xiangyou2"></i></a>\n      <a ng-click="colSettings._select()" href="javascript:;"><i class="iconfont2 icon-xiangzuo"></i></a>\n      <a ng-click="colSettings._selectAll()" href="javascript:;"><i class="iconfont2 icon-xiangzuo2"></i></a>\n    </div>\n    <div class="box fr">\n      <h3> ' + ($config.i18nInfo.layoutHideCol ? $config.i18nInfo.layoutHideCol : '未显示列') + ' </h3>\n      <ul>\n        <li ng-class="{\'act\': colSettings._anySelection(item, \'R\')}" ng-repeat="item in colSettings._getUnSelected() track by $id(item)"\n          ng-click="colSettings._addSelection($event, item, \'R\')"><span ng-if="item.required" style="color: red">*</span><span ng-bind="item.text"></span></li>\n      </ul>\n    </div>\n  </div>\n  <div class="footer">\n    <a ng-show="!colSettings.__currentGrid.gridLayout.currentLayout && colSettings.__currentGrid.gridLayout" href="javascript:;"\n      class="btn btn-normal" ng-click="colSettings.createLayout(&quot;' + ($config.i18nInfo.layoutAdd ? $config.i18nInfo.layoutAdd : '新增布局') + '&quot;)">' + ($config.i18nInfo.layoutAdd ? $config.i18nInfo.layoutAdd : '新增布局') + '</a>\n    <a ng-show="colSettings.__currentGrid.gridLayout.currentLayout" href="javascript:;" class="btn btn-normal" ng-click="colSettings.createLayout(&quot;' + ($config.i18nInfo.layoutSaveAs ? $config.i18nInfo.layoutSaveAs : '布局另存为') + '&quot;)">' + ($config.i18nInfo.layoutSaveAs ? $config.i18nInfo.layoutSaveAs : '布局另存为') + '</a>\n    <a ng-show="colSettings.__currentGrid.gridLayout.currentLayout" href="javascript:;" class="btn btn-normal" ng-click="colSettings.saveLayout()">' + ($config.i18nInfo.layoutSave ? $config.i18nInfo.layoutSave : '保存布局') + '</a>\n    <a href="javascript:;" class="btn btn-normal" ng-click="colSettings.enter()">' + ($config.i18nInfo.layoutConfirm ? $config.i18nInfo.layoutConfirm : '确定') + '</a>\n    <a href="javascript:;" class="btn btn-stroke" ng-click="colSettings.hide()">' + ($config.i18nInfo.layoutCancel ? $config.i18nInfo.layoutCancel : '取消') + '</a>\n  </div>\n</div>\n',
                    replace: true,
                    scope: true,
                    link: function (scope, element) {
                        scope.colSettings = new ColSettings(scope, element);
                        scope.$on('$destory', function () {
                            console.log('col Settings destory ........................')
                            delete mainWindow.__colSettings;
                            mainWindow = undefined;
                        });
                    }
                };
            })
            .factory('ColSettings', function ($rootScope, $compile) {
                $rootScope.$on('$destroy', function () {
                    if (mainWindow.__colSettings) {
                        delete mainWindow.__colSettings;
                        mainWindow = undefined;
                    }
                });

                return {
                    get: function () {
                        var $dom, $mainBody;
                        if (!mainWindow.__colSettings) {
                            $dom = angular.element('<g-col-settings></g-col-settings>');
                            $compile($dom)($rootScope);
                            $mainBody = angular.element(mainWindow.document.body);
                            $mainBody.append($dom);
                            $mainBody.append('<style></style>');
                            mainWindow.__colSettings = $dom.scope().colSettings
                        }
                        return mainWindow.__colSettings;
                    }
                };
            });
    });
}(window));
