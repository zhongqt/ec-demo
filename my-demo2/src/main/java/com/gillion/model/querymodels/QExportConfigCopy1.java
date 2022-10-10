package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.ExportConfigCopy1;

import java.lang.Boolean;
import java.lang.Integer;
import java.lang.String;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QExportConfigCopy1 extends BaseModelExpression<ExportConfigCopy1, String> {

    public static final BaseModelExpression<ExportConfigCopy1, String> exportConfigCopy1 = new QExportConfigCopy1();
    public static final FieldExpression<String> id = exportConfigCopy1.fieldOf("id", String.class);
    public static final FieldExpression<Boolean> printMode = exportConfigCopy1.fieldOf("printMode", Boolean.class);
    public static final FieldExpression<byte[]> template = exportConfigCopy1.fieldOf("template", byte[].class);
    public static final FieldExpression<Boolean> async = exportConfigCopy1.fieldOf("async", Boolean.class);
    public static final FieldExpression<String> dictionaryUrl = exportConfigCopy1.fieldOf("dictionaryUrl", String.class);
    public static final FieldExpression<String> fileName = exportConfigCopy1.fieldOf("fileName", String.class);
    public static final FieldExpression<Integer> pageSize = exportConfigCopy1.fieldOf("pageSize", Integer.class);
    public static final FieldExpression<String> className = exportConfigCopy1.fieldOf("className", String.class);
    public static final FieldExpression<String> sourceUrl = exportConfigCopy1.fieldOf("sourceUrl", String.class);
    public static final FieldExpression<String> statisticsUrl = exportConfigCopy1.fieldOf("statisticsUrl", String.class);
    public static final FieldExpression<String> columnSetting = exportConfigCopy1.fieldOf("columnSetting", String.class);


    public QExportConfigCopy1() {
        super("ExportConfigCopy1", ExportConfigCopy1.class);
    }

    QExportConfigCopy1(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "ExportConfigCopy1", ExportConfigCopy1.class, alias);
    }

    @Override
    public OperatorExpression<String> primaryKey() {
        return id;
    }
}
