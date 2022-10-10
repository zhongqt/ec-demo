package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.IdempotentRecord;

import java.lang.Long;
import java.lang.String;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QIdempotentRecord extends BaseModelExpression<IdempotentRecord, Long> {

    public static final BaseModelExpression<IdempotentRecord, Long> idempotentRecord = new QIdempotentRecord();
    public static final FieldExpression<Long> id = idempotentRecord.fieldOf("id", Long.class);
    public static final FieldExpression<String> consumerGroup = idempotentRecord.fieldOf("consumerGroup", String.class);
    public static final FieldExpression<String> msgId = idempotentRecord.fieldOf("msgId", String.class);


    public QIdempotentRecord() {
        super("IdempotentRecord", IdempotentRecord.class);
    }

    QIdempotentRecord(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "IdempotentRecord", IdempotentRecord.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
