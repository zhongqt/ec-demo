package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.SysDepartment;

import java.lang.Byte;
import java.lang.Integer;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QSysDepartment extends BaseModelExpression<SysDepartment, Integer> {

    public static final BaseModelExpression<SysDepartment, Integer> sysDepartment = new QSysDepartment();
    public static final FieldExpression<Integer> departmentId = sysDepartment.fieldOf("departmentId", Integer.class);
    public static final FieldExpression<String> departmentNo = sysDepartment.fieldOf("departmentNo", String.class);
    public static final FieldExpression<String> departmentName = sysDepartment.fieldOf("departmentName", String.class);
    public static final FieldExpression<Integer> partnerId = sysDepartment.fieldOf("partnerId", Integer.class);
    public static final FieldExpression<Date> createTime = sysDepartment.fieldOf("createTime", Date.class);
    public static final FieldExpression<Integer> createrId = sysDepartment.fieldOf("createrId", Integer.class);
    public static final FieldExpression<String> contact = sysDepartment.fieldOf("contact", String.class);
    public static final FieldExpression<Integer> phone = sysDepartment.fieldOf("phone", Integer.class);
    public static final FieldExpression<Integer> fax = sysDepartment.fieldOf("fax", Integer.class);
    public static final FieldExpression<String> address = sysDepartment.fieldOf("address", String.class);
    public static final FieldExpression<Byte> status = sysDepartment.fieldOf("status", Byte.class);


    public QSysDepartment() {
        super("SysDepartment", SysDepartment.class);
    }

    QSysDepartment(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "SysDepartment", SysDepartment.class, alias);
    }

    @Override
    public OperatorExpression<Integer> primaryKey() {
        return departmentId;
    }
}
