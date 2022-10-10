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
@Table(name = "ds_import_task")
public class DsImportTask extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**ID*/
    @Id
    @Column(name = "import_task_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long importTaskId;

    /**导入模式编号*/
    @Column(name = "import_pattern_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long importPatternId;

    /**表头以 , join*/
    @Column(name = "headers")
    private String headers;

    /**已处理记录数*/
    @Column(name = "processed_count")
    private Integer processedCount;

    /**错误条数*/
    @Column(name = "processed_error_count")
    private Integer processedErrorCount;

    /**开始时间*/
    @Column(name = "start_datetime")
    private Date startDatetime;

    /**结束时间*/
    @Column(name = "end_datetime")
    private Date endDatetime;

    /**会话附加信息*/
    @Column(name = "session_arguments")
    private String sessionArguments;

    /**WATING/PROCESSING/COMPLATED/ERROR*/
    @Column(name = "task_status")
    private Integer taskStatus;

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
    private Integer version;

    /**是否删除*/
    @Column(name = "destroyed")
    private Boolean destroyed;

}