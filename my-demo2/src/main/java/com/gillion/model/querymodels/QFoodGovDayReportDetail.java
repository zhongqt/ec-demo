package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.FoodGovDayReportDetail;

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
public class QFoodGovDayReportDetail extends BaseModelExpression<FoodGovDayReportDetail, Long> {

    public static final BaseModelExpression<FoodGovDayReportDetail, Long> foodGovDayReportDetail = new QFoodGovDayReportDetail();
    public static final FieldExpression<Long> govDayReportDetailId = foodGovDayReportDetail.fieldOf("govDayReportDetailId", Long.class);
    public static final FieldExpression<Long> govDayReportId = foodGovDayReportDetail.fieldOf("govDayReportId", Long.class);
    public static final FieldExpression<Date> reportDate = foodGovDayReportDetail.fieldOf("reportDate", Date.class);
    public static final FieldExpression<String> portCode = foodGovDayReportDetail.fieldOf("portCode", String.class);
    public static final FieldExpression<String> portName = foodGovDayReportDetail.fieldOf("portName", String.class);
    public static final FieldExpression<String> goodName = foodGovDayReportDetail.fieldOf("goodName", String.class);
    public static final FieldExpression<Integer> delayShipCount = foodGovDayReportDetail.fieldOf("delayShipCount", Integer.class);
    public static final FieldExpression<BigDecimal> delayGoodCount = foodGovDayReportDetail.fieldOf("delayGoodCount", BigDecimal.class);
    public static final FieldExpression<String> delayContent = foodGovDayReportDetail.fieldOf("delayContent", String.class);
    public static final FieldExpression<BigDecimal> totalCapacity = foodGovDayReportDetail.fieldOf("totalCapacity", BigDecimal.class);
    public static final FieldExpression<BigDecimal> availableCapacity = foodGovDayReportDetail.fieldOf("availableCapacity", BigDecimal.class);
    public static final FieldExpression<String> reportStatus = foodGovDayReportDetail.fieldOf("reportStatus", String.class);
    public static final FieldExpression<Long> creatorId = foodGovDayReportDetail.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = foodGovDayReportDetail.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = foodGovDayReportDetail.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = foodGovDayReportDetail.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = foodGovDayReportDetail.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = foodGovDayReportDetail.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = foodGovDayReportDetail.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = foodGovDayReportDetail.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = foodGovDayReportDetail.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = foodGovDayReportDetail.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = foodGovDayReportDetail.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<Boolean> isDeleted = foodGovDayReportDetail.fieldOf("isDeleted", Boolean.class);


    public QFoodGovDayReportDetail() {
        super("FoodGovDayReportDetail", FoodGovDayReportDetail.class);
    }

    QFoodGovDayReportDetail(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "FoodGovDayReportDetail", FoodGovDayReportDetail.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return govDayReportDetailId;
    }
}
