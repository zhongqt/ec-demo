package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.GoTemplate;

import com.fasterxml.jackson.databind.JsonNode;
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
public class QGoTemplate extends BaseModelExpression<GoTemplate, Long> {

    public static final BaseModelExpression<GoTemplate, Long> goTemplate = new QGoTemplate();
    public static final FieldExpression<Long> goTemplateId = goTemplate.fieldOf("goTemplateId", Long.class);
    public static final FieldExpression<String> templateName = goTemplate.fieldOf("templateName", String.class);
    public static final FieldExpression<JsonNode> templateContent = goTemplate.fieldOf("templateContent", JsonNode.class);
    public static final FieldExpression<Boolean> isValid = goTemplate.fieldOf("isValid", Boolean.class);
    public static final FieldExpression<Boolean> isDeleted = goTemplate.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = goTemplate.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = goTemplate.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = goTemplate.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = goTemplate.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = goTemplate.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = goTemplate.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = goTemplate.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = goTemplate.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = goTemplate.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = goTemplate.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = goTemplate.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<String> schedulingType = goTemplate.fieldOf("schedulingType", String.class);


    public QGoTemplate() {
        super("GoTemplate", GoTemplate.class);
    }

    QGoTemplate(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "GoTemplate", GoTemplate.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return goTemplateId;
    }
}
