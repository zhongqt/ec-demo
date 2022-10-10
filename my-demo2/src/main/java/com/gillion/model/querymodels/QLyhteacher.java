package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.Lyhteacher;

import java.lang.Byte;
import java.lang.String;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QLyhteacher extends BaseModelExpression<Lyhteacher, String> {

    public static final BaseModelExpression<Lyhteacher, String> lyhteacher = new QLyhteacher();
    public static final FieldExpression<String> teacherId = lyhteacher.fieldOf("teacherId", String.class);
    public static final FieldExpression<String> teacherName = lyhteacher.fieldOf("teacherName", String.class);
    public static final FieldExpression<Byte> teacherGender = lyhteacher.fieldOf("teacherGender", Byte.class);


    public QLyhteacher() {
        super("Lyhteacher", Lyhteacher.class);
    }

    QLyhteacher(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "Lyhteacher", Lyhteacher.class, alias);
    }

    @Override
    public OperatorExpression<String> primaryKey() {
        return teacherId;
    }
}
