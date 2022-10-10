package com.gillion.model.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import com.gillion.ec.core.annotations.Generator;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.gillion.ec.core.utils.Long2String;
import com.gillion.ec.core.utils.String2Long;
import com.gillion.ds.entity.base.BaseModel;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
 * @author DaoServiceGenerator
 */
@SuppressWarnings("JpaDataSourceORMInspection")
        @EqualsAndHashCode(callSuper = true)
    @Data
    @Entity
@Table(name = "order_his_status")
public class OrderHisStatus extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**主键ID*/
    @Id
    @Column(name = "order_his_status_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long orderHisStatusId;

    /**订单id*/
    @Column(name = "go_order_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long goOrderId;

    /**单位信息id*/
    @Column(name = "company_id")
    private String companyId;

    /**状态代码*/
    @Column(name = "status_code")
    private String statusCode;

    /**状态名称（0-未审核，1审核通过，2-审核拒绝，3退回）*/
    @Column(name = "status_name")
    private String statusName;

    /**状态时间*/
    @Column(name = "status_time")
    private Date statusTime;

    /**状态拒绝类型*/
    @Column(name = "status_type")
    private String statusType;

    /**状态备注，包含公路院，专家审批意见和退回等一系列原因*/
    @Column(name = "remark")
    private String remark;

    /**创建人id*/
    @Column(name = "creator_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long creatorId;

    /**创建名称*/
    @Column(name = "creator_name")
    private String creatorName;

    /**创建时间*/
    @Column(name = "create_time")
    private Date createTime;

    /**创建人所属公司id*/
    @Column(name = "create_company_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long createCompanyId;

    /**创建人所属公司name*/
    @Column(name = "create_company_name")
    private String createCompanyName;

    /**版本号*/
    @Column(name = "record_version")
    private Integer recordVersion;

    /**环节代码，取数据字典*/
    @Column(name = "link_code")
    private String linkCode;

    /**环节名称，取数据字典*/
    @Column(name = "link_name")
    private String linkName;

}