package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.TeacherCopy2;

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
public class QTeacherCopy2 extends BaseModelExpression<TeacherCopy2, Long> {

    public static final BaseModelExpression<TeacherCopy2, Long> teacherCopy2 = new QTeacherCopy2();
    public static final FieldExpression<Long> teacherId = teacherCopy2.fieldOf("teacherId", Long.class);
    public static final FieldExpression<String> teacherName = teacherCopy2.fieldOf("teacherName", String.class);
    public static final FieldExpression<Integer> teacherAge = teacherCopy2.fieldOf("teacherAge", Integer.class);
    public static final FieldExpression<Long> studentId = teacherCopy2.fieldOf("studentId", Long.class);
    public static final FieldExpression<String> creator = teacherCopy2.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = teacherCopy2.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = teacherCopy2.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = teacherCopy2.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Integer> version = teacherCopy2.fieldOf("version", Integer.class);
    public static final FieldExpression<Boolean> destroyed = teacherCopy2.fieldOf("destroyed", Boolean.class);
    public static final FieldExpression<String> userAttribute = teacherCopy2.fieldOf("userAttribute", String.class);
    public static final FieldExpression<String> teacherGender = teacherCopy2.fieldOf("teacherGender", String.class);


    public QTeacherCopy2() {
        super("TeacherCopy2", TeacherCopy2.class);
    }

    QTeacherCopy2(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "TeacherCopy2", TeacherCopy2.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return teacherId;
    }
}
