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
@Table(name = "go_manifest_cargo")
public class GoManifestCargo extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**主键id*/
    @Id
    @Column(name = "go_manifest_cargo_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long goManifestCargoId;

    /**运单id*/
    @Column(name = "go_manifest_order_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long goManifestOrderId;

    /**箱号*/
    @Column(name = "container_number")
    private String containerNumber;

    /**箱尺寸*/
    @Column(name = "container_size")
    private String containerSize;

    /**运单号*/
    @Column(name = "waybill_no")
    private String waybillNo;

    /**车号*/
    @Column(name = "train_number")
    private String trainNumber;

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

    /**包装类型*/
    @Column(name = "package_type")
    private String packageType;

    /**货物件数*/
    @Column(name = "cargo_package")
    private BigDecimal cargoPackage;

    /**服务需求代码（如914-常温；916-冷藏；917-冷冻；918-危险品；999-其他（要求的服务是其他条件运输，或无需特殊服务）*/
    @Column(name = "service_requirement_code")
    private String serviceRequirementCode;

    /**温度单位（华氏度°F、摄氏度℃）*/
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

    /**湿度(%)*/
    @Column(name = "set_humidity")
    private BigDecimal setHumidity;

    /**通风口单位(CBM/H、CFM(60/HZ))*/
    @Column(name = "vent_unit")
    private String ventUnit;

    /**通风口设置*/
    @Column(name = "vent_setting")
    private Integer ventSetting;

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

    /**制冷方式（0-主动，1-被动）*/
    @Column(name = "cooling_method")
    private String coolingMethod;

    /**货物类型代码*/
    @Column(name = "cargo_type")
    private String cargoType;

    /**货物类型名称*/
    @Column(name = "cargo_type_name")
    private String cargoTypeName;

    /**危险品类别代码*/
    @Column(name = "hazard_code")
    private String hazardCode;

    /**危险货物名称*/
    @Column(name = "hazard_name")
    private String hazardName;

    /**联合国危险品编号*/
    @Column(name = "undg_number")
    private String undgNumber;

    /**联合国危险品名称*/
    @Column(name = "undg_name")
    private String undgName;

    /**危险品闪点*/
    @Column(name = "danger_flash_point")
    private Byte dangerFlashPoint;

}