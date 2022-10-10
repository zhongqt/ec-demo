package com.gillion.controller;

import com.gillion.ds.client.api.queryobject.model.Page;
import com.gillion.model.entity.Student;
import com.gillion.service.impl.StudentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class StudentController {
    @Autowired
    StudentServiceImpl service;
    @PostMapping("TeacherAndStudent")
    public Page<Student> queryAllStudent( @RequestParam(defaultValue = "1") Integer currentPage,
                                          @RequestParam(defaultValue = "10") Integer pageSize){
        return service.selectAllStudent(new Page(currentPage,pageSize));
    }
}
