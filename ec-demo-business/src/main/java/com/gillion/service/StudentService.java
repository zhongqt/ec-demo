package com.gillion.service;

import com.gillion.ds.client.api.queryobject.model.Page;
import com.gillion.model.entity.Student;
import com.gillion.model.entity.Teacher;

public interface StudentService {
    Page<Student> selectAllStudent(Page page);
}
