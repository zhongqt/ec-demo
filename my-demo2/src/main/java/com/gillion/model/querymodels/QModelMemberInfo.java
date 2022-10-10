package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.ModelMemberInfo;

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
public class QModelMemberInfo extends BaseModelExpression<ModelMemberInfo, Long> {

    public static final BaseModelExpression<ModelMemberInfo, Long> modelMemberInfo = new QModelMemberInfo();
    public static final FieldExpression<Long> id = modelMemberInfo.fieldOf("id", Long.class);
    public static final FieldExpression<Long> modelId = modelMemberInfo.fieldOf("modelId", Long.class);
    public static final FieldExpression<String> fieldName = modelMemberInfo.fieldOf("fieldName", String.class);
    public static final FieldExpression<String> columnName = modelMemberInfo.fieldOf("columnName", String.class);
    public static final FieldExpression<String> columnComment = modelMemberInfo.fieldOf("columnComment", String.class);
    public static final FieldExpression<Integer> jdbcType = modelMemberInfo.fieldOf("jdbcType", Integer.class);
    public static final FieldExpression<Integer> columnLength = modelMemberInfo.fieldOf("columnLength", Integer.class);
    public static final FieldExpression<Byte> columnScale = modelMemberInfo.fieldOf("columnScale", Byte.class);
    public static final FieldExpression<String> javaTypeName = modelMemberInfo.fieldOf("javaTypeName", String.class);
    public static final FieldExpression<Integer> commonFieldType = modelMemberInfo.fieldOf("commonFieldType", Integer.class);
    public static final FieldExpression<Byte> additionalMark = modelMemberInfo.fieldOf("additionalMark", Byte.class);
    public static final FieldExpression<String> creator = modelMemberInfo.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = modelMemberInfo.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = modelMemberInfo.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = modelMemberInfo.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> version = modelMemberInfo.fieldOf("version", Long.class);
    public static final FieldExpression<Boolean> destroyed = modelMemberInfo.fieldOf("destroyed", Boolean.class);


    public QModelMemberInfo() {
        super("ModelMemberInfo", ModelMemberInfo.class);
    }

    QModelMemberInfo(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "ModelMemberInfo", ModelMemberInfo.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
