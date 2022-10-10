package com.gillion.model.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import com.gillion.ec.core.annotations.Generator;
import com.gillion.ds.entity.base.BaseModel;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.lang.Byte;
import java.lang.String;


/**
 * @author DaoServiceGenerator
 */
@SuppressWarnings("JpaDataSourceORMInspection")
        @EqualsAndHashCode(callSuper = true)
    @Data
    @Entity
@Table(name = "lyhteacher")
public class Lyhteacher extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    @Id
    @Column(name = "teacher_id")
    @Generator("snowFlakeGenerator")
    private String teacherId;

    @Column(name = "teacher_name")
    private String teacherName;

    @Column(name = "teacher_gender")
    private Byte teacherGender;

}