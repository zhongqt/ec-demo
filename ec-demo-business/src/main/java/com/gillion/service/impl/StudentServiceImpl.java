package com.gillion.service.impl;

import com.gillion.ds.client.api.queryobject.model.Page;
import com.gillion.model.entity.Student;
import com.gillion.model.querymodels.QStudent;
import com.gillion.service.StudentService;
import org.springframework.stereotype.Service;

@Service
public class StudentServiceImpl implements StudentService {

    @Override
    public Page<Student> selectAllStudent(Page page) {
        return QStudent.student.select(QStudent.student.fieldContainer()).paging(page.getCurrentPage(),page.getPageSize()).execute();
    }
}
