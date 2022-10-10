package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.AreaCode;

import java.lang.Integer;
import java.lang.String;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QAreaCode extends BaseModelExpression<AreaCode, Integer> {

    public static final BaseModelExpression<AreaCode, Integer> areaCode = new QAreaCode();
    public static final FieldExpression<Integer> areaCodeId = areaCode.fieldOf("areaCodeId", Integer.class);
    public static final FieldExpression<String> areaCodeName = areaCode.fieldOf("areaCodeName", String.class);


    public QAreaCode() {
        super("AreaCode", AreaCode.class);
    }

    QAreaCode(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "AreaCode", AreaCode.class, alias);
    }

    @Override
    public OperatorExpression<Integer> primaryKey() {
        return areaCodeId;
    }
}
