package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.DsImportPatternField;

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
public class QDsImportPatternField extends BaseModelExpression<DsImportPatternField, Long> {

    public static final BaseModelExpression<DsImportPatternField, Long> dsImportPatternField = new QDsImportPatternField();
    public static final FieldExpression<Long> importPatternFieldId = dsImportPatternField.fieldOf("importPatternFieldId", Long.class);
    public static final FieldExpression<Long> importPatternId = dsImportPatternField.fieldOf("importPatternId", Long.class);
    public static final FieldExpression<String> header = dsImportPatternField.fieldOf("header", String.class);
    public static final FieldExpression<String> fieldName = dsImportPatternField.fieldOf("fieldName", String.class);
    public static final FieldExpression<String> dictName = dsImportPatternField.fieldOf("dictName", String.class);
    public static final FieldExpression<String> parsePattern = dsImportPatternField.fieldOf("parsePattern", String.class);
    public static final FieldExpression<String> convertFromFieldName = dsImportPatternField.fieldOf("convertFromFieldName", String.class);
    public static final FieldExpression<String> creator = dsImportPatternField.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = dsImportPatternField.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = dsImportPatternField.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = dsImportPatternField.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Integer> version = dsImportPatternField.fieldOf("version", Integer.class);
    public static final FieldExpression<Boolean> destroyed = dsImportPatternField.fieldOf("destroyed", Boolean.class);


    public QDsImportPatternField() {
        super("DsImportPatternField", DsImportPatternField.class);
    }

    QDsImportPatternField(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "DsImportPatternField", DsImportPatternField.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return importPatternFieldId;
    }
}
