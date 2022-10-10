package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.SqlFunction;

import java.lang.Long;
import java.lang.String;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QSqlFunction extends BaseModelExpression<SqlFunction, Long> {

    public static final BaseModelExpression<SqlFunction, Long> sqlFunction = new QSqlFunction();
    public static final FieldExpression<Long> id = sqlFunction.fieldOf("id", Long.class);
    public static final FieldExpression<String> name = sqlFunction.fieldOf("name", String.class);
    public static final FieldExpression<String> parameterType = sqlFunction.fieldOf("parameterType", String.class);
    public static final FieldExpression<String> resultType = sqlFunction.fieldOf("resultType", String.class);


    public QSqlFunction() {
        super("SqlFunction", SqlFunction.class);
    }

    QSqlFunction(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "SqlFunction", SqlFunction.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
