package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.GoCargo;

import java.lang.Boolean;
import java.lang.Byte;
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
public class QGoCargo extends BaseModelExpression<GoCargo, Long> {

    public static final BaseModelExpression<GoCargo, Long> goCargo = new QGoCargo();
    public static final FieldExpression<Long> goCargoId = goCargo.fieldOf("goCargoId", Long.class);
    public static final FieldExpression<Long> businessId = goCargo.fieldOf("businessId", Long.class);
    public static final FieldExpression<String> businessType = goCargo.fieldOf("businessType", String.class);
    public static final FieldExpression<String> cargoName = goCargo.fieldOf("cargoName", String.class);
    public static final FieldExpression<String> cargoNameEn = goCargo.fieldOf("cargoNameEn", String.class);
    public static final FieldExpression<BigDecimal> volume = goCargo.fieldOf("volume", BigDecimal.class);
    public static final FieldExpression<String> unitOfVolume = goCargo.fieldOf("unitOfVolume", String.class);
    public static final FieldExpression<BigDecimal> weight = goCargo.fieldOf("weight", BigDecimal.class);
    public static final FieldExpression<String> unitOfWeight = goCargo.fieldOf("unitOfWeight", String.class);
    public static final FieldExpression<BigDecimal> cargoPackage = goCargo.fieldOf("cargoPackage", BigDecimal.class);
    public static final FieldExpression<Integer> containerNum = goCargo.fieldOf("containerNum", Integer.class);
    public static final FieldExpression<String> serviceRequirementCode = goCargo.fieldOf("serviceRequirementCode", String.class);
    public static final FieldExpression<String> serviceRequirement = goCargo.fieldOf("serviceRequirement", String.class);
    public static final FieldExpression<String> hazardCode = goCargo.fieldOf("hazardCode", String.class);
    public static final FieldExpression<String> hazardName = goCargo.fieldOf("hazardName", String.class);
    public static final FieldExpression<String> modeOfTrade = goCargo.fieldOf("modeOfTrade", String.class);
    public static final FieldExpression<String> undgNumber = goCargo.fieldOf("undgNumber", String.class);
    public static final FieldExpression<Boolean> isCompleteCertificated = goCargo.fieldOf("isCompleteCertificated", Boolean.class);
    public static final FieldExpression<String> remark = goCargo.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isDeleted = goCargo.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = goCargo.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = goCargo.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = goCargo.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = goCargo.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = goCargo.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = goCargo.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = goCargo.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = goCargo.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = goCargo.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = goCargo.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = goCargo.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<String> sizeLong = goCargo.fieldOf("sizeLong", String.class);
    public static final FieldExpression<String> sizeWide = goCargo.fieldOf("sizeWide", String.class);
    public static final FieldExpression<String> sizeHigh = goCargo.fieldOf("sizeHigh", String.class);
    public static final FieldExpression<String> weightLimit = goCargo.fieldOf("weightLimit", String.class);
    public static final FieldExpression<String> valueLimit = goCargo.fieldOf("valueLimit", String.class);
    public static final FieldExpression<String> packageType = goCargo.fieldOf("packageType", String.class);
    public static final FieldExpression<String> cargoQuantityUnit = goCargo.fieldOf("cargoQuantityUnit", String.class);
    public static final FieldExpression<String> startExpectedDelivery = goCargo.fieldOf("startExpectedDelivery", String.class);
    public static final FieldExpression<String> endExpectedDelivery = goCargo.fieldOf("endExpectedDelivery", String.class);
    public static final FieldExpression<String> unitTemperature = goCargo.fieldOf("unitTemperature", String.class);
    public static final FieldExpression<BigDecimal> setTemperature = goCargo.fieldOf("setTemperature", BigDecimal.class);
    public static final FieldExpression<BigDecimal> maxTemperature = goCargo.fieldOf("maxTemperature", BigDecimal.class);
    public static final FieldExpression<BigDecimal> minTemperature = goCargo.fieldOf("minTemperature", BigDecimal.class);
    public static final FieldExpression<BigDecimal> setHumidity = goCargo.fieldOf("setHumidity", BigDecimal.class);
    public static final FieldExpression<String> ventUnit = goCargo.fieldOf("ventUnit", String.class);
    public static final FieldExpression<Byte> ventSetting = goCargo.fieldOf("ventSetting", Byte.class);
    public static final FieldExpression<String> coolingMethod = goCargo.fieldOf("coolingMethod", String.class);
    public static final FieldExpression<String> cargoType = goCargo.fieldOf("cargoType", String.class);
    public static final FieldExpression<String> cargoTypeName = goCargo.fieldOf("cargoTypeName", String.class);


    public QGoCargo() {
        super("GoCargo", GoCargo.class);
    }

    QGoCargo(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "GoCargo", GoCargo.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return goCargoId;
    }
}
