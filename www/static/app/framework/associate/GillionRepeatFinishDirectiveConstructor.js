define('framework/associate/GillionRepeatFinishDirectiveConstructor', ['angular'], function (angular) {
    return function () {
        return {
            restrict:'A',
            require:'^?gAssociate',
            link: function (scope, element,attrs) {
                if (scope.$last === true) {
                    scope.$emit('showView');
                }
            }
        };
    };
});