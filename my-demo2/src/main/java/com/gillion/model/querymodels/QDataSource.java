package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.DataSource;

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
public class QDataSource extends BaseModelExpression<DataSource, Long> {

    public static final BaseModelExpression<DataSource, Long> dataSource = new QDataSource();
    public static final FieldExpression<Long> id = dataSource.fieldOf("id", Long.class);
    public static final FieldExpression<Long> projectId = dataSource.fieldOf("projectId", Long.class);
    public static final FieldExpression<String> dataSourceName = dataSource.fieldOf("dataSourceName", String.class);
    public static final FieldExpression<String> schemaName = dataSource.fieldOf("schemaName", String.class);
    public static final FieldExpression<Byte> databaseType = dataSource.fieldOf("databaseType", Byte.class);
    public static final FieldExpression<Byte> status = dataSource.fieldOf("status", Byte.class);
    public static final FieldExpression<String> url = dataSource.fieldOf("url", String.class);
    public static final FieldExpression<String> driverClassName = dataSource.fieldOf("driverClassName", String.class);
    public static final FieldExpression<String> username = dataSource.fieldOf("username", String.class);
    public static final FieldExpression<String> password = dataSource.fieldOf("password", String.class);
    public static final FieldExpression<String> props = dataSource.fieldOf("props", String.class);
    public static final FieldExpression<String> serviceCode = dataSource.fieldOf("serviceCode", String.class);
    public static final FieldExpression<Integer> chineseWidth = dataSource.fieldOf("chineseWidth", Integer.class);
    public static final FieldExpression<String> creator = dataSource.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = dataSource.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = dataSource.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = dataSource.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> version = dataSource.fieldOf("version", Long.class);
    public static final FieldExpression<Byte> destroyed = dataSource.fieldOf("destroyed", Byte.class);
    public static final FieldExpression<Boolean> isPrimary = dataSource.fieldOf("isPrimary", Boolean.class);
    public static final FieldExpression<String> projectKey = dataSource.fieldOf("projectKey", String.class);
    public static final FieldExpression<String> ddlUsername = dataSource.fieldOf("ddlUsername", String.class);
    public static final FieldExpression<String> ddlPassword = dataSource.fieldOf("ddlPassword", String.class);


    public QDataSource() {
        super("DataSource", DataSource.class);
    }

    QDataSource(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "DataSource", DataSource.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
