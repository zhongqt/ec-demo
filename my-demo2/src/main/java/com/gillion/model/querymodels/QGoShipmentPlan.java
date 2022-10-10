package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.GoShipmentPlan;

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
public class QGoShipmentPlan extends BaseModelExpression<GoShipmentPlan, Long> {

    public static final BaseModelExpression<GoShipmentPlan, Long> goShipmentPlan = new QGoShipmentPlan();
    public static final FieldExpression<Long> goShipmentPlanId = goShipmentPlan.fieldOf("goShipmentPlanId", Long.class);
    public static final FieldExpression<Long> goOrderId = goShipmentPlan.fieldOf("goOrderId", Long.class);
    public static final FieldExpression<Long> goManifestOrderId = goShipmentPlan.fieldOf("goManifestOrderId", Long.class);
    public static final FieldExpression<Long> linkDeliveryId = goShipmentPlan.fieldOf("linkDeliveryId", Long.class);
    public static final FieldExpression<String> linkType = goShipmentPlan.fieldOf("linkType", String.class);
    public static final FieldExpression<String> hwabNo = goShipmentPlan.fieldOf("hwabNo", String.class);
    public static final FieldExpression<String> wabNo = goShipmentPlan.fieldOf("wabNo", String.class);
    public static final FieldExpression<String> carNo = goShipmentPlan.fieldOf("carNo", String.class);
    public static final FieldExpression<String> carType = goShipmentPlan.fieldOf("carType", String.class);
    public static final FieldExpression<String> carName = goShipmentPlan.fieldOf("carName", String.class);
    public static final FieldExpression<String> carTel = goShipmentPlan.fieldOf("carTel", String.class);
    public static final FieldExpression<Date> departureTime = goShipmentPlan.fieldOf("departureTime", Date.class);
    public static final FieldExpression<Boolean> isDeleted = goShipmentPlan.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = goShipmentPlan.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = goShipmentPlan.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = goShipmentPlan.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = goShipmentPlan.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = goShipmentPlan.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = goShipmentPlan.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = goShipmentPlan.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = goShipmentPlan.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = goShipmentPlan.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = goShipmentPlan.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = goShipmentPlan.fieldOf("recordVersion", Integer.class);


    public QGoShipmentPlan() {
        super("GoShipmentPlan", GoShipmentPlan.class);
    }

    QGoShipmentPlan(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "GoShipmentPlan", GoShipmentPlan.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return goShipmentPlanId;
    }
}
