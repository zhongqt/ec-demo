(function (window, JSON) {
    define([
        "angular",
        "underscore",
        "config.properties",
        "css!./gridLayout.css"
    ], function (angular, _, config) {
        var ctx = config.controls.dataGrid.ctx || window.basePath;

        function getMainWindow(window) {
            var href = window.location.href;
            if (href.indexOf('__showUrl=true') !== -1) {
                return getMainWindow(window.parent);
            }
            return window;
        }

        function getPathName() {
            var pathname = window.location.pathname,
                index = pathname.indexOf("?");
            if (index > 0) {
                pathname = pathname.substring(0, index);
            }
            return pathname;
        }

        return angular.module("GridLayoutModule", [])
            .service('gridLayoutService', function ($http, $compile, GillionMsg, GillionLocationService) {
                var GridLayoutServicePro = DataGridLayoutService.prototype,
                    gridLayoutService;

                function DataGridLayoutService($http, $compile, GillionMsg) {
                    this.$http = $http;
                    this.$compile = $compile;
                    this.GillionMsg = GillionMsg;
                    this.gridLayout = {};
                }

                /*注册布局服务*/
                GridLayoutServicePro.registerLayout = function (scope, grid) {
                    var rightMenuTemplate, me = this, tableId, $rightMenu;
                    tableId = scope.colSettingsKey;
                    if (!tableId || tableId === "") {
                        return;
                    }

                    if (!me.gridLayout[tableId]) {
                        me.gridLayout[tableId] = {};
                        me.gridLayout[tableId].layouts = {};
                        me.gridLayout[tableId].grid = grid;
                        me.gridLayout[tableId].__scope = scope;
                        me.gridLayout[tableId].currentLayout = null;
                    }
                    scope.gridLayout = grid.gridLayout = me.gridLayout[tableId];
                    scope.layoutService = me;
                    scope.gridType = grid.gridType;
                    // me.loadNewLayout(tableId, grid);
                    me.loadLayouts(tableId);
                    rightMenuTemplate = "<div class='dropdown position-fixed' id='dropdownMenu_" + tableId + "' style='z-index: 999999'> \n <ul class='dropdown-menu' style='position:static;font-size:0.9em;'> \n <li><ul style='overflow-y:auto;max-height:120px;'><li role='presentation' data-action='editName' ng-repeat='layout in gridLayout.layouts | orderBy:layout.index'  ng-click='layoutService.setLayout(layout,&quot;" + tableId + "&quot;)'><span  ng-class='{&quot;select&quot;:layout.name===gridLayout.currentLayout.name}'></span><a class='layoutItema' href='javascript:void(0);' role='menuitem'><span class='name'>{{layout.name}}</span></a></li></ul></li> \n <li class='divider'></li><li role='presentation' data-action='setUneditable' ng-click='layoutService.resetLayout(&quot;" + tableId + "&quot;)'><span ng-class='{&quot;select&quot;:!gridLayout.currentLayout.name}'></span><a class='layoutItema' href='javascript:void(0);' role='menuitem'><span class='actionName'>" + ($config.i18nInfo.layoutDefault ? $config.i18nInfo.layoutDefault : '默认布局') + "</span></a> </li> \n <li class='divider'></li><li role='presentation' data-action='setUneditable'  ng-show='gridLayout.currentLayout' ng-click='layoutService.saveLayout(&quot;" + tableId + "&quot;)' ><span></span><a class='layoutItema' href='javascript:void(0);'  role='menuitem'><span class='actionName'>" + ($config.i18nInfo.layoutSave ? $config.i18nInfo.layoutSave : '保存布局') + "</span></a></li> \n <li role='presentation' data-action='setUneditable'  ng-show='gridLayout.currentLayout' ng-click='layoutService.createLayout(&quot;" + tableId + "&quot;,&quot;" + ($config.i18nInfo.layoutSaveAs ? $config.i18nInfo.layoutSaveAs : '布局另存为') + "&quot;)'><span></span><a class='layoutItema' href='javascript:void(0);' role='menuitem'><span class='actionName'>" + ($config.i18nInfo.layoutSaveAs ? $config.i18nInfo.layoutSaveAs : '布局另存为') + "……</span></a></li> \n <li role='presentation' data-action='setUneditable' ng-show='!gridLayout.currentLayout' ng-click='layoutService.createLayout(&quot;" + tableId + "&quot;,&quot;" + ($config.i18nInfo.layoutAdd ? $config.i18nInfo.layoutAdd : '新增布局') + "&quot;)'><span></span><a class='layoutItema' href='javascript:void(0);'  role='menuitem'><span class='actionName'>" + ($config.i18nInfo.layoutAdd ? $config.i18nInfo.layoutAdd : '新增布局') + "</span></a></li> \n <li class='divider'></li><li role='presentation' data-action='deleteRow' ng-show='gridLayout.currentLayout' ng-click='layoutService.deleteLayout(&quot;" + tableId + "&quot;)'><span></span><a class='layoutItema' href='javascript:void(0);'  role='menuitem'><span class='actionName'>" + ($config.i18nInfo.layoutDelete ? $config.i18nInfo.layoutDelete : '删除布局') + "</span></a></li> \n<li ng-show='gridLayout.currentLayout' class='divider'></li><li role='presentation' data-action='autoWidthColumns' ng-click='layoutService.autoWidthColumns(&quot;" + tableId + "&quot;)'><span></span><a class='layoutItema' href='javascript:void(0);'  role='menuitem'><span class='actionName'>" + ($config.i18nInfo.layoutColumnWidthAuto ? $config.i18nInfo.layoutColumnWidthAuto : '列宽自适应') + "</span></a></li> <li ng-if='gridType === \"HotTable\"' class='divider'></li><li ng-if='gridType === \"HotTable\"' role='presentation' ng-click='layoutService.clearFilters(&quot;" + tableId + "&quot;)'><span></span><a class='layoutItema' href='javascript:void(0);'  role='menuitem'><span class='actionName'>" + ($config.i18nInfo.layoutFilterClear ? $config.i18nInfo.layoutFilterClear : '清除筛选条件') + "</span></a></li> <li class='divider'></li></ul></div>";
                    $rightMenu = this.$compile(rightMenuTemplate)(scope);
                    angular.element(document.body).append($rightMenu);
                    scope.$rightMenu = $rightMenu;
                };

                //加载最新布局
                GridLayoutServicePro.loadNewLayout = function (tableId) {
                    var me = this,
                        pathname = getPathName(),
                        currentLayout = me.gridLayout[tableId].currentLayout,
                        layoutUrl = "/layout/get/" + tableId;
                    if (currentLayout && currentLayout.name) {
                        layoutUrl += "/" + currentLayout.name;
                    }
                    layoutUrl += '?unique=' + new Date().getTime();
                    me.$http({
                        url: ctx + layoutUrl,
                        method: 'GET',
                        params: {pathname: pathname}
                    }).success(function (result) {
                        var content, version,
                            layout = {},
                            grid = me.gridLayout[tableId].grid,
                            storageLayout = grid.loadLocalStorageLayout();
                        if (storageLayout && !_(storageLayout.content).isEmpty() && storageLayout.name !== "default") {
                            me.gridLayout[tableId].currentLayout = storageLayout;
                        } else {
                            me.gridLayout[tableId].currentLayout = null;
                        }
                        if (result && result.name && result.name !== "" && result.name != "default") { //有布局
                            if (!currentLayout || !currentLayout.name) {
                                layout.name = result.name;
                                if (!_(result.content).isEmpty()) {
                                    content = JSON.parse(result.content);
                                    version = content.version;
                                    delete content.version;
                                    layout.version = version;
                                    layout.content = content;
                                    if (grid.validLayout(layout)) {
                                        if (!storageLayout || storageLayout.name !== layout.name || storageLayout.version < layout.version) {
                                            grid.storeLayout(layout);
                                            // me.updateLayout(layout, tableId);
                                            grid.reload();
                                            me.gridLayout[tableId].currentLayout = layout;
                                        }
                                    }
                                }
                            }
                        }
                    });
                };

                //加载所有布局
                GridLayoutServicePro.loadLayouts = function (tableId, reload) {
                    var me = this,
                        pathname = getPathName(),
                        grid = me.gridLayout[tableId].grid,
                        requestUrl = '/layout/list/' + tableId + '?unique=' + new Date().getTime();
                    me.$http({
                        url: ctx + requestUrl,
                        method: 'GET',
                        params: {pathname: pathname}
                    }).success(
                        function (result) {
                            var i, layout, version, content, dbLayout, layouts, allLayout;
                            if (!_(result).isEmpty()) {
                                if (!result[0].name) return;
                                layouts = [];
                                allLayout = [];
                                for (i = 0; i < result.length; i++) {
                                    dbLayout = result[i];
                                    if (dbLayout.name && dbLayout.name !== "" && dbLayout.name !== "default") {
                                        layout = {};
                                        layout.name = dbLayout.name;
                                        layout.modify = dbLayout.modify;
                                        if (!_(dbLayout.content).isEmpty()) {
                                            content = JSON.parse(dbLayout.content);
                                            version = content.version;
                                            delete content.version;
                                            layout.version = version;
                                            layout.content = content;
                                        }
                                        if (grid.validLayout(layout)) {
                                            layouts.push(layout);
                                        }
                                    } else if (dbLayout.name === "default") {
                                        layout = {};
                                        layout.name = dbLayout.name;
                                        layout.modify = dbLayout.modify;
                                        if (!_(dbLayout.content).isEmpty()) {
                                            content = JSON.parse(dbLayout.content);
                                            version = content.version;
                                            delete content.version;
                                            layout.version = version;
                                            layout.content = content;
                                        }
                                        allLayout.push(layout);
                                    }
                                }
                                me.gridLayout[tableId].layouts = layouts;
                                allLayout = allLayout.concat(layouts);
                                me.setNewestLayout(allLayout, tableId, reload);
                            } else {
                                me.gridLayout[tableId].layouts = [];
                            }
                        });
                };


                //设置最新布局
                GridLayoutServicePro.setNewestLayout = function (layouts, tableId, reload) {
                    var layout, storageLayout,
                        me = this,
                        grid = me.gridLayout[tableId].grid;
                    if (!layouts || _(layouts).isEmpty()) return;
                    layout = me.findNewestLayout(layouts);
                    storageLayout = grid.loadLocalStorageLayout();
                    if (storageLayout && !_(storageLayout.content).isEmpty() && storageLayout.name !== "default") {
                        me.gridLayout[tableId].currentLayout = storageLayout;
                    } else {
                        me.gridLayout[tableId].currentLayout = null;
                    }
                    if (!storageLayout || storageLayout.name !== layout.name || storageLayout.version < layout.version) {
                        grid.storeLayout(layout);
                        // me.updateLayout(layout, tableId);
                        if (reload !== false) {
                            grid.reload(true);
                        }
                        if (layout.name === "default") {
                            me.gridLayout[tableId].currentLayout = null;
                        } else {
                            me.gridLayout[tableId].currentLayout = layout;
                        }
                    }
                };

                //查找最新布局
                GridLayoutServicePro.findNewestLayout = function (layouts) {
                    var newestLayout = {};
                    _(layouts).each(function (layout) {
                        if (!newestLayout.modify) {
                            newestLayout = layout;
                        } else if (newestLayout.modify < layout.modify) {
                            newestLayout = layout;
                        }
                    });
                    return newestLayout;
                };


                //设置使用布局
                GridLayoutServicePro.setLayout = function (layout, tableId) {
                    var me = this,
                        pathname = getPathName(),
                        layoutName = layout.name,
                        grid = me.gridLayout[tableId].grid,
                        storageLayout = grid.loadLocalStorageLayout(),
                        layoutUrl = "/layout/get/" + tableId + "/" + layoutName;
                    me.$http({
                        url: ctx + layoutUrl,
                        method: 'GET',
                        params: {pathname: pathname}
                    }).success(function (result) {
                        var content, version, finalLayout = layout,
                            dbLayout = {};
                        if (result && result.name && result.name !== "" && result.name != "default") { //有布局
                            dbLayout.name = result.name;
                            if (!_(result.content).isEmpty()) {
                                content = JSON.parse(result.content);
                                version = content.version;
                                delete content.version;
                                dbLayout.version = version;
                                dbLayout.content = content;
                                if (grid.validLayout(dbLayout)) {
                                    if (!storageLayout || storageLayout.name !== dbLayout.name || storageLayout.version < dbLayout.version) {
                                        finalLayout = dbLayout;
                                    }
                                    me.updateLayout(finalLayout, tableId);
                                }
                            }
                        }
                        grid.storeLayout(finalLayout);
                        grid.reload();
                        if (finalLayout && finalLayout.name === "default") {
                            me.gridLayout[tableId].currentLayout = null;
                        } else {
                            me.gridLayout[tableId].currentLayout = finalLayout;
                        }
                    });

                };


                //保存布局信息
                GridLayoutServicePro.updateLayout = function (layout, tableId) {
                    var me = this, dbLayout = angular.copy(layout);
                    if (!dbLayout || !dbLayout.content) return;
                    dbLayout.tableId = tableId;
                    dbLayout.content.version = dbLayout.content.version ? (dbLayout.content.version + 1) : new Date().getTime();
                    dbLayout.content = JSON.stringify(dbLayout.content);
                    dbLayout.pathname = getPathName();
                    me.$http.post(ctx + '/layout/persist', dbLayout);
                };

                //保存布局信息
                GridLayoutServicePro.saveLayout = function (tableId) {
                    var me = this, content, requestUrl,
                        pathname = getPathName(),
                        grid = me.gridLayout[tableId].grid,
                        layout = me.gridLayout[tableId].currentLayout;
                    if (!layout || !layout.name) {
                        return;
                    }
                    content = JSON.parse(grid.getLayout());
                    content.version = content.version ? (content.version + 1) : new Date().getTime();
                    layout.tableId = tableId;
                    layout.content = content;
                    grid.storeLocalStorageLayout(layout);
                    layout.content = JSON.stringify(content);
                    layout.pathname = pathname;
                    me.$http.post(ctx + '/layout/persist', layout).success(function (response) {
                        var layout = {}, version, content;
                        layout.name = response.name;
                        if (!_(response.content).isEmpty()) {
                            content = JSON.parse(response.content);
                            version = content.version;
                            delete content.version;
                            layout.version = version;
                            layout.content = content;
                            me.gridLayout[tableId].currentLayout = layout;
                        }
                        // 加载所有布局
                        me.loadLayouts(tableId, false);
                    });
                };

                //还原默认布局
                GridLayoutServicePro.resetLayout = function (tableId) {
                    var me = this,
                        defaultLayout = {};
                    defaultLayout.name = "default";
                    defaultLayout.content = {};
                    defaultLayout.tableId = tableId;
                    me.updateLayout(defaultLayout, tableId);
                    me.gridLayout[tableId].grid.storeLayout(defaultLayout);
                    me.gridLayout[tableId].grid.reload();
                    //不再使用布局
                    me.gridLayout[tableId].currentLayout = null;
                };

                //新增布局
                GridLayoutServicePro.createLayout = function (tableId, title, colSettings, callback) {
                    var promptHtml, /*promptDoc, */mainWindow, $mainBody, $dom,
                        me = this;

                    if(callback) me.renderLayoutCallback = callback;
                    me.showCreateConfirm = true;
                    me.newLayoutName = "";
                    promptHtml = '<div style="position: fixed; left: 50%; top:50%; margin-left: -196px;margin-top: -217px;" class="modal-dialog" ng-show="layoutService.showCreateConfirm">\n    <div class="modal-content">\n        <div class="modal-header">\n  <button class="btn btn-default" ng-click="layoutService.closeConfirm(&quot;' + tableId + '&quot;)"><i class="fi fi-close"></i></button>       <h4 class="modal-title">' + title + '</h4>\n        </div>\n        <div class="modal-body">\n            <p><span style="color: red;">*</span><span>' + ($config.i18nInfo.layoutNameLabel ? $config.i18nInfo.layoutNameLabel : '请输入布局名称：') + '</span><input g-trim="trim" g-dbc type="text" ng-model="layoutService.newLayoutName" class="form-text" style="width: 200px;"></p>\n        </div>\n        <div class="modal-footer">\n<button class="btn btn-default btn-fi" ng-click="layoutService.confirm(&quot;' + tableId + '&quot;,&quot;' + title + '&quot;)"><i class="fi fi-sumbit"></i>' + ($config.i18nInfo.layoutConfirm ? $config.i18nInfo.layoutConfirm : '确定') + '</button> <button class="btn btn-default btn-stroke"  ng-click="layoutService.closeConfirm(&quot;' + tableId + '&quot;)">' + ($config.i18nInfo.layoutCancel ? $config.i18nInfo.layoutCancel : '取消') + '</button>       </div>\n    </div>\n</div>';
                    // promptDoc = angular.element(promptHtml);
                    $dom = GillionLocationService.getTopCompile()(promptHtml)(me.gridLayout[tableId].__scope);
                    mainWindow = getMainWindow(window);
                    $mainBody = mainWindow.angular.element(mainWindow.document.body);
                    $mainBody.append($dom);
                    me.gridLayout[tableId].__scope.$dom = $dom;
                    this.GillionMsg.mask($dom);
                    var $input = $dom.find('.form-text');
                    if ($input[0]) {
                        $input[0].focus();
                    }
                    //if(me.gridLayout[tableId].grid && me.gridLayout[tableId].grid.gridType == "HotTable") me.gridLayout[tableId].grid.deselectCell();
                    if (colSettings) {
                        me.gridLayout[tableId].__colSettings = colSettings;
                    }
                };

                //删除布局
                GridLayoutServicePro.deleteLayout = function (tableId) {
                    var me = this,
                        pathname = getPathName(),
                        layout = me.gridLayout[tableId].currentLayout;
                    if (!layout) {
                        return;
                    }

                    var promptTitle = $config.i18nInfo.layoutPromptTitle ? $config.i18nInfo.layoutPromptTitle : '提示信息',
                        promptInfo = $config.i18nInfo.layoutDeletePrompt ? $config.i18nInfo.layoutDeletePrompt : '确定要删除吗',
                        promptMsg = $config.i18nInfo.layoutDeleteSuccess ? (layout.name + ' ' + $config.i18nInfo.layoutDeleteSuccess) : ("删除布局：" + layout.name + " 成功");
                    GillionMsg.confirm(promptTitle, promptInfo, function (flag) {
                        if (flag) {
                            var requestUrl = '/layout/delete/' + tableId + '/' + layout.name;
                            me.$http({
                                url: ctx + requestUrl,
                                method: "GET",
                                params: {pathname: pathname}
                            }).success(function () {
                                me.resetLayout(tableId);
                                me.loadLayouts(tableId);
                                GillionMsg.alert(promptTitle, promptMsg);
                            });
                        }
                    });
                };

                //关闭弹出框
                GridLayoutServicePro.closeConfirm = function (tableId) {
                    var me = this;
                    me.showCreateConfirm = false;
                    me.GillionMsg.unMask();
                    me.gridLayout[tableId].__scope.$dom.remove();
                    me.gridLayout[tableId].__scope.$dom = undefined;
                    if (me.gridLayout[tableId].__colSettings) {
                        me.gridLayout[tableId].__colSettings.cancel();
                        delete me.gridLayout[tableId].__colSettings;
                    }
                    delete me.gridLayout[tableId].__scope.$dom;
                };

                //确认按钮
                GridLayoutServicePro.confirm = function (tableId, title) {
                    var me = this, content, requestUrl,
                        pathname = getPathName(),
                        layout = {},
                        grid = me.gridLayout[tableId].grid;
                    me.showCreateConfirm = false;
                    me.GillionMsg.unMask();
                    if (me.gridLayout[tableId].__scope && me.gridLayout[tableId].__scope.$dom) {
                        me.gridLayout[tableId].__scope.$dom.remove();
                        me.gridLayout[tableId].__scope.$dom = undefined;
                        delete me.gridLayout[tableId].__scope.$dom;
                    }
                    var promptTitle = $config.i18nInfo.layoutPromptTitle ? $config.i18nInfo.layoutPromptTitle : '提示信息',
                        promptNameEmptyInfo = $config.i18nInfo.layoutNameEmpty ? $config.i18nInfo.layoutNameEmpty : '请输入布局名称!',
                        promptNameLengthInfo = $config.i18nInfo.layoutNameEmpty ? $config.i18nInfo.layoutNameEmpty : '布局名称超过66个汉字!';

                    if (!me.newLayoutName || me.newLayoutName === "") {
                        me.GillionMsg.alert(promptTitle, promptNameEmptyInfo, function () {
                            me.createLayout(tableId, title);
                        });
                        return;
                    } else if (getStrLength(me.newLayoutName) > 66 * 2) {
                        me.GillionMsg.alert(promptTitle, promptNameLengthInfo, function () {
                            me.createLayout(tableId, title);
                        });
                        return;
                    }
                    if (me.gridLayout[tableId].__colSettings) {
                        me.gridLayout[tableId].__colSettings.enter();
                        delete me.gridLayout[tableId].__colSettings;
                    }
                    content = JSON.parse(grid.getLayout());
                    content.version = new Date().getTime();
                    layout.content = content;
                    layout.name = me.newLayoutName;
                    layout.tableId = tableId;
                    me.newLayoutName = "";
                    grid.storeLocalStorageLayout(layout);
                    layout.content = JSON.stringify(content);
                    layout.pathname = pathname;
                    me.$http.post(ctx + '/layout/persist', layout).success(function (response) {
                        var version, content,
                            layout = {};
                        if (response && response.name) {
                            layout.name = response.name;
                            if (!_(response.content).isEmpty()) {
                                content = JSON.parse(response.content);
                                version = content.version;
                                delete content.version;
                                layout.version = version;
                                layout.content = content;
                                me.gridLayout[tableId].currentLayout = layout;
                            }
                        }
                        // 加载所有布局
                        me.loadLayouts(tableId);
                        if(me.renderLayoutCallback) me.renderLayoutCallback();
                    });

                    function getStrLength(str) {
                        var cArr = str.match(/[^\x00-\xff]/ig);
                        return str.length + (cArr == null ? 0 : cArr.length);
                    }
                };
                // 列宽自适应
                GridLayoutServicePro.autoWidthColumns = function (tableId) {
                    var me = this;
                    me.gridLayout[tableId].grid.autoWidthColumns();
                };

                /** 清除过滤条件(新表格) */
                GridLayoutServicePro.clearFilters = function (tableId) {
                    var me = this;
                    me.gridLayout[tableId].grid.clearFilters();
                };

                gridLayoutService = void 0;
                if (angular.isUndefined(gridLayoutService)) {
                    gridLayoutService = new DataGridLayoutService($http, $compile, GillionMsg);
                }
                return gridLayoutService;
            });
    });
})(window, window.JSON);

