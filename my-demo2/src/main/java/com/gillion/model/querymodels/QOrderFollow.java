package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.OrderFollow;

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
public class QOrderFollow extends BaseModelExpression<OrderFollow, Long> {

    public static final BaseModelExpression<OrderFollow, Long> orderFollow = new QOrderFollow();
    public static final FieldExpression<Long> orderFollowId = orderFollow.fieldOf("orderFollowId", Long.class);
    public static final FieldExpression<Long> goOrderId = orderFollow.fieldOf("goOrderId", Long.class);
    public static final FieldExpression<String> userId = orderFollow.fieldOf("userId", String.class);
    public static final FieldExpression<Boolean> isFollow = orderFollow.fieldOf("isFollow", Boolean.class);
    public static final FieldExpression<String> creatorId = orderFollow.fieldOf("creatorId", String.class);
    public static final FieldExpression<String> creatorName = orderFollow.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = orderFollow.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> createCompanyId = orderFollow.fieldOf("createCompanyId", String.class);
    public static final FieldExpression<String> createCompanyName = orderFollow.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<String> modifierId = orderFollow.fieldOf("modifierId", String.class);
    public static final FieldExpression<String> modifierName = orderFollow.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = orderFollow.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<String> modifyCompanyId = orderFollow.fieldOf("modifyCompanyId", String.class);
    public static final FieldExpression<String> modifyCompanyName = orderFollow.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Boolean> isDeleted = orderFollow.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Integer> recordVersion = orderFollow.fieldOf("recordVersion", Integer.class);


    public QOrderFollow() {
        super("OrderFollow", OrderFollow.class);
    }

    QOrderFollow(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "OrderFollow", OrderFollow.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return orderFollowId;
    }
}
