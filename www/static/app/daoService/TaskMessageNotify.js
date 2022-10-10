(function(window) {
  var error = window.console.error || window.alert,
    ds = window.ds,
    importTask = ds.QDsImportTask,
    exportTask = ds.QDsExportTask;

  var i = 10000;
  var TASK_DONE = 3;
  var TASK_FAILED = 2;

  function TaskMessageNotify() {}

  TaskMessageNotify.prototype = {
    config: function(cfg) {
      // this.timerInterval = require(cfg.timerInterval, '请导入导出任务轮训间隔，单位毫秒');
      // 本地调试时配置
      this.timerInterval = 5 * 1000 * 3600 * 24;
      // this.timerInterval = 5 * 1000;
      this.onTaskMessage = cfg.onTaskMessage ? cfg.onTaskMessage : this.handleTaskMessage;
      this.exportDownloadUrl = cfg.exportDownloadUrl; // 导出文件下载
      this.exportTasksUrl = cfg.exportTasksUrl; // 导出任务列表页
      this.importErrorEditUrl = cfg.importErrorEditUrl;

      // 定义全局msgTimer, 仅设置一次定时器
      if (!window.msgTimer) {
        window.msgTimer = {};
        window.setInterval(messageNotify, ds.taskMessenger.timerInterval);
      }
    },

    getImportTask: function() {
      // TODO 缺少当前登录用户
      const endTime = new Date().getTime() - this.timerInterval;
      return ds.client
        .withModel(importTask)
        .select(importTask.fieldContainer())
        .where(importTask.taskStatus.in$(2, 3).and(importTask.endDatetime.gt$(endTime)))
        .tag('selectImportTask')
        .execute({});
    },

    getExportTask: function() {
      const endTime = new Date().getTime() - this.timerInterval;
      return ds.client
        .withModel(exportTask)
        .select(exportTask.fieldContainer())
        .where(importTask.taskStatus.in$(2, 3).and(importTask.endDatetime.gt$(endTime)))
        .tag('selectExportTask')
        .execute({});
    },

    getImportErrorEditUrl: function(task) {
      return importErrorEditUrl;
    },

    getImportTaskMessage: function(task) {
      if (task.taskStatus === TASK_DONE) {
        var message = '成功导入' + task.processedCount + '条';
        if (task.processedErrorCount > 0) {
          message =
            message +
            ', 另有' +
            task.processedErrorCount +
            '条非法数据，' +
            "<a href='" +
            getImportErrorEditUrl(task) +
            "'><b>点击</b></a>" +
            '点击以再次编辑非法数据';
        }
        return message;
      } else if (task.taskStatus === TASK_FAILED) {
        var message =
          '共计有' +
          task.processedErrorCount +
          '条非法数据，' +
          "<a href='" +
          getImportErrorEditUrl(task) +
          "'><b>点击</b></a>" +
          '点击以再次编辑非法数据';
        return message;
      }
    },

    getDownloadUrl: function(task) {
      return this.exportDownloadUrl;
    },

    getExportTaskMessage: function(task) {
      if (task.taskStatus === TASK_DONE) {
        var message =
          '您请求导出的' +
          "<a href='" +
          this.getDownloadUrl(task) +
          "'><b>" +
          task.exportFileName +
          '</b></a>' +
          '已完成，点击文件名以下载，或查看' +
          "<a href='" +
          this.exportTasksUrl +
          "'><b>异步导出任务列表</b></a>";
        return message;
      } else if (task.taskStatus === TASK_FAILED) {
        var message =
          '您请求导出的' +
          task.exportFileName +
          '导出失败，点击查看' +
          "<a href='" +
          this.exportTasksUrl +
          "'><b>异步导出任务列表</b></a>";
        return message;
      }
    },

    handleTaskMessage: function(task) {
      var title = (task.taskType.toUpperCase() === 'IMPORT' ? '导入' : '导出') + '消息提示';
      var message =
        task.taskType.toUpperCase() === 'IMPORT'
          ? this.getImportTaskMessage(task)
          : this.getExportTaskMessage(task);
      if (message) {
        this.createMessageBox(title, message);
      }
    },

    // 创建消息提示控件
    createMessageBox: function(title, message) {
      i++;
      var messageNotifyDom = window.document.getElementById('dsMessageNotify');
      if (!messageNotifyDom) {
        messageNotifyDom = document.createElement('div');
        messageNotifyDom.id = 'dsMessageNotify';
        messageNotifyDom = window.document.body.appendChild(messageNotifyDom);
      }

      var domId = 'dsMessageBox' + i;
      var clickId = 'dsMessageClick' + i;
      var messageBox = document.createElement('div');
      messageBox.id = domId;
      messageNotifyDom.appendChild(messageBox);

      var insertDiv = document.getElementById(domId);
      insertDiv.innerHTML =
        "<div id='pop_div'style='position:fixed;border:1px solid #e0e0e0;z-index:" +
        i +
        ";width:320px;height:auto;right: 12px;bottom: 12px;'>" +
        "<div style='line-height:32px;background:#f6f0f3;border-bottom:1px solid #e0e0e0;font-size:14px;padding:0 0 0 10px;'>" +
        "<div style='float:left;'><b>" +
        title +
        "</b></div><div style='float:right;cursor:pointer;'><b id='" +
        clickId +
        "'>×</b></div>" +
        "<div style='clear:both'></div>" +
        '</div>' +
        "<div id='content' style='background:#f6f0f3;margin-bottom: 16px;padding: 16px 24px;'>" +
        message +
        '</div>' +
        '</div>';

      var clickBtn = document.getElementById(clickId);
      if (clickBtn) {
        // 绑定动态事件, innerHTML无法绑定事件
        clickBtn.onclick = function messageClose() {
          var element = document.getElementById(domId);
          if (element) {
            element.style = 'display:none;';
          }
        };
      }
    },
  };

  ds.taskMessenger = new TaskMessageNotify();
  ds.taskMessenger.timerInterval = 5 * 1000;
  ds.taskMessenger.onTaskMessage = ds.taskMessenger.handleTaskMessage;

  function messageNotify() {
    console.debug('轮训任务=================>' + i);

    ds.taskMessenger.getImportTask().then(
      res => {
        if (res && res.data) {
          for (var i = 0; i < res.data.length; ++i) {
            var task = res.data[i];
            task.taskType = 'IMPORT';
            ds.taskMessenger.onTaskMessage(task);
          }
        }
      },
      err => {
        error(err);
      },
    );

    ds.taskMessenger.getExportTask().then(
      res => {
        if (res && res.data) {
          for (var i = 0; i < res.data.length; ++i) {
            var task = res.data[i];
            task.taskType = 'EXPORT';
            ds.taskMessenger.onTaskMessage(task);
          }
        }
      },
      err => {
        error(err);
      },
    );
  }

  // 包裹函数，传外部参数，返回函数
  function messageNotifyWrapper(window) {
    return function() {
      messageNotify(window);
    };
  }
})(window);
