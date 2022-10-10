package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.TraWeekDetailTemporary;

import java.lang.Boolean;
import java.lang.Double;
import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QTraWeekDetailTemporary extends BaseModelExpression<TraWeekDetailTemporary, Long> {

    public static final BaseModelExpression<TraWeekDetailTemporary, Long> traWeekDetailTemporary = new QTraWeekDetailTemporary();
    public static final FieldExpression<Long> traWeekDetailTemporaryId = traWeekDetailTemporary.fieldOf("traWeekDetailTemporaryId", Long.class);
    public static final FieldExpression<String> transportType = traWeekDetailTemporary.fieldOf("transportType", String.class);
    public static final FieldExpression<String> countryOrigin = traWeekDetailTemporary.fieldOf("countryOrigin", String.class);
    public static final FieldExpression<String> provinceOrigin = traWeekDetailTemporary.fieldOf("provinceOrigin", String.class);
    public static final FieldExpression<String> pointOrigin = traWeekDetailTemporary.fieldOf("pointOrigin", String.class);
    public static final FieldExpression<String> countryDestination = traWeekDetailTemporary.fieldOf("countryDestination", String.class);
    public static final FieldExpression<String> pointDestination = traWeekDetailTemporary.fieldOf("pointDestination", String.class);
    public static final FieldExpression<String> goodsName = traWeekDetailTemporary.fieldOf("goodsName", String.class);
    public static final FieldExpression<String> goodsType = traWeekDetailTemporary.fieldOf("goodsType", String.class);
    public static final FieldExpression<String> reportTimePeriod = traWeekDetailTemporary.fieldOf("reportTimePeriod", String.class);
    public static final FieldExpression<Double> weight = traWeekDetailTemporary.fieldOf("weight", Double.class);
    public static final FieldExpression<Date> shipmentTime = traWeekDetailTemporary.fieldOf("shipmentTime", Date.class);
    public static final FieldExpression<Date> arriveTime = traWeekDetailTemporary.fieldOf("arriveTime", Date.class);
    public static final FieldExpression<String> userId = traWeekDetailTemporary.fieldOf("userId", String.class);
    public static final FieldExpression<Boolean> isDeleted = traWeekDetailTemporary.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> uploadId = traWeekDetailTemporary.fieldOf("uploadId", Long.class);
    public static final FieldExpression<String> containersNum = traWeekDetailTemporary.fieldOf("containersNum", String.class);
    public static final FieldExpression<String> containersSize = traWeekDetailTemporary.fieldOf("containersSize", String.class);
    public static final FieldExpression<String> remark = traWeekDetailTemporary.fieldOf("remark", String.class);
    public static final FieldExpression<Long> creatorId = traWeekDetailTemporary.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = traWeekDetailTemporary.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = traWeekDetailTemporary.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = traWeekDetailTemporary.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = traWeekDetailTemporary.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = traWeekDetailTemporary.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = traWeekDetailTemporary.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = traWeekDetailTemporary.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = traWeekDetailTemporary.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = traWeekDetailTemporary.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = traWeekDetailTemporary.fieldOf("recordVersion", Integer.class);


    public QTraWeekDetailTemporary() {
        super("TraWeekDetailTemporary", TraWeekDetailTemporary.class);
    }

    QTraWeekDetailTemporary(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "TraWeekDetailTemporary", TraWeekDetailTemporary.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return traWeekDetailTemporaryId;
    }
}
