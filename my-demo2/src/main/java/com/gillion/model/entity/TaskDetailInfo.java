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
@Table(name = "task_detail_info")
public class TaskDetailInfo extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**任务子表ID*/
    @Id
    @Column(name = "task_detail_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long taskDetailId;

    /**任务ID*/
    @Column(name = "task_info_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long taskInfoId;

    /**审批人ID*/
    @Column(name = "approver")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long approver;

    /**责任人ID*/
    @Column(name = "leader")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long leader;

    /**统筹人ID*/
    @Column(name = "ordinator")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long ordinator;

    /**规范条目ID*/
    @Column(name = "standard_entry_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long standardEntryId;

    @Column(name = "standard_entry_name")
    private String standardEntryName;

    /**规范条目细则ID*/
    @Column(name = "standard_detail_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long standardDetailId;

    @Column(name = "standard_detail_name")
    private String standardDetailName;

    /**执行时间*/
    @Column(name = "action_time")
    private Integer actionTime;

    /**执行周期*/
    @Column(name = "action_period")
    private Integer actionPeriod;

    /**任务名称*/
    @Column(name = "task_name")
    private String taskName;

    /**执行顺序*/
    @Column(name = "action_serial_num")
    private Integer actionSerialNum;

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

    /**完成进度*/
    @Column(name = "progress")
    private String progress;

    /**结果评估*/
    @Column(name = "result_access")
    private String resultAccess;

    /**完成状态（0：待完成 1：执行中 2：已完成）*/
    @Column(name = "status")
    private Integer status;

    /**申请日期*/
    @Column(name = "apply_date")
    private Date applyDate;

    /**审批日期*/
    @Column(name = "approval_date")
    private Date approvalDate;

    /**转正评语*/
    @Column(name = "offer_remark")
    private String offerRemark;

    /**转正类型*/
    @Column(name = "offer_type")
    private String offerType;

    /**面谈时间*/
    @Column(name = "face_time")
    private Date faceTime;

    /**面谈评语*/
    @Column(name = "face_remark")
    private String faceRemark;

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