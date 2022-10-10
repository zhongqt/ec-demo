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
import java.lang.String;
import java.util.Date;


/**
 * @author DaoServiceGenerator
 */
@SuppressWarnings("JpaDataSourceORMInspection")
        @EqualsAndHashCode(callSuper = true)
    @Data
    @Entity
@Table(name = "ds_ddl_event_log")
public class DsDdlEventLog extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**日志表主键*/
    @Id
    @Column(name = "ddl_event_log_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long ddlEventLogId;

    /**操作类型*/
    @Column(name = "event_type")
    private Boolean eventType;

    /**所执行的DDL SQL*/
    @Column(name = "ddl_sql")
    private String ddlSql;

    /**事件发起人*/
    @Column(name = "creator")
    private String creator;

    /**发生时间*/
    @Column(name = "create_time")
    private Date createTime;

    /**记录最后修改人*/
    @Column(name = "modifier")
    private String modifier;

    /**记录最后修改时间*/
    @Column(name = "modify_time")
    private Date modifyTime;

    /**乐观锁版本号*/
    @Column(name = "version")
    private Integer version;

    /**记录删除标记*/
    @Column(name = "destroyed")
    private Boolean destroyed;

    /**所属组织编号*/
    @Column(name = "group_name")
    private String groupName;

}