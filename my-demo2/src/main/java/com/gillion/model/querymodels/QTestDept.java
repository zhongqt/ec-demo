package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.TestDept;

import java.lang.Long;
import java.lang.String;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QTestDept extends BaseModelExpression<TestDept, Long> {

    public static final BaseModelExpression<TestDept, Long> testDept = new QTestDept();
    public static final FieldExpression<Long> id = testDept.fieldOf("id", Long.class);
    public static final FieldExpression<String> deptName = testDept.fieldOf("deptName", String.class);
    public static final FieldExpression<String> principalGroupCode = testDept.fieldOf("principalGroupCode", String.class);


    public QTestDept() {
        super("TestDept", TestDept.class);
    }

    QTestDept(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "TestDept", TestDept.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
