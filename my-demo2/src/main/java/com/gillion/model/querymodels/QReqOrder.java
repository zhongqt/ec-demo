package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.ReqOrder;

import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QReqOrder extends BaseModelExpression<ReqOrder, Long> {

    public static final BaseModelExpression<ReqOrder, Long> reqOrder = new QReqOrder();
    public static final FieldExpression<Long> reqOrderId = reqOrder.fieldOf("reqOrderId", Long.class);
    public static final FieldExpression<Long> goOrderId = reqOrder.fieldOf("goOrderId", Long.class);
    public static final FieldExpression<String> loadAddress = reqOrder.fieldOf("loadAddress", String.class);
    public static final FieldExpression<String> originCountryCode = reqOrder.fieldOf("originCountryCode", String.class);
    public static final FieldExpression<String> originCountryName = reqOrder.fieldOf("originCountryName", String.class);
    public static final FieldExpression<String> originProvinceCode = reqOrder.fieldOf("originProvinceCode", String.class);
    public static final FieldExpression<String> originProvinceName = reqOrder.fieldOf("originProvinceName", String.class);
    public static final FieldExpression<String> originCityCode = reqOrder.fieldOf("originCityCode", String.class);
    public static final FieldExpression<String> originCityName = reqOrder.fieldOf("originCityName", String.class);
    public static final FieldExpression<String> originCountyCode = reqOrder.fieldOf("originCountyCode", String.class);
    public static final FieldExpression<String> originCountyName = reqOrder.fieldOf("originCountyName", String.class);
    public static final FieldExpression<String> originAddress = reqOrder.fieldOf("originAddress", String.class);
    public static final FieldExpression<String> desCountryCode = reqOrder.fieldOf("desCountryCode", String.class);
    public static final FieldExpression<String> desCountryName = reqOrder.fieldOf("desCountryName", String.class);
    public static final FieldExpression<String> desProvinceCode = reqOrder.fieldOf("desProvinceCode", String.class);
    public static final FieldExpression<String> desProvinceName = reqOrder.fieldOf("desProvinceName", String.class);
    public static final FieldExpression<String> desCityCode = reqOrder.fieldOf("desCityCode", String.class);
    public static final FieldExpression<String> desName = reqOrder.fieldOf("desName", String.class);
    public static final FieldExpression<String> desCountyCode = reqOrder.fieldOf("desCountyCode", String.class);
    public static final FieldExpression<String> desCountyName = reqOrder.fieldOf("desCountyName", String.class);
    public static final FieldExpression<String> desAddress = reqOrder.fieldOf("desAddress", String.class);
    public static final FieldExpression<Date> startTime = reqOrder.fieldOf("startTime", Date.class);
    public static final FieldExpression<Date> arriveTime = reqOrder.fieldOf("arriveTime", Date.class);
    public static final FieldExpression<String> transportType = reqOrder.fieldOf("transportType", String.class);
    public static final FieldExpression<String> remark = reqOrder.fieldOf("remark", String.class);
    public static final FieldExpression<Long> creatorId = reqOrder.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = reqOrder.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = reqOrder.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = reqOrder.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = reqOrder.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = reqOrder.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = reqOrder.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = reqOrder.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = reqOrder.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = reqOrder.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = reqOrder.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<String> shipmentDetails = reqOrder.fieldOf("shipmentDetails", String.class);
    public static final FieldExpression<String> arrivalDetails = reqOrder.fieldOf("arrivalDetails", String.class);
    public static final FieldExpression<String> tradingWay = reqOrder.fieldOf("tradingWay", String.class);
    public static final FieldExpression<String> dealWay = reqOrder.fieldOf("dealWay", String.class);
    public static final FieldExpression<String> importantNode = reqOrder.fieldOf("importantNode", String.class);
    public static final FieldExpression<String> beginLocation = reqOrder.fieldOf("beginLocation", String.class);
    public static final FieldExpression<Date> beginUploadTime = reqOrder.fieldOf("beginUploadTime", Date.class);
    public static final FieldExpression<String> finishLocation = reqOrder.fieldOf("finishLocation", String.class);
    public static final FieldExpression<Date> finishUploadTime = reqOrder.fieldOf("finishUploadTime", Date.class);


    public QReqOrder() {
        super("ReqOrder", ReqOrder.class);
    }

    QReqOrder(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "ReqOrder", ReqOrder.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return reqOrderId;
    }
}
