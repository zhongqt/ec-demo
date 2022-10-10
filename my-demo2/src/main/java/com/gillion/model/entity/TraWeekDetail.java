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
import java.lang.Double;
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
@Table(name = "tra_week_detail")
public class TraWeekDetail extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**主键ID*/
    @Id
    @Column(name = "tra_week_detail_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long traWeekDetailId;

    /**运输方式*/
    @Column(name = "transport_type")
    private String transportType;

    /**发出地国家*/
    @Column(name = "country_origin")
    private String countryOrigin;

    /**发出地省份*/
    @Column(name = "province_origin")
    private String provinceOrigin;

    /**发出起点*/
    @Column(name = "point_origin")
    private String pointOrigin;

    /**目的地国家*/
    @Column(name = "country_destination")
    private String countryDestination;

    /**运输终点*/
    @Column(name = "point_destination")
    private String pointDestination;

    /**货物品名*/
    @Column(name = "goods_name")
    private String goodsName;

    /**货物分类*/
    @Column(name = "goods_type")
    private String goodsType;

    /**上报时间段*/
    @Column(name = "report_time_period")
    private String reportTimePeriod;

    /**重量*/
    @Column(name = "weight")
    private Double weight;

    /**起运时间*/
    @Column(name = "shipment_time")
    private Date shipmentTime;

    /**到达时间*/
    @Column(name = "arrive_time")
    private Date arriveTime;

    /**上报人id*/
    @Column(name = "user_id")
    private String userId;

    /**删除标志*/
    @Column(name = "is_deleted")
    private Boolean isDeleted;

    /**关联周运输上报表id*/
    @Column(name = "upload_id")
    private String uploadId;

    /**集装箱个数*/
    @Column(name = "containers_num")
    private String containersNum;

    /**集装箱尺寸*/
    @Column(name = "containers_size")
    private String containersSize;

    /**备注*/
    @Column(name = "remark")
    private String remark;

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
    private String createTime;

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
    private String modifyTime;

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

}