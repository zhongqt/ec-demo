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
@Table(name = "ds_dict_source")
public class DsDictSource extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**ID*/
    @Id
    @Column(name = "dict_source_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long dictSourceId;

    /**字典名*/
    @Column(name = "dict_name")
    private String dictName;

    /**数据库ID*/
    @Column(name = "data_source_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long dataSourceId;

    /**查询sql*/
    @Column(name = "query_sql")
    private String querySql;

    @Column(name = "model_name")
    private String modelName;

    /**主缓存key，用于删除*/
    @Column(name = "main_cache_key")
    private String mainCacheKey;

    /**主缓存超时时间, 0表示不超时*/
    @Column(name = "main_cache_expir_ms")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long mainCacheExpirMs;

    /**乐观锁*/
    @Column(name = "version")
    private Integer version;

    /**二级缓存配置, 为空时不开启*/
    @Column(name = "second_cache_properties")
    private String secondCacheProperties;

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

    /**是否删除*/
    @Column(name = "destroyed")
    private Boolean destroyed;

    @Column(name = "project_key")
    private String projectKey;

}