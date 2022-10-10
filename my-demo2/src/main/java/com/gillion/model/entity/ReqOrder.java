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
@Table(name = "req_order")
public class ReqOrder extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**主键id*/
    @Id
    @Column(name = "req_order_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long reqOrderId;

    /**订单id*/
    @Column(name = "go_order_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long goOrderId;

    /**装货地址*/
    @Column(name = "load_address")
    private String loadAddress;

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

    /**城市代码（运输起点）*/
    @Column(name = "origin_city_code")
    private String originCityCode;

    /**城市名称（运输起点）*/
    @Column(name = "origin_city_name")
    private String originCityName;

    /**区县代码（运输起点）*/
    @Column(name = "origin_county_code")
    private String originCountyCode;

    /**区县名称（运输起点）*/
    @Column(name = "origin_county_name")
    private String originCountyName;

    /**详细地址（运输起点港口、铁路货场、机场）*/
    @Column(name = "origin_address")
    private String originAddress;

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

    /**城市代码（运输终点）*/
    @Column(name = "des_city_code")
    private String desCityCode;

    /**城市名称（运输终点）*/
    @Column(name = "des_name")
    private String desName;

    /**区县代码（运输终点）*/
    @Column(name = "des_county_code")
    private String desCountyCode;

    /**区县名称（运输终点）*/
    @Column(name = "des_county_name")
    private String desCountyName;

    /**详细地址（运输终点港口、铁路货场、机场）*/
    @Column(name = "des_address")
    private String desAddress;

    /**起运时间(yyyy-MM-dd HH:mm:ss)*/
    @Column(name = "start_time")
    private Date startTime;

    /**要求送达时间(yyyy-MM-dd)*/
    @Column(name = "arrive_time")
    private Date arriveTime;

    /**运输类型(1-公路、2-铁路、3-水运、4-民航、5-邮政快递)*/
    @Column(name = "transport_type")
    private String transportType;

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

    /**起运明细（港口、站点）*/
    @Column(name = "shipment_details")
    private String shipmentDetails;

    /**到达明细（港口、站点）*/
    @Column(name = "arrival_details")
    private String arrivalDetails;

    /**贸易方式，取数据字典*/
    @Column(name = "trading_way")
    private String tradingWay;

    /**成交方式，取数据字典*/
    @Column(name = "deal_way")
    private String dealWay;

    /**通行线路及重要节点*/
    @Column(name = "important_node")
    private String importantNode;

    /**起始定位地点*/
    @Column(name = "begin_location")
    private String beginLocation;

    /**起始上报时间*/
    @Column(name = "begin_upload_time")
    private Date beginUploadTime;

    /**结束定位地点*/
    @Column(name = "finish_location")
    private String finishLocation;

    /**结束上报时间*/
    @Column(name = "finish_upload_time")
    private Date finishUploadTime;

}