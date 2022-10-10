package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MdPortUat;

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
public class QMdPortUat extends BaseModelExpression<MdPortUat, Long> {

    public static final BaseModelExpression<MdPortUat, Long> mdPortUat = new QMdPortUat();
    public static final FieldExpression<Long> mdPortId = mdPortUat.fieldOf("mdPortId", Long.class);
    public static final FieldExpression<Long> mdCountryId = mdPortUat.fieldOf("mdCountryId", Long.class);
    public static final FieldExpression<String> port5code = mdPortUat.fieldOf("port5code", String.class);
    public static final FieldExpression<String> portName = mdPortUat.fieldOf("portName", String.class);
    public static final FieldExpression<String> portNameEn = mdPortUat.fieldOf("portNameEn", String.class);
    public static final FieldExpression<String> countryCode = mdPortUat.fieldOf("countryCode", String.class);
    public static final FieldExpression<Boolean> isEdited = mdPortUat.fieldOf("isEdited", Boolean.class);
    public static final FieldExpression<String> remark = mdPortUat.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isValid = mdPortUat.fieldOf("isValid", Boolean.class);
    public static final FieldExpression<Boolean> isDeleted = mdPortUat.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = mdPortUat.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = mdPortUat.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = mdPortUat.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = mdPortUat.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = mdPortUat.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = mdPortUat.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = mdPortUat.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = mdPortUat.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = mdPortUat.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = mdPortUat.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = mdPortUat.fieldOf("recordVersion", Integer.class);


    public QMdPortUat() {
        super("MdPortUat", MdPortUat.class);
    }

    QMdPortUat(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MdPortUat", MdPortUat.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return mdPortId;
    }
}
