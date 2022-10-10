package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.Stock;

import java.lang.Integer;
import java.lang.Long;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QStock extends BaseModelExpression<Stock, Long> {

    public static final BaseModelExpression<Stock, Long> stock = new QStock();
    public static final FieldExpression<Long> stockId = stock.fieldOf("stockId", Long.class);
    public static final FieldExpression<Long> customerId = stock.fieldOf("customerId", Long.class);
    public static final FieldExpression<Long> skuId = stock.fieldOf("skuId", Long.class);
    public static final FieldExpression<Integer> stockCount = stock.fieldOf("stockCount", Integer.class);


    public QStock() {
        super("Stock", Stock.class);
    }

    QStock(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "Stock", Stock.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return stockId;
    }
}
