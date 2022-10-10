package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MdCustoms;

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
public class QMdCustoms extends BaseModelExpression<MdCustoms, Long> {

    public static final BaseModelExpression<MdCustoms, Long> mdCustoms = new QMdCustoms();
    public static final FieldExpression<Long> mdCustomsId = mdCustoms.fieldOf("mdCustomsId", Long.class);
    public static final FieldExpression<Long> mdCountryId = mdCustoms.fieldOf("mdCountryId", Long.class);
    public static final FieldExpression<Long> mdProvinceId = mdCustoms.fieldOf("mdProvinceId", Long.class);
    public static final FieldExpression<String> customsCode = mdCustoms.fieldOf("customsCode", String.class);
    public static final FieldExpression<String> customsName = mdCustoms.fieldOf("customsName", String.class);
    public static final FieldExpression<String> customsNameEn = mdCustoms.fieldOf("customsNameEn", String.class);
    public static final FieldExpression<String> countryCode = mdCustoms.fieldOf("countryCode", String.class);
    public static final FieldExpression<String> countryNameEn = mdCustoms.fieldOf("countryNameEn", String.class);
    public static final FieldExpression<String> countryNameCn = mdCustoms.fieldOf("countryNameCn", String.class);
    public static final FieldExpression<String> provinceCode = mdCustoms.fieldOf("provinceCode", String.class);
    public static final FieldExpression<String> provinceNameCn = mdCustoms.fieldOf("provinceNameCn", String.class);
    public static final FieldExpression<String> provinceNameEn = mdCustoms.fieldOf("provinceNameEn", String.class);
    public static final FieldExpression<String> remark = mdCustoms.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isValid = mdCustoms.fieldOf("isValid", Boolean.class);
    public static final FieldExpression<Boolean> isDeleted = mdCustoms.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = mdCustoms.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = mdCustoms.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = mdCustoms.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = mdCustoms.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = mdCustoms.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = mdCustoms.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = mdCustoms.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = mdCustoms.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = mdCustoms.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = mdCustoms.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = mdCustoms.fieldOf("recordVersion", Integer.class);


    public QMdCustoms() {
        super("MdCustoms", MdCustoms.class);
    }

    QMdCustoms(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MdCustoms", MdCustoms.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return mdCustomsId;
    }
}
