package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.DsViewModel;

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
public class QDsViewModel extends BaseModelExpression<DsViewModel, Long> {

    public static final BaseModelExpression<DsViewModel, Long> dsViewModel = new QDsViewModel();
    public static final FieldExpression<Long> viewModelId = dsViewModel.fieldOf("viewModelId", Long.class);
    public static final FieldExpression<String> viewModelName = dsViewModel.fieldOf("viewModelName", String.class);
    public static final FieldExpression<Long> dataSourceId = dsViewModel.fieldOf("dataSourceId", Long.class);
    public static final FieldExpression<Long> mainModelId = dsViewModel.fieldOf("mainModelId", Long.class);
    public static final FieldExpression<String> mainModelName = dsViewModel.fieldOf("mainModelName", String.class);
    public static final FieldExpression<String> projectKey = dsViewModel.fieldOf("projectKey", String.class);
    public static final FieldExpression<Boolean> destroyed = dsViewModel.fieldOf("destroyed", Boolean.class);
    public static final FieldExpression<String> creator = dsViewModel.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = dsViewModel.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = dsViewModel.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = dsViewModel.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Integer> version = dsViewModel.fieldOf("version", Integer.class);
    public static final FieldExpression<Long> customizationRequestId = dsViewModel.fieldOf("customizationRequestId", Long.class);


    public QDsViewModel() {
        super("DsViewModel", DsViewModel.class);
    }

    QDsViewModel(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "DsViewModel", DsViewModel.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return viewModelId;
    }
}
