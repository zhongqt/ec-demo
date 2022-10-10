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
@Table(name = "file_operation_history")
public class FileOperationHistory extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**主键ID*/
    @Id
    @Column(name = "file_operation_history_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long fileOperationHistoryId;

    /**文件ID*/
    @Column(name = "file_infoid")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long fileInfoid;

    /**浏览次数*/
    @Column(name = "file_number_visits")
    private String fileNumberVisits;

    /**浏览人*/
    @Column(name = "file_visitors")
    private String fileVisitors;

    /**浏览人IP*/
    @Column(name = "file_visitor_ip")
    private String fileVisitorIp;

    /**浏览时间*/
    @Column(name = "file_browse_time")
    private Date fileBrowseTime;

    /**下载次数*/
    @Column(name = "file_downloads")
    private String fileDownloads;

    /**下载人*/
    @Column(name = "file_downloaders")
    private String fileDownloaders;

    /**下载人IP*/
    @Column(name = "file_downloaders_ip")
    private String fileDownloadersIp;

    /**下载时间*/
    @Column(name = "file_download_time")
    private Date fileDownloadTime;

    /**创建人id*/
    @Column(name = "creator_id")
    private String creatorId;

    /**创建名称*/
    @Column(name = "creator_name")
    private String creatorName;

    /**创建时间*/
    @Column(name = "create_time")
    private Date createTime;

    /**创建人所属公司id*/
    @Column(name = "create_company_id")
    private String createCompanyId;

    /**创建人所属公司name*/
    @Column(name = "create_company_name")
    private String createCompanyName;

    /**修改人id*/
    @Column(name = "modifier_id")
    private String modifierId;

    /**修改人名称*/
    @Column(name = "modifier_name")
    private String modifierName;

    /**修改时间*/
    @Column(name = "modify_time")
    private Date modifyTime;

    /**修改人公司id*/
    @Column(name = "modify_company_id")
    private String modifyCompanyId;

    /**修改人所属公司name*/
    @Column(name = "modify_company_name")
    private String modifyCompanyName;

    /**版本号*/
    @Column(name = "record_version")
    private Integer recordVersion;

}