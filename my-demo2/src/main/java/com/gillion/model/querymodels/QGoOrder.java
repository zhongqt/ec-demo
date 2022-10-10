package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.GoOrder;

import java.lang.Boolean;
import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.math.BigDecimal;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QGoOrder extends BaseModelExpression<GoOrder, Long> {

    public static final BaseModelExpression<GoOrder, Long> goOrder = new QGoOrder();
    public static final FieldExpression<Long> goOrderId = goOrder.fieldOf("goOrderId", Long.class);
    public static final FieldExpression<String> orderNo = goOrder.fieldOf("orderNo", String.class);
    public static final FieldExpression<String> documentNumber = goOrder.fieldOf("documentNumber", String.class);
    public static final FieldExpression<String> deliveryNo = goOrder.fieldOf("deliveryNo", String.class);
    public static final FieldExpression<Long> carrierId = goOrder.fieldOf("carrierId", Long.class);
    public static final FieldExpression<String> carrierName = goOrder.fieldOf("carrierName", String.class);
    public static final FieldExpression<String> atHomeAbroadType = goOrder.fieldOf("atHomeAbroadType", String.class);
    public static final FieldExpression<String> orderStatus = goOrder.fieldOf("orderStatus", String.class);
    public static final FieldExpression<Date> orderStatusTime = goOrder.fieldOf("orderStatusTime", Date.class);
    public static final FieldExpression<Date> approvedTime = goOrder.fieldOf("approvedTime", Date.class);
    public static final FieldExpression<Date> orderTime = goOrder.fieldOf("orderTime", Date.class);
    public static final FieldExpression<Boolean> isTfTransported = goOrder.fieldOf("isTfTransported", Boolean.class);
    public static final FieldExpression<Boolean> isRfTransported = goOrder.fieldOf("isRfTransported", Boolean.class);
    public static final FieldExpression<Boolean> isMfTransported = goOrder.fieldOf("isMfTransported", Boolean.class);
    public static final FieldExpression<Boolean> isAfTransported = goOrder.fieldOf("isAfTransported", Boolean.class);
    public static final FieldExpression<Boolean> isTransportPlanned = goOrder.fieldOf("isTransportPlanned", Boolean.class);
    public static final FieldExpression<Boolean> isTransactionPlanned = goOrder.fieldOf("isTransactionPlanned", Boolean.class);
    public static final FieldExpression<String> userId = goOrder.fieldOf("userId", String.class);
    public static final FieldExpression<String> cargoName = goOrder.fieldOf("cargoName", String.class);
    public static final FieldExpression<BigDecimal> totalWeight = goOrder.fieldOf("totalWeight", BigDecimal.class);
    public static final FieldExpression<BigDecimal> totalVolume = goOrder.fieldOf("totalVolume", BigDecimal.class);
    public static final FieldExpression<Boolean> isFollow = goOrder.fieldOf("isFollow", Boolean.class);
    public static final FieldExpression<Boolean> isDeleted = goOrder.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Boolean> isOpened = goOrder.fieldOf("isOpened", Boolean.class);
    public static final FieldExpression<Long> creatorId = goOrder.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = goOrder.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = goOrder.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = goOrder.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = goOrder.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = goOrder.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = goOrder.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = goOrder.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = goOrder.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = goOrder.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = goOrder.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<String> schedulingType = goOrder.fieldOf("schedulingType", String.class);
    public static final FieldExpression<String> principal = goOrder.fieldOf("principal", String.class);
    public static final FieldExpression<String> requester = goOrder.fieldOf("requester", String.class);
    public static final FieldExpression<String> principalContact = goOrder.fieldOf("principalContact", String.class);
    public static final FieldExpression<String> orderReason = goOrder.fieldOf("orderReason", String.class);
    public static final FieldExpression<String> qrcodeKey = goOrder.fieldOf("qrcodeKey", String.class);
    public static final FieldExpression<String> executionId = goOrder.fieldOf("executionId", String.class);


    public QGoOrder() {
        super("GoOrder", GoOrder.class);
    }

    QGoOrder(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "GoOrder", GoOrder.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return goOrderId;
    }
}
