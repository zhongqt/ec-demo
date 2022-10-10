package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.EmployeeLisd;

import java.lang.Byte;
import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;

import com.gillion.model.entity.DepartmentLisd;
import com.gillion.model.querymodels.QDepartmentLisd;

/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QEmployeeLisd extends BaseModelExpression<EmployeeLisd, Long> {

    public static final BaseModelExpression<EmployeeLisd, Long> employeeLisd = new QEmployeeLisd();
    public static final FieldExpression<Long> id = employeeLisd.fieldOf("id", Long.class);
    public static final FieldExpression<String> name = employeeLisd.fieldOf("name", String.class);
    public static final FieldExpression<Byte> gender = employeeLisd.fieldOf("gender", Byte.class);
    public static final FieldExpression<String> password = employeeLisd.fieldOf("password", String.class);
    public static final FieldExpression<String> mobile = employeeLisd.fieldOf("mobile", String.class);
    public static final FieldExpression<String> telephone = employeeLisd.fieldOf("telephone", String.class);
    public static final FieldExpression<String> email = employeeLisd.fieldOf("email", String.class);
    public static final FieldExpression<Integer> age = employeeLisd.fieldOf("age", Integer.class);
    public static final FieldExpression<Integer> version = employeeLisd.fieldOf("version", Integer.class);
    public static final FieldExpression<String> updateId = employeeLisd.fieldOf("updateId", String.class);
    public static final FieldExpression<Date> updateTime = employeeLisd.fieldOf("updateTime", Date.class);
    public static final FieldExpression<String> departmentId = employeeLisd.fieldOf("departmentId", String.class);

    public static final BaseModelExpression<DepartmentLisd, Long> employeeLisdId = new QDepartmentLisd(employeeLisd, "employeeLisdId");

    public QEmployeeLisd() {
        super("EmployeeLisd", EmployeeLisd.class);
    }

    QEmployeeLisd(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "EmployeeLisd", EmployeeLisd.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
