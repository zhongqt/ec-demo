package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.RoleAcl;

import java.lang.Byte;
import java.lang.Integer;
import java.lang.String;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QRoleAcl extends BaseModelExpression<RoleAcl, Integer> {

    public static final BaseModelExpression<RoleAcl, Integer> roleAcl = new QRoleAcl();
    public static final FieldExpression<Integer> roleAclId = roleAcl.fieldOf("roleAclId", Integer.class);
    public static final FieldExpression<Integer> roleId = roleAcl.fieldOf("roleId", Integer.class);
    public static final FieldExpression<Integer> aclTableId = roleAcl.fieldOf("aclTableId", Integer.class);
    public static final FieldExpression<String> conditions = roleAcl.fieldOf("conditions", String.class);
    public static final FieldExpression<String> conditionSql = roleAcl.fieldOf("conditionSql", String.class);
    public static final FieldExpression<Byte> crudType = roleAcl.fieldOf("crudType", Byte.class);


    public QRoleAcl() {
        super("RoleAcl", RoleAcl.class);
    }

    QRoleAcl(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "RoleAcl", RoleAcl.class, alias);
    }

    @Override
    public OperatorExpression<Integer> primaryKey() {
        return roleAclId;
    }
}
