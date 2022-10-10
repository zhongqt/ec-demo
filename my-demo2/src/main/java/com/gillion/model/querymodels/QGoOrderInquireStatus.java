package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.GoOrderInquireStatus;

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
public class QGoOrderInquireStatus extends BaseModelExpression<GoOrderInquireStatus, Long> {

    public static final BaseModelExpression<GoOrderInquireStatus, Long> goOrderInquireStatus = new QGoOrderInquireStatus();
    public static final FieldExpression<Long> goOrderInquireStatusId = goOrderInquireStatus.fieldOf("goOrderInquireStatusId", Long.class);
    public static final FieldExpression<Long> goOrderStatusId = goOrderInquireStatus.fieldOf("goOrderStatusId", Long.class);
    public static final FieldExpression<String> statusCode = goOrderInquireStatus.fieldOf("statusCode", String.class);
    public static final FieldExpression<String> statusName = goOrderInquireStatus.fieldOf("statusName", String.class);
    public static final FieldExpression<String> displayStatusName = goOrderInquireStatus.fieldOf("displayStatusName", String.class);
    public static final FieldExpression<String> displayType = goOrderInquireStatus.fieldOf("displayType", String.class);
    public static final FieldExpression<Boolean> isDeleted = goOrderInquireStatus.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = goOrderInquireStatus.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = goOrderInquireStatus.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = goOrderInquireStatus.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = goOrderInquireStatus.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = goOrderInquireStatus.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = goOrderInquireStatus.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = goOrderInquireStatus.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = goOrderInquireStatus.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = goOrderInquireStatus.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = goOrderInquireStatus.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = goOrderInquireStatus.fieldOf("recordVersion", Integer.class);


    public QGoOrderInquireStatus() {
        super("GoOrderInquireStatus", GoOrderInquireStatus.class);
    }

    QGoOrderInquireStatus(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "GoOrderInquireStatus", GoOrderInquireStatus.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return goOrderInquireStatusId;
    }
}
