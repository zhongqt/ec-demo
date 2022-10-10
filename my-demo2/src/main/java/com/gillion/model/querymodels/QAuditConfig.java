package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.AuditConfig;

import java.lang.Byte;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QAuditConfig extends BaseModelExpression<AuditConfig, Long> {

    public static final BaseModelExpression<AuditConfig, Long> auditConfig = new QAuditConfig();
    public static final FieldExpression<Long> id = auditConfig.fieldOf("id", Long.class);
    public static final FieldExpression<String> url = auditConfig.fieldOf("url", String.class);
    public static final FieldExpression<Byte> status = auditConfig.fieldOf("status", Byte.class);
    public static final FieldExpression<String> creator = auditConfig.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = auditConfig.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = auditConfig.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = auditConfig.fieldOf("modifyTime", Date.class);


    public QAuditConfig() {
        super("AuditConfig", AuditConfig.class);
    }

    QAuditConfig(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "AuditConfig", AuditConfig.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
