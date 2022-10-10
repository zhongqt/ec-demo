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
@Table(name = "md_customs")
public class MdCustoms extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**关区主键*/
    @Id
    @Column(name = "md_customs_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long mdCustomsId;

    /**国家表主键*/
    @Column(name = "md_country_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long mdCountryId;

    /**省州表主键*/
    @Column(name = "md_province_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long mdProvinceId;

    /**关区编码*/
    @Column(name = "customs_code")
    private String customsCode;

    /**关区名称*/
    @Column(name = "customs_name")
    private String customsName;

    /**关区英文名称*/
    @Column(name = "customs_name_en")
    private String customsNameEn;

    /**国家代码*/
    @Column(name = "country_code")
    private String countryCode;

    /**国家英文名称*/
    @Column(name = "country_name_en")
    private String countryNameEn;

    /**国家中文名称*/
    @Column(name = "country_name_cn")
    private String countryNameCn;

    /**省州名称*/
    @Column(name = "province_code")
    private String provinceCode;

    /**省州中文名称*/
    @Column(name = "province_name_cn")
    private String provinceNameCn;

    /**省州英文名称*/
    @Column(name = "province_name_en")
    private String provinceNameEn;

    @Column(name = "remark")
    private String remark;

    /**有效状态*/
    @Column(name = "is_valid")
    private Boolean isValid;

    /**删除标志*/
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