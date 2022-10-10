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
import java.lang.Byte;
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
@Table(name = "data_source")
public class DataSource extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**ID*/
    @Id
    @Column(name = "id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long id;

    @Column(name = "project_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long projectId;

    /**数据库名*/
    @Column(name = "data_source_name")
    private String dataSourceName;

    @Column(name = "schema_name")
    private String schemaName;

    @Column(name = "database_type")
    private Byte databaseType;

    /**0 - 正常, 1 - 暂停服务*/
    @Column(name = "status")
    private Byte status;

    /**url*/
    @Column(name = "url")
    private String url;

    @Column(name = "driver_class_name")
    private String driverClassName;

    /**用户*/
    @Column(name = "username")
    private String username;

    /**密码*/
    @Column(name = "password")
    private String password;

    /**属性*/
    @Column(name = "props")
    private String props;

    /**服务标识*/
    @Column(name = "service_code")
    private String serviceCode;

    @Column(name = "chinese_width")
    private Integer chineseWidth;

    /**创建人*/
    @Column(name = "creator")
    private String creator;

    /**创建时间*/
    @Column(name = "create_time")
    private Date createTime;

    /**修改人*/
    @Column(name = "modifier")
    private String modifier;

    /**修改时间*/
    @Column(name = "modify_time")
    private Date modifyTime;

    /**乐观锁*/
    @Column(name = "version")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long version;

    /**是否删除*/
    @Column(name = "destroyed")
    private Byte destroyed;

    /**是否主数据源*/
    @Column(name = "is_primary")
    private Boolean isPrimary;

    /**进行 DDL 操作的用户名*/
    @Column(name = "ddl_username")
    private String ddlUsername;

    /**进行 DDL 操作的密码*/
    @Column(name = "ddl_password")
    private String ddlPassword;

    @Column(name = "project_key")
    private String projectKey;

}