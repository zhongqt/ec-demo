define('framework/commons/SmartPositionsConstructor', function () {
    return function ($window) {
        var SmartPosProto = SmartPositions.prototype;
        function SmartPositions($element) {
            var me = this;
            me.$element = $element;
        }

        SmartPosProto.nearTo= function($anotherElement) {

        };

        SmartPosProto.autoSetOnWindowResize = function () {

        };

        return function ($element) {
           return new SmartPositions($element);
        };
    }
});