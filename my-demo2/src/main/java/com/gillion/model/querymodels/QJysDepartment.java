package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.JysDepartment;

import java.lang.Long;
import java.lang.String;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QJysDepartment extends BaseModelExpression<JysDepartment, Long> {

    public static final BaseModelExpression<JysDepartment, Long> jysDepartment = new QJysDepartment();
    public static final FieldExpression<Long> departmentId = jysDepartment.fieldOf("departmentId", Long.class);
    public static final FieldExpression<String> departmentName = jysDepartment.fieldOf("departmentName", String.class);
    public static final FieldExpression<String> departmentManager = jysDepartment.fieldOf("departmentManager", String.class);


    public QJysDepartment() {
        super("JysDepartment", JysDepartment.class);
    }

    QJysDepartment(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "JysDepartment", JysDepartment.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return departmentId;
    }
}
