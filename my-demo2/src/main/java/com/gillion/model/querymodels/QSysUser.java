package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.SysUser;

import java.lang.Byte;
import java.lang.Integer;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QSysUser extends BaseModelExpression<SysUser, Integer> {

    public static final BaseModelExpression<SysUser, Integer> sysUser = new QSysUser();
    public static final FieldExpression<Integer> userId = sysUser.fieldOf("userId", Integer.class);
    public static final FieldExpression<String> username = sysUser.fieldOf("username", String.class);
    public static final FieldExpression<String> password = sysUser.fieldOf("password", String.class);
    public static final FieldExpression<Integer> partnerId = sysUser.fieldOf("partnerId", Integer.class);
    public static final FieldExpression<Byte> userType = sysUser.fieldOf("userType", Byte.class);
    public static final FieldExpression<Date> createTime = sysUser.fieldOf("createTime", Date.class);
    public static final FieldExpression<Byte> status = sysUser.fieldOf("status", Byte.class);
    public static final FieldExpression<String> nickName = sysUser.fieldOf("nickName", String.class);
    public static final FieldExpression<Integer> createrId = sysUser.fieldOf("createrId", Integer.class);
    public static final FieldExpression<String> mobile = sysUser.fieldOf("mobile", String.class);
    public static final FieldExpression<Byte> deleteFlg = sysUser.fieldOf("deleteFlg", Byte.class);
    public static final FieldExpression<Integer> departmentId = sysUser.fieldOf("departmentId", Integer.class);
    public static final FieldExpression<String> userFullName = sysUser.fieldOf("userFullName", String.class);
    public static final FieldExpression<String> email = sysUser.fieldOf("email", String.class);
    public static final FieldExpression<String> userNo = sysUser.fieldOf("userNo", String.class);
    public static final FieldExpression<String> remark = sysUser.fieldOf("remark", String.class);
    public static final FieldExpression<String> companyName = sysUser.fieldOf("companyName", String.class);
    public static final FieldExpression<String> companyAddress = sysUser.fieldOf("companyAddress", String.class);
    public static final FieldExpression<Integer> age = sysUser.fieldOf("age", Integer.class);
    public static final FieldExpression<String> sex = sysUser.fieldOf("sex", String.class);
    public static final FieldExpression<String> roleId = sysUser.fieldOf("roleId", String.class);
    public static final FieldExpression<String> version = sysUser.fieldOf("version", String.class);


    public QSysUser() {
        super("SysUser", SysUser.class);
    }

    QSysUser(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "SysUser", SysUser.class, alias);
    }

    @Override
    public OperatorExpression<Integer> primaryKey() {
        return userId;
    }
}
