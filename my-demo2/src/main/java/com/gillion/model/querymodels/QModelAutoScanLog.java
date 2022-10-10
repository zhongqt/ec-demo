package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.ModelAutoScanLog;

import java.lang.Byte;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QModelAutoScanLog extends BaseModelExpression<ModelAutoScanLog, Long> {

    public static final BaseModelExpression<ModelAutoScanLog, Long> modelAutoScanLog = new QModelAutoScanLog();
    public static final FieldExpression<Long> id = modelAutoScanLog.fieldOf("id", Long.class);
    public static final FieldExpression<String> schemaName = modelAutoScanLog.fieldOf("schemaName", String.class);
    public static final FieldExpression<String> tableName = modelAutoScanLog.fieldOf("tableName", String.class);
    public static final FieldExpression<Date> eventDatetime = modelAutoScanLog.fieldOf("eventDatetime", Date.class);
    public static final FieldExpression<String> warnMessage = modelAutoScanLog.fieldOf("warnMessage", String.class);
    public static final FieldExpression<Byte> warnType = modelAutoScanLog.fieldOf("warnType", Byte.class);
    public static final FieldExpression<String> reviewArgument = modelAutoScanLog.fieldOf("reviewArgument", String.class);
    public static final FieldExpression<String> projectKey = modelAutoScanLog.fieldOf("projectKey", String.class);


    public QModelAutoScanLog() {
        super("ModelAutoScanLog", ModelAutoScanLog.class);
    }

    QModelAutoScanLog(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "ModelAutoScanLog", ModelAutoScanLog.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
