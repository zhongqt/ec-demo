package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.CustomApi;

import java.lang.Boolean;
import java.lang.Byte;
import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QCustomApi extends BaseModelExpression<CustomApi, Long> {

    public static final BaseModelExpression<CustomApi, Long> customApi = new QCustomApi();
    public static final FieldExpression<Long> id = customApi.fieldOf("id", Long.class);
    public static final FieldExpression<Long> dataSourceId = customApi.fieldOf("dataSourceId", Long.class);
    public static final FieldExpression<String> apiKey = customApi.fieldOf("apiKey", String.class);
    public static final FieldExpression<String> customSql = customApi.fieldOf("customSql", String.class);
    public static final FieldExpression<Byte> apiType = customApi.fieldOf("apiType", Byte.class);
    public static final FieldExpression<String> modelList = customApi.fieldOf("modelList", String.class);
    public static final FieldExpression<String> parameterType = customApi.fieldOf("parameterType", String.class);
    public static final FieldExpression<String> remark = customApi.fieldOf("remark", String.class);
    public static final FieldExpression<String> creator = customApi.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = customApi.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = customApi.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = customApi.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Integer> version = customApi.fieldOf("version", Integer.class);
    public static final FieldExpression<Byte> destroyed = customApi.fieldOf("destroyed", Byte.class);
    public static final FieldExpression<Boolean> isAdvanced = customApi.fieldOf("isAdvanced", Boolean.class);
    public static final FieldExpression<String> projectKey = customApi.fieldOf("projectKey", String.class);


    public QCustomApi() {
        super("CustomApi", CustomApi.class);
    }

    QCustomApi(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "CustomApi", CustomApi.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
