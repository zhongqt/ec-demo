package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MdCounty;

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
public class QMdCounty extends BaseModelExpression<MdCounty, Long> {

    public static final BaseModelExpression<MdCounty, Long> mdCounty = new QMdCounty();
    public static final FieldExpression<Long> countyId = mdCounty.fieldOf("countyId", Long.class);
    public static final FieldExpression<Long> countryId = mdCounty.fieldOf("countryId", Long.class);
    public static final FieldExpression<Long> provinceId = mdCounty.fieldOf("provinceId", Long.class);
    public static final FieldExpression<Long> cityId = mdCounty.fieldOf("cityId", Long.class);
    public static final FieldExpression<String> countyCode = mdCounty.fieldOf("countyCode", String.class);
    public static final FieldExpression<String> countyNameCn = mdCounty.fieldOf("countyNameCn", String.class);
    public static final FieldExpression<String> countyNameEn = mdCounty.fieldOf("countyNameEn", String.class);
    public static final FieldExpression<String> cityCode = mdCounty.fieldOf("cityCode", String.class);
    public static final FieldExpression<String> cityNameCn = mdCounty.fieldOf("cityNameCn", String.class);
    public static final FieldExpression<String> cityNameEn = mdCounty.fieldOf("cityNameEn", String.class);
    public static final FieldExpression<String> countryCode = mdCounty.fieldOf("countryCode", String.class);
    public static final FieldExpression<String> countryNameCn = mdCounty.fieldOf("countryNameCn", String.class);
    public static final FieldExpression<String> countryNameEn = mdCounty.fieldOf("countryNameEn", String.class);
    public static final FieldExpression<String> provinceCode = mdCounty.fieldOf("provinceCode", String.class);
    public static final FieldExpression<String> provinceNameCn = mdCounty.fieldOf("provinceNameCn", String.class);
    public static final FieldExpression<String> provinceNameEn = mdCounty.fieldOf("provinceNameEn", String.class);
    public static final FieldExpression<String> remark = mdCounty.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isValid = mdCounty.fieldOf("isValid", Boolean.class);
    public static final FieldExpression<Boolean> isDeleted = mdCounty.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = mdCounty.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = mdCounty.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = mdCounty.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = mdCounty.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = mdCounty.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = mdCounty.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = mdCounty.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = mdCounty.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = mdCounty.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = mdCounty.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = mdCounty.fieldOf("recordVersion", Integer.class);


    public QMdCounty() {
        super("MdCounty", MdCounty.class);
    }

    QMdCounty(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MdCounty", MdCounty.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return countyId;
    }
}
