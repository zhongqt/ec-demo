package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.SzFreight;

import java.lang.String;
import java.math.BigDecimal;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QSzFreight extends BaseModelExpression<SzFreight, String> {

    public static final BaseModelExpression<SzFreight, String> szFreight = new QSzFreight();
    public static final FieldExpression<String> freightId = szFreight.fieldOf("freightId", String.class);
    public static final FieldExpression<String> businessTypeNo = szFreight.fieldOf("businessTypeNo", String.class);
    public static final FieldExpression<String> jobOrderId = szFreight.fieldOf("jobOrderId", String.class);
    public static final FieldExpression<String> subKeyId = szFreight.fieldOf("subKeyId", String.class);
    public static final FieldExpression<String> orderNo = szFreight.fieldOf("orderNo", String.class);
    public static final FieldExpression<String> rpId = szFreight.fieldOf("rpId", String.class);
    public static final FieldExpression<String> payTerm = szFreight.fieldOf("payTerm", String.class);
    public static final FieldExpression<String> custId = szFreight.fieldOf("custId", String.class);
    public static final FieldExpression<String> custName = szFreight.fieldOf("custName", String.class);
    public static final FieldExpression<String> frtId = szFreight.fieldOf("frtId", String.class);
    public static final FieldExpression<String> frtName = szFreight.fieldOf("frtName", String.class);
    public static final FieldExpression<String> frtType = szFreight.fieldOf("frtType", String.class);
    public static final FieldExpression<String> frtStype = szFreight.fieldOf("frtStype", String.class);
    public static final FieldExpression<String> ctnSizeType = szFreight.fieldOf("ctnSizeType", String.class);
    public static final FieldExpression<BigDecimal> chargeWeight = szFreight.fieldOf("chargeWeight", BigDecimal.class);
    public static final FieldExpression<BigDecimal> quantity = szFreight.fieldOf("quantity", BigDecimal.class);
    public static final FieldExpression<BigDecimal> unitPrice = szFreight.fieldOf("unitPrice", BigDecimal.class);
    public static final FieldExpression<String> quoteCurrency = szFreight.fieldOf("quoteCurrency", String.class);
    public static final FieldExpression<BigDecimal> quoteAmount = szFreight.fieldOf("quoteAmount", BigDecimal.class);
    public static final FieldExpression<BigDecimal> fileAmount = szFreight.fieldOf("fileAmount", BigDecimal.class);
    public static final FieldExpression<String> settleCurrency = szFreight.fieldOf("settleCurrency", String.class);
    public static final FieldExpression<BigDecimal> settleAmount = szFreight.fieldOf("settleAmount", BigDecimal.class);
    public static final FieldExpression<String> settleOffice = szFreight.fieldOf("settleOffice", String.class);
    public static final FieldExpression<String> settlePlace = szFreight.fieldOf("settlePlace", String.class);
    public static final FieldExpression<BigDecimal> xchgRate = szFreight.fieldOf("xchgRate", BigDecimal.class);
    public static final FieldExpression<BigDecimal> rateToUsd = szFreight.fieldOf("rateToUsd", BigDecimal.class);
    public static final FieldExpression<String> ledgerCurrency = szFreight.fieldOf("ledgerCurrency", String.class);
    public static final FieldExpression<BigDecimal> ledgerRate = szFreight.fieldOf("ledgerRate", BigDecimal.class);
    public static final FieldExpression<BigDecimal> allocatedAmount = szFreight.fieldOf("allocatedAmount", BigDecimal.class);
    public static final FieldExpression<BigDecimal> invoiceAmount = szFreight.fieldOf("invoiceAmount", BigDecimal.class);
    public static final FieldExpression<String> invoiceStatus = szFreight.fieldOf("invoiceStatus", String.class);
    public static final FieldExpression<String> invoiceNo = szFreight.fieldOf("invoiceNo", String.class);
    public static final FieldExpression<String> itemType = szFreight.fieldOf("itemType", String.class);
    public static final FieldExpression<BigDecimal> needPrint = szFreight.fieldOf("needPrint", BigDecimal.class);
    public static final FieldExpression<BigDecimal> needAllocate = szFreight.fieldOf("needAllocate", BigDecimal.class);
    public static final FieldExpression<String> masterItemId = szFreight.fieldOf("masterItemId", String.class);
    public static final FieldExpression<String> inputOffice = szFreight.fieldOf("inputOffice", String.class);
    public static final FieldExpression<String> inputPerson = szFreight.fieldOf("inputPerson", String.class);
    public static final FieldExpression<String> inputPersonName = szFreight.fieldOf("inputPersonName", String.class);
    public static final FieldExpression<Date> inputDate = szFreight.fieldOf("inputDate", Date.class);
    public static final FieldExpression<BigDecimal> needAudit = szFreight.fieldOf("needAudit", BigDecimal.class);
    public static final FieldExpression<BigDecimal> audit = szFreight.fieldOf("audit", BigDecimal.class);
    public static final FieldExpression<Date> auditTime = szFreight.fieldOf("auditTime", Date.class);
    public static final FieldExpression<String> auditPerson = szFreight.fieldOf("auditPerson", String.class);
    public static final FieldExpression<String> auditPersonName = szFreight.fieldOf("auditPersonName", String.class);
    public static final FieldExpression<String> auditBatchno = szFreight.fieldOf("auditBatchno", String.class);
    public static final FieldExpression<BigDecimal> completed = szFreight.fieldOf("completed", BigDecimal.class);
    public static final FieldExpression<String> completePerson = szFreight.fieldOf("completePerson", String.class);
    public static final FieldExpression<String> completePersonName = szFreight.fieldOf("completePersonName", String.class);
    public static final FieldExpression<Date> completeDate = szFreight.fieldOf("completeDate", Date.class);
    public static final FieldExpression<String> compId = szFreight.fieldOf("compId", String.class);
    public static final FieldExpression<BigDecimal> compStatus = szFreight.fieldOf("compStatus", BigDecimal.class);
    public static final FieldExpression<BigDecimal> isCash = szFreight.fieldOf("isCash", BigDecimal.class);
    public static final FieldExpression<String> allocationStatus = szFreight.fieldOf("allocationStatus", String.class);
    public static final FieldExpression<String> systemNo = szFreight.fieldOf("systemNo", String.class);
    public static final FieldExpression<String> rpPerson = szFreight.fieldOf("rpPerson", String.class);
    public static final FieldExpression<String> rpPersonName = szFreight.fieldOf("rpPersonName", String.class);
    public static final FieldExpression<String> linkNo = szFreight.fieldOf("linkNo", String.class);
    public static final FieldExpression<String> salesoffice = szFreight.fieldOf("salesoffice", String.class);
    public static final FieldExpression<String> opId = szFreight.fieldOf("opId", String.class);
    public static final FieldExpression<String> opName = szFreight.fieldOf("opName", String.class);
    public static final FieldExpression<String> inputRole = szFreight.fieldOf("inputRole", String.class);
    public static final FieldExpression<BigDecimal> timestamp = szFreight.fieldOf("timestamp", BigDecimal.class);
    public static final FieldExpression<String> remark = szFreight.fieldOf("remark", String.class);
    public static final FieldExpression<Date> businessDate = szFreight.fieldOf("businessDate", Date.class);
    public static final FieldExpression<BigDecimal> isContract = szFreight.fieldOf("isContract", BigDecimal.class);
    public static final FieldExpression<String> commisionId = szFreight.fieldOf("commisionId", String.class);
    public static final FieldExpression<String> reSettlementId = szFreight.fieldOf("reSettlementId", String.class);
    public static final FieldExpression<String> confirmNo = szFreight.fieldOf("confirmNo", String.class);
    public static final FieldExpression<String> requestNo = szFreight.fieldOf("requestNo", String.class);
    public static final FieldExpression<BigDecimal> requestAmount = szFreight.fieldOf("requestAmount", BigDecimal.class);
    public static final FieldExpression<BigDecimal> isFromQuotedprice = szFreight.fieldOf("isFromQuotedprice", BigDecimal.class);
    public static final FieldExpression<String> allocationNo = szFreight.fieldOf("allocationNo", String.class);
    public static final FieldExpression<String> requestStatus = szFreight.fieldOf("requestStatus", String.class);
    public static final FieldExpression<String> officeDept = szFreight.fieldOf("officeDept", String.class);
    public static final FieldExpression<BigDecimal> quoteUnitPrice = szFreight.fieldOf("quoteUnitPrice", BigDecimal.class);
    public static final FieldExpression<BigDecimal> isSameprice = szFreight.fieldOf("isSameprice", BigDecimal.class);
    public static final FieldExpression<String> associatingCode = szFreight.fieldOf("associatingCode", String.class);
    public static final FieldExpression<String> codesales = szFreight.fieldOf("codesales", String.class);
    public static final FieldExpression<String> priceType = szFreight.fieldOf("priceType", String.class);
    public static final FieldExpression<String> confirmId = szFreight.fieldOf("confirmId", String.class);
    public static final FieldExpression<String> rpRelationId = szFreight.fieldOf("rpRelationId", String.class);
    public static final FieldExpression<String> unit = szFreight.fieldOf("unit", String.class);
    public static final FieldExpression<String> agentcyFeeType = szFreight.fieldOf("agentcyFeeType", String.class);
    public static final FieldExpression<String> exportFlag = szFreight.fieldOf("exportFlag", String.class);
    public static final FieldExpression<Date> exportDate = szFreight.fieldOf("exportDate", Date.class);
    public static final FieldExpression<String> exportPersion = szFreight.fieldOf("exportPersion", String.class);
    public static final FieldExpression<String> exportOffice = szFreight.fieldOf("exportOffice", String.class);
    public static final FieldExpression<String> frtMode = szFreight.fieldOf("frtMode", String.class);
    public static final FieldExpression<BigDecimal> requestableAmount = szFreight.fieldOf("requestableAmount", BigDecimal.class);
    public static final FieldExpression<String> paymentNo = szFreight.fieldOf("paymentNo", String.class);
    public static final FieldExpression<String> blType = szFreight.fieldOf("blType", String.class);
    public static final FieldExpression<String> vesselAgencyId = szFreight.fieldOf("vesselAgencyId", String.class);
    public static final FieldExpression<String> cntCompany = szFreight.fieldOf("cntCompany", String.class);
    public static final FieldExpression<String> uniteNo = szFreight.fieldOf("uniteNo", String.class);
    public static final FieldExpression<BigDecimal> isCommit = szFreight.fieldOf("isCommit", BigDecimal.class);
    public static final FieldExpression<String> commitUserid = szFreight.fieldOf("commitUserid", String.class);
    public static final FieldExpression<String> commitUsername = szFreight.fieldOf("commitUsername", String.class);
    public static final FieldExpression<Date> commitTime = szFreight.fieldOf("commitTime", Date.class);
    public static final FieldExpression<BigDecimal> isInput = szFreight.fieldOf("isInput", BigDecimal.class);
    public static final FieldExpression<BigDecimal> isInnerRp = szFreight.fieldOf("isInnerRp", BigDecimal.class);
    public static final FieldExpression<String> innerRpFreightId = szFreight.fieldOf("innerRpFreightId", String.class);
    public static final FieldExpression<Date> modifyLastTime = szFreight.fieldOf("modifyLastTime", Date.class);
    public static final FieldExpression<BigDecimal> isCharged = szFreight.fieldOf("isCharged", BigDecimal.class);
    public static final FieldExpression<BigDecimal> isReplace = szFreight.fieldOf("isReplace", BigDecimal.class);
    public static final FieldExpression<String> freightSource = szFreight.fieldOf("freightSource", String.class);
    public static final FieldExpression<String> reFreightId = szFreight.fieldOf("reFreightId", String.class);
    public static final FieldExpression<String> cntNo = szFreight.fieldOf("cntNo", String.class);
    public static final FieldExpression<String> virInvoiceNo = szFreight.fieldOf("virInvoiceNo", String.class);
    public static final FieldExpression<BigDecimal> isVirSettle = szFreight.fieldOf("isVirSettle", BigDecimal.class);
    public static final FieldExpression<String> modifyLastPerson = szFreight.fieldOf("modifyLastPerson", String.class);
    public static final FieldExpression<Date> chargedDate = szFreight.fieldOf("chargedDate", Date.class);
    public static final FieldExpression<String> salesCurrency = szFreight.fieldOf("salesCurrency", String.class);
    public static final FieldExpression<BigDecimal> salesUnitPrice = szFreight.fieldOf("salesUnitPrice", BigDecimal.class);
    public static final FieldExpression<BigDecimal> salesAmount = szFreight.fieldOf("salesAmount", BigDecimal.class);
    public static final FieldExpression<BigDecimal> exchangeRate = szFreight.fieldOf("exchangeRate", BigDecimal.class);
    public static final FieldExpression<String> carrierId = szFreight.fieldOf("carrierId", String.class);
    public static final FieldExpression<BigDecimal> rpStauts = szFreight.fieldOf("rpStauts", BigDecimal.class);
    public static final FieldExpression<BigDecimal> frtExport = szFreight.fieldOf("frtExport", BigDecimal.class);
    public static final FieldExpression<String> estimatedInvoiceType = szFreight.fieldOf("estimatedInvoiceType", String.class);
    public static final FieldExpression<BigDecimal> estimatedTaxRate = szFreight.fieldOf("estimatedTaxRate", BigDecimal.class);
    public static final FieldExpression<BigDecimal> estimatedTaxes = szFreight.fieldOf("estimatedTaxes", BigDecimal.class);
    public static final FieldExpression<String> taxFormula = szFreight.fieldOf("taxFormula", String.class);
    public static final FieldExpression<String> reCntrFreightId = szFreight.fieldOf("reCntrFreightId", String.class);
    public static final FieldExpression<BigDecimal> isEdiEpayOut = szFreight.fieldOf("isEdiEpayOut", BigDecimal.class);
    public static final FieldExpression<String> applyStatus = szFreight.fieldOf("applyStatus", String.class);
    public static final FieldExpression<Date> validDate = szFreight.fieldOf("validDate", Date.class);
    public static final FieldExpression<String> cashMovementNo = szFreight.fieldOf("cashMovementNo", String.class);
    public static final FieldExpression<String> transactionOrderNo = szFreight.fieldOf("transactionOrderNo", String.class);
    public static final FieldExpression<Date> transactionDate = szFreight.fieldOf("transactionDate", Date.class);
    public static final FieldExpression<String> contactPerson = szFreight.fieldOf("contactPerson", String.class);
    public static final FieldExpression<String> payStatus = szFreight.fieldOf("payStatus", String.class);
    public static final FieldExpression<BigDecimal> agreementRate = szFreight.fieldOf("agreementRate", BigDecimal.class);
    public static final FieldExpression<String> actualPayer = szFreight.fieldOf("actualPayer", String.class);
    public static final FieldExpression<BigDecimal> isXt = szFreight.fieldOf("isXt", BigDecimal.class);
    public static final FieldExpression<String> xtFreightId = szFreight.fieldOf("xtFreightId", String.class);
    public static final FieldExpression<String> freightRate = szFreight.fieldOf("freightRate", String.class);
    public static final FieldExpression<String> agreementCurrency = szFreight.fieldOf("agreementCurrency", String.class);
    public static final FieldExpression<String> bmsUpFlag = szFreight.fieldOf("bmsUpFlag", String.class);
    public static final FieldExpression<Date> bmsUpDate = szFreight.fieldOf("bmsUpDate", Date.class);
    public static final FieldExpression<String> bmsUpPerson = szFreight.fieldOf("bmsUpPerson", String.class);
    public static final FieldExpression<String> requestId = szFreight.fieldOf("requestId", String.class);
    public static final FieldExpression<String> invoiceId = szFreight.fieldOf("invoiceId", String.class);
    public static final FieldExpression<String> bmsId = szFreight.fieldOf("bmsId", String.class);
    public static final FieldExpression<String> externalAccessSign = szFreight.fieldOf("externalAccessSign", String.class);
    public static final FieldExpression<String> testCount = szFreight.fieldOf("testCount", String.class);
    public static final FieldExpression<String> auditKtl = szFreight.fieldOf("auditKtl", String.class);


    public QSzFreight() {
        super("SzFreight", SzFreight.class);
    }

    QSzFreight(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "SzFreight", SzFreight.class, alias);
    }

    @Override
    public OperatorExpression<String> primaryKey() {
        return freightId;
    }
}
