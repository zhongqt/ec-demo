package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.DepartmentLisd;

import java.lang.Long;
import java.lang.String;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QDepartmentLisd extends BaseModelExpression<DepartmentLisd, Long> {

    public static final BaseModelExpression<DepartmentLisd, Long> departmentLisd = new QDepartmentLisd();
    public static final FieldExpression<Long> departmentId = departmentLisd.fieldOf("departmentId", Long.class);
    public static final FieldExpression<String> departmentName = departmentLisd.fieldOf("departmentName", String.class);
    public static final FieldExpression<String> departmentManager = departmentLisd.fieldOf("departmentManager", String.class);


    public QDepartmentLisd() {
        super("DepartmentLisd", DepartmentLisd.class);
    }

    QDepartmentLisd(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "DepartmentLisd", DepartmentLisd.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return departmentId;
    }
}
