package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.FoodWarehouseDayReport;

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
public class QFoodWarehouseDayReport extends BaseModelExpression<FoodWarehouseDayReport, Long> {

    public static final BaseModelExpression<FoodWarehouseDayReport, Long> foodWarehouseDayReport = new QFoodWarehouseDayReport();
    public static final FieldExpression<Long> warehouseDayReportId = foodWarehouseDayReport.fieldOf("warehouseDayReportId", Long.class);
    public static final FieldExpression<Long> warehouseInfoId = foodWarehouseDayReport.fieldOf("warehouseInfoId", Long.class);
    public static final FieldExpression<Date> reportDate = foodWarehouseDayReport.fieldOf("reportDate", Date.class);
    public static final FieldExpression<String> goodName = foodWarehouseDayReport.fieldOf("goodName", String.class);
    public static final FieldExpression<BigDecimal> totalCapacity = foodWarehouseDayReport.fieldOf("totalCapacity", BigDecimal.class);
    public static final FieldExpression<BigDecimal> availableCapacity = foodWarehouseDayReport.fieldOf("availableCapacity", BigDecimal.class);
    public static final FieldExpression<String> reportStatus = foodWarehouseDayReport.fieldOf("reportStatus", String.class);
    public static final FieldExpression<Long> creatorId = foodWarehouseDayReport.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = foodWarehouseDayReport.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = foodWarehouseDayReport.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = foodWarehouseDayReport.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = foodWarehouseDayReport.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = foodWarehouseDayReport.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = foodWarehouseDayReport.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = foodWarehouseDayReport.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = foodWarehouseDayReport.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = foodWarehouseDayReport.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = foodWarehouseDayReport.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<Boolean> isDeleted = foodWarehouseDayReport.fieldOf("isDeleted", Boolean.class);


    public QFoodWarehouseDayReport() {
        super("FoodWarehouseDayReport", FoodWarehouseDayReport.class);
    }

    QFoodWarehouseDayReport(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "FoodWarehouseDayReport", FoodWarehouseDayReport.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return warehouseDayReportId;
    }
}
