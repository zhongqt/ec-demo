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
@Table(name = "sp_order_status")
public class SpOrderStatus extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**主键id*/
    @Id
    @Column(name = "sp_order_status_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long spOrderStatusId;

    /**运单主键id*/
    @Column(name = "go_manifest_order_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long goManifestOrderId;

    /**服务项id（2021/1/8新增）*/
    @Column(name = "link_delivery_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long linkDeliveryId;

    /**服务项类型(1-报关、2-报检、3-清关、4-提货、5-送货)（2021/1/8新增）*/
    @Column(name = "link_delivery_type")
    private String linkDeliveryType;

    /**运单号*/
    @Column(name = "shipping_note_number")
    private String shippingNoteNumber;

    /**单证号(交换上传时需方自己的单证号)*/
    @Column(name = "document_number")
    private String documentNumber;

    /**流水号/序列号（业务系统自己的go_order_id）*/
    @Column(name = "sequence_code")
    private String sequenceCode;

    /**预计抵达日期时间*/
    @Column(name = "estimated_arrival_date_time")
    private Date estimatedArrivalDateTime;

    /**状态代码*/
    @Column(name = "status_code")
    private String statusCode;

    /**状态名称*/
    @Column(name = "status_name")
    private String statusName;

    /**状态发生时间*/
    @Column(name = "status_time")
    private Date statusTime;

    /**预计时间*/
    @Column(name = "status_et")
    private Date statusEt;

    /**实际时间*/
    @Column(name = "status_at")
    private Date statusAt;

    /**排序 （2021/1/8新增）*/
    @Column(name = "sort")
    private Integer sort;

    /**国家代码*/
    @Column(name = "status_country_code")
    private String statusCountryCode;

    /**国家名称*/
    @Column(name = "status_country")
    private String statusCountry;

    /**城市代码*/
    @Column(name = "status_city_code")
    private String statusCityCode;

    /**城市名称*/
    @Column(name = "status_city")
    private String statusCity;

    /**地点*/
    @Column(name = "status_site")
    private String statusSite;

    /**状态备注*/
    @Column(name = "status_remark")
    private String statusRemark;

    /**收货人单位名称*/
    @Column(name = "consignee")
    private String consignee;

    /**收货人姓名*/
    @Column(name = "name_person")
    private String namePerson;

    /**联系方式*/
    @Column(name = "telephone_number")
    private String telephoneNumber;

    /**个人证件号*/
    @Column(name = "personal_identity")
    private String personalIdentity;

    /**个人证件类别代码*/
    @Column(name = "personal_identity_code")
    private String personalIdentityCode;

    /**个人证件类别名称*/
    @Column(name = "personal_identity_name")
    private String personalIdentityName;

    /**签收类型代码*/
    @Column(name = "sign_type_code")
    private String signTypeCode;

    /**签收类型名称*/
    @Column(name = "sign_type_name")
    private String signTypeName;

    /**备注*/
    @Column(name = "remark")
    private String remark;

    /**数据来源-数据字典（如：手工录入、第三方数据，）*/
    @Column(name = "sourse")
    private String sourse;

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

    /**状态发生地编码*/
    @Column(name = "status_address_code")
    private String statusAddressCode;

    /**状态发生地名称*/
    @Column(name = "status_address_name")
    private String statusAddressName;

}