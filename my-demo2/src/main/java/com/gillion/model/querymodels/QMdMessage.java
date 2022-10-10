package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MdMessage;

import com.fasterxml.jackson.databind.JsonNode;
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
public class QMdMessage extends BaseModelExpression<MdMessage, Long> {

    public static final BaseModelExpression<MdMessage, Long> mdMessage = new QMdMessage();
    public static final FieldExpression<Long> mdMessageId = mdMessage.fieldOf("mdMessageId", Long.class);
    public static final FieldExpression<String> messageType = mdMessage.fieldOf("messageType", String.class);
    public static final FieldExpression<String> messageTitle = mdMessage.fieldOf("messageTitle", String.class);
    public static final FieldExpression<String> messageContent = mdMessage.fieldOf("messageContent", String.class);
    public static final FieldExpression<JsonNode> messageFormatContent = mdMessage.fieldOf("messageFormatContent", JsonNode.class);
    public static final FieldExpression<Integer> messageLevel = mdMessage.fieldOf("messageLevel", Integer.class);
    public static final FieldExpression<Boolean> isDeleted = mdMessage.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = mdMessage.fieldOf("creatorId", Long.class);
    public static final FieldExpression<Date> createTime = mdMessage.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> creatorName = mdMessage.fieldOf("creatorName", String.class);
    public static final FieldExpression<Long> createCompanyId = mdMessage.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = mdMessage.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = mdMessage.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = mdMessage.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = mdMessage.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = mdMessage.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = mdMessage.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = mdMessage.fieldOf("recordVersion", Integer.class);


    public QMdMessage() {
        super("MdMessage", MdMessage.class);
    }

    QMdMessage(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MdMessage", MdMessage.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return mdMessageId;
    }
}
