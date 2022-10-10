(function () {
    define(["angular"], function (angular) {
        var DataTreeHelperProto = DataTreeHelper.prototype;

        function DataTreeHelper() {
        }

        DataTreeHelperProto._cancelOtherEditable = function (treeData, item) {
            var i, len, el;
            if (!treeData || treeData.length === 0) return;
            for (i = 0, len = treeData.length; i < len; i++) {
                el = treeData[i];
                if (el.idProp !== item.idProp) {
                    el.editable = false;
                }
                /*if (el.children && el.children.length > 0) {
                 arguments.callee(el.children, item);
                 }*/
            }
        };

        DataTreeHelperProto.removeItem = function (source, item) {
            var i, len = source.length;
            for (i = 0; i < len; i++) {
                if (source[i] === item) {
                    source.splice(i, 1);
                    break;
                }
            }
        };

        DataTreeHelperProto.remove = function (source, item) {
            for (var i = 0; i < source.length; i++) {
                if (source[i].idProp === item.idProp && source[i].path === item.path) {
                    source.splice(i, 1);
                    break;
                }
            }
        };

        DataTreeHelperProto.contains = function (source, item) {
            var i, len, ele,
                flag = false;
            for (i = 0, len = source.length; i < len; i++) {
                ele = source[i];
                if (ele.idProp === item.idProp) {
                    flag = true;
                    break;
                }
            }
            return flag;
        };

        //根据id查找结点
        DataTreeHelperProto.searchNodeByTd = function (treeData, id) {
            var i, len, el, result, childRes;
            for (i = 0, len = treeData.length; i < len; i++) {
                el = treeData[i];
                if (el.idProp.toString() === id.toString()) {
                    result = el;
                    break;
                }
                /*if (el.children && el.children.length > 0) {
                 childRes = arguments.callee(el.children, id);
                 }*/
                if (childRes) {
                    result = childRes;
                    break;
                }
            }
            return result;
        };
        //根据path查找结点
        DataTreeHelperProto.searchNodeByPath = function (treeData, path) {
            var i, len, el, result, childRes;
            for (i = 0, len = treeData.length; i < len; i++) {
                el = treeData[i];
                if (el.path === path) {
                    result = el;
                    break;
                }
                if (childRes) {
                    result = childRes;
                    break;
                }
            }
            return result;
        };
		
		//根据id和path查找结点
        DataTreeHelperProto.searchNodeByTd2Path = function (treeData, id, path) {
            var i, len, el, result, childRes;
            for (i = 0, len = treeData.length; i < len; i++) {
                el = treeData[i];
                if (el.idProp.toString() === id.toString() && (path == undefined || (path && el.path === path))) {
                    result = el;
                    break;
                }
                if (childRes) {
                    result = childRes;
                    break;
                }
            }
            return result;
        };

        //根据值查找结点
        DataTreeHelperProto.findNodeByValue = function (treeData, value) {
            var result = [], childItems = [],
                i, len, el;
            for (i = 0, len = treeData.length; i < len; i++) {
                el = treeData[i];
                if (el.valueProp === value) {
                    result.push(el);
                }
                /*if (el.children && el.children.length > 0) {
                 childItems = arguments.callee(el.children, value);
                 }
                 if (childItems && childItems.length > 0) {
                 result = result.concat(childItems);
                 childItems = [];
                 }*/
            }
            return result;
        };

        //根据显示值查找结点
        DataTreeHelperProto.findNodeByDisplay = function (treeData, value) {
            var result = [], childItems = [],
                i, len, el, display;
            for (i = 0, len = treeData.length; i < len; i++) {
                el = treeData[i];
                display = el.displayExpress;
                if (!!display) {
                    display = display.toUpperCase();
                    value = value.toUpperCase();
                    if (display.indexOf(value) !== -1) {
                        result.push(el);
                    }
                }
                /*if (el.children && el.children.length > 0) {
                 childItems = arguments.callee(el.children, value);
                 }
                 if (childItems && childItems.length > 0) {
                 result = result.concat(childItems);
                 childItems = [];
                 }*/
            }
            return result;
        };
        //判断结点是否可勾选
        DataTreeHelperProto.canCheck = function (item, config) {
            var result = false;
            if (item.showBox) {
                if (config.mode === "radio") {
                    if (item.type === 'leaf') {
                        result = true;
                    }
                } else {
                    if (item.type === 'leaf') {
                        result = true;
                    } else if (config.allowChooseParent === 'true') {
                        result = true;
                    }
                }
            }
            return result;
        };
        //生成结点
        DataTreeHelperProto.createNode = function (item, config) {
            var prop = config.idProp,
                parentProp = config.parentProp,
                hasChildProp = config.hasChildProp,
                valueProp = config.valueProp,
                displayExpress = config.displayExpress,
                showBox = config.showBox,
                isExpandAll = config.isExpandAll,
                async = config.async,
                displayItem = config.displayItem,
                editable = config.editable,
                readonlyItem = config.readonlyItem,
                disabledItem = config.disabledItem,
                checkedProp = config.checkedProp,
                ele, el, show, display, editable1, readonly, disabled;
            el = item;
            ele = {};
            ele.idProp = el[prop] ? el[prop].toString() : "";
            ele.parentProp = el[parentProp] ? el[parentProp].toString() : "";
            ele.valueProp = el[valueProp] ? el[valueProp].toString() : "";
            ele.displayExpress = el[displayExpress] ? el[displayExpress].toString() : "";
            ele.showBox = true;
            if (angular.isFunction(showBox())) {
                ele.showBox = (showBox()(el) === true);
            } else {
                show = showBox(el);
                if (show !== undefined) {
                    ele.showBox = (show === true);
                }
            }
            ele.originData = el;
            ele.children = [];
            ele.display = true;
            if (angular.isFunction(displayItem())) {
                ele.display = (displayItem()(el) === true);
            } else {
                display = displayItem(el);
                if (display !== undefined) {
                    ele.display = (display === true);
                }
            }
            ele.editable = false;
            if (angular.isFunction(editable())) {
                ele.editable = (editable()(el) === true);
            } else {
                editable1 = editable(el);
                if (editable1 !== undefined) {
                    ele.editable = (editable1 === true);
                }
            }
            ele.readonly = false;
            if (angular.isFunction(readonlyItem())) {
                ele.readonly = (readonlyItem()(el) === true);
            } else {
                readonly = readonlyItem(el);
                if (readonly !== undefined) {
                    ele.readonly = (readonly === true);
                }
            }
            ele.disabled = false;
            if (angular.isFunction(disabledItem())) {
                ele.disabled = (disabledItem()(el) === true);
            } else {
                disabled = disabledItem(el);
                if (disabled !== undefined) {
                    ele.disabled = (disabled === true);
                }
            }
            ele.expanded = false;
            if (async === "true") {
                if (el[hasChildProp] === 'true' || el[hasChildProp] === true || !hasChildProp) {
                    ele.type = "branch";
                } else {
                    ele.type = "leaf";
                }
            } else {
                ele.type = "leaf";
                if (isExpandAll === "true") {
                    ele.expanded = true;
                }
            }
            ele.parent = null;
            ele.selected = false;
            ele.checked = (el[checkedProp] === "true" || el[checkedProp] === true) && this.canCheck(ele, config);
            return ele;
        };

        //构建树
        DataTreeHelperProto.buildTree = function (source, config) {
            var me = this,
                result = [],
                tempArray = [],
                tempObject = {},
                i, el, ele;
            if (!source || source.length === 0) {
                return result;
            }
            for (i = 0; i < source.length; i++) {
                el = source[i];
                ele = me.createNode(el, config);
                tempArray.push(ele);
                tempObject[ele.idProp] = ele;
            }
            for (i = 0; i < tempArray.length; i++) {
                el = tempArray[i];
                if (el.parentProp) {
                    if (!tempObject[el.parentProp] || !tempObject[el.parentProp].children) continue;
                    tempObject[el.parentProp].children.push(el);
                    tempObject[el.parentProp].type = "branch";
                    el.parent = tempObject[el.parentProp];
                } else {
                    result.push(el);
                }
            }

            var data = [];
            for (var i = 0; i < result.length; i++) {
                this.buildTreeData(data, result[i], 0, "");
            }

            for (var i = 0; i < data.length; i++) {
                data[i].index = i;
            }
            return data;
        };

        DataTreeHelperProto.buildTreeData = function (data, node, level, path) {
            var me = this;
            node.level = level;
            node.path = path == "" ? node.idProp : (path + "," + node.idProp);
            data.push(node);
            if (!node.children || node.children.length == 0)return;
            level++;
            for (var i = 0; i < node.children.length; i++) {
                arguments.callee(data, node.children[i], level, node.path);
            }
        };


        //创建子孙结点
        DataTreeHelperProto.createChildren = function (item, records, config, isChildren) {
            var me = this,
                result = [],
                tempArray = [],
                tempObject = {},
                i, len, el, ele;
            if (!records || records.length === 0) {
                return result;
            }
            for (i = 0, len = records.length; i < len; i++) {
                el = records[i];
                ele = me.createNode(el, config);
                if (isChildren) {
                    ele.expanded = true;
                }
                ele.clickCheck = item.clickCheck || false;
                if (item.clickCheck) {
                    ele.checked = item.checked;
                }
                tempArray.push(ele);
                tempObject[ele.idProp] = ele;
            }
            for (i = 0, len = tempArray.length; i < len; i++) {
                el = tempArray[i];
                if (el.parentProp) {
                    if (tempObject[el.parentProp]) {
                        tempObject[el.parentProp].children.push(el);
                        tempObject[el.parentProp].type = "branch";
                        el.parent = tempObject[el.parentProp];
                    }
                    if (el.parentProp === item.idProp) {
                        if (el.parent == null) el.parent = item;
                        result.push(el);
                    }
                }
            }
            return result;
        };

        //加载子结点
        DataTreeHelperProto.transChildren = function (parent, records, config) {
            var me = this,
                result = [],
                level = parent.level + 1,
                i, len, el, ele;

            for (i = 0, len = records.length; i < len; i++) {
                el = records[i];
                ele = me.createNode(el, config);
                ele.level = level;
                ele.path = parent.path + "," + ele.idProp;
                ele.parent = parent;
                ele.clickCheck = parent.clickCheck || false;
                if (parent.clickCheck) {
                    ele.checked = parent.checked;
                }
                result.push(ele);
            }
            return result;
        };

        //初始化所有已选中结点
        DataTreeHelperProto.pushCheckedItem = function (treeData, scope) {
            var i, len, ele, child;
            for (i = 0, len = treeData.length; i < len; i++) {
                ele = treeData[i];
                if (ele.checked) {
                    scope._chooseItems.push(ele);
                }
                /*child = ele.children;
                if (child && child.length > 0 && scope) {
                    arguments.callee(child, scope);
                }*/
            }
        };

        DataTreeHelperProto.updateClickCheck = function(item) {
            for (var i=0; i<item.length;i++){
                item[i].clickCheck = true;
                if (item[i].children && item[i].children.length > 0) {
                    this.updateClickCheck(item[i].children);
                }
            }
        }

        DataTreeHelperProto.findIndex = function (treeData, item) {
            for (var i = 0; i < treeData.length; i++) {
                if (treeData[i].idProp == item.idProp)return i;
            }
        };
        return function () {
            return new DataTreeHelper();
        };
    });
})();