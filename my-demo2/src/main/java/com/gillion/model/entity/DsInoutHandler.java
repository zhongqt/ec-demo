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
import java.lang.String;
import java.util.Date;


/**
 * @author DaoServiceGenerator
 */
@SuppressWarnings("JpaDataSourceORMInspection")
        @EqualsAndHashCode(callSuper = true)
    @Data
    @Entity
@Table(name = "ds_inout_handler")
public class DsInoutHandler extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    @Id
    @Column(name = "inout_handler_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long inoutHandlerId;

    @Column(name = "tag")
    private String tag;

    @Column(name = "handler_description")
    private String handlerDescription;

    /**处理程序在 SpringContext 中的 beanName*/
    @Column(name = "handler_bean_name")
    private String handlerBeanName;

    @Column(name = "handler_type")
    private Byte handlerType;

    @Column(name = "creator")
    private String creator;

    @Column(name = "create_time")
    private Date createTime;

    @Column(name = "modifier")
    private String modifier;

    @Column(name = "modify_time")
    private Date modifyTime;

    @Column(name = "version")
    private Integer version;

    @Column(name = "destroyed")
    private Boolean destroyed;

}