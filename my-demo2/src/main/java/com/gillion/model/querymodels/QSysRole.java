package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.SysRole;

import java.lang.Byte;
import java.lang.Integer;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QSysRole extends BaseModelExpression<SysRole, Integer> {

    public static final BaseModelExpression<SysRole, Integer> sysRole = new QSysRole();
    public static final FieldExpression<Integer> roleId = sysRole.fieldOf("roleId", Integer.class);
    public static final FieldExpression<String> roleName = sysRole.fieldOf("roleName", String.class);
    public static final FieldExpression<Date> createTime = sysRole.fieldOf("createTime", Date.class);
    public static final FieldExpression<Integer> createrId = sysRole.fieldOf("createrId", Integer.class);
    public static final FieldExpression<Integer> partnerId = sysRole.fieldOf("partnerId", Integer.class);
    public static final FieldExpression<Byte> status = sysRole.fieldOf("status", Byte.class);
    public static final FieldExpression<String> roleNo = sysRole.fieldOf("roleNo", String.class);
    public static final FieldExpression<String> remark = sysRole.fieldOf("remark", String.class);
    public static final FieldExpression<Byte> deleteFlag = sysRole.fieldOf("deleteFlag", Byte.class);


    public QSysRole() {
        super("SysRole", SysRole.class);
    }

    QSysRole(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "SysRole", SysRole.class, alias);
    }

    @Override
    public OperatorExpression<Integer> primaryKey() {
        return roleId;
    }
}
