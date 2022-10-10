package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.TraMode;

import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QTraMode extends BaseModelExpression<TraMode, Long> {

    public static final BaseModelExpression<TraMode, Long> traMode = new QTraMode();
    public static final FieldExpression<Long> traModeId = traMode.fieldOf("traModeId", Long.class);
    public static final FieldExpression<Long> traOrderId = traMode.fieldOf("traOrderId", Long.class);
    public static final FieldExpression<String> modeType = traMode.fieldOf("modeType", String.class);
    public static final FieldExpression<String> ctnRemark = traMode.fieldOf("ctnRemark", String.class);
    public static final FieldExpression<Long> creatorId = traMode.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = traMode.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = traMode.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = traMode.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = traMode.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = traMode.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = traMode.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = traMode.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = traMode.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = traMode.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = traMode.fieldOf("recordVersion", Integer.class);


    public QTraMode() {
        super("TraMode", TraMode.class);
    }

    QTraMode(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "TraMode", TraMode.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return traModeId;
    }
}
