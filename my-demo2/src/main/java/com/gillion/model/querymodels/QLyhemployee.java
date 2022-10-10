package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.Lyhemployee;

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
public class QLyhemployee extends BaseModelExpression<Lyhemployee, Long> {

    public static final BaseModelExpression<Lyhemployee, Long> lyhemployee = new QLyhemployee();
    public static final FieldExpression<Long> id = lyhemployee.fieldOf("id", Long.class);
    public static final FieldExpression<String> name = lyhemployee.fieldOf("name", String.class);
    public static final FieldExpression<Byte> gender = lyhemployee.fieldOf("gender", Byte.class);
    public static final FieldExpression<String> password = lyhemployee.fieldOf("password", String.class);
    public static final FieldExpression<String> mobile = lyhemployee.fieldOf("mobile", String.class);
    public static final FieldExpression<String> telephone = lyhemployee.fieldOf("telephone", String.class);
    public static final FieldExpression<String> email = lyhemployee.fieldOf("email", String.class);
    public static final FieldExpression<Integer> age = lyhemployee.fieldOf("age", Integer.class);
    public static final FieldExpression<Integer> version = lyhemployee.fieldOf("version", Integer.class);
    public static final FieldExpression<String> updateId = lyhemployee.fieldOf("updateId", String.class);
    public static final FieldExpression<Date> updateTime = lyhemployee.fieldOf("updateTime", Date.class);
    public static final FieldExpression<String> departmentId = lyhemployee.fieldOf("departmentId", String.class);


    public QLyhemployee() {
        super("Lyhemployee", Lyhemployee.class);
    }

    QLyhemployee(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "Lyhemployee", Lyhemployee.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
