package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MdPort;

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
public class QMdPort extends BaseModelExpression<MdPort, Long> {

    public static final BaseModelExpression<MdPort, Long> mdPort = new QMdPort();
    public static final FieldExpression<Long> mdPortId = mdPort.fieldOf("mdPortId", Long.class);
    public static final FieldExpression<Long> mdCountryId = mdPort.fieldOf("mdCountryId", Long.class);
    public static final FieldExpression<String> port5code = mdPort.fieldOf("port5code", String.class);
    public static final FieldExpression<String> portName = mdPort.fieldOf("portName", String.class);
    public static final FieldExpression<String> portNameEn = mdPort.fieldOf("portNameEn", String.class);
    public static final FieldExpression<String> countryCode = mdPort.fieldOf("countryCode", String.class);
    public static final FieldExpression<Boolean> isEdited = mdPort.fieldOf("isEdited", Boolean.class);
    public static final FieldExpression<Long> mdProvinceId = mdPort.fieldOf("mdProvinceId", Long.class);
    public static final FieldExpression<String> remark = mdPort.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isValid = mdPort.fieldOf("isValid", Boolean.class);
    public static final FieldExpression<Boolean> isDeleted = mdPort.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<Long> creatorId = mdPort.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = mdPort.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = mdPort.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> createCompanyId = mdPort.fieldOf("createCompanyId", Long.class);
    public static final FieldExpression<String> createCompanyName = mdPort.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<Long> modifierId = mdPort.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = mdPort.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = mdPort.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Long> modifyCompanyId = mdPort.fieldOf("modifyCompanyId", Long.class);
    public static final FieldExpression<String> modifyCompanyName = mdPort.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = mdPort.fieldOf("recordVersion", Integer.class);


    public QMdPort() {
        super("MdPort", MdPort.class);
    }

    QMdPort(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MdPort", MdPort.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return mdPortId;
    }
}
