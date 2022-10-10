package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.TraWeekUpload;

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
public class QTraWeekUpload extends BaseModelExpression<TraWeekUpload, Long> {

    public static final BaseModelExpression<TraWeekUpload, Long> traWeekUpload = new QTraWeekUpload();
    public static final FieldExpression<Long> traWeekUploadId = traWeekUpload.fieldOf("traWeekUploadId", Long.class);
    public static final FieldExpression<String> enterpriseId = traWeekUpload.fieldOf("enterpriseId", String.class);
    public static final FieldExpression<String> enterpriseType = traWeekUpload.fieldOf("enterpriseType", String.class);
    public static final FieldExpression<String> enterpriseName = traWeekUpload.fieldOf("enterpriseName", String.class);
    public static final FieldExpression<String> enterpriseDistrict = traWeekUpload.fieldOf("enterpriseDistrict", String.class);
    public static final FieldExpression<String> reportCount = traWeekUpload.fieldOf("reportCount", String.class);
    public static final FieldExpression<String> reportTimePeriod = traWeekUpload.fieldOf("reportTimePeriod", String.class);
    public static final FieldExpression<String> userId = traWeekUpload.fieldOf("userId", String.class);
    public static final FieldExpression<Boolean> isDeleted = traWeekUpload.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = traWeekUpload.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = traWeekUpload.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = traWeekUpload.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = traWeekUpload.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = traWeekUpload.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = traWeekUpload.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = traWeekUpload.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = traWeekUpload.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = traWeekUpload.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = traWeekUpload.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = traWeekUpload.fieldOf("recordVersion", Integer.class);


    public QTraWeekUpload() {
        super("TraWeekUpload", TraWeekUpload.class);
    }

    QTraWeekUpload(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "TraWeekUpload", TraWeekUpload.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return traWeekUploadId;
    }
}
