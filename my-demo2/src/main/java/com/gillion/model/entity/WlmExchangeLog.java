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
import java.lang.String;
import java.util.Date;


/**
 * @author DaoServiceGenerator
 */
@SuppressWarnings("JpaDataSourceORMInspection")
        @EqualsAndHashCode(callSuper = true)
    @Data
    @Entity
@Table(name = "wlm_exchange_log")
public class WlmExchangeLog extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    @Id
    @Column(name = "uuid")
    @Generator("snowFlakeGenerator")
    private String uuid;

    @Column(name = "action")
    private String action;

    @Column(name = "action_type")
    private String actionType;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "token")
    private String token;

    @Column(name = "request_data")
    private String requestData;

    @Column(name = "response_data")
    private String responseData;

    @Column(name = "create_time")
    private Date createTime;

    @Column(name = "update_time")
    private Date updateTime;

    @Column(name = "remark")
    private String remark;

    @Column(name = "event_id")
    private String eventId;

}