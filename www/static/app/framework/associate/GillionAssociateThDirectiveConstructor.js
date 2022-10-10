define('framework/associate/GillionAssociateThDirectiveConstructor', ['angular'], function (angular) {
    return function () {
        return {
            restrict:'E',
            template:'<th ng-transclude></th>',
            scope: false,
            replace:true,
            transclude: true,
            require:'^?gAssociate',
            link: function (scope, element,attrs,associateCtrl) {
                if(angular.isDefined(attrs.width)){
                    element.css("width",attrs.width);
                }
                associateCtrl.addColumn(attrs.displayExpress || '');
                associateCtrl.addFilterName(attrs.filterName || '');
            }
        };
    };
});