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
@Table(name = "food_port_ship_count_daily_temp")
public class FoodPortShipCountDailyTemp extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    @Id
    @Column(name = "id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long id;

    @Column(name = "date")
    private Date date;

    @Column(name = "port_code")
    private String portCode;

    @Column(name = "port_name")
    private String portName;

    @Column(name = "less_than_five")
    private Integer lessThanFive;

    @Column(name = "greater_than_five")
    private Integer greaterThanFive;

    @Column(name = "less_than_five_weight")
    private BigDecimal lessThanFiveWeight;

    @Column(name = "greater_than_five_weight")
    private BigDecimal greaterThanFiveWeight;

    @Column(name = "create_time")
    private Date createTime;

    @Column(name = "good_name")
    private String goodName;

    @Column(name = "greater_company_info")
    private String greaterCompanyInfo;

    @Column(name = "less_company_info")
    private String lessCompanyInfo;

}