package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MsgSubscription;

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
public class QMsgSubscription extends BaseModelExpression<MsgSubscription, Long> {

    public static final BaseModelExpression<MsgSubscription, Long> msgSubscription = new QMsgSubscription();
    public static final FieldExpression<Long> msgSubscriptionId = msgSubscription.fieldOf("msgSubscriptionId", Long.class);
    public static final FieldExpression<String> newsTypeCode = msgSubscription.fieldOf("newsTypeCode", String.class);
    public static final FieldExpression<String> newsTypeName = msgSubscription.fieldOf("newsTypeName", String.class);
    public static final FieldExpression<Boolean> newsTypeStatus = msgSubscription.fieldOf("newsTypeStatus", Boolean.class);
    public static final FieldExpression<String> notice = msgSubscription.fieldOf("notice", String.class);
    public static final FieldExpression<String> notificationMethod = msgSubscription.fieldOf("notificationMethod", String.class);
    public static final FieldExpression<Long> creatorId = msgSubscription.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = msgSubscription.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = msgSubscription.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = msgSubscription.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = msgSubscription.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = msgSubscription.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = msgSubscription.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = msgSubscription.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = msgSubscription.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = msgSubscription.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = msgSubscription.fieldOf("recordVersion", Integer.class);


    public QMsgSubscription() {
        super("MsgSubscription", MsgSubscription.class);
    }

    QMsgSubscription(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MsgSubscription", MsgSubscription.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return msgSubscriptionId;
    }
}
