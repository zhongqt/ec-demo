package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.Lyhdepartment;

import java.lang.Long;
import java.lang.String;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QLyhdepartment extends BaseModelExpression<Lyhdepartment, Long> {

    public static final BaseModelExpression<Lyhdepartment, Long> lyhdepartment = new QLyhdepartment();
    public static final FieldExpression<Long> departmentId = lyhdepartment.fieldOf("departmentId", Long.class);
    public static final FieldExpression<String> departmentName = lyhdepartment.fieldOf("departmentName", String.class);
    public static final FieldExpression<String> departmentManager = lyhdepartment.fieldOf("departmentManager", String.class);


    public QLyhdepartment() {
        super("Lyhdepartment", Lyhdepartment.class);
    }

    QLyhdepartment(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "Lyhdepartment", Lyhdepartment.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return departmentId;
    }
}
