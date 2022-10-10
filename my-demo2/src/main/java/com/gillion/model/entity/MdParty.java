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
@Table(name = "md_party")
public class MdParty extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**主键id*/
    @Id
    @Column(name = "md_party_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long mdPartyId;

    /**单位编码*/
    @Column(name = "unit_code")
    private String unitCode;

    /**单位名称*/
    @Column(name = "unit_name")
    private String unitName;

    /**联系人*/
    @Column(name = "unit_contacts")
    private String unitContacts;

    /**国家代码*/
    @Column(name = "country_code")
    private String countryCode;

    /**国家名称*/
    @Column(name = "country_name")
    private String countryName;

    /**省州代码*/
    @Column(name = "province_code")
    private String provinceCode;

    /**省州名称*/
    @Column(name = "province_name")
    private String provinceName;

    /**城市代码*/
    @Column(name = "city_code")
    private String cityCode;

    /**城市名称*/
    @Column(name = "city_name")
    private String cityName;

    /**单位简称*/
    @Column(name = "unit_name_sort")
    private String unitNameSort;

    /**地址*/
    @Column(name = "address")
    private String address;

    /**手机号*/
    @Column(name = "phone_number")
    private String phoneNumber;

    /**电话*/
    @Column(name = "telphone")
    private String telphone;

    /**邮箱*/
    @Column(name = "e_mail")
    private String eMail;

    /**纳税人识别号*/
    @Column(name = "taxpayer_identification_number")
    private String taxpayerIdentificationNumber;

    /**发票抬头*/
    @Column(name = "invoice_title")
    private String invoiceTitle;

    /**开户银行*/
    @Column(name = "bank_of_deposit")
    private String bankOfDeposit;

    /**开户账号*/
    @Column(name = "account_number")
    private String accountNumber;

    /**备注*/
    @Column(name = "remark")
    private String remark;

    /**是否有效*/
    @Column(name = "is_valid")
    private Boolean isValid;

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

    /**收发货人类型（1收发货人，2委托人）*/
    @Column(name = "party_type")
    private String partyType;

}