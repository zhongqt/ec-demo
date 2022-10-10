package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.SysDictCode;

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
public class QSysDictCode extends BaseModelExpression<SysDictCode, Long> {

    public static final BaseModelExpression<SysDictCode, Long> sysDictCode = new QSysDictCode();
    public static final FieldExpression<Long> sysDictCodeId = sysDictCode.fieldOf("sysDictCodeId", Long.class);
    public static final FieldExpression<Long> sysDictTypeId = sysDictCode.fieldOf("sysDictTypeId", Long.class);
    public static final FieldExpression<Integer> dictSort = sysDictCode.fieldOf("dictSort", Integer.class);
    public static final FieldExpression<String> dictCode = sysDictCode.fieldOf("dictCode", String.class);
    public static final FieldExpression<String> dictName = sysDictCode.fieldOf("dictName", String.class);
    public static final FieldExpression<String> remark = sysDictCode.fieldOf("remark", String.class);
    public static final FieldExpression<Boolean> isValid = sysDictCode.fieldOf("isValid", Boolean.class);
    public static final FieldExpression<Date> invalidTime = sysDictCode.fieldOf("invalidTime", Date.class);
    public static final FieldExpression<Long> creatorId = sysDictCode.fieldOf("creatorId", Long.class);
    public static final FieldExpression<String> creatorName = sysDictCode.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = sysDictCode.fieldOf("createTime", Date.class);
    public static final FieldExpression<Long> modifierId = sysDictCode.fieldOf("modifierId", Long.class);
    public static final FieldExpression<String> modifierName = sysDictCode.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = sysDictCode.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<Integer> recordVersion = sysDictCode.fieldOf("recordVersion", Integer.class);


    public QSysDictCode() {
        super("SysDictCode", SysDictCode.class);
    }

    QSysDictCode(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "SysDictCode", SysDictCode.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return sysDictCodeId;
    }
}
