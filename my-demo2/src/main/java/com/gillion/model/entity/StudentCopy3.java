package com.gillion.model.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import com.gillion.ec.core.annotations.Generator;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.gillion.ec.core.utils.Long2String;
import com.gillion.ec.core.utils.String2Long;
import com.gillion.ds.entity.base.BaseModel;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.lang.Boolean;
import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
 * @author DaoServiceGenerator
 */
@SuppressWarnings("JpaDataSourceORMInspection")
        @EqualsAndHashCode(callSuper = true)
    @Data
    @Entity
@Table(name = "student_copy3")
public class StudentCopy3 extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**ID*/
    @Id
    @Column(name = "student_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long studentId;

    /**学生姓名*/
    @Column(name = "student_name")
    private String studentName;

    /**密码*/
    @Column(name = "password")
    private String password;

    /**确认密码*/
    @Column(name = "confirm_password")
    private String confirmPassword;

    /**班级ID*/
    @Column(name = "course_id")
    private Integer courseId;

    /**老师*/
    @Column(name = "teacher_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long teacherId;

    @Column(name = "age")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long age;

    @Column(name = "record_version")
    private String recordVersion;

    @Column(name = "creator")
    private String creator;

    @Column(name = "create_time")
    private Date createTime;

    @Column(name = "destroyed")
    private Boolean destroyed;

    /**手机号码*/
    @Column(name = "mobilephone")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long mobilephone;

    @Column(name = "sex")
    private Boolean sex;

    @Column(name = "address")
    private String address;

    @Column(name = "user_attribute")
    private String userAttribute;

    @Column(name = "modify_time")
    private Date modifyTime;

    @Column(name = "modifier")
    private String modifier;

    @Column(name = "birthday")
    private Date birthday;

    @Column(name = "enrollment")
    private Date enrollment;

    @Column(name = "score")
    private Integer score;

    @Column(name = "money")
    private Integer money;

    @Column(name = "email")
    private String email;

    @Column(name = "file_key")
    private String fileKey;

    @Column(name = "class_id")
    private Integer classId;

    @Column(name = "student_nm")
    private String studentNm;

    @Column(name = "creater_id")
    private Integer createrId;

    @Column(name = "update_id")
    private Integer updateId;

    @Column(name = "last_time")
    private Date lastTime;

    @Column(name = "profile")
    private String profile;

    @Column(name = "phone")
    private String phone;

}