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
@Table(name = "pre_order")
public class PreOrder extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**主键*/
    @Id
    @Column(name = "pre_order_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long preOrderId;

    /**订单号：生成规则为：来源code+yyyyMMdd+SN:6*/
    @Column(name = "order_code")
    private String orderCode;

    /**来源*/
    @Column(name = "source_code")
    private String sourceCode;

    /**sku代码*/
    @Column(name = "sku_code")
    private String skuCode;

    /**区域代码*/
    @Column(name = "area_code")
    private String areaCode;

    /**客户代码*/
    @Column(name = "customer_code")
    private String customerCode;

    /**货品数量*/
    @Column(name = "quantity")
    private Integer quantity;

    /**送货地址*/
    @Column(name = "address")
    private String address;

    /**创建时间*/
    @Column(name = "create_time")
    private Date createTime;

    /**状态：未处理=1，处理完成=2，处理失败=3，库存扣减中=4*/
    @Column(name = "status")
    private Integer status;

    /**处理定时任务的分区号*/
    @Column(name = "sharded_number")
    private Integer shardedNumber;

}