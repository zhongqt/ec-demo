(function (window) {
    define('framework/utils/CrossFrameCaller', [
        'angular',
        'underscore'
    ], function (angular, _) {

        function getMainWindow(window) {
            var href = window.location.href;
            if (href.indexOf('__showUrl=true') !== -1) {
                return getMainWindow(window.parent);
            }
            return window;
        }

        window.__crossFrameCaller = (function () {
            var $document = window.angular.element(window.document);
            return {

                /**
                 * @param  moduleName {String} 依赖的 `moduleName`
                 * @param callback {function(injectInstances:String... , $fromCaller:Object)} 执行的callback， 最后一个参数是 $fromCaller
                 */
                invoke: function (moduleName, callback) {
                    var me = this,
                        injectModule = _.isString(moduleName) || 'ng';
                    if (!_.isFunction(callback)) {
                        throw new TypeError('跨frame调用参数非法, [injects... , callback(injectInstances*, $fromCaller)]');
                    }
                    me._getMainCaller()._injectAndInvoke(injectModule, callback);
                },

                _injectAndInvoke: function (injectModule, callback) {
                    var injector = $document.injector(injectModule);
                    injector.invoke(callback);
                },

                _getMainCaller: function () {
                    var me = this;
                    if (!me.__mainCaller) {
                        me.__mainCaller = getMainWindow(window).__crossFrameCaller;
                    }
                    return me.__mainCaller;
                }
            };
        }());

        return function () {
            return window.__crossFrameCaller;
        };
    })
}(window));