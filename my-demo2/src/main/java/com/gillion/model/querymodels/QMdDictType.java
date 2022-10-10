package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MdDictType;

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
public class QMdDictType extends BaseModelExpression<MdDictType, Long> {

    public static final BaseModelExpression<MdDictType, Long> mdDictType = new QMdDictType();
    public static final FieldExpression<Long> mdDictTypeId = mdDictType.fieldOf("mdDictTypeId", Long.class);
    public static final FieldExpression<String> dictTypeCode = mdDictType.fieldOf("dictTypeCode", String.class);
    public static final FieldExpression<String> dictTypeName = mdDictType.fieldOf("dictTypeName", String.class);
    public static final FieldExpression<String> typeId = mdDictType.fieldOf("typeId", String.class);
    public static final FieldExpression<String> dictTypeDescription = mdDictType.fieldOf("dictTypeDescription", String.class);
    public static final FieldExpression<Boolean> isValid = mdDictType.fieldOf("isValid", Boolean.class);
    public static final FieldExpression<Boolean> isDeleted = mdDictType.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = mdDictType.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = mdDictType.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = mdDictType.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = mdDictType.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = mdDictType.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = mdDictType.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = mdDictType.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = mdDictType.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = mdDictType.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = mdDictType.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = mdDictType.fieldOf("recordVersion", Integer.class);


    public QMdDictType() {
        super("MdDictType", MdDictType.class);
    }

    QMdDictType(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MdDictType", MdDictType.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return mdDictTypeId;
    }
}
