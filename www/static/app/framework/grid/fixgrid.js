define('framework/grid/fixgrid', [
    'jquery',
    'underscore'
], function ($, _) {
    var minHeight = 10;
    var xh = 10;
    var throttleFixgridHeight = _.throttle(fixgridHeight, 500);

    $(window).resize(throttleFixgridHeight);
    $(window).on('fixgrid', fixgridHeight);
    $('body').on('click', 'a[data-toggle], a.fixgrid-refresh', function () {
        _.delay(fixgridHeight, 200);
    });

    function fixgridHeight() {
        var $fixgridContainer = $('div.fixgrid-container');
        var scrollWidth = 0;
        var windowHeight = window.innerHeight;
        var windowWidth = window.innerWidth;
        var bodyWidth = $('body').outerWidth();
        if (bodyWidth > windowWidth + 1) {
            scrollWidth = 20;
        }
        $fixgridContainer.each(function (i, container) {
            var $container = $(container);
            var $gridBody = $('div.grid-body, div.group-table, div.hot-table', $container);
            var $hotTable = $('div.hot-table', $container);
            var uniqHotTableArr = _.uniq(_.pluck($hotTable,"id"));
            var gridCount = $gridBody.length - $hotTable.length + uniqHotTableArr.length;
            var ratio = getGridRatio($container, gridCount);
            if (!gridCount) {
                return;
            }

            $gridBody.hide();
            var otherElHeihgt = $container.outerHeight();
            var restHeight = windowHeight - otherElHeihgt - xh - scrollWidth;
            $gridBody.each(function (i, gridBody) {
                var $grid = $(gridBody);
                var r = (ratio.ratio[i] || 1) / ratio.totle;
                var h = Math.floor(restHeight * r);
                if (h < minHeight) {
                    h = minHeight;
                }
                if ($grid.hasClass('hot-table')) {
                    if (h < 60) h = 100;
                    var gridScope = $grid.children().scope();
                    var grid = gridScope && gridScope.grid;
                    $grid.show();
                    grid && grid.resizeTo(null, h);
                } else {
                    $grid.show().outerHeight(h);
                }
            });
        });
    }

    function getGridRatio($el, count) {
        var classList = $el.attr('class').split(' ');
        var ratioClass = '';
        $.each(classList, function (i, v) {
            var cls = $.trim(v);
            if (cls.indexOf('fixgrid-ratio-') === 0) {
                ratioClass = cls;
                return false;
            }
        });
        var defaultRatio = {
            totle: count,
            ratio: fillArray(count, 1)
        };
        if (!ratioClass) {
            return defaultRatio;
        }
        var ratioStrList = ratioClass.split('-').splice(2);
        if (!ratioStrList.length) {
            return defaultRatio;
        }
        var ratioList = [];
        var totle = 0;
        $.each(ratioStrList, function (i, s) {
            var n = parseInt(s) || 1;
            totle += n;
            ratioList.push(n);
        });
        var rest = count - ratioList.length;
        if (rest > 0) {
            for (var i = 0; i < rest; i++) {
                totle += 1;
                ratioList.push(1);
            }
        }
        return {
            totle: totle,
            ratio: ratioList
        };

        function fillArray(len, item) {
            var arr = [];
            if (!len) {
                return [];
            }
            for (var i = 0; i < len; i++) {
                arr.push(item);
            }
            return arr;
        }
    }
});
