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
@Table(name = "ds_import_failed_log")
public class DsImportFailedLog extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**ID*/
    @Id
    @Column(name = "import_failed_log_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long importFailedLogId;

    /**导入模式编号*/
    @Column(name = "import_pattern_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long importPatternId;

    /**导入任务id*/
    @Column(name = "import_task_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long importTaskId;

    /**模式 tag 标识*/
    @Column(name = "tag")
    private String tag;

    /**出错行数*/
    @Column(name = "record_index")
    private Integer recordIndex;

    /**已处理记录数*/
    @Column(name = "record_data")
    private String recordData;

    /**导入数据校验异常信息*/
    @Column(name = "error_messages")
    private String errorMessages;

    /**创建人*/
    @Column(name = "creator")
    private String creator;

    /**创建时间*/
    @Column(name = "create_time")
    private Date createTime;

    @Column(name = "project_key")
    private String projectKey;

    /**逻辑删除标记*/
    @Column(name = "destroyed")
    private Boolean destroyed;

    /**记录修改人*/
    @Column(name = "modifier")
    private String modifier;

    /**记录最后修改时间*/
    @Column(name = "modify_time")
    private Date modifyTime;

    /**记录版本号*/
    @Column(name = "version")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long version;

}