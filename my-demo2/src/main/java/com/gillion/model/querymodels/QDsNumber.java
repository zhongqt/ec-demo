package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.DsNumber;

import java.lang.Boolean;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QDsNumber extends BaseModelExpression<DsNumber, Long> {

    public static final BaseModelExpression<DsNumber, Long> dsNumber = new QDsNumber();
    public static final FieldExpression<Long> id = dsNumber.fieldOf("id", Long.class);
    public static final FieldExpression<String> tag = dsNumber.fieldOf("tag", String.class);
    public static final FieldExpression<String> ruleNumberCode = dsNumber.fieldOf("ruleNumberCode", String.class);
    public static final FieldExpression<String> fieldName = dsNumber.fieldOf("fieldName", String.class);
    public static final FieldExpression<String> modelName = dsNumber.fieldOf("modelName", String.class);
    public static final FieldExpression<String> expression = dsNumber.fieldOf("expression", String.class);
    public static final FieldExpression<String> creator = dsNumber.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = dsNumber.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = dsNumber.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = dsNumber.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> version = dsNumber.fieldOf("version", Long.class);
    public static final FieldExpression<String> projectKey = dsNumber.fieldOf("projectKey", String.class);
    public static final FieldExpression<Boolean> destroyed = dsNumber.fieldOf("destroyed", Boolean.class);


    public QDsNumber() {
        super("DsNumber", DsNumber.class);
    }

    QDsNumber(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "DsNumber", DsNumber.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
