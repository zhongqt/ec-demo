package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.OrderSource;

import java.lang.Integer;
import java.lang.Long;
import java.lang.String;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QOrderSource extends BaseModelExpression<OrderSource, Long> {

    public static final BaseModelExpression<OrderSource, Long> orderSource = new QOrderSource();
    public static final FieldExpression<Long> orderSourceId = orderSource.fieldOf("orderSourceId", Long.class);
    public static final FieldExpression<String> sourceCode = orderSource.fieldOf("sourceCode", String.class);
    public static final FieldExpression<Integer> channelId = orderSource.fieldOf("channelId", Integer.class);


    public QOrderSource() {
        super("OrderSource", OrderSource.class);
    }

    QOrderSource(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "OrderSource", OrderSource.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return orderSourceId;
    }
}
