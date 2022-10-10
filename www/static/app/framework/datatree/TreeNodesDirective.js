define('framework/datatree/TreeNodesDirective', ["angular"], function (angular) {
        return function () {
            return {
                require: ['^ngModel', '?^treeNode', '^gDataTree'],
                restrict: 'A',
                link: function (scope, element, attrs, ctrls) {
                },
                controller: ['$scope', '$element', function ($scope, $element) {
                    this.scope = $scope;
                    $scope.$element = $element;
                }]
            }
        }
    }
);
