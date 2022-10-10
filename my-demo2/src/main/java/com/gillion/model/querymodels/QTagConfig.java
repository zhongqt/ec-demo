package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.TagConfig;

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
public class QTagConfig extends BaseModelExpression<TagConfig, Long> {

    public static final BaseModelExpression<TagConfig, Long> tagConfig = new QTagConfig();
    public static final FieldExpression<Long> id = tagConfig.fieldOf("id", Long.class);
    public static final FieldExpression<Long> projectId = tagConfig.fieldOf("projectId", Long.class);
    public static final FieldExpression<String> tag = tagConfig.fieldOf("tag", String.class);
    public static final FieldExpression<Byte> databaseType = tagConfig.fieldOf("databaseType", Byte.class);
    public static final FieldExpression<String> dataSourceName = tagConfig.fieldOf("dataSourceName", String.class);
    public static final FieldExpression<String> creator = tagConfig.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = tagConfig.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = tagConfig.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = tagConfig.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Integer> version = tagConfig.fieldOf("version", Integer.class);
    public static final FieldExpression<Byte> destroyed = tagConfig.fieldOf("destroyed", Byte.class);
    public static final FieldExpression<String> projectKey = tagConfig.fieldOf("projectKey", String.class);


    public QTagConfig() {
        super("TagConfig", TagConfig.class);
    }

    QTagConfig(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "TagConfig", TagConfig.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
