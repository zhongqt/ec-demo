package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.ExportTaskQueue;

import java.lang.Integer;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QExportTaskQueue extends BaseModelExpression<ExportTaskQueue, String> {

    public static final BaseModelExpression<ExportTaskQueue, String> exportTaskQueue = new QExportTaskQueue();
    public static final FieldExpression<String> exportRequestKey = exportTaskQueue.fieldOf("exportRequestKey", String.class);
    public static final FieldExpression<String> exportConfigKey = exportTaskQueue.fieldOf("exportConfigKey", String.class);
    public static final FieldExpression<String> cookieValues = exportTaskQueue.fieldOf("cookieValues", String.class);
    public static final FieldExpression<String> params = exportTaskQueue.fieldOf("params", String.class);
    public static final FieldExpression<Integer> progress = exportTaskQueue.fieldOf("progress", Integer.class);
    public static final FieldExpression<String> requestPath = exportTaskQueue.fieldOf("requestPath", String.class);
    public static final FieldExpression<String> filename = exportTaskQueue.fieldOf("filename", String.class);
    public static final FieldExpression<String> state = exportTaskQueue.fieldOf("state", String.class);
    public static final FieldExpression<String> userId = exportTaskQueue.fieldOf("userId", String.class);
    public static final FieldExpression<String> errorMessage = exportTaskQueue.fieldOf("errorMessage", String.class);
    public static final FieldExpression<Date> createDatetime = exportTaskQueue.fieldOf("createDatetime", Date.class);


    public QExportTaskQueue() {
        super("ExportTaskQueue", ExportTaskQueue.class);
    }

    QExportTaskQueue(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "ExportTaskQueue", ExportTaskQueue.class, alias);
    }

    @Override
    public OperatorExpression<String> primaryKey() {
        return exportRequestKey;
    }
}
