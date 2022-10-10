package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MdRailway;

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
public class QMdRailway extends BaseModelExpression<MdRailway, Long> {

    public static final BaseModelExpression<MdRailway, Long> mdRailway = new QMdRailway();
    public static final FieldExpression<Long> mdRailwayId = mdRailway.fieldOf("mdRailwayId", Long.class);
    public static final FieldExpression<Long> mdCountryId = mdRailway.fieldOf("mdCountryId", Long.class);
    public static final FieldExpression<String> railway6code = mdRailway.fieldOf("railway6code", String.class);
    public static final FieldExpression<String> railwayName = mdRailway.fieldOf("railwayName", String.class);
    public static final FieldExpression<String> railwayNameEn = mdRailway.fieldOf("railwayNameEn", String.class);
    public static final FieldExpression<String> countryCode = mdRailway.fieldOf("countryCode", String.class);
    public static final FieldExpression<String> remark = mdRailway.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isEdited = mdRailway.fieldOf("isEdited", Boolean.class);
    public static final FieldExpression<Boolean> isValid = mdRailway.fieldOf("isValid", Boolean.class);
    public static final FieldExpression<Boolean> isDeleted = mdRailway.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = mdRailway.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = mdRailway.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = mdRailway.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = mdRailway.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = mdRailway.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = mdRailway.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = mdRailway.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = mdRailway.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = mdRailway.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = mdRailway.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = mdRailway.fieldOf("recordVersion", Integer.class);


    public QMdRailway() {
        super("MdRailway", MdRailway.class);
    }

    QMdRailway(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MdRailway", MdRailway.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return mdRailwayId;
    }
}
