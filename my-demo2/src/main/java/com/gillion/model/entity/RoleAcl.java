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
import java.lang.Byte;
import java.lang.Integer;
import java.lang.String;


/**
 * @author DaoServiceGenerator
 */
@SuppressWarnings("JpaDataSourceORMInspection")
        @EqualsAndHashCode(callSuper = true)
    @Data
    @Entity
@Table(name = "role_acl")
public class RoleAcl extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    @Id
    @Column(name = "role_acl_id")
    @Generator("snowFlakeGenerator")
    private Integer roleAclId;

    @Column(name = "role_id")
    private Integer roleId;

    @Column(name = "acl_table_id")
    private Integer aclTableId;

    @Column(name = "conditions")
    private String conditions;

    @Column(name = "condition_sql")
    private String conditionSql;

    @Column(name = "crud_type")
    private Byte crudType;

}