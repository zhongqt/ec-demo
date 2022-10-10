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
@Table(name = "model_member_info")
public class ModelMemberInfo extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**ID*/
    @Id
    @Column(name = "id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long id;

    /**model if*/
    @Column(name = "model_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long modelId;

    /**model field*/
    @Column(name = "field_name")
    private String fieldName;

    /**table  column*/
    @Column(name = "column_name")
    private String columnName;

    /**字段的注释, 可以分析后作为默认列中文名, 定义校验规则等*/
    @Column(name = "column_comment")
    private String columnComment;

    /**jdbc type*/
    @Column(name = "jdbc_type")
    private Integer jdbcType;

    @Column(name = "column_length")
    private Integer columnLength;

    @Column(name = "column_scale")
    private Byte columnScale;

    @Column(name = "java_type_name")
    private String javaTypeName;

    /**通用字段*/
    @Column(name = "common_field_type")
    private Integer commonFieldType;

    /**字段额外附加信息标记， 用于枚举通过位运算得出的向量值， 记录多种附加类型信息*/
    @Column(name = "additional_mark")
    private Byte additionalMark;

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

}