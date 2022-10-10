package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.OrderHandleLog;

import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QOrderHandleLog extends BaseModelExpression<OrderHandleLog, String> {

    public static final BaseModelExpression<OrderHandleLog, String> orderHandleLog = new QOrderHandleLog();
    public static final FieldExpression<String> id = orderHandleLog.fieldOf("id", String.class);
    public static final FieldExpression<Long> preOrderId = orderHandleLog.fieldOf("preOrderId", Long.class);
    public static final FieldExpression<String> errorMessage = orderHandleLog.fieldOf("errorMessage", String.class);
    public static final FieldExpression<Integer> handleStatus = orderHandleLog.fieldOf("handleStatus", Integer.class);
    public static final FieldExpression<Date> createTime = orderHandleLog.fieldOf("createTime", Date.class);


    public QOrderHandleLog() {
        super("OrderHandleLog", OrderHandleLog.class);
    }

    QOrderHandleLog(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "OrderHandleLog", OrderHandleLog.class, alias);
    }

    @Override
    public OperatorExpression<String> primaryKey() {
        return id;
    }
}
