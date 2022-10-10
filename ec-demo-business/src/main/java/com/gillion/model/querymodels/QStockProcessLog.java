package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.StockProcessLog;

import java.lang.Integer;
import java.lang.Long;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QStockProcessLog extends BaseModelExpression<StockProcessLog, Long> {

    public static final BaseModelExpression<StockProcessLog, Long> stockProcessLog = new QStockProcessLog();
    public static final FieldExpression<Long> id = stockProcessLog.fieldOf("id", Long.class);
    public static final FieldExpression<Date> createTime = stockProcessLog.fieldOf("createTime", Date.class);
    public static final FieldExpression<Integer> status = stockProcessLog.fieldOf("status", Integer.class);
    public static final FieldExpression<Long> preOrderId = stockProcessLog.fieldOf("preOrderId", Long.class);


    public QStockProcessLog() {
        super("StockProcessLog", StockProcessLog.class);
    }

    QStockProcessLog(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "StockProcessLog", StockProcessLog.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
