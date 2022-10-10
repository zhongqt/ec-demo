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
import java.math.BigDecimal;
import java.util.Date;


/**
 * @author DaoServiceGenerator
 */
@SuppressWarnings("JpaDataSourceORMInspection")
        @EqualsAndHashCode(callSuper = true)
    @Data
    @Entity
@Table(name = "food_arrival_day_report")
public class FoodArrivalDayReport extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    @Id
    @Column(name = "food_arrival_day_report_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long foodArrivalDayReportId;

    /**粮食到港日报表主键id*/
    @Column(name = "food_arrival_day_main_report_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long foodArrivalDayMainReportId;

    /**日报日期*/
    @Column(name = "report_date")
    private Date reportDate;

    /**单据状态（0-草稿、1-已上报 ）*/
    @Column(name = "report_status")
    private String reportStatus;

    /**目的港编码*/
    @Column(name = "pod_code")
    private String podCode;

    /**目的港名称*/
    @Column(name = "pod_name")
    private String podName;

    /**货物编码*/
    @Column(name = "cargo_code")
    private String cargoCode;

    /**货物名称*/
    @Column(name = "cargo_name")
    private String cargoName;

    /**在港船舶数量（条）*/
    @Column(name = "inport_vessel_num")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long inportVesselNum;

    /**在港货物量（万吨）*/
    @Column(name = "inport_cargo_weight")
    private BigDecimal inportCargoWeight;

    /**滞留船舶数量（条）*/
    @Column(name = "stay_vessel_num")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long stayVesselNum;

    /**滞留货物量（万吨）*/
    @Column(name = "stay_cargo_weight")
    private BigDecimal stayCargoWeight;

    /**总库容（万吨）*/
    @Column(name = "total_storage_capacity")
    private BigDecimal totalStorageCapacity;

    /**可用库容（万吨）*/
    @Column(name = "available_storage_capacity")
    private BigDecimal availableStorageCapacity;

    /**上报时间*/
    @Column(name = "order_report_time")
    private Date orderReportTime;

    /**创建人id*/
    @Column(name = "creator_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long creatorId;

    /**创建名称*/
    @Column(name = "creator_name")
    private String creatorName;

    /**创建时间*/
    @Column(name = "create_time")
    private Date createTime;

    /**创建人所属公司id*/
    @Column(name = "create_company_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long createCompanyId;

    /**创建人所属公司name*/
    @Column(name = "create_company_name")
    private String createCompanyName;

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

    /**修改人公司id*/
    @Column(name = "modify_company_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long modifyCompanyId;

    /**修改人所属公司name*/
    @Column(name = "modify_company_name")
    private String modifyCompanyName;

    /**版本号*/
    @Column(name = "record_version")
    private Integer recordVersion;

    /**逻辑删除标识0:未删除 1已删除，默认0*/
    @Column(name = "is_deleted")
    private Boolean isDeleted;

}