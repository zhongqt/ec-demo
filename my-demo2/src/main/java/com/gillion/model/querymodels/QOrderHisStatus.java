package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.OrderHisStatus;

import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QOrderHisStatus extends BaseModelExpression<OrderHisStatus, Long> {

    public static final BaseModelExpression<OrderHisStatus, Long> orderHisStatus = new QOrderHisStatus();
    public static final FieldExpression<Long> orderHisStatusId = orderHisStatus.fieldOf("orderHisStatusId", Long.class);
    public static final FieldExpression<Long> goOrderId = orderHisStatus.fieldOf("goOrderId", Long.class);
    public static final FieldExpression<String> companyId = orderHisStatus.fieldOf("companyId", String.class);
    public static final FieldExpression<String> statusCode = orderHisStatus.fieldOf("statusCode", String.class);
    public static final FieldExpression<String> statusName = orderHisStatus.fieldOf("statusName", String.class);
    public static final FieldExpression<Date> statusTime = orderHisStatus.fieldOf("statusTime", Date.class);
    public static final FieldExpression<String> statusType = orderHisStatus.fieldOf("statusType", String.class);
    public static final FieldExpression<String> remark = orderHisStatus.fieldOf("remark", String.class);
    public static final FieldExpression<Long> creatorId = orderHisStatus.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = orderHisStatus.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = orderHisStatus.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = orderHisStatus.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = orderHisStatus.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = orderHisStatus.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<String> linkCode = orderHisStatus.fieldOf("linkCode", String.class);
    public static final FieldExpression<String> linkName = orderHisStatus.fieldOf("linkName", String.class);


    public QOrderHisStatus() {
        super("OrderHisStatus", OrderHisStatus.class);
    }

    QOrderHisStatus(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "OrderHisStatus", OrderHisStatus.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return orderHisStatusId;
    }
}
