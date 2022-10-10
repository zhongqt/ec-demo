package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MqConsumerRecord;

import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QMqConsumerRecord extends BaseModelExpression<MqConsumerRecord, Long> {

    public static final BaseModelExpression<MqConsumerRecord, Long> mqConsumerRecord = new QMqConsumerRecord();
    public static final FieldExpression<Long> id = mqConsumerRecord.fieldOf("id", Long.class);
    public static final FieldExpression<String> consumerGroup = mqConsumerRecord.fieldOf("consumerGroup", String.class);
    public static final FieldExpression<String> transactionId = mqConsumerRecord.fieldOf("transactionId", String.class);
    public static final FieldExpression<String> serviceMapping = mqConsumerRecord.fieldOf("serviceMapping", String.class);
    public static final FieldExpression<Date> createTime = mqConsumerRecord.fieldOf("createTime", Date.class);


    public QMqConsumerRecord() {
        super("MqConsumerRecord", MqConsumerRecord.class);
    }

    QMqConsumerRecord(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MqConsumerRecord", MqConsumerRecord.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
