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
@Table(name = "business_information")
public class BusinessInformation extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**企业经营信息表ID*/
    @Id
    @Column(name = "business_information_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long businessInformationId;

    /**企业ID*/
    @Column(name = "company_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long companyId;

    /**企业名称*/
    @Column(name = "company_name")
    private String companyName;

    /**运输经营许可证编号*/
    @Column(name = "transport_no")
    private String transportNo;

    /**日均订单量*/
    @Column(name = "order_qty")
    private Integer orderQty;

    /**拥有车辆数*/
    @Column(name = "vehicle_qty")
    private Integer vehicleQty;

    /**拥有货运飞机数量*/
    @Column(name = "cargo_aircraft_qty")
    private Integer cargoAircraftQty;

    /**拥有船舶数量*/
    @Column(name = "ship_qty")
    private Integer shipQty;

    /**主要运输类型*/
    @Column(name = "main_transportation_type")
    private String mainTransportationType;

    /**主要经营线路*/
    @Column(name = "main_business_line")
    private String mainBusinessLine;

    /**注册资本*/
    @Column(name = "registered_capital")
    private String registeredCapital;

    /**经营状态*/
    @Column(name = "operation_status")
    private String operationStatus;

    /**成立日期*/
    @Column(name = "incorporation_date")
    private Date incorporationDate;

    /**营业期限*/
    @Column(name = "business_term")
    private String businessTerm;

    /**实缴金额*/
    @Column(name = "actual_payment_amount")
    private String actualPaymentAmount;

    /**经营范围*/
    @Column(name = "business_scope")
    private String businessScope;

    /**备注*/
    @Column(name = "remark")
    private String remark;

    /**删除标识（0-未删除，1-已删除）*/
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

    /**主要货物流向*/
    @Column(name = "main_cargo_flow")
    private String mainCargoFlow;

    /**主营货物类型*/
    @Column(name = "main_cargo_type")
    private String mainCargoType;

    /**信息化系统建设情况*/
    @Column(name = "info_system_build_situation")
    private String infoSystemBuildSituation;

    /**主要服务区域*/
    @Column(name = "main_service_area")
    private String mainServiceArea;

    /**企业网站*/
    @Column(name = "corporate_website")
    private String corporateWebsite;

    /**主要经营类型*/
    @Column(name = "main_business_type")
    private String mainBusinessType;

    /**LOGO图片地址*/
    @Column(name = "logo_path")
    private String logoPath;

    /**企业类型*/
    @Column(name = "company_type_code")
    private String companyTypeCode;

    /**企业性质*/
    @Column(name = "company_property")
    private String companyProperty;

}