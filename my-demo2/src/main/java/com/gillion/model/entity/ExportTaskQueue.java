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
@Table(name = "export_task_queue")
public class ExportTaskQueue extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    @Id
    @Column(name = "export_request_key")
    @Generator("snowFlakeGenerator")
    private String exportRequestKey;

    @Column(name = "export_config_key")
    private String exportConfigKey;

    @Column(name = "cookie_values")
    private String cookieValues;

    @Column(name = "params")
    private String params;

    @Column(name = "progress")
    private Integer progress;

    @Column(name = "request_path")
    private String requestPath;

    @Column(name = "filename")
    private String filename;

    @Column(name = "state")
    private String state;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "error_message")
    private String errorMessage;

    @Column(name = "create_datetime")
    private Date createDatetime;

}