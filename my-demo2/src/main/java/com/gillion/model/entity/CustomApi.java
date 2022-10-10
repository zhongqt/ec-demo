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
@Table(name = "custom_api")
public class CustomApi extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**ID*/
    @Id
    @Column(name = "id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long id;

    /**数据库名*/
    @Column(name = "data_source_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long dataSourceId;

    /**api key，应用层确保唯一*/
    @Column(name = "api_key")
    private String apiKey;

    /**自定义SQL*/
    @Column(name = "custom_sql")
    private String customSql;

    /**类型，默认0-sql*/
    @Column(name = "api_type")
    private Byte apiType;

    /**SQL模型, JSON ARRAY*/
    @Column(name = "model_list")
    private String modelList;

    @Column(name = "parameter_type")
    private String parameterType;

    /**备注*/
    @Column(name = "remark")
    private String remark;

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

    /**是否删除*/
    @Column(name = "destroyed")
    private Byte destroyed;

    /**是否高级语句*/
    @Column(name = "is_advanced")
    private Boolean isAdvanced;

    @Column(name = "project_key")
    private String projectKey;

}