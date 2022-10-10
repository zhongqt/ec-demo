package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.GoOrderStatus;

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
public class QGoOrderStatus extends BaseModelExpression<GoOrderStatus, Long> {

    public static final BaseModelExpression<GoOrderStatus, Long> goOrderStatus = new QGoOrderStatus();
    public static final FieldExpression<Long> goOrderStatusId = goOrderStatus.fieldOf("goOrderStatusId", Long.class);
    public static final FieldExpression<String> schedulingTypeCode = goOrderStatus.fieldOf("schedulingTypeCode", String.class);
    public static final FieldExpression<String> schedulingTypeName = goOrderStatus.fieldOf("schedulingTypeName", String.class);
    public static final FieldExpression<String> linkCode = goOrderStatus.fieldOf("linkCode", String.class);
    public static final FieldExpression<String> linkName = goOrderStatus.fieldOf("linkName", String.class);
    public static final FieldExpression<String> statusCode = goOrderStatus.fieldOf("statusCode", String.class);
    public static final FieldExpression<String> statusName = goOrderStatus.fieldOf("statusName", String.class);
    public static final FieldExpression<Boolean> isDeleted = goOrderStatus.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = goOrderStatus.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = goOrderStatus.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = goOrderStatus.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = goOrderStatus.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = goOrderStatus.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = goOrderStatus.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = goOrderStatus.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = goOrderStatus.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = goOrderStatus.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = goOrderStatus.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = goOrderStatus.fieldOf("recordVersion", Integer.class);


    public QGoOrderStatus() {
        super("GoOrderStatus", GoOrderStatus.class);
    }

    QGoOrderStatus(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "GoOrderStatus", GoOrderStatus.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return goOrderStatusId;
    }
}
