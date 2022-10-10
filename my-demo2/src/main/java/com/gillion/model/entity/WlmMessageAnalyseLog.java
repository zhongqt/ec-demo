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
@Table(name = "wlm_message_analyse_log")
public class WlmMessageAnalyseLog extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**uuid*/
    @Id
    @Column(name = "uuid")
    @Generator("snowFlakeGenerator")
    private String uuid;

    /**action_type*/
    @Column(name = "action_type")
    private String actionType;

    /**报文eventId*/
    @Column(name = "event_id")
    private String eventId;

    /**解析错误信息*/
    @Column(name = "note")
    private String note;

    /**创建时间*/
    @Column(name = "create_time")
    private Date createTime;

    /**更新时间*/
    @Column(name = "update_time")
    private Date updateTime;

}