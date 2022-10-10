package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.DsUser;

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
public class QDsUser extends BaseModelExpression<DsUser, Long> {

    public static final BaseModelExpression<DsUser, Long> dsUser = new QDsUser();
    public static final FieldExpression<Long> id = dsUser.fieldOf("id", Long.class);
    public static final FieldExpression<String> username = dsUser.fieldOf("username", String.class);
    public static final FieldExpression<String> password = dsUser.fieldOf("password", String.class);
    public static final FieldExpression<String> email = dsUser.fieldOf("email", String.class);
    public static final FieldExpression<String> creator = dsUser.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = dsUser.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = dsUser.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = dsUser.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Integer> version = dsUser.fieldOf("version", Integer.class);
    public static final FieldExpression<Boolean> destroyed = dsUser.fieldOf("destroyed", Boolean.class);


    public QDsUser() {
        super("DsUser", DsUser.class);
    }

    QDsUser(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "DsUser", DsUser.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
