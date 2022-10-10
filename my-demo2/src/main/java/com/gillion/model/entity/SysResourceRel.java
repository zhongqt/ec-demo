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
import java.lang.Integer;
import java.lang.String;
import java.util.Date;


/**
 * @author DaoServiceGenerator
 */
@SuppressWarnings("JpaDataSourceORMInspection")
        @EqualsAndHashCode(callSuper = true)
    @Data
    @Entity
@Table(name = "sys_resource_rel")
public class SysResourceRel extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    @Id
    @Column(name = "resource_rel_id")
    @Generator("snowFlakeGenerator")
    private Integer resourceRelId;

    @Column(name = "resource_id")
    private Integer resourceId;

    @Column(name = "parent_resource_id")
    private Integer parentResourceId;

    @Column(name = "created_dtm_loc")
    private Date createdDtmLoc;

    @Column(name = "updated_by_user")
    private String updatedByUser;

    @Column(name = "updated_dtm_loc")
    private Date updatedDtmLoc;

    @Column(name = "created_by_user")
    private Integer createdByUser;

}