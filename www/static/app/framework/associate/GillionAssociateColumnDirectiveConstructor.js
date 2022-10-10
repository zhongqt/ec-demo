define('framework/associate/GillionAssociateColumnDirectiveConstructor', ['angular'], function (angular) {
    return function () {
        return {
            restrict:'E',
            template:'<th ><div class="col-text" ng-transclude></div></th>',
            scope: false,
            replace:true,
            transclude: true,
            require:'^?gAssociate',
            link: function (scope, element,attrs,controller) {
                if(angular.isDefined(attrs.width)){
                    element.css("width",attrs.width);
                }
                if(angular.isDefined(attrs.isShow) && attrs.isShow == 'false'){
                    element.css("display","none");
                }
                //controller.addColumn(attrs.displayExpress || '');
                //controller.addFilterName(attrs.filterName || '');
            }
        };
    };
});