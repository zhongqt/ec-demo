package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.DsModelPermission;

import java.lang.Boolean;
import java.lang.Byte;
import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QDsModelPermission extends BaseModelExpression<DsModelPermission, Long> {

    public static final BaseModelExpression<DsModelPermission, Long> dsModelPermission = new QDsModelPermission();
    public static final FieldExpression<Long> modelPermissionId = dsModelPermission.fieldOf("modelPermissionId", Long.class);
    public static final FieldExpression<Long> dataSourceId = dsModelPermission.fieldOf("dataSourceId", Long.class);
    public static final FieldExpression<Long> modelId = dsModelPermission.fieldOf("modelId", Long.class);
    public static final FieldExpression<String> modelName = dsModelPermission.fieldOf("modelName", String.class);
    public static final FieldExpression<Integer> permissionValue = dsModelPermission.fieldOf("permissionValue", Integer.class);
    public static final FieldExpression<Byte> permissionType = dsModelPermission.fieldOf("permissionType", Byte.class);
    public static final FieldExpression<Boolean> isAllow = dsModelPermission.fieldOf("isAllow", Boolean.class);
    public static final FieldExpression<String> creator = dsModelPermission.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = dsModelPermission.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = dsModelPermission.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = dsModelPermission.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Integer> version = dsModelPermission.fieldOf("version", Integer.class);
    public static final FieldExpression<Boolean> destroyed = dsModelPermission.fieldOf("destroyed", Boolean.class);
    public static final FieldExpression<String> projectKey = dsModelPermission.fieldOf("projectKey", String.class);


    public QDsModelPermission() {
        super("DsModelPermission", DsModelPermission.class);
    }

    QDsModelPermission(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "DsModelPermission", DsModelPermission.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return modelPermissionId;
    }
}
