define('framework/datatree/TreeNodeDirective', ["angular"], function (angular) {
        return function ($dataSourceManager, $treeHelper, $timeout) {
            return {
                require: ['?^treeNodes', '^gDataTree', '?^gItemClass'],
                restrict: 'A',
                link: function (scope, element, attrs, ctrls) {
                    var cannotChoice;
                    scope.init(ctrls);
                    if (!scope.treeScope.showCheckBox) {
                        element.find(">div>.tree-fi-clickbox").remove();
                    }
                    if (scope.treeScope.radio && scope.item.showBox && scope.item.type !== "branch") {
                        element.find(">div>.tree-fi-clickbox").attr("mode", "radio");
                    }
                    cannotChoice = function () {
                        var flag = true;
                        if (!scope.item.showBox) {
                            flag = false;
                        }
                        if (scope.item.type === "branch") {
                            if (scope.treeScope.radio || !scope.treeScope.allowChooseParent) {
                                flag = false;
                            }
                        }
                        return flag;
                    };
                    if (!cannotChoice()) {
                        element.find(">div>.tree-fi-clickbox").attr("canchoose", "false");
                    }
                    scope.$watch('item.expanded', function (val) {
                        if (scope.item.type === "branch") {
                            element[0].setAttribute("open", val);
                        }
                    });
                    scope.$watch('item.selected', function (val) {
                        element.find(">div").attr("selected", val);
                        if (val && scope.item.gotoRowFlag) {
                            scope.item.gotoRowFlag = false;
                            var scrollHeight = element[0].offsetTop - scope.treeScope.$element[0].offsetTop - 28;
                            if (scrollHeight > 0) {
                                scope.treeScope.$element[0].parentElement.scrollTop = scrollHeight;
                            } else {
                                scope.treeScope.$element[0].parentElement.scrollTop = 0;
                            }
                        }
                    });

                    scope.$watch("item.checked", function (val) {
                        element.find(">div>.tree-fi-clickbox").attr("selected", val);
                    });

                    scope.$watch('item.type', function (val) {
                        if (val === 'leaf') {
                            element.find(">div")[0].setAttribute("leaf", "true");
                        } else {
                            element.find(">div")[0].removeAttribute("leaf");
                        }
                    });
                },
                controller: ['$scope', '$element', function ($scope, $element) {
                    var dataTree, config, parentScope, parentCtrl, treeScope;
                    this.scope = $scope;
                    $scope.$element = $element;

                    $scope.init = function (controllersArr) {
                        parentCtrl = controllersArr[0];
                        parentScope = parentCtrl.scope;
                        dataTree = controllersArr[1];
                        $scope.treeScope = treeScope = dataTree.scope;
                        config = treeScope.config;
                        $scope.item.itemClass = controllersArr[2];
                        $scope.item.itemRootScope = $scope.treeScope.$parent;
                    };
                    function loadChild(item, paramArg) {
                        if (treeScope.source.params === undefined) {
                            treeScope.source.params = {};
                        }
                        treeScope.source.params[config.idProp] = item.idProp;
                        delete  treeScope.source.params.child;
                        $dataSourceManager.dataSources[treeScope.sourceName].doRequestData(treeScope.source.params, function (_dataSource) {
                            var records, children;
                            records = angular.copy(_dataSource.records);
                            if (!records || records.length === 0) {
                                item.type = "leaf";
                            } else {
                                children = $treeHelper.transChildren(records, config);
                                item.children = children;
                                angular.forEach(children, function (child) {
                                    child.parent = item;
                                    if (child.checked) {
                                        treeScope._chooseItems.push(child);
                                    }
                                });
                            }
                            item.expanded = true;
                            if (treeScope.onExpand !== undefined) {
                                treeScope.onExpand(paramArg);
                            }
                        }, true);
                    }

                    $scope.expandNode = function ($event, item) {
                        var paramArg,
                            beforeExpand = treeScope.beforeExpand,
                            onExpand = treeScope.onExpand;
                        if (!treeScope.disabled && item.type === "branch") {
                            paramArg = {
                                record: item.originData
                            };
                            if (!item.expanded) {
                                if (beforeExpand === undefined || !(beforeExpand(paramArg) === false)) {
                                    if (treeScope.async) {
                                        loadChild(item, paramArg);
                                    } else {
                                        item.expanded = true;
                                        if (onExpand !== undefined) {
                                            onExpand(paramArg);
                                        }
                                    }
                                }
                            } else {
                                item.expanded = false;
                            }
                        }
                    };
                    //结点双击事件
                    $scope.onDblClick = function ($event, item) {
                        if (treeScope.doubleEdit && !item.readonly) {
                            if (!item.disabled && !treeScope.disabled) {
                                dataTree.cancelOtherEditable(item);
                                item.editable = true;
                            }
                        }
                    };
                    //回车失去焦点
                    $scope.onKeyPress = function ($event) {
                        if ($event.keyCode === 13) {
                            $event.target.blur();
                        }
                    };
                    //失去焦点事件
                    $scope.onBlur = function ($event, item) {
                        var expressValue, beforeRename, onRename, ele, argument;
                        beforeRename = treeScope.beforeRename;
                        onRename = treeScope.onRename;
                        ele = item.originData;
                        expressValue = angular.element($event.target).val();
                        argument = {
                            value: expressValue,
                            record: ele
                        };
                        if (beforeRename === undefined || beforeRename(argument) !== false) {
                            item.displayExpress = expressValue;
                            if (onRename !== undefined) {
                                onRename(argument);
                            }
                        }
                        item.editable = false;
                    };

                    //点击勾选框后执行的函数
                    $scope.chooseItem = function ($event, item) {
                        var eventParams = {
                                $event: $event,
                                record: item.originData
                            },
                            beforeCheck = treeScope.onBeforeCheck,
                            onCheck = treeScope.onCheck;
                        //判断是否可选
                        if (dataTree.canCheck(item)) {
                            if (beforeCheck === undefined || beforeCheck(eventParams) !== false) {
                                // $scope.rowClick($event, item);
                                item.checked = !item.checked;
                                dataTree.updateCheckChanges(item);
                                if (treeScope.radio) {
                                    dataTree.clearChooseItems();
                                }
                                if (item.checked === true) {
                                    if ($treeHelper.contains(treeScope._chooseItems, item) === false) {
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
                                    $treeHelper.remove(treeScope._chooseItems, item);
                                    //级联删除
                                    if (treeScope.allowCascadeSelect && !treeScope.radio) {
                                        dataTree.unSelectChildren(item);
                                        dataTree.unSelectParent(item);
                                    }
                                }
                                //onCheck事件
                                if (onCheck !== undefined) {
                                    $timeout(function () {
                                        onCheck(eventParams);
                                    });
                                }
                            }
                        }
                    };

                    //改变当前行函数
                    $scope.rowClick = function ($event, item) {
                        var el, onSelect, selectParams;
                        onSelect = treeScope.onSelect;
                        selectParams = {
                            $event: $event,
                            record: item.originData
                        };
                        if (dataTree.canSetCurrentRow(item, $event)) {
                            treeScope._currentRow.selected = false;
                            item.selected = true;
                            el = item.originData;
                            treeScope.currentRow = el;
                            treeScope._currentRow = item;
                            if (onSelect !== undefined) {
                                onSelect(selectParams);
                            }
                        }
                    };

                }]
            }
        }
    }
);
