package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.GoLinkDelivery;

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
public class QGoLinkDelivery extends BaseModelExpression<GoLinkDelivery, Long> {

    public static final BaseModelExpression<GoLinkDelivery, Long> goLinkDelivery = new QGoLinkDelivery();
    public static final FieldExpression<Long> goLinkDeliveryId = goLinkDelivery.fieldOf("goLinkDeliveryId", Long.class);
    public static final FieldExpression<Long> goOrderId = goLinkDelivery.fieldOf("goOrderId", Long.class);
    public static final FieldExpression<Long> goManifestOrderId = goLinkDelivery.fieldOf("goManifestOrderId", Long.class);
    public static final FieldExpression<String> linkType = goLinkDelivery.fieldOf("linkType", String.class);
    public static final FieldExpression<String> hwabNo = goLinkDelivery.fieldOf("hwabNo", String.class);
    public static final FieldExpression<String> wabNo = goLinkDelivery.fieldOf("wabNo", String.class);
    public static final FieldExpression<String> countryCode = goLinkDelivery.fieldOf("countryCode", String.class);
    public static final FieldExpression<String> countryName = goLinkDelivery.fieldOf("countryName", String.class);
    public static final FieldExpression<String> provinceCode = goLinkDelivery.fieldOf("provinceCode", String.class);
    public static final FieldExpression<String> provinceName = goLinkDelivery.fieldOf("provinceName", String.class);
    public static final FieldExpression<String> cityCode = goLinkDelivery.fieldOf("cityCode", String.class);
    public static final FieldExpression<String> cityName = goLinkDelivery.fieldOf("cityName", String.class);
    public static final FieldExpression<String> linkAddress = goLinkDelivery.fieldOf("linkAddress", String.class);
    public static final FieldExpression<String> remark = goLinkDelivery.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isDeleted = goLinkDelivery.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = goLinkDelivery.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = goLinkDelivery.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = goLinkDelivery.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = goLinkDelivery.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = goLinkDelivery.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = goLinkDelivery.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = goLinkDelivery.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = goLinkDelivery.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = goLinkDelivery.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = goLinkDelivery.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = goLinkDelivery.fieldOf("recordVersion", Integer.class);


    public QGoLinkDelivery() {
        super("GoLinkDelivery", GoLinkDelivery.class);
    }

    QGoLinkDelivery(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "GoLinkDelivery", GoLinkDelivery.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return goLinkDeliveryId;
    }
}
