package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MdGlobalBusiness;

import java.lang.String;
import java.math.BigDecimal;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QMdGlobalBusiness extends BaseModelExpression<MdGlobalBusiness, BigDecimal> {

    public static final BaseModelExpression<MdGlobalBusiness, BigDecimal> mdGlobalBusiness = new QMdGlobalBusiness();
    public static final FieldExpression<BigDecimal> mdSubBusinessGlobalId = mdGlobalBusiness.fieldOf("mdSubBusinessGlobalId", BigDecimal.class);
    public static final FieldExpression<String> subBusinessGlobalCode = mdGlobalBusiness.fieldOf("subBusinessGlobalCode", String.class);
    public static final FieldExpression<String> subBusinessGlobalName = mdGlobalBusiness.fieldOf("subBusinessGlobalName", String.class);
    public static final FieldExpression<String> active = mdGlobalBusiness.fieldOf("active", String.class);
    public static final FieldExpression<String> isDeleted = mdGlobalBusiness.fieldOf("isDeleted", String.class);
    public static final FieldExpression<String> remark = mdGlobalBusiness.fieldOf("remark", String.class);
    public static final FieldExpression<String> creator = mdGlobalBusiness.fieldOf("creator", String.class);
    public static final FieldExpression<String> createOffice = mdGlobalBusiness.fieldOf("createOffice", String.class);
    public static final FieldExpression<String> createTime = mdGlobalBusiness.fieldOf("createTime", String.class);
    public static final FieldExpression<String> createTimeZone = mdGlobalBusiness.fieldOf("createTimeZone", String.class);
    public static final FieldExpression<String> lastModifyor = mdGlobalBusiness.fieldOf("lastModifyor", String.class);
    public static final FieldExpression<String> lastModifyOffice = mdGlobalBusiness.fieldOf("lastModifyOffice", String.class);
    public static final FieldExpression<String> lastModifyTime = mdGlobalBusiness.fieldOf("lastModifyTime", String.class);
    public static final FieldExpression<String> lastModifyTimeZone = mdGlobalBusiness.fieldOf("lastModifyTimeZone", String.class);
    public static final FieldExpression<String> principalGroupCode = mdGlobalBusiness.fieldOf("principalGroupCode", String.class);
    public static final FieldExpression<BigDecimal> recordVersion = mdGlobalBusiness.fieldOf("recordVersion", BigDecimal.class);
    public static final FieldExpression<String> isTaxFree = mdGlobalBusiness.fieldOf("isTaxFree", String.class);


    public QMdGlobalBusiness() {
        super("MdGlobalBusiness", MdGlobalBusiness.class);
    }

    QMdGlobalBusiness(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MdGlobalBusiness", MdGlobalBusiness.class, alias);
    }

    @Override
    public OperatorExpression<BigDecimal> primaryKey() {
        return mdSubBusinessGlobalId;
    }
}
