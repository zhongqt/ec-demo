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
import java.math.BigDecimal;
import java.util.Date;


/**
 * @author DaoServiceGenerator
 */
@SuppressWarnings("JpaDataSourceORMInspection")
        @EqualsAndHashCode(callSuper = true)
    @Data
    @Entity
@Table(name = "go_manifest_order")
public class GoManifestOrder extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**主键id*/
    @Id
    @Column(name = "go_manifest_order_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long goManifestOrderId;

    /**订单id*/
    @Column(name = "go_order_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long goOrderId;

    /**订单号*/
    @Column(name = "order_no")
    private String orderNo;

    /**运单流水号*/
    @Column(name = "wab_no")
    private String wabNo;

    /**主运单号*/
    @Column(name = "mwab_no")
    private String mwabNo;

    /**分运单号*/
    @Column(name = "hwab_no")
    private String hwabNo;

    /**运输方式(1-公路运输 2-铁路运输、3-海上运输、4-航空运输、5-邮政运输)*/
    @Column(name = "transport_type")
    private String transportType;

    /**国内外订单（0-国内，1-国际）*/
    @Column(name = "at_home_abroad_type")
    private String atHomeAbroadType;

    /**运输单位名称*/
    @Column(name = "airline_company_name")
    private String airlineCompanyName;

    /**运输单位代码*/
    @Column(name = "airline_company_code")
    private String airlineCompanyCode;

    /**船名*/
    @Column(name = "conveyance_name")
    private String conveyanceName;

    /**班次号*/
    @Column(name = "flight_no")
    private String flightNo;

    /**起运地代码(起点信息)*/
    @Column(name = "origin_code")
    private String originCode;

    /**起运地名称(起点信息)*/
    @Column(name = "origin_name")
    private String originName;

    /**国家名称(起点信息)*/
    @Column(name = "origin_country_name")
    private String originCountryName;

    /**国家代码(起点信息)*/
    @Column(name = "origin_country_code")
    private String originCountryCode;

    /**目的地名称(到达信息)*/
    @Column(name = "des_name")
    private String desName;

    /**目的地代码(到达信息)*/
    @Column(name = "des_code")
    private String desCode;

    /**国家名称(到达信息)*/
    @Column(name = "des_country_name")
    private String desCountryName;

    /**国家代码(到达信息)*/
    @Column(name = "des_country_code")
    private String desCountryCode;

    /**中转港名称*/
    @Column(name = "transit_port_name")
    private String transitPortName;

    /**中转港代码*/
    @Column(name = "transit_port_code")
    private String transitPortCode;

    /**运输类型（0-集装箱，1-整车）*/
    @Column(name = "transport_species")
    private String transportSpecies;

    /**ETD*/
    @Column(name = "start_time")
    private Date startTime;

    /**ETA*/
    @Column(name = "arrival_time")
    private Date arrivalTime;

    /**ATD*/
    @Column(name = "dep_act_time")
    private Date depActTime;

    /**ATA*/
    @Column(name = "arr_act_time")
    private Date arrActTime;

    /**货物总名称*/
    @Column(name = "total_name")
    private String totalName;

    /**货物总体积*/
    @Column(name = "total_volume")
    private BigDecimal totalVolume;

    /**货物总重量*/
    @Column(name = "total_weight")
    private BigDecimal totalWeight;

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

    /**承运商id*/
    @Column(name = "carrier_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long carrierId;

    /**承运商名称*/
    @Column(name = "carrier_name")
    private String carrierName;

    /**运输计划表id*/
    @Column(name = "tra_order_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long traOrderId;

    /**运输计划号*/
    @Column(name = "tra_order_no")
    private String traOrderNo;

    /**完成情况说明*/
    @Column(name = "completion_statement")
    private String completionStatement;

}