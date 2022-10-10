package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.FoodTransportUninstallCargo;

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
public class QFoodTransportUninstallCargo extends BaseModelExpression<FoodTransportUninstallCargo, Long> {

    public static final BaseModelExpression<FoodTransportUninstallCargo, Long> foodTransportUninstallCargo = new QFoodTransportUninstallCargo();
    public static final FieldExpression<Long> transportUninstallCargoId = foodTransportUninstallCargo.fieldOf("transportUninstallCargoId", Long.class);
    public static final FieldExpression<Long> foodTransportOrderId = foodTransportUninstallCargo.fieldOf("foodTransportOrderId", Long.class);
    public static final FieldExpression<String> portCode = foodTransportUninstallCargo.fieldOf("portCode", String.class);
    public static final FieldExpression<String> portName = foodTransportUninstallCargo.fieldOf("portName", String.class);
    public static final FieldExpression<String> cargoCode = foodTransportUninstallCargo.fieldOf("cargoCode", String.class);
    public static final FieldExpression<String> cargoName = foodTransportUninstallCargo.fieldOf("cargoName", String.class);
    public static final FieldExpression<BigDecimal> cargoWeight = foodTransportUninstallCargo.fieldOf("cargoWeight", BigDecimal.class);
    public static final FieldExpression<String> arrivalTime = foodTransportUninstallCargo.fieldOf("arrivalTime", String.class);
    public static final FieldExpression<Long> creatorId = foodTransportUninstallCargo.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = foodTransportUninstallCargo.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = foodTransportUninstallCargo.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = foodTransportUninstallCargo.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = foodTransportUninstallCargo.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = foodTransportUninstallCargo.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = foodTransportUninstallCargo.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = foodTransportUninstallCargo.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = foodTransportUninstallCargo.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = foodTransportUninstallCargo.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = foodTransportUninstallCargo.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<Boolean> isDeleted = foodTransportUninstallCargo.fieldOf("isDeleted", Boolean.class);


    public QFoodTransportUninstallCargo() {
        super("FoodTransportUninstallCargo", FoodTransportUninstallCargo.class);
    }

    QFoodTransportUninstallCargo(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "FoodTransportUninstallCargo", FoodTransportUninstallCargo.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return transportUninstallCargoId;
    }
}
