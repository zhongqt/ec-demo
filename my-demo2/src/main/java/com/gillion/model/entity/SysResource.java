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
@Table(name = "sys_resource")
public class SysResource extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**资源Id*/
    @Id
    @Column(name = "resource_id")
    @Generator("snowFlakeGenerator")
    private Integer resourceId;

    /**资源地址*/
    @Column(name = "url")
    private String url;

    /**类型：1地址；2按钮*/
    @Column(name = "url_lx")
    private String urlLx;

    /**资源图标*/
    @Column(name = "url_img")
    private String urlImg;

    /**资源级别*/
    @Column(name = "url_level")
    private Integer urlLevel;

    @Column(name = "url_seq")
    private Integer urlSeq;

    /**资源名称*/
    @Column(name = "url_title")
    private String urlTitle;

    /**状态*/
    @Column(name = "status")
    private String status;

    /**创建本地时间*/
    @Column(name = "created_dtm_loc")
    private Date createdDtmLoc;

    /**创建国际时间*/
    @Column(name = "created_time_zone")
    private String createdTimeZone;

    /**更新人Id*/
    @Column(name = "updated_by_user")
    private String updatedByUser;

    /**更新时间*/
    @Column(name = "updated_dtm_loc")
    private Date updatedDtmLoc;

    /**更新国际时间*/
    @Column(name = "updated_time_zone")
    private String updatedTimeZone;

    /**排序*/
    @Column(name = "display_order")
    private Integer displayOrder;

    /**创建人Id*/
    @Column(name = "created_by_user")
    private Integer createdByUser;

}