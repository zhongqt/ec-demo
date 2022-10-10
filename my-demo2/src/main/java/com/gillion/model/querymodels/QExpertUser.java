package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.ExpertUser;

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
public class QExpertUser extends BaseModelExpression<ExpertUser, Long> {

    public static final BaseModelExpression<ExpertUser, Long> expertUser = new QExpertUser();
    public static final FieldExpression<Long> expertUserId = expertUser.fieldOf("expertUserId", Long.class);
    public static final FieldExpression<String> expertName = expertUser.fieldOf("expertName", String.class);
    public static final FieldExpression<String> expertGender = expertUser.fieldOf("expertGender", String.class);
    public static final FieldExpression<String> workCompany = expertUser.fieldOf("workCompany", String.class);
    public static final FieldExpression<String> expertPhone = expertUser.fieldOf("expertPhone", String.class);
    public static final FieldExpression<String> technicalPosition = expertUser.fieldOf("technicalPosition", String.class);
    public static final FieldExpression<String> sendPosition = expertUser.fieldOf("sendPosition", String.class);
    public static final FieldExpression<String> recommendCompany = expertUser.fieldOf("recommendCompany", String.class);
    public static final FieldExpression<String> expertType = expertUser.fieldOf("expertType", String.class);
    public static final FieldExpression<Boolean> isPartReview = expertUser.fieldOf("isPartReview", Boolean.class);
    public static final FieldExpression<Long> userId = expertUser.fieldOf("userId", Long.class);
    public static final FieldExpression<Long> creatorId = expertUser.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = expertUser.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = expertUser.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = expertUser.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = expertUser.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = expertUser.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = expertUser.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = expertUser.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = expertUser.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = expertUser.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = expertUser.fieldOf("recordVersion", Integer.class);


    public QExpertUser() {
        super("ExpertUser", ExpertUser.class);
    }

    QExpertUser(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "ExpertUser", ExpertUser.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return expertUserId;
    }
}
