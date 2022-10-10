package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.SysGridLayout;

import java.lang.Integer;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QSysGridLayout extends BaseModelExpression<SysGridLayout, String> {

    public static final BaseModelExpression<SysGridLayout, String> sysGridLayout = new QSysGridLayout();
    public static final FieldExpression<String> sysGridLayoutId = sysGridLayout.fieldOf("sysGridLayoutId", String.class);
    public static final FieldExpression<Integer> userId = sysGridLayout.fieldOf("userId", Integer.class);
    public static final FieldExpression<Integer> roleId = sysGridLayout.fieldOf("roleId", Integer.class);
    public static final FieldExpression<String> tableId = sysGridLayout.fieldOf("tableId", String.class);
    public static final FieldExpression<String> content = sysGridLayout.fieldOf("content", String.class);
    public static final FieldExpression<String> name = sysGridLayout.fieldOf("name", String.class);
    public static final FieldExpression<Date> modifyTime = sysGridLayout.fieldOf("modifyTime", Date.class);


    public QSysGridLayout() {
        super("SysGridLayout", SysGridLayout.class);
    }

    QSysGridLayout(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "SysGridLayout", SysGridLayout.class, alias);
    }

    @Override
    public OperatorExpression<String> primaryKey() {
        return sysGridLayoutId;
    }
}
