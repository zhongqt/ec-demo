package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.ConsumerGroup;

import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QConsumerGroup extends BaseModelExpression<ConsumerGroup, Long> {

    public static final BaseModelExpression<ConsumerGroup, Long> consumerGroup = new QConsumerGroup();
    public static final FieldExpression<Long> id = consumerGroup.fieldOf("id", Long.class);
    public static final FieldExpression<String> topic = consumerGroup.fieldOf("topic", String.class);
    public static final FieldExpression<String> groupName = consumerGroup.fieldOf("groupName", String.class);
    public static final FieldExpression<Integer> consumerCount = consumerGroup.fieldOf("consumerCount", Integer.class);
    public static final FieldExpression<String> consumerMode = consumerGroup.fieldOf("consumerMode", String.class);
    public static final FieldExpression<String> messageMode = consumerGroup.fieldOf("messageMode", String.class);
    public static final FieldExpression<String> settings = consumerGroup.fieldOf("settings", String.class);
    public static final FieldExpression<Date> createTime = consumerGroup.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> createUser = consumerGroup.fieldOf("createUser", String.class);
    public static final FieldExpression<Date> updateTime = consumerGroup.fieldOf("updateTime", Date.class);
    public static final FieldExpression<String> updateUser = consumerGroup.fieldOf("updateUser", String.class);


    public QConsumerGroup() {
        super("ConsumerGroup", ConsumerGroup.class);
    }

    QConsumerGroup(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "ConsumerGroup", ConsumerGroup.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
