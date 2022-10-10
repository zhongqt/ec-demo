/**
 * Created by huangzx on 2015/8/31.
 */
define('framework/imageViewer2/GillionImageViewerModule', [
    'angular',
    'jquery',
    'config.properties'
], function(angular, $, config){
    var $currentPath = config.$paths.$current;
    return angular.module('GillionImageViewerModule', [])
        .factory('ImageViewer', function($window){
            return {
                /**
                 *
                 * @param activeFileKey {String} 选中的图片key
                 * @param fileKeys {Array<String>} 文件key组
                 */
                show : function(activeFileKey, fileKeys){
                    var viewUrl = $currentPath.path + "/static/app/framework/imageViewer2/viewer?",
                        fileKeysParamStr = $.param({
                            activeFileKey: activeFileKey,
                            fileKeys:fileKeys
                        }, true);
                    $window.open(viewUrl + fileKeysParamStr);
                }
            };
        })
        .controller('ImageViewerController', function($scope, $window, $http, Arrays, Params){
            var fileKeys = Params.fileKeys,
                $imagesList = angular.element('.viewer-images-list'),
                $imgContainer = angular.element('viewer-images-content'),
                $img = angular.element('.viewer-images-current'),
                $operate = angular.element('.viewer-images-operate'),
                $operateMask = angular.element('.viewer-images-operate-mask'),
                $magnifyIcon = $operate.find('i').first(),
                $expandIcon = $operate.find('.viewer-images-operate-btn-expand i');
            $scope.fileKeys = angular.isString(fileKeys) ? [fileKeys] : fileKeys;

            $scope.activeFileKey = Params.activeFileKey;

            //关闭
            $scope.closeViewer = function(){
                $window.close();
            };

            //放大
            $scope.magnifying = function(){
                var w1, w2, h1, h2;
                w1 = $img.width();
                h1 = $img.height();
                $img.toggleClass('viewer-images-magnifying');
                w2 = $img.width();
                h1 = $img.height();

                if ($img.hasClass('viewer-images-magnifying')){
                    $img.css('position', '').off();
                    $magnifyIcon.removeClass('fi-shrink').addClass('fi-magnifying');
                } else if (w1 < w2 || h1 < h2) {
                    $magnifyIcon.addClass('fi-shrink').removeClass('fi-magnifying');
                    $img.css({
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }).mousedown(function(e){
                        var imgDom = $img[0],
                            dX = e.clientX - imgDom.offsetLeft,
                            dY = e.clientY - imgDom.offsetTop;
                        $img.on('mousemove', function(e){
                            $img.css({
                                left: e.clientX - dX,
                                top: e.clientY - dY
                            });
                            return false; //cancel default drag action
                        });
                    });
                }
            };
            angular.element('body').mouseup(function(){
                $img.off('mousemove');
            });

            //缩略图展开
            $scope.expand = function(){
                $imagesList.toggle();
                $expandIcon.toggleClass('fi-smallarrow-down').toggleClass('fi-smallarrow-up');
                if ($expandIcon.hasClass('fi-smallarrow-up')){
                    $operate.css('bottom', 86);
                    $operateMask.css('bottom', 86);
                } else {
                    $operate.css('bottom', '10%');
                    $operateMask.css('bottom', '10%');
                }
            };

            function resetImg(){
                $img.addClass('viewer-images-magnifying');
                $img.css('position', '').off();
                $magnifyIcon.removeClass('fi-shrink').addClass('fi-magnifying');
            }

            //上一张
            $scope.prev = function(){
                var $curr = $imagesList.find('img.current'),
                    $active = $curr.prev(),
                    activeFileKeyIndex;
                if ($active.size() == 0){
                    $active= $imagesList.find('img').last();
                }
                resetImg();
                activeFileKeyIndex = $active.data('index');
                $scope.activeFileKey = $scope.fileKeys[activeFileKeyIndex];
            };
            //下一张
            $scope.next = function(){
                var $curr = $imagesList.find('img.current'),
                    $active = $curr.next(),
                    activeFileKeyIndex;
                if ($active.size() == 0){
                    $active = $imagesList.find('img').first();
                }
                resetImg();
                activeFileKeyIndex = $active.data('index');
                $scope.activeFileKey = $scope.fileKeys[activeFileKeyIndex];

            };

            $scope.activeImage = function (fileKey) {
                resetImg();
                $scope.activeFileKey = fileKey;
            };

            //下载
            $scope.download = function(){
                var $curr = $imagesList.find('img.current'),
                    //gillion-web为上下文路径
                    src = $currentPath.ctx + '/cloud/filesystem/downloadFile/' + $scope.activeFileKey;
                angular.element('<iframe src='+ src +' style="display:none;"/>').appendTo('body');
            };

            function rotate(angle){
                var imgDom = $img[0],
                    rotation, costheta, sintheta,
                    cssKeys, cssVal;
                imgDom.angle = ((imgDom.angle == undefined ? 0 : imgDom.angle) + angle) % 360;
                if (navigator.userAgent.indexOf("MSIE 8.0")>0) {
                    rotation = (imgDom.angle >= 0)?  Math.PI * imgDom.angle / 180 : Math.PI * (360 + imgDom.angle) / 180;
                    costheta = Math.cos(rotation);
                    sintheta = Math.sin(rotation);
                    imgDom.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + costheta + ",M12=" + (-sintheta)
                                                            + ",M21=" + sintheta + ",M22=" + costheta + ",SizingMethod='auto expand')";
                } else {
                    cssKeys = ['transform', '-ms-transform', '-moz-transform', '-webkit-transform', '-o-transform'];
                    cssVal = 'rotate('+ imgDom.angle +'deg)';
                    angular.forEach(cssKeys, function(cssKey){
                        $img.css(cssKey, cssVal);
                    });
                }
            }
            $scope.rotateRight = function(){
                rotate(-90);
            };
            $scope.rotateLeft = function() {
                rotate(90);
            };
        });
});
