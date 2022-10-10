package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.FoodArrivalMonthMainReport;

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
public class QFoodArrivalMonthMainReport extends BaseModelExpression<FoodArrivalMonthMainReport, Long> {

    public static final BaseModelExpression<FoodArrivalMonthMainReport, Long> foodArrivalMonthMainReport = new QFoodArrivalMonthMainReport();
    public static final FieldExpression<Long> foodArrivalMonthMainReportId = foodArrivalMonthMainReport.fieldOf("foodArrivalMonthMainReportId", Long.class);
    public static final FieldExpression<Date> reportDate = foodArrivalMonthMainReport.fieldOf("reportDate", Date.class);
    public static final FieldExpression<String> podName = foodArrivalMonthMainReport.fieldOf("podName", String.class);
    public static final FieldExpression<String> cargoName = foodArrivalMonthMainReport.fieldOf("cargoName", String.class);
    public static final FieldExpression<Long> inportVesselNum = foodArrivalMonthMainReport.fieldOf("inportVesselNum", Long.class);
    public static final FieldExpression<BigDecimal> inportCargoWeight = foodArrivalMonthMainReport.fieldOf("inportCargoWeight", BigDecimal.class);
    public static final FieldExpression<String> arrivalTime = foodArrivalMonthMainReport.fieldOf("arrivalTime", String.class);
    public static final FieldExpression<String> reportStatus = foodArrivalMonthMainReport.fieldOf("reportStatus", String.class);
    public static final FieldExpression<Date> orderReportTime = foodArrivalMonthMainReport.fieldOf("orderReportTime", Date.class);
    public static final FieldExpression<Long> creatorId = foodArrivalMonthMainReport.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = foodArrivalMonthMainReport.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = foodArrivalMonthMainReport.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = foodArrivalMonthMainReport.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = foodArrivalMonthMainReport.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = foodArrivalMonthMainReport.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = foodArrivalMonthMainReport.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = foodArrivalMonthMainReport.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = foodArrivalMonthMainReport.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = foodArrivalMonthMainReport.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = foodArrivalMonthMainReport.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<Boolean> isDeleted = foodArrivalMonthMainReport.fieldOf("isDeleted", Boolean.class);


    public QFoodArrivalMonthMainReport() {
        super("FoodArrivalMonthMainReport", FoodArrivalMonthMainReport.class);
    }

    QFoodArrivalMonthMainReport(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "FoodArrivalMonthMainReport", FoodArrivalMonthMainReport.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return foodArrivalMonthMainReportId;
    }
}
