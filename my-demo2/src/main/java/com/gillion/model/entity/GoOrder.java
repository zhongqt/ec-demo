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
import java.lang.Boolean;
import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.math.BigDecimal;
import java.util.Date;


/**
 * @author DaoServiceGenerator
 */
@SuppressWarnings("JpaDataSourceORMInspection")
        @EqualsAndHashCode(callSuper = true)
    @Data
    @Entity
@Table(name = "go_order")
public class GoOrder extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**主键id*/
    @Id
    @Column(name = "go_order_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long goOrderId;

    /**订单号*/
    @Column(name = "order_no")
    private String orderNo;

    /**单证号(交换上传时需方自己的单证号)*/
    @Column(name = "document_number")
    private String documentNumber;

    /**交办单号*/
    @Column(name = "delivery_no")
    private String deliveryNo;

    /**承运商id*/
    @Column(name = "carrier_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long carrierId;

    /**承运商名称*/
    @Column(name = "carrier_name")
    private String carrierName;

    /**国内外订单（0-国内，1-国际）*/
    @Column(name = "at_home_abroad_type")
    private String atHomeAbroadType;

    /**订单状态（0-待发布、1-待审核、2-待调整需求、3-待接单、4-已接单、5-订单取消、6-需方拒绝、7-在途、8-订单完成 ）*/
    @Column(name = "order_status")
    private String orderStatus;

    /**订单状态更新时间(yyyy-MM-dd HH:mm:ss)*/
    @Column(name = "order_status_time")
    private Date orderStatusTime;

    /**订单审核通过时间(yyyy-MM-dd HH:mm:ss)*/
    @Column(name = "approved_time")
    private Date approvedTime;

    /**下单时间(yyyy-MM-dd HH:mm:ss)*/
    @Column(name = "order_time")
    private Date orderTime;

    /**运输类型(公路)*/
    @Column(name = "is_tf_transported")
    private Boolean isTfTransported;

    /**运输类型(铁路)*/
    @Column(name = "is_rf_transported")
    private Boolean isRfTransported;

    /**运输类型(水运)*/
    @Column(name = "is_mf_transported")
    private Boolean isMfTransported;

    /**运输类型(民航)*/
    @Column(name = "is_af_transported")
    private Boolean isAfTransported;

    /**是否上传运输方案（0-否，1-是，默认为否）*/
    @Column(name = "is_transport_planned")
    private Boolean isTransportPlanned;

    /**是否上传交办单（0-否，1-是，默认为否）*/
    @Column(name = "is_transaction_planned")
    private Boolean isTransactionPlanned;

    /**用户类型*/
    @Column(name = "user_id")
    private String userId;

    /**货物名*/
    @Column(name = "cargo_name")
    private String cargoName;

    /**货物总重量*/
    @Column(name = "total_weight")
    private BigDecimal totalWeight;

    /**货物总体积*/
    @Column(name = "total_volume")
    private BigDecimal totalVolume;

    /**是否关注*/
    @Column(name = "is_follow")
    private Boolean isFollow;

    /**删除标识（0-未删除，1-删除）*/
    @Column(name = "is_deleted")
    private Boolean isDeleted;

    /**是否公开（0-不公开，1-公开）*/
    @Column(name = "is_opened")
    private Boolean isOpened;

    /**创建人id*/
    @Column(name = "creator_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long creatorId;

    /**创建人名称*/
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

    /**修改人id*/
    @Column(name = "modifier_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long modifierId;

    /**修改人名称*/
    @Column(name = "modifier_name")
    private String modifierName;

    /**修改时间*/
    @Column(name = "modify_time")
    private Date modifyTime;

    /**修改人公司id*/
    @Column(name = "modify_company_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long modifyCompanyId;

    /**修改人所属公司name*/
    @Column(name = "modify_company_name")
    private String modifyCompanyName;

    /**版本号*/
    @Column(name = "record_version")
    private Integer recordVersion;

    /**调度类型*/
    @Column(name = "scheduling_type")
    private String schedulingType;

    /**委托人*/
    @Column(name = "principal")
    private String principal;

    /**委托单位*/
    @Column(name = "requester")
    private String requester;

    /**委托人联系方式*/
    @Column(name = "principal_contact")
    private String principalContact;

    /**拒绝原因*/
    @Column(name = "order_reason")
    private String orderReason;

    /**二维码加密串*/
    @Column(name = "qrcode_key")
    private String qrcodeKey;

    /**工作流流程id*/
    @Column(name = "execution_id")
    private String executionId;

}