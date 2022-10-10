package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.GoParty;

import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QGoParty extends BaseModelExpression<GoParty, Long> {

    public static final BaseModelExpression<GoParty, Long> goParty = new QGoParty();
    public static final FieldExpression<Long> goPartyId = goParty.fieldOf("goPartyId", Long.class);
    public static final FieldExpression<Long> businessId = goParty.fieldOf("businessId", Long.class);
    public static final FieldExpression<String> businessType = goParty.fieldOf("businessType", String.class);
    public static final FieldExpression<String> partyId = goParty.fieldOf("partyId", String.class);
    public static final FieldExpression<String> partyName = goParty.fieldOf("partyName", String.class);
    public static final FieldExpression<String> partyContact = goParty.fieldOf("partyContact", String.class);
    public static final FieldExpression<String> sendTel = goParty.fieldOf("sendTel", String.class);
    public static final FieldExpression<String> receiveId = goParty.fieldOf("receiveId", String.class);
    public static final FieldExpression<String> receiveName = goParty.fieldOf("receiveName", String.class);
    public static final FieldExpression<String> receiveContact = goParty.fieldOf("receiveContact", String.class);
    public static final FieldExpression<String> receiveTel = goParty.fieldOf("receiveTel", String.class);
    public static final FieldExpression<Long> creatorId = goParty.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = goParty.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = goParty.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = goParty.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = goParty.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = goParty.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = goParty.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = goParty.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = goParty.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = goParty.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = goParty.fieldOf("recordVersion", Integer.class);


    public QGoParty() {
        super("GoParty", GoParty.class);
    }

    QGoParty(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "GoParty", GoParty.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return goPartyId;
    }
}
