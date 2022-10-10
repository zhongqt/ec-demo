package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MdMessageNotifier;

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
public class QMdMessageNotifier extends BaseModelExpression<MdMessageNotifier, Long> {

    public static final BaseModelExpression<MdMessageNotifier, Long> mdMessageNotifier = new QMdMessageNotifier();
    public static final FieldExpression<Long> mdMessageNotifierId = mdMessageNotifier.fieldOf("mdMessageNotifierId", Long.class);
    public static final FieldExpression<Long> mdMessageId = mdMessageNotifier.fieldOf("mdMessageId", Long.class);
    public static final FieldExpression<Long> userId = mdMessageNotifier.fieldOf("userId", Long.class);
    public static final FieldExpression<String> userName = mdMessageNotifier.fieldOf("userName", String.class);
    public static final FieldExpression<Boolean> messageStatus = mdMessageNotifier.fieldOf("messageStatus", Boolean.class);
    public static final FieldExpression<Boolean> isDeleted = mdMessageNotifier.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = mdMessageNotifier.fieldOf("creatorId", Long.class);
    public static final FieldExpression<Date> createTime = mdMessageNotifier.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> creatorName = mdMessageNotifier.fieldOf("creatorName", String.class);
    public static final FieldExpression<Long> createCompanyId = mdMessageNotifier.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = mdMessageNotifier.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = mdMessageNotifier.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = mdMessageNotifier.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = mdMessageNotifier.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = mdMessageNotifier.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = mdMessageNotifier.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = mdMessageNotifier.fieldOf("recordVersion", Integer.class);


    public QMdMessageNotifier() {
        super("MdMessageNotifier", MdMessageNotifier.class);
    }

    QMdMessageNotifier(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MdMessageNotifier", MdMessageNotifier.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return mdMessageNotifierId;
    }
}
