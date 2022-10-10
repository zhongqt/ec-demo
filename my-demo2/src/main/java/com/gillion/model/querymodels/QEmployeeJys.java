package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.EmployeeJys;

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
public class QEmployeeJys extends BaseModelExpression<EmployeeJys, Long> {

    public static final BaseModelExpression<EmployeeJys, Long> employeeJys = new QEmployeeJys();
    public static final FieldExpression<Long> id = employeeJys.fieldOf("id", Long.class);
    public static final FieldExpression<String> name = employeeJys.fieldOf("name", String.class);
    public static final FieldExpression<Byte> gender = employeeJys.fieldOf("gender", Byte.class);
    public static final FieldExpression<String> password = employeeJys.fieldOf("password", String.class);
    public static final FieldExpression<String> mobile = employeeJys.fieldOf("mobile", String.class);
    public static final FieldExpression<String> telephone = employeeJys.fieldOf("telephone", String.class);
    public static final FieldExpression<String> email = employeeJys.fieldOf("email", String.class);
    public static final FieldExpression<Integer> age = employeeJys.fieldOf("age", Integer.class);
    public static final FieldExpression<Integer> version = employeeJys.fieldOf("version", Integer.class);
    public static final FieldExpression<String> updateId = employeeJys.fieldOf("updateId", String.class);
    public static final FieldExpression<Date> updateTime = employeeJys.fieldOf("updateTime", Date.class);
    public static final FieldExpression<String> departmentId = employeeJys.fieldOf("departmentId", String.class);


    public QEmployeeJys() {
        super("EmployeeJys", EmployeeJys.class);
    }

    QEmployeeJys(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "EmployeeJys", EmployeeJys.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
