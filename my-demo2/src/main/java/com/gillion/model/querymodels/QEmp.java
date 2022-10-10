package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.Emp;

import java.lang.Byte;
import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;

import com.gillion.model.entity.Department;
import com.gillion.model.querymodels.QDepartment;

/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QEmp extends BaseModelExpression<Emp, Long> {

    public static final BaseModelExpression<Emp, Long> emp = new QEmp();
    public static final FieldExpression<Long> id = emp.fieldOf("id", Long.class);
    public static final FieldExpression<String> name = emp.fieldOf("name", String.class);
    public static final FieldExpression<Byte> gender = emp.fieldOf("gender", Byte.class);
    public static final FieldExpression<String> password = emp.fieldOf("password", String.class);
    public static final FieldExpression<String> mobile = emp.fieldOf("mobile", String.class);
    public static final FieldExpression<String> telephone = emp.fieldOf("telephone", String.class);
    public static final FieldExpression<String> email = emp.fieldOf("email", String.class);
    public static final FieldExpression<Integer> age = emp.fieldOf("age", Integer.class);
    public static final FieldExpression<Integer> version = emp.fieldOf("version", Integer.class);
    public static final FieldExpression<String> updateId = emp.fieldOf("updateId", String.class);
    public static final FieldExpression<Date> updateTime = emp.fieldOf("updateTime", Date.class);
    public static final FieldExpression<String> departmentId = emp.fieldOf("departmentId", String.class);

    public static final BaseModelExpression<Department, Long> department = new QDepartment(emp, "department");

    public QEmp() {
        super("Emp", Emp.class);
    }

    QEmp(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "Emp", Emp.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
