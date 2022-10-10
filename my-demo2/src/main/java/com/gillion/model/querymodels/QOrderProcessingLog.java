package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.OrderProcessingLog;

import java.lang.Integer;
import java.lang.Long;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QOrderProcessingLog extends BaseModelExpression<OrderProcessingLog, Long> {

    public static final BaseModelExpression<OrderProcessingLog, Long> orderProcessingLog = new QOrderProcessingLog();
    public static final FieldExpression<Long> businessId = orderProcessingLog.fieldOf("businessId", Long.class);
    public static final FieldExpression<Integer> status = orderProcessingLog.fieldOf("status", Integer.class);


    public QOrderProcessingLog() {
        super("OrderProcessingLog", OrderProcessingLog.class);
    }

    QOrderProcessingLog(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "OrderProcessingLog", OrderProcessingLog.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return businessId;
    }
}
