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
@Table(name = "sys_request_log")
public class SysRequestLog extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**id*/
    @Id
    @Column(name = "sys_request_log_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long sysRequestLogId;

    /**请求URL*/
    @Column(name = "request_url")
    private String requestUrl;

    /**请求方式（GET、POST）*/
    @Column(name = "method")
    private String method;

    /**请求头参数*/
    @Column(name = "header_param")
    private String headerParam;

    /**查询参数*/
    @Column(name = "query_string")
    private String queryString;

    /**请求体*/
    @Column(name = "request_body")
    private String requestBody;

    /**请求来源地址*/
    @Column(name = "remote_address")
    private String remoteAddress;

    /**请求类型(0-请求外部系统；1-接收外部系统请求)*/
    @Column(name = "type")
    private String type;

    /**状态码*/
    @Column(name = "status_code")
    private String statusCode;

    /**业务是否成功(0-失败；1-成功)*/
    @Column(name = "is_success")
    private Boolean isSuccess;

    /**请求结果*/
    @Column(name = "result")
    private String result;

    /**重试次数*/
    @Column(name = "rectry_count")
    private Integer rectryCount;

    /**创建人id*/
    @Column(name = "creator_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long creatorId;

    /**创建人名称*/
    @Column(name = "creator_name")
    private String creatorName;

    /**创建时间*/
    @Column(name = "create_time")
    private Date createTime;

    /**修改人id*/
    @Column(name = "modifier_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long modifierId;

    /**修改人名称*/
    @Column(name = "modifier_name")
    private String modifierName;

    /**修改时间*/
    @Column(name = "modify_time")
    private Date modifyTime;

    /**版本号*/
    @Column(name = "record_version")
    private Integer recordVersion;

}