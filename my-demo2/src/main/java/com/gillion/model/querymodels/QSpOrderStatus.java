package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.SpOrderStatus;

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
public class QSpOrderStatus extends BaseModelExpression<SpOrderStatus, Long> {

    public static final BaseModelExpression<SpOrderStatus, Long> spOrderStatus = new QSpOrderStatus();
    public static final FieldExpression<Long> spOrderStatusId = spOrderStatus.fieldOf("spOrderStatusId", Long.class);
    public static final FieldExpression<Long> goManifestOrderId = spOrderStatus.fieldOf("goManifestOrderId", Long.class);
    public static final FieldExpression<Long> linkDeliveryId = spOrderStatus.fieldOf("linkDeliveryId", Long.class);
    public static final FieldExpression<String> linkDeliveryType = spOrderStatus.fieldOf("linkDeliveryType", String.class);
    public static final FieldExpression<String> shippingNoteNumber = spOrderStatus.fieldOf("shippingNoteNumber", String.class);
    public static final FieldExpression<String> documentNumber = spOrderStatus.fieldOf("documentNumber", String.class);
    public static final FieldExpression<String> sequenceCode = spOrderStatus.fieldOf("sequenceCode", String.class);
    public static final FieldExpression<Date> estimatedArrivalDateTime = spOrderStatus.fieldOf("estimatedArrivalDateTime", Date.class);
    public static final FieldExpression<String> statusCode = spOrderStatus.fieldOf("statusCode", String.class);
    public static final FieldExpression<String> statusName = spOrderStatus.fieldOf("statusName", String.class);
    public static final FieldExpression<Date> statusTime = spOrderStatus.fieldOf("statusTime", Date.class);
    public static final FieldExpression<Date> statusEt = spOrderStatus.fieldOf("statusEt", Date.class);
    public static final FieldExpression<Date> statusAt = spOrderStatus.fieldOf("statusAt", Date.class);
    public static final FieldExpression<Integer> sort = spOrderStatus.fieldOf("sort", Integer.class);
    public static final FieldExpression<String> statusCountryCode = spOrderStatus.fieldOf("statusCountryCode", String.class);
    public static final FieldExpression<String> statusCountry = spOrderStatus.fieldOf("statusCountry", String.class);
    public static final FieldExpression<String> statusCityCode = spOrderStatus.fieldOf("statusCityCode", String.class);
    public static final FieldExpression<String> statusCity = spOrderStatus.fieldOf("statusCity", String.class);
    public static final FieldExpression<String> statusSite = spOrderStatus.fieldOf("statusSite", String.class);
    public static final FieldExpression<String> statusRemark = spOrderStatus.fieldOf("statusRemark", String.class);
    public static final FieldExpression<String> consignee = spOrderStatus.fieldOf("consignee", String.class);
    public static final FieldExpression<String> namePerson = spOrderStatus.fieldOf("namePerson", String.class);
    public static final FieldExpression<String> telephoneNumber = spOrderStatus.fieldOf("telephoneNumber", String.class);
    public static final FieldExpression<String> personalIdentity = spOrderStatus.fieldOf("personalIdentity", String.class);
    public static final FieldExpression<String> personalIdentityCode = spOrderStatus.fieldOf("personalIdentityCode", String.class);
    public static final FieldExpression<String> personalIdentityName = spOrderStatus.fieldOf("personalIdentityName", String.class);
    public static final FieldExpression<String> signTypeCode = spOrderStatus.fieldOf("signTypeCode", String.class);
    public static final FieldExpression<String> signTypeName = spOrderStatus.fieldOf("signTypeName", String.class);
    public static final FieldExpression<String> remark = spOrderStatus.fieldOf("remark", String.class);
    public static final FieldExpression<String> sourse = spOrderStatus.fieldOf("sourse", String.class);
    public static final FieldExpression<Boolean> isDeleted = spOrderStatus.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = spOrderStatus.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = spOrderStatus.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = spOrderStatus.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = spOrderStatus.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = spOrderStatus.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = spOrderStatus.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = spOrderStatus.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = spOrderStatus.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = spOrderStatus.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = spOrderStatus.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = spOrderStatus.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<String> statusAddressCode = spOrderStatus.fieldOf("statusAddressCode", String.class);
    public static final FieldExpression<String> statusAddressName = spOrderStatus.fieldOf("statusAddressName", String.class);


    public QSpOrderStatus() {
        super("SpOrderStatus", SpOrderStatus.class);
    }

    QSpOrderStatus(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "SpOrderStatus", SpOrderStatus.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return spOrderStatusId;
    }
}
