package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.TestData;

import java.lang.Byte;
import java.lang.Integer;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QTestData extends BaseModelExpression<TestData, Integer> {

    public static final BaseModelExpression<TestData, Integer> testData = new QTestData();
    public static final FieldExpression<Integer> id = testData.fieldOf("id", Integer.class);
    public static final FieldExpression<String> testFiled = testData.fieldOf("testFiled", String.class);
    public static final FieldExpression<String> typeTest = testData.fieldOf("typeTest", String.class);
    public static final FieldExpression<Date> createTime = testData.fieldOf("createTime", Date.class);
    public static final FieldExpression<Date> updateTime = testData.fieldOf("updateTime", Date.class);
    public static final FieldExpression<Byte> isDelete = testData.fieldOf("isDelete", Byte.class);
    public static final FieldExpression<String> userName = testData.fieldOf("userName", String.class);


    public QTestData() {
        super("TestData", TestData.class);
    }

    QTestData(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "TestData", TestData.class, alias);
    }

    @Override
    public OperatorExpression<Integer> primaryKey() {
        return id;
    }
}
