define('framework/importexcel/GillionImportExcelDirective', ['angular'], function (angular) {
    return function (Arrays, $timeout) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                importUrl: '@',
                callback: '&',
                cssStyle: '=',
                disabled: '=ngDisabled'
            },
            template: '<div class="btn btn-default" ng-disable="disabled" ng-style="cssStyle" ng-class="cssClass">{{displayExpress}}</div>',
            link: function ($scope, $element, $attr) {
                var showWaitingDialog = $attr.showWaitingDialog || 'false',
                    waitingDialog, callback = $attr.callback,
                    input_html, input_element, Msg, createIframe, submit,
                    createForm, getResponse, inputHtml, uid, domain,
                    limitFile = ['xlsx', 'xls', 'xlsm'], key = $attr.key || "";
                domain = $attr.domain || "";
                uid = 0;
                Msg = angular.element(document).injector().get("GillionMsg");
                $scope.displayExpress = $attr.displayExpress;
                var cssClass = $attr.cssClass;
                $scope.cssClass = {};
                $scope.cssClass[cssClass] = true;
                inputHtml = function () {
                    input_html = "<input type='file' name=\"uploadFile\" style='position:absolute;top:0;left:0;width:100%;height:100%;opacity: 0;'/>";
                    $element.append(input_html);
                    $element.css("position", "relative");
                    $element.css("cursor", "pointer");
                    input_element = $element.find("input");
                    input_element.css('position', 'absolute');
                    input_element.css('top', '0px');
                    input_element.css("left", "0px");
                    input_element.css("width", "100%");
                    input_element.css("height", "100%");
                    input_element.css("opacity", "0");
                    input_element.css("filter", "alpha(opacity=0)");
                    input_element.on("change", function () {
                        var fileName, ext, suffix;
                        if (input_element.val() === '') {
                            return;
                        }
                        fileName = input_element.val().replace(/.*(\/|\\)/, "");
                        ext = (-1 !== fileName.indexOf('.')) ? fileName.replace(/.*[.]/, '') : '';
                        suffix = ext.toLowerCase();
                        if (!Arrays.exists(limitFile, suffix)) {
                            Msg.alert("提示信息", "上传失败，上传的文件类型非法！");
                            return;
                        }
                        submit();
                    });

                };

                $scope.$watch("disabled", function (value) {
                    if (!value === true) {
                        var children = $element.children();
                        if (!children || children.length === 0) {
                            inputHtml();
                        }
                    } else {
                        $element.find("input").remove();
                    }
                });

                if (!$scope.disabled === true) {
                    inputHtml();
                }

                createIframe = function () {
                    var iframe;
                    iframe = angular.element('<iframe src="javascript:false;" />');
                    iframe.attr("name", "importexcel");
                    iframe.attr("id", uid);
                    uid = uid + 1;
                    iframe.css("display", "none");
                    $scope.iframe = iframe;
                    angular.element(document.body).append(iframe);
                    return iframe;
                };

                createForm = function (iframe) {
                    var keyInput, form, domainInput;
                    form = angular.element('<form method="post" enctype="multipart/form-data"></form>');
                    form.attr("action", $scope.importUrl);
                    form.attr("target", iframe.attr("name"));
                    form.css("display", "none");
                    angular.element(document.body).append(form);
                    keyInput = angular.element("<input type=\"hidden\" name=\"key\">");
                    keyInput.val(key);
                    form.append(keyInput);
                    domainInput = angular.element("<input type=\"hidden\" name=\"domain\">");
                    domainInput.val(domain);
                    form.append(domainInput);
                    angular.element(document.body).append(form);
                    return form;
                };

                submit = function () {
                    var form, iframe;
                    iframe = createIframe();
                    form = createForm(iframe);
                    form.append(input_element);
                    form.submit();
                    if (showWaitingDialog === "true") {
                        waitingDialog = Msg.wait("提示信息", "努力加载中......");
                    }
                    $timeout(function () {
                        form.remove();
                        //iframe.remove();
                        $element.remove("input");
                        inputHtml();
                    }, 1000);
                    getResponse();
                };

                getResponse = function () {
                    var iframe = $scope.iframe[0];
                    $scope.iframe.on('load', function () {
                        var doc, response, argument;
                        if (angular.isDefined(waitingDialog)) {
                            waitingDialog.close();
                        }
                        doc = iframe.contentDocument ? iframe.contentDocument : window.frames[iframe.id].document;
                        if (doc) {
                            if (doc.readyState && doc.readyState !== 'complete') {
                                $scope.iframe.remove();
                                return;
                            }
                            if (doc.body && doc.body.innerHtml === 'false') {
                                $scope.iframe.remove();
                                return;
                            }
                            if (doc.XMLDocument) {
                                response = doc.XMLDocument;
                            } else if (doc.body) {
                                response = doc.body.innerHTML;
                            } else {
                                response = {};
                            }
                            if (response) {
                                try {
                                    response = $scope.$eval(response);
                                    argument = {
                                        response: response
                                    };
                                    $scope.callback(argument);
                                    if (angular.isUndefined(callback)) {
                                        if (!response.success) {
                                            Msg.alert("提示信息", response.errorMessages);
                                        } else {
                                            Msg.alert("提示信息", response.data);
                                        }
                                    }
                                } catch (_error) {
                                    Msg.alert("提示信息", "导入失败，请重试");
                                }
                            }
                        }
                        $scope.iframe.remove();
                    });

                    $scope.iframe.on('error', function () {
                        $scope.iframe[0].remove();
                    });
                }
            }
        }
    }
});
