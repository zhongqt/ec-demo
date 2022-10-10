package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.FileOperationHistory;

import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QFileOperationHistory extends BaseModelExpression<FileOperationHistory, Long> {

    public static final BaseModelExpression<FileOperationHistory, Long> fileOperationHistory = new QFileOperationHistory();
    public static final FieldExpression<Long> fileOperationHistoryId = fileOperationHistory.fieldOf("fileOperationHistoryId", Long.class);
    public static final FieldExpression<Long> fileInfoid = fileOperationHistory.fieldOf("fileInfoid", Long.class);
    public static final FieldExpression<String> fileNumberVisits = fileOperationHistory.fieldOf("fileNumberVisits", String.class);
    public static final FieldExpression<String> fileVisitors = fileOperationHistory.fieldOf("fileVisitors", String.class);
    public static final FieldExpression<String> fileVisitorIp = fileOperationHistory.fieldOf("fileVisitorIp", String.class);
    public static final FieldExpression<Date> fileBrowseTime = fileOperationHistory.fieldOf("fileBrowseTime", Date.class);
    public static final FieldExpression<String> fileDownloads = fileOperationHistory.fieldOf("fileDownloads", String.class);
    public static final FieldExpression<String> fileDownloaders = fileOperationHistory.fieldOf("fileDownloaders", String.class);
    public static final FieldExpression<String> fileDownloadersIp = fileOperationHistory.fieldOf("fileDownloadersIp", String.class);
    public static final FieldExpression<Date> fileDownloadTime = fileOperationHistory.fieldOf("fileDownloadTime", Date.class);
    public static final FieldExpression<String> creatorId = fileOperationHistory.fieldOf("creatorId", String.class);
    public static final FieldExpression<String> creatorName = fileOperationHistory.fieldOf("creatorName", String.class);
    public static final FieldExpression<Date> createTime = fileOperationHistory.fieldOf("createTime", Date.class);
    public static final FieldExpression<String> createCompanyId = fileOperationHistory.fieldOf("createCompanyId", String.class);
    public static final FieldExpression<String> createCompanyName = fileOperationHistory.fieldOf("createCompanyName", String.class);
    public static final FieldExpression<String> modifierId = fileOperationHistory.fieldOf("modifierId", String.class);
    public static final FieldExpression<String> modifierName = fileOperationHistory.fieldOf("modifierName", String.class);
    public static final FieldExpression<Date> modifyTime = fileOperationHistory.fieldOf("modifyTime", Date.class);
    public static final FieldExpression<String> modifyCompanyId = fileOperationHistory.fieldOf("modifyCompanyId", String.class);
    public static final FieldExpression<String> modifyCompanyName = fileOperationHistory.fieldOf("modifyCompanyName", String.class);
    public static final FieldExpression<Integer> recordVersion = fileOperationHistory.fieldOf("recordVersion", Integer.class);


    public QFileOperationHistory() {
        super("FileOperationHistory", FileOperationHistory.class);
    }

    QFileOperationHistory(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "FileOperationHistory", FileOperationHistory.class, alias);
    }

    @Override
    public OperatorExpression<Long> primaryKey() {
        return fileOperationHistoryId;
    }
}
