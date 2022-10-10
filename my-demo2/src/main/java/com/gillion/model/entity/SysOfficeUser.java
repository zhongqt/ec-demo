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
@Table(name = "sys_office_user")
public class SysOfficeUser extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    @Id
    @Column(name = "sys_office_user_id")
    @Generator("snowFlakeGenerator")
    private Integer sysOfficeUserId;

    @Column(name = "sys_user_id")
    private Integer sysUserId;

    @Column(name = "sys_office_id")
    private Integer sysOfficeId;

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