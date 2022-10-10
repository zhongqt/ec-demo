package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.SysOfficeUser;

import java.lang.Integer;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QSysOfficeUser extends BaseModelExpression<SysOfficeUser, Integer> {

    public static final BaseModelExpression<SysOfficeUser, Integer> sysOfficeUser = new QSysOfficeUser();
    public static final FieldExpression<Integer> sysOfficeUserId = sysOfficeUser.fieldOf("sysOfficeUserId", Integer.class);
    public static final FieldExpression<Integer> sysUserId = sysOfficeUser.fieldOf("sysUserId", Integer.class);
    public static final FieldExpression<Integer> sysOfficeId = sysOfficeUser.fieldOf("sysOfficeId", Integer.class);
    public static final FieldExpression<Integer> isDeleted = sysOfficeUser.fieldOf("isDeleted", Integer.class);
    public static final FieldExpression<Integer> creatorId = sysOfficeUser.fieldOf("creatorId", Integer.class);
    public static final FieldExpression<String> creatorName = sysOfficeUser.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = sysOfficeUser.fieldOf("createTime", Date.class);
    public static final FieldExpression<Integer> createCompanyId = sysOfficeUser.fieldOf("createCompanyId", Integer.class);
    public static final FieldExpression<String> createCompanyName = sysOfficeUser.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Integer> modifierId = sysOfficeUser.fieldOf("modifierId", Integer.class);
    public static final FieldExpression<String> modifierName = sysOfficeUser.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = sysOfficeUser.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Integer> modifyCompanyId = sysOfficeUser.fieldOf("modifyCompanyId", Integer.class);
    public static final FieldExpression<String> modifyCompanyName = sysOfficeUser.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = sysOfficeUser.fieldOf("recordVersion", Integer.class);


    public QSysOfficeUser() {
        super("SysOfficeUser", SysOfficeUser.class);
    }

    QSysOfficeUser(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "SysOfficeUser", SysOfficeUser.class, alias);
    }

    @Override
    public OperatorExpression<Integer> primaryKey() {
        return sysOfficeUserId;
    }
}
