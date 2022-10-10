package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.DsTypeMapper;

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
public class QDsTypeMapper extends BaseModelExpression<DsTypeMapper, Long> {

    public static final BaseModelExpression<DsTypeMapper, Long> dsTypeMapper = new QDsTypeMapper();
    public static final FieldExpression<Long> dsTypeMapperId = dsTypeMapper.fieldOf("dsTypeMapperId", Long.class);
    public static final FieldExpression<String> projectKey = dsTypeMapper.fieldOf("projectKey", String.class);
    public static final FieldExpression<String> jdbcTypePattern = dsTypeMapper.fieldOf("jdbcTypePattern", String.class);
    public static final FieldExpression<String> javaTypeFullName = dsTypeMapper.fieldOf("javaTypeFullName", String.class);
    public static final FieldExpression<String> creator = dsTypeMapper.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = dsTypeMapper.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = dsTypeMapper.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = dsTypeMapper.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Integer> version = dsTypeMapper.fieldOf("version", Integer.class);
    public static final FieldExpression<Boolean> destroyed = dsTypeMapper.fieldOf("destroyed", Boolean.class);


    public QDsTypeMapper() {
        super("DsTypeMapper", DsTypeMapper.class);
    }

    QDsTypeMapper(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "DsTypeMapper", DsTypeMapper.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return dsTypeMapperId;
    }
}
