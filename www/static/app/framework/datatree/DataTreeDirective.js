define('framework/datatree/DataTreeDirective', ["angular", "underscore"], function (angular, _) {
        var NODE_HEIGHT = 26;
        var LAZY_NODE_COUNT = 5;
        var DataTreeProto = DataTree.prototype;

        function DataTree($scope, $element, $attrs, $treeHelper, $timeout, $dataSourceManager, GillionMsg) {
            this.scope = $scope;
            this.$element = $element;
            this.$attrs = $attrs;
            this.treeHelper = $treeHelper;
            this.$treeHelper = $treeHelper;
            this.$timeout = $timeout;
            this.$dataSourceManager = $dataSourceManager;
            this.GillionMsg = GillionMsg;
            this.$body = $element.find(".tree-body");
        }

        //根据id获取结点
        DataTreeProto.searchNodeById = function (idProp) {
            var me = this,
                ele;
            ele = me.treeHelper.searchNodeByTd(me.scope.treeData, idProp);
            if (ele) {
                return ele.originData;
            }
        };
		
        DataTreeProto.searchNodeById2Path = function (idProp, path) {
            var me = this,
                ele;
            ele = me.treeHelper.searchNodeByTd2Path(me.scope.treeData, idProp, path);
            if (ele) {
                return ele.originData;
            }
        };		

        //查询子结点
        DataTreeProto.searchChildren = function (idProp, path) {
            var me = this,
                children = [],
                ele, i, len;
            ele = me.treeHelper.searchNodeByTd2Path(me.scope.treeData, idProp, path);
            if (ele && ele.children && ele.children.length > 0) {
                for (i = 0, len = ele.children.length; i < len; i++) {
                    children.push(ele.children[i].originData);
                }
            }
            return children;
        };

        //根据显示值获取结点
        DataTreeProto.searchNodeByValue = function (value) {
            var me = this,
                result = [],
                nodes, i, len;
            nodes = me.treeHelper.findNodeByValue(this.scope.treeData, value);
            if (nodes && nodes.length > 0) {
                for (i = 0, len = nodes.length; i < len; i++) {
                    result.push(nodes[i].originData);
                }
            }
            return result;
        };

        //设置隐藏或显示
        DataTreeProto.displayNode = function (idProp, show) {
            var me = this,
                el, i, len;
            if (angular.isUndefined(show)) {
                show = true;
            }
            if (angular.isArray(idProp) && idProp.length > 0) {
                for (i = 0, len = idProp.length; i < len; i++) {
                    el = me.treeHelper.searchNodeByTd(this.scope.treeData, idProp[i]);
                    el.display = show;
                    if (el.display)
                        me.$body.find("[data-id=" + el.idProp + "]").show();
                    else
                        me.$body.find("[data-id=" + el.idProp + "]").hide();
                }
            } else {
                el = me.treeHelper.searchNodeByTd(this.scope.treeData, idProp);
                el.display = show;
                if (el.display)
                    me.$body.find("[data-id=" + el.idProp + "]").show();
                else
                    me.$body.find("[data-id=" + el.idProp + "]").hide();
            }
        };

        DataTreeProto.setNodeEditable = function (node) {
            var me = this;
            var $el = me.$body.find("[data-id=" + node.idProp + "]");
            var $input = $el.find("input");
            var $span = $el.find("span");
            if (node.editable && !node.readonly && !node.disabled) {
                $input.show();
                $span.hide();
            } else {
                $input.hide();
                $span.show();
            }
        };

        //设置编辑状态
        DataTreeProto.editable = function (idProp, editable) {
            var me = this,
                el, i, len;
            if (angular.isUndefined(editable)) {
                editable = true;
            }

            if (angular.isArray(idProp) && idProp.length > 0) {
                for (i = 0, len = idProp.length; i < len; i++) {
                    el = me.treeHelper.searchNodeByTd(this.scope.treeData, idProp[i]);
                    el.editable = editable;
                    me.setNodeEditable(el);
                }
            } else {
                el = me.treeHelper.searchNodeByTd(this.scope.treeData, idProp);
                el.editable = editable;
                me.setNodeEditable(el);
            }
        };

        DataTreeProto.clearExistNodes = function (item) {
            var me = this;            
            for (var i=0; i<item.length; i++) {
                var tmpNode = me.$body.find("[data-id=" + item[i].idProp + "]");
                if (tmpNode.length > 0) {
                    me.removeNode(tmpNode[0]);
                }
                if (item[i].children && item[i].children.length > 0) {
                    me.clearExistNodes(item[i].children);
                }
            }
        }

        //展开结点
        DataTreeProto.expandNode = function (idProp, expand, isChildren) {
            var me = this,
                scope = this.scope,
                config = scope.config,
                paramArg, item;
            expand = expand !== false;
            item = me.treeHelper.searchNodeByTd(scope.treeData, idProp);
            if (angular.isUndefined(scope.disabled) && item.disabled === false) {
                /*if ((item.expanded === false && expand === true) || (item.expanded === true && expand === false)) {
                    var nodeEl = me.$body.find("[data-id=" + item.idProp + "]");
                    nodeEl.find(".tree-fi-folder").click();
                }*/

                var nodeEl = me.$body.find("[data-id=" + item.idProp + "]");

                function expandAction() {
                    nodeEl.find(".tree-fi-folder").click();
                }

                paramArg = {
                    record: item.originData,
                    item: item
                };
                if (item.expanded === false && expand === true) {
                    if (!(scope.beforeExpand(paramArg) === false)) {
                        if (scope.async) { // && (!item.children || item.children.length == 0)
                            scope.source.params[config.idProp] = item.idProp;
                            if (isChildren === true) {
                                scope.source.params.child = "true";
                            }
                            scope.source.params.clickCheck = item.clickCheck || false;
                            scope.source.params.checked = item.checked;
                            scope.source.doRequestData(scope.source.params, function (_dataSource) {
                                var records, children;
                                records = angular.copy(_dataSource.records);
                                item.expanded = !item.expanded;
                                if (!records || records.length === 0) {
                                    item.type = "leaf";
                                    nodeEl[0].setAttribute("leaf", "true");
                                } else {
                                    nodeEl[0].setAttribute("open", "true");
                                    me.clearExistNodes(item.children);
                                    var data = me.$treeHelper.createChildren(item, records, scope.config);
                                    var nodeDatas = [];
                                    for (var i = 0; i < data.length; i++) {
                                        me.treeHelper.buildTreeData(nodeDatas, data[i], item.level + 1, item.path);
                                    }

                                    var nodeIndex = me.$treeHelper.findIndex(scope.treeData, item);
                                    for (var i = 0; i < nodeDatas.length; i++) {
                                        nodeDatas[i].expanded = true;
                                    }
                                    for (var i = 1; i <= nodeDatas.length; i++) {
                                        scope.treeData.splice(nodeIndex + i, 0, nodeDatas[i - 1]);
                                    }
                                    item.children=data;
                                    me.renderDisplayNodes(angular.copy(nodeDatas).reverse(), {insertAfter: nodeEl});
                                }
                                paramArg.item = item;
                                scope.onExpand(paramArg);
                            }, true);
                        } else {
                            expandAction();
                        }
                    }
                } else if (item.expanded === true && expand === false) {
                    expandAction();
                }
            }
        };

        /**
         * 展开所有结点(提供外部调用)
         * @param idProp 结点id
         */
        DataTreeProto.expandAll = function (idProp) {
            var me = this,
                scope = me.scope,
                item = me.treeHelper.searchNodeByTd(scope.treeData, idProp);
            me._expandAll(item);
        };

        /**
         * 展开所有子结点
         * @param item 结点
         */
        DataTreeProto._expandAll = function (item) {
            var me = this,
                scope = me.scope,
                i, len, paramArg, child,
                children = item.children || [];
            //先展开当前结点
            paramArg = {
                record: item.originData,
                item: item
            };
            if (!item.expanded) {
                item.expanded = true;
                if (scope.onExpand) {
                    paramArg.item = item;
                    scope.onExpand(paramArg);
                }
            }
            for (i = 0, len = children.length; i < len; i++) {
                child = children[i];
                me._expandAll.call(me, child);
            }
        };

        //根据value设置当前行
        DataTreeProto.gotoRow = function (value, index) {
            var me = this,
                result = -1,
                onSelect = me.scope.onSelect,
                ele, items, selectParams;
            if (index === undefined) index = 0;
            items = me.treeHelper.findNodeByDisplay(me.scope.treeData, value);
            if (items && items.length > 0) {
                ele = items[index];
                if (ele) {
                    selectParams = {
                        record: ele.originData
                    };
                    if (me.canSetCurrentRow(ele)) {
                        me.scope.currentRow = ele.originData;
                        ele.selected = true;
                        me.scope._currentRow.selected = false;
                        me.scope._currentRow = ele;
                        me.scope._currentRow.selected = true;
                        ele.expanded = true;
                        me.expandAllParent(ele);

                        me.$body.find(".tree-item").removeAttr("defaultSelected").removeAttr("selected");
                        if (me.isLazy()) {
                            me.lazyRender();
                            me.$timeout(function () {
                                var index = me.$treeHelper.findIndex(me.scope.treeData, ele);
                                var scrollDistance = 0;
                                for (var i = 0; i < index; i++) {
                                    if (me.isDisplay(me.scope.treeData[i]))
                                        scrollDistance += NODE_HEIGHT;
                                }
                                me.$body.scrollTop(scrollDistance);
                                me.$timeout(function () {
                                    var $el = me.$body.find("[data-id=" + ele.idProp + "]");
                                    $el.attr("selected", "selected");
                                    if (window.document.documentMode === 8) {
                                        $el.prop("selected", "selected");
                                    }
                                }, 200);
                            }, 300);
                        } else {
                            var $el = me.$body.find("[data-id=" + ele.idProp + "]");
                            $el.attr("selected", "selected");
                            if (window.document.documentMode === 8) {
                                $el.prop("selected", "selected");
                            }

                            var scrollHeight = $el[0].offsetTop - me.$element[0].offsetTop - 28;
                            if (scrollHeight > 0) {
                                me.$body.scrollTop(scrollHeight);
                            } else {
                                me.$body.scrollTop(0);
                            }
                        }

                        if (onSelect !== undefined) {
                            onSelect(selectParams);
                        }
                    }
                    result = index === items.length - 1 ? 0 : index + 1;
                }
            }
            return result;
        };
        //根据id设置当前行
        DataTreeProto.setCurrentRow = function (idProp) {
            var me = this,
                ele;
            ele = me.treeHelper.searchNodeByTd(this.scope.treeData, idProp);
            if (!ele) return;
            ele.selected = true;
            this.scope.currentRow = ele.originData;
            this.scope._currentRow.selected = false;
            this.scope._currentRow = ele;
            ele.expanded = true;
            me.expandAllParent(ele);

            me.$body.find(".tree-item").removeAttr("defaultSelected").removeAttr("selected");
            me.$body.find("[data-id=" + ele.idProp + "]").attr("selected", "selected");
            if (window.document.documentMode === 8) {
                me.$body.find("[data-id=" + ele.idProp + "]").prop("selected", "selected");
            }
        };
        //设置只读属性
        DataTreeProto.readonly = function (idProp, readonly) {
            var me = this,
                el, i, len;
            if (angular.isUndefined(readonly)) {
                readonly = true;
            }

            if (angular.isArray(idProp) && idProp.length > 0) {
                for (i = 0, len = idProp.length; i < len; i++) {
                    el = me.constructor.searchNodeByTd(this.scope.treeData, idProp[i]);
                    el.readonly = readonly;
                    me.setNodeEditable(el);
                }
            } else {
                el = me.treeHelper.searchNodeByTd(this.scope.treeData, idProp);
                el.readonly = readonly;
                me.setNodeEditable(el);
            }
        };
        //设置disable属性
        DataTreeProto.disabled = function (idProp, disabled) {
            var me = this,
                el, i, len;
            if (angular.isUndefined(disabled)) {
                disabled = true;
            }
            if (angular.isArray(idProp) && idProp.length > 0) {
                for (i = 0, len = idProp.length; i < len; i++) {
                    el = me.treeHelper.searchNodeByTd(this.scope.treeData, idProp[i]);
                    el.disabled = disabled;
                    me.setNodeEditable(el);
                }
            } else {
                el = me.treeHelper.searchNodeByTd(this.scope.treeData, idProp);
                el.disabled = disabled;
                me.setNodeEditable(el);
            }
        };
        //设置结点的勾选状态
        DataTreeProto.check = function (idProp, checked) {
            var me = this,
                el, i, len;
            if (angular.isUndefined(checked)) {
                checked = true;
            }
            if (angular.isArray(idProp) && idProp.length > 0) {
                for (i = 0, len = idProp.length; i < len; i++) {
                    el = me.treeHelper.searchNodeByTd(me.scope.treeData, idProp[i]);
                    if (!el) continue;
                    if (checked) {
                        me.doCheck(el);
                    } else {
                        if (el.checked === true) {
                            me.updateCheckChanges(el);
                            el.checked = false;
                        } else {
                            el.checked = false;
                        }
                        me.treeHelper.removeItem(me.scope._chooseItems, el);
                    }
                    var box = me.$body.find("[data-id=" + el.idProp + "]").find(".tree-fi-clickbox");
                    if (el.checked) {
                        box.attr("selected", "selected");
                        if (window.document.documentMode === 8) {
                            box.prop("selected", "selected");
                        }
                    } else {
                        box.removeAttr("defaultSelected").removeAttr("selected");
                    }
                }
            } else {
                el = me.treeHelper.searchNodeByTd(me.scope.treeData, idProp);
                if (!el) return;
                if (checked) {
                    me.doCheck(el);
                } else {
                    if (el.checked === true) {
                        me.updateCheckChanges(el);
                        el.checked = false;
                    } else {
                        el.checked = false;
                    }
                    me.treeHelper.removeItem(me.scope._chooseItems, el);
                }
                var box = me.$body.find("[data-id=" + el.idProp + "]").find(".tree-fi-clickbox");
                if (el.checked) {
                    box.attr("selected", "selected");
                    if (window.document.documentMode === 8) {
                        box.prop("selected", "selected");
                    }
                } else {
                    box.removeAttr("defaultSelected").removeAttr("selected");
                }
            }
        };

        //执行勾选
        DataTreeProto.doCheck = function (item) {
            var me = this;
            if (me.canCheck(item)) {
                item.checked = true;
                me.updateCheckChanges(item);
                if (!me.treeHelper.contains(me.scope._chooseItems, item, me.scope.config)) {
                    me.scope._chooseItems.push(item);
                }

            }
        };

        //展开所有父结点
        DataTreeProto.expandAllParent = function (item) {
            var me = this,
                parent = item.parent,
                flag = parent !== null, nodes = [];
            while (flag) {
                if (!parent.expanded) {
                    nodes.push(parent.idProp);
                }
                parent = parent.parent;
                flag = parent !== null;
            }

            nodes = nodes.reverse();

            function expand(i) {
                var node = nodes[i];
                var $el = me.$body.find("[data-id=" + node + "]");
                var $folder = $el.find(".tree-fi-folder");
                $folder.click();
            }

            var time = me.scope.async ? 1000 : 100;
            for (var i = 0; i < nodes.length; i++) {
                if (me.isLazy()) {
                    var nodeData = me.$treeHelper.searchNodeByTd(me.scope.treeData, nodes[i]);
                    nodeData.expanded = true;
                } else {
                    try {
                        setTimeout(function (i) {
                            expand(i);
                        }(i), time * i);
                    } catch (e){};
                }
            }
        };
        //重截数据源
        DataTreeProto.reload = function (records) {
            var me = this,
                paramArg;
            if (angular.isArray(records) && records.length > 0) {
                me.scope.treeData = [];
                me.scope.currentRow = {};
                me.scope._currentRow.selected = false;
                me.scope._currentRow = {};
                me.scope._chooseItems = [];
                me.scope.treeData = me.treeHelper.buildTree(records, me.scope.config);
                me.treeHelper.pushCheckedItem(me.scope.treeData, me.scope);
                paramArg = {
                    record: records
                };
                me.render();
                me.scope.onLoadSuccess(paramArg);
            } else {
                if (me.scope.async) {
                    if (me.scope.source.params === undefined) {
                        me.scope.source.params = {};
                    }
                    me.scope.dataSource.doRequestData(me.scope.source.params, function (dataSource) {
                        records = angular.copy(dataSource.records);
                        me.scope.treeData = [];
                        me.scope.currentRow = {};
                        me.scope._currentRow.selected = false;
                        me.scope._currentRow = {};
                        me.scope._chooseItems = [];
                        me.scope.treeData = me.treeHelper.buildTree(records, me.scope.config);
                        me.treeHelper.pushCheckedItem(me.scope.treeData, me.scope);

                        me.render();
                        paramArg = {
                            record: records
                        };
                        me.scope.onLoadSuccess(paramArg);
                    }, true);
                }
            }
        };

        //选中结点的所有子孙
        DataTreeProto.selectChild = function (item, dataTree) {
            var me = dataTree || this,
                scope = me.scope;
            /*children = item.children || [];
             for (i = 0, len = children.length; i < len; i++) {
             el = children[i];
             //可以选择，并且还没有被选中
             if (me.canCheck(el) && !el.checked) {
             if (!el.checked) {
             el.checked = true;
             me.updateCheckChanges(el);
             }
             if (me.treeHelper.contains(me.scope._chooseItems, el) === false) {
             me.scope._chooseItems.push(el);
             }
             }
             if (el.children && el.children.length > 0) {
             arguments.callee(el, me);
             }
             }*/

            for (var i = 0; i < scope.treeData.length; i++) {
                var nodeData = scope.treeData[i];
                if (containPath(nodeData.path, item.path)) {
                    if (me.canCheck(nodeData) && !nodeData.checked) {
                        nodeData.checked = item.checked;
                        me.updateCheckChanges(nodeData);

                        if (me.treeHelper.contains(me.scope._chooseItems, nodeData) === false) {
                            me.scope._chooseItems.push(nodeData);
                        }
                    }
                }
            }
        };

        //选中结点的所有父结点
        DataTreeProto.selectParent = function (item, dataTree) {
            var me = dataTree || this,
                parentProp, parentNode;
            if (me.scope.cascadeMode && (me.scope.cascadeMode === "limit" || me.scope.cascadeMode === "ymdd")) {
                parentProp = item.parentProp;
                if (parentProp && parentProp !== "") {
                    parentNode = me.treeHelper.searchNodeByTd2Path(me.scope.treeData, parentProp, item.parent.path);
                    if (parentNode) {
                        //可以选择，并且还没有被选中
                        if (me.canCheck(parentNode) && !parentNode.checked) {
                            if (!parentNode.checked) {
                                parentNode.checked = true;
                                me.updateCheckChanges(parentNode);
                            }
                            if (!me.treeHelper.contains(me.scope._chooseItems, parentNode)) {
                                me.scope._chooseItems.push(parentNode);
                            }
                        }
                        arguments.callee(parentNode, me);
                    }
                }
            }
        };

        //从选中数据中删除结点的所有子孙
        DataTreeProto.unSelectChildren = function (item, dataTree) {
            var me = dataTree || this,
                scope = me.scope;
            /*children = item.children || [];
             for (i = 0, len = children.length; i < len; i++) {
             el = children[i];
             //删除已经被选中的结点
             if (me.canCancelCheck(el)) {
             if (el.checked) {
             el.checked = false;
             me.updateCheckChanges(el);
             }
             me.treeHelper.remove(me.scope._chooseItems, el);
             }
             if (el.children && el.children.length > 0) {
             arguments.callee(el, me);
             }
             }*/

            for (var i = 0; i < scope.treeData.length; i++) {
                var nodeData = scope.treeData[i];
                // nodeData.path.toString().indexOf(item.path) === 0
                if (containPath(nodeData.path, item.path)) {
                    //删除已经被选中的结点
                    if (me.canCancelCheck(nodeData)) {
                        if (nodeData.checked) {
                            nodeData.checked = false;
                            me.updateCheckChanges(nodeData);
                        }
                        me.treeHelper.remove(me.scope._chooseItems, nodeData);
                    }
                }
            }
        };

        //从选中数据中删除结点的所有祖先
        DataTreeProto.unSelectParent = function (item, dataTree) {
            var me = dataTree || this,
                allUnChecked = true,
                children, parentProp, parentNode;
            if (me.scope.cascadeMode && me.scope.cascadeMode === "ymdd") {
                parentProp = item.parentProp;
                if (parentProp && parentProp !== "") {
                    parentNode = me.treeHelper.searchNodeByTd2Path(me.scope.treeData, parentProp, item.parent.path);
                    if (parentNode && parentNode.checked) {
                        //父结点的所有子结点
                        /*children = parentNode.children || [];
                         angular.forEach(children, function (item) {
                         if (item.checked && me.canCheck(item)) {
                         allUnChecked = false;
                         }
                         });*/

                        for (var i = 0; i < me.scope.treeData.length; i++) {
                            var nodeData = me.scope.treeData[i];
                            //nodeData.path.toString().indexOf(parentNode.path) === 0
                            if (nodeData.path != parentNode.path && containPath(nodeData.path, parentNode.path) &&
                                nodeData.checked && me.canCheck(nodeData)) {
                                allUnChecked = false;
                                break;
                            }
                        }
                        if (allUnChecked && me.canCancelCheck(parentNode)) {
                            me.$body.find("[data-id=" + parentNode.idProp + "]").find(".tree-fi-clickbox").removeAttr("defaultSelected").removeAttr("selected");
                            parentNode.checked = false;
                            me.updateCheckChanges(parentNode);
                            me.treeHelper.remove(me.scope._chooseItems, parentNode);
                            arguments.callee(parentNode, me);
                        }
                    }
                }
            }
        };

        //判断结点是否可选
        DataTreeProto.canCheck = function (item) {
            var me = this,
                flag = false,
                result = false;
            if (item.showBox && !me.scope.disabled) {
                if (!item.readonly && !item.disabled) {
                    flag = true;
                }
            }
            if (flag) {
                if (me.scope.radio) {
                    if (item.type === 'leaf') {
                        result = true;
                    } else if (me.scope.allowChooseParent) {
                        result = true;
                    }
                } else {
                    if (item.type === 'leaf') {
                        result = true;
                    } else if (me.scope.allowChooseParent) {
                        result = true;
                    }
                }
            }
            return result;
        };

        //判断结点是否可取消勾选
        DataTreeProto.canCancelCheck = function (item) {
            var me = this;
            if (item.showBox && item.checked) {
                if (!me.scope.disabled) {
                    if (!item.readonly && !item.disabled) {
                        return true;
                    }
                }
            }
            return false;
        };

        //凑数是否可设为当前行
        DataTreeProto.canSetCurrentRow = function (item, $event) {
            var me = this,
                beforeSelect = me.scope.onBeforeSelect,
                result = false,
                selectParams;
            selectParams = {
                $event: $event,
                record: item.originData
            };
            if (!me.scope.disabled) {
                if (beforeSelect === undefined || beforeSelect(selectParams) !== false) {
                    result = true;
                }
            }
            return result;
        };

        //取消其他结点的编辑状态
        DataTreeProto.cancelOtherEditable = function (item) {
            var me = this,
                treeData = me.scope.treeData;
            me.treeHelper._cancelOtherEditable(treeData, item);
        };

        //清除所有勾选值
        DataTreeProto.clearChooseItems = function () {
            var me = this,
                i, len, el;
            len = me.scope._chooseItems.length;
            for (i = 0; i < len; i++) {
                el = me.scope._chooseItems[i];
                el.checked = false;
            }
            me.scope._chooseItems = [];
            me.$body.find(".tree-fi-clickbox").removeAttr("defaultSelected").removeAttr("selected");
        };

        //保存checked修改值
        DataTreeProto.updateCheckChanges = function (item) {
            var me = this,
                flag = false,
                i, len, ele, el;
            for (i = 0, len = me.scope.checkChanges.length; i < len; i++) {
                ele = me.scope.checkChanges[i];
                for (var idProp in ele) {
                    if (ele.hasOwnProperty(idProp)) {
                        if (idProp === item.idProp) {
                            flag = true;
                            if (ele[idProp] !== item.checked) {
                                me.scope.checkChanges.splice(i, 1);
                            }
                            break;
                        }
                    }
                }
            }
            if (!flag) {
                el = {};
                el[item.idProp] = item.checked;
                me.scope.checkChanges.push(el)
            }
        };

        //获取树中所有check改变值
        DataTreeProto.getCheckChanges = function () {
            var me = this;
            return me.scope.checkChanges;
        };

        //清除所有check改变状态
        DataTreeProto.clearCheckChanges = function () {
            var me = this;
            me.scope.checkChanges = [];
        };

        //根据结点，设置结点的显示值
        DataTreeProto.setItemDisplayExpress = function (idProp, value) {
            var me = this,
                scope = me.scope,
                ele;
            if (_(idProp).isEmpty() || _(value).isEmpty()) {
                return;
            }
            ele = me.treeHelper.searchNodeByTd(scope.treeData, idProp);
            if (ele) {
                this.$timeout(function () {
                    ele.displayExpress = value;
                    var $el = me.$body.find("[data-id=" + idProp + "]");
                    $el.find("input").val(value);
                    var html = me.renderItem({data: ele});
                    $el.find("span").last().html(html || value);
                });
            }
        };

        DataTreeProto.isLazy = function () {
            var me = this,
                scope = me.scope;

            if (me.__LAZY === undefined) {
                var contentHeight = me.getContentHeight(true),
                    bodyHeight = me.$body.height();

                me.__LAZY = (!scope.async && bodyHeight < contentHeight / 2);
            }
            return me.__LAZY;
        };

        /**
         * 懒加载渲染，任意滚动位置都可调用
         * @param nodeDatas
         */
        DataTreeProto.lazyRender = function () {
            var me = this,
                contentHeight = me.getContentHeight(),
                scrollTop = parseInt(me.$body.scrollTop());

            var topSpaceHeight = 0,
                bottomSpaceHeight = 0,
                hideNodeCount = 0,
                pageSize = me.getPageSize(),
                nodeDatas = [],
                len = pageSize + LAZY_NODE_COUNT,
                nodeIndex = 0, n = 0,
                scrollFlag = false;

            if (scrollTop >= 0) {
                var bodyHeight = me.$body.height();
                if (scrollTop + bodyHeight > contentHeight) { // && contentHeight > bodyHeight
                    nodeIndex = me.scope.treeData.length - 1;
                    while (n <= pageSize && nodeIndex >= 0) {
                        if (me.isDisplay(me.scope.treeData[nodeIndex])) {
                            nodeDatas.push(me.scope.treeData[nodeIndex]);
                            n++;
                        }
                        nodeIndex--;
                    }

                    nodeDatas = nodeDatas.reverse();
                    topSpaceHeight = contentHeight - nodeDatas.length * NODE_HEIGHT;
                    bottomSpaceHeight = 0;
                    scrollFlag = true;
                } else {
                    hideNodeCount = parseInt(scrollTop / NODE_HEIGHT);
                    topSpaceHeight = hideNodeCount * NODE_HEIGHT;

                    for (var i = 0; i < me.scope.treeData.length; i++) {
                        if (n == hideNodeCount) {
                            nodeIndex = i;
                            break;
                        }
                        if (me.isDisplay(me.scope.treeData[i])) {
                            n++;
                        }
                    }
                    n = 0;
                    while (n < len && nodeIndex < me.scope.treeData.length) {
                        if (me.isDisplay(me.scope.treeData[nodeIndex])) {
                            nodeDatas.push(me.scope.treeData[nodeIndex]);
                            n++;
                        }
                        nodeIndex++;
                    }
                    bottomSpaceHeight = (contentHeight - (nodeDatas.length + hideNodeCount) * NODE_HEIGHT);
                }
            }

            var topSpace = document.createElement("div");
            topSpace.className = "top-space";
            topSpace.style.height = topSpaceHeight + "px";
            var bottomSpace = document.createElement("div");
            bottomSpace.className = "bottom-space";
            bottomSpace.style.height = bottomSpaceHeight + "px";
            me.$body.empty();
            me.$body.append(topSpace);
            me.renderDisplayNodes(nodeDatas, {reset: true});
            me.$body.append(bottomSpace);

            if (scrollFlag) {
                me.$body.scrollTop(scrollTop);
                me.lastScrollTop = me.$body.scrollTop();
            }
            me.$topSpace = $(topSpace);
            me.$bottomSpace = $(bottomSpace);
        };

        DataTreeProto.render = function () {
            var me = this,
                scope = me.scope;

            if (!me.isLazy()) {
                me.renderDisplayNodes(scope.treeData, {reset: true});
            } else {
                if (!me.lastScrollTop) me.lastScrollTop = 0;
                me.scrollDistance = 0;
                me.lazyRender();

                me.$body.on("scroll", function () {
                    var scrollTop = me.$body.scrollTop();
                    me.scrollDistance += scrollTop - me.lastScrollTop;
                    var scrollDistance = me.scrollDistance;
                    // console.log(scrollDistance + "--" + scrollTop + "--" + me.lastScrollTop);
                    me.lastScrollTop = scrollTop;

                    if (Math.abs(scrollDistance) >= NODE_HEIGHT) {
                        var mod = scrollDistance % NODE_HEIGHT;
                        scrollDistance -= mod;
                        me.scrollDistance -= scrollDistance;
                        var count = Math.ceil(Math.abs(scrollDistance) / NODE_HEIGHT);

                        var renderOptions = scrollDistance > 0 ? {insertBefore: me.$body.find(".bottom-space")} : {insertAfter: me.$body.find(".top-space")};
                        var nodeDatas = [];
                        var n = 0;
                        var index = scrollDistance > 0 ?
                            parseInt(me.$body.children(".tree-item").last().attr("data-index")) :
                            parseInt(me.$body.children(".tree-item").first().attr("data-index"));

                        while (n < count) {
                            if (scrollDistance > 0) {
                                index++;
                                if (index == scope.treeData.length) break;
                            } else {
                                index--;
                                if (index < 0) break;
                            }
                            var nodeData = scope.treeData[index];
                            if (me.isDisplay(nodeData)) {
                                nodeDatas.push(nodeData);
                                n++;
                            }
                        }
                        me.renderDisplayNodes(nodeDatas, renderOptions);
                        var nodes = me.$body.find(".tree-item");
                        var removeNodes = scrollDistance > 0 ? nodes.slice(0, nodeDatas.length) : nodes.slice(nodes.length - nodeDatas.length, nodes.length);
                        _.each(removeNodes, function (removeNodeEl) {
                            me.removeNode(removeNodeEl);
                        });

                        var topSpaceHeight = me.$topSpace.height();
                        var bottomSpaceHeight = me.$bottomSpace.height();
                        var diffHeight = nodeDatas.length * NODE_HEIGHT;
                        if (scrollDistance > 0) {
                            topSpaceHeight += diffHeight;
                            bottomSpaceHeight -= diffHeight;
                        } else {
                            topSpaceHeight -= diffHeight;
                            bottomSpaceHeight += diffHeight;
                        }
                        me.$topSpace.css("height", topSpaceHeight);
                        me.$bottomSpace.css("height", bottomSpaceHeight);
                    }
                });
            }
        };

        DataTreeProto.getPageSize = function () {
            var me = this;
            if (!me.__PAGE_SIZE) {
                var bodyHeight = me.$element.height();
                me.__PAGE_SIZE = Math.ceil(bodyHeight / NODE_HEIGHT);
            }
            return me.__PAGE_SIZE;
        };

        DataTreeProto.removeNode = function (nodeEl) {
            nodeEl.parentNode.removeChild(nodeEl);
        };

        DataTreeProto.clearNodes = function () {
            var me = this;
            me.$body.find(".tree-item").each(function (i, nodeEl) {
                me.removeNode(nodeEl);
            });
        };

        DataTreeProto.renderDisplayNodes = function (nodeDatas, options) {
            var me = this;
            if (options && options.reset) me.clearNodes();
            for (var i = 0; i < nodeDatas.length; i++) {
                var node = new TreeNode(this, nodeDatas[i]);
                var el = node.getEl();
                if (options && options.insertBefore)
                    $(el).insertBefore(options.insertBefore);
                else if (options && options.insertAfter)
                    $(el).insertAfter(options.insertAfter);
                else
                    me.$body.append(el);

                if (nodeDatas[i].checked && !me.treeHelper.contains(me.scope._chooseItems, nodeDatas[i], me.scope.config)) {
                    me.scope._chooseItems.push(nodeDatas[i]);
                }
                if (!nodeDatas[i].display || !me.isDisplay(nodeDatas[i]))
                    el.style.display = "none";
            }
        };

        DataTreeProto.getContentHeight = function (all) {
            var me = this,
                scope = me.scope,
                height = 0;

            for (var i = 0; i < scope.treeData.length; i++) {
                var node = scope.treeData[i];
                if (all || me.isDisplay(node)) height += NODE_HEIGHT;
            }
            return height;
        };

        //判断节点是否显示（PS：父及祖父节点收缩就无法显示）
        DataTreeProto.isDisplay = function (node) {
            var parent = node.parent;
            if (!parent) return true;
            while (parent) {
                if (!parent.expanded) return false;
                parent = parent.parent;
            }
            return true;
        };

        //获取收缩节点路径
        DataTreeProto.getCollapseNodes = function () {
            var me = this,
                scope = me.scope,
                treeData = scope.treeData,
                nodes = [];

            for (var i = 0; i < treeData.length; i++) {
                if (!treeData[i].expanded) nodes.push(treeData[i]);
            }
            return nodes;
        };

        /**
         * 添加节点
         * @param data 节点数据，如有父节点，设置parentProp
         * @param index 添加的位置，兄弟节点的位置
         */
        DataTreeProto.append = function (data, index) {
            var me = this, node, pos = -1;
            var nodeData = me.$treeHelper.createNode(data, me.scope.config);
            var parentNodeData = me.$treeHelper.searchNodeByTd(me.scope.treeData, nodeData.parentProp);
            if (parentNodeData) {
                nodeData.level = parentNodeData.level + 1;
                nodeData.path = parentNodeData.path + "," + nodeData.idProp;

                pos = me.$treeHelper.findIndex(me.scope.treeData, parentNodeData);
                if (index == undefined || index < 0 || index > parentNodeData.children.length) index = parentNodeData.children.length;
                if (index < 0) index = 0;

                if (index > 0) {
                    var tmp = parentNodeData.children[index - 1];
                    if (tmp.children.length > 0) {
                        var tmpIndex = me.$treeHelper.findIndex(me.scope.treeData, tmp);
                        for (var i = tmpIndex + 1; i < me.scope.treeData.length; i++) {
                            if (me.scope.treeData[i].path.indexOf(tmp.path + ",") == -1) {
                                pos = i;
                                break;
                            }
                        }
                    } else {
                        pos = me.$treeHelper.findIndex(me.scope.treeData, tmp) + 1;
                    }
                } else {
                    pos += 1;
                }

                nodeData.parent = parentNodeData;
                parentNodeData.children.push(nodeData);
                me.scope.treeData.splice(pos, 0, nodeData);
            } else {
                nodeData.level = 1;
                nodeData.path = nodeData.idProp;
                me.scope.treeData.push(nodeData);
            }
            node = new TreeNode(me, nodeData);
            if (me.isLazy()) {
                me.lazyRender();
            } else {
                var el = node.getEl();
                if (parentNodeData) {
                    if (!parentNodeData["expanded"] && window.document.documentMode !== 8) el.style.display = "node";

                    if (!(me.scope.async && !parentNodeData["expanded"])) {
                        var children = me.$body.children();
                        $(el).insertAfter($(children[pos - 1]));
                        /*for (var i = 0; i < children.length; i++) {
                         var $el = $(children[i]);
                         if ($el.attr("data-id") == parentNodeData["idProp"]) {
                         var sNodeData = me.scope.treeData[i + index];
                         if (sNodeData.children.length > 0) {
                         for (var j = (i + index + 1); j < me.scope.treeData.length; j++) {
                         if (me.scope.treeData[j].path.indexOf(sNodeData.path + ",") == -1) {
                         $(el).insertAfter($(children[j - 1]));
                         break;
                         }
                         }
                         } else {
                         $(el).insertAfter($(children[i + index]));
                         }
                         break;
                         }
                         }*/
                    }
                } else {
                    me.$body.append(el);
                }
            }
        };

        /**
         * 更新节点
         * @param data
         */
        DataTreeProto.update = function (data) {
            var me = this;
            var nodeData = me.$treeHelper.searchNodeByTd(me.scope.treeData, data[me.scope.config.idProp]);
            nodeData.originData = data;
            nodeData.displayExpress = data[me.scope.config.displayExpress];
            var children = me.$body.children();
            for (var i = 0; i < children.length; i++) {
                var $el = $(children[i]);
                if ($el.attr("data-id") == nodeData["idProp"]) {
                    $el.find("input").val(nodeData.displayExpress);
                    var html = me.renderItem({data: nodeData});
                    $el.find("span").last().html(html || nodeData.displayExpress);
                    break;
                }
            }
        };

        /**
         * 移除节点
         * @param idProp
         */
        DataTreeProto.remove = function (idProp) {
            var me = this;
            var nodeData = me.$treeHelper.searchNodeByTd(me.scope.treeData, idProp);
            if (nodeData.children.length > 0) {
                me.GillionMsg.alert("提示", "有子节点，不允许移除节点！");
                return;
            }
            if (nodeData.parent) {
                for (var i = 0; i < nodeData.parent.children.length; i++) {
                    if (nodeData.parent.children[i].idProp == nodeData.idProp) {
                        nodeData.parent.children.splice(i, 1);
                        break;
                    }
                }
            }
            var index = me.$treeHelper.findIndex(me.scope.treeData, nodeData);
            me.scope.treeData.splice(index, 1);
            if (me.isLazy()) {
                me.lazyRender();
            } else {
                var children = me.$body.children();
                for (var i = 0; i < children.length; i++) {
                    var $el = $(children[i]);
                    if ($el.attr("data-id") == nodeData["idProp"]) {

                        $el.remove();
                        break;
                    }
                }
            }
        };

        /**
         * 渲染节点
         * @param params
         */
        DataTreeProto.renderItem = function (params) {
            return this.$attrs.renderItem ? this.scope.renderItem(params) : false;
        };

        var TreeNode = function (tree, data) {
            this.tree = tree;
            this.scope = tree.scope;
            this.data = data;
        };
        var TreeNodeProto = TreeNode.prototype;

        TreeNodeProto._getClassName = function (classNameList) {
            if (_.isObject(classNameList)) {
                var result = "";
                _.each(classNameList, function (v, className) {
                    if (!v) return;
                    if (result != "") result += " ";
                    result += className;
                });
                return result;
            } else if (_.isArray(classNameList)) {
                return classNameList.join(" ");
            } else if (angular.isString(classNameList)) {
                return classNameList;
            } else {
                return "";
            }
        };

        TreeNodeProto.getEl = function () {
            var me = this,
                treeScope = me.scope,
                dataTree = me.tree,
                nodeData = me.data;

            var node = document.createElement("div");
            node.setAttribute("data-id", nodeData["idProp"]);
            node.setAttribute("data-path", nodeData["path"]);
            if (dataTree.isLazy()) node.setAttribute("data-index", nodeData["index"]);
            if (nodeData.selected) node.setAttribute("selected", "selected");
            node.className += " tree-item";
            if (nodeData.level == 0) node.className += " first-level";
            if (nodeData.type == "leaf") node.setAttribute("leaf", "true");
            if (nodeData.type == "branch" && nodeData.expanded) node.setAttribute("open", "true");
            node.onclick = function ($event) {
                // me.data.clickCheck = true;
                // me.data.children && dataTree.$treeHelper.updateClickCheck(me.data.children);
                me.nodeClick($event)
            };

            for (var i = 0; i < nodeData.level; i++) {
                var lineSeparator = document.createElement("span");
                lineSeparator.className = "line-separator";
                lineSeparator.appendChild(document.createTextNode("　"));
                node.appendChild(lineSeparator);
            }

            var folderIcon = document.createElement("i");
            folderIcon.className = "fi tree-fi-folder";
            folderIcon.onclick = function ($event) {
                $event = $event || window.event;
                var paramArg,
                    beforeExpand = treeScope.beforeExpand,
                    onExpand = treeScope.onExpand;
                $event.stopPropagation();
                if (!treeScope.disabled && nodeData.type === "branch") {
                    nodeData = dataTree.$treeHelper.searchNodeByTd2Path(treeScope.treeData, nodeData.idProp, nodeData.path);
                    if (dataTree.isLazy()) {
                        if (treeScope._currentRow) treeScope._currentRow.selected = false;
                        nodeData.selected = true;
                    }
                    dataTree.__action = "folder";
                    paramArg = {
                        record: nodeData.originData,
                        item: nodeData
                    };

                    var target = $event.currentTarget || $event.target || $event.srcElement;
                    if (!nodeData.expanded) {
                        if (beforeExpand === undefined || !(beforeExpand(paramArg) === false)) {
                            var childNodes = treeScope.treeData.filter(function(node){
                                return (nodeData.idProp != node.idProp && containPath(node.path, nodeData.path));
                            });
                            if (treeScope.async && _.isEmpty(nodeData.children) && childNodes.length == 0) {
                                nodeData.expanded = true;
                                me.loadChild(target.parentNode, nodeData, paramArg);
                            } else {
                                nodeData.expanded = true;
                                me.expandNode($event, nodeData);
                                target.parentNode.setAttribute("open", "true");
                                if (onExpand !== undefined) {
                                    paramArg.item = nodeData;
                                    onExpand(paramArg);
                                }
                            }
                        }
                    } else {
                        nodeData.expanded = false;
                        target = $event.target || $event.srcElement;
                        me.expandNode($event, nodeData);
                        target.parentNode.removeAttribute("open");
                    }
                }
            };
            node.appendChild(folderIcon);

            if (treeScope.showCheckBox) {
                if((nodeData.type === "branch" && treeScope.allowChooseParent) || nodeData.type === "leaf"){
                    var boxIcon = document.createElement("i");
                    boxIcon.className = "fi tree-fi-clickbox";
                    // if (!dataTree.canCheck(nodeData)) boxIcon.setAttribute("canchoose", "false");
                    // else
                    if (treeScope.radio) {
                        boxIcon.setAttribute("mode", "radio");
                        if (nodeData.type === "branch") boxIcon.setAttribute("canchoose", "false");
                    }
                    if (nodeData.checked) boxIcon.setAttribute("selected", "selected");

                    boxIcon.onclick = function ($event) {
                        me.data.clickCheck = true;
                        me.chooseItem($event, me.data);
                    };
                    node.appendChild(boxIcon);
                }
            }

            var itemClass = "";
            if (treeScope.gItemClass) {
                itemClass = treeScope.gItemClass({record: nodeData.originData});
                itemClass = getClassName(itemClass);
            }

            var input = document.createElement("input");
            if (!(nodeData.editable === true && nodeData.readonly === false && nodeData.disabled === false)) {
                input.style.display = "none";
            }
            input.value = nodeData.displayExpress;
            input.type = "text";
            input.style.width = "50%";
            if (itemClass) {
                input.className = itemClass;
            }
            input.onblur = function ($event) {
                me.onBlur($event, nodeData);
            };
            input.onkeypress = function ($event) {
                me.onKeyPress($event, nodeData);
            };
            node.appendChild(input);

            var span = document.createElement("span");
            if (nodeData.editable) span.style.display = "none";
            var html = dataTree.renderItem({data: nodeData});
            span.innerHTML = html || nodeData.displayExpress;
            if (itemClass) {
                span.className = itemClass;
            }
            span.ondblclick = function ($event) {
                me.onDblClick($event, nodeData);
            };
            node.appendChild(span);
            return node;
        };

        TreeNodeProto.nodeClick = function ($event) {
            $event = $event || window.event;
            var me = this, treeScope = me.scope, dataTree = me.tree, el, onSelect, selectParams;
            onSelect = treeScope.onSelect;
            var item = dataTree.$treeHelper.searchNodeByTd2Path(treeScope.treeData, me.data.idProp, me.data.path);
            selectParams = {
                $event: $event,
                record: item.originData,
				item: item
            };
            if (dataTree.canSetCurrentRow(item, $event)) {
                if (treeScope._currentRow) treeScope._currentRow.selected = false;
                item.selected = true;
                el = item.originData;
                treeScope.currentRow = el;
                treeScope._currentRow = item;
                if (dataTree.__action != "folder" || !dataTree.isLazy()) {
                    dataTree.$body.find(".tree-item").removeAttr("defaultSelected").removeAttr("selected");
                    var target = $event.currentTarget || $event.target || $event.srcElement;
                    if (window.document.documentMode === 8 && target.innerHTML === "") {
                        target = target.parentNode;
                    }
                    target.setAttribute("selected", "selected");
                }
                if (!(treeScope.$$phase || treeScope.$root.$$phase)) {
                    treeScope.$apply();
                }
                if (onSelect !== undefined) {
                    onSelect(selectParams);
                }
            }
            delete dataTree.__action;
        };

        TreeNodeProto.loadChild = function (parentEl, item, paramArg) {
            var me = this, treeScope = me.scope, dataTree = me.tree, params = {};
            if (treeScope.source.params === undefined) treeScope.source.params = {};
            if (_.isFunction(treeScope.source.params)) params = treeScope.source.params();
            else params = treeScope.source.params;
            params[treeScope.config.idProp] = item.idProp;
            params.clickCheck = item.clickCheck || false;
            params.checked = item.checked;
            delete treeScope.source.params.child;
            dataTree.$dataSourceManager.dataSources[treeScope.sourceName].doRequestData(params, function (_dataSource) {
                var records, nodeDatas;
                records = angular.copy(_dataSource.records);
                if (!records || records.length === 0) {
                    item.type = "leaf";
                    parentEl.setAttribute("leaf", "true");
                } else {
                    parentEl.setAttribute("open", "true");
                    var $parentEl = $(parentEl);
                    nodeDatas = dataTree.$treeHelper.transChildren(item, records, treeScope.config);
                    var nodeIndex = dataTree.$treeHelper.findIndex(treeScope.treeData, item);
                    for (var i = 1; i <= nodeDatas.length; i++) {
                        treeScope.treeData.splice(nodeIndex + i, 0, nodeDatas[i - 1]);
                    }
                    item.children = nodeDatas;
                    dataTree.renderDisplayNodes(angular.copy(nodeDatas).reverse(), {insertAfter: $parentEl});
                }
                if (treeScope.onExpand !== undefined) {
                    treeScope.onExpand(paramArg);
                }
            }, true);
        };

        TreeNodeProto.expandNode = function ($event, nodeData) {
            $event = $event || window.event;
            var me = this, dataTree = me.tree, treeScope = dataTree.scope;
            if (dataTree.isLazy()) {
                dataTree.lazyRender();
            } else {
                dataTree.$body.find(".tree-item").each(function (i, el) {
                    var id = el.getAttribute("data-id");
                    var path = el.getAttribute("data-path");
                    //不应该根据nodeId搜索，应该根据路径搜索
                    var node = dataTree.$treeHelper.searchNodeByPath(treeScope.treeData, path);
                    //var node = dataTree.$treeHelper.searchNodeByTd(treeScope.treeData, id);
                    

                    var childNodes = treeScope.treeData.filter(function(item){
                        return (node.idProp != item.idProp && containPath(item.path, node.path));
                    });
                    if (nodeData.idProp != id && containPath(path, nodeData.path)) {
                        el.style.display = (nodeData.expanded && dataTree.isDisplay(node)) ? "" : "none";
                        // 展开时改变图标
                        if (node.type == "branch" && nodeData.expanded && node.expanded && childNodes.length > 0) {
                            el.setAttribute("open", "true");
                        }
                    }
                });
            }
        };

        //结点双击事件
        TreeNodeProto.onDblClick = function ($event, item) {
            $event = $event || window.event;
            var me = this, treeScope = me.scope, dataTree = me.tree;
            if (treeScope.doubleEdit && !item.readonly) {
                if (!item.disabled && !treeScope.disabled) {
                    dataTree.cancelOtherEditable(item);
                    item.editable = true;

                    dataTree.$body.find("span").show();
                    dataTree.$body.find("input").hide();

                    var target = $event.currentTarget || $event.target || $event.srcElement;
                    var $nodeEl = $(target.parentNode);
                    $nodeEl.find("span").last().hide();
                    $nodeEl.find("input").show();
                }
            }
        };
        //回车失去焦点
        TreeNodeProto.onKeyPress = function ($event) {
            $event = $event || window.event;
            if ($event.keyCode === 13) {
                $event.target.blur();
            }
        };
        //失去焦点事件
        TreeNodeProto.onBlur = function ($event, item) {
            $event = $event || window.event;
            var me = this, treeScope = me.scope, dataTree = me.tree,
                expressValue, beforeRename, onRename, ele, argument, target;
            beforeRename = treeScope.beforeRename;
            onRename = treeScope.onRename;
            ele = item.originData;
            target = $event.target || $event.srcElement;
            expressValue = angular.element(target).val();
            argument = {
                value: expressValue,
                record: ele
            };
            if (beforeRename === undefined || beforeRename(argument) !== false) {
                item.displayExpress = expressValue;
                item.originData[treeScope.config.displayExpress] = expressValue;
                var $nodeEl = angular.element(target.parentNode);
                var html = dataTree.renderItem({data: ele});
                $nodeEl.find("span").last().html(html || expressValue).show();
                $nodeEl.find("input").hide();
                if (onRename !== undefined) onRename(argument);
            }
            item.editable = false;
        };

        //点击勾选框后执行的函数
        TreeNodeProto.chooseItem = function ($event, item) {
            $event = $event || window.event;
            var me = this, treeScope = me.scope, dataTree = me.tree,
                eventParams = {
                    $event: $event,
                    record: item.originData,
                    item: item
                },
                beforeCheck = treeScope.onBeforeCheck,
                onCheck = treeScope.onCheck,
                clickCheck = item.clickCheck;
            //判断是否可选
            if (dataTree.canCheck(item)) {
                if (beforeCheck === undefined || beforeCheck(eventParams) !== false) {
                    item = dataTree.treeHelper.searchNodeByTd2Path(treeScope.treeData, item.idProp, item.path);
                    item.checked = !item.checked;
                    item.clickCheck = clickCheck;
                    item.children && dataTree.$treeHelper.updateClickCheck(item.children);
                    dataTree.updateCheckChanges(item);
                    if (treeScope.radio) {
                        dataTree.clearChooseItems();
                        dataTree.$body.find(".tree-fi-clickbox").removeAttr("defaultSelected").removeAttr("selected");
                        if(item.checked){
                            var target = $event.currentTarget || $event.target || $event.srcElement;
                            target.setAttribute("selected", "selected");
                        }
                    }
                    if (item.checked === true) {
                        if (dataTree.$treeHelper.contains(treeScope._chooseItems, item) === false) {
                            treeScope._chooseItems.push(item);
                        }
                        //级联添加
                        if (treeScope.allowCascadeSelect && !treeScope.radio) {
                            dataTree.selectChild(item);
                            dataTree.selectParent(item);
                        }
                        //展开所有子结点
                        if (treeScope.allowCascadeSelect && !treeScope.radio && treeScope.cascadeMode === "ymdd") {
                            dataTree._expandAll(item);
                        }
                    } else {
                        dataTree.$treeHelper.remove(treeScope._chooseItems, item);
                        //级联删除
                        if (treeScope.allowCascadeSelect && !treeScope.radio) {
                            dataTree.unSelectChildren(item);
                            dataTree.unSelectParent(item);
                        }
                    }
                    if (!treeScope.radio) {
                        dataTree.$body.find(".tree-item").each(function (i, el) {
                            var id = el.getAttribute("data-id");
							var path = el.getAttribute("data-path");
                            var box = $(el).find(".tree-fi-clickbox");
                            var nodeData = dataTree.treeHelper.searchNodeByTd2Path(treeScope.treeData, id, path);
                            if (nodeData.checked) {
                                box.attr("selected", "selected");
                                if (window.document.documentMode === 8) {
                                    box.prop("selected", "selected");
                                }
                            } else {
                                box.removeAttr("defaultSelected").removeAttr("selected");
                            }
                        });
                    }
                    //onCheck事件
                    if (onCheck !== undefined) {
                        treeScope.$apply();
                        dataTree.$timeout(function () {
                            eventParams.item = item;
                            onCheck(eventParams);
                        }, 100);
                    }
                }
            }
        };

        function getClassName(classNameList) {
            if (_.isArray(classNameList)) {
                return classNameList.join(" ");
            } else if (_.isObject(classNameList)) {
                var result = "";
                _.each(classNameList, function (v, className) {
                    if (!v) return;
                    if (result != "") result += " ";
                    result += className;
                });
                return result;
            } else if (angular.isString(classNameList)) {
                return classNameList;
            } else {
                return "";
            }
        };

        function containPath(subPath, parentPath) {
            return subPath.toString().indexOf(parentPath + ",") === 0
        }

        return function ($compile, $dataSourceManager, $templateCache, $dataTreeManager, $treeHelper, $timeout) {
            var recursiveTemplate, template;
            template = '<div class="tree">\n <div ng-disabled="disabled" class="tree-head"> \n <ul class="tree-head-selecteds"> \n <li ng-bind=\'titleExpress===""?"":(titleExpress || "选择：")\'></li> \n <li ng-disabled="disabled" ng-repeat="item in _chooseItems" ng-click="deleteChooseItem(item)">{{item.displayExpress}}</li> \n </ul> \n <button ng-if="showRechoose"  ng-disabled="disabled" class="btn tree-btn-reset"  ng-click="clearChooseItems()">重选</button> \n </div> \n <div class="tree-body"> \n </div> \n </div>';
            recursiveTemplate = '<div class="tree-item" ng-click="rowClick($event,item)"> \n <i class="fi tree-fi-folder"  ng-click="expandNode($event,item)"></i> \n <i class="fi tree-fi-clickbox" ng-click="chooseItem($event,item)"></i> \n <span ng-dblclick="onDblClick($event,item)" ng-if="item.editable===false"  outer-scope="item.itemRootScope" render-item-class="item.itemClass" render-item-class-locals="{record:item.originData}" >{{item.displayExpress}}</span> \n <input style="width:50%;" ng-blur="onBlur($event,item)"  ng-keypress="onKeyPress($event,item)" ng-if="item.editable===true && item.readonly===false && item.disabled===false"   outer-scope="item.itemRootScope" render-item-class="item.itemClass" render-item-class-locals="{record:item.originData}" value="{{item.displayExpress}}"/> \n </div> \n <ul tree-nodes  ng-model="item.children"> \n <li tree-node  ng-repeat="item in item.children"   ng-include="\'/datatree/template\'"></li> \n </ul>';
            $templateCache.put("/datatree/template", recursiveTemplate);
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    currentRow: '=',
                    sourceName: '@',
                    showSelect: '&',
                    disabled: '@',
                    chooseItems: '=',
                    onBeforeSelect: '&',
                    onSelect: '&',
                    onBeforeCheck: '&',
                    onCheck: '&',
                    titleExpress: '@',
                    onLoadSuccess: '&',
                    treeName: '@',
                    displayItem: '&',
                    editable: '&',
                    beforeRename: '&',
                    onRename: '&',
                    readonlyItem: '&',
                    disabledItem: '&',
                    beforeExpand: '&',
                    onExpand: '&',
                    gItemClass: '&',
                    renderItem: '&'
                },
                template: template,
                require: ['gDataTree', '?^ngModel'],
                link: function (scope, element, attrs, ctrls) {
                    var displayExpress = attrs.displayExpress,
                        valueProp = attrs.valueProp,
                        parentProp = attrs.parentProp,
                        idProp = attrs.idProp,
                        hasChildProp = attrs.hasChildProp,
                        checkedProp = attrs.checkedProp,
                        mode = attrs.mode || 'radio',
                        isExpandAll = attrs.isExpandAll || 'false',
                        async = attrs.async || 'false',
                        allowCascadeSelect = attrs.allowCascadeSelect || 'false',
                        allowChooseParent = attrs.allowChooseParent || 'true',
                        width = attrs.width,
                        height = attrs.height,
                        showRechoose = attrs.showRechoose || 'true',
                        showCheckBox = attrs.showCheckBox || 'true',
                        cascadeMode = attrs.cascadeMode || 'default',
                        doubleEdit = attrs.doubleEdit || 'false',
                        config, dataTree, unitRegExp, ngModel;
                    scope.checkChanges = [];
                    scope.async = async === 'true';
                    //保存当前行数据
                    scope.currentRow = {};
                    scope._currentRow = {};
                    scope.cascadeMode = cascadeMode;
                    scope.showCheckBox = showCheckBox === 'true';
                    scope.doubleEdit = doubleEdit === 'true';
                    scope.allowCascadeSelect = allowCascadeSelect === 'true';
                    dataTree = ctrls[0];
                    ngModel = ctrls[1]
                    //表示数据源中树关系字段
                    config = {};
                    config.idProp = idProp;
                    config.parentProp = parentProp;
                    config.hasChildProp = hasChildProp;
                    config.valueProp = valueProp;
                    config.displayExpress = displayExpress;
                    config.async = async;
                    config.mode = mode;
                    config.allowChooseParent = allowChooseParent;
                    config.checkedProp = checkedProp;
                    config.showBox = scope.showSelect;
                    config.isExpandAll = isExpandAll;
                    config.displayItem = scope.displayItem;
                    config.editable = scope.editable;
                    config.readonlyItem = scope.readonlyItem;
                    config.disabledItem = scope.disabledItem;

                    scope.config = config;
                    scope.radio = (mode === 'radio');
                    scope.showRechoose = (showRechoose === 'true');
                    scope.allowChooseParent = (allowChooseParent === 'true');
                    //已选中的记录
                    scope._chooseItems = [];
                    //已经转化好的树型数据
                    scope.treeData = [];
                    if (scope.treeName) {
                        $dataTreeManager.registerDataTree(scope.treeName, dataTree);
                    }
                    //设置控件的宽度
                    unitRegExp = /^[0-9]+(%|in|cm|mm|pt|pc|ex|em|px)?$/g;
                    if (width) {
                        if (unitRegExp.test(width)) {
                            element.css("width", width);
                        } else {
                            throw "宽度设置错误";
                        }
                    }
                    //设置控件的高度
                    unitRegExp = /^[0-9]+(%|in|cm|mm|pt|pc|ex|em|px)?$/g;
                    if (height) {
                        if (unitRegExp.test(height)) {
                            element.css("height", height);
                        } else {
                            throw "高度设置错误";
                        }
                    }

                    //树的初始化
                    function initTreeData(dataSource) {
                        var records, paramArg;
                        if (window.document.documentMode === 8) {
                            records = _.clone(dataSource.records);
                        } else {
                            records = angular.copy(dataSource.records);
                        }
                        if (!scope.source) {
                            scope.source = dataSource;
                        }
                        scope.treeData = $treeHelper.buildTree(records, scope.config);
                        $treeHelper.pushCheckedItem(scope.treeData, scope);
                        paramArg = {
                            record: records
                        };
                        dataTree.render();
                        scope.onLoadSuccess(paramArg);
                    }

                    scope.initTreeData = initTreeData;


                    //加载数据
                    if (async === "false") {
                        scope.$on(scope.sourceName, function (event, dataSource) {
                            initTreeData(dataSource);
                        });
                    } else {
                        $dataSourceManager.getDataSource(scope.sourceName).then(function (dataSource) {
                            if (dataSource.params === undefined) {
                                dataSource.params = {};
                            }
                            dataSource.doRequestData(dataSource.params, initTreeData, true);
                        });
                    }

                    //点击重选执行的函数
                    scope.clearChooseItems = function () {
                        if (angular.isUndefined(scope.disabled)) {
                            dataTree.clearChooseItems();
                            if (window.document.documentMode === 8) {
                                dataTree.clearChooseItems();
                            }
                        }
                    };

                    //点击上面选中值文字执行的函数
                    scope.deleteChooseItem = function (item) {
                        if (dataTree.canCancelCheck(item)) {
                            $treeHelper.remove(scope._chooseItems, item);
                            item.checked = false;
                            dataTree.updateCheckChanges(item);
                            //级联删除
                            if (scope.allowCascadeSelect && !scope.radio) {
                                dataTree.unSelectChildren(item);
                            }
                        }
                    };

                    if (ngModel) {
                        ngModel.$render = function () {
                            var modelValues, itemValues, items, i, len, el, _i, _len;
                            dataTree.clearChooseItems();
                            modelValues = ngModel.$viewValue;
                            if (!modelValues) return;
                            if (scope.radio) {
                                items = $treeHelper.findNodeByValue(scope.treeData, modelValues);
                                if (items && items.length > 0) {
                                    if (items[0].showBox && items[0].type === "leaf") {
                                        items[0].checked = true;
                                        scope._chooseItems.push(items[0]);
                                    }
                                }
                            } else {
                                if (modelValues && modelValues.length > 0) {
                                    itemValues = modelValues.split(",");
                                }
                                for (i = 0, len = itemValues.length; i < len; i++) {
                                    items = $treeHelper.findNodeByValue(scope.treeData, itemValues[i]);
                                    if (items && items.length > 0) {
                                        for (_i = 0, _len = items.length; _i < _len; _i++) {
                                            el = items[_i];
                                            if ((el.showBox && scope.allowChooseParent && el.type === "branch") || (el.type === "leaf" && el.showBox)) {
                                                el.checked = true;
                                                scope._chooseItems.push(el);
                                            }
                                        }
                                    }
                                }
                            }

                            dataTree.$body.find(".tree-item").each(function (i, el) {
                                var id = el.getAttribute("data-id");
                                var box = $(el).find(".tree-fi-clickbox");
                                var nodeData = dataTree.treeHelper.searchNodeByTd(scope.treeData, id);
                                if (nodeData.checked) {
                                    box.attr("selected", "selected");
                                    if (window.document.documentMode === 8) {
                                        box.prop("selected", "selected");
                                    }
                                } else {
                                    box.removeAttr("defaultSelected").removeAttr("selected");
                                }
                            });
                        };
                        //当树中已选中项发生改就时，更改ngModel的值。
                        scope.$watchCollection("_chooseItems", function (newValue) {
                            var chooseItems = [], modelValue = "";
                            angular.forEach(newValue, function (item) {
                                modelValue += item.valueProp + ",";
                                chooseItems.push(item.originData);
                            });
                            scope.chooseItems = chooseItems;
                            chooseItems = null;
                            if (modelValue && modelValue.length > 0) {
                                modelValue = modelValue.substring(0, modelValue.length - 1);
                            }
                            if (ngModel.$viewValue !== modelValue) {
                                if (scope.$root.$$phase) {
                                    ngModel.$setViewValue(modelValue);
                                } else {
                                    scope.$apply(function () {
                                        ngModel.$setViewValue(modelValue);
                                    });
                                }
                            }
                        });

                        scope.$on("$destroy", function () {
                            element.remove();
                        });

                    }

                },
                controller: ['$scope', '$element', '$attrs', 'GillionMsg', function ($scope, $element, $attrs, GillionMsg) {
                    return new DataTree($scope, $element, $attrs, $treeHelper, $timeout, $dataSourceManager, GillionMsg);
                }]
            }
        }
    }
);
