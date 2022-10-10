package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.DsDictSource;

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
public class QDsDictSource extends BaseModelExpression<DsDictSource, Long> {

    public static final BaseModelExpression<DsDictSource, Long> dsDictSource = new QDsDictSource();
    public static final FieldExpression<Long> dictSourceId = dsDictSource.fieldOf("dictSourceId", Long.class);
    public static final FieldExpression<String> dictName = dsDictSource.fieldOf("dictName", String.class);
    public static final FieldExpression<Long> dataSourceId = dsDictSource.fieldOf("dataSourceId", Long.class);
    public static final FieldExpression<String> querySql = dsDictSource.fieldOf("querySql", String.class);
    public static final FieldExpression<String> modelName = dsDictSource.fieldOf("modelName", String.class);
    public static final FieldExpression<String> mainCacheKey = dsDictSource.fieldOf("mainCacheKey", String.class);
    public static final FieldExpression<Long> mainCacheExpirMs = dsDictSource.fieldOf("mainCacheExpirMs", Long.class);
    public static final FieldExpression<Integer> version = dsDictSource.fieldOf("version", Integer.class);
    public static final FieldExpression<String> secondCacheProperties = dsDictSource.fieldOf("secondCacheProperties", String.class);
    public static final FieldExpression<String> creator = dsDictSource.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = dsDictSource.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = dsDictSource.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = dsDictSource.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Boolean> destroyed = dsDictSource.fieldOf("destroyed", Boolean.class);
    public static final FieldExpression<String> projectKey = dsDictSource.fieldOf("projectKey", String.class);


    public QDsDictSource() {
        super("DsDictSource", DsDictSource.class);
    }

    QDsDictSource(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "DsDictSource", DsDictSource.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return dictSourceId;
    }
}
