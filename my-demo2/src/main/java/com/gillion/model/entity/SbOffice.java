package com.gillion.model.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import com.gillion.ec.core.annotations.Generator;
import com.gillion.ds.entity.base.BaseModel;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
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
@Table(name = "sb_office")
public class SbOffice extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**主键ID*/
    @Id
    @Column(name = "office_id")
    @Generator("snowFlakeGenerator")
    private String officeId;

    /**办事处代码*/
    @Column(name = "office_code")
    private String officeCode;

    /**所属公司的OFFICE_ID*/
    @Column(name = "company_id")
    private String companyId;

    /**对应的客户ID*/
    @Column(name = "cust_id")
    private String custId;

    /**OFFICE类型*/
    @Column(name = "office_type")
    private String officeType;

    /**Office功能*/
    @Column(name = "function_type")
    private String functionType;

    /**地址*/
    @Column(name = "address")
    private String address;

    /**打印在提单上的内容*/
    @Column(name = "bl_content")
    private String blContent;

    /**本位币*/
    @Column(name = "home_currency")
    private String homeCurrency;

    /**使用的汇率体系*/
    @Column(name = "xchgr_name")
    private String xchgrName;

    /**所用的语言*/
    @Column(name = "language")
    private String language;

    /**上级办事处ID*/
    @Column(name = "superior_office_id")
    private String superiorOfficeId;

    /**是否自动产生往来帐*/
    @Column(name = "auto_internal")
    private BigDecimal autoInternal;

    /**是否可用*/
    @Column(name = "active")
    private BigDecimal active;

    /**删除标志*/
    @Column(name = "deleted")
    private BigDecimal deleted;

    /**办事处名称*/
    @Column(name = "office_name")
    private String officeName;

    /**办事处中文名称*/
    @Column(name = "office_native_name")
    private String officeNativeName;

    /**电话*/
    @Column(name = "tel")
    private String tel;

    /**传真*/
    @Column(name = "fax")
    private String fax;

    /**输入人*/
    @Column(name = "input_user")
    private String inputUser;

    /**输入人姓名*/
    @Column(name = "input_user_name")
    private String inputUserName;

    /**输入办事处*/
    @Column(name = "input_office")
    private String inputOffice;

    /**是否自动产生账单*/
    @Column(name = "use_system")
    private BigDecimal useSystem;

    /**所在国家*/
    @Column(name = "country_id")
    private String countryId;

    /**结算办事处*/
    @Column(name = "settle_office")
    private String settleOffice;

    /**税务登记号*/
    @Column(name = "tax_register_no")
    private String taxRegisterNo;

    /**工商登记号*/
    @Column(name = "business_register_no")
    private String businessRegisterNo;

    /**简称*/
    @Column(name = "abbrev")
    private String abbrev;

    /**EMail*/
    @Column(name = "email")
    private String email;

    /**所在城市*/
    @Column(name = "city_id")
    private String cityId;

    /**联系人*/
    @Column(name = "contact_id")
    private String contactId;

    /**是否为部门*/
    @Column(name = "is_dept")
    private BigDecimal isDept;

    /**ID字符串*/
    @Column(name = "office_relaction_tag")
    private String officeRelactionTag;

    /**此办事处是否作为客户处理*/
    @Column(name = "is_customer")
    private BigDecimal isCustomer;

    /**是否为内部办事处*/
    @Column(name = "is_internal")
    private BigDecimal isInternal;

    /**城市名称*/
    @Column(name = "city_name")
    private String cityName;

    /**是否为结算实体*/
    @Column(name = "is_settlement_obj")
    private BigDecimal isSettlementObj;

    /**主数据ID*/
    @Column(name = "zsj_office_id")
    private String zsjOfficeId;

    /**实体/虚体*/
    @Column(name = "zsj_entity_empty")
    private String zsjEntityEmpty;

    /**主数据中组织机构内码*/
    @Column(name = "zsj_office_sid")
    private String zsjOfficeSid;

    /**最后修改时间*/
    @Column(name = "modify_last_time")
    private Date modifyLastTime;

}