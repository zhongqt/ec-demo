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
@Table(name = "tra_order")
public class TraOrder extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**主键id*/
    @Id
    @Column(name = "tra_order_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long traOrderId;

    /**订单id*/
    @Column(name = "go_order_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long goOrderId;

    /**运输方案编号*/
    @Column(name = "tra_order_no")
    private String traOrderNo;

    /**承运商id*/
    @Column(name = "carrier_id")
    private String carrierId;

    /**承运商名称*/
    @Column(name = "carrier_name")
    private String carrierName;

    /**联系方式*/
    @Column(name = "carrier_tel")
    private String carrierTel;

    /**运输条款(1-CY-CY、2-CY-CFS、3-CY-DOO...)*/
    @Column(name = "transport_clause")
    private String transportClause;

    /**运输类型(1-公路、2-铁路、3-水运、4-民航、5-邮政快递)*/
    @Column(name = "transport_type")
    private String transportType;

    /**预计抵达目的地时间*/
    @Column(name = "eta")
    private Date eta;

    /**预计离起运港时间/起运时间/预计起飞时间*/
    @Column(name = "etd")
    private Date etd;

    /**生/失效标识*/
    @Column(name = "is_valid")
    private Boolean isValid;

    /**班期(格式：1_3_，表示每周一、三有班期)*/
    @Column(name = "schedule")
    private String schedule;

    /**运输时效*/
    @Column(name = "delivery_time")
    private String deliveryTime;

    /**运输起点*/
    @Column(name = "origin_address")
    private String originAddress;

    /**运输终点*/
    @Column(name = "des_address")
    private String desAddress;

    /**离境/进境口岸*/
    @Column(name = "transit_port")
    private String transitPort;

    /**航线(例：广州-伦敦)*/
    @Column(name = "air_line")
    private String airLine;

    /**计划周期(2010年05月04日-2020年05月10日)*/
    @Column(name = "planning_cycle")
    private String planningCycle;

    /**航空公司*/
    @Column(name = "airline_company_name")
    private String airlineCompanyName;

    /**航空公司代码*/
    @Column(name = "airline_company_code")
    private String airlineCompanyCode;

    /**航班号*/
    @Column(name = "flight_no")
    private String flightNo;

    /**机型*/
    @Column(name = "aircraft_type")
    private String aircraftType;

    /**机尾号*/
    @Column(name = "tail_number")
    private String tailNumber;

    /**载重量*/
    @Column(name = "capacity_tonnage")
    private BigDecimal capacityTonnage;

    /**机场名称(起飞信息)*/
    @Column(name = "origin_airport_name")
    private String originAirportName;

    /**机场代码(起飞信息)*/
    @Column(name = "origin_airport_code")
    private String originAirportCode;

    /**国家名称(起飞信息)*/
    @Column(name = "origin_country_name")
    private String originCountryName;

    /**国家代码(起飞信息)*/
    @Column(name = "origin_country_code")
    private String originCountryCode;

    /**机场名称(到达信息)*/
    @Column(name = "des_airport_name")
    private String desAirportName;

    /**机场代码(到达信息)*/
    @Column(name = "des_airport_code")
    private String desAirportCode;

    /**国家名称(到达信息)*/
    @Column(name = "des_country_name")
    private String desCountryName;

    /**国家代码(到达信息)*/
    @Column(name = "des_country_code")
    private String desCountryCode;

    /**到达时间(到达信息)*/
    @Column(name = "arrival_time")
    private Date arrivalTime;

    /**运载方式(1-整车、2-零担、3-集装箱)*/
    @Column(name = "mode_of_transportation")
    private String modeOfTransportation;

    /**进出境列车的国际铁路始发站代码*/
    @Column(name = "place_loading_code")
    private String placeLoadingCode;

    /**发货站中文名字，例：中国武汉吴山站*/
    @Column(name = "place_loading_name")
    private String placeLoadingName;

    /**到货站中文名字，例：德国汉堡港货运场站*/
    @Column(name = "place_discharge_name")
    private String placeDischargeName;

    /**进出境列车终到站的国际铁路站代码*/
    @Column(name = "place_discharge_code")
    private String placeDischargeCode;

    /**机车国籍/地区名称，例：中国*/
    @Column(name = "train_country_name")
    private String trainCountryName;

    /**机车国籍/地区代码，例：CN*/
    @Column(name = "train_country_code")
    private String trainCountryCode;

    /**列车所经停国的国境铁路站站名*/
    @Column(name = "routing_country_name")
    private String routingCountryName;

    /**列车所经停国的国境铁路站代码*/
    @Column(name = "routing_country_code")
    private String routingCountryCode;

    /**主车号*/
    @Column(name = "conveyance_reference_number")
    private String conveyanceReferenceNumber;

    /**班列总车数*/
    @Column(name = "total_number")
    private String totalNumber;

    /**班列运输总箱数，单位：TEU*/
    @Column(name = "container_quantity")
    private String containerQuantity;

    /**起运港港口代码*/
    @Column(name = "pol_code")
    private String polCode;

    /**起运港港口中文名称*/
    @Column(name = "pol_name_cn")
    private String polNameCn;

    /**起运港港口英文名称*/
    @Column(name = "pol_name_en")
    private String polNameEn;

    /**目的港港口代码*/
    @Column(name = "pod_code")
    private String podCode;

    /**目的港港口中文名称*/
    @Column(name = "pod_name_cn")
    private String podNameCn;

    /**目的港港口英文名称*/
    @Column(name = "pod_name_en")
    private String podNameEn;

    /**船名代码*/
    @Column(name = "vessel_code")
    private String vesselCode;

    /**船舶英文船名*/
    @Column(name = "vessel_name")
    private String vesselName;

    /**航线代码*/
    @Column(name = "route_code")
    private String routeCode;

    /**航次*/
    @Column(name = "voyage")
    private String voyage;

    /**船公司代码*/
    @Column(name = "shipping_company_code")
    private String shippingCompanyCode;

    /**船公司名称*/
    @Column(name = "shipping_company_name")
    private String shippingCompanyName;

    /**挂靠港港口代码*/
    @Column(name = "affiliation_port_code")
    private String affiliationPortCode;

    /**挂靠港港口中文名称*/
    @Column(name = "affiliation_port_name_cn")
    private String affiliationPortNameCn;

    /**挂靠港港口英文名称*/
    @Column(name = "affiliation_port_name_en")
    private String affiliationPortNameEn;

    /**国家代码*/
    @Column(name = "country_code")
    private String countryCode;

    /**国家中文名称*/
    @Column(name = "country_name_cn")
    private String countryNameCn;

    /**国家英文名称*/
    @Column(name = "country_name_en")
    private String countryNameEn;

    /**IMO编号*/
    @Column(name = "imo")
    private String imo;

    /**企业类型*/
    @Column(name = "enterprise_type")
    private String enterpriseType;

    /**方向代码*/
    @Column(name = "direction_code")
    private String directionCode;

    /**费用合计*/
    @Column(name = "total_price")
    private BigDecimal totalPrice;

    /**备注*/
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

    /**运输申请号*/
    @Column(name = "order_no")
    private String orderNo;

    /**承运商联系人*/
    @Column(name = "carrier_contact")
    private String carrierContact;

    /**计划单审批状态，取数据字典*/
    @Column(name = "tra_order_status")
    private String traOrderStatus;

    /**贸易方式，取数据字典*/
    @Column(name = "trading_way")
    private String tradingWay;

    /**成交方式，取数据字典*/
    @Column(name = "deal_way")
    private String dealWay;

    /**省州代码（运输起点）*/
    @Column(name = "origin_province_code")
    private String originProvinceCode;

    /**省州名称（运输起点）*/
    @Column(name = "origin_province_name")
    private String originProvinceName;

    /**城市代码（运输起点）*/
    @Column(name = "origin_city_code")
    private String originCityCode;

    /**城市名称（运输起点）*/
    @Column(name = "origin_city_name")
    private String originCityName;

    /**省州代码（运输终点）*/
    @Column(name = "des_province_code")
    private String desProvinceCode;

    /**省州名称（运输终点）*/
    @Column(name = "des_province_name")
    private String desProvinceName;

    /**城市代码（运输终点）*/
    @Column(name = "des_city_code")
    private String desCityCode;

    /**城市名称（运输终点）*/
    @Column(name = "des_city_name")
    private String desCityName;

    /**箱量/箱型尺寸*/
    @Column(name = "ctn_remark")
    private String ctnRemark;

    /**其他运输工具*/
    @Column(name = "other_transportation")
    private String otherTransportation;

    /**货物总名称*/
    @Column(name = "total_name")
    private String totalName;

    /**货物总体积（m³）量*/
    @Column(name = "total_volume")
    private BigDecimal totalVolume;

    /**货物总重量（T）*/
    @Column(name = "total_weight")
    private BigDecimal totalWeight;

    /**委托人*/
    @Column(name = "principal")
    private String principal;

    /**委托单位*/
    @Column(name = "requester")
    private String requester;

    /**委托人联系方式*/
    @Column(name = "principal_contact")
    private String principalContact;

    /**计划单审批状态时间*/
    @Column(name = "tra_order_status_time")
    private Date traOrderStatusTime;

    /**拒绝原因*/
    @Column(name = "tra_order_reason")
    private String traOrderReason;

}