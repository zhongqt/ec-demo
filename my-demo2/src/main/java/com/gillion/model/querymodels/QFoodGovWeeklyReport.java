package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.FoodGovWeeklyReport;

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
public class QFoodGovWeeklyReport extends BaseModelExpression<FoodGovWeeklyReport, Long> {

    public static final BaseModelExpression<FoodGovWeeklyReport, Long> foodGovWeeklyReport = new QFoodGovWeeklyReport();
    public static final FieldExpression<Long> govWeeklyReportId = foodGovWeeklyReport.fieldOf("govWeeklyReportId", Long.class);
    public static final FieldExpression<Date> reportStartDate = foodGovWeeklyReport.fieldOf("reportStartDate", Date.class);
    public static final FieldExpression<Date> reportEndDate = foodGovWeeklyReport.fieldOf("reportEndDate", Date.class);
    public static final FieldExpression<Integer> totalUnloadedShipsCount = foodGovWeeklyReport.fieldOf("totalUnloadedShipsCount", Integer.class);
    public static final FieldExpression<BigDecimal> berthsAnnualCarrying = foodGovWeeklyReport.fieldOf("berthsAnnualCarrying", BigDecimal.class);
    public static final FieldExpression<BigDecimal> totalUnloadedGoodsWeight = foodGovWeeklyReport.fieldOf("totalUnloadedGoodsWeight", BigDecimal.class);
    public static final FieldExpression<Integer> importedGrainBerthsCount = foodGovWeeklyReport.fieldOf("importedGrainBerthsCount", Integer.class);
    public static final FieldExpression<Date> uploadTime = foodGovWeeklyReport.fieldOf("uploadTime", Date.class);
    public static final FieldExpression<String> reportStatus = foodGovWeeklyReport.fieldOf("reportStatus", String.class);
    public static final FieldExpression<Long> creatorId = foodGovWeeklyReport.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = foodGovWeeklyReport.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = foodGovWeeklyReport.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = foodGovWeeklyReport.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = foodGovWeeklyReport.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = foodGovWeeklyReport.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = foodGovWeeklyReport.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = foodGovWeeklyReport.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = foodGovWeeklyReport.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = foodGovWeeklyReport.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = foodGovWeeklyReport.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<Boolean> isDeleted = foodGovWeeklyReport.fieldOf("isDeleted", Boolean.class);


    public QFoodGovWeeklyReport() {
        super("FoodGovWeeklyReport", FoodGovWeeklyReport.class);
    }

    QFoodGovWeeklyReport(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "FoodGovWeeklyReport", FoodGovWeeklyReport.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return govWeeklyReportId;
    }
}
