package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.IntermediateModel;

import java.lang.Long;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QIntermediateModel extends BaseModelExpression<IntermediateModel, Long> {

    public static final BaseModelExpression<IntermediateModel, Long> intermediateModel = new QIntermediateModel();
    public static final FieldExpression<Long> id = intermediateModel.fieldOf("id", Long.class);
    public static final FieldExpression<Long> modelInfoId = intermediateModel.fieldOf("modelInfoId", Long.class);
    public static final FieldExpression<Long> fromModelMemberId = intermediateModel.fieldOf("fromModelMemberId", Long.class);
    public static final FieldExpression<Long> toModelMemberId = intermediateModel.fieldOf("toModelMemberId", Long.class);


    public QIntermediateModel() {
        super("IntermediateModel", IntermediateModel.class);
    }

    QIntermediateModel(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "IntermediateModel", IntermediateModel.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
