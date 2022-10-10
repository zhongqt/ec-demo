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
@Table(name = "food_port_arrival_information")
public class FoodPortArrivalInformation extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**港口运抵信息id*/
    @Id
    @Column(name = "port_arrival_information_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long portArrivalInformationId;

    /**粮食运输情况表主键id*/
    @Column(name = "food_transport_order_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long foodTransportOrderId;

    /**港口编码*/
    @Column(name = "port_code")
    private String portCode;

    /**港口名称*/
    @Column(name = "port_name")
    private String portName;

    /**预计抵锚日期*/
    @Column(name = "expected_anchor_date")
    private Date expectedAnchorDate;

    /**预计靠泊日期*/
    @Column(name = "expected_berthing_date")
    private Date expectedBerthingDate;

    /**预计离泊日期*/
    @Column(name = "expected_berth_date")
    private Date expectedBerthDate;

    /**预计报关日期*/
    @Column(name = "expected_cunstoms_date")
    private Date expectedCunstomsDate;

    /**当前状态*/
    @Column(name = "port_arrival_status")
    private String portArrivalStatus;

    /**实际抵锚日期*/
    @Column(name = "actual_anchor_date")
    private Date actualAnchorDate;

    /**实际靠泊日期*/
    @Column(name = "actual_berthing_date")
    private Date actualBerthingDate;

    /**锚地过驳日期*/
    @Column(name = "anchor_transit_date")
    private Date anchorTransitDate;

    /**实际离泊日期*/
    @Column(name = "actual_berth_date")
    private Date actualBerthDate;

    /**实际报关日期*/
    @Column(name = "actual_cunstoms_date")
    private Date actualCunstomsDate;

    /**锚地实际等待时间*/
    @Column(name = "anchorage_actually_waits_date")
    private Date anchorageActuallyWaitsDate;

    /**锚地还需等待时间*/
    @Column(name = "anchorage_also_waits_date")
    private Date anchorageAlsoWaitsDate;

    /**实际作业时间*/
    @Column(name = "actual_working_date")
    private Date actualWorkingDate;

    /**还需作业时间*/
    @Column(name = "also_working_date")
    private Date alsoWorkingDate;

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