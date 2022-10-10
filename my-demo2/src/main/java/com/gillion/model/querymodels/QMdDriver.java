package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MdDriver;

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
public class QMdDriver extends BaseModelExpression<MdDriver, Long> {

    public static final BaseModelExpression<MdDriver, Long> mdDriver = new QMdDriver();
    public static final FieldExpression<Long> mdDriverId = mdDriver.fieldOf("mdDriverId", Long.class);
    public static final FieldExpression<String> driverName = mdDriver.fieldOf("driverName", String.class);
    public static final FieldExpression<String> driverMobile = mdDriver.fieldOf("driverMobile", String.class);
    public static final FieldExpression<String> idCard = mdDriver.fieldOf("idCard", String.class);
    public static final FieldExpression<String> remark = mdDriver.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isValid = mdDriver.fieldOf("isValid", Boolean.class);
    public static final FieldExpression<Long> creatorId = mdDriver.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = mdDriver.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = mdDriver.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = mdDriver.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = mdDriver.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = mdDriver.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = mdDriver.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = mdDriver.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = mdDriver.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = mdDriver.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = mdDriver.fieldOf("recordVersion", Integer.class);


    public QMdDriver() {
        super("MdDriver", MdDriver.class);
    }

    QMdDriver(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MdDriver", MdDriver.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return mdDriverId;
    }
}
