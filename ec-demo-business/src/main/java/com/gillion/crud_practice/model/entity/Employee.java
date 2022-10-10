package com.gillion.crud_practice.model.entity;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.gillion.ds.entity.base.BaseModel;
import com.gillion.ec.core.annotations.Generator;
import com.gillion.ec.core.utils.Long2String;
import com.gillion.ec.core.utils.String2Long;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;


/**
 * @author DaoServiceGenerator
 */
@SuppressWarnings("JpaDataSourceORMInspection")
        @EqualsAndHashCode(callSuper = true)
    @Data
    @Entity
@Table(name = "employee")
public class Employee extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    @Id
    @Column(name = "id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "cname")
    private String cname;
    @Column(name = "gender")
    private Byte gender;

    @Column(name = "password")
    private String password;

    @Column(name = "mobile")
    private String mobile;


    @Column(name = "email")
    private String email;

    @Column(name = "age")
    private Integer age;

    @Column(name = "version")
    private Integer version;


    @Column(name = "update_time")
    private Date updateTime;

    @Column(name = "department_id")
    private Long departmentId;

}