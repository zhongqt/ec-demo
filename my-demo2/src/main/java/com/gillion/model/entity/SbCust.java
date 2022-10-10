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
@Table(name = "sb_cust")
public class SbCust extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**主键ID*/
    @Id
    @Column(name = "cust_id")
    @Generator("snowFlakeGenerator")
    private String custId;

    /**该客户的在财务系统中的编码*/
    @Column(name = "ledger_code")
    private String ledgerCode;

    /**该客户的在EDI中的编码*/
    @Column(name = "edi_code")
    private String ediCode;

    /**税务登记号*/
    @Column(name = "tax_register_no")
    private String taxRegisterNo;

    /**客户简称*/
    @Column(name = "cust_alias")
    private String custAlias;

    /**上级客户ID*/
    @Column(name = "superior_id")
    private String superiorId;

    /**上级客户名称*/
    @Column(name = "superior_name")
    private String superiorName;

    /**客户类型*/
    @Column(name = "cust_type")
    private BigDecimal custType;

    /**单证打印内容*/
    @Column(name = "bl_content")
    private String blContent;

    /**该客户在海关的编号*/
    @Column(name = "customs_no")
    private String customsNo;

    /**客户名称*/
    @Column(name = "cust_name")
    private String custName;

    /**地址*/
    @Column(name = "addr")
    private String addr;

    /**客户中文名称*/
    @Column(name = "cust_name_native")
    private String custNameNative;

    /**中文地址*/
    @Column(name = "addr_native")
    private String addrNative;

    /**邮政编码*/
    @Column(name = "zip")
    private String zip;

    /**发票地址*/
    @Column(name = "inv_addr")
    private String invAddr;

    /**发票名称*/
    @Column(name = "inv_title")
    private String invTitle;

    /**欠款类型*/
    @Column(name = "due_type")
    private String dueType;

    /**欠款的信用期限*/
    @Column(name = "credit_days")
    private BigDecimal creditDays;

    /**允许的欠款额度*/
    @Column(name = "credit_amt")
    private BigDecimal creditAmt;

    /**信用等级*/
    @Column(name = "credit_type")
    private String creditType;

    /**开始往来日期*/
    @Column(name = "start_date")
    private Date startDate;

    /**中止往来日期*/
    @Column(name = "end_date")
    private Date endDate;

    /**国家*/
    @Column(name = "country_id")
    private String countryId;

    /**省份*/
    @Column(name = "state_id")
    private String stateId;

    /**城市*/
    @Column(name = "city_id")
    private String cityId;

    /**录入人*/
    @Column(name = "input_user")
    private String inputUser;

    /**录入人姓名*/
    @Column(name = "input_user_name")
    private String inputUserName;

    /**录入办事处*/
    @Column(name = "input_office")
    private String inputOffice;

    /**是否有电子商务*/
    @Column(name = "is_online")
    private BigDecimal isOnline;

    /**电子商务登录名*/
    @Column(name = "login_name")
    private String loginName;

    /**电子商务登录口令*/
    @Column(name = "pwd")
    private String pwd;

    /**电子商务主页*/
    @Column(name = "homepage")
    private String homepage;

    /**客户标准编号*/
    @Column(name = "ein")
    private String ein;

    /**相关办事处*/
    @Column(name = "related_office")
    private String relatedOffice;

    /**客户级别*/
    @Column(name = "grade")
    private String grade;

    /**客户状态*/
    @Column(name = "status")
    private String status;

    /**对应的正式客户ID*/
    @Column(name = "approved_cust_id")
    private String approvedCustId;

    /**对应的正式客户名称*/
    @Column(name = "approved_cust_name")
    private String approvedCustName;

    /**是否可用*/
    @Column(name = "active")
    private BigDecimal active;

    /**电话*/
    @Column(name = "tel")
    private String tel;

    /**传真*/
    @Column(name = "fax")
    private String fax;

    /**扩展字段*/
    @Column(name = "idstring1")
    private String idstring1;

    /**扩展字段*/
    @Column(name = "logic1")
    private String logic1;

    /**扩展字段*/
    @Column(name = "idstring2")
    private String idstring2;

    /**扩展字段*/
    @Column(name = "logic2")
    private String logic2;

    /**扩展字段*/
    @Column(name = "idstring3")
    private String idstring3;

    /**EMail*/
    @Column(name = "email")
    private String email;

    /**录入角色*/
    @Column(name = "input_role")
    private String inputRole;

    /**允许的欠款币别*/
    @Column(name = "credit_currency")
    private String creditCurrency;

    /**城市名称*/
    @Column(name = "city_name")
    private String cityName;

    /**客户中文简称*/
    @Column(name = "cust_alias_cn")
    private String custAliasCn;

    /**客户助记码*/
    @Column(name = "rem_code")
    private String remCode;

    /**删除原因*/
    @Column(name = "deleted_reason")
    private BigDecimal deletedReason;

    /**客户内外标志*/
    @Column(name = "cust_inner_outer")
    private String custInnerOuter;

    /**外代代码*/
    @Column(name = "forward_code")
    private String forwardCode;

    /**删除标志*/
    @Column(name = "deleted")
    private BigDecimal deleted;

    /**失效原因*/
    @Column(name = "unactive")
    private String unactive;

    /**VIP客户类型*/
    @Column(name = "vip")
    private String vip;

    /**最后一次修改人*/
    @Column(name = "modify_user")
    private String modifyUser;

    /**最后一场修改人名称*/
    @Column(name = "modidy_user_name")
    private String modidyUserName;

    /**最后一次修改时间*/
    @Column(name = "modify_date")
    private Date modifyDate;

    /**录入时间*/
    @Column(name = "input_date")
    private Date inputDate;

    /**联系人信息*/
    @Column(name = "contact")
    private String contact;

    /**拖箱地*/
    @Column(name = "drag_ctn_place")
    private String dragCtnPlace;

    /**相关用户*/
    @Column(name = "relate_user")
    private String relateUser;

    /**上级客户ID串*/
    @Column(name = "superior_id_list")
    private String superiorIdList;

    /**外代代码2*/
    @Column(name = "forward2_code")
    private String forward2Code;

    /**协议号*/
    @Column(name = "credit_no")
    private String creditNo;

    /**失效日期*/
    @Column(name = "credit_invalidation_date")
    private Date creditInvalidationDate;

    /**备注*/
    @Column(name = "credit_remark")
    private String creditRemark;

    /**是否利润*/
    @Column(name = "is_profit")
    private BigDecimal isProfit;

    /**所属货运组织*/
    @Column(name = "belong_freight")
    private String belongFreight;

    /**转费用申请人*/
    @Column(name = "application_frt_user")
    private String applicationFrtUser;

    /**转费用申请时间*/
    @Column(name = "application_frt_date")
    private Date applicationFrtDate;

    /**转正申请人*/
    @Column(name = "application_formal_user")
    private String applicationFormalUser;

    /**转正申请时间*/
    @Column(name = "application_formal_date")
    private Date applicationFormalDate;

    /**转费用申请人*/
    @Column(name = "application_frt_user_name")
    private String applicationFrtUserName;

    /**转正申请人*/
    @Column(name = "application_formal_user_name")
    private String applicationFormalUserName;

    /**备注*/
    @Column(name = "remark_d")
    private String remarkD;

    /**录入人办事处*/
    @Column(name = "input_office_code")
    private String inputOfficeCode;

    /**是否商务平台客户*/
    @Column(name = "is_show_iz_cust")
    private BigDecimal isShowIzCust;

    @Column(name = "is_check_order_online")
    private BigDecimal isCheckOrderOnline;

    @Column(name = "business_nature")
    private String businessNature;

    @Column(name = "registered_capital")
    private BigDecimal registeredCapital;

    @Column(name = "tax_number")
    private String taxNumber;

    /**催收人ID*/
    @Column(name = "collection_person_id")
    private String collectionPersonId;

    /**催收人NAME*/
    @Column(name = "collection_person_name")
    private String collectionPersonName;

    /**网上服务协议号*/
    @Column(name = "web_protocol_no")
    private String webProtocolNo;

    /**网上服务协议终止日期*/
    @Column(name = "web_protocol_end_date")
    private Date webProtocolEndDate;

    /**相关业务员*/
    @Column(name = "relate_bussiness_user")
    private String relateBussinessUser;

    /**提单号前缀校验*/
    @Column(name = "bl_prefix")
    private String blPrefix;

    /**需要货物跟踪*/
    @Column(name = "need_cargo_tracking")
    private BigDecimal needCargoTracking;

    /**差额开票*/
    @Column(name = "is_ce_inv")
    private BigDecimal isCeInv;

    /**货代二程船公司*/
    @Column(name = "is_oo_carrier2")
    private BigDecimal isOoCarrier2;

    /**EDO服务*/
    @Column(name = "is_edo")
    private BigDecimal isEdo;

    /**语言*/
    @Column(name = "mdg_langu")
    private String mdgLangu;

    /**客商编码*/
    @Column(name = "mdg_partner")
    private String mdgPartner;

    /**地区*/
    @Column(name = "mdg_region")
    private String mdgRegion;

    /**电话分号*/
    @Column(name = "mdg_tel_extens")
    private String mdgTelExtens;

    /**手机*/
    @Column(name = "mdg_mob_number")
    private String mdgMobNumber;

    /**传真分号*/
    @Column(name = "mdg_fax_extens")
    private String mdgFaxExtens;

    /**客商类型*/
    @Column(name = "mdg_bu_group")
    private String mdgBuGroup;

    /**最后修改时间*/
    @Column(name = "modify_last_time")
    private Date modifyLastTime;

}