package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.FoodTransportCargo;

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
public class QFoodTransportCargo extends BaseModelExpression<FoodTransportCargo, Long> {

    public static final BaseModelExpression<FoodTransportCargo, Long> foodTransportCargo = new QFoodTransportCargo();
    public static final FieldExpression<Long> transportCargoId = foodTransportCargo.fieldOf("transportCargoId", Long.class);
    public static final FieldExpression<Long> foodTransportOrderId = foodTransportCargo.fieldOf("foodTransportOrderId", Long.class);
    public static final FieldExpression<String> cargoSpeciesCode = foodTransportCargo.fieldOf("cargoSpeciesCode", String.class);
    public static final FieldExpression<String> cargoSpeciesName = foodTransportCargo.fieldOf("cargoSpeciesName", String.class);
    public static final FieldExpression<String> cargoCode = foodTransportCargo.fieldOf("cargoCode", String.class);
    public static final FieldExpression<String> cargoName = foodTransportCargo.fieldOf("cargoName", String.class);
    public static final FieldExpression<BigDecimal> cargoWeight = foodTransportCargo.fieldOf("cargoWeight", BigDecimal.class);
    public static final FieldExpression<Long> creatorId = foodTransportCargo.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = foodTransportCargo.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = foodTransportCargo.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = foodTransportCargo.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = foodTransportCargo.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = foodTransportCargo.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = foodTransportCargo.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = foodTransportCargo.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = foodTransportCargo.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = foodTransportCargo.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = foodTransportCargo.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<Boolean> isDeleted = foodTransportCargo.fieldOf("isDeleted", Boolean.class);


    public QFoodTransportCargo() {
        super("FoodTransportCargo", FoodTransportCargo.class);
    }

    QFoodTransportCargo(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "FoodTransportCargo", FoodTransportCargo.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return transportCargoId;
    }
}
