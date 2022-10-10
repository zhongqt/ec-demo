package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.SqlHistory;

import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QSqlHistory extends BaseModelExpression<SqlHistory, Long> {

    public static final BaseModelExpression<SqlHistory, Long> sqlHistory = new QSqlHistory();
    public static final FieldExpression<Long> id = sqlHistory.fieldOf("id", Long.class);
    public static final FieldExpression<Long> dataSourceId = sqlHistory.fieldOf("dataSourceId", Long.class);
    public static final FieldExpression<String> sqlHash = sqlHistory.fieldOf("sqlHash", String.class);
    public static final FieldExpression<String> sqlStmt = sqlHistory.fieldOf("sqlStmt", String.class);
    public static final FieldExpression<String> sqlTag = sqlHistory.fieldOf("sqlTag", String.class);
    public static final FieldExpression<Long> statisticsCount = sqlHistory.fieldOf("statisticsCount", Long.class);
    public static final FieldExpression<Long> totalUseTime = sqlHistory.fieldOf("totalUseTime", Long.class);
    public static final FieldExpression<Integer> maxUseTime = sqlHistory.fieldOf("maxUseTime", Integer.class);
    public static final FieldExpression<Integer> minUseTime = sqlHistory.fieldOf("minUseTime", Integer.class);
    public static final FieldExpression<Date> statisticsStartDatetime = sqlHistory.fieldOf("statisticsStartDatetime", Date.class);
    public static final FieldExpression<Date> statisticsEndDatetime = sqlHistory.fieldOf("statisticsEndDatetime", Date.class);
    public static final FieldExpression<String> projectKey = sqlHistory.fieldOf("projectKey", String.class);
    public static final FieldExpression<Long> maxFetchCount = sqlHistory.fieldOf("maxFetchCount", Long.class);
    public static final FieldExpression<Long> totalFetchCount = sqlHistory.fieldOf("totalFetchCount", Long.class);


    public QSqlHistory() {
        super("SqlHistory", SqlHistory.class);
    }

    QSqlHistory(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "SqlHistory", SqlHistory.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
