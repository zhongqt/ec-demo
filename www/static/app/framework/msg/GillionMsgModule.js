/**
 * Created by huangzx on 2015/6/8.
 */
define('framework/msg/GillionMsgModule', [
    'angular',
    'jquery'
], function (angular, $) {
    function getMainWindow(win) {
        var href = win.location.href,
            mainWin = win;
        if (href.indexOf('__showUrl=true') > -1 && mainWin !== mainWin.parent) {
            mainWin = getMainWindow(mainWin.parent);
        }
        return mainWin;
    }

    return angular.module('GillionMsgModule', [])
        .factory('GillionMsgService', ['$window', '$rootScope', '$timeout', 'GillionLocationService', function ($window, $rootScope, $timeout, GillionLocationService) {
            var cacheData = getMainWindow(window).cacheData = getMainWindow(window).cacheData || {};
            var mainJq = getMainWindow(window).$;

            function buildData(key) {
                cacheData[key] = cacheData[key] || {
                    inputData: {},
                    outputData: {}
                };
                return cacheData[key];
            }

            $rootScope.$on('$destroy', function () {
                cacheData = {};
            });

            return {
                isUnderMasked: function (dom) {
                    var mask = mainJq(getMainWindow(window).document.body).find('div.modal-mask:visible'), dialog = $(dom).closest(".modal-dialog");
                    return mask.size() > 0 &&
                        mainJq.contains(getMainWindow(window).document.body, dom) &&
                        (dialog.length === 0 || (dialog.length > 0 && parseInt(mask[0].style.zIndex) > parseInt(dialog[0].style.zIndex)));
                },
                _setInputData: function (key, data) {
                    buildData(key).inputData = data;
                },
                _getOutputData: function (key) {
                    var data = buildData(key).outputData;
                    return data;
                },
                _register: function (msgBox) {
                    cacheData[msgBox.tempId].dlg = msgBox;
                },
                /**
                 * ???showUrl?????????????????????????????????????????????data???
                 * @returns {*}
                 */
                getInputData: function () {
                    return buildData($window.name).inputData;
                },
                /**
                 * ???showUrl??????????????????????????????????????????????????????
                 * @returns {*}
                 */
                setOutputData: function (data) {
                    buildData($window.name).outputData = data;
                },
                /**
                 * ???showUrl?????????????????????????????????????????????
                 */
                close: function () {
                    $timeout(function () {
                        var dlg, frame;
                        if (cacheData[$window.name]) {
                            dlg = cacheData[$window.name].dlg;
                            if (dlg) {
                                dlg.close();
                            }
                        }
                    });
                },
                /**
                 * ????????????????????????????????????????????????
                 * @param key
                 */
                evict: function (key) {
                    delete cacheData[key];
                }
            };
        }])
        .factory('GillionMsg', ['$timeout', '$window', '$rootScope', 'GillionMsgService', 'ZIndex', 'GillionLocationService', function ($timeout, $window, $rootScope, GillionMsgService, ZIndex, GillionLocationService) {
            var mainJq = GillionLocationService.getTopJq();
            var htmlTemplate = '<div class="modal-dialog">\n    <div class="modal-content">\n        <div class="modal-header">\n            <h4 class="modal-title"></h4>\n        </div>\n        <div class="modal-body">\n            <p></p>\n        </div>\n        <div class="modal-footer">\n        </div>\n    </div>\n</div>',
                //??????????????????
                btnTypes = {
                    sure: '<button class="btn btn-default btn-fi"><i class="fi fi-sumbit"></i></button>',
                    cancel: '<button class="btn btn-default btn-important"></button>',
                    def: '<button class="btn btn-default"></button>'
                },
                //icon????????????
                iconTypes = {
                    right: '<i class="fi fi-right"></i>',
                    error: '<i class="fi fi-error"></i>',
                    confirm: '<i class="fi fi-confirm"></i>'
                };

            //????????????????????????
            function getViewPortWidth() {
                var xwin = getMainWindow(window);
                return xwin.document.documentElement.clientWidth || xwin.document.body.clientWidth;
            }

            //????????????????????????
            function getViewPortHeight() {
                var xwin = getMainWindow(window);
                return xwin.document.documentElement.clientHeight || xwin.document.body.clientHeight;
            }

            //url??????
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

            /**
             * ????????????????????????
             * @param opts {Object}
             *   [opts.text] {String} ????????????
             *   [opts.type] {String} ??????????????????
             *   [opts.handler] {function} ??????????????????,??????false????????????????????????????????????
             * @param owner {Object} ??????????????????
             */
            function buildButton(opts, owner) {
                var $btn, handler,
                    mainWindow, tempId;
                if (!angular.isObject(opts)) return;
                handler = opts.handler;
                mainWindow = owner.mainWindow;
                $btn = mainJq(btnTypes[opts.type] || btnTypes['def']);
                $btn.append(opts.text).on('click', function (event) {
                    event.stopPropagation();
                    var flag;
                    if (angular.isFunction(handler)) {
                        flag = handler();
                        if (flag === false) return;
                    }
                    owner.close();
                });

                return $btn;
            }

            /**
             * ?????????????????????
             * @constructor
             */
            function MsgBox(opts) {
                this.opts = opts;
                this.$ele = mainJq(htmlTemplate);
                this.tempId = 'msgBox' + new Date().getTime();
                this.mainWindow = getMainWindow(window);
                this.$ele.appendTo(this.mainWindow.document.body);
            }

            /**
             * ??????
             */
            MsgBox.prototype.mask = function () {
                var $ele = this.$ele,
                    $mask;

                function focusMask() {
                    try {
                        var t = mainJq(getMainWindow(window).document.body).find('.calendar:visible')[0];
                        var $this = mainJq(this);
                        if (!mainJq.contains($ele[0], this) && (!t || !mainJq.contains(t, this)) && !$this.parent().is('.modal-footer')) { //??????????????????
                            // $this.blur();
                            return false;
                        }
                    } catch (ignored) {
                    }
                }

                if (!this.$mask) {
                    $mask = this.$mask = mainJq('<div class="modal-mask"></div>');
                    $mask.appendTo(getMainWindow(window).document.body);
                }
                $mask.css('z-index', ZIndex.getMaxZIndex()).show();
                //??????????????????????????????
                mainJq(getMainWindow(window).document).on('focus.mask', '*', focusMask);
                if (getMainWindow(window) != window) {
                    angular.element(document).on('focus.mask', '*', focusMask);
                }
                //mainJq(getMainWindow(window).document.body).css('overflow', 'hidden');
            };
            /**
             * ??????????????????
             * @param val {Number}
             */
            MsgBox.prototype.setMaxWidth = function (val) {
                var $ele = this.$ele;
                $ele.css('max-width', val);
            };
            /**
             * ??????????????????
             * @param val {Number}
             */
            MsgBox.prototype.setMaxHeight = function (val) {
                var $ele = this.$ele,
                    $header = $ele.find('.modal-header'),
                    $body = $ele.find('.modal-body'),
                    $footer = $ele.find('.modal-footer');
                $body.css('max-height', val - $header.outerHeight() - $footer.outerHeight());
            };
            /**
             * ??????????????????
             * @param val {Number}
             */
            MsgBox.prototype.setMinWidth = function (val) {
                var $ele = this.$ele;
                $ele.css('min-width', val);
            };
            /**
             * ??????????????????
             * @param val {Number}
             */
            MsgBox.prototype.setMinHeight = function (val) {
                var $ele = this.$ele,
                    $header = $ele.find('.modal-header'),
                    $body = $ele.find('.modal-body'),
                    $footer = $ele.find('.modal-footer');
                $body.css('min-height', val - $header.outerHeight() - $footer.outerHeight());
            };
            /**
             * ????????????
             * @param val {Number}
             */
            MsgBox.prototype.setWidth = function (val) {
                var $ele = this.$ele,
                    viewWidth = getViewPortWidth();
                if (val > viewWidth) val = viewWidth;
                $ele.width(val);
            };
            /**
             * ????????????
             * @param val {Number}
             */
            MsgBox.prototype.setHeight = function (val) {
                var $ele = this.$ele,
                    $header = $ele.find('.modal-header'),
                    $body = $ele.find('.modal-body'),
                    $footer = $ele.find('.modal-footer'),
                    viewHeight = getViewPortHeight();
                if (val > viewHeight) {
                    $body.height(viewHeight - $header.outerHeight() - $footer.outerHeight() - 70);
                } else {
                    $body.height(val - $header.outerHeight() - $footer.outerHeight() - 42);
                }
            };
            /**
             * ????????????
             * @param [title] {String} ????????????
             */
            MsgBox.prototype.setTitle = function (title) {
                var $ele = this.$ele;
                $ele.find('.modal-title').html(title);
            };
            /**
             * ????????????
             * @param [msg] {String} ????????????
             */
            MsgBox.prototype.setMsg = function (msg) {
                var $ele = this.$ele;
                $ele.find('.modal-body').css('overflow-y', 'auto');
                $ele.find('.modal-body p').html(msg);
            };
            /**
             * ??????????????????
             * @returns {*}
             */
            MsgBox.prototype.getMsg = function () {
                var $ele = this.$ele;
                return $ele.find('.modal-body p').html();
            };
            /**
             * ???iframe?????????????????????
             * @param url
             */
            MsgBox.prototype.setUrl = function (url) {
                var $ele = this.$ele,
                    $body = this.$ele.find('.modal-body'),
                    width = $ele.width() - 42,
                    height = $body.height();

                url = urlRewrite(url);
                $ele.find('.modal-body').html('<iframe width="' + width + '" height="' + height + '" src="' + url + '" frameborder="0"></iframe>');
                $ele.find('iframe')[0].contentWindow.name = this.tempId;
            };

            /**
             * ??????jquery????????????Iframe??????
             * @return [jquery(Iframe)]
             */
            MsgBox.prototype.getIframe = function () {
                var $ele = this.$ele;
                return $ele.find('iframe');
            };

            /**
             * ????????????????????????
             */
            MsgBox.prototype.getOutputData = function () {
                return GillionMsgService._getOutputData(this.tempId);
            };

            /**
             * ??????icon??????
             * @param icon {String}
             */
            MsgBox.prototype.setIcon = function (icon) {
                var $ele = this.$ele;
                if (iconTypes[icon]) {
                    $ele.find('.modal-body')
                        .addClass('modal-body-fi')
                        .prepend(iconTypes[icon]);
                }
            };
            /**
             * ????????????
             */
            MsgBox.prototype.setClosable = function () {
                var self = this,
                    $ele = self.$ele,
                    $closeBtn;
                $closeBtn = mainJq('<button class="btn btn-default"><i class="fi fi-close"></i></button>');
                $ele.find('.modal-header').prepend($closeBtn);
                $closeBtn.on('click', function () {
                    self.close();
                });
            };

            MsgBox.prototype.setMaximization = function () {
                var self = this,
                    $ele = self.$ele,
                    $btn;
                $btn = mainJq('<button class="btn btn-default"><i class="icon-maximization"></i></button>');
                $ele.find('.modal-header').prepend($btn);
                $btn.on('click', function () {
                    if (self.opts.modalStatus) {
                        self.setWidth(self.opts.width);
                        self.setHeight(self.opts.height);
                        self.opts.modalStatus = 0;
                        self.center();
                        $btn.find("i").removeClass("icon-reduction");
                        $btn.find("i").addClass("icon-maximization");
                    } else {
                        var win = getMainWindow(window),
                            width = (win.innerWidth == undefined ? $(win).width() : win.innerWidth),
                            height = (win.innerHeight == undefined ? $(win).height() : win.innerHeight);

                        self.setWidth(width);
                        self.setHeight(height);
                        self.opts.modalStatus = 1;
                        self.center();
                        $btn.find("i").removeClass("icon-maximization");
                        $btn.find("i").addClass("icon-reduction");
                    }
                });
            };

            /**
             * ?????????
             */
            MsgBox.prototype.wait = function () {
                var $ele = this.$ele;
                $ele.find('.modal-body').prepend('<div class="waiting"><img src="/static/images/waitpls.gif"/></div>');
                $ele.find('.modal-body p').addClass('waiting');
            };

            /**
             * ???????????????
             */
            MsgBox.prototype.progress = function () {
                var self = this,
                    $ele = this.$ele;
                $ele.find('.modal-body').prepend(
                    '<div class="progress">\n    <div class="progress-bar" role="progressbar" style="width: 0%;">\n    </div>\n</div>\n<div class="progress-text">0%</div>'
                );
            };

            /**
             * ?????????????????????????????????????????????????????????
             * @param value {Number}
             * @param [progressText] {String}
             */
            MsgBox.prototype.updateProgress = function (value, progressText) {
                var $ele = this.$ele,
                    $porcessBar = $ele.find('.progress-bar'),
                    $porcessText = $ele.find('.progress-text');
                value = value < 0 ? 0 : value > 100 ? 100 : value;
                value = value + '%';
                if (!progressText) progressText = value;
                $porcessBar.css('width', value);
                $porcessText.html(progressText);
            };

            /**
             * ??????????????????
             * @param buttons
             */
            MsgBox.prototype.initButtons = function (buttons) {
                var self = this,
                    $ele = self.$ele,
                    $footer;
                if (!angular.isArray(buttons)) return;
                $footer = $ele.find('.modal-footer');
                angular.forEach(buttons, function (button) {
                    $footer.append(buildButton(button, self));
                });
                $timeout(function () {
                    $footer.find('button').eq(0).focus();
                },100);
            };

            /**
             * ???????????????
             */
            MsgBox.prototype.hide = function () {
                var self = this,
                    $ele = self.$ele,
                    $mask = self.$mask,
                    mainWindow = self.mainWindow;
                if ($mask) $mask.hide();
                $ele.hide();
                mainJq(mainWindow.document.body).css('overflow', 'hidden');
            };

            /**
             * ???????????????
             */
            MsgBox.prototype.show = function () {
                var self = this,
                    $ele = self.$ele,
                    $mask = self.$mask,
                    mainWindow = self.mainWindow;
                if ($mask) $mask.show();
                $ele.show();
                mainJq(mainWindow.document.body).css('overflow', 'auto');
            };

            /**
             * ??????
             */
            MsgBox.prototype.close = function () {
                var self = this,
                    $ele = self.$ele,
                    $mask = self.$mask,
                    mainWindow = self.mainWindow,
                    opts = self.opts,
                    onBeforeClose = opts.onBeforeClose,
                    onClose = opts.onClose,
                    outPutData = self.getOutputData(),
                    timer = self.timer,
                    injector, $rootScope;
                if (timer) {
                    $timeout.cancel(timer);
                }
                if (angular.isFunction(onBeforeClose) &&
                    onBeforeClose(outPutData) === false) {
                    injector = angular.element(document).injector();
                    $rootScope = injector.get("$rootScope");
                    $rootScope.$digest();
                    return false;
                }

                iframe = angular.element($ele).find("iframe")[0];
                if(iframe){
                    iframe.contentWindow.close();
                }

                mainJq(mainWindow.document).off('focus.mask', '*');
                if (mainWindow != window) {
                    angular.element(document).off('focus.mask', '*');
                }
                mainJq(mainWindow.document.body).css('overflow', 'auto');

                if (angular.isFunction(onClose)) {
                    injector = angular.element(document).injector();
                    $rootScope = injector.get("$rootScope");
                    $rootScope.$apply(function () {
                        onClose(outPutData);
                    });
                }
                setTimeout(function(){
					if ($ele) {
						$ele.off();
						$ele.find('*').off();
						$ele.hide();
					}
					$mask && $mask.remove();
					delete self.$ele;
				},200);
                GillionMsgService.evict(self.tempId);
                return true;
            };
            /**
             * ??????
             */
            MsgBox.prototype.render = function () {
                var $ele = this.$ele,
                    opts = this.opts,
                    mainWindow = this.mainWindow,
                    $mainWindow = mainJq(mainWindow),
                    clientHeight, top;
               
                if ($ele.prev(".modal-dialog").length > 0) {
                    $ele.prev(".modal-dialog").remove()
                }
                opts.modal && this.mask();
                //??????????????????
                if (mainWindow.frameElement) {
                    clientHeight = mainWindow.frameElement.ownerDocument.documentElement.clientHeight;
                    //top = clientHeight/2 + $(window).scrollTop(); //window.top.scrollY;
                } else {
                    clientHeight = $mainWindow.outerHeight();
                    //top = clientHeight/2;
                }

                top = ($mainWindow.outerHeight() - $ele.outerHeight()) / 2;
                $ele.css({
                    'position': 'fixed',
                    'left': $mainWindow.outerWidth() / 2,
                    'top': top,
                    'margin-left': -($ele.width() / 2),
                    //'margin-top':-($ele.height()/2),
                    'z-index': ZIndex.getMaxZIndex(),
                    'margin-top': 0,
                    'margin-bottom': 0
                });
                this.position(opts);
            };

            MsgBox.prototype.center = function () {
                var $ele = this.$ele,
                    opts = this.opts,
                    mainWindow = this.mainWindow,
                    $mainWindow = mainJq(mainWindow),
                    top;
                if (opts.modalStatus === 0) {
                    this.position(opts);
                } else {
                    top = ($mainWindow.outerHeight() - $ele.outerHeight()) / 2;
                    if (top < 0) top = 0;
                    $ele.css({
                        'position': 'fixed',
                        'left': $mainWindow.outerWidth() / 2,
                        'top': top,
                        'margin-left': -($ele.width() / 2),
                        'z-index': ZIndex.getMaxZIndex()
                    });
                }
            };

            /**
             * ??????
             */
            MsgBox.prototype.drag = function () {
                var $ele = this.$ele,
                    $mask = this.$mask,
                    $header = $ele.find('.modal-header'),
                    $body = $ele.find('.modal-body'),
                    $footer = $ele.find('.modal-footer'),
                    mainWindow = this.mainWindow,
                    $mainWindow = mainJq(mainWindow);

                function mouseUp() {
                    angular.element(document).off('mousemove.drag mouseup.drag');
                    mainJq(window.parent.document).off('mousemove.drag mouseup.drag');
                    mainJq(window.top.document).off('mouseup.drag');
                    if ($mask) {
                        $mask.off('mouseup.drag');
                    }
                }

                $header.css('cursor', 'move');
                this.getIframe().load(function () {
                    angular.element(this.contentDocument).on('mouseup.drag', mouseUp);
                });
                $header.on('mousedown', function (e) {
                    var eleDom = $ele[0],
                        dX = e.clientX - eleDom.offsetLeft,
                        dY = e.clientY - eleDom.offsetTop,
                        maxLeft = $mainWindow.width() - $ele.width(),
                        minTop = 0,
                        //??????42????????????????????????????????????????????????
                        maxTop = $mainWindow.height() - $header.outerHeight() - $body.height() - $footer.outerHeight();

                    function mouseMove(e) {
                        if (mainWindow.frameElement) {
                            minTop = window.top.scrollY;
                            maxTop = mainWindow.frameElement.ownerDocument.documentElement.clientHeight -
                                $header.outerHeight() - $body.height() - $footer.outerHeight() + window.top.scrollY;
                        }
                        if (maxTop < 0) return;
                        var left = e.clientX - dX,
                            top = e.clientY - dY;
                        if (top < minTop) {
                            top = minTop;
                        } else if (top > maxTop) {
                            top = maxTop;
                        }
                        if (left < 0) {
                            left = 0;
                        } else if (left > maxLeft) {
                            left = maxLeft;
                        }
                        $ele.css({
                            'left': left,
                            'top': top,
                            'margin-left': 0,
                            'margin-top': 0
                        });
                        return false;
                    }

                    angular.element(document).on('mousemove.drag', mouseMove).on('mouseup.drag', mouseUp);
                    mainJq(window.parent.document).on('mousemove.drag', mouseMove).on('mouseup.drag', mouseUp);
                    mainJq(window.top.document).on('mouseup.drag', mouseUp);
                    if ($mask) {
                        $mask.on('mouseup.drag', mouseUp);
                    }
                });
            };

            /**
             * ??????????????????
             * @param pos
             */
            MsgBox.prototype.position = function (opt) {
                var $ele = this.$ele,
                    left = opt.left,
                    top = opt.top;

                if (angular.isNumber(left) || angular.isNumber(top)) {
                    $ele.css({
                        'left': left,
                        'top': top,
                        'margin-left': 0,
                        'margin-top': 0
                    });
                }
            };

            return {
                /**
                 * ????????????????????????????????????????????????
                 * @param options ?????????
                 *      [options.title='???????????????'] {String} ??????
                 *      [options.msg='???????????????'] {String} ??????
                 *      [options.closable=true] {Boolean} ??????????????????
                 *      [options.drag=true] {Boolean} ??????
                 *      [options.modal=true] {Boolean} ??????
                 *      [options.timeout=0] {Number} ???????????????0?????????????????????
                 *      [options.icon] {String} icon??????
                 *      [options.width] {Number} ??????
                 *      [options.height] {Number} ??????
                 *      [options.maxWidth] {Number} ????????????
                 *      [options.maxHeight] {Number} ????????????
                 *      [options.minWidth] {Number} ????????????
                 *      [options.minHeight] {Number} ????????????
                 *      [options.onBeforeClose] {Function} ???????????????????????????false????????????????????????
                 *      [options.onClose] {Function} ???????????????
                 *      [options.onBeforeOpen] {Function} ????????????????????????false????????????????????????
                 *      [options.onOpen] {Function} ???????????????
                 *      [options.buttons] {Array} ????????????
                 *             ?????????????????????{Object}
                 *             {
                 *                  text???'????????????',
                 *                  type: '??????????????????', //?????????'sure' or 'cancel' or 'default'
                 *                  handler: {Fnction} //??????????????????,??????false????????????????????????????????????
                 *             }
                 *  @return {MsgBox} ?????????????????????close??????????????????
                 */
                show: function (options) {
                    var msgBox,
                        opts = {
                            title: '',
                            msg: '',
                            closable: true,
                            drag: true,
                            modal: true,
                            width: 300,
                            timeout: 0
                        },
                        onBeforeOpen, onOpen;
                    angular.extend(opts, options);

                    onBeforeOpen = opts.onBeforeOpen;
                    onOpen = opts.onOpen;
                    if (angular.isFunction(onBeforeOpen) &&
                        onBeforeOpen() === false) {
                        return;
                    }

                    msgBox = new MsgBox(opts);
                    //?????????????????????
                    msgBox.setTitle(opts.title);
                    msgBox.setMsg(opts.msg);
                    msgBox.initButtons(opts.buttons);
                    opts.icon && msgBox.setIcon(opts.icon);
                    opts.closable && msgBox.setClosable();
                    opts.minWidth && msgBox.setMinWidth(opts.minWidth);
                    opts.minHeight && msgBox.setMinHeight(opts.minHeight);
                    opts.width && msgBox.setWidth(opts.width);
                    opts.height && msgBox.setHeight(opts.height);
                    opts.maxWidth && msgBox.setMaxWidth(opts.maxWidth);
                    opts.maxHeight && msgBox.setMaxHeight(opts.maxHeight);
                    msgBox.render();
                    opts.drag && msgBox.drag();

                    angular.isFunction(onOpen) && onOpen();

                    //????????????????????????
                    if (opts.timeout && opts.timeout > 0) {
                        msgBox.timer = $timeout(function () {
                            msgBox.close();
                        }, opts.timeout);
                    }

                    //????????????????????????????????????????????????????????????????????????
                    opts.wait && msgBox.wait();
                    opts.progress && msgBox.progress();
                    return msgBox;
                },

                /**
                 * ?????????????????????????????????
                 * @param [title='????????????'] {String} ????????????
                 * @param [msg='???????????????????????????'] {String} ???????????????
                 * @param [fn] {Function} ???????????????
                 * @param [options] {Object} ?????????
                 *      [options.icon] {String} icon??????
                 *      [options.closable=true] {Boolean} ??????????????????
                 *      [options.modal=true] {Boolean} ??????
                 *      [options.timeout=0] {Number} ???????????????0?????????????????????
                 *      [options.width] {Number} ??????
                 *      [options.height] {Number} ??????
                 *      [options.maxWidth] {Number} ????????????
                 *      [options.maxHeight] {Number} ????????????
                 *      [options.minWidth] {Number} ????????????
                 *      [options.minHeight] {Number} ????????????
                 */
                alert: function (title, msg, fn, options) {
                    options = options || {};
                    angular.extend(options, {
                        title: title || $config.i18nInfo.alertTitle,
                        msg: msg || '',
                        buttons: [{
                            text: $config.i18nInfo.alertSure,
                            type: 'sure',
                            handler: fn
                        }]
                    });
                    return this.show(options);
                },

                /**
                 * ?????????????????????????????????????????????
                 * @param [title='????????????'] {String} ????????????
                 * @param [msg='???????????????????????????'] {String} ???????????????
                 * @param [fn] {Function} fn(b) ?????????????????????????????????????????????????????????true???????????????????????????????????????false??????
                 * @param [options] {Object} ?????????
                 *      [options.icon=''] {String} icon??????
                 *      [options.closable=true] {Boolean} ??????????????????
                 *      [options.modal=true] {Boolean} ??????
                 *      [options.timeout=0] {Number} ???????????????0?????????????????????
                 *      [options.width] {Number} ??????
                 *      [options.height] {Number} ??????
                 *      [options.maxWidth] {Number} ????????????
                 *      [options.maxHeight] {Number} ????????????
                 */
                confirm: function (title, msg, fn, options) {
                    options = options || {};
                    angular.extend(options, {
                        title: title || $config.i18nInfo.confirmTitle,
                        msg: msg || '',
                        buttons: [{
                            text: $config.i18nInfo.confirmSure,
                            type: 'sure',
                            handler: function () {
                                angular.isFunction(fn) && fn(true);
                            }
                        }, {
                            text: $config.i18nInfo.confirmCancle,
                            type: 'cancel',
                            handler: function () {
                                angular.isFunction(fn) && fn(false);
                            }
                        }]
                    });
                    return this.show(options);
                },

                /**
                 * ???????????????????????????
                 * @param ???title='?????????'??? {String} ???????????????
                 * @param msg {String}
                 * @param [modal] {Boolean} ????????????
                 * @returns {MsgBox}
                 */
                wait: function (title, msg, modal) {
                    var opts = {
                        wait: true,
                        closable: false,
                        msg: msg || '',
                        modal: modal
                    };
                    if (angular.isObject(title)) {
                        angular.extend(opts, title);
                        opts.title = opts.title || $config.i18nInfo.waitTitle;
                    } else {
                        opts.title = title || $config.i18nInfo.waitTitle;
                    }
                    return this.show(opts);
                },

                /**
                 * ??????????????????????????????
                 * @param [title='????????????'] {String}
                 * @param msg {String}
                 * @param [modal] {Boolean}
                 * @returns {MsgBox}
                 */
                progress: function (title, msg, modal) {
                    return this.show({
                        progress: true,
                        title: title || $config.i18nInfo.progressTitle,
                        msg: msg || '',
                        modal: modal
                    });
                },

                /**
                 * ???iframe??????????????????
                 * @param [title or options] {String or Object} ?????? ??? ?????????
                 *      [options.title='???????????????'] {String} ??????
                 *      [options.url] {String} ?????????iframe??????
                 *      [options.data] {obj} ???url?????????json?????????
                 *      [options.closable=true] {Boolean} ??????????????????
                 *      [options.modal=true] {Boolean} ??????
                 *      [options.top] {Number} top???????????????????????????
                 *      [options.left] {Number} left???????????????????????????
                 *      [options.width] {Number} ??????
                 *      [options.height] {Number} ??????
                 *      [options.onBeforeClose] {Function} ???????????????????????????false????????????????????????
                 *      [options.onClose] {Function} ???????????????
                 *      [options.onBeforeOpen] {Function} ????????????????????????false????????????????????????
                 *      [options.onOpen] {Function} ???????????????
                 *  @param [url] {String} ???????????????
                 *  @param [width] {Number} ??????
                 *  @param [height] {Number} ??????
                 *  @param [modal=true] {Boolean} ????????????
                 *  @return {MsgBox} ?????????????????????close??????????????????
                 */
                showUrl: function (title, url, data, width, height) {
                    var msgBox,
                        opts = {
                            title: '',
                            closable: true,
                            maximization: false,
                            drag: true,
                            width: width || 500,
                            height: height || 300,
                            modal: true
                        },
                        onBeforeOpen, onOpen;

                    if (angular.isObject(title)) {
                        angular.extend(opts, title);
                        url = opts.url;
                        data = opts.data;
                    } else {
                        opts.title = title;
                    }

                    onBeforeOpen = opts.onBeforeOpen;
                    onOpen = opts.onOpen;
                    if (angular.isFunction(onBeforeOpen) &&
                        onBeforeOpen() === false) {
                        return;
                    }

                    if (!angular.isString(url)) return;

                    msgBox = new MsgBox(opts);
                    msgBox.setTitle(opts.title);
                    opts.maximization && msgBox.setMaximization();
                    opts.closable && msgBox.setClosable();
                    msgBox.setWidth(opts.width);
                    msgBox.setHeight(opts.height);
                    msgBox.setUrl(url);

                    GillionMsgService._setInputData(msgBox.tempId, angular.copy(data));
                    msgBox.render();
                    opts.drag && msgBox.drag();

                    angular.isFunction(onOpen) && onOpen();

                    GillionMsgService._register(msgBox);
                    return msgBox;
                },
                /**
                 * ??????
                 */
                mask: function (dom) {
                    function focusMask() {
                        var flag = true;
                        var $this = angular.element(this);
                        try {
                            if (dom && $.contains(dom, this)) flag = false;
                            if (flag && !mainJq.contains(mainJq(getMainWindow(window).document.body).find('.calendar:visible')[0], this) && !$this.parent().is('.modal-footer')) {
                                $this.blur();
                                return false;
                            }
                        } catch (ignored) {
                        }
                    }

                    var $mask = getMainWindow(window).__$mask;
                    if (!$mask) {
                        getMainWindow(window).__$mask = $mask = mainJq('<div class="modal-mask"></div>');
                        $mask.appendTo(getMainWindow(window).document.body);
                    }
                    $mask.css('z-index', ZIndex.getMaxZIndex()).show();
                    if (dom) {
                        mainJq(dom).css('z-index', ZIndex.getMaxZIndex());
                    }
                    //??????????????????????????????
                    mainJq(getMainWindow(window).document).on('focus.__mask', '*', focusMask);
                    if (getMainWindow(window) != window) {
                        angular.element(document).on('focus.__mask', '*', focusMask);
                    }
                },
                /**
                 * ????????????
                 */
                unMask: function () {
                    var $mask = getMainWindow(window).__$mask;
                    if ($mask) {
                        $mask.hide();
                        mainJq(getMainWindow(window).document).off('focus.__mask', '*');
                        if (getMainWindow(window) != window) {
                            angular.element(document).off('focus.__mask', '*');
                        }
                    }
                }
            };
        }])
        .directive('gMsg', ['GillionMsg', function (GillionMsg) {
            return {
                restrict: 'A',
                scope: {
                    options: '=',
                    fn: '='
                },
                link: function (scope, ele, attrs) {
                    ele.on('click', function () {
                        var invokeName = attrs.gMsg,
                            options = scope.options || {},
                            fn = scope.fn,
                            title = attrs.title,
                            msg = attrs.msg;
                        angular.extend(options, {
                            title: title,
                            msg: msg
                        });
                        if (!invokeName || invokeName == 'show' || !angular.isFunction(GillionMsg[invokeName])) {
                            GillionMsg.show(options);
                        } else {
                            GillionMsg[invokeName](title, msg, fn, options);
                        }
                        scope.$on("$destroy", function () {
                            // GillionMsg[invokeName];
                            ele.off('click');
                        })
                    });
                }
            };
        }]);
});
