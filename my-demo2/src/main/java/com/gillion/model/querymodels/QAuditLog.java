package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.AuditLog;

import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QAuditLog extends BaseModelExpression<AuditLog, Long> {

    public static final BaseModelExpression<AuditLog, Long> auditLog = new QAuditLog();
    public static final FieldExpression<Long> id = auditLog.fieldOf("id", Long.class);
    public static final FieldExpression<String> url = auditLog.fieldOf("url", String.class);
    public static final FieldExpression<String> reqArgs = auditLog.fieldOf("reqArgs", String.class);
    public static final FieldExpression<String> operator = auditLog.fieldOf("operator", String.class);
    public static final FieldExpression<Date> operateTime = auditLog.fieldOf("operateTime", Date.class);


    public QAuditLog() {
        super("AuditLog", AuditLog.class);
    }

    QAuditLog(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "AuditLog", AuditLog.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
