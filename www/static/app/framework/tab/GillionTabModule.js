/**
 * Created by huangzx on 2015/6/16.
 */
define('framework/tab/GillionTabModule', [
    'angular',
    'underscore',
    'framework/permit/GillionPermitModule'
], function (angular, _) {
    //url重写
    function urlRewrite(url) {
        if (!url) return;
        var index = url.indexOf('?'),
            len = url.length;
        if (index < 0) {
            url += '?';
        } else {
            url += '&';
        }
        url += '__showUrl=true';
        return url;
    }

    //滚动条按钮显示判断
    function setScrollers($panel) {
        var headerWidth = $panel.find('.tab-items').width(),
            navWidth = 0;
        $panel.find('.tab-items').children().each(function () {
            navWidth += $(this).outerWidth(true);
        });
        if (navWidth > headerWidth) {
            $panel.find('.tab-nav > .btn').show();
        } else {
            $panel.find('.tab-nav > .btn').hide();
        }
    }

    /**
     * 页前面板控制器
     * @param selector
     * @param options
     * @constructor
     */
    function TabPanel(element, options, Permissions, $compile) {
        this.options = options || {};
        this.$panel = element;
        this.$navs = element.find('.tab-items');
        this.$tabs = element.find('.tab-body');
        this.navs = {};
        this.tabs = {};
        this.bindEvents();
        this.Permissions = Permissions;
        this.$compile = $compile;
    }

    /**
     * 事件绑定
     */
    TabPanel.prototype.bindEvents = function () {
        var self = this,
            $panel = self.$panel,
            $navs = self.$navs,
            options = self.options;
        $navs.on('click', '.fi-refresh-small', function () {
            var $nav = angular.element(this).parent().parent('li');
            self.loadTab($nav.data('title') + '_' + $nav.data('url'));
            return false;
        }).on('click', '.fi-close-small', function () { //阻止事件冒泡
            var $nav = angular.element(this).parent().parent('li'),
                title = $nav.data('title'),
                url = $nav.data('url'),
                $btn = $(this).closest('.btn-close');
            if ($btn.hasClass('disabled')) {
                return false;
            }
            if (options.onBeforeClose({title: title, url: url}) === false) {
                return false;
            }
            self.closeTab(title + '_' + url);
            options.onClose({title: title, url: url});
            return false;
        }).on('click', 'li', function () {
            var $currNav = angular.element(this);
            if (options.onBeforeSelect({title: $currNav.data('title'), url: $currNav.data('url')}) === false) {
                return;
            }
            var title = $currNav.data('title'),
                url = $currNav.data('url'),
                key = title + '_' + url;
            self.selectTab(key);
            options.onSelect({
                title: title,
                url: url,
                tab: self
            });
        }).on('mousedown', 'li', function(e){
            e.stopPropagation();
        });
    };

    /**
     * 添加标签页
     * @param options
     */
    TabPanel.prototype.addTab = function (options, selectTab) {
        options = options || {};
        var self = this,
            index = options.index,
            fixModal = self.options.fixModal,
            async = self.options.async,
            $panel = self.$panel,
            $navs = self.$navs,
            $tabs = self.$tabs,
            navs = self.navs,
            tabs = self.tabs,
            title = options.title,
            lazy = options.lazy,
            lazyUrl = options.lazyUrl,
            lazyManual = options.lazyManual,
            lazyInterval = options.lazyInterval,
            url = options.url,
            active = options.active,
            iAttrs = options.iAttrs,
            key = title + '_' + url, //定义每个页签key的唯一性
            html = options.html,
            nav, tab = options.tab,
            selectTab = selectTab === undefined ? true : selectTab;

        //最多打开tab数量、重复的tab不添加
        if ($navs.children().size() == self.options.tabNum) {
            tab && tab.remove();
            return;
        }

        if (navs[key] && tabs[key]) {
            if (tab) tab.remove();
            else if (selectTab) self.selectTab(key);
            return;
        }

        if (fixModal) {    //固定标签页
            nav = angular.element('<li><a>' + title + '</a></li>');
        } else {        //带刷新和关闭按钮
            nav = angular.element('<li><a>' + title + '</a><a class="btn btn-close"><i class="fi fi-close-small"></i></a></li>');
            url && nav.prepend('<a class="btn btn-refresh"><i class="fi fi-refresh-small"></i></a>');
        }

        if (iAttrs) {
            if (angular.isDefined(iAttrs.ngShow)) {
                nav.attr('ng-show', iAttrs.ngShow);
            }
            if (angular.isDefined(iAttrs.ngHide)) {
                nav.attr('ng-hide', iAttrs.ngHide);
            }
            if (angular.isDefined(iAttrs.gPer)) {
                nav.attr('g-per', iAttrs.gPer);
                nav.data('gPer', iAttrs.gPer);
            }
            options.$compile(nav)(options.scope);
        }

        navs[key] = nav;

        tab = tab || angular.element('<div></div>');
        tab = url ? tab.addClass('tab-body-iframe') : tab.addClass('tab-body-html');
        tab.data('title', title).data('url', url);
        html && tab.html(html);
        tabs[key] = tab;
        if (lazy) {
            tab.data('lazy', true).data("transcludeFn", options.transcludeFn);
        }
        if (lazyUrl) {
            if (lazyManual) {
                tab.data("lazyUrl", lazyUrl).data("options", options);
            } else {
                var interval = options.lazyInterval || 2000;
                setTimeout(function () {
                    self.loadTabHtml(key, options);
                }, interval);
            }
        }
        if (index !== undefined && !isNaN(index) && $tabs.children().length > index) {
            tab.insertAfter($($tabs.children()[index]));
            nav.data('title', title).data('url', url).insertAfter($($navs.children()[index]));
        } else {
            $navs.append(nav.data('title', title).data('url', url));
            $tabs.append(tab);
        }
        if (!async) self.loadTab(key);
        if (active) {
            self.activeKey = key;
            self.selectTab(key);
        }
        setScrollers(self.$panel);
    };

    TabPanel.prototype.isLoaded = function (title, url) {
        var key = title + '_' + url,
            tab = this.tabs[key];
        return !!tab.data("load");
    };

    TabPanel.prototype._activeTab = function (key) {
        var self = this,
            Permissions = self.Permissions,
            navs = self.navs,
            tabs = self.tabs,
            nav = navs[key],
            selectNav, gPer, hide;
        if (!nav) return;

        selectNav = nav;
        if (selectNav.html()) {
            gPer = selectNav.data('gPer');
            hide = selectNav.css("display") === 'none';
            while (hide || (gPer && Permissions.noPermit(gPer))) {
                selectNav = selectNav.next();
                if (!selectNav.html()) break;
                gPer = selectNav.data('gPer');
                hide = selectNav.css("display") === 'none';
            }
            if (!selectNav.html()) {
                selectNav = nav;
                do {
                    selectNav = selectNav.prev();
                    if (!selectNav.html()) break;
                    gPer = selectNav.data('gPer');
                    hide = selectNav.css("display") === 'none';
                } while (hide || (gPer && Permissions.noPermit(gPer)))
            }
        }

        if (selectNav.html()) {
            self.selectTab(selectNav.data('title') + '_' + selectNav.data('url'));
        }
    };

    /**
     * 选中标签页
     * @param key
     */
    TabPanel.prototype.selectTab = function (key) {
        var self = this,
            nav, tab;
        if (typeof key === 'number') {
            nav = self.$navs.children().eq(key);
            key = nav.data('title') + '_' + nav.data('url');
        } else {
            nav = self.navs[key];
        }
        tab = self.tabs[key];
        self.activeKey = key;
        nav && nav.addClass('active').siblings().removeClass('active');
        //存在url的时候只load一次页面
        if (tab.data('lazy')) {
            tab.data('transcludeFn')(tab.scope(), function (clone) {
                tab.append(clone);
                setTimeout(function () {
                    tab.scope().$digest();
                }, 10);
            });
            tab.removeData('lazy');
        }
        if (tab.data('lazyUrl')) {
            this.loadTabHtml(key, tab.data("options"));
            tab.removeData('lazyUrl');
            tab.removeData('options');
        }
        if (!tab.data('load')) {
            self.loadTab(key);
        }
        tab && tab.addClass('active').siblings().removeClass('active');
        tab.scope().$broadcast('show');
    };

    /**
     * 加载某个页面，以iframe形式展示
     * @param key
     */
    TabPanel.prototype.loadTab = function (key) {
        var tab = this.tabs[key];
        if (tab.data('url')) {
            tab.html('<iframe frameborder="0" src="' + urlRewrite(tab.data('url')) + '"' + '></iframe>');
            tab.find('iframe')[0].contentWindow.name = key;
        }
        tab.data('load', true);
    };

    /**

     * 加载某个页面，以iframe形式展示
     * @param key
     */
    TabPanel.prototype.loadTabHtml = function (key, options) {
        var _this = this, tab = this.tabs[key];
        if (options.lazyUrl) {
            $.get(options.lazyUrl, function (html) {
                tab.html(html);
                _this.$compile(tab)(tab.scope());
                angular.element(document.body).scope().$broadcast("data_pentration", tab.scope());
            });
        }
        tab.data('load', true);
    };

    /**
     * 关闭标签页
     * @param key
     */
    TabPanel.prototype.closeTab = function (key, activeNext) {
        var self = this,
            nav = self.navs[key],
            tab = self.tabs[key],
            selectNav,   //关闭后新的标签导航
            frame,
            activeNext = activeNext === undefined ? true : activeNext;
        if (!nav) return;
        if (activeNext && nav.hasClass('active')) {
            selectNav = self._getSelectNav(nav);
            if (selectNav.html()) {
                self.selectTab(selectNav.data('title') + '_' + selectNav.data('url'));
            }
        }
        if (tab.data('url')) {
            frame = tab.find('iframe')[0];
            if (frame) {
                //frame.contentWindow.location.reload();
                frame.parentNode.removeChild(frame);
            }
        }
        nav.remove();
        tab.remove();
        delete this.navs[key];
        delete this.tabs[key];
        if (window.__cache) {
            window.__cache[key] = null;
            if (window.document.documentMode !== 8) {
                delete window.__cache[key];
            }
        }
        if (window.__cachePromise) {
            window.__cachePromise[key] = null;
            if (window.document.documentMode !== 8) {
                delete window.__cachePromise[key];
            }
        }
        setScrollers(this.$panel);
    };

    TabPanel.prototype._getSelectNav = function (nav) {
        var self = this,
            Permissions = self.Permissions,
            selectNav = nav,
            gPer, hide;
        do {
            selectNav = selectNav.next();
            if (!selectNav.html()) break;
            gPer = selectNav.data('gPer');
            hide = selectNav.css("display") === 'none';
        } while (hide || (gPer && Permissions.noPermit(gPer)))
        if (!selectNav.html()) {
            selectNav = nav;
            do {
                selectNav = selectNav.prev();
                if (!selectNav.html()) break;
                gPer = selectNav.data('gPer');
                hide = selectNav.css("display") === 'none';
            } while (hide || (gPer && Permissions.noPermit(gPer)))
        }
        return selectNav;
    };

    function _extracted(title, url) {
        var self = this,
            nav, tab, key;
        if (typeof title === 'number') {
            nav = self.$navs.children().eq(title);
            key = nav.data('title') + '_' + nav.data('url');
        } else {
            key = title + "_" + url;
            nav = self.navs[key];
        }
        tab = self.tabs[key];
        return {nav: nav, tab: tab};
    };

    /**
     * 如果页签是可见的，切换为隐藏的；如果页签是隐藏的，切换为可见的。
     * @param title
     * @param url
     */
    TabPanel.prototype.toggleTab = function (title, url) {
        var self = this,
            __ret = _extracted.call(self, title, url),
            nav = __ret.nav,
            tab = __ret.tab,
            selectNav;
        if (!nav) return;
        nav.toggle();
        if (nav.hasClass('active') && tab) {
            tab.toggleClass('active');
            selectNav = self._getSelectNav(nav);
            if (selectNav.html()) {
                self.selectTab(selectNav.data('title') + '_' + selectNav.data('url'));
            }
        }
    };

    /**
     * 隐藏某个页签
     * @param title
     * @param url
     */
    TabPanel.prototype.hideTab = function (title, url) {
        var self = this,
            __ret = _extracted.call(self, title, url),
            nav = __ret.nav,
            tab = __ret.tab,
            selectNav;
        if (!nav) return;
        nav.hide();
        if (nav.hasClass('active') && tab) {
            tab.removeClass('active');
            selectNav = self._getSelectNav(nav);
            if (selectNav.html()) {
                self.selectTab(selectNav.data('title') + '_' + selectNav.data('url'));
            }
        }
    };

    /**
     * 显示某个页签
     * @param title
     * @param url
     */
    TabPanel.prototype.showTab = function (title, url) {
        var __ret = _extracted.call(this, title, url),
            nav = __ret.nav,
            tab = __ret.tab;
        nav.show();
        if (nav.hasClass('active') && tab) {
            tab.addClass('active');
        }
    };

    TabPanel.prototype._fixWindowHeight = function () {
        var $panel = this.$panel;
        var $body = $('body');
        $body.attr('style', 'height: auto !important;');
        var $tabBody = $panel.find('.tab-body');
        var windowHeight = window.innerHeight;
        var bodyHeight = $body.outerHeight(true);
        var tabBodyHeight = $tabBody.outerHeight();
        $tabBody.outerHeight(windowHeight - bodyHeight + tabBodyHeight - 5);
        $body.removeAttr('style');
    };

    TabPanel.prototype.setFixWindowHeight = function () {
        var rand = Math.floor(Math.random() * 10000);
        var $panel = this.$panel;
        $panel.addClass('tab-' + rand);
        $panel.find('style').remove();
        $panel.append('<style>.tab-' + rand + ' .tab-body-iframe > iframe {height: 100% !important;}</style>');
        this._fixWindowHeight();
    };

    TabPanel.prototype.disableCloseButton = function (key) {
        var self = this,
            nav = self.navs[key],
            closeBtn = nav.find('.btn-close');
        closeBtn.addClass('disabled');
    };

    TabPanel.prototype.enableCloseButton = function (key) {
        var self = this,
            nav = self.navs[key],
            closeBtn = nav.find('.btn-close');
        closeBtn.removeClass('disabled');
    };

    TabPanel.prototype.getTabIframeScope = function (url, withParams) {
        var self = this,
            $panel = self.$panel,
            $iframe, tabScope;
        url = withParams ? url : url.split('?')[0];
        $iframe = $panel.find('iframe[src^="' + url + '"]');
        if ($iframe.length) {
            try {
                tabScope = $iframe[0].contentWindow.angular.element('body').scope();
            } catch (e) {
            }
        }
        return tabScope || null;
    };

    return angular.module('GillionTabModule', ['GillionPermitModule']).factory('GillionTabService', ['$q', function ($q) {
        return {
            register: function (fn) {
                var cache = window.parent.__cache;
                if (!cache) {
                    window.parent.__cache = cache = {};
                }
                cache[window.name] = fn;
                cache = null;
            },
            invoke: function (title, url) {
                var cache = window.__cache || {},
                    fn = cache[title + '_' + url];
                //兼容传递URL
                if (!fn && url === undefined) {
                    _.each(cache, function (func, key) {
                        if (key.indexOf(title) != -1) fn = func;
                    });
                }
                if (angular.isFunction(fn)) {
                    return fn.apply(null, Array.prototype.slice.call(arguments, 2));
                }
            },
            invokeAsync: function (title, url) {
                var cachePromise = window.__cachePromise = window.__cachePromise || {},
                    d = cachePromise[title + '_' + url] = cachePromise[title + '_' + url] || $q.defer();
                return d.promise;
            },
            registerAsync: function (fn) {
                var cachePromise = window.parent.__cachePromise = window.parent.__cachePromise || {},
                    d = cachePromise[window.name] = cachePromise[window.name] || $q.defer();
                if (angular.isFunction(fn)) {
                    d.resolve(fn.apply(null, Array.prototype.slice.call(arguments, 2)));
                }
            },
            panelScope: function () {
                if (window.parent && window.parent.angular) {
                    return window.parent.angular.element('body').scope();
                }
            }
        };
    }]).directive('gTabPanel', ['$parse', '$compile', 'Permissions', function ($parse, $compile, Permissions) {
        return {
            restrict: 'E',
            transclude: true,
            require: 'gTabPanel',
            replace: true,
            template: '<div class="tab">\n    <div class="tab-nav">\n        <a class="btn" rel="prev"><i class="fi fi-arrow-left"></i></a>\n        <div class="tab-bar"><ul class="tab-items"></ul></div>\n        <a class="btn" rel="next"><i class="fi fi-arrow-right"></i></a>\n    </div>\n    <div class="tab-body"></div>\n</div>',
            controller: function ($scope, $element, $attrs) {
                var fixModal = true, //页签模式
                    async = true,
                    tabNum = parseInt($attrs.tabNum) || 999,     //最多打开页签数
                    options,
                    onBeforeSelect, onSelect,
                    onBeforeClose, onClose,
                    tabPanel, fixWindowHeight;

                if ($attrs.fixModal === 'false') {
                    fixModal = false;
                    $element.attr('mode', 'dynamic')
                }

                if ($attrs.async === 'false') async = false;

                fixWindowHeight = $attrs.fixWindowHeight === 'true';

                if ($attrs.hasOwnProperty('onBeforeSelect')) {
                    onBeforeSelect = function (locals) {
                        return $parse($attrs.onBeforeSelect)($scope, locals);
                    }
                }
                if ($attrs.hasOwnProperty('onSelect')) {
                    onSelect = function (locals) {
                        return $parse($attrs.onSelect)($scope, locals);
                    }
                }
                if ($attrs.hasOwnProperty('onBeforeClose')) {
                    onBeforeClose = function (locals) {
                        return $parse($attrs.onBeforeClose)($scope, locals);
                    }
                }
                if ($attrs.hasOwnProperty('onClose')) {
                    onClose = function (locals) {
                        return $parse($attrs.onClose)($scope, locals);
                    }
                }

                options = {
                    fixModal: fixModal,
                    async: async,
                    tabNum: tabNum,
                    fixWindowHeight: fixWindowHeight,
                    onBeforeSelect: onBeforeSelect || angular.noop,
                    onSelect: onSelect || angular.noop,
                    onBeforeClose: onBeforeClose || angular.noop,
                    onClose: onClose || angular.noop
                };
                tabPanel = new TabPanel($element, options, Permissions, $compile);

                if ($attrs.hasOwnProperty('api')) {
                    $scope[$attrs.api] = tabPanel;
                }

                return tabPanel;
            },
            link: function (scope, iEle, iAttrs, gTabPanelCtrl, transcludeFn) {
                var $btnLeft = iEle.find('a[rel="prev"]'),
                    $btnRight = iEle.find('a[rel="next"]'),
                    itemsDom = iEle.find('.tab-items')[0];
                scope.$on("$destroy", function () {
                    for (var key in gTabPanelCtrl) {
                        delete gTabPanelCtrl[key]
                    }
                });
                $btnLeft.click(function () {
                    itemsDom.scrollLeft -= 50;
                });

                $btnRight.click(function () {
                    itemsDom.scrollLeft += 50;
                });

                angular.element(window).resize(_.throttle(function () {
                    setScrollers(iEle);
                    if (gTabPanelCtrl.options && gTabPanelCtrl.options.fixWindowHeight) {
                        gTabPanelCtrl._fixWindowHeight();
                    }
                }, 500));
                transcludeFn(scope, function (clone) {
                    iEle.append(clone);
                });

                scope.$on('validPermit', function () {
                    gTabPanelCtrl._activeTab(gTabPanelCtrl.activeKey);
                });
                gTabPanelCtrl._activeTab(gTabPanelCtrl.activeKey);

                if (iAttrs.hasOwnProperty('initCallback')) {
                    $parse(iAttrs.initCallback)(scope, {
                        tabPanel: gTabPanelCtrl
                    });
                }

                if (gTabPanelCtrl.options && gTabPanelCtrl.options.fixWindowHeight) {
                    gTabPanelCtrl.setFixWindowHeight();
                }
            }
        };
    }]).directive('gTab', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            require: '^gTabPanel',
            template: '<div></div>',
            link: function (scope, iEle, iAttrs, gTabPanelCtrl, transcludeFn) {
                var opt = {
                    title: iAttrs.title || '新建标签页',
                    url: iAttrs.url,
                    tab: iEle,
                    iAttrs: iAttrs,
                    lazy: iAttrs.lazy === 'true',
                    lazyUrl: iAttrs.lazyUrl,
                    lazyInterval: iAttrs.lazyInterval || 2000,
                    lazyManual: iAttrs.lazyManual !== 'false',
                    active: iAttrs.active === 'true',
                    $compile: $compile,
                    scope: scope,
                    transcludeFn: transcludeFn
                };
                opt.active && iEle.removeAttr('active');
                gTabPanelCtrl.addTab(opt);

                if (!opt.lazy && !opt.lazyUrl) {
                    transcludeFn(scope, function (clone) {
                        iEle.append(clone);
                    });
                }
            }
        };
    }]);
});
