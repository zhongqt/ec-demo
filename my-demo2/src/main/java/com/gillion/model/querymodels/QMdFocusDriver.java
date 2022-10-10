package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MdFocusDriver;

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
public class QMdFocusDriver extends BaseModelExpression<MdFocusDriver, Long> {

    public static final BaseModelExpression<MdFocusDriver, Long> mdFocusDriver = new QMdFocusDriver();
    public static final FieldExpression<Long> mdFocusDriverId = mdFocusDriver.fieldOf("mdFocusDriverId", Long.class);
    public static final FieldExpression<String> driverName = mdFocusDriver.fieldOf("driverName", String.class);
    public static final FieldExpression<String> driverMobile = mdFocusDriver.fieldOf("driverMobile", String.class);
    public static final FieldExpression<String> idCard = mdFocusDriver.fieldOf("idCard", String.class);
    public static final FieldExpression<String> remark = mdFocusDriver.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isValid = mdFocusDriver.fieldOf("isValid", Boolean.class);
    public static final FieldExpression<Long> creatorId = mdFocusDriver.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = mdFocusDriver.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = mdFocusDriver.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = mdFocusDriver.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = mdFocusDriver.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = mdFocusDriver.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = mdFocusDriver.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = mdFocusDriver.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = mdFocusDriver.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = mdFocusDriver.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = mdFocusDriver.fieldOf("recordVersion", Integer.class);


    public QMdFocusDriver() {
        super("MdFocusDriver", MdFocusDriver.class);
    }

    QMdFocusDriver(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MdFocusDriver", MdFocusDriver.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return mdFocusDriverId;
    }
}
