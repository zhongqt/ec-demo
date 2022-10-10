package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.TraTransportation;

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
public class QTraTransportation extends BaseModelExpression<TraTransportation, Long> {

    public static final BaseModelExpression<TraTransportation, Long> traTransportation = new QTraTransportation();
    public static final FieldExpression<Long> traTransportationId = traTransportation.fieldOf("traTransportationId", Long.class);
    public static final FieldExpression<Long> traOrderId = traTransportation.fieldOf("traOrderId", Long.class);
    public static final FieldExpression<String> carNo = traTransportation.fieldOf("carNo", String.class);
    public static final FieldExpression<String> escort = traTransportation.fieldOf("escort", String.class);
    public static final FieldExpression<String> carLeadSeal = traTransportation.fieldOf("carLeadSeal", String.class);
    public static final FieldExpression<String> remark = traTransportation.fieldOf("remark", String.class);
    public static final FieldExpression<String> accompanyMobile = traTransportation.fieldOf("accompanyMobile", String.class);
    public static final FieldExpression<String> accompanyIdCard = traTransportation.fieldOf("accompanyIdCard", String.class);
    public static final FieldExpression<Boolean> isDeleted = traTransportation.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = traTransportation.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = traTransportation.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = traTransportation.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = traTransportation.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = traTransportation.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = traTransportation.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = traTransportation.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = traTransportation.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = traTransportation.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = traTransportation.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = traTransportation.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<String> plateNumberColor = traTransportation.fieldOf("plateNumberColor", String.class);


    public QTraTransportation() {
        super("TraTransportation", TraTransportation.class);
    }

    QTraTransportation(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "TraTransportation", TraTransportation.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return traTransportationId;
    }
}
