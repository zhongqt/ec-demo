// @formatter:off

import ModelExpression = ds.ModelExpression;
import DaoServiceClient = ds.DaoServiceClient;
import FieldExpression = ds.FieldExpression;
import ${queryModel.modelName} = ds.${queryModel.modelName};


declare class QWbsWaybillInfo extends ModelExpression<WbsWaybillInfo, number> {
        /** 运单号 */
        waybillId: FieldExpression<number>;
        /** 揽收员工编号 */
        collectEmployeeId: FieldExpression<number>;
        /** 揽件人姓名 */
        consigneeName: FieldExpression<string>;
        /** 揽件人手机 */
        collectEmployeeMobile: FieldExpression<string>;
        /** 采购日期 */
        collectDatetime: FieldExpression<string>;
        /** 发货地区编号 */
        sendAreaCode: FieldExpression<string>;
        /** 发货人详址 */
        sendAddressDetail: FieldExpression<string>;
        /** 发货人中文姓名 */
        shipperCname: FieldExpression<string>;
        /** 发货人手机号码 */
        shipperMobile: FieldExpression<string>;
        /** 收货人姓名 */
        consigneeCname: FieldExpression<string>;
        /** 收货人手机号码 */
        consigneeMobile: FieldExpression<string>;
        /** 货物类型编号 */
        productTypeCode: FieldExpression<string>;
        /** 收货地区编号 */
        deliveryAreaCode: FieldExpression<string>;
        /** 收货地址详情 */
        deliveryAddressDetail: FieldExpression<string>;
        estimateDeliveryTime: FieldExpression<string>;
        lastModifyTime: FieldExpression<string>;
        principalGroupCode: FieldExpression<number>;
        using(client: DaoServiceClient): QWbsWaybillInfo;
}

declare class QSysUser extends ModelExpression<SysUser, number> {
        /** 用户Id */
        userId: FieldExpression<number>;
        /** 密码 */
        password: FieldExpression<string>;
        /** 所属合作伙伴Id */
        partnerId: FieldExpression<number>;
        /** 用户类型(1:平台用户 2:承运商用户 3:客户) */
        userType: FieldExpression<number>;
        /** 创建时间 */
        createTime: FieldExpression<string>;
        /** 状态（1:启用，0：禁用） */
        status: FieldExpression<number>;
        /** 昵称 */
        nickName: FieldExpression<string>;
        /** 创建人 */
        createrId: FieldExpression<number>;
        /** 手机号 */
        mobile: FieldExpression<string>;
        /** 删除，0：未删除，1：已删除 */
        deleteFlg: FieldExpression<number>;
        /** 部门id */
        departmentId: FieldExpression<number>;
        /** 用户姓名 */
        userFullName: FieldExpression<string>;
        /** email */
        email: FieldExpression<string>;
        /** 员工编号 */
        userNo: FieldExpression<string>;
        /** 备注 */
        remark: FieldExpression<string>;
        /** 公司名称 */
        companyName: FieldExpression<string>;
        /** 公司地址 */
        companyAddress: FieldExpression<string>;
        roleId: FieldExpression<string>;
        sex: FieldExpression<string>;
        version: FieldExpression<string>;
        age: FieldExpression<number>;
        /** 用户名 */
        username: FieldExpression<string>;
        using(client: DaoServiceClient): QSysUser;
}

declare class QCustomer extends ModelExpression<Customer, number> {
        /** 主键 */
        customerId: FieldExpression<number>;
        /** 客户代码 */
        customerCode: FieldExpression<string>;
        /** 通道ID */
        channelId: FieldExpression<number>;
        using(client: DaoServiceClient): QCustomer;
}

declare class QUserExportTest extends ModelExpression<UserExportTest, number> {
        id: FieldExpression<number>;
        username: FieldExpression<string>;
        password: FieldExpression<string>;
        using(client: DaoServiceClient): QUserExportTest;
}

declare class QFsFileInfo extends ModelExpression<FsFileInfo, string> {
        fileKey: FieldExpression<string>;
        name: FieldExpression<string>;
        url: FieldExpression<string>;
        etag: FieldExpression<string>;
        byteSize: FieldExpression<number>;
        uploaderStrategyId: FieldExpression<string>;
        largeThumbnailUrl: FieldExpression<string>;
        largeThumbnailEtag: FieldExpression<string>;
        smallThumbnailUrl: FieldExpression<string>;
        smallThumbnailEtag: FieldExpression<string>;
        using(client: DaoServiceClient): QFsFileInfo;
}

declare class QWorkerInfo extends ModelExpression<WorkerInfo, number> {
        id: FieldExpression<number>;
        workerNode: FieldExpression<string>;
        createTime: FieldExpression<string>;
        updateTime: FieldExpression<string>;
        using(client: DaoServiceClient): QWorkerInfo;
}

declare class QIdempotentRecord extends ModelExpression<IdempotentRecord, number> {
        id: FieldExpression<number>;
        consumerGroup: FieldExpression<string>;
        msgId: FieldExpression<string>;
        using(client: DaoServiceClient): QIdempotentRecord;
}

declare class QSysGridLayout extends ModelExpression<SysGridLayout, string> {
        /** 布局Id */
        sysGridLayoutId: FieldExpression<string>;
        /** 用户标识Id */
        userId: FieldExpression<number>;
        /** 用户角色标识id */
        roleId: FieldExpression<number>;
        /** 表唯一标识 */
        tableId: FieldExpression<string>;
        /** 表格布局 */
        content: FieldExpression<string>;
        /** 布局名称 */
        name: FieldExpression<string>;
        /** 最后修改时间 */
        modifyTime: FieldExpression<string>;
        using(client: DaoServiceClient): QSysGridLayout;
}

declare class QFsUploaderStrategy extends ModelExpression<FsUploaderStrategy, string> {
        id: FieldExpression<string>;
        bucketName: FieldExpression<string>;
        allowExtensions: FieldExpression<string>;
        sizeLimit: FieldExpression<number>;
        countLimit: FieldExpression<number>;
        isLogicDelete: FieldExpression<number>;
        largeThumbnailSize: FieldExpression<string>;
        smallThumbnailSize: FieldExpression<string>;
        using(client: DaoServiceClient): QFsUploaderStrategy;
}

declare class QDepartment extends ModelExpression<Department, number> {
        departmentId: FieldExpression<number>;
        departmentName: FieldExpression<string>;
        departmentManager: FieldExpression<string>;
        using(client: DaoServiceClient): QDepartment;
}

declare class QSysRoleResource extends ModelExpression<SysRoleResource, number> {
        roleResourcesId: FieldExpression<number>;
        resourceId: FieldExpression<number>;
        roleId: FieldExpression<number>;
        /** 0未删除，1已删除 */
        deleteFlg: FieldExpression<number>;
        createrId: FieldExpression<number>;
        createTime: FieldExpression<string>;
        updateTime: FieldExpression<string>;
        updaterId: FieldExpression<number>;
        using(client: DaoServiceClient): QSysRoleResource;
}

declare class QWaybillFee extends ModelExpression<WaybillFee, number> {
        /** 运单编号 */
        waybillId: FieldExpression<number>;
        /** 总运费 */
        totalFreight: FieldExpression<number & string>;
        /** 保价费 */
        insuranceFee: FieldExpression<number & string>;
        /** 重量 */
        weight: FieldExpression<number & string>;
        /** 货物体积 */
        volume: FieldExpression<number & string>;
        using(client: DaoServiceClient): QWaybillFee;
}

declare class QExportConfig extends ModelExpression<ExportConfig, string> {
        id: FieldExpression<string>;
        printMode: FieldExpression<boolean>;
        template: FieldExpression<any>;
        async: FieldExpression<boolean>;
        dictionaryUrl: FieldExpression<string>;
        fileName: FieldExpression<string>;
        pageSize: FieldExpression<number>;
        className: FieldExpression<string>;
        sourceUrl: FieldExpression<string>;
        statisticsUrl: FieldExpression<string>;
        columnSetting: FieldExpression<string>;
        using(client: DaoServiceClient): QExportConfig;
}

declare class QFailureMessage extends ModelExpression<FailureMessage, number> {
        id: FieldExpression<number>;
        msgId: FieldExpression<string>;
        retryTimes: FieldExpression<number>;
        node: FieldExpression<string>;
        topic: FieldExpression<string>;
        tags: FieldExpression<string>;
        groupName: FieldExpression<string>;
        mqName: FieldExpression<string>;
        exception: FieldExpression<string>;
        message: FieldExpression<string>;
        messageKey: FieldExpression<string>;
        state: FieldExpression<boolean>;
        consumeTime: FieldExpression<string>;
        createTime: FieldExpression<string>;
        createUser: FieldExpression<string>;
        updateTime: FieldExpression<string>;
        updateUser: FieldExpression<string>;
        using(client: DaoServiceClient): QFailureMessage;
}

declare class QJob extends ModelExpression<Job, number> {
        id: FieldExpression<number>;
        scheduleCode: FieldExpression<string>;
        cron: FieldExpression<string>;
        threadType: FieldExpression<boolean>;
        scheduleType: FieldExpression<boolean>;
        shardCount: FieldExpression<number>;
        timeout: FieldExpression<number>;
        enabled: FieldExpression<boolean>;
        description: FieldExpression<string>;
        createTime: FieldExpression<string>;
        updateTime: FieldExpression<string>;
        using(client: DaoServiceClient): QJob;
}

declare class QCourse extends ModelExpression<Course, number> {
        /** ID */
        id: FieldExpression<number>;
        /** 课程名称 */
        courseName: FieldExpression<string>;
        /** 课程节数 */
        courseNum: FieldExpression<number>;
        /** 课程内容 */
        courseContent: FieldExpression<string>;
        /** 创建人 */
        creator: FieldExpression<string>;
        /** 创建时间 */
        createTime: FieldExpression<string>;
        /** 修改人 */
        modifier: FieldExpression<string>;
        /** 修改时间 */
        modifyTime: FieldExpression<string>;
        /** 乐观锁版本号 */
        version: FieldExpression<number>;
        /** 是否逻辑删除 */
        destroyed: FieldExpression<boolean>;
        /** 用户属性字段 */
        userAttribute: FieldExpression<string>;
        students: QStudent;
        using(client: DaoServiceClient): QCourse;
}

declare class QI18nMessages extends ModelExpression<I18nMessages, number> {
        id: FieldExpression<number>;
        key: FieldExpression<string>;
        localeId: FieldExpression<number>;
        message: FieldExpression<string>;
        using(client: DaoServiceClient): QI18nMessages;
}

declare class QSysResourceRel extends ModelExpression<SysResourceRel, number> {
        resourceRelId: FieldExpression<number>;
        resourceId: FieldExpression<number>;
        parentResourceId: FieldExpression<number>;
        createdDtmLoc: FieldExpression<string>;
        updatedByUser: FieldExpression<string>;
        updatedDtmLoc: FieldExpression<string>;
        createdByUser: FieldExpression<number>;
        using(client: DaoServiceClient): QSysResourceRel;
}

declare class QUserAddTest extends ModelExpression<UserAddTest, number> {
        id: FieldExpression<number>;
        username: FieldExpression<string>;
        password: FieldExpression<string>;
        using(client: DaoServiceClient): QUserAddTest;
}

declare class QProduceMessage extends ModelExpression<ProduceMessage, number> {
        id: FieldExpression<number>;
        topic: FieldExpression<string>;
        msgId: FieldExpression<string>;
        message: FieldExpression<any>;
        retryTimes: FieldExpression<number>;
        status: FieldExpression<boolean>;
        createTime: FieldExpression<string>;
        createUser: FieldExpression<string>;
        updateTime: FieldExpression<string>;
        updateUser: FieldExpression<string>;
        using(client: DaoServiceClient): QProduceMessage;
}

declare class QTimerVersion extends ModelExpression<TimerVersion, number> {
        /** 定时器id */
        timerId: FieldExpression<number>;
        /** 当前实例标识 */
        identifier: FieldExpression<string>;
        /** 定时器版本， 当前时间／定时间隔 */
        version: FieldExpression<number>;
        /** 修改时间 */
        modifyTime: FieldExpression<string>;
        using(client: DaoServiceClient): QTimerVersion;
}

declare class QSupportedLocale extends ModelExpression<SupportedLocale, number> {
        id: FieldExpression<number>;
        /** 语言 */
        language: FieldExpression<string>;
        /** 地区/国家 */
        country: FieldExpression<string>;
        /** 变量 */
        variant: FieldExpression<string>;
        display: FieldExpression<string>;
        state: FieldExpression<string>;
        using(client: DaoServiceClient): QSupportedLocale;
}

declare class QTeacher extends ModelExpression<Teacher, number> {
        /** ID */
        id: FieldExpression<number>;
        /** 教师名称 */
        teacherName: FieldExpression<string>;
        /** 教师年龄 */
        teacherAge: FieldExpression<number>;
        /** 学生id */
        studentId: FieldExpression<number>;
        /** 创建人 */
        creator: FieldExpression<string>;
        /** 创建时间 */
        createTime: FieldExpression<string>;
        /** 修改人 */
        modifier: FieldExpression<string>;
        /** 修改时间 */
        modifyTime: FieldExpression<string>;
        /** 乐观锁版本号 */
        version: FieldExpression<number>;
        /** 是否逻辑删除 */
        destroyed: FieldExpression<boolean>;
        /** 用户属性字段 */
        userAttribute: FieldExpression<string>;
        /** 性别 */
        sex: FieldExpression<string>;
        teacherGender: FieldExpression<string>;
        using(client: DaoServiceClient): QTeacher;
}

declare class QStudent extends ModelExpression<Student, number> {
        /** 学生id */
        id: FieldExpression<number>;
        /** 学生姓名 */
        name: FieldExpression<string>;
        /** 密码 */
        password: FieldExpression<string>;
        /** 确认密码 */
        confirmPassword: FieldExpression<string>;
        /** 学生性别 */
        sex: FieldExpression<number>;
        /** 邮箱 */
        email: FieldExpression<string>;
        /** 移动电话 */
        mobile: FieldExpression<string>;
        /** 学费 */
        money: FieldExpression<number & string>;
        /** 分数 */
        score: FieldExpression<number>;
        /** 学生年龄 */
        age: FieldExpression<number>;
        /** 入学日期 */
        enrollment: FieldExpression<string>;
        /** 出生日期 */
        birthday: FieldExpression<string>;
        /** 老师ID */
        teacherId: FieldExpression<number>;
        /** 课程ID */
        courseId: FieldExpression<number>;
        /** 创建人 */
        creator: FieldExpression<string>;
        /** 创建时间 */
        createTime: FieldExpression<string>;
        /** 修改人 */
        modifier: FieldExpression<string>;
        /** 修改时间 */
        modifyTime: FieldExpression<string>;
        /** 乐观锁 */
        version: FieldExpression<number>;
        /** 籍贯 */
        address: FieldExpression<string>;
        /** 逻辑删除 */
        destroyed: FieldExpression<boolean>;
        /** 用户属性字段 */
        userAttribute: FieldExpression<string>;
        fileKey: FieldExpression<string>;
        teacherName: FieldExpression<string>;
        teacher: QTeacher;
        using(client: DaoServiceClient): QStudent;
}

declare class QShop extends ModelExpression<Shop, number> {
        /** 礼物店id */
        shopId: FieldExpression<number>;
        /** 礼物店名 */
        giftShop: FieldExpression<string>;
        /** 乐观锁版本号 */
        version: FieldExpression<number>;
        /** 地址 */
        address: FieldExpression<string>;
        buildTime: FieldExpression<string>;
        using(client: DaoServiceClient): QShop;
}

declare class QEmployee extends ModelExpression<Employee, number> {
        /** 员工主键 */
        employeeId: FieldExpression<number>;
        /** 员工用户名 */
        username: FieldExpression<string>;
        /** 员工中文名称 */
        cname: FieldExpression<string>;
        /** 密码 */
        password: FieldExpression<string>;
        /** 年龄 */
        age: FieldExpression<number>;
        /** 性别 */
        sex: FieldExpression<boolean>;
        /** 邮箱 */
        email: FieldExpression<string>;
        /** 手机号码 */
        mobile: FieldExpression<string>;
        /** 地址 */
        address: FieldExpression<string>;
        /** 从属部门编号 */
        deptId: FieldExpression<number>;
        /** 创建人编号 */
        creator: FieldExpression<string>;
        createTime: FieldExpression<string>;
        /** 修改人编号 */
        modifier: FieldExpression<string>;
        birthDay: FieldExpression<string>;
        /** 创建时间 */
        modifyTime: FieldExpression<string>;
        /** 乐观锁版本 */
        version: FieldExpression<number>;
        /** 删除标记 */
        destroyed: FieldExpression<boolean>;
        /** 组织编号 */
        principalGroupCode: FieldExpression<string>;
        dept: QDept;
        using(client: DaoServiceClient): QEmployee;
}

declare class QAppNodes extends ModelExpression<AppNodes, number> {
        id: FieldExpression<number>;
        appName: FieldExpression<string>;
        nodeName: FieldExpression<string>;
        nodeNum: FieldExpression<number>;
        using(client: DaoServiceClient): QAppNodes;
}

declare class QOrderProcessingLog extends ModelExpression<OrderProcessingLog, number> {
        businessId: FieldExpression<number>;
        status: FieldExpression<number>;
        using(client: DaoServiceClient): QOrderProcessingLog;
}

declare class QStrictNumber extends ModelExpression<StrictNumber, number> {
        id: FieldExpression<number>;
        numberKey: FieldExpression<string>;
        status: FieldExpression<number>;
        lastSn: FieldExpression<number>;
        createTime: FieldExpression<string>;
        updateTime: FieldExpression<string>;
        using(client: DaoServiceClient): QStrictNumber;
}

declare class QAreaCode extends ModelExpression<AreaCode, number> {
        /** 区域id */
        areaCodeId: FieldExpression<number>;
        /** 区域名 */
        areaCodeName: FieldExpression<string>;
        using(client: DaoServiceClient): QAreaCode;
}

declare class QScheduleAssignInfo extends ModelExpression<ScheduleAssignInfo, number> {
        id: FieldExpression<number>;
        supervisor: FieldExpression<string>;
        scheduleCode: FieldExpression<string>;
        createTime: FieldExpression<string>;
        updateTime: FieldExpression<string>;
        using(client: DaoServiceClient): QScheduleAssignInfo;
}

declare class QSysAclColumn extends ModelExpression<SysAclColumn, number> {
        aclColumnId: FieldExpression<number>;
        aclTableId: FieldExpression<number>;
        columnName: FieldExpression<string>;
        remark: FieldExpression<string>;
        createTime: FieldExpression<string>;
        createrId: FieldExpression<number>;
        updateTime: FieldExpression<string>;
        updaterId: FieldExpression<number>;
        using(client: DaoServiceClient): QSysAclColumn;
}

declare class QOrderSource extends ModelExpression<OrderSource, number> {
        /** 主键 */
        orderSourceId: FieldExpression<number>;
        /** 来源code */
        sourceCode: FieldExpression<string>;
        /** 来源通道ID */
        channelId: FieldExpression<number>;
        using(client: DaoServiceClient): QOrderSource;
}

declare class QScheduleContext extends ModelExpression<ScheduleContext, number> {
        id: FieldExpression<number>;
        scheduleCode: FieldExpression<string>;
        workerServers: FieldExpression<string>;
        scheduleStatus: FieldExpression<boolean>;
        lastExecuteTime: FieldExpression<string>;
        nextExecuteTime: FieldExpression<string>;
        createTime: FieldExpression<string>;
        updateTime: FieldExpression<string>;
        using(client: DaoServiceClient): QScheduleContext;
}

declare class QDictAreaInfo extends ModelExpression<DictAreaInfo, string> {
        areaCode: FieldExpression<string>;
        areaFullName: FieldExpression<string>;
        areaShortName: FieldExpression<string>;
        using(client: DaoServiceClient): QDictAreaInfo;
}

declare class QGtxTrans extends ModelExpression<GtxTrans, number> {
        /** 主键 */
        gtxTransId: FieldExpression<number>;
        /** 事务名称 */
        transName: FieldExpression<string>;
        /** 事务ID，全局唯一 */
        xid: FieldExpression<string>;
        /** 当前实例标识 */
        identifier: FieldExpression<string>;
        participants: FieldExpression<string>;
        /** 事务状态 */
        txStatus: FieldExpression<number>;
        txMode: FieldExpression<number>;
        /** 事务创建时间 */
        txCreateTime: FieldExpression<string>;
        /** 修改时间 */
        modifyTime: FieldExpression<string>;
        modifyTimeSec: FieldExpression<number>;
        /** 恢复次数 */
        tryCount: FieldExpression<number>;
        using(client: DaoServiceClient): QGtxTrans;
}

declare class QStock extends ModelExpression<Stock, number> {
        /** 主键 */
        stockId: FieldExpression<number>;
        /** 客户id */
        customerId: FieldExpression<number>;
        /** Sku_id */
        skuId: FieldExpression<number>;
        /** 库存数量 */
        stockCount: FieldExpression<number>;
        using(client: DaoServiceClient): QStock;
}

declare class QConsumerGroup extends ModelExpression<ConsumerGroup, number> {
        id: FieldExpression<number>;
        topic: FieldExpression<string>;
        groupName: FieldExpression<string>;
        consumerCount: FieldExpression<number>;
        consumerMode: FieldExpression<string>;
        messageMode: FieldExpression<string>;
        settings: FieldExpression<string>;
        createTime: FieldExpression<string>;
        createUser: FieldExpression<string>;
        updateTime: FieldExpression<string>;
        updateUser: FieldExpression<string>;
        using(client: DaoServiceClient): QConsumerGroup;
}

declare class QSysRoleUser extends ModelExpression<SysRoleUser, number> {
        roleUserId: FieldExpression<number>;
        roleId: FieldExpression<number>;
        userId: FieldExpression<number>;
        createTime: FieldExpression<string>;
        createrId: FieldExpression<number>;
        updateTime: FieldExpression<string>;
        updaterId: FieldExpression<number>;
        using(client: DaoServiceClient): QSysRoleUser;
}

declare class QWaybillRouteNode extends ModelExpression<WaybillRouteNode, number> {
        /** 路由节点编号 */
        waybillRouteNodeId: FieldExpression<number>;
        /** 运单编号 */
        waybillId: FieldExpression<number>;
        /** 路由节点开始物流站点名称 */
        startingSiteName: FieldExpression<string>;
        /** 路由节点到达站点名称 */
        arrivalSiteName: FieldExpression<string>;
        /** 节点在路由中的序号 */
        siteNum: FieldExpression<number>;
        using(client: DaoServiceClient): QWaybillRouteNode;
}

declare class QEmployeeZc extends ModelExpression<EmployeeZc, number> {
        id: FieldExpression<number>;
        name: FieldExpression<string>;
        gender: FieldExpression<number>;
        password: FieldExpression<string>;
        mobile: FieldExpression<string>;
        telephone: FieldExpression<string>;
        email: FieldExpression<string>;
        age: FieldExpression<number>;
        version: FieldExpression<number>;
        updateId: FieldExpression<string>;
        updateTime: FieldExpression<string>;
        departmentId: FieldExpression<string>;
        using(client: DaoServiceClient): QEmployeeZc;
}

declare class QWaybillInfo extends ModelExpression<WaybillInfo, number> {
        /** 运单号 */
        waybillId: FieldExpression<number>;
        /** 揽收员工编号 */
        collectEmployeeId: FieldExpression<number>;
        /** 录入员工姓名 */
        collectEmployeeCname: FieldExpression<string>;
        /** 录入员工手机 */
        collectEmployeeMobile: FieldExpression<string>;
        /** 采购日期 */
        collectDatetime: FieldExpression<string>;
        /** 发货地区编号 */
        sendAreaCode: FieldExpression<string>;
        /** 发货人详址 */
        sendAddressDetail: FieldExpression<string>;
        /** 发货人中文姓名 */
        shipperCname: FieldExpression<string>;
        /** 发货人手机号码 */
        shipperMobile: FieldExpression<string>;
        /** 收货人姓名 */
        consigneeCname: FieldExpression<string>;
        /** 收货人手机号码 */
        consigneeMobile: FieldExpression<string>;
        /** 货物类型编号 */
        productTypeCode: FieldExpression<string>;
        /** 收货地区编号 */
        deliveryAreaCode: FieldExpression<string>;
        /** 收货地址详情 */
        deliveryAddressDetail: FieldExpression<string>;
        estimateDeliveryTime: FieldExpression<string>;
        waybillFee: QWaybillFee;
        using(client: DaoServiceClient): QWaybillInfo;
}

declare class QLooseNumber extends ModelExpression<LooseNumber, number> {
        id: FieldExpression<number>;
        numberKey: FieldExpression<string>;
        lastSn: FieldExpression<number>;
        createTime: FieldExpression<string>;
        updateTime: FieldExpression<string>;
        using(client: DaoServiceClient): QLooseNumber;
}

declare class QRuleNumberConfig extends ModelExpression<RuleNumberConfig, number> {
        id: FieldExpression<number>;
        /** 表达式 */
        expression: FieldExpression<string>;
        /** 单号规则名 */
        ruleName: FieldExpression<string>;
        /** 单号规则编码 */
        ruleCode: FieldExpression<string>;
        /** 重置类型 */
        resetType: FieldExpression<number>;
        /** 单号类型 */
        controlType: FieldExpression<number>;
        /** 初始值 */
        initValue: FieldExpression<number>;
        /** 最大值 */
        maxValue: FieldExpression<number>;
        /** 步长 */
        step: FieldExpression<number>;
        createTime: FieldExpression<string>;
        updateTime: FieldExpression<string>;
        /** 所属组织 */
        groupName: FieldExpression<string>;
        using(client: DaoServiceClient): QRuleNumberConfig;
}

declare class QDept extends ModelExpression<Dept, number> {
        deptId: FieldExpression<number>;
        deptName: FieldExpression<string>;
        principalGroupCode: FieldExpression<string>;
        test: FieldExpression<string>;
        t2: FieldExpression<string>;
        using(client: DaoServiceClient): QDept;
}

declare class QUserDeleteTest extends ModelExpression<UserDeleteTest, number> {
        id: FieldExpression<number>;
        username: FieldExpression<string>;
        password: FieldExpression<string>;
        using(client: DaoServiceClient): QUserDeleteTest;
}

declare class QPreOrder extends ModelExpression<PreOrder, number> {
        /** 主键 */
        preOrderId: FieldExpression<number>;
        /** 订单号：生成规则为：来源code+yyyyMMdd+SN:6 */
        orderCode: FieldExpression<string>;
        /** 来源 */
        sourceCode: FieldExpression<string>;
        /** sku代码 */
        skuCode: FieldExpression<string>;
        /** 区域代码 */
        areaCode: FieldExpression<string>;
        /** 客户代码 */
        customerCode: FieldExpression<string>;
        /** 货品数量 */
        quantity: FieldExpression<number>;
        /** 送货地址 */
        address: FieldExpression<string>;
        /** 创建时间 */
        createTime: FieldExpression<string>;
        /** 状态：未处理=1，处理完成=2，处理失败=3，库存扣减中=4 */
        status: FieldExpression<number>;
        /** 处理定时任务的分区号 */
        shardedNumber: FieldExpression<number>;
        using(client: DaoServiceClient): QPreOrder;
}

declare class QStudentNew extends ModelExpression<StudentNew, number> {
        /** 学生id */
        id: FieldExpression<number>;
        /** 学生姓名 */
        name: FieldExpression<string>;
        /** 密码 */
        password: FieldExpression<string>;
        /** 确认密码 */
        confirmPassword: FieldExpression<string>;
        /** 学生性别 */
        sex: FieldExpression<string>;
        /** 邮箱 */
        email: FieldExpression<string>;
        /** 移动电话 */
        mobile: FieldExpression<string>;
        /** 学费 */
        money: FieldExpression<number>;
        /** 分数 */
        score: FieldExpression<number>;
        /** 学生年龄 */
        age: FieldExpression<number>;
        /** 入学日期 */
        enrollment: FieldExpression<string>;
        /** 出生日期 */
        birthday: FieldExpression<string>;
        /** 老师ID */
        teacherId: FieldExpression<number>;
        /** 课程ID */
        courseId: FieldExpression<number>;
        /** 创建人 */
        creator: FieldExpression<string>;
        /** 创建时间 */
        createTime: FieldExpression<string>;
        /** 修改人 */
        modifier: FieldExpression<string>;
        /** 修改时间 */
        modifyTime: FieldExpression<string>;
        /** 乐观锁 */
        version: FieldExpression<number>;
        address: FieldExpression<string>;
        using(client: DaoServiceClient): QStudentNew;
}

declare class QUserImportTest extends ModelExpression<UserImportTest, number> {
        id: FieldExpression<number>;
        username: FieldExpression<string>;
        password: FieldExpression<string>;
        using(client: DaoServiceClient): QUserImportTest;
}

declare class QSysDepartment extends ModelExpression<SysDepartment, number> {
        /** 部门id */
        departmentId: FieldExpression<number>;
        departmentNo: FieldExpression<string>;
        /** 部门名称 */
        departmentName: FieldExpression<string>;
        /** 合作伙伴Id */
        partnerId: FieldExpression<number>;
        /** 创建时间 */
        createTime: FieldExpression<string>;
        /** 创建人 */
        createrId: FieldExpression<number>;
        contact: FieldExpression<string>;
        phone: FieldExpression<number>;
        fax: FieldExpression<number>;
        address: FieldExpression<string>;
        /** 状态1:启用，0：停用 */
        status: FieldExpression<number>;
        using(client: DaoServiceClient): QSysDepartment;
}

declare class QDictAreaInfoBak extends ModelExpression<DictAreaInfoBak, string> {
        /** 地区编号 */
        areaCode: FieldExpression<string>;
        /** 地区名称(简单) */
        areaShortName: FieldExpression<string>;
        /** 地区名称(全称) */
        areaFullName: FieldExpression<string>;
        using(client: DaoServiceClient): QDictAreaInfoBak;
}

declare class QSysRole extends ModelExpression<SysRole, number> {
        roleId: FieldExpression<number>;
        roleName: FieldExpression<string>;
        createTime: FieldExpression<string>;
        createrId: FieldExpression<number>;
        partnerId: FieldExpression<number>;
        /** 状态：1启用，0停用 */
        status: FieldExpression<number>;
        roleNo: FieldExpression<string>;
        remark: FieldExpression<string>;
        /** 删除，0：未删除，1：已删除 */
        deleteFlag: FieldExpression<number>;
        using(client: DaoServiceClient): QSysRole;
}

declare class QSysAclTable extends ModelExpression<SysAclTable, number> {
        aclTableId: FieldExpression<number>;
        aclType: FieldExpression<number>;
        tableName: FieldExpression<string>;
        createTime: FieldExpression<string>;
        createrId: FieldExpression<number>;
        updateTime: FieldExpression<string>;
        updaterId: FieldExpression<number>;
        remarks: FieldExpression<string>;
        aclMode: FieldExpression<string>;
        using(client: DaoServiceClient): QSysAclTable;
}

declare class QChildren extends ModelExpression<Children, number> {
        /** 孩子编号 */
        id: FieldExpression<number>;
        /** 孩子名称 */
        childName: FieldExpression<string>;
        /** 孩子性别 */
        sex: FieldExpression<boolean>;
        /** 礼物id */
        giftId: FieldExpression<number>;
        /** 礼品编号 */
        giftCode: FieldExpression<string>;
        /** 乐观锁版本号 */
        version: FieldExpression<number>;
        /** 是否逻辑删除 */
        destroyed: FieldExpression<boolean>;
        /** 创建人 */
        creator: FieldExpression<string>;
        /** 创建时间 */
        createTime: FieldExpression<string>;
        /** 修改人 */
        modifier: FieldExpression<string>;
        /** 修改时间 */
        modifyTime: FieldExpression<string>;
        /** 用户属性字段 */
        userAttribute: FieldExpression<string>;
        /** 手机号，与parents_mobile保持一致 */
        mobile: FieldExpression<string>;
        /** 父母的手机联系方式，与mobile保持一致 */
        parentsMobile: FieldExpression<string>;
        /** 固定电话 */
        phone: FieldExpression<string>;
        /** 邮箱 */
        mailbox: FieldExpression<string>;
        /** 年龄 */
        age: FieldExpression<number>;
        /** 学龄 */
        schoolAge: FieldExpression<number>;
        /** 英文名字 */
        englishName: FieldExpression<string>;
        /** 幼儿园入学日期 */
        enrollmentDate: FieldExpression<string>;
        /** 幼儿园毕业日期 */
        graduationDate: FieldExpression<string>;
        using(client: DaoServiceClient): QChildren;
}

declare class QUemUser extends ModelExpression<UemUser, number> {
        /** id */
        uemUserId: FieldExpression<number>;
        /** 用户名 */
        account: FieldExpression<string>;
        /** 手机号 */
        mobile: FieldExpression<string>;
        /** 邮箱 */
        email: FieldExpression<string>;
        /** 密码 */
        password: FieldExpression<string>;
        /** 用户来源 */
        source: FieldExpression<string>;
        /** 来源应用 */
        oriApplication: FieldExpression<number>;
        /** 绑定企业 */
        blindCompanny: FieldExpression<number>;
        /** 绑定企业时间 */
        blindCompannyTime: FieldExpression<string>;
        /** 用户类型（0-普通用户，1-企业用户，2-企业管理员） */
        userType: FieldExpression<string>;
        /** 是否同意协议(0不同意，1同意) */
        isAgreemeent: FieldExpression<boolean>;
        /** 是否禁用(0禁用,1启用) */
        isValid: FieldExpression<boolean>;
        /** 启/禁用时间 */
        invalidTime: FieldExpression<string>;
        /** 用户评分 */
        score: FieldExpression<number>;
        /** 微信绑定ID */
        wxId: FieldExpression<string>;
        /** QQ绑定ID */
        qqId: FieldExpression<string>;
        /** 政务账号绑定ID */
        gvmId: FieldExpression<string>;
        /** 实名信息ID */
        uemIdCardId: FieldExpression<number>;
        /** 姓名 */
        name: FieldExpression<string>;
        /** 性别（0男，1女） */
        sex: FieldExpression<boolean>;
        /** 身份证号码 */
        idCard: FieldExpression<string>;
        /** 是否显示（0显示，1隐藏） */
        isDisplayed: FieldExpression<boolean>;
        /** 身份证正面图片地址id */
        cardPositiveUrlId: FieldExpression<string>;
        /** 身份证反面图片地址id */
        cardBackUrlId: FieldExpression<string>;
        /** 审批状态（0待审批，1审批通过，2审批失败） */
        auditStatus: FieldExpression<string>;
        /** 审批备注 */
        auditRemark: FieldExpression<string>;
        /** 审批时间 */
        auditTime: FieldExpression<string>;
        /** 审批客服 */
        auditor: FieldExpression<number>;
        /** 创建人id */
        creatorId: FieldExpression<number>;
        /** 创建人名称 */
        creatorName: FieldExpression<string>;
        /** 创建时间 */
        createTime: FieldExpression<string>;
        /** 修改人id */
        modifierId: FieldExpression<number>;
        /** 修改人名称 */
        modifierName: FieldExpression<string>;
        /** 修改时间 */
        modifyTime: FieldExpression<string>;
        /** 版本号 */
        recordVersion: FieldExpression<number>;
        using(client: DaoServiceClient): QUemUser;
}

declare class QTopic extends ModelExpression<Topic, number> {
        id: FieldExpression<number>;
        mqName: FieldExpression<string>;
        topic: FieldExpression<string>;
        createTime: FieldExpression<string>;
        createUser: FieldExpression<string>;
        updateTime: FieldExpression<string>;
        updateUser: FieldExpression<string>;
        using(client: DaoServiceClient): QTopic;
}

declare class QUserUpdateTest extends ModelExpression<UserUpdateTest, number> {
        id: FieldExpression<number>;
        username: FieldExpression<string>;
        password: FieldExpression<string>;
        using(client: DaoServiceClient): QUserUpdateTest;
}

declare class QSysOfficeUser extends ModelExpression<SysOfficeUser, number> {
        sysOfficeUserId: FieldExpression<number>;
        sysUserId: FieldExpression<number>;
        sysOfficeId: FieldExpression<number>;
        isDeleted: FieldExpression<number>;
        creatorId: FieldExpression<number>;
        creatorName: FieldExpression<string>;
        createTime: FieldExpression<string>;
        createCompanyId: FieldExpression<number>;
        createCompanyName: FieldExpression<string>;
        modifierId: FieldExpression<number>;
        modifierName: FieldExpression<string>;
        modifyTime: FieldExpression<string>;
        modifyCompanyId: FieldExpression<number>;
        modifyCompanyName: FieldExpression<string>;
        recordVersion: FieldExpression<number>;
        using(client: DaoServiceClient): QSysOfficeUser;
}

declare class QSysRoleAcl extends ModelExpression<SysRoleAcl, number> {
        roleAclId: FieldExpression<number>;
        roleId: FieldExpression<number>;
        aclTableId: FieldExpression<number>;
        conditions: FieldExpression<string>;
        conditionsSql: FieldExpression<string>;
        crudType: FieldExpression<number>;
        using(client: DaoServiceClient): QSysRoleAcl;
}

declare class QPeople extends ModelExpression<People, number> {
        /** 主键id */
        testId: FieldExpression<number>;
        /** 姓名 */
        testName: FieldExpression<string>;
        /** 年龄 */
        testAge: FieldExpression<number>;
        using(client: DaoServiceClient): QPeople;
}

declare class QScheduleLog extends ModelExpression<ScheduleLog, number> {
        id: FieldExpression<number>;
        triggerId: FieldExpression<string>;
        scheduleId: FieldExpression<number>;
        status: FieldExpression<boolean>;
        shard: FieldExpression<number>;
        workerNode: FieldExpression<string>;
        supervisor: FieldExpression<string>;
        startTime: FieldExpression<string>;
        endTime: FieldExpression<string>;
        consumingTime: FieldExpression<number>;
        description: FieldExpression<string>;
        createTime: FieldExpression<string>;
        updateTime: FieldExpression<string>;
        using(client: DaoServiceClient): QScheduleLog;
}

declare class QDepartmentZc extends ModelExpression<DepartmentZc, number> {
        departmentId: FieldExpression<number>;
        departmentName: FieldExpression<string>;
        departmentManager: FieldExpression<string>;
        using(client: DaoServiceClient): QDepartmentZc;
}

declare class QSysOffice extends ModelExpression<SysOffice, number> {
        sysOfficeId: FieldExpression<number>;
        officeCode: FieldExpression<string>;
        officeName: FieldExpression<string>;
        officeType: FieldExpression<string>;
        parentOfficeId: FieldExpression<number>;
        parentOfficeCode: FieldExpression<string>;
        parentOfficeName: FieldExpression<string>;
        isValid: FieldExpression<number>;
        remark: FieldExpression<string>;
        isDeleted: FieldExpression<number>;
        creatorId: FieldExpression<number>;
        creatorName: FieldExpression<string>;
        createTime: FieldExpression<string>;
        createCompanyId: FieldExpression<number>;
        createCompanyName: FieldExpression<string>;
        modifierId: FieldExpression<number>;
        modifierName: FieldExpression<string>;
        modifyTime: FieldExpression<string>;
        modifyCompanyId: FieldExpression<number>;
        modifyCompanyName: FieldExpression<string>;
        recordVersion: FieldExpression<number>;
        using(client: DaoServiceClient): QSysOffice;
}

declare class QGift extends ModelExpression<Gift, number> {
        /** 礼品id */
        id: FieldExpression<number>;
        /** 礼品名称 */
        giftName: FieldExpression<string>;
        /** 礼品编号 */
        giftCode: FieldExpression<string>;
        /** 出厂年份 */
        productionYear: FieldExpression<number>;
        /** 礼物店id */
        shopId: FieldExpression<number>;
        /** 乐观锁版本号 */
        version: FieldExpression<number>;
        /** 是否逻辑删除 */
        destroyed: FieldExpression<boolean>;
        /** 创建人 */
        creator: FieldExpression<string>;
        /** 创建时间 */
        createTime: FieldExpression<string>;
        /** 修改人 */
        modifier: FieldExpression<string>;
        /** 修改时间 */
        modifyTime: FieldExpression<string>;
        /** 用户属性字段 */
        userAttribute: FieldExpression<string>;
        using(client: DaoServiceClient): QGift;
}

declare class QUserSelectTest extends ModelExpression<UserSelectTest, number> {
        id: FieldExpression<number>;
        username: FieldExpression<string>;
        password: FieldExpression<string>;
        using(client: DaoServiceClient): QUserSelectTest;
}

declare class QImportConfig extends ModelExpression<ImportConfig, string> {
        id: FieldExpression<string>;
        className: FieldExpression<string>;
        template: FieldExpression<any>;
        dictionaryUrl: FieldExpression<string>;
        dealService: FieldExpression<string>;
        methodName: FieldExpression<string>;
        validateHead: FieldExpression<boolean>;
        validateMethod: FieldExpression<string>;
        async: FieldExpression<boolean>;
        allowParameter: FieldExpression<boolean>;
        primaryColumns: FieldExpression<string>;
        defineColumn: FieldExpression<string>;
        childrenTable: FieldExpression<string>;
        using(client: DaoServiceClient): QImportConfig;
}

declare class QDictProductType extends ModelExpression<DictProductType, string> {
        productCode: FieldExpression<string>;
        productName: FieldExpression<string>;
        productType: FieldExpression<boolean>;
        productPrice: FieldExpression<number & string>;
        using(client: DaoServiceClient): QDictProductType;
}

declare class QChangeLog extends ModelExpression<ChangeLog, number> {
        /** ID */
        id: FieldExpression<number>;
        /** 数据库id */
        dataSourceId: FieldExpression<number>;
        /** model name */
        modelName: FieldExpression<string>;
        /** sql */
        sqlStmt: FieldExpression<string>;
        /** JSON */
        changeData: FieldExpression<string>;
        /** 操作人 */
        operator: FieldExpression<string>;
        /** 操作时间 */
        operateTime: FieldExpression<string>;
        using(client: DaoServiceClient): QChangeLog;
}

declare class QSysResource extends ModelExpression<SysResource, number> {
        /** 资源Id */
        resourceId: FieldExpression<number>;
        /** 资源地址 */
        url: FieldExpression<string>;
        /** 类型：1地址；2按钮 */
        urlLx: FieldExpression<string>;
        /** 资源图标 */
        urlImg: FieldExpression<string>;
        /** 资源级别 */
        urlLevel: FieldExpression<number>;
        urlSeq: FieldExpression<number>;
        /** 资源名称 */
        urlTitle: FieldExpression<string>;
        /** 状态 */
        status: FieldExpression<string>;
        /** 创建本地时间 */
        createdDtmLoc: FieldExpression<string>;
        /** 创建国际时间 */
        createdTimeZone: FieldExpression<string>;
        /** 更新人Id */
        updatedByUser: FieldExpression<string>;
        /** 更新时间 */
        updatedDtmLoc: FieldExpression<string>;
        /** 更新国际时间 */
        updatedTimeZone: FieldExpression<string>;
        /** 排序 */
        displayOrder: FieldExpression<number>;
        /** 创建人Id */
        createdByUser: FieldExpression<number>;
        using(client: DaoServiceClient): QSysResource;
}

declare class QOrderList extends ModelExpression<OrderList, number> {
        /** 订单ID */
        orderId: FieldExpression<number>;
        /** 订单号 */
        orderCode: FieldExpression<string>;
        /** 订单来源id */
        orderSourceId: FieldExpression<number>;
        /** skuid */
        skuId: FieldExpression<number>;
        /** 客户id */
        customerId: FieldExpression<number>;
        /** 地区编码 */
        areaCode: FieldExpression<string>;
        /** 货品数量 */
        quantity: FieldExpression<number>;
        /** 送货地址 */
        address: FieldExpression<string>;
        /** 创建时间 */
        createTime: FieldExpression<string>;
        /** 时效时间 */
        agingTime: FieldExpression<string>;
        /** 标识 0x1(2,4,8) */
        status: FieldExpression<number>;
        using(client: DaoServiceClient): QOrderList;
}

declare class QSku extends ModelExpression<Sku, number> {
        /** 主键 */
        skuId: FieldExpression<number>;
        /** 客户id */
        customerId: FieldExpression<number>;
        /** sku编码 */
        skuCode: FieldExpression<string>;
        using(client: DaoServiceClient): QSku;
}

declare namespace ds {


    export class WbsWaybillInfo extends BaseModel {
        public waybillId?: number;
        public collectEmployeeId?: number;
        public consigneeName?: string;
        public collectEmployeeMobile?: string;
        public collectDatetime?: string;
        public sendAreaCode?: string;
        public sendAddressDetail?: string;
        public shipperCname?: string;
        public shipperMobile?: string;
        public consigneeCname?: string;
        public consigneeMobile?: string;
        public productTypeCode?: string;
        public deliveryAreaCode?: string;
        public deliveryAddressDetail?: string;
        public estimateDeliveryTime?: string;
        public lastModifyTime?: string;
        public principalGroupCode?: number;
    }
    const QWbsWaybillInfo:QWbsWaybillInfo;

    export class SysUser extends BaseModel {
        public userId?: number;
        public password?: string;
        public partnerId?: number;
        public userType?: number;
        public createTime?: string;
        public status?: number;
        public nickName?: string;
        public createrId?: number;
        public mobile?: string;
        public deleteFlg?: number;
        public departmentId?: number;
        public userFullName?: string;
        public email?: string;
        public userNo?: string;
        public remark?: string;
        public companyName?: string;
        public companyAddress?: string;
        public roleId?: string;
        public sex?: string;
        public version?: string;
        public age?: number;
        public username?: string;
    }
    const QSysUser:QSysUser;

    export class Customer extends BaseModel {
        public customerId?: number;
        public customerCode?: string;
        public channelId?: number;
    }
    const QCustomer:QCustomer;

    export class UserExportTest extends BaseModel {
        public id?: number;
        public username?: string;
        public password?: string;
    }
    const QUserExportTest:QUserExportTest;

    export class FsFileInfo extends BaseModel {
        public fileKey?: string;
        public name?: string;
        public url?: string;
        public etag?: string;
        public byteSize?: number;
        public uploaderStrategyId?: string;
        public largeThumbnailUrl?: string;
        public largeThumbnailEtag?: string;
        public smallThumbnailUrl?: string;
        public smallThumbnailEtag?: string;
    }
    const QFsFileInfo:QFsFileInfo;

    export class WorkerInfo extends BaseModel {
        public id?: number;
        public workerNode?: string;
        public createTime?: string;
        public updateTime?: string;
    }
    const QWorkerInfo:QWorkerInfo;

    export class IdempotentRecord extends BaseModel {
        public id?: number;
        public consumerGroup?: string;
        public msgId?: string;
    }
    const QIdempotentRecord:QIdempotentRecord;

    export class SysGridLayout extends BaseModel {
        public sysGridLayoutId?: string;
        public userId?: number;
        public roleId?: number;
        public tableId?: string;
        public content?: string;
        public name?: string;
        public modifyTime?: string;
    }
    const QSysGridLayout:QSysGridLayout;

    export class FsUploaderStrategy extends BaseModel {
        public id?: string;
        public bucketName?: string;
        public allowExtensions?: string;
        public sizeLimit?: number;
        public countLimit?: number;
        public isLogicDelete?: number;
        public largeThumbnailSize?: string;
        public smallThumbnailSize?: string;
    }
    const QFsUploaderStrategy:QFsUploaderStrategy;

    export class Department extends BaseModel {
        public departmentId?: number;
        public departmentName?: string;
        public departmentManager?: string;
    }
    const QDepartment:QDepartment;

    export class SysRoleResource extends BaseModel {
        public roleResourcesId?: number;
        public resourceId?: number;
        public roleId?: number;
        public deleteFlg?: number;
        public createrId?: number;
        public createTime?: string;
        public updateTime?: string;
        public updaterId?: number;
    }
    const QSysRoleResource:QSysRoleResource;

    export class WaybillFee extends BaseModel {
        public waybillId?: number;
        public totalFreight?: number & string;
        public insuranceFee?: number & string;
        public weight?: number & string;
        public volume?: number & string;
    }
    const QWaybillFee:QWaybillFee;

    export class ExportConfig extends BaseModel {
        public id?: string;
        public printMode?: boolean;
        public template?: any;
        public async?: boolean;
        public dictionaryUrl?: string;
        public fileName?: string;
        public pageSize?: number;
        public className?: string;
        public sourceUrl?: string;
        public statisticsUrl?: string;
        public columnSetting?: string;
    }
    const QExportConfig:QExportConfig;

    export class FailureMessage extends BaseModel {
        public id?: number;
        public msgId?: string;
        public retryTimes?: number;
        public node?: string;
        public topic?: string;
        public tags?: string;
        public groupName?: string;
        public mqName?: string;
        public exception?: string;
        public message?: string;
        public messageKey?: string;
        public state?: boolean;
        public consumeTime?: string;
        public createTime?: string;
        public createUser?: string;
        public updateTime?: string;
        public updateUser?: string;
    }
    const QFailureMessage:QFailureMessage;

    export class Job extends BaseModel {
        public id?: number;
        public scheduleCode?: string;
        public cron?: string;
        public threadType?: boolean;
        public scheduleType?: boolean;
        public shardCount?: number;
        public timeout?: number;
        public enabled?: boolean;
        public description?: string;
        public createTime?: string;
        public updateTime?: string;
    }
    const QJob:QJob;

    export class Course extends BaseModel {
        public id?: number;
        public courseName?: string;
        public courseNum?: number;
        public courseContent?: string;
        public creator?: string;
        public createTime?: string;
        public modifier?: string;
        public modifyTime?: string;
        public version?: number;
        public destroyed?: boolean;
        public userAttribute?: string;
    }
    const QCourse:QCourse;

    export class I18nMessages extends BaseModel {
        public id?: number;
        public key?: string;
        public localeId?: number;
        public message?: string;
    }
    const QI18nMessages:QI18nMessages;

    export class SysResourceRel extends BaseModel {
        public resourceRelId?: number;
        public resourceId?: number;
        public parentResourceId?: number;
        public createdDtmLoc?: string;
        public updatedByUser?: string;
        public updatedDtmLoc?: string;
        public createdByUser?: number;
    }
    const QSysResourceRel:QSysResourceRel;

    export class UserAddTest extends BaseModel {
        public id?: number;
        public username?: string;
        public password?: string;
    }
    const QUserAddTest:QUserAddTest;

    export class ProduceMessage extends BaseModel {
        public id?: number;
        public topic?: string;
        public msgId?: string;
        public message?: any;
        public retryTimes?: number;
        public status?: boolean;
        public createTime?: string;
        public createUser?: string;
        public updateTime?: string;
        public updateUser?: string;
    }
    const QProduceMessage:QProduceMessage;

    export class TimerVersion extends BaseModel {
        public timerId?: number;
        public identifier?: string;
        public version?: number;
        public modifyTime?: string;
    }
    const QTimerVersion:QTimerVersion;

    export class SupportedLocale extends BaseModel {
        public id?: number;
        public language?: string;
        public country?: string;
        public variant?: string;
        public display?: string;
        public state?: string;
    }
    const QSupportedLocale:QSupportedLocale;

    export class Teacher extends BaseModel {
        public id?: number;
        public teacherName?: string;
        public teacherAge?: number;
        public studentId?: number;
        public creator?: string;
        public createTime?: string;
        public modifier?: string;
        public modifyTime?: string;
        public version?: number;
        public destroyed?: boolean;
        public userAttribute?: string;
        public sex?: string;
        public teacherGender?: string;
    }
    const QTeacher:QTeacher;

    export class Student extends BaseModel {
        public id?: number;
        public name?: string;
        public password?: string;
        public confirmPassword?: string;
        public sex?: number;
        public email?: string;
        public mobile?: string;
        public money?: number & string;
        public score?: number;
        public age?: number;
        public enrollment?: string;
        public birthday?: string;
        public teacherId?: number;
        public courseId?: number;
        public creator?: string;
        public createTime?: string;
        public modifier?: string;
        public modifyTime?: string;
        public version?: number;
        public address?: string;
        public destroyed?: boolean;
        public userAttribute?: string;
        public fileKey?: string;
        public teacherName?: string;
    }
    const QStudent:QStudent;

    export class Shop extends BaseModel {
        public shopId?: number;
        public giftShop?: string;
        public version?: number;
        public address?: string;
        public buildTime?: string;
    }
    const QShop:QShop;

    export class Employee extends BaseModel {
        public employeeId?: number;
        public username?: string;
        public cname?: string;
        public password?: string;
        public age?: number;
        public sex?: boolean;
        public email?: string;
        public mobile?: string;
        public address?: string;
        public deptId?: number;
        public creator?: string;
        public createTime?: string;
        public modifier?: string;
        public birthDay?: string;
        public modifyTime?: string;
        public version?: number;
        public destroyed?: boolean;
        public principalGroupCode?: string;
    }
    const QEmployee:QEmployee;

    export class AppNodes extends BaseModel {
        public id?: number;
        public appName?: string;
        public nodeName?: string;
        public nodeNum?: number;
    }
    const QAppNodes:QAppNodes;

    export class OrderProcessingLog extends BaseModel {
        public businessId?: number;
        public status?: number;
    }
    const QOrderProcessingLog:QOrderProcessingLog;

    export class StrictNumber extends BaseModel {
        public id?: number;
        public numberKey?: string;
        public status?: number;
        public lastSn?: number;
        public createTime?: string;
        public updateTime?: string;
    }
    const QStrictNumber:QStrictNumber;

    export class AreaCode extends BaseModel {
        public areaCodeId?: number;
        public areaCodeName?: string;
    }
    const QAreaCode:QAreaCode;

    export class ScheduleAssignInfo extends BaseModel {
        public id?: number;
        public supervisor?: string;
        public scheduleCode?: string;
        public createTime?: string;
        public updateTime?: string;
    }
    const QScheduleAssignInfo:QScheduleAssignInfo;

    export class SysAclColumn extends BaseModel {
        public aclColumnId?: number;
        public aclTableId?: number;
        public columnName?: string;
        public remark?: string;
        public createTime?: string;
        public createrId?: number;
        public updateTime?: string;
        public updaterId?: number;
    }
    const QSysAclColumn:QSysAclColumn;

    export class OrderSource extends BaseModel {
        public orderSourceId?: number;
        public sourceCode?: string;
        public channelId?: number;
    }
    const QOrderSource:QOrderSource;

    export class ScheduleContext extends BaseModel {
        public id?: number;
        public scheduleCode?: string;
        public workerServers?: string;
        public scheduleStatus?: boolean;
        public lastExecuteTime?: string;
        public nextExecuteTime?: string;
        public createTime?: string;
        public updateTime?: string;
    }
    const QScheduleContext:QScheduleContext;

    export class DictAreaInfo extends BaseModel {
        public areaCode?: string;
        public areaFullName?: string;
        public areaShortName?: string;
    }
    const QDictAreaInfo:QDictAreaInfo;

    export class GtxTrans extends BaseModel {
        public gtxTransId?: number;
        public transName?: string;
        public xid?: string;
        public identifier?: string;
        public participants?: string;
        public txStatus?: number;
        public txMode?: number;
        public txCreateTime?: string;
        public modifyTime?: string;
        public modifyTimeSec?: number;
        public tryCount?: number;
    }
    const QGtxTrans:QGtxTrans;

    export class Stock extends BaseModel {
        public stockId?: number;
        public customerId?: number;
        public skuId?: number;
        public stockCount?: number;
    }
    const QStock:QStock;

    export class ConsumerGroup extends BaseModel {
        public id?: number;
        public topic?: string;
        public groupName?: string;
        public consumerCount?: number;
        public consumerMode?: string;
        public messageMode?: string;
        public settings?: string;
        public createTime?: string;
        public createUser?: string;
        public updateTime?: string;
        public updateUser?: string;
    }
    const QConsumerGroup:QConsumerGroup;

    export class SysRoleUser extends BaseModel {
        public roleUserId?: number;
        public roleId?: number;
        public userId?: number;
        public createTime?: string;
        public createrId?: number;
        public updateTime?: string;
        public updaterId?: number;
    }
    const QSysRoleUser:QSysRoleUser;

    export class WaybillRouteNode extends BaseModel {
        public waybillRouteNodeId?: number;
        public waybillId?: number;
        public startingSiteName?: string;
        public arrivalSiteName?: string;
        public siteNum?: number;
    }
    const QWaybillRouteNode:QWaybillRouteNode;

    export class EmployeeZc extends BaseModel {
        public id?: number;
        public name?: string;
        public gender?: number;
        public password?: string;
        public mobile?: string;
        public telephone?: string;
        public email?: string;
        public age?: number;
        public version?: number;
        public updateId?: string;
        public updateTime?: string;
        public departmentId?: string;
    }
    const QEmployeeZc:QEmployeeZc;

    export class WaybillInfo extends BaseModel {
        public waybillId?: number;
        public collectEmployeeId?: number;
        public collectEmployeeCname?: string;
        public collectEmployeeMobile?: string;
        public collectDatetime?: string;
        public sendAreaCode?: string;
        public sendAddressDetail?: string;
        public shipperCname?: string;
        public shipperMobile?: string;
        public consigneeCname?: string;
        public consigneeMobile?: string;
        public productTypeCode?: string;
        public deliveryAreaCode?: string;
        public deliveryAddressDetail?: string;
        public estimateDeliveryTime?: string;
    }
    const QWaybillInfo:QWaybillInfo;

    export class LooseNumber extends BaseModel {
        public id?: number;
        public numberKey?: string;
        public lastSn?: number;
        public createTime?: string;
        public updateTime?: string;
    }
    const QLooseNumber:QLooseNumber;

    export class RuleNumberConfig extends BaseModel {
        public id?: number;
        public expression?: string;
        public ruleName?: string;
        public ruleCode?: string;
        public resetType?: number;
        public controlType?: number;
        public initValue?: number;
        public maxValue?: number;
        public step?: number;
        public createTime?: string;
        public updateTime?: string;
        public groupName?: string;
    }
    const QRuleNumberConfig:QRuleNumberConfig;

    export class Dept extends BaseModel {
        public deptId?: number;
        public deptName?: string;
        public principalGroupCode?: string;
        public test?: string;
        public t2?: string;
    }
    const QDept:QDept;

    export class UserDeleteTest extends BaseModel {
        public id?: number;
        public username?: string;
        public password?: string;
    }
    const QUserDeleteTest:QUserDeleteTest;

    export class PreOrder extends BaseModel {
        public preOrderId?: number;
        public orderCode?: string;
        public sourceCode?: string;
        public skuCode?: string;
        public areaCode?: string;
        public customerCode?: string;
        public quantity?: number;
        public address?: string;
        public createTime?: string;
        public status?: number;
        public shardedNumber?: number;
    }
    const QPreOrder:QPreOrder;

    export class StudentNew extends BaseModel {
        public id?: number;
        public name?: string;
        public password?: string;
        public confirmPassword?: string;
        public sex?: string;
        public email?: string;
        public mobile?: string;
        public money?: number;
        public score?: number;
        public age?: number;
        public enrollment?: string;
        public birthday?: string;
        public teacherId?: number;
        public courseId?: number;
        public creator?: string;
        public createTime?: string;
        public modifier?: string;
        public modifyTime?: string;
        public version?: number;
        public address?: string;
    }
    const QStudentNew:QStudentNew;

    export class UserImportTest extends BaseModel {
        public id?: number;
        public username?: string;
        public password?: string;
    }
    const QUserImportTest:QUserImportTest;

    export class SysDepartment extends BaseModel {
        public departmentId?: number;
        public departmentNo?: string;
        public departmentName?: string;
        public partnerId?: number;
        public createTime?: string;
        public createrId?: number;
        public contact?: string;
        public phone?: number;
        public fax?: number;
        public address?: string;
        public status?: number;
    }
    const QSysDepartment:QSysDepartment;

    export class DictAreaInfoBak extends BaseModel {
        public areaCode?: string;
        public areaShortName?: string;
        public areaFullName?: string;
    }
    const QDictAreaInfoBak:QDictAreaInfoBak;

    export class SysRole extends BaseModel {
        public roleId?: number;
        public roleName?: string;
        public createTime?: string;
        public createrId?: number;
        public partnerId?: number;
        public status?: number;
        public roleNo?: string;
        public remark?: string;
        public deleteFlag?: number;
    }
    const QSysRole:QSysRole;

    export class SysAclTable extends BaseModel {
        public aclTableId?: number;
        public aclType?: number;
        public tableName?: string;
        public createTime?: string;
        public createrId?: number;
        public updateTime?: string;
        public updaterId?: number;
        public remarks?: string;
        public aclMode?: string;
    }
    const QSysAclTable:QSysAclTable;

    export class Children extends BaseModel {
        public id?: number;
        public childName?: string;
        public sex?: boolean;
        public giftId?: number;
        public giftCode?: string;
        public version?: number;
        public destroyed?: boolean;
        public creator?: string;
        public createTime?: string;
        public modifier?: string;
        public modifyTime?: string;
        public userAttribute?: string;
        public mobile?: string;
        public parentsMobile?: string;
        public phone?: string;
        public mailbox?: string;
        public age?: number;
        public schoolAge?: number;
        public englishName?: string;
        public enrollmentDate?: string;
        public graduationDate?: string;
    }
    const QChildren:QChildren;

    export class UemUser extends BaseModel {
        public uemUserId?: number;
        public account?: string;
        public mobile?: string;
        public email?: string;
        public password?: string;
        public source?: string;
        public oriApplication?: number;
        public blindCompanny?: number;
        public blindCompannyTime?: string;
        public userType?: string;
        public isAgreemeent?: boolean;
        public isValid?: boolean;
        public invalidTime?: string;
        public score?: number;
        public wxId?: string;
        public qqId?: string;
        public gvmId?: string;
        public uemIdCardId?: number;
        public name?: string;
        public sex?: boolean;
        public idCard?: string;
        public isDisplayed?: boolean;
        public cardPositiveUrlId?: string;
        public cardBackUrlId?: string;
        public auditStatus?: string;
        public auditRemark?: string;
        public auditTime?: string;
        public auditor?: number;
        public creatorId?: number;
        public creatorName?: string;
        public createTime?: string;
        public modifierId?: number;
        public modifierName?: string;
        public modifyTime?: string;
        public recordVersion?: number;
    }
    const QUemUser:QUemUser;

    export class Topic extends BaseModel {
        public id?: number;
        public mqName?: string;
        public topic?: string;
        public createTime?: string;
        public createUser?: string;
        public updateTime?: string;
        public updateUser?: string;
    }
    const QTopic:QTopic;

    export class UserUpdateTest extends BaseModel {
        public id?: number;
        public username?: string;
        public password?: string;
    }
    const QUserUpdateTest:QUserUpdateTest;

    export class SysOfficeUser extends BaseModel {
        public sysOfficeUserId?: number;
        public sysUserId?: number;
        public sysOfficeId?: number;
        public isDeleted?: number;
        public creatorId?: number;
        public creatorName?: string;
        public createTime?: string;
        public createCompanyId?: number;
        public createCompanyName?: string;
        public modifierId?: number;
        public modifierName?: string;
        public modifyTime?: string;
        public modifyCompanyId?: number;
        public modifyCompanyName?: string;
        public recordVersion?: number;
    }
    const QSysOfficeUser:QSysOfficeUser;

    export class SysRoleAcl extends BaseModel {
        public roleAclId?: number;
        public roleId?: number;
        public aclTableId?: number;
        public conditions?: string;
        public conditionsSql?: string;
        public crudType?: number;
    }
    const QSysRoleAcl:QSysRoleAcl;

    export class People extends BaseModel {
        public testId?: number;
        public testName?: string;
        public testAge?: number;
    }
    const QPeople:QPeople;

    export class ScheduleLog extends BaseModel {
        public id?: number;
        public triggerId?: string;
        public scheduleId?: number;
        public status?: boolean;
        public shard?: number;
        public workerNode?: string;
        public supervisor?: string;
        public startTime?: string;
        public endTime?: string;
        public consumingTime?: number;
        public description?: string;
        public createTime?: string;
        public updateTime?: string;
    }
    const QScheduleLog:QScheduleLog;

    export class DepartmentZc extends BaseModel {
        public departmentId?: number;
        public departmentName?: string;
        public departmentManager?: string;
    }
    const QDepartmentZc:QDepartmentZc;

    export class SysOffice extends BaseModel {
        public sysOfficeId?: number;
        public officeCode?: string;
        public officeName?: string;
        public officeType?: string;
        public parentOfficeId?: number;
        public parentOfficeCode?: string;
        public parentOfficeName?: string;
        public isValid?: number;
        public remark?: string;
        public isDeleted?: number;
        public creatorId?: number;
        public creatorName?: string;
        public createTime?: string;
        public createCompanyId?: number;
        public createCompanyName?: string;
        public modifierId?: number;
        public modifierName?: string;
        public modifyTime?: string;
        public modifyCompanyId?: number;
        public modifyCompanyName?: string;
        public recordVersion?: number;
    }
    const QSysOffice:QSysOffice;

    export class Gift extends BaseModel {
        public id?: number;
        public giftName?: string;
        public giftCode?: string;
        public productionYear?: number;
        public shopId?: number;
        public version?: number;
        public destroyed?: boolean;
        public creator?: string;
        public createTime?: string;
        public modifier?: string;
        public modifyTime?: string;
        public userAttribute?: string;
    }
    const QGift:QGift;

    export class UserSelectTest extends BaseModel {
        public id?: number;
        public username?: string;
        public password?: string;
    }
    const QUserSelectTest:QUserSelectTest;

    export class ImportConfig extends BaseModel {
        public id?: string;
        public className?: string;
        public template?: any;
        public dictionaryUrl?: string;
        public dealService?: string;
        public methodName?: string;
        public validateHead?: boolean;
        public validateMethod?: string;
        public async?: boolean;
        public allowParameter?: boolean;
        public primaryColumns?: string;
        public defineColumn?: string;
        public childrenTable?: string;
    }
    const QImportConfig:QImportConfig;

    export class DictProductType extends BaseModel {
        public productCode?: string;
        public productName?: string;
        public productType?: boolean;
        public productPrice?: number & string;
    }
    const QDictProductType:QDictProductType;

    export class ChangeLog extends BaseModel {
        public id?: number;
        public dataSourceId?: number;
        public modelName?: string;
        public sqlStmt?: string;
        public changeData?: string;
        public operator?: string;
        public operateTime?: string;
    }
    const QChangeLog:QChangeLog;

    export class SysResource extends BaseModel {
        public resourceId?: number;
        public url?: string;
        public urlLx?: string;
        public urlImg?: string;
        public urlLevel?: number;
        public urlSeq?: number;
        public urlTitle?: string;
        public status?: string;
        public createdDtmLoc?: string;
        public createdTimeZone?: string;
        public updatedByUser?: string;
        public updatedDtmLoc?: string;
        public updatedTimeZone?: string;
        public displayOrder?: number;
        public createdByUser?: number;
    }
    const QSysResource:QSysResource;

    export class OrderList extends BaseModel {
        public orderId?: number;
        public orderCode?: string;
        public orderSourceId?: number;
        public skuId?: number;
        public customerId?: number;
        public areaCode?: string;
        public quantity?: number;
        public address?: string;
        public createTime?: string;
        public agingTime?: string;
        public status?: number;
    }
    const QOrderList:QOrderList;

    export class Sku extends BaseModel {
        public skuId?: number;
        public customerId?: number;
        public skuCode?: string;
    }
    const QSku:QSku;

}
// @formatter:on
