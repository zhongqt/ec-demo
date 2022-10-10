/**
 * Created by yanpp on 15-3-25.
 */
define('framework/comboPort/NewPortGridCellDirectiveConstructor', [], function () {
    return function ($compile) {
        return {
            scope: false,
            link: function (scope, element) {
                var comboPort = scope.comboPort,
                    row = scope.row,
                    col = scope.col,
                    val;

                if (col.template) {
                    element.append($compile(col.template)(scope));
                } else {

                    val = comboPort.getCellValue(row, col);
                    val = comboPort.doFilters(val, scope);


                    element.html(val);
                }
            }
        };
    };
});