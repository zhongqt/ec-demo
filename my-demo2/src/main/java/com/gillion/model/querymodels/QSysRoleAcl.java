package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.SysRoleAcl;

import java.lang.Byte;
import java.lang.Integer;
import java.lang.String;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QSysRoleAcl extends BaseModelExpression<SysRoleAcl, Integer> {

    public static final BaseModelExpression<SysRoleAcl, Integer> sysRoleAcl = new QSysRoleAcl();
    public static final FieldExpression<Integer> roleAclId = sysRoleAcl.fieldOf("roleAclId", Integer.class);
    public static final FieldExpression<Integer> roleId = sysRoleAcl.fieldOf("roleId", Integer.class);
    public static final FieldExpression<Integer> aclTableId = sysRoleAcl.fieldOf("aclTableId", Integer.class);
    public static final FieldExpression<String> conditions = sysRoleAcl.fieldOf("conditions", String.class);
    public static final FieldExpression<String> conditionSql = sysRoleAcl.fieldOf("conditionSql", String.class);
    public static final FieldExpression<Byte> crudType = sysRoleAcl.fieldOf("crudType", Byte.class);


    public QSysRoleAcl() {
        super("SysRoleAcl", SysRoleAcl.class);
    }

    QSysRoleAcl(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "SysRoleAcl", SysRoleAcl.class, alias);
    }

    @Override
    public OperatorExpression<Integer> primaryKey() {
        return roleAclId;
    }
}
