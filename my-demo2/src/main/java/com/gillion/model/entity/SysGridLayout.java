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
@Table(name = "sys_grid_layout")
public class SysGridLayout extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**布局Id*/
    @Id
    @Column(name = "sys_grid_layout_id")
    @Generator("snowFlakeGenerator")
    private String sysGridLayoutId;

    /**用户标识Id*/
    @Column(name = "user_id")
    private Integer userId;

    /**用户角色标识id*/
    @Column(name = "role_id")
    private Integer roleId;

    /**表唯一标识*/
    @Column(name = "table_id")
    private String tableId;

    /**表格布局*/
    @Column(name = "content")
    private String content;

    /**布局名称*/
    @Column(name = "name")
    private String name;

    /**最后修改时间*/
    @Column(name = "modify_time")
    private Date modifyTime;

}