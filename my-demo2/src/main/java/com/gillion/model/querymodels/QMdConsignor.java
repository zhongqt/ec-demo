package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MdConsignor;

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
public class QMdConsignor extends BaseModelExpression<MdConsignor, Long> {

    public static final BaseModelExpression<MdConsignor, Long> mdConsignor = new QMdConsignor();
    public static final FieldExpression<Long> mdConsignorId = mdConsignor.fieldOf("mdConsignorId", Long.class);
    public static final FieldExpression<String> consignorName = mdConsignor.fieldOf("consignorName", String.class);
    public static final FieldExpression<String> contactName = mdConsignor.fieldOf("contactName", String.class);
    public static final FieldExpression<String> contactTel = mdConsignor.fieldOf("contactTel", String.class);
    public static final FieldExpression<String> remark = mdConsignor.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isValid = mdConsignor.fieldOf("isValid", Boolean.class);
    public static final FieldExpression<Boolean> isDeleted = mdConsignor.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = mdConsignor.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = mdConsignor.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = mdConsignor.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = mdConsignor.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = mdConsignor.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = mdConsignor.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = mdConsignor.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = mdConsignor.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = mdConsignor.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = mdConsignor.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = mdConsignor.fieldOf("recordVersion", Integer.class);


    public QMdConsignor() {
        super("MdConsignor", MdConsignor.class);
    }

    QMdConsignor(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MdConsignor", MdConsignor.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return mdConsignorId;
    }
}
