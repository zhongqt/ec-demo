package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MailMqRecord;

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
public class QMailMqRecord extends BaseModelExpression<MailMqRecord, Long> {

    public static final BaseModelExpression<MailMqRecord, Long> mailMqRecord = new QMailMqRecord();
    public static final FieldExpression<Long> id = mailMqRecord.fieldOf("id", Long.class);
    public static final FieldExpression<String> payload = mailMqRecord.fieldOf("payload", String.class);
    public static final FieldExpression<String> shardingId = mailMqRecord.fieldOf("shardingId", String.class);
    public static final FieldExpression<Byte> status = mailMqRecord.fieldOf("status", Byte.class);
    public static final FieldExpression<Date> createrDate = mailMqRecord.fieldOf("createrDate", Date.class);
    public static final FieldExpression<Integer> retries = mailMqRecord.fieldOf("retries", Integer.class);
    public static final FieldExpression<String> errMsg = mailMqRecord.fieldOf("errMsg", String.class);
    public static final FieldExpression<String> transactionId = mailMqRecord.fieldOf("transactionId", String.class);


    public QMailMqRecord() {
        super("MailMqRecord", MailMqRecord.class);
    }

    QMailMqRecord(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MailMqRecord", MailMqRecord.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
