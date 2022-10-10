package com.gillion.service.impl;

import com.gillion.ds.client.api.queryobject.model.Page;
import com.gillion.model.entity.Teacher;
import com.gillion.model.querymodels.QTeacher;
import com.gillion.service.TeacherService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class TeacherServiceImpl implements TeacherService {
    @Override
    public Page<Teacher> selectByExample(Integer currentPage,Integer pageSize,String keyword) {
        String[] split = keyword.split("，");
        Page<Teacher> teacherInfoPages=new Page<>();
        for (String s : split) {
            log.info("根据关键字:{}查找联想数据",s);
            Page<Teacher> tempPage=QTeacher.teacher.select(QTeacher.id,QTeacher.teacherName)
                    .where(QTeacher.teacherName._like$_(s)).paging(currentPage,pageSize)
                    .execute();
            List<Teacher> tempRecords = tempPage.getRecords();

            List<Teacher> currentRecords = teacherInfoPages.getRecords();
            currentRecords.addAll(tempRecords);
            teacherInfoPages.setRecords(currentRecords);

        }
        return teacherInfoPages;
    }
}
