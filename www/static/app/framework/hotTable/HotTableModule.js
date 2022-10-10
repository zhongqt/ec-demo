define('framework/hotTable/HotTableModule', [
    'angular',
    'jquery',
    'underscore',
    'Handsontable',
    'config.properties',
    'artTmpl',
    'ngContextMenu',
    'framework/datasource/DataSourceModule',
    'framework/colSettings/ColSettingsModule',
    'framework/gridlayout/GridLayoutModule',
    'framework/colGroupSettings/ColGroupSettingsModule',
    'framework/groupDataSource/GroupDataSourceModule',
    'css!framework/hotTable/hotTableStyle.css'
], function (angular, $, _, Handsontable, config, artTmpl) {

    window.Handsontable = Handsontable;
    if (!Handsontable.Dom && Handsontable.dom) {
        Handsontable.Dom = Handsontable.dom;
    }

    var SUMMARY_TYPE = ['sum', 'min', 'max', 'count', 'average'];

    return angular.module('HotTableModule', ['DataSourceModule', 'ColSettingsModule', 'GridLayoutModule', 'ng-context-menu', 'GroupDataSourceModule', 'ColGroupSettingsModule'])
        .directive('gHotTable', function ($dataSourceManager, $parse, $filter, $q, $compile, $timeout, ColSettings, gridLayoutService, LocalStorages, ColGroupSettings, GroupDataSources, ValidationHolder, AssociatePromiseService, Arrays, GillionMsg, ContextMenuService, $http) {

            var ORDER = {
                ASC: 'asc',
                DESC: 'desc'
            };

            /** 自定义编辑 */
            var ColumnEditor = Handsontable.editors.BaseEditor.prototype.extend();
            /** 初始化编辑器 */
            ColumnEditor.prototype.init = function () {
                var me = this;
                me.editorType = 'ColumnEditor';
                me.$editorWrap = $('<div class="hot-column-editor" style="display: none;"></div>');
                me.cellProperties = {};
                me.$rootElement = $(me.instance.rootElement);
                me.gridScope = me.$rootElement.data("__SCOPE") || me.$rootElement.scope();
                me.hotTable = me.grid = me.gridScope.grid;
                me.$rootElement.append(me.$editorWrap);
                me.grid.columnEditor = me;
                me._refreshDimensions = me.refreshDimensions.bind(me);
                me._onBeforeKeyDown = me.onBeforeKeyDown.bind(me);
                me.wraperStyle = {};
                if (me.grid.__oldEditors && me.grid.__oldEditors.length) {
                    _.forEach(me.grid.__oldEditors, function (oldEditor) {
                        oldEditor._finishEditing();
                        $timeout(function () {
                            oldEditor.$editorWrap.remove();
                            for (var k in oldEditor) {
                                if (oldEditor.hasOwnProperty(k)) {
                                    delete oldEditor[k];
                                }
                            }
                        });
                    });
                    me.grid.__oldEditors = [];
                }
                me.grid.__oldEditors = me.grid.__oldEditors || [];
                me.grid.__oldEditors.push(me);
                me.$editorWrap.on('click', function (event) {
                    event.stopPropagation();
                });
            };
            /** 编辑器进入焦点 */
            ColumnEditor.prototype.focus = function () {
                var $input = this.$editorWrap.find(':input');
                if ($input.length) {
                    $timeout(function () {
                        if (window.document.documentMode === 11) {
                            var range = $input[0].createTextRange();
                            range.moveStart('character', $input.val().length);
                            range.collapse(true);
                            range.select();
                        } else {
                            $input[0].focus();
                        }
                    });
                }
            };
            /**
             * 编辑器离开焦点
             * @returns {Promise}
             */
            ColumnEditor.prototype.blur = function () {
                var $input = this.$editorWrap.find(':input');
                var deferred = $q.defer();
                if ($input.length /*&& $input.hasClass('form-suggestbox')*/) {
                    $input.blur();
                    deferred.resolve();
                } else {
                    deferred.resolve();
                }
                return deferred.promise;
            };
            /** 获取编辑器值，结束编辑时自动调用 */
            ColumnEditor.prototype.getValue = function () {
                var prop = this.prop;
                var record = this.scope.record;
                var value = record[prop];
                return value;
            };
            /** setValue 接口占位 */
            ColumnEditor.prototype.setValue = function () {
            };
            /** prepare 接口占位 */
            ColumnEditor.prototype.prepare = function () {
            };
            /**
             * 编辑器预设，选中单元格时调用
             * @param {number} row - 行号
             * @param {number} col - 列号
             */
            ColumnEditor.prototype._prepare = function (row, col) {
                var prop = this.instance.colToProp(col);
                var td = this.instance.getCell(row, col);
                var physicalRow = this.instance.toPhysicalRow(row);
                var record = this.grid.getPhysicalRecord(physicalRow);
                var originalValue = record[prop];
                var cellProperties = this.instance.getCellMeta(row, col);
                var args = [row, col, prop, td, originalValue, cellProperties];
                Handsontable.editors.BaseEditor.prototype.prepare.apply(this, args);
                this.column = this.grid._getColumnByField(this.prop);
            };
            /** 打开编辑器 */
            ColumnEditor.prototype.open = function () {
                this.refreshDimensions();
                this.destroyScope();
                this.scope = this.getNewerEditingScope();
                var column = this.column;
                var $editor = angular.element(column.columnEditorTmpl);
                _.each($editor, function (editorEl) {
                    var $editorEl = angular.element(editorEl);
                    if ($editorEl.attr("ng-model")) {
                        var modelExpression = $editorEl.attr("ng-model");
                        if (!/^editingRecord\./.test(modelExpression)) {
                            if (/^row\./.test(modelExpression)) {
                                $editorEl.attr('ng-model', modelExpression.replace(/^row\./, "editingRecord."));
                            } else {
                                $editorEl.attr('ng-model', ("editingRecord." + modelExpression));
                            }
                        }
                    }
                });
                var recordInfo = this.grid._getPhysicalRecordInfo(this.scope.record);
                this.originalRecord = recordInfo.originalRecord || angular.copy(this.scope.record);
                /*var originNgModel = $editor.attr('ng-model');
                if (originNgModel) {
                    if (!/^editingRecord\./.test(originNgModel)) {
                        if (/^row\./.test(originNgModel)) {
                            $editor.attr('ng-model', originNgModel.replace(/^row\./, "editingRecord."));
                        } else {
                            $editor.attr('ng-model', ("editingRecord." + originNgModel));
                        }
                    }
                } else {
                    $editor.attr('ng-model', ('editingRecord.' + column.data));
                }
                if (!$editor.attr('name')) {
                    $editor.attr('name', column.data);
                }*/
                this.$editorWrap.empty().append($editor);
                $compile($editor)(this.scope);
                this.$editorWrap.show();
                this.registerHooks();
            };
            /** finishEditing 接口占位 */
            ColumnEditor.prototype.finishEditing = function () {
            };
            /** 结束编辑 */
            ColumnEditor.prototype._finishEditing = function () {
                Handsontable.editors.BaseEditor.prototype.finishEditing.apply(this, arguments);
            };
            /** beginEditing 接口占位 */
            ColumnEditor.prototype.beginEditing = function () {
            };
            /**
             * 开始编辑
             * @param {number} row - 行号
             * @param {col} col - 列号
             */
            ColumnEditor.prototype._beginEditing = function (row, col) {
                var me = this;
                this._prepare(row, col);
                if (!this.column || !this.column.columnEditorTmpl) {
                    if (this.column && this.column.tmpl && this.column.tmpl.indexOf('type="checkbox"') > 0) {
                        var checkbox = this.TD.querySelector('[type="checkbox"]');
                        $(checkbox).on("keyup", function (event) {
                            me._onBeforeKeyDown(event);
                        });
                        checkbox.focus();
                    }
                    return;
                }
                Handsontable.editors.BaseEditor.prototype.beginEditing.apply(this, [this.originalValue, {}]);
            };
            /** 结束编辑 */
            ColumnEditor.prototype.close = function () {
                this.grid._setModifiedRecordInfo(this.scope.record, this.originalRecord, this.prop);
                this.destroyScope();
                this.unregisterHooks();
                this.$editorWrap.empty().hide();
            };
            /** 获取编辑单元格 DOM */
            ColumnEditor.prototype.getEditedCell = function () {
                var editorSection = this.checkEditorSection(),
                    editedCell;
                switch (editorSection) {
                    case 'top':
                        editedCell = this.instance.view.wt.wtOverlays.topOverlay.clone.wtTable.getCell({
                            row: this.row,
                            col: this.col
                        });
                        this.wraperStyle.zIndex = 101;
                        break;
                    case 'top-left-corner':
                        editedCell = this.instance.view.wt.wtOverlays.topLeftCornerOverlay.clone.wtTable.getCell({
                            row: this.row,
                            col: this.col
                        });
                        this.wraperStyle.zIndex = 103;
                        break;
                    case 'bottom-left-corner':
                        editedCell = this.instance.view.wt.wtOverlays.bottomLeftCornerOverlay.clone.wtTable.getCell({
                            row: this.row,
                            col: this.col
                        });
                        this.wraperStyle.zIndex = 103;
                        break;
                    case 'left':
                        editedCell = this.instance.view.wt.wtOverlays.leftOverlay.clone.wtTable.getCell({
                            row: this.row,
                            col: this.col
                        });
                        this.wraperStyle.zIndex = 102;
                        break;
                    case 'bottom':
                        editedCell = this.instance.view.wt.wtOverlays.bottomOverlay.clone.wtTable.getCell({
                            row: this.row,
                            col: this.col
                        });
                        this.wraperStyle.zIndex = 102;
                        break;
                    default:
                        editedCell = this.instance.getCell(this.row, this.col);
                        this.wraperStyle.zIndex = '';
                        break;
                }
                return editedCell != -1 && editedCell != -2 ? editedCell : void 0;
            };
            /** 刷新编辑器尺寸、位置 */
            ColumnEditor.prototype.refreshDimensions = function () {
                this.TD = this.getEditedCell();
                if (!this.TD) {
                    this.$editorWrap.css({top: '-9999px'});
                    return;
                }
                var currentOffset = Handsontable.Dom.offset(this.TD),
                    containerOffset = Handsontable.Dom.offset(this.instance.rootElement),
                    scrollableContainer = Handsontable.Dom.getScrollableElement(this.TD),
                    totalRowsCount = this.instance.countRows(),
                    editTopModifier = currentOffset.top === containerOffset.top ? 0 : 1,
                    editTop = currentOffset.top - containerOffset.top - editTopModifier - (scrollableContainer.scrollTop || 0),
                    editLeft = currentOffset.left - containerOffset.left - 1 - (scrollableContainer.scrollLeft || 0),
                    settings = this.instance.getSettings(),
                    colHeadersCount = this.instance.hasColHeaders(),
                    editorSection = this.checkEditorSection(),
                    width = Handsontable.Dom.outerWidth(this.TD),
                    height = Handsontable.Dom.outerHeight(this.TD),
                    cssTransformOffset;
                switch (editorSection) {
                    case 'top':
                        cssTransformOffset = Handsontable.Dom.getCssTransform(this.instance.view.wt.wtOverlays.topOverlay.clone.wtTable.holder.parentNode);
                        break;
                    case 'left':
                        cssTransformOffset = Handsontable.Dom.getCssTransform(this.instance.view.wt.wtOverlays.leftOverlay.clone.wtTable.holder.parentNode);
                        break;
                    case 'top-left-corner':
                        cssTransformOffset = Handsontable.Dom.getCssTransform(this.instance.view.wt.wtOverlays.topLeftCornerOverlay.clone.wtTable.holder.parentNode);
                        break;
                    case 'bottom-left-corner':
                        cssTransformOffset = Handsontable.Dom.getCssTransform(this.instance.view.wt.wtOverlays.bottomLeftCornerOverlay.clone.wtTable.holder.parentNode);
                        break;
                    case 'bottom':
                        cssTransformOffset = Handsontable.Dom.getCssTransform(this.instance.view.wt.wtOverlays.bottomOverlay.clone.wtTable.holder.parentNode);
                        break;
                }
                if (colHeadersCount && this.instance.getSelected() && this.instance.getSelected()[0] === 0 || (settings.fixedRowsBottom && this.instance.getSelected()[0] === totalRowsCount - settings.fixedRowsBottom)) {
                    editTop += 1;
                }
                if (this.instance.getSelected() && this.instance.getSelected()[1] === 0) {
                    editLeft += 1;
                }
                if (cssTransformOffset && cssTransformOffset != -1) {
                    this.textareaParentStyle[cssTransformOffset[0]] = cssTransformOffset[1];
                } else {
                    Handsontable.Dom.resetCssTransform(this.$editorWrap[0]);
                }
                this.wraperStyle.width = width + 1 + 'px';
                this.wraperStyle.height = height + 1 + 'px';
                this.wraperStyle.top = editTop + 'px';
                this.wraperStyle.left = editLeft + 'px';
                this.$editorWrap.css(this.wraperStyle);
            };
            /**
             * 获取表格滚动区域元素
             * @returns {jQuery}
             */
            ColumnEditor.prototype.getScrollableElement = function () {
                if (!this.scrollableElement) {
                    this.scrollableElement = $(this.TD).closest('.hot-table').children('.ht_master').children('.wtHolder');
                }
                return this.scrollableElement;
            };
            /** 编辑状态按键事件阻止 */
            ColumnEditor.prototype.onBeforeKeyDown = function (event) {
                var $target = $(event.target);
                var closestEditor = $target.closest(this.$editorWrap);
                if (!closestEditor.length && $target[0].type != "checkbox") {
                    return;
                }
                switch (event.keyCode) {
                    case 9:
                        if (event.shiftKey) {
                            this.grid.startEditPrevCell();
                        } else {
                            this.grid.startEditNextCell();
                        }
                        event.preventDefault();
                        break;
                    case 13:
                        event.preventDefault();
                        break;
                    case 38:
                        this.grid.startEditPrevRow();
                        break;
                    case 40:
                        this.grid.startEditNextRow();
                        break;
                    default:
                        break;
                }
                event.stopImmediatePropagation();
            };
            /** 事件监听 */
            ColumnEditor.prototype.registerHooks = function () {
                var me = this;
                me.instance.addHook('afterScrollHorizontally', me._refreshDimensions);
                me.instance.addHook('afterScrollVertically', me._refreshDimensions);
                me.instance.addHook('afterColumnResize', me._refreshDimensions);
                me.instance.addHook('afterRowResize', me._refreshDimensions);
                me.instance.addHook('beforeKeyDown', me._onBeforeKeyDown);
                $(document).on('keydown.editor.' + me.grid.hash, function (event) {
                    me._onBeforeKeyDown(event);
                });
            };
            /** 解除事件监听 */
            ColumnEditor.prototype.unregisterHooks = function () {
                var me = this;
                me.instance.removeHook('afterScrollHorizontally', me._refreshDimensions);
                me.instance.removeHook('afterScrollVertically', me._refreshDimensions);
                me.instance.removeHook('afterColumnResize', me._refreshDimensions);
                me.instance.removeHook('afterRowResize', me._refreshDimensions);
                me.instance.removeHook('beforeKeyDown', me._onBeforeKeyDown);
                $(document).off('keydown.editor.' + me.grid.hash);
                // me.instance.removeHook('beforeOnCellMouseDown', me._onBeforeKeyDown);
            };
            /** 获取编辑器 scope
             * @returns {Object}
             */
            ColumnEditor.prototype.getNewerEditingScope = function () {
                var outerScope = this.gridScope.$parent;
                var newerScope = outerScope.$new(false);
                var sourceIndex = this.instance.toPhysicalRow(this.row);
                var source = this.gridScope.source;
                var record = this.grid.getPhysicalRecord(sourceIndex);
                newerScope.row = record;
                newerScope.record = record;
                newerScope.rowIndex = sourceIndex;
                newerScope.grid = this.grid;
                newerScope.source = source;
                newerScope.editingRecord = record;

                return newerScope;
            };
            /** 销毁 scope */
            ColumnEditor.prototype.destroyScope = function () {
                if (this.scope) {
                    this.scope.$broadcast('$destroy');
                    this.scope.$destroy();
                    this.scope = null;
                }
            };
            /** 销毁 */
            ColumnEditor.prototype.$destroy = function () {
                this.destroyScope();
                this.unregisterHooks();
                if (this.grid && this.grid.columnEditor) {
                    delete this.grid.columnEditor;
                }
                this.$editorWrap.off().remove();
                for (var key in this) {
                    delete this[key];
                }
            };

            /* 自定义编辑 End */
            function HotTable(scope, element, attrs) {
                this.scope = scope;
                this.element = element;
                this.attrs = attrs;
                this.layoutSetting = {};
                this.gridType = 'HotTable';
                this.hash = scope.$id;
                this.editingInfo = null;
                this._dataReady = false;
                this._firstReload = true;
                this.element.addClass('grid-' + this.hash);
            }

            HotTable.prototype.getActiveEditorScope = function () {
                if (!this.columnEditor) return false;
                if (!this.columnEditor.scope) return false;
                return this.columnEditor.scope;
            };

            /**
             * 取消选择单元格
             */
            HotTable.prototype.deselectCell = function () {
                this.handsontable.deselectCell();
            };

            /**
             * 获取勾选行数据集合
             * @returns {Object[]}
             */
            HotTable.prototype.getCheckedRows = function () {
                var me = this;
                var physicalSourceInfo = me.scope.physicalSourceInfo;
                var result = [];
                _.each(physicalSourceInfo, function (info, i) {
                    if (!me._isSummaryRow(info.record) && info.record.$$checked) result.push(info.record);
                });
                return result;
            };

            /**
             * 获取勾选行的数据索引
             */
            HotTable.prototype.getCheckedIndex = function () {
                var me = this;
                var physicalSourceInfo = me.scope.physicalSourceInfo;
                var result = [];
                _.each(physicalSourceInfo, function (info, i) {
                    if (!me._isSummaryRow(info.record) && info.record.$$checked) result.push(i);
                });
                return result;
            };

            /**
             * 根据索引设置勾选
             * @param checkedIndexs
             */
            HotTable.prototype.setCheckedRows = function (checkedIndexs) {
                var me = this;
                var physicalSourceInfo = me.scope.physicalSourceInfo;
                if (_.isNumber(checkedIndexs)) {
                    if (physicalSourceInfo[checkedIndexs]) physicalSourceInfo[checkedIndexs].record.$$checked = true;
                } else if (_.isArray(checkedIndexs)) {
                    _.each(checkedIndexs, function (checkedIndex) {
                        if (physicalSourceInfo[checkedIndex]) physicalSourceInfo[checkedIndex].record.$$checked = true;
                    })
                }
                me._updateCheckedRows();
                me.render();
            };

            /**
             * 获取勾选的叶子节点数据集合
             * @returns {Object[]}
             */
            HotTable.prototype.getCheckedLeafRows = function () {
                var me = this;
                var scope = me.scope;
                var checkedRows = scope.checkedRows;
                var checkedLeafRows = _.filter(checkedRows, function (record) {
                    return me._isLeaf(record);
                });
                return checkedLeafRows;
            };

            /**
             * 获取勾选的分组数据集合
             * @returns {Object[]}
             */
            HotTable.prototype.getCheckedGroupRows = function () {
                var me = this;
                var scope = me.scope;
                var checkedRows = scope.checkedRows;
                var checkedLeafRows = _.filter(checkedRows, function (record) {
                    return me.isGroupRecord(record);
                });
                return checkedLeafRows;
            };

            /**
             * 获取选中行数据
             * @returns {Object}
             */
            HotTable.prototype.getSelectedRow = function () {
                var me = this;
                var handsontable = me.handsontable;
                var selected = handsontable.getSelected();
                var physicalRow;
                var selectedRow;
                if (selected) {
                    physicalRow = handsontable.toPhysicalRow(selected[0]);
                    selectedRow = me.getPhysicalRecord(physicalRow);
                }
                return selectedRow;
            };

            /**
             * 获取选择列索引
             * @returns {boolean}
             */
            HotTable.prototype.getSelectedColumnIndex = function () {
                var me = this;
                var handsontable = me.handsontable;
                var selected = handsontable.getSelected();
                return selected ? selected[1] : false;
            };

            /**
             * 获取当前选择行索引
             * @returns {*|Number}
             */
            HotTable.prototype.getSelectedIndex = function () {
                var me = this;
                var handsontable = me.handsontable;
                var selected = handsontable.getSelected();
                return selected ? handsontable.toPhysicalRow(selected[0]) : -1;
            };

            HotTable.prototype.getColumnDropFilters = function () {
                var me = this;
                var filters = me._cachedFilters;
                var outPut = {};
                _.forEach(filters, function (filter) {
                    outPut[filter.field] = filter.formula[0].args[0];
                });
                return outPut;
            };

            /** 获取 layout */
            HotTable.prototype.getLayout = function () {
                var me = this, layout,
                    handsontable = me.handsontable,
                    colSettings = me.layoutSetting,
                    plugin = me.handsontable.getPlugin('manualColumnResize'),
                    manualColumnWidths = plugin.manualColumnWidths,
                    colOffset = 0;
                if (me.scope.hasCheckboxColumn) {
                    colOffset++;
                }
                layout = _(colSettings).map(function (colSetting, index) {
                    var group, width, col;
                    col = me._getColumnByField(colSetting.field);
                    width = manualColumnWidths[index + colOffset] || handsontable.getColWidth(index + colOffset) || col.width;
                    group = colSetting.group || col.group;
                    return {
                        field: colSetting.field,
                        width: width,
                        group: group
                    };
                });
                return JSON.stringify({
                    layout: layout,
                    sortName: me.sortName,
                    sortDirection: me.sortDirection,
                    fixedColumns: me.scope.fixedColumns
                });
            };

            /** 本地保存布局数据到 */
            HotTable.prototype.storeLayout = function (layout) {
                var me = this, layoutSetting, content;
                if (layout && !_(layout.content).isEmpty()) {
                    me.storeLocalStorageLayout(layout);
                    layoutSetting = layout.content;
                    me.layoutSetting = layoutSetting.layout;
                    me.sortName = layoutSetting.sortName;
                    me.sortDirection = layoutSetting.sortDirection;
                    me.scope.fixedColumns = layoutSetting.fixedColumns;
                } else {
                    // 默认布局
                    content = _.chain(me.__originalCols)
                        .filter(function (col) {
                            return col.data !== '$$checked';
                        })
                        .map(function (col) {
                            return {field: col.data};
                        })
                        .value();
                    me.layoutSetting = content;
                    me.sortName = [];
                    me.sortDirection = [];
                    me.scope.fixedColumns = 0;
                }
                if (!me.scope.frontEndSort) {
                    if (me.scope.dataSource) {
                        me.scope.dataSource.sortName = me.sortName;
                        me.scope.dataSource.sortDirection = me.sortDirection;
                    } else {
                        $dataSourceManager.getDataSource(me.scope.sourceName).then(function (result) {
                            me.scope.dataSource = result;
                            me.scope.dataSource.sortName = me.sortName;
                            me.scope.dataSource.sortDirection = me.sortDirection;
                        });
                    }
                }
                // me._syncColumnsAndLayoutSetting();
            };

            /** 验证布局 */
            HotTable.prototype.validLayout = function (data) {
                var laytout, i, len;
                if (!angular.isObject(data)) return false;
                if (!angular.isObject(data.content)) return false;
                laytout = data.content.layout;
                if (!angular.isArray(laytout)) return false;
                for (i = 0, len = laytout.length; i < len; i++) {
                    if (!angular.isObject(laytout[i])) return false;
                    if (typeof laytout[i]['field'] != 'string') return false;
                    if (!laytout[i]['width']) return false;
                }
                return true;
            };

            HotTable.prototype._getVisibleColumns = function (columns) {
                var me = this;
                if (!columns) columns = me.columns;
                if (_.isEmpty(me.$transformColumns)) return columns;
                var resultColumns = [];
                _.each(columns, function (column) {
                    var tmp = _.filter(me.$transformColumns, function (transformColumn) {
                        return transformColumn.field === column.field;
                    });

                    if (!_.isEmpty(tmp)) {
                        if (tmp[0].title) {
                            column._title = tmp[0].title;
                            column.text = tmp[0].title;
                        }
                        if (tmp[0].show === false) {
                            //column.hidden = true;
                        } else {
                            resultColumns.push(column);
                        }
                    } else {
                        resultColumns.push(column);
                    }
                });
                me.columns = resultColumns;
                return resultColumns;
            };

            HotTable.prototype.transformColumns = function (columns) {
                if (_.isEmpty(columns) || !_.isArray(columns)) {
                    this.$transformColumns = [];
                } else {
                    this.$transformColumns = _.clone(columns);
                }
                this._loadAndReSortHeadersIfStored();
                this.handsontable.updateSettings({
                    columns: this._getVisibleColumns(),
                    fixedColumnsLeft: this._toSettingsFixedColumns(this.scope.fixedColumns)
                });
            };

            /**
             * 导出 csv
             * @param {string} [filename] - 文件名
             */
            HotTable.prototype.exportFile = function (filename) {
                var me = this;
                var plugin = me.handsontable.getPlugin('exportFile');
                plugin.downloadFile('csv', {filename: filename || 'file'});
            };

            /**
             * 设置表格尺寸
             * @param {number} width
             * @param {number} [height]
             */
            HotTable.prototype.resizeTo = function (width, height) {
                var sizeObj = {};
                if (width) {
                    sizeObj.width = width;
                }
                if (height) {
                    sizeObj.height = height;
                }
                this.handsontable.updateSettings(sizeObj);
                if (this.scope.showFilters) {
                    this.handsontable.getPlugin('filters').filter();
                }
            };

            /** 列宽自适应 */
            HotTable.prototype.autoWidthColumns = function () {
                var me = this,
                    columns = me.columns,
                    plugin = me.handsontable.getPlugin('manualColumnResize'),
                    columnWidths = [],
                    chineseRe = /[\u4E00-\u9FA5]/g,
                    charRe = /[A-Za-z0-9]/g;

                if (me.scope.source && me.scope.source.length == 0) {
                    _(columns).forEach(function (column, index) {
                        if (column.text) {
                            var chineseNumber = column.text.match(chineseRe) == null ? 0 : column.text.match(chineseRe).length;
                            var charNumber = column.text.match(charRe) == null ? 0 : column.text.match(charRe).length;
                            var titleWidth = chineseNumber * 13 + charNumber * 9 + (column.text.length - chineseNumber - charNumber) * 3;
                            if (column._sortable) titleWidth += 24;
                            if (me.scope.showFilters) titleWidth += 21;
                            if (me.scope.colSettingsKey && index == 1) titleWidth += 18;
                            if (column._title && column._title.indexOf("*") > 0) titleWidth += 4;
                            columnWidths[index] = titleWidth + 10;
                        } else if (column.field == "$$checked") {
                            if (me.scope.treeView) {
                                columnWidths[index] = 65;
                            } else {
                                columnWidths[index] = 40;
                            }
                        }
                    });
                }
                plugin.manualColumnWidths = columnWidths;
                me.finishEdit("cell", true);
                this.handsontable.updateSettings({autoColumnSize: true, colWidths: undefined});
                me._clearValidateInfo();
                this._autoWidth();
            };

            /**
             * 开始编辑单元格
             * @param {number} row - 行号
             * @param {number | string} [col] - 列号/字段名，默认为第一个可编辑列
             */
            HotTable.prototype.startEdit = function (physicalRow, col) {
                var me = this;
                var scope = me.scope;
                var handsontable = me.handsontable;
                var row = handsontable.toVisualRow(physicalRow);
                var field, column, validateType;
                var preEditingInfo = me.editingInfo;
                var deferred = $q.defer();
                if ((!row && row !== 0) || row < 0 || physicalRow >= scope.physicalSourceInfo.length) {
                    return;
                }
                if (!col) {
                    column = me.getFirstEditableColumn();
                    col = column.field;
                }
                if (!angular.isNumber(col)) {
                    field = col;
                    col = handsontable.propToCol(field);
                } else {
                    field = handsontable.colToProp(col);
                }
                var nextEditingInfo = {
                    physicalRow: physicalRow,
                    field: field
                };
                if (scope.validatorName && preEditingInfo && scope.validateOnChangeEditingRow && preEditingInfo.physicalRow !== physicalRow) {
                    validateType = 'row';
                } else if (scope.validatorName && preEditingInfo && scope.validateOnChangeEditingCell && (preEditingInfo.physicalRow !== physicalRow || preEditingInfo.field !== field)) {
                    validateType = 'cell';
                }
                me.finishEdit(validateType)
                    .then(function () {
                        if (me.hasGroup() && me.scope.physicalSourceInfo && me.scope.physicalSourceInfo[physicalRow] && me.scope.physicalSourceInfo[physicalRow].isGroup) {
                            deferred.reject();
                            return;
                        }
                        handsontable.selectCell(row, col);
                        // if (!me.columnEditor) {
                        //     var selectedCell = handsontable.getSelected();
                        //     if (selectedCell && selectedCell.length) {
                        //         handsontable.selectCell(selectedCell[0], selectedCell[1]);
                        //     } else {
                        //         handsontable.deselectCell();
                        //     }
                        // }
                        if (me.columnEditor) {
                            $timeout(function () {
                                me.columnEditor._beginEditing(row, col);
                                me.editingInfo = nextEditingInfo;
                                deferred.resolve();
                            }, 100);
                        } else {
                            deferred.reject();
                        }
                    });
                return deferred.promise;
            };

            /** 编辑下一个可编辑的单元格 */
            HotTable.prototype.startEditNextCell = function () {
                var me = this;
                var editingInfo = me.editingInfo;
                var columns = me.columns;
                var handsontable = me.handsontable;
                var after, nextColumn, currentVisualRow, nextVisualRow, nextPhysicalRow;
                if (!editingInfo) {
                    return;
                }
                nextColumn = _.find(columns, function (column) {
                    if (column.field === editingInfo.field) {
                        after = true;
                        return;
                    }
                    if (after && (column.columnEditorTmpl || (column.tmpl && column.tmpl.indexOf('type="checkbox"') > 0))) {
                        return true;
                    }
                });
                if (!nextColumn || nextColumn.hidden) {
                    if (me.scope.editorTabInOneRow) {
                        me.startEdit(editingInfo.physicalRow);
                    } else {
                        currentVisualRow = handsontable.toVisualRow(editingInfo.physicalRow);
                        nextVisualRow = currentVisualRow + 1;
                        nextPhysicalRow = handsontable.toPhysicalRow(nextVisualRow);
                        me.startEdit(nextPhysicalRow);
                    }
                } else {
                    me.startEdit(editingInfo.physicalRow, nextColumn.field);
                }
            };

            /** 编辑上一个可编辑的单元格 */
            HotTable.prototype.startEditPrevCell = function () {
                var me = this;
                var editingInfo = me.editingInfo;
                var columns = me.columns;
                var columnsCount = columns.length;
                var handsontable = me.handsontable;
                var before, prevColumn, currentVisualRow, prevVisualRow, prevPhysicalRow;
                if (!editingInfo) {
                    return;
                }
                for (var i = columnsCount - 1; i >= 0; i--) {
                    var column = columns[i];
                    if (column.field === editingInfo.field) {
                        before = true;
                        continue;
                    }
                    if (before && column.columnEditorTmpl) {
                        prevColumn = column;
                        break;
                    }

                }
                if (!prevColumn || prevColumn.hidden) {
                    if (me.scope.editorTabInOneRow) {
                        me.startEdit(editingInfo.physicalRow);
                    } else {
                        currentVisualRow = handsontable.toVisualRow(editingInfo.physicalRow);
                        prevVisualRow = currentVisualRow - 1;
                        prevPhysicalRow = handsontable.toPhysicalRow(prevVisualRow);
                        me.startEdit(prevPhysicalRow);
                    }
                } else {
                    me.startEdit(editingInfo.physicalRow, prevColumn.field);
                }
            };

            /** 编辑下一行 */
            HotTable.prototype.startEditNextRow = function () {
                var me = this;
                var editingInfo = me.editingInfo;
                var handsontable = me.handsontable;
                var currentVisualRow, nextVisualRow, nextPhysicalRow;
                if (!editingInfo) {
                    return;
                }
                currentVisualRow = handsontable.toVisualRow(editingInfo.physicalRow);
                nextVisualRow = currentVisualRow + 1;
                nextPhysicalRow = handsontable.toPhysicalRow(nextVisualRow);
                me.startEdit(nextPhysicalRow, editingInfo.field);
            };

            /** 编辑上一行 */
            HotTable.prototype.startEditPrevRow = function () {
                var me = this;
                var editingInfo = me.editingInfo;
                var handsontable = me.handsontable;
                var currentVisualRow, prevVisualRow, prevPhysicalRow;
                if (!editingInfo) {
                    return;
                }
                currentVisualRow = handsontable.toVisualRow(editingInfo.physicalRow);
                prevVisualRow = currentVisualRow - 1;
                prevPhysicalRow = handsontable.toPhysicalRow(prevVisualRow);
                me.startEdit(prevPhysicalRow, editingInfo.field);
            };

            /**
             * 结束编辑状态
             * @param {'row' | 'cell'} [validateType] - 校验方式(行校验、单元格校验)
             * @param {true | false | undefined} 强制刷新，为false时不刷新，其余强制刷新
             * @returns {Promise}
             */
            HotTable.prototype.finishEdit = function (validateType, forceRender) {
                var me = this;
                var deferred = $q.defer();
                var validatePromise;
                var validateDeferred = $q.defer();
                forceRender = forceRender === false ? false : true;
                if (me.scope.validatorName && validateType === 'row' && me.editingInfo) {
                    validatePromise = me.validateRow(me.editingInfo.physicalRow, forceRender).finally();
                } else if (me.scope.validatorName && validateType === 'cell' && me.editingInfo && me.editingInfo.field != -1) {
                    validatePromise = me.validateCell(me.editingInfo.physicalRow, me.editingInfo.field, forceRender).finally();
                } else {
                    validatePromise = validateDeferred.promise.finally();
                    validateDeferred.resolve();
                }
                validatePromise
                    .finally(function () {
                        if (me.columnEditor) {
                            me.columnEditor.blur()
                                .then(function () {
                                    AssociatePromiseService.callback(function () {
                                        me.columnEditor._finishEditing();
                                        me.editingInfo = null;
                                        //当有合计列的时候，handsontable会调用数字校验器，后面执行如马上启用编辑，会导致值错位
                                        if (me.scope.hasSummary) {
                                            $timeout(function () {
                                                deferred.resolve();
                                            }, 100);
                                        } else {
                                            deferred.resolve();
                                        }
                                    });
                                })
                                .catch(function () {

                                });
                            // if (me.editingInfo) {
                            //     me.validateCell(me.editingInfo.physicalRow, me.editingInfo.field);
                            // }
                        } else {
                            me.editingInfo = null;
                            deferred.resolve();
                        }
                    });
                return deferred.promise;
            };

            /** 展开全部节点（树形表格、分组表格）  */
            HotTable.prototype.expandAll = function () {
                var me = this;
                var scope = me.scope;
                var plugin, collapsingUI;
                if (scope.group) {
                    if (!me._dataReady || me._hasUnFetchedChildren()) {
                        me._groupFetchAll();
                        return;
                    }
                    me._setAllGroupSourceInfoExpand(true);
                }
                if (scope.treeView || scope.group) {
                    plugin = me.handsontable.getPlugin('nestedRows');
                    collapsingUI = plugin.collapsingUI;
                    collapsingUI.expandAll();
                }
            };

            /** 折叠全部节点（树形表格、分组表格）  */
            HotTable.prototype.foldAll = function () {
                var me = this;
                var scope = me.scope;
                // var handsontable = me.handsontable;
                // var len = scope.physicalSourceInfo.length;
                var plugin, collapsingUI;
                if (me.hasGroup()) {
                    me._setAllGroupSourceInfoExpand(false);
                }
                // if (scope.treeView || scope.group) {
                //     plugin = handsontable.getPlugin('nestedRows');
                //     collapsingUI = plugin.collapsingUI;
                //     for (var physicalRow = len - 1; physicalRow>= 0; physicalRow--) {
                //         var row = handsontable.toVisualRow(physicalRow);
                //         row = collapsingUI.translateTrimmedRow(row);
                //         var areChildrenCollapsed = collapsingUI.areChildrenCollapsed(row);
                //         if (!areChildrenCollapsed) {
                //             collapsingUI.collapseChildren(row, false);
                //         }
                //     }
                //     collapsingUI.renderAndAdjust();
                // }
                if (scope.treeView || me.hasGroup()) {
                    plugin = me.handsontable.getPlugin('nestedRows');
                    collapsingUI = plugin.collapsingUI;
                    collapsingUI.collapseAll();
                }
            };

            /**
             * 切换分组节点展开、折叠状态
             * @param {string} nodeId
             */
            HotTable.prototype.toggleGroupExpand = function (nodeId) {
                var me = this;
                var handsontable = me.handsontable;
                var record, recordGroupInfo, plugin, collapsingUI, row, physicalRow, areChildrenCollapsed;
                if (angular.isString(nodeId)) {
                    record = me._getRecordByNodeId(nodeId);
                    recordGroupInfo = me._getPhysicalRecordInfo(record);
                } else {
                    physicalRow = nodeId;
                    recordGroupInfo = me.scope.physicalSourceInfo[physicalRow];
                }
                me.finishEdit()
                    .then(function () {
                        $timeout(function () {
                            if (angular.isUndefined(physicalRow)) {
                                if (recordGroupInfo.isFetchingChildren) {
                                    return;
                                }
                                if (!recordGroupInfo.isChildrenFetched) {
                                    me._fetchChildren(nodeId);
                                    return;
                                }
                                physicalRow = _.findIndex(me.scope.physicalSourceInfo, recordGroupInfo);
                            }
                            plugin = handsontable.getPlugin('nestedRows');
                            collapsingUI = plugin.collapsingUI;
                            row = handsontable.toVisualRow(physicalRow);
                            row = collapsingUI.translateTrimmedRow(row);
                            areChildrenCollapsed = collapsingUI.areChildrenCollapsed(row);
                            recordGroupInfo.isExpanded = areChildrenCollapsed;
                            if (areChildrenCollapsed) {
                                collapsingUI.expandChildren(row);
                            } else {
                                _.each(me.scope.physicalSourceInfo, function (info, i) {
                                    if (_.contains(info.parents, recordGroupInfo) && collapsingUI.collapsedRows.indexOf(i) !== -1)
                                        info.isExpanded = areChildrenCollapsed;
                                });
                                collapsingUI.collapseChildren(row);
                            }
                        });
                    });
            };

            /**
             * TODO
             * 执行切换分组节点展开、折叠
             * @param {number} row - 行号
             * @param {boolean} [expand] - true: 切换到展开状态, false: 切换到折叠状态，未定义则根据当前状态切换
             */
            HotTable.prototype.doToggleGroupExpand = function (row, expand) {
                var me = this;
                var handsontable = me.handsontable;
                var plugin = handsontable.getPlugin('nestedRows');
                var collapsingUI = plugin.collapsingUI;
                var vRow = handsontable.toVisualRow(row);
                var recordGroupInfo = me.scope.physicalSourceInfo[row];
                var areChildrenCollapsed;
                vRow = collapsingUI.translateTrimmedRow(vRow);
                if (angular.isDefined(expand)) {
                    areChildrenCollapsed = !expand;
                } else {
                    areChildrenCollapsed = collapsingUI.areChildrenCollapsed(vRow);
                }
                recordGroupInfo.isExpanded = areChildrenCollapsed;
                if (areChildrenCollapsed) {
                    collapsingUI.expandChildren(vRow);
                } else {
                    collapsingUI.collapseChildren(vRow);
                }
            };

            /**
             * 是否通过校验
             * @returns {boolean}
             */
            HotTable.prototype.isValid = function () {
                var me = this;
                var physicalSourceInfo = me.scope.physicalSourceInfo;
                var valid = true;
                _.find(physicalSourceInfo, function (info) {
                    if (info.invalidCells && info.invalidCells.length) {
                        valid = false;
                        return true;
                    }
                });
                return valid;
            };

            /**
             * 新增一行
             * @param {number} physicalRow - 新增行所在行号(physicalRow)
             * @param {Object} [newRecord] 新增行初始数据
             * @returns {Promise}
             */
            HotTable.prototype.addRow = function (physicalRow, newRecord) {
                var me = this;
                var scope = me.scope;
                var handsontable = me.handsontable;
                var physicalSourceInfo = scope.physicalSourceInfo;
                var source = scope.source;
                var deferred = $q.defer();
                if (!newRecord) {
                    newRecord = {};
                }
                me.finishEdit()
                    .then(function () {
                        if (!scope.treeView && !scope.group) {
                            if (me.scope.hasCheckboxColumn) {
                                newRecord.$$checked = false;
                            }
                            source.splice(physicalRow, 0, newRecord);
                            physicalSourceInfo.splice(physicalRow, 0, {record: newRecord, added: true});
                            me._destroyCloneScope();
                            handsontable.loadData(source);
                            handsontable.runHooks('afterUpdateSettings');
                            if (me._cachedFilters && me._cachedFilters.length) {
                                me._applyCachedFilters();
                            }
                            me._updateIsAllChecked();
                            deferred.resolve({source: scope.source, physicalSource: me.getPhysicalSource()});
                        } else {
                            deferred.reject();
                        }
                    });
                return deferred.promise;
            };

            /**
             * 移除行
             * @param physicalRows
             */
            HotTable.prototype.deleteRows = function (physicalRows) {
                var me = this,
                    scope = me.scope,
                    handsontable = me.handsontable,
                    physicalSourceInfo = scope.physicalSourceInfo,
                    source = scope.source,
                    deferred = $q.defer();

                if (!_.isArray(physicalRows)) physicalRows = [physicalRows];
                me.finishEdit()
                    .then(function () {
                        var list = [];
                        _.each(physicalRows, function (physicalRow) {
                            if (_.isNumber(physicalRow) && physicalRow >= 0 && physicalRow < source.length)
                                list.push(source[physicalRow]);
                            else if (_.contains(source, physicalRow))
                                list.push(physicalRow);
                        });
                        _.each(list, function (item) {
                            var index = source.indexOf(item);
                            source.splice(index, 1);
                            physicalSourceInfo.splice(index, 1);
                        });
                        handsontable.loadData(source);
                        handsontable.runHooks('afterUpdateSettings');
                        if (me._cachedFilters && me._cachedFilters.length) {
                            me._applyCachedFilters();
                        }
                        if (source.length === 0) {
                            scope.isAllChecked = false;
                            me.element.find('.ht-check-all').prop('checked', scope.isAllChecked);
                        }
                        deferred.resolve();
                    });
                return deferred.promise;
            };

            HotTable.prototype.getGroupFields = function () {
                var columns = this.columns;
                var fields = [];
                _(columns).forEach(function (column) {
                    if (column.field && column.group === true) {
                        fields.push(column.field);
                    }
                });
                return fields;
            };

            /**
             * 获取显示列字段集合
             * @returns {string[]}
             */
            HotTable.prototype.getVisibleFields = function () {
                var columns = this.columns;
                var fields = [];
                _(columns).forEach(function (column) {
                    if (column.field && column.field != "$$checked" && !column.hidden && !column.noPermit) {
                        fields.push(column.field);
                    }
                });
                return fields;
            };

            /**
             * 获取 physicalSource (source 的平行结构)
             * @returns {Object[]}
             */
            HotTable.prototype.getPhysicalSource = function () {
                var me = this;
                var physicalSourceInfo = me.scope.physicalSourceInfo;
                var result = [];
                _.each(physicalSourceInfo, function (info) {
                    if (info.record && !info.record.__SUMMARY_ROW) result.push(info.record);
                });
                return result;
            };

            /**
             * 根据 sourceIndex 序号获取对应行数据
             * @param {number} sourceIndex - 对应 handsontable 的 physicalRow
             * @returns {Object}
             */
            HotTable.prototype.getPhysicalRecord = function (physicalRow) {
                var me = this;
                var physicalSourceInfo = me.scope.physicalSourceInfo;
                try {
                    return physicalSourceInfo[physicalRow]['record'];
                } catch (e) {
                }
            };

            /**
             * 获取行号 (physicalRow)
             */
            HotTable.prototype.getPhysicalRow = function (record) {
                var me = this;
                var physicalSourceInfo = me.scope.physicalSourceInfo;
                var physicalIndex = _.findIndex(physicalSourceInfo, function (info) {
                    return info.record === record;
                });
                return physicalIndex;
            };

            /**
             * 获取修改过的数据集合
             * @returns {Object[]}
             */
            HotTable.prototype.getModifiedRecords = function () {
                return _(this.getModifiedRecordMap()).values();
            };

            /**
             * 获取修改过的数据 Map
             * @returns {Object} - key: physicalRow 序号，value: record
             */
            HotTable.prototype.getModifiedRecordMap = function () {
                var me = this;
                var physicalSourceInfo = me.scope.physicalSourceInfo;
                var modifiedRecordMap = {};
                _.forEach(physicalSourceInfo, function (info, index) {
                    if (info.originalRecord) {
                        modifiedRecordMap[index] = info.record;
                    }
                });
                return modifiedRecordMap;
            };

            /**
             * 获取修改过的数据集合
             * @returns {Object[]}
             */
            HotTable.prototype.getAddedRecords = function () {
                return _(this.getAddedRecordMap()).values();
            };

            /**
             * 获取新增数据 Map
             * @returns {Object} - key: physicalRow 序号，value: record
             */
            HotTable.prototype.getAddedRecordMap = function () {
                var me = this;
                var physicalSourceInfo = me.scope.physicalSourceInfo;
                var addedRecordMap = {};
                _.forEach(physicalSourceInfo, function (info, index) {
                    if (info.added) {
                        addedRecordMap[index] = info.record;
                    }
                });
                return addedRecordMap;
            };

            /**
             * 获取修改过的数据集合
             * @returns {Object[]}
             */
            HotTable.prototype.getAddedAndModifedRecords = function () {
                return _(this.getAddedAndModifedRecordMap()).values();
            };

            /**
             * 获取新增及修改数据 Map
             * @returns {Object} - key: physicalRow 序号，value: record
             */
            HotTable.prototype.getAddedAndModifedRecordMap = function () {
                var me = this;
                var physicalSourceInfo = me.scope.physicalSourceInfo;
                var addedAndModifedRecordMap = {};
                _.forEach(physicalSourceInfo, function (info, index) {
                    if (info.added || info.originalRecord) {
                        addedAndModifedRecordMap[index] = info.record;
                    }
                });
                return addedAndModifedRecordMap;
            };

            /**
             * 清除数据修改信息
             * @param {boolean} [includeAdded = false] 是否包含新增的数据信息
             */
            HotTable.prototype.clearModifedInfo = function (includeAdded) {
                var me = this;
                var physicalSourceInfo = me.scope.physicalSourceInfo;
                _.forEach(physicalSourceInfo, function (info) {
                    if (info.originalRecord) {
                        delete info.originalRecord;
                    }
                    if (includeAdded && info.added) {
                        delete info.added;
                    }
                });
            };

            /** 重载布局 */
            HotTable.prototype.reload = function (notRequestGroupData) {
                var me = this;
                var handsontable = me.handsontable;
                var plugin = handsontable.getPlugin('manualColumnResize');
                var colOffset = 0;
                if (me.scope.hasCheckboxColumn) {
                    colOffset++;
                }
                me._loadAndReSortHeadersIfStored();
                me._clearValidateInfo();
                if (!me.scope.frontEndGroup) {
                    me._delayApplyCachedFilters();
                }
                plugin.manualColumnWidths = _.map(me.layoutSetting, function (col, index) {
                    var width = col.width || me.columns[index + colOffset].width || me.columns[index + colOffset].defWidth;
                    if (typeof width == "string") width = parseInt(width);
                    return width;
                });
                if (me.scope.hasCheckboxColumn) {
                    plugin.manualColumnWidths.unshift(undefined);
                }
                if (me.scope.frontEndGroup) {
                    me._doFrontEndGroup();
                } else if (!notRequestGroupData && me.scope.group) {
                    me.dataSource.doRequestData(1, {groups: [_.first(me.groups)]});
                } else if (me.scope.dataSource && !me.scope.group && !me.scope.treeView && !me._firstReload && !me.scope.frontEndSort) {
                    me.scope.dataSource.doRequestData();
                }
                if (me.scope.frontEndSort/*  && !me.scope.frontEndGroup */) {
                    me._doFrontEndSort();
                }

                var columns = me._getVisibleColumns();
                handsontable.updateSettings({
                    columns: columns,
                    fixedColumnsLeft: me._toSettingsFixedColumns(me.scope.fixedColumns)
                });
                delete me._firstReload;
            };

            HotTable.prototype.render = function () {
                this.handsontable.render();
            };

            /**
             * 获取分组子数据信息
             * @param {Object} parentGroupInfo - physicalSourceInfo 的信息
             * @returns {Object[]} - recordGroupInfo: physicalSourceInfo 的信息, sourceIndex: 对应 physicalRow
             */
            HotTable.prototype.getGroupChildrenInfoMap = function (parentGroupInfo) {
                var me = this;
                var physicalSourceInfo = me.scope.physicalSourceInfo;
                var groupChildrenInfoMap = _.chain(physicalSourceInfo)
                    .map(function (info, index) {
                        return {
                            sourceIndex: index,
                            recordGroupInfo: info
                        };
                    })
                    .filter(function (infoMap) {
                        var info = infoMap.recordGroupInfo;
                        var parentsInfo = info.parents;
                        return _.contains(parentsInfo, parentGroupInfo);
                    })
                    .value();
                return groupChildrenInfoMap = groupChildrenInfoMap;
            };

            /**
             * 获取数据源查询参数
             */
            HotTable.prototype.getQueryParams = function () {
                var me = this;
                var dataSource = me.dataSource;
                var requestParams = {};
                if (dataSource && dataSource.pageDataSourceProxy) {
                    requestParams = dataSource.pageDataSourceProxy.requestParams || {};
                }
                return requestParams;
            };

            /**
             * 获取父级数据的分组字段值
             * @param {Object} record
             * @param {string} fieldName
             * @returns {any}
             */
            HotTable.prototype.getParentGroupValue = function (record, fieldName) {
                var me = this;
                var recordGroupInfo = me._getPhysicalRecordInfo(record);
                var parent = _.last(recordGroupInfo.parents);
                if (parent) {
                    return parent.record[fieldName] || '';
                }
                return '';
            };

            /**
             * 获取数据源查询参数
             */
            HotTable.prototype.getAllQueryParams = function () {
                var me = this;
                var filters = [],
                    trunks = me.getCheckedGroupRows(),
                    groups = [],
                    leafs = me.getCheckedLeafRows();

                _.forEach(trunks, function (trunk) {
                    var gg = [];
                    _.each(me.groups, function (el) {
                        var fieldValue = '';
                        if (trunk.hasOwnProperty(el.property)) {
                            fieldValue = trunk[el.property];
                        } else {
                            fieldValue = me.getParentGroupValue(trunk, el.property);
                        }
                        if (fieldValue == null) {
                            gg.push({field: el.property, value: ''});
                        } else if (fieldValue.length > 0) {
                            gg.push({field: el.property, value: fieldValue});
                        }
                    });
                    groups.push(_.flatten(gg));
                });

                _.each(me.columns, function (column) {
                    if (!column.__filterValues) return;
                    filters.push({
                        field: column.data,
                        values: column.__filterValues
                    });
                });

                return {
                    groups: groups,
                    filters: filters,
                    rows: leafs
                };
            };

            /**
             * 校验单元格数据
             * @param {number} physicalRow
             * @param {string} field - 字段名
             * @returns {Promise}
             */
            HotTable.prototype.validateCell = function (physicalRow, field, forceRender) {
                var me = this;
                var handsontable = me.handsontable;
                var visualRow = handsontable.toVisualRow(physicalRow);
                var visualCol = handsontable.propToCol(field);
                var plugin = handsontable.getPlugin('comments');
                var recordInfo = me.scope.physicalSourceInfo[physicalRow];
                var source = me.getPhysicalSource();
                var $formRow = me.$formRow;
                var $formInput = me.$formInput;
                var formController = me.formController;
                var deferred = $q.defer();
                forceRender = !!forceRender;
                var column, record, validatorScope, validatorName, errors;
                field = handsontable.colToProp(visualCol);
                column = me.columns[visualCol];
                validatorName = column._validatorName;
                if (recordInfo) {
                    record = recordInfo.record;
                }
                if (!me.__formCompiled) {
                    validatorScope = createValidatorScope();
                    $compile($formRow)(validatorScope);
                    me.__formCompiled = true;
                } else {
                    validatorScope = $formRow.scope();
                    if (validatorScope.record !== record) {
                        updateValidatorScope();
                    }
                }
                $formInput.data('$dataSource', source);
                if (!recordInfo) {
                    deferred.resolve('rowOutOfRange');
                } else if (recordInfo.isGroup) {
                    deferred.resolve('groupRow');
                } else if (!column || !column.columnEditorTmpl) {
                    deferred.resolve('noneEditorColumn');
                } else {
                    $timeout(function () {
                        if (!formController[validatorName] || !angular.isFunction(formController[validatorName].verify)) {
                            deferred.resolve('');
                            return;
                        }
                        formController[validatorName].verify(true)
                            .then(function () {
                                if (!recordInfo.invalidCells) {
                                    recordInfo.invalidCells = [];
                                }
                                if (me.isInvalidCell(physicalRow, field)) {
                                    handsontable.setCellMeta(visualRow, visualCol, 'valid', true);
                                    plugin.removeCommentAtCell(visualRow, visualCol, forceRender);
                                }
                                Arrays.remove(recordInfo.invalidCells, field);
                                //针对eitherNotBlank, unique, compare等验证的特殊处理, 清除关联控件的校验提示
                                var currentValidatorFields = getCurrentValidatorFields();
                                _(currentValidatorFields).forEach(function (fieldName) {
                                    fieldName = fieldName.substr(fieldName.indexOf(".") + 1);
                                    var validCol = handsontable.propToCol(fieldName);
                                    if (me.isInvalidCell(physicalRow, fieldName) && fieldName !== field) {
                                        handsontable.setCellMeta(visualRow, validCol, 'valid', true);
                                        plugin.removeCommentAtCell(visualRow, validCol, forceRender);
                                        Arrays.remove(recordInfo.invalidCells, fieldName);
                                        delete recordInfo.invalidCells[fieldName];
                                    }
                                })
                                delete recordInfo.invalidCells[field];
                                deferred.resolve();
                            })
                            .catch(function () {
                                errors = formController[validatorName].$error;
                                var tips = me._getValidateTips(errors, validatorName);
                                if (errors.dynaRequire) {
                                    var dynaRule = _.find(me.validatorRules, function (r) {
                                        if (r.listenProperties && !r.properties) r.properties = r.listenProperties;
                                        return r.ruleName === "dynaRequire" && _.contains(r.properties, validatorName);
                                    });
                                    if (!angular.isUndefined(dynaRule) && dynaRule.property != validatorName) {
                                        field = dynaRule.property.substr(dynaRule.property.indexOf(".") + 1);
                                        visualCol = handsontable.propToCol(field);
                                    }
                                }

                                var messenger = (config && config.controls && config.controls.validation && config.controls.validation.messenger) ? config.controls.validation.messenger : "tooltipMessenger";
                                if (messenger === "tooltipMessenger") {
                                    handsontable.setCellMeta(visualRow, visualCol, 'tipMessage', tips.length ? [tips[0]] : tips);
                                    handsontable.setCellMeta(visualRow, visualCol, 'valid', false);
                                    plugin.removeCommentAtCell(visualRow, visualCol, forceRender);
                                    if (!recordInfo.invalidCells) {
                                        recordInfo.invalidCells = [];
                                    }

                                    if (!_.contains(recordInfo.invalidCells, field)) {
                                        recordInfo.invalidCells.push(field);
                                        recordInfo.invalidCells[field] = _.keys(_.pick(errors, function (value, key, object) {
                                            return value;
                                        }));
                                    }
                                }
                                deferred.reject(tips);
                            });
                    });
                }
                return deferred.promise;

                function createValidatorScope() {
                    var outerScope = me.scope.$parent;
                    var newerScope = outerScope.$new(false);
                    var sourceIndex = physicalRow;
                    newerScope.row = record;
                    newerScope.record = record;
                    newerScope.rowIndex = sourceIndex;
                    newerScope.grid = me;
                    newerScope.source = source;
                    newerScope.editingRecord = record;
                    return newerScope;
                }

                function updateValidatorScope() {
                    validatorScope.row = record;
                    validatorScope.record = record;
                    validatorScope.rowIndex = physicalRow;
                    validatorScope.editingRecord = record;
                    // validatorScope.$apply();
                    var phase = validatorScope.$root.$$phase;
                    if (phase !== '$apply' && phase !== '$digest') {
                        validatorScope.$apply();
                    }
                }

                function getCurrentValidatorFields() {
                    var _currentValidatorFields = [];
                    var _validatorRules = me.validatorRules;
                    _.forEach(recordInfo.invalidCells, function (fieldName) {
                        var _fieldName = validatorName.substr(0, validatorName.indexOf(".") + 1).concat(fieldName);
                        var _ruleName = recordInfo.invalidCells[fieldName][0];

                        var _rule = _.find(_validatorRules, function (r) {
                            var _properties = r.properties;
                            if (r.listenProperties && !r.properties) _properties = r.listenProperties;
                            return r.ruleName === _ruleName && _.contains(_properties, validatorName)
                                && _.contains(_properties, _fieldName);
                        });
                        if (_rule) {
                            _.forEach(_rule.properties, function (value) {
                                if (!_.contains(_currentValidatorFields, value)) {
                                    _currentValidatorFields.push(value);
                                }
                            });
                        }
                    });
                    return _currentValidatorFields;
                }
            };

            /**
             * 单元格是否未通过校验
             * @param {number} physicalRow - 行号
             * @param {string} field - 字段名
             * @returns {boolean}
             */
            HotTable.prototype.isInvalidCell = function (physicalRow, field) {
                var me = this;
                var physicalSourceInfo = me.scope.physicalSourceInfo;
                var info = physicalSourceInfo[physicalRow];
                return info.invalidCells && _.contains(info.invalidCells, field);
            };

            /**
             * 校验行数据
             * @param {number} physicalRow
             * @returns {Promise}
             */
            HotTable.prototype.validateRow = function (physicalRow, forceRender) {
                var me = this;
                var columns = me.columns;
                var deferred = $q.defer();
                var resolveCount = 0;
                var rejectCount = 0;
                var totalCount, validateColumns;
                var tips = "";
                validateColumns = _.filter(columns, function (column) {
                    return column._validatorName;
                });
                totalCount = validateColumns.length;
                _.forEach(validateColumns, function (column) {
                    var field = column.field;
                    me.validateCell(physicalRow, field)
                        .then(function () {
                            resolveCount++;
                        })
                        .catch(function (errorMsg) {
                            rejectCount++;
                            tips = errorMsg;
                        })
                        .finally(function () {
                            if (resolveCount + rejectCount >= totalCount) {
                                if (rejectCount) {
                                    deferred.reject(tips);
                                } else {
                                    deferred.resolve();
                                }
                                if (forceRender) me.render();
                            }
                        });
                });
                if (totalCount == 0) deferred.resolve();
                return deferred.promise;
            };

            /**
             * 验证表格所有行
             */
            HotTable.prototype.validate = function () {
                var me = this;
                var rows = [];
                _.each(me.scope.source, function (record, i) {
                    if (!me._isSummaryRow(record)) rows.push(i);
                });
                return me._validateRows(rows, true);
            };

            /**
             * 提交修改状态
             */
            HotTable.prototype.flushModified = function () {
                var me = this;
                var physicalSourceInfo = me.scope.physicalSourceInfo;
                _.forEach(physicalSourceInfo, function (info, index) {
                    if (info.originalRecord) delete info.originalRecord;
                });
            };

            /**
             * 验证指定行
             * @param rows
             * @private
             */
            HotTable.prototype._validateRows = function (rows, forceRender) {
                var me = this;
                var rowsCount = rows.length;
                var nextRow = 0;
                var success = true;
                var deferred = $q.defer();
                var tips = "";
                if (!rowsCount) {
                    deferred.resolve();
                } else {
                    next();
                }

                function next() {
                    me.validateRow(rows[nextRow])
                        .catch(function (errorMsg) {
                            success = false;
                            tips = errorMsg;
                        })
                        .finally(function () {
                            nextRow++;
                            if (nextRow < rowsCount) {
                                next();
                            } else {
                                if (success) {
                                    deferred.resolve();
                                } else {
                                    deferred.reject(tips);
                                }
                                if (forceRender) me.render();
                            }
                        });
                }

                return deferred.promise;
            };

            /**
             * 校验新增行及修改行
             * @returns {Promise}
             */
            HotTable.prototype.validateAddedAndModifiedRows = function () {
                var me = this;
                var addedAndModifiedRows = me.getAddedAndModifedRecordMap();
                var rows = _.chain(addedAndModifiedRows)
                    .keys()
                    .map(function (str) {
                        return parseInt(str);
                    })
                    .value();
                return me._validateRows(rows, true);
            };

            /**
             * 获取选中行首行的副本，未选中则返回false
             * 用于刷数据时滚动至原来的位置
             * @returns {mixed}
             */
            HotTable.prototype.getMemoryCheckedRows = function () {
                return this.scope.checkedRows && this.scope.checkedRows.length > 0 ?
                    angular.copy(this.scope.checkedRows[0]) : false;
            };

            /**
             * 设置表格行位置
             * @param record
             * @param compareFunc
             * @param mode
             */
            HotTable.prototype.setMemoryPosition = function (record, compareFunc, mode) {
                if (!record || typeof compareFunc != "function") return;

                var me = this,
                    scope = me.scope;
                for (var i = 0; i < scope.physicalSourceInfo.length; i++) {
                    if (compareFunc(record, scope.physicalSourceInfo[i].record)) {
                        me.handsontable.view.wt.wtOverlays.topOverlay.scrollTo(i, false);
                        return;
                    }
                }
                if (mode == 1)
                    me.handsontable.view.wt.wtOverlays.topOverlay.scrollTo(0, false);
                else
                    me.handsontable.view.wt.wtOverlays.topOverlay.scrollTo(scope.physicalSourceInfo.length - 1, false);
            };

            /**
             * 清除过滤条件
             */
            HotTable.prototype.clearFilters = function () {
                var me = this;
                var filtersPlugin = me.handsontable.getPlugin('filters');
                filtersPlugin.formulaCollection.clean();
                me.scope.groupTrimmedRows = undefined;
                me._applyFilters()
                    .then(function () {
                        me._updateGroupCheckBox();
                        me._updateIsAllChecked();
                        me._updateGroupFoldStatus();
                        me._updateGroupSummary();
                        $timeout(function () {
                            me.handsontable.render();
                        });
                    });
            };

            HotTable.prototype._rowClickEvent = function (row, field, event) {
                var hotTable = this, handsontable, scope, row, col, physicalRow, record, prop, params, onRowClick,
                    firstCol;
                handsontable = hotTable.handsontable;
                scope = hotTable.scope;
                var physicalRow = handsontable.toPhysicalRow(row);
                if (!angular.isNumber(field)) {
                    col = handsontable.propToCol(field);
                } else {
                    col = field;
                    field = handsontable.colToProp(col);
                }
                firstCol = 0;
                if (scope.hasCheckboxColumn) {
                    firstCol++;
                }

                record = hotTable.getPhysicalRecord(physicalRow);
                if (!record || hotTable._isSummaryRow(record)) return;
                if (row < 0 || col < firstCol) {
                    //return;
                } else {
                    //针对复选框的特殊处理
                    if (event.target && event.target.type === "checkbox") {
                        if (record.rowStatus == 2) {
                            var originalRecord = hotTable._getPhysicalRecordInfo(record);
                            originalRecord.record.rowStatus = 16;
                            if (event.target.checked) {
                                originalRecord.record[field] = $(event.target).attr("ng-false-value");
                            } else {
                                originalRecord.record[field] = $(event.target).attr("ng-true-value");
                            }
                            hotTable._setModifiedRecordInfo(record, originalRecord, field);
                        }
                    }
                }

                if ($(event.target).is(':checkbox')) {
                    return;
                }

                onRowClick = scope.onRowClick;
                params = {
                    grid: hotTable,
                    $event: event || null,
                    record: record,
                    colIndex: col,
                    rowIndex: row,
                    field: field,
                    physicalRow: physicalRow
                };
                onRowClick(params);
            };

            /**
             * 选择单元格，没有指定则选择指定行的第一格
             * @param physicalRow 物理行号
             * @param field 序号或字段
             */
            HotTable.prototype.select = function (physicalRow, field, changeListener) {
                this.handsontable.selectCell(physicalRow, field, undefined, undefined, undefined, changeListener);
            };

            HotTable.prototype._loadData = function (result, event) {
                var hotTable = this, scope = this.scope;
                scope.columnValueCache = {};
                hotTable._destroyCloneScope();
                scope.firstClickCheckbox = false;
                if (scope.group && scope.dataSource === result) {
                    return;
                }
                var fetchAll = result.fetchAll;
                delete result.fetchAll;

                if (scope.hasSummary && !angular.isUndefined(result['records']) && result['records'].length > 0) {
                    if (result['records'].length === 1 && result['records'][0]['__SUMMARY_ROW'])
                        result['records'] = [];
                    else if (!_.some(result['records'], function(record) { return !!record['__SUMMARY_ROW']; }))
                        result['records'] = scope.summaryPos === 'first' ? [{ __SUMMARY_ROW: true }].concat(result['records']) : result['records'].concat([{ __SUMMARY_ROW: true }]);
                }
                scope.physicalSourceInfo = [];
                scope._originalGroupChildrenPhysicalSourceInfo = [];
                scope._originalPhysicalSourceInfo = [];
                scope._originalFrontEndGroupRecords = result['records'];
                if (!angular.isArray(scope._originalFrontEndGroupRecords)) {
                    scope._originalFrontEndGroupRecords = [];
                }
                hotTable.finishEdit()
                    .then(function () {
                        if (scope.group && scope.frontEndGroup) {
                            hotTable._doFrontEndGroup(null, null, false);
                            var tmpCols = scope.hasCheckboxColumn ? _.tail(hotTable.columns) : hotTable.columns;
                            hotTable._enterCols(tmpCols);
                            callOnLoadSuccess();
                            return;
                        } else {
                            scope.source = result['records'];
                        }
                        if (!angular.isArray(scope.source)) {
                            scope.source = [];
                        }
                        hotTable._initPhysicalSourceInfo(fetchAll);
                        scope.checkedRows = [];
                        scope.selectedRow = null;
                        scope.isAllChecked = false;
                        hotTable.handsontable.deselectCell();
                        hotTable.handsontable.getPlugin('trimRows').untrimAll();
                        var plugin = hotTable.handsontable.getPlugin('nestedRows');
                        if (plugin && plugin.dataManager) {
                            var dataManager = plugin.dataManager;
                            dataManager.data = [];
                            dataManager.rewriteCache();
                        }

                        // hotTable._takeSnapshot();
                        hotTable.handsontable.loadData(scope.source);
                        if (!scope.source || !scope.source.length) hotTable._removeSnapshot();
                        if (scope.frontEndSort) {
                            hotTable._doFrontEndSort();
                        } else {
                            hotTable.handsontable.runHooks('afterUpdateSettings');
                            if (hotTable._cachedFilters && hotTable._cachedFilters.length) {
                                hotTable._delayApplyCachedFilters();
                                // .then(function () {
                                //     $timeout(function () {
                                //         hotTable.handsontable.render();
                                //         hotTable._removeSnapshot();
                                //     });
                                // });
                            } /*else {
                                hotTable.handsontable.render();
                                hotTable._removeSnapshot();
                            }*/
                        }
                        callOnLoadSuccess();

                        var summaryInterval = _.getValue(scope, 'summaryInterval', 2000);

                        if (scope.summaryUrl) {
                            hotTable.resetSummary();
                            if (summaryInterval >= 0) {
                                $timeout(function () {
                                    hotTable.renderSummary();
                                }, summaryInterval);
                            }
                        }

                        function callOnLoadSuccess() {
                            var onLoadSuccess = scope.onLoadSuccess,
                                eventParam = {
                                    grid: hotTable,
                                    $event: event,
                                    source: scope.source,
                                    physicalSource: hotTable.getPhysicalSource()
                                };
                            onLoadSuccess(eventParam);
                        }
                    });
            };

            HotTable.prototype.loadData = function (records) {
                var result = {records: records, fetchAll: true};
                this._loadData(result, null);
            };

            HotTable.prototype.disableValidator = function () {
                var me = this;
                if (me.formController && me.formController.$validator)
                    me.formController.$validator.disable();
            };

            HotTable.prototype.enableValidator = function () {
                var me = this;
                if (me.formController && me.formController.$validator)
                    me.formController.$validator.enable();
            };

            /*----------------------------private---------------------------------------*/
            /**
             * 设置表格宽度到其父元素大小
             */
            HotTable.prototype._autoWidth = function () {
                var width = this.element.parent().width();
                this.resizeTo(width);
            };

            HotTable.prototype.autoWidth = function () {
                this._autoWidth();
            };

            /**
             * 更新选中行，过滤、全选等操作需要更新选中
             */
            HotTable.prototype._updateCheckedRows = function () {
                var me = this;
                var trimRowsPlugin = me.handsontable.getPlugin("trimRows");
                _.each(me.scope.physicalSourceInfo, function (info, i) {
                    if (trimRowsPlugin.isTrimmed(i)) {
                        info.record.$$checked = false;
                        if (_.isArray(info.parents) && info.parents.length > 0) {
                            info.record.$$checked = _.some(info.parents, function (parent) {
                                return parent.record.$$checked;
                            });
                        }
                    }
                });
                me.scope.checkedRows = me.getCheckedRows();
            };

            /**
             * 获取表格 columns，初始化表格时调用
             * @param {HTMLElement} tElement
             */
            HotTable.prototype._getColumns = function (tElement) {
                var me = this;
                var scope = me.scope;
                var columns = [];
                var index = -1;
                _.forEach(tElement.context.children, function (node) {
                    var $node = $(node);
                    var $columnEditor;
                    switch (node.tagName.toUpperCase()) {
                        case 'G-HOT-INDEX-COLUMN':
                            scope.hasIndexColumn = true;
                            break;
                        case 'G-HOT-CHECKBOX-COLUMN':
                            index++;
                            scope.hasCheckboxColumn = true;
                            //editor为true时，当焦点在checkbox列的某个单元格时，树状展开收缩会EditorManager会触发双击事件，自动勾选checkbox
                            columns.push({
                                data: '$$checked',
                                field: '$$checked',
                                type: 'checkbox',
                                editor: false,
                                width: parseInt($node.attr('width')) || 70,
                                checkedTemplate: true,
                                uncheckedTemplate: false,
                                readOnly: false,
                                className: (scope.treeView ? 'ht-checkbox-column' : 'htCenter ht-checkbox-column')
                            });
                            break;
                        case 'G-HOT-COLUMN':
                            index++;
                            var className = $node.attr('class') || '';
                            var headStyle = $node.attr('style');
                            var alignment = $node.attr('align');
                            var sortMode = $node.attr('sort-mode') === 'chinese' ? 'chinese' : 'default';
                            var column = {
                                _title: $node.attr('title') || '　',
                                hidden: angular.isDefined($node.attr('hidden')),
                                required: angular.isDefined($node.attr('required')),
                                operateColumn: angular.isDefined($node.attr('operateColumn')),
                                sortMode: sortMode
                            };

                            if (column._title.indexOf("nls") !== -1) {
                                column._title = $parse(column._title)(scope);
                            }

                            var attrData = $node.attr('data');
                            column._sortable = angular.isDefined($node.attr('sortable'));
                            if (column._sortable) {
                                scope.sortable = true;
                            }
                            column.text = column._title.replace(/<.*>.*<\/.*>/gi, '');
                            switch (alignment) {
                                case 'left':
                                    className += ' htLeft';
                                    break;
                                case 'right':
                                    className += ' htRight';
                                    break;
                                case 'center':
                                    className += ' htCenter';
                                    break;
                                default:
                                    break;
                            }
                            if (className) {
                                column.className = className;
                            }
                            if (headStyle) {
                                column.headStyle = headStyle;
                            }
                            if (attrData.indexOf('|') > 0) {
                                column.dataWithFilter = attrData;
                            }
                            column.data = $.trim(attrData.split('|')[0]);
                            column.field = column.data;
                            if ($node.attr('width')) {
                                column.defWidth = parseInt($node.attr('width'));
                            }
                            if ($node.attr('type') === 'checkbox') {
                                column.type = 'checkbox';
                                if ($node.attr('checked-template')) column.checkedTemplate = $node.attr('checked-template');
                                if ($node.attr('unchecked-template')) column.uncheckedTemplate = $node.attr('unchecked-template');
                            }
                            $columnEditor = $node.children('g-hot-column-editor');
                            if ($columnEditor.length) {
                                column.columnEditorTmpl = $.trim($columnEditor.eq(0).html());
                                column.editor = ColumnEditor;
                            } else if (column.type === 'checkbox') {
                                if ($node.attr('read-only') === 'true') {
                                  column.readOnly = true
                                } else if (me.scope.$parent[$node.attr('read-only')] instanceof Function) {
                                  column.readOnlyFunc = me.scope.$parent[$node.attr('read-only')]                 
                                } else {
                                  column.readOnly = false
                                }
                          } else {
                            column.readOnly = true;
                          }

                            var $columnTmpl = $node.children('g-hot-column-tmpl');
                            if ($columnTmpl.length) column.tmpl = $.trim($columnTmpl.eq(0).html());

                            if (column.dataWithFilter) {
                                column.valueParser = function (value, record) {
                                    var parsedValue;
                                    if (!record) {
                                        record = {};
                                        record[column.field] = value;
                                    }
                                    try {
                                        if (column.dataWithFilter.indexOf('record') <= 0) {
                                            if (!column._cachedRenderer) {
                                                column._cachedRenderer = $parse(column.dataWithFilter);
                                            }
                                            parsedValue = column._cachedRenderer(record);
                                        } else {
                                            if (!column._cachedRenderer) {
                                                column._cachedRenderer = _.chain(column.dataWithFilter.split('|'))
                                                    .tail()
                                                    .map(function (fStr) {
                                                        return _.map(fStr.split(':'), function (str, i) {
                                                            if (i === 0) {
                                                                return $filter($.trim(str));
                                                            }
                                                            if (i === 1) {
                                                                return _.map(str.split(','), function (argStr) {
                                                                    return $.trim(argStr);
                                                                });
                                                            }
                                                        });
                                                    })
                                                    .value();
                                            }
                                            parsedValue = _.reduce(column._cachedRenderer, function (memo, filter) {
                                                var filterFunc = filter[0];
                                                var filterArgsStr = filter[1] || [];
                                                var filterArgs = _.map(filterArgsStr, function (str) {
                                                    return eval(str);
                                                });
                                                filterArgs.unshift(memo);
                                                return filterFunc.apply(me, filterArgs);
                                            }, value);
                                        }
                                    } catch (e) {
                                        console.log('parse error:', {value: value, record: record, column: column});
                                        parsedValue = value;
                                    }
                                    return parsedValue;
                                };
                            }

                            if ($node.attr('summary') && SUMMARY_TYPE.indexOf($node.attr('summary')) != -1) {
                                column.summary = $node.attr('summary');
                                //column.type = "numeric";
                            }

                            if ($node.attr('css-class')) column.cssClass = $node.attr('css-class');
                            if (angular.isDefined($node.attr('has-tip'))) column.hasTip = true;
                            if (angular.isDefined($node.attr('template-compile'))) {
                                column.templateCompile = $node.attr('template-compile');
                            }
                            if (angular.isDefined($node.attr('hidden'))) {
                                //scope.hiddenColumns.push(index);
                                scope.hiddenColumns.push(column);
                            } else {
                                columns.push(column);
                            }
                            break;
                    }
                });
                me.columns = me.__originalCols = columns;
            };

            /**
             * 根据字段获取 column 对象
             * @param {string} field - 字段名
             * @returns {Object}
             */
            HotTable.prototype._getColumnByField = function (field) {
                var me = this;
                var columns = me.__originalCols;
                return _.find(columns, function (column) {
                    return column.data === field;
                });
            };
            /**
             * 监听 resize 并调整表格宽度
             * 采用异步，跳过首次渲染时的resize
             * */
            HotTable.prototype._autoResizeWidth = function () {
                var _this = this;
                setTimeout(function () {
                    $(window).on('resize.' + _this.scope.$id, _.throttle(_this._autoWidth).bind(_this));
                }, 200);
            };

            /**
             * 结束拖选调用方法
             * @param {number} start
             * @param {number} end
             */
            HotTable.prototype._finishDragCheck = function (start, end) {
                var me = this;
                var scope = me.scope;
                var source = scope.source;
                var checkedRows = scope.checkedRows.concat();
                var onCheck = scope.onCheck;
                var hotTable = scope.grid;
                var handsontable = me.handsontable;
                var tmp;
                if (start > end) {
                    tmp = start;
                    start = end;
                    end = tmp;
                }
                for (var i = start; i <= end; i++) {
                    var physicalRow = handsontable.toPhysicalRow(i);
                    var record = me.getPhysicalRecord(physicalRow);
                    var checked = !record['$$checked'];
                    record['$$checked'] = checked;
                    if (checked) {
                        checkedRows = checkedRows.concat(record);
                    } else {
                        checkedRows = _.without(checkedRows, record);
                    }
                    scope.checkedRows = checkedRows;
                    if (scope.group) {
                        me._toggleGroupChildrenChecked(record, checked, false);
                        me._toggleGroupParentsChecked(record, checked);
                    }
                    var eventParam = {
                        grid: hotTable,
                        source: source,
                        checked: checked,
                        row: physicalRow,
                        record: record
                    };
                    onCheck(eventParam);
                }
                me._updateIsAllChecked();
                hotTable.handsontable.render();
            };

            /**
             * 执行排序
             * @param {string} newSortName
             * @param {string} newSortDirection
             */
            HotTable.prototype._doSort = function (newSortName, newSortDirection) {
                var me = this;
                var scope = me.scope;
                var dataSource = scope.dataSource;
                var oldSortNames, oldSortDirections, index;
                if (scope.frontEndSort) {
                    oldSortNames = me.sortName || [];
                    oldSortDirections = me.sortDirection || [];
                } else {
                    oldSortNames = dataSource.sortName || [];
                    oldSortDirections = dataSource.sortDirection || [];
                }
                index = _.findIndex(oldSortNames, function (sortName) {
                    return sortName === newSortName;
                });
                if (!newSortName || !newSortDirection || (index >= 0 && oldSortDirections[index] === newSortDirection)) {
                    me.sortName = [];
                    me.sortDirection = [];
                } else {
                    me.sortName = [newSortName];
                    me.sortDirection = [newSortDirection];
                }
                if (!scope.frontEndSort) {
                    dataSource.sortName = me.sortName;
                    dataSource.sortDirection = me.sortDirection;
                    scope.sortInfo = _.object(dataSource.sortName, dataSource.sortDirection);
                    me.handsontable.render();
                    dataSource.doRequestData();
                } else {
                    me._doFrontEndSort();
                }
            };

            /**
             * 执行多列排序
             * @param {string} newSortName
             * @param {string} newSortDirection
             */
            HotTable.prototype._doMultiSort = function (newSortName, newSortDirection) {
                var me = this;
                var scope = me.scope;
                var dataSource = scope.dataSource;
                var sortNames, sortDirections, oldSortDirection, index;
                if (scope.frontEndSort) {
                    sortNames = me.sortName || [];
                    sortDirections = me.sortDirection || [];
                } else {
                    sortNames = dataSource.sortName || [];
                    sortDirections = dataSource.sortDirection || [];
                }
                index = _.findIndex(sortNames, function (sortName) {
                    return sortName === newSortName;
                });
                if (index >= 0) {
                    oldSortDirection = sortDirections[index];
                    if (oldSortDirection === newSortDirection) {
                        sortNames.splice(index, 1);
                        sortDirections.splice(index, 1);
                    } else {
                        sortDirections[index] = newSortDirection;
                    }
                } else {
                    sortNames.push(newSortName);
                    sortDirections.push(newSortDirection);
                }
                me.sortName = sortNames;
                me.sortDirection = sortDirections;
                if (!scope.frontEndSort) {
                    dataSource.sortName = me.sortName;
                    dataSource.sortDirection = me.sortDirection;
                    me.handsontable.render();
                    dataSource.doRequestData();
                } else {
                    me._doFrontEndSort();
                }
            };

            /** 执行前端排序 */
            HotTable.prototype._doFrontEndSort = function (applyCachedFilters) {
                if (!this.scope.source || !this.scope.source.length) return;
                var me = this;
                var scope = me.scope;
                var sortNames = me.sortName || [];
                var sortDirections = me.sortDirection || [];
                var physicalSourceInfo = scope.physicalSourceInfo;
                var newPhysicalSourceInfo = me.scope._originalPhysicalSourceInfo.concat();
                var len = sortNames.length;
                var originalGroupChildrenPhysicalSourceInfo = me.scope._originalGroupChildrenPhysicalSourceInfo || [];
                var sortFunc = me._createSortFunc(sortNames, sortDirections);
                var lastRecord = _.last(newPhysicalSourceInfo);
                if (applyCachedFilters === undefined) {
                    applyCachedFilters = true;
                }
                me._destroyCloneScope();
                me._takeSnapshot();
                if (scope.group && me.hasGroup()) {
                    var plugin = me.handsontable.getPlugin('nestedRows');
                    var dataManager = plugin.dataManager;
                    if (originalGroupChildrenPhysicalSourceInfo && originalGroupChildrenPhysicalSourceInfo.length) {
                        /*_.forEach(originalGroupChildrenPhysicalSourceInfo, function (originalChildrenInfo) {
                            var childrenInfo = originalChildrenInfo.childrenInfo.concat();
                            var parentInfo = originalChildrenInfo.parentInfo;
                            var parentInfoIndex = _.findIndex(physicalSourceInfo, parentInfo);
                            var parentRecord = parentInfo.record;
                            var childrenRecords;
                            var childrenCount = childrenInfo.length;
                            var args = [parentInfoIndex + 1, childrenCount];
                            childrenInfo.sort(sortFunc);
                            childrenRecords = _.pluck(childrenInfo, 'record');
                            parentRecord.__children = childrenRecords;
                            _.forEach(childrenInfo, function (childInfo, index) {
                                childInfo.levelIndex = index;
                            });
                            args = args.concat(childrenInfo);
                            Array.prototype.splice.apply(physicalSourceInfo, args);
                        });*/
                        _.forEach(originalGroupChildrenPhysicalSourceInfo, function (originalChildrenInfoArr, level) {
                            _.forEach(originalChildrenInfoArr, function (originalChildrenInfo) {
                                var parentGroupInfo = originalChildrenInfo.parentInfo;
                                var childrenInfo = originalChildrenInfo.childrenInfo.concat();
                                var recordChildren = level === 0
                                    ? scope.source
                                    : parentGroupInfo.record.__children;
                                childrenInfo.sort(sortFunc);
                                recordChildren.length = 0;
                                _.forEach(childrenInfo, function (childInfo) {
                                    recordChildren.push(childInfo.record);
                                });
                            });
                        });
                        var oldPhysicalSourceInfo = physicalSourceInfo.concat();
                        physicalSourceInfo.length = 0;
                        reSortPhysicalSourceInfo(scope.source);

                        function reSortPhysicalSourceInfo(childrenSource) {
                            for (var i = 0, len = childrenSource.length; i < len; i++) {
                                var record = childrenSource[i];
                                var info = _.find(oldPhysicalSourceInfo, function (info) {
                                    return info.record === record;
                                });
                                info.levelIndex = i;
                                physicalSourceInfo.push(info);
                                if (record.__children && record.__children.length) {
                                    reSortPhysicalSourceInfo(record.__children);
                                }
                            }
                        }

                        dataManager.rewriteCache();
                    }
                } else if (scope.treeView) {
                    newPhysicalSourceInfo = _.filter(newPhysicalSourceInfo, function (info) {
                        return info.level === 0;
                    });
                    if (len) {
                        newPhysicalSourceInfo.sort(sortFunc);
                    }
                    var newSource = _.pluck(newPhysicalSourceInfo, 'record');
                    _.each(newSource, function (newSourceItem) {
                        if (newSourceItem.__children) {
                            newSourceItem.__children = newSourceItem.__children.sort(sortFunc);
                        }
                    });
                    scope.source = newSource;
                    me._initTreePhysicalSourceInfo();
                    me.handsontable.loadData(scope.source);
                    me.handsontable.runHooks('afterUpdateSettings');
                } else {
                    if (len) {
                        if (scope.hasSummary) {
                            newPhysicalSourceInfo = _.without(newPhysicalSourceInfo, lastRecord);
                            newPhysicalSourceInfo.sort(sortFunc);
                            newPhysicalSourceInfo.push(lastRecord);
                        } else {
                            newPhysicalSourceInfo.sort(sortFunc);
                        }
                    }
                    me.scope.physicalSourceInfo = newPhysicalSourceInfo;
                    scope.source = _.map(newPhysicalSourceInfo, function (info) {
                        return info.record;
                    });
                    me.handsontable.loadData(scope.source);
                    me.handsontable.runHooks('afterUpdateSettings');
                }
                me._delayApplyCachedFilters()
                    .then(function () {
                        $timeout(function () {
                            me.handsontable.render();
                            me._removeSnapshot();
                        });
                    });
            };

            HotTable.prototype._columnSortCalculate = function (source, target, sortName, sortDirection) {
                var column = _.filter(this.columns, function (col) {
                    return col.data === sortName;
                })[0];
                var va = source.record ? source.record[sortName] : source[sortName];
                var vb = target.record ? target.record[sortName] : target[sortName];
                va = (!va && va !== 0) ? '' : va;
                vb = (!vb && vb !== 0) ? '' : vb;
                switch (column.sortMode) {
                    case "default":
                        if (va === '' && angular.isNumber(vb)) {
                            va = -Infinity;
                        }
                        if (vb === '' && angular.isNumber(va)) {
                            vb = -Infinity;
                        }
                        if (va > vb) {
                            return sortDirection === ORDER.ASC ? 1 : -1;
                        } else if (va < vb) {
                            return sortDirection === ORDER.ASC ? -1 : 1;
                        } else {
                            return 0;
                        }
                    case "chinese":
                        var v = va.localeCompare(vb);
                        if (v === 0) return 0;
                        return sortDirection === ORDER.ASC ? v : -v;
                }
            };

            /**
             * 生成前端排序比较方法
             * @param {string[]} sortNames 排序字段数组
             * @param {string[]} sortDirections 排序方向数组
             * @returns {Function(a: Object, b: Object): number}
             */
            HotTable.prototype._createSortFunc = function (sortNames, sortDirections) {
                sortNames = sortNames || [];
                sortDirections = sortDirections || [];
                return function (a, b) {
                    var len = sortNames.length;
                    var ret = 0;
                    var sortName, sortDirection, va, vb;
                    for (var i = 0; i < len; i++) {
                        sortName = sortNames[i];
                        sortDirection = sortDirections[i];
                        ret = this._columnSortCalculate(a, b, sortName, sortDirection);
                        if (ret !== 0) break;
                    }
                    return ret;
                };
            };

            /** 应用本地布局 */
            HotTable.prototype._applyLocalStorageLayout = function () {
                var me = this, layout;
                if (me.scope.colSettingsKey && me.scope.colSettingsKey.length > 0) {
                    layout = me.loadLocalStorageLayout();
                    if (me.validLayout(layout)) {
                        me.layoutSetting = layout.content.layout;
                        me.sortName = layout.content.sortName;
                        me.sortDirection = layout.content.sortDirection;
                        me.scope.fixedColumns = layout.content.fixedColumns;
                    } else if (layout == null) {
                        me.sortName = [];
                        me.sortDirection = [];
                    }
                }
            };

            /** 获取本地布局数据 */
            HotTable.prototype.loadLocalStorageLayout = function () {
                var me = this,
                    scope = me.scope,
                    layout = LocalStorages.get(scope.colSettingsKey);
                return layout;
            };

            /** 获取并应用本地布局 */
            HotTable.prototype._loadAndReSortHeadersIfStored = function () {
                var me = this;
                if (me.scope.colSettingsKey) {
                    if (_(me.layoutSetting).isEmpty()) {
                        me.layoutSetting = _.chain(me.__originalCols)
                            .filter(function (col) {
                                return col.data !== '$$checked';
                            })
                            .map(function (col) {
                                return {
                                    field: col.data
                                };
                            })
                            .value();
                    }
                }
                me._syncColumnsAndLayoutSetting();
                me._setGroups();
            };

            /** 同步 columns 和 layoutSetting */
            HotTable.prototype._syncColumnsAndLayoutSetting = function () {
                var me = this;
                var scope = me.scope;
                var checkboxColumn;
                if (scope.hasCheckboxColumn) {
                    checkboxColumn = me.__originalCols[0];
                }
                if (!_(me.layoutSetting).isEmpty()) {
                    me.columns = _(me.layoutSetting).map(function (colSetting) {
                        var column = me._getColumnByField(colSetting.field);
                        if (column) {
                            column.group = colSetting.group;
                        }
                        return column;
                    });
                    if (scope.hasCheckboxColumn) {
                        me.columns.unshift(checkboxColumn);
                    }
                } else {
                    me.columns = me.__originalCols;
                }
                me.columns = _.without(me.columns, void 0);
            };

            /** 设置表格 groups 属性 */
            HotTable.prototype._setGroups = function () {
                var me = this;
                var scope = me.scope;
                var oldGroups = me.groups;
                var groups, dataSourceProxy, dataSource;
                if (!scope.group) {
                    return;
                }
                dataSource = me.dataSource;

                me.groups = _.chain(me.columns)
                    .map(function (col) {
                        if (col.group === true) {
                            return {property: col.data};
                        }
                    })
                    .filter(_.negate(_.isUndefined))
                    .value();

                if (scope.frontEndGroup && scope._originalFrontEndGroupRecords && !isSameGroup(oldGroups, me.groups)) {
                    $timeout(function () {
                        me._doFrontEndGroup();
                    });
                    return;
                }

                if (!dataSource) {
                    dataSource = GroupDataSources.get(me.attrs.sourceName);
                }
                if (!scope.frontEndSort) {
                    dataSource.sortName = me.sortName;
                    dataSource.sortDirection = me.sortDirection;
                }
                dataSourceProxy = dataSource.pageDataSourceProxy;
                if (dataSourceProxy) {
                    if (!scope.frontEndSort) {
                        dataSourceProxy.sortName = me.sortName;
                        dataSourceProxy.sortDirection = me.sortDirection;
                    }
                    groups = _(me.columns).chain().filter(function (item) {
                        return item.group;
                    }).map(function (col) {
                        return col.data;
                    }).value();
                    dataSource.setGroups(groups);
                    dataSourceProxy.currentPage = 1;
                    if (!_(groups).isEmpty()) {
                        if (!dataSourceProxy.params) {
                            dataSourceProxy.params = {};
                        }
                        dataSourceProxy.params['groups[0].property'] = groups[0];
                    }

                }

                function groupsToString(groups) {
                    return JSON.stringify(_.pluck(groups, 'property'));
                }

                function isSameGroup(g1, g2) {
                    return groupsToString(g1) === groupsToString(g2);
                }
            };

            /** 本地保存布局数据到 */
            HotTable.prototype.storeLocalStorageLayout = function (layout) {
                var version,
                    me = this,
                    scope = me.scope;
                if (!!scope.colSettingsKey && angular.isObject(layout)) {
                    version = layout.version ? (layout.version + 1) : new Date().getTime;
                    layout.version = version;
                    LocalStorages.set(scope.colSettingsKey, layout);
                }
            };

            /** 注册 LayoutService */
            HotTable.prototype._registerLayoutService = function () {
                var me = this, menuDiv,
                    tableId = me.scope.colSettingsKey;
                if (!tableId || tableId === "") {
                    return;
                }
                menuDiv = angular.element('<div data-target="dropdownMenu_' + tableId + '" context-menu="" class="ng-isolate-scope" data-hitarea=".ht_clone_top,.ht_clone_top_left_corner"></div>');
                me.element.wrap($compile(menuDiv)(me.scope));
                me.scope.menuDiv = menuDiv;
                gridLayoutService.registerLayout(me.scope, me);

                me.element.find(".ht_clone_top").on("mousedown", function (e) {
                    if (e.button === 2) {
                        me.deselectCell();
                        if (me.__oldEditors && me.__oldEditors[0].state === "STATE_EDITING") {
                            me.__oldEditors[0]._finishEditing();
                        }
                    }
                });
            };

            /** 打开而局设置面板，点击表头设置图标调用 */
            HotTable.prototype._startSetting = function () {
                var me = this;
                if (me.scope.group) {
                    ColGroupSettings._startSetting(me);
                } else {
                    if (ColSettings.get) {
                        ColSettings.get()._startSetting(me);
                    } else {
                        ColSettings._startSetting(me);
                    }
                }
            };

            /**
             * 应用设置的布局
             * @param {Object[]} cols - 应用的 columns 集合
             * @param {boolean} [reloadData] - 是否需要重新请求数据
             * @param {number | string} [fixedColumns] - 固定列数
             */
            HotTable.prototype._enterCols = function (cols, reloadData, fixedColumns) {
                var me = this,
                    scope = me.scope,
                    columns = me.columns,
                    __originalCols = me.__originalCols;
                if (angular.isDefined(fixedColumns)) {
                    scope.fixedColumns = parseInt(fixedColumns) || 0;
                }
                if (!cols) {
                    cols = columns;
                } else if (scope.hasCheckboxColumn) {
                    cols.unshift(__originalCols[0]);
                }
                me.finishEdit();
                me._storeColumns(cols);
                me._setGroups();
                me.handsontable.updateSettings({
                    columns: me._getVisibleColumns(cols),
                    fixedColumnsLeft: me._toSettingsFixedColumns(scope.fixedColumns)
                });
                me._clearValidateInfo();
                me._delayApplyCachedFilters();
                if (reloadData && !scope.frontEndGroup) {
                    if (me.scope.group) {
                        me.dataSource.doRequestData(1, {groups: [_.first(me.groups)]});
                    }
                }
            };

            /** 更新分组头复选框的状态 */
            HotTable.prototype._updateGroupCheckBox = function () {
                var me = this;
                var scope = me.scope;
                if (me.hasGroup()) {
                    _.forEach(scope.checkedRows, function (record) {
                        var checked = record.$$checked;
                        me._toggleGroupParentsChecked(record, checked);
                    });
                }
            };

            /** 更新分组表格折叠状态 */
            HotTable.prototype._updateGroupFoldStatus = function () {
                if (!this.hasGroup()) {
                    return;
                }
                // console.trace('_updateGroupFoldStatus');
                var me = this;
                var scope = me.scope;
                var handsontable = me.handsontable;
                var physicalSourceInfo = scope.physicalSourceInfo;
                var parentsToCollapse = [];
                var plugin = handsontable.getPlugin('nestedRows');
                var collapsingUI = plugin.collapsingUI;
                _.forEach(physicalSourceInfo, function (info) {
                    if (info.isGroup && !info.isExpanded) {
                        parentsToCollapse.push(info.record);
                    }
                });
                collapsingUI.collapseMultipleChildren(parentsToCollapse);
                collapsingUI.renderAndAdjust();
            };

            /**
             * 更新分组的用户自定义汇总信息
             */
            HotTable.prototype._updateGroupSummary = function () {
                var me = this;
                var scope = me.scope,
                    physicalSourceInfo = scope.physicalSourceInfo,
                    trimRowsPlugin = me.handsontable.getPlugin("trimRows"),
                    trimmedRows = scope.groupTrimmedRows,
                    trimmedRecords = [];

                if (me.hasGroup() && scope.groupSummaryFunc) {
                    _.forEach(trimmedRows, function (row) {
                        var record = me.getPhysicalRecord(row);
                        trimmedRecords.push(record);
                    });
                    _.forEach(physicalSourceInfo, function (info) {
                        if (info.isGroup) {
                            var summaryObj = {}, allChildrenRecord = [];
                            _.forEach(info.record.__children, function (record) {
                                if (!record.__children) {
                                    if (!_.contains(trimmedRecords, record)) {
                                        allChildrenRecord.push(record);
                                    }
                                } else {
                                    allChildrenRecord.push(getChildrenRecords(record.__children));
                                }
                            });
                            summaryObj = scope.groupSummaryFunc(_.flatten(allChildrenRecord));
                            info.record = _.assign(info.record, summaryObj);
                        }
                    });
                }

                function getChildrenRecords(parentRecord) {
                    var childRecords = [];
                    _.forEach(parentRecord, function (record) {
                        if (!record.__children) {
                            if (!_.contains(trimmedRecords, record)) {
                                childRecords.push(record);
                            }
                        } else {
                            childRecords.push(getChildrenRecords(record.__children));
                        }
                    })
                    return childRecords;
                }
            }

            /**
             * 更新 columns 及 layoutSetting 数据
             * @param {Object[]} cols - 应用的 columns 集合
             */
            HotTable.prototype._storeColumns = function (cols) {
                var me = this;
                if (_.isUndefined(me.__originalCols)) {
                    me.__originalCols = me.columns;
                }
                me.columns = cols;
                me.layoutSetting = _.chain(cols)
                    .filter(function (col) {
                        return col && col.data !== '$$checked';
                    })
                    .map(function (col) {
                        return {
                            field: col.data,
                            group: col.group,
                            width: col.width
                        };
                    })
                    .value();
            };

            /**
             * 获取对应字段的排序方式
             * @param {string} field
             * @returns {Object} - {sortDirection: string; index: number;}
             */
            HotTable.prototype._getSortDirection = function (field) {
                var me = this;
                var sortName = me.sortName || [];
                var sortDirection = me.sortDirection || [];
                var fieldSortDirection;
                var fieldIndex = _.findIndex(sortName, function (name) {
                    return name === field;
                });
                fieldSortDirection = sortDirection[fieldIndex];
                if (!fieldSortDirection) {
                    return;
                }
                return {
                    sortDirection: fieldSortDirection,
                    index: fieldIndex
                };
            };

            /**
             * 执移动列前调用，返回 false 则取消移动
             * @param {number[]} columns - 要移动的列序号集合
             * @param {number} target - 目标序号
             * @returns {boolean} - 是否执行移动操作
             */
            HotTable.prototype._beforeColumnMove = function (froms, target) {
                var me = this;
                me.finishEdit();
                var groupFields = _.pluck(me.groups, 'property');
                var columns = me.columns;
                var preventColumnMove, fixedColCount, colsMoving, colsHead, colsTail;
                var targetColumn = columns[target];
                if (froms[0] === target || froms[0] + 1 === target) {
                    return false;
                }
                if (targetColumn && targetColumn.field === '$$checked' || targetColumn.operateColumn) {
                    return false;
                }
                _.find(froms, function (from) {
                    var column = columns[from];
                    if (!column || column.field === '$$checked' || column.operateColumn || _.contains(groupFields, column.field)) {
                        preventColumnMove = true;
                        return true;
                    }
                });
                if (!preventColumnMove) {
                    fixedColCount = groupFields.length + (me.scope.hasCheckboxColumn ? 1 : 0);
                    if (target < fixedColCount) {
                        preventColumnMove = true;
                    }
                }
                if (!preventColumnMove) {
                    colsMoving = _.map(froms, function (from) {
                        var column = columns[from];
                        columns[from] = null;
                        return column;
                    });
                    colsHead = _.head(columns, target);
                    colsTail = _.tail(columns, target);
                    me.columns = _.compact(colsHead.concat(colsMoving, colsTail));
                    $timeout(function () {
                        var columns = me.scope.hasCheckboxColumn ? _.tail(me.columns) : me.columns;
                        me._enterCols(columns);
                    });
                }
                return false;
            };

            /**
             * 初始化 source 信息，数据源返回数据时调用
             * physicalSourceInfo 为平行结构，保存对应行的 record, 树形结构信息, 分组结构信息，编辑前原始数据信息 等
             * @param {boolean} [isFetchAll] - 是否展开全部数据(分组表格)
             */
            HotTable.prototype._initPhysicalSourceInfo = function (isFetchAll) {
                var me = this;
                var scope = me.scope;
                var source = scope.source;
                if (scope.treeView) {
                    me._initTreePhysicalSourceInfo();
                } else if (scope.group) {
                    me._initGroupPhysicalSourceInfo(isFetchAll);
                } else {
                    scope.physicalSourceInfo = _.map(source, function (record) {
                        record.$$checked = false;
                        return {record: record};
                    });
                }
                if (scope.frontEndSort) {
                    scope._originalPhysicalSourceInfo = scope.physicalSourceInfo.concat();
                }
            };

            /** 初始化树形表格 source 信息  */
            HotTable.prototype._initTreePhysicalSourceInfo = function () {
                var me = this;
                var scope = me.scope;
                var source = scope.source;
                scope.physicalSourceInfo = [];
                var nextPaths = [0];
                pushNext();

                function pushNext() {
                    var record = getRecord(nextPaths);
                    var depth = nextPaths.length;
                    var parents;
                    if (record) {
                        parents = _.chain(nextPaths)
                            .head(depth - 1)
                            .map(function (parentLevelIndex, parentLevel) {
                                return _.find(scope.physicalSourceInfo, function (info) {
                                    return info.level === parentLevel && info.levelIndex === parentLevelIndex;
                                });
                            })
                            .value();
                        //record.$$checked = false;
                        scope.physicalSourceInfo.push({
                            record: record,
                            level: depth - 1,
                            levelIndex: _.last(nextPaths),
                            parents: parents
                        });
                        if (angular.isArray(record.__children) && record.__children.length) {
                            nextPaths.push(0);
                        } else {
                            nextPaths[depth - 1]++;
                        }
                    } else if (depth === 1) {
                        return;
                    } else {
                        nextPaths.pop();
                        nextPaths[depth - 2]++;
                    }
                    pushNext();
                }

                function getRecord(paths) {
                    var record;
                    try {
                        _.forEach(paths, function (path, i) {
                            if (i === 0) {
                                record = source[path];
                                return;
                            }
                            record = record['__children'][path];
                        });
                    } catch (e) {
                        record = null;
                    }
                    return record;
                }
            };

            /**
             * 分组表格是否有未展开的节点
             * @returns {}
             */
            HotTable.prototype._hasUnFetchedChildren = function () {
                var me = this;
                var sourceInfo = me.scope.physicalSourceInfo;
                var unfetchedInfo = _.find(sourceInfo, function (info) {
                    return info.isGroup && !info.isChildrenFetched;
                });
                return !!unfetchedInfo;
            };

            /**
             * 设置所有分组数据展开状态
             * @param {boolean} expand
             */
            HotTable.prototype._setAllGroupSourceInfoExpand = function (expand) {
                var me = this;
                var sourceInfo = me.scope.physicalSourceInfo;
                _.forEach(sourceInfo, function (info) {
                    if (info.isGroup) {
                        info.isExpanded = expand;
                    }
                });
            };

            /**
             * 查询全部数据(分组表格)
             */
            HotTable.prototype._groupFetchAll = function () {
                var me = this;
                var scope = me.scope;
                var dataSource = scope.dataSource;
                // dataSource.doRequestData(1, {groups: [_.first(me.groups)]});
                dataSource.doRequestData(1, {
                    groups: me.groups,
                    fetchAll: true
                });
            };

            /**
             * 验证数据是否为叶子节点(分组表格)
             * @param {Object} record
             * @returns {boolean}
             */
            HotTable.prototype._isLeaf = function (record) {
                var me = this;
                return !me.isGroupRecord(record);
            };

            /**
             * 验证数据是否为分组节点(分组表格)
             * @param {Object} record
             * @returns {boolean}
             */
            HotTable.prototype.isGroupRecord = function (record) {
                var me = this;
                var recordInfo = me._getPhysicalRecordInfo(record);
                return recordInfo && recordInfo.isGroup;
            };

            /**
             * 表格是否存在分组
             * @returns {boolean}
             */
            HotTable.prototype.hasGroup = function () {
                var me = this;
                var scope = me.scope;
                return scope.group && me.groups && me.groups.length;
            };

            /**
             * 某字段是否为分组字段
             * @param {string} field
             * @returns {boolean}
             */
            HotTable.prototype.isGroupField = function (field) {
                var me = this;
                var scope = me.scope;
                if (!scope.group) {
                    return false;
                }
                var groups = me.groups;
                return _.find(groups, function (group) {
                    return group['property'] === field;
                });
            };

            /**
             * 获取请求子集的分组参数，
             * @param {Object} parentRecord - 父记录
             */
            HotTable.prototype.getChildrenGroupParams = function (parentRecord) {
                var me = this;
                var parentRecordInfo = me._getPhysicalRecordInfo(parentRecord);
                var parentsInfo = (parentRecordInfo.parents || []).concat(parentRecordInfo);
                var groups = _.map(parentsInfo, function (info) {
                    var record = info.record;
                    var field = info.groupField;
                    return {
                        property: field,
                        value: record[field]
                    };
                });

                if (me.groups.length > parentsInfo.length) {
                    groups[parentsInfo.length] = me.groups[parentsInfo.length];
                }
                return groups;
            };

            /**
             * 获取数据的 nodeId (分组表格)
             * @param {Object} record
             * @returns {boolean}
             */
            HotTable.prototype._getNodeId = function (record) {
                try {
                    return this.dataSource.$id(record);
                } catch (e) {
                }
            };

            /**
             * 根据 nodeId 获取数据 (分组表格)
             * @param {string} nodeId
             * @returns {Object}
             */
            HotTable.prototype._getRecordByNodeId = function (nodeId) {
                var me = this;
                var ds = me.dataSource;
                var node, record;
                try {
                    node = ds.$node(nodeId);
                    record = node.origin;
                } catch (e) {
                }
                return record;
            };

            /** 是否被折叠隐藏的数据信息
             * @param {Object} recordGroupInfo
             */
            HotTable.prototype._isGroupHiddenRowInfo = function (recordGroupInfo) {
                return _.find(recordGroupInfo.parents, function (parentInfo) {
                    return !parentInfo.isExpanded;
                });
            };

            /**
             * 请求子数据
             * @param {string} nodeId
             */
            HotTable.prototype._fetchChildren = function (nodeId) {
                var me = this;
                var scope = me.scope;
                var ds = me.dataSource;
                var record = me._getRecordByNodeId(nodeId);
                var childrenGroupParams = me.getChildrenGroupParams(record);
                var parentGroupInfo = me._getPhysicalRecordInfo(record);
                var physicalRecordIndex;
                parentGroupInfo.isFetchingChildren = true;
                ds.fetchChildren(nodeId, childrenGroupParams, function (children) {
                    physicalRecordIndex = _.findIndex(scope.physicalSourceInfo, parentGroupInfo);
                    parentGroupInfo.isFetchingChildren = false;
                    parentGroupInfo.isChildrenFetched = true;
                    parentGroupInfo.isExpanded = true;

                    var trimRowsPlugin = scope.hotTable.handsontable.getPlugin("trimRows");
                    var trimRowInfos = [];
                    _.each(trimRowsPlugin.trimmedRows, function (row) {
                        trimRowInfos.push(scope.physicalSourceInfo[row]);
                    });
                    me._initChildrenGroupInfo(physicalRecordIndex, children);
                    me._appendChildren(physicalRecordIndex, children);
                    var trimRowIndexes = [];
                    _.each(trimRowInfos, function (rowInfo) {
                        trimRowIndexes.push(_.findIndex(scope.physicalSourceInfo, rowInfo));
                    });
                    trimRowsPlugin.untrimAll();
                    trimRowsPlugin.trimRows(trimRowIndexes);
                    $timeout(function () {
                        me.handsontable.render();
                    }, 50);
                });
            };

            /**
             * 初始始化子数据信息
             * @param {number} parentIndex - 父级数据序号(physicalRow)
             * @param {Object[]} - 子数据集合
             */
            HotTable.prototype._initChildrenGroupInfo = function (parentIndex, children) {
                var me = this;
                var groups = me.groups || [];
                var physicalSourceInfo = me.scope.physicalSourceInfo;
                var parentGroupInfo = physicalSourceInfo[parentIndex];
                var childrenLevel = parentGroupInfo.level + 1;
                var childrenGroupField = groups[childrenLevel];
                var physicalSourceInfoHead = _.head(physicalSourceInfo, parentIndex + 1);
                var physicalSourceInfoTail = _.tail(physicalSourceInfo, parentIndex + 1);
                var childrenGroupInfo = _.map(children, function (child, index) {
                    if (!childrenGroupField) {
                        return {
                            record: child,
                            level: childrenLevel,
                            levelIndex: index,
                            isGroup: false,
                            parents: parentGroupInfo.parents.concat(parentGroupInfo),
                        };
                    } else {
                        return {
                            record: child,
                            level: childrenLevel,
                            levelIndex: index,
                            isGroup: true,
                            parents: parentGroupInfo.parents.concat(parentGroupInfo),
                            groupField: childrenGroupField['property'],
                            isChildrenFetched: false,
                            isFetchingChildren: false,
                            isExpanded: false
                        };
                    }
                });
                me.scope.physicalSourceInfo = physicalSourceInfoHead.concat(childrenGroupInfo).concat(physicalSourceInfoTail);
                /*if (me.scope.frontEndSort) {
                    me.scope._originalGroupChildrenPhysicalSourceInfo = me.scope._originalGroupChildrenPhysicalSourceInfo || [];
                    var originalChildrenInfo = me.scope._originalGroupChildrenPhysicalSourceInfo[childrenLevel];
                    if (!me.scope._originalGroupChildrenPhysicalSourceInfo[childrenLevel]) {
                        me.scope._originalGroupChildrenPhysicalSourceInfo[childrenLevel] = originalChildrenInfo = [];
                    }
                    originalChildrenInfo.push({
                        childrenInfo: childrenGroupInfo.concat(),
                        parentInfo: parentGroupInfo
                    });
                }*/
                me._addOriginalGroupChildrenPhysicalSourceInfo(childrenLevel, parentGroupInfo, childrenGroupInfo);
            };

            HotTable.prototype._addOriginalGroupChildrenPhysicalSourceInfo = function (level, parentGroupInfo, childrenGroupInfo) {
                if (!this.scope.frontEndSort) return;
                var me = this;
                if (me.scope.frontEndSort) {
                    me.scope._originalGroupChildrenPhysicalSourceInfo = me.scope._originalGroupChildrenPhysicalSourceInfo || [];
                    var originalChildrenInfo = me.scope._originalGroupChildrenPhysicalSourceInfo[level];
                    if (!me.scope._originalGroupChildrenPhysicalSourceInfo[level]) {
                        me.scope._originalGroupChildrenPhysicalSourceInfo[level] = originalChildrenInfo = [];
                    }
                    originalChildrenInfo.push({
                        childrenInfo: childrenGroupInfo.concat(),
                        parentInfo: parentGroupInfo
                    });
                }
            };

            /**
             * 初始化所有原始子数据信息（前端分组&前端排序）
             */
            HotTable.prototype._initAllChildrenGroupInfo = function () {
                if (!(this.scope.frontEndGroup && this.scope.frontEndSort && this.groups && this.groups.length)) {
                    return;
                }
                var me = this;
                var scope = me.scope;
                var physicalSourceInfo = scope.physicalSourceInfo;
                var originalGroupChildrenPhysicalSourceInfo = [];
                _.forEach(physicalSourceInfo, function (info) {
                    var level = info.level;
                    var parentInfo = _.last(info.parents) || null;
                    var arr = originalGroupChildrenPhysicalSourceInfo[level];
                    if (!arr) {
                        arr = originalGroupChildrenPhysicalSourceInfo[level] = [];
                    }
                    var obj = _.last(arr);
                    if (!obj || obj.parentInfo !== parentInfo) {
                        obj = {
                            childrenInfo: [],
                            parentInfo: parentInfo
                        };
                        arr.push(obj);
                    }
                    obj.childrenInfo.push(info);
                });
                scope._originalGroupChildrenPhysicalSourceInfo = originalGroupChildrenPhysicalSourceInfo;
            };

            /**
             * 插入子数据到 source (__children 字段)
             * @param {number} parentIndex - 父级数据序号(physicalRow)
             * @param {Object[]} - 子数据集合
             */
            HotTable.prototype._appendChildren = function (parentIndex, children) {
                var me = this;
                var scope = me.scope;
                var physicalSourceInfo = scope.physicalSourceInfo;
                var parentRecord = physicalSourceInfo[parentIndex].record;
                var handsontable = me.handsontable;
                var plugin = handsontable.getPlugin('nestedRows');
                var dataManager = plugin.dataManager;
                if (scope.hasCheckboxColumn) {
                    _.forEach(children, function (child) {
                        child.$$checked = parentRecord.$$checked;
                    });
                    if (parentRecord.$$checked) scope.checkedRows = scope.checkedRows.concat(children);
                }
                parentRecord.__children = children;
                dataManager.rewriteCache();
                me._updateGroupFoldStatus();
                // handsontable.runHooks('afterUpdateSettings');
            };

            /** 初始化分组表格 source 信息  */
            HotTable.prototype._initGroupPhysicalSourceInfo = function (isFetchAll) {
                if (isFetchAll) {
                    this._initGroupFetchAllPhysicalSourceInfo();
                    return;
                }
                var me = this;
                var scope = me.scope;
                var source = scope.source;
                var groups = me.groups;
                var hasGroup = me.hasGroup();
                var physicalSourceInfo = _.map(source, function (record, index) {
                    record.$$checked = false;
                    if (!hasGroup) {
                        return {
                            record: record,
                            level: 0,
                            levelIndex: index,
                            isGroup: false,
                            parents: [],
                        };
                    }
                    record.__children = [];
                    return {
                        record: record,
                        level: 0,
                        levelIndex: index,
                        isGroup: true,
                        parents: [],
                        groupField: groups[0]['property'],
                        isChildrenFetched: false,
                        isFetchingChildren: false,
                        isExpanded: false
                    };
                });
                scope.physicalSourceInfo = physicalSourceInfo;
                me._addOriginalGroupChildrenPhysicalSourceInfo(0, null, physicalSourceInfo.concat());
            };

            /** 初始化展开全部的分组表格 source 信息 */
            HotTable.prototype._initGroupFetchAllPhysicalSourceInfo = function () {
                var me = this;
                var scope = me.scope;
                var source = scope.source;
                scope.physicalSourceInfo = [];
                var nextPaths = [0];
                var groups = me.groups;
                pushNext();

                function pushNext() {
                    var record = getRecord(nextPaths);
                    var depth = nextPaths.length;
                    var parents = [];
                    var curInfo, groupField;
                    if (record) {
                        _.chain(nextPaths)
                            .head(depth - 1)
                            .forEach(function (parentLevelIndex, parentLevel) {
                                _.findLastIndex(scope.physicalSourceInfo, function (info) {
                                    if (info.level === parentLevel && info.levelIndex === parentLevelIndex) {
                                        parents.push(info);
                                        return true;
                                    }
                                });
                            })
                            .value();
                        record.$$checked = false;
                        curInfo = {
                            record: record,
                            level: depth - 1,
                            levelIndex: _.last(nextPaths),
                            isGroup: false,
                            parents: parents,
                        };
                        try {
                            groupField = groups[curInfo.level]['property'];
                        } catch (e) {
                        }
                        if (groupField) {
                            curInfo.isGroup = true;
                            curInfo.groupField = groupField;
                            curInfo.isChildrenFetched = true;
                            curInfo.isFetchingChildren = false;
                            curInfo.isExpanded = true;
                        }
                        scope.physicalSourceInfo.push(curInfo);
                        if (angular.isArray(record.__children) && record.__children.length) {
                            nextPaths.push(0);
                        } else {
                            nextPaths[depth - 1]++;
                        }
                    } else if (depth === 1) {
                        return;
                    } else {
                        nextPaths.pop();
                        nextPaths[depth - 2]++;
                    }
                    pushNext();
                }

                function getRecord(paths) {
                    var record;
                    try {
                        _.forEach(paths, function (path, i) {
                            if (i === 0) {
                                record = source[path];
                                return;
                            }
                            record = record['__children'][path];
                        });
                    } catch (e) {
                        record = null;
                    }
                    return record;
                }
            };

            /**
             * 获取数据信息
             * @param {Object} record
             * @returns {Object}
             */
            HotTable.prototype._getPhysicalRecordInfo = function (record) {
                var me = this;
                var physicalSourceInfo = me.scope.physicalSourceInfo;
                return _.find(physicalSourceInfo, function (info) {
                    return info.record === record;
                });
            };

            /**
             * 获取第一个可编辑列
             */
            HotTable.prototype.getFirstEditableColumn = function () {
                var me = this;
                var columns = me.columns;
                return _.find(columns, function (column) {
                    return column.columnEditorTmpl;
                });
            };

            /**
             * 设置修改的数据原始信息
             * @param {Object} record - 当前数据对象
             * @param {Object} originalRecord - 原始数据的深拷贝对象
             * @param {string} field - 当前编辑的字段
             */
            HotTable.prototype._setModifiedRecordInfo = function (record, originalRecord, field) {
                var me = this;
                var recordInfo = me._getPhysicalRecordInfo(record);
                var newValue = record[field];
                var oldValue = originalRecord[field];
                if (!recordInfo || recordInfo.originalRecord || recordInfo.added) {
                    return;
                }
                if (!(
                    (isEmpty(newValue) && isEmpty(oldValue)) ||
                    ((angular.isDate(newValue) || angular.isDate(oldValue) || isStringDate(newValue) || isStringDate(oldValue)) && compareDate(newValue, oldValue)) ||
                    (String(newValue) === String(oldValue)) ||
                    ((_.isNumber(newValue) || _.isNumber(oldValue)) && Number(newValue) === Number(oldValue))
                )) {
                    recordInfo.originalRecord = originalRecord;
                }

                function isEmpty(val) {
                    return _.isNull(val) || _.isUndefined(val) || val === '';
                }

                function isStringDate(str) {
                    var timeRegExp = /(\d{4})-(\d{2})-(\d{2})?(.*)/;
                    if (!timeRegExp.test(str)) return false;
                    var year = RegExp.$1 - 0;
                    var month = RegExp.$2 - 1;
                    var date = RegExp.$3 - 0;
                    var obj = new Date(year, month, date);
                    return !!(obj.getFullYear() == year && obj.getMonth() == month && obj.getDate() == date);
                }

                function compareDate(left, right) {
                    var leftDate = angular.isDate(left) ? left : dateParser(left);
                    var rightDate = angular.isDate(right) ? right : dateParser(right);
                    leftDate.setMilliseconds(0);
                    rightDate.setMilliseconds(0);
                    return leftDate.getTime() === rightDate.getTime();
                }

                function dateParser(value) {
                    var timeRegExp = /(\d{4})-(\d{2})-(\d{2})?(.*)/;
                    var currentDate, dateInfos, day, hour, minute, month, timeInfos, timeStr, year;
                    currentDate = new Date();
                    if (!value) {
                        value = '';
                    }
                    dateInfos = value.match(timeRegExp);
                    if (dateInfos === null) {
                        dateInfos = value.match(/(\d{4})-(\d{2})?(.*)/);
                        if (dateInfos === null) {
                            dateInfos = value.match(/(\d{4})?(.*)/);
                            if (dateInfos === null) {
                                return currentDate;
                            } else {
                                year = dateInfos[1];
                            }
                        } else {
                            year = dateInfos[1];
                            month = dateInfos[2];
                        }
                    } else {
                        year = dateInfos[1];
                        month = dateInfos[2];
                        day = dateInfos[3];
                        timeStr = dateInfos[4];
                        if (dateInfos.length > 3 && timeStr && timeStr.indexOf("T") >= 0) {
                            return new Date(value);
                        }
                    }
                    year = parseInt(year, 10);
                    month = parseInt(month, 10) - 1;
                    day = parseInt(day, 10);
                    if (!isNaN(year)) {
                        currentDate.setFullYear(year);
                    }

                    if (!isNaN(day)) {
                        currentDate.setDate(day);
                    }
                    if (!isNaN(month)) {
                        currentDate.setMonth(month);
                    }
                    //再次赋值，防止日期天数超出造成天数不正常
                    if (!isNaN(day)) {
                        currentDate.setDate(day);
                    }

                    if (timeStr) {
                        timeInfos = timeStr.split(":");
                        hour = timeInfos[0];
                        minute = timeInfos[1];
                        if (hour) {
                            hour = parseInt(hour);
                            if (!isNaN(hour)) {
                                currentDate.setHours(hour);
                            }
                        } else {
                            currentDate.setHours(0);
                        }
                        if (minute) {
                            minute = parseInt(minute);
                            if (!isNaN(minute)) {
                                currentDate.setMinutes(minute);
                            }
                        } else {
                            currentDate.setMinutes(0);
                        }
                        currentDate.setSeconds(0);
                    } else {
                        currentDate.setHours(0);
                        currentDate.setMinutes(0);
                        currentDate.setSeconds(0);
                        currentDate.setMilliseconds(0);
                    }
                    return currentDate;
                }
            };

            /** 清除校验提示 */
            HotTable.prototype.clearValidateTips = function () {
                var me = this;
                var physicalSourceInfo = me.scope.physicalSourceInfo;
                var handsontable = me.handsontable;
                var plugin = handsontable.getPlugin('comments');
                _.forEach(physicalSourceInfo, function (info, physicalRow) {
                    var visualRow = handsontable.toVisualRow(physicalRow);
                    _.forEach(info.invalidCells, function (field) {
                        var visualCol = handsontable.propToCol(field);
                        handsontable.setCellMeta(visualRow, visualCol, 'valid', true);
                        plugin.removeCommentAtCell(visualRow, visualCol);
                    });
                    delete info.invalidCells;
                });
            };

            /** 清除 physicalSourceInfo 中的校验信息 */
            HotTable.prototype._clearValidateInfo = function () {
                var me = this;
                var physicalSourceInfo = me.scope.physicalSourceInfo;
                _.forEach(physicalSourceInfo, function (info) {
                    delete info.invalidCells;
                });
            };

            /** 创建校验表单 */
            HotTable.prototype._createValidateForm = function () {
                var me = this;
                var scope = me.scope;
                me.formName = 'grid' + me.hash + 'form';
                var $form = angular.element('<form>', {
                    class: 'ht-validate-form',
                    name: me.formName,
                    'g-validator': scope.validatorName,
                    'validator-config-key': scope.validatorConfigKey,
                    'data-invalid-msg': 'tooltipMessenger',
                    'onsubmit': 'return false'
                });
                $(me.handsontable.rootElement).append($form);
                $compile($form)(scope);
                me.$form = $form;
                me.formController = $form.data('$formController');
                me.gValidatorController = $form.data('$gValidatorController');
                me._createValidateEditor();
                ValidationHolder.loadI18ns(me.gValidatorController.$currentGroupName, function (i18n) {
                    me.validatorTips = i18n;
                }, scope.validatorConfigKey);
                ValidationHolder.loadRules(me.gValidatorController.$currentGroupName, function (rules) {
                    me.validatorRules = rules;
                }, scope.validatorConfigKey);
            };

            /** 创建校验表单 */
            HotTable.prototype._createValidateEditor = function () {
                var me = this;
                var $form = me.$form;
                var columns = me.__originalCols.concat(me.scope.hiddenColumns);

                var $row = angular.element('<div>');
                var source = me.getPhysicalSource();
                me.$formRow = $row;
                me.$formInput = $([]);
                me.__formCompiled = false;
                _.chain(columns)
                    .filter(function (column) {
                        return column.columnEditorTmpl || column.tmpl;
                    })
                    .forEach(function (column) {
                        var columnEditor = angular.element(column.columnEditorTmpl).filter('[ng-model]');
                        if (columnEditor.length === 0 && column.tmpl) columnEditor = angular.element(column.tmpl).find("input").filter('[ng-model]');
                        columnEditor.each(function (i, el) {
                            var $el = $(el);
                            var originNgModel = $el.attr('ng-model');
                            var name = $el.attr('name') || column.field;
                            var ngModel, $input;
                            if (angular.isUndefined(column._validatorName) || column._validatorName == null
                                || column._validatorName.indexOf(name) === -1) {
                                column._validatorName = name;
                            }
                            if (!/^editingRecord\./.test(originNgModel)) {
                                if (/^row\./.test(originNgModel)) {
                                    ngModel = originNgModel.replace(/^row\./, 'editingRecord.');
                                } else {
                                    ngModel = 'editingRecord.' + originNgModel;
                                }
                            } else {
                                ngModel = originNgModel;
                            }
                            $input = angular.element('<input>');
                            $input.attr('ng-model', ngModel);
                            $input.attr('name', name);
                            $input.attr('g-field-validator', '');
                            $input.data('$formController', me.formController);
                            $input.data('$gValidatorController', me.gValidatorController);
                            $input.data('$dataSource', source);
                            $input.data('field', column.field);
                            me.$formInput = me.$formInput.add($input);
                            $row.append('<label>' + column.text + '</label>');
                            $row.append($input);
                        });
                    });
                $form.append($row);
            };

            /** 获取校验提示 */
            HotTable.prototype._getValidateTips = function (errors, validateName) {
                var me = this;
                var validatorTips = me.validatorTips;
                var validatorRules = me.validatorRules;
                var tips = [];
                _.forEach(errors, function (v, k) {
                    var tip;
                    var rule;
                    if (v) {
                        rule = _.find(validatorRules, function (r) {
                            if (r.listenProperties && !r.properties) r.properties = r.listenProperties;
                            return r.ruleName === k
                                && (
                                    (r.property === validateName)
                                    || (r.properties && _.contains(r.properties, validateName))
                                );
                        });
                        if (rule) {
                            tip = validatorTips[rule.message];
                        }
                        if (!tip) {
                            tip = '校验未通过';
                        }
                        tips.push(tip);
                    }
                });
                return tips;
            };

            /**
             * 设置固定列数
             * @param {number} count - 固定列数
             */
            HotTable.prototype.setFixedColumns = function (count) {
                var me = this;
                var handsontable = me.handsontable;
                var scope = me.scope;
                count = count || 0;
                if (count < 0) {
                    count = 0;
                }
                if (count === scope.fixedColumns) {
                    return;
                }
                scope.fixedColumns = count;
                handsontable.updateSettings({fixedColumnsLeft: me._toSettingsFixedColumns(count)});
            };

            /**
             * 把固定列数转换为 Handsontable 设置的列数
             */
            HotTable.prototype._toSettingsFixedColumns = function (fixedColumns) {
                var me = this;
                var scope = me.scope;
                var count = fixedColumns || 0;
                if (count < 0) {
                    count = 0;
                }
                if (scope.hasCheckboxColumn) {
                    count++;
                }
                return count;
            };

            /**
             * 应用过滤
             * @returns {Promise}
             */
            HotTable.prototype._applyFilters = function () {
                if (!this.scope.showFilters) {
                    return;
                }
                var me = this;
                var filtersPlugin = me.handsontable.getPlugin('filters');
                var deferred = $q.defer();
                me.finishEdit()
                    .then(function () {
                        me._doFilter = true;
                        filtersPlugin.filter();
                        _.forEach(filtersPlugin.formulaCollection.orderStack, function (col) {
                            // filtersPlugin.lastSelectedColumn = {
                            //     physicalIndex: col,
                            //     visualIndex: col
                            // };
                            filtersPlugin.updateValueComponentFormula(col);
                        });
                        deferred.resolve();
                    });
                return deferred.promise;
            };

            /**
             * 应用缓存的过滤条件
             * @returns {Promise}
             */
            HotTable.prototype._applyCachedFilters = function () {
                var me = this;
                var cachedFilters = me._cachedFilters;
                var filtersPlugin = me.handsontable.getPlugin('filters');
                var formulaCollection = filtersPlugin.formulaCollection;
                var deferred = $q.defer();
                if (/* !cachedFilters.length ||  */!this.scope.showFilters) {
                    deferred.resolve();
                    return deferred.promise;
                }
                formulaCollection.clean();
                _.forEach(cachedFilters, function (obj) {
                    var field = obj.field;
                    var formula = obj.formula;
                    var col = me.handsontable.propToCol(field);
                    if (angular.isNumber(col)) {
                        formulaCollection.formulas[col] = formula;
                        formulaCollection.orderStack.push(col);
                    }
                });
                me._cachedFilters = [];
                me._applyFilters()
                    .then(function () {
                        deferred.resolve();
                    });
                return deferred.promise;
            };

            /**
             * 延迟执行 _applyCachedFilters, 一次同步代码中多次调用此方法只会实际执行一次 _applyCachedFilters
             * @returns {Promise}
             */
            HotTable.prototype._delayApplyCachedFilters = function () {
                var me = this;
                var deferred = $q.defer();
                if (!me.scope.showFilters) {
                    deferred.resolve();
                    return deferred.promise;
                }
                me.__willApplyCachedFilters = true;
                $timeout(function () {
                    if (me.__willApplyCachedFilters) {
                        me._applyCachedFilters()
                            .then(function () {
                                deferred.resolve();
                            });
                        me.__willApplyCachedFilters = false;
                    } else {
                        deferred.resolve();
                    }
                });
                return deferred.promise;
            };

            /**
             * 切换分组表格子数据勾选状态
             * @param {Object} record
             * @param {boolean} checked
             */
            HotTable.prototype._toggleGroupChildrenChecked = function (record, checked, forceRender) {
                var me = this;
                var scope = me.scope;
                var physicalSourceInfo = scope.physicalSourceInfo;
                var parentRecordInfo = me._getPhysicalRecordInfo(record);
                if (checked) {
                    _.forEach(physicalSourceInfo, function (info, i) {
                        if (_.contains(info.parents, parentRecordInfo) && !me.handsontable.runHooks("isFilter", i)) {
                            info.record.$$checked = checked;
                            if (checked) scope.checkedRows = scope.checkedRows.concat(info.record);
                            else scope.checkedRows = _.without(scope.checkedRows, info.record);
                        }
                    });
                } else {
                    var children = parentRecordInfo.record.__children || [];
                    _.forEach(children, function (childrenRecord) {
                        childrenRecord.$$checked = false;
                        scope.checkedRows = _.without(scope.checkedRows, childrenRecord);
                    });
                }
                if (forceRender !== false) me.handsontable.render();
            };

            /**
             * 切换分组表格父数据勾选状态
             * @param {Object} record
             * @param {boolean} checked
             */
            HotTable.prototype._toggleGroupParentsChecked = function (record, checked) {
                var me = this;
                var scope = me.scope;
                var recordInfo = me._getPhysicalRecordInfo(record);
                var parentsInfo = recordInfo.parents;
                var needRender = false;
                for (var len = parentsInfo.length, i = len - 1; i >= 0; i--) {
                    var parentInfo = parentsInfo[i];
                    if (!checked) {
                        if (parentInfo.record.$$checked) {
                            needRender = true;
                            scope.checkedRows = _.without(scope.checkedRows, parentInfo.record);
                        }
                        parentInfo.record.$$checked = false;
                    } else {
                        var allChildrenChecked = me._isAllGroupChildrenChecked(parentInfo);
                        if (allChildrenChecked) {
                            if (!parentInfo.record.$$checked) {
                                needRender = true;
                                scope.checkedRows = scope.checkedRows.concat(parentInfo.record);
                            }
                            parentInfo.record.$$checked = true;
                        } else {
                            if (parentInfo.record.$$checked) {
                                needRender = true;
                                scope.checkedRows = _.without(scope.checkedRows, parentInfo.record);
                            }
                            parentInfo.record.$$checked = false;
                            break;
                        }
                    }
                }
                if (needRender) {
                    me.handsontable.render();
                }
            };

            /**
             * 是否所有子数据都是勾选状态
             * @param {Object} parentInfo
             * @returns {boolean}
             */
            HotTable.prototype._isAllGroupChildrenChecked = function (parentInfo) {
                var me = this;
                var scope = me.scope;

                var trimmedRecords = [];
                var trimRowsPlugin = me.handsontable.getPlugin('trimRows');
                var trimmedRows = trimRowsPlugin ? trimRowsPlugin.trimmedRows : [];
                _.forEach(trimmedRows, function (row) {
                    var record = me.getPhysicalRecord(row);
                    trimmedRecords.push(record);
                });

                var physicalSourceInfo = scope.physicalSourceInfo;
                var unCheckedChildrenInfo = _.chain(physicalSourceInfo)
                    .filter(function (info) {
                        return _.contains(info.parents, parentInfo);
                    })
                    .find(function (info) {
                        return !info.record.$$checked && !_.contains(trimmedRecords, info.record);
                    })
                    .value();

                return !unCheckedChildrenInfo;
            };

            HotTable.prototype._updateIsAllChecked = function (event) {
                var me = this;
                var scope = me.scope;
                var trimRowsPlugin = me.handsontable.getPlugin('trimRows');
                var trimmedRows = trimRowsPlugin.trimmedRows;
                var physicalSourceInfo = scope.physicalSourceInfo;
                var isAllChecked = true;
                var summaryRows = _.filter(physicalSourceInfo, function (info) {
                    return info.record.__SUMMARY_ROW;
                });
                if (trimmedRows.length >= physicalSourceInfo.length - summaryRows.length) {
                    isAllChecked = false;
                } else {
                    _.find(physicalSourceInfo, function (info, index) {
                        var physicalRow = me.handsontable.toPhysicalRow(index);
                        if (!me._isSummaryRow(info.record) && !_.contains(trimmedRows, index)) {
                            if (!info.record.$$checked) {
                                isAllChecked = false;
                                return true;
                            }
                        }
                    });
                }
                scope.isAllChecked = isAllChecked;
                me.element.find('.ht-check-all').prop('checked', scope.isAllChecked);
            };

            /* 占位方法 */
            HotTable.prototype._reset = function () {
            };
            HotTable.prototype._clearFilter = function () {
            };
            HotTable.prototype._restColSettingsBtn = function () {
            };
            HotTable.prototype._render = function () {
            };
            HotTable.prototype._reRenderRow = function () {
                this.handsontable.render();
            };

            /**
             * 执行前端分组操作，返回分组后的数据集
             * @param {object[]} [originalRecords] 原始数据集，默认取 scope._originalFrontEndGroupRecords
             * @param {object[]} [groups] 分组字段数组，默认为 grid.groups
             * @returns {object[]}
             */
            HotTable.prototype._doFrontEndGroup = function (originalRecords, groups, applyCachedFilters) {
                var me = this;
                var scope = me.scope;
                var groupedRecords = [];
                var sortNames = me.sortName || [];
                var sortDirections = me.sortDirection || [];
                var sortFunc = me._createSortFunc(sortNames, sortDirections);
                var length;
                me._takeSnapshot();
                scope.checkedRows = [];
                scope.selectedRow = null;
                scope.isAllChecked = false;
                me.handsontable.deselectCell();
                originalRecords = originalRecords || scope._originalFrontEndGroupRecords || [];
                scope._originalFrontEndGroupRecords = originalRecords;
                originalRecords.sort(sortFunc);
                originalRecords = _.map(originalRecords, function (record) {
                    record.$$checked = false;
                    return record;
                });
                groups = groups || me.groups || [];
                me.groups = groups;
                if (applyCachedFilters === undefined) {
                    applyCachedFilters = true;
                }
                length = groups.length;
                if (!groups.length) {
                    groupedRecords = originalRecords.concat();
                    scope.physicalSourceInfo = _.map(groupedRecords, function (record, index) {
                        return {
                            record: record,
                            level: 0,
                            levelIndex: index,
                            isGroup: false,
                            parents: [],
                        };
                    });
                    if (scope.frontEndSort) {
                        scope._originalPhysicalSourceInfo = scope.physicalSourceInfo.concat();
                    }
                    scope.source = groupedRecords;
                    render();
                    return groupedRecords;
                }
                scope.physicalSourceInfo = [];
                var groupedByRecords = _.groupBy(originalRecords, function (record) {
                    var keyArr = _.map(groups, function (groupObj) {
                        var value = record[groupObj.property];
                        return value;
                    });
                    var key = JSON.stringify(keyArr);
                    return key;
                });
                _.forEach(groupedByRecords, function (v, k) {
                    var keyArr = JSON.parse(k);
                    var parent = groupedRecords;
                    var summaryObj = {};
                    _.forEach(keyArr, function (fieldValue, groupLevel) {
                        var field = groups[groupLevel]['property'];
                        var parentRecord = _.find(parent, function (record) {
                            return record[field] === fieldValue;
                        });

                        if (!parentRecord) {
                            parentRecord = {
                                __children: [],
                                rowStatus: 2
                            };
                            if (scope.groupSummaryFunc) {
                                summaryObj = scope.groupSummaryFunc(getAllChildrenRecords(keyArr, groupLevel));
                                parentRecord = _.assign(parentRecord, summaryObj);
                            }
                            parentRecord[field] = fieldValue;
                            parent.push(parentRecord);
                        }
                        if (groupLevel === length - 1) {
                            parentRecord.__children = v;
                        } else {
                            parent = parentRecord.__children;
                        }
                    });
                });
                scope.source = groupedRecords;
                me._initGroupFetchAllPhysicalSourceInfo();
                me._initAllChildrenGroupInfo();
                render();
                return groupedRecords;

                function render() {
                    me.handsontable.loadData(scope.source);
                    if (scope.frontEndSort) {
                        me._doFrontEndSort(false);
                    }
                    me.handsontable.runHooks('afterUpdateSettings');
                    me._delayApplyCachedFilters()
                        .then(function () {
                            me.foldAll();
                            me._removeSnapshot();
                        });
                }

                function getAllChildrenRecords(keyArr, groupLevel) {
                    var ret = [];
                    _.forEach(groupedByRecords, function (v, k) {
                        var kArr = JSON.parse(k);
                        var b = true;
                        for (var i = 0; i <= groupLevel; i++) {
                            if (keyArr[i] !== kArr[i]) {
                                b = false;
                                break;
                            }
                        }
                        if (b) {
                            ret = ret.concat(v);
                        }
                    });
                    return ret;
                }
            };

            /**
             * 障眼法，执行操作（如：前端分组）中间产生数据上的差异，做一个遮挡动作，避免视觉产生歧义。
             */
            HotTable.prototype._takeSnapshot = function () {
                var me = this;
                if (me._elementClone) {
                    return;
                }
                if (!me._scrollElement) {
                    me._scrollElement = me.element.find('.ht_master .wtHolder');
                }
                me._elementClone = me.element.clone()
                    .removeClass('on-moving--columns')
                    .css({position: 'absolute', top: 0, left: 0, zIndex: 110});
                var scrollElementClone = me._elementClone.find('.ht_master .wtHolder');
                me.element.parent().css({position: 'relative'}).append(me._elementClone);
                me._elementClone.find('.ht_clone_top .wtHolder').hide();
                scrollElementClone.scrollLeft(me._scrollElement.scrollLeft());
                scrollElementClone.scrollTop(me._scrollElement.scrollTop());
            };

            HotTable.prototype._removeSnapshot = function () {
                var me = this;
                if (!me._elementClone) {
                    return;
                }
                me.element.parent().css({position: 'static'});
                me._elementClone.remove();
                me._elementClone = null;
            };

            HotTable.prototype._getClassName = function (physicalRow, col) {
                var me = this,
                    scope = me.scope,
                    column = me.columns[col],
                    sourceInfo = scope.physicalSourceInfo[physicalRow];

                var getFunc = function (key) {
                    if (!me.classParse) me.classParse = {};
                    if (!me.classParse[key]) me.classParse[key] = $parse(key, scope);
                    return me.classParse[key];
                };

                if (column && sourceInfo && (scope.cssClass || column.cssClass)) {
                    var resultClass = "", tmpClass = "";
                    if (scope.cssClass) tmpClass = getFunc(scope.cssClass)(scope.$parent, {row: sourceInfo.record});
                    resultClass = tmpClass || "";
                    if (column.cssClass) {
                        tmpClass = getFunc(column.cssClass)(scope.$parent, {row: sourceInfo.record});
                        if (tmpClass) {
                            if (resultClass) resultClass += " ";
                            resultClass += tmpClass;
                        }
                    }
                    return resultClass;
                }
                return false;
            };

            HotTable.prototype._getCloneScope = function (physicalRow) {
                if (!this.tmpScopeList) this.tmpScopeList = {};
                if (!this.tmpScopeList[physicalRow]) {
                    this.tmpScopeList[physicalRow] = this.scope.$parent.$new(false);
                    this.tmpScopeList[physicalRow].grid = this;
                    this.tmpScopeList[physicalRow].rowIndex = physicalRow;
                }
                this.tmpScopeList[physicalRow].row = this.scope.source[physicalRow];
                this.tmpScopeList[physicalRow].record = this.scope.source[physicalRow];
                return this.tmpScopeList[physicalRow];
            };

            HotTable.prototype._destroyCloneScope = function () {
                if (!this.tmpScopeList) return;
                _.each(this.tmpScopeList, function (tmpScope) {
                    tmpScope.$destroy();
                });
                this.tmpScopeList = {};
            };

            HotTable.prototype._applyCloneScope = function () {
                if (!this.tmpScopeList) return;
                var me = this;
                _.each(me.tmpScopeList, function (tmpScope) {
                    //if (!(tmpScope.$$phase || tmpScope.$root.$$phase)) {
                    tmpScope.$apply();
                    //}
                });
            };

            HotTable.prototype._getColumnTmplCompile = function (column) {
                if (!this._columnCompileList) this._columnCompileList = {};
                if (!this._columnCompileList[column.field]) {
                    this._columnCompileList[column.field] = $compile(column.tmpl);
                }
                return this._columnCompileList[column.field];
            };

            HotTable.prototype._getValidateColumns = function () {
                var me = this,
                    columns = me.columns,
                    resultColumns = _.filter(columns, function (column) {
                        return column._validatorName;
                    });

                return resultColumns;
            };

            HotTable.prototype._isSummaryRow = function (record) {
                return record && !!record.__SUMMARY_ROW;
            };

            HotTable.prototype._startView = function () {
                var html = "",
                    columns = this.columns,
                    scope = this.scope,
                    firstColIndex = scope.hasCheckboxColumn ? 1 : 0;

                //html += '<div class="hot-table grid-00W ht-has-index ht-has-checkbox ht__manualColumnMove htMiddle handsontable htRowHeaders htColumnHeaders">';
                html += '<div class="ht_master handsontable innerBorderTop emptyRows" style="position: relative;">';
                html += '<div class="wtHolder" style="position: relative; height: ' + scope.height + 'px;">';
                html += '<div class="wtHider" style="">';
                html += '<div class="wtSpreader" style="position: relative; left: 0px;">';
                html += '<table class="htCore" style="position: relative; top: 0;">'
                html += '<colgroup>';
                html += '<col class="rowHeader" style="width: 50px;">'
                _.each(columns, function (column) {
                    html += '<col style="width: ' + (column.defWidth || column.width || 100) + 'px;">';
                });
                html += '</colgroup>';
                html += '<thead>';
                html += '<tr>';
                html += '<th><div class="relative"><span class="colHeader cornerHeader"></span></div></th>';
                _.each(columns, function (column, i) {
                    html += '<th><div class="relative">\n';
                    if (column.data !== "$$checked" && scope.showFilters) {
                        html += '<button class="changeType"></button>\n';
                    }
                    html += '<span class="colHeader">\n';
                    if (column.data === "$$checked") {
                        html += '<input type="checkbox" class="ht-check-all">';
                    } else {
                        if (column._sortable) {
                            html += '<div class="grid-head-sort" data-field="orderDate">\n' +
                                '<button class="btn sort-btn sort-up">\n' +
                                '<span class="caret caret-up sort-up"></span>\n' +
                                '</button>\n' +
                                '<button class="btn sort-btn sort-down">\n' +
                                '<span class="caret caret-down sort-down"></span>\n' +
                                '</button>\n' +
                                '</div> \n';
                        }
                        html += '<span class="ht-column-title-text" title="' + column.text + '">' + column.text + '</span> \n';
                    }


                    if (scope.colSettingsKey && i === firstColIndex)
                        html += '<i class="iconfont2 fi-set ht-set-btn"></i></span>\n';
                    html += '</div></th>';
                });
                html += '</tr></thead><tbody></tbody></table>';
                html += '</div></div></div></div>';
                this.element.append(html);
                this.element.addClass("handsontable");
                this.element.height(500);
            };

            /**
             * 获取合计数据（后端 )
             * @returns {Promise<any>}
             * */
            HotTable.prototype._getSummary = function () {
                var me = this;
                var scope = me.scope;
                var summaryUrl = scope.summaryUrl;
                var summaryProp = scope.summaryProp || 'summary';
                var params;
                if (!summaryUrl) {
                    return $q.reject('未配置 summary-url.');
                }
                params = scope.summaryParams && scope.summaryParams();
                return $http({
                    method: 'POST',
                    url: summaryUrl,
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                        }
                        return str.join('&')
                    }
                }).then(function (data) {
                    var summary = _.getValue(data.data, summaryProp);
                    if (summary) {
                        return summary;
                    }
                    return $q.reject(data);
                });
            };

            /**
             * 获取合计数据并渲染到表格
             * @returns {Promise<any>}
             */
            HotTable.prototype.renderSummary = function () {
                var me = this;
                return me._getSummary()
                    .then(function (data) {
                        me.scope.__summaryRecord = data;
                        var columnSummaryPlugin = me.handsontable.getPlugin('columnSummary');
                        columnSummaryPlugin.endpoints.refreshAllEndpoints();
                    });
            };

            HotTable.prototype.resetSummary = function () {
                var me = this;
                me.scope.__summaryRecord = null;
                var columnSummaryPlugin = me.handsontable.getPlugin('columnSummary');
                columnSummaryPlugin.endpoints.refreshAllEndpoints();
            }

            return {
                template: '<div class="hot-table"></div>',
                replace: true,
                restrict: 'E',
                transclude: false,
                scope: {
                    sourceName: '@',
                    validatorName: '@',
                    validatorConfigKey: '@',
                    colSettingsKey: '@',
                    checkedRows: '=?',
                    selectedRow: '=?',
                    nls: '=?',
                    onRowDbclick: '&',
                    onRowClick: '&',
                    onLoadSuccess: '&',
                    onCheckAll: '&',
                    onCheck: '&',
                    onRender: '&',
                    onCellSwitching: '&',
                    stretch: '@',
                    groupSummaryFunc: '=?',
                    cssClass: '@',
                    onAfterFilter: '&',
                    onBeforeColumnSort: '&',
                    onAfterSelect: '&',
                    dataInvalidMsg: '=?',
                    summaryUrl: '@', // 获取后端合计的 url
                    summaryParams: '=?', // 拼接合计查询参数的方法
                    summaryProp: '@', // 后端合计返回数据的字段
                    summaryInterval: '=?', // 表格加载数据后，获取后端合计延时毫秒数，默认 2000
                    summaryPos: '@',
                    templateCompile: '@'
                },
                compile: function (tElement) {
                    return function (scope, element, attrs, controller) {
                        var hotTable = controller;
                        //console.log(hotTable);
                        $(element).data("__SCOPE", scope);
                        scope.instance = hotTable;
                        scope.grid = hotTable;
                        scope.element = element;
                        scope.attrs = attrs;
                        scope.source = [];
                        scope.physicalSourceInfo = [];
                        scope.checkedRows = [];
                        scope.isAllChecked = false;
                        scope.showFilters = attrs.filters === 'true';
                        scope.treeView = attrs.treeView === 'true';
                        scope.hiddenColumns = [];
                        scope.dragCheck = attrs.dragCheck === 'true';
                        scope.bindIndex = attrs.bindIndex === 'true';
                        scope.group = attrs.group === 'true';
                        scope.enableEvenClass = attrs.enableEvenClass === 'true';
                        scope.validateOnChangeEditingRow = angular.isDefined(attrs.validateOnChangeEditingRow);
                        scope.validateOnChangeEditingCell = angular.isDefined(attrs.validateOnChangeEditingCell);
                        scope.editorTabInOneRow = angular.isDefined(attrs.editorTabInOneRow);
                        scope.fixedColumns = parseInt(attrs.fixedColumns) || 0;
                        scope.filtersHeight = parseInt(attrs.filtersHeight) || (config.controls.handsontable && config.controls.handsontable.filters_height ? config.controls.handsontable.filters_height : null);
                        scope.filtersWidth = parseInt(attrs.filtersWidth) || (config.controls.handsontable && config.controls.handsontable.filters_width ? config.controls.handsontable.filters_width : null);
                        scope.allowPaste = attrs.allowPaste === 'true' || (config.controls.handsontable && config.controls.handsontable.allowPaste === true);
                        scope.copyType = attrs.copyType === 'code' ? 'code' : 'name';
                        scope.lastSelectedRowIndex = -1;
                        scope.lastSelectedColumnIndex = -1;
                        scope.columnValueCache = {};
                        scope.columnCompileFunc = {};
                        if (scope.group) {
                            scope.treeView = false;
                            element.addClass('ht-group-table');
                            scope.frontEndGroup = attrs.frontEndGroup === 'true';
                        }
                        if (scope.treeView) {
                            element.addClass('ht-tree-table');
                        }
                        hotTable._getColumns(tElement);
                        if (scope.sortable) {
                            scope.frontEndSort = attrs.frontEndSort === 'true';
                        }
                        //if (scope.hasIndexColumn) {}
                        element.addClass('ht-has-index');
                        if (scope.hasCheckboxColumn) {
                            element.addClass('ht-has-checkbox');
                        }

                        //监听筛选器
                        scope._firstFilterChange = true;
                        scope.$watch('filter', function (newFilters, oldFilters) {
                            var dataSource = scope.dataSource,
                                params = {
                                    filterName: [],
                                    filterValue: []
                                };
                            if (dataSource) {
                                _.each(newFilters, function (filterVal, filterName) {
                                    if (filterVal === 0 || !!filterVal) {
                                        params.filterName.push(filterName);
                                        params.filterValue.push(filterVal);
                                    }
                                });
                                scope.dataSource.extraParams = _.extendOwn(params, _.omit(dataSource.extraParams, 'filterName', 'filterValue'));
                                if (!dataSource.allowAutoLoad && !scope._firstFilterChange) {
                                    dataSource.doRequestData();
                                }
                            }
                            delete scope._firstFilterChange;
                        }, true);

                        hotTable._applyLocalStorageLayout();
                        hotTable._loadAndReSortHeadersIfStored();
                        hotTable._startView();
                        if (scope.group) {
                            scope.dataSource = hotTable.dataSource = GroupDataSources.get(attrs.sourceName);
                            if (scope.frontEndGroup) {
                                scope.dataSource.frontEndGroup = true;
                            }
                        } else {
                            $dataSourceManager.getDataSource(attrs.sourceName).then(function (result) {
                                scope.dataSource = result;
                                if (scope.colSettingsKey && scope.colSettingsKey.length > 0) {
                                    scope.dataSource.sortName = hotTable.sortName;
                                    scope.dataSource.sortDirection = hotTable.sortDirection;
                                }
                            });
                        }

                        scope.$on(scope.sourceName, function (event, result) {
                            if (hotTable.handsontable) {
                                hotTable._loadData(result, event);
                            } else {
                                setTimeout(function () {
                                    hotTable._loadData(result, event);
                                }, 110);
                            }
                        });


                        setTimeout(function () {
                            scope.height = parseInt(attrs.height) || element.parent().height();
                            scope.width = parseInt(attrs.width) || element.parent().width();
                            //采用cellProperties.renderer，第一次渲染，只有第一行会进入renderer
                            _.each(hotTable.__originalCols, function (columnInfo, i) {
                                hotTable.__originalCols[i].renderer = function (instance, td, row, col, prop, value) {
                                    var column = hotTable._getColumnByField(prop);
                                    var isGroupField = hotTable.isGroupField(prop);
                                    var cellMeta = hotTable.handsontable.getCellMeta(row, col);
                                    var $td, physicalRow, parsedValue, record, nodeId, recordGroupInfo, isSummaryRow;
                                    physicalRow = instance.toPhysicalRow(row);
                                    record = hotTable.getPhysicalRecord(physicalRow);
                                    isSummaryRow = hotTable._isSummaryRow(record);
                                    if (isSummaryRow) td.innerHTML = "";
                                    if (!record || (isSummaryRow && !column.summary)) return td;
                                    $td = $(td);
                                    if (!record) {
                                        $td.parent().addClass('ht-hidden-row');
                                    }
                                    if (prop === '$$checked') {
                                        if (scope.treeView)
                                            Handsontable.renderers.getRenderer("checkboxColumn").apply(this, arguments);
                                        else
                                            Handsontable.renderers.CheckboxRenderer.apply(this, arguments);
                                    } else if (column.type === 'checkbox') {
                                        if (column.uncheckedTemplate && (value === null || value === undefined)) arguments[5] = column.uncheckedTemplate;
                                        Handsontable.renderers.CheckboxRenderer.apply(this, arguments);
                                        if (column.readOnlyFunc && column.readOnlyFunc instanceof Function) {
                                            var checkboxValue = column.readOnlyFunc({
                                              grid: hotTable,
                                              row: record,
                                              rowIndex: row,
                                              colIndex: col,
                                              value: value
                                            })
                                            $td.children().attr('disabled', checkboxValue)
                                        } else { 
                                          $td.children().attr('disabled', column.readOnly)
                                        }
                                    } else if (column && !column.tmpl) {
                                        Handsontable.renderers.TextRenderer.apply(this, arguments);
                                    }
                                    if (column && (isGroupField || column.dataWithFilter || cellMeta.valid === false)) {
                                        if (scope.group) {
                                            recordGroupInfo = hotTable._getPhysicalRecordInfo(record);
                                        }
                                        if (!column.valueParser) {
                                            parsedValue = value || '';
                                        } else {
                                            parsedValue = column.valueParser(value, record);
                                        }
                                        if (isGroupField && recordGroupInfo && recordGroupInfo.groupField && recordGroupInfo.groupField === prop) {
                                            nodeId = hotTable._getNodeId(record);
                                            parsedValue = '<span class="ht-group-expand'
                                                + (recordGroupInfo.isExpanded ? ' expanded' : '')
                                                + (recordGroupInfo.isFetchingChildren ? ' fetching' : '')
                                                + '" data-node-id="'
                                                + nodeId
                                                + '"></span> '
                                                + parsedValue;
                                        }
                                        parsedValue = parsedValue || '　';
                                        if (cellMeta.valid === false) {
                                            parsedValue = '<div message-type="warn" outter-box="true" g-tooltip="' + cellMeta.tipMessage.join('\r\n') + '">'
                                                + parsedValue
                                                + '</div>';
                                        }
                                        $td.html(parsedValue || '');
                                        if (cellMeta.valid === false) {
                                            $compile($td.children())(scope);
                                        }
                                    }

                                    if (column && column.tmpl && (!isSummaryRow || (isSummaryRow && (column.summary || scope.summaryUrl)))) {
                                        var templateCompile = column.templateCompile || scope.templateCompile;
                                        if (templateCompile && templateCompile === 'art') {
                                            if (!scope.columnValueCache[prop] || !scope.columnValueCache[prop][physicalRow]) {
                                                if (!scope.columnValueCache[prop]) scope.columnValueCache[prop] = [];
                                                if (!scope.columnCompileFunc[prop]) scope.columnCompileFunc[prop] = artTmpl.compile(column.tmpl);
                                                scope.columnValueCache[prop][physicalRow] = scope.columnCompileFunc[prop]({
                                                    record: record,
                                                    row: record,
                                                    rowIndex: row,
                                                    colIndex: col,
                                                    prop: prop,
                                                    value: value
                                                });
                                            }
                                            $td.empty().html(scope.columnValueCache[prop][physicalRow]);
                                        } else {
                                            $td.empty().html(column.tmpl);
                                            $compile($td)(hotTable._getCloneScope(physicalRow));
                                        }
                                    }

                                    if (column && column.hasTip) {
                                        if (column.dataWithFilter && column.dataWithFilter.length > 0) {
                                            td.setAttribute("title", td.textContent !== undefined ? td.textContent : td.innerText);
                                        } else {
                                            td.setAttribute("title", value == null ? "" : value);
                                        }
                                    } else {
                                        if (td.hasAttribute("title")) td.removeAttribute("title");
                                    }
                                    if (!isSummaryRow) {
                                        var className = hotTable._getClassName(physicalRow, col);
                                        if (className) $td.addClass(className);
                                    }
                                    return td;
                                };
                            });

                            var hotSettings = {
                                // readOnly: true,
                                data: scope.source,
                                manualColumnResize: true,
                                rowHeaders: true, //scope.hasIndexColumn,
                                columns: hotTable.columns,
                                // width: scope.width || element.parent().width(),
                                height: scope.height,
                                wordWrap: false,
                                manualColumnMove: true,
                                outsideClickDeselects: false,
                                currentRowClassName: 'ht-active-row',
                                className: 'htMiddle',
                                multiSelect: false,
                                comments: true,
                                fillHandle: false,
                                filtersHeight: scope.filtersHeight,
                                filtersWidth: scope.filtersWidth,
                                rowHeights: 24,
                                copyType: scope.copyType,
                                autoColumnSize: false,
                                colHeaders: function (col) {
                                    var column = hotTable.columns[col];
                                    if (!column) return "";
                                    console.log(column.data);
                                    var prop = column.data;
                                    var firstColIndex = hotTable.scope.hasCheckboxColumn ? 1 : 0;
                                    var columnHeader;
                                    var sortDirectionObj, sortDirection, sortIndex, isMultiSort/* , canSort */;
                                    if (prop === '$$checked') {
                                        var txt = '<input type="checkbox" class="ht-check-all" ';
                                        txt += scope.isAllChecked ? 'checked="checked"' : '';
                                        txt += ">";
                                        return txt;
                                    } else if (column) {
                                        isMultiSort = (hotTable.sortName || []).length > 1;
                                        columnHeader = '<span class="ht-column-title-text" title="' + column.text + '" ' + (column.headStyle ? 'style="' + column.headStyle + '"' : '') + '>' + column._title + '</span>';
                                        if (column._sortable) {
                                            sortDirectionObj = hotTable._getSortDirection(prop) || {};
                                            sortDirection = sortDirectionObj.sortDirection;
                                            sortIndex = sortDirectionObj.index;
                                            columnHeader = '<div class="grid-head-sort" data-field="' + column.data + '">\n' +
                                                '    <button class="btn sort-btn sort-up">\n' +
                                                '        <span class="caret caret-up sort-up' + (sortDirection === ORDER.ASC ? ' selected' : '') + '"></span>\n' +
                                                '    </button>\n' +
                                                '    <button class="btn sort-btn sort-down">\n' +
                                                '        <span class="caret caret-down sort-down' + (sortDirection === ORDER.DESC ? ' selected' : '') + '"></span>\n' +
                                                '    </button>\n' +
                                                '</div> ' +
                                                (isMultiSort && sortDirectionObj.sortDirection ? '<sub>' + (sortIndex + 1) + '</sub>' : '') +
                                                columnHeader;
                                        }
                                        if (scope.colSettingsKey) {
                                            if (col === firstColIndex) {
                                                columnHeader += ' <i class="iconfont2 fi-set ht-set-btn"></i>';
                                            }
                                        }
                                        return columnHeader;
                                    }
                                },
                                beforeFilter: function () {
                                    var filtersPlugin = hotTable.handsontable.getPlugin('filters');
                                    var formulas = filtersPlugin.formulaCollection.formulas;
                                    var orderStack = filtersPlugin.formulaCollection.orderStack;
                                    var cachedFormulas = _.map(orderStack, function (col) {
                                        var field = hotTable.handsontable.colToProp(col);
                                        var formula = formulas[col];
                                        var obj = {
                                            field: field,
                                            formula: formula
                                        };
                                        return obj;
                                    });
                                    hotTable._takeSnapshot();
                                    hotTable._cachedFilters = cachedFormulas;
                                    hotTable.finishEdit();
                                },
                                afterFilter: function (filterColumns) {
                                    _.chain(scope.__originalCols).each(function (col) {
                                        delete col.__filterValues;
                                    });
                                    _.each(filterColumns, function (filterColumn) {
                                        var formula = filterColumn.formulas[0];
                                        if (formula && formula.args && formula.args.length > 0) {
                                            hotTable.columns[filterColumn.column].__filterValues = formula.args[0];
                                        }
                                    });
                                    var filtersPlugin = hotTable.handsontable.getPlugin('filters');
                                    var trimmedRows = filtersPlugin.trimRowsPlugin.trimmedRows;
                                    var scrollElement = hotTable.handsontable.view.wt.wtOverlays.topOverlay.mainTableScrollableElement;
                                    _.forEach(trimmedRows, function (row) {
                                        var isTree2Group = scope.treeView || scope.group;
                                        var filter = isTree2Group && hotTable.handsontable.runHooks("isFilter", row);
                                        if (!isTree2Group || filter) {
                                            var physicalInfo = hotTable.scope.physicalSourceInfo[row];
                                            if (_.isArray(physicalInfo.parents) && physicalInfo.parents.length > 0) {
                                                physicalInfo.record.$$checked = _.some(physicalInfo.parents, function (parent) {
                                                    return parent.record.$$checked;
                                                });
                                            }
                                            var record = physicalInfo.record;
                                            record.$$checked = false;
                                            var checked = record.$$checked;
                                            scope.checkedRows = _.without(scope.checkedRows, record);
                                            if (hotTable.hasGroup()) {
                                                hotTable._toggleGroupChildrenChecked(record, checked, false);
                                                hotTable._toggleGroupParentsChecked(record, checked);
                                            }
                                        }
                                    });
                                    scope.groupTrimmedRows = _.clone(trimmedRows);
                                    hotTable._updateGroupCheckBox();
                                    hotTable._updateIsAllChecked();
                                    hotTable._updateGroupFoldStatus();
                                    hotTable._updateGroupSummary();
                                    scrollElement.style.overflow = 'hidden';
                                    $timeout(function () {
                                        hotTable.handsontable.render();
                                        hotTable.handsontable.view.wt.wtOverlays.topOverlay.mainTableScrollableElement.scrollTop++;
                                        scrollElement.style.overflow = 'auto';
                                        hotTable._removeSnapshot();
                                    });
                                    callOnAfterFilter();

                                    function callOnAfterFilter() {
                                        var onAfterFilter = scope.onAfterFilter,
                                            eventParam = {
                                                grid: hotTable,
                                                trimmedRows: trimmedRows,
                                                physicalSource: hotTable.getPhysicalSource()
                                            };
                                        onAfterFilter(eventParam);
                                    }
                                }
                            };
                            if (scope.width) {
                                hotSettings.width = scope.width;
                            }
                            hotSettings.fixedColumnsLeft = hotTable._toSettingsFixedColumns(scope.fixedColumns);

                            var colWidths = _(hotTable.columns).map(function (column) {
                                var columnLayout = _.find(hotTable.layoutSetting, function (c) {
                                    return c.field === column.field;
                                });
                                var layoutWidth = columnLayout ? columnLayout.width : 0;
                                return layoutWidth || column.colWidths || column.defWidth || 100;
                            });
                            if (colWidths.length > 0) hotSettings.colWidths = colWidths;
                            if (scope.showFilters) {
                                hotSettings.dropdownMenu = ['filter_by_value', 'filter_action_bar'];
                                hotSettings.filters = true;
                            }
                            /*if (scope.hiddenColumns.length) {
                                hotSettings.hiddenColumns = {
                                    columns: scope.hiddenColumns
                                };
                            }*/
                            if (scope.treeView || scope.group) {
                                hotSettings.nestedRows = true;
                            }
                            if (scope.bindIndex) {
                                hotSettings.bindRowsWithHeaders = true;
                            }
                            if (scope.stretch) {
                                hotSettings.stretchH = scope.stretch;
                            }

                            scope.hasSummary = !!scope.summaryUrl || _.some(hotTable.columns, function (column) {
                                return column.summary;
                            });
                            if (scope.hasSummary) {
                                if (scope.summaryPos === 'first')
                                    hotSettings.fixedRowsTop = 1;
                                // else
                                //     hotSettings.fixedRowsBottom = 1;
                            }
                            if (scope.summaryUrl) {
                                hotSettings.columnSummary = function () {
                                    if (!scope.source || scope.source.length == 0
                                        || (scope.source.length == 1 && scope.source[0].rowStatus == 4)) return [];
                                    var columnSummary = [];
                                    _.chain(hotTable.columns)
                                        .each(function (column, i) {
                                            if (column.field === '$$checked') {
                                                return;
                                            }
                                            column.summary = 'custom',
                                                columnSummary.push({
                                                    destinationRow: 0,
                                                    destinationColumn: i,
                                                    reversedRowCoords: scope.summaryPos === 'first' ? false : true,
                                                    type: column.summary,
                                                    // forceNumeric: true
                                                    customFunction: function () {
                                                        return _.getValue(scope, '__summaryRecord.' + column.field);
                                                    }
                                                });
                                        });
                                    return columnSummary;
                                };
                            } else if (scope.hasSummary) {
                                hotSettings.columnSummary = function () {
                                    if (!scope.source || scope.source.length == 0
                                        || (scope.source.length == 1 && scope.source[0].rowStatus == 4)) return [];
                                    var columnSummary = [];
                                    _.chain(hotTable.columns)
                                        .each(function (column, i) {
                                            if (column.summary) {
                                                columnSummary.push({
                                                    destinationRow: 0,
                                                    destinationColumn: i,
                                                    reversedRowCoords: scope.summaryPos === 'first' ? false : true,
                                                    type: column.summary,
                                                    forceNumeric: true
                                                });
                                            }
                                        });
                                    return columnSummary;
                                };
                            }

                            hotTable.handsontable = new Handsontable(element[0], hotSettings);
                            hotTable.handsontable.addHook('afterFilter', function () {
                                hotTable.handsontable.view.wt.wtOverlays.topOverlay.scrollTo(0, false);
                                //hotTable._updateCheckedRows();
                            });

                            hotTable.handsontable.addHook('beforeColumnResize', function (th) {
                                var $th = $(th);
                                return $th.find("input").length > 0 ? false : true;
                            });

                            hotTable.handsontable.addHook('afterRender', function () {
                                hotTable._applyCloneScope();
                                $(".cornerHeader").html($config.i18nInfo.indexTitle || "序号");
                            });

                            hotTable.handsontable.addHook('afterDocumentKeyDown', function (e) {
                                if ((e.code === 'ArrowRight' || e.code === 'ArrowRight') && hotTable.handsontable.getSelected()) {
                                    var cell = hotTable.handsontable.getSelected();
                                    scope.onCellSwitching({
                                        grid: hotTable,
                                        row: (cell[0] - 1),
                                        col: (cell[1] - 1)
                                    });
                                }
                            });

                            if (scope.validatorName) {
                                setTimeout(function () {
                                    hotTable._createValidateForm();
                                }, 100);
                            }

                            hotTable._registerLayoutService();
                            if (!attrs.width) {
                                hotTable._autoResizeWidth();
                            }

                            scope.onRender({
                                grid: hotTable,
                                source: scope.source
                            });

                            scope.$watchCollection("checkedRows", function (val) {
                                _.each(scope.source, function (record) {
                                    record.$$checked = (_.contains(val, record) && record.$$checked) ? true : false;
                                });
                                hotTable._updateIsAllChecked();
                            });

                            hotTable.handsontable.addHookOnce('afterLoadData', function () {
                                hotTable._dataReady = true;
                            });

                            hotTable.handsontable.addHook('afterChange', function (changes) {
                                var trimRowsPlugin = hotTable.handsontable.getPlugin("trimRows");
                                _.forEach(changes, function (change) {
                                    if (change[1] === '$$checked' && change[2] != change[3]) {
                                        var row = change[0];
                                        var physicalRow = hotTable.handsontable.toPhysicalRow(row);
                                        var checked = change[3];
                                        var record = hotTable.getPhysicalRecord(physicalRow);
                                        // record.$$checked = checked;
                                        var onCheck = scope.onCheck,
                                            eventParam = {
                                                grid: hotTable,
                                                source: scope.source,
                                                checked: checked,
                                                row: row,
                                                physicalRow: physicalRow,
                                                record: record
                                            };
                                        // if (checked) {
                                        //     scope.checkedRows.push(record);// = scope.checkedRows.concat(record);
                                        // } else {
                                        //     scope.checkedRows = _.without(scope.checkedRows, record);
                                        // }
                                        scope.checkedRows = scope.hotTable.getCheckedRows();
                                        if (scope.group) {
                                            hotTable._toggleGroupChildrenChecked(record, checked);
                                            hotTable._toggleGroupParentsChecked(record, checked);
                                        }
                                        hotTable._updateIsAllChecked();
                                        onCheck(eventParam);
                                        /*$timeout(function () {
                                            hotTable.handsontable.render();
                                        }, 100);*/
                                    }
                                });
                            });

                            hotTable.handsontable.addHook('beforeColumnMove', function (columns, target) {
                                return hotTable._beforeColumnMove(columns, target);
                            });

                            hotTable.handsontable.addHook('afterGetRowHeader', function (row, TH) {
                                if (scope.hasSummary) {
                                    row = hotTable.handsontable.toPhysicalRow(row);
                                    if (scope.physicalSourceInfo[row]
                                        && scope.physicalSourceInfo[row].record
                                        && scope.physicalSourceInfo[row].record.__SUMMARY_ROW
                                    ) {
                                        TH.querySelector(".rowHeader").innerHTML = "合计";
                                    } else {
                                        if (scope.summaryPos === 'first') TH.querySelector(".rowHeader").innerHTML = row;
                                    }
                                }
                            });

                            hotTable.handsontable.addHook('afterCheckboxColumnRender', function (TD, row, col, prop, value) {
                                if (scope.physicalSourceInfo[row]
                                    && scope.physicalSourceInfo[row].record
                                    && scope.physicalSourceInfo[row].record.__SUMMARY_ROW
                                ) {
                                    TD.innerHTML = "";
                                }
                            });

                            if (scope.dragCheck) {
                                hotTable.handsontable.addHook('afterOnCellMouseDown', function (event, coords) {
                                    var prop = hotTable.handsontable.colToProp(coords.col);
                                    if ((prop === '$$checked' || coords.col === -1) && coords.row >= 0) {
                                        scope.dragStartRow = coords.row;
                                    }
                                });
                                hotTable.handsontable.addHook('afterOnCellMouseUp', function (event, coords) {
                                    var obj = {row: coords.row, col: coords.col == -1 ? 0 : coords.col};
                                    var currentCellRange = hotTable.handsontable.view.wt.selections.current.cellRange;
                                    if (currentCellRange != null) {
                                        currentCellRange.from = currentCellRange.highlight = currentCellRange.to = obj;
                                        hotTable.handsontable.selection.refreshBorders();
                                    }

                                    if (angular.isNumber(scope.dragStartRow)) {
                                        var start = scope.dragStartRow;
                                        var prop = hotTable.handsontable.colToProp(coords.col);
                                        var end;
                                        scope.dragStartRow = undefined;
                                        if ((prop === '$$checked' || coords.col === -1) && coords.row >= 0) {
                                            end = coords.row;
                                            if (start === end) {
                                                return;
                                            }
                                            hotTable._finishDragCheck(start, end);
                                        }
                                    }
                                });
                            }

                            if (scope.showFilters) {
                                /*hotTable.dropdownMenuPlugin = hotTable.handsontable.getPlugin('dropdownMenu');
                                hotTable.handsontable.addHook('afterFilter', function (formulasStack) {
                                    console.log(formulasStack);
                                });
                                hotTable.handsontable.addHook('afterDropdownMenuDefaultOptions', function (obj) {
                                    hotTable._setDropdownMenuPlugin(obj);
                                });*/

                                hotTable.handsontable.addHook('partakeFilter', function (row) {
                                    if (scope.source[row] && scope.source[row].__SUMMARY_ROW) return false;
                                    return true;
                                });
                            }

                            if (scope.hasSummary) {
                                hotTable.handsontable.addHook('partakeSummary', function (row) {
                                    if (scope.source[row] && scope.source[row].__SUMMARY_ROW) return false;
                                    return true;
                                });
                            }

                            element.on('click', function () {
                                // if (ContextMenuService.menuElement && ContextMenuService.menuElement.is(':visible')) {
                                $(document).click();
                                // }
                            });

                            element.on('mouseup', function (event) {
                                var $target = $(event.target);
                                if ($target.hasClass('expand-toggle') || $target.hasClass('table-tree')) {
                                    setTimeout(function () {
                                        hotTable._updateIsAllChecked(event);
                                    }, 10);
                                }
                            });

                            //滚动条滚动时隐藏筛选面板
                            $(element).parentsUntil().on('scroll', function () {
                                $(".htDropdownMenu").hide();
                            });

                            hotTable.handsontable.addHook('afterScrollHorizontally', function () {
                                if (ContextMenuService.menuElement && ContextMenuService.menuElement.is(':visible')) {
                                    $(document).click();
                                }
                            });

                            hotTable.handsontable.addHook('afterScrollVertically', function () {
                                if (ContextMenuService.menuElement && ContextMenuService.menuElement.is(':visible')) {
                                    $(document).click();
                                }
                            });

                            hotTable.handsontable.addHook('copyTransform', function (range, value) {
                                if (!range || range.length == 0) return "";
                                var cell = range[0],
                                    column = hotTable.columns[cell.endCol];
                                if (column._cachedRenderer) {
                                    var physicalRow = hotTable.handsontable.toPhysicalRow(cell.endRow);
                                    var record = hotTable.getPhysicalRecord(physicalRow);
                                    value = column._cachedRenderer(record);
                                }
                                return value;
                            });

                            hotTable.handsontable.addHook('beforePaste', function (value, range) {
                                if (!scope.allowPaste) return false;
                                if (!range || range.length == 0) return false;
                                if (range.length > 0 && range[0].endCol == 0 && scope.hasCheckboxColumn) {
                                    GillionMsg.alert('提示', '不允许粘贴到复选框列!');
                                    return false;
                                }
                                return true;
                            });

                            element.on('dblclick', 'td, div.wtBorder.current', function (event) {
                                var handsontable = hotTable.handsontable;
                                var scope = hotTable.scope;
                                var firstCol = 0;
                                var td = event.target;
                                var range, coords, row, col, physicalRow, record, prop, onRowDbclick, params;
                                if (td.tagName !== 'TD') {
                                    range = handsontable.getSelected();
                                    coords = {
                                        row: range[0],
                                        col: range[1]
                                    };
                                } else {
                                    coords = handsontable.getCoords(td);
                                }
                                row = coords.row;
                                col = coords.col;
                                if (scope.hasCheckboxColumn) {
                                    firstCol++;
                                }
                                if (row < 0 || col < firstCol) {
                                    return;
                                }
                                physicalRow = handsontable.toPhysicalRow(row);
                                record = hotTable.getPhysicalRecord(physicalRow);
                                prop = handsontable.colToProp(col);
                                onRowDbclick = scope.onRowDbclick;
                                params = {
                                    grid: hotTable,
                                    $event: event,
                                    record: record,
                                    colIndex: col,
                                    rowIndex: row,
                                    field: prop,
                                    physicalRow: physicalRow
                                };
                                onRowDbclick(params);
                            });

                            hotTable.handsontable.addHook('afterDropdownMenuShow', function () {
                                hotTable.finishEdit();
                            });

                            hotTable.handsontable.addHook('afterOnCellMouseUp', function (event, coords) {
                                var row = coords.row,
                                    col = coords.col;
                                hotTable._rowClickEvent(row, col, event);
                            });

                            hotTable.handsontable.addHook('beforeOnCellMouseDown', function (event, coords) {
                                var $target = $(event.target);
                                if (($target.hasClass("rowHeader") || $target.children().hasClass("rowHeader")) && hotTable.editingInfo) {
                                    hotTable.finishEdit();
                                }
                                var col = coords.col;
                                if (!scope.hasCheckboxColumn) col--;
                                if (event.button === 2) {
                                    // event.stopImmediatePropagation();
                                    scope.__willFixedColumnsCount = col;
                                    return;
                                }
                                if ($target.is('input.ht-check-all')) {
                                    event.stopImmediatePropagation();
                                    event.stopPropagation();
                                    scope.isAllChecked = !scope.isAllChecked;
                                    var trimRowsPlugin = hotTable.handsontable.getPlugin("trimRows");
                                    _.forEach(scope.physicalSourceInfo, function (info, i) {
                                        if (trimRowsPlugin.isTrimmed(i)) {
                                            info.record.$$checked = false;
                                            if (_.isArray(info.parents) && info.parents.length > 0) {
                                                info.record.$$checked = _.some(info.parents, function (parent) {
                                                    return parent.record.$$checked;
                                                });
                                            }
                                        } else {
                                            info.record.$$checked = scope.isAllChecked;
                                        }
                                    });
                                    var onCheckAll = scope.onCheckAll,
                                        eventParam = {
                                            grid: hotTable,
                                            $event: event,
                                            source: scope.source,
                                            physicalSource: hotTable.getPhysicalSource,
                                            checked: scope.isAllChecked
                                        };
                                    if (scope.isAllChecked) {
                                        scope.checkedRows = hotTable.getCheckedRows();
                                    } else {
                                        scope.checkedRows = [];
                                    }

                                    if (scope.onCheck) {
                                        _.each(hotTable.physicalSourceInfo, function (sourceInfo) {
                                            scope.onCheck({
                                                $event: event,
                                                record: sourceInfo.record,
                                                grid: hotTable,
                                                checked: scope.isAllChecked
                                            });
                                        });
                                    }
                                    onCheckAll(eventParam);
                                    hotTable.handsontable.render();
                                    return;
                                }
                                var column = hotTable.columns[col];
                                if ($target.is('.ht-column-title-text') && column._sortable) {
                                    var sortName = hotTable.sortName,
                                        sortDirection = hotTable.sortDirection,
                                        index = sortName.indexOf(column.data),
                                        newSortName = column.data,
                                        newSortDirection = '';

                                    if (index === -1) {
                                        newSortDirection = ORDER.ASC;
                                    } else if (sortDirection[index] === ORDER.ASC) {
                                        newSortDirection = ORDER.DESC;
                                    } else if (sortDirection[index] === ORDER.DESC) {
                                        newSortName = '';
                                    }
                                    if (event.ctrlKey) {
                                        hotTable._doMultiSort(newSortName, newSortDirection);
                                    } else {
                                        hotTable._doSort(newSortName, newSortDirection);
                                    }
                                }
                                if ($target.is('.caret, .sort-btn')) {
                                    event.stopImmediatePropagation();
                                    var $gridHeadSort = $target.closest('.grid-head-sort');
                                    var newSortName = $gridHeadSort.data('field');
                                    var newSortDirection = $target.hasClass('sort-up') ? ORDER.ASC : ORDER.DESC;
                                    callOnBeforeColumnSort();
                                    hotTable.finishEdit()
                                        .then(function () {
                                            if (!_.isEmpty(hotTable.getAddedAndModifedRecordMap())) {
                                                GillionMsg.alert('提示', '数据已修改，请保存后再排序！');
                                                return;
                                            }
                                            if (event.ctrlKey) {
                                                hotTable._doMultiSort(newSortName, newSortDirection);
                                            } else {
                                                hotTable._doSort(newSortName, newSortDirection);
                                            }
                                        });

                                    function callOnBeforeColumnSort() {
                                        var onBeforeColumnSort = scope.onBeforeColumnSort,
                                            eventParam = {
                                                grid: hotTable,
                                                col: hotTable.handsontable.propToCol(newSortName),
                                                sortName: newSortName,
                                                sortDirection: newSortDirection
                                            };
                                        onBeforeColumnSort(eventParam);
                                    }

                                    return;
                                }
                                if ($target.is('.ht-set-btn')) {
                                    event.stopImmediatePropagation();
                                    hotTable.finishEdit();
                                    hotTable._startSetting();
                                    return;
                                }
                                if ($target.is('.ht-group-expand')) {
                                    event.stopImmediatePropagation();
                                    var $cell = $target.closest('td');
                                    var coords = hotTable.handsontable.getCoords($cell[0]);
                                    var physicalRow = hotTable.handsontable.toPhysicalRow(coords.row);
                                    var nodeId = $target.data('node-id');
                                    var param = (!nodeId || nodeId === 'undefined')
                                        ? physicalRow
                                        : nodeId;
                                    var dropdownMenuPlugin = hotTable.handsontable.getPlugin('dropdownMenu');
                                    dropdownMenuPlugin.close();
                                    hotTable.toggleGroupExpand(param);
                                    return;
                                }
                                if ($target.is('.expand-toggle')) {
                                    event.stopImmediatePropagation();
                                    var $cell = $target.closest('td');
                                    var coords = hotTable.handsontable.getCoords($cell[0]);
                                    var physicalRow = hotTable.handsontable.toPhysicalRow(coords.row);
                                    var physicalRowInfo = scope.physicalSourceInfo[physicalRow];
                                    _.forEach(scope.physicalSourceInfo, function (info) {
                                        if (info.parents.length == 0) return;
                                        _.forEach(info.parents, function (parentInfo) {
                                            if (parentInfo == physicalRowInfo) {
                                                info.record.$$checked = false;
                                                scope.checkedRows = _.without(scope.checkedRows, info.record);
                                            }
                                        });
                                    });
                                }

                                //解决加载数据后点击首行的checkbox没有勾选
                                /*if (scope.hasCheckboxColumn && coords.row == 0 && !scope.firstClickCheckbox) {
                                    scope.firstClickCheckbox = true;
                                    if (coords.col == 0) {
                                        scope.source[0].$$checked = true;
                                        scope.physicalSourceInfo[0].record.$$checked = true;
                                    }
                                }*/
                                if ($target.hasClass("htCheckboxRendererInput") && coords.row == 0 && !scope.firstClickCheckbox) {
                                    scope.firstClickCheckbox = true;
                                    $target.click();
                                }
                                // if ($target.is('.changeType')) {
                                //     event.stopImmediatePropagation();
                                // }
                            });

                            hotTable.handsontable.addHook('afterSelectionEnd', function (row, col, endRow, endCol) {
                                var physicalRow = hotTable.handsontable.toPhysicalRow(row);
                                scope.selectedRow = hotTable.getPhysicalRecord(physicalRow);
                                var onAfterSelect = scope.onAfterSelect;
                                var params = {
                                    grid: hotTable,
                                    record: scope.selectedRow,
                                    row: row,
                                    col: col
                                };
                                if (window.event && window.event.type.indexOf("key") >= 0) {
                                    onAfterSelect(params);
                                }
                            });

                            hotTable.handsontable.addHook('afterDeselect', function () {
                                scope.selectedRow = null;
                            });
                        }, 100);


                        scope.$on('$destroy', function () {
                            $(window).off('resize.' + this.scope.$id);
                            if (hotTable.columnEditor) {
                                hotTable.columnEditor.$destroy();
                            }
                            hotTable.handsontable.destroy();
                            for (var key in hotTable) {
                                delete hotTable[key];
                            }
                        });
                    };
                },
                controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                    $scope.hotTable = new HotTable($scope, $element, $attrs);
                    return $scope.hotTable;
                }]
            };
        });
});
