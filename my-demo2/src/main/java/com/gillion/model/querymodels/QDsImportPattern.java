package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.DsImportPattern;

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
public class QDsImportPattern extends BaseModelExpression<DsImportPattern, Long> {

    public static final BaseModelExpression<DsImportPattern, Long> dsImportPattern = new QDsImportPattern();
    public static final FieldExpression<Long> importPatternId = dsImportPattern.fieldOf("importPatternId", Long.class);
    public static final FieldExpression<String> tag = dsImportPattern.fieldOf("tag", String.class);
    public static final FieldExpression<Long> dataSourceId = dsImportPattern.fieldOf("dataSourceId", Long.class);
    public static final FieldExpression<String> mainModelName = dsImportPattern.fieldOf("mainModelName", String.class);
    public static final FieldExpression<String> transformerBeanName = dsImportPattern.fieldOf("transformerBeanName", String.class);
    public static final FieldExpression<Boolean> isStrictMode = dsImportPattern.fieldOf("isStrictMode", Boolean.class);
    public static final FieldExpression<Boolean> isValidateAll = dsImportPattern.fieldOf("isValidateAll", Boolean.class);
    public static final FieldExpression<String> creator = dsImportPattern.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = dsImportPattern.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = dsImportPattern.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = dsImportPattern.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Integer> version = dsImportPattern.fieldOf("version", Integer.class);
    public static final FieldExpression<Boolean> destroyed = dsImportPattern.fieldOf("destroyed", Boolean.class);
    public static final FieldExpression<Integer> startRowNo = dsImportPattern.fieldOf("startRowNo", Integer.class);
    public static final FieldExpression<Boolean> isFromView = dsImportPattern.fieldOf("isFromView", Boolean.class);
    public static final FieldExpression<String> projectKey = dsImportPattern.fieldOf("projectKey", String.class);


    public QDsImportPattern() {
        super("DsImportPattern", DsImportPattern.class);
    }

    QDsImportPattern(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "DsImportPattern", DsImportPattern.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return importPatternId;
    }
}
