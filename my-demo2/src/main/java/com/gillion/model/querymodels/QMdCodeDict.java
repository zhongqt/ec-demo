package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.MdCodeDict;

import java.lang.String;
import java.math.BigDecimal;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QMdCodeDict extends BaseModelExpression<MdCodeDict, BigDecimal> {

    public static final BaseModelExpression<MdCodeDict, BigDecimal> mdCodeDict = new QMdCodeDict();
    public static final FieldExpression<String> active = mdCodeDict.fieldOf("active", String.class);
    public static final FieldExpression<String> codeType = mdCodeDict.fieldOf("codeType", String.class);
    public static final FieldExpression<String> codeValue = mdCodeDict.fieldOf("codeValue", String.class);
    public static final FieldExpression<String> createOffice = mdCodeDict.fieldOf("createOffice", String.class);
    public static final FieldExpression<String> createTime = mdCodeDict.fieldOf("createTime", String.class);
    public static final FieldExpression<String> createTimeZone = mdCodeDict.fieldOf("createTimeZone", String.class);
    public static final FieldExpression<String> creator = mdCodeDict.fieldOf("creator", String.class);
    public static final FieldExpression<String> displayValue = mdCodeDict.fieldOf("displayValue", String.class);
    public static final FieldExpression<String> displayValueCn = mdCodeDict.fieldOf("displayValueCn", String.class);
    public static final FieldExpression<String> lastModifyor = mdCodeDict.fieldOf("lastModifyor", String.class);
    public static final FieldExpression<String> lastModifyOffice = mdCodeDict.fieldOf("lastModifyOffice", String.class);
    public static final FieldExpression<String> lastModifyTime = mdCodeDict.fieldOf("lastModifyTime", String.class);
    public static final FieldExpression<String> lastModifyTimeZone = mdCodeDict.fieldOf("lastModifyTimeZone", String.class);
    public static final FieldExpression<BigDecimal> mdCodeDictId = mdCodeDict.fieldOf("mdCodeDictId", BigDecimal.class);
    public static final FieldExpression<BigDecimal> mdCodeTypeId = mdCodeDict.fieldOf("mdCodeTypeId", BigDecimal.class);
    public static final FieldExpression<String> principalGroupCode = mdCodeDict.fieldOf("principalGroupCode", String.class);
    public static final FieldExpression<BigDecimal> recordVersion = mdCodeDict.fieldOf("recordVersion", BigDecimal.class);
    public static final FieldExpression<String> relateValue = mdCodeDict.fieldOf("relateValue", String.class);
    public static final FieldExpression<String> remark = mdCodeDict.fieldOf("remark", String.class);
    public static final FieldExpression<BigDecimal> serialNumber = mdCodeDict.fieldOf("serialNumber", BigDecimal.class);
    public static final FieldExpression<String> settleOffice = mdCodeDict.fieldOf("settleOffice", String.class);
    public static final FieldExpression<String> settleOfficeName = mdCodeDict.fieldOf("settleOfficeName", String.class);
    public static final FieldExpression<BigDecimal> tmpPId = mdCodeDict.fieldOf("tmpPId", BigDecimal.class);
    public static final FieldExpression<BigDecimal> tmpSeqId = mdCodeDict.fieldOf("tmpSeqId", BigDecimal.class);


    public QMdCodeDict() {
        super("MdCodeDict", MdCodeDict.class);
    }

    QMdCodeDict(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "MdCodeDict", MdCodeDict.class, alias);
    }

    @Override
    public OperatorExpression<BigDecimal> primaryKey() {
        return mdCodeDictId;
    }
}
