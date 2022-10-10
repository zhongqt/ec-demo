define('framework/service/HotKeyServiceConstructor', ['angular', 'underscore'], function (angular, _) {

    var HotKeyService = function () {
        this._items = [];
        this._case = 0;
        this._fieldAlias = false;
        this._keyAlias = false;
        this._labelAlias = false;
        this._elementRule = "id";
        this._customGetElement = false;
        this._switch = true;
        this._listen();
    };
    var Proto = HotKeyService.prototype;
    var GET_ELEMENT_RULE = ["id", "name"];

    /**
     * 配置
     * @param config mixed 配置项
     */
    Proto.config = function (config) {
        if (config.case !== undefined) {
            this._case = config.case === 1 ? 1 : 0;
        }

        if (config.el !== undefined) {
            angular.element(this.el).off("keyup.hotkey");
            this._el = config.el;
            this._listen();
        }

        if (config.fieldAlias !== undefined) {
            if (typeof config.fieldAlias == "string" && config.fieldAlias !== "")
                this._fieldAlias = config.fieldAlias;
        }

        if (config.labelAlias !== undefined) {
            if (typeof config.labelAlias == "string" && config.labelAlias !== "")
                this._labelAlias = config.labelAlias;
        }

        if (config.keyAlias !== undefined) {
            if (typeof config.keyAlias == "string" && config.keyAlias !== "")
                this._keyAlias = config.keyAlias;
        }

        if (config.getElement !== undefined && _.isFunction(config.getElement)) {
            this._customGetElement = config.getElement;
        }

        if (config.getElementRule && _.contains(GET_ELEMENT_RULE, config.getElementRule)) {
            this._elementRule = config.getElementRule;
        }
        return this;
    };

    Proto.close = function () {
        this._switch = false;
    };

    Proto.open = function () {
        this._switch = true;
    };

    /**
     * 注册快捷键
     * @param setting mixed 配置
     * @param combinationKey mixed 组合键
     */
    Proto.register = function (setting, combinationKey) {
        if (!_.isArray(setting) && !_.isObject(setting)) return;
        var me = this;

        me._resetItems();
        if (_.isArray(setting)) {
            _.each(setting, function (itemSetting) {
                me._register(itemSetting, combinationKey);
            });
        } else {
            me._register(setting, combinationKey);
        }

        me._items = _.sortBy(me._items, function (item) {
            return item.enterIndex;
        });
    };

    Proto._resetItems = function () {
        var me = this;
        if (!_.isEmpty(me._items)) {
            _.each(me._items, function (item) {
                if (item.fieldEl) {
                    item.fieldEl.off("keydown.hotkey");
                    item.fieldEl.off("keyup.hotkey");
                }
                delete item.fieldEl;
                delete item.labelEl;
            });
            me._items = [];
        }
    };

    Proto._register = function (setting, combinationKey) {
        var me = this;
        var item = me._getSetting(setting, combinationKey);
        if (item) {
            if (item.labelEl) {
                var span = item.labelEl.find("span.hot-key-label");
                if (span.length > 0) {
                    span.html(item.key);
                } else if (item.key) {
                    span = angular.element('<span class="hot-key-label">' + item.key + '</span>');
                    item.labelEl.prepend(span);
                }
            }
            var $el = me._getHandleElement(item.fieldEl);
            if (item.fieldEl && _.isNumber(item.enterIndex)) {
                if ($el) {
                    //$el.data("enter-index", item.enterIndex);
                    $el.attr("enter-index", item.enterIndex);
                }
            }

            me._addedEvent(item.fieldEl, $el);
            me._items.push(item);
        }
    };

    Proto._addedEvent = function (fieldEl, $el) {
        var me = this;
        if (!$el || $el.length === 0) $el = me._getHandleElement(fieldEl);
        if (!$el || $el.length === 0) return;
        if (me._assertNeedAddedEvent(fieldEl)) {
            $el.off("keydown.hotkey");
            $el.off("keyup.hotkey");
            $el.on("keydown.hotkey", function (e) {
                e = e || event;
                var keyCode = e.keyCode || e.which || e.charCode;
                if (keyCode === 13) {
                    var index = this.hasAttribute("enter-index") ? this.getAttribute("enter-index") : 0;
                    me._enterHandle(index);
                }
            });
            $el.on("keyup.hotkey", function (e) {
                e = e || event;
                var keyCode = e.keyCode || e.which || e.charCode;
                if (keyCode === 13) {
                    e.stopPropagation();
                    e.preventDefault();
                }
            });
        }
    }

    Proto._getSetting = function (item, combinationKey) {
        if (item === undefined || item === null || !_.isObject(item)) return;

        var me = this, result = {};
        if (me._fieldAlias && item[me._fieldAlias]) result.field = item[me._fieldAlias];
        else if (item["field"]) result.field = item["field"];
        if (result.field === undefined) return false;

        if (me._keyAlias && item[me._keyAlias]) result.key = item[me._keyAlias];
        else if (item["key"]) result.key = item["key"];
        //if (result.key === undefined) return false;

        if (me._labelAlias && item[me._labelAlias]) result.label = item[me._labelAlias];
        else if (item["label"]) result.label = item["label"];
        else result.label = item.field + "_label";

        if (_.isNumber(item["enterIndex"])) result.enterIndex = item["enterIndex"];

        result.fieldEl = me._getEl(result.field);
        if (result.label) result.labelEl = me._getEl(result.label);
        if (result.fieldEl.hasClass("form-clickbox") && (!result.labelEl || result.labelEl.length === 0))
            result.labelEl = result.fieldEl.find("label");

        if (combinationKey) {
            if (combinationKey.ctrlKey) result.ctrlKey = true;
            if (combinationKey.altKey) result.altKey = true;
            if (combinationKey.shiftKey) result.shiftKey = true;
            if (combinationKey.metaKey) result.metaKey = true;
        }
        if (item.ctrlKey) result.ctrlKey = true;
        if (item.altKey) result.altKey = true;
        if (item.shiftKey) result.shiftKey = true;
        if (item.metaKey) result.metaKey = true;

        return result;
    };

    Proto._getHandleElement = function (fieldEl) {
        if (fieldEl.length === 0) return false;
        var $el = false;
        var $input = fieldEl.find("input");
        if (fieldEl[0].tagName === "INPUT" || fieldEl[0].tagName === "BUTTON") $el = fieldEl;
        else if (fieldEl.hasClass("form-clickbox")) $el = fieldEl;
        else if ($input.length > 0) $el = $input;
        return $el;
    };

    Proto._assertNeedAddedEvent = function (fieldEl) {
        return true;
        // if (fieldEl.hasClass("form-dropdown")) return true;
        // if (fieldEl.hasClass("form-dorpdown")) return true;
        // if (fieldEl.attr("data-source-name")) return true;
        // return false;
    };

    Proto._enterHandle = function (index) {
        index = parseInt(index);
        var me = this;
        if (document.activeElement && document.activeElement.tagName === "INPUT") document.activeElement.blur();
        for (var i = 0; i < me._items.length; i++) {
            var item = me._items[i];
            if (item.enterIndex && item.enterIndex > index) {
                var $el = me._getHandleElement(me._getEl(item.field));
                if ($el.length === 0) continue;
                if ($el[0].readOnly || $el[0].disabled) continue;
                if (_.isFunction($el.focus)) {
                    $el.focus();
                    me.lastEnterIndex = item.enterIndex;
                    break;
                }
            }
        }
    };

    Proto._listen = function () {
        var me = this;
        me.lastEnterIndex = 0;
        var win = getTopWindow(window);
        if (win !== window) {
            win.$(win).on("keyup.hotkey", function (event) {
                func(event, win.document);
            });

            win.$("iframe").each(function (index, iframe) {
                if (iframe.contentWindow === window) {
                    win.$(iframe).on("keyup.hotkey", function (event) {
                        func(event, iframe.contentWindow.document);
                    });
                }
            })
        }
        angular.element(window).on("keyup.hotkey", function (event) {
            func(event, document);
        });

        function fromCharCode(keyCode) {
            keyCode = keyCode.toString();
            var kv = {
                "96": 0,
                "97": 1,
                "98": 2,
                "99": 3,
                "100": 4,
                "101": 5,
                "102": 6,
                "103": 7,
                "104": 8,
                "105": 9,
                "106": "*",
                "107": "+",
                "108": "enter",
                "109": "-",
                "110": ".",
                "111": "/",
                "112": "F1",
                "113": "F2",
                "114": "F3",
                "115": "F4",
                "116": "F5",
                "117": "F6",
                "118": "F7",
                "119": "F8",
                "120": "F9",
                "121": "F10",
                "122": "F11",
                "123": "F12"
            };
            if (kv[keyCode]) return kv[keyCode];
            return String.fromCharCode(keyCode);
        }

        function func(event, doc) {
            if (!me._switch) return;
            var e = e || event,
                keyCode = e.keyCode || e.which || e.charCode,
                key = fromCharCode(keyCode);

            //if (e.altKey && keyCode != 18) debugger;
            if (keyCode === 13) {
                var index = 0;
                if (doc.activeElement.tagName === "INPUT") {
                    if (doc.activeElement.hasAttribute("enter-index")) return; //index = doc.activeElement.getAttribute("enter-index");
                    else index = me.lastEnterIndex;
                } else {
                    index = me.lastEnterIndex;
                }

                me._enterHandle(index);
            } else {
                for (var i = 0; i < me._items.length; i++) {
                    var item = me._items[i];

                    if (item.key === undefined) continue;
                    if (item.fieldEl.length === 0) {
                        if (item.mark === undefined) {
                            item.fieldEl = me._getEl(item.field);
                            item.mark = 1;
                            var handleEl = me._getHandleElement(item.fieldEl);
                            if (_.isEmpty(handleEl)) continue;
                            me._addedEvent(item.fieldEl, handleEl);
                            if (_.isNumber(item.enterIndex)) handleEl.attr("enter-index", item.enterIndex);
                        } else {
                            continue;
                        }
                    }
                    if (item.ctrlKey && !e.ctrlKey) continue;
                    if (item.shiftKey && !e.shiftKey) continue;
                    if (item.altKey && !e.altKey) continue;
                    if (item.metaKey && !e.metaKey) continue;

                    if ((me._case === 0 && key.toLowerCase() === item.key.toLowerCase()) || (me._case === 1 && key === item.key)) {
                        var $input = item.fieldEl.find("input");
                        if (item.fieldEl.attr("disabled") || item.fieldEl.attr("readonly") || $input.attr("disabled") || $input.attr("readonly")) continue;

                        var $el = false;
                        if (item.fieldEl[0].tagName === "INPUT" || item.fieldEl[0].tagName === "BUTTON") $el = item.fieldEl;
                        else if (item.fieldEl.hasClass("form-clickbox")) $el = item.fieldEl;
                        else if ($input.length > 0) $el = $input;
                        if (!$el) continue;

                        if ($el[0].tagName === "INPUT") {
                            var el = $el[0];

                            var type = el.type.toLowerCase();
                            if (type === "text" || type === "number" || type === "button" || type === "submit") {
                                $el.focus();
                            } else if (type === "checkbox" || type === "radio") {
                                $el.click();
                            }
                        } else if ($el[0].tagName === "BUTTON" || $el[0].tagName === "A") {
                            $el.click();
                        } else if ($el.hasClass("form-clickbox")) {
                            $el.click();
                        }
                    }
                }
            }
        }
    };

    Proto._getEl = function (str) {
        var me = this, el;
        if (me._customGetElement && _.isFunction(me._customGetElement)) {
            el = me._customGetElement(str);
            if (el) return angular.element(el);
        }

        if (me._elementRule === "id") {
            return $("#" + str);
        } else if (me._elementRule === "name") {
            return $("[name=" + str + "]");
        } else if (me._elementRule === "class") {
            return $("." + str);
        } else {
            throw "获取元素规则有误";
        }
    };

    function getTopWindow(win) {
        var href = win.location.href,
            mainWin = win;
        if (href.indexOf('__showUrl=true') > -1) {
            mainWin = getTopWindow(mainWin.parent);
        }
        return mainWin;
    }

    var svr = void 0;
    return function () {
        if (angular.isUndefined(svr)) {
            svr = new HotKeyService();
        }
        return svr;
    };
});