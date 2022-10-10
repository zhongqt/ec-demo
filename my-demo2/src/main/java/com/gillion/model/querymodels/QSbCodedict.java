package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.SbCodedict;

import java.lang.String;
import java.math.BigDecimal;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QSbCodedict extends BaseModelExpression<SbCodedict, String> {

    public static final BaseModelExpression<SbCodedict, String> sbCodedict = new QSbCodedict();
    public static final FieldExpression<String> codeId = sbCodedict.fieldOf("codeId", String.class);
    public static final FieldExpression<String> relateValue = sbCodedict.fieldOf("relateValue", String.class);
    public static final FieldExpression<String> codeType = sbCodedict.fieldOf("codeType", String.class);
    public static final FieldExpression<String> codeValue = sbCodedict.fieldOf("codeValue", String.class);
    public static final FieldExpression<String> displayValue = sbCodedict.fieldOf("displayValue", String.class);
    public static final FieldExpression<String> displayValueCn = sbCodedict.fieldOf("displayValueCn", String.class);
    public static final FieldExpression<BigDecimal> modifiable = sbCodedict.fieldOf("modifiable", BigDecimal.class);
    public static final FieldExpression<String> bmsId = sbCodedict.fieldOf("bmsId", String.class);
    public static final FieldExpression<Date> modifyLastTime = sbCodedict.fieldOf("modifyLastTime", Date.class);


    public QSbCodedict() {
        super("SbCodedict", SbCodedict.class);
    }

    QSbCodedict(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "SbCodedict", SbCodedict.class, alias);
    }

    @Override
    public OperatorExpression<String> primaryKey() {
        return codeId;
    }
}
