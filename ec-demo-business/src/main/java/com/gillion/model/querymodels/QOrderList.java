package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.OrderList;

import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QOrderList extends BaseModelExpression<OrderList, Long> {

    public static final BaseModelExpression<OrderList, Long> orderList = new QOrderList();
    public static final FieldExpression<Long> orderId = orderList.fieldOf("orderId", Long.class);
    public static final FieldExpression<String> orderCode = orderList.fieldOf("orderCode", String.class);
    public static final FieldExpression<Long> orderSourceId = orderList.fieldOf("orderSourceId", Long.class);
    public static final FieldExpression<Long> skuId = orderList.fieldOf("skuId", Long.class);
    public static final FieldExpression<Long> customerId = orderList.fieldOf("customerId", Long.class);
    public static final FieldExpression<String> areaCode = orderList.fieldOf("areaCode", String.class);
    public static final FieldExpression<Integer> quantity = orderList.fieldOf("quantity", Integer.class);
    public static final FieldExpression<String> address = orderList.fieldOf("address", String.class);
    public static final FieldExpression<Date> createTime = orderList.fieldOf("createTime", Date.class);
    public static final FieldExpression<Date> agingTime = orderList.fieldOf("agingTime", Date.class);
    public static final FieldExpression<Integer> status = orderList.fieldOf("status", Integer.class);


    public QOrderList() {
        super("OrderList", OrderList.class);
    }

    QOrderList(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "OrderList", OrderList.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return orderId;
    }
}
