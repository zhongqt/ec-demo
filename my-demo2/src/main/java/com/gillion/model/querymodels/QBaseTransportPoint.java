package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.BaseTransportPoint;

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
public class QBaseTransportPoint extends BaseModelExpression<BaseTransportPoint, Long> {

    public static final BaseModelExpression<BaseTransportPoint, Long> baseTransportPoint = new QBaseTransportPoint();
    public static final FieldExpression<Long> baseTransportPointId = baseTransportPoint.fieldOf("baseTransportPointId", Long.class);
    public static final FieldExpression<String> transportCode = baseTransportPoint.fieldOf("transportCode", String.class);
    public static final FieldExpression<String> transportType = baseTransportPoint.fieldOf("transportType", String.class);
    public static final FieldExpression<String> transportNameCn = baseTransportPoint.fieldOf("transportNameCn", String.class);
    public static final FieldExpression<String> transportNameEn = baseTransportPoint.fieldOf("transportNameEn", String.class);
    public static final FieldExpression<String> threeCharacterCode = baseTransportPoint.fieldOf("threeCharacterCode", String.class);
    public static final FieldExpression<String> detailedAddress = baseTransportPoint.fieldOf("detailedAddress", String.class);
    public static final FieldExpression<String> baseArea = baseTransportPoint.fieldOf("baseArea", String.class);
    public static final FieldExpression<String> remark = baseTransportPoint.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isDeleted = baseTransportPoint.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = baseTransportPoint.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = baseTransportPoint.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = baseTransportPoint.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = baseTransportPoint.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = baseTransportPoint.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = baseTransportPoint.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = baseTransportPoint.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = baseTransportPoint.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = baseTransportPoint.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = baseTransportPoint.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = baseTransportPoint.fieldOf("recordVersion", Integer.class);


    public QBaseTransportPoint() {
        super("BaseTransportPoint", BaseTransportPoint.class);
    }

    QBaseTransportPoint(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "BaseTransportPoint", BaseTransportPoint.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return baseTransportPointId;
    }
}
