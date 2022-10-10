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
import java.util.Date;


/**
 * @author DaoServiceGenerator
 */
@SuppressWarnings("JpaDataSourceORMInspection")
        @EqualsAndHashCode(callSuper = true)
    @Data
    @Entity
@Table(name = "food_transport_order")
public class FoodTransportOrder extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**主键id*/
    @Id
    @Column(name = "food_transport_order_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long foodTransportOrderId;

    /**运输计划单号*/
    @Column(name = "order_no")
    private String orderNo;

    /**船名*/
    @Column(name = "vessel_name")
    private String vesselName;

    /**船名（中文）*/
    @Column(name = "vessel_name_cn")
    private String vesselNameCn;

    /**MMSI号*/
    @Column(name = "mmsi_num")
    private String mmsiNum;

    /**出发港编码*/
    @Column(name = "pol_code")
    private String polCode;

    /**出发港名称*/
    @Column(name = "pol_name")
    private String polName;

    /**出发国家编码*/
    @Column(name = "origin_country_code")
    private String originCountryCode;

    /**出发国家名称*/
    @Column(name = "origin_country_name")
    private String originCountryName;

    /**目的港编码*/
    @Column(name = "pod_code")
    private String podCode;

    /**目的港名称*/
    @Column(name = "pod_name")
    private String podName;

    /**IMO号*/
    @Column(name = "imo_num")
    private String imoNum;

    /**货主id*/
    @Column(name = "consignor_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long consignorId;

    /**货主名称*/
    @Column(name = "consignor_name")
    private String consignorName;

    /**通关办理情况*/
    @Column(name = "customs_clearance")
    private String customsClearance;

    /**进口粮源疏港计划*/
    @Column(name = "import_port_dredging")
    private String importPortDredging;

    /**采购计划*/
    @Column(name = "purchase_time")
    private Date purchaseTime;

    /**下游需求计划*/
    @Column(name = "downstream_demand_plan")
    private String downstreamDemandPlan;

    /**单据状态（0-草稿、1-已上报 ）*/
    @Column(name = "order_status")
    private String orderStatus;

    /**备注*/
    @Column(name = "remark")
    private String remark;

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

    /**逻辑删除标识0:未删除 1已删除，默认0*/
    @Column(name = "is_deleted")
    private Boolean isDeleted;

}