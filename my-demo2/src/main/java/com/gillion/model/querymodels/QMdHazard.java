package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MdHazard;

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
public class QMdHazard extends BaseModelExpression<MdHazard, Long> {

    public static final BaseModelExpression<MdHazard, Long> mdHazard = new QMdHazard();
    public static final FieldExpression<Long> mdHazardId = mdHazard.fieldOf("mdHazardId", Long.class);
    public static final FieldExpression<String> hazardCode = mdHazard.fieldOf("hazardCode", String.class);
    public static final FieldExpression<String> hazardName = mdHazard.fieldOf("hazardName", String.class);
    public static final FieldExpression<String> hazardNameEn = mdHazard.fieldOf("hazardNameEn", String.class);
    public static final FieldExpression<String> remark = mdHazard.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isValid = mdHazard.fieldOf("isValid", Boolean.class);
    public static final FieldExpression<Boolean> isDeleted = mdHazard.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = mdHazard.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = mdHazard.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = mdHazard.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = mdHazard.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = mdHazard.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = mdHazard.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = mdHazard.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = mdHazard.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = mdHazard.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = mdHazard.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = mdHazard.fieldOf("recordVersion", Integer.class);


    public QMdHazard() {
        super("MdHazard", MdHazard.class);
    }

    QMdHazard(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MdHazard", MdHazard.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return mdHazardId;
    }
}
