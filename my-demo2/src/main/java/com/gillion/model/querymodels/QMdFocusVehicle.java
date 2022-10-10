package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MdFocusVehicle;

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
public class QMdFocusVehicle extends BaseModelExpression<MdFocusVehicle, Long> {

    public static final BaseModelExpression<MdFocusVehicle, Long> mdFocusVehicle = new QMdFocusVehicle();
    public static final FieldExpression<Long> mdFocusVehicleId = mdFocusVehicle.fieldOf("mdFocusVehicleId", Long.class);
    public static final FieldExpression<String> carNo = mdFocusVehicle.fieldOf("carNo", String.class);
    public static final FieldExpression<String> carColourCode = mdFocusVehicle.fieldOf("carColourCode", String.class);
    public static final FieldExpression<String> carColour = mdFocusVehicle.fieldOf("carColour", String.class);
    public static final FieldExpression<String> remark = mdFocusVehicle.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isValid = mdFocusVehicle.fieldOf("isValid", Boolean.class);
    public static final FieldExpression<Long> creatorId = mdFocusVehicle.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = mdFocusVehicle.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = mdFocusVehicle.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = mdFocusVehicle.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = mdFocusVehicle.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = mdFocusVehicle.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = mdFocusVehicle.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = mdFocusVehicle.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = mdFocusVehicle.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = mdFocusVehicle.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = mdFocusVehicle.fieldOf("recordVersion", Integer.class);


    public QMdFocusVehicle() {
        super("MdFocusVehicle", MdFocusVehicle.class);
    }

    QMdFocusVehicle(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MdFocusVehicle", MdFocusVehicle.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return mdFocusVehicleId;
    }
}
