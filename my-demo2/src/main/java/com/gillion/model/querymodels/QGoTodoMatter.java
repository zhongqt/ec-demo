package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.GoTodoMatter;

import java.lang.Boolean;
import java.lang.Byte;
import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QGoTodoMatter extends BaseModelExpression<GoTodoMatter, Long> {

    public static final BaseModelExpression<GoTodoMatter, Long> goTodoMatter = new QGoTodoMatter();
    public static final FieldExpression<Long> goTodoMatterId = goTodoMatter.fieldOf("goTodoMatterId", Long.class);
    public static final FieldExpression<Long> goOrderId = goTodoMatter.fieldOf("goOrderId", Long.class);
    public static final FieldExpression<String> todoType = goTodoMatter.fieldOf("todoType", String.class);
    public static final FieldExpression<String> todoContent = goTodoMatter.fieldOf("todoContent", String.class);
    public static final FieldExpression<Byte> level = goTodoMatter.fieldOf("level", Byte.class);
    public static final FieldExpression<String> feedbackContent = goTodoMatter.fieldOf("feedbackContent", String.class);
    public static final FieldExpression<String> feedbackPerson = goTodoMatter.fieldOf("feedbackPerson", String.class);
    public static final FieldExpression<Date> feedbackTime = goTodoMatter.fieldOf("feedbackTime", Date.class);
    public static final FieldExpression<Boolean> isDeleted = goTodoMatter.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = goTodoMatter.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = goTodoMatter.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = goTodoMatter.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = goTodoMatter.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = goTodoMatter.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = goTodoMatter.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = goTodoMatter.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = goTodoMatter.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = goTodoMatter.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = goTodoMatter.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = goTodoMatter.fieldOf("recordVersion", Integer.class);


    public QGoTodoMatter() {
        super("GoTodoMatter", GoTodoMatter.class);
    }

    QGoTodoMatter(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "GoTodoMatter", GoTodoMatter.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return goTodoMatterId;
    }
}
