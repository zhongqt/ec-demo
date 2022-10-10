package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.FoodPortStorageReportDetailUsed;

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
public class QFoodPortStorageReportDetailUsed extends BaseModelExpression<FoodPortStorageReportDetailUsed, Long> {

    public static final BaseModelExpression<FoodPortStorageReportDetailUsed, Long> foodPortStorageReportDetailUsed = new QFoodPortStorageReportDetailUsed();
    public static final FieldExpression<Long> portStorageReportDetailUsedId = foodPortStorageReportDetailUsed.fieldOf("portStorageReportDetailUsedId", Long.class);
    public static final FieldExpression<Long> portStorageReportDetailId = foodPortStorageReportDetailUsed.fieldOf("portStorageReportDetailId", Long.class);
    public static final FieldExpression<Long> portStorageReportMainId = foodPortStorageReportDetailUsed.fieldOf("portStorageReportMainId", Long.class);
    public static final FieldExpression<String> ownerName = foodPortStorageReportDetailUsed.fieldOf("ownerName", String.class);
    public static final FieldExpression<BigDecimal> capacity = foodPortStorageReportDetailUsed.fieldOf("capacity", BigDecimal.class);
    public static final FieldExpression<Long> creatorId = foodPortStorageReportDetailUsed.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = foodPortStorageReportDetailUsed.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = foodPortStorageReportDetailUsed.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = foodPortStorageReportDetailUsed.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = foodPortStorageReportDetailUsed.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = foodPortStorageReportDetailUsed.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = foodPortStorageReportDetailUsed.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = foodPortStorageReportDetailUsed.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = foodPortStorageReportDetailUsed.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = foodPortStorageReportDetailUsed.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = foodPortStorageReportDetailUsed.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<Boolean> isDeleted = foodPortStorageReportDetailUsed.fieldOf("isDeleted", Boolean.class);


    public QFoodPortStorageReportDetailUsed() {
        super("FoodPortStorageReportDetailUsed", FoodPortStorageReportDetailUsed.class);
    }

    QFoodPortStorageReportDetailUsed(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "FoodPortStorageReportDetailUsed", FoodPortStorageReportDetailUsed.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return portStorageReportDetailUsedId;
    }
}
