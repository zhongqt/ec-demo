package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.ChangeConfig;

import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QChangeConfig extends BaseModelExpression<ChangeConfig, Long> {

    public static final BaseModelExpression<ChangeConfig, Long> changeConfig = new QChangeConfig();
    public static final FieldExpression<Long> id = changeConfig.fieldOf("id", Long.class);
    public static final FieldExpression<Long> dataSourceId = changeConfig.fieldOf("dataSourceId", Long.class);
    public static final FieldExpression<String> modelName = changeConfig.fieldOf("modelName", String.class);
    public static final FieldExpression<String> changeField = changeConfig.fieldOf("changeField", String.class);
    public static final FieldExpression<String> creator = changeConfig.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = changeConfig.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = changeConfig.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = changeConfig.fieldOf("modifyTime", Date.class);


    public QChangeConfig() {
        super("ChangeConfig", ChangeConfig.class);
    }

    QChangeConfig(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "ChangeConfig", ChangeConfig.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
