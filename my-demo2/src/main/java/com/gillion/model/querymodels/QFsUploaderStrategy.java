package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.FsUploaderStrategy;

import java.lang.Byte;
import java.lang.Integer;
import java.lang.Long;
import java.lang.String;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QFsUploaderStrategy extends BaseModelExpression<FsUploaderStrategy, String> {

    public static final BaseModelExpression<FsUploaderStrategy, String> fsUploaderStrategy = new QFsUploaderStrategy();
    public static final FieldExpression<String> id = fsUploaderStrategy.fieldOf("id", String.class);
    public static final FieldExpression<String> bucketName = fsUploaderStrategy.fieldOf("bucketName", String.class);
    public static final FieldExpression<String> allowExtensions = fsUploaderStrategy.fieldOf("allowExtensions", String.class);
    public static final FieldExpression<Long> sizeLimit = fsUploaderStrategy.fieldOf("sizeLimit", Long.class);
    public static final FieldExpression<Integer> countLimit = fsUploaderStrategy.fieldOf("countLimit", Integer.class);
    public static final FieldExpression<Byte> isLogicDelete = fsUploaderStrategy.fieldOf("isLogicDelete", Byte.class);
    public static final FieldExpression<String> largeThumbnailSize = fsUploaderStrategy.fieldOf("largeThumbnailSize", String.class);
    public static final FieldExpression<String> smallThumbnailSize = fsUploaderStrategy.fieldOf("smallThumbnailSize", String.class);


    public QFsUploaderStrategy() {
        super("FsUploaderStrategy", FsUploaderStrategy.class);
    }

    QFsUploaderStrategy(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "FsUploaderStrategy", FsUploaderStrategy.class, alias);
    }

    @Override
    public OperatorExpression<String> primaryKey() {
        return id;
    }
}
