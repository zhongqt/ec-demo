package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.BaseDictType;

import java.lang.Integer;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QBaseDictType extends BaseModelExpression<BaseDictType, Integer> {

    public static final BaseModelExpression<BaseDictType, Integer> baseDictType = new QBaseDictType();
    public static final FieldExpression<Integer> baseDictTypeId = baseDictType.fieldOf("baseDictTypeId", Integer.class);
    public static final FieldExpression<String> dictTypeCode = baseDictType.fieldOf("dictTypeCode", String.class);
    public static final FieldExpression<String> dictTypeName = baseDictType.fieldOf("dictTypeName", String.class);
    public static final FieldExpression<String> remark = baseDictType.fieldOf("remark", String.class);
    public static final FieldExpression<Integer> isValid = baseDictType.fieldOf("isValid", Integer.class);
    public static final FieldExpression<Date> invalidTime = baseDictType.fieldOf("invalidTime", Date.class);
    public static final FieldExpression<Integer> creatorId = baseDictType.fieldOf("creatorId", Integer.class);
    public static final FieldExpression<String> creatorName = baseDictType.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = baseDictType.fieldOf("createTime", Date.class);
    public static final FieldExpression<Integer> createCompanyId = baseDictType.fieldOf("createCompanyId", Integer.class);
    public static final FieldExpression<String> createCompanyName = baseDictType.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Integer> modifierId = baseDictType.fieldOf("modifierId", Integer.class);
    public static final FieldExpression<String> modifierName = baseDictType.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = baseDictType.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Integer> modifyCompanyId = baseDictType.fieldOf("modifyCompanyId", Integer.class);
    public static final FieldExpression<String> modifyCompanyName = baseDictType.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = baseDictType.fieldOf("recordVersion", Integer.class);


    public QBaseDictType() {
        super("BaseDictType", BaseDictType.class);
    }

    QBaseDictType(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "BaseDictType", BaseDictType.class, alias);
    }

    @Override
    public OperatorExpression<Integer> primaryKey() {
        return baseDictTypeId;
    }
}
