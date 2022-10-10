package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.FoodGovDayReport;

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
public class QFoodGovDayReport extends BaseModelExpression<FoodGovDayReport, Long> {

    public static final BaseModelExpression<FoodGovDayReport, Long> foodGovDayReport = new QFoodGovDayReport();
    public static final FieldExpression<Long> govDayReportId = foodGovDayReport.fieldOf("govDayReportId", Long.class);
    public static final FieldExpression<Date> reportDate = foodGovDayReport.fieldOf("reportDate", Date.class);
    public static final FieldExpression<Integer> delayShipCount = foodGovDayReport.fieldOf("delayShipCount", Integer.class);
    public static final FieldExpression<BigDecimal> delayGoodCount = foodGovDayReport.fieldOf("delayGoodCount", BigDecimal.class);
    public static final FieldExpression<BigDecimal> totalCapacity = foodGovDayReport.fieldOf("totalCapacity", BigDecimal.class);
    public static final FieldExpression<BigDecimal> availableCapacity = foodGovDayReport.fieldOf("availableCapacity", BigDecimal.class);
    public static final FieldExpression<String> reportStatus = foodGovDayReport.fieldOf("reportStatus", String.class);
    public static final FieldExpression<Date> uploadTime = foodGovDayReport.fieldOf("uploadTime", Date.class);
    public static final FieldExpression<Long> creatorId = foodGovDayReport.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = foodGovDayReport.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = foodGovDayReport.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = foodGovDayReport.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = foodGovDayReport.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = foodGovDayReport.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = foodGovDayReport.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = foodGovDayReport.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = foodGovDayReport.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = foodGovDayReport.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = foodGovDayReport.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<Boolean> isDeleted = foodGovDayReport.fieldOf("isDeleted", Boolean.class);


    public QFoodGovDayReport() {
        super("FoodGovDayReport", FoodGovDayReport.class);
    }

    QFoodGovDayReport(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "FoodGovDayReport", FoodGovDayReport.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return govDayReportId;
    }
}
