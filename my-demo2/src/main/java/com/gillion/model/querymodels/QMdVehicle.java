package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MdVehicle;

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
public class QMdVehicle extends BaseModelExpression<MdVehicle, Long> {

    public static final BaseModelExpression<MdVehicle, Long> mdVehicle = new QMdVehicle();
    public static final FieldExpression<Long> mdVehicleId = mdVehicle.fieldOf("mdVehicleId", Long.class);
    public static final FieldExpression<String> carNo = mdVehicle.fieldOf("carNo", String.class);
    public static final FieldExpression<String> carColourCode = mdVehicle.fieldOf("carColourCode", String.class);
    public static final FieldExpression<String> carColour = mdVehicle.fieldOf("carColour", String.class);
    public static final FieldExpression<String> remark = mdVehicle.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isValid = mdVehicle.fieldOf("isValid", Boolean.class);
    public static final FieldExpression<Long> creatorId = mdVehicle.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = mdVehicle.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = mdVehicle.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = mdVehicle.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = mdVehicle.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = mdVehicle.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = mdVehicle.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = mdVehicle.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = mdVehicle.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = mdVehicle.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = mdVehicle.fieldOf("recordVersion", Integer.class);


    public QMdVehicle() {
        super("MdVehicle", MdVehicle.class);
    }

    QMdVehicle(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MdVehicle", MdVehicle.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return mdVehicleId;
    }
}
