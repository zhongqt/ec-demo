package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.FoodWarehouseInfo;

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
public class QFoodWarehouseInfo extends BaseModelExpression<FoodWarehouseInfo, Long> {

    public static final BaseModelExpression<FoodWarehouseInfo, Long> foodWarehouseInfo = new QFoodWarehouseInfo();
    public static final FieldExpression<Long> warehouseInfoId = foodWarehouseInfo.fieldOf("warehouseInfoId", Long.class);
    public static final FieldExpression<String> warehouseName = foodWarehouseInfo.fieldOf("warehouseName", String.class);
    public static final FieldExpression<String> portCode = foodWarehouseInfo.fieldOf("portCode", String.class);
    public static final FieldExpression<String> portName = foodWarehouseInfo.fieldOf("portName", String.class);
    public static final FieldExpression<String> warehouseNo = foodWarehouseInfo.fieldOf("warehouseNo", String.class);
    public static final FieldExpression<String> goodTypeCode = foodWarehouseInfo.fieldOf("goodTypeCode", String.class);
    public static final FieldExpression<String> goodTypeName = foodWarehouseInfo.fieldOf("goodTypeName", String.class);
    public static final FieldExpression<String> warehouseType = foodWarehouseInfo.fieldOf("warehouseType", String.class);
    public static final FieldExpression<BigDecimal> capacity = foodWarehouseInfo.fieldOf("capacity", BigDecimal.class);
    public static final FieldExpression<Long> creatorId = foodWarehouseInfo.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = foodWarehouseInfo.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = foodWarehouseInfo.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = foodWarehouseInfo.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = foodWarehouseInfo.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = foodWarehouseInfo.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = foodWarehouseInfo.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = foodWarehouseInfo.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = foodWarehouseInfo.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = foodWarehouseInfo.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = foodWarehouseInfo.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<Boolean> isDeleted = foodWarehouseInfo.fieldOf("isDeleted", Boolean.class);


    public QFoodWarehouseInfo() {
        super("FoodWarehouseInfo", FoodWarehouseInfo.class);
    }

    QFoodWarehouseInfo(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "FoodWarehouseInfo", FoodWarehouseInfo.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return warehouseInfoId;
    }
}
