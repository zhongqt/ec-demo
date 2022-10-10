package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MdAirlinesCode;

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
public class QMdAirlinesCode extends BaseModelExpression<MdAirlinesCode, Long> {

    public static final BaseModelExpression<MdAirlinesCode, Long> mdAirlinesCode = new QMdAirlinesCode();
    public static final FieldExpression<Long> mdAirlinesCodeId = mdAirlinesCode.fieldOf("mdAirlinesCodeId", Long.class);
    public static final FieldExpression<String> airlinesCode = mdAirlinesCode.fieldOf("airlinesCode", String.class);
    public static final FieldExpression<String> airlinesName = mdAirlinesCode.fieldOf("airlinesName", String.class);
    public static final FieldExpression<String> airlinesNameEn = mdAirlinesCode.fieldOf("airlinesNameEn", String.class);
    public static final FieldExpression<String> waybillPrefix = mdAirlinesCode.fieldOf("waybillPrefix", String.class);
    public static final FieldExpression<String> remark = mdAirlinesCode.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isValid = mdAirlinesCode.fieldOf("isValid", Boolean.class);
    public static final FieldExpression<Boolean> isDeleted = mdAirlinesCode.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = mdAirlinesCode.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = mdAirlinesCode.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = mdAirlinesCode.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = mdAirlinesCode.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = mdAirlinesCode.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = mdAirlinesCode.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = mdAirlinesCode.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = mdAirlinesCode.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = mdAirlinesCode.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = mdAirlinesCode.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = mdAirlinesCode.fieldOf("recordVersion", Integer.class);


    public QMdAirlinesCode() {
        super("MdAirlinesCode", MdAirlinesCode.class);
    }

    QMdAirlinesCode(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MdAirlinesCode", MdAirlinesCode.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return mdAirlinesCodeId;
    }
}
