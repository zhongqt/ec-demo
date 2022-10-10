package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MdCargo;

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
public class QMdCargo extends BaseModelExpression<MdCargo, Long> {

    public static final BaseModelExpression<MdCargo, Long> mdCargo = new QMdCargo();
    public static final FieldExpression<Long> mdCargoId = mdCargo.fieldOf("mdCargoId", Long.class);
    public static final FieldExpression<Long> mdCargoTypeId = mdCargo.fieldOf("mdCargoTypeId", Long.class);
    public static final FieldExpression<String> cargoCode = mdCargo.fieldOf("cargoCode", String.class);
    public static final FieldExpression<String> cargoName = mdCargo.fieldOf("cargoName", String.class);
    public static final FieldExpression<String> cargoNameEn = mdCargo.fieldOf("cargoNameEn", String.class);
    public static final FieldExpression<String> cargoTypeCode = mdCargo.fieldOf("cargoTypeCode", String.class);
    public static final FieldExpression<String> cargoTypeName = mdCargo.fieldOf("cargoTypeName", String.class);
    public static final FieldExpression<String> remark = mdCargo.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isValid = mdCargo.fieldOf("isValid", Boolean.class);
    public static final FieldExpression<Boolean> isDeleted = mdCargo.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = mdCargo.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = mdCargo.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = mdCargo.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = mdCargo.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = mdCargo.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = mdCargo.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = mdCargo.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = mdCargo.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = mdCargo.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = mdCargo.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = mdCargo.fieldOf("recordVersion", Integer.class);


    public QMdCargo() {
        super("MdCargo", MdCargo.class);
    }

    QMdCargo(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MdCargo", MdCargo.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return mdCargoId;
    }
}
