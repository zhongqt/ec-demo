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
@Table(name = "rp_ledger_item")
public class RpLedgerItem extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**主键ID*/
    @Id
    @Column(name = "ledger_item_id")
    @Generator("snowFlakeGenerator")
    private String ledgerItemId;

    /**账单类型*/
    @Column(name = "ledger_type_code")
    private String ledgerTypeCode;

    /**业务类型*/
    @Column(name = "system_type")
    private String systemType;

    /**业务系统的编号*/
    @Column(name = "business_id")
    private String businessId;

    /**公共订单号*/
    @Column(name = "order_no")
    private String orderNo;

    /**业务描述*/
    @Column(name = "description")
    private String description;

    /**收付标志*/
    @Column(name = "rp_id")
    private String rpId;

    /**对应业务费用的审核日期*/
    @Column(name = "input_date")
    private Date inputDate;

    /**对应为业务费用的审核办事处*/
    @Column(name = "input_office")
    private String inputOffice;

    /**对应为业务费用的审核人*/
    @Column(name = "input_person")
    private String inputPerson;

    /**对应为业务费用的审核人姓名*/
    @Column(name = "input_person_name")
    private String inputPersonName;

    /**业务费用的结算客户*/
    @Column(name = "ledger_partner_code")
    private String ledgerPartnerCode;

    /**业务费用的结算客户名称*/
    @Column(name = "ledger_partner_name")
    private String ledgerPartnerName;

    /**账单状态*/
    @Column(name = "ledger_item_state_ind")
    private BigDecimal ledgerItemStateInd;

    /**负责办事处*/
    @Column(name = "office_id")
    private String officeId;

    /**对应为业务单的录入人员*/
    @Column(name = "rp_person")
    private String rpPerson;

    /**对应为业务单的录入人员姓名*/
    @Column(name = "rp_person_name")
    private String rpPersonName;

    /**来源类型*/
    @Column(name = "source_type")
    private String sourceType;

    /**来源ID*/
    @Column(name = "source_id")
    private String sourceId;

    /**本位币*/
    @Column(name = "apply_base_currency_code")
    private String applyBaseCurrencyCode;

    /**本位币金额*/
    @Column(name = "apply_base_currency_value")
    private BigDecimal applyBaseCurrencyValue;

    /**原币*/
    @Column(name = "apply_prime_currency_code")
    private String applyPrimeCurrencyCode;

    /**原币金额*/
    @Column(name = "apply_prime_currency_value")
    private BigDecimal applyPrimeCurrencyValue;

    /**标准币金额*/
    @Column(name = "apply_usd_value")
    private BigDecimal applyUsdValue;

    /**可冲账本位币金额*/
    @Column(name = "allocable_base_currency_value")
    private BigDecimal allocableBaseCurrencyValue;

    /**可冲账原币金额*/
    @Column(name = "allocable_prime_currency_value")
    private BigDecimal allocablePrimeCurrencyValue;

    /**可冲账标准币金额*/
    @Column(name = "allocable_usd_value")
    private BigDecimal allocableUsdValue;

    /**已冲账本位币金额*/
    @Column(name = "allocated_base_currency_value")
    private BigDecimal allocatedBaseCurrencyValue;

    /**已冲账原币金额*/
    @Column(name = "allocated_prime_currency_value")
    private BigDecimal allocatedPrimeCurrencyValue;

    /**已冲账标准币金额*/
    @Column(name = "allocated_usd_value")
    private BigDecimal allocatedUsdValue;

    /**已开票原币金额*/
    @Column(name = "invoice_prime_value")
    private BigDecimal invoicePrimeValue;

    /**已开票本位币金额*/
    @Column(name = "invoice_base_value")
    private BigDecimal invoiceBaseValue;

    /**已开票标准币金额*/
    @Column(name = "invoice_usd_value")
    private BigDecimal invoiceUsdValue;

    /**开票状态*/
    @Column(name = "invoice_status")
    private String invoiceStatus;

    /**发票号*/
    @Column(name = "invoice_no")
    private String invoiceNo;

    /**是否包含在催款单中*/
    @Column(name = "collect_flag")
    private BigDecimal collectFlag;

    /**催款单日期*/
    @Column(name = "collect_bill_date")
    private Date collectBillDate;

    /**催款单ID*/
    @Column(name = "collect_bill_id")
    private String collectBillId;

    /**催款单文件号*/
    @Column(name = "document_location_reference")
    private String documentLocationReference;

    /**还款截止日*/
    @Column(name = "due_date")
    private Date dueDate;

    /**结算备注*/
    @Column(name = "settlement_remarks")
    private String settlementRemarks;

    /**总帐科目*/
    @Column(name = "control_gl_coa_code")
    private String controlGlCoaCode;

    /**会计期间*/
    @Column(name = "fiscal_period")
    private String fiscalPeriod;

    /**会计分录ID*/
    @Column(name = "account_dissection_id")
    private String accountDissectionId;

    /**冲帐结束时间*/
    @Column(name = "close_date")
    private Date closeDate;

    /**帐单子类型*/
    @Column(name = "sub_type_code")
    private String subTypeCode;

    /**帐单子类型2*/
    @Column(name = "sub_type_code2")
    private String subTypeCode2;

    /**内部业务连接号*/
    @Column(name = "link_no")
    private String linkNo;

    /**是否内部往来帐*/
    @Column(name = "is_internal")
    private BigDecimal isInternal;

    /**是否手工登记*/
    @Column(name = "is_manual")
    private BigDecimal isManual;

    /**对应为业务销售办事处*/
    @Column(name = "salesoffice")
    private String salesoffice;

    /**对应为业务的销售人员*/
    @Column(name = "op_id")
    private String opId;

    /**对应为业务的销售人员姓名*/
    @Column(name = "op_name")
    private String opName;

    /**对账单ID*/
    @Column(name = "comp_id")
    private String compId;

    /**对帐单号*/
    @Column(name = "comp_no")
    private String compNo;

    /**对账日期*/
    @Column(name = "comp_date")
    private Date compDate;

    /**录入角色*/
    @Column(name = "input_role")
    private String inputRole;

    /**业务系统的业务日期*/
    @Column(name = "business_date")
    private Date businessDate;

    /**对应为费用的完成日期*/
    @Column(name = "complete_date")
    private Date completeDate;

    /**对应为费用的完成人*/
    @Column(name = "complete_person")
    private String completePerson;

    /**对应为费用的完成人姓名*/
    @Column(name = "complete_person_name")
    private String completePersonName;

    /**对应为费用的录入日期*/
    @Column(name = "freight_input_date")
    private Date freightInputDate;

    /**对应为费用的录入人*/
    @Column(name = "freight_input_person")
    private String freightInputPerson;

    /**对应为费用的录入人姓名*/
    @Column(name = "freight_input_person_name")
    private String freightInputPersonName;

    /**费用审核批号*/
    @Column(name = "input_batch_no")
    private String inputBatchNo;

    /**费用ID*/
    @Column(name = "rp_frt_id")
    private String rpFrtId;

    /**费用名称*/
    @Column(name = "rp_frt_name")
    private String rpFrtName;

    /**费用类型*/
    @Column(name = "rp_frt_type")
    private String rpFrtType;

    /**费用子类*/
    @Column(name = "rp_frt_stype")
    private String rpFrtStype;

    /**费用类型，N:一般费用 C:分配过来的费用 E:差价费用 A:代垫 F：代垫调整 B:差价费用 P:利润，当ITEM_TYPE = P时，RP_ID 的值固定为 P，M:佣金，当ITEM_TYPE = M时，RP_ID 的值固定为 R */
    @Column(name = "item_type")
    private String itemType;

    /**差价或佣金所对应的费用ID*/
    @Column(name = "balance_to")
    private String balanceTo;

    /**相关连的应收费用ID*/
    @Column(name = "related_ar_id")
    private String relatedArId;

    /**是否包含佣金*/
    @Column(name = "include_commission")
    private BigDecimal includeCommission;

    /**佣金所占此费用金额的百分比*/
    @Column(name = "commission_rate")
    private BigDecimal commissionRate;

    /**佣金金额*/
    @Column(name = "commissin_amount")
    private BigDecimal commissinAmount;

    /**挂账凭证的凭证ID*/
    @Column(name = "gl_arp_voucher_id")
    private String glArpVoucherId;

    /**挂账时凭证分录的科目代码*/
    @Column(name = "gl_arp_coa_code")
    private String glArpCoaCode;

    /**挂账会计期间*/
    @Column(name = "gl_arp_fiscal_period")
    private String glArpFiscalPeriod;

    /**挂账时凭证辅助账的业务编号*/
    @Column(name = "gl_arp_business_no")
    private String glArpBusinessNo;

    /**转收入成本凭证的凭证ID*/
    @Column(name = "gl_cost_voucher_id")
    private String glCostVoucherId;

    /**转收入成本时凭证分录的科目代码*/
    @Column(name = "gl_cost_coa_code")
    private String glCostCoaCode;

    /**转收入成本会计期间*/
    @Column(name = "gl_cost_fiscal_period")
    private String glCostFiscalPeriod;

    /**转收入成本时凭证辅助账的业务编号*/
    @Column(name = "gl_cost_business_no")
    private String glCostBusinessNo;

    /**账单客户对应的外部财务编码*/
    @Column(name = "external_partner_code")
    private String externalPartnerCode;

    /**账单客户对应的外部财务名称*/
    @Column(name = "external_partner_name")
    private String externalPartnerName;

    /**本位币汇率*/
    @Column(name = "gl_rate_base")
    private BigDecimal glRateBase;

    /**美金汇率*/
    @Column(name = "gl_rate_usd")
    private BigDecimal glRateUsd;

    /**付款条款*/
    @Column(name = "pay_term")
    private String payTerm;

    /**是否是现金*/
    @Column(name = "is_cash")
    private BigDecimal isCash;

    /**请款单号*/
    @Column(name = "request_no")
    private String requestNo;

    /**批复状态*/
    @Column(name = "approve_status")
    private String approveStatus;

    /**批复金额（原币）*/
    @Column(name = "approve_prime_value")
    private BigDecimal approvePrimeValue;

    /**批复金额（本位币）*/
    @Column(name = "approve_base_value")
    private BigDecimal approveBaseValue;

    /**批复金额（美金）*/
    @Column(name = "approve_usd_value")
    private BigDecimal approveUsdValue;

    /**代理账单ID*/
    @Column(name = "re_settlement_id")
    private String reSettlementId;

    /**核销单号*/
    @Column(name = "allocation_no")
    private String allocationNo;

    /**请款状态*/
    @Column(name = "request_status")
    private String requestStatus;

    /**请款金额（原币）*/
    @Column(name = "requested_prime_value")
    private BigDecimal requestedPrimeValue;

    /**请款金额（本位币）*/
    @Column(name = "requested_base_value")
    private BigDecimal requestedBaseValue;

    /**请款金额（美金）*/
    @Column(name = "requested_usd_value")
    private BigDecimal requestedUsdValue;

    @Column(name = "cash_movement_id")
    private String cashMovementId;

    /**预计开票类型*/
    @Column(name = "estimated_invoice_type")
    private String estimatedInvoiceType;

    /**预估税率*/
    @Column(name = "estimated_tax_rate")
    private BigDecimal estimatedTaxRate;

    /**预估税金*/
    @Column(name = "estimated_taxes")
    private BigDecimal estimatedTaxes;

    /**实际开票类型*/
    @Column(name = "actual_invoice_type")
    private String actualInvoiceType;

    /**实际税率*/
    @Column(name = "actual_tax_rate")
    private BigDecimal actualTaxRate;

    /**实际税金*/
    @Column(name = "actual_taxes")
    private BigDecimal actualTaxes;

    /**实际本位币汇率*/
    @Column(name = "actual_rate_base")
    private BigDecimal actualRateBase;

    /**实际本位币金额*/
    @Column(name = "actual_base_currency_value")
    private BigDecimal actualBaseCurrencyValue;

    /**是否税差*/
    @Column(name = "is_tax_difference")
    private BigDecimal isTaxDifference;

    /**税差挂账ID*/
    @Column(name = "gl_tax_voucher_id")
    private String glTaxVoucherId;

    /**税差挂账区间*/
    @Column(name = "gl_tax_fiscal_period")
    private String glTaxFiscalPeriod;

    /**税金计算公式*/
    @Column(name = "tax_formula")
    private String taxFormula;

    /**最后修改时间*/
    @Column(name = "modify_last_time")
    private Date modifyLastTime;

    @Column(name = "gl_tax_business_no")
    private String glTaxBusinessNo;

    @Column(name = "rp_stauts")
    private BigDecimal rpStauts;

}