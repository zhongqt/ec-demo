package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.AbcKey;

import java.lang.Boolean;
import java.lang.Integer;
import java.lang.String;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QAbcKey extends BaseModelExpression<AbcKey, Integer> {

    public static final BaseModelExpression<AbcKey, Integer> abcKey = new QAbcKey();
    public static final FieldExpression<Integer> id = abcKey.fieldOf("id", Integer.class);
    public static final FieldExpression<String> keyName = abcKey.fieldOf("keyName", String.class);
    public static final FieldExpression<Integer> version = abcKey.fieldOf("version", Integer.class);
    public static final FieldExpression<Boolean> destroyed = abcKey.fieldOf("destroyed", Boolean.class);
    public static final FieldExpression<String> userAttribute = abcKey.fieldOf("userAttribute", String.class);


    public QAbcKey() {
        super("AbcKey", AbcKey.class);
    }

    QAbcKey(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "AbcKey", AbcKey.class, alias);
    }

    @Override
    public OperatorExpression<Integer> primaryKey() {
        return id;
    }
}
