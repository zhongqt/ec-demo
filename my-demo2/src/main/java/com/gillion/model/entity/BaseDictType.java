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
@Table(name = "base_dict_type")
public class BaseDictType extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    @Id
    @Column(name = "base_dict_type_id")
    @Generator("snowFlakeGenerator")
    private Integer baseDictTypeId;

    @Column(name = "dict_type_code")
    private String dictTypeCode;

    @Column(name = "dict_type_name")
    private String dictTypeName;

    @Column(name = "remark")
    private String remark;

    @Column(name = "is_valid")
    private Integer isValid;

    @Column(name = "invalid_time")
    private Date invalidTime;

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