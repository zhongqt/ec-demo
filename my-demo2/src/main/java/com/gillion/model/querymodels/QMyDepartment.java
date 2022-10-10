package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MyDepartment;

import java.lang.Long;
import java.lang.String;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QMyDepartment extends BaseModelExpression<MyDepartment, Long> {

    public static final BaseModelExpression<MyDepartment, Long> myDepartment = new QMyDepartment();
    public static final FieldExpression<Long> departmentId = myDepartment.fieldOf("departmentId", Long.class);
    public static final FieldExpression<String> departmentName = myDepartment.fieldOf("departmentName", String.class);
    public static final FieldExpression<String> departmentManager = myDepartment.fieldOf("departmentManager", String.class);


    public QMyDepartment() {
        super("MyDepartment", MyDepartment.class);
    }

    QMyDepartment(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MyDepartment", MyDepartment.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return departmentId;
    }
}
