package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MyEmployee;

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
public class QMyEmployee extends BaseModelExpression<MyEmployee, Long> {

    public static final BaseModelExpression<MyEmployee, Long> myEmployee = new QMyEmployee();
    public static final FieldExpression<Long> id = myEmployee.fieldOf("id", Long.class);
    public static final FieldExpression<String> name = myEmployee.fieldOf("name", String.class);
    public static final FieldExpression<Byte> gender = myEmployee.fieldOf("gender", Byte.class);
    public static final FieldExpression<String> password = myEmployee.fieldOf("password", String.class);
    public static final FieldExpression<String> mobile = myEmployee.fieldOf("mobile", String.class);
    public static final FieldExpression<String> telephone = myEmployee.fieldOf("telephone", String.class);
    public static final FieldExpression<String> email = myEmployee.fieldOf("email", String.class);
    public static final FieldExpression<Integer> age = myEmployee.fieldOf("age", Integer.class);
    public static final FieldExpression<Integer> version = myEmployee.fieldOf("version", Integer.class);
    public static final FieldExpression<String> updateId = myEmployee.fieldOf("updateId", String.class);
    public static final FieldExpression<Date> updateTime = myEmployee.fieldOf("updateTime", Date.class);
    public static final FieldExpression<String> departmentId = myEmployee.fieldOf("departmentId", String.class);


    public QMyEmployee() {
        super("MyEmployee", MyEmployee.class);
    }

    QMyEmployee(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MyEmployee", MyEmployee.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
