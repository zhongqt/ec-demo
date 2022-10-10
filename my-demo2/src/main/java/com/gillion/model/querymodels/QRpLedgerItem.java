package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.RpLedgerItem;

import java.lang.String;
import java.math.BigDecimal;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QRpLedgerItem extends BaseModelExpression<RpLedgerItem, String> {

    public static final BaseModelExpression<RpLedgerItem, String> rpLedgerItem = new QRpLedgerItem();
    public static final FieldExpression<String> ledgerItemId = rpLedgerItem.fieldOf("ledgerItemId", String.class);
    public static final FieldExpression<String> ledgerTypeCode = rpLedgerItem.fieldOf("ledgerTypeCode", String.class);
    public static final FieldExpression<String> systemType = rpLedgerItem.fieldOf("systemType", String.class);
    public static final FieldExpression<String> businessId = rpLedgerItem.fieldOf("businessId", String.class);
    public static final FieldExpression<String> orderNo = rpLedgerItem.fieldOf("orderNo", String.class);
    public static final FieldExpression<String> description = rpLedgerItem.fieldOf("description", String.class);
    public static final FieldExpression<String> rpId = rpLedgerItem.fieldOf("rpId", String.class);
    public static final FieldExpression<Date> inputDate = rpLedgerItem.fieldOf("inputDate", Date.class);
    public static final FieldExpression<String> inputOffice = rpLedgerItem.fieldOf("inputOffice", String.class);
    public static final FieldExpression<String> inputPerson = rpLedgerItem.fieldOf("inputPerson", String.class);
    public static final FieldExpression<String> inputPersonName = rpLedgerItem.fieldOf("inputPersonName", String.class);
    public static final FieldExpression<String> ledgerPartnerCode = rpLedgerItem.fieldOf("ledgerPartnerCode", String.class);
    public static final FieldExpression<String> ledgerPartnerName = rpLedgerItem.fieldOf("ledgerPartnerName", String.class);
    public static final FieldExpression<BigDecimal> ledgerItemStateInd = rpLedgerItem.fieldOf("ledgerItemStateInd", BigDecimal.class);
    public static final FieldExpression<String> officeId = rpLedgerItem.fieldOf("officeId", String.class);
    public static final FieldExpression<String> rpPerson = rpLedgerItem.fieldOf("rpPerson", String.class);
    public static final FieldExpression<String> rpPersonName = rpLedgerItem.fieldOf("rpPersonName", String.class);
    public static final FieldExpression<String> sourceType = rpLedgerItem.fieldOf("sourceType", String.class);
    public static final FieldExpression<String> sourceId = rpLedgerItem.fieldOf("sourceId", String.class);
    public static final FieldExpression<String> applyBaseCurrencyCode = rpLedgerItem.fieldOf("applyBaseCurrencyCode", String.class);
    public static final FieldExpression<BigDecimal> applyBaseCurrencyValue = rpLedgerItem.fieldOf("applyBaseCurrencyValue", BigDecimal.class);
    public static final FieldExpression<String> applyPrimeCurrencyCode = rpLedgerItem.fieldOf("applyPrimeCurrencyCode", String.class);
    public static final FieldExpression<BigDecimal> applyPrimeCurrencyValue = rpLedgerItem.fieldOf("applyPrimeCurrencyValue", BigDecimal.class);
    public static final FieldExpression<BigDecimal> applyUsdValue = rpLedgerItem.fieldOf("applyUsdValue", BigDecimal.class);
    public static final FieldExpression<BigDecimal> allocableBaseCurrencyValue = rpLedgerItem.fieldOf("allocableBaseCurrencyValue", BigDecimal.class);
    public static final FieldExpression<BigDecimal> allocablePrimeCurrencyValue = rpLedgerItem.fieldOf("allocablePrimeCurrencyValue", BigDecimal.class);
    public static final FieldExpression<BigDecimal> allocableUsdValue = rpLedgerItem.fieldOf("allocableUsdValue", BigDecimal.class);
    public static final FieldExpression<BigDecimal> allocatedBaseCurrencyValue = rpLedgerItem.fieldOf("allocatedBaseCurrencyValue", BigDecimal.class);
    public static final FieldExpression<BigDecimal> allocatedPrimeCurrencyValue = rpLedgerItem.fieldOf("allocatedPrimeCurrencyValue", BigDecimal.class);
    public static final FieldExpression<BigDecimal> allocatedUsdValue = rpLedgerItem.fieldOf("allocatedUsdValue", BigDecimal.class);
    public static final FieldExpression<BigDecimal> invoicePrimeValue = rpLedgerItem.fieldOf("invoicePrimeValue", BigDecimal.class);
    public static final FieldExpression<BigDecimal> invoiceBaseValue = rpLedgerItem.fieldOf("invoiceBaseValue", BigDecimal.class);
    public static final FieldExpression<BigDecimal> invoiceUsdValue = rpLedgerItem.fieldOf("invoiceUsdValue", BigDecimal.class);
    public static final FieldExpression<String> invoiceStatus = rpLedgerItem.fieldOf("invoiceStatus", String.class);
    public static final FieldExpression<String> invoiceNo = rpLedgerItem.fieldOf("invoiceNo", String.class);
    public static final FieldExpression<BigDecimal> collectFlag = rpLedgerItem.fieldOf("collectFlag", BigDecimal.class);
    public static final FieldExpression<Date> collectBillDate = rpLedgerItem.fieldOf("collectBillDate", Date.class);
    public static final FieldExpression<String> collectBillId = rpLedgerItem.fieldOf("collectBillId", String.class);
    public static final FieldExpression<String> documentLocationReference = rpLedgerItem.fieldOf("documentLocationReference", String.class);
    public static final FieldExpression<Date> dueDate = rpLedgerItem.fieldOf("dueDate", Date.class);
    public static final FieldExpression<String> settlementRemarks = rpLedgerItem.fieldOf("settlementRemarks", String.class);
    public static final FieldExpression<String> controlGlCoaCode = rpLedgerItem.fieldOf("controlGlCoaCode", String.class);
    public static final FieldExpression<String> fiscalPeriod = rpLedgerItem.fieldOf("fiscalPeriod", String.class);
    public static final FieldExpression<String> accountDissectionId = rpLedgerItem.fieldOf("accountDissectionId", String.class);
    public static final FieldExpression<Date> closeDate = rpLedgerItem.fieldOf("closeDate", Date.class);
    public static final FieldExpression<String> subTypeCode = rpLedgerItem.fieldOf("subTypeCode", String.class);
    public static final FieldExpression<String> subTypeCode2 = rpLedgerItem.fieldOf("subTypeCode2", String.class);
    public static final FieldExpression<String> linkNo = rpLedgerItem.fieldOf("linkNo", String.class);
    public static final FieldExpression<BigDecimal> isInternal = rpLedgerItem.fieldOf("isInternal", BigDecimal.class);
    public static final FieldExpression<BigDecimal> isManual = rpLedgerItem.fieldOf("isManual", BigDecimal.class);
    public static final FieldExpression<String> salesoffice = rpLedgerItem.fieldOf("salesoffice", String.class);
    public static final FieldExpression<String> opId = rpLedgerItem.fieldOf("opId", String.class);
    public static final FieldExpression<String> opName = rpLedgerItem.fieldOf("opName", String.class);
    public static final FieldExpression<String> compId = rpLedgerItem.fieldOf("compId", String.class);
    public static final FieldExpression<String> compNo = rpLedgerItem.fieldOf("compNo", String.class);
    public static final FieldExpression<Date> compDate = rpLedgerItem.fieldOf("compDate", Date.class);
    public static final FieldExpression<String> inputRole = rpLedgerItem.fieldOf("inputRole", String.class);
    public static final FieldExpression<Date> businessDate = rpLedgerItem.fieldOf("businessDate", Date.class);
    public static final FieldExpression<Date> completeDate = rpLedgerItem.fieldOf("completeDate", Date.class);
    public static final FieldExpression<String> completePerson = rpLedgerItem.fieldOf("completePerson", String.class);
    public static final FieldExpression<String> completePersonName = rpLedgerItem.fieldOf("completePersonName", String.class);
    public static final FieldExpression<Date> freightInputDate = rpLedgerItem.fieldOf("freightInputDate", Date.class);
    public static final FieldExpression<String> freightInputPerson = rpLedgerItem.fieldOf("freightInputPerson", String.class);
    public static final FieldExpression<String> freightInputPersonName = rpLedgerItem.fieldOf("freightInputPersonName", String.class);
    public static final FieldExpression<String> inputBatchNo = rpLedgerItem.fieldOf("inputBatchNo", String.class);
    public static final FieldExpression<String> rpFrtId = rpLedgerItem.fieldOf("rpFrtId", String.class);
    public static final FieldExpression<String> rpFrtName = rpLedgerItem.fieldOf("rpFrtName", String.class);
    public static final FieldExpression<String> rpFrtType = rpLedgerItem.fieldOf("rpFrtType", String.class);
    public static final FieldExpression<String> rpFrtStype = rpLedgerItem.fieldOf("rpFrtStype", String.class);
    public static final FieldExpression<String> itemType = rpLedgerItem.fieldOf("itemType", String.class);
    public static final FieldExpression<String> balanceTo = rpLedgerItem.fieldOf("balanceTo", String.class);
    public static final FieldExpression<String> relatedArId = rpLedgerItem.fieldOf("relatedArId", String.class);
    public static final FieldExpression<BigDecimal> includeCommission = rpLedgerItem.fieldOf("includeCommission", BigDecimal.class);
    public static final FieldExpression<BigDecimal> commissionRate = rpLedgerItem.fieldOf("commissionRate", BigDecimal.class);
    public static final FieldExpression<BigDecimal> commissinAmount = rpLedgerItem.fieldOf("commissinAmount", BigDecimal.class);
    public static final FieldExpression<String> glArpVoucherId = rpLedgerItem.fieldOf("glArpVoucherId", String.class);
    public static final FieldExpression<String> glArpCoaCode = rpLedgerItem.fieldOf("glArpCoaCode", String.class);
    public static final FieldExpression<String> glArpFiscalPeriod = rpLedgerItem.fieldOf("glArpFiscalPeriod", String.class);
    public static final FieldExpression<String> glArpBusinessNo = rpLedgerItem.fieldOf("glArpBusinessNo", String.class);
    public static final FieldExpression<String> glCostVoucherId = rpLedgerItem.fieldOf("glCostVoucherId", String.class);
    public static final FieldExpression<String> glCostCoaCode = rpLedgerItem.fieldOf("glCostCoaCode", String.class);
    public static final FieldExpression<String> glCostFiscalPeriod = rpLedgerItem.fieldOf("glCostFiscalPeriod", String.class);
    public static final FieldExpression<String> glCostBusinessNo = rpLedgerItem.fieldOf("glCostBusinessNo", String.class);
    public static final FieldExpression<String> externalPartnerCode = rpLedgerItem.fieldOf("externalPartnerCode", String.class);
    public static final FieldExpression<String> externalPartnerName = rpLedgerItem.fieldOf("externalPartnerName", String.class);
    public static final FieldExpression<BigDecimal> glRateBase = rpLedgerItem.fieldOf("glRateBase", BigDecimal.class);
    public static final FieldExpression<BigDecimal> glRateUsd = rpLedgerItem.fieldOf("glRateUsd", BigDecimal.class);
    public static final FieldExpression<String> payTerm = rpLedgerItem.fieldOf("payTerm", String.class);
    public static final FieldExpression<BigDecimal> isCash = rpLedgerItem.fieldOf("isCash", BigDecimal.class);
    public static final FieldExpression<String> requestNo = rpLedgerItem.fieldOf("requestNo", String.class);
    public static final FieldExpression<String> approveStatus = rpLedgerItem.fieldOf("approveStatus", String.class);
    public static final FieldExpression<BigDecimal> approvePrimeValue = rpLedgerItem.fieldOf("approvePrimeValue", BigDecimal.class);
    public static final FieldExpression<BigDecimal> approveBaseValue = rpLedgerItem.fieldOf("approveBaseValue", BigDecimal.class);
    public static final FieldExpression<BigDecimal> approveUsdValue = rpLedgerItem.fieldOf("approveUsdValue", BigDecimal.class);
    public static final FieldExpression<String> reSettlementId = rpLedgerItem.fieldOf("reSettlementId", String.class);
    public static final FieldExpression<String> allocationNo = rpLedgerItem.fieldOf("allocationNo", String.class);
    public static final FieldExpression<String> requestStatus = rpLedgerItem.fieldOf("requestStatus", String.class);
    public static final FieldExpression<BigDecimal> requestedPrimeValue = rpLedgerItem.fieldOf("requestedPrimeValue", BigDecimal.class);
    public static final FieldExpression<BigDecimal> requestedBaseValue = rpLedgerItem.fieldOf("requestedBaseValue", BigDecimal.class);
    public static final FieldExpression<BigDecimal> requestedUsdValue = rpLedgerItem.fieldOf("requestedUsdValue", BigDecimal.class);
    public static final FieldExpression<String> cashMovementId = rpLedgerItem.fieldOf("cashMovementId", String.class);
    public static final FieldExpression<String> estimatedInvoiceType = rpLedgerItem.fieldOf("estimatedInvoiceType", String.class);
    public static final FieldExpression<BigDecimal> estimatedTaxRate = rpLedgerItem.fieldOf("estimatedTaxRate", BigDecimal.class);
    public static final FieldExpression<BigDecimal> estimatedTaxes = rpLedgerItem.fieldOf("estimatedTaxes", BigDecimal.class);
    public static final FieldExpression<String> actualInvoiceType = rpLedgerItem.fieldOf("actualInvoiceType", String.class);
    public static final FieldExpression<BigDecimal> actualTaxRate = rpLedgerItem.fieldOf("actualTaxRate", BigDecimal.class);
    public static final FieldExpression<BigDecimal> actualTaxes = rpLedgerItem.fieldOf("actualTaxes", BigDecimal.class);
    public static final FieldExpression<BigDecimal> actualRateBase = rpLedgerItem.fieldOf("actualRateBase", BigDecimal.class);
    public static final FieldExpression<BigDecimal> actualBaseCurrencyValue = rpLedgerItem.fieldOf("actualBaseCurrencyValue", BigDecimal.class);
    public static final FieldExpression<BigDecimal> isTaxDifference = rpLedgerItem.fieldOf("isTaxDifference", BigDecimal.class);
    public static final FieldExpression<String> glTaxVoucherId = rpLedgerItem.fieldOf("glTaxVoucherId", String.class);
    public static final FieldExpression<String> glTaxFiscalPeriod = rpLedgerItem.fieldOf("glTaxFiscalPeriod", String.class);
    public static final FieldExpression<String> taxFormula = rpLedgerItem.fieldOf("taxFormula", String.class);
    public static final FieldExpression<Date> modifyLastTime = rpLedgerItem.fieldOf("modifyLastTime", Date.class);
    public static final FieldExpression<String> glTaxBusinessNo = rpLedgerItem.fieldOf("glTaxBusinessNo", String.class);
    public static final FieldExpression<BigDecimal> rpStauts = rpLedgerItem.fieldOf("rpStauts", BigDecimal.class);


    public QRpLedgerItem() {
        super("RpLedgerItem", RpLedgerItem.class);
    }

    QRpLedgerItem(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "RpLedgerItem", RpLedgerItem.class, alias);
    }

    @Override
    public OperatorExpression<String> primaryKey() {
        return ledgerItemId;
    }
}
