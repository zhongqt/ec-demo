package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.DepartmentZc;

import java.lang.Long;
import java.lang.String;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QDepartmentZc extends BaseModelExpression<DepartmentZc, Long> {

    public static final BaseModelExpression<DepartmentZc, Long> departmentZc = new QDepartmentZc();
    public static final FieldExpression<Long> departmentId = departmentZc.fieldOf("departmentId", Long.class);
    public static final FieldExpression<String> departmentName = departmentZc.fieldOf("departmentName", String.class);
    public static final FieldExpression<String> departmentManager = departmentZc.fieldOf("departmentManager", String.class);


    public QDepartmentZc() {
        super("DepartmentZc", DepartmentZc.class);
    }

    QDepartmentZc(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "DepartmentZc", DepartmentZc.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return departmentId;
    }
}
