package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MdDictCode;

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
public class QMdDictCode extends BaseModelExpression<MdDictCode, Long> {

    public static final BaseModelExpression<MdDictCode, Long> mdDictCode = new QMdDictCode();
    public static final FieldExpression<Long> mdDictCodeId = mdDictCode.fieldOf("mdDictCodeId", Long.class);
    public static final FieldExpression<Long> mdDictTypeId = mdDictCode.fieldOf("mdDictTypeId", Long.class);
    public static final FieldExpression<String> dictTypeCode = mdDictCode.fieldOf("dictTypeCode", String.class);
    public static final FieldExpression<String> dictCode = mdDictCode.fieldOf("dictCode", String.class);
    public static final FieldExpression<String> dictName = mdDictCode.fieldOf("dictName", String.class);
    public static final FieldExpression<String> dictNameEn = mdDictCode.fieldOf("dictNameEn", String.class);
    public static final FieldExpression<String> remark = mdDictCode.fieldOf("remark", String.class);
    public static final FieldExpression<String> relateValue = mdDictCode.fieldOf("relateValue", String.class);
    public static final FieldExpression<Boolean> isValid = mdDictCode.fieldOf("isValid", Boolean.class);
    public static final FieldExpression<Boolean> isDeleted = mdDictCode.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = mdDictCode.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = mdDictCode.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = mdDictCode.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = mdDictCode.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = mdDictCode.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = mdDictCode.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = mdDictCode.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = mdDictCode.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = mdDictCode.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = mdDictCode.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = mdDictCode.fieldOf("recordVersion", Integer.class);


    public QMdDictCode() {
        super("MdDictCode", MdDictCode.class);
    }

    QMdDictCode(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MdDictCode", MdDictCode.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return mdDictCodeId;
    }
}
