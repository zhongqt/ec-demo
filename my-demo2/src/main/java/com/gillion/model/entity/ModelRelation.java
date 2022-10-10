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
@Table(name = "model_relation")
public class ModelRelation extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**ID*/
    @Id
    @Column(name = "id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long id;

    /**模型关系*/
    @Column(name = "relation_type")
    private Integer relationType;

    /**数据表*/
    @Column(name = "from_model_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long fromModelId;

    /**数据表*/
    @Column(name = "to_model_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long toModelId;

    /**是否级联删除*/
    @Column(name = "is_cascade_destroy")
    private Boolean isCascadeDestroy;

    /**查询时是否采用INNER JOIN(默认LEFT JOIN)*/
    @Column(name = "is_inner_join")
    private Boolean isInnerJoin;

    @Column(name = "intermediate_model_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long intermediateModelId;

    /**从模型在主模型中的组合名称*/
    @Column(name = "at_from_model_alias")
    private String atFromModelAlias;

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
    private Boolean destroyed;

    @Column(name = "from_model_name")
    private String fromModelName;

    @Column(name = "to_model_name")
    private String toModelName;

    @Column(name = "data_source_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long dataSourceId;

    /**跨服务编码*/
    @Column(name = "cross_service_code")
    private String crossServiceCode;

    /**跨服务数据库名称*/
    @Column(name = "cross_schema_name")
    private String crossSchemaName;

}