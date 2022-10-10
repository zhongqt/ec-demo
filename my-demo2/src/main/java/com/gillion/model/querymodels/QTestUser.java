package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.TestUser;

import java.lang.Byte;
import java.lang.Integer;
import java.lang.Long;
import java.lang.String;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QTestUser extends BaseModelExpression<TestUser, Long> {

    public static final BaseModelExpression<TestUser, Long> testUser = new QTestUser();
    public static final FieldExpression<Long> id = testUser.fieldOf("id", Long.class);
    public static final FieldExpression<String> username = testUser.fieldOf("username", String.class);
    public static final FieldExpression<String> password = testUser.fieldOf("password", String.class);
    public static final FieldExpression<Integer> age = testUser.fieldOf("age", Integer.class);
    public static final FieldExpression<Byte> sex = testUser.fieldOf("sex", Byte.class);
    public static final FieldExpression<String> mobile = testUser.fieldOf("mobile", String.class);
    public static final FieldExpression<Long> deptId = testUser.fieldOf("deptId", Long.class);


    public QTestUser() {
        super("TestUser", TestUser.class);
    }

    QTestUser(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "TestUser", TestUser.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
