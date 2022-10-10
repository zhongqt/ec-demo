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
@Table(name = "import_task_queue")
public class ImportTaskQueue extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    @Id
    @Column(name = "import_request_key")
    @Generator("snowFlakeGenerator")
    private String importRequestKey;

    @Column(name = "import_config_key")
    private String importConfigKey;

    @Column(name = "original_filename")
    private String originalFilename;

    @Column(name = "cookie_values")
    private String cookieValues;

    @Column(name = "progress")
    private Integer progress;

    @Column(name = "request_path")
    private String requestPath;

    @Column(name = "error_message")
    private String errorMessage;

    @Column(name = "state")
    private String state;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "create_datetime")
    private Date createDatetime;

}