package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.FoodGovWeeklyReportDetail;

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
public class QFoodGovWeeklyReportDetail extends BaseModelExpression<FoodGovWeeklyReportDetail, Long> {

    public static final BaseModelExpression<FoodGovWeeklyReportDetail, Long> foodGovWeeklyReportDetail = new QFoodGovWeeklyReportDetail();
    public static final FieldExpression<Long> govWeeklyReportDetailId = foodGovWeeklyReportDetail.fieldOf("govWeeklyReportDetailId", Long.class);
    public static final FieldExpression<Long> govWeeklyReportId = foodGovWeeklyReportDetail.fieldOf("govWeeklyReportId", Long.class);
    public static final FieldExpression<Date> reportStartDate = foodGovWeeklyReportDetail.fieldOf("reportStartDate", Date.class);
    public static final FieldExpression<Date> reportEndDate = foodGovWeeklyReportDetail.fieldOf("reportEndDate", Date.class);
    public static final FieldExpression<String> portCode = foodGovWeeklyReportDetail.fieldOf("portCode", String.class);
    public static final FieldExpression<String> portName = foodGovWeeklyReportDetail.fieldOf("portName", String.class);
    public static final FieldExpression<String> goodName = foodGovWeeklyReportDetail.fieldOf("goodName", String.class);
    public static final FieldExpression<Integer> importedGrainBerthsCount = foodGovWeeklyReportDetail.fieldOf("importedGrainBerthsCount", Integer.class);
    public static final FieldExpression<String> detentionReasonsAndNextSteps = foodGovWeeklyReportDetail.fieldOf("detentionReasonsAndNextSteps", String.class);
    public static final FieldExpression<Integer> totalUnloadedShipsCount = foodGovWeeklyReportDetail.fieldOf("totalUnloadedShipsCount", Integer.class);
    public static final FieldExpression<BigDecimal> berthsAnnualCarrying = foodGovWeeklyReportDetail.fieldOf("berthsAnnualCarrying", BigDecimal.class);
    public static final FieldExpression<BigDecimal> totalUnloadedGoodsWeight = foodGovWeeklyReportDetail.fieldOf("totalUnloadedGoodsWeight", BigDecimal.class);
    public static final FieldExpression<String> reportStatus = foodGovWeeklyReportDetail.fieldOf("reportStatus", String.class);
    public static final FieldExpression<Long> creatorId = foodGovWeeklyReportDetail.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = foodGovWeeklyReportDetail.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = foodGovWeeklyReportDetail.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = foodGovWeeklyReportDetail.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = foodGovWeeklyReportDetail.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = foodGovWeeklyReportDetail.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = foodGovWeeklyReportDetail.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = foodGovWeeklyReportDetail.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = foodGovWeeklyReportDetail.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = foodGovWeeklyReportDetail.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = foodGovWeeklyReportDetail.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<Boolean> isDeleted = foodGovWeeklyReportDetail.fieldOf("isDeleted", Boolean.class);


    public QFoodGovWeeklyReportDetail() {
        super("FoodGovWeeklyReportDetail", FoodGovWeeklyReportDetail.class);
    }

    QFoodGovWeeklyReportDetail(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "FoodGovWeeklyReportDetail", FoodGovWeeklyReportDetail.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return govWeeklyReportDetailId;
    }
}
