package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.EmployeeZc;

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
public class QEmployeeZc extends BaseModelExpression<EmployeeZc, Long> {

    public static final BaseModelExpression<EmployeeZc, Long> employeeZc = new QEmployeeZc();
    public static final FieldExpression<Long> id = employeeZc.fieldOf("id", Long.class);
    public static final FieldExpression<String> name = employeeZc.fieldOf("name", String.class);
    public static final FieldExpression<Byte> gender = employeeZc.fieldOf("gender", Byte.class);
    public static final FieldExpression<String> password = employeeZc.fieldOf("password", String.class);
    public static final FieldExpression<String> mobile = employeeZc.fieldOf("mobile", String.class);
    public static final FieldExpression<String> telephone = employeeZc.fieldOf("telephone", String.class);
    public static final FieldExpression<String> email = employeeZc.fieldOf("email", String.class);
    public static final FieldExpression<Integer> age = employeeZc.fieldOf("age", Integer.class);
    public static final FieldExpression<Integer> version = employeeZc.fieldOf("version", Integer.class);
    public static final FieldExpression<String> updateId = employeeZc.fieldOf("updateId", String.class);
    public static final FieldExpression<Date> updateTime = employeeZc.fieldOf("updateTime", Date.class);
    public static final FieldExpression<String> departmentId = employeeZc.fieldOf("departmentId", String.class);


    public QEmployeeZc() {
        super("EmployeeZc", EmployeeZc.class);
    }

    QEmployeeZc(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "EmployeeZc", EmployeeZc.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
