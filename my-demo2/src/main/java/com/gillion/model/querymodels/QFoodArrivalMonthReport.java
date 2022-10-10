package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.FoodArrivalMonthReport;

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
public class QFoodArrivalMonthReport extends BaseModelExpression<FoodArrivalMonthReport, Long> {

    public static final BaseModelExpression<FoodArrivalMonthReport, Long> foodArrivalMonthReport = new QFoodArrivalMonthReport();
    public static final FieldExpression<Long> foodArrivalMonthReportId = foodArrivalMonthReport.fieldOf("foodArrivalMonthReportId", Long.class);
    public static final FieldExpression<Long> foodArrivalMonthMainReportId = foodArrivalMonthReport.fieldOf("foodArrivalMonthMainReportId", Long.class);
    public static final FieldExpression<Date> reportDate = foodArrivalMonthReport.fieldOf("reportDate", Date.class);
    public static final FieldExpression<String> reportStatus = foodArrivalMonthReport.fieldOf("reportStatus", String.class);
    public static final FieldExpression<String> podCode = foodArrivalMonthReport.fieldOf("podCode", String.class);
    public static final FieldExpression<String> podName = foodArrivalMonthReport.fieldOf("podName", String.class);
    public static final FieldExpression<String> cargoCode = foodArrivalMonthReport.fieldOf("cargoCode", String.class);
    public static final FieldExpression<String> cargoName = foodArrivalMonthReport.fieldOf("cargoName", String.class);
    public static final FieldExpression<Long> inportVesselNum = foodArrivalMonthReport.fieldOf("inportVesselNum", Long.class);
    public static final FieldExpression<BigDecimal> inportCargoWeight = foodArrivalMonthReport.fieldOf("inportCargoWeight", BigDecimal.class);
    public static final FieldExpression<String> arrivalTime = foodArrivalMonthReport.fieldOf("arrivalTime", String.class);
    public static final FieldExpression<Date> orderReportTime = foodArrivalMonthReport.fieldOf("orderReportTime", Date.class);
    public static final FieldExpression<Long> creatorId = foodArrivalMonthReport.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = foodArrivalMonthReport.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = foodArrivalMonthReport.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = foodArrivalMonthReport.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = foodArrivalMonthReport.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = foodArrivalMonthReport.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = foodArrivalMonthReport.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = foodArrivalMonthReport.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = foodArrivalMonthReport.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = foodArrivalMonthReport.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = foodArrivalMonthReport.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<Boolean> isDeleted = foodArrivalMonthReport.fieldOf("isDeleted", Boolean.class);


    public QFoodArrivalMonthReport() {
        super("FoodArrivalMonthReport", FoodArrivalMonthReport.class);
    }

    QFoodArrivalMonthReport(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "FoodArrivalMonthReport", FoodArrivalMonthReport.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return foodArrivalMonthReportId;
    }
}
