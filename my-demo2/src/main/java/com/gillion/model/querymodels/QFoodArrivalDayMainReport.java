package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.FoodArrivalDayMainReport;

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
public class QFoodArrivalDayMainReport extends BaseModelExpression<FoodArrivalDayMainReport, Long> {

    public static final BaseModelExpression<FoodArrivalDayMainReport, Long> foodArrivalDayMainReport = new QFoodArrivalDayMainReport();
    public static final FieldExpression<Long> foodArrivalDayMainReportId = foodArrivalDayMainReport.fieldOf("foodArrivalDayMainReportId", Long.class);
    public static final FieldExpression<Date> reportDate = foodArrivalDayMainReport.fieldOf("reportDate", Date.class);
    public static final FieldExpression<String> podName = foodArrivalDayMainReport.fieldOf("podName", String.class);
    public static final FieldExpression<String> cargoName = foodArrivalDayMainReport.fieldOf("cargoName", String.class);
    public static final FieldExpression<Long> inportVesselNum = foodArrivalDayMainReport.fieldOf("inportVesselNum", Long.class);
    public static final FieldExpression<BigDecimal> inportCargoWeight = foodArrivalDayMainReport.fieldOf("inportCargoWeight", BigDecimal.class);
    public static final FieldExpression<Long> stayVesselNum = foodArrivalDayMainReport.fieldOf("stayVesselNum", Long.class);
    public static final FieldExpression<BigDecimal> stayCargoWeight = foodArrivalDayMainReport.fieldOf("stayCargoWeight", BigDecimal.class);
    public static final FieldExpression<BigDecimal> totalStorageCapacity = foodArrivalDayMainReport.fieldOf("totalStorageCapacity", BigDecimal.class);
    public static final FieldExpression<BigDecimal> availableStorageCapacity = foodArrivalDayMainReport.fieldOf("availableStorageCapacity", BigDecimal.class);
    public static final FieldExpression<String> reportStatus = foodArrivalDayMainReport.fieldOf("reportStatus", String.class);
    public static final FieldExpression<Date> orderReportTime = foodArrivalDayMainReport.fieldOf("orderReportTime", Date.class);
    public static final FieldExpression<Long> creatorId = foodArrivalDayMainReport.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = foodArrivalDayMainReport.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = foodArrivalDayMainReport.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = foodArrivalDayMainReport.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = foodArrivalDayMainReport.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = foodArrivalDayMainReport.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = foodArrivalDayMainReport.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = foodArrivalDayMainReport.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = foodArrivalDayMainReport.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = foodArrivalDayMainReport.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = foodArrivalDayMainReport.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<Boolean> isDeleted = foodArrivalDayMainReport.fieldOf("isDeleted", Boolean.class);


    public QFoodArrivalDayMainReport() {
        super("FoodArrivalDayMainReport", FoodArrivalDayMainReport.class);
    }

    QFoodArrivalDayMainReport(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "FoodArrivalDayMainReport", FoodArrivalDayMainReport.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return foodArrivalDayMainReportId;
    }
}
