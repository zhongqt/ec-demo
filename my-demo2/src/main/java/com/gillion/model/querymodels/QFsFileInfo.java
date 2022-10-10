package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.FsFileInfo;

import java.lang.Long;
import java.lang.String;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QFsFileInfo extends BaseModelExpression<FsFileInfo, String> {

    public static final BaseModelExpression<FsFileInfo, String> fsFileInfo = new QFsFileInfo();
    public static final FieldExpression<String> fileKey = fsFileInfo.fieldOf("fileKey", String.class);
    public static final FieldExpression<String> name = fsFileInfo.fieldOf("name", String.class);
    public static final FieldExpression<String> url = fsFileInfo.fieldOf("url", String.class);
    public static final FieldExpression<String> etag = fsFileInfo.fieldOf("etag", String.class);
    public static final FieldExpression<Long> byteSize = fsFileInfo.fieldOf("byteSize", Long.class);
    public static final FieldExpression<String> uploaderStrategyId = fsFileInfo.fieldOf("uploaderStrategyId", String.class);
    public static final FieldExpression<String> largeThumbnailUrl = fsFileInfo.fieldOf("largeThumbnailUrl", String.class);
    public static final FieldExpression<String> largeThumbnailEtag = fsFileInfo.fieldOf("largeThumbnailEtag", String.class);
    public static final FieldExpression<String> smallThumbnailUrl = fsFileInfo.fieldOf("smallThumbnailUrl", String.class);
    public static final FieldExpression<String> smallThumbnailEtag = fsFileInfo.fieldOf("smallThumbnailEtag", String.class);


    public QFsFileInfo() {
        super("FsFileInfo", FsFileInfo.class);
    }

    QFsFileInfo(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "FsFileInfo", FsFileInfo.class, alias);
    }

    @Override
    public OperatorExpression<String> primaryKey() {
        return fileKey;
    }
}
