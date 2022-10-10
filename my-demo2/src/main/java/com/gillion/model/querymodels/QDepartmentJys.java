package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.DepartmentJys;

import java.lang.Long;
import java.lang.String;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QDepartmentJys extends BaseModelExpression<DepartmentJys, Long> {

    public static final BaseModelExpression<DepartmentJys, Long> departmentJys = new QDepartmentJys();
    public static final FieldExpression<Long> departmentId = departmentJys.fieldOf("departmentId", Long.class);
    public static final FieldExpression<String> departmentName = departmentJys.fieldOf("departmentName", String.class);
    public static final FieldExpression<String> departmentManager = departmentJys.fieldOf("departmentManager", String.class);


    public QDepartmentJys() {
        super("DepartmentJys", DepartmentJys.class);
    }

    QDepartmentJys(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "DepartmentJys", DepartmentJys.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return departmentId;
    }
}
