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
@Table(name = "file_info")
public class FileInfo extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**主键ID*/
    @Id
    @Column(name = "file_info_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long fileInfoId;

    /**运输申请id*/
    @Column(name = "go_order_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long goOrderId;

    /**文件类型 1-交办单 2-运输方案 3-需求单  4-其他*/
    @Column(name = "file_type")
    private String fileType;

    /**文件编号*/
    @Column(name = "file_no")
    private String fileNo;

    /**文件名称(文件全称，带后缀，如temp.pdf)*/
    @Column(name = "file_name")
    private String fileName;

    /**文件存放在文件服务器的地址（保留字段）*/
    @Column(name = "file_url")
    private String fileUrl;

    /**容器名称（保留字段）*/
    @Column(name = "bucket_name")
    private String bucketName;

    /**对象名称（存储文件上传后返回的filekey）*/
    @Column(name = "object_key")
    private String objectKey;

    /**删除标志*/
    @Column(name = "is_deleted")
    private Boolean isDeleted;

    /**文件来源*/
    @Column(name = "file_source")
    private String fileSource;

    /**文件保密级别*/
    @Column(name = "file_level")
    private String fileLevel;

    /**浏览次数*/
    @Column(name = "file_visits")
    private String fileVisits;

    /**下载次数*/
    @Column(name = "file_downloads")
    private Integer fileDownloads;

    /**备注*/
    @Column(name = "file_remark")
    private String fileRemark;

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

    /**文件分类（疫苗企业资质类型子表）*/
    @Column(name = "file_sort")
    private String fileSort;

    /**业务id，所有记录表的主键ID*/
    @Column(name = "business_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long businessId;

}