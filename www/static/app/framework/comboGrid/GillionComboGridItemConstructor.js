define('framework/comboGrid/GillionComboGridItemConstructor', [], function () {
    return function () {
        'use strict';
        return {
            restrict: "A",
            require: ["^gComboGrid", "ngModel"],
            scope: false,
            link: function (scope, element, attrs, required) {
                // Prevent html5/browser auto completion.
                attrs.$set('autocomplete', 'off');
                var options = {};
                //event config
                options.on_select = function (selected) {
                    scope.selected_Obj = selected.obj;
                };
                element.bind('focus', function () {
                    if (!options) throw "Invalid options";
                    required[0].attach(required[1], element, options);
                });
            }
        };
    };
});