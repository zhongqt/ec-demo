package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.DepartmentTest;

import java.lang.Long;
import java.lang.String;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QDepartmentTest extends BaseModelExpression<DepartmentTest, Long> {

    public static final BaseModelExpression<DepartmentTest, Long> departmentTest = new QDepartmentTest();
    public static final FieldExpression<Long> departmentId = departmentTest.fieldOf("departmentId", Long.class);
    public static final FieldExpression<String> departmentName = departmentTest.fieldOf("departmentName", String.class);
    public static final FieldExpression<String> departmentManager = departmentTest.fieldOf("departmentManager", String.class);


    public QDepartmentTest() {
        super("DepartmentTest", DepartmentTest.class);
    }

    QDepartmentTest(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "DepartmentTest", DepartmentTest.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return departmentId;
    }
}
