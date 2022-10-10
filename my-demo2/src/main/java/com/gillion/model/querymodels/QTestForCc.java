package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.TestForCc;

import java.lang.Boolean;
import java.lang.Long;
import java.lang.Short;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QTestForCc extends BaseModelExpression<TestForCc, Long> {

    public static final BaseModelExpression<TestForCc, Long> testForCc = new QTestForCc();
    public static final FieldExpression<Long> id = testForCc.fieldOf("id", Long.class);
    public static final FieldExpression<String> name = testForCc.fieldOf("name", String.class);
    public static final FieldExpression<String> cname = testForCc.fieldOf("cname", String.class);
    public static final FieldExpression<String> password = testForCc.fieldOf("password", String.class);
    public static final FieldExpression<Short> age = testForCc.fieldOf("age", Short.class);
    public static final FieldExpression<Boolean> gender = testForCc.fieldOf("gender", Boolean.class);
    public static final FieldExpression<String> email = testForCc.fieldOf("email", String.class);
    public static final FieldExpression<String> mobile = testForCc.fieldOf("mobile", String.class);
    public static final FieldExpression<String> address = testForCc.fieldOf("address", String.class);
    public static final FieldExpression<Long> departmentId = testForCc.fieldOf("departmentId", Long.class);
    public static final FieldExpression<String> creator = testForCc.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = testForCc.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = testForCc.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> birthDay = testForCc.fieldOf("birthDay", Date.class);
    public static final FieldExpression<Date> modifyTime = testForCc.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> version = testForCc.fieldOf("version", Long.class);
    public static final FieldExpression<Boolean> destroyed = testForCc.fieldOf("destroyed", Boolean.class);
    public static final FieldExpression<String> principalGroupCode = testForCc.fieldOf("principalGroupCode", String.class);
    public static final FieldExpression<String> telephone = testForCc.fieldOf("telephone", String.class);
    public static final FieldExpression<String> updateId = testForCc.fieldOf("updateId", String.class);
    public static final FieldExpression<Date> updateTime = testForCc.fieldOf("updateTime", Date.class);


    public QTestForCc() {
        super("TestForCc", TestForCc.class);
    }

    QTestForCc(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "TestForCc", TestForCc.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
