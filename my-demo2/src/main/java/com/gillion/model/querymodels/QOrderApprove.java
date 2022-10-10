package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.OrderApprove;

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
public class QOrderApprove extends BaseModelExpression<OrderApprove, Long> {

    public static final BaseModelExpression<OrderApprove, Long> orderApprove = new QOrderApprove();
    public static final FieldExpression<Long> orderApproveId = orderApprove.fieldOf("orderApproveId", Long.class);
    public static final FieldExpression<Long> goOrderId = orderApprove.fieldOf("goOrderId", Long.class);
    public static final FieldExpression<Integer> approverType = orderApprove.fieldOf("approverType", Integer.class);
    public static final FieldExpression<Integer> reviewResult = orderApprove.fieldOf("reviewResult", Integer.class);
    public static final FieldExpression<String> reviewOpinion = orderApprove.fieldOf("reviewOpinion", String.class);
    public static final FieldExpression<Long> reviewId = orderApprove.fieldOf("reviewId", Long.class);
    public static final FieldExpression<String> reviewName = orderApprove.fieldOf("reviewName", String.class);
    public static final FieldExpression<Date> reviewCompleteTime = orderApprove.fieldOf("reviewCompleteTime", Date.class);
    public static final FieldExpression<Boolean> isDeleted = orderApprove.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = orderApprove.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = orderApprove.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = orderApprove.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = orderApprove.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = orderApprove.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = orderApprove.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = orderApprove.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = orderApprove.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = orderApprove.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = orderApprove.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = orderApprove.fieldOf("recordVersion", Integer.class);


    public QOrderApprove() {
        super("OrderApprove", OrderApprove.class);
    }

    QOrderApprove(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "OrderApprove", OrderApprove.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return orderApproveId;
    }
}
