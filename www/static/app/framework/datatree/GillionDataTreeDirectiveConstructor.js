//define('framework/datatree/GillionDataTreeDirectiveConstructor', ["angular"], function (angular) {
//        var DataTreeProto = DataTree.prototype;
//
//        function DataTree(scope, element, attrs) {
//            this.scope = scope;
//            this.element = element;
//            this.attrs = attrs;
//        }
//
//        //根据id获取结点
//        DataTreeProto.searchNodeById = function (idProp) {
//            var ele;
//            ele = searchNodeByTd(this.scope.treeData, idProp);
//            if (ele) {
//                return ele.originData;
//            }
//        };
//        //根据显示值获取结点
//        DataTreeProto.searchNodeByValue = function (value) {
//            var result = [],
//                nodes, i, len;
//            nodes = findNodeByValue(this.scope.treeData, value);
//            if (nodes && nodes.length > 0) {
//                for (i = 0, len = nodes.length; i < len; i++) {
//                    result.push(nodes[i].originData);
//                }
//            }
//            return result;
//        };
//        //查询子结点
//        DataTreeProto.searchChildren = function (idProp) {
//            var children = [],
//                ele, i, len;
//            ele = searchNodeByTd(this.scope.treeData, idProp);
//            if (ele && ele.children && ele.children.length > 0) {
//                for (i = 0, len = ele.children.length; i < len; i++) {
//                    children.push(ele.children[i].originData);
//                }
//            }
//            return children;
//        };
//        //设置隐藏或显示
//        DataTreeProto.displayNode = function (idProp, show) {
//            var el, i, len;
//            if (angular.isUndefined(show)) {
//                show = true;
//            }
//            if (angular.isArray(idProp) && idProp.length > 0) {
//                for (i = 0, len = idProp.length; i < len; i++) {
//                    el = searchNodeByTd(this.scope.treeData, idProp[i]);
//                    el.display = show;
//                }
//            } else {
//                el = searchNodeByTd(this.scope.treeData, idProp);
//                el.display = show;
//            }
//        };
//        //设置编辑状态
//        DataTreeProto.editable = function (idProp, editable) {
//            var el, i, len;
//            if (angular.isUndefined(editable)) {
//                editable = true;
//            }
//            if (angular.isArray(idProp) && idProp.length > 0) {
//                for (i = 0, len = idProp.length; i < len; i++) {
//                    el = searchNodeByTd(this.scope.treeData, idProp[i]);
//                    el.editable = editable;
//                }
//            } else {
//                el = searchNodeByTd(this.scope.treeData, idProp);
//                el.editable = editable;
//            }
//        };
//        //展开结点
//        DataTreeProto.expandNode = function (idProp, expand, isChildren) {
//            var scope = this.scope,
//                config = scope.config,
//                paramArg, item;
//            expand = expand !== false;
//            item = searchNodeByTd(scope.treeData, idProp);
//            if (angular.isUndefined(scope.disabled) && item.disabled === false) {
//                paramArg = {
//                    record: item.originData
//                };
//                if (item.expanded === false && expand === true) {
//                    if (!(scope.beforeExpand(paramArg) === false)) {
//                        if (scope.async === "true") {
//                            scope.source.params[config.idProp] = item.idProp;
//                            if (isChildren === true) {
//                                scope.source.params.child = "true";
//                            }
//                            scope.source.doRequestData(scope.source.params, function (_dataSource) {
//                                var records, children;
//                                records = angular.copy(_dataSource.records);
//                                if (item) {
//                                    if (!records || records.length === 0) {
//                                        item.type = "leaf";
//                                    } else {
//                                        children = createChildren(item, records, config, isChildren);
//                                        angular.extend(item.children, children);
//                                        for (var i = 0; i < children.length; i++) {
//                                            children[i].parent = item;
//                                        }
//                                    }
//                                }
//                                item.expanded = !item.expanded;
//                                scope.onExpand(paramArg);
//                            }, true);
//                        } else {
//                            item.expanded = !item.expanded;
//                            scope.onExpand(paramArg);
//                        }
//                    }
//                } else if (item.expanded === true && expand === false) {
//                    item.expanded = !item.expanded;
//                }
//            }
//        };
//        //凑数是否可设为当前行
//        DataTreeProto.canSetCurrentRow = function (item) {
//            var me = this,
//                beforeSelect = me.scope.onBeforeSelect,
//                result = false,
//                selectParams;
//            selectParams = {
//                record: item.originData
//            };
//            if (!me.scope.disabled) {
//                if (beforeSelect === undefined || beforeSelect(selectParams) !== false) {
//                    result = true;
//                }
//            }
//            return result;
//        };
//
//        //根据value设置当前行
//        DataTreeProto.gotoRow = function (value, index) {
//            var me = this,
//                result = -1,
//                onSelect = me.scope.onSelect,
//                ele, items, selectParams;
//            if (index === undefined) index = 0;
//            items = findNodeByDisplay(me.scope.treeData, value);
//            if (items && items.length > 0) {
//                ele = items[index];
//                if (ele) {
//                    selectParams = {
//                        record: ele.originData
//                    };
//                    if (me.canSetCurrentRow(ele)) {
//                        me.scope.currentRow = ele.originData;
//                        ele.expanded = true;
//                        this.expandAllParent(ele);
//                        if (onSelect !== undefined) {
//                            onSelect(selectParams);
//                        }
//                    }
//                    result = index === items.length - 1 ? 0 : index + 1;
//                }
//            }
//            return result;
//        };
//        //根据id设置当前行
//        DataTreeProto.setCurrentRow = function (idProp) {
//            var ele;
//            ele = searchNodeByTd(this.scope.treeData, idProp);
//            if (!ele) return;
//            this.scope.currentRow = ele.originData;
//            ele.expanded = true;
//            this.expandAllParent(ele);
//        };
//        //设置只读属性
//        DataTreeProto.readonly = function (idProp, readonly) {
//            var el, i, len;
//            if (angular.isUndefined(readonly)) {
//                readonly = true;
//            }
//            if (angular.isArray(idProp) && idProp.length > 0) {
//                for (i = 0, len = idProp.length; i < len; i++) {
//                    el = searchNodeByTd(this.scope.treeData, idProp[i]);
//                    el.readonly = readonly;
//                }
//            } else {
//                el = searchNodeByTd(this.scope.treeData, idProp);
//                el.readonly = readonly;
//            }
//        };
//        //设置disable属性
//        DataTreeProto.disabled = function (idProp, disabled) {
//            var el, i, len;
//            if (angular.isUndefined(disabled)) {
//                disabled = true;
//            }
//            if (angular.isArray(idProp) && idProp.length > 0) {
//                for (i = 0, len = idProp.length; i < len; i++) {
//                    el = searchNodeByTd(this.scope.treeData, idProp[i]);
//                    el.disabled = disabled;
//                }
//            } else {
//                el = searchNodeByTd(this.scope.treeData, idProp);
//                el.disabled = disabled;
//            }
//        };
//        //设置结点的勾选状态
//        DataTreeProto.check = function (idProp, checked) {
//            var me = this,
//                el, i, len;
//            if (angular.isUndefined(checked)) {
//                checked = true;
//            }
//            if (angular.isArray(idProp) && idProp.length > 0) {
//                for (i = 0, len = idProp.length; i < len; i++) {
//                    el = searchNodeByTd(me.scope.treeData, idProp[i]);
//                    if (!el) continue;
//                    if (checked) {
//                        me.doCheck(el);
//                    } else {
//                        if (el.checked === true) {
//                            me.updateCheckChanges(el);
//                            el.checked = false;
//                        } else {
//                            el.checked = false;
//                        }
//                        removeItem(me.scope._chooseItems, el);
//                    }
//                }
//            } else {
//                el = searchNodeByTd(me.scope.treeData, idProp);
//                if (!el) return;
//                if (checked) {
//                    me.doCheck(el);
//                } else {
//                    if (el.checked === true) {
//                        me.updateCheckChanges(el);
//                        el.checked = false;
//                    } else {
//                        el.checked = false;
//                    }
//                    removeItem(me.scope._chooseItems, el);
//                }
//            }
//        };
//        //展开所有父结点
//        DataTreeProto.expandAllParent = function (item) {
//            var parent = item.parent,
//                flag = parent !== null;
//            while (flag) {
//                parent.expanded = true;
//                parent = parent.parent;
//                flag = parent !== null;
//            }
//        };
//        //重截数据源
//        DataTreeProto.reload = function (records) {
//            var me = this, paramArg;
//            if (angular.isArray(records) && records.length > 0) {
//                me.scope.treeData = [];
//                me.scope.currentRow = {};
//                me.scope._chooseItems = [];
//                me.scope.treeData = buildTree(records, me.scope.config);
//                pushCheckedItem(me.scope.treeData, me.scope);
//                paramArg = {
//                    record: records
//                };
//                me.scope.onLoadSuccess(paramArg);
//            } else {
//                if (me.scope.async === "true") {
//                    if (me.scope.source.params === undefined) {
//                        me.scope.source.params = {};
//                    }
//                    me.scope.dataSource.doRequestData(me.scope.source.params, function (dataSource) {
//                        records = angular.copy(dataSource.records);
//                        me.scope.treeData = [];
//                        me.scope.currentRow = {};
//                        me.scope._chooseItems = [];
//                        me.scope.treeData = buildTree(records, me.scope.config);
//                        pushCheckedItem(me.scope.treeData, me.scope);
//                        paramArg = {
//                            record: records
//                        };
//                        me.scope.onLoadSuccess(paramArg);
//                    }, true);
//                }
//            }
//        };
//
//        //取消其他结点的编辑状态
//        DataTreeProto.cancelOtherEditable = function (item) {
//            var me = this,
//                treeData = me.scope.treeData,
//                i, len, el;
//            for (i = 0, len = treeData.length; i < len; i++) {
//                el = treeData[i];
//                if (el.idProp !== item.idProp) {
//                    el.editable = false;
//                }
//                if (el.children && el.children.length > 0) {
//                    arguments.callee(el.children, item);
//                }
//            }
//        };
//        //判断结点是否可选
//        DataTreeProto.canCheck = function (item) {
//            var me = this,
//                flag = false,
//                result = false;
//            if (item.showBox && !item.checked) {
//                if (!me.scope.disabled) {
//                    if (!item.readonly && !item.disabled) {
//                        flag = true;
//                    }
//                }
//            }
//            if (flag) {
//                if (me.scope.radio) {
//                    if (item.type === 'leaf') {
//                        result = true;
//                    }
//                } else {
//                    if (item.type === 'leaf') {
//                        result = true;
//                    } else if (me.scope.allowChooseParent) {
//                        result = true;
//                    }
//                }
//            }
//            return result;
//        };
//        //判断结点是否可取消勾选
//        DataTreeProto.canCancelCheck = function (item) {
//            var me = this;
//            if (item.showBox && item.checked) {
//                if (!me.scope.disabled) {
//                    if (!item.readonly && !item.disabled) {
//                        return true;
//                    }
//                }
//            }
//            return false;
//        };
//        //选中结点的所有子孙
//        DataTreeProto.selectChild = function (item) {
//            var me = this,
//                i, len, el, children;
//            children = item.children || [];
//            for (i = 0, len = children.length; i < len; i++) {
//                el = children[i];
//                //可以选择，并且还没有被选中
//                if (me.canCheck(el)) {
//                    if (!el.checked) {
//                        el.checked = true;
//                        me.updateCheckChanges(el);
//                    }
//                    if (contains(scope._chooseItems, el, config) === false) {
//                        me.scope._chooseItems.push(el);
//                    }
//                }
//                if (el.children && el.children.length > 0) {
//                    arguments.callee(el);
//                }
//            }
//        };
//        //选中结点的所有父结点
//        DataTreeProto.selectParent = function (item) {
//            var me = this,
//                parentProp, parentNode;
//            if (me.scope.cascadeMode && me.scope.cascadeMode === "limit") {
//                parentProp = item.parentProp;
//                if (parentProp && parentProp !== "") {
//                    parentNode = searchNodeByTd(me.scope.treeData, parentProp);
//                    if (parentNode) {
//                        //可以选择，并且还没有被选中
//                        if (me.canCheck(parentNode)) {
//                            if (!parentNode.checked) {
//                                parentNode.checked = true;
//                                me.updateCheckChanges(parentNode);
//                            }
//                            if (!contains(me.scope._chooseItems, parentNode, me.scope.config)) {
//                                me.scope._chooseItems.push(parentNode);
//                            }
//                        }
//                        arguments.callee(parentNode);
//                    }
//                }
//            }
//        };
//        //从选中数据中删除结点的所有子孙
//        DataTreeProto.unSelectChildren = function (item) {
//            var me = this,
//                i, len, el, children;
//            children = item.children || [];
//            for (i = 0, len = children.length; i < len; i++) {
//                el = children[i];
//                //删除已经被选中的结点
//                if (me.canCancelCheck(el)) {
//                    if (el.checked) {
//                        el.checked = false;
//                        me.updateCheckChanges(el);
//                    }
//                    remove(me.scope._chooseItems, el);
//                }
//                if (el.children && el.children.length > 0) {
//                    arguments.callee(el);
//                }
//            }
//        };
//        //保存checked修改值
//        DataTreeProto.updateCheckChanges = function (item) {
//            var me = this,
//                flag = false,
//                i, len, ele, el;
//            for (i = 0, len = me.scope.checkChanges.length; i < len; i++) {
//                ele = me.scope.checkChanges[i];
//                for (var idProp in ele) {
//                    if (ele.hasOwnProperty(idProp)) {
//                        if (idProp === item.idProp) {
//                            flag = true;
//                            if (ele[idProp] !== item.checked) {
//                                me.scope.checkChanges.splice(i, 1);
//                            }
//                            break;
//                        }
//                    }
//                }
//            }
//            if (!flag) {
//                el = {};
//                el[item.idProp] = item.checked;
//                me.scope.checkChanges.push(el)
//            }
//        };
//        //执行勾选
//        DataTreeProto.doCheck = function (item) {
//            var me = this;
//            if (me.canCheck(item)) {
//                item.checked = true;
//                me.updateCheckChanges(item);
//                if (!contains(me.scope._chooseItems, item, me.scope.config)) {
//                    me.scope._chooseItems.push(item);
//                }
//
//            }
//        };
//        //清除所有勾选值
//        DataTreeProto.clearChooseItems = function () {
//            var me = this,
//                i, len, el;
//            len = me.scope._chooseItems.length;
//            for (i = 0; i < len; i++) {
//                el = me.scope._chooseItems[i];
//                el.checked = false;
//            }
//            me.scope._chooseItems = [];
//        };
//        function removeItem(source, item) {
//            var i, len = source.length;
//            for (i = 0; i < len; i++) {
//                if (source[i] === item) {
//                    source.splice(i, 1);
//                    break;
//                }
//            }
//        }
//
//        function remove(source, item) {
//            for (var i = 0; i < source.length; i++) {
//                if (source[i].idProp === item.idProp) {
//                    source.splice(i, 1);
//                    break;
//                }
//            }
//        }
//
//        function contains(source, item) {
//            var flag = false;
//            for (var i = 0; i < source.length; i++) {
//                if (source[i].idProp === item.idProp) {
//                    flag = true;
//                    break;
//                }
//            }
//            return flag;
//        }
//
//        //根据id查找结点
//        function searchNodeByTd(treeData, id) {
//            var i, len, el, result, childRes;
//            for (i = 0, len = treeData.length; i < len; i++) {
//                el = treeData[i];
//                if (el.idProp === id) {
//                    result = el;
//                    break;
//                }
//                if (el.children && el.children.length > 0) {
//                    childRes = arguments.callee(el.children, id);
//                }
//                if (childRes) {
//                    result = childRes;
//                    break;
//                }
//            }
//            return result;
//        }
//
//        //根据值查找结点
//        function findNodeByValue(treeData, value) {
//            var result = [], childItems = [],
//                i, len, el;
//            for (i = 0, len = treeData.length; i < len; i++) {
//                el = treeData[i];
//                if (el.valueProp === value) {
//                    result.push(el);
//                }
//                if (el.children && el.children.length > 0) {
//                    childItems = arguments.callee(el.children, value);
//                }
//                if (childItems && childItems.length > 0) {
//                    result = result.concat(childItems);
//                    childItems = [];
//                }
//            }
//            return result;
//        }
//
//        //根据显示值查找结点
//        function findNodeByDisplay(treeData, value) {
//            var result = [], childItems = [],
//                i, len, el;
//            for (i = 0, len = treeData.length; i < len; i++) {
//                el = treeData[i];
//                if (el.displayExpress.indexOf(value) !== -1) {
//                    result.push(el);
//                }
//                if (el.children && el.children.length > 0) {
//                    childItems = arguments.callee(el.children, value);
//                }
//                if (childItems && childItems.length > 0) {
//                    result = result.concat(childItems);
//                    childItems = [];
//                }
//            }
//            return result;
//        }
//
//        //生成结点
//        function createNode(item, config) {
//            var prop = config.idProp,
//                parentProp = config.parentProp,
//                hasChildProp = config.hasChildProp,
//                valueProp = config.valueProp,
//                displayExpress = config.displayExpress,
//                showBox = config.showBox,
//                isExpandAll = config.isExpandAll,
//                async = config.async,
//                itemClass = config.itemClass,
//                itemRootScope = config.itemRootScope,
//                displayItem = config.displayItem,
//                editable = config.editable,
//                readonlyItem = config.readonlyItem,
//                disabledItem = config.disabledItem,
//                checkedProp = config.checkedProp,
//                ele, el, show, display, editable1, readonly, disabled;
//            el = item;
//            ele = {};
//            ele.idProp = el[prop];
//            ele.parentProp = el[parentProp];
//            ele.valueProp = el[valueProp];
//            ele.displayExpress = el[displayExpress];
//            ele.showBox = true;
//            if (angular.isFunction(showBox())) {
//                ele.showBox = (showBox()(el) === true);
//            } else {
//                show = showBox(el);
//                if (show !== undefined) {
//                    ele.showBox = (show === true);
//                }
//            }
//            ele.originData = el;
//            ele.checked = el[checkedProp] === "true" || el[checkedProp] === true;
//            ele.children = [];
//            ele.display = true;
//            if (angular.isFunction(displayItem())) {
//                ele.display = (displayItem()(el) === true);
//            } else {
//                display = displayItem(el);
//                if (display !== undefined) {
//                    ele.display = (display === true);
//                }
//            }
//            ele.editable = false;
//            if (angular.isFunction(editable())) {
//                ele.editable = (editable()(el) === true);
//            } else {
//                editable1 = editable(el);
//                if (editable1 !== undefined) {
//                    ele.editable = (editable1 === true);
//                }
//            }
//            ele.readonly = false;
//            if (angular.isFunction(readonlyItem())) {
//                ele.readonly = (readonlyItem()(el) === true);
//            } else {
//                readonly = readonlyItem(el);
//                if (readonly !== undefined) {
//                    ele.readonly = (readonly === true);
//                }
//            }
//            ele.disabled = false;
//            if (angular.isFunction(disabledItem())) {
//                ele.disabled = (disabledItem()(el) === true);
//            } else {
//                disabled = disabledItem(el);
//                if (disabled !== undefined) {
//                    ele.disabled = (disabled === true);
//                }
//            }
//            ele.expanded = false;
//            if (async === "true") {
//                if (el[hasChildProp] === 'true' || el[hasChildProp] === true || !hasChildProp) {
//                    ele.type = "branch";
//                } else {
//                    ele.type = "leaf";
//                }
//            } else {
//                ele.type = "leaf";
//                if (isExpandAll === "true") {
//                    ele.expanded = true;
//                }
//            }
//            ele.itemClass = itemClass;
//            ele.itemRootScope = itemRootScope;
//            ele.parent = null;
//            return ele;
//        }
//
//        //构建树
//        function buildTree(source, config) {
//            var result = [],
//                tempArray = [],
//                tempObject = {},
//                i, el, ele;
//            if (!source || source.length === 0) {
//                return result;
//            }
//            for (i = 0; i < source.length; i++) {
//                el = source[i];
//                ele = createNode(el, config);
//                tempArray.push(ele);
//                tempObject[ele.idProp] = ele;
//            }
//            for (i = 0; i < tempArray.length; i++) {
//                el = tempArray[i];
//                if (el.parentProp) {
//                    tempObject[el.parentProp].children.push(el);
//                    tempObject[el.parentProp].type = "branch";
//                    el.parent = tempObject[el.parentProp];
//                } else {
//                    result.push(el);
//                }
//            }
//            return result;
//        }
//
//        //创建子孙结点
//        function createChildren(item, records, config, isChildren) {
//            var result = [],
//                tempArray = [],
//                tempObject = {},
//                i, len, el, ele;
//            if (!records || records.length === 0) {
//                return result;
//            }
//            for (i = 0, len = records.length; i < len; i++) {
//                el = records[i];
//                ele = createNode(el, config);
//                if (isChildren) {
//                    ele.expanded = true;
//                }
//                tempArray.push(ele);
//                tempObject[ele.idProp] = ele;
//            }
//            for (i = 0, len = tempArray.length; i < len; i++) {
//                el = tempArray[i];
//                if (el.parentProp) {
//                    tempObject[el.parentProp].children.push(el);
//                    tempObject[el.parentProp].type = "branch";
//                    el.parent = tempObject[el.parentProp];
//                    if (el.parent.idProp === item.idProp) {
//                        result.push(el);
//                    }
//                }
//            }
//            return result;
//        }
//
//        //加载子结点
//        function transChildren(records, config) {
//            var result = [],
//                i, len, el, ele;
//            for (i = 0, len = records.length; i < len; i++) {
//                el = records[i];
//                ele = createNode(el, config);
//                result.push(ele);
//            }
//            return result;
//        }
//
//        //初始化所有已选中结点
//        function pushCheckedItem(treeData, scope) {
//            var i, len, ele, child;
//            for (i = 0, len = treeData.length; i < len; i++) {
//                ele = treeData[i];
//                if (ele.checked) {
//                    scope._chooseItems.push(ele);
//                }
//                child = ele.children;
//                if (child && child.length > 0) {
//                    arguments.callee(child);
//                }
//            }
//        }
//
//        return function ($compile, Arrays, $dataSourceManager, $templateCache, $dataTreeManager, $timeout) {
//            var recursiveTemplate, template;
//            template = '<div class="tree">' +
//                '   <div ng-disabled="disabled" class="tree-head">' +
//                '      <ul class="tree-head-selecteds">' +
//                '         <li>{{titleExpress===""?"":(titleExpress || "选择：")}}</li>' +
//                '         <li ng-disabled="disabled" ng-repeat="item in _chooseItems" ng-click="deleteChooseItem(item)">{{item.displayExpress}}</li>' +
//                '      </ul>' +
//                '      <button ng-if="showRechoose"  ng-disabled="disabled" class="btn tree-btn-reset"  ng-click="clearChooseItems()">重选</button>' +
//                '   </div>' +
//                '   <div class="tree-body">' +
//                '   <ul ng-include="\'/datatree/template\'"></ul>' +
//                '   </div>' +
//                '</div>';
//            recursiveTemplate = '<li ng-if="(!item.type || item.type===\'branch\') &&  item.expanded && item.display===true" open="true"  ng-repeat-start="item in treeData">' +
//                '   <div class="tree-item" ng-if="currentRow===item.originData" ng-click="rowClick($event,item)" selected="selected" ng-disabled="item.disabled">' +
//                '      <i class="fi tree-fi-folder" ng-click="expandNode(item)"></i>' +
//                '      <i ng-if="!radio && item.checked && item.showBox && allowChooseParent && showCheckBox" class="fi tree-fi-clickbox" selected="selected" ng-click="chooseItem($event,item)"></i>' +
//                '      <i ng-if="!radio && !item.checked && item.showBox && allowChooseParent && showCheckBox" class="fi tree-fi-clickbox" ng-click="chooseItem($event,item)"></i>' +
//                '      <i ng-if="(!item.showBox || radio)  && showCheckBox" class="fi tree-fi-clickbox && showCheckBox" canchoose="false" ng-click="chooseItem($event,item)"></i>' +
//                '      <span ng-dblclick="onDblClick($event,item)" ng-if="item.editable===false"  outer-scope="item.itemRootScope" render-item-class="item.itemClass" render-item-class-locals="{record:item.originData}" >{{item.displayExpress}}</span>' +
//                '      <input style="width:50%;" ng-blur="onBlur($event,item)" ng-keypress="onKeyPress($event,item)" ng-if="item.editable===true && item.readonly===false && item.disabled===false" outer-scope="item.itemRootScope" render-item-class="item.itemClass" render-item-class-locals="{record:item.originData}" value="{{item.displayExpress}}"/>' +
//                '   </div>' +
//                '   <div class="tree-item" ng-if="currentRow!==item.originData" ng-click="rowClick($event,item)" ng-disabled="item.disabled">' +
//                '      <i class="fi tree-fi-folder" ng-click="expandNode(item)"></i>' +
//                '      <i ng-if="!radio && item.checked && item.showBox && allowChooseParent && showCheckBox" class="fi tree-fi-clickbox" selected="selected" ng-click="chooseItem($event,item)"></i>' +
//                '      <i ng-if="!radio && !item.checked && item.showBox && allowChooseParent  && showCheckBox" class="fi tree-fi-clickbox" ng-click="chooseItem($event,item)"></i>' +
//                '      <i ng-if="(!item.showBox || radio)  && showCheckBox" class="fi tree-fi-clickbox" canchoose="false" ng-click="chooseItem($event,item)"></i>' +
//                '      <span ng-dblclick="onDblClick($event,item)" ng-if="item.editable===false"  outer-scope="item.itemRootScope" render-item-class="item.itemClass" render-item-class-locals="{record:item.originData}" >{{item.displayExpress}}</span>' +
//                '      <input style="width:50%;" ng-blur="onBlur($event,item)" ng-keypress="onKeyPress($event,item)"  ng-if="item.editable===true && item.readonly===false && item.disabled===false"   outer-scope="item.itemRootScope" render-item-class="item.itemClass" render-item-class-locals="{record:item.originData}"  value="{{item.displayExpress}}"/>' +
//                '   </div>' +
//                '   <ul ng-include="\'/datatree/template\'" ng-init="treeData=item.children"></ul>' +
//                '</li>' +
//
//                '<li ng-if="(!item.type || item.type===\'branch\') &&  !item.expanded  && item.display===true" >' +
//                '   <div class="tree-item" ng-if="currentRow===item.originData" ng-click="rowClick($event,item)" selected="selected" ng-disabled="item.disabled">' +
//                '      <i class="fi tree-fi-folder" ng-click="expandNode(item)"></i>' +
//                '      <i ng-if="!radio && item.checked && item.showBox && allowChooseParent  && showCheckBox" class="fi tree-fi-clickbox" selected="selected" ng-click="chooseItem($event,item)"></i>' +
//                '      <i ng-if="!radio && !item.checked && item.showBox && allowChooseParent  && showCheckBox" class="fi tree-fi-clickbox" ng-click="chooseItem($event,item)"></i>' +
//                '      <i ng-if="(!item.showBox || radio || !allowChooseParent) && showCheckBox" class="fi tree-fi-clickbox" canchoose="false" ng-click="chooseItem($event,item)"></i>' +
//                '      <span ng-dblclick="onDblClick($event,item)" ng-if="item.editable===false"  outer-scope="item.itemRootScope" render-item-class="item.itemClass" render-item-class-locals="{record:item.originData}" >{{item.displayExpress}}</span>' +
//                '      <input style="width:50%;" ng-blur="onBlur($event,item)" ng-keypress="onKeyPress($event,item)" ng-if="item.editable===true && item.readonly===false && item.disabled===false" outer-scope="item.itemRootScope" render-item-class="item.itemClass" render-item-class-locals="{record:item.originData}" value="{{item.displayExpress}}" />' +
//                '   </div>' +
//                '   <div class="tree-item" ng-if="currentRow!==item.originData" ng-click="rowClick($event,item)"  ng-disabled="item.disabled">' +
//                '      <i class="fi tree-fi-folder" ng-click="expandNode(item)"></i>' +
//                '      <i ng-if="!radio && item.checked && item.showBox && allowChooseParent  && showCheckBox" class="fi tree-fi-clickbox" selected="selected" ng-click="chooseItem($event,item)"></i>' +
//                '      <i ng-if="!radio && !item.checked && item.showBox && allowChooseParent  && showCheckBox" class="fi tree-fi-clickbox" ng-click="chooseItem($event,item)"></i>' +
//                '      <i ng-if="(!item.showBox || radio || !allowChooseParent)  && showCheckBox" class="fi tree-fi-clickbox" canchoose="false" ng-click="chooseItem($event,item)"></i>' +
//                '      <span ng-dblclick="onDblClick($event,item)" ng-if="item.editable===false"  outer-scope="item.itemRootScope" render-item-class="item.itemClass" render-item-class-locals="{record:item.originData}" >{{item.displayExpress}}</span>' +
//                '      <input style="width:50%;" ng-blur="onBlur($event,item)" ng-keypress="onKeyPress($event,item)" ng-if="item.editable===true && item.readonly===false && item.disabled===false" outer-scope="item.itemRootScope" render-item-class="item.itemClass" render-item-class-locals="{record:item.originData}" value="{{item.displayExpress}}"/>' +
//                '   </div>' +
//                '   <ul ng-include="\'/datatree/template\'" ng-init="treeData=item.children"></ul>' +
//                '</li>' +
//
//                '<li ng-if="item.type === \'leaf\'  && item.display===true" ng-repeat-end>' +
//                '    <div class="tree-item"  leaf="true" ng-if="currentRow===item.originData" ng-click="rowClick($event,item)" selected="selected"  ng-disabled="item.disabled">' +
//                '      <i class="fi tree-fi-folder"></i>' +
//                '      <i ng-if="radio && item.checked && item.showBox && showCheckBox" class="fi tree-fi-clickbox" mode="radio" selected="selected" ng-click="chooseItem($event,item)"></i>' +
//                '      <i ng-if="radio && !item.checked && item.showBox  && showCheckBox" class="fi tree-fi-clickbox"  mode="radio" ng-click="chooseItem($event,item)"></i>' +
//                '      <i ng-if="!radio && item.checked && item.showBox  && showCheckBox" class="fi tree-fi-clickbox" selected="selected" ng-click="chooseItem($event,item)"></i>' +
//                '      <i ng-if="!radio && !item.checked && item.showBox  && showCheckBox" class="fi tree-fi-clickbox" ng-click="chooseItem($event,item)"></i>' +
//                '      <i ng-if="!item.showBox  && showCheckBox" class="fi tree-fi-clickbox" canchoose="false"></i>' +
//                '      <span ng-dblclick="onDblClick($event,item)" ng-if="item.editable===false"  outer-scope="item.itemRootScope" render-item-class="item.itemClass" render-item-class-locals="{record:item.originData}" >{{item.displayExpress}}</span>' +
//                '      <input style="width:50%;"  ng-blur="onBlur($event,item)" ng-keypress="onKeyPress($event,item)" ng-if="item.editable===true && item.readonly===false && item.disabled===false"   outer-scope="item.itemRootScope" render-item-class="item.itemClass" render-item-class-locals="{record:item.originData}" value="{{item.displayExpress}}"/>' +
//                '    </div>' +
//                '    <div class="tree-item"  leaf="true" ng-if="currentRow!==item.originData"  ng-click="rowClick($event,item)" ng-disabled="item.disabled">' +
//                '      <i class="fi tree-fi-folder"></i>' +
//                '      <i ng-if="radio && item.checked && item.showBox  && showCheckBox" class="fi tree-fi-clickbox" mode="radio" selected="selected" ng-click="chooseItem($event,item)"></i>' +
//                '      <i ng-if="radio && !item.checked && item.showBox  && showCheckBox" class="fi tree-fi-clickbox"  mode="radio" ng-click="chooseItem($event,item)"></i>' +
//                '      <i ng-if="!radio && item.checked && item.showBox  && showCheckBox" class="fi tree-fi-clickbox" selected="selected" ng-click="chooseItem($event,item)"></i>' +
//                '      <i ng-if="!radio && !item.checked && item.showBox  && showCheckBox" class="fi tree-fi-clickbox" ng-click="chooseItem($event,item)"></i>' +
//                '      <i ng-if="!item.showBox  && showCheckBox" class="fi tree-fi-clickbox" canchoose="false"></i>' +
//                '      <span ng-dblclick="onDblClick($event,item)" ng-if="item.editable===false"  outer-scope="item.itemRootScope" render-item-class="item.itemClass" render-item-class-locals="{record:item.originData}" >{{item.displayExpress}}</span>' +
//                '      <input style="width:50%;"  ng-blur="onBlur($event,item)" ng-keypress="onKeyPress($event,item)" ng-if="item.editable===true && item.readonly===false && item.disabled===false"  outer-scope="item.itemRootScope" render-item-class="item.itemClass" render-item-class-locals="{record:item.originData}" value="{{item.displayExpress}}"/>' +
//                '    </div>' +
//                '</li>';
//            $templateCache.put("/datatree/template", recursiveTemplate);
//            return {
//                restrict: 'E',
//                replace: true,
//                scope: {
//                    currentRow: '=',
//                    sourceName: '@',
//                    showSelect: '&',
//                    disabled: '@',
//                    chooseItems: '=',
//                    checkChanges: '=',
//                    onBeforeSelect: '&',
//                    onSelect: '&',
//                    onBeforeCheck: '&',
//                    onCheck: '&',
//                    titleExpress: '@',
//                    onLoadSuccess: '&',
//                    treeName: '@',
//                    displayItem: '&',
//                    editable: '&',
//                    beforeRename: '&',
//                    onRename: '&',
//                    readonlyItem: '&',
//                    disabledItem: '&',
//                    beforeExpand: '&',
//                    onExpand: '&'
//                },
//                require: ['gDataTree', '?^ngModel', '?^gItemClass'],
//                template: template,
//                compile: function (element, attrs, transclude) {
//                    return function (scope, element, attrs, controllers) {
//                        var displayExpress = attrs.displayExpress,
//                            valueProp = attrs.valueProp,
//                            parentProp = attrs.parentProp,
//                            idProp = attrs.idProp,
//                            hasChildProp = attrs.hasChildProp,
//                            checkedProp = attrs.checkedProp,
//                            mode = attrs.mode || 'radio',
//                            isExpandAll = attrs.isExpandAll || 'false',
//                            async = attrs.async || 'false',
//                            allowCascadeSelect = attrs.allowCascadeSelect || 'false',
//                            allowChooseParent = attrs.allowChooseParent || 'true',
//                            width = attrs.width,
//                            height = attrs.height,
//                            showRechoose = attrs.showRechoose || 'true',
//                            showCheckBox = attrs.showCheckBox || 'true',
//                            cascadeMode = attrs.cascadeMode || 'default',
//                            doubleEdit = attrs.doubleEdit || 'false',
//                            config, dataTree, unitRegExp, ngModel, itemClass;
//                        scope.checkChanges = [];
//                        scope.async = async;
//                        //保存当前行数据
//                        scope.currentRow = {};
//                        scope.cascadeMode = cascadeMode;
//                        scope.showCheckBox = showCheckBox === 'true';
//                        dataTree = controllers[0];
//                        ngModel = controllers[1];
//                        itemClass = controllers[2];
//                        //表示数据源中树关系字段
//                        config = {};
//                        config.idProp = idProp;
//                        config.parentProp = parentProp;
//                        config.hasChildProp = hasChildProp;
//                        config.valueProp = valueProp;
//                        config.displayExpress = displayExpress;
//                        config.async = async;
//                        config.checkedProp = checkedProp;
//                        config.showBox = scope.showSelect;
//                        config.isExpandAll = isExpandAll;
//                        config.itemClass = itemClass;
//                        config.itemRootScope = scope.$parent;
//                        config.displayItem = scope.displayItem;
//                        config.editable = scope.editable;
//                        config.readonlyItem = scope.readonlyItem;
//                        config.disabledItem = scope.disabledItem;
//
//                        scope.config = config;
//                        scope.radio = (mode === 'radio');
//                        scope.showRechoose = (showRechoose === 'true');
//                        scope.allowChooseParent = (allowChooseParent === 'true');
//                        //已选中的记录
//                        scope._chooseItems = [];
//                        //已经转化好的树型数据
//                        scope.treeData = [];
//                        if (scope.treeName) {
//                            $dataTreeManager.registerDataTree(scope.treeName, dataTree);
//                        }
//
//                        //设置控件的宽度
//                        unitRegExp = /^[0-9]+(%|in|cm|mm|pt|pc|ex|em|px)?$/g;
//                        if (width) {
//                            if (unitRegExp.test(width)) {
//                                element.css("width", width);
//                            } else {
//                                throw "宽度设置错误";
//                            }
//                        }
//                        //设置控件的高度
//                        unitRegExp = /^[0-9]+(%|in|cm|mm|pt|pc|ex|em|px)?$/g;
//                        if (height) {
//                            if (unitRegExp.test(height)) {
//                                element.css("height", height);
//                            } else {
//                                throw "高度设置错误";
//                            }
//                        }
//
//                        //树的初始化
//                        function initTreeData(dataSource) {
//                            var records, paramArg;
//                            records = angular.copy(dataSource.records);
//                            if (!scope.source) {
//                                scope.source = dataSource;
//                            }
//                            scope.treeData = buildTree(records, scope.config);
//                            pushCheckedItem(scope.treeData, scope);
//                            paramArg = {
//                                record: records
//                            };
//                            scope.onLoadSuccess(paramArg);
//                        }
//
//
//                        //加载数据
//                        if (async === "false") {
//                            scope.$on(scope.sourceName, function (event, dataSource) {
//                                initTreeData(dataSource);
//                            });
//                        } else {
//                            $dataSourceManager.getDataSource(scope.sourceName).then(function (dataSource) {
//                                if (dataSource.params === undefined) {
//                                    dataSource.params = {};
//                                }
//                                dataSource.doRequestData(dataSource.params, initTreeData, true);
//                            });
//                        }
//                        //结点双击事件
//                        scope.onDblClick = function ($event, item) {
//                            if (doubleEdit === "true" && !item.readonly) {
//                                if (!item.disabled && angular.isUndefined(scope.disabled)) {
//                                    dataTree.cancelOtherEditable(scope.treeData, item);
//                                    item.editable = true;
//                                }
//                            }
//                        };
//                        //回车失去焦点
//                        scope.onKeyPress = function ($event) {
//                            if ($event.keyCode === 13) {
//                                $event.target.blur();
//                            }
//                        };
//                        //失去焦点事件
//                        scope.onBlur = function ($event, item) {
//                            var expressValue, beforeRename, onRename, ele, argument;
//                            beforeRename = scope.beforeRename;
//                            onRename = scope.onRename;
//                            ele = item.originData;
//                            expressValue = angular.element($event.target).val();
//                            argument = {
//                                value: expressValue,
//                                record: ele
//                            };
//                            if (beforeRename === undefined || beforeRename(argument) !== false) {
//                                item.displayExpress = expressValue;
//                                if (onRename !== undefined) {
//                                    onRename(argument);
//                                }
//                            }
//                            item.editable = false;
//                        };
//
//                        function loadChild(item, paramArg) {
//                            if (scope.source.params === undefined) {
//                                scope.source.params = {};
//                            }
//                            scope.source.params[idProp] = item.idProp;
//                            delete scope.source.params.child;
//                            $dataSourceManager.dataSources[scope.sourceName].doRequestData(scope.source.params, function (_dataSource) {
//                                var records, children;
//                                records = angular.copy(_dataSource.records);
//                                if (!records || records.length === 0) {
//                                    item.type = "leaf";
//                                } else {
//                                    children = transChildren(records, config);
//                                    item.children = children;
//                                    angular.forEach(children, function (child) {
//                                        child.parent = item;
//                                        if (child.checked) {
//                                            scope._chooseItems.push(child);
//                                        }
//                                    });
//                                }
//                                item.expanded = true;
//                                scope.onExpand(paramArg);
//                            }, true);
//                        }
//
//                        //展开树枝结点函数
//                        scope.expandNode = function (item) {
//                            var paramArg;
//                            if (angular.isUndefined(scope.disabled)) {
//                                paramArg = {
//                                    record: item.originData
//                                };
//                                if (!item.expanded) {
//                                    if (!(scope.beforeExpand(paramArg) === false)) {
//                                        if (async === "true") {
//                                            loadChild(item, paramArg);
//                                        } else {
//                                            item.expanded = true;
//                                            scope.onExpand(paramArg);
//                                        }
//                                    }
//                                } else {
//                                    item.expanded = false;
//                                }
//                            }
//                        };
//
//                        //点击勾选框后执行的函数
//                        scope.chooseItem = function ($event, item) {
//                            var eventParams = {
//                                    $event: $event,
//                                    record: item.originData
//                                },
//                                beforeCheck = scope.onBeforeCheck,
//                                onCheck = scope.onCheck;
//                            //判断是否可选
//                            if (dataTree.canCheck(item)) {
//                                if (beforeCheck === undefined || beforeCheck(eventParams) !== false) {
//                                    scope.rowClick($event, item);
//                                    item.checked = !item.checked;
//                                    dataTree.updateCheckChanges(item);
//                                    if (scope.radio) {
//                                        dataTree.clearChooseItems();
//                                    }
//                                    if (item.checked === true) {
//                                        if (contains(scope._chooseItems, item, config) === false) {
//                                            scope._chooseItems.push(item);
//                                        }
//                                        //级联添加
//                                        if (allowCascadeSelect === 'true' && !scope.radio) {
//                                            dataTree.selectChild(item);
//                                            dataTree.selectParent(item);
//                                        }
//                                    } else {
//                                        remove(scope._chooseItems, item);
//                                        //级联删除
//                                        if (allowCascadeSelect === 'true' && !scope.radio) {
//                                            dataTree.unSelectChildren(item);
//                                        }
//                                    }
//                                    //onCheck事件
//                                    if (onCheck !== undefined) {
//                                        onCheck(eventParams);
//                                    }
//                                }
//                            }
//                        };
//
//                        //点击上面选中值文字执行的函数
//                        scope.deleteChooseItem = function (item) {
//                            if (angular.isUndefined(scope.disabled)) {
//                                remove(scope._chooseItems, item);
//                                item.checked = false;
//                                dataTree.updateCheckChanges(item);
//                                //级联删除
//                                if (allowCascadeSelect === 'true' && !scope.radio) {
//                                    dataTree.unSelectChildren(item);
//                                }
//                            }
//                        };
//                        //点击重选执行的函数
//                        scope.clearChooseItems = function () {
//                            if (angular.isUndefined(scope.disabled)) {
//                                dataTree.clearChooseItems();
//                            }
//                        };
//                        //改变当前行函数
//                        scope.rowClick = function ($event, item) {
//                            var el, onSelect, selectParams;
//                            onSelect = scope.onSelect;
//                            selectParams = {
//                                $event: $event,
//                                record: item.originData
//                            };
//                            if (dataTree.canSetCurrentRow(item)) {
//                                el = item.originData;
//                                scope.currentRow = el;
//                                if (onSelect !== undefined) {
//                                    onSelect(selectParams);
//                                }
//                            }
//                        };
//
//                        if (ngModel) {
//                            ngModel.$render = function () {
//                                var modelValues, itemValues, items, i, len, el, _i, _len;
//                                dataTree.clearChooseItems();
//                                modelValues = ngModel.$viewValue;
//                                if (!modelValues) return;
//                                if (scope.radio) {
//                                    items = findNodeByValue(scope.treeData, modelValues);
//                                    if (items && items.length > 0) {
//                                        if (items[0].showBox && items[0].type === "leaf") {
//                                            items[0].checked = true;
//                                            scope._chooseItems.push(items[0]);
//                                        }
//                                    }
//                                } else {
//                                    if (modelValues && modelValues.length > 0) {
//                                        itemValues = modelValues.split(",");
//                                    }
//                                    for (i = 0, len = itemValues.length; i < len; i++) {
//                                        items = findNodeByValue(scope.treeData, itemValues[i]);
//                                        if (items && items.length > 0) {
//                                            for (_i = 0, _len = items.length; _i < _len; _i++) {
//                                                el = items[_i];
//                                                if ((el.showBox && scope.allowChooseParent && el.type === "branch") || (el.type === "leaf" && el.showBox)) {
//                                                    el.checked = true;
//                                                    scope._chooseItems.push(el);
//                                                }
//                                            }
//                                        }
//                                    }
//                                }
//                            };
//                            //当树中已选中项发生改就时，更改ngModel的值。
//                            scope.$watchCollection("_chooseItems", function (newValue) {
//                                var chooseItems = [], modelValue = "";
//                                angular.forEach(newValue, function (item) {
//                                    modelValue += item.valueProp + ",";
//                                    chooseItems.push(item.originData);
//                                });
//                                scope.chooseItems = chooseItems;
//                                chooseItems = null;
//                                if (modelValue && modelValue.length > 0) {
//                                    modelValue = modelValue.substring(0, modelValue.length - 1);
//                                }
//                                if (ngModel.$viewValue !== modelValue) {
//                                    if (scope.$root.$$phase) {
//                                        ngModel.$setViewValue(modelValue);
//                                    } else {
//                                        scope.$apply(function () {
//                                            ngModel.$setViewValue(modelValue);
//                                        });
//                                    }
//                                }
//                            });
//                        }
//                    }
//                },
//                controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
//                    $scope.dataTree = new DataTree($scope, $element, $attrs);
//                    return $scope.dataTree;
//                }]
//            }
//        }
//    }
//);
