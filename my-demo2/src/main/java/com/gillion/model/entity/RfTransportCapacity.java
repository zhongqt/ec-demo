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
@Table(name = "rf_transport_capacity")
public class RfTransportCapacity extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**主键id*/
    @Id
    @Column(name = "rf_transport_capacity_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long rfTransportCapacityId;

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

    /**发货站中文名字，例：中国武汉吴山站*/
    @Column(name = "place_loading_code")
    private String placeLoadingCode;

    /**发货站中文名字，例：中国武汉吴山站*/
    @Column(name = "place_loading_name")
    private String placeLoadingName;

    /**国家代码（运输终点）*/
    @Column(name = "des_country_code")
    private String desCountryCode;

    /**国家名称（运输终点）*/
    @Column(name = "des_country_name")
    private String desCountryName;

    /**到货站中文名字，例：德国汉堡港货运场站*/
    @Column(name = "place_discharge_code")
    private String placeDischargeCode;

    /**到货站中文名字，例：德国汉堡港货运场站*/
    @Column(name = "place_discharge_name")
    private String placeDischargeName;

    /**运输时效*/
    @Column(name = "delivery_time")
    private String deliveryTime;

    /**离境/进境口岸*/
    @Column(name = "transit_port")
    private String transitPort;

    /**预计抵达目的地时间*/
    @Column(name = "eta")
    private Date eta;

    /**预计离起运港时间*/
    @Column(name = "etd")
    private Date etd;

    /**班列(如:中欧班列)*/
    @Column(name = "block_train")
    private String blockTrain;

    /**每周发行时间(格式：1_3_，表示每周一、三有班期)*/
    @Column(name = "schedule")
    private String schedule;

    /**机车国籍/地区名称，例：中国*/
    @Column(name = "train_country_name")
    private String trainCountryName;

    /**列车所经停国的国境铁路站站名*/
    @Column(name = "routing_country_name")
    private String routingCountryName;

    /**主车号*/
    @Column(name = "conveyance_reference_number")
    private String conveyanceReferenceNumber;

    /**班列总车数*/
    @Column(name = "total_number")
    private String totalNumber;

    /**班列运输总箱数，单位：TEU*/
    @Column(name = "container_quantity")
    private String containerQuantity;

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