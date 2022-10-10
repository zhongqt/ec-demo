package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.EmployeeWjj;

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
public class QEmployeeWjj extends BaseModelExpression<EmployeeWjj, Long> {

    public static final BaseModelExpression<EmployeeWjj, Long> employeeWjj = new QEmployeeWjj();
    public static final FieldExpression<Long> id = employeeWjj.fieldOf("id", Long.class);
    public static final FieldExpression<String> name = employeeWjj.fieldOf("name", String.class);
    public static final FieldExpression<Byte> sex = employeeWjj.fieldOf("sex", Byte.class);
    public static final FieldExpression<String> password = employeeWjj.fieldOf("password", String.class);
    public static final FieldExpression<String> mobile = employeeWjj.fieldOf("mobile", String.class);
    public static final FieldExpression<String> telephone = employeeWjj.fieldOf("telephone", String.class);
    public static final FieldExpression<String> email = employeeWjj.fieldOf("email", String.class);
    public static final FieldExpression<Integer> age = employeeWjj.fieldOf("age", Integer.class);
    public static final FieldExpression<Integer> version = employeeWjj.fieldOf("version", Integer.class);
    public static final FieldExpression<String> updateId = employeeWjj.fieldOf("updateId", String.class);
    public static final FieldExpression<Date> updateTime = employeeWjj.fieldOf("updateTime", Date.class);
    public static final FieldExpression<String> departmentId = employeeWjj.fieldOf("departmentId", String.class);


    public QEmployeeWjj() {
        super("EmployeeWjj", EmployeeWjj.class);
    }

    QEmployeeWjj(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "EmployeeWjj", EmployeeWjj.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
