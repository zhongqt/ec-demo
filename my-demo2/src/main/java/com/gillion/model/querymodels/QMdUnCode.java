package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MdUnCode;

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
public class QMdUnCode extends BaseModelExpression<MdUnCode, Long> {

    public static final BaseModelExpression<MdUnCode, Long> mdUnCode = new QMdUnCode();
    public static final FieldExpression<Long> mdUnCodeId = mdUnCode.fieldOf("mdUnCodeId", Long.class);
    public static final FieldExpression<Long> mdHazardId = mdUnCode.fieldOf("mdHazardId", Long.class);
    public static final FieldExpression<String> unCode = mdUnCode.fieldOf("unCode", String.class);
    public static final FieldExpression<String> unCategory = mdUnCode.fieldOf("unCategory", String.class);
    public static final FieldExpression<String> unCnCode = mdUnCode.fieldOf("unCnCode", String.class);
    public static final FieldExpression<String> unName = mdUnCode.fieldOf("unName", String.class);
    public static final FieldExpression<String> unNameEn = mdUnCode.fieldOf("unNameEn", String.class);
    public static final FieldExpression<String> remark = mdUnCode.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isValid = mdUnCode.fieldOf("isValid", Boolean.class);
    public static final FieldExpression<Boolean> isDeleted = mdUnCode.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = mdUnCode.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = mdUnCode.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = mdUnCode.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = mdUnCode.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = mdUnCode.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = mdUnCode.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = mdUnCode.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = mdUnCode.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = mdUnCode.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = mdUnCode.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = mdUnCode.fieldOf("recordVersion", Integer.class);


    public QMdUnCode() {
        super("MdUnCode", MdUnCode.class);
    }

    QMdUnCode(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MdUnCode", MdUnCode.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return mdUnCodeId;
    }
}
