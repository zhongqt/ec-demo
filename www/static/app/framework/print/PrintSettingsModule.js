define('framework/print/PrintSettingsModule', [
    'angular',
    'underscore',
    'artTmpl'
], function (angular, _, artTmpl) {

    function getMainWindow(window) {
        var href = window.location.href;
        if (href.indexOf('__showUrl=true') !== -1) {
            return getMainWindow(window.parent);
        }
        return window;
    }

    var headerTmpl = artTmpl.compile('<tr>{{each selected as column}}<td{{if column.width}} width="{{column.width}}"{{/if}}>{{column.text}}</td>{{/each}}</tr>'),
        dataRowTmpl = artTmpl.compile('<tr>{{each selected as column}}<td>{{column.field}}</td>{{/each}}</tr>');

    return angular.module('PrintSettingsModule', [])
        .directive('gPrintSettings', function ($parse, $rootScope, $window, GillionMsg, GillionLocationService, Arrays) {
            var PrintSettingsProto = PrintSettings.prototype;

            function PrintSettings(scope, element) {
                var me = this;
                me.scope = scope;
                me.element = element;
                me.selections = {
                    L: [],
                    R: []
                };
            }

            /**
             * 开始设置打印模板
             *
             * @param params.originalColumns {Array<Object>} 原始列信息
             * @param params.oldTemplate {String} 上次保存的模板
             * @param params.callback {function(string)} 确认设置模板后回调
             */
            PrintSettingsProto.startEdit = function (params) {
                var me = this,
                    oldCols;
                me.sededCallback = params.callback;
                me.source = params.originalColumns;
                if (params.oldTemplate) {
                    oldCols = me.parsePrintTmpl(params.oldTemplate)
                    me.selected = extractSelected(me.source, oldCols);
                } else {
                    me.selected = [];
                    Arrays.pushAll(me.source, me.selected);
                }
                me.show();
            };

            function extractSelected(source, oldCols) {
                var selected = [];
                _.each(source, function (col) {
                    var existsOldCol = _.findWhere(oldCols, {field: col.field});
                    if (existsOldCol) {
                        col.width = existsOldCol.width;
                        selected.push(col);
                    }
                });
                return selected;
            }

            PrintSettingsProto.parsePrintTmpl = function (printTemplate) {
                var headerFlag = printTemplate.match(/<tbody>(.*)<\/tr>LoopContent/m),
                    headerRow = headerFlag[1],
                    dataFlag = printTemplate.match(/\$TABLE_E\$\$TR_S\$(.*)\$TR_E\$/m),
                    dataRow = dataFlag[1],
                    $header, $dataRow, datas, columns, i, len, col;
                if (!headerRow) {
                    throw new Error('不能解析到打印列表头部， 请检查传入的打印模板是否合法 :' + printTemplate);
                }
                if (!dataRow) {
                    throw new Error('不能解析到打印列表数据行， 请检查传入的打印模板是否合法 :' + printTemplate);
                }
                $header = angular.element(headerRow);
                columns = _.chain($header.children('td'))
                    .map(angular.element)
                    .map(function ($cell) {
                        var col = {text: $cell.text()},
                            widthStr = $cell.attr('width'),
                            width = widthStr ? Number(widthStr) : undefined;
                        if (!isNaN(width) && _.isNumber(width)) {
                            col.width = width;
                        }
                        return col;
                    })
                    .value();
                $dataRow = angular.element(dataRow);
                datas = _.chain($dataRow.children('td'))
                    .map(angular.element)
                    .map(function ($cell) {
                        return $cell.text();
                    })
                    .value();
                if (columns.length !== datas.length) {
                    throw new Error('解析出的表头列数与数据列数不同， 请检查传入的模板是否合法 :' + printTemplate);
                }
                for (i = 0, len = columns.length; i < len; i++) {
                    col = columns[i];
                    col.field = datas[i];
                }
                return columns
            };

            PrintSettingsProto._getOriginalPrintCols = function () {
                var me = this,
                    grid = me.grid,
                    originalPrintCols = grid.__originalPrintCols;
                if (_.isArray(originalPrintCols)) {
                    return originalPrintCols;
                } else {
                    var columns = grid.__originalCols || grid.columns;
                    return grid.__originalPrintCols = _.map(columns, function (column) {
                        return {
                            field: column.field,
                            text: column.text
                        };
                    });
                }
            };

            PrintSettingsProto.show = function () {
                var me = this;
                if (!(me.scope.$$phase || me.scope.$root.$$phase)) {
                    me.scope.$apply(function () {
                        var $element = me.element;
                        $element.show();
                        GillionMsg.mask($element);
                    });
                } else {
                    me.scope.$evalAsync(function () {
                        var $element = me.element;
                        $element.show();
                        GillionMsg.mask($element);
                    });
                }
            };

            PrintSettingsProto.hide = function () {
                this.element.hide();
                GillionMsg.unMask();
            };

            PrintSettingsProto.enter = function () {
                var me = this,
                    newTmpl = me.__buildPrintTmpl();
                me.sededCallback(newTmpl);
                me.hide();
            };

            PrintSettingsProto._getSelected = function () {
                return this.selected;
            };

            PrintSettingsProto._getUnSelected = function () {
                var me = this,
                    selected = me.selected,
                    source = me.source;
                return _.without.apply(null, [source].concat(selected));
            };

            PrintSettingsProto._addSelection = function ($event, item, type) {
                var me = this,
                    selections = me.selections;
                if (!$event.ctrlKey) {
                    selections.L.length = 0;
                    selections.R.length = 0;
                }
                selections[type].push(item);
            };

            PrintSettingsProto._anySelection = function (item, type) {
                return _.contains(this.selections[type], item);
            };

            PrintSettingsProto._last = function () {
                var me = this,
                    selected = me.selected,
                    leftSelections = me.selections.L,
                    withoutSelection;
                withoutSelection = _.partial(_.without, selected).apply($window, leftSelections);
                me.selected = withoutSelection.concat(leftSelections);
            };

            PrintSettingsProto._down = function () {
                var me = this,
                    selected = me.selected,
                    leftSelections = me.selections.L,
                    i, item;
                for (i = (selected.length - 2); i >= 0; i--) {
                    item = selected[i];
                    if (_.contains(leftSelections, item)
                        && !_.contains(leftSelections, selected[i + 1])) {
                        selected.splice(i, 1);
                        selected.splice(i + 1, 0, item);
                    }
                }
            };
            PrintSettingsProto._up = function () {
                var me = this,
                    selected = me.selected,
                    leftSelections = me.selections.L,
                    i, len, item;
                for (i = 1, len = selected.length; i < len; i++) {
                    item = selected[i];
                    if (_.contains(leftSelections, item)
                        && !_.contains(leftSelections, selected[i - 1])) {
                        selected.splice(i, 1);
                        selected.splice(i - 1, 0, item);
                    }
                }
            };
            PrintSettingsProto._first = function () {
                var me = this,
                    selected = me.selected,
                    leftSelections = me.selections.L,
                    withoutSelection;
                withoutSelection = _.partial(_.without, selected).apply($window, leftSelections);
                me.selected = leftSelections.concat(withoutSelection);
            };

            PrintSettingsProto._deselect = function () {
                var me = this;
                me.selected = _.partial(_.without, me.selected).apply($window, me.selections.L);
                me.selections.L.length = 0;
            };

            PrintSettingsProto._deselectAll = function () {
                var me = this;
                me.selected.length = 0;
                me.selections.L.length = 0;
            };
            PrintSettingsProto._select = function () {
                var me = this;
                Arrays.pushAll(me.selections.R, me.selected);
                me.selections.R.length = 0;
            };
            PrintSettingsProto._selectAll = function () {
                var me = this;
                me.selected.length = 0;
                Arrays.pushAll(me.source, me.selected);
                me.selections.R.length = 0;
            };

            PrintSettingsProto.__buildPrintTmpl = function () {
                var me = this;
                return '$TEXT_S$LODOP.ADD_PRINT_TABLE("10mm","0mm",800,600,"tablehtml");$TEXT_E$ $TABLE_S$ <style type="text/css"> .print_table { border-collapse: collapse; border-spacing: 0; width: 277mm; } .print_table caption { font-size: 1.2em; padding: .5em 0; font-weight: bold; } .print_table thead td { font-size: 1em; border-bottom: 1px solid #000; } .print_table thead tr.sec td { padding-bottom: .8em; border-bottom: 1px solid #333; } .print_table td { padding: .5em; font-size: 12px; } .print_table tbody td { border: 1px solid #333; }      </style> <table class="print_table" cellpadding="0" cellspacing="0"> <caption>CompanyName装车清单</caption> <thead> <tr> <td colspan="16">装车单号:<span style="padding-right:5px;">LoadingNo</span>发车时间:<span style="padding-right:5px;">SendTime</span>车牌号:<span style="padding-right:5px;">VehicleNo</span>司机:<span style="padding-right:5px;">CarOwner</span>联系电话:<span style="padding-right:5px;">DriverPhone</span>线路:<span>TranLine</span></td> </tr> </thead> <tbody>'
                    + headerTmpl(me)
                    + 'LoopContent <tr> <td colspan="2">合计:</td> <td colspan="4">共: LoadingCount票 LoadingQuantity件 LoadingTotalWeightT LoadingTotalVolumeF</td> <td>goodsQuantityTotal</td> <td>goodsWeightTotal</td> <td>goodsVolumeTotal</td> <td>returnbillQuantityTotal</td> <td>goodsPaymentTotal</td> <td>pickupFeeTotal</td> <td colspan="4">下货地:pointName</td> </tr> <tr> <td colspan="6">经办人签字：</td> <td colspan="6">承运人签字：</td> <td></td> <td colspan="4">仓管签字：</td> </tr> </tbody> <tfoot> <tr> <td colspan="12">打印人：Printer</td> <td colspan="4">打印时间：PrintTime</td> </tr> </tfoot> </table>$TABLE_E$$TR_S$'
                    + dataRowTmpl(me)
                    + '$TR_E$';
            };

            return {
                restrict: 'E',
                template: '<div class="table-settings" id="pintSettings" style="display: none;">\n    <div class="title"><span class="fl">自定义列表项</span>\n        <button class="fr" ng-click="pintSettings.hide()"><i class="iconfont2 icon-guanbi2"></i></button>\n    </div>\n    <div class="body">\n        <div class="box fl">\n            <h3> 已显示列\n                <button ng-click="pintSettings._first()" type="button" class="fr">\n                    <i class="iconfont2 icon-dingbu"></i>\n                </button>\n                <button ng-click="pintSettings._up()" type="button" class="fr mt-2">\n                    <i class="iconfont2 icon-shangyi"></i>\n                </button>\n                <button ng-click="pintSettings._down()" type="button" class="fr mt-2">\n                    <i class="iconfont2 icon-xiayi"></i>\n                </button>\n                <button ng-click="pintSettings._last()" type="button" class="fr">\n                    <i class="iconfont2 icon-dibu"></i>\n                </button>\n            </h3>\n            <ul>\n                <li ng-class="{\'act\': pintSettings._anySelection(item, \'L\')}"\n                    ng-repeat="item in pintSettings._getSelected() track by $id(item)"\n                    ng-click="pintSettings._addSelection($event, item, \'L\')">{{item.text}}<span style="float:right;"><input type="number" ng-model="item.width" style="width: 40px;"> px</span></li>\n            </ul>\n        </div>\n        <div class="center fl">\n            <a ng-click="pintSettings._deselect()" href="javascript:;"><i class="iconfont2 icon-xiangyou"></i></a> \n            <a ng-click="pintSettings._deselectAll()" href="javascript:;"><i class="iconfont2 icon-xiangyou2"></i></a> \n            <a ng-click="pintSettings._select()" href="javascript:;"><i class="iconfont2 icon-xiangzuo"></i></a> \n            <a ng-click="pintSettings._selectAll()" href="javascript:;"><i class="iconfont2 icon-xiangzuo2"></i></a>\n        </div>\n        <div class="box fr"><h3> 未显示列 </h3>\n            <ul>\n                <li ng-class="{\'act\': pintSettings._anySelection(item, \'R\')}"\n                    ng-repeat="item in pintSettings._getUnSelected() track by $id(item)"\n                    ng-click="pintSettings._addSelection($event, item, \'R\')">\n                    {{item.text}}\n                    <span style="float: right;background-color: #ffffff" ng-if="item.width">{{item.width}} px</span>\n                </li>\n            </ul>\n        </div>\n    </div>\n    <div class="footer">\n        <a href="javascript:;" class="btn btn-normal" ng-click="pintSettings.enter()">确认</a> \n        <a href="javascript:;" class="btn btn-stroke" ng-click="pintSettings.hide()">取消</a>\n    </div>\n</div> ',
                replace: true,
                scope: true,
                link: function (scope, element) {
                    scope.pintSettings = new PrintSettings(scope, element);
                }
            };
        })
        .factory('PrintSettings', function ($rootScope, $compile) {
            var mainWindow = getMainWindow(window),
                $dom, $mainBody;
            if (!mainWindow.__printSettings) {
                $dom = angular.element('<g-print-settings></g-print-settings>');
                $compile($dom)($rootScope);
                $mainBody = angular.element(mainWindow.document.body);
                $mainBody.append($dom);
                $mainBody.append('<style></style>');
                mainWindow.__printSettings = $dom.scope().pintSettings
            }
            return mainWindow.__printSettings;
        });
});