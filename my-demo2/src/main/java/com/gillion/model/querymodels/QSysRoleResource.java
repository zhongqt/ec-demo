package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.SysRoleResource;

import java.lang.Byte;
import java.lang.Integer;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QSysRoleResource extends BaseModelExpression<SysRoleResource, Integer> {

    public static final BaseModelExpression<SysRoleResource, Integer> sysRoleResource = new QSysRoleResource();
    public static final FieldExpression<Integer> roleResourcesId = sysRoleResource.fieldOf("roleResourcesId", Integer.class);
    public static final FieldExpression<Integer> resourceId = sysRoleResource.fieldOf("resourceId", Integer.class);
    public static final FieldExpression<Integer> roleId = sysRoleResource.fieldOf("roleId", Integer.class);
    public static final FieldExpression<Byte> deleteFlg = sysRoleResource.fieldOf("deleteFlg", Byte.class);
    public static final FieldExpression<Integer> createrId = sysRoleResource.fieldOf("createrId", Integer.class);
    public static final FieldExpression<Date> createTime = sysRoleResource.fieldOf("createTime", Date.class);
    public static final FieldExpression<Date> updateTime = sysRoleResource.fieldOf("updateTime", Date.class);
    public static final FieldExpression<Integer> updaterId = sysRoleResource.fieldOf("updaterId", Integer.class);


    public QSysRoleResource() {
        super("SysRoleResource", SysRoleResource.class);
    }

    QSysRoleResource(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "SysRoleResource", SysRoleResource.class, alias);
    }

    @Override
    public OperatorExpression<Integer> primaryKey() {
        return roleResourcesId;
    }
}
