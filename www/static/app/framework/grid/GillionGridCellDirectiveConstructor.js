define('framework/grid/GillionGridCellDirectiveConstructor', [], function () {
    return function ($compile) {
        return {
            scope: false,
            link: function (scope, element, attrs) {
                var grid = scope.grid,
                    row = scope.row,
                    col = scope.col,
                    val;
                if (col.template) {
                    element.append($compile(col.template)(scope));
                } else {
                    val = grid.getCellValue(row, col);
                    val = grid.doFilters(val, scope);
                    element.text(val);
                }
            }
        }
    }
});