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
@Table(name = "sys_technical_title")
public class SysTechnicalTitle extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**岗位职称ID*/
    @Id
    @Column(name = "technical_title_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long technicalTitleId;

    /**职称名称*/
    @Column(name = "technical_name")
    private String technicalName;

    /**工龄*/
    @Column(name = "seniority")
    private String seniority;

    /**岗位ID*/
    @Column(name = "post_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long postId;

    /**状态（0正常 1停用）*/
    @Column(name = "status")
    private String status;

    /**创建者*/
    @Column(name = "create_by")
    private String createBy;

    /**创建时间*/
    @Column(name = "create_time")
    private Date createTime;

    /**更新者*/
    @Column(name = "update_by")
    private String updateBy;

    /**更新时间*/
    @Column(name = "update_time")
    private Date updateTime;

    /**备注*/
    @Column(name = "remark")
    private String remark;

}