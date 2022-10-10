package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.SysRoleUser;

import java.lang.Integer;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QSysRoleUser extends BaseModelExpression<SysRoleUser, Integer> {

    public static final BaseModelExpression<SysRoleUser, Integer> sysRoleUser = new QSysRoleUser();
    public static final FieldExpression<Integer> roleUserId = sysRoleUser.fieldOf("roleUserId", Integer.class);
    public static final FieldExpression<Integer> roleId = sysRoleUser.fieldOf("roleId", Integer.class);
    public static final FieldExpression<Integer> userId = sysRoleUser.fieldOf("userId", Integer.class);
    public static final FieldExpression<Date> createTime = sysRoleUser.fieldOf("createTime", Date.class);
    public static final FieldExpression<Integer> createrId = sysRoleUser.fieldOf("createrId", Integer.class);
    public static final FieldExpression<Date> updateTime = sysRoleUser.fieldOf("updateTime", Date.class);
    public static final FieldExpression<Integer> updaterId = sysRoleUser.fieldOf("updaterId", Integer.class);


    public QSysRoleUser() {
        super("SysRoleUser", SysRoleUser.class);
    }

    QSysRoleUser(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "SysRoleUser", SysRoleUser.class, alias);
    }

    @Override
    public OperatorExpression<Integer> primaryKey() {
        return roleUserId;
    }
}
