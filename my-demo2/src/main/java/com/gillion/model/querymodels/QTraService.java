package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.TraService;

import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QTraService extends BaseModelExpression<TraService, Long> {

    public static final BaseModelExpression<TraService, Long> traService = new QTraService();
    public static final FieldExpression<Long> traServiceId = traService.fieldOf("traServiceId", Long.class);
    public static final FieldExpression<Long> traOrderId = traService.fieldOf("traOrderId", Long.class);
    public static final FieldExpression<String> transportType = traService.fieldOf("transportType", String.class);
    public static final FieldExpression<String> serviceType = traService.fieldOf("serviceType", String.class);
    public static final FieldExpression<Long> creatorId = traService.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = traService.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = traService.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = traService.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = traService.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = traService.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = traService.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = traService.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = traService.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = traService.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = traService.fieldOf("recordVersion", Integer.class);


    public QTraService() {
        super("TraService", TraService.class);
    }

    QTraService(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "TraService", TraService.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return traServiceId;
    }
}
