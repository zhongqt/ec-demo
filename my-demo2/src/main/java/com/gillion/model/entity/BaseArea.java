package com.gillion.model.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import com.gillion.ec.core.annotations.Generator;
import com.gillion.ds.entity.base.BaseModel;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.lang.Integer;
import java.lang.String;
import java.util.Date;


/**
 * @author DaoServiceGenerator
 */
@SuppressWarnings("JpaDataSourceORMInspection")
        @EqualsAndHashCode(callSuper = true)
    @Data
    @Entity
@Table(name = "base_area")
public class BaseArea extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    @Id
    @Column(name = "base_area_id")
    @Generator("snowFlakeGenerator")
    private Integer baseAreaId;

    @Column(name = "area_code")
    private String areaCode;

    @Column(name = "area_name")
    private String areaName;

    @Column(name = "area_level")
    private String areaLevel;

    @Column(name = "parent_area_id")
    private Integer parentAreaId;

    @Column(name = "area_name_en")
    private String areaNameEn;

    @Column(name = "postal_code")
    private String postalCode;

    @Column(name = "is_valid")
    private Integer isValid;

    @Column(name = "remark")
    private String remark;

    @Column(name = "is_deleted")
    private Integer isDeleted;

    @Column(name = "creator_id")
    private Integer creatorId;

    @Column(name = "creator_name")
    private String creatorName;

    @Column(name = "create_time")
    private Date createTime;

    @Column(name = "create_company_id")
    private Integer createCompanyId;

    @Column(name = "create_company_name")
    private String createCompanyName;

    @Column(name = "modifier_id")
    private Integer modifierId;

    @Column(name = "modifier_name")
    private String modifierName;

    @Column(name = "modify_time")
    private Date modifyTime;

    @Column(name = "modify_company_id")
    private Integer modifyCompanyId;

    @Column(name = "modify_company_name")
    private String modifyCompanyName;

    @Column(name = "record_version")
    private Integer recordVersion;

}