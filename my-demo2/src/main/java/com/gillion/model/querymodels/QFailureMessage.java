package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.FailureMessage;

import java.lang.Boolean;
import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QFailureMessage extends BaseModelExpression<FailureMessage, Long> {

    public static final BaseModelExpression<FailureMessage, Long> failureMessage = new QFailureMessage();
    public static final FieldExpression<Long> id = failureMessage.fieldOf("id", Long.class);
    public static final FieldExpression<String> msgId = failureMessage.fieldOf("msgId", String.class);
    public static final FieldExpression<Integer> retryTimes = failureMessage.fieldOf("retryTimes", Integer.class);
    public static final FieldExpression<String> node = failureMessage.fieldOf("node", String.class);
    public static final FieldExpression<String> topic = failureMessage.fieldOf("topic", String.class);
    public static final FieldExpression<String> tags = failureMessage.fieldOf("tags", String.class);
    public static final FieldExpression<String> groupName = failureMessage.fieldOf("groupName", String.class);
    public static final FieldExpression<String> mqName = failureMessage.fieldOf("mqName", String.class);
    public static final FieldExpression<String> exception = failureMessage.fieldOf("exception", String.class);
    public static final FieldExpression<String> message = failureMessage.fieldOf("message", String.class);
    public static final FieldExpression<String> messageKey = failureMessage.fieldOf("messageKey", String.class);
    public static final FieldExpression<Boolean> state = failureMessage.fieldOf("state", Boolean.class);
    public static final FieldExpression<Date> consumeTime = failureMessage.fieldOf("consumeTime", Date.class);
    public static final FieldExpression<Date> createTime = failureMessage.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> createUser = failureMessage.fieldOf("createUser", String.class);
    public static final FieldExpression<Date> updateTime = failureMessage.fieldOf("updateTime", Date.class);
    public static final FieldExpression<String> updateUser = failureMessage.fieldOf("updateUser", String.class);


    public QFailureMessage() {
        super("FailureMessage", FailureMessage.class);
    }

    QFailureMessage(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "FailureMessage", FailureMessage.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
