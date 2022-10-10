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
@Table(name = "failure_message")
public class FailureMessage extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    @Id
    @Column(name = "id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long id;

    @Column(name = "msg_id")
    private String msgId;

    @Column(name = "retry_times")
    private Integer retryTimes;

    @Column(name = "node")
    private String node;

    @Column(name = "topic")
    private String topic;

    @Column(name = "tags")
    private String tags;

    @Column(name = "group_name")
    private String groupName;

    @Column(name = "mq_name")
    private String mqName;

    @Column(name = "exception")
    private String exception;

    @Column(name = "message")
    private String message;

    @Column(name = "message_key")
    private String messageKey;

    @Column(name = "state")
    private Boolean state;

    @Column(name = "consume_time")
    private Date consumeTime;

    @Column(name = "create_time")
    private Date createTime;

    @Column(name = "create_user")
    private String createUser;

    @Column(name = "update_time")
    private Date updateTime;

    @Column(name = "update_user")
    private String updateUser;

}