package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.FoodPortDischargeInformation;

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
public class QFoodPortDischargeInformation extends BaseModelExpression<FoodPortDischargeInformation, Long> {

    public static final BaseModelExpression<FoodPortDischargeInformation, Long> foodPortDischargeInformation = new QFoodPortDischargeInformation();
    public static final FieldExpression<Long> portDischargeInformationId = foodPortDischargeInformation.fieldOf("portDischargeInformationId", Long.class);
    public static final FieldExpression<Long> portArrivalInformationId = foodPortDischargeInformation.fieldOf("portArrivalInformationId", Long.class);
    public static final FieldExpression<String> cargoCode = foodPortDischargeInformation.fieldOf("cargoCode", String.class);
    public static final FieldExpression<String> cargoName = foodPortDischargeInformation.fieldOf("cargoName", String.class);
    public static final FieldExpression<BigDecimal> cargoWeight = foodPortDischargeInformation.fieldOf("cargoWeight", BigDecimal.class);
    public static final FieldExpression<Long> creatorId = foodPortDischargeInformation.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = foodPortDischargeInformation.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = foodPortDischargeInformation.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = foodPortDischargeInformation.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = foodPortDischargeInformation.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = foodPortDischargeInformation.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = foodPortDischargeInformation.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = foodPortDischargeInformation.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = foodPortDischargeInformation.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = foodPortDischargeInformation.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = foodPortDischargeInformation.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<Boolean> isDeleted = foodPortDischargeInformation.fieldOf("isDeleted", Boolean.class);


    public QFoodPortDischargeInformation() {
        super("FoodPortDischargeInformation", FoodPortDischargeInformation.class);
    }

    QFoodPortDischargeInformation(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "FoodPortDischargeInformation", FoodPortDischargeInformation.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return portDischargeInformationId;
    }
}
