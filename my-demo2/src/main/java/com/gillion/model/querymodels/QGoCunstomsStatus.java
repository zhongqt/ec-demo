package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.GoCunstomsStatus;

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
public class QGoCunstomsStatus extends BaseModelExpression<GoCunstomsStatus, Long> {

    public static final BaseModelExpression<GoCunstomsStatus, Long> goCunstomsStatus = new QGoCunstomsStatus();
    public static final FieldExpression<Long> goCunstomsStatusId = goCunstomsStatus.fieldOf("goCunstomsStatusId", Long.class);
    public static final FieldExpression<Long> goOrderId = goCunstomsStatus.fieldOf("goOrderId", Long.class);
    public static final FieldExpression<Long> goManifestOrderId = goCunstomsStatus.fieldOf("goManifestOrderId", Long.class);
    public static final FieldExpression<String> linkType = goCunstomsStatus.fieldOf("linkType", String.class);
    public static final FieldExpression<String> hwabNo = goCunstomsStatus.fieldOf("hwabNo", String.class);
    public static final FieldExpression<String> wabNo = goCunstomsStatus.fieldOf("wabNo", String.class);
    public static final FieldExpression<String> cunstomsNo = goCunstomsStatus.fieldOf("cunstomsNo", String.class);
    public static final FieldExpression<String> cunstomsAddressCode = goCunstomsStatus.fieldOf("cunstomsAddressCode", String.class);
    public static final FieldExpression<String> cunstomsAddressName = goCunstomsStatus.fieldOf("cunstomsAddressName", String.class);
    public static final FieldExpression<String> remark = goCunstomsStatus.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isDeleted = goCunstomsStatus.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = goCunstomsStatus.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = goCunstomsStatus.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = goCunstomsStatus.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = goCunstomsStatus.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = goCunstomsStatus.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = goCunstomsStatus.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = goCunstomsStatus.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = goCunstomsStatus.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = goCunstomsStatus.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = goCunstomsStatus.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = goCunstomsStatus.fieldOf("recordVersion", Integer.class);


    public QGoCunstomsStatus() {
        super("GoCunstomsStatus", GoCunstomsStatus.class);
    }

    QGoCunstomsStatus(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "GoCunstomsStatus", GoCunstomsStatus.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return goCunstomsStatusId;
    }
}
