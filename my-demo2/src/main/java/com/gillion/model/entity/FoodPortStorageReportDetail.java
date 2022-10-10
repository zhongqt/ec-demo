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
@Table(name = "food_port_storage_report_detail")
public class FoodPortStorageReportDetail extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**明细id*/
    @Id
    @Column(name = "port_storage_report_detail_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long portStorageReportDetailId;

    /**主表id*/
    @Column(name = "port_storage_report_main_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long portStorageReportMainId;

    /**货物名称*/
    @Column(name = "good_name")
    private String goodName;

    /**永久库容*/
    @Column(name = "forever_capacity")
    private BigDecimal foreverCapacity;

    /**临时库容*/
    @Column(name = "temp_capacity")
    private BigDecimal tempCapacity;

    /** 租赁库容*/
    @Column(name = "rent_capacity")
    private BigDecimal rentCapacity;

    /** 总库容*/
    @Column(name = "total_capacity")
    private BigDecimal totalCapacity;

    /** 已存库容*/
    @Column(name = "used_capacity")
    private BigDecimal usedCapacity;

    /** 已存明细*/
    @Column(name = "used_detail")
    private String usedDetail;

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

    /** 当日入库*/
    @Column(name = "today_in")
    private BigDecimal todayIn;

    /** 当日出库*/
    @Column(name = "today_out")
    private BigDecimal todayOut;

}