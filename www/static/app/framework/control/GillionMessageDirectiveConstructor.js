define('framework/control/GillionTooltipDirectiveConstructor',['angular'], function (angular) {
    return function ($compile,GillionTooltipService) {
        return {
            scope:{
                className:'@',
                gTooltip:'@',
                direction:'@',
                outterBox:'@',
                hideEvent:'@',
                showEvent:'@'
            },
            restrict: 'A',
            link: function (scope, element,attrs) {
                var params = {
                    'gTooltip':scope.gTooltip,
                    'direction':scope.direction,
                    'outterBox':scope.outterBox,
                    'className':scope.className
                };
                if(attrs.messageType=='tip'){
                    params.fontColor="#00b7ee";
                    params.iconColor="#00b7ee";
                    params.iconType = 'icon-que';
                }else if(attrs.messageType=='warn'){
                    params.fontColor="#E0600B";
                    params.iconColor="#f06e00";
                    params.iconType = 'icon-del';
                }
                var messages = GillionTooltipService.create(element,params);
                //messages.createMessageDom();
                //messages.hide();
                scope.showEvent = !!scope.showEvent?scope.showEvent:"mouseenter";
                scope.hideEvent = !!scope.hideEvent?scope.hideEvent:"mouseleave";
                element.on(scope.showEvent,function(){ messages.createMessageDom()});
                element.on(scope.hideEvent,function(){ messages.remove()});

                element.next().on("mouseenter",function(){ messages.createMessageDom()});
                element.next().on("mouseleave",function(){ messages.remove()});
            }
        }
    }
});