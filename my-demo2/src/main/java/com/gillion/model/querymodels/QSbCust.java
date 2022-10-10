package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.SbCust;

import java.lang.String;
import java.math.BigDecimal;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QSbCust extends BaseModelExpression<SbCust, String> {

    public static final BaseModelExpression<SbCust, String> sbCust = new QSbCust();
    public static final FieldExpression<String> custId = sbCust.fieldOf("custId", String.class);
    public static final FieldExpression<String> ledgerCode = sbCust.fieldOf("ledgerCode", String.class);
    public static final FieldExpression<String> ediCode = sbCust.fieldOf("ediCode", String.class);
    public static final FieldExpression<String> taxRegisterNo = sbCust.fieldOf("taxRegisterNo", String.class);
    public static final FieldExpression<String> custAlias = sbCust.fieldOf("custAlias", String.class);
    public static final FieldExpression<String> superiorId = sbCust.fieldOf("superiorId", String.class);
    public static final FieldExpression<String> superiorName = sbCust.fieldOf("superiorName", String.class);
    public static final FieldExpression<BigDecimal> custType = sbCust.fieldOf("custType", BigDecimal.class);
    public static final FieldExpression<String> blContent = sbCust.fieldOf("blContent", String.class);
    public static final FieldExpression<String> customsNo = sbCust.fieldOf("customsNo", String.class);
    public static final FieldExpression<String> custName = sbCust.fieldOf("custName", String.class);
    public static final FieldExpression<String> addr = sbCust.fieldOf("addr", String.class);
    public static final FieldExpression<String> custNameNative = sbCust.fieldOf("custNameNative", String.class);
    public static final FieldExpression<String> addrNative = sbCust.fieldOf("addrNative", String.class);
    public static final FieldExpression<String> zip = sbCust.fieldOf("zip", String.class);
    public static final FieldExpression<String> invAddr = sbCust.fieldOf("invAddr", String.class);
    public static final FieldExpression<String> invTitle = sbCust.fieldOf("invTitle", String.class);
    public static final FieldExpression<String> dueType = sbCust.fieldOf("dueType", String.class);
    public static final FieldExpression<BigDecimal> creditDays = sbCust.fieldOf("creditDays", BigDecimal.class);
    public static final FieldExpression<BigDecimal> creditAmt = sbCust.fieldOf("creditAmt", BigDecimal.class);
    public static final FieldExpression<String> creditType = sbCust.fieldOf("creditType", String.class);
    public static final FieldExpression<Date> startDate = sbCust.fieldOf("startDate", Date.class);
    public static final FieldExpression<Date> endDate = sbCust.fieldOf("endDate", Date.class);
    public static final FieldExpression<String> countryId = sbCust.fieldOf("countryId", String.class);
    public static final FieldExpression<String> stateId = sbCust.fieldOf("stateId", String.class);
    public static final FieldExpression<String> cityId = sbCust.fieldOf("cityId", String.class);
    public static final FieldExpression<String> inputUser = sbCust.fieldOf("inputUser", String.class);
    public static final FieldExpression<String> inputUserName = sbCust.fieldOf("inputUserName", String.class);
    public static final FieldExpression<String> inputOffice = sbCust.fieldOf("inputOffice", String.class);
    public static final FieldExpression<BigDecimal> isOnline = sbCust.fieldOf("isOnline", BigDecimal.class);
    public static final FieldExpression<String> loginName = sbCust.fieldOf("loginName", String.class);
    public static final FieldExpression<String> pwd = sbCust.fieldOf("pwd", String.class);
    public static final FieldExpression<String> homepage = sbCust.fieldOf("homepage", String.class);
    public static final FieldExpression<String> ein = sbCust.fieldOf("ein", String.class);
    public static final FieldExpression<String> relatedOffice = sbCust.fieldOf("relatedOffice", String.class);
    public static final FieldExpression<String> grade = sbCust.fieldOf("grade", String.class);
    public static final FieldExpression<String> status = sbCust.fieldOf("status", String.class);
    public static final FieldExpression<String> approvedCustId = sbCust.fieldOf("approvedCustId", String.class);
    public static final FieldExpression<String> approvedCustName = sbCust.fieldOf("approvedCustName", String.class);
    public static final FieldExpression<BigDecimal> active = sbCust.fieldOf("active", BigDecimal.class);
    public static final FieldExpression<String> tel = sbCust.fieldOf("tel", String.class);
    public static final FieldExpression<String> fax = sbCust.fieldOf("fax", String.class);
    public static final FieldExpression<String> idstring1 = sbCust.fieldOf("idstring1", String.class);
    public static final FieldExpression<String> logic1 = sbCust.fieldOf("logic1", String.class);
    public static final FieldExpression<String> idstring2 = sbCust.fieldOf("idstring2", String.class);
    public static final FieldExpression<String> logic2 = sbCust.fieldOf("logic2", String.class);
    public static final FieldExpression<String> idstring3 = sbCust.fieldOf("idstring3", String.class);
    public static final FieldExpression<String> email = sbCust.fieldOf("email", String.class);
    public static final FieldExpression<String> inputRole = sbCust.fieldOf("inputRole", String.class);
    public static final FieldExpression<String> creditCurrency = sbCust.fieldOf("creditCurrency", String.class);
    public static final FieldExpression<String> cityName = sbCust.fieldOf("cityName", String.class);
    public static final FieldExpression<String> custAliasCn = sbCust.fieldOf("custAliasCn", String.class);
    public static final FieldExpression<String> remCode = sbCust.fieldOf("remCode", String.class);
    public static final FieldExpression<BigDecimal> deletedReason = sbCust.fieldOf("deletedReason", BigDecimal.class);
    public static final FieldExpression<String> custInnerOuter = sbCust.fieldOf("custInnerOuter", String.class);
    public static final FieldExpression<String> forwardCode = sbCust.fieldOf("forwardCode", String.class);
    public static final FieldExpression<BigDecimal> deleted = sbCust.fieldOf("deleted", BigDecimal.class);
    public static final FieldExpression<String> unactive = sbCust.fieldOf("unactive", String.class);
    public static final FieldExpression<String> vip = sbCust.fieldOf("vip", String.class);
    public static final FieldExpression<String> modifyUser = sbCust.fieldOf("modifyUser", String.class);
    public static final FieldExpression<String> modidyUserName = sbCust.fieldOf("modidyUserName", String.class);
    public static final FieldExpression<Date> modifyDate = sbCust.fieldOf("modifyDate", Date.class);
    public static final FieldExpression<Date> inputDate = sbCust.fieldOf("inputDate", Date.class);
    public static final FieldExpression<String> contact = sbCust.fieldOf("contact", String.class);
    public static final FieldExpression<String> dragCtnPlace = sbCust.fieldOf("dragCtnPlace", String.class);
    public static final FieldExpression<String> relateUser = sbCust.fieldOf("relateUser", String.class);
    public static final FieldExpression<String> superiorIdList = sbCust.fieldOf("superiorIdList", String.class);
    public static final FieldExpression<String> forward2Code = sbCust.fieldOf("forward2Code", String.class);
    public static final FieldExpression<String> creditNo = sbCust.fieldOf("creditNo", String.class);
    public static final FieldExpression<Date> creditInvalidationDate = sbCust.fieldOf("creditInvalidationDate", Date.class);
    public static final FieldExpression<String> creditRemark = sbCust.fieldOf("creditRemark", String.class);
    public static final FieldExpression<BigDecimal> isProfit = sbCust.fieldOf("isProfit", BigDecimal.class);
    public static final FieldExpression<String> belongFreight = sbCust.fieldOf("belongFreight", String.class);
    public static final FieldExpression<String> applicationFrtUser = sbCust.fieldOf("applicationFrtUser", String.class);
    public static final FieldExpression<Date> applicationFrtDate = sbCust.fieldOf("applicationFrtDate", Date.class);
    public static final FieldExpression<String> applicationFormalUser = sbCust.fieldOf("applicationFormalUser", String.class);
    public static final FieldExpression<Date> applicationFormalDate = sbCust.fieldOf("applicationFormalDate", Date.class);
    public static final FieldExpression<String> applicationFrtUserName = sbCust.fieldOf("applicationFrtUserName", String.class);
    public static final FieldExpression<String> applicationFormalUserName = sbCust.fieldOf("applicationFormalUserName", String.class);
    public static final FieldExpression<String> remarkD = sbCust.fieldOf("remarkD", String.class);
    public static final FieldExpression<String> inputOfficeCode = sbCust.fieldOf("inputOfficeCode", String.class);
    public static final FieldExpression<BigDecimal> isShowIzCust = sbCust.fieldOf("isShowIzCust", BigDecimal.class);
    public static final FieldExpression<BigDecimal> isCheckOrderOnline = sbCust.fieldOf("isCheckOrderOnline", BigDecimal.class);
    public static final FieldExpression<String> businessNature = sbCust.fieldOf("businessNature", String.class);
    public static final FieldExpression<BigDecimal> registeredCapital = sbCust.fieldOf("registeredCapital", BigDecimal.class);
    public static final FieldExpression<String> taxNumber = sbCust.fieldOf("taxNumber", String.class);
    public static final FieldExpression<String> collectionPersonId = sbCust.fieldOf("collectionPersonId", String.class);
    public static final FieldExpression<String> collectionPersonName = sbCust.fieldOf("collectionPersonName", String.class);
    public static final FieldExpression<String> webProtocolNo = sbCust.fieldOf("webProtocolNo", String.class);
    public static final FieldExpression<Date> webProtocolEndDate = sbCust.fieldOf("webProtocolEndDate", Date.class);
    public static final FieldExpression<String> relateBussinessUser = sbCust.fieldOf("relateBussinessUser", String.class);
    public static final FieldExpression<String> blPrefix = sbCust.fieldOf("blPrefix", String.class);
    public static final FieldExpression<BigDecimal> needCargoTracking = sbCust.fieldOf("needCargoTracking", BigDecimal.class);
    public static final FieldExpression<BigDecimal> isCeInv = sbCust.fieldOf("isCeInv", BigDecimal.class);
    public static final FieldExpression<BigDecimal> isOoCarrier2 = sbCust.fieldOf("isOoCarrier2", BigDecimal.class);
    public static final FieldExpression<BigDecimal> isEdo = sbCust.fieldOf("isEdo", BigDecimal.class);
    public static final FieldExpression<String> mdgLangu = sbCust.fieldOf("mdgLangu", String.class);
    public static final FieldExpression<String> mdgPartner = sbCust.fieldOf("mdgPartner", String.class);
    public static final FieldExpression<String> mdgRegion = sbCust.fieldOf("mdgRegion", String.class);
    public static final FieldExpression<String> mdgTelExtens = sbCust.fieldOf("mdgTelExtens", String.class);
    public static final FieldExpression<String> mdgMobNumber = sbCust.fieldOf("mdgMobNumber", String.class);
    public static final FieldExpression<String> mdgFaxExtens = sbCust.fieldOf("mdgFaxExtens", String.class);
    public static final FieldExpression<String> mdgBuGroup = sbCust.fieldOf("mdgBuGroup", String.class);
    public static final FieldExpression<Date> modifyLastTime = sbCust.fieldOf("modifyLastTime", Date.class);


    public QSbCust() {
        super("SbCust", SbCust.class);
    }

    QSbCust(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "SbCust", SbCust.class, alias);
    }

    @Override
    public OperatorExpression<String> primaryKey() {
        return custId;
    }
}
