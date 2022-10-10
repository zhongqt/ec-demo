package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MfTransportCapacity;

import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QMfTransportCapacity extends BaseModelExpression<MfTransportCapacity, Long> {

    public static final BaseModelExpression<MfTransportCapacity, Long> mfTransportCapacity = new QMfTransportCapacity();
    public static final FieldExpression<Long> mfTransportCapacityId = mfTransportCapacity.fieldOf("mfTransportCapacityId", Long.class);
    public static final FieldExpression<String> carrierId = mfTransportCapacity.fieldOf("carrierId", String.class);
    public static final FieldExpression<String> carrierName = mfTransportCapacity.fieldOf("carrierName", String.class);
    public static final FieldExpression<String> carrierTel = mfTransportCapacity.fieldOf("carrierTel", String.class);
    public static final FieldExpression<String> originCountryCode = mfTransportCapacity.fieldOf("originCountryCode", String.class);
    public static final FieldExpression<String> originCountryName = mfTransportCapacity.fieldOf("originCountryName", String.class);
    public static final FieldExpression<String> originProvinceCode = mfTransportCapacity.fieldOf("originProvinceCode", String.class);
    public static final FieldExpression<String> originProvinceName = mfTransportCapacity.fieldOf("originProvinceName", String.class);
    public static final FieldExpression<String> polNameCode = mfTransportCapacity.fieldOf("polNameCode", String.class);
    public static final FieldExpression<String> polNameCn = mfTransportCapacity.fieldOf("polNameCn", String.class);
    public static final FieldExpression<String> polNameEn = mfTransportCapacity.fieldOf("polNameEn", String.class);
    public static final FieldExpression<String> desCountryCode = mfTransportCapacity.fieldOf("desCountryCode", String.class);
    public static final FieldExpression<String> desCountryName = mfTransportCapacity.fieldOf("desCountryName", String.class);
    public static final FieldExpression<String> desProvinceCode = mfTransportCapacity.fieldOf("desProvinceCode", String.class);
    public static final FieldExpression<String> desProvinceName = mfTransportCapacity.fieldOf("desProvinceName", String.class);
    public static final FieldExpression<String> podNameCode = mfTransportCapacity.fieldOf("podNameCode", String.class);
    public static final FieldExpression<String> podNameCn = mfTransportCapacity.fieldOf("podNameCn", String.class);
    public static final FieldExpression<String> podNameEn = mfTransportCapacity.fieldOf("podNameEn", String.class);
    public static final FieldExpression<String> vesselName = mfTransportCapacity.fieldOf("vesselName", String.class);
    public static final FieldExpression<String> voyage = mfTransportCapacity.fieldOf("voyage", String.class);
    public static final FieldExpression<String> shippingCompanyName = mfTransportCapacity.fieldOf("shippingCompanyName", String.class);
    public static final FieldExpression<String> route = mfTransportCapacity.fieldOf("route", String.class);
    public static final FieldExpression<String> deliveryTime = mfTransportCapacity.fieldOf("deliveryTime", String.class);
    public static final FieldExpression<Date> eta = mfTransportCapacity.fieldOf("eta", Date.class);
    public static final FieldExpression<Date> etd = mfTransportCapacity.fieldOf("etd", Date.class);
    public static final FieldExpression<String> schedule = mfTransportCapacity.fieldOf("schedule", String.class);
    public static final FieldExpression<String> typesOfStoppage = mfTransportCapacity.fieldOf("typesOfStoppage", String.class);
    public static final FieldExpression<String> shippingSchedule = mfTransportCapacity.fieldOf("shippingSchedule", String.class);
    public static final FieldExpression<Date> deadlineBillOfLading = mfTransportCapacity.fieldOf("deadlineBillOfLading", Date.class);
    public static final FieldExpression<Date> entryDeadline = mfTransportCapacity.fieldOf("entryDeadline", Date.class);
    public static final FieldExpression<Date> deadlineDeclaration = mfTransportCapacity.fieldOf("deadlineDeclaration", Date.class);
    public static final FieldExpression<Date> vgmDeadline = mfTransportCapacity.fieldOf("vgmDeadline", Date.class);
    public static final FieldExpression<Long> creatorId = mfTransportCapacity.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = mfTransportCapacity.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = mfTransportCapacity.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = mfTransportCapacity.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = mfTransportCapacity.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = mfTransportCapacity.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = mfTransportCapacity.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = mfTransportCapacity.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = mfTransportCapacity.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = mfTransportCapacity.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = mfTransportCapacity.fieldOf("recordVersion", Integer.class);


    public QMfTransportCapacity() {
        super("MfTransportCapacity", MfTransportCapacity.class);
    }

    QMfTransportCapacity(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MfTransportCapacity", MfTransportCapacity.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return mfTransportCapacityId;
    }
}
