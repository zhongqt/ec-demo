package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.DsExportPatternField;

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
public class QDsExportPatternField extends BaseModelExpression<DsExportPatternField, Long> {

    public static final BaseModelExpression<DsExportPatternField, Long> dsExportPatternField = new QDsExportPatternField();
    public static final FieldExpression<Long> exportPatternFieldId = dsExportPatternField.fieldOf("exportPatternFieldId", Long.class);
    public static final FieldExpression<Long> exportPatternId = dsExportPatternField.fieldOf("exportPatternId", Long.class);
    public static final FieldExpression<String> header = dsExportPatternField.fieldOf("header", String.class);
    public static final FieldExpression<String> fieldName = dsExportPatternField.fieldOf("fieldName", String.class);
    public static final FieldExpression<String> dictName = dsExportPatternField.fieldOf("dictName", String.class);
    public static final FieldExpression<String> formatPattern = dsExportPatternField.fieldOf("formatPattern", String.class);
    public static final FieldExpression<String> creator = dsExportPatternField.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = dsExportPatternField.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = dsExportPatternField.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = dsExportPatternField.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Integer> version = dsExportPatternField.fieldOf("version", Integer.class);
    public static final FieldExpression<Boolean> destroyed = dsExportPatternField.fieldOf("destroyed", Boolean.class);
    public static final FieldExpression<String> colFunctions = dsExportPatternField.fieldOf("colFunctions", String.class);
    public static final FieldExpression<Boolean> doNotExport = dsExportPatternField.fieldOf("doNotExport", Boolean.class);


    public QDsExportPatternField() {
        super("DsExportPatternField", DsExportPatternField.class);
    }

    QDsExportPatternField(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "DsExportPatternField", DsExportPatternField.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return exportPatternFieldId;
    }
}
