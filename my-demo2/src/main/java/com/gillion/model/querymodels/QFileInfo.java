package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.FileInfo;

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
public class QFileInfo extends BaseModelExpression<FileInfo, Long> {

    public static final BaseModelExpression<FileInfo, Long> fileInfo = new QFileInfo();
    public static final FieldExpression<Long> fileInfoId = fileInfo.fieldOf("fileInfoId", Long.class);
    public static final FieldExpression<Long> goOrderId = fileInfo.fieldOf("goOrderId", Long.class);
    public static final FieldExpression<String> fileType = fileInfo.fieldOf("fileType", String.class);
    public static final FieldExpression<String> fileNo = fileInfo.fieldOf("fileNo", String.class);
    public static final FieldExpression<String> fileName = fileInfo.fieldOf("fileName", String.class);
    public static final FieldExpression<String> fileUrl = fileInfo.fieldOf("fileUrl", String.class);
    public static final FieldExpression<String> bucketName = fileInfo.fieldOf("bucketName", String.class);
    public static final FieldExpression<String> objectKey = fileInfo.fieldOf("objectKey", String.class);
    public static final FieldExpression<Boolean> isDeleted = fileInfo.fieldOf("isDeleted", Boolean.class);
    public static final FieldExpression<String> fileSource = fileInfo.fieldOf("fileSource", String.class);
    public static final FieldExpression<String> fileLevel = fileInfo.fieldOf("fileLevel", String.class);
    public static final FieldExpression<String> fileVisits = fileInfo.fieldOf("fileVisits", String.class);
    public static final FieldExpression<Integer> fileDownloads = fileInfo.fieldOf("fileDownloads", Integer.class);
    public static final FieldExpression<String> fileRemark = fileInfo.fieldOf("fileRemark", String.class);
    public static final FieldExpression<String> creatorId = fileInfo.fieldOf("creatorId", String.class);
    public static final FieldExpression<String> creatorName = fileInfo.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = fileInfo.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> createCompanyId = fileInfo.fieldOf("createCompanyId", String.class);
    public static final FieldExpression<String> createCompanyName = fileInfo.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<String> modifierId = fileInfo.fieldOf("modifierId", String.class);
    public static final FieldExpression<String> modifierName = fileInfo.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = fileInfo.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<String> modifyCompanyId = fileInfo.fieldOf("modifyCompanyId", String.class);
    public static final FieldExpression<String> modifyCompanyName = fileInfo.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = fileInfo.fieldOf("recordVersion", Integer.class);
    public static final FieldExpression<String> fileSort = fileInfo.fieldOf("fileSort", String.class);
    public static final FieldExpression<Long> businessId = fileInfo.fieldOf("businessId", Long.class);


    public QFileInfo() {
        super("FileInfo", FileInfo.class);
    }

    QFileInfo(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "FileInfo", FileInfo.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return fileInfoId;
    }
}
