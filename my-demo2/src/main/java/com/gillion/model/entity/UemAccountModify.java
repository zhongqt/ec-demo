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
@Table(name = "uem_account_modify")
public class UemAccountModify extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**id*/
    @Id
    @Column(name = "uem_account_modify_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    @Generator("snowFlakeGenerator")
    private Long uemAccountModifyId;

    /**关联用户id*/
    @Column(name = "uem_user_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long uemUserId;

    /**操作类型（1-修改用户名，2-修改密码，3-找回密码，4-修改手机，5-绑定邮箱，6-修改邮箱,7第三方账号绑定）*/
    @Column(name = "oper_type")
    private String operType;

    /**修改前数据*/
    @Column(name = "bef_data")
    private String befData;

    /**修改后数据*/
    @Column(name = "aft_data")
    private String aftData;

    /**修改激活方式*/
    @Column(name = "ssac_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long ssacId;

    /**第三方账号类型（0微信，1qq，2国家政务平台）*/
    @Column(name = "third_account_type")
    private String thirdAccountType;

    /**绑定时间*/
    @Column(name = "blind_time")
    private Date blindTime;

    /**解除绑定时间*/
    @Column(name = "unblind_time")
    private Date unblindTime;

    /**第三方账号ID*/
    @Column(name = "ssab_union_id")
    private String ssabUnionId;

    /**创建人id*/
    @Column(name = "creator_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long creatorId;

    /**创建人名称*/
    @Column(name = "creator_name")
    private String creatorName;

    /**创建时间*/
    @Column(name = "create_time")
    private Date createTime;

    /**修改人id*/
    @Column(name = "modifier_id")
    @JsonSerialize(using = Long2String.class)
    @JsonDeserialize(using = String2Long.class)
    private Long modifierId;

    /**修改人名称*/
    @Column(name = "modifier_name")
    private String modifierName;

    /**修改时间*/
    @Column(name = "modify_time")
    private Date modifyTime;

    /**版本号*/
    @Column(name = "record_version")
    private Integer recordVersion;

}