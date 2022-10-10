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
@Table(name = "food_gov_day_report_detail")
public class FoodGovDayReportDetail extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**主键ID*/
    @Id
    @Column(name = "gov_day_report_detail_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long govDayReportDetailId;

    /**政府机构日报汇总主键id*/
    @Column(name = "gov_day_report_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long govDayReportId;

    /**提报日期*/
    @Column(name = "report_date")
    private Date reportDate;

    /**港口编码*/
    @Column(name = "port_code")
    private String portCode;

    /**港口名称*/
    @Column(name = "port_name")
    private String portName;

    /**货物名称*/
    @Column(name = "good_name")
    private String goodName;

    /**滞留船舶数量（条）*/
    @Column(name = "delay_ship_count")
    private Integer delayShipCount;

    /**滞留货物量（万吨）*/
    @Column(name = "delay_good_count")
    private BigDecimal delayGoodCount;

    /**滞留货物涉及的货主*/
    @Column(name = "delay_content")
    private String delayContent;

    /**总库容（万吨）*/
    @Column(name = "total_capacity")
    private BigDecimal totalCapacity;

    /**可用库容（万吨）*/
    @Column(name = "available_capacity")
    private BigDecimal availableCapacity;

    /**日报状态（0草稿1上传）*/
    @Column(name = "report_status")
    private String reportStatus;

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

    /**删除标志*/
    @Column(name = "is_deleted")
    private Boolean isDeleted;

}