package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.TraFees;

import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.math.BigDecimal;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QTraFees extends BaseModelExpression<TraFees, Long> {

    public static final BaseModelExpression<TraFees, Long> traFees = new QTraFees();
    public static final FieldExpression<Long> traFeesId = traFees.fieldOf("traFeesId", Long.class);
    public static final FieldExpression<Long> traOrderId = traFees.fieldOf("traOrderId", Long.class);
    public static final FieldExpression<String> feesName = traFees.fieldOf("feesName", String.class);
    public static final FieldExpression<String> chargeUnit = traFees.fieldOf("chargeUnit", String.class);
    public static final FieldExpression<BigDecimal> unitPrice = traFees.fieldOf("unitPrice", BigDecimal.class);
    public static final FieldExpression<String> unitCurrency = traFees.fieldOf("unitCurrency", String.class);
    public static final FieldExpression<Integer> quantity = traFees.fieldOf("quantity", Integer.class);
    public static final FieldExpression<String> settleCurrency = traFees.fieldOf("settleCurrency", String.class);
    public static final FieldExpression<BigDecimal> settleAmount = traFees.fieldOf("settleAmount", BigDecimal.class);
    public static final FieldExpression<Long> creatorId = traFees.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = traFees.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = traFees.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = traFees.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = traFees.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = traFees.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = traFees.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = traFees.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = traFees.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = traFees.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = traFees.fieldOf("recordVersion", Integer.class);


    public QTraFees() {
        super("TraFees", TraFees.class);
    }

    QTraFees(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "TraFees", TraFees.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return traFeesId;
    }
}
