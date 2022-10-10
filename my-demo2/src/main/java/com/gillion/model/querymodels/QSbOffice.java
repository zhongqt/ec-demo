package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.SbOffice;

import java.lang.String;
import java.math.BigDecimal;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QSbOffice extends BaseModelExpression<SbOffice, String> {

    public static final BaseModelExpression<SbOffice, String> sbOffice = new QSbOffice();
    public static final FieldExpression<String> officeId = sbOffice.fieldOf("officeId", String.class);
    public static final FieldExpression<String> officeCode = sbOffice.fieldOf("officeCode", String.class);
    public static final FieldExpression<String> companyId = sbOffice.fieldOf("companyId", String.class);
    public static final FieldExpression<String> custId = sbOffice.fieldOf("custId", String.class);
    public static final FieldExpression<String> officeType = sbOffice.fieldOf("officeType", String.class);
    public static final FieldExpression<String> functionType = sbOffice.fieldOf("functionType", String.class);
    public static final FieldExpression<String> address = sbOffice.fieldOf("address", String.class);
    public static final FieldExpression<String> blContent = sbOffice.fieldOf("blContent", String.class);
    public static final FieldExpression<String> homeCurrency = sbOffice.fieldOf("homeCurrency", String.class);
    public static final FieldExpression<String> xchgrName = sbOffice.fieldOf("xchgrName", String.class);
    public static final FieldExpression<String> language = sbOffice.fieldOf("language", String.class);
    public static final FieldExpression<String> superiorOfficeId = sbOffice.fieldOf("superiorOfficeId", String.class);
    public static final FieldExpression<BigDecimal> autoInternal = sbOffice.fieldOf("autoInternal", BigDecimal.class);
    public static final FieldExpression<BigDecimal> active = sbOffice.fieldOf("active", BigDecimal.class);
    public static final FieldExpression<BigDecimal> deleted = sbOffice.fieldOf("deleted", BigDecimal.class);
    public static final FieldExpression<String> officeName = sbOffice.fieldOf("officeName", String.class);
    public static final FieldExpression<String> officeNativeName = sbOffice.fieldOf("officeNativeName", String.class);
    public static final FieldExpression<String> tel = sbOffice.fieldOf("tel", String.class);
    public static final FieldExpression<String> fax = sbOffice.fieldOf("fax", String.class);
    public static final FieldExpression<String> inputUser = sbOffice.fieldOf("inputUser", String.class);
    public static final FieldExpression<String> inputUserName = sbOffice.fieldOf("inputUserName", String.class);
    public static final FieldExpression<String> inputOffice = sbOffice.fieldOf("inputOffice", String.class);
    public static final FieldExpression<BigDecimal> useSystem = sbOffice.fieldOf("useSystem", BigDecimal.class);
    public static final FieldExpression<String> countryId = sbOffice.fieldOf("countryId", String.class);
    public static final FieldExpression<String> settleOffice = sbOffice.fieldOf("settleOffice", String.class);
    public static final FieldExpression<String> taxRegisterNo = sbOffice.fieldOf("taxRegisterNo", String.class);
    public static final FieldExpression<String> businessRegisterNo = sbOffice.fieldOf("businessRegisterNo", String.class);
    public static final FieldExpression<String> abbrev = sbOffice.fieldOf("abbrev", String.class);
    public static final FieldExpression<String> email = sbOffice.fieldOf("email", String.class);
    public static final FieldExpression<String> cityId = sbOffice.fieldOf("cityId", String.class);
    public static final FieldExpression<String> contactId = sbOffice.fieldOf("contactId", String.class);
    public static final FieldExpression<BigDecimal> isDept = sbOffice.fieldOf("isDept", BigDecimal.class);
    public static final FieldExpression<String> officeRelactionTag = sbOffice.fieldOf("officeRelactionTag", String.class);
    public static final FieldExpression<BigDecimal> isCustomer = sbOffice.fieldOf("isCustomer", BigDecimal.class);
    public static final FieldExpression<BigDecimal> isInternal = sbOffice.fieldOf("isInternal", BigDecimal.class);
    public static final FieldExpression<String> cityName = sbOffice.fieldOf("cityName", String.class);
    public static final FieldExpression<BigDecimal> isSettlementObj = sbOffice.fieldOf("isSettlementObj", BigDecimal.class);
    public static final FieldExpression<String> zsjOfficeId = sbOffice.fieldOf("zsjOfficeId", String.class);
    public static final FieldExpression<String> zsjEntityEmpty = sbOffice.fieldOf("zsjEntityEmpty", String.class);
    public static final FieldExpression<String> zsjOfficeSid = sbOffice.fieldOf("zsjOfficeSid", String.class);
    public static final FieldExpression<Date> modifyLastTime = sbOffice.fieldOf("modifyLastTime", Date.class);


    public QSbOffice() {
        super("SbOffice", SbOffice.class);
    }

    QSbOffice(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "SbOffice", SbOffice.class, alias);
    }

    @Override
    public OperatorExpression<String> primaryKey() {
        return officeId;
    }
}
