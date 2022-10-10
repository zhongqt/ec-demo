package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.ProjectConfig;

import java.lang.Byte;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QProjectConfig extends BaseModelExpression<ProjectConfig, Long> {

    public static final BaseModelExpression<ProjectConfig, Long> projectConfig = new QProjectConfig();
    public static final FieldExpression<Long> id = projectConfig.fieldOf("id", Long.class);
    public static final FieldExpression<String> projectKey = projectConfig.fieldOf("projectKey", String.class);
    public static final FieldExpression<String> projectDesc = projectConfig.fieldOf("projectDesc", String.class);
    public static final FieldExpression<Byte> sessionType = projectConfig.fieldOf("sessionType", Byte.class);
    public static final FieldExpression<String> signKey = projectConfig.fieldOf("signKey", String.class);
    public static final FieldExpression<Long> logDatabaseId = projectConfig.fieldOf("logDatabaseId", Long.class);
    public static final FieldExpression<String> creator = projectConfig.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = projectConfig.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = projectConfig.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = projectConfig.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> version = projectConfig.fieldOf("version", Long.class);
    public static final FieldExpression<Byte> destroyed = projectConfig.fieldOf("destroyed", Byte.class);
    public static final FieldExpression<Byte> recordChangeLog = projectConfig.fieldOf("recordChangeLog", Byte.class);


    public QProjectConfig() {
        super("ProjectConfig", ProjectConfig.class);
    }

    QProjectConfig(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "ProjectConfig", ProjectConfig.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
