package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.PreOrder;

import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QPreOrder extends BaseModelExpression<PreOrder, Long> {

    public static final BaseModelExpression<PreOrder, Long> preOrder = new QPreOrder();
    public static final FieldExpression<Long> preOrderId = preOrder.fieldOf("preOrderId", Long.class);
    public static final FieldExpression<String> orderCode = preOrder.fieldOf("orderCode", String.class);
    public static final FieldExpression<String> sourceCode = preOrder.fieldOf("sourceCode", String.class);
    public static final FieldExpression<String> skuCode = preOrder.fieldOf("skuCode", String.class);
    public static final FieldExpression<String> areaCode = preOrder.fieldOf("areaCode", String.class);
    public static final FieldExpression<String> customerCode = preOrder.fieldOf("customerCode", String.class);
    public static final FieldExpression<Integer> quantity = preOrder.fieldOf("quantity", Integer.class);
    public static final FieldExpression<String> address = preOrder.fieldOf("address", String.class);
    public static final FieldExpression<Date> createTime = preOrder.fieldOf("createTime", Date.class);
    public static final FieldExpression<Integer> status = preOrder.fieldOf("status", Integer.class);
    public static final FieldExpression<Integer> shardedNumber = preOrder.fieldOf("shardedNumber", Integer.class);

    public QPreOrder() {
        super("PreOrder", PreOrder.class);
    }

    QPreOrder(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "PreOrder", PreOrder.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return preOrderId;
    }
}
