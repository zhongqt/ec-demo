package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.AbcTask;

import java.lang.Boolean;
import java.lang.Integer;
import java.lang.Long;
import java.lang.String;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QAbcTask extends BaseModelExpression<AbcTask, Long> {

    public static final BaseModelExpression<AbcTask, Long> abcTask = new QAbcTask();
    public static final FieldExpression<Long> id = abcTask.fieldOf("id", Long.class);
    public static final FieldExpression<String> name = abcTask.fieldOf("name", String.class);
    public static final FieldExpression<Integer> keyId = abcTask.fieldOf("keyId", Integer.class);
    public static final FieldExpression<Integer> version = abcTask.fieldOf("version", Integer.class);
    public static final FieldExpression<Boolean> destroyed = abcTask.fieldOf("destroyed", Boolean.class);
    public static final FieldExpression<String> userAttribute = abcTask.fieldOf("userAttribute", String.class);


    public QAbcTask() {
        super("AbcTask", AbcTask.class);
    }

    QAbcTask(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "AbcTask", AbcTask.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
