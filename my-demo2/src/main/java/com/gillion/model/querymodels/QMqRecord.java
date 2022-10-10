package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MqRecord;

import java.lang.Byte;
import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QMqRecord extends BaseModelExpression<MqRecord, Long> {

    public static final BaseModelExpression<MqRecord, Long> mqRecord = new QMqRecord();
    public static final FieldExpression<Long> id = mqRecord.fieldOf("id", Long.class);
    public static final FieldExpression<String> payload = mqRecord.fieldOf("payload", String.class);
    public static final FieldExpression<String> shardingId = mqRecord.fieldOf("shardingId", String.class);
    public static final FieldExpression<String> transactionId = mqRecord.fieldOf("transactionId", String.class);
    public static final FieldExpression<Byte> status = mqRecord.fieldOf("status", Byte.class);
    public static final FieldExpression<Date> createrDate = mqRecord.fieldOf("createrDate", Date.class);
    public static final FieldExpression<Integer> retries = mqRecord.fieldOf("retries", Integer.class);
    public static final FieldExpression<String> errMsg = mqRecord.fieldOf("errMsg", String.class);


    public QMqRecord() {
        super("MqRecord", MqRecord.class);
    }

    QMqRecord(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MqRecord", MqRecord.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
