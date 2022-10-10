package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.Student;

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
public class QStudent extends BaseModelExpression<Student, Long> {

    public static final BaseModelExpression<Student, Long> student = new QStudent();
    public static final FieldExpression<Long> id = student.fieldOf("id", Long.class);
    public static final FieldExpression<String> name = student.fieldOf("name", String.class);
    public static final FieldExpression<String> password = student.fieldOf("password", String.class);
    public static final FieldExpression<String> confirmPassword = student.fieldOf("confirmPassword", String.class);
    public static final FieldExpression<Integer> courseId = student.fieldOf("courseId", Integer.class);
    public static final FieldExpression<Long> teacherId = student.fieldOf("teacherId", Long.class);
    public static final FieldExpression<Long> age = student.fieldOf("age", Long.class);
    public static final FieldExpression<String> recordVersion = student.fieldOf("recordVersion", String.class);
    public static final FieldExpression<String> creator = student.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = student.fieldOf("createTime", Date.class);
    public static final FieldExpression<Boolean> destroyed = student.fieldOf("destroyed", Boolean.class);
    public static final FieldExpression<Long> mobile = student.fieldOf("mobile", Long.class);
    public static final FieldExpression<String> sex = student.fieldOf("sex", String.class);
    public static final FieldExpression<String> address = student.fieldOf("address", String.class);
    public static final FieldExpression<String> userAttribute = student.fieldOf("userAttribute", String.class);
    public static final FieldExpression<Date> modifyTime = student.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<String> modifier = student.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> birthday = student.fieldOf("birthday", Date.class);
    public static final FieldExpression<Date> enrollment = student.fieldOf("enrollment", Date.class);
    public static final FieldExpression<Integer> score = student.fieldOf("score", Integer.class);
    public static final FieldExpression<Integer> money = student.fieldOf("money", Integer.class);
    public static final FieldExpression<String> email = student.fieldOf("email", String.class);
    public static final FieldExpression<String> fileKey = student.fieldOf("fileKey", String.class);
    public static final FieldExpression<Integer> classId = student.fieldOf("classId", Integer.class);
    public static final FieldExpression<String> studentNm = student.fieldOf("studentNm", String.class);
    public static final FieldExpression<Integer> createrId = student.fieldOf("createrId", Integer.class);
    public static final FieldExpression<Integer> updateId = student.fieldOf("updateId", Integer.class);
    public static final FieldExpression<Date> lastTime = student.fieldOf("lastTime", Date.class);
    public static final FieldExpression<String> profile = student.fieldOf("profile", String.class);
    public static final FieldExpression<String> phone = student.fieldOf("phone", String.class);
    public static final FieldExpression<Long> version = student.fieldOf("version", Long.class);


    public QStudent() {
        super("Student", Student.class);
    }

    QStudent(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "Student", Student.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return id;
    }
}
