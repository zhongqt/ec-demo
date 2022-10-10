package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.DsExportPattern;

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
public class QDsExportPattern extends BaseModelExpression<DsExportPattern, Long> {

    public static final BaseModelExpression<DsExportPattern, Long> dsExportPattern = new QDsExportPattern();
    public static final FieldExpression<Long> exportPatternId = dsExportPattern.fieldOf("exportPatternId", Long.class);
    public static final FieldExpression<String> tag = dsExportPattern.fieldOf("tag", String.class);
    public static final FieldExpression<Long> dataSourceId = dsExportPattern.fieldOf("dataSourceId", Long.class);
    public static final FieldExpression<String> mainModelName = dsExportPattern.fieldOf("mainModelName", String.class);
    public static final FieldExpression<Integer> exportFileType = dsExportPattern.fieldOf("exportFileType", Integer.class);
    public static final FieldExpression<String> exportFileName = dsExportPattern.fieldOf("exportFileName", String.class);
    public static final FieldExpression<String> storedPath = dsExportPattern.fieldOf("storedPath", String.class);
    public static final FieldExpression<Boolean> isAsync = dsExportPattern.fieldOf("isAsync", Boolean.class);
    public static final FieldExpression<String> creator = dsExportPattern.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = dsExportPattern.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = dsExportPattern.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = dsExportPattern.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> version = dsExportPattern.fieldOf("version", Long.class);
    public static final FieldExpression<Boolean> destroyed = dsExportPattern.fieldOf("destroyed", Boolean.class);
    public static final FieldExpression<Boolean> isFromView = dsExportPattern.fieldOf("isFromView", Boolean.class);
    public static final FieldExpression<String> projectKey = dsExportPattern.fieldOf("projectKey", String.class);


    public QDsExportPattern() {
        super("DsExportPattern", DsExportPattern.class);
    }

    QDsExportPattern(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "DsExportPattern", DsExportPattern.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return exportPatternId;
    }
}
