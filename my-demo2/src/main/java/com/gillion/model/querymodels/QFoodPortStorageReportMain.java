package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.FoodPortStorageReportMain;

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
public class QFoodPortStorageReportMain extends BaseModelExpression<FoodPortStorageReportMain, Long> {

    public static final BaseModelExpression<FoodPortStorageReportMain, Long> foodPortStorageReportMain = new QFoodPortStorageReportMain();
    public static final FieldExpression<Long> portStorageReportMainId = foodPortStorageReportMain.fieldOf("portStorageReportMainId", Long.class);
    public static final FieldExpression<Date> reportDate = foodPortStorageReportMain.fieldOf("reportDate", Date.class);
    public static final FieldExpression<String> portCode = foodPortStorageReportMain.fieldOf("portCode", String.class);
    public static final FieldExpression<String> portName = foodPortStorageReportMain.fieldOf("portName", String.class);
    public static final FieldExpression<BigDecimal> allCapacity = foodPortStorageReportMain.fieldOf("allCapacity", BigDecimal.class);
    public static final FieldExpression<BigDecimal> usedCapacity = foodPortStorageReportMain.fieldOf("usedCapacity", BigDecimal.class);
    public static final FieldExpression<BigDecimal> buildCapacity = foodPortStorageReportMain.fieldOf("buildCapacity", BigDecimal.class);
    public static final FieldExpression<String> situation = foodPortStorageReportMain.fieldOf("situation", String.class);
    public static final FieldExpression<String> remark = foodPortStorageReportMain.fieldOf("remark", String.class);
    public static final FieldExpression<Long> creatorId = foodPortStorageReportMain.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = foodPortStorageReportMain.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = foodPortStorageReportMain.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = foodPortStorageReportMain.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = foodPortStorageReportMain.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = foodPortStorageReportMain.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = foodPortStorageReportMain.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = foodPortStorageReportMain.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = foodPortStorageReportMain.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = foodPortStorageReportMain.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = foodPortStorageReportMain.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<Boolean> isDeleted = foodPortStorageReportMain.fieldOf("isDeleted", Boolean.class);


    public QFoodPortStorageReportMain() {
        super("FoodPortStorageReportMain", FoodPortStorageReportMain.class);
    }

    QFoodPortStorageReportMain(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "FoodPortStorageReportMain", FoodPortStorageReportMain.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return portStorageReportMainId;
    }
}
