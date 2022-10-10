package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.CommonField;

import java.lang.Boolean;
import java.lang.Byte;
import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QCommonField extends BaseModelExpression<CommonField, Long> {

    public static final BaseModelExpression<CommonField, Long> commonField = new QCommonField();
    public static final FieldExpression<Long> id = commonField.fieldOf("id", Long.class);
    public static final FieldExpression<Long> projectId = commonField.fieldOf("projectId", Long.class);
    public static final FieldExpression<String> fieldName = commonField.fieldOf("fieldName", String.class);
    public static final FieldExpression<Integer> commonFieldType = commonField.fieldOf("commonFieldType", Integer.class);
    public static final FieldExpression<String> valueExpression = commonField.fieldOf("valueExpression", String.class);
    public static final FieldExpression<Byte> isUpdate = commonField.fieldOf("isUpdate", Byte.class);
    public static final FieldExpression<String> creator = commonField.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = commonField.fieldOf("createTime", Date.class);
    public static final FieldExpression<Boolean> destroyed = commonField.fieldOf("destroyed", Boolean.class);
    public static final FieldExpression<String> modifier = commonField.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = commonField.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Integer> version = commonField.fieldOf("version", Integer.class);


    public QCommonField() {
        super("CommonField", CommonField.class);
    }

    QCommonField(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "CommonField", CommonField.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
