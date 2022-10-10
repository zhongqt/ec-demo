package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.FoodArrivalDayReport;

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
public class QFoodArrivalDayReport extends BaseModelExpression<FoodArrivalDayReport, Long> {

    public static final BaseModelExpression<FoodArrivalDayReport, Long> foodArrivalDayReport = new QFoodArrivalDayReport();
    public static final FieldExpression<Long> foodArrivalDayReportId = foodArrivalDayReport.fieldOf("foodArrivalDayReportId", Long.class);
    public static final FieldExpression<Long> foodArrivalDayMainReportId = foodArrivalDayReport.fieldOf("foodArrivalDayMainReportId", Long.class);
    public static final FieldExpression<Date> reportDate = foodArrivalDayReport.fieldOf("reportDate", Date.class);
    public static final FieldExpression<String> reportStatus = foodArrivalDayReport.fieldOf("reportStatus", String.class);
    public static final FieldExpression<String> podCode = foodArrivalDayReport.fieldOf("podCode", String.class);
    public static final FieldExpression<String> podName = foodArrivalDayReport.fieldOf("podName", String.class);
    public static final FieldExpression<String> cargoCode = foodArrivalDayReport.fieldOf("cargoCode", String.class);
    public static final FieldExpression<String> cargoName = foodArrivalDayReport.fieldOf("cargoName", String.class);
    public static final FieldExpression<Long> inportVesselNum = foodArrivalDayReport.fieldOf("inportVesselNum", Long.class);
    public static final FieldExpression<BigDecimal> inportCargoWeight = foodArrivalDayReport.fieldOf("inportCargoWeight", BigDecimal.class);
    public static final FieldExpression<Long> stayVesselNum = foodArrivalDayReport.fieldOf("stayVesselNum", Long.class);
    public static final FieldExpression<BigDecimal> stayCargoWeight = foodArrivalDayReport.fieldOf("stayCargoWeight", BigDecimal.class);
    public static final FieldExpression<BigDecimal> totalStorageCapacity = foodArrivalDayReport.fieldOf("totalStorageCapacity", BigDecimal.class);
    public static final FieldExpression<BigDecimal> availableStorageCapacity = foodArrivalDayReport.fieldOf("availableStorageCapacity", BigDecimal.class);
    public static final FieldExpression<Date> orderReportTime = foodArrivalDayReport.fieldOf("orderReportTime", Date.class);
    public static final FieldExpression<Long> creatorId = foodArrivalDayReport.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = foodArrivalDayReport.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = foodArrivalDayReport.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = foodArrivalDayReport.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = foodArrivalDayReport.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = foodArrivalDayReport.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = foodArrivalDayReport.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = foodArrivalDayReport.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = foodArrivalDayReport.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = foodArrivalDayReport.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = foodArrivalDayReport.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<Boolean> isDeleted = foodArrivalDayReport.fieldOf("isDeleted", Boolean.class);


    public QFoodArrivalDayReport() {
        super("FoodArrivalDayReport", FoodArrivalDayReport.class);
    }

    QFoodArrivalDayReport(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "FoodArrivalDayReport", FoodArrivalDayReport.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return foodArrivalDayReportId;
    }
}
