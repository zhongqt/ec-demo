package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MdFocusParty;

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
public class QMdFocusParty extends BaseModelExpression<MdFocusParty, Long> {

    public static final BaseModelExpression<MdFocusParty, Long> mdFocusParty = new QMdFocusParty();
    public static final FieldExpression<Long> mdFocusPartyId = mdFocusParty.fieldOf("mdFocusPartyId", Long.class);
    public static final FieldExpression<String> unitCode = mdFocusParty.fieldOf("unitCode", String.class);
    public static final FieldExpression<String> unitName = mdFocusParty.fieldOf("unitName", String.class);
    public static final FieldExpression<String> unitNameSort = mdFocusParty.fieldOf("unitNameSort", String.class);
    public static final FieldExpression<String> unitContacts = mdFocusParty.fieldOf("unitContacts", String.class);
    public static final FieldExpression<String> countryCode = mdFocusParty.fieldOf("countryCode", String.class);
    public static final FieldExpression<String> countryName = mdFocusParty.fieldOf("countryName", String.class);
    public static final FieldExpression<String> provinceCode = mdFocusParty.fieldOf("provinceCode", String.class);
    public static final FieldExpression<String> provinceName = mdFocusParty.fieldOf("provinceName", String.class);
    public static final FieldExpression<String> cityCode = mdFocusParty.fieldOf("cityCode", String.class);
    public static final FieldExpression<String> cityName = mdFocusParty.fieldOf("cityName", String.class);
    public static final FieldExpression<String> address = mdFocusParty.fieldOf("address", String.class);
    public static final FieldExpression<String> phoneNumber = mdFocusParty.fieldOf("phoneNumber", String.class);
    public static final FieldExpression<String> telphone = mdFocusParty.fieldOf("telphone", String.class);
    public static final FieldExpression<String> eMail = mdFocusParty.fieldOf("eMail", String.class);
    public static final FieldExpression<String> taxpayerIdentificationNumber = mdFocusParty.fieldOf("taxpayerIdentificationNumber", String.class);
    public static final FieldExpression<String> invoiceTitle = mdFocusParty.fieldOf("invoiceTitle", String.class);
    public static final FieldExpression<String> bankOfDeposit = mdFocusParty.fieldOf("bankOfDeposit", String.class);
    public static final FieldExpression<String> accountNumber = mdFocusParty.fieldOf("accountNumber", String.class);
    public static final FieldExpression<String> partyType = mdFocusParty.fieldOf("partyType", String.class);
    public static final FieldExpression<String> remark = mdFocusParty.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isValid = mdFocusParty.fieldOf("isValid", Boolean.class);
    public static final FieldExpression<Long> creatorId = mdFocusParty.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = mdFocusParty.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = mdFocusParty.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = mdFocusParty.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = mdFocusParty.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = mdFocusParty.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = mdFocusParty.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = mdFocusParty.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = mdFocusParty.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = mdFocusParty.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = mdFocusParty.fieldOf("recordVersion", Integer.class);


    public QMdFocusParty() {
        super("MdFocusParty", MdFocusParty.class);
    }

    QMdFocusParty(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MdFocusParty", MdFocusParty.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return mdFocusPartyId;
    }
}
