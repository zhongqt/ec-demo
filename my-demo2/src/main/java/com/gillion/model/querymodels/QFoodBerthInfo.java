package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.FoodBerthInfo;

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
public class QFoodBerthInfo extends BaseModelExpression<FoodBerthInfo, Long> {

    public static final BaseModelExpression<FoodBerthInfo, Long> foodBerthInfo = new QFoodBerthInfo();
    public static final FieldExpression<Long> berthInfoId = foodBerthInfo.fieldOf("berthInfoId", Long.class);
    public static final FieldExpression<String> berthName = foodBerthInfo.fieldOf("berthName", String.class);
    public static final FieldExpression<String> portCode = foodBerthInfo.fieldOf("portCode", String.class);
    public static final FieldExpression<String> portName = foodBerthInfo.fieldOf("portName", String.class);
    public static final FieldExpression<String> berthTonnage = foodBerthInfo.fieldOf("berthTonnage", String.class);
    public static final FieldExpression<String> berthPurpose = foodBerthInfo.fieldOf("berthPurpose", String.class);
    public static final FieldExpression<String> handlingCapacity = foodBerthInfo.fieldOf("handlingCapacity", String.class);
    public static final FieldExpression<Boolean> isGrainBerths = foodBerthInfo.fieldOf("isGrainBerths", Boolean.class);
    public static final FieldExpression<Long> creatorId = foodBerthInfo.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = foodBerthInfo.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = foodBerthInfo.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = foodBerthInfo.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = foodBerthInfo.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = foodBerthInfo.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = foodBerthInfo.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = foodBerthInfo.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = foodBerthInfo.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = foodBerthInfo.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = foodBerthInfo.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<Boolean> isDeleted = foodBerthInfo.fieldOf("isDeleted", Boolean.class);


    public QFoodBerthInfo() {
        super("FoodBerthInfo", FoodBerthInfo.class);
    }

    QFoodBerthInfo(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "FoodBerthInfo", FoodBerthInfo.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return berthInfoId;
    }
}
