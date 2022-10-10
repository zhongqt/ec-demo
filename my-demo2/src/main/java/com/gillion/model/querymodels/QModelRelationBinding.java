package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.ModelRelationBinding;

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
public class QModelRelationBinding extends BaseModelExpression<ModelRelationBinding, Long> {

    public static final BaseModelExpression<ModelRelationBinding, Long> modelRelationBinding = new QModelRelationBinding();
    public static final FieldExpression<Long> id = modelRelationBinding.fieldOf("id", Long.class);
    public static final FieldExpression<Long> modelRelationId = modelRelationBinding.fieldOf("modelRelationId", Long.class);
    public static final FieldExpression<Long> fromBindingMemberId = modelRelationBinding.fieldOf("fromBindingMemberId", Long.class);
    public static final FieldExpression<Long> toBindingMemberId = modelRelationBinding.fieldOf("toBindingMemberId", Long.class);
    public static final FieldExpression<Boolean> destroyed = modelRelationBinding.fieldOf("destroyed", Boolean.class);
    public static final FieldExpression<String> creator = modelRelationBinding.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = modelRelationBinding.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = modelRelationBinding.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = modelRelationBinding.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Integer> version = modelRelationBinding.fieldOf("version", Integer.class);
    public static final FieldExpression<String> fromBindingMemberFieldName = modelRelationBinding.fieldOf("fromBindingMemberFieldName", String.class);
    public static final FieldExpression<String> toBindingMemberFieldName = modelRelationBinding.fieldOf("toBindingMemberFieldName", String.class);


    public QModelRelationBinding() {
        super("ModelRelationBinding", ModelRelationBinding.class);
    }

    QModelRelationBinding(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "ModelRelationBinding", ModelRelationBinding.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
