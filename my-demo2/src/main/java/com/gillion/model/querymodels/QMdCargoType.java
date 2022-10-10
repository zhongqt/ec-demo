package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MdCargoType;

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
public class QMdCargoType extends BaseModelExpression<MdCargoType, Long> {

    public static final BaseModelExpression<MdCargoType, Long> mdCargoType = new QMdCargoType();
    public static final FieldExpression<Long> mdCargoTypeId = mdCargoType.fieldOf("mdCargoTypeId", Long.class);
    public static final FieldExpression<String> cargoTypeCode = mdCargoType.fieldOf("cargoTypeCode", String.class);
    public static final FieldExpression<String> cargoTypeName = mdCargoType.fieldOf("cargoTypeName", String.class);
    public static final FieldExpression<String> cargoTypeNameEn = mdCargoType.fieldOf("cargoTypeNameEn", String.class);
    public static final FieldExpression<String> remark = mdCargoType.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isValid = mdCargoType.fieldOf("isValid", Boolean.class);
    public static final FieldExpression<Boolean> isDeleted = mdCargoType.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = mdCargoType.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = mdCargoType.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = mdCargoType.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = mdCargoType.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = mdCargoType.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = mdCargoType.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = mdCargoType.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = mdCargoType.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = mdCargoType.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = mdCargoType.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = mdCargoType.fieldOf("recordVersion", Integer.class);


    public QMdCargoType() {
        super("MdCargoType", MdCargoType.class);
    }

    QMdCargoType(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MdCargoType", MdCargoType.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return mdCargoTypeId;
    }
}
