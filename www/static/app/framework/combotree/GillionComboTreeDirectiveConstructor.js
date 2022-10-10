define('framework/combotree/GillionComboTreeDirectiveConstructor', ['angular'], function (angular) {
    return function (Arrays, $dataSourceManager, $templateCache, GillionLocationService, ZIndex) {
        var template, recursiveTemplate;
        var recursiveTemplate, template;

        template = '<div class="form-tree" style="width:400px;">' +
            '  <input ng-disabled="disabled" type="text" class="form-text"/>' +
            '  <a ng-disabled="disabled" type="button" class="btn dropdown-toggle">' +
            '     <i class="fi fi-caret" ng-click="showComboTree()"></i>' +
            '  </a>' +
            '  <div class="tree form-tree-dropdown" style="width:400px;" ng-show="isShow">' +
            '    <div class="tree-body">' +
            '       <ul ng-include="\'/combotree/template\'">' +
            '      </ul>' +
            '    </div>' +
            '  </div>' +
            '</div>';

        recursiveTemplate = '<li ng-if="(!item.type || item.type===\'branch\') && item.expanded" open="true" ng-repeat-start="item in treeData">' +
            '   <div class="tree-item">' +
            '      <i class="fi tree-fi-folder" ng-click="expandNode(item)"></i>' +
            '      <i ng-if="!radio && item.checked && item.showBox && allowChooseParent" class="fi tree-fi-clickbox" selected="selected" ng-click="chooseItem($event,item)"></i>' +
            '      <i ng-if="!radio && !item.checked && item.showBox && allowChooseParent" class="fi tree-fi-clickbox" ng-click="chooseItem($event,item)"></i>' +
            //'      <i ng-if="!item.showBox || radio || !allowChooseParent" class="fi tree-fi-clickbox" canchoose="false" ng-click="chooseItem($event,item)"></i>' +
            '      <span ng-click="chooseItem($event,item)"  ng-style="item.style">{{item.displayExpress}}</span>' +
            '   </div>' +
            '   <ul ng-include="\'/combotree/template\'" ng-init="treeData=item.children"></ul>' +
            '</li>' +
            '<li ng-if="(!item.type || item.type===\'branch\') && !item.expanded">' +
            '   <div  class="tree-item">' +
            '      <i class="fi tree-fi-folder" ng-click="expandNode(item)"></i>' +
            '      <i ng-if="!radio && item.checked && item.showBox && allowChooseParent" class="fi tree-fi-clickbox" selected="selected" ng-click="chooseItem($event,item)"></i>' +
            '      <i ng-if="!radio && !item.checked && item.showBox && allowChooseParent" class="fi tree-fi-clickbox" ng-click="chooseItem($event,item)"></i>' +
            //'      <i ng-if="!item.showBox || radio || !allowChooseParent" class="fi tree-fi-clickbox" canchoose="false" ng-click="chooseItem($event,item)"></i>' +
            '      <span ng-click="chooseItem($event,item)" ng-style="item.style">{{item.displayExpress}}</span>' +
            '   </div>' +
            '   <ul ng-include="\'/combotree/template\'" ng-init="treeData=item.children"></ul>' +
            '</li>' +
            '<li ng-if="item.type === \'leaf\'" ng-repeat-end>' +
            '  <div class="tree-item"  leaf="true">' +
            '    <i class="fi tree-fi-folder"></i>' +
            '    <i ng-if="radio && item.checked && item.showBox" class="fi tree-fi-clickbox" mode="radio" selected="selected" ng-click="chooseItem($event,item)"></i>' +
            '    <i ng-if="radio && !item.checked && item.showBox" class="fi tree-fi-clickbox"  mode="radio" ng-click="chooseItem($event,item)"></i>' +
            '    <i ng-if="!radio && item.checked && item.showBox" class="fi tree-fi-clickbox" selected="selected" ng-click="chooseItem($event,item)"></i>' +
            '    <i ng-if="!radio && !item.checked && item.showBox" class="fi tree-fi-clickbox" ng-click="chooseItem($event,item)"></i>' +
            //'    <i ng-if="!item.showBox" class="fi tree-fi-clickbox" canchoose="false"></i>' +
            '    <span ng-click="chooseItem($event,item)"   ng-style="item.style">{{item.displayExpress}}</span>' +
            '   </div>' +
            '</li>';
        $templateCache.put("/combotree/template", recursiveTemplate);

        //生成结点
        function createNode(item, config) {
            var prop = config.idProp,
                parentProp = config.parentProp,
                hasChildProp = config.hasChildProp,
                valueProp = config.valueProp,
                displayExpress = config.displayExpress,
                showBox = config.showBox,
                isExpandAll = config.isExpandAll,
                backgroundColor = config.backgroundColor,
                async = config.async,
                ele, el, show, background, backgroundParam;
            el = item;
            ele = {};
            ele.idProp = el[prop];
            ele.parentProp = el[parentProp];
            ele.valueProp = el[valueProp];
            ele.displayExpress = el[displayExpress];
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
            ele.checked = false;
            ele.children = [];

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
            backgroundParam = {
                record: item
            }
            background = backgroundColor(backgroundParam);
            if (!background) {
                background = "";
            }
            ele.style = {
                'color': '',
                'background-color': background
            }
            return ele;
        }

        //构建树
        function buildTree(source, config) {
            source = angular.copy(source);
            var prop = config.idProp,
                parentProp = config.parentProp,
                results = [],
                fetchChildrenFn,
                margin, i, len, el, ele;
            fetchChildrenFn = function (element, margin) {
                if (margin.length === 0) return;
                var children = [],
                    i, len, el, childrenMargin, ele, show;
                for (i = 0, len = margin.length; i < len; i++) {
                    el = margin[i];
                    if (el[parentProp] === element.idProp) {
                        ele = {};
                        ele = createNode(el, config);
                        children.push(ele);
                        ele = null;
                    }
                }
                childrenMargin = Arrays.subtract(margin, children);
                for (i = 0, len = children.length; i < len; i++) {
                    el = children[i] = angular.copy(children[i]);
                    fetchChildrenFn(el, childrenMargin);
                }
                if (children.length > 0) {
                    element.children = children;
                    element.type = "branch";
                }
            }
            if (!source || source.length === 0) {
                return results;
            }
            for (i = 0, len = source.length; i < len; i++) {
                el = source[i];
                if (!el[parentProp]) {
                    ele = {};
                    ele = createNode(el, config);
                    results.push(ele);
                    ele = null;
                }
            }
            margin = Arrays.subtract(source, results);
            // copy放在下面是为了subtract使用'==='而不是equals， 效率更高
            for (i = 0, len = results.length; i < len; i++) {
                el = results[i] = angular.copy(results[i]);
                fetchChildrenFn(el, margin);
            }
            return results;
        }

        //加载子结点
        function transcateChildren(records, config) {
            var i, len, result, el, ele;
            result = [];
            for (i = 0, len = records.length; i < len; i++) {
                el = records[i];
                ele = {};
                ele = createNode(el, config)
                result.push(ele);
            }
            return result;
        }

        //根据id查找结点
        function searchNodeByTd(treeData, id) {
            var i, len, el, result, childRes;
            for (i = 0, len = treeData.length; i < len; i++) {
                el = treeData[i];
                if (el.idProp === id) {
                    result = el;
                    break;
                }
                if (el.children && el.children.length > 0) {
                    childRes = arguments.callee(el.children, id);
                }
                if (childRes) {
                    result = childRes;
                    break;
                }
            }
            return result;
        }

        //根据值查找结点
        function findNodeByValue(treeData, value) {
            var result = [], childItems = [],
                i, len, el;
            for (i = 0, len = treeData.length; i < len; i++) {
                el = treeData[i];
                if (el.valueProp === value) {
                    result.push(el);
                }
                if (el.children && el.children.length > 0) {
                    childItems = arguments.callee(el.children, value);
                }
                if (childItems && childItems.length > 0) {
                    result = result.concat(childItems);
                    childItems = [];
                }
            }
            return result;
        }

        //根据显示值查找结点
        function findNodeByDisplay(treeData, display) {
            var result = [], childItems = [],
                i, len, el;
            for (i = 0, len = treeData.length; i < len; i++) {
                el = treeData[i];
                if (el.displayExpress === display) {
                    result.push(el);
                }
                if (el.children && el.children.length > 0) {
                    childItems = arguments.callee(el.children, display);
                }
                if (childItems && childItems.length > 0) {
                    result = result.concat(childItems);
                    childItems = [];
                }
            }
            return result;
        }

        //展开子孙结点
        function expandChildren(node) {
            var i, len, el;
            if (!node) {
                return;
            }
            if (node.expanded === false) node.expanded = true;
            for (i = 0, len = node.children.length; i < len; i++) {
                el = node.children[i];
                arguments.callee(el);
            }
        }


        return {
            restrict: 'E',
            replace: true,
            scope: {
                sourceName: '@',
                showSelect: '&',
                disabled: '@',
                chooseItems: '=',
                onBeforeCheck: '&',
                onCheck: '&',
                backgroundColor: '&'
            },
            require: '^?ngModel',
            template: template,
            link: function ($scope, $element, $attrs, ngModel) {
                var displayExpress = $attrs.displayExpress,
                    valueProp = $attrs.valueProp,
                    parentProp = $attrs.parentProp,
                    idProp = $attrs.idProp,
                    hasChildProp = $attrs.hasChildProp,
                    mode = $attrs.mode || 'radio',
                    isExpandAll = $attrs.isExpandAll || 'false',
                    async = $attrs.async || 'false',
                    allowCascadeSelect = $attrs.allowCascadeSelect || 'false',
                    allowChooseParent = $attrs.allowChooseParent || 'true',
                    selectedRowColor = $attrs.selectedRowColor || '',
                    width = $attrs.width,
                    height = $attrs.height,
                    panelWidth = $attrs.panelWidth,
                    config, updateDisplay, unChooseChildren, chooseChildren, expandAllChooseItem,
                    clearChooseItems, unitRegExp, loadTreeData, initTreeData, dropdowntree, outDropdowntree;


                //已选中的记录
                $scope._chooseItems = [];
                //显示值
                $scope.displayValue = "";
                //已经转化好的树型数据
                $scope.treeData = [];
                //是否显示树型框
                $scope.isShow = false;
                $scope.allowChooseParent = (allowChooseParent === 'true');
                $scope.radio = (mode === 'radio');
                //表示数据源中树关系字段
                config = {};
                config.idProp = idProp;
                config.parentProp = parentProp;
                config.hasChildProp = hasChildProp;
                config.valueProp = valueProp;
                config.displayExpress = displayExpress;
                config.async = async;
                config.showBox = $scope.showSelect;
                config.isExpandAll = isExpandAll;
                config.backgroundColor = $scope.backgroundColor;
                if ($attrs.ngModel) {
                    $element.find(".form-text").attr("id", $attrs.ngModel);
                }
                //设置控件的宽度
                if (width || panelWidth) {
                    unitRegExp = /^[0-9]+(%|in|cm|mm|pt|pc|ex|em|px)?$/g;
                    if (unitRegExp.test(width)) {
                        $element.css("width", width);
                        $element.find(".form-tree-dropdown").css("width", (panelWidth || width));
                    } else {
                        throw "宽度设置错误";
                    }
                }
                //设置控件的高度
                if (height) {
                    unitRegExp = /^[0-9]+(%|in|cm|mm|pt|pc|ex|em|px)?$/g;
                    if (unitRegExp.test(height)) {
                        $element.find(".form-tree-dropdown").css("height", height);
                    } else {
                        throw "高度设置错误";
                    }
                }

                //初始化数据
                initTreeData = function (dataSource) {
                    var records;
                    records = angular.copy(dataSource.records);
                    if (!$scope.source) {
                        $scope.source = dataSource;
                    }
                    $scope.treeData = buildTree(records, config);
                    if (ngModel && ngModel.$render) ngModel.$render();
                    /*if(loadTreeData){
                        $scope.treeData = buildTree(records,config)
                    }else{
                        loadTreeData = buildTree(records,config);
                    }*/
                };

                dropdowntree = $element.find(".form-tree-dropdown");
                dropdowntree.css("z-index", ZIndex.getMaxZIndex());
                //设置树的显示位置
                outDropdowntree = GillionLocationService.createHtmltoTop(dropdowntree);


                if (async === "false") {
                    $scope.$on($scope.sourceName, function (event, dataSource) {
                        //初始化数据
                        initTreeData(dataSource);
                    });
                } else {
                    //加载数据
                    $dataSourceManager.getDataSource($scope.sourceName).then(function (dataSource) {
                        dataSource.doRequestData({}, initTreeData, true);
                    });
                }

                //展开树枝结点函数
                $scope.expandNode = function (itemData) {
                    if (async === "true") {
                        if (!itemData.children || itemData.children.length === 0) {
                            $scope.source.params = {
                                id: itemData.idProp
                            }
                            $dataSourceManager.dataSources[$scope.sourceName].doRequestData($scope.source.params, function (_dataSource) {
                                var records, children;
                                records = angular.copy(_dataSource.records);
                                if (itemData) {
                                    if (!records || records.length === 0) {
                                        itemData.type = "leaf";
                                    } else {
                                        children = transcateChildren(records, config);
                                        angular.extend(itemData.children, children);
                                    }
                                }
                            }, true);
                        }
                    }
                    itemData.expanded = !itemData.expanded;
                }

                $scope.toggleTree = function () {
                    if ($scope.isShow) dropdowntree.show();
                    else dropdowntree.hide();
                };

                //显示隐藏树框
                $scope.showComboTree = function () {
                    var inputElement, dropdown, position;
                    if (angular.isUndefined($scope.disabled)) {
                        if (!$scope.treeData || $scope.treeData.length === 0) {
                            $scope.treeData = loadTreeData;
                        }
                        inputElement = $element.find("input");
                        dropdown = $element.find(".form-tree-dropdown");
                        dropdown.css("left", inputElement[0].offsetLeft);
                        dropdown.css("top", inputElement[0].offsetTop + inputElement[0].offsetHeight);

                        expandAllChooseItem();
                        position = GillionLocationService.calculateLocation(inputElement);
                        dropdowntree.css("left", position.left);
                        dropdowntree.css("top", position.top + inputElement[0].offsetHeight);
                        $scope.isShow = !$scope.isShow;
                        $scope.toggleTree();
                    }
                };

                //点击其他页面元素或空白时，隐藏下拉框
                angular.element(document).on('click', function (event) {
                    if ($element.find(event.srcElement || event.target).length === 0 && event.target.className !== 'fi tree-fi-folder'
                        && event.target.className !== 'fi tree-fi-clickbox ng-scope') {
                        $scope.isShow = false;
                        $scope.toggleTree();
                    }
                });

                //单点行
                $scope.rowClick = function ($event, item) {
                    var beforeSelect, onSelect, selectParams;
                    selectParams = {
                        $event: $event,
                        record: item.originData
                    };
                    beforeSelect = $scope.onBeforeSelect;
                    onSelect = $scope.onSelect;
                    if (beforeSelect(selectParams) !== false) {
                        onSelect(selectParams);
                    }
                };

                //选中结点的所有子孙
                chooseChildren = function (item) {
                    var i, len, el, children;
                    children = item.children || [];
                    for (i = 0, len = children.length; i < len; i++) {
                        el = children[i];
                        if (el.showBox === true && el.checked === false) {
                            el.checked = true;
                            el.style.color = selectedRowColor;
                            $scope._chooseItems.push(el);
                            if (el.children && el.children.length > 0) {
                                arguments.callee(el);
                            }
                        }
                    }
                };

                //从选中数据中删除结点的所有子孙
                unChooseChildren = function (item) {
                    var i, len, el, children;
                    children = item.children || [];
                    for (i = 0, len = children.length; i < len; i++) {
                        el = children[i];
                        if (el.showBox === true && el.checked === true) {
                            el.checked = false;
                            el.style.color = "";
                            Arrays.remove($scope._chooseItems, el);
                            if (el.children && el.children.length > 0) {
                                arguments.callee(el);
                            }
                        }
                    }
                };

                clearChooseItems = function () {
                    var i, len, el;
                    len = $scope._chooseItems.length;
                    for (i = 0; i < len; i++) {
                        el = $scope._chooseItems[i];
                        el.checked = false;
                        el.style.color = "";
                    }
                    $scope._chooseItems = [];
                };


                //点击勾选框后执行的函数
                $scope.chooseItem = function ($event, item) {
                    var beforeCheck, onCheck, checkParams, flag = false;
                    checkParams = {
                        $event: $event,
                        record: item.originData
                    };
                    beforeCheck = $scope.onBeforeCheck;
                    onCheck = $scope.onCheck;
                    //判断是否可选
                    if (item.type !== 'leaf' && !$scope.allowChooseParent) return;
                    if (beforeCheck(checkParams) !== false) {
                        item.checked = !item.checked;
                        if ($scope.radio || !item.showBox) {
                            clearChooseItems();
                        }
                        if (item.checked === true) {
                            item.style.color = selectedRowColor;
                            $scope._chooseItems.push(item);
                            //级联添加
                            if (allowCascadeSelect === 'true' && !$scope.radio && async === 'false') {
                                chooseChildren(item);
                            }
                            expandChildren(item);
                        } else {
                            item.style.color = "";
                            Arrays.remove($scope._chooseItems, item);
                            //级联删除
                            if (allowCascadeSelect === 'true' && !$scope.radio && async === 'false') {
                                unChooseChildren(item);
                            }
                        }
                        if (item.showBox) {
                            onCheck(checkParams);
                        }
                    }
                }

                //展开所有选中结点
                expandAllChooseItem = function () {
                    var i, len, item, flag, parent;
                    for (i = 0, len = $scope._chooseItems.length; i < len; i++) {
                        flag = false;
                        item = $scope._chooseItems[i];
                        if (item.parentProp) {
                            flag = true;
                        }
                        while (flag) {
                            parent = searchNodeByTd($scope.treeData, item.parentProp)
                            if (parent.expanded === false) {
                                parent.expanded = true;
                            }
                            item = parent;
                            if (!item.parentProp) {
                                flag = false;
                            }
                        }
                    }
                }

                updateDisplay = function () {
                    var i, len;
                    $scope.displayValue = "";
                    for (i = 0, len = $scope._chooseItems.length; i < len; i++) {
                        $scope.displayValue = $scope.displayValue + $scope._chooseItems[i].displayExpress + ",";
                    }
                    if ($scope.displayValue) {
                        $scope.displayValue = $scope.displayValue.substr(0, $scope.displayValue.length - 1);
                    }
                    $element.find(".form-text").val($scope.displayValue);
                }


                if (ngModel) {
                    ngModel.$render = function () {
                        var idValues = "",
                            modelValues, itemValues, items, i, len, el, _i, _len;
                        clearChooseItems();
                        modelValues = ngModel.$viewValue;
                        if (!modelValues) return;
                        if ($scope.radio) {
                            items = findNodeByValue($scope.treeData, modelValues);
                            if (items && items.length > 0) {
                                if (items[0].type === "leaf") {
                                    items[0].checked = true;
                                    items[0].style.color = selectedRowColor;
                                    $scope._chooseItems.push(items[0]);
                                }
                            }
                        } else {
                            if (modelValues && modelValues.length > 0) {
                                itemValues = modelValues.split(",");
                            }
                            for (i = 0, len = itemValues.length; i < len; i++) {
                                items = findNodeByValue($scope.treeData, itemValues[i]);
                                if (items && items.length > 0) {
                                    for (_i = 0, _len = items.length; _i < _len; _i++) {
                                        el = items[_i];
                                        if ((el.showBox && $scope.allowChooseParent && el.type === "branch") || (el.type === "leaf" && el.showBox)) {
                                            if (idValues.indexOf(el.idProp + ",") === -1) {
                                                el.checked = true;
                                                el.style.color = selectedRowColor;
                                                $scope._chooseItems.push(el);
                                                idValues += el.idProp + ",";
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    };

                    //当树中已选中项发生改就时，更改ngModel的值。
                    $scope.$watchCollection("_chooseItems", function (newValue, oldValue) {
                        var chooseItems = [], modelValue = "";
                        angular.forEach(newValue, function (item) {
                            modelValue += item.valueProp + ",";
                            chooseItems.push(item.originData);
                        });
                        updateDisplay();
                        $scope.chooseItems = chooseItems;
                        chooseItems = null;
                        if (modelValue && modelValue.length > 0) {
                            modelValue = modelValue.substring(0, modelValue.length - 1);
                        }
                        if (ngModel.$viewValue !== modelValue) {
                            if ($scope.$root.$$phase) {
                                ngModel.$setViewValue(modelValue);
                            } else {
                                $scope.$apply(function () {
                                    ngModel.$setViewValue(modelValue);
                                });
                            }
                        }
                    });
                }

                $element.find(".form-text").on("keyup", function ($event) {
                    var idValues = "",
                        currentValue, i, len, value, items, chooseItems, _i, _len, el;
                    clearChooseItems();
                    currentValue = angular.element($event.currentTarget).val();
                    if (!currentValue) return;
                    if ($scope.radio) {
                        items = findNodeByDisplay($scope.treeData, currentValue);
                        if (items && items.length > 0) {
                            if (items[0].showBox && items[0].type === "leaf") {
                                items[0].checked = true;
                                $scope._chooseItems.push(items[0]);
                            }
                        }
                    } else {
                        if (currentValue && currentValue.length > 0) {
                            chooseItems = currentValue.split(",");
                        }
                        for (i = 0, len = chooseItems.length; i < len; i++) {
                            items = findNodeByDisplay($scope.treeData, chooseItems[i]);
                            if (items && items.length > 0) {
                                for (_i = 0, _len = items.length; _i < _len; _i++) {
                                    el = items[_i];
                                    if ((el.showBox && $scope.allowChooseParent && el.type === "branch") || (el.type === "leaf" && el.showBox)) {
                                        if (idValues.indexOf(el.idProp + ",") === -1) {
                                            el.checked = true;
                                            $scope._chooseItems.push(el);
                                            idValues += el.idProp + ",";
                                        }
                                    }
                                }
                            }
                        }
                    }
                    $scope.$apply();
                });


            }
        }
    }
});