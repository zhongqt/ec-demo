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
import java.lang.String;


/**
 * @author DaoServiceGenerator
 */
@SuppressWarnings("JpaDataSourceORMInspection")
        @EqualsAndHashCode(callSuper = true)
    @Data
    @Entity
@Table(name = "area_code")
public class AreaCode extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**区域id*/
    @Id
    @Column(name = "area_code_id")
    @Generator("snowFlakeGenerator")
    private Integer areaCodeId;

    /**区域名*/
    @Column(name = "area_code_name")
    private String areaCodeName;

}