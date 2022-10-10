package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MdAirport;

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
public class QMdAirport extends BaseModelExpression<MdAirport, Long> {

    public static final BaseModelExpression<MdAirport, Long> mdAirport = new QMdAirport();
    public static final FieldExpression<Long> mdAirportId = mdAirport.fieldOf("mdAirportId", Long.class);
    public static final FieldExpression<Long> mdCountryId = mdAirport.fieldOf("mdCountryId", Long.class);
    public static final FieldExpression<String> airport3code = mdAirport.fieldOf("airport3code", String.class);
    public static final FieldExpression<String> airportName = mdAirport.fieldOf("airportName", String.class);
    public static final FieldExpression<String> airportNameEn = mdAirport.fieldOf("airportNameEn", String.class);
    public static final FieldExpression<String> countryCode = mdAirport.fieldOf("countryCode", String.class);
    public static final FieldExpression<String> remark = mdAirport.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isEdited = mdAirport.fieldOf("isEdited", Boolean.class);
    public static final FieldExpression<Boolean> isValid = mdAirport.fieldOf("isValid", Boolean.class);
    public static final FieldExpression<Boolean> isDeleted = mdAirport.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = mdAirport.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = mdAirport.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = mdAirport.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = mdAirport.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = mdAirport.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = mdAirport.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = mdAirport.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = mdAirport.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = mdAirport.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = mdAirport.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = mdAirport.fieldOf("recordVersion", Integer.class);


    public QMdAirport() {
        super("MdAirport", MdAirport.class);
    }

    QMdAirport(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MdAirport", MdAirport.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return mdAirportId;
    }
}
