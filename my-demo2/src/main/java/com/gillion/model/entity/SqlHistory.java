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
@Table(name = "sql_history")
public class SqlHistory extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**ID*/
    @Id
    @Column(name = "id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long id;

    /**数据库id*/
    @Column(name = "data_source_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long dataSourceId;

    /**sql hash*/
    @Column(name = "sql_hash")
    private String sqlHash;

    /**sql*/
    @Column(name = "sql_stmt")
    private String sqlStmt;

    @Column(name = "sql_tag")
    private String sqlTag;

    /**统计次数*/
    @Column(name = "statistics_count")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long statisticsCount;

    /**统计周期内总用时*/
    @Column(name = "total_use_time")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long totalUseTime;

    /**统计周期内最大用时*/
    @Column(name = "max_use_time")
    private Integer maxUseTime;

    /**统计周期内最小用时*/
    @Column(name = "min_use_time")
    private Integer minUseTime;

    /**统计开始时间*/
    @Column(name = "statistics_start_datetime")
    private Date statisticsStartDatetime;

    /**统计结束时间*/
    @Column(name = "statistics_end_datetime")
    private Date statisticsEndDatetime;

    @Column(name = "project_key")
    private String projectKey;

    @Column(name = "max_fetch_count")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long maxFetchCount;

    @Column(name = "total_fetch_count")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long totalFetchCount;

}