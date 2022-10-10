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
import java.lang.Byte;
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
@Table(name = "go_cargo")
public class GoCargo extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**主键id*/
    @Id
    @Column(name = "go_cargo_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long goCargoId;

    /**业务id*/
    @Column(name = "business_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long businessId;

    /**业务类型(order订单，traOrder运输方案)*/
    @Column(name = "business_type")
    private String businessType;

    /**货物名称*/
    @Column(name = "cargo_name")
    private String cargoName;

    /**货物英文名称*/
    @Column(name = "cargo_name_en")
    private String cargoNameEn;

    /**货物体积*/
    @Column(name = "volume")
    private BigDecimal volume;

    /**体积单位*/
    @Column(name = "unit_of_volume")
    private String unitOfVolume;

    /**货物重量*/
    @Column(name = "weight")
    private BigDecimal weight;

    /**重量单位*/
    @Column(name = "unit_of_weight")
    private String unitOfWeight;

    /**货物件数   2020/9/27 由原有的package改为cargo_package*/
    @Column(name = "cargo_package")
    private BigDecimal cargoPackage;

    /**需要集装箱数*/
    @Column(name = "container_num")
    private Integer containerNum;

    /**服务需求代码（如914-常温；916-冷藏；917-冷冻；999-其他（要求的服务是其他条件运输，或无需特殊服务）*/
    @Column(name = "service_requirement_code")
    private String serviceRequirementCode;

    /**服务需求名称*/
    @Column(name = "service_requirement")
    private String serviceRequirement;

    /**危险品类别代码*/
    @Column(name = "hazard_code")
    private String hazardCode;

    /**危险品类别代码名称*/
    @Column(name = "hazard_name")
    private String hazardName;

    /**贸易方式 1-装运港船上交货价 2-成本加保险费、运费 3-进口国未完税交货 4-进口国完税后交货*/
    @Column(name = "mode_of_trade")
    private String modeOfTrade;

    /**联合国危险品编号*/
    @Column(name = "undg_number")
    private String undgNumber;

    /**出口资质文件是否齐全且符合目的国要求（是，否）*/
    @Column(name = "is_complete_certificated")
    private Boolean isCompleteCertificated;

    /**备注*/
    @Column(name = "remark")
    private String remark;

    /**删除标识（0-未删除，1-删除）*/
    @Column(name = "is_deleted")
    private Boolean isDeleted;

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

    /**尺寸限制长度（单件）*/
    @Column(name = "size_long")
    private String sizeLong;

    /**尺寸限制宽度（单件）*/
    @Column(name = "size_wide")
    private String sizeWide;

    /**尺寸限制高度（单件）*/
    @Column(name = "size_high")
    private String sizeHigh;

    /**重量限制(单件)*/
    @Column(name = "weight_limit")
    private String weightLimit;

    /**申报价值限制（单票）*/
    @Column(name = "value_limit")
    private String valueLimit;

    /**包装类型  2020/9/27 由原有的package改为tra_package*/
    @Column(name = "package_type")
    private String packageType;

    /**货物件数单位（1-个）*/
    @Column(name = "cargo_quantity_unit")
    private String cargoQuantityUnit;

    /**预计货物交付月从*/
    @Column(name = "start_expected_delivery")
    private String startExpectedDelivery;

    /**预计货物交付月到*/
    @Column(name = "end_expected_delivery")
    private String endExpectedDelivery;

    /**温度单位（华氏度°F、摄氏度℃），数据字典*/
    @Column(name = "unit_temperature")
    private String unitTemperature;

    /**运输温度*/
    @Column(name = "set_temperature")
    private BigDecimal setTemperature;

    /**设置最高温度*/
    @Column(name = "max_temperature")
    private BigDecimal maxTemperature;

    /**设置最低温度*/
    @Column(name = "min_temperature")
    private BigDecimal minTemperature;

    /**湿度*/
    @Column(name = "set_humidity")
    private BigDecimal setHumidity;

    /**通风口单位(CBM/H、CFM(60/HZ))，数据字典*/
    @Column(name = "vent_unit")
    private String ventUnit;

    /**通风口(%)开*/
    @Column(name = "vent_setting")
    private Byte ventSetting;

    /**制冷方式（0-主动，1-被动）*/
    @Column(name = "cooling_method")
    private String coolingMethod;

    /**货物类型代码*/
    @Column(name = "cargo_type")
    private String cargoType;

    /**货物类型名称*/
    @Column(name = "cargo_type_name")
    private String cargoTypeName;

}