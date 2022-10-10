package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.StudentCopy3;

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
public class QStudentCopy3 extends BaseModelExpression<StudentCopy3, Long> {

    public static final BaseModelExpression<StudentCopy3, Long> studentCopy3 = new QStudentCopy3();
    public static final FieldExpression<Long> studentId = studentCopy3.fieldOf("studentId", Long.class);
    public static final FieldExpression<String> studentName = studentCopy3.fieldOf("studentName", String.class);
    public static final FieldExpression<String> password = studentCopy3.fieldOf("password", String.class);
    public static final FieldExpression<String> confirmPassword = studentCopy3.fieldOf("confirmPassword", String.class);
    public static final FieldExpression<Integer> courseId = studentCopy3.fieldOf("courseId", Integer.class);
    public static final FieldExpression<Long> teacherId = studentCopy3.fieldOf("teacherId", Long.class);
    public static final FieldExpression<Long> age = studentCopy3.fieldOf("age", Long.class);
    public static final FieldExpression<String> recordVersion = studentCopy3.fieldOf("recordVersion", String.class);
    public static final FieldExpression<String> creator = studentCopy3.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = studentCopy3.fieldOf("createTime", Date.class);
    public static final FieldExpression<Boolean> destroyed = studentCopy3.fieldOf("destroyed", Boolean.class);
    public static final FieldExpression<Long> mobilephone = studentCopy3.fieldOf("mobilephone", Long.class);
    public static final FieldExpression<Boolean> sex = studentCopy3.fieldOf("sex", Boolean.class);
    public static final FieldExpression<String> address = studentCopy3.fieldOf("address", String.class);
    public static final FieldExpression<String> userAttribute = studentCopy3.fieldOf("userAttribute", String.class);
    public static final FieldExpression<Date> modifyTime = studentCopy3.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<String> modifier = studentCopy3.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> birthday = studentCopy3.fieldOf("birthday", Date.class);
    public static final FieldExpression<Date> enrollment = studentCopy3.fieldOf("enrollment", Date.class);
    public static final FieldExpression<Integer> score = studentCopy3.fieldOf("score", Integer.class);
    public static final FieldExpression<Integer> money = studentCopy3.fieldOf("money", Integer.class);
    public static final FieldExpression<String> email = studentCopy3.fieldOf("email", String.class);
    public static final FieldExpression<String> fileKey = studentCopy3.fieldOf("fileKey", String.class);
    public static final FieldExpression<Integer> classId = studentCopy3.fieldOf("classId", Integer.class);
    public static final FieldExpression<String> studentNm = studentCopy3.fieldOf("studentNm", String.class);
    public static final FieldExpression<Integer> createrId = studentCopy3.fieldOf("createrId", Integer.class);
    public static final FieldExpression<Integer> updateId = studentCopy3.fieldOf("updateId", Integer.class);
    public static final FieldExpression<Date> lastTime = studentCopy3.fieldOf("lastTime", Date.class);
    public static final FieldExpression<String> profile = studentCopy3.fieldOf("profile", String.class);
    public static final FieldExpression<String> phone = studentCopy3.fieldOf("phone", String.class);


    public QStudentCopy3() {
        super("StudentCopy3", StudentCopy3.class);
    }

    QStudentCopy3(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "StudentCopy3", StudentCopy3.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return studentId;
    }
}
