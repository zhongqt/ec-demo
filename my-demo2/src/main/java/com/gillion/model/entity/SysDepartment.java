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
import java.lang.Byte;
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
@Table(name = "sys_department")
public class SysDepartment extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**部门id*/
    @Id
    @Column(name = "department_id")
    @Generator("snowFlakeGenerator")
    private Integer departmentId;

    @Column(name = "department_no")
    private String departmentNo;

    /**部门名称*/
    @Column(name = "department_name")
    private String departmentName;

    /**合作伙伴Id*/
    @Column(name = "partner_id")
    private Integer partnerId;

    /**创建时间*/
    @Column(name = "create_time")
    private Date createTime;

    /**创建人*/
    @Column(name = "creater_id")
    private Integer createrId;

    @Column(name = "contact")
    private String contact;

    @Column(name = "phone")
    private Integer phone;

    @Column(name = "fax")
    private Integer fax;

    @Column(name = "address")
    private String address;

    /**状态1:启用，0：停用*/
    @Column(name = "status")
    private Byte status;

}