package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.GoManifestCargo;

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
public class QGoManifestCargo extends BaseModelExpression<GoManifestCargo, Long> {

    public static final BaseModelExpression<GoManifestCargo, Long> goManifestCargo = new QGoManifestCargo();
    public static final FieldExpression<Long> goManifestCargoId = goManifestCargo.fieldOf("goManifestCargoId", Long.class);
    public static final FieldExpression<Long> goManifestOrderId = goManifestCargo.fieldOf("goManifestOrderId", Long.class);
    public static final FieldExpression<String> containerNumber = goManifestCargo.fieldOf("containerNumber", String.class);
    public static final FieldExpression<String> containerSize = goManifestCargo.fieldOf("containerSize", String.class);
    public static final FieldExpression<String> waybillNo = goManifestCargo.fieldOf("waybillNo", String.class);
    public static final FieldExpression<String> trainNumber = goManifestCargo.fieldOf("trainNumber", String.class);
    public static final FieldExpression<String> cargoName = goManifestCargo.fieldOf("cargoName", String.class);
    public static final FieldExpression<String> cargoNameEn = goManifestCargo.fieldOf("cargoNameEn", String.class);
    public static final FieldExpression<BigDecimal> volume = goManifestCargo.fieldOf("volume", BigDecimal.class);
    public static final FieldExpression<String> unitOfVolume = goManifestCargo.fieldOf("unitOfVolume", String.class);
    public static final FieldExpression<BigDecimal> weight = goManifestCargo.fieldOf("weight", BigDecimal.class);
    public static final FieldExpression<String> unitOfWeight = goManifestCargo.fieldOf("unitOfWeight", String.class);
    public static final FieldExpression<String> packageType = goManifestCargo.fieldOf("packageType", String.class);
    public static final FieldExpression<BigDecimal> cargoPackage = goManifestCargo.fieldOf("cargoPackage", BigDecimal.class);
    public static final FieldExpression<String> serviceRequirementCode = goManifestCargo.fieldOf("serviceRequirementCode", String.class);
    public static final FieldExpression<String> unitTemperature = goManifestCargo.fieldOf("unitTemperature", String.class);
    public static final FieldExpression<BigDecimal> setTemperature = goManifestCargo.fieldOf("setTemperature", BigDecimal.class);
    public static final FieldExpression<BigDecimal> maxTemperature = goManifestCargo.fieldOf("maxTemperature", BigDecimal.class);
    public static final FieldExpression<BigDecimal> minTemperature = goManifestCargo.fieldOf("minTemperature", BigDecimal.class);
    public static final FieldExpression<BigDecimal> setHumidity = goManifestCargo.fieldOf("setHumidity", BigDecimal.class);
    public static final FieldExpression<String> ventUnit = goManifestCargo.fieldOf("ventUnit", String.class);
    public static final FieldExpression<Integer> ventSetting = goManifestCargo.fieldOf("ventSetting", Integer.class);
    public static final FieldExpression<String> remark = goManifestCargo.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isDeleted = goManifestCargo.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = goManifestCargo.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = goManifestCargo.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = goManifestCargo.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = goManifestCargo.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = goManifestCargo.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = goManifestCargo.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = goManifestCargo.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = goManifestCargo.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = goManifestCargo.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = goManifestCargo.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = goManifestCargo.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<String> coolingMethod = goManifestCargo.fieldOf("coolingMethod", String.class);
    public static final FieldExpression<String> cargoType = goManifestCargo.fieldOf("cargoType", String.class);
    public static final FieldExpression<String> cargoTypeName = goManifestCargo.fieldOf("cargoTypeName", String.class);
    public static final FieldExpression<String> hazardCode = goManifestCargo.fieldOf("hazardCode", String.class);
    public static final FieldExpression<String> hazardName = goManifestCargo.fieldOf("hazardName", String.class);
    public static final FieldExpression<String> undgNumber = goManifestCargo.fieldOf("undgNumber", String.class);
    public static final FieldExpression<String> undgName = goManifestCargo.fieldOf("undgName", String.class);
    public static final FieldExpression<Byte> dangerFlashPoint = goManifestCargo.fieldOf("dangerFlashPoint", Byte.class);


    public QGoManifestCargo() {
        super("GoManifestCargo", GoManifestCargo.class);
    }

    QGoManifestCargo(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "GoManifestCargo", GoManifestCargo.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return goManifestCargoId;
    }
}
