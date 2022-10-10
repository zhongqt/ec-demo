package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.GoManifestOrder;

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
public class QGoManifestOrder extends BaseModelExpression<GoManifestOrder, Long> {

    public static final BaseModelExpression<GoManifestOrder, Long> goManifestOrder = new QGoManifestOrder();
    public static final FieldExpression<Long> goManifestOrderId = goManifestOrder.fieldOf("goManifestOrderId", Long.class);
    public static final FieldExpression<Long> goOrderId = goManifestOrder.fieldOf("goOrderId", Long.class);
    public static final FieldExpression<String> orderNo = goManifestOrder.fieldOf("orderNo", String.class);
    public static final FieldExpression<String> wabNo = goManifestOrder.fieldOf("wabNo", String.class);
    public static final FieldExpression<String> mwabNo = goManifestOrder.fieldOf("mwabNo", String.class);
    public static final FieldExpression<String> hwabNo = goManifestOrder.fieldOf("hwabNo", String.class);
    public static final FieldExpression<String> transportType = goManifestOrder.fieldOf("transportType", String.class);
    public static final FieldExpression<String> atHomeAbroadType = goManifestOrder.fieldOf("atHomeAbroadType", String.class);
    public static final FieldExpression<String> airlineCompanyName = goManifestOrder.fieldOf("airlineCompanyName", String.class);
    public static final FieldExpression<String> airlineCompanyCode = goManifestOrder.fieldOf("airlineCompanyCode", String.class);
    public static final FieldExpression<String> conveyanceName = goManifestOrder.fieldOf("conveyanceName", String.class);
    public static final FieldExpression<String> flightNo = goManifestOrder.fieldOf("flightNo", String.class);
    public static final FieldExpression<String> originCode = goManifestOrder.fieldOf("originCode", String.class);
    public static final FieldExpression<String> originName = goManifestOrder.fieldOf("originName", String.class);
    public static final FieldExpression<String> originCountryName = goManifestOrder.fieldOf("originCountryName", String.class);
    public static final FieldExpression<String> originCountryCode = goManifestOrder.fieldOf("originCountryCode", String.class);
    public static final FieldExpression<String> desName = goManifestOrder.fieldOf("desName", String.class);
    public static final FieldExpression<String> desCode = goManifestOrder.fieldOf("desCode", String.class);
    public static final FieldExpression<String> desCountryName = goManifestOrder.fieldOf("desCountryName", String.class);
    public static final FieldExpression<String> desCountryCode = goManifestOrder.fieldOf("desCountryCode", String.class);
    public static final FieldExpression<String> transitPortName = goManifestOrder.fieldOf("transitPortName", String.class);
    public static final FieldExpression<String> transitPortCode = goManifestOrder.fieldOf("transitPortCode", String.class);
    public static final FieldExpression<String> transportSpecies = goManifestOrder.fieldOf("transportSpecies", String.class);
    public static final FieldExpression<Date> startTime = goManifestOrder.fieldOf("startTime", Date.class);
    public static final FieldExpression<Date> arrivalTime = goManifestOrder.fieldOf("arrivalTime", Date.class);
    public static final FieldExpression<Date> depActTime = goManifestOrder.fieldOf("depActTime", Date.class);
    public static final FieldExpression<Date> arrActTime = goManifestOrder.fieldOf("arrActTime", Date.class);
    public static final FieldExpression<String> totalName = goManifestOrder.fieldOf("totalName", String.class);
    public static final FieldExpression<BigDecimal> totalVolume = goManifestOrder.fieldOf("totalVolume", BigDecimal.class);
    public static final FieldExpression<BigDecimal> totalWeight = goManifestOrder.fieldOf("totalWeight", BigDecimal.class);
    public static final FieldExpression<Long> creatorId = goManifestOrder.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = goManifestOrder.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = goManifestOrder.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = goManifestOrder.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = goManifestOrder.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = goManifestOrder.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = goManifestOrder.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = goManifestOrder.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = goManifestOrder.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = goManifestOrder.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = goManifestOrder.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<Long> carrierId = goManifestOrder.fieldOf("carrierId", Long.class);
    public static final FieldExpression<String> carrierName = goManifestOrder.fieldOf("carrierName", String.class);
    public static final FieldExpression<Long> traOrderId = goManifestOrder.fieldOf("traOrderId", Long.class);
    public static final FieldExpression<String> traOrderNo = goManifestOrder.fieldOf("traOrderNo", String.class);
    public static final FieldExpression<String> completionStatement = goManifestOrder.fieldOf("completionStatement", String.class);


    public QGoManifestOrder() {
        super("GoManifestOrder", GoManifestOrder.class);
    }

    QGoManifestOrder(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "GoManifestOrder", GoManifestOrder.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return goManifestOrderId;
    }
}
