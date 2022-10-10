// @formatter:off
(function (window) {
/** @mixin */
var ds = window.ds;
if (!window.ds) ds = window.ds = {};
ds.types = {field: Field, pk: PrimaryKeyField, combined: Combined};

/** @type FieldExpression
* @constructor */
function Field() {}

/**@type FieldExpression
* @constructor */
function PrimaryKeyField() {}

/** @type ModelExpression
* @param modelName
* @constructor */
function Combined(modelName) {this.modelName = modelName;}

var f = new Field(),
p = new PrimaryKeyField(),
c = Combined;

ds.QWbsWaybillInfo = {waybillId:p,collectEmployeeId: f,consigneeName: f,collectEmployeeMobile: f,collectDatetime: f,sendAreaCode: f,sendAddressDetail: f,shipperCname: f,shipperMobile: f,consigneeCname: f,consigneeMobile: f,productTypeCode: f,deliveryAreaCode: f,deliveryAddressDetail: f,estimateDeliveryTime: f,lastModifyTime: f,principalGroupCode: f}
ds.QSysUser = {userId:p,password: f,partnerId: f,userType: f,createTime: f,status: f,nickName: f,createrId: f,mobile: f,deleteFlg: f,departmentId: f,userFullName: f,email: f,userNo: f,remark: f,companyName: f,companyAddress: f,roleId: f,sex: f,version: f,age: f,username: f}
ds.QCustomer = {customerId:p,customerCode: f,channelId: f}
ds.QUserExportTest = {id:p,username: f,password: f}
ds.QFsFileInfo = {fileKey:p,name: f,url: f,etag: f,byteSize: f,uploaderStrategyId: f,largeThumbnailUrl: f,largeThumbnailEtag: f,smallThumbnailUrl: f,smallThumbnailEtag: f}
ds.QWorkerInfo = {id:p,workerNode: f,createTime: f,updateTime: f}
ds.QIdempotentRecord = {id:p,consumerGroup: f,msgId: f}
ds.QSysGridLayout = {sysGridLayoutId:p,userId: f,roleId: f,tableId: f,content: f,name: f,modifyTime: f}
ds.QFsUploaderStrategy = {id:p,bucketName: f,allowExtensions: f,sizeLimit: f,countLimit: f,isLogicDelete: f,largeThumbnailSize: f,smallThumbnailSize: f}
ds.QDepartment = {departmentId:p,departmentName: f,departmentManager: f}
ds.QSysRoleResource = {roleResourcesId:p,resourceId: f,roleId: f,deleteFlg: f,createrId: f,createTime: f,updateTime: f,updaterId: f}
ds.QWaybillFee = {waybillId:p,totalFreight: f,insuranceFee: f,weight: f,volume: f}
ds.QExportConfig = {id:p,printMode: f,template: f,async: f,dictionaryUrl: f,fileName: f,pageSize: f,className: f,sourceUrl: f,statisticsUrl: f,columnSetting: f}
ds.QFailureMessage = {id:p,msgId: f,retryTimes: f,node: f,topic: f,tags: f,groupName: f,mqName: f,exception: f,message: f,messageKey: f,state: f,consumeTime: f,createTime: f,createUser: f,updateTime: f,updateUser: f}
ds.QJob = {id:p,scheduleCode: f,cron: f,threadType: f,scheduleType: f,shardCount: f,timeout: f,enabled: f,description: f,createTime: f,updateTime: f}
ds.QCourse = {id:p,courseName: f,courseNum: f,courseContent: f,creator: f,createTime: f,modifier: f,modifyTime: f,version: f,destroyed: f,userAttribute: f,students:new c("Student")}
ds.QI18nMessages = {id:p,key: f,localeId: f,message: f}
ds.QSysResourceRel = {resourceRelId:p,resourceId: f,parentResourceId: f,createdDtmLoc: f,updatedByUser: f,updatedDtmLoc: f,createdByUser: f}
ds.QUserAddTest = {id:p,username: f,password: f}
ds.QProduceMessage = {id:p,topic: f,msgId: f,message: f,retryTimes: f,status: f,createTime: f,createUser: f,updateTime: f,updateUser: f}
ds.QTimerVersion = {timerId:p,identifier: f,version: f,modifyTime: f}
ds.QSupportedLocale = {id:p,language: f,country: f,variant: f,display: f,state: f}
ds.QTeacher = {id:p,teacherName: f,teacherAge: f,studentId: f,creator: f,createTime: f,modifier: f,modifyTime: f,version: f,destroyed: f,userAttribute: f,sex: f,teacherGender: f}
ds.QStudent = {id:p,name: f,password: f,confirmPassword: f,sex: f,email: f,mobile: f,money: f,score: f,age: f,enrollment: f,birthday: f,teacherId: f,courseId: f,creator: f,createTime: f,modifier: f,modifyTime: f,version: f,address: f,destroyed: f,userAttribute: f,fileKey: f,teacherName: f,teacher:new c("Teacher")}
ds.QShop = {shopId:p,giftShop: f,version: f,address: f,buildTime: f}
ds.QEmployee = {employeeId:p,username: f,cname: f,password: f,age: f,sex: f,email: f,mobile: f,address: f,deptId: f,creator: f,createTime: f,modifier: f,birthDay: f,modifyTime: f,version: f,destroyed: f,principalGroupCode: f,dept:new c("Dept")}
ds.QAppNodes = {id:p,appName: f,nodeName: f,nodeNum: f}
ds.QOrderProcessingLog = {businessId:p,status: f}
ds.QStrictNumber = {id:p,numberKey: f,status: f,lastSn: f,createTime: f,updateTime: f}
ds.QAreaCode = {areaCodeId:p,areaCodeName: f}
ds.QScheduleAssignInfo = {id:p,supervisor: f,scheduleCode: f,createTime: f,updateTime: f}
ds.QSysAclColumn = {aclColumnId:p,aclTableId: f,columnName: f,remark: f,createTime: f,createrId: f,updateTime: f,updaterId: f}
ds.QOrderSource = {orderSourceId:p,sourceCode: f,channelId: f}
ds.QScheduleContext = {id:p,scheduleCode: f,workerServers: f,scheduleStatus: f,lastExecuteTime: f,nextExecuteTime: f,createTime: f,updateTime: f}
ds.QDictAreaInfo = {areaCode:p,areaFullName: f,areaShortName: f}
ds.QGtxTrans = {gtxTransId:p,transName: f,xid: f,identifier: f,participants: f,txStatus: f,txMode: f,txCreateTime: f,modifyTime: f,modifyTimeSec: f,tryCount: f}
ds.QStock = {stockId:p,customerId: f,skuId: f,stockCount: f}
ds.QConsumerGroup = {id:p,topic: f,groupName: f,consumerCount: f,consumerMode: f,messageMode: f,settings: f,createTime: f,createUser: f,updateTime: f,updateUser: f}
ds.QSysRoleUser = {roleUserId:p,roleId: f,userId: f,createTime: f,createrId: f,updateTime: f,updaterId: f}
ds.QWaybillRouteNode = {waybillRouteNodeId:p,waybillId: f,startingSiteName: f,arrivalSiteName: f,siteNum: f}
ds.QEmployeeZc = {id:p,name: f,gender: f,password: f,mobile: f,telephone: f,email: f,age: f,version: f,updateId: f,updateTime: f,departmentId: f}
ds.QWaybillInfo = {waybillId:p,collectEmployeeId: f,collectEmployeeCname: f,collectEmployeeMobile: f,collectDatetime: f,sendAreaCode: f,sendAddressDetail: f,shipperCname: f,shipperMobile: f,consigneeCname: f,consigneeMobile: f,productTypeCode: f,deliveryAreaCode: f,deliveryAddressDetail: f,estimateDeliveryTime: f,waybillFee:new c("WaybillFee")}
ds.QLooseNumber = {id:p,numberKey: f,lastSn: f,createTime: f,updateTime: f}
ds.QRuleNumberConfig = {id:p,expression: f,ruleName: f,ruleCode: f,resetType: f,controlType: f,initValue: f,maxValue: f,step: f,createTime: f,updateTime: f,groupName: f}
ds.QDept = {deptId:p,deptName: f,principalGroupCode: f,test: f,t2: f}
ds.QUserDeleteTest = {id:p,username: f,password: f}
ds.QPreOrder = {preOrderId:p,orderCode: f,sourceCode: f,skuCode: f,areaCode: f,customerCode: f,quantity: f,address: f,createTime: f,status: f,shardedNumber: f}
ds.QStudentNew = {id:p,name: f,password: f,confirmPassword: f,sex: f,email: f,mobile: f,money: f,score: f,age: f,enrollment: f,birthday: f,teacherId: f,courseId: f,creator: f,createTime: f,modifier: f,modifyTime: f,version: f,address: f}
ds.QUserImportTest = {id:p,username: f,password: f}
ds.QSysDepartment = {departmentId:p,departmentNo: f,departmentName: f,partnerId: f,createTime: f,createrId: f,contact: f,phone: f,fax: f,address: f,status: f}
ds.QDictAreaInfoBak = {areaCode:p,areaShortName: f,areaFullName: f}
ds.QSysRole = {roleId:p,roleName: f,createTime: f,createrId: f,partnerId: f,status: f,roleNo: f,remark: f,deleteFlag: f}
ds.QSysAclTable = {aclTableId:p,aclType: f,tableName: f,createTime: f,createrId: f,updateTime: f,updaterId: f,remarks: f,aclMode: f}
ds.QChildren = {id:p,childName: f,sex: f,giftId: f,giftCode: f,version: f,destroyed: f,creator: f,createTime: f,modifier: f,modifyTime: f,userAttribute: f,mobile: f,parentsMobile: f,phone: f,mailbox: f,age: f,schoolAge: f,englishName: f,enrollmentDate: f,graduationDate: f}
ds.QUemUser = {uemUserId:p,account: f,mobile: f,email: f,password: f,source: f,oriApplication: f,blindCompanny: f,blindCompannyTime: f,userType: f,isAgreemeent: f,isValid: f,invalidTime: f,score: f,wxId: f,qqId: f,gvmId: f,uemIdCardId: f,name: f,sex: f,idCard: f,isDisplayed: f,cardPositiveUrlId: f,cardBackUrlId: f,auditStatus: f,auditRemark: f,auditTime: f,auditor: f,creatorId: f,creatorName: f,createTime: f,modifierId: f,modifierName: f,modifyTime: f,recordVersion: f}
ds.QTopic = {id:p,mqName: f,topic: f,createTime: f,createUser: f,updateTime: f,updateUser: f}
ds.QUserUpdateTest = {id:p,username: f,password: f}
ds.QSysOfficeUser = {sysOfficeUserId:p,sysUserId: f,sysOfficeId: f,isDeleted: f,creatorId: f,creatorName: f,createTime: f,createCompanyId: f,createCompanyName: f,modifierId: f,modifierName: f,modifyTime: f,modifyCompanyId: f,modifyCompanyName: f,recordVersion: f}
ds.QSysRoleAcl = {roleAclId:p,roleId: f,aclTableId: f,conditions: f,conditionsSql: f,crudType: f}
ds.QPeople = {testId:p,testName: f,testAge: f}
ds.QScheduleLog = {id:p,triggerId: f,scheduleId: f,status: f,shard: f,workerNode: f,supervisor: f,startTime: f,endTime: f,consumingTime: f,description: f,createTime: f,updateTime: f}
ds.QDepartmentZc = {departmentId:p,departmentName: f,departmentManager: f}
ds.QSysOffice = {sysOfficeId:p,officeCode: f,officeName: f,officeType: f,parentOfficeId: f,parentOfficeCode: f,parentOfficeName: f,isValid: f,remark: f,isDeleted: f,creatorId: f,creatorName: f,createTime: f,createCompanyId: f,createCompanyName: f,modifierId: f,modifierName: f,modifyTime: f,modifyCompanyId: f,modifyCompanyName: f,recordVersion: f}
ds.QGift = {id:p,giftName: f,giftCode: f,productionYear: f,shopId: f,version: f,destroyed: f,creator: f,createTime: f,modifier: f,modifyTime: f,userAttribute: f}
ds.QUserSelectTest = {id:p,username: f,password: f}
ds.QImportConfig = {id:p,className: f,template: f,dictionaryUrl: f,dealService: f,methodName: f,validateHead: f,validateMethod: f,async: f,allowParameter: f,primaryColumns: f,defineColumn: f,childrenTable: f}
ds.QDictProductType = {productCode:p,productName: f,productType: f,productPrice: f}
ds.QChangeLog = {id:p,dataSourceId: f,modelName: f,sqlStmt: f,changeData: f,operator: f,operateTime: f}
ds.QSysResource = {resourceId:p,url: f,urlLx: f,urlImg: f,urlLevel: f,urlSeq: f,urlTitle: f,status: f,createdDtmLoc: f,createdTimeZone: f,updatedByUser: f,updatedDtmLoc: f,updatedTimeZone: f,displayOrder: f,createdByUser: f}
ds.QOrderList = {orderId:p,orderCode: f,orderSourceId: f,skuId: f,customerId: f,areaCode: f,quantity: f,address: f,createTime: f,agingTime: f,status: f}
ds.QSku = {skuId:p,customerId: f,skuCode: f}
}(window));
// @formatter:on
