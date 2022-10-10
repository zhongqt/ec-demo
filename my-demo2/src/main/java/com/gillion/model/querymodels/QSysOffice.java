package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.SysOffice;

import java.lang.Integer;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QSysOffice extends BaseModelExpression<SysOffice, Integer> {

    public static final BaseModelExpression<SysOffice, Integer> sysOffice = new QSysOffice();
    public static final FieldExpression<Integer> sysOfficeId = sysOffice.fieldOf("sysOfficeId", Integer.class);
    public static final FieldExpression<String> officeCode = sysOffice.fieldOf("officeCode", String.class);
    public static final FieldExpression<String> officeName = sysOffice.fieldOf("officeName", String.class);
    public static final FieldExpression<String> officeType = sysOffice.fieldOf("officeType", String.class);
    public static final FieldExpression<Integer> parentOfficeId = sysOffice.fieldOf("parentOfficeId", Integer.class);
    public static final FieldExpression<String> parentOfficeCode = sysOffice.fieldOf("parentOfficeCode", String.class);
    public static final FieldExpression<String> parentOfficeName = sysOffice.fieldOf("parentOfficeName", String.class);
    public static final FieldExpression<Integer> isValid = sysOffice.fieldOf("isValid", Integer.class);
    public static final FieldExpression<String> remark = sysOffice.fieldOf("remark", String.class);
    public static final FieldExpression<Integer> isDeleted = sysOffice.fieldOf("isDeleted", Integer.class);
    public static final FieldExpression<Integer> creatorId = sysOffice.fieldOf("creatorId", Integer.class);
    public static final FieldExpression<String> creatorName = sysOffice.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = sysOffice.fieldOf("createTime", Date.class);
    public static final FieldExpression<Integer> createCompanyId = sysOffice.fieldOf("createCompanyId", Integer.class);
    public static final FieldExpression<String> createCompanyName = sysOffice.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Integer> modifierId = sysOffice.fieldOf("modifierId", Integer.class);
    public static final FieldExpression<String> modifierName = sysOffice.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = sysOffice.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Integer> modifyCompanyId = sysOffice.fieldOf("modifyCompanyId", Integer.class);
    public static final FieldExpression<String> modifyCompanyName = sysOffice.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = sysOffice.fieldOf("recordVersion", Integer.class);


    public QSysOffice() {
        super("SysOffice", SysOffice.class);
    }

    QSysOffice(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "SysOffice", SysOffice.class, alias);
    }

    @Override
    public OperatorExpression<Integer> primaryKey() {
        return sysOfficeId;
    }
}
