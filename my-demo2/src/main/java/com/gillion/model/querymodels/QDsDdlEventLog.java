package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.DsDdlEventLog;

import java.lang.Boolean;
import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QDsDdlEventLog extends BaseModelExpression<DsDdlEventLog, Long> {

    public static final BaseModelExpression<DsDdlEventLog, Long> dsDdlEventLog = new QDsDdlEventLog();
    public static final FieldExpression<Long> ddlEventLogId = dsDdlEventLog.fieldOf("ddlEventLogId", Long.class);
    public static final FieldExpression<Boolean> eventType = dsDdlEventLog.fieldOf("eventType", Boolean.class);
    public static final FieldExpression<String> ddlSql = dsDdlEventLog.fieldOf("ddlSql", String.class);
    public static final FieldExpression<String> creator = dsDdlEventLog.fieldOf("creator", String.class);
    public static final FieldExpression<Date> createTime = dsDdlEventLog.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> modifier = dsDdlEventLog.fieldOf("modifier", String.class);
    public static final FieldExpression<Date> modifyTime = dsDdlEventLog.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Integer> version = dsDdlEventLog.fieldOf("version", Integer.class);
    public static final FieldExpression<Boolean> destroyed = dsDdlEventLog.fieldOf("destroyed", Boolean.class);
    public static final FieldExpression<String> groupName = dsDdlEventLog.fieldOf("groupName", String.class);


    public QDsDdlEventLog() {
        super("DsDdlEventLog", DsDdlEventLog.class);
    }

    QDsDdlEventLog(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "DsDdlEventLog", DsDdlEventLog.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return ddlEventLogId;
    }
}
