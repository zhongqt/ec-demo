package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.TraWeekDetail;

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
public class QTraWeekDetail extends BaseModelExpression<TraWeekDetail, Long> {

    public static final BaseModelExpression<TraWeekDetail, Long> traWeekDetail = new QTraWeekDetail();
    public static final FieldExpression<Long> traWeekDetailId = traWeekDetail.fieldOf("traWeekDetailId", Long.class);
    public static final FieldExpression<String> transportType = traWeekDetail.fieldOf("transportType", String.class);
    public static final FieldExpression<String> countryOrigin = traWeekDetail.fieldOf("countryOrigin", String.class);
    public static final FieldExpression<String> provinceOrigin = traWeekDetail.fieldOf("provinceOrigin", String.class);
    public static final FieldExpression<String> pointOrigin = traWeekDetail.fieldOf("pointOrigin", String.class);
    public static final FieldExpression<String> countryDestination = traWeekDetail.fieldOf("countryDestination", String.class);
    public static final FieldExpression<String> pointDestination = traWeekDetail.fieldOf("pointDestination", String.class);
    public static final FieldExpression<String> goodsName = traWeekDetail.fieldOf("goodsName", String.class);
    public static final FieldExpression<String> goodsType = traWeekDetail.fieldOf("goodsType", String.class);
    public static final FieldExpression<String> reportTimePeriod = traWeekDetail.fieldOf("reportTimePeriod", String.class);
    public static final FieldExpression<Double> weight = traWeekDetail.fieldOf("weight", Double.class);
    public static final FieldExpression<Date> shipmentTime = traWeekDetail.fieldOf("shipmentTime", Date.class);
    public static final FieldExpression<Date> arriveTime = traWeekDetail.fieldOf("arriveTime", Date.class);
    public static final FieldExpression<String> userId = traWeekDetail.fieldOf("userId", String.class);
    public static final FieldExpression<Boolean> isDeleted = traWeekDetail.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<String> uploadId = traWeekDetail.fieldOf("uploadId", String.class);
    public static final FieldExpression<String> containersNum = traWeekDetail.fieldOf("containersNum", String.class);
    public static final FieldExpression<String> containersSize = traWeekDetail.fieldOf("containersSize", String.class);
    public static final FieldExpression<String> remark = traWeekDetail.fieldOf("remark", String.class);
    public static final FieldExpression<Long> creatorId = traWeekDetail.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = traWeekDetail.fieldOf("creatorName", String.class);
    public static final FieldExpression<String> createTime = traWeekDetail.fieldOf("createTime", String.class);
    public static final FieldExpression<Long> createCompanyId = traWeekDetail.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = traWeekDetail.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = traWeekDetail.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = traWeekDetail.fieldOf("modifierName", String.class);
    public static final FieldExpression<String> modifyTime = traWeekDetail.fieldOf("modifyTime", String.class);
    public static final FieldExpression<Long> modifyCompanyId = traWeekDetail.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = traWeekDetail.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = traWeekDetail.fieldOf("recordVersion", Integer.class);


    public QTraWeekDetail() {
        super("TraWeekDetail", TraWeekDetail.class);
    }

    QTraWeekDetail(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "TraWeekDetail", TraWeekDetail.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return traWeekDetailId;
    }
}
