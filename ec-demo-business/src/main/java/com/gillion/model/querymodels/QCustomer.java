package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.Customer;

import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QCustomer extends BaseModelExpression<Customer, Long> {

    public static final BaseModelExpression<Customer, Long> customer = new QCustomer();
    public static final FieldExpression<Long> id = customer.fieldOf("id", Long.class);
    public static final FieldExpression<String> name = customer.fieldOf("name", String.class);
    public static final FieldExpression<String> phone = customer.fieldOf("phone", String.class);
    public static final FieldExpression<String> creator = customer.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = customer.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = customer.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = customer.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Integer> version = customer.fieldOf("version", Integer.class);
    public static final FieldExpression<Byte> destroyed = customer.fieldOf("destroyed", Byte.class);


    public QCustomer() {
        super("Customer", Customer.class);
    }

    QCustomer(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "Customer", Customer.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
