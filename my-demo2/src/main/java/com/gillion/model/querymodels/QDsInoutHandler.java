package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.DsInoutHandler;

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
public class QDsInoutHandler extends BaseModelExpression<DsInoutHandler, Long> {

    public static final BaseModelExpression<DsInoutHandler, Long> dsInoutHandler = new QDsInoutHandler();
    public static final FieldExpression<Long> inoutHandlerId = dsInoutHandler.fieldOf("inoutHandlerId", Long.class);
    public static final FieldExpression<String> tag = dsInoutHandler.fieldOf("tag", String.class);
    public static final FieldExpression<String> handlerDescription = dsInoutHandler.fieldOf("handlerDescription", String.class);
    public static final FieldExpression<String> handlerBeanName = dsInoutHandler.fieldOf("handlerBeanName", String.class);
    public static final FieldExpression<Byte> handlerType = dsInoutHandler.fieldOf("handlerType", Byte.class);
    public static final FieldExpression<String> creator = dsInoutHandler.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = dsInoutHandler.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = dsInoutHandler.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = dsInoutHandler.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Integer> version = dsInoutHandler.fieldOf("version", Integer.class);
    public static final FieldExpression<Boolean> destroyed = dsInoutHandler.fieldOf("destroyed", Boolean.class);


    public QDsInoutHandler() {
        super("DsInoutHandler", DsInoutHandler.class);
    }

    QDsInoutHandler(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "DsInoutHandler", DsInoutHandler.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return inoutHandlerId;
    }
}
