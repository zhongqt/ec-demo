package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.EmployeeCopy1;

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
public class QEmployeeCopy1 extends BaseModelExpression<EmployeeCopy1, Long> {

    public static final BaseModelExpression<EmployeeCopy1, Long> employeeCopy1 = new QEmployeeCopy1();
    public static final FieldExpression<Long> id = employeeCopy1.fieldOf("id", Long.class);
    public static final FieldExpression<String> name = employeeCopy1.fieldOf("name", String.class);
    public static final FieldExpression<Byte> gender = employeeCopy1.fieldOf("gender", Byte.class);
    public static final FieldExpression<String> password = employeeCopy1.fieldOf("password", String.class);
    public static final FieldExpression<String> mobile = employeeCopy1.fieldOf("mobile", String.class);
    public static final FieldExpression<String> telephone = employeeCopy1.fieldOf("telephone", String.class);
    public static final FieldExpression<String> email = employeeCopy1.fieldOf("email", String.class);
    public static final FieldExpression<Integer> age = employeeCopy1.fieldOf("age", Integer.class);
    public static final FieldExpression<Integer> version = employeeCopy1.fieldOf("version", Integer.class);
    public static final FieldExpression<String> updateId = employeeCopy1.fieldOf("updateId", String.class);
    public static final FieldExpression<Date> updateTime = employeeCopy1.fieldOf("updateTime", Date.class);
    public static final FieldExpression<Long> departmentId = employeeCopy1.fieldOf("departmentId", Long.class);


    public QEmployeeCopy1() {
        super("EmployeeCopy1", EmployeeCopy1.class);
    }

    QEmployeeCopy1(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "EmployeeCopy1", EmployeeCopy1.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
