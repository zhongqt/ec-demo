package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.DepartmentWjj;

import java.lang.Long;
import java.lang.String;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QDepartmentWjj extends BaseModelExpression<DepartmentWjj, Long> {

    public static final BaseModelExpression<DepartmentWjj, Long> departmentWjj = new QDepartmentWjj();
    public static final FieldExpression<Long> departmentId = departmentWjj.fieldOf("departmentId", Long.class);
    public static final FieldExpression<String> departmentName = departmentWjj.fieldOf("departmentName", String.class);
    public static final FieldExpression<String> departmentManager = departmentWjj.fieldOf("departmentManager", String.class);


    public QDepartmentWjj() {
        super("DepartmentWjj", DepartmentWjj.class);
    }

    QDepartmentWjj(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "DepartmentWjj", DepartmentWjj.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return departmentId;
    }
}
