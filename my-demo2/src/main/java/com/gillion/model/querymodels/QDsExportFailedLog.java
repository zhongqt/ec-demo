package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.DsExportFailedLog;

import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QDsExportFailedLog extends BaseModelExpression<DsExportFailedLog, Long> {

    public static final BaseModelExpression<DsExportFailedLog, Long> dsExportFailedLog = new QDsExportFailedLog();
    public static final FieldExpression<Long> exportFailedLogId = dsExportFailedLog.fieldOf("exportFailedLogId", Long.class);
    public static final FieldExpression<Long> exportPatternId = dsExportFailedLog.fieldOf("exportPatternId", Long.class);
    public static final FieldExpression<Long> exportTaskId = dsExportFailedLog.fieldOf("exportTaskId", Long.class);
    public static final FieldExpression<String> tag = dsExportFailedLog.fieldOf("tag", String.class);
    public static final FieldExpression<String> errorMessages = dsExportFailedLog.fieldOf("errorMessages", String.class);
    public static final FieldExpression<String> creator = dsExportFailedLog.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = dsExportFailedLog.fieldOf("createTime", Date.class);


    public QDsExportFailedLog() {
        super("DsExportFailedLog", DsExportFailedLog.class);
    }

    QDsExportFailedLog(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "DsExportFailedLog", DsExportFailedLog.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return exportFailedLogId;
    }
}
