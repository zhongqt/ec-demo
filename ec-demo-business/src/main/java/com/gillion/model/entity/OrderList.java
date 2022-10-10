package com.gillion.model.entity;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.gillion.ds.entity.base.BaseModel;
import com.gillion.ec.core.annotations.Generator;
import com.gillion.ec.core.utils.Long2String;
import com.gillion.ec.core.utils.String2Long;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;


/**
 * @author DaoServiceGenerator
 */
@SuppressWarnings("JpaDataSourceORMInspection")
        @EqualsAndHashCode(callSuper = true)
    @Data
    @Entity
@Table(name = "order_list")
public class OrderList extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**订单ID*/
    @Id
    @Column(name = "order_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long orderId;

    /**订单号*/
    @Column(name = "order_code")
    private String orderCode;

    /**订单来源id*/
    @Column(name = "order_source_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long orderSourceId;

    /**skuid*/
    @Column(name = "sku_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long skuId;

    /**客户id*/
    @Column(name = "customer_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long customerId;

    /**地区编码*/
    @Column(name = "area_code")
    private String areaCode;

    /**货品数量*/
    @Column(name = "quantity")
    private Integer quantity;

    /**送货地址*/
    @Column(name = "address")
    private String address;

    /**创建时间*/
    @Column(name = "create_time")
    private Date createTime;

    /**时效时间*/
    @Column(name = "aging_time")
    private Date agingTime;

    /**标识 0x1(2,4,8)*/
    @Column(name = "status")
    private Integer status;

}