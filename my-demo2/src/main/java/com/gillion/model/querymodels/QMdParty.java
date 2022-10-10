package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MdParty;

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
public class QMdParty extends BaseModelExpression<MdParty, Long> {

    public static final BaseModelExpression<MdParty, Long> mdParty = new QMdParty();
    public static final FieldExpression<Long> mdPartyId = mdParty.fieldOf("mdPartyId", Long.class);
    public static final FieldExpression<String> unitCode = mdParty.fieldOf("unitCode", String.class);
    public static final FieldExpression<String> unitName = mdParty.fieldOf("unitName", String.class);
    public static final FieldExpression<String> unitContacts = mdParty.fieldOf("unitContacts", String.class);
    public static final FieldExpression<String> countryCode = mdParty.fieldOf("countryCode", String.class);
    public static final FieldExpression<String> countryName = mdParty.fieldOf("countryName", String.class);
    public static final FieldExpression<String> provinceCode = mdParty.fieldOf("provinceCode", String.class);
    public static final FieldExpression<String> provinceName = mdParty.fieldOf("provinceName", String.class);
    public static final FieldExpression<String> cityCode = mdParty.fieldOf("cityCode", String.class);
    public static final FieldExpression<String> cityName = mdParty.fieldOf("cityName", String.class);
    public static final FieldExpression<String> unitNameSort = mdParty.fieldOf("unitNameSort", String.class);
    public static final FieldExpression<String> address = mdParty.fieldOf("address", String.class);
    public static final FieldExpression<String> phoneNumber = mdParty.fieldOf("phoneNumber", String.class);
    public static final FieldExpression<String> telphone = mdParty.fieldOf("telphone", String.class);
    public static final FieldExpression<String> eMail = mdParty.fieldOf("eMail", String.class);
    public static final FieldExpression<String> taxpayerIdentificationNumber = mdParty.fieldOf("taxpayerIdentificationNumber", String.class);
    public static final FieldExpression<String> invoiceTitle = mdParty.fieldOf("invoiceTitle", String.class);
    public static final FieldExpression<String> bankOfDeposit = mdParty.fieldOf("bankOfDeposit", String.class);
    public static final FieldExpression<String> accountNumber = mdParty.fieldOf("accountNumber", String.class);
    public static final FieldExpression<String> remark = mdParty.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isValid = mdParty.fieldOf("isValid", Boolean.class);
    public static final FieldExpression<Long> creatorId = mdParty.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = mdParty.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = mdParty.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = mdParty.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = mdParty.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = mdParty.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = mdParty.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = mdParty.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = mdParty.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = mdParty.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = mdParty.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<String> partyType = mdParty.fieldOf("partyType", String.class);


    public QMdParty() {
        super("MdParty", MdParty.class);
    }

    QMdParty(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MdParty", MdParty.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return mdPartyId;
    }
}
