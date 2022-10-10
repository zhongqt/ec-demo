package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MdLink;

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
public class QMdLink extends BaseModelExpression<MdLink, Long> {

    public static final BaseModelExpression<MdLink, Long> mdLink = new QMdLink();
    public static final FieldExpression<Long> mdLinkId = mdLink.fieldOf("mdLinkId", Long.class);
    public static final FieldExpression<String> transportedType = mdLink.fieldOf("transportedType", String.class);
    public static final FieldExpression<String> linkCode = mdLink.fieldOf("linkCode", String.class);
    public static final FieldExpression<String> linkName = mdLink.fieldOf("linkName", String.class);
    public static final FieldExpression<Integer> sort = mdLink.fieldOf("sort", Integer.class);
    public static final FieldExpression<String> remark = mdLink.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isDeleted = mdLink.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = mdLink.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = mdLink.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = mdLink.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = mdLink.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = mdLink.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = mdLink.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = mdLink.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = mdLink.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = mdLink.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = mdLink.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = mdLink.fieldOf("recordVersion", Integer.class);


    public QMdLink() {
        super("MdLink", MdLink.class);
    }

    QMdLink(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MdLink", MdLink.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return mdLinkId;
    }
}
