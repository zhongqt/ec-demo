package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.WlmExchangeLog;

import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QWlmExchangeLog extends BaseModelExpression<WlmExchangeLog, String> {

    public static final BaseModelExpression<WlmExchangeLog, String> wlmExchangeLog = new QWlmExchangeLog();
    public static final FieldExpression<String> uuid = wlmExchangeLog.fieldOf("uuid", String.class);
    public static final FieldExpression<String> action = wlmExchangeLog.fieldOf("action", String.class);
    public static final FieldExpression<String> actionType = wlmExchangeLog.fieldOf("actionType", String.class);
    public static final FieldExpression<String> userId = wlmExchangeLog.fieldOf("userId", String.class);
    public static final FieldExpression<String> token = wlmExchangeLog.fieldOf("token", String.class);
    public static final FieldExpression<String> requestData = wlmExchangeLog.fieldOf("requestData", String.class);
    public static final FieldExpression<String> responseData = wlmExchangeLog.fieldOf("responseData", String.class);
    public static final FieldExpression<Date> createTime = wlmExchangeLog.fieldOf("createTime", Date.class);
    public static final FieldExpression<Date> updateTime = wlmExchangeLog.fieldOf("updateTime", Date.class);
    public static final FieldExpression<String> remark = wlmExchangeLog.fieldOf("remark", String.class);
    public static final FieldExpression<String> eventId = wlmExchangeLog.fieldOf("eventId", String.class);


    public QWlmExchangeLog() {
        super("WlmExchangeLog", WlmExchangeLog.class);
    }

    QWlmExchangeLog(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "WlmExchangeLog", WlmExchangeLog.class, alias);
    }

    @Override
    public OperatorExpression<String> primaryKey() {
        return uuid;
    }
}
