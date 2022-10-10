define('framework/directive/GillionCommonsSaveConstructor', function () {
    return function () {
        function getFormData($form) {
            var formData = {};
            $.each($form.serializeArray(), function (index, element) {
                formData[element.name] = element.value;
            });
            return formData;
        }

        return {
            restrict: 'A',
            require: ['^gResource', 'form'],
            link: {
                pre: function (scope, element, attrs, controllers) {
                    var gResourceController = controllers[0],
                        formController = controllers[1],
                        Resources = gResourceController.getResources();

                    element.bind('submit', function () {
                        var save = function () {
                            Resources.save(getFormData(element));
                        };
                        if (angular.isFunction(formController.verify)) {
                            formController.verify();
                            if (formController.$valid) {
                                save();
                            }
                        } else {
                            save();
                        }
                    });
                }
            },
            controller: ['$element', function ($element) {
                this.getFormData = function () {
                    getFormData($element);
                };
            }]
        };
    };
});