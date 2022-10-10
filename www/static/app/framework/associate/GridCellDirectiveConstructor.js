define('framework/associate/GridCellDirectiveConstructor', [], function () {
    return function ($compile) {
        return {
            scope: false,
            link: function (scope, element) {
                var associate = scope.associate,
                    row = scope.row,
                    col = scope.col,
                    val;

                if (col.template) {
                    element.append($compile(col.template)(scope));
                } else {
                    val = associate.getCellValue(row, col);
                    val = associate.doFilters(val, scope);
                    element.html(val);
                }
            }
        };
    };
});