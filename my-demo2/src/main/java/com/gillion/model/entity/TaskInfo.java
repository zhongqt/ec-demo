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
@Table(name = "task_info")
public class TaskInfo extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**任务ID*/
    @Id
    @Column(name = "task_info_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long taskInfoId;

    /**任务标题*/
    @Column(name = "task_title")
    private String taskTitle;

    /**任务类型*/
    @Column(name = "task_type")
    private String taskType;

    /**执行人*/
    @Column(name = "executor")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long executor;

    /**任务分配人*/
    @Column(name = "dispatchers")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long dispatchers;

    /**发布日期*/
    @Column(name = "publish_date")
    private Date publishDate;

    /**计划开始日期*/
    @Column(name = "plan_start_date")
    private Date planStartDate;

    /**计划完成日期*/
    @Column(name = "plan_end_date")
    private Date planEndDate;

    /**实际开始日期*/
    @Column(name = "start_date")
    private Date startDate;

    /**实际完成日期*/
    @Column(name = "end_date")
    private Date endDate;

    /**任务状态（0：待完成 1：执行中 2：已完成）*/
    @Column(name = "status")
    private Integer status;

    /**父级任务ID*/
    @Column(name = "parent_task_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long parentTaskId;

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