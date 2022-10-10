package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.ValidationRule;

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
public class QValidationRule extends BaseModelExpression<ValidationRule, Long> {

    public static final BaseModelExpression<ValidationRule, Long> validationRule = new QValidationRule();
    public static final FieldExpression<Long> id = validationRule.fieldOf("id", Long.class);
    public static final FieldExpression<Long> validationGroupId = validationRule.fieldOf("validationGroupId", Long.class);
    public static final FieldExpression<String> groupName = validationRule.fieldOf("groupName", String.class);
    public static final FieldExpression<String> ruleName = validationRule.fieldOf("ruleName", String.class);
    public static final FieldExpression<String> mainModelName = validationRule.fieldOf("mainModelName", String.class);
    public static final FieldExpression<String> memberPath = validationRule.fieldOf("memberPath", String.class);
    public static final FieldExpression<String> memberClassFullName = validationRule.fieldOf("memberClassFullName", String.class);
    public static final FieldExpression<JsonNode> ruleProperties = validationRule.fieldOf("ruleProperties", JsonNode.class);
    public static final FieldExpression<Boolean> destroyed = validationRule.fieldOf("destroyed", Boolean.class);
    public static final FieldExpression<String> creator = validationRule.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = validationRule.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = validationRule.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = validationRule.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Integer> version = validationRule.fieldOf("version", Integer.class);


    public QValidationRule() {
        super("ValidationRule", ValidationRule.class);
    }

    QValidationRule(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "ValidationRule", ValidationRule.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
