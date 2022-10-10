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
@Table(name = "tra_transportation")
public class TraTransportation extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**运输工具表id*/
    @Id
    @Column(name = "tra_transportation_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long traTransportationId;

    /**运输计划表id*/
    @Column(name = "tra_order_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long traOrderId;

    /**车牌号*/
    @Column(name = "car_no")
    private String carNo;

    /**押运员、随车人员姓名*/
    @Column(name = "escort")
    private String escort;

    /**车辆铅封号*/
    @Column(name = "car_lead_seal")
    private String carLeadSeal;

    /**备注*/
    @Column(name = "remark")
    private String remark;

    /**随车人员手机号*/
    @Column(name = "accompany_mobile")
    private String accompanyMobile;

    /**随车人员身份证号*/
    @Column(name = "accompany_id_card")
    private String accompanyIdCard;

    /**删除标识（0-未删除，1-删除）*/
    @Column(name = "is_deleted")
    private Boolean isDeleted;

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

    /**车牌颜色*/
    @Column(name = "plate_number_color")
    private String plateNumberColor;

}