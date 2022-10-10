package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.TfTransportCapacity;

import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QTfTransportCapacity extends BaseModelExpression<TfTransportCapacity, Long> {

    public static final BaseModelExpression<TfTransportCapacity, Long> tfTransportCapacity = new QTfTransportCapacity();
    public static final FieldExpression<Long> tfTransportCapacityId = tfTransportCapacity.fieldOf("tfTransportCapacityId", Long.class);
    public static final FieldExpression<String> carrierId = tfTransportCapacity.fieldOf("carrierId", String.class);
    public static final FieldExpression<String> carrierName = tfTransportCapacity.fieldOf("carrierName", String.class);
    public static final FieldExpression<String> carrierTel = tfTransportCapacity.fieldOf("carrierTel", String.class);
    public static final FieldExpression<String> schedule = tfTransportCapacity.fieldOf("schedule", String.class);
    public static final FieldExpression<String> originCountryCode = tfTransportCapacity.fieldOf("originCountryCode", String.class);
    public static final FieldExpression<String> originCountryName = tfTransportCapacity.fieldOf("originCountryName", String.class);
    public static final FieldExpression<String> originAddress = tfTransportCapacity.fieldOf("originAddress", String.class);
    public static final FieldExpression<String> desCountryCode = tfTransportCapacity.fieldOf("desCountryCode", String.class);
    public static final FieldExpression<String> desCountryName = tfTransportCapacity.fieldOf("desCountryName", String.class);
    public static final FieldExpression<String> desAddress = tfTransportCapacity.fieldOf("desAddress", String.class);
    public static final FieldExpression<String> deliveryTime = tfTransportCapacity.fieldOf("deliveryTime", String.class);
    public static final FieldExpression<Date> etd = tfTransportCapacity.fieldOf("etd", Date.class);
    public static final FieldExpression<Date> eta = tfTransportCapacity.fieldOf("eta", Date.class);
    public static final FieldExpression<String> line = tfTransportCapacity.fieldOf("line", String.class);
    public static final FieldExpression<Integer> numberOfVehicles = tfTransportCapacity.fieldOf("numberOfVehicles", Integer.class);
    public static final FieldExpression<Long> creatorId = tfTransportCapacity.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = tfTransportCapacity.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = tfTransportCapacity.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = tfTransportCapacity.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = tfTransportCapacity.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = tfTransportCapacity.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = tfTransportCapacity.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = tfTransportCapacity.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = tfTransportCapacity.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = tfTransportCapacity.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = tfTransportCapacity.fieldOf("recordVersion", Integer.class);


    public QTfTransportCapacity() {
        super("TfTransportCapacity", TfTransportCapacity.class);
    }

    QTfTransportCapacity(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "TfTransportCapacity", TfTransportCapacity.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return tfTransportCapacityId;
    }
}
