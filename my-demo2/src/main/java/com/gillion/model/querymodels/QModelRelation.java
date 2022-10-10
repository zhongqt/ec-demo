package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.ModelRelation;

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
public class QModelRelation extends BaseModelExpression<ModelRelation, Long> {

    public static final BaseModelExpression<ModelRelation, Long> modelRelation = new QModelRelation();
    public static final FieldExpression<Long> id = modelRelation.fieldOf("id", Long.class);
    public static final FieldExpression<Integer> relationType = modelRelation.fieldOf("relationType", Integer.class);
    public static final FieldExpression<Long> fromModelId = modelRelation.fieldOf("fromModelId", Long.class);
    public static final FieldExpression<Long> toModelId = modelRelation.fieldOf("toModelId", Long.class);
    public static final FieldExpression<Boolean> isCascadeDestroy = modelRelation.fieldOf("isCascadeDestroy", Boolean.class);
    public static final FieldExpression<Boolean> isInnerJoin = modelRelation.fieldOf("isInnerJoin", Boolean.class);
    public static final FieldExpression<Long> intermediateModelId = modelRelation.fieldOf("intermediateModelId", Long.class);
    public static final FieldExpression<String> atFromModelAlias = modelRelation.fieldOf("atFromModelAlias", String.class);
    public static final FieldExpression<String> creator = modelRelation.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = modelRelation.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = modelRelation.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = modelRelation.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> version = modelRelation.fieldOf("version", Long.class);
    public static final FieldExpression<Boolean> destroyed = modelRelation.fieldOf("destroyed", Boolean.class);
    public static final FieldExpression<String> fromModelName = modelRelation.fieldOf("fromModelName", String.class);
    public static final FieldExpression<String> toModelName = modelRelation.fieldOf("toModelName", String.class);
    public static final FieldExpression<Long> dataSourceId = modelRelation.fieldOf("dataSourceId", Long.class);
    public static final FieldExpression<String> crossServiceCode = modelRelation.fieldOf("crossServiceCode", String.class);
    public static final FieldExpression<String> crossSchemaName = modelRelation.fieldOf("crossSchemaName", String.class);


    public QModelRelation() {
        super("ModelRelation", ModelRelation.class);
    }

    QModelRelation(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "ModelRelation", ModelRelation.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
