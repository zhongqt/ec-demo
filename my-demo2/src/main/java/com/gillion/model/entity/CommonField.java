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
@Table(name = "common_field")
public class CommonField extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**ID*/
    @Id
    @Column(name = "id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long id;

    /**项目id*/
    @Column(name = "project_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long projectId;

    /**common field name*/
    @Column(name = "field_name")
    private String fieldName;

    /**common field type*/
    @Column(name = "common_field_type")
    private Integer commonFieldType;

    /**取值表达式，自定义*/
    @Column(name = "value_expression")
    private String valueExpression;

    /**是否更新字段*/
    @Column(name = "is_update")
    private Byte isUpdate;

    /**创建人*/
    @Column(name = "creator")
    private String creator;

    /**创建时间*/
    @Column(name = "create_time")
    private Date createTime;

    /**逻辑删除标记*/
    @Column(name = "destroyed")
    private Boolean destroyed;

    /**修改人*/
    @Column(name = "modifier")
    private String modifier;

    /**修改时间*/
    @Column(name = "modify_time")
    private Date modifyTime;

    /**乐观锁*/
    @Column(name = "version")
    private Integer version;

}