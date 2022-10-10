(function(window) {
  var error = window.console.error || window.alert,
    ds = window.ds,
    noop = function() {};
  if (!window.ds) ds = window.ds = {};

  function FileUploader() {}

  FileUploader.prototype = {
    // 设置配置
    setOption: function(opt) {
      if (opt != undefined && opt != null) {
        this.action = opt.action; // 上传接口
        this.filter = opt.filter || ''; // 文件类型过滤器
        this.maxsize = opt.maxsize || 50; // 文件上传大小限制，单位：M
        this.params = opt.params || null; // 请求参数
        this.startCallback = opt.startCallback || noop; // 开始上传的回调函数
        this.progressCallback = opt.progressCallback || noop; // 上传进度回调函数
        this.successCallback = opt.successCallback || noop; // 上传成功回调函数
        this.errorCallback = opt.errorCallback || noop; // 上传错误的回调函数
      }
    },

    // 上传方法
    upload: function(opt) {
      if (!opt) {
        opt = {};
      }
      var filter = this.filter;
      var maxsize = this.maxsize;

      var action = opt.action || this.action;
      if (!action) {
        error('请设置上传文件的URL');
        return;
      }
      var params = opt.params || this.params;
      var successCallback = opt.successCallback || this.successCallback;
      var errorCallback = opt.errorCallback || this.errorCallback;

      var uploadFileDom = window.document.getElementById('dsUploadFile');
      if (!uploadFileDom) {
        uploadFileDom = document.createElement('div');
        uploadFileDom.id = 'dsUploadFile';
        uploadFileDom.style = 'display:none;';
        // uploadFileDom.innerHTML = '<form name="importExcel" id="importExcel" target="importIframe"' +
        //   'method="post" accept-charset="utf-8" enctype="multipart/form-data">' +
        //   '<input type="file" name="file" id="importExcelFile" />' +
        //   '</form>' +
        //   '<iframe name="importIframe" id="importIframe"></iframe>';

        uploadFileDom.innerHTML = '<iframe name="importIframe" id="importIframe"></iframe>';
        uploadFileDom = window.document.body.appendChild(uploadFileDom);
      }
      var importIframe = document.getElementById('importIframe');
      if (importIframe) {
        // iframe加载完成事件, 二进制流不会触发; 后端接口不能正常返回会报跨域异常
        importIframe.onload = function importIframeLoad() {
          var contentWin = document.getElementById('importIframe').contentWindow;
          var backBodyText = contentWin.document.body.innerText;
          try {
            var resultObj = JSON.parse(backBodyText);
            successCallback(resultObj);
          } catch (e) {
            error('导入返回数据无法解析');
            errorCallback(backBodyText);
          }
        };
      }

      // 动态创建form表单
      var fileForm = document.createElement('form');
      fileForm.id = 'importExcel';
      fileForm.name = 'importExcel';
      fileForm.target = 'importIframe';
      fileForm.method = 'POST';
      fileForm.acceptCharset = 'utf-8';
      fileForm.enctype = 'multipart/form-data';

      var fileInput = document.createElement('input');
      fileInput.id = 'importExcelFile';
      fileInput.type = 'file';
      fileInput.name = 'file';
      fileForm.appendChild(fileInput);

      if (opt.beanName) {
        var dataSourceInput = document.createElement('input');
        dataSourceInput.id = 'importExcelDataSourceBeanName';
        dataSourceInput.type = 'text';
        dataSourceInput.name = 'dataSourceBeanName';
        dataSourceInput.value = opt.beanName;
        fileForm.appendChild(dataSourceInput);
      }

      if (opt.requestParams) {
        var requestParamsInput = document.createElement('input');
        requestParamsInput.id = 'importRequestParamsInput';
        requestParamsInput.type = 'text';
        requestParamsInput.name = 'params';
        requestParamsInput.value = opt.requestParams;
        fileForm.appendChild(requestParamsInput);
      }

      if (params != null) {
        for (var key in params) {
          var paramInput = document.createElement('input');
          paramInput.type = 'text';
          paramInput.name = key;
          paramInput.value = params[key] ? params[key] : null;
          fileForm.appendChild(paramInput);
        }
      }
      uploadFileDom.appendChild(fileForm);

      // 选取文件
      var input = document.getElementById('importExcelFile');
      input.click();
      input.onchange = function() {
        var file = input.files[0];
        var tmparr = file.name.split('.');
        var fileType = tmparr[tmparr.length - 1].toLowerCase();
        if (filter != null && filter != '') {
          var filterArr = filter.split(',');
          var notFilter = true;
          for (var i = 0; i < filterArr.length; i++) {
            if (fileType == filterArr[i].toLowerCase()) {
              notFilter = false;
              break;
            }
          }
          if (notFilter) {
            // 文件类型不符合要求
            errorCallback('文件类型不符合要求');
            return;
          }
        }
        var sizeM = file.size / 1024 / 1024;
        if (sizeM > maxsize) {
          // 文件大小不符合要求
          errorCallback('文件大小不符合要求');
          return;
        }

        var importExcel = document.getElementById('importExcel');
        importExcel.action = action;
        importExcel.submit();

        // 删除form
        importExcel.remove();
      };
    },

    // 上传方法
    uploadAfterIE10: function(opt) {
      if (!this.action) {
        error('请设置上传文件的URL');
        return;
      }
      if (!opt) {
        opt = {};
      }
      var lastTimestamp = 0; // 上传时间增量
      var lastLoaded = 0; // 上传进度增量
      var filter = this.filter;
      var maxsize = this.maxsize;

      var action = opt.action || this.action;
      var params = opt.params || this.params;
      var startCallback = opt.startCallback || this.startCallback;
      var progressCallback = opt.progressCallback || this.progressCallback;
      var successCallback = opt.successCallback || this.successCallback;
      var errorCallback = opt.errorCallback || this.errorCallback;
      var input = document.createElement('input');
      input.type = 'file';
      input.click();
      input.onchange = function() {
        var file = input.files[0];
        var tmparr = file.name.split('.');
        var fileType = tmparr[tmparr.length - 1].toLowerCase();
        if (filter != null && filter != '') {
          var filterArr = filter.split(',');
          var notFilter = true;
          for (var i = 0; i < filterArr.length; i++) {
            if (fileType == filterArr[i].toLowerCase()) {
              notFilter = false;
              break;
            }
          }
          if (notFilter) {
            // 文件类型不符合要求
            errorCallback('文件类型不符合要求');
            return;
          }
        }
        var sizeM = file.size / 1024 / 1024;
        if (sizeM > maxsize) {
          // 文件大小不符合要求
          errorCallback('文件大小不符合要求');
          return;
        }
        var form = new FormData();
        form.append('file', file);
        form.append('fileName', file.name);
        form.append('size', file.size);
        if (params != null) {
          for (var key in params) {
            form.append(key, params[key]);
          }
        }
        var xhr = new XMLHttpRequest();
        xhr.open('POST', action);
        // ****** 各种事件的监听 ******
        // 参考 https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest
        // 开始上传
        xhr.onloadstart = function(event) {
          lastTimestamp = event.timeStamp;
          lastLoaded = 0;
          startCallback(file);
        };
        // 上传进度
        xhr.onprogress = function(event) {
          var offtimestamp = event.timeStamp - lastTimestamp;
          lastTimestamp = event.timeStamp;
          var offloaded = event.loaded - lastLoaded;
          lastLoaded = event.loaded;
          offtimestamp = offtimestamp / 1000; //转换成秒
          offloaded = offloaded / 1024; //转换成KB
          var speed = Math.round(offloaded / offtimestamp); // KB/S
          var progress = event.loaded / event.total; // 0~1
          var total = Math.round(event.total / 1024); // KB

          progressCallback({
            computable: event.lengthComputable,
            speed: speed,
            progress: progress,
            total: total,
            event: event,
          });
        };

        // 状态变化
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              try {
                var resultObj = JSON.parse(xhr.responseText);
                successCallback(resultObj);
              } catch (e) {
                error('导入返回数据无法解析');
                errorCallback(xhr.responseText);
              }
            } else {
              error('导入失败，网络错误');
              errorCallback('上传失败，网络错误');
            }
          }
        };
        xhr.send(form);
      };
    },
  };

  ds.createUploader = function() {
    return new FileUploader();
  };
})(window);
