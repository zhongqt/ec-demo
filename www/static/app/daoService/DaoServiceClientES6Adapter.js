import './ModelGraph';
import './Uploader';
import './DaoServiceClient';
import './TaskMessageNotify';
import {notification} from 'antd';
import request from '@/utils/request';
import {base64Encode} from '../utils';

/**
 * @mixes ds
 */
const ds = window.ds.noConflict();
const { client, taskMessenger, createUploader } = ds;

function getAutoApiUrl(req) {
  return `${client.serverUrl}/${client.projectId}/auto-api/${req.mainModelName}/${req.action}/${client.serviceCode}/${req.tag}`;
}

client.execute = function(requestBody = {}) {
  const bodyStr = JSON.stringify(requestBody);
  const isFormData = requestBody instanceof FormData;
  return request(getAutoApiUrl(requestBody), {
    method: 'POST',
    body: client.restfulPlainCodeArguments ? bodyStr : base64Encode(bodyStr),
    isFormData,
  });
};

client.config({
  serverUrl: window.backend_ctx,
  projectKey: 'daoservice',
  serviceCode: 'DS_OWN',
  restfulPlainCodeArguments: true,
  excelImportConfig: {
    filter: 'csv,xls,xlsx', // 文件类型过滤器
    maxsize: 10, // 文件上传大小限制，单位：M
  },
});

const SelectCollectCommand = ds.types.SelectCollectCommand;

/**
 * 自动填充表格参数到查询模式
 *
 * @param selectPattern {SelectCollectCommand} 执行模式
 * @param sorter 排序参数
 * @param pagination
 * @param [filterArgs] 查询参数 <b>暂未实现</b>
 * @param [sorter.order]
 * @param [sorter.field]
 */
SelectCollectCommand.fillConditionFromAntdTable = function({ sorter, pagination } = {}) {
  let resultExpression,
    me = this;
  if (sorter && sorter.field) {
    let order = sorter.field;
    if (sorter.order === 'descend') {
      order += ' DESC';
    }
    me.orders = [order];
  }
  if (pagination) {
    resultExpression = me.paging(pagination.current, pagination.pageSize);
  }
  return resultExpression;
};

// 任务提示消息示例
function onTaskMessage(task) {
  var title = (task.taskType.toUpperCase() === 'IMPORT' ? '导入' : '导出') + '消息提示';
  notification.open({
    message: title,
    description: title,
    placement: 'bottomRight',
    onClick: () => {
      window.location.href = '/daoservice/dictSource';
    },
  });
}

taskMessenger.config({
  timerInterval: 10000 * 1000,
  onTaskMessage: onTaskMessage,
});

function onFileUploadOk(data) {
  console.info(data);
}

function onFileUploadFail(data) {
  console.info(data);
}

function startCallback(data) {
  console.info(data);
}

function progressCallback(data) {
  console.info(data);
}

// 创建新fileUploader
var fileUploader = createUploader();

fileUploader.setOption({
  action: `${window.backend_ctx}/daoService/excelImport/test`, // 上传接口
  filter: '', // 文件类型过滤器
  maxsize: 10, // 文件上传大小限制，单位：M
  params: { test: 'test', id: 123 }, // 请求参数
  startCallback: startCallback, // 开始上传的回调函数
  progressCallback: progressCallback, // 上传进度回调函数
  successCallback: onFileUploadOk, // 上传成功回调函数
  errorCallback: onFileUploadFail, // 上传错误的回调函数
});

/**
 * 上传客户端
 */
export const uploader = fileUploader;

/**
 * 数据服务客户端实例
 * @type DaoServiceClient
 */
export const dsc = client;

/**
 * 参数名与字段名一致时的简写
 * @type {SameWithFieldNamedParameter} 与字段名相同的具名参数
 * @private
 */
export const ___ = dsc.___;

export default ds;
