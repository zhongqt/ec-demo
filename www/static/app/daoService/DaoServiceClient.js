/* eslint-disable */
// noinspection ThisExpressionReferencesGlobalObjectJS
var __extends = (this && this.__extends) || (function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
};
// noinspection ThisExpressionReferencesGlobalObjectJS
(function(window) {
  /**
   * @constant
   */
  var DOT = '.';

  var existsConsole = !!window.console,
    error = existsConsole ? window.console.error : window.alert,
    ds = window.ds,
    toString = Object.prototype.toString,
    noop = function () {
    };
  if (!ds) {
    error('请先加载`ModelGraph.js`再加载`DaoServiceClient.js`');
  }

  ds.noConflict = function() {
    delete window['ds'];
    return ds;
  };

  /**
   *
   * @param args
   */
  function extractExecuteArguments(args) {
    var originArgs = flatten(args);
    var restArgs = originArgs.slice(0, originArgs.length - 1);
    var callback = originArgs[originArgs.length - 1];
    if (!isFunction(callback)) {
      return {
        executeArgs: originArgs,
        callback: noop,
      };
    } else {
      return {
        executeArgs: restArgs,
        callback: callback,
      };
    }
  }

  // client

  /**
   * @constructor
   */
  function DaoServiceClient() {
    var combinedQueryModels = [];
    // queryModel 构建
    foreach(ds, function(value, name) {
      if (value instanceof ModelExpression) {
        return;
      }
      if (/^Q/.test(name)) {
        var queryModel = new ModelExpression({ modelName: name.substr(1) });
        foreach(value, function(fieldValue, fieldName) {
          if (fieldValue instanceof ds.types.field) {
            queryModel[fieldName] = queryModel.fieldOr(fieldName);
            queryModel._allFields.push(queryModel[fieldName]);
          }
          if (fieldValue instanceof ds.types.pk) {
            queryModel[fieldName] = queryModel.fieldOr(fieldName);
            queryModel._allFields.splice(0, 0, queryModel[fieldName]);
            queryModel._primaryKey = queryModel[fieldName];
          }
          if (fieldValue instanceof ds.types.combined) {
            combinedQueryModels.push({
              ownQueryModel: queryModel,
              combineName: fieldName,
              modelName: fieldValue.modelName,
            });
          }
        });
        ds[name] = queryModel;
      }
    });
    // 别名组合对象构建
    foreach(combinedQueryModels, function(combinedQueryModel) {
      var ownQueryModel = combinedQueryModel.ownQueryModel,
        combineName = combinedQueryModel.combineName,
        modelName = combinedQueryModel.modelName,
        combineQueryModelName = 'Q' + modelName,
        combineOriginModel = ds[combineQueryModelName];

      if (combineOriginModel) {
        ownQueryModel[combineName] = new ModelExpression({
          modelName: modelName,
          alias: combineName,
          parentModel: ownQueryModel,
          origin: combineOriginModel,
        });
      }
    });
    this.___ = new SameWithFieldNamedParameter();
  }

  // noinspection JSUnusedGlobalSymbols
  DaoServiceClient.prototype = /** @lends DaoServiceClient.prototype */ {
    /**
     * @param cfg.serverUrl 数据服务后端引擎地址
     * @param cfg.serviceCode 数据服务后端引擎服务编号, 用于路由
     * @param cfg.excelImportConfig 导入配置
     * @param cfg.projectId 项目名称, 对应模型`projectKey`
     * @param cfg.projectKey 项目名称, 对应模型`projectKey`
     * @param [cfg.rowStatusField="rowStatusField"] rowStatus 字段名
     * @param [cfg.restfulPlainCodeArguments=true] {boolean} restfulPlainCodeArguments 是否明码传递
     */
    config: function(cfg) {
      this.serverUrl = require(cfg.serverUrl, '请设置数据服务后端引擎地址: serverUrl');
      this.serviceCode = require(cfg.serviceCode, '请设置数据服务后端引擎服务编号: serviceCode');
      this.projectKey = this.projectId = require(cfg.projectKey, '请设置您要请求的项目名称: projectKey');
      this.rowStatusField = cfg.rowStatusField || 'rowStatus';
      this.restfulPlainCodeArguments = cfg.hasOwnProperty(
        'restfulPlainCodeArguments')
        ? !!cfg.restfulPlainCodeArguments
        : true;
      this.isUpdateResponseFullBody = cfg.hasOwnProperty('isUpdateResponseFullBody')
        ? !!cfg.isUpdateResponseFullBody
        : false;
      var excelImportConfig = require(cfg.excelImportConfig, '请设置Excel导入参数');

      var fileUploader = ds.createUploader();
      fileUploader.setOption({
        action: cfg.serverUrl + '/daoService/excelImport',
        filter: excelImportConfig.filter || '', // 文件类型过滤器
        maxsize: excelImportConfig.maxsize || 10, // 文件上传大小限制，单位：M
        startCallback: excelImportConfig.startCallback, // 开始上传的回调函数
        progressCallback: excelImportConfig.progressCallback, // 上传进度回调函数
        successCallback: excelImportConfig.successCallback, // 上传成功回调函数
        errorCallback: excelImportConfig.errorCallback, // 上传错误的回调函数
      });
      this.fileUploader = fileUploader;
    },

    /**
     * @param queryModel {ModelExpression}
     * @return {ModelCommand} modelCommand
     */
    withModel: function(queryModel) {
      return new ModelCommand(this, queryModel);
    },

    downloadFile: function() {
      return new DownloadFileCommand(this);
    },

    forCustomExport: function() {
      return new SelectCustomExportCommand(this);
    },

    /**
     * 获取 `QM`, 也可以直接使用 `ds[queryModelName]` 获取
     *
     * @param queryModelName
     * @return {*}
     */
    getQueryModel: function(queryModelName) {
      return this[queryModelName];
    },
    execute: function(requestBody, callback) {
      var modelExpression = this.modelCommand.modelExpression;
      if (this.tagName) {
        modelExpression.tag(this.tagName);
      }
      return modelExpression.deep().save.apply(modelExpression, toArray(arguments));
    },

    promiseResolved: noop,

    executeExport: function(requestBody, callback) {
      var url = getExportUrl(this, requestBody);
      downloadExportFile(url, requestBody, callback);
    },
    executeCustomExport: function(requestBody, callback) {
      var url = getCustomExportUrl(this, requestBody);
      downloadCustomFile(url, requestBody, callback);
    },
    executeDownloadFile: function(requestBody, callback) {
      var url = getDownloadFileUrl(this, requestBody);
      downloadFile(url, requestBody, callback);
    },
    /**
     * @deprecated Disassembled into customPersist and customSelect methods. Will be deleted in recent version .
     */
    customCommand: function(customApiKey) {
      return new CustomCommand(this, customApiKey);
    },
    customSelect: function (customApiKey) {
      return new CustomCommand(this, customApiKey);
    },
    customPersist: function (customApiKey) {
      return new CustomPersist(this, customApiKey);
    },
    executeCustom: function(requestBody, callback) {
      var url = getCustomApiUrl(this, requestBody);
      post(url, requestBody, callback);
    },
    forImport: function() {
      return new ImportCommand(this);
    },

  };

  function getAutoApiUrl(client, req) {
    return (
      client.serverUrl +
      client.projectId +
      '/' +
      'auto-api/' +
      req.mainModelName +
      '/' +
      req.action +
      '/' +
      client.serviceCode +
      '/' +
      req.tag
    );
  }

  function getCustomApiUrl(client, req) {
    return (
      client.serverUrl +
      '/' +
      client.projectId +
      '/' +
      'custom-api/' +
      req.apiKey +
      '/' +
      client.serviceCode +
      '/' +
      req.tag
    );
  }

  function getImportAction(client, tag) {
    return client.serverUrl + 'daoService/excelImport/' + client.serviceCode + '/' + tag;
  }

  function getExportUrl(client, req) {
    return (
      client.serverUrl +
      'daoService/excelExport/auto-process/' +
      client.projectId +
      '/' +
      req.mainModelName +
      '/' +
      client.serviceCode +
      '/' +
      req.tag
    );
  }

  function getCustomExportUrl(client, req) {
    return (
      client.serverUrl +
      'daoService/excelExport/custom-sql/' +
      client.projectId +
      '/' +
      req.key +
      '/' +
      client.serviceCode
    );
  }

  function getDownloadFileUrl(client, req) {
    return (
      client.serverUrl +
      'daoService/excelExport/download/' +
      client.projectId +
      '/' +
      req.fileId +
      '/' +
      client.serviceCode
    );
  }

  // commands

  var CONST = {
    AUTO_ARGUMENT_PREFIX: 'autoArg',
    MAX_ARRAY_INDEX: Math.pow(2, 53) - 1,
    ROW_STATUS_ENUM: {
      ROW_STATUS_UNCHANGED: 2,
      ROW_STATUS_ADDED: 4,
      ROW_STATUS_DELETED: 8,
      ROW_STATUS_MODIFIED: 16,
    }
  };

  ds.RowStatusEnum = CONST.ROW_STATUS_ENUM;

  /**
   *
   * @param client
   * @param modelExpression
   * @constructor
   */
  function ModelCommand(client, modelExpression) {
    this.client = client;
    this.modelExpression = modelExpression;
  }

  function toFields(fieldsLike) {
    if (fieldsLike[0] instanceof BasicFieldContainer) {
      return fieldsLike[0].getFinalFieldExpression();
    }
    return toArray(fieldsLike);
  }

  // noinspection JSUnusedGlobalSymbols
  ModelCommand.prototype = /** @lends ModelCommand.prototype */ {
    /**
     * @param {BasicFieldContainer/FieldExpression[]} arguments
     * @returns {SelectCollectCommand}
     */
    select: function() {
      return new SelectCollectCommand(this, toFields(arguments));
    },

    selectOne: function() {
      return new SelectOneCommand(this, toFields(arguments));
    },

    forExport: function() {
      return new SelectExportCommand(this, toFields(arguments));
    },

    update: function (fieldContainer) {
      if (fieldContainer instanceof BasicFieldContainer) {
        return new UpdateSelectiveCommand(this);
      }
      if (fieldContainer instanceof FieldExpression) {
        return new UpdateSelectiveCommand(this, __spreadArrays(arguments));
      }
      return new UpdateCommand(this);
    },
    updateSelective: function () {
      return new UpdateSelectiveCommand(this, this.modelExpression.fieldContainer());
    },
    updateBatch: function (fieldContainer) {
      require(fieldContainer, 'updateBatch 必须指定更新字段, 请指定若干字段或用 fieldContainer')
      if (fieldContainer instanceof BasicFieldContainer) {
        return new UpdateSelectiveCommand(this, fieldContainer.getFinalFieldExpression());
      }
      return new UpdateSelectiveCommand(this, __spreadArrays(arguments));
    },
    addBatch: function() {
      return new AddBatchCommand(this);
    },
    add: function() {
      return new AddCommand(this);
    },
    delete: function() {
      return new DeleteCommand(this);
    },
  };

  /**
   * @mixin
   * @constructor
   */
  function BaseCommand() {}

  BaseCommand.prototype = /** @lends BaseCommand.prototype */ {

    /**
     *
     * @param tagName
     * @return {BaseCommand}
     */
    tag: function(tagName) {
      this.tagName = tagName;
      return this;
    },

    /**
     * @abstract
     */
    execute: function() {},

    /**
     * @param expression {object}
     * @private
     */
    fillExplicitValueParameterVisitor: function(expression) {
      var definedArguments = this.definedArguments;
      expression.accept(
        new DeepExpressionVisitor(function (expression) {
          if (expression instanceof ExplicitValueParameter) {
            var argumentValue = expression.argumentValue;
            var argumentName = CONST.AUTO_ARGUMENT_PREFIX + (sizeFor(definedArguments) + 1);
            definedArguments[argumentName] = argumentValue;
            expression.argumentName = argumentName;
          }
        }),
      );
    },
  };

  /**
   * @mixin
   * @type {{having: (function(*=): selectCommonObject), sorting: (function(): selectCommonObject), groupBy: (function(): selectCommonObject)}}
   */
  var selectCommonObject = {
    /**
     *
     * @param whereExpression {OperatorExpression}
     * @return {BaseCommand}
     */
    where: function(whereExpression) {
      this.fillExplicitValueParameterVisitor(whereExpression);
      this.whereExpression = whereExpression;
      return this;
    },

    sorting: function() {
      var me = this;
      me.orders = map(toArray(arguments), function(order) {
        if (isString(order)) {
          return order;
        }
        me.fillExplicitValueParameterVisitor(order);
        return order.hqlFragment();
      });
      return this;
    },

    having: function(having) {
      this.fillExplicitValueParameterVisitor(having);
      this.havingExpression = having;
      return this;
    },

    groupBy: function() {
      var me = this;
      me.groupByExpressions = map(toArray(arguments), function(groupByElement) {
        me.fillExplicitValueParameterVisitor(groupByElement);
        if (isString(groupByElement)) {
          return groupByElement;
        }
        return groupByElement.hqlFragment();
      });
      return this;
    },
  };

  /**
   * @mixes selectCommonObject
   * @mixes BaseCommand
   * @param modelCommand
   * @param fieldExpressions
   * @constructor
   */
  function SelectCollectCommand(modelCommand, fieldExpressions) {
    this.modelCommand = modelCommand;
    this.fieldExpressions = fieldExpressions;
    this.definedArguments = {};
    // noinspection JSUnusedGlobalSymbols
    this.needTotalPage = true;
  }

  SelectCollectCommand.prototype = new BaseCommand();
  extend(
    SelectCollectCommand.prototype,
    {
      paging: function (currentPage, pageSize) {
        var pageCommand = new SelectPageCommand(currentPage, pageSize);
        var execute = pageCommand.execute;
        extend(this, pageCommand);
        this.execute = execute;
        return this;
      },

      byId() {
        var primaryKeys = flatten(arguments);
        var modelCommand = this.modelCommand;
        var modelExpression = modelCommand.modelExpression;
        var primaryKeyField = modelExpression.primaryKey();
        return this.where(primaryKeyField.in$(primaryKeys)).execute();
      },

      execute: function () {
        var extractArgs = extractExecuteArguments(arguments);
        var me = this;
        var fields = [];
        foreach(me.fieldExpressions, function (field) {
          if (field instanceof FilteredFieldContainer) {
            var filterFields = field.hqlFragment();
            foreach(filterFields, function (filterField) {
              fields.push(filterField);
            });
          } else {
            fields.push(field.hqlFragment());
          }
        });
        var requestBody = {
          action: 'list',
          crudType: 'SELECT',
          groupBy: me.groupByExpressions,
          having: me.havingExpression && me.havingExpression.hqlFragment(),
          sorting: me.orders,
          mainModelName: me.modelCommand.modelExpression._modelName,
          tag: me.tagName,
          where: me.whereExpression && me.whereExpression.hqlFragment(),
          reqArgs: extend({}, extractArgs.executeArgs[0], me.definedArguments),
          fields: fields,
        };
        return me.modelCommand.client.execute(requestBody, extractArgs.callback);
      },

      doNotNeedTotalPage: function () {
        this.needTotalPage = false;
        return this;
      },
    },
    selectCommonObject,
  );

  /**
   * @param currentPage
   * @param pageSize
   * @constructor
   */
  function SelectPageCommand(currentPage, pageSize) {
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.needTotalPage = true;
  }

  SelectPageCommand.prototype.execute = function() {
    var extractArgs = extractExecuteArguments(arguments);
    var me = this;
    var requestBody = {
      action: 'query',
      crudType: 'SELECT',
      groupBy: me.groupByExpressions,
      having: me.havingExpression && me.havingExpression.hqlFragment(),
      sorting: me.orders,
      mainModelName: me.modelCommand.modelExpression._modelName,
      tag: me.tagName,
      where: me.whereExpression && me.whereExpression.hqlFragment(),
      currentPage: me.currentPage,
      pageSize: me.pageSize,
      returnPage: true,
      returnTotal: this.needTotalPage,
      reqArgs: extend({}, extractArgs.executeArgs[0], me.definedArguments),
      fields: map(me.fieldExpressions, function(field) {
        return field.hqlFragment();
      }),
    };
    return me.modelCommand.client.execute(requestBody, extractArgs.callback);
  };

  /**
   * @mixes selectCommonObject
   * @mixes BaseCommand
   * @param modelCommand
   * @param fieldExpressions
   * @constructor
   */
  function SelectOneCommand(modelCommand, fieldExpressions) {
    this.modelCommand = modelCommand;
    this.fieldExpressions = fieldExpressions;
    this.definedArguments = {};
  }

  SelectOneCommand.prototype = new BaseCommand();
  extend(
    SelectOneCommand.prototype,
    {
      byId: function () {
        var primaryKeys = flatten(arguments);
        var primaryKeyExpression = this.modelCommand.modelExpression.primaryKey();
        return this.where(primaryKeyExpression.in$(primaryKeys)).execute();
      },
      execute: function () {
        var extractArgs = extractExecuteArguments(arguments);
        var me = this;
        var requestBody = {
          action: 'get',
          crudType: 'SELECT',
          groupBy: me.groupByExpressions,
          having: me.havingExpression && me.havingExpression.hqlFragment(),
          sorting: me.orders,
          mainModelName: me.modelCommand.modelExpression._modelName,
          tag: me.tagName,
          where: me.whereExpression && me.whereExpression.hqlFragment(),
          reqArgs: extend({}, extractArgs.executeArgs[0], me.definedArguments),
          fields: map(me.fieldExpressions, function (field) {
            return field.hqlFragment();
          }),
        };
        return me.modelCommand.client.execute(requestBody, extractArgs.callback);
      },
    },
    selectCommonObject,
  );

  function SelectExportCommand(modelCommand, fieldExpressions) {
    this.modelCommand = modelCommand;
    this.fieldExpressions = fieldExpressions;
    this.definedArguments = {};
    this.isAsync = false;
  }

  SelectExportCommand.prototype = new BaseCommand();
  extend(
    SelectExportCommand.prototype,
    {
      paging: function (currentPage, pageSize) {
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        return this;
      },

      async: function (isAsync) {
        this.isAsync = isAsync;
        return this;
      },

      dataSourceBeanName: function (beanName) {
        this.beanName = beanName;
        return this;
      },

      execute: function () {
        var extractArgs = extractExecuteArguments(arguments);
        var me = this;
        var requestBody = {
          action: 'excelExport',
          crudType: 'SELECT',
          groupBy: me.groupByExpressions,
          having: me.havingExpression && me.havingExpression.hqlFragment(),
          sorting: me.orders,
          mainModelName: me.modelCommand.modelExpression._modelName,
          tag: me.tagName,
          where: me.whereExpression && me.whereExpression.hqlFragment(),
          currentPage: me.currentPage,
          pageSize: me.pageSize,
          returnPage: false,
          returnTotal: false,
          isAsync: me.isAsync,
          beanName: me.beanName,
          reqArgs: extend({}, extractArgs.executeArgs[0], me.definedArguments),
          fields: map(me.fieldExpressions, function (field) {
            return field.hqlFragment();
          }),
        };
        return me.modelCommand.client.executeExport(requestBody, extractArgs.callback);
      },
    },
    selectCommonObject,
  );

  function SelectCustomExportCommand(client) {
    this.client = client;
    this.isAsync = false;
    this.fields = [];
    this._sorting = [];
  }

  // noinspection JSUnusedGlobalSymbols
  extend(
    SelectCustomExportCommand.prototype,
    {
      async: function (isAsync) {
        this.isAsync = isAsync;
        return this;
      },

      dataSourceBeanName: function (beanName) {
        this.beanName = beanName;
        return this;
      },

      customSqlKey: function (key) {
        this.key = key;
        return this;
      },

      exportFieldNames: function (fields) {
        this.fields = fields;
        return this;
      },

      exportSorting: function () {
        this._sorting = flatten(arguments);
        return this;
      },

      execute: function (argumentObject) {
        var extractArgs = extractExecuteArguments(arguments);
        var me = this;
        var requestBody = {
          key: me.key,
          isAsync: me.isAsync,
          beanName: me.beanName,
          reqArgs: argumentObject,
          fields: me.fields,
          sorting: me._sorting,
        };
        return me.client.executeCustomExport(requestBody, extractArgs.callback);
      },
    },
    selectCommonObject,
  );

  function DownloadFileCommand(client) {
    this.client = client;
  }

  // noinspection JSUnusedGlobalSymbols
  extend(DownloadFileCommand.prototype, {
    exportFileId: function(fileId) {
      this.fileId = fileId;
      return this;
    },

    execute: function() {
      var extractArgs = extractExecuteArguments(arguments);
      var me = this;
      var requestBody = {
        fileId: me.fileId,
      };
      return me.client.executeDownloadFile(requestBody, extractArgs.callback);
    },
  });

  /**
   * @mixes BaseCommand
   * @param modelCommand
   * @constructor
   */
  function UpdateCommand(modelCommand) {
    this.modelCommand = modelCommand;
  }

  UpdateCommand.prototype = new BaseCommand();
  // noinspection JSUnusedGlobalSymbols
  extend(UpdateCommand.prototype, {
    /**
     * @deprecated
     */
    andDeepTree: function() {
      this.updateDeepTree = true;
      return this;
    },

    execute: function (record, callback) {
      require(record, '更新指令所更新的对象不能为空');

      record.rowStatus = CONST.ROW_STATUS_ENUM.ROW_STATUS_MODIFIED;

      var modelExpression = this.modelCommand.modelExpression;
      if (this.tagName) {
        modelExpression = modelExpression.tag(this.tagName);
      }
      if (this.updateDeepTree) {
        return modelExpression.deep().save(record, callback);
      } else {
        return modelExpression.save(record, callback);
      }
    }
  });

  /**
   * @mixes BaseCommand
   * @param modelCommand {ModelCommand}
   * @constructor
   */
  function UpdateSelectiveCommand(modelCommand, fields) {
    this.modelCommand = modelCommand;
    this.fields = map(fields, function (field) {
      require(!!field.fieldName, '指定字段更新只能指定原始字段,请不要调用 as , 或函数方法');
      return field.fieldName;
    })
  }

  UpdateSelectiveCommand.prototype = new BaseCommand();

  extend(UpdateSelectiveCommand.prototype, {

    update: function (record) {
      var args = extractExecuteArguments(arguments);
      var records = args.executeArgs;
      var isSaveArray = isArray(records) || args.executeArgs.length > 1;
      var callback = args.callback;
      var modelExpression = this.modelCommand.modelExpression;
      var primaryKeyField = modelExpression.primaryKey();
      foreach(records, function (record) {
        require(!!record[primaryKeyField.fieldName], "指定字段更新的对象集必须具有主键值");
        record.rowStatus = CONST.ROW_STATUS_ENUM.ROW_STATUS_MODIFIED;
      })
      var requestArgs = {
        crudType: 'UPDATE',
        action: 'update',
        mainModelName: modelExpression._modelName,
        fields: this.fields,
        tag: modelExpression._predfinedTag,
        reqArgs: isSaveArray ? records : records[0]
      };
      return this.modelCommand.client.execute(requestArgs, callback);
    },


    execute: function (argumentObject) {
      var me = this,
        modelExpression = me.modelCommand.modelExpression;
      var args = extractExecuteArguments(arguments);
      var records = args.executeArgs;
      var isSaveArray = isArray(records) || args.executeArgs.length > 1;
      var primaryKeyExpression = modelExpression.primaryKey();
      var pkName = primaryKeyExpression.fieldName;
      require(records.length, '更新对象集不能为空');
      foreach(records, function (record) {
        var pkValue = record[pkName];
        record.rowStatus = CONST.ROW_STATUS_ENUM.ROW_STATUS_MODIFIED;
        if (!pkValue) {
          throw new Error('根据入参对象非空字段更新时， 主键不能为空');
        }
      })

      if (!isSaveArray && !this.fields) {
        var record = records[0];
        var withoutPrimaryKeyFields = modelExpression
          .fieldContainer()
          .exclude(primaryKeyExpression)
          .getFinalFieldExpression();
        var valueNotnullFields = filter(withoutPrimaryKeyFields, function (field) {
          return !!record[field.fieldName];
        });
        this.fields = map(valueNotnullFields, function (field) {
          return field.fieldName;
        })
      }

      return this.update.apply(this, toArray(arguments));
    },
  });

  /**
   * @mixes BaseCommand
   * @param modelCommand
   * @constructor
   */
  function AddBatchCommand(modelCommand) {
    this.modelCommand = modelCommand;
  }

  AddBatchCommand.prototype = new BaseCommand();

  AddBatchCommand.prototype.execute = function() {
    var extractArgs = extractExecuteArguments(arguments);
    var records = extractArgs.executeArgs;

    if (isEmpty(extractArgs.executeArgs)) {
      throw new Error('批量新增指令的新增对象集不能为空');
    }

    var modelExpression = this.modelCommand.modelExpression;

    return new FullyRecordPersistCommand(modelExpression._getClient(), modelExpression, {
      deepPersist: true
    }).execute(records, extractArgs.callback);
  };

  /**
   * @mixes BaseCommand
   * @param modelCommand
   * @constructor
   */
  function AddCommand(modelCommand) {
    this.modelCommand = modelCommand;
  }

  AddCommand.prototype = new BaseCommand();

  /**
   *
   * @param record 要新增的记录
   * @param [callback] {function({success:boolean, data: Object})} 回调
   */
  AddCommand.prototype.execute = function(record, callback) {
    var me = this;
    require(record, '新增对象不能为空');

    // 与后端保持一致, add操作设置rowStatus为新增数据
    record.rowStatus = CONST.ROW_STATUS_ENUM.ROW_STATUS_ADDED;

    var requestArguments = {
      mainModelName: this.modelCommand.modelExpression._modelName,
      crudType: 'INSERT',
      action: 'add',
      tag: this.tagName,
      reqArgs: record,
    };

    return me.modelCommand.client.execute(requestArguments, callback);
  };

  var DeleteCommand = (function (__super) {
    __extends(DeleteCommand, __super);

    function DeleteCommand(modelCommand) {
      var _this = this;
      _this.modelCommand = modelCommand;
      _this._primaryKeys = [];
      this._deleteRecords = []
      return this;
    }

    DeleteCommand.prototype.id = function () {
      this._primaryKeys = flatten(arguments);
      return this;
    };

    /**
     * @private
     */
    DeleteCommand.prototype._setDeleteRecords = function (records) {
      this._deleteRecords = records;
      return this;
    }

    DeleteCommand.prototype.execute = function (callback) {
      var me = this,
        modelExpression = me.modelCommand.modelExpression,
        primaryKeyField = modelExpression.primaryKey()
      var deleteRecords = this._deleteRecords;
      if (this._primaryKeys) {
        deleteRecords = map(this._primaryKeys, function (primaryKey) {
          var virtualRcord = {rowStatus: CONST.ROW_STATUS_ENUM.ROW_STATUS_DELETED};
          virtualRcord[primaryKeyField.fieldName] = primaryKey;
          return virtualRcord;
        });
      }

      return me.modelCommand.client.execute({
        mainModelName: modelExpression._modelName,
        crudType: 'DELETE',
        action: 'delete',
        tag: me.tagName,
        reqArgs: deleteRecords
      }, callback);
    };

    return DeleteCommand;
  }(BaseCommand))


  function CustomPersist(client, customApiKey) {
    this.client = client;
    this.customApiKey = customApiKey;
  }

  CustomPersist.prototype = new BaseCommand();
  CustomPersist.prototype.execute = function () {
    var extractArgs = extractExecuteArguments(arguments);
    var me = this;

    var reqArgs = {
      apiKey: this.customApiKey,
      tag: this.tagName ? this.tagName : this.customApiKey,
      reqArgs: extractArgs.executeArgs[0],
    };
    return me.client.executeCustom(reqArgs, extractArgs.callback);
  };


  function CustomCommand(client, customApiKey) {
    this.client = client;
    this.customApiKey = customApiKey;
    this.currentPage = 1;
    this.pageSize = 10;
    this.returnTotal = true;
  }

  CustomCommand.prototype = new BaseCommand();
  CustomCommand.prototype.paging = function(currentPage, pageSize) {
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this._sorting = [];
    return this;
  };
  CustomCommand.prototype.doNotNeedTotalPage = function() {
    this.returnTotal = false;
    return this;
  };
  CustomCommand.prototype.sorting = function() {
    this._sorting = flatten(arguments);
    return this;
  };
  CustomCommand.prototype.execute = function() {
    var extractArgs = extractExecuteArguments(arguments);
    var me = this;

    var reqArgs = {
      apiKey: this.customApiKey,
      tag: this.tagName ? this.tagName : this.customApiKey,
      reqArgs: extractArgs.executeArgs[0],
      currentPage: this.currentPage,
      pageSize: this.pageSize,
      returnTotal: this.returnTotal,
      sorting: this._sorting,
    };

    return me.client.executeCustom(reqArgs, extractArgs.callback);
  };

  function ImportCommand(client) {
    this.client = client;
    this.requestParams = null;
  }

  ImportCommand.prototype = new BaseCommand();
  ImportCommand.prototype.dataSourceBeanName = function(beanName) {
    this.beanName = beanName;
    return this;
  };
  ImportCommand.prototype.params = function(params) {
    this.requestParams = params;
    return this;
  };
  ImportCommand.prototype.execute = function(successCallback, errorCallback) {
    if (!this.tagName) {
      error('请设置tag');
      return;
    }

    var me = this;
    var reqArgs = {
      action: getImportAction(me.client, me.tagName),
      successCallback: successCallback, // 上传成功回调函数
      errorCallback: errorCallback, // 上传错误的回调函数
      requestParams: this.requestParams,
    };
    if (me.beanName) {
      reqArgs.beanName = me.beanName;
    }

    return me.client.fileUploader.upload(reqArgs);
  };

  // models

  function BasicFieldContainer(fieldExpressions) {
    this.fieldExpressions = fieldExpressions;
  }

  // noinspection JSUnusedGlobalSymbols
  BasicFieldContainer.prototype = {
    getFinalFieldExpression: function() {
      return this.fieldExpressions;
    },
    exclude: function() {
      var excludeFields = flatten(arguments);
      return new FilteredFieldContainer(
        this,
        new (function (element) {
          for (var i = 0; i < excludeFields.length; i++) {
            var excludeField = excludeFields[i];
            if (excludeField === element) {
              return false;
            }
          }
          return true;
        })(),
      );
    },
    append: function() {
      var appendFields = flatten(arguments);
      var finalFields = this.getFinalFieldExpression().concat(appendFields);
      return new BasicFieldContainer(finalFields);
    },
    prepend: function() {
      var appendFields = flatten(arguments);
      var finalFields = appendFields.concat(this.getFinalFieldExpression());
      return new BasicFieldContainer(finalFields);
    },
  };

  var FilteredFieldContainer = /** @class */ (function (_super) {
    __extends(FilteredFieldContainer, _super);

    function FilteredFieldContainer(origin, predicate) {
      var _this = this;
      _this.origin = origin;
      _this.predicate = predicate;
      return _this;
    }

    FilteredFieldContainer.prototype.getFinalFieldExpression = function () {
      return filter(this.origin.getFinalFieldExpression(), this.predicate.constructor);
    }

    FilteredFieldContainer.prototype.hqlFragment = function () {
      return map(
        filter(this.origin.getFinalFieldExpression(), this.predicate.constructor), function (field) {
          return field.fieldName;
        });
    }

    return FilteredFieldContainer;
  }(BasicFieldContainer));

  // expressions

  var ConditionTypes = {
    EQ: new ConditionType('eq', '=', ''),
    NE: new ConditionType('ne', '<>', ''),
    LT: new ConditionType('lt', '<', ''),
    LOE: new ConditionType('loe', '<=', ''),
    GT: new ConditionType('gt', '>', ''),
    GOE: new ConditionType('goe', '>=', ''),
    IS_NULL: new ConditionType('isNull', 'IS NULL', ''),
    IS_NOT_NULL: new ConditionType('notNull', 'IS NOT NULL', ''),
    IN: new ConditionType('in', 'IN(', ')'),
    NOT_IN: new ConditionType('notIn', 'NOT IN(', ')'),
    LIKE: new ConditionType('like', 'LIKE', ''),
  };

  var SupportedFunctions = {
    MIN: new SupportedFunction('min', 'MIN(', ')'),
    MAX: new SupportedFunction('max', 'MAX(', ')'),
    AVG: new SupportedFunction('avg', 'AVG(', ')'),
    SUM: new SupportedFunction('sum', 'SUM(', ')'),
    COUNT: new SupportedFunction('count', 'COUNT(', ')'),
    DESC: new SupportedFunction('desc', '', ' DESC'),
  };

  var availableRowStatus = [2, 4, 8, 16];
  var FullyRecordPersistCommand = /** @class */ (function(_super) {
    __extends(FullyRecordPersistCommand, _super);

    function FullyRecordPersistCommand(client, modelExpression, cfg) {
      var _this = this;
      _this.client = client;
      _this.modelExpression = modelExpression;
      _this.deepPersist = !!cfg.deepPersist;
      _this.action = cfg.action || 'addBatch';
      _this.crudType = cfg.crudType || 'INSERT';
      return _this;
    }

    /**
     * 检查
     *
     * @param record
     * @return 是否有持久化的 rowStatus
     */
    function checkRecordsRowStatus(record) {
      if (isArray(record)) {
        return anyTruly(map(record, checkRecordsRowStatus));
      }
      if (isObject(record) && !isDate(record)) {
        if (!record.rowStatus) {
          throw new Error('对象不包含 rowStatus 属性, 无法完成持久化操作.:' + JSON.stringify(record));
        }
        if (availableRowStatus.indexOf(record.rowStatus) === -1) {
          throw new Error('对象的 rowStatus 属性值不合法, 无法完成持久化操作');
        }
        return record.rowStatus !== 2 || anyTruly(map(record, checkRecordsRowStatus));
      }
    }

    function anyTruly(results) {
      var i, len;
      for (i = 0, len = results.length; i < len; i++) {
        if (results[i]) {
          return true;
        }
      }
      return false;
    }

    function withoutObjectAndArrayNode(record) {
      var withoutNames = [];
      foreach(record, function(value, key) {
        if (isArray(value) || (isObject(value) && !isDate(value))) {
          withoutNames.push(key);
        }
      });
      foreach(withoutNames, function(withoutName) {
        delete record[withoutName];
      })
    }

    FullyRecordPersistCommand.prototype.execute = function (recordMaybeArray, callback) {
      var records = isArray(recordMaybeArray) ? recordMaybeArray : [recordMaybeArray];

      if (!this.deepPersist) {
        foreach(records, withoutObjectAndArrayNode);
      }
      var hasPersistRowStatus = checkRecordsRowStatus(records);
      if (!hasPersistRowStatus) {
        var response = {success: true, data: recordMaybeArray, count: 0};
        if (isFunction(callback) && callback !== noop) {
          callback(response);
          return;
        } else {
          return this.client.promiseResolved(response);
        }
      }

      return this.client.execute({
        mainModelName: this.modelExpression._modelName,
        crudType: 'INSERT',
        action: 'addBatch',
        tag: this.modelExpression._predfinedTag,
        reqArgs: recordMaybeArray
      }, callback);
    };

    return FullyRecordPersistCommand;
  }(BaseCommand));

  /**
   * @template T
   *
   * @param {string} cfg.modelName 主模型名称
   * @param {string} [cfg.alias] 别名
   * @param {string} [cfg.predefinedTag] 预定义指令 Tag
   * @param {ModelExpression} [cfg.parentModel] 父模型信息
   * @param {ModelExpression} [cfg.origin] 原始模型信息
   * @param {DaoServiceClient} [cfg.client] 原始模型信息
   * @constructor
   */
  function ModelExpression(cfg) {
    this._primaryKey = {};
    this._allFields = [];
    if (cfg.origin) {
      extend(this, cfg.origin);
    }
    this._modelName = cfg.modelName;
    this._alias = cfg.alias;
    this._predfinedTag = cfg.predefinedTag;
    this._parentModel = cfg.parentModel;
    if (!!cfg.client) {
      this._client = cfg.client;
    }
  }

  function getFieldExpressions(elements) {
    if (!elements || elements.length === 0) {
      return [];
    }
    var fields = [];
    var i, len, element;
    for (i = 0, len = elements.length; i < len; i++) {
      element = elements[i];
      if (!!element) {
        if (element instanceof FieldExpression) {
          fields.push(element);
        } else {
          return [];
        }
      }
    }
    return fields;
  }

  ModelExpression.prototype = {

    tag: function(tag) {
      var me = this;
      return new ModelExpression({
        origin: me,
        modelName: me._modelName,
        alias: me._alias,
        parentModel: me._parentModel,
        client: me._client,
        predefinedTag: tag
      });
    },

    using: function(client) {
      var me = this;
      return new ModelExpression({
        origin: me,
        modelName: me._modelName,
        alias: me._alias,
        parentModel: me._parentModel,
        client: client,
        predefinedTag: this._predfinedTag
      });
    },

    _getClient: function() {
      return this._client || ds.client;
    },

    fieldOr: function(fieldName) {
      return new FieldExpression(this, fieldName);
    },

    hqlFragment: function() {
      if (this._hasAlias()) {
        if (this._parentModel != null) {
          return this._parentModel.hqlFragment() + DOT + this._alias;
        }
        return this._alias;
      }
      return this._modelName;
    },

    chain: function(other) {
      if (other instanceof ModelExpression) {
        if (other._hasAlias() && other._parentModel != null) {
          return other;
        }
        return new ModelChainExpression(this, other);
      }
      if (other instanceof FieldExpression) {
        var otherModel = other.modelExpression;
        if (this.equals(otherModel)) {
          return new ModelChainFieldExpression(this, other);
        } else {
          // 别名模型成员联结它的字段
          // 比如 `QEmployee.dept.chain(QDept.deptName)` -> `Employee.dept.deptName`
          // 等价于原来的写法 `QEmployee.employee.chain(QEmployee.dept).chain(QDept.deptName)`
          var aliasModelMemberRelationToSelfField =
            this.equalsWithoutAlias(otherModel) && this._hasAlias() && !otherModel._hasAlias();
          if (aliasModelMemberRelationToSelfField) {
            return new ModelChainFieldExpression(this, other);
          } else {
            var fieldModelChainExpr = new ModelChainExpression(this, otherModel);
            return new ModelChainFieldExpression(fieldModelChainExpr, other);
          }
        }
      }
    },
    equals: function(other) {
      if (this === other) return true;
      if (other === null) return false;

      return (
        this._modelName === other._modelName &&
        this._alias === other._alias &&
        this._parentModel === other._parentModel
      );
    },
    equalsWithoutAlias: function(other) {
      if (this === other) return true;
      if (other === null) return false;

      return this._modelName === other._modelName;
    },
    fieldContainer: function() {
      return new BasicFieldContainer(this._allFields);
    },
    /**
     *
     * @return {FieldExpression}
     */
    primaryKey: function() {
      return this._primaryKey;
    },
    accept: function(visitor) {
      visitor.visit(this);
    },

    _hasAlias: function() {
      return !!this._alias;
    },

    /* 流畅式 API */

    select: function(fieldContainer) {
      var modelCommand = this._getClient().withModel(this);
      if (!!this._predfinedTag) {
        modelCommand = modelCommand.tag(this._predfinedTag);
      }
      if (fieldContainer instanceof BasicFieldContainer) {
        return modelCommand.select(fieldContainer);
      }
      var fields = flatten(arguments);
      if (isEmpty(fields)) {
        return modelCommand.select(this.fieldContainer());
      } else {
        return modelCommand.select.apply(modelCommand, fields);
      }
    },

    selectOne: function(fieldContainer) {
      var modelCommand = this._getClient().withModel(this);
      if (!!this._predfinedTag) {
        modelCommand = modelCommand.tag(this._predfinedTag)
      }
      if (fieldContainer instanceof BasicFieldContainer) {
        return modelCommand.selectOne(fieldContainer);
      }
      var fields = flatten(arguments);
      if (isEmpty(fields)) {
        return modelCommand.selectOne(this.fieldContainer());
      } else {
        return modelCommand.selectOne.apply(modelCommand, fields);
      }
    },

    delete: function() {
      var extracted = extractExecuteArguments(arguments);
      var records = extracted.executeArgs;
      if (!!records) {
        foreach(records, function (record) {
          record.rowStatus = CONST.ROW_STATUS_ENUM.ROW_STATUS_DELETED;
        });
        return this._getClient().withModel(this)
          .delete()
          ._setDeleteRecords(records)
          .tag(this._predfinedTag)
          .execute(extracted.callback);
      }
    },

    deleteById: function() {
      var extracted = extractExecuteArguments(arguments);
      var primaryKeys = extracted.executeArgs;
      return this._getClient().withModel(this)
        .delete()
        .id(primaryKeys)
        .tag(this._predfinedTag)
        .execute(extracted.callback);
    },

    save: function (records) {
      var args = extractExecuteArguments(arguments);
      require(!isEmpty(args.executeArgs), '要保存的对象集不能为空, records: ' + JSON.stringify(args.executeArgs));
      var isSaveArray = isArray(records) || args.executeArgs.length > 1;
      var client = this._getClient();
      return new FullyRecordPersistCommand(client, this, {
        deepPersist: false
      }).execute(isSaveArray ? args.executeArgs : args.executeArgs[0]);
    },

    deep: function() {
      return new DeepPersistCommand(this);
    },

    selective: function (fieldContainer) {
      var fields;
      if (fieldContainer instanceof BasicFieldContainer) {
        fields = fieldContainer.getFinalFieldExpression();
      } else {
        fields = __spreadArrays(arguments);
      }
      return new UpdateSelectiveCommand(this._getClient().withModel(this), fields);
    },

    export: function() {
      var client = this._getClient();
      var modelCommand = client.withModel(this);
      return modelCommand.forExport.apply(modelCommand, flatten(arguments));
    },

    import: function(tag) {
      require(!!tag, '导入必须指定tag,即导入模式唯一标记');
      this._getClient().forImport()
        .tag(tag)
        .execute();
    },
  };

  var DeepPersistCommand = /** @class */ (function(_super) {
    __extends(DeepPersistCommand, _super);
    function DeepPersistCommand(modelExpression) {
      var _this = this;
      _this.modelExpression = modelExpression;
      return _this;
    }

    DeepPersistCommand.prototype.save = function (record) {
      var args = extractExecuteArguments(arguments);
      require(!isEmpty(args.executeArgs), '要保存的对象集不能为空');
      var isSaveArray = isArray(record) || args.executeArgs.length > 1;
      var modelExpression = this.modelExpression;
      var client = modelExpression._getClient();
      return new FullyRecordPersistCommand(client, modelExpression, {
        deepPersist: true
      }).execute(isSaveArray ? args.executeArgs : args.executeArgs[0], args.callback);
    }

    return DeepPersistCommand;
  }(BaseCommand));

  /**
   * @extends
   * @mixin
   * @constructor
   */
  function OperatorExpression() {
    this.accept = function(visitor) {
      visitor.visit(this);
    };

    /** @method avg
     * @methodOf OperatorExpression*/
  }

  foreach(SupportedFunctions, function(supportFunction) {
    OperatorExpression.prototype[supportFunction.name] = function() {
      return new FunctionExpression(this, supportFunction);
    };
  });

  foreach(ConditionTypes, function(conditionType) {
    var pairFunctionName = conditionType.pairFunctionName;

    OperatorExpression.prototype[pairFunctionName] = (function(conditionType) {
      return function() {
        var me = this;
        var parameters = map(toArray(arguments), function(param) {
          if (isString(param)) {
            return new NamedParameter(param);
          }
          if (param instanceof SameWithFieldNamedParameter) {
            return new NamedParameter(me.getFinalFieldName());
          }
          if (param instanceof ExplicitValueParameter || param instanceof NamedParameter) {
            return param;
          }
          throw new Error(
            '表达式(eq/ne/in...)的参数只能为字符串或参数类型(NamedParameter/SameWithFieldNamedParameter...)',
          );
        });
        return new ConditionExpression(this, conditionType, parameters);
      };
    })(conditionType);

    OperatorExpression.prototype[pairFunctionName + '$'] = (function(pairFunctionName) {
      return function() {
        var parameters = map(toArray(arguments), function(value) {
          return new ExplicitValueParameter(value);
        });
        return this[pairFunctionName].apply(this, parameters);
      };
    })(pairFunctionName);
  });

  extend(OperatorExpression.prototype, {
    /**
     * LIKE 的<b>前</b>模糊匹配快捷方法
     * @param value {string} 查询的值
     * @private
     * @memberOf OperatorExpression
     */
    _like$: function(value) {
      if (!!value && !/^%/.test(value)) {
        value = '%' + value;
      }
      return this.like$(value);
    },
    /**
     * LIKE 的<b>后</b>模糊匹配快捷方法
     * @param value {string} 查询的值
     * @private
     * @memberOf OperatorExpression
     */
    like$_: function(value) {
      if (!!value && !/%$/.test(value)) {
        value += '%';
      }
      return this.like$(value);
    },
    /**
     * LIKE 的<b>全</b>模糊匹配快捷方法
     * @param value {string} 查询的值
     * @private
     * @memberOf OperatorExpression
     */
    _like$_: function(value) {
      if (!!value) {
        if (!/^%/.test(value)) {
          value = '%' + value;
        }
        if (!/%$/.test(value)) {
          value += '%';
        }
      }
      return this.like$(value);
    },
  });

  /**
   * @param modelExpression {ModelExpression} 查询构造模型`QueryModel`
   * @param fieldName 字段名称
   * @mixes OperatorExpression
   * @mixes AsExpression
   * @constructor
   */
  function FieldExpression(modelExpression, fieldName) {
    this.modelExpression = modelExpression;
    this.fieldName = fieldName;
  }

  FieldExpression.prototype = new OperatorExpression();

  extend(
    FieldExpression.prototype,
    /** @lends FieldExpression.prototype */ {
      /**
       * @return {string}
       */
      getFinalFieldName: function () {
        return this.fieldName;
      },
      /**
       * @return {string}
       */
      hqlFragment: function () {
        return this.fieldName;
        // return '`' + this.fieldName + '`';
      },

      /**=
       * @method as
       * @param alias {string}
       * @return {AsExpression}
       */
      as: function (alias) {
        return new AsExpression(this, alias);
      },
      getRootFieldExpression: function () {
        return this;
      },
      accept: function (visitor) {
        visitor.visit(this);
      },

      between: function (left, right) {
        var me = this;

        function toParam(param) {
          if (isString(param)) {
            return new NamedParameter(param);
          }
          if (param instanceof SameWithFieldNamedParameter) {
            return new NamedParameter(me.getFinalFieldName());
          }
          if (param instanceof ExplicitValueParameter || param instanceof NamedParameter) {
            return param;
          }
          throw new Error(
            '表达式(eq/ne/in...)的参数只能为字符串或参数类型(NamedParameter/SameWithFieldNamedParameter...)',
          );
        }

        return new BetweenExpression(this, toParam(left), toParam(right));
      },
      between$: function (left, right) {
        return new BetweenExpression(
          this,
          new ExplicitValueParameter(left),
          new ExplicitValueParameter(right),
        );
      },
    },
  );

  /**
   * @param origin {FieldExpression}
   * @param alias {string}
   * @constructor
   */
  function AsExpression(origin, alias) {
    this.origin = origin;
    this.alias = alias;
  }

  AsExpression.prototype = new OperatorExpression();
  extend(
    AsExpression.prototype,
    /** @lends AsExpression.prototype */ {
      getFinalFieldName: function () {
        return this.alias;
      },
      hqlFragment: function () {
        return this.origin.hqlFragment() + ' AS ' + this.alias;
      },
      getRootFieldExpression: function () {
        return this.origin.getRootFieldExpression();
      },
      accept: function (visitor) {
        visitor.visit(this);

        this.origin.accept(visitor);
      },
    },
  );

  function ConditionType(pairFunctionName, operatorPrefix, operatorSuffix) {
    this.pairFunctionName = pairFunctionName;
    this.operatorPrefix = operatorPrefix;
    this.operatorSuffix = operatorSuffix;
  }

  ConditionType.prototype.hqlFragment = function(leftExpr, parameterPlaceHolders) {
    var me = this;
    if (isEmpty(parameterPlaceHolders)) {
      return leftExpr + ' ' + me.operatorPrefix + me.operatorSuffix;
    } else {
      return (
        leftExpr +
        ' ' +
        me.operatorPrefix +
        ' ' +
        parameterPlaceHolders.join(',') +
        me.operatorSuffix
      );
    }
  };

  function CombinableExpression() {}

  extend(CombinableExpression.prototype, {
    or: function(right) {
      return new OrExpression(this, right);
    },
    and: function(right) {
      return new AndExpression(this, right);
    },
  });

  function OrExpression(leftExpression, rightExpression) {
    this.leftExpression = leftExpression;
    this.rightExpression = rightExpression;
  }

  OrExpression.prototype = new CombinableExpression();
  extend(OrExpression.prototype, {
    hqlFragment: function() {
      return (
        '(' + this.leftExpression.hqlFragment() + ' OR ' + this.rightExpression.hqlFragment() + ')'
      );
    },
    accept: function(visitor) {
      visitor.visit(this);
      this.leftExpression.accept(visitor);
      this.rightExpression.accept(visitor);
    },
  });

  function AndExpression(leftExpression, rightExpression) {
    this.leftExpression = leftExpression;
    this.rightExpression = rightExpression;
  }

  AndExpression.prototype = new CombinableExpression();
  extend(AndExpression.prototype, {
    hqlFragment: function() {
      return (
        '(' + this.leftExpression.hqlFragment() + ' AND ' + this.rightExpression.hqlFragment() + ')'
      );
    },
    accept: function(visitor) {
      visitor.visit(this);
      this.leftExpression.accept(visitor);
      this.rightExpression.accept(visitor);
    },
  });

  function BetweenExpression(origin, left, right) {
    this.origin = origin;
    this.left = left;
    this.right = right;
  }

  BetweenExpression.prototype = new CombinableExpression();
  extend(
    BetweenExpression.prototype,
    /** @lends BetweenExpression.prototype */ {
      getFinalFieldName: function () {
        return this.origin.getFinalFieldName;
      },
      hqlFragment: function () {
        return (
          '(' +
          this.origin.hqlFragment() +
          ' BETWEEN ' +
          this.left.hqlFragment() +
          ' AND ' +
          this.right.hqlFragment() +
          ')'
        );
      },
      getRootFieldExpression: function () {
        return this.origin.getRootFieldExpression();
      },
      accept: function (visitor) {
        visitor.visit(this);
        this.left.accept(visitor);
        this.right.accept(visitor);
      },
    },
  );

  /**
   *
   * @param origin {OperatorExpression} 原始表达式
   * @param conditionType {ConditionType}
   * @param parameters
   * @constructor
   */
  function ConditionExpression(origin, conditionType, parameters) {
    this.origin = origin;
    this.conditionType = conditionType;
    this.parameters = parameters;
  }

  ConditionExpression.prototype = new CombinableExpression();

  extend(ConditionExpression.prototype, {
    getParameterPlaceHolders: function() {
      var me = this;
      return map(me.parameters, function(param) {
        if (param instanceof SameWithFieldNamedParameter) {
          return ':' + me.origin.getFinalFieldName();
        }
        return param.getPlaceHolder();
      });
    },
    hqlFragment: function() {
      return this.conditionType.hqlFragment(
        this.origin.hqlFragment(),
        this.getParameterPlaceHolders(),
      );
    },
    accept: function(visitor) {
      visitor.visit(this);

      this.origin.accept(visitor);
      foreach(this.parameters, function(parameter) {
        parameter.accept(visitor);
      });
    },
  });

  function NamedParameter(argumentName) {
    this.argumentName = argumentName;
  }

  NamedParameter.prototype = {
    hqlFragment: function() {
      return this.getPlaceHolder();
    },
    getPlaceHolder: function() {
      return /^:/.test(this.argumentName) ? this.argumentName : ':' + this.argumentName;
    },
    accept: function(visitor) {
      visitor.visit(this);
    },
  };

  /**
   *
   * @param argumentValue
   * @constructor
   * @cfg argumentName {string}
   */
  function ExplicitValueParameter(argumentValue) {
    this.argumentValue = argumentValue;
    this.argumentName = '';
  }

  ExplicitValueParameter.prototype = {
    hqlFragment: function() {
      return this.getPlaceHolder();
    },
    getPlaceHolder: function() {
      return /^:/.test(this.argumentName) ? this.argumentName : ':' + this.argumentName;
    },
    accept: function(visitor) {
      visitor.visit(this);
    },
  };

  function SameWithFieldNamedParameter() {
    this.accept = noop;
  }

  /**
   * @mixin
   * @param origin
   * @param supportedFunction
   * @constructor
   */
  function FunctionExpression(origin, supportedFunction) {
    this.origin = origin;
    this.supportedFunction = supportedFunction;
  }

  FunctionExpression.prototype = new OperatorExpression();
  extend(
    FunctionExpression.prototype,
    /** @lends FunctionExpression.prototype */ {
      getFinalFieldName: function () {
        return this.origin.hqlFragment();
      },
      hqlFragment: function () {
        return this.supportedFunction.hqlFragment(this.origin);
      },
      as: function (alias) {
        return new AsExpression(this, alias);
      },
      getRootFieldExpression: function () {
        return this.origin.getRootFieldExpression();
      },
      accept: function (visitor) {
        visitor.visit(this);
      },
    },
  );

  function SupportedFunction(name, functionPrefix, functionSuffix) {
    this.name = name;
    this.functionPrefix = functionPrefix;
    this.functionSuffix = functionSuffix;
  }

  SupportedFunction.prototype.hqlFragment = function(expressionToWrap) {
    return this.functionPrefix + expressionToWrap.hqlFragment() + this.functionSuffix;
  };

  /**
   *
   * @param modelExpression {ModelExpression/ModelChainExpression}
   * @param origin {FieldExpression}
   * @constructor
   */
  function ModelChainFieldExpression(modelExpression, origin) {
    this.modelExpression = modelExpression;
    this.fieldName = origin.fieldName;
  }

  // noinspection JSCheckFunctionSignatures
  ModelChainFieldExpression.prototype = new FieldExpression();

  extend(ModelChainFieldExpression.prototype, {
    hqlFragment: function() {
      return this.modelExpression.hqlFragment() + DOT + this.fieldName;
    },
    accept: function(visitor) {
      visitor.visit(this);
    },
  });

  function DeepExpressionVisitor(visitor) {
    var me = this;
    me.visit = function(expression) {
      visitor(expression);
    };
  }

  function ModelChainExpression(parentModelExpression, currentModelExpression) {
    this._modelName = currentModelExpression._modelName;
    this.parentModelExpression = parentModelExpression;
    this.currentModelExpression = currentModelExpression;
    this._primaryKey = this.currentModelExpression._primaryKey;
    this._allFields = this.currentModelExpression._allFields;

    if (parentModelExpression.equals(currentModelExpression)) {
      error(
        '请勿连接相同的`QueryModel`, ' +
        parentModelExpression.hqlFragment() +
        ' -> ' +
        currentModelExpression.hqlFragment(),
      );
    }
    if (
      parentModelExpression.equalsWithoutAlias(currentModelExpression) &&
      parentModelExpression._hasAlias() &&
      !currentModelExpression._hasAlias()
    ) {
      error(
        '无法从`具别名的QueryModel`连接到`原始QueryModel`, 这会导致逻辑异常,' +
        parentModelExpression.hqlFragment() +
        ' -> ' +
        currentModelExpression.hqlFragment(),
      );
    }
  }

  // noinspection JSCheckFunctionSignatures
  ModelChainExpression.prototype = new ModelExpression({});
  extend(ModelChainExpression.prototype, {
    hqlFragment: function() {
      return (
        this.parentModelExpression.hqlFragment() + DOT + this.currentModelExpression.hqlFragment()
      );
    },
    accept: function(visitor) {
      this.parentModelExpression.accept(visitor);
      this.currentModelExpression.accept(visitor);

      visitor.visit(this);
    },
  });

  /**
   * @export client {DaoServiceClient}
   * @type {DaoServiceClient}
   */
  ds.client = new DaoServiceClient();

  // common functions

  function filter(array, predicate) {
    var result = [],
      i,
      len,
      ele;
    for (i = 0, len = array.length; i < len; i++) {
      ele = array[i];
      if (predicate(ele)) {
        result.push(ele);
      }
    }
    return result;
  }

  function map(array, transformer) {
    var result = [],
      i,
      len,
      ele;
    for (i = 0, len = array.length; i < len; i++) {
      ele = array[i];
      result.push(transformer(ele));
    }
    return result;
  }

  function flatten(array, shallow) {
    var index = -1,
      length = array ? array.length : 0,
      result = [];

    while (++index < length) {
      var value = array[index];

      // recursively flatten arrays (susceptible to call stack limits)
      if (isArray(value)) {
        Array.prototype.push.apply(result, shallow ? value : flatten(value));
      } else {
        result.push(value);
      }
    }
    return result;
  }

  function isArray(obj) {
    return obj instanceof Array || toString.call(obj) === '[object Array]';
  }

  function isString(obj) {
    return obj instanceof String || toString.call(obj) === '[object String]';
  }

  function isObject(obj) {
    var type = typeof obj;
    return type === 'function' || (type === 'object' && !!obj);
  }

  function isDate(obj) {
    return obj instanceof Date || toString.call(obj) === '[object Date]';
  }

  function isArrayLikeArguments(args) {
    return args.length > 1 || isObject(args[0]) || isDate(args[0]);
  }

  function isEmpty(obj) {
    if (obj == null) return true;
    if (isArray(obj) || isString(obj)) return obj.length === 0;
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        return false;
      }
    }
    return true;
  }

  function require(valid, message) {
    if (!valid) error(message);
    return valid;
  }

  function extend(object) {
    if (!object) {
      return object;
    }
    for (var argsIndex = 1, argsLength = arguments.length; argsIndex < argsLength; argsIndex++) {
      var iteratee = arguments[argsIndex];
      if (iteratee) {
        for (var key in iteratee) {
          // noinspection JSUnfilteredForInLoop
          object[key] = iteratee[key];
        }
      }
    }
    return object;
  }

  function pick(obj) {
    var pickProperties = flatten(Array.prototype.slice.call(arguments, 1));
    var result = {};
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop) && contains(pickProperties, prop)) {
        result[prop] = obj[prop];
      }
    }
    return result;
  }

  function contains(source, search) {
    return !!filter(source, function(ele) {
      return ele === search;
    });
  }

  function isArrayLike(collection) {
    var length = collection.length;
    return typeof length == 'number' && length >= 0 && length <= CONST.MAX_ARRAY_INDEX;
  }

  function isFunction(value) {
    return typeof value === 'function';
  }

  function sizeFor(obj) {
    if (!obj) return 0;
    if (isArrayLike(obj)) return obj.length;

    // for object
    var size = 0;
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        size++;
      }
    }
    return size;
  }

  function toArray(obj) {
    if (!obj) return [];
    if (isArray(obj)) return Array.prototype.slice.call(obj);
    if (isArrayLike(obj))
      return map(obj, function(obj) {
        return obj;
      });
    var result = [];
    foreach(obj, function(value) {
      result.push(value);
    });
    return result;
  }

  function foreach(obj, consumer) {
    var i, len, property;
    if (!!obj) {
      if (isArray(obj)) {
        for (i = 0, len = obj.length; i < len; i++) {
          consumer.call(obj, obj[i], i, obj);
        }
      } else {
        for (property in obj) {
          if (obj.hasOwnProperty(property)) {
            consumer.call(obj, obj[property], property, obj);
          }
        }
      }
    }
  }

  function post(url, body, callback) {
    var xmlReq = new XMLHttpRequest();
    xmlReq.onreadystatechange = function() {
      if (xmlReq.readyState === 4 && xmlReq.status === 200) {
        var data = JSON.parse(xmlReq.responseText);
        callback(data);
      }
    };
    xmlReq.open('POST', url, true);
    xmlReq.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xmlReq.send(JSON.stringify(body));
  }

  function downloadExportFile(url, body, callback) {
    var downloadFileDom = window.document.getElementById('dsDownloadFile');
    if (!downloadFileDom) {
      downloadFileDom = document.createElement('div');
      downloadFileDom.id = 'dsDownloadFile';
      downloadFileDom.style = 'display:none;';
      downloadFileDom.innerHTML =
        '<form name="exportExcel" id="exportExcel" target="exportIframe" ' +
        'method="post" accept-charset="utf-8">' +
        '<input type="text" name="crudType" id="exportExcelCrudType"/>' +
        '<input type="text" name="fields" id="exportExcelFields"/>' +
        '<input type="text" name="reqArgsStr" id="exportExcelReqArgsStr"/>' +
        '<input type="text" name="where" id="exportExcelWhere"/>' +
        '<input type="text" name="having" id="exportExcelHaving"/>' +
        '<input type="text" name="sorting" id="exportExcelSorting"/>' +
        '<input type="text" name="groupBy" id="exportExcelGroupBy"/>' +
        '<input type="text" name="currentPage" id="exportExcelCurrentPage"/>' +
        '<input type="text" name="pageSize" id="exportExcelPageSize"/>' +
        '<input type="text" name="returnTotal" value="false" id="exportExcelReturnTotal"/>' +
        '<input type="text" name="returnPage" value="false" id="exportExcelReturnPage"/>' +
        '<input type="text" name="isAsync" value="false" id="exportExcelIsAsync"/>' +
        '<input type="text" name="dataSourceBeanName" value="false" id="exportExcelDataSourceBeanName"/>' +
        '</form>' +
        '<iframe name="exportIframe" id="exportIframe"></iframe>';
      downloadFileDom = window.document.body.appendChild(downloadFileDom);
    }
    var exportIframe = document.getElementById('exportIframe');
    if (exportIframe) {
      // iframe加载完成事件, 二进制流不会触发; 后端不能正常返回会报跨域异常
      exportIframe.onload = function exportIframeLoad() {
        var contentWin = document.getElementById('exportIframe').contentWindow;
        var backBodyText = contentWin.document.body.innerText;
        try {
          var resultObj = JSON.parse(backBodyText);
          callback(resultObj);
        } catch (e) {
          error('导出返回数据无法解析');
          callback(backBodyText);
        }
      };
    }

    // reqArgs改用reqArgsStr传递
    if (body.reqArgs) {
      body.reqArgsStr = JSON.stringify(body.reqArgs);
      delete body.reqArgs;
    }
    // 设置请求参数
    document.getElementById('exportExcelCrudType').value = body.crudType ? body.crudType : null;
    document.getElementById('exportExcelFields').value = body.fields ? body.fields : null;
    document.getElementById('exportExcelReqArgsStr').value = body.reqArgsStr
      ? body.reqArgsStr
      : null;
    document.getElementById('exportExcelWhere').value = body.where ? body.where : null;
    document.getElementById('exportExcelHaving').value = body.having ? body.having : null;
    document.getElementById('exportExcelSorting').value = body.sorting ? body.sorting : null;
    document.getElementById('exportExcelGroupBy').value = body.groupBy ? body.groupBy : null;
    document.getElementById('exportExcelCurrentPage').value = body.currentPage
      ? body.currentPage
      : null;
    document.getElementById('exportExcelPageSize').value = body.pageSize ? body.pageSize : null;
    document.getElementById('exportExcelIsAsync').value = body.isAsync ? body.isAsync : null;
    document.getElementById('exportExcelDataSourceBeanName').value = body.beanName
      ? body.beanName
      : null;

    var actionUrl = url;

    var exportExcel = document.getElementById('exportExcel');
    exportExcel.action = actionUrl;
    exportExcel.submit();
  }

  function downloadCustomFile(url, body, callback) {
    var downloadCustomFileDom = window.document.getElementById('dsDownloadCustomFile');
    if (downloadCustomFileDom != null) {
      document.body.removeChild(downloadCustomFileDom);
      downloadCustomFileDom = null;
    }
    if (!downloadCustomFileDom) {
      var exportFieldsFormHtml = '';
      for (var i = 0; i < body.fields.length; i++) {
        exportFieldsFormHtml +=
          '<input type="text" name="fields" value="false" id="exportFields' + i + '"/>';
      }
      var sortingFormHtml = '';
      for (var i = 0; i < body.sorting.length; i++) {
        sortingFormHtml +=
          '<input type="text" name="sorting" value="false" id="sorting' + i + '"/>';
      }
      downloadCustomFileDom = document.createElement('div');
      downloadCustomFileDom.id = 'dsDownloadCustomFile';
      downloadCustomFileDom.style = 'display:none;';
      downloadCustomFileDom.innerHTML =
        '<form name="exportCustomExcel" id="exportCustomExcel" target="exportCustomIframe"' +
        'method="post" accept-charset="utf-8">' +
        '<input type="text" name="reqArgs" value="false" id="exportCustomExcelReqArgs"/>' +
        '<input type="text" name="isAsync" value="false" id="exportCustomExcelIsAsync"/>' +
        '<input type="text" name="dataSourceBeanName" value="false" id="exportCustomExcelDataSourceBeanName"/>' +
        exportFieldsFormHtml +
        sortingFormHtml +
        '</form>' +
        '<iframe name="exportCustomIframe" id="exportCustomIframe"></iframe>';
      downloadCustomFileDom = window.document.body.appendChild(downloadCustomFileDom);
    }
    var exportCustomIframe = document.getElementById('exportCustomIframe');
    if (exportCustomIframe) {
      // iframe加载完成事件, 二进制流不会触发; 后端不能正常返回会报跨域异常
      exportCustomIframe.onload = function exportCustomIframeLoad() {
        var frame = document.getElementById('exportCustomIframe');
        var contentWin = frame.contentWindow;
        var backBodyText = contentWin.document.body.innerText;
        try {
          var resultObj = JSON.parse(backBodyText);
          callback(resultObj);
        } catch (e) {
          error('导出返回数据无法解析');
          callback(backBodyText);
        }
      };
    }

    // reqArgs改用reqArgsStr传递
    if (body.reqArgs) {
      body.reqArgsStr = JSON.stringify(body.reqArgs);
      delete body.reqArgs;
    }
    // 设置请求参数
    document.getElementById('exportCustomExcelReqArgs').value = body.reqArgsStr
      ? body.reqArgsStr
      : null;
    document.getElementById('exportCustomExcelIsAsync').value = body.isAsync ? body.isAsync : null;
    document.getElementById('exportCustomExcelDataSourceBeanName').value = body.beanName
      ? body.beanName
      : null;
    for (var i = 0; i < body.fields.length; i++) {
      document.getElementById('exportFields' + i).value = body.fields[i];
    }
    for (var i = 0; i < body.sorting.length; i++) {
      document.getElementById('sorting' + i).value = body.sorting[i];
    }

    var actionUrl = url;

    var exportCustomExcel = document.getElementById('exportCustomExcel');
    exportCustomExcel.action = actionUrl;
    exportCustomExcel.submit();
  }

  function downloadFile(url, body, callback) {
    var downloadDom = window.document.getElementById('dsDownload');
    if (!downloadDom) {
      downloadDom = document.createElement('div');
      downloadDom.id = 'dsDownload';
      downloadDom.style = 'display:none;';
      downloadDom.innerHTML =
        '<form name="downloadFile" id="downloadFile" target="downloadFileIframe"' +
        'method="get" accept-charset="utf-8">' +
        '<iframe name="downloadFileIframe" id="downloadFileIframe"></iframe>';
      downloadDom = window.document.body.appendChild(downloadDom);
    }
    var downloadFileIframe = document.getElementById('downloadFileIframe');
    if (downloadFileIframe) {
      // iframe加载完成事件, 二进制流不会触发; 后端不能正常返回会报跨域异常
      downloadFileIframe.onload = function downloadFileIframeLoad() {
        var contentWin = document.getElementById('downloadFileIframe').contentWindow;
        var backBodyText = contentWin.document.body.innerText;
        try {
          var resultObj = JSON.parse(backBodyText);
          callback(resultObj);
        } catch (e) {
          error('导出返回数据无法解析');
          callback(backBodyText);
        }
      };
    }

    var actionUrl = url;
    var exportCustomExcel = document.getElementById('downloadFile');
    exportCustomExcel.action = actionUrl;
    exportCustomExcel.submit();
  }

  ds.types.DaoServiceClient = DaoServiceClient;
  ds.types.ModelCommand = ModelCommand;
  ds.types.BaseCommand = BaseCommand;
  ds.types.SelectCollectCommand = SelectCollectCommand;
  ds.types.SelectPageCommand = SelectPageCommand;
  ds.types.SelectOneCommand = SelectOneCommand;
  ds.types.UpdateCommand = UpdateCommand;
  ds.types.UpdateSelectiveCommand = UpdateSelectiveCommand;
  ds.types.AddBatchCommand = AddBatchCommand;
  ds.types.AddCommand = AddCommand;
  ds.types.DeleteCommand = DeleteCommand;
  ds.types.FilteredFieldContainer = FilteredFieldContainer;
  ds.types.ModelExpression = ModelExpression;
  ds.types.OperatorExpression = OperatorExpression;
  ds.types.FieldExpression = FieldExpression;
  ds.types.AsExpression = AsExpression;
  ds.types.ConditionExpression = ConditionExpression;
  ds.types.ExplicitValueParameter = ExplicitValueParameter;
  ds.types.FunctionExpression = FunctionExpression;
  ds.types.ModelChainFieldExpression = ModelChainFieldExpression;
  ds.types.ModelChainExpression = ModelChainExpression;
  ds.types.AndExpression = AndExpression;
  ds.types.BasicFieldContainer = BasicFieldContainer;
  ds.types.BetweenExpression = BetweenExpression;
  ds.types.CombinableExpression = CombinableExpression;
  ds.types.BetweenExpression = BetweenExpression;
})(window);
