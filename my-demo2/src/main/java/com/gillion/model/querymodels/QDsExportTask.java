package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.DsExportTask;

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
public class QDsExportTask extends BaseModelExpression<DsExportTask, Long> {

    public static final BaseModelExpression<DsExportTask, Long> dsExportTask = new QDsExportTask();
    public static final FieldExpression<Long> exportTaskId = dsExportTask.fieldOf("exportTaskId", Long.class);
    public static final FieldExpression<Long> exportPatternId = dsExportTask.fieldOf("exportPatternId", Long.class);
    public static final FieldExpression<String> filePath = dsExportTask.fieldOf("filePath", String.class);
    public static final FieldExpression<String> exportFileName = dsExportTask.fieldOf("exportFileName", String.class);
    public static final FieldExpression<String> exportFileId = dsExportTask.fieldOf("exportFileId", String.class);
    public static final FieldExpression<String> exportQueryPattern = dsExportTask.fieldOf("exportQueryPattern", String.class);
    public static final FieldExpression<String> progressArguments = dsExportTask.fieldOf("progressArguments", String.class);
    public static final FieldExpression<Integer> processedCount = dsExportTask.fieldOf("processedCount", Integer.class);
    public static final FieldExpression<Date> startDatetime = dsExportTask.fieldOf("startDatetime", Date.class);
    public static final FieldExpression<Date> endDatetime = dsExportTask.fieldOf("endDatetime", Date.class);
    public static final FieldExpression<String> sessionArguments = dsExportTask.fieldOf("sessionArguments", String.class);
    public static final FieldExpression<Integer> taskStatus = dsExportTask.fieldOf("taskStatus", Integer.class);
    public static final FieldExpression<String> creator = dsExportTask.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = dsExportTask.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = dsExportTask.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = dsExportTask.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> version = dsExportTask.fieldOf("version", Long.class);
    public static final FieldExpression<Boolean> destroyed = dsExportTask.fieldOf("destroyed", Boolean.class);


    public QDsExportTask() {
        super("DsExportTask", DsExportTask.class);
    }

    QDsExportTask(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "DsExportTask", DsExportTask.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return exportTaskId;
    }
}
