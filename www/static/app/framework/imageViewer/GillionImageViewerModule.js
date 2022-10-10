/**
 * Created by huangzx on 2015/8/31.
 */
define('framework/imageViewer/GillionImageViewerModule', [
    'angular',
    'config.properties'
], function(angular, config){
    var $current = config.$current;
    var path = $current.path;
    return angular.module('GillionImageViewerModule', [])
        .factory('ImageViewerService', function(Arrays){
            return {
                viewer : function(uploadFiles, fileMarker){
                    var viewUrl = path + "/static/app/framework/imageViewer/viewer.html",
                        win = window.open(viewUrl),
                        defaultImageFileExtensions = ["bpm", "png", "jepg", "gif", "jpg"];
                    function isImageFile(file) {
                        var ext;
                        ext = -1 !== file.indexOf('.') ? file.replace(/.*[.]/, '') : '';
                        ext = ext.toLowerCase();
                        return defaultImageFileExtensions.indexOf(ext) !== -1;
                    };
                    win.uploadFiles = Arrays.filter(uploadFiles, function(uploadFile) {
                        var fileInfo = uploadFile.fileInfo;
                        return isImageFile(fileInfo.orginalPath);
                    });
                    win.fileMarker = fileMarker;
                }
            };
        })
        .controller('ImageViewerController', function($scope, $window, $http, Arrays){
            var uploadFiles = $window.uploadFiles,
                fileMarker = $window.fileMarker,
                $imagesList = angular.element('.viewer-images-list'),
                $imgContainer = angular.element('viewer-images-content'),
                $img = angular.element('.viewer-images-current'),
                $operate = angular.element('.viewer-images-operate'),
                $operateMask = angular.element('.viewer-images-operate-mask'),
                $magnifyIcon = $operate.find('i').first(),
                $expandIcon = $operate.find('.viewer-images-operate-btn-expand i');

            $scope.uploadFiles = uploadFiles;
            $scope.fileMarker = fileMarker;

            $scope.fileInfo = Arrays.findOne(uploadFiles, function(uploadFile){
                return (uploadFile.fileMarker == fileMarker);
            }).fileInfo;

            //关闭
            $scope.closeViewer = function(){
                window.close();
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
                    $prev = $curr.prev();
                if ($prev.size() == 0) $prev= $imagesList.find('img').last();
                $curr.removeClass('current');
                $prev.addClass('current');
                $img.attr('src', uploadFiles[$prev.data('index')].fileInfo.orginalPath);
                resetImg();
            };
            //下一张
            $scope.next = function(){
                var $curr = $imagesList.find('img.current'),
                    $next = $curr.next();
                if ($next.size() == 0)  $next = $imagesList.find('img').first();
                $curr.removeClass('current');
                $next.addClass('current');
                $img.attr('src', uploadFiles[$next.data('index')].fileInfo.orginalPath);
                resetImg();
            };
            //选中
            $scope.activeImg = function($event){
                var target = $event.target || $event.srcElement,
                    $target = angular.element(target);
                if ($target.is('img')) {
                    $target.addClass('current').siblings('.current').removeClass('current');
                    $img.attr('src', uploadFiles[$target.data('index')].fileInfo.orginalPath);
                    resetImg();
                }
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
