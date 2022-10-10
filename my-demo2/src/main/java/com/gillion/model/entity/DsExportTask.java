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
@Table(name = "ds_export_task")
public class DsExportTask extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**ID*/
    @Id
    @Column(name = "export_task_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long exportTaskId;

    /**导入模式编号*/
    @Column(name = "export_pattern_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long exportPatternId;

    /**文件存放路径*/
    @Column(name = "file_path")
    private String filePath;

    /**导出文件名*/
    @Column(name = "export_file_name")
    private String exportFileName;

    @Column(name = "export_file_id")
    private String exportFileId;

    /**导出对应的查询模式数据结构：字段，条件，聚合*/
    @Column(name = "export_query_pattern")
    private String exportQueryPattern;

    /**当前进度相关参数, 比如分页导出的分页信息*/
    @Column(name = "progress_arguments")
    private String progressArguments;

    /**已处理记录数*/
    @Column(name = "processed_count")
    private Integer processedCount;

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
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long version;

    /**是否删除*/
    @Column(name = "destroyed")
    private Boolean destroyed;

}