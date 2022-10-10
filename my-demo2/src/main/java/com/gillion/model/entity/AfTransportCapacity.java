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
@Table(name = "af_transport_capacity")
public class AfTransportCapacity extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**主键id*/
    @Id
    @Column(name = "af_transport_capacity_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long afTransportCapacityId;

    /**承运商id*/
    @Column(name = "carrier_id")
    private String carrierId;

    /**承运商名称(联系人)*/
    @Column(name = "carrier_name")
    private String carrierName;

    /**联系方式*/
    @Column(name = "carrier_tel")
    private String carrierTel;

    /**国家代码(起飞信息)*/
    @Column(name = "origin_country_code")
    private String originCountryCode;

    /**国家名称(起飞信息)*/
    @Column(name = "origin_country_name")
    private String originCountryName;

    /**机场代码(起飞信息)*/
    @Column(name = "origin_airport_code")
    private String originAirportCode;

    /**机场名称(起飞信息)*/
    @Column(name = "origin_airport_name")
    private String originAirportName;

    /**国家名称(到达信息)*/
    @Column(name = "des_country_code")
    private String desCountryCode;

    /**国家名称(到达信息)*/
    @Column(name = "des_country_name")
    private String desCountryName;

    /**机场代码(到达信息)*/
    @Column(name = "des_airport_code")
    private String desAirportCode;

    /**机场名称(到达信息)*/
    @Column(name = "des_airport_name")
    private String desAirportName;

    /**到达时间(到达信息)*/
    @Column(name = "eta")
    private Date eta;

    /**预计起飞时间*/
    @Column(name = "etd")
    private Date etd;

    /**到达时间(计划)*/
    @Column(name = "plan_eta")
    private Date planEta;

    /**起飞时间(计划)*/
    @Column(name = "plan_etd")
    private Date planEtd;

    /**到达时间(实际)*/
    @Column(name = "reality_eta")
    private Date realityEta;

    /**起飞时间(实际)*/
    @Column(name = "reality_etd")
    private Date realityEtd;

    /**运输时效*/
    @Column(name = "delivery_time")
    private String deliveryTime;

    /**机型*/
    @Column(name = "aircraft_type")
    private String aircraftType;

    /**航班号*/
    @Column(name = "flight_no")
    private String flightNo;

    /**班期(格式：1_3_，表示每周一、三有班期)*/
    @Column(name = "schedule")
    private String schedule;

    /**航线(例：广州-伦敦)*/
    @Column(name = "air_line")
    private String airLine;

    /**航空公司*/
    @Column(name = "airline_company_name")
    private String airlineCompanyName;

    /**航空公司代码*/
    @Column(name = "airline_company_code")
    private String airlineCompanyCode;

    /**机尾号*/
    @Column(name = "tail_number")
    private String tailNumber;

    /**载重量*/
    @Column(name = "capacity_volume")
    private BigDecimal capacityVolume;

    /**载重量*/
    @Column(name = "capacity_tonnage")
    private BigDecimal capacityTonnage;

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