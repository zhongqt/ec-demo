package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.ModelInfo;

import java.lang.Boolean;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QModelInfo extends BaseModelExpression<ModelInfo, Long> {

    public static final BaseModelExpression<ModelInfo, Long> modelInfo = new QModelInfo();
    public static final FieldExpression<Long> id = modelInfo.fieldOf("id", Long.class);
    public static final FieldExpression<Long> dataSourceId = modelInfo.fieldOf("dataSourceId", Long.class);
    public static final FieldExpression<String> modelName = modelInfo.fieldOf("modelName", String.class);
    public static final FieldExpression<String> tableName = modelInfo.fieldOf("tableName", String.class);
    public static final FieldExpression<Boolean> isGlobalLocked = modelInfo.fieldOf("isGlobalLocked", Boolean.class);
    public static final FieldExpression<Boolean> isPrimaryModel = modelInfo.fieldOf("isPrimaryModel", Boolean.class);
    public static final FieldExpression<Boolean> destroyed = modelInfo.fieldOf("destroyed", Boolean.class);
    public static final FieldExpression<String> tableComment = modelInfo.fieldOf("tableComment", String.class);
    public static final FieldExpression<String> creator = modelInfo.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = modelInfo.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = modelInfo.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = modelInfo.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> version = modelInfo.fieldOf("version", Long.class);
    public static final FieldExpression<String> projectKey = modelInfo.fieldOf("projectKey", String.class);


    public QModelInfo() {
        super("ModelInfo", ModelInfo.class);
    }

    QModelInfo(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "ModelInfo", ModelInfo.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
