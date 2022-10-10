package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.BaseDictCode;

import java.lang.Integer;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QBaseDictCode extends BaseModelExpression<BaseDictCode, Integer> {

    public static final BaseModelExpression<BaseDictCode, Integer> baseDictCode = new QBaseDictCode();
    public static final FieldExpression<Integer> baseDictCodeId = baseDictCode.fieldOf("baseDictCodeId", Integer.class);
    public static final FieldExpression<Integer> baseDictTypeId = baseDictCode.fieldOf("baseDictTypeId", Integer.class);
    public static final FieldExpression<Integer> dictSort = baseDictCode.fieldOf("dictSort", Integer.class);
    public static final FieldExpression<String> dictCode = baseDictCode.fieldOf("dictCode", String.class);
    public static final FieldExpression<String> dictName = baseDictCode.fieldOf("dictName", String.class);
    public static final FieldExpression<String> remark = baseDictCode.fieldOf("remark", String.class);
    public static final FieldExpression<Integer> isValid = baseDictCode.fieldOf("isValid", Integer.class);
    public static final FieldExpression<Date> invalidTime = baseDictCode.fieldOf("invalidTime", Date.class);
    public static final FieldExpression<Integer> creatorId = baseDictCode.fieldOf("creatorId", Integer.class);
    public static final FieldExpression<String> creatorName = baseDictCode.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = baseDictCode.fieldOf("createTime", Date.class);
    public static final FieldExpression<Integer> createCompanyId = baseDictCode.fieldOf("createCompanyId", Integer.class);
    public static final FieldExpression<String> createCompanyName = baseDictCode.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Integer> modifierId = baseDictCode.fieldOf("modifierId", Integer.class);
    public static final FieldExpression<String> modifierName = baseDictCode.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = baseDictCode.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Integer> modifyCompanyId = baseDictCode.fieldOf("modifyCompanyId", Integer.class);
    public static final FieldExpression<String> modifyCompanyName = baseDictCode.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = baseDictCode.fieldOf("recordVersion", Integer.class);


    public QBaseDictCode() {
        super("BaseDictCode", BaseDictCode.class);
    }

    QBaseDictCode(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "BaseDictCode", BaseDictCode.class, alias);
    }

    @Override
    public OperatorExpression<Integer> primaryKey() {
        return baseDictCodeId;
    }
}
