package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.BaseArea;

import java.lang.Integer;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QBaseArea extends BaseModelExpression<BaseArea, Integer> {

    public static final BaseModelExpression<BaseArea, Integer> baseArea = new QBaseArea();
    public static final FieldExpression<Integer> baseAreaId = baseArea.fieldOf("baseAreaId", Integer.class);
    public static final FieldExpression<String> areaCode = baseArea.fieldOf("areaCode", String.class);
    public static final FieldExpression<String> areaName = baseArea.fieldOf("areaName", String.class);
    public static final FieldExpression<String> areaLevel = baseArea.fieldOf("areaLevel", String.class);
    public static final FieldExpression<Integer> parentAreaId = baseArea.fieldOf("parentAreaId", Integer.class);
    public static final FieldExpression<String> areaNameEn = baseArea.fieldOf("areaNameEn", String.class);
    public static final FieldExpression<String> postalCode = baseArea.fieldOf("postalCode", String.class);
    public static final FieldExpression<Integer> isValid = baseArea.fieldOf("isValid", Integer.class);
    public static final FieldExpression<String> remark = baseArea.fieldOf("remark", String.class);
    public static final FieldExpression<Integer> isDeleted = baseArea.fieldOf("isDeleted", Integer.class);
    public static final FieldExpression<Integer> creatorId = baseArea.fieldOf("creatorId", Integer.class);
    public static final FieldExpression<String> creatorName = baseArea.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = baseArea.fieldOf("createTime", Date.class);
    public static final FieldExpression<Integer> createCompanyId = baseArea.fieldOf("createCompanyId", Integer.class);
    public static final FieldExpression<String> createCompanyName = baseArea.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Integer> modifierId = baseArea.fieldOf("modifierId", Integer.class);
    public static final FieldExpression<String> modifierName = baseArea.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = baseArea.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Integer> modifyCompanyId = baseArea.fieldOf("modifyCompanyId", Integer.class);
    public static final FieldExpression<String> modifyCompanyName = baseArea.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = baseArea.fieldOf("recordVersion", Integer.class);


    public QBaseArea() {
        super("BaseArea", BaseArea.class);
    }

    QBaseArea(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "BaseArea", BaseArea.class, alias);
    }

    @Override
    public OperatorExpression<Integer> primaryKey() {
        return baseAreaId;
    }
}
