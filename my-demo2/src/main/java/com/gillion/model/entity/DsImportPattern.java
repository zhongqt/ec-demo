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
@Table(name = "ds_import_pattern")
public class DsImportPattern extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**ID*/
    @Id
    @Column(name = "import_pattern_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long importPatternId;

    /**唯一的模式标识*/
    @Column(name = "tag")
    private String tag;

    /**数据库ID*/
    @Column(name = "data_source_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long dataSourceId;

    /**主模型名称*/
    @Column(name = "main_model_name")
    private String mainModelName;

    /**自定义记录转换器*/
    @Column(name = "transformer_bean_name")
    private String transformerBeanName;

    /**是否严格模式*/
    @Column(name = "is_strict_mode")
    private Boolean isStrictMode;

    /**在严格模式下, 出错是否继续校验并生成错误信息*/
    @Column(name = "is_validate_all")
    private Boolean isValidateAll;

    /**创建人*/
    @Column(name = "creator")
    private String creator;

    /**创建时间*/
    @Column(name = "create_time")
    private Date createTime;

    /**修改人*/
    @Column(name = "modifier")
    private String modifier;

    /**修改时间*/
    @Column(name = "modify_time")
    private Date modifyTime;

    /**乐观锁*/
    @Column(name = "version")
    private Integer version;

    /**是否删除*/
    @Column(name = "destroyed")
    private Boolean destroyed;

    @Column(name = "start_row_no")
    private Integer startRowNo;

    /**主模型是否来自视图*/
    @Column(name = "is_from_view")
    private Boolean isFromView;

    @Column(name = "project_key")
    private String projectKey;

}