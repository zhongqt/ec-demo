package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.DsViewModelField;

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
public class QDsViewModelField extends BaseModelExpression<DsViewModelField, Long> {

    public static final BaseModelExpression<DsViewModelField, Long> dsViewModelField = new QDsViewModelField();
    public static final FieldExpression<Long> viewModelFieldId = dsViewModelField.fieldOf("viewModelFieldId", Long.class);
    public static final FieldExpression<Long> viewModelId = dsViewModelField.fieldOf("viewModelId", Long.class);
    public static final FieldExpression<String> fieldName = dsViewModelField.fieldOf("fieldName", String.class);
    public static final FieldExpression<String> fieldTitle = dsViewModelField.fieldOf("fieldTitle", String.class);
    public static final FieldExpression<String> originFieldPath = dsViewModelField.fieldOf("originFieldPath", String.class);
    public static final FieldExpression<Long> originModelMemberId = dsViewModelField.fieldOf("originModelMemberId", Long.class);
    public static final FieldExpression<String> javaTypeName = dsViewModelField.fieldOf("javaTypeName", String.class);
    public static final FieldExpression<Boolean> destroyed = dsViewModelField.fieldOf("destroyed", Boolean.class);
    public static final FieldExpression<String> creator = dsViewModelField.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = dsViewModelField.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = dsViewModelField.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = dsViewModelField.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Integer> version = dsViewModelField.fieldOf("version", Integer.class);


    public QDsViewModelField() {
        super("DsViewModelField", DsViewModelField.class);
    }

    QDsViewModelField(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "DsViewModelField", DsViewModelField.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return viewModelFieldId;
    }
}
