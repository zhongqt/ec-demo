package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MdShipsCode;

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
public class QMdShipsCode extends BaseModelExpression<MdShipsCode, Long> {

    public static final BaseModelExpression<MdShipsCode, Long> mdShipsCode = new QMdShipsCode();
    public static final FieldExpression<Long> mdShipsCodeId = mdShipsCode.fieldOf("mdShipsCodeId", Long.class);
    public static final FieldExpression<String> shipsCode = mdShipsCode.fieldOf("shipsCode", String.class);
    public static final FieldExpression<String> shipsName = mdShipsCode.fieldOf("shipsName", String.class);
    public static final FieldExpression<String> shipsNameEn = mdShipsCode.fieldOf("shipsNameEn", String.class);
    public static final FieldExpression<String> remark = mdShipsCode.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isValid = mdShipsCode.fieldOf("isValid", Boolean.class);
    public static final FieldExpression<Boolean> isDeleted = mdShipsCode.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = mdShipsCode.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = mdShipsCode.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = mdShipsCode.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = mdShipsCode.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = mdShipsCode.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = mdShipsCode.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = mdShipsCode.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = mdShipsCode.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = mdShipsCode.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = mdShipsCode.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = mdShipsCode.fieldOf("recordVersion", Integer.class);


    public QMdShipsCode() {
        super("MdShipsCode", MdShipsCode.class);
    }

    QMdShipsCode(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MdShipsCode", MdShipsCode.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return mdShipsCodeId;
    }
}
