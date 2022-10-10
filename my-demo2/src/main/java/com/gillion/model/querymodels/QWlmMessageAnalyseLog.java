package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.WlmMessageAnalyseLog;

import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QWlmMessageAnalyseLog extends BaseModelExpression<WlmMessageAnalyseLog, String> {

    public static final BaseModelExpression<WlmMessageAnalyseLog, String> wlmMessageAnalyseLog = new QWlmMessageAnalyseLog();
    public static final FieldExpression<String> uuid = wlmMessageAnalyseLog.fieldOf("uuid", String.class);
    public static final FieldExpression<String> actionType = wlmMessageAnalyseLog.fieldOf("actionType", String.class);
    public static final FieldExpression<String> eventId = wlmMessageAnalyseLog.fieldOf("eventId", String.class);
    public static final FieldExpression<String> note = wlmMessageAnalyseLog.fieldOf("note", String.class);
    public static final FieldExpression<Date> createTime = wlmMessageAnalyseLog.fieldOf("createTime", Date.class);
    public static final FieldExpression<Date> updateTime = wlmMessageAnalyseLog.fieldOf("updateTime", Date.class);


    public QWlmMessageAnalyseLog() {
        super("WlmMessageAnalyseLog", WlmMessageAnalyseLog.class);
    }

    QWlmMessageAnalyseLog(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "WlmMessageAnalyseLog", WlmMessageAnalyseLog.class, alias);
    }

    @Override
    public OperatorExpression<String> primaryKey() {
        return uuid;
    }
}
