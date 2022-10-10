package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.DictProductInfo;

import java.lang.String;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QDictProductInfo extends BaseModelExpression<DictProductInfo, String> {

    public static final BaseModelExpression<DictProductInfo, String> dictProductInfo = new QDictProductInfo();
    public static final FieldExpression<String> productTypeCode = dictProductInfo.fieldOf("productTypeCode", String.class);
    public static final FieldExpression<String> productName = dictProductInfo.fieldOf("productName", String.class);


    public QDictProductInfo() {
        super("DictProductInfo", DictProductInfo.class);
    }

    QDictProductInfo(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "DictProductInfo", DictProductInfo.class, alias);
    }

    @Override
    public OperatorExpression<String> primaryKey() {
        return productTypeCode;
    }
}
