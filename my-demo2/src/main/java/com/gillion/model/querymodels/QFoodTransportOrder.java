package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.FoodTransportOrder;

import java.lang.Boolean;
import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QFoodTransportOrder extends BaseModelExpression<FoodTransportOrder, Long> {

    public static final BaseModelExpression<FoodTransportOrder, Long> foodTransportOrder = new QFoodTransportOrder();
    public static final FieldExpression<Long> foodTransportOrderId = foodTransportOrder.fieldOf("foodTransportOrderId", Long.class);
    public static final FieldExpression<String> orderNo = foodTransportOrder.fieldOf("orderNo", String.class);
    public static final FieldExpression<String> vesselName = foodTransportOrder.fieldOf("vesselName", String.class);
    public static final FieldExpression<String> vesselNameCn = foodTransportOrder.fieldOf("vesselNameCn", String.class);
    public static final FieldExpression<String> mmsiNum = foodTransportOrder.fieldOf("mmsiNum", String.class);
    public static final FieldExpression<String> polCode = foodTransportOrder.fieldOf("polCode", String.class);
    public static final FieldExpression<String> polName = foodTransportOrder.fieldOf("polName", String.class);
    public static final FieldExpression<String> originCountryCode = foodTransportOrder.fieldOf("originCountryCode", String.class);
    public static final FieldExpression<String> originCountryName = foodTransportOrder.fieldOf("originCountryName", String.class);
    public static final FieldExpression<String> podCode = foodTransportOrder.fieldOf("podCode", String.class);
    public static final FieldExpression<String> podName = foodTransportOrder.fieldOf("podName", String.class);
    public static final FieldExpression<String> imoNum = foodTransportOrder.fieldOf("imoNum", String.class);
    public static final FieldExpression<Long> consignorId = foodTransportOrder.fieldOf("consignorId", Long.class);
    public static final FieldExpression<String> consignorName = foodTransportOrder.fieldOf("consignorName", String.class);
    public static final FieldExpression<String> customsClearance = foodTransportOrder.fieldOf("customsClearance", String.class);
    public static final FieldExpression<String> importPortDredging = foodTransportOrder.fieldOf("importPortDredging", String.class);
    public static final FieldExpression<Date> purchaseTime = foodTransportOrder.fieldOf("purchaseTime", Date.class);
    public static final FieldExpression<String> downstreamDemandPlan = foodTransportOrder.fieldOf("downstreamDemandPlan", String.class);
    public static final FieldExpression<String> orderStatus = foodTransportOrder.fieldOf("orderStatus", String.class);
    public static final FieldExpression<String> remark = foodTransportOrder.fieldOf("remark", String.class);
    public static final FieldExpression<Long> creatorId = foodTransportOrder.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = foodTransportOrder.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = foodTransportOrder.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = foodTransportOrder.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = foodTransportOrder.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = foodTransportOrder.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = foodTransportOrder.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = foodTransportOrder.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = foodTransportOrder.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = foodTransportOrder.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = foodTransportOrder.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<Boolean> isDeleted = foodTransportOrder.fieldOf("isDeleted", Boolean.class);


    public QFoodTransportOrder() {
        super("FoodTransportOrder", FoodTransportOrder.class);
    }

    QFoodTransportOrder(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "FoodTransportOrder", FoodTransportOrder.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return foodTransportOrderId;
    }
}
