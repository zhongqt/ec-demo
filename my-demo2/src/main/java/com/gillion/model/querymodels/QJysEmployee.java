package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.JysEmployee;

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
public class QJysEmployee extends BaseModelExpression<JysEmployee, Long> {

    public static final BaseModelExpression<JysEmployee, Long> jysEmployee = new QJysEmployee();
    public static final FieldExpression<Long> id = jysEmployee.fieldOf("id", Long.class);
    public static final FieldExpression<String> name = jysEmployee.fieldOf("name", String.class);
    public static final FieldExpression<Byte> gender = jysEmployee.fieldOf("gender", Byte.class);
    public static final FieldExpression<String> password = jysEmployee.fieldOf("password", String.class);
    public static final FieldExpression<String> mobile = jysEmployee.fieldOf("mobile", String.class);
    public static final FieldExpression<String> telephone = jysEmployee.fieldOf("telephone", String.class);
    public static final FieldExpression<String> email = jysEmployee.fieldOf("email", String.class);
    public static final FieldExpression<Integer> age = jysEmployee.fieldOf("age", Integer.class);
    public static final FieldExpression<Integer> version = jysEmployee.fieldOf("version", Integer.class);
    public static final FieldExpression<String> updateId = jysEmployee.fieldOf("updateId", String.class);
    public static final FieldExpression<Date> updateTime = jysEmployee.fieldOf("updateTime", Date.class);
    public static final FieldExpression<String> departmentId = jysEmployee.fieldOf("departmentId", String.class);


    public QJysEmployee() {
        super("JysEmployee", JysEmployee.class);
    }

    QJysEmployee(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "JysEmployee", JysEmployee.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
