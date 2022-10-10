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
import java.math.BigDecimal;
import java.util.Date;


/**
 * @author DaoServiceGenerator
 */
@SuppressWarnings("JpaDataSourceORMInspection")
        @EqualsAndHashCode(callSuper = true)
    @Data
    @Entity
@Table(name = "sb_codedict")
public class SbCodedict extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**主键ID*/
    @Id
    @Column(name = "code_id")
    @Generator("snowFlakeGenerator")
    private String codeId;

    /**相关值*/
    @Column(name = "relate_value")
    private String relateValue;

    /**主键ID*/
    @Column(name = "code_type")
    private String codeType;

    /**代码值*/
    @Column(name = "code_value")
    private String codeValue;

    /**编码内容（显示值）[英文]*/
    @Column(name = "display_value")
    private String displayValue;

    /**编码内容（显示值）[中文]*/
    @Column(name = "display_value_cn")
    private String displayValueCn;

    /**是否允许修改*/
    @Column(name = "modifiable")
    private BigDecimal modifiable;

    @Column(name = "bms_id")
    private String bmsId;

    /**最后修改时间*/
    @Column(name = "modify_last_time")
    private Date modifyLastTime;

}