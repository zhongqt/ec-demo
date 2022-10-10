package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.FoodPortShipCountDailyTemp;

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
public class QFoodPortShipCountDailyTemp extends BaseModelExpression<FoodPortShipCountDailyTemp, Long> {

    public static final BaseModelExpression<FoodPortShipCountDailyTemp, Long> foodPortShipCountDailyTemp = new QFoodPortShipCountDailyTemp();
    public static final FieldExpression<Long> id = foodPortShipCountDailyTemp.fieldOf("id", Long.class);
    public static final FieldExpression<Date> date = foodPortShipCountDailyTemp.fieldOf("date", Date.class);
    public static final FieldExpression<String> portCode = foodPortShipCountDailyTemp.fieldOf("portCode", String.class);
    public static final FieldExpression<String> portName = foodPortShipCountDailyTemp.fieldOf("portName", String.class);
    public static final FieldExpression<Integer> lessThanFive = foodPortShipCountDailyTemp.fieldOf("lessThanFive", Integer.class);
    public static final FieldExpression<Integer> greaterThanFive = foodPortShipCountDailyTemp.fieldOf("greaterThanFive", Integer.class);
    public static final FieldExpression<BigDecimal> lessThanFiveWeight = foodPortShipCountDailyTemp.fieldOf("lessThanFiveWeight", BigDecimal.class);
    public static final FieldExpression<BigDecimal> greaterThanFiveWeight = foodPortShipCountDailyTemp.fieldOf("greaterThanFiveWeight", BigDecimal.class);
    public static final FieldExpression<Date> createTime = foodPortShipCountDailyTemp.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> goodName = foodPortShipCountDailyTemp.fieldOf("goodName", String.class);
    public static final FieldExpression<String> greaterCompanyInfo = foodPortShipCountDailyTemp.fieldOf("greaterCompanyInfo", String.class);
    public static final FieldExpression<String> lessCompanyInfo = foodPortShipCountDailyTemp.fieldOf("lessCompanyInfo", String.class);


    public QFoodPortShipCountDailyTemp() {
        super("FoodPortShipCountDailyTemp", FoodPortShipCountDailyTemp.class);
    }

    QFoodPortShipCountDailyTemp(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "FoodPortShipCountDailyTemp", FoodPortShipCountDailyTemp.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
