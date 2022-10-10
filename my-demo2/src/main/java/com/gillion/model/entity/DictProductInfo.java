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
@Table(name = "dict_product_info")
public class DictProductInfo extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**货物产品编号*/
    @Id
    @Column(name = "product_type_code")
    @Generator("snowFlakeGenerator")
    private String productTypeCode;

    /**货物类型名称*/
    @Column(name = "product_name")
    private String productName;

}