package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MdLinkStatus;

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
public class QMdLinkStatus extends BaseModelExpression<MdLinkStatus, Long> {

    public static final BaseModelExpression<MdLinkStatus, Long> mdLinkStatus = new QMdLinkStatus();
    public static final FieldExpression<Long> mdLinkStatusId = mdLinkStatus.fieldOf("mdLinkStatusId", Long.class);
    public static final FieldExpression<Long> mdLinkId = mdLinkStatus.fieldOf("mdLinkId", Long.class);
    public static final FieldExpression<String> statusCode = mdLinkStatus.fieldOf("statusCode", String.class);
    public static final FieldExpression<String> statusName = mdLinkStatus.fieldOf("statusName", String.class);
    public static final FieldExpression<Boolean> isRequired = mdLinkStatus.fieldOf("isRequired", Boolean.class);
    public static final FieldExpression<Boolean> isKeyStatus = mdLinkStatus.fieldOf("isKeyStatus", Boolean.class);
    public static final FieldExpression<Integer> sort = mdLinkStatus.fieldOf("sort", Integer.class);
    public static final FieldExpression<Boolean> isDeleted = mdLinkStatus.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = mdLinkStatus.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = mdLinkStatus.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = mdLinkStatus.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = mdLinkStatus.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = mdLinkStatus.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = mdLinkStatus.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = mdLinkStatus.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = mdLinkStatus.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = mdLinkStatus.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = mdLinkStatus.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = mdLinkStatus.fieldOf("recordVersion", Integer.class);


    public QMdLinkStatus() {
        super("MdLinkStatus", MdLinkStatus.class);
    }

    QMdLinkStatus(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MdLinkStatus", MdLinkStatus.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return mdLinkStatusId;
    }
}
