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
@Table(name = "sys_user")
public class SysUser extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**用户Id*/
    @Id
    @Column(name = "user_id")
    @Generator("snowFlakeGenerator")
    private Integer userId;

    /**密码*/
    @Column(name = "password")
    private String password;

    /**所属合作伙伴Id*/
    @Column(name = "partner_id")
    private Integer partnerId;

    /**用户类型(1:平台用户 2:承运商用户 3:客户)*/
    @Column(name = "user_type")
    private Byte userType;

    /**创建时间*/
    @Column(name = "create_time")
    private Date createTime;

    /**状态（1:启用，0：禁用）*/
    @Column(name = "status")
    private Byte status;

    /**昵称*/
    @Column(name = "nick_name")
    private String nickName;

    /**创建人*/
    @Column(name = "creater_id")
    private Integer createrId;

    /**手机号*/
    @Column(name = "mobile")
    private String mobile;

    /**删除，0：未删除，1：已删除*/
    @Column(name = "delete_flg")
    private Byte deleteFlg;

    /**部门id*/
    @Column(name = "department_id")
    private Integer departmentId;

    /**用户姓名*/
    @Column(name = "user_full_name")
    private String userFullName;

    /**email*/
    @Column(name = "email")
    private String email;

    /**员工编号*/
    @Column(name = "user_no")
    private String userNo;

    /**备注*/
    @Column(name = "remark")
    private String remark;

    /**公司名称*/
    @Column(name = "company_name")
    private String companyName;

    /**公司地址*/
    @Column(name = "company_address")
    private String companyAddress;

    @Column(name = "role_id")
    private String roleId;

    @Column(name = "sex")
    private String sex;

    @Column(name = "version")
    private String version;

    @Column(name = "age")
    private Integer age;

    /**用户名*/
    @Column(name = "username")
    private String username;

}