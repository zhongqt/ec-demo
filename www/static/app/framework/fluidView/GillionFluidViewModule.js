/**
 * Created with IntelliJ IDEA.
 * User: linhp
 * Date: 2018-1-31
 */
define('framework/fluidView/GillionFluidViewModule', ['angular', 'underscore', 'artTmpl'], function (angular, _, artTmpl) {
    angular.module('GillionFluidViewModule', ['DataSourceModule'])
        .directive('gFluidView', function ($rootScope, $compile, $dataSourceManager, $timeout) {
            var FluidView = function (scope, element, attrs) {
                var _this = this;
                _this.scope = scope;
                _this.element = element;
                _this.attrs = attrs;
                _this.width = element.width();
                _this.hash = scope.$id;
            };
            var Proto = FluidView.prototype;
            Proto.render = function () {
                var _this = this,
                    source = _this.scope.source,
                    cellClass = _this._getCellClass();

                _this.element.empty();
                _.each(source, function (record, i) {
                    var el = '', className = "";
                    if (_this.scope.cssClass) {
                        className = _this.scope.cssClass({record: record, index: i});
                    }
                    el += '<div class="' + cellClass + ' ' + className + '">';
                    el += _this._getCompiledTmpl()({record: record, index: i});
                    el += '</div>';
                    var $el = $(el);
                    _this.element.append($el);
                    $compile($el)(_this._getCloneScope(i));
                });
            };

            Proto._getCompiledTmpl = function () {
                if (!this.tmplCompile) this.tmplCompile = artTmpl.compile(this._getTmpl());
                return this.tmplCompile;
            };

            Proto._getTmpl = function () {
                var tmpl = "";
                _.forEach(this.element.context.children, function (node) {
                    switch (node.tagName.toUpperCase()) {
                        case 'G-FLUID-VIEW-TMPL':
                            tmpl = node.innerHTML.trim();
                            break
                    }
                });
                return tmpl;
            };

            Proto._getCellClass = function () {
                switch (this.scope.columnCount) {
                    case 1:
                        return "col-md-12 col-xs-12 col-sm-12";
                    case 2:
                        return "col-md-6 col-xs-6 col-sm-6";
                    case 3:
                        return "col-md-4 col-xs-4 col-sm-4";
                    case 4:
                        return "col-md-3 col-xs-3 col-sm-3";
                    case 6:
                        return "col-md-2 col-xs-2 col-sm-2";
                    case 12:
                        return "col-md-1 col-xs-1 col-sm-1";
                }
            };

            Proto._getCloneScope = function (index) {
                if (!this.tmpScopeList) this.tmpScopeList = {};
                if (!this.tmpScopeList[index]) {
                    this.tmpScopeList[index] = this.scope.$parent.$new(false);
                    this.tmpScopeList[index].record = this.scope.source[index];
                    this.tmpScopeList[index].index = index;
                }
                return this.tmpScopeList[index];
            };

            return {
                template: '<div class="fluid-view row"></div>',
                restrict: 'E',
                replace: true,
                transclude: false,
                scope: {
                    sourceName: '@sourceName',
                    cssClass: '&'
                },
                compile: function (tElement) {
                    return function (scope, element, attrs) {
                        var canColumnCount = [1, 2, 3, 4, 6, 12],
                            columnCount = parseInt(attrs.columnCount);

                        scope.columnCount = (isNaN(columnCount) || !_.contains(canColumnCount, columnCount)) ? 3 : columnCount;

                        scope.$on(scope.sourceName, function (event, result) {
                            var body = document.body;
                            if (body.hasAttribute('g-dict') && !!body.getAttribute('g-dict') && scope.$root.$dictReturned !== true) {
                                scope.$on('$dictReturned', function () {
                                    init();
                                });
                            } else {
                                init();
                            }

                            function init() {
                                scope.source = result['records'];
                                scope.view.render();
                            }
                        });
                    };
                },
                controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                    $scope.view = new FluidView($scope, $element, $attrs);
                    return $scope.view;
                }]
            };
        });
});