package com.gillion.service;

import com.gillion.ds.client.api.queryobject.model.Page;
import com.gillion.model.entity.Teacher;

public interface TeacherService {
     Page<Teacher> selectByExample(Integer currentPage,Integer pageSize,String keyword);
}
