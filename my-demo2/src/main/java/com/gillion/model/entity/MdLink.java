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
@Table(name = "md_link")
public class MdLink extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**主键id*/
    @Id
    @Column(name = "md_link_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long mdLinkId;

    /**运输方式*/
    @Column(name = "transported_type")
    private String transportedType;

    /**环节代码*/
    @Column(name = "link_code")
    private String linkCode;

    /**环节名称（提货、送货、报关、报检、清关、空运干线）*/
    @Column(name = "link_name")
    private String linkName;

    /**排序*/
    @Column(name = "sort")
    private Integer sort;

    /**备注*/
    @Column(name = "remark")
    private String remark;

    /**删除标识（0-未删除，1-已删除）*/
    @Column(name = "is_deleted")
    private Boolean isDeleted;

    /**创建人id*/
    @Column(name = "creator_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long creatorId;

    /**创建人名称*/
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