package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.GoOrderHistory;

import java.lang.Boolean;
import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QGoOrderHistory extends BaseModelExpression<GoOrderHistory, Long> {

    public static final BaseModelExpression<GoOrderHistory, Long> goOrderHistory = new QGoOrderHistory();
    public static final FieldExpression<Long> goOrderHistoryId = goOrderHistory.fieldOf("goOrderHistoryId", Long.class);
    public static final FieldExpression<Long> goOrderId = goOrderHistory.fieldOf("goOrderId", Long.class);
    public static final FieldExpression<String> carrierId = goOrderHistory.fieldOf("carrierId", String.class);
    public static final FieldExpression<String> carrierName = goOrderHistory.fieldOf("carrierName", String.class);
    public static final FieldExpression<Boolean> isAppointed = goOrderHistory.fieldOf("isAppointed", Boolean.class);
    public static final FieldExpression<String> receiveStatus = goOrderHistory.fieldOf("receiveStatus", String.class);
    public static final FieldExpression<String> reason = goOrderHistory.fieldOf("reason", String.class);
    public static final FieldExpression<Boolean> isValid = goOrderHistory.fieldOf("isValid", Boolean.class);
    public static final FieldExpression<Long> creatorId = goOrderHistory.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = goOrderHistory.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = goOrderHistory.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = goOrderHistory.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = goOrderHistory.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = goOrderHistory.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = goOrderHistory.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = goOrderHistory.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = goOrderHistory.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = goOrderHistory.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = goOrderHistory.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<Boolean> isDeleted = goOrderHistory.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<String> carrierContact = goOrderHistory.fieldOf("carrierContact", String.class);
    public static final FieldExpression<String> carrierTel = goOrderHistory.fieldOf("carrierTel", String.class);


    public QGoOrderHistory() {
        super("GoOrderHistory", GoOrderHistory.class);
    }

    QGoOrderHistory(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "GoOrderHistory", GoOrderHistory.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return goOrderHistoryId;
    }
}
