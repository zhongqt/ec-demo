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
@Table(name = "go_link_delivery")
public class GoLinkDelivery extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**主键id*/
    @Id
    @Column(name = "go_link_delivery_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long goLinkDeliveryId;

    /**订单id*/
    @Column(name = "go_order_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long goOrderId;

    /**运单id*/
    @Column(name = "go_manifest_order_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long goManifestOrderId;

    /**环节类型（PKP-前段提货、PD-后段配送）*/
    @Column(name = "link_type")
    private String linkType;

    /**分运单号*/
    @Column(name = "hwab_no")
    private String hwabNo;

    /**运单流水号*/
    @Column(name = "wab_no")
    private String wabNo;

    /**国家代码（运输起点）*/
    @Column(name = "country_code")
    private String countryCode;

    /**国家名称（运输起点）*/
    @Column(name = "country_name")
    private String countryName;

    /**省州代码（运输起点）*/
    @Column(name = "province_code")
    private String provinceCode;

    /**省州名称（运输起点）*/
    @Column(name = "province_name")
    private String provinceName;

    /**城市代码（运输起点）*/
    @Column(name = "city_code")
    private String cityCode;

    /**城市名称（运输起点）*/
    @Column(name = "city_name")
    private String cityName;

    /**详细地址*/
    @Column(name = "link_address")
    private String linkAddress;

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

}