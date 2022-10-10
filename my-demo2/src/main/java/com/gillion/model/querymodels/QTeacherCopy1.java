package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.TeacherCopy1;

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
public class QTeacherCopy1 extends BaseModelExpression<TeacherCopy1, Long> {

    public static final BaseModelExpression<TeacherCopy1, Long> teacherCopy1 = new QTeacherCopy1();
    public static final FieldExpression<Long> teacherId = teacherCopy1.fieldOf("teacherId", Long.class);
    public static final FieldExpression<String> teacherName = teacherCopy1.fieldOf("teacherName", String.class);
    public static final FieldExpression<Integer> teacherAge = teacherCopy1.fieldOf("teacherAge", Integer.class);
    public static final FieldExpression<Long> studentId = teacherCopy1.fieldOf("studentId", Long.class);
    public static final FieldExpression<String> creator = teacherCopy1.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = teacherCopy1.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = teacherCopy1.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = teacherCopy1.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Integer> version = teacherCopy1.fieldOf("version", Integer.class);
    public static final FieldExpression<Boolean> destroyed = teacherCopy1.fieldOf("destroyed", Boolean.class);
    public static final FieldExpression<String> userAttribute = teacherCopy1.fieldOf("userAttribute", String.class);
    public static final FieldExpression<String> teacherGender = teacherCopy1.fieldOf("teacherGender", String.class);


    public QTeacherCopy1() {
        super("TeacherCopy1", TeacherCopy1.class);
    }

    QTeacherCopy1(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "TeacherCopy1", TeacherCopy1.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return teacherId;
    }
}
