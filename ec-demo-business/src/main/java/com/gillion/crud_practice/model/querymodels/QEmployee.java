package com.gillion.crud_practice.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.crud_practice.model.entity.Employee;

import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QEmployee extends BaseModelExpression<Employee, Long> {

    public static final BaseModelExpression<Employee, Long> employee = new QEmployee();
    public static final FieldExpression<Long> id = employee.fieldOf("id", Long.class);
    public static final FieldExpression<String> name = employee.fieldOf("name", String.class);
    public static final FieldExpression<String> cname = employee.fieldOf("cname", String.class);
    public static final FieldExpression<Byte> gender = employee.fieldOf("gender", Byte.class);
    public static final FieldExpression<String> password = employee.fieldOf("password", String.class);
    public static final FieldExpression<String> mobile = employee.fieldOf("mobile", String.class);

    public static final FieldExpression<String> email = employee.fieldOf("email", String.class);
    public static final FieldExpression<Integer> age = employee.fieldOf("age", Integer.class);
    public static final FieldExpression<Integer> version = employee.fieldOf("version", Integer.class);

    public static final FieldExpression<Date> updateTime = employee.fieldOf("updateTime", Date.class);
    public static final FieldExpression<Long> departmentId = employee.fieldOf("departmentId", Long.class);


    public QEmployee() {
        super("Employee", Employee.class);
    }

    QEmployee(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "Employee", Employee.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
