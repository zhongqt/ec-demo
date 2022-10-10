package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.PreOrderProcessLog;

import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QPreOrderProcessLog extends BaseModelExpression<PreOrderProcessLog, Long> {

    public static final BaseModelExpression<PreOrderProcessLog, Long> preOrderProcessLog = new QPreOrderProcessLog();
    public static final FieldExpression<Long> id = preOrderProcessLog.fieldOf("id", Long.class);
    public static final FieldExpression<Date> createTime = preOrderProcessLog.fieldOf("createTime", Date.class);
    public static final FieldExpression<Integer> status = preOrderProcessLog.fieldOf("status", Integer.class);
    public static final FieldExpression<String> txId = preOrderProcessLog.fieldOf("txId", String.class);


    public QPreOrderProcessLog() {
        super("PreOrderProcessLog", PreOrderProcessLog.class);
    }

    QPreOrderProcessLog(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "PreOrderProcessLog", PreOrderProcessLog.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
