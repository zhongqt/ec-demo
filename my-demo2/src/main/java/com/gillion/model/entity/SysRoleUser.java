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
import java.util.Date;


/**
 * @author DaoServiceGenerator
 */
@SuppressWarnings("JpaDataSourceORMInspection")
        @EqualsAndHashCode(callSuper = true)
    @Data
    @Entity
@Table(name = "sys_role_user")
public class SysRoleUser extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    @Id
    @Column(name = "role_user_id")
    @Generator("snowFlakeGenerator")
    private Integer roleUserId;

    @Column(name = "role_id")
    private Integer roleId;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "create_time")
    private Date createTime;

    @Column(name = "creater_id")
    private Integer createrId;

    @Column(name = "update_time")
    private Date updateTime;

    @Column(name = "updater_id")
    private Integer updaterId;

}