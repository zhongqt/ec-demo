package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.ImportTaskQueue;

import java.lang.Integer;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QImportTaskQueue extends BaseModelExpression<ImportTaskQueue, String> {

    public static final BaseModelExpression<ImportTaskQueue, String> importTaskQueue = new QImportTaskQueue();
    public static final FieldExpression<String> importRequestKey = importTaskQueue.fieldOf("importRequestKey", String.class);
    public static final FieldExpression<String> importConfigKey = importTaskQueue.fieldOf("importConfigKey", String.class);
    public static final FieldExpression<String> originalFilename = importTaskQueue.fieldOf("originalFilename", String.class);
    public static final FieldExpression<String> cookieValues = importTaskQueue.fieldOf("cookieValues", String.class);
    public static final FieldExpression<Integer> progress = importTaskQueue.fieldOf("progress", Integer.class);
    public static final FieldExpression<String> requestPath = importTaskQueue.fieldOf("requestPath", String.class);
    public static final FieldExpression<String> errorMessage = importTaskQueue.fieldOf("errorMessage", String.class);
    public static final FieldExpression<String> state = importTaskQueue.fieldOf("state", String.class);
    public static final FieldExpression<String> userId = importTaskQueue.fieldOf("userId", String.class);
    public static final FieldExpression<Date> createDatetime = importTaskQueue.fieldOf("createDatetime", Date.class);


    public QImportTaskQueue() {
        super("ImportTaskQueue", ImportTaskQueue.class);
    }

    QImportTaskQueue(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "ImportTaskQueue", ImportTaskQueue.class, alias);
    }

    @Override
    public OperatorExpression<String> primaryKey() {
        return importRequestKey;
    }
}
