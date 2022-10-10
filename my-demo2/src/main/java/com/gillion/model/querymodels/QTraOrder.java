package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.TraOrder;

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
public class QTraOrder extends BaseModelExpression<TraOrder, Long> {

    public static final BaseModelExpression<TraOrder, Long> traOrder = new QTraOrder();
    public static final FieldExpression<Long> traOrderId = traOrder.fieldOf("traOrderId", Long.class);
    public static final FieldExpression<Long> goOrderId = traOrder.fieldOf("goOrderId", Long.class);
    public static final FieldExpression<String> traOrderNo = traOrder.fieldOf("traOrderNo", String.class);
    public static final FieldExpression<String> carrierId = traOrder.fieldOf("carrierId", String.class);
    public static final FieldExpression<String> carrierName = traOrder.fieldOf("carrierName", String.class);
    public static final FieldExpression<String> carrierTel = traOrder.fieldOf("carrierTel", String.class);
    public static final FieldExpression<String> transportClause = traOrder.fieldOf("transportClause", String.class);
    public static final FieldExpression<String> transportType = traOrder.fieldOf("transportType", String.class);
    public static final FieldExpression<Date> eta = traOrder.fieldOf("eta", Date.class);
    public static final FieldExpression<Date> etd = traOrder.fieldOf("etd", Date.class);
    public static final FieldExpression<Boolean> isValid = traOrder.fieldOf("isValid", Boolean.class);
    public static final FieldExpression<String> schedule = traOrder.fieldOf("schedule", String.class);
    public static final FieldExpression<String> deliveryTime = traOrder.fieldOf("deliveryTime", String.class);
    public static final FieldExpression<String> originAddress = traOrder.fieldOf("originAddress", String.class);
    public static final FieldExpression<String> desAddress = traOrder.fieldOf("desAddress", String.class);
    public static final FieldExpression<String> transitPort = traOrder.fieldOf("transitPort", String.class);
    public static final FieldExpression<String> airLine = traOrder.fieldOf("airLine", String.class);
    public static final FieldExpression<String> planningCycle = traOrder.fieldOf("planningCycle", String.class);
    public static final FieldExpression<String> airlineCompanyName = traOrder.fieldOf("airlineCompanyName", String.class);
    public static final FieldExpression<String> airlineCompanyCode = traOrder.fieldOf("airlineCompanyCode", String.class);
    public static final FieldExpression<String> flightNo = traOrder.fieldOf("flightNo", String.class);
    public static final FieldExpression<String> aircraftType = traOrder.fieldOf("aircraftType", String.class);
    public static final FieldExpression<String> tailNumber = traOrder.fieldOf("tailNumber", String.class);
    public static final FieldExpression<BigDecimal> capacityTonnage = traOrder.fieldOf("capacityTonnage", BigDecimal.class);
    public static final FieldExpression<String> originAirportName = traOrder.fieldOf("originAirportName", String.class);
    public static final FieldExpression<String> originAirportCode = traOrder.fieldOf("originAirportCode", String.class);
    public static final FieldExpression<String> originCountryName = traOrder.fieldOf("originCountryName", String.class);
    public static final FieldExpression<String> originCountryCode = traOrder.fieldOf("originCountryCode", String.class);
    public static final FieldExpression<String> desAirportName = traOrder.fieldOf("desAirportName", String.class);
    public static final FieldExpression<String> desAirportCode = traOrder.fieldOf("desAirportCode", String.class);
    public static final FieldExpression<String> desCountryName = traOrder.fieldOf("desCountryName", String.class);
    public static final FieldExpression<String> desCountryCode = traOrder.fieldOf("desCountryCode", String.class);
    public static final FieldExpression<Date> arrivalTime = traOrder.fieldOf("arrivalTime", Date.class);
    public static final FieldExpression<String> modeOfTransportation = traOrder.fieldOf("modeOfTransportation", String.class);
    public static final FieldExpression<String> placeLoadingCode = traOrder.fieldOf("placeLoadingCode", String.class);
    public static final FieldExpression<String> placeLoadingName = traOrder.fieldOf("placeLoadingName", String.class);
    public static final FieldExpression<String> placeDischargeName = traOrder.fieldOf("placeDischargeName", String.class);
    public static final FieldExpression<String> placeDischargeCode = traOrder.fieldOf("placeDischargeCode", String.class);
    public static final FieldExpression<String> trainCountryName = traOrder.fieldOf("trainCountryName", String.class);
    public static final FieldExpression<String> trainCountryCode = traOrder.fieldOf("trainCountryCode", String.class);
    public static final FieldExpression<String> routingCountryName = traOrder.fieldOf("routingCountryName", String.class);
    public static final FieldExpression<String> routingCountryCode = traOrder.fieldOf("routingCountryCode", String.class);
    public static final FieldExpression<String> conveyanceReferenceNumber = traOrder.fieldOf("conveyanceReferenceNumber", String.class);
    public static final FieldExpression<String> totalNumber = traOrder.fieldOf("totalNumber", String.class);
    public static final FieldExpression<String> containerQuantity = traOrder.fieldOf("containerQuantity", String.class);
    public static final FieldExpression<String> polCode = traOrder.fieldOf("polCode", String.class);
    public static final FieldExpression<String> polNameCn = traOrder.fieldOf("polNameCn", String.class);
    public static final FieldExpression<String> polNameEn = traOrder.fieldOf("polNameEn", String.class);
    public static final FieldExpression<String> podCode = traOrder.fieldOf("podCode", String.class);
    public static final FieldExpression<String> podNameCn = traOrder.fieldOf("podNameCn", String.class);
    public static final FieldExpression<String> podNameEn = traOrder.fieldOf("podNameEn", String.class);
    public static final FieldExpression<String> vesselCode = traOrder.fieldOf("vesselCode", String.class);
    public static final FieldExpression<String> vesselName = traOrder.fieldOf("vesselName", String.class);
    public static final FieldExpression<String> routeCode = traOrder.fieldOf("routeCode", String.class);
    public static final FieldExpression<String> voyage = traOrder.fieldOf("voyage", String.class);
    public static final FieldExpression<String> shippingCompanyCode = traOrder.fieldOf("shippingCompanyCode", String.class);
    public static final FieldExpression<String> shippingCompanyName = traOrder.fieldOf("shippingCompanyName", String.class);
    public static final FieldExpression<String> affiliationPortCode = traOrder.fieldOf("affiliationPortCode", String.class);
    public static final FieldExpression<String> affiliationPortNameCn = traOrder.fieldOf("affiliationPortNameCn", String.class);
    public static final FieldExpression<String> affiliationPortNameEn = traOrder.fieldOf("affiliationPortNameEn", String.class);
    public static final FieldExpression<String> countryCode = traOrder.fieldOf("countryCode", String.class);
    public static final FieldExpression<String> countryNameCn = traOrder.fieldOf("countryNameCn", String.class);
    public static final FieldExpression<String> countryNameEn = traOrder.fieldOf("countryNameEn", String.class);
    public static final FieldExpression<String> imo = traOrder.fieldOf("imo", String.class);
    public static final FieldExpression<String> enterpriseType = traOrder.fieldOf("enterpriseType", String.class);
    public static final FieldExpression<String> directionCode = traOrder.fieldOf("directionCode", String.class);
    public static final FieldExpression<BigDecimal> totalPrice = traOrder.fieldOf("totalPrice", BigDecimal.class);
    public static final FieldExpression<String> remark = traOrder.fieldOf("remark", String.class);
    public static final FieldExpression<Long> creatorId = traOrder.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = traOrder.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = traOrder.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = traOrder.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = traOrder.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = traOrder.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = traOrder.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = traOrder.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = traOrder.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = traOrder.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = traOrder.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<String> orderNo = traOrder.fieldOf("orderNo", String.class);
    public static final FieldExpression<String> carrierContact = traOrder.fieldOf("carrierContact", String.class);
    public static final FieldExpression<String> traOrderStatus = traOrder.fieldOf("traOrderStatus", String.class);
    public static final FieldExpression<String> tradingWay = traOrder.fieldOf("tradingWay", String.class);
    public static final FieldExpression<String> dealWay = traOrder.fieldOf("dealWay", String.class);
    public static final FieldExpression<String> originProvinceCode = traOrder.fieldOf("originProvinceCode", String.class);
    public static final FieldExpression<String> originProvinceName = traOrder.fieldOf("originProvinceName", String.class);
    public static final FieldExpression<String> originCityCode = traOrder.fieldOf("originCityCode", String.class);
    public static final FieldExpression<String> originCityName = traOrder.fieldOf("originCityName", String.class);
    public static final FieldExpression<String> desProvinceCode = traOrder.fieldOf("desProvinceCode", String.class);
    public static final FieldExpression<String> desProvinceName = traOrder.fieldOf("desProvinceName", String.class);
    public static final FieldExpression<String> desCityCode = traOrder.fieldOf("desCityCode", String.class);
    public static final FieldExpression<String> desCityName = traOrder.fieldOf("desCityName", String.class);
    public static final FieldExpression<String> ctnRemark = traOrder.fieldOf("ctnRemark", String.class);
    public static final FieldExpression<String> otherTransportation = traOrder.fieldOf("otherTransportation", String.class);
    public static final FieldExpression<String> totalName = traOrder.fieldOf("totalName", String.class);
    public static final FieldExpression<BigDecimal> totalVolume = traOrder.fieldOf("totalVolume", BigDecimal.class);
    public static final FieldExpression<BigDecimal> totalWeight = traOrder.fieldOf("totalWeight", BigDecimal.class);
    public static final FieldExpression<String> principal = traOrder.fieldOf("principal", String.class);
    public static final FieldExpression<String> requester = traOrder.fieldOf("requester", String.class);
    public static final FieldExpression<String> principalContact = traOrder.fieldOf("principalContact", String.class);
    public static final FieldExpression<Date> traOrderStatusTime = traOrder.fieldOf("traOrderStatusTime", Date.class);
    public static final FieldExpression<String> traOrderReason = traOrder.fieldOf("traOrderReason", String.class);


    public QTraOrder() {
        super("TraOrder", TraOrder.class);
    }

    QTraOrder(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "TraOrder", TraOrder.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return traOrderId;
    }
}
