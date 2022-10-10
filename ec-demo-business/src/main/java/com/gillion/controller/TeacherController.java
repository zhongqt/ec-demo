package com.gillion.controller;

import com.gillion.ds.client.api.queryobject.model.Page;
import com.gillion.model.entity.Teacher;
import com.gillion.service.impl.TeacherServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/teacher")
public class TeacherController {
    @Autowired
    TeacherServiceImpl service;


    @PostMapping("/selectByExample")
    public Page<Teacher> selectByExample(
            @RequestParam(defaultValue = "1") Integer currentPage,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) String keyword){
        return service.selectByExample(currentPage,pageSize,keyword);
    }
}
