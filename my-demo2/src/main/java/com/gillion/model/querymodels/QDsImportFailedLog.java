package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.DsImportFailedLog;

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
public class QDsImportFailedLog extends BaseModelExpression<DsImportFailedLog, Long> {

    public static final BaseModelExpression<DsImportFailedLog, Long> dsImportFailedLog = new QDsImportFailedLog();
    public static final FieldExpression<Long> importFailedLogId = dsImportFailedLog.fieldOf("importFailedLogId", Long.class);
    public static final FieldExpression<Long> importPatternId = dsImportFailedLog.fieldOf("importPatternId", Long.class);
    public static final FieldExpression<Long> importTaskId = dsImportFailedLog.fieldOf("importTaskId", Long.class);
    public static final FieldExpression<String> tag = dsImportFailedLog.fieldOf("tag", String.class);
    public static final FieldExpression<Integer> recordIndex = dsImportFailedLog.fieldOf("recordIndex", Integer.class);
    public static final FieldExpression<String> recordData = dsImportFailedLog.fieldOf("recordData", String.class);
    public static final FieldExpression<String> errorMessages = dsImportFailedLog.fieldOf("errorMessages", String.class);
    public static final FieldExpression<String> creator = dsImportFailedLog.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = dsImportFailedLog.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> projectKey = dsImportFailedLog.fieldOf("projectKey", String.class);
    public static final FieldExpression<Boolean> destroyed = dsImportFailedLog.fieldOf("destroyed", Boolean.class);
    public static final FieldExpression<String> modifier = dsImportFailedLog.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = dsImportFailedLog.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> version = dsImportFailedLog.fieldOf("version", Long.class);


    public QDsImportFailedLog() {
        super("DsImportFailedLog", DsImportFailedLog.class);
    }

    QDsImportFailedLog(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "DsImportFailedLog", DsImportFailedLog.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return importFailedLogId;
    }
}
