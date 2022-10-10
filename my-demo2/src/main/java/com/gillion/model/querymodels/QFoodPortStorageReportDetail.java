package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.FoodPortStorageReportDetail;

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
public class QFoodPortStorageReportDetail extends BaseModelExpression<FoodPortStorageReportDetail, Long> {

    public static final BaseModelExpression<FoodPortStorageReportDetail, Long> foodPortStorageReportDetail = new QFoodPortStorageReportDetail();
    public static final FieldExpression<Long> portStorageReportDetailId = foodPortStorageReportDetail.fieldOf("portStorageReportDetailId", Long.class);
    public static final FieldExpression<Long> portStorageReportMainId = foodPortStorageReportDetail.fieldOf("portStorageReportMainId", Long.class);
    public static final FieldExpression<String> goodName = foodPortStorageReportDetail.fieldOf("goodName", String.class);
    public static final FieldExpression<BigDecimal> foreverCapacity = foodPortStorageReportDetail.fieldOf("foreverCapacity", BigDecimal.class);
    public static final FieldExpression<BigDecimal> tempCapacity = foodPortStorageReportDetail.fieldOf("tempCapacity", BigDecimal.class);
    public static final FieldExpression<BigDecimal> rentCapacity = foodPortStorageReportDetail.fieldOf("rentCapacity", BigDecimal.class);
    public static final FieldExpression<BigDecimal> totalCapacity = foodPortStorageReportDetail.fieldOf("totalCapacity", BigDecimal.class);
    public static final FieldExpression<BigDecimal> usedCapacity = foodPortStorageReportDetail.fieldOf("usedCapacity", BigDecimal.class);
    public static final FieldExpression<String> usedDetail = foodPortStorageReportDetail.fieldOf("usedDetail", String.class);
    public static final FieldExpression<Long> creatorId = foodPortStorageReportDetail.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = foodPortStorageReportDetail.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = foodPortStorageReportDetail.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = foodPortStorageReportDetail.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = foodPortStorageReportDetail.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = foodPortStorageReportDetail.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = foodPortStorageReportDetail.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = foodPortStorageReportDetail.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = foodPortStorageReportDetail.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = foodPortStorageReportDetail.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = foodPortStorageReportDetail.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<Boolean> isDeleted = foodPortStorageReportDetail.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<BigDecimal> todayIn = foodPortStorageReportDetail.fieldOf("todayIn", BigDecimal.class);
    public static final FieldExpression<BigDecimal> todayOut = foodPortStorageReportDetail.fieldOf("todayOut", BigDecimal.class);


    public QFoodPortStorageReportDetail() {
        super("FoodPortStorageReportDetail", FoodPortStorageReportDetail.class);
    }

    QFoodPortStorageReportDetail(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "FoodPortStorageReportDetail", FoodPortStorageReportDetail.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return portStorageReportDetailId;
    }
}
