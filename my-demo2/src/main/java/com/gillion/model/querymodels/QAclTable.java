package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.AclTable;

import java.lang.Byte;
import java.lang.Integer;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QAclTable extends BaseModelExpression<AclTable, Integer> {

    public static final BaseModelExpression<AclTable, Integer> aclTable = new QAclTable();
    public static final FieldExpression<Integer> aclTableId = aclTable.fieldOf("aclTableId", Integer.class);
    public static final FieldExpression<Byte> aclType = aclTable.fieldOf("aclType", Byte.class);
    public static final FieldExpression<String> tableName = aclTable.fieldOf("tableName", String.class);
    public static final FieldExpression<Date> createTime = aclTable.fieldOf("createTime", Date.class);
    public static final FieldExpression<Integer> createrId = aclTable.fieldOf("createrId", Integer.class);
    public static final FieldExpression<Date> updateTime = aclTable.fieldOf("updateTime", Date.class);
    public static final FieldExpression<Integer> updaterId = aclTable.fieldOf("updaterId", Integer.class);
    public static final FieldExpression<String> remarks = aclTable.fieldOf("remarks", String.class);
    public static final FieldExpression<String> aclMode = aclTable.fieldOf("aclMode", String.class);


    public QAclTable() {
        super("AclTable", AclTable.class);
    }

    QAclTable(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "AclTable", AclTable.class, alias);
    }

    @Override
    public OperatorExpression<Integer> primaryKey() {
        return aclTableId;
    }
}
