package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.SqlHistoryReject;

import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QSqlHistoryReject extends BaseModelExpression<SqlHistoryReject, Long> {

    public static final BaseModelExpression<SqlHistoryReject, Long> sqlHistoryReject = new QSqlHistoryReject();
    public static final FieldExpression<Long> id = sqlHistoryReject.fieldOf("id", Long.class);
    public static final FieldExpression<Long> dataSourceId = sqlHistoryReject.fieldOf("dataSourceId", Long.class);
    public static final FieldExpression<String> sqlHash = sqlHistoryReject.fieldOf("sqlHash", String.class);
    public static final FieldExpression<String> sqlStmt = sqlHistoryReject.fieldOf("sqlStmt", String.class);
    public static final FieldExpression<String> sqlTag = sqlHistoryReject.fieldOf("sqlTag", String.class);
    public static final FieldExpression<String> projectKey = sqlHistoryReject.fieldOf("projectKey", String.class);
    public static final FieldExpression<Date> rejectDatetime = sqlHistoryReject.fieldOf("rejectDatetime", Date.class);


    public QSqlHistoryReject() {
        super("SqlHistoryReject", SqlHistoryReject.class);
    }

    QSqlHistoryReject(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "SqlHistoryReject", SqlHistoryReject.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
