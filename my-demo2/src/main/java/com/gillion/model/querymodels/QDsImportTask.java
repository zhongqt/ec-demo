package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.DsImportTask;

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
public class QDsImportTask extends BaseModelExpression<DsImportTask, Long> {

    public static final BaseModelExpression<DsImportTask, Long> dsImportTask = new QDsImportTask();
    public static final FieldExpression<Long> importTaskId = dsImportTask.fieldOf("importTaskId", Long.class);
    public static final FieldExpression<Long> importPatternId = dsImportTask.fieldOf("importPatternId", Long.class);
    public static final FieldExpression<String> headers = dsImportTask.fieldOf("headers", String.class);
    public static final FieldExpression<Integer> processedCount = dsImportTask.fieldOf("processedCount", Integer.class);
    public static final FieldExpression<Integer> processedErrorCount = dsImportTask.fieldOf("processedErrorCount", Integer.class);
    public static final FieldExpression<Date> startDatetime = dsImportTask.fieldOf("startDatetime", Date.class);
    public static final FieldExpression<Date> endDatetime = dsImportTask.fieldOf("endDatetime", Date.class);
    public static final FieldExpression<String> sessionArguments = dsImportTask.fieldOf("sessionArguments", String.class);
    public static final FieldExpression<Integer> taskStatus = dsImportTask.fieldOf("taskStatus", Integer.class);
    public static final FieldExpression<String> creator = dsImportTask.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = dsImportTask.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = dsImportTask.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = dsImportTask.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Integer> version = dsImportTask.fieldOf("version", Integer.class);
    public static final FieldExpression<Boolean> destroyed = dsImportTask.fieldOf("destroyed", Boolean.class);


    public QDsImportTask() {
        super("DsImportTask", DsImportTask.class);
    }

    QDsImportTask(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "DsImportTask", DsImportTask.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return importTaskId;
    }
}
