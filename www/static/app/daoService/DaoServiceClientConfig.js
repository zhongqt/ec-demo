export default {
  _default: {
    serverUrl: window.backend_ctx,
    projectKey: 'daoservice',
    serviceCode: 'DS_OWN',
    restfulPlainCodeArguments: true,
    excelImportConfig: {
      filter: 'csv,xls,xlsx', // 文件类型过滤器
      maxsize: 10, // 文件上传大小限制，单位：M
    },
  },
  // pgClient: {
  //   serverUrl: '/dao/',
  //   projectKey: 'daoservice-quickstart',
  //   serviceCode: 'QS',
  //   excelImportConfig: {
  //     filter: 'csv,xls,xlsx', // 文件类型过滤器
  //     maxsize: 10 // 文件上传大小限制，单位：M
  //   }
  // }
};
