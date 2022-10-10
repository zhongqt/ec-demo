package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.FoodPortArrivalInformation;

import java.lang.Boolean;
import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QFoodPortArrivalInformation extends BaseModelExpression<FoodPortArrivalInformation, Long> {

    public static final BaseModelExpression<FoodPortArrivalInformation, Long> foodPortArrivalInformation = new QFoodPortArrivalInformation();
    public static final FieldExpression<Long> portArrivalInformationId = foodPortArrivalInformation.fieldOf("portArrivalInformationId", Long.class);
    public static final FieldExpression<Long> foodTransportOrderId = foodPortArrivalInformation.fieldOf("foodTransportOrderId", Long.class);
    public static final FieldExpression<String> portCode = foodPortArrivalInformation.fieldOf("portCode", String.class);
    public static final FieldExpression<String> portName = foodPortArrivalInformation.fieldOf("portName", String.class);
    public static final FieldExpression<Date> expectedAnchorDate = foodPortArrivalInformation.fieldOf("expectedAnchorDate", Date.class);
    public static final FieldExpression<Date> expectedBerthingDate = foodPortArrivalInformation.fieldOf("expectedBerthingDate", Date.class);
    public static final FieldExpression<Date> expectedBerthDate = foodPortArrivalInformation.fieldOf("expectedBerthDate", Date.class);
    public static final FieldExpression<Date> expectedCunstomsDate = foodPortArrivalInformation.fieldOf("expectedCunstomsDate", Date.class);
    public static final FieldExpression<String> portArrivalStatus = foodPortArrivalInformation.fieldOf("portArrivalStatus", String.class);
    public static final FieldExpression<Date> actualAnchorDate = foodPortArrivalInformation.fieldOf("actualAnchorDate", Date.class);
    public static final FieldExpression<Date> actualBerthingDate = foodPortArrivalInformation.fieldOf("actualBerthingDate", Date.class);
    public static final FieldExpression<Date> anchorTransitDate = foodPortArrivalInformation.fieldOf("anchorTransitDate", Date.class);
    public static final FieldExpression<Date> actualBerthDate = foodPortArrivalInformation.fieldOf("actualBerthDate", Date.class);
    public static final FieldExpression<Date> actualCunstomsDate = foodPortArrivalInformation.fieldOf("actualCunstomsDate", Date.class);
    public static final FieldExpression<Date> anchorageActuallyWaitsDate = foodPortArrivalInformation.fieldOf("anchorageActuallyWaitsDate", Date.class);
    public static final FieldExpression<Date> anchorageAlsoWaitsDate = foodPortArrivalInformation.fieldOf("anchorageAlsoWaitsDate", Date.class);
    public static final FieldExpression<Date> actualWorkingDate = foodPortArrivalInformation.fieldOf("actualWorkingDate", Date.class);
    public static final FieldExpression<Date> alsoWorkingDate = foodPortArrivalInformation.fieldOf("alsoWorkingDate", Date.class);
    public static final FieldExpression<Long> creatorId = foodPortArrivalInformation.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = foodPortArrivalInformation.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = foodPortArrivalInformation.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = foodPortArrivalInformation.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = foodPortArrivalInformation.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = foodPortArrivalInformation.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = foodPortArrivalInformation.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = foodPortArrivalInformation.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = foodPortArrivalInformation.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = foodPortArrivalInformation.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = foodPortArrivalInformation.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<Boolean> isDeleted = foodPortArrivalInformation.fieldOf("isDeleted", Boolean.class);


    public QFoodPortArrivalInformation() {
        super("FoodPortArrivalInformation", FoodPortArrivalInformation.class);
    }

    QFoodPortArrivalInformation(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "FoodPortArrivalInformation", FoodPortArrivalInformation.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return portArrivalInformationId;
    }
}
