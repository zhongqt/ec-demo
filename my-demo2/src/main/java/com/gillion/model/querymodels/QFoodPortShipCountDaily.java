package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.FoodPortShipCountDaily;

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
public class QFoodPortShipCountDaily extends BaseModelExpression<FoodPortShipCountDaily, Long> {

    public static final BaseModelExpression<FoodPortShipCountDaily, Long> foodPortShipCountDaily = new QFoodPortShipCountDaily();
    public static final FieldExpression<Long> id = foodPortShipCountDaily.fieldOf("id", Long.class);
    public static final FieldExpression<Date> date = foodPortShipCountDaily.fieldOf("date", Date.class);
    public static final FieldExpression<String> portCode = foodPortShipCountDaily.fieldOf("portCode", String.class);
    public static final FieldExpression<String> portName = foodPortShipCountDaily.fieldOf("portName", String.class);
    public static final FieldExpression<Integer> lessThanFive = foodPortShipCountDaily.fieldOf("lessThanFive", Integer.class);
    public static final FieldExpression<Integer> greaterThanFive = foodPortShipCountDaily.fieldOf("greaterThanFive", Integer.class);
    public static final FieldExpression<BigDecimal> lessThanFiveWeight = foodPortShipCountDaily.fieldOf("lessThanFiveWeight", BigDecimal.class);
    public static final FieldExpression<BigDecimal> greaterThanFiveWeight = foodPortShipCountDaily.fieldOf("greaterThanFiveWeight", BigDecimal.class);
    public static final FieldExpression<Date> createTime = foodPortShipCountDaily.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> goodName = foodPortShipCountDaily.fieldOf("goodName", String.class);
    public static final FieldExpression<String> greaterCompanyInfo = foodPortShipCountDaily.fieldOf("greaterCompanyInfo", String.class);
    public static final FieldExpression<String> lessCompanyInfo = foodPortShipCountDaily.fieldOf("lessCompanyInfo", String.class);
    public static final FieldExpression<String> greaterId = foodPortShipCountDaily.fieldOf("greaterId", String.class);
    public static final FieldExpression<String> lessId = foodPortShipCountDaily.fieldOf("lessId", String.class);


    public QFoodPortShipCountDaily() {
        super("FoodPortShipCountDaily", FoodPortShipCountDaily.class);
    }

    QFoodPortShipCountDaily(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "FoodPortShipCountDaily", FoodPortShipCountDaily.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
