package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.BusinessInformation;

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
public class QBusinessInformation extends BaseModelExpression<BusinessInformation, Long> {

    public static final BaseModelExpression<BusinessInformation, Long> businessInformation = new QBusinessInformation();
    public static final FieldExpression<Long> businessInformationId = businessInformation.fieldOf("businessInformationId", Long.class);
    public static final FieldExpression<Long> companyId = businessInformation.fieldOf("companyId", Long.class);
    public static final FieldExpression<String> companyName = businessInformation.fieldOf("companyName", String.class);
    public static final FieldExpression<String> transportNo = businessInformation.fieldOf("transportNo", String.class);
    public static final FieldExpression<Integer> orderQty = businessInformation.fieldOf("orderQty", Integer.class);
    public static final FieldExpression<Integer> vehicleQty = businessInformation.fieldOf("vehicleQty", Integer.class);
    public static final FieldExpression<Integer> cargoAircraftQty = businessInformation.fieldOf("cargoAircraftQty", Integer.class);
    public static final FieldExpression<Integer> shipQty = businessInformation.fieldOf("shipQty", Integer.class);
    public static final FieldExpression<String> mainTransportationType = businessInformation.fieldOf("mainTransportationType", String.class);
    public static final FieldExpression<String> mainBusinessLine = businessInformation.fieldOf("mainBusinessLine", String.class);
    public static final FieldExpression<String> registeredCapital = businessInformation.fieldOf("registeredCapital", String.class);
    public static final FieldExpression<String> operationStatus = businessInformation.fieldOf("operationStatus", String.class);
    public static final FieldExpression<Date> incorporationDate = businessInformation.fieldOf("incorporationDate", Date.class);
    public static final FieldExpression<String> businessTerm = businessInformation.fieldOf("businessTerm", String.class);
    public static final FieldExpression<String> actualPaymentAmount = businessInformation.fieldOf("actualPaymentAmount", String.class);
    public static final FieldExpression<String> businessScope = businessInformation.fieldOf("businessScope", String.class);
    public static final FieldExpression<String> remark = businessInformation.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isDeleted = businessInformation.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = businessInformation.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = businessInformation.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = businessInformation.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = businessInformation.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = businessInformation.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = businessInformation.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = businessInformation.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = businessInformation.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = businessInformation.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = businessInformation.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = businessInformation.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<String> mainCargoFlow = businessInformation.fieldOf("mainCargoFlow", String.class);
    public static final FieldExpression<String> mainCargoType = businessInformation.fieldOf("mainCargoType", String.class);
    public static final FieldExpression<String> infoSystemBuildSituation = businessInformation.fieldOf("infoSystemBuildSituation", String.class);
    public static final FieldExpression<String> mainServiceArea = businessInformation.fieldOf("mainServiceArea", String.class);
    public static final FieldExpression<String> corporateWebsite = businessInformation.fieldOf("corporateWebsite", String.class);
    public static final FieldExpression<String> mainBusinessType = businessInformation.fieldOf("mainBusinessType", String.class);
    public static final FieldExpression<String> logoPath = businessInformation.fieldOf("logoPath", String.class);
    public static final FieldExpression<String> companyTypeCode = businessInformation.fieldOf("companyTypeCode", String.class);
    public static final FieldExpression<String> companyProperty = businessInformation.fieldOf("companyProperty", String.class);


    public QBusinessInformation() {
        super("BusinessInformation", BusinessInformation.class);
    }

    QBusinessInformation(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "BusinessInformation", BusinessInformation.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return businessInformationId;
    }
}
