package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.TestEmployee;

import java.lang.Boolean;
import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QTestEmployee extends BaseModelExpression<TestEmployee, Long> {

    public static final BaseModelExpression<TestEmployee, Long> testEmployee = new QTestEmployee();
    public static final FieldExpression<Long> id = testEmployee.fieldOf("id", Long.class);
    public static final FieldExpression<String> username = testEmployee.fieldOf("username", String.class);
    public static final FieldExpression<String> password = testEmployee.fieldOf("password", String.class);
    public static final FieldExpression<Integer> age = testEmployee.fieldOf("age", Integer.class);
    public static final FieldExpression<Boolean> sex = testEmployee.fieldOf("sex", Boolean.class);
    public static final FieldExpression<String> mobile = testEmployee.fieldOf("mobile", String.class);
    public static final FieldExpression<Long> deptId = testEmployee.fieldOf("deptId", Long.class);
    public static final FieldExpression<Long> creatorId = testEmployee.fieldOf("creatorId", Long.class);
    public static final FieldExpression<Date> createDatetime = testEmployee.fieldOf("createDatetime", Date.class);
    public static final FieldExpression<Long> modifierId = testEmployee.fieldOf("modifierId", Long.class);
    public static final FieldExpression<Date> createDate = testEmployee.fieldOf("createDate", Date.class);
    public static final FieldExpression<String> principalGroupCode = testEmployee.fieldOf("principalGroupCode", String.class);
    public static final FieldExpression<Date> birthDay = testEmployee.fieldOf("birthDay", Date.class);


    public QTestEmployee() {
        super("TestEmployee", TestEmployee.class);
    }

    QTestEmployee(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "TestEmployee", TestEmployee.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
