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
import java.lang.Byte;
import java.lang.Integer;
import java.lang.Long;
import java.lang.String;


/**
 * @author DaoServiceGenerator
 */
@SuppressWarnings("JpaDataSourceORMInspection")
        @EqualsAndHashCode(callSuper = true)
    @Data
    @Entity
@Table(name = "fs_uploader_strategy")
public class FsUploaderStrategy extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    @Id
    @Column(name = "id")
    @Generator("snowFlakeGenerator")
    private String id;

    @Column(name = "bucket_name")
    private String bucketName;

    @Column(name = "allow_extensions")
    private String allowExtensions;

    @Column(name = "size_limit")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long sizeLimit;

    @Column(name = "count_limit")
    private Integer countLimit;

    @Column(name = "is_logic_delete")
    private Byte isLogicDelete;

    @Column(name = "large_thumbnail_size")
    private String largeThumbnailSize;

    @Column(name = "small_thumbnail_size")
    private String smallThumbnailSize;

}