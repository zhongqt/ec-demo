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
@Table(name = "sz_freight")
public class SzFreight extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**业务费用表主键ID*/
    @Id
    @Column(name = "freight_id")
    @Generator("snowFlakeGenerator")
    private String freightId;

    /**业务类型*/
    @Column(name = "business_type_no")
    private String businessTypeNo;

    /**业务主表ID*/
    @Column(name = "job_order_id")
    private String jobOrderId;

    /**下级关键ID*/
    @Column(name = "sub_key_id")
    private String subKeyId;

    /**业务协同号*/
    @Column(name = "order_no")
    private String orderNo;

    /**收付标志*/
    @Column(name = "rp_id")
    private String rpId;

    /**付款条款*/
    @Column(name = "pay_term")
    private String payTerm;

    /**客户ID*/
    @Column(name = "cust_id")
    private String custId;

    /**客户名称*/
    @Column(name = "cust_name")
    private String custName;

    /**费用ID*/
    @Column(name = "frt_id")
    private String frtId;

    /**费用名称*/
    @Column(name = "frt_name")
    private String frtName;

    /**费用类型*/
    @Column(name = "frt_type")
    private String frtType;

    /**费用子类*/
    @Column(name = "frt_stype")
    private String frtStype;

    /**箱型尺寸*/
    @Column(name = "ctn_size_type")
    private String ctnSizeType;

    /**计费重*/
    @Column(name = "charge_weight")
    private BigDecimal chargeWeight;

    /**数量*/
    @Column(name = "quantity")
    private BigDecimal quantity;

    /**单价*/
    @Column(name = "unit_price")
    private BigDecimal unitPrice;

    /**报价币别（没用）*/
    @Column(name = "quote_currency")
    private String quoteCurrency;

    /**销售金额*/
    @Column(name = "quote_amount")
    private BigDecimal quoteAmount;

    /**公布金额（没用）*/
    @Column(name = "file_amount")
    private BigDecimal fileAmount;

    /**结算币别*/
    @Column(name = "settle_currency")
    private String settleCurrency;

    /**结算金额*/
    @Column(name = "settle_amount")
    private BigDecimal settleAmount;

    /**结算公司*/
    @Column(name = "settle_office")
    private String settleOffice;

    /**结算地点（没用）*/
    @Column(name = "settle_place")
    private String settlePlace;

    /**结算币别到本位币的汇率*/
    @Column(name = "xchg_rate")
    private BigDecimal xchgRate;

    /**结算币别到美金的汇率*/
    @Column(name = "rate_to_usd")
    private BigDecimal rateToUsd;

    /**对应财务费用币别（没用）*/
    @Column(name = "ledger_currency")
    private String ledgerCurrency;

    /**报价币到财务费用币别的汇率（没用）*/
    @Column(name = "ledger_rate")
    private BigDecimal ledgerRate;

    /**已结算金额*/
    @Column(name = "allocated_amount")
    private BigDecimal allocatedAmount;

    /**已开票金额*/
    @Column(name = "invoice_amount")
    private BigDecimal invoiceAmount;

    /**开票状态 0:不开票 1:未开票 2:部分开票 3:已开票 4:已申请*/
    @Column(name = "invoice_status")
    private String invoiceStatus;

    /**发票号*/
    @Column(name = "invoice_no")
    private String invoiceNo;

    /**费用类型，N:一般费用 C:分配过来的费用 E:差价费用 A:代垫 F：代垫调整 B:差价费用 P:利润，当ITEM_TYPE = P时，RP_ID 的值固定为 P，M:佣金，当ITEM_TYPE = M时，RP_ID 的值固定为 R */
    @Column(name = "item_type")
    private String itemType;

    /**是否打印在提单上（没用）*/
    @Column(name = "need_print")
    private BigDecimal needPrint;

    /**是否需要分配（没用）*/
    @Column(name = "need_allocate")
    private BigDecimal needAllocate;

    /**主单对应的FREIGHT_ID*/
    @Column(name = "master_item_id")
    private String masterItemId;

    /**录入组织*/
    @Column(name = "input_office")
    private String inputOffice;

    /**录入人ID*/
    @Column(name = "input_person")
    private String inputPerson;

    /**录入人*/
    @Column(name = "input_person_name")
    private String inputPersonName;

    /**录入时间*/
    @Column(name = "input_date")
    private Date inputDate;

    /**是否需要审核（没用）*/
    @Column(name = "need_audit")
    private BigDecimal needAudit;

    /**审核标记*/
    @Column(name = "audit")
    private BigDecimal audit;

    /**审核时间*/
    @Column(name = "audit_time")
    private Date auditTime;

    /**审核人ID*/
    @Column(name = "audit_person")
    private String auditPerson;

    /**审核人*/
    @Column(name = "audit_person_name")
    private String auditPersonName;

    /**费用审核批号（没用）*/
    @Column(name = "audit_batchno")
    private String auditBatchno;

    /**费用录入是否完成（没用）*/
    @Column(name = "completed")
    private BigDecimal completed;

    /**操作录入完成人（没用）*/
    @Column(name = "complete_person")
    private String completePerson;

    /**操作录入完成人姓名（没用）*/
    @Column(name = "complete_person_name")
    private String completePersonName;

    /**操作录入完成时间（没用）*/
    @Column(name = "complete_date")
    private Date completeDate;

    /**账单ID*/
    @Column(name = "comp_id")
    private String compId;

    /**账单状态*/
    @Column(name = "comp_status")
    private BigDecimal compStatus;

    /**是否现金*/
    @Column(name = "is_cash")
    private BigDecimal isCash;

    /**核销状态 1未核销 2部分核销 3已核销*/
    @Column(name = "allocation_status")
    private String allocationStatus;

    /**业务系统*/
    @Column(name = "system_no")
    private String systemNo;

    /**对应为业务单的录入人（没用）*/
    @Column(name = "rp_person")
    private String rpPerson;

    /**对应为业务单的录入人姓名（没用）*/
    @Column(name = "rp_person_name")
    private String rpPersonName;

    /**内部关联号（没用）*/
    @Column(name = "link_no")
    private String linkNo;

    /**对应业务的业务员组织*/
    @Column(name = "salesoffice")
    private String salesoffice;

    /**对应业务的业务员ID*/
    @Column(name = "op_id")
    private String opId;

    /**对应业务的业务员*/
    @Column(name = "op_name")
    private String opName;

    /**录入角色（没用）*/
    @Column(name = "input_role")
    private String inputRole;

    /**时间戳*/
    @Column(name = "timestamp")
    private BigDecimal timestamp;

    /**备注*/
    @Column(name = "remark")
    private String remark;

    /**业务日期*/
    @Column(name = "business_date")
    private Date businessDate;

    /**是否协议费用（没用）*/
    @Column(name = "is_contract")
    private BigDecimal isContract;

    /**佣金ID（没用）*/
    @Column(name = "commision_id")
    private String commisionId;

    /**代理账单ID*/
    @Column(name = "re_settlement_id")
    private String reSettlementId;

    /**确认单号*/
    @Column(name = "confirm_no")
    private String confirmNo;

    /**请款单号*/
    @Column(name = "request_no")
    private String requestNo;

    /**请款金额*/
    @Column(name = "request_amount")
    private BigDecimal requestAmount;

    /**是否来源于报价*/
    @Column(name = "is_from_quotedprice")
    private BigDecimal isFromQuotedprice;

    /**核销单号*/
    @Column(name = "allocation_no")
    private String allocationNo;

    /**请款状态*/
    @Column(name = "request_status")
    private String requestStatus;

    /**部门*/
    @Column(name = "office_dept")
    private String officeDept;

    /**销售单价*/
    @Column(name = "quote_unit_price")
    private BigDecimal quoteUnitPrice;

    /**是否同一套价格（采购价与销售价是否相同）*/
    @Column(name = "is_sameprice")
    private BigDecimal isSameprice;

    /**若是来源于报价，存放采购价ID*/
    @Column(name = "associating_code")
    private String associatingCode;

    /**若是来源于报价，存放销售价ID*/
    @Column(name = "codesales")
    private String codesales;

    @Column(name = "price_type")
    private String priceType;

    @Column(name = "confirm_id")
    private String confirmId;

    /**代收代付互相关联用，收款存对应的付款费用ID，付款存对应的收款费用ID*/
    @Column(name = "rp_relation_id")
    private String rpRelationId;

    /**计费单位*/
    @Column(name = "unit")
    private String unit;

    /**用于区分代理费类别。0，本司代理费；1、总部分成代理费；2、港口方分成代理费*/
    @Column(name = "agentcy_fee_type")
    private String agentcyFeeType;

    @Column(name = "export_flag")
    private String exportFlag;

    @Column(name = "export_date")
    private Date exportDate;

    @Column(name = "export_persion")
    private String exportPersion;

    @Column(name = "export_office")
    private String exportOffice;

    /**费用细目标志,0表示代收代付,1表示收入*/
    @Column(name = "frt_mode")
    private String frtMode;

    /**可请款金额*/
    @Column(name = "requestable_amount")
    private BigDecimal requestableAmount;

    /**付款编号*/
    @Column(name = "payment_no")
    private String paymentNo;

    @Column(name = "bl_type")
    private String blType;

    @Column(name = "vessel_agency_id")
    private String vesselAgencyId;

    @Column(name = "cnt_company")
    private String cntCompany;

    @Column(name = "unite_no")
    private String uniteNo;

    @Column(name = "is_commit")
    private BigDecimal isCommit;

    @Column(name = "commit_userid")
    private String commitUserid;

    @Column(name = "commit_username")
    private String commitUsername;

    @Column(name = "commit_time")
    private Date commitTime;

    /**报关报检费导入标志*/
    @Column(name = "is_input")
    private BigDecimal isInput;

    /**是否内配*/
    @Column(name = "is_inner_rp")
    private BigDecimal isInnerRp;

    @Column(name = "inner_rp_freight_id")
    private String innerRpFreightId;

    @Column(name = "modify_last_time")
    private Date modifyLastTime;

    @Column(name = "is_charged")
    private BigDecimal isCharged;

    @Column(name = "is_replace")
    private BigDecimal isReplace;

    /**费用来源：1为批量模板导入，2为Excel导入，3未知，4未知，5为协议导入（航运）*/
    @Column(name = "freight_source")
    private String freightSource;

    /**船代的费用补差价关联的ID*/
    @Column(name = "re_freight_id")
    private String reFreightId;

    /**船代箱子费用自动计算的箱号*/
    @Column(name = "cnt_no")
    private String cntNo;

    /**虚拟发票号*/
    @Column(name = "vir_invoice_no")
    private String virInvoiceNo;

    /**是否结算*/
    @Column(name = "is_vir_settle")
    private BigDecimal isVirSettle;

    /**最后修改人*/
    @Column(name = "modify_last_person")
    private String modifyLastPerson;

    /**收费时间*/
    @Column(name = "charged_date")
    private Date chargedDate;

    /**销售币别*/
    @Column(name = "sales_currency")
    private String salesCurrency;

    /**销售单价*/
    @Column(name = "sales_unit_price")
    private BigDecimal salesUnitPrice;

    /**销售金额*/
    @Column(name = "sales_amount")
    private BigDecimal salesAmount;

    /**兑换率*/
    @Column(name = "exchange_rate")
    private BigDecimal exchangeRate;

    /**舱位公司*/
    @Column(name = "carrier_id")
    private String carrierId;

    @Column(name = "rp_stauts")
    private BigDecimal rpStauts;

    /**费用导出*/
    @Column(name = "frt_export")
    private BigDecimal frtExport;

    /**预计开票类型*/
    @Column(name = "estimated_invoice_type")
    private String estimatedInvoiceType;

    /**预估税率*/
    @Column(name = "estimated_tax_rate")
    private BigDecimal estimatedTaxRate;

    /**预估税金*/
    @Column(name = "estimated_taxes")
    private BigDecimal estimatedTaxes;

    /**税金计算公式*/
    @Column(name = "tax_formula")
    private String taxFormula;

    /**关联箱代费ID*/
    @Column(name = "re_cntr_freight_id")
    private String reCntrFreightId;

    /**是否提单审核导出PEC001报文(电子支付)*/
    @Column(name = "is_edi_epay_out")
    private BigDecimal isEdiEpayOut;

    /**申请状态-用于支付平台：0=未申请，1=已申请*/
    @Column(name = "apply_status")
    private String applyStatus;

    /**有效日期-用于支付平台*/
    @Column(name = "valid_date")
    private Date validDate;

    /**流水号-用于支付平台*/
    @Column(name = "cash_movement_no")
    private String cashMovementNo;

    /**交易号-用于支付平台*/
    @Column(name = "transaction_order_no")
    private String transactionOrderNo;

    /**交易日期-用于支付平台*/
    @Column(name = "transaction_date")
    private Date transactionDate;

    /**联系人-用于支付平台*/
    @Column(name = "contact_person")
    private String contactPerson;

    /**支付状态-用于支付平台：0=未支付，1=已支付*/
    @Column(name = "pay_status")
    private String payStatus;

    /**协议汇率-用于支付平台*/
    @Column(name = "agreement_rate")
    private BigDecimal agreementRate;

    /**实际付款人-用于支付平台*/
    @Column(name = "actual_payer")
    private String actualPayer;

    /**是否箱贴：该类费用由航运付款新增时(结算单位是部门)，同步到海运付款*/
    @Column(name = "is_xt")
    private BigDecimal isXt;

    /**箱贴费用关联ID，航运和海运互相保存对方费用ID*/
    @Column(name = "xt_freight_id")
    private String xtFreightId;

    /**费率*/
    @Column(name = "freight_rate")
    private String freightRate;

    /**申请支付币别*/
    @Column(name = "agreement_currency")
    private String agreementCurrency;

    /**上传BMS标记：0未上传 1已上传 2上传中*/
    @Column(name = "bms_up_flag")
    private String bmsUpFlag;

    /**上传BMS时间*/
    @Column(name = "bms_up_date")
    private Date bmsUpDate;

    /**上传BMS人ID*/
    @Column(name = "bms_up_person")
    private String bmsUpPerson;

    /**请款单ID*/
    @Column(name = "request_id")
    private String requestId;

    /**发票ID*/
    @Column(name = "invoice_id")
    private String invoiceId;

    /**BMS费用ID*/
    @Column(name = "bms_id")
    private String bmsId;

    /**外部接入标志*/
    @Column(name = "external_access_sign")
    private String externalAccessSign;

    @Column(name = "test_count")
    private String testCount;

    @Column(name = "audit_ktl")
    private String auditKtl;

}