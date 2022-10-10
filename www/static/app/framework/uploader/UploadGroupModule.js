define('framework/uploader/UploadGroupModule', [
    'angular',
    'jquery',
    'underscore',
    'config.properties',
    'framework/msg/GillionMsgModule',
    'framework/imageViewer2/GillionImageViewerModule'
], function (angular, $, _, config) {
    var uploaderConfig = config.controls.uploader,
        ctx = config.$paths.$current.ctx,
        urls = uploaderConfig.urls,
        previewClassExtMap = uploaderConfig.previewClassExtMap,
        defaultShowDeleter = uploaderConfig.showDeleter,
        unknownClass = uploaderConfig.unknownClass,
        navAgent = navigator.userAgent.toLowerCase(),
        isIE = /msie/.test(navAgent),
        CONSTANTS = {
            IMG_EXTENSIONS: ['bmp', 'jpg', 'jpeg', 'png', 'tiff', 'gif', 'pcx', 'tga', 'exif', 'fpx', 'svg', 'psd', 'cdr', 'pcd', 'dxf', 'ufo', 'eps', 'ai', 'raw'],
            UPLOADER_STATE: {
                BLANK: 'BLANK',
                UPLOADING: 'UPLOADING',
                UPLOADED: 'UPLOADED'
            },
            UPLOAD_FILE_EXTRA_PREFIX: '$upload_file_extra_',
            DELETE_FILE_EXTRA_PREFIX: '$delete_file_extra_',
            SHOW_DELETER: {
                ALWAYS: 'always',
                NEVER: 'never',
                HOVER: 'hover'
            }
        },
        parseJSON = isIE ? function (jsonString) {
            return Function('return ' + jsonString)();
        } : $.parseJSON;

    function makeEmpty(object) {
        angular.forEach(object, function (v, k) {
            delete object[k];
        });
    }

    function isEmptyFileInfo(fileInfo) {
        return angular.isObject(fileInfo) && !fileInfo.fileKey;
    }

    return angular.module('UploadGroupModule', ['GillionImageViewerModule'])
        .directive('gUploadGroup', function ($http, Arrays, Functions, Predicates, GillionMsg, ImageViewer, Files) {

            var UploaderGroupProto = UploaderGroup.prototype,
                UploaderStrategyProto = UploaderStrategy.prototype,
                newEqFileInfoPredicate = function (fileInfo) {
                    if (angular.isObject(fileInfo)) {
                        return Predicates.or(Predicates.newEqPredicate(fileInfo), Predicates.newPropValEqPredicate('fileKey', fileInfo.fileKey));
                    }
                    return false;
                };

            /**
             *
             * @param config
             * @param config.scope
             * @param config.$element dom
             * @param config.$attrs dom属性对象
             * @constructor
             */
            function UploaderGroup(config) {
                var me = this,
                    scope = me.scope = config.scope,
                    strategyId = scope.key;

                me.$attrs = config.$attrs;
                me.free = true; // 非空闲状态不可上传
                me.changeByInner = false;
                me.uploaderStrategy = new UploaderStrategy(strategyId, me);
                me.showDeleter = scope.$showDeleter || defaultShowDeleter || CONSTANTS.SHOW_DELETER.ALWAYS;
            }

            UploaderGroupProto.getInitialFileInfos = function () {
                var me = this,
                    scope = me.scope,
                    $source = scope.source,
                    fileInfos = [],
                    initialShowCount = me.getInitialShowCount(),
                    i;
                angular.copy($source, fileInfos);
                if (fileInfos.length < initialShowCount) {
                    for (i = fileInfos.length; i < initialShowCount; i++) {
                        fileInfos.push({});
                    }
                }
                return fileInfos;
            };

            UploaderGroupProto.getInitialShowCount = function () {
                var initialShowCount = Number(this.scope.initialShowCount);
                if (angular.isNumber(initialShowCount) && initialShowCount > 0) {
                    return initialShowCount;
                }
                return 0;
            };

            UploaderGroupProto.showImages = function (fileInfo) {
                var me = this,
                    disablePreview = me.scope.disablePreview,
                    imgFileKeys;
                if (disablePreview !== 'true') {
                    imgFileKeys = _(me.scope.fileInfos)
                        .chain()
                        .filter(_.compose(_.bind(Files.isImg, Files), _.property('name')))
                        .map(_.property('fileKey'))
                        .value();

                    ImageViewer.show(fileInfo.fileKey, imgFileKeys);
                }
            };

            UploaderGroupProto.syncFromOuter = function (outer) {
                var me = this,
                    fileInfos = me.scope.fileInfos;
                if (angular.isArray(outer)) {
                    me.uploaderStrategy.then(function (uploaderStrategy) {
                        var different = Arrays.subtract(outer, fileInfos, newEqFileInfoPredicate),
                            countLimit = uploaderStrategy.countLimit,
                            len = fileInfos.length,
                            i = 0,
                            j;
                        for (j = 0; j < different.length; i++) {
                            if (i < len && isEmptyFileInfo(fileInfos[i])) {
                                fileInfos.splice(i, 1, different[j]);
                            } else {
                                fileInfos.push(different[j]);
                            }
                            j++;
                        }

                        different = Arrays.subtract(fileInfos, outer, newEqFileInfoPredicate);
                        angular.forEach(different, function (removed) {
                            Arrays.remove(fileInfos, removed);
                        });

                        if (fileInfos.length > countLimit && me.lastFileInfoIsEmpty()) {
                            fileInfos.splice(fileInfos.length - 1, 1);
                        } else {
                            me.addEmptyUploaderIfPassable();
                        }
                    });
                }
            };

            /**
             * 如果最后一个 `uploader` 不为空， 并且没达到上传数上限， 添加一个空的上传控件
             * @protected
             */
            UploaderGroupProto.addEmptyUploaderIfPassable = function () {
                var me = this;
                me.uploaderStrategy.then(function (uploaderStrategy) {
                    if (!(me.lastFileInfoIsEmpty() || uploaderStrategy.isHitCap() || me.scope.disableUpload === 'true')) {
                        me.changeByInner = true;
                        if (me.scope.fileInfos.length < me.scope.initialShowCount) {
                            for (var i = me.scope.fileInfos.length; i < me.scope.initialShowCount; i++) {
                                me.scope.fileInfos.push({});
                            }
                        } else {
                            me.scope.fileInfos.push({});
                        }
                    }
                });
            };

            UploaderGroupProto.lastFileInfoIsEmpty = function () {
                var me = this,
                    fileInfos = me.scope.fileInfos,
                    last = fileInfos[fileInfos.length - 1];
                return isEmptyFileInfo(last);
            };

            function UploaderStrategy(uploaderStrategyId, uploaderGroup) {
                var me = this;
                me.uploaderGroup = uploaderGroup;
                me.thenCallbacks = [];
                me.inited = false;
                $http.get(ctx + urls.getStrategyPrefix + uploaderStrategyId).success(function (strategyConfig) {
                    me.init(strategyConfig);
                    angular.forEach(me.thenCallbacks, function (callback) {
                        callback(me);
                    });
                    delete me.thenCallbacks;
                });
            }

            UploaderStrategyProto.isHitCap = function () {
                var me = this,
                    scope = me.uploaderGroup.scope,
                    uploadedCount = Arrays.count(scope.fileInfos, Predicates.newPropPredicate('fileKey', angular.isString)),
                    countLimit = me.countLimit;
                return !(countLimit && countLimit > uploadedCount);
            };

            /**
             *
             * @param config
             * @param config.allowExtensions 允许的后缀名
             * @param config.countLimit 允许上传的最大数量
             * @param config.sizeLimit 允许上传的文件最大大小 单位：(MB)
             * @constructor
             */
            UploaderStrategyProto.init = function (config) {
                var me = this;
                me.allowExtensions = Arrays.transform(config.allowExtensions, Functions.funcRef(String.prototype.toLowerCase));
                me.countLimit = config.countLimit;
                me.kbSizeLimit = config.sizeLimit;
                me.byteSizeLimit = config.sizeLimit * 1024;
                me.inited = true;
            };

            /**
             * @async
             */
            UploaderStrategyProto.then = function (callback) {
                var me = this;
                if (me.inited === true) {
                    callback(me);
                } else {
                    me.thenCallbacks.push(callback);
                }
            };

            /**
             * @async
             */
            UploaderStrategyProto.checkFileType = function (extension) {
                var me = this,
                    valid = me.isSupportedFileType(extension);
                if (!valid) {
                    GillionMsg.alert("提示信息", "上传失败，上传的文件类型非法！只允许扩展名为： " + me.allowExtensions.join(', ') + " 的文件。");
                }
                return valid;
            };

            /**
             * @async
             */
            UploaderStrategyProto.checkFileSize = function (byteSize) {
                var me = this,
                    kbSizeLimit = me.kbSizeLimit,
                    valid = me.isSupportedFileSize(byteSize);
                if (!valid) {
                    GillionMsg.alert("提示信息", "上传失败，上传的文件超过最大大小：" + kbSizeLimit + "KB！");
                }
                return valid;
            };

            UploaderStrategyProto.isSupportedFileType = function (extension) {
                return Arrays.exists(this.allowExtensions, extension.toLowerCase());
            };

            UploaderStrategyProto.isSupportedFileSize = function (byteSize) {
                if (!isIE) {
                    return byteSize <= this.byteSizeLimit;
                }
                return true;
            };

            return {
                template: '<div class="form-upload">\n    <g-uploader ng-repeat="fileInfo in fileInfos"></g-uploader>\n    <div ng-transclude></div>\n</div>',
                replace: true,
                restrict: 'E',
                transclude: true,
                scope: {
                    key: '@',
                    source: '=ngModel',
                    onBeforeSelect: '&',
                    onBefore: '&',
                    onBeforeUpload: '&',
                    onUpload: '&',
                    onBeforeDelete: '&',
                    onDelete: '&',
                    uploadParams: '=',
                    deleteParams: '=',
                    initialShowCount: '@',
                    showFilename: '@',
                    $showDeleter: '@showDeleter',
                    keepUploaderOnRemove: '@',
                    disablePreview: '@',
                    disableUpload: '@'
                },
                controller: ['$scope', '$element', '$attrs', function (scope, element, attrs) {
                    var uploaderGroup = scope.uploaderGroup = new UploaderGroup({
                        scope: scope,
                        $element: element,
                        $attrs: attrs
                    });
                    scope.fileInfos = uploaderGroup.getInitialFileInfos();

                    scope.$watchCollection('source', function (newSource) {
                        if (uploaderGroup.changeByInner === false && angular.isArray(newSource)) {
                            uploaderGroup.syncFromOuter(newSource);
                        }
                        uploaderGroup.changeByInner = false;
                    });

                    scope.$on('uploader.complete', function ($event, fileInfo) {
                        if (!angular.isArray(scope.source)) {
                            scope.source = [];
                        }
                        uploaderGroup.changeByInner = true;
                        scope.source.push(fileInfo);
                        uploaderGroup.addEmptyUploaderIfPassable();
                        if (!scope.$root.$$phase) {
                            scope.$digest();
                        }
                        //noinspection JSUnresolvedFunction
                        $event.stopPropagation();
                    });
                    return uploaderGroup
                }]
            }
        })
        .directive('gUploader', function ($http, $window, Arrays, Files, GillionMsg) {
            var UploaderProto = Uploader.prototype,
                document = $window.document;

            /**
             *
             * @param config
             * @param [config.ngModel] {ngModelController} 上传控件的绑定模型
             * @param config.scope
             * @param config.$element dom
             * @param config.$attrs dom属性对象
             * @constructor
             */
            function Uploader(config) {
                var me = this,
                    scope = me.scope = config.scope,
                    UPLOADER_STATE = CONSTANTS.UPLOADER_STATE;

                me.$element = config.$element;
                me.$attrs = config.$attrs;
                me.$previewImg = me.$element.find('.form-upload-btn-img img');
                me.fileInfo = scope.fileInfo;
                me.state = me.fileInfo.fileKey ? UPLOADER_STATE.UPLOADED : UPLOADER_STATE.BLANK;
                me.ifFreedBack();
                me.initUploaderDom();
                me.$file.bind('change', function () {
                    me.beginUpload();
                });
                switch (scope.uploaderGroup.showDeleter) {
                    case CONSTANTS.SHOW_DELETER.ALWAYS:
                        scope.showDeleter = true;
                        break;
                    case CONSTANTS.SHOW_DELETER.NEVER:
                        scope.showDeleter = false;
                        break;
                    case CONSTANTS.SHOW_DELETER.HOVER:
                        me.$element.hover(
                            function () {
                                scope.showDeleter = true;
                                if (!scope.$$phase) {
                                    scope.$digest();
                                }
                            },
                            function () {
                                scope.showDeleter = false;
                                if (!scope.$$phase) {
                                    scope.$digest();
                                }
                            }
                        );
                        break;
                }
            }

            UploaderProto.ifFreedBack = function () {
                var me = this,
                    fileInfo = me.fileInfo,
                    fileKey = fileInfo.fileKey,
                    UPLOADER_STATE = CONSTANTS.UPLOADER_STATE;
                if (fileKey) {
                    fileInfo.extension = Files.getExtension(fileInfo.name);
                    fileInfo.isImg = Files.isImg(fileInfo.extension);
                    if (!fileInfo.isImg) {
                        fileInfo.iconClass = getIconClass(fileInfo.extension);
                    } else {
                        me.$previewImg.attr('src', ctx + urls.downloadPrefix + fileKey);
                    }
                    me.state = UPLOADER_STATE.UPLOADED;
                } else {
                    me.state = UPLOADER_STATE.BLANK;
                }
            };

            UploaderProto.initUploaderDom = function setSubmitTargetName() {
                var $target = (window.document.documentMode <= 9 ? this.$element : document.body);
                var me = this,
                    scope = me.scope,
                    uploadUrl = ctx + urls.uploadPrefix + scope.key,
                    frameName = '$uploaderFrame' + scope.$id,
                    $form;

                $form = me.$form = angular.element('<form>', {
                    target: frameName,
                    action: uploadUrl,
                    method: 'post',
                    enctype: 'multipart/form-data',
                    style: 'display:none;',
                    html: '<input name="file" type="file"/>'
                }).appendTo($target);

                me.$frame = angular.element('<iframe>', {
                    name: frameName,
                    style: 'display:none;'
                }).appendTo($form);

                me.$file = $form.children('input:file');

                me.$frame[0].onload = function () {
                    me.completeUpload();
                };

                if (window.document.documentMode <= 9 && me.state == CONSTANTS.UPLOADER_STATE.BLANK) {
                    $form.css("display", "block");
                    me.$file.addClass("uploaderInputFile");
                    me.$frame[0].attachEvent('onload', function () {
                        me.completeUpload();
                    });
                }
            };

            UploaderProto.selectFile = function () {
                var me = this,
                    scope = me.scope,
                    onBeforeSelect = scope.onBeforeSelect,
                    onSelect = scope.onSelect || angular.noop,
                    uploaderStrategy = scope.uploaderGroup.uploaderStrategy || angular.noop,
                    onSelectEvenParams = {
                        uploader: me,
                        uploaderStrategy: uploaderStrategy
                    };
                if (onBeforeSelect(onSelectEvenParams) !== false) {
                    me.$file.click();
                    onSelect(onSelectEvenParams);
                }
            };

            UploaderProto.beginUpload = function () {
                var me = this,
                    scope = me.scope,
                    uploaderGroup = scope.uploaderGroup,
                    uploaderStrategy = uploaderGroup.uploaderStrategy,
                    fileInfo, uploadEventParams, onBeforeUpload;

                onBeforeUpload = scope.onBeforeUpload;
                fileInfo = getFileInfo(me.$file);
                uploaderStrategy.then(function () {
                    var valid = uploaderStrategy.checkFileType(fileInfo.extension);
                    if (!valid) return;
                    valid = uploaderStrategy.checkFileSize(fileInfo.byteSize);
                    if (!valid) return;

                    uploadEventParams = me.uploadEventParams = {
                        fileInfo: fileInfo,
                        uploaderStrategy: uploaderStrategy
                    };
                    if (onBeforeUpload(uploadEventParams) !== false) {
                        angular.extend(scope.fileInfo, fileInfo);
                        renderParamsToForm(scope.uploadParams, me.$form);
                        me.$attrs.$set('state', 'uploading');
                        me.renderPreview();
                        me.state = CONSTANTS.UPLOADER_STATE.UPLOADING;
                        me.$form.submit();
                        if (!scope.$$phase) {
                            try {
                                scope.$digest();
                            } catch (e) {
                            }
                        }
                    }
                });
            };

            UploaderProto.completeUpload = function () {
                var me = this,
                    scope = me.scope,
                    fileInfo = scope.fileInfo,
                    onUpload = scope.onUpload,
                    result = extractResponse(me.$frame),
                    errorMessages;
                if (angular.isUndefined(result)) return;
                if (result && result.success === false) {
                    errorMessages = result['errorMessages'];
                    if (angular.isArray(errorMessages) && errorMessages.length > 0) {
                        GillionMsg.alert("上传失败", errorMessages.join('<br/>'));
                    } else {
                        GillionMsg.alert("上传失败", "上传失败，请重新上传！");
                    }
                    makeEmpty(fileInfo);
                    me.state = CONSTANTS.UPLOADER_STATE.BLANK;
                } else {
                    if (result && !result.fileKey) return;
                    angular.extend(fileInfo, result);
                    me.state = CONSTANTS.UPLOADER_STATE.UPLOADED;
                    scope.$emit('uploader.complete', me.fileInfo);
                    me.$element.attr('title', me.fileInfo.name);
                    me.$element.removeAttr('state');
                    if (window.document.documentMode <= 9) {
                        me.$form.css("display", "none");
                        me.$previewImg.attr('src', ctx + urls.downloadPrefix + fileInfo.fileKey);
                        me.$previewImg.css('filter', 'none');
                    }
                }
                resetForm(me.$form);
                onUpload(me.uploadEventParams);
                if (!(scope.$$phase || scope.$root.$$phase)) {
                    scope.$digest();
                }
            };

            UploaderProto.renderPreview = function () {
                var me = this,
                    scope = me.scope,
                    fileInfo = scope.fileInfo,
                    extension = fileInfo.extension,
                    fileDom, fileInstance;
                if (Files.isImg(extension)) {
                    fileDom = me.$file[0];
                    if (fileDom.files && (fileInstance = fileDom.files[0])) {
                        var reader = new FileReader();
                        reader.onload = function (evt) {
                            me.$previewImg.attr('src', evt.target.result);
                        };
                        reader.readAsDataURL(fileInstance);
                    } else {
                        me.$previewImg.css('filter', "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + me.$file.val() + "')")
                    }
                } else {
                    fileInfo.iconClass = getIconClass(extension);
                }
            };

            UploaderProto.deleteFile = function ($event, fileInfo) {
                var me = this,
                    scope = me.scope,
                    uploaderGroup = scope.uploaderGroup,
                    fileInfos = scope.fileInfos,
                    onBeforeDelete = scope.onBeforeDelete,
                    onDelete = scope.onDelete,
                    params = {},
                    deleteEventParams = {
                        fileInfo: fileInfo,
                        uploaderStrategy: uploaderGroup.uploaderStrategy
                    };

                if (onBeforeDelete(deleteEventParams) !== false) {
                    angular.forEach(scope.deleteParams, function (value, key) {
                        params[CONSTANTS.DELETE_FILE_EXTRA_PREFIX + key] = value;
                    });
                    $http({
                        method: 'delete',
                        url: ctx + urls.deletePrefix + fileInfo.fileKey,
                        params: params
                    }).success(function () {
                        if (scope.keepUploaderOnRemove === 'true') {
                            makeEmpty(fileInfo);
                            me.state = CONSTANTS.UPLOADER_STATE.BLANK;
                        } else {
                            uploaderGroup.changeByInner = true;
                            // $form 在 body 下， 不能跟随当前 dom 销毁
                            me.$form.remove();
                            Arrays.remove(scope.source, fileInfo);
                            Arrays.remove(fileInfos, fileInfo);
                            uploaderGroup.addEmptyUploaderIfPassable();
                        }
                        onDelete(deleteEventParams)
                    }).error(function (data) {
                        if (angular.isObject(data) && data.message) {
                            GillionMsg.alert('删除文件失败', data.message);
                        }
                        onDelete(deleteEventParams)
                    });
                }
                $event.stopPropagation();
            };

            UploaderProto.downloadIfNotImg = function () {
                var me = this,
                    scope = me.scope,
                    fileInfo = scope.fileInfo;
                if (fileInfo.isImg === false && !angular.isUndefined(fileInfo.fileKey)) {
                    $window.open(ctx + urls.downloadPrefix + fileInfo.fileKey);
                }
            };

            function extractResponse($frame) {
                var frameDocument = $frame[0].contentDocument,
                    $body = angular.element(frameDocument.body),
                    responseJson;
                if ($body.is(':has(pre)')) {
                    responseJson = $body.children('pre').html();
                } else {
                    responseJson = $body.html();
                }
                responseJson = $.trim(responseJson);
                try {
                    return parseJSON(responseJson);
                } catch (e) {
                    if (angular.element(frameDocument.head).text().indexOf('504') !== -1) {
                        return {
                            success: false,
                            errorMessages: ['上传文件超时， 请重新上传！']
                        }
                    }
                }
            }

            /**
             * @private
             */
            function pairToUploadParamField(key, value) {
                var fieldName = CONSTANTS.UPLOAD_FILE_EXTRA_PREFIX + key,
                    fieldType;
                if (angular.isString(value)) {
                    fieldType = 'text';
                } else if (angular.isDate(value)) {
                    fieldType = 'date';
                } else if (angular.isNumber(value)) {
                    fieldType = 'number';
                }
                return angular.element('<input>', {
                    name: fieldName,
                    type: fieldType,
                    value: value
                });
            }

            /**
             * @private
             */
            function uploadParamsToFields(uploadParams) {
                var fieldsContainer = angular.element('<div data-params-container></div>');
                angular.forEach(uploadParams, function (value, key) {
                    var $paramField = pairToUploadParamField(key, value);
                    fieldsContainer.append($paramField);
                });
                return fieldsContainer;
            }

            function renderParamsToForm(uploadParams, $form) {
                var $paramsContainer = uploadParamsToFields(uploadParams);
                $form.append($paramsContainer);
            }


            function getIconClass(extension) {
                var iconClass = '';
                angular.forEach(previewClassExtMap, function (mapExtensions, className) {
                    if (Arrays.exists(mapExtensions, extension)) {
                        iconClass = className;
                        //noinspection UnnecessaryReturnStatementJS
                        return;
                    }
                });
                return !iconClass && unknownClass ? unknownClass : iconClass;
            }


            function getFileInfo($file) {
                var fileInfo = {};
                fileInfo.path = $file.val();
                fileInfo.name = Files.getFilename(fileInfo.path);
                fileInfo.extension = Files.getExtension(fileInfo.name);
                fileInfo.isImg = Files.isImg(fileInfo.name);
                if (!isIE) {
                    fileInfo.byteSize = $file[0].files[0].size;
                }
                return fileInfo;
            }

            function resetForm($form) {
                var formDom = $form[0];
                if (formDom) {
                    formDom.reset();
                    $form.children('div[data-params-container]').remove();
                }
            }

            return {
                template: '<div class="form-upload-item" ng-click="uploader.downloadIfNotImg()">\n    <button class="btn form-upload-btn-add" type="button" ng-show="uploader.state === \'BLANK\'" ng-click="uploader.selectFile()">\n        <i class="fi fi-add"></i>\n        <span>上传文件</span>\n    </button>\n    <button class="btn form-upload-btn-del" type="button" ng-show="showDeleter && uploader.state === \'UPLOADED\'" ng-click="uploader.deleteFile($event, fileInfo)">\n        <i class="fi fi-close-xs"></i>\n    </button>\n    <div class="form-upload-icon" ng-show="uploader.state !== \'BLANK\'">\n        <button class="btn form-upload-btn-icon" type="button" ng-show="fileInfo.isImg === false">\n            <i class="fi" ng-class="fileInfo.iconClass"></i>\n        </button>\n        <button class="btn form-upload-btn-img" type="button" ng-show="fileInfo.isImg === true" ng-click="uploaderGroup.showImages(fileInfo)">\n            <img width="78" height="78">\n        </button>\n        <div class="form-upload-item-mask" ng-show="uploader.state === \'UPLOADING\'"></div>\n        <div class="form-upload-item-uploading" ng-show="uploader.state === \'UPLOADING\'">上传中</div>\n    </div>\n    <div class="form-upload-item-text" ng-show="uploader.state === \'UPLOADED\'" ng-if="showFilename !== \'false\'">\n        {{fileInfo.name}}\n    </div>\n</div>',
                replace: true,
                restrict: 'E',
                scope: false,
                link: function (scope, element, attrs) {
                    scope.uploader = new Uploader({
                        scope: scope,
                        $element: element,
                        $attrs: attrs
                    });
                }
            };
        })
        .factory('Files', function (Arrays) {

            return {
                /**
                 * 判断文件是否是图片
                 * @param fileName {String} 文件名
                 */
                isImg: function (fileName) {
                    var extension = this.getExtension(fileName);
                    return Arrays.exists(CONSTANTS.IMG_EXTENSIONS, extension.toLowerCase());
                },

                /**
                 * 获取文件扩展名
                 * @param fileName {String} 文件名
                 */
                getExtension: function (fileName) {
                    var index;
                    if (angular.isString(fileName)) {
                        index = fileName.lastIndexOf('.');
                        if (index != -1) {
                            return fileName.substr(index + 1);
                        } else {
                            return fileName;
                        }
                    }
                    return '';
                },

                /**
                 * 根据文件路径获取文件名
                 * @param path {String} 文件路径
                 */
                getFilename: function (path) {
                    if (angular.isString(path)) {
                        var tokens = path.split(/\/|\\/);
                        if (tokens.length > 0) {
                            return tokens[tokens.length - 1];
                        } else {
                            return path;
                        }
                    }
                    return '';
                }
            };
        });
});