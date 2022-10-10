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
@Table(name = "mf_transport_capacity")
public class MfTransportCapacity extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**主键id*/
    @Id
    @Column(name = "mf_transport_capacity_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long mfTransportCapacityId;

    /**承运商id*/
    @Column(name = "carrier_id")
    private String carrierId;

    /**承运商名称(联系人)*/
    @Column(name = "carrier_name")
    private String carrierName;

    /**联系方式*/
    @Column(name = "carrier_tel")
    private String carrierTel;

    /**国家代码（运输起点）*/
    @Column(name = "origin_country_code")
    private String originCountryCode;

    /**国家名称（运输起点）*/
    @Column(name = "origin_country_name")
    private String originCountryName;

    /**省州代码（运输起点）*/
    @Column(name = "origin_province_code")
    private String originProvinceCode;

    /**省州名称（运输起点）*/
    @Column(name = "origin_province_name")
    private String originProvinceName;

    /**起运港港口代码*/
    @Column(name = "pol_name_code")
    private String polNameCode;

    /**起运港港口中文名称*/
    @Column(name = "pol_name_cn")
    private String polNameCn;

    /**起运港港口英文名称*/
    @Column(name = "pol_name_en")
    private String polNameEn;

    /**国家代码（运输终点）*/
    @Column(name = "des_country_code")
    private String desCountryCode;

    /**国家名称（运输终点）*/
    @Column(name = "des_country_name")
    private String desCountryName;

    /**省州代码（运输终点）*/
    @Column(name = "des_province_code")
    private String desProvinceCode;

    /**省州名称（运输终点）*/
    @Column(name = "des_province_name")
    private String desProvinceName;

    /**目的港港口代码*/
    @Column(name = "pod_name_code")
    private String podNameCode;

    /**目的港港口中文名称*/
    @Column(name = "pod_name_cn")
    private String podNameCn;

    /**目的港港口英文名称*/
    @Column(name = "pod_name_en")
    private String podNameEn;

    /**船名*/
    @Column(name = "vessel_name")
    private String vesselName;

    /**航次*/
    @Column(name = "voyage")
    private String voyage;

    /**船公司名称*/
    @Column(name = "shipping_company_name")
    private String shippingCompanyName;

    /**航线*/
    @Column(name = "route")
    private String route;

    /**运输时效(航程)*/
    @Column(name = "delivery_time")
    private String deliveryTime;

    /**预计抵达目的地时间*/
    @Column(name = "eta")
    private Date eta;

    /**预计离起运港时间*/
    @Column(name = "etd")
    private Date etd;

    /**班期(格式：1_3_，表示每周一、三有班期)*/
    @Column(name = "schedule")
    private String schedule;

    /**经停类别(1-直飞、2-中转、3-)*/
    @Column(name = "types_of_stoppage")
    private String typesOfStoppage;

    /**船期方案*/
    @Column(name = "shipping_schedule")
    private String shippingSchedule;

    /**提单截止时间*/
    @Column(name = "deadline_bill_of_lading")
    private Date deadlineBillOfLading;

    /**进场截止时间*/
    @Column(name = "entry_deadline")
    private Date entryDeadline;

    /**申报截止时间*/
    @Column(name = "deadline_declaration")
    private Date deadlineDeclaration;

    /**VGM截止时间*/
    @Column(name = "vgm_deadline")
    private Date vgmDeadline;

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

}