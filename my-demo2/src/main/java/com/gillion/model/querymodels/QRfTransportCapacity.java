package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.RfTransportCapacity;

import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QRfTransportCapacity extends BaseModelExpression<RfTransportCapacity, Long> {

    public static final BaseModelExpression<RfTransportCapacity, Long> rfTransportCapacity = new QRfTransportCapacity();
    public static final FieldExpression<Long> rfTransportCapacityId = rfTransportCapacity.fieldOf("rfTransportCapacityId", Long.class);
    public static final FieldExpression<String> carrierId = rfTransportCapacity.fieldOf("carrierId", String.class);
    public static final FieldExpression<String> carrierName = rfTransportCapacity.fieldOf("carrierName", String.class);
    public static final FieldExpression<String> carrierTel = rfTransportCapacity.fieldOf("carrierTel", String.class);
    public static final FieldExpression<String> originCountryCode = rfTransportCapacity.fieldOf("originCountryCode", String.class);
    public static final FieldExpression<String> originCountryName = rfTransportCapacity.fieldOf("originCountryName", String.class);
    public static final FieldExpression<String> placeLoadingCode = rfTransportCapacity.fieldOf("placeLoadingCode", String.class);
    public static final FieldExpression<String> placeLoadingName = rfTransportCapacity.fieldOf("placeLoadingName", String.class);
    public static final FieldExpression<String> desCountryCode = rfTransportCapacity.fieldOf("desCountryCode", String.class);
    public static final FieldExpression<String> desCountryName = rfTransportCapacity.fieldOf("desCountryName", String.class);
    public static final FieldExpression<String> placeDischargeCode = rfTransportCapacity.fieldOf("placeDischargeCode", String.class);
    public static final FieldExpression<String> placeDischargeName = rfTransportCapacity.fieldOf("placeDischargeName", String.class);
    public static final FieldExpression<String> deliveryTime = rfTransportCapacity.fieldOf("deliveryTime", String.class);
    public static final FieldExpression<String> transitPort = rfTransportCapacity.fieldOf("transitPort", String.class);
    public static final FieldExpression<Date> eta = rfTransportCapacity.fieldOf("eta", Date.class);
    public static final FieldExpression<Date> etd = rfTransportCapacity.fieldOf("etd", Date.class);
    public static final FieldExpression<String> blockTrain = rfTransportCapacity.fieldOf("blockTrain", String.class);
    public static final FieldExpression<String> schedule = rfTransportCapacity.fieldOf("schedule", String.class);
    public static final FieldExpression<String> trainCountryName = rfTransportCapacity.fieldOf("trainCountryName", String.class);
    public static final FieldExpression<String> routingCountryName = rfTransportCapacity.fieldOf("routingCountryName", String.class);
    public static final FieldExpression<String> conveyanceReferenceNumber = rfTransportCapacity.fieldOf("conveyanceReferenceNumber", String.class);
    public static final FieldExpression<String> totalNumber = rfTransportCapacity.fieldOf("totalNumber", String.class);
    public static final FieldExpression<String> containerQuantity = rfTransportCapacity.fieldOf("containerQuantity", String.class);
    public static final FieldExpression<Long> creatorId = rfTransportCapacity.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = rfTransportCapacity.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = rfTransportCapacity.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = rfTransportCapacity.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = rfTransportCapacity.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = rfTransportCapacity.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = rfTransportCapacity.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = rfTransportCapacity.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = rfTransportCapacity.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = rfTransportCapacity.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = rfTransportCapacity.fieldOf("recordVersion", Integer.class);


    public QRfTransportCapacity() {
        super("RfTransportCapacity", RfTransportCapacity.class);
    }

    QRfTransportCapacity(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "RfTransportCapacity", RfTransportCapacity.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return rfTransportCapacityId;
    }
}
