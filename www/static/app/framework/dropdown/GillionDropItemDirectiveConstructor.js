/**
 * Created by linxh on 2015/7/7.
 */
define("framework/dropdown/GillionDropItemDirectiveConstructor", ['angular'], function (angular) {
    return function ($parse, $timeout) {
        var DROPITEMOBJ = 'DROP_ITEM_OBJ';

        function DropdownItem(scope, element, attrs, itemObj) {
            this.scope = scope;
            this.element = element;
            this.attrs = attrs;
            this.itemObj = itemObj;
        };

        DropdownItem.prototype.select = function () {
            this.element.attr("selected", "selected");
            this.element.addClass('current');
            this.scope.isSelected = true;
        };

        DropdownItem.prototype.unSelect = function () {
            this.element.removeAttr("selected");
            this.element.removeClass('current');
            this.scope.isSelected = false;
        };


        DropdownItem.prototype.getSelect = function () {
            return !!this.scope.isSelected;
        };

        DropdownItem.prototype.addSelectStyle = function () {
            this.element.addClass('current');
        };

        DropdownItem.prototype.removeSelectStyle = function () {
            this.element.removeClass('current');
        };

        return {
            restrict: "E",
            template: '<li ><a href="javascript:void(0)"><i class="fi" ng-class="{\'fi-checkbox\':isCheckbox,\'fi-radiobox\':isRadio}"></i></a></li>',
            replace: true,
            transclude: true,
            scope: {
                item: '@'
            },
            compile: function (tElement, tAttrs, transclude) {
                return function (scope, element, attrs) {
                    var controller = element.parent("ul").data(DROPITEMOBJ);
                    scope.listType = controller.$scope.listType;
                    scope.groupExpress = controller.$scope.groupExpress;
                    scope.displayExpress = controller.$scope.displayExpress;
                    scope.valueSeparator = controller.valueSeparator;
                    scope.listType == 'single' ? scope.isRadio = true : scope.isRadio = false;
                    scope.listType == 'multi' ? scope.isCheckbox = true : scope.isCheckbox = false;

                    transclude(scope, function (clone) {
                        if (clone[0] && clone[0].tagName == 'SPAN') {
                            element.find("a").append(clone[0].innerText);
                        }
                    });

                    if (attrs.text) {
                        element.find("a").append(attrs.text);
                    }
                    var itemObj = {};
                    if (scope.item) {
                        itemObj = JSON.parse(scope.item);
                    } else {
                        itemObj[controller.$scope.displayExpress] = element.text();
                        itemObj[controller.$scope.valueProp] = attrs.value;
                    }
                    var dropItem = new DropdownItem(scope, element, attrs, itemObj);
                    element.data(DROPITEMOBJ, dropItem);
                    if (scope.groupExpress) {
                        if (scope.item) {
                            var itemJson = JSON.parse(scope.item);
                            if (itemJson.groupBorder == true) {
                                element.css("border-top", "solid 1px #c4c4c4");
                            } else {
                                element.css("border-top", "solid 0px #c4c4c4");
                            }
                        }
                    }
                    element.on("click", function () {
                        controller.selectItem(dropItem);
                    });
                    controller.initItemList();
                }
            }
        }
    }
})