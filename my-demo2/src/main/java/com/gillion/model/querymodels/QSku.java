package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.Sku;

import java.lang.Long;
import java.lang.String;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QSku extends BaseModelExpression<Sku, Long> {

    public static final BaseModelExpression<Sku, Long> sku = new QSku();
    public static final FieldExpression<Long> skuId = sku.fieldOf("skuId", Long.class);
    public static final FieldExpression<Long> customerId = sku.fieldOf("customerId", Long.class);
    public static final FieldExpression<String> skuCode = sku.fieldOf("skuCode", String.class);


    public QSku() {
        super("Sku", Sku.class);
    }

    QSku(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "Sku", Sku.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return skuId;
    }
}
