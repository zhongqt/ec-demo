package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.DsValidationGroup;

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
public class QDsValidationGroup extends BaseModelExpression<DsValidationGroup, Long> {

    public static final BaseModelExpression<DsValidationGroup, Long> dsValidationGroup = new QDsValidationGroup();
    public static final FieldExpression<Long> validationGroupId = dsValidationGroup.fieldOf("validationGroupId", Long.class);
    public static final FieldExpression<String> validationGroupName = dsValidationGroup.fieldOf("validationGroupName", String.class);
    public static final FieldExpression<Long> dataSourceId = dsValidationGroup.fieldOf("dataSourceId", Long.class);
    public static final FieldExpression<Long> mainModelInfoId = dsValidationGroup.fieldOf("mainModelInfoId", Long.class);
    public static final FieldExpression<String> mainModelName = dsValidationGroup.fieldOf("mainModelName", String.class);
    public static final FieldExpression<String> dataSourceName = dsValidationGroup.fieldOf("dataSourceName", String.class);
    public static final FieldExpression<Boolean> isFromView = dsValidationGroup.fieldOf("isFromView", Boolean.class);
    public static final FieldExpression<String> projectKey = dsValidationGroup.fieldOf("projectKey", String.class);
    public static final FieldExpression<Boolean> destroyed = dsValidationGroup.fieldOf("destroyed", Boolean.class);
    public static final FieldExpression<String> creator = dsValidationGroup.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = dsValidationGroup.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = dsValidationGroup.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = dsValidationGroup.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Integer> version = dsValidationGroup.fieldOf("version", Integer.class);


    public QDsValidationGroup() {
        super("DsValidationGroup", DsValidationGroup.class);
    }

    QDsValidationGroup(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "DsValidationGroup", DsValidationGroup.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return validationGroupId;
    }
}
