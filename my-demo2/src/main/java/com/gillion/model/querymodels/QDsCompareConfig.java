package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.DsCompareConfig;

import java.lang.Boolean;
import java.lang.Long;
import java.lang.String;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QDsCompareConfig extends BaseModelExpression<DsCompareConfig, Long> {

    public static final BaseModelExpression<DsCompareConfig, Long> dsCompareConfig = new QDsCompareConfig();
    public static final FieldExpression<Long> id = dsCompareConfig.fieldOf("id", Long.class);
    public static final FieldExpression<String> tableName = dsCompareConfig.fieldOf("tableName", String.class);
    public static final FieldExpression<String> displayFieldName = dsCompareConfig.fieldOf("displayFieldName", String.class);
    public static final FieldExpression<String> pkFieldAlias = dsCompareConfig.fieldOf("pkFieldAlias", String.class);
    public static final FieldExpression<String> tableCnName = dsCompareConfig.fieldOf("tableCnName", String.class);
    public static final FieldExpression<Boolean> destroyed = dsCompareConfig.fieldOf("destroyed", Boolean.class);


    public QDsCompareConfig() {
        super("DsCompareConfig", DsCompareConfig.class);
    }

    QDsCompareConfig(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "DsCompareConfig", DsCompareConfig.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
