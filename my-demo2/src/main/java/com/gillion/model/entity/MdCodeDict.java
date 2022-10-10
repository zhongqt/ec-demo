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
import java.math.BigDecimal;


/**
 * @author DaoServiceGenerator
 */
@SuppressWarnings("JpaDataSourceORMInspection")
        @EqualsAndHashCode(callSuper = true)
    @Data
    @Entity
@Table(name = "md_code_dict")
public class MdCodeDict extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**物理主键*/
    @Id
    @Column(name = "md_code_dict_id")
    @Generator("snowFlakeGenerator")
    private BigDecimal mdCodeDictId;

    /**有效*/
    @Column(name = "active")
    private String active;

    /**字典类型代码*/
    @Column(name = "code_type")
    private String codeType;

    /**编码*/
    @Column(name = "code_value")
    private String codeValue;

    /**创建人所属组织*/
    @Column(name = "create_office")
    private String createOffice;

    /**录入时间*/
    @Column(name = "create_time")
    private String createTime;

    /**创建人时区*/
    @Column(name = "create_time_zone")
    private String createTimeZone;

    /**录入人*/
    @Column(name = "creator")
    private String creator;

    /**英文显示值*/
    @Column(name = "display_value")
    private String displayValue;

    /**中文显示值*/
    @Column(name = "display_value_cn")
    private String displayValueCn;

    /**修改人*/
    @Column(name = "last_modifyor")
    private String lastModifyor;

    /**最后修改人所属组织*/
    @Column(name = "last_modify_office")
    private String lastModifyOffice;

    /**修改时间*/
    @Column(name = "last_modify_time")
    private String lastModifyTime;

    /**最后修改人时区*/
    @Column(name = "last_modify_time_zone")
    private String lastModifyTimeZone;

    /**物理主键*/
    @Column(name = "md_code_type_id")
    private BigDecimal mdCodeTypeId;

    /**云服务分组代码*/
    @Column(name = "principal_group_code")
    private String principalGroupCode;

    /**版本号*/
    @Column(name = "record_version")
    private BigDecimal recordVersion;

    /**自定义码*/
    @Column(name = "relate_value")
    private String relateValue;

    /**备注*/
    @Column(name = "remark")
    private String remark;

    /**序号*/
    @Column(name = "serial_number")
    private BigDecimal serialNumber;

    /**结算公司代码*/
    @Column(name = "settle_office")
    private String settleOffice;

    /**结算公司*/
    @Column(name = "settle_office_name")
    private String settleOfficeName;

    @Column(name = "tmp_p_id")
    private BigDecimal tmpPId;

    @Column(name = "tmp_seq_id")
    private BigDecimal tmpSeqId;

}