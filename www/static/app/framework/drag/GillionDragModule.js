/**
 * Created by huangzx on 2016/4/25.
 */
define('framework/drag/GillionDragModule', [
    'angular'
], function(angular){

    return angular.module('GillionDragModule', [])
        .factory('DragService', function () {
            return {
                /**
                 * 拖拽服务
                  * @param option 配置项 || dom 容器
                 *      [options.container] {dom} 容器
                 *      [options.dragDom]  {dom} 容器上可以拖拽的元素,无配置的话则为整个容器
                 *      [options.onBeforeDrag] {Function} 在拖动之前触发，返回false将取消拖动
                 *      [options.onDrag] {Function} 在拖动过程中触发，当不能再拖动时返回false
                 *      [options.onStopDrag] {Function} 在拖动停止时触发
                 */
                draggable: function(option){
                    var currDocument,
                        container, $container,
                        dragDom, $dragDom,
                        onBeforeDrag = angular.noop,
                        onDrag = angular.noop,
                        onStopDrag = angular.noop;

                    if (angular.isElement(option)) {
                        container = option;
                    } else if (angular.isObject(option)){
                        container = option.container;
                    }
                    if (!container) return;

                    currDocument = container.ownerDocument;
                    $container = angular.element(container);
                    dragDom = option.dragDom || container;
                    $dragDom = angular.element(dragDom).css('cursor', 'move');

                    if (angular.isFunction(option.onBeforeDrag)) {
                        onBeforeDrag = option.onBeforeDrag;
                    }
                    if (angular.isFunction(option.onDrag)) {
                        onDrag = option.onDrag;
                    }
                    if (angular.isFunction(option.onStopDrag)) {
                        onStopDrag = option.onStopDrag;
                    }

                    function mouseUp(e){
                        angular.element(currDocument).off('mousemove.drag mouseup.drag');
                        onStopDrag.call(container, e);
                    }

                    $dragDom.on('mousedown', function(e){
                        var dX = e.clientX - container.offsetLeft,
                            dY = e.clientY - container.offsetTop;

                        if (onBeforeDrag.call(container, e) == false) return;

                        function mouseMove(e) {
                            var left = e.clientX - dX,
                                top = e.clientY - dY;
                            if (left < 0) {
                                left = 0;
                            }
                            if (top < 0) {
                                top = 0;
                            }
                            if (onDrag.call(container, e) != false){
                                $container.css({
                                    position: 'absolute',
                                    left: left,
                                    top: top
                                });
                            }
                            return false;
                        }
                        angular.element(currDocument).on('mousemove.drag', mouseMove).on('mouseup.drag', mouseUp);
                    });
                }
            };
        })
        .directive('gDrag', ['DragService', function(DragService){
            return {
                restrict: 'A',
                scope: false,
                link: function(scope, ele, attrs){
                    DragService.draggable(ele[0]);
                }
            };
        }]);
});