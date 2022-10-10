package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.GoCarDriver;

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
public class QGoCarDriver extends BaseModelExpression<GoCarDriver, Long> {

    public static final BaseModelExpression<GoCarDriver, Long> goCarDriver = new QGoCarDriver();
    public static final FieldExpression<Long> goCarDriverId = goCarDriver.fieldOf("goCarDriverId", Long.class);
    public static final FieldExpression<Long> traTransportationId = goCarDriver.fieldOf("traTransportationId", Long.class);
    public static final FieldExpression<String> driverName = goCarDriver.fieldOf("driverName", String.class);
    public static final FieldExpression<String> driverMobile = goCarDriver.fieldOf("driverMobile", String.class);
    public static final FieldExpression<String> driverIdCard = goCarDriver.fieldOf("driverIdCard", String.class);
    public static final FieldExpression<String> remark = goCarDriver.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isDeleted = goCarDriver.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = goCarDriver.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = goCarDriver.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = goCarDriver.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = goCarDriver.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = goCarDriver.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = goCarDriver.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = goCarDriver.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = goCarDriver.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = goCarDriver.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = goCarDriver.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = goCarDriver.fieldOf("recordVersion", Integer.class);


    public QGoCarDriver() {
        super("GoCarDriver", GoCarDriver.class);
    }

    QGoCarDriver(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "GoCarDriver", GoCarDriver.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return goCarDriverId;
    }
}
