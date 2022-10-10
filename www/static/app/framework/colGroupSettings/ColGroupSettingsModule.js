(function (window) {
    define('framework/colGroupSettings/ColGroupSettingsModule', [
        'angular',
        'underscore'
    ], function (angular, _) {

        var grouped = _.matcher({group: true});

        function getMainWindow(window) {
            var href = window.location.href;
            if (href.indexOf('__showUrl=true') !== -1) {
                return getMainWindow(window.parent);
            }
            return window;
        }

        return angular.module('ColGroupSettingsModule', [])
            .directive('gColGroupSettings', function ($parse, $rootScope, $window, GillionMsg, GillionLocationService, Arrays, gridLayoutService) {

                var ColGroupSettingsProto = ColGroupSettings.prototype;
                var $style = $('<style>body{overflow:hidden !important;}</style>');

                function ColGroupSettings(scope, element) {
                    var me = this;
                    me.scope = scope;
                    me.element = element;
                    me.selections = {
                        G: [],
                        L: [],
                        R: []
                    };
                }

                ColGroupSettingsProto._startSetting = function (grid) {
                    var me = this,
                        groupCache = {},
                        i;
                    me.__currentGrid = grid;
                    me.colSettingStyleHtml = grid.scope.colSettingStyleHtml;
                    var columns = _.filter(grid.columns, function(column) {
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
                    for (i = 0; i < me.source.length; i++) {
                        groupCache[me.source[i].field] = !!me.source[i].group;
                    }
                    me.groupCache = groupCache;
                    me.selected = [];
                    me.fixedColumns = grid.scope.fixedColumns || 0;
                    Arrays.pushAll(columns, me.selected);
                    me.show();
                };

                ColGroupSettingsProto._appendColSettingsStyle = function () {
                    var me = this;
                    var colSettingStyleHtml = me.colSettingStyleHtml;
                    me.element.find('.col-group-setting-style').remove();
                    if (colSettingStyleHtml) {
                        me.element.append(colSettingStyleHtml);
                    }
                };


                ColGroupSettingsProto.show = function () {
                    var me = this,
                        scope = me.scope,
                        $element = me.element;
                    $('head').append($style);
                    me._appendColSettingsStyle();
                    if (!(scope.$$phase || scope.$root.$$phase)) {
                        scope.$apply(showMaskedPanel);
                    } else {
                        scope.$evalAsync(showMaskedPanel);
                    }

                    function showMaskedPanel() {
                        $element.show();
                        GillionMsg.mask($element);
                    }
                };

                ColGroupSettingsProto.cancel = function () {
                    var me = this,
                        groupCache = me.groupCache;
                    _.each(me.source, function (item) {
                        if (groupCache[item.field]) {
                            item.group = true;
                        } else {
                            delete item.group;
                        }
                    });
                    me.hide();
                };

                ColGroupSettingsProto.enter = function () {
                    var me = this,
                        enteredCols = me._getSelected();
                    if (_.isEmpty(enteredCols)) {
                        GillionMsg.alert(null, '不允许隐藏所有列。');
                        return;
                    }
                    me.__currentGrid._enterCols(enteredCols, true, me.getFixedColumns());
                    me.hide();
                };

                ColGroupSettingsProto.getFixedColumns = function () {
                    var fixedColumns = parseInt(this.fixedColumns) || 0;
                    if (fixedColumns < 0) {
                        fixedColumns = 0;
                    }
                    return fixedColumns;
                };

                ColGroupSettingsProto.hide = function (keepCache) {
                    $style.remove();
                    $('.col-group-setting-style').remove();
                    this.element.find('.col-group-setting-style').remove();
                    this.element.hide();
                    GillionMsg.unMask();
                    if (!keepCache) {
                        delete this.groupCache;
                    }
                };

                ColGroupSettingsProto.createLayout = function (title) {
                    var me = this,
                        enteredCols = me._getSelected(),
                        tableId = me.__currentGrid.scope.colSettingsKey;
                    if (_.isEmpty(enteredCols)) {
                        GillionMsg.alert(null, '不允许隐藏所有列。');
                        return;
                    }
                    if (!me.__currentGrid.gridType === 'HotTable') {
                        me.__currentGrid._enterCols(enteredCols, true, me.getFixedColumns());
                    }
                    if (!me.__currentGrid.gridType === 'HotTable') {
                        me.hide();
                        gridLayoutService.createLayout(tableId, title);
                    } else {
                        me.hide(true);
                        gridLayoutService.createLayout(tableId, title, me, me.__currentGrid);
                    }
                };

                ColGroupSettingsProto.saveLayout = function () {
                    var me = this,
                        enteredCols = me._getSelected(),
                        tableId = me.__currentGrid.scope.colSettingsKey;
                    if (_.isEmpty(enteredCols)) {
                        GillionMsg.alert(null, '不允许隐藏所有列。');
                        return;
                    }
                    me.__currentGrid._enterCols(enteredCols, true, me.getFixedColumns());
                    me.hide();
                    gridLayoutService.saveLayout(tableId);
                };

                ColGroupSettingsProto._getSelected = function () {
                    return _.sortBy(this.selected, _.negate(grouped));
                };

                ColGroupSettingsProto._getUnSelected = function () {
                    var me = this,
                        selected = me.selected,
                        source = me.source;
                    return _.partial(_.without, source).apply($window, selected);
                };

                ColGroupSettingsProto._getGrouped = function () {
                    return _.filter(this.selected, function (item) {
                        return item.group;
                    });
                };

                ColGroupSettingsProto._addGroup = function () {
                    var me = this,
                        selected = me.selected,
                        leftSelections = me.selections.L,
                        index,
                        withoutSelection;
                    leftSelections = _.filter(leftSelections, function (item) {
                        return !item.group;
                    });
                    withoutSelection = _.partial(_.without, selected).apply($window, leftSelections);
                    index = _.findLastIndex(withoutSelection, {
                        group: true
                    });
                    Array.prototype.splice.apply(withoutSelection, [index + 1, 0].concat(leftSelections));
                    me.selected = withoutSelection;
                    _.each(leftSelections, function (item) {
                        item.group = true;
                    });
                    me.selections.L.length = 0;
                };

                ColGroupSettingsProto._removeGroup = function () {
                    var me = this,
                        selected = me.selected,
                        groupSelections = me.selections.G,
                        index,
                        withoutSelection;
                    withoutSelection = _.partial(_.without, selected).apply($window, groupSelections);
                    index = _.findLastIndex(withoutSelection, {
                        group: true
                    });
                    Array.prototype.splice.apply(withoutSelection, [index + 1, 0].concat(groupSelections));
                    me.selected = withoutSelection;
                    _.each(groupSelections, function (item) {
                        delete item.group;
                    });
                    me.selections.G.length = 0;
                };

                ColGroupSettingsProto._upGroup = function () {
                    var me = this,
                        selected = me.selected,
                        groupSelections = me.selections.G,
                        i, len, item;
                    for (i = 1, len = selected.length; i < len; i++) {
                        item = selected[i];
                        if (_.contains(groupSelections, item)
                            && !_.contains(groupSelections, selected[i - 1])) {
                            selected.splice(i, 1);
                            selected.splice(i - 1, 0, item);
                        }
                    }
                };

                ColGroupSettingsProto._downGroup = function () {
                    var me = this,
                        selected = me.selected,
                        groupSelections = me.selections.G,
                        i, item;
                    for (i = (selected.length - 2); i >= 0; i--) {
                        item = selected[i];
                        if (_.contains(groupSelections, item)
                            && !_.contains(groupSelections, selected[i + 1])) {
                            if (!selected[i + 1].group) return;
                            selected.splice(i, 1);
                            selected.splice(i + 1, 0, item);
                        }
                    }
                };

                ColGroupSettingsProto._addSelection = function ($event, item, type) {
                    var me = this,
                        selections = me.selections;
                    if (!$event.ctrlKey) {
                        selections.L.length = 0;
                        selections.R.length = 0;
                        selections.G.length = 0;
                    }
                    selections[type].push(item);
                };

                ColGroupSettingsProto._anySelection = function (item, type) {
                    return _.contains(this.selections[type], item);
                };

                ColGroupSettingsProto._down = function () {
                    var me = this,
                        selected = me.selected,
                        ls = me.selections.L,
                        i, item;
                    for (i = (selected.length - 2); i >= 0; i--) {
                        if (canMoveDown(i)) {
                            item = selected[i];
                            selected.splice(i, 1);
                            selected.splice(i + 1, 0, item);
                        }
                    }

                    /**
                     * 根据选中列的索引判断是否能下移
                     * @param idx 选中的列的索引
                     */
                    function canMoveDown(idx) {
                        var item = selected[idx],
                            next = selected[idx + 1];
                        if (_.contains(ls, item) && !_.contains(ls, next)) {
                            return !(grouped(item) && !grouped(next)); // 当前列分组而下列不分组不移动
                        }
                        return false;
                    }
                };

                ColGroupSettingsProto._up = function () {
                    var me = this,
                        selected = me.selected,
                        ls = me.selections.L,
                        i, len, item;
                    // 从`1`开始是因为:索引为0的item无法上移
                    for (i = 1, len = selected.length; i < len; i++) {
                        if (canMoveUp(i)) {
                            item = selected[i];
                            selected.splice(i, 1);
                            selected.splice(i - 1, 0, item);
                        }
                    }

                    /**
                     * 根据选中列的索引判断是否能上移
                     * @param idx 选中的列的索引
                     */
                    function canMoveUp(idx) {
                        var item = selected[idx],
                            pre = selected[idx - 1];
                        if (_.contains(ls, item) && !_.contains(ls, pre)) {
                            return !(!grouped(item) && grouped(pre)); // 当前列不分组而上列分组不移动
                        }
                        return false;
                    }
                };

                ColGroupSettingsProto._first = function () {
                    var me = this,
                        ls = me.selections.L,
                        groupedUnGroupedPair, firstUnGroupedIdx;
                    if (!_.isEmpty(ls)) {
                        groupedUnGroupedPair = _.chain(ls)
                            .intersection(me.selected)
                            .partition(grouped)
                            .value();
                        me.selected = _.difference(me.selected, ls);
                        firstUnGroupedIdx = _(me.selected).findIndex(_.negate(grouped));
                        firstUnGroupedIdx = firstUnGroupedIdx === -1 ? 0 : firstUnGroupedIdx;
                        Arrays.into(groupedUnGroupedPair[1], me.selected, firstUnGroupedIdx);
                        Arrays.into(groupedUnGroupedPair[0], me.selected, 0);
                    }
                };


                ColGroupSettingsProto._last = function () {
                    var me = this,
                        ls = me.selections.L,
                        groupedUnGroupedPair, firstUnGroupedIdx;
                    if (!_.isEmpty(ls)) {
                        groupedUnGroupedPair = _.chain(ls)
                            .intersection(me.selected)
                            .partition(grouped)
                            .value();
                        me.selected = _.difference(me.selected, ls);
                        firstUnGroupedIdx = _(me.selected).findIndex(_.negate(grouped));
                        firstUnGroupedIdx = firstUnGroupedIdx === -1 ? 0 : firstUnGroupedIdx;
                        Arrays.into(groupedUnGroupedPair[0], me.selected, firstUnGroupedIdx);
                        Arrays.into(groupedUnGroupedPair[1], me.selected, me.selected.length);
                    }
                };

                ColGroupSettingsProto._deselect = function () {
                    var me = this;
                    me.selected =_.difference(me.selected, me.selections.L);
                    _.each(me.selections.L, function (item) {
                        delete item.group;
                    });
                    me.selections.L.length = 0;
                };

                ColGroupSettingsProto._deselectAll = function () {
                    var me = this;
                    _.each(me.selected, function (item) {
                        delete item.group;
                    });
                    me.selected.length = 0;
                    me.selections.L.length = 0;
                };
                ColGroupSettingsProto._select = function () {
                    var me = this;
                    Arrays.pushAll(me.selections.R, me.selected);
                    me.selections.R.length = 0;
                };
                ColGroupSettingsProto._selectAll = function () {
                    var me = this;
                    me.selected.length = 0;
                    Arrays.pushAll(me.source, me.selected);
                    me.selections.R.length = 0;
                };

                return {
                    restrict: 'E',
                    template: '<div class="table-group-settings" id="colGroupSettings" style="display: none;">\n    <div class="title"><span class="fl">自定义列表项</span>\n        <button class="fr" ng-click="colGroupSettings.hide()"><i class="iconfont2 icon-guanbi2"></i></button>\n    <div class="fixed-columns-setting" ng-if="colGroupSettings.__currentGrid.gridType === \'HotTable\'">\n      <label>固定列数：</label>\n      <input type="number" ng-model="colGroupSettings.fixedColumns">\n    </div>\n    </div>\n    <div class="body">\n        <div class="box fl">\n            <h3> 已分组列\n                <button ng-click="colGroupSettings._upGroup()" type="button" class="fr mt-2">\n                    <i class="iconfont2 icon-shangyi"></i>\n                </button>\n                <button ng-click="colGroupSettings._downGroup()" type="button" class="fr mt-2">\n                    <i class="iconfont2 icon-xiayi"></i>\n                </button>\n            </h3>\n            <ul>\n                <li ng-class="{\'act\': colGroupSettings._anySelection(item, \'G\')}"\n                    ng-repeat="item in colGroupSettings._getGrouped() track by $id(item)"\n                    ng-click="colGroupSettings._addSelection($event, item, \'G\')">{{item.text}}</li>\n            </ul>\n        </div>\n        <div class="center fl">\n            <a ng-click="colGroupSettings._removeGroup()" href="javascript:;"><i class="iconfont2 icon-xiangyou"></i></a>\n            <a ng-click="colGroupSettings._addGroup()" href="javascript:;"><i class="iconfont2 icon-xiangzuo"></i></a>\n        </div>\n        <div class="box fl">\n            <h3> 已显示列\n                <button ng-click="colGroupSettings._first()" type="button" class="fr">\n                    <i class="iconfont2 icon-dingbu"></i>\n                </button>\n                <button ng-click="colGroupSettings._up()" type="button" class="fr mt-2">\n                    <i class="iconfont2 icon-shangyi"></i>\n                </button>\n                <button ng-click="colGroupSettings._down()" type="button" class="fr mt-2">\n                    <i class="iconfont2 icon-xiayi"></i>\n                </button>\n                <button ng-click="colGroupSettings._last()" type="button" class="fr">\n                    <i class="iconfont2 icon-dibu"></i>\n                </button>\n            </h3>\n            <ul>\n                <li ng-class="{\'act\': colGroupSettings._anySelection(item, \'L\'), \'group\': item.group}"\n                    ng-repeat="item in colGroupSettings._getSelected() track by $id(item)"\n                    ng-click="colGroupSettings._addSelection($event, item, \'L\')">{{item.text}}</li>\n            </ul>\n        </div>\n        <div class="center fl">\n            <a ng-click="colGroupSettings._deselect()" href="javascript:;"><i class="iconfont2 icon-xiangyou"></i></a>\n            <a ng-click="colGroupSettings._deselectAll()" href="javascript:;"><i class="iconfont2 icon-xiangyou2"></i></a>\n            <a ng-click="colGroupSettings._select()" href="javascript:;"><i class="iconfont2 icon-xiangzuo"></i></a>\n            <a ng-click="colGroupSettings._selectAll()" href="javascript:;"><i class="iconfont2 icon-xiangzuo2"></i></a>\n        </div>\n        <div class="box fr"><h3> 未显示列 </h3>\n            <ul>\n                <li ng-class="{\'act\': colGroupSettings._anySelection(item, \'R\')}"\n                    ng-repeat="item in colGroupSettings._getUnSelected() track by $id(item)"\n                    ng-click="colGroupSettings._addSelection($event, item, \'R\')">{{item.text}}</li>\n            </ul>\n        </div>\n    </div>\n    <div class="footer">\n        <a ng-show="!colGroupSettings.__currentGrid.gridLayout.currentLayout" href="javascript:;" class="btn btn-normal" ng-click="colGroupSettings.createLayout(&quot;新增布局&quot;)">新增布局</a>\n        <a ng-show="colGroupSettings.__currentGrid.gridLayout.currentLayout"  href="javascript:;" class="btn btn-normal" ng-click="colGroupSettings.createLayout(&quot;布局另存为&quot;)">布局另存为</a>\n        <a ng-show="colGroupSettings.__currentGrid.gridLayout.currentLayout" href="javascript:;" class="btn btn-normal" ng-click="colGroupSettings.saveLayout()">保存布局</a>\n        <a href="javascript:;" class="btn btn-normal" ng-click="colGroupSettings.enter()">确认</a>\n        <a href="javascript:;" class="btn btn-stroke" ng-click="colGroupSettings.cancel()">取消</a>\n    </div>\n</div>',
                    replace: true,
                    scope: true,
                    link: function (scope, element) {
                        var mainWindow = getMainWindow(window);
                        scope.colGroupSettings = new ColGroupSettings(scope, element);
                        scope.$on('$destory', function () {
                            if(mainWindow.__colSettings) {
                                mainWindow.__colSettings.element.off();
                                mainWindow.__colSettings.element.find('*').off();
                                mainWindow.__colSettings.element.remove();
                                delete mainWindow.__colSettings;
                                mainWindow = undefined;
                            }
                        });
                    }
                };
            })
            .factory('ColGroupSettings', function ($rootScope, $compile) {
                var mainWindow = getMainWindow(window),
                    $dom, $mainBody;

                $rootScope.$on('$destroy', function () {
                    if(mainWindow.__colGroupSettings) {
                        mainWindow.__colGroupSettings.element.off();
                        mainWindow.__colGroupSettings.element.find('*').off();
                        mainWindow.__colGroupSettings.element.remove();
                        delete mainWindow.__colGroupSettings;
                        mainWindow = undefined;
                    }
                });

                if (!mainWindow.__colGroupSettings) {
                    $dom = angular.element('<g-col-group-settings></g-col-group-settings>');
                    $compile($dom)($rootScope);
                    $mainBody = angular.element(mainWindow.document.body);
                    $mainBody.append($dom);
                    $mainBody.append('<style></style>');
                    mainWindow.__colGroupSettings = $dom.scope().colGroupSettings;
                }
                return mainWindow.__colGroupSettings;
            });
    });
}(window));
