package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.Lyhstudent;

import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QLyhstudent extends BaseModelExpression<Lyhstudent, Long> {

    public static final BaseModelExpression<Lyhstudent, Long> lyhstudent = new QLyhstudent();
    public static final FieldExpression<Long> studentId = lyhstudent.fieldOf("studentId", Long.class);
    public static final FieldExpression<String> teacherId = lyhstudent.fieldOf("teacherId", String.class);
    public static final FieldExpression<String> studentName = lyhstudent.fieldOf("studentName", String.class);
    public static final FieldExpression<Long> age = lyhstudent.fieldOf("age", Long.class);
    public static final FieldExpression<String> email = lyhstudent.fieldOf("email", String.class);
    public static final FieldExpression<Integer> version = lyhstudent.fieldOf("version", Integer.class);
    public static final FieldExpression<String> updateId = lyhstudent.fieldOf("updateId", String.class);
    public static final FieldExpression<Date> updateTime = lyhstudent.fieldOf("updateTime", Date.class);
    public static final FieldExpression<Date> birthday = lyhstudent.fieldOf("birthday", Date.class);


    public QLyhstudent() {
        super("Lyhstudent", Lyhstudent.class);
    }

    QLyhstudent(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "Lyhstudent", Lyhstudent.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return studentId;
    }
}
