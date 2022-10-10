package com.gillion.handlers;

import com.gillion.ds.excel.input.model.NoMoreImportRecord;
import com.gillion.ds.inout.annotation.InoutHandlerFor;
import com.gillion.ds.inout.chain.ImportInvoker;
import com.gillion.ds.inout.chain.handler.ImportCommand;
import com.gillion.ds.inout.chain.handler.ImportHandler;
import com.gillion.ds.inout.chain.model.ImportRecord;
import com.gillion.ds.inout.model.HandlerType;
import com.gillion.model.querymodels.QStudent;
import com.gillion.model.querymodels.QWaybillInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@InoutHandlerFor(tag = "import_student_list", handlerType = HandlerType.BEFORE_IMPORT_VALIDATE)
@Slf4j
public class ImportStudentHandler implements ImportHandler {
    @Override
    public ImportRecord handle(ImportInvoker importInvoker, ImportCommand importCommand) {
        final ImportRecord record = importCommand.getRecord();
        if (record instanceof NoMoreImportRecord){
            return importInvoker.invoke(importCommand);
        }
        final int age = record.getCellValue(QStudent.age);

        log.info("age:{}",age);
        if(age>=18){
            return importInvoker.invoke(importCommand);
        }else{
            log.info("导入失败年龄小于于18");
            return importInvoker.invoke(importCommand);
        }
    }
}
