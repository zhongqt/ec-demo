package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.AfTransportCapacity;

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
public class QAfTransportCapacity extends BaseModelExpression<AfTransportCapacity, Long> {

    public static final BaseModelExpression<AfTransportCapacity, Long> afTransportCapacity = new QAfTransportCapacity();
    public static final FieldExpression<Long> afTransportCapacityId = afTransportCapacity.fieldOf("afTransportCapacityId", Long.class);
    public static final FieldExpression<String> carrierId = afTransportCapacity.fieldOf("carrierId", String.class);
    public static final FieldExpression<String> carrierName = afTransportCapacity.fieldOf("carrierName", String.class);
    public static final FieldExpression<String> carrierTel = afTransportCapacity.fieldOf("carrierTel", String.class);
    public static final FieldExpression<String> originCountryCode = afTransportCapacity.fieldOf("originCountryCode", String.class);
    public static final FieldExpression<String> originCountryName = afTransportCapacity.fieldOf("originCountryName", String.class);
    public static final FieldExpression<String> originAirportCode = afTransportCapacity.fieldOf("originAirportCode", String.class);
    public static final FieldExpression<String> originAirportName = afTransportCapacity.fieldOf("originAirportName", String.class);
    public static final FieldExpression<String> desCountryCode = afTransportCapacity.fieldOf("desCountryCode", String.class);
    public static final FieldExpression<String> desCountryName = afTransportCapacity.fieldOf("desCountryName", String.class);
    public static final FieldExpression<String> desAirportCode = afTransportCapacity.fieldOf("desAirportCode", String.class);
    public static final FieldExpression<String> desAirportName = afTransportCapacity.fieldOf("desAirportName", String.class);
    public static final FieldExpression<Date> eta = afTransportCapacity.fieldOf("eta", Date.class);
    public static final FieldExpression<Date> etd = afTransportCapacity.fieldOf("etd", Date.class);
    public static final FieldExpression<Date> planEta = afTransportCapacity.fieldOf("planEta", Date.class);
    public static final FieldExpression<Date> planEtd = afTransportCapacity.fieldOf("planEtd", Date.class);
    public static final FieldExpression<Date> realityEta = afTransportCapacity.fieldOf("realityEta", Date.class);
    public static final FieldExpression<Date> realityEtd = afTransportCapacity.fieldOf("realityEtd", Date.class);
    public static final FieldExpression<String> deliveryTime = afTransportCapacity.fieldOf("deliveryTime", String.class);
    public static final FieldExpression<String> aircraftType = afTransportCapacity.fieldOf("aircraftType", String.class);
    public static final FieldExpression<String> flightNo = afTransportCapacity.fieldOf("flightNo", String.class);
    public static final FieldExpression<String> schedule = afTransportCapacity.fieldOf("schedule", String.class);
    public static final FieldExpression<String> airLine = afTransportCapacity.fieldOf("airLine", String.class);
    public static final FieldExpression<String> airlineCompanyName = afTransportCapacity.fieldOf("airlineCompanyName", String.class);
    public static final FieldExpression<String> airlineCompanyCode = afTransportCapacity.fieldOf("airlineCompanyCode", String.class);
    public static final FieldExpression<String> tailNumber = afTransportCapacity.fieldOf("tailNumber", String.class);
    public static final FieldExpression<BigDecimal> capacityVolume = afTransportCapacity.fieldOf("capacityVolume", BigDecimal.class);
    public static final FieldExpression<BigDecimal> capacityTonnage = afTransportCapacity.fieldOf("capacityTonnage", BigDecimal.class);
    public static final FieldExpression<Long> creatorId = afTransportCapacity.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = afTransportCapacity.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = afTransportCapacity.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = afTransportCapacity.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = afTransportCapacity.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = afTransportCapacity.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = afTransportCapacity.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = afTransportCapacity.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = afTransportCapacity.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = afTransportCapacity.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = afTransportCapacity.fieldOf("recordVersion", Integer.class);


    public QAfTransportCapacity() {
        super("AfTransportCapacity", AfTransportCapacity.class);
    }

    QAfTransportCapacity(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "AfTransportCapacity", AfTransportCapacity.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return afTransportCapacityId;
    }
}
