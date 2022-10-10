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
import java.lang.Long;
import java.lang.String;


/**
 * @author DaoServiceGenerator
 */
@SuppressWarnings("JpaDataSourceORMInspection")
        @EqualsAndHashCode(callSuper = true)
    @Data
    @Entity
@Table(name = "fs_file_info")
public class FsFileInfo extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    @Id
    @Column(name = "file_key")
    @Generator("snowFlakeGenerator")
    private String fileKey;

    @Column(name = "name")
    private String name;

    @Column(name = "url")
    private String url;

    @Column(name = "etag")
    private String etag;

    @Column(name = "byte_size")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long byteSize;

    @Column(name = "uploader_strategy_id")
    private String uploaderStrategyId;

    @Column(name = "large_thumbnail_url")
    private String largeThumbnailUrl;

    @Column(name = "large_thumbnail_etag")
    private String largeThumbnailEtag;

    @Column(name = "small_thumbnail_url")
    private String smallThumbnailUrl;

    @Column(name = "small_thumbnail_etag")
    private String smallThumbnailEtag;

}