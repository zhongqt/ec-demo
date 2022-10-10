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
@Table(name = "ds_type_mapper")
public class DsTypeMapper extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**映射主键*/
    @Id
    @Column(name = "ds_type_mapper_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long dsTypeMapperId;

    /**生效项目唯一键*/
    @Column(name = "project_key")
    private String projectKey;

    /**数据表类型表达式*/
    @Column(name = "jdbc_type_pattern")
    private String jdbcTypePattern;

    /**对应 Java 类型全名*/
    @Column(name = "java_type_full_name")
    private String javaTypeFullName;

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
    private Integer version;

    /**逻辑删除标记*/
    @Column(name = "destroyed")
    private Boolean destroyed;

}