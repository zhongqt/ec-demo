package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.SysResourceRel;

import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QSysResourceRel extends BaseModelExpression<SysResourceRel, String> {

    public static final BaseModelExpression<SysResourceRel, String> sysResourceRel = new QSysResourceRel();
    public static final FieldExpression<String> resourceRelId = sysResourceRel.fieldOf("resourceRelId", String.class);
    public static final FieldExpression<String> resourceId = sysResourceRel.fieldOf("resourceId", String.class);
    public static final FieldExpression<String> parentResourceId = sysResourceRel.fieldOf("parentResourceId", String.class);
    public static final FieldExpression<String> createdByUser = sysResourceRel.fieldOf("createdByUser", String.class);
    public static final FieldExpression<Date> createdDtmLoc = sysResourceRel.fieldOf("createdDtmLoc", Date.class);
    public static final FieldExpression<String> updatedByUser = sysResourceRel.fieldOf("updatedByUser", String.class);
    public static final FieldExpression<Date> updatedDtmLoc = sysResourceRel.fieldOf("updatedDtmLoc", Date.class);


    public QSysResourceRel() {
        super("SysResourceRel", SysResourceRel.class);
    }

    QSysResourceRel(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "SysResourceRel", SysResourceRel.class, alias);
    }

    @Override
    public OperatorExpression<String> primaryKey() {
        return resourceRelId;
    }
}
