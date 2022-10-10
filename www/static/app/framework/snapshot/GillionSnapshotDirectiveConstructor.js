/**
 * Created by linxh on 2015/8/27.
 */
define("framework/snapshot/GillionSnapshotDirectiveConstructor",["angular","config.properties",'framework/msg/GillionMsgModule'],function(angular,config){
    var UPLOAD_FILE_EXTRA_PREFIX =  '$upload_file_extra_';
    return function($http,$timeout,GillionLocationService,GillionMsg,Arrays){
        var uploaderConfig = config.controls.uploader,
            ctx = config.$paths.$current.ctx,
             urls = uploaderConfig.urls;

        //判断是否空对象
        function isEmptyObject( obj ) {
            for ( var name in obj ) {
                return false;
            }
            return true;
        }

        function extractResponse(html) {
            var $body = angular.element(html),
                responseJson;
            if ($body && html.indexOf("errorMessages")==-1) {
                responseJson = $body[1];
                if(!responseJson){
                    responseJson = $body.html();
                }else{
                    responseJson = responseJson.data;
                }
                return JSON.parse(responseJson);
            }else{
                return $body;
            }
        }

        function uploadParamsToFields(uploadParams) {
            var uploadParamsStr = '';
            angular.forEach(uploadParams, function (value, key) {
                uploadParamsStr += pairToUploadParamField(key, value);;
            });
            return uploadParamsStr;
        }

        /**
         * @private
         */
        function pairToUploadParamField(key, value) {
            var fieldName = UPLOAD_FILE_EXTRA_PREFIX + key,
                fieldType;
            if (angular.isString(value)) {
                fieldType = 'text';
            } else if (angular.isDate(value)) {
                fieldType = 'date';
            } else if (angular.isNumber(value)) {
                fieldType = 'number';
            }
            return fieldName+"="+value+"&";
        }

        function isEmptyFileInfo(fileInfo) {
            return angular.isObject(fileInfo) && !fileInfo.fileKey;
        }

        var STATUS_NO = '未连接',STATUS_PLAY = '连接成功',STATUS_POSTING = '正在上传',STATUS_SUCCESS='上传成功';
        return {
            restrict: 'E',
            template:'<div ng-show="buttonShow"><div class="form-upload-item"><button type="button" class="btn form-upload-btn-add" ng-disabled="disabled" ng-click="showPhotograph()"><i class="fi fi-camera"></i><span>在线拍照</span></button></div>'+
            '<div  class="photographer" id="p-test"><div class="photograph-head">'+
            '<span class="photograph-title">在线拍照系统</span>'+
            '<button type="button" ng-click="close()" class="btn"><i class="fi fi-close"></i></button></div>'+
            '<div class="photograph-body"><div class="photograph-camera">'+
            '<video autoplay></video>'+
            '<div class="photograph-camera-area"></div><div class="photograph-camera-operate">'+
            '<button type="button" class="btn" ng-click="snap()"><i class="fi fi-camera"></i>拍照</button>'+
            '<button type="button" class="btn" ng-click="snap(5)">延迟5秒</button><button type="button" class="btn" ng-click="snap()">重拍</button>'+
            '</div></div><div class="photograph-photo">'+
            '<canvas style="display: none" class="canvasHidden"></canvas>'+
            '<div class="photograph-photo-current"><canvas class="canvas"></canvas>'+
            '<div class="photograph-photo-operate"><button type="button" ng-click="saveAs()" class="btn">照片导出</button><button type="button" ng-click="post()" ng-disabled="uploading" class="btn">上传</button>'+
            '</div></div><div class="photograph-photo-camerastate">当前状态：{{status}}</div></div></div></div>'+
            '</div>',
            replace:true,
            scope: {
                disabled:'='
            },
            require:'^?gUploadGroup',
            link:function(scope,element,attrs,gUploadGroup){
                var canvasJQ = element.find(".canvas"),
                    canvas = canvasJQ[0],//调用canvas接口
                    canvasHidden = element.find(".canvasHidden"),
                    context = canvas.getContext("2d"),
                    photographerElement = element.find("div.photographer"),
                    border = element.find(".photograph-camera-area"),
                    videoJQ = element.find("video"),
                    video = videoJQ[0],
                    videoObj = { "video": true },
                    uploaded = false,
                    askFor = false,
                    urlParams,
                    strategyId,
                    imgData,
                    errBack = function(error) {//错误处理
                        console.log("Video capture error: ", error.code);
                    };
                    scope.isShow = false;
                    scope.uploading = false;
                    scope.buttonShow = true;
                    scope.status = STATUS_NO;
                if(attrs.disabled == 'disabled'){
                    scope.disabled=true;
                }

                element.parent().addClass("form-upload-item");

                //兼容上传空间
                if(gUploadGroup){
                    strategyId = gUploadGroup.scope.key;

                    var func =function(){
                        if(gUploadGroup.uploaderStrategy.isHitCap()){
                            scope.buttonShow = false;
                        }else{
                            scope.buttonShow = true;
                        }
                    }

                    //在策略请求返回的时候回掉
                    gUploadGroup.uploaderStrategy.then(function(){
                        func();
                        gUploadGroup.scope.$watchCollection("fileInfos",function(){
                            func();
                        })
                    })
                }

                if(!attrs.url){
                    scope.url = ctx + urls.getSnapshotUploadPrefix+strategyId;
                }else{
                    scope.url = attrs.url;
                }
                scope.showPhotograph = function(){
                    photographerElement.css("visibility","visible");
                    photographerElement.css("display","");
                    //询问是否开启摄像头
                    if(!askFor){
                        if(navigator.getUserMedia) {//调用html5拍摄接口
                            navigator.getUserMedia(videoObj, function(stream) {
                                video.src = stream;//摄像机属于视频流，所以当然要输出到html5的video标签中了
                                video.play();//开始播放
                                scope.changeStatus(STATUS_PLAY);
                                askFor = true;
                            }, errBack);
                        } else if(navigator.webkitGetUserMedia) { //WebKit内核调用html5拍摄接口
                            navigator.webkitGetUserMedia(videoObj, function(stream){
                                video.src = window.webkitURL.createObjectURL(stream);//同上
                                video.play();//同上
                                scope.changeStatus(STATUS_PLAY);
                                askFor = true;
                            }, errBack);
                        } else if(navigator.mozGetUserMedia) { //moz内核调用html5拍摄接口
                            navigator.mozGetUserMedia(videoObj, function(stream){
                                video.src = window.URL.createObjectURL(stream);//同上
                                video.play();//同上
                                scope.changeStatus(STATUS_PLAY);
                                askFor = true;
                            }, errBack);
                        }
                    }
                }

                photographerElement = GillionLocationService.createHtmltoTop(photographerElement);
                //GillionLocationService.addCssFile(top,"/static/css/controls.css");
                scope.changeStatus = function(sta){
                    scope.status = sta;
                    if(!scope.$root.$$phase){
                        scope.$apply();
                    }
                }
                //video  canvas都要在属性上设置好宽高的
                videoJQ.attr("width",video.offsetWidth);
                videoJQ.attr("height",video.offsetHeight);
                canvasJQ.attr("width",canvas.offsetWidth);
                canvasJQ.attr("height",canvas.offsetHeight);
                canvasHidden.attr("width",border[0].offsetWidth);
                canvasHidden.attr("height",border[0].offsetHeight);

                scope.snap = function(time){

                    if(!askFor){
                        GillionMsg.alert("拍照失败", "请先打开摄像头！");
                        return;
                    }

                    if(!time){
                        time = 0
                    } else{
                        time = time*1000;
                    }
                    $timeout(function(){
                        var top =  border[0].offsetTop - video.offsetTop,
                            left = border[0].offsetLeft - video.offsetLeft,
                            swidth = border[0].offsetWidth,
                            sheight = border[0].offsetHeight,
                            width = canvas.offsetWidth,
                            height = canvas.offsetHeight;

                        context.drawImage(video,left,top,swidth,sheight,0,0,width,height);
                        canvasHidden[0].getContext("2d").drawImage(video,left,top,swidth,sheight,0,0,swidth,sheight);
                        imgData = canvasHidden[0].toDataURL();//获取图片的base64格式的数据
                        imgData = imgData.substring(imgData.indexOf(',')+1);
                        uploaded = true;
                    },time);
                }

                scope.close = function(){
                    photographerElement.css("visibility","hidden");
                }
                /*另存为*/
                scope.saveAs = function(){
                        var image = canvasHidden[0].toDataURL("image/png").replace("image/png", "image/octet-stream");
                        if(uploaded){
                            window.location.href = image; // it will save locally
                        }else{
                            GillionMsg.alert("导出失败", "请先拍照！");
                        }
                }
                scope.post = function(){
                    if(!uploaded){
                        GillionMsg.alert("上传失败", "上传失败，请先拍照！");
                        return;
                    }
                    scope.changeStatus(STATUS_POSTING);
                    scope.uploading = true;
                    urlParams = gUploadGroup.scope.uploadParams;
                    urlParams = uploadParamsToFields(urlParams);
                    //获取限制数
                    $http.post(scope.url+"?"+urlParams,{photoBase64:imgData,fileName:"photo.png"}).success(function(data){
                        var i,item,
                            result,errorMessages,fileInfo={},
                            fileInfos = gUploadGroup.scope.fileInfos;
                        result = extractResponse(data);
                        scope.changeStatus(STATUS_SUCCESS);
                        if (result && result.success === false) {
                            errorMessages = result['errorMessages'];
                            if (angular.isArray(errorMessages) && errorMessages.length > 0) {
                                GillionMsg.alert("上传失败", errorMessages.join('<br/>'));
                            } else {
                                GillionMsg.alert("上传失败", "上传失败，请重新上传！");
                            }
                        } else {
                            angular.extend(fileInfo, result);
                            gUploadGroup.changeByInner = true;
                            if (!angular.isArray(gUploadGroup.scope.source)) {
                                gUploadGroup.scope.source = [];
                            }
                            for(i=0; i<fileInfos.length; i++){
                                //寻找空的容器 将图片显示上去
                                if(isEmptyFileInfo( fileInfos[i])){
                                    fileInfos[i] = fileInfo;
                                    gUploadGroup.scope.$emit('uploader.complete',fileInfo);
                                    fileInfo = undefined;
                                    break;
                                }
                            }
                            if(fileInfo){
                                fileInfos.push(fileInfo);
                            }
                        }
                        scope.uploading = false;
                        scope.close();
                    });
                }
            }
        }
    }
})
