package com.gillion.controller;

import com.gillion.ds.client.api.queryobject.model.Page;
import com.gillion.ec.core.utils.ResultUtils;
import com.gillion.login.User;
import com.gillion.model.entity.Employee;
import com.gillion.model.vo.EmployeeVO;
import com.gillion.service.LoginService;
import com.gillion.service.impl.EmployeeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * @author wengms
 * @date 2021/1/11 3:35 下午
 * @email wengms@gillion.com.cn
 */
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private LoginService loginService;
    @Autowired
    private EmployeeServiceImpl employeeService;

    @PostMapping("/login")
    @ResponseBody
    public Map<String, Object> login(@RequestBody User user) {
        loginService.login(user);
        return ResultUtils.getSuccessResultData();
    }

    @GetMapping("/logout")
    @ResponseBody
    public Map<String, Object> login() {
        loginService.logout();
        return ResultUtils.getSuccessResultData();
    }

    @GetMapping("/Test/{id}")
    public Employee testFunction(Long id){
        return employeeService.QueryByEmployeeId(id);
    }
    @GetMapping("/Test2")
    public Employee testFunction2(){
        return employeeService.findByCnameAndMobile("test","123");
    }

}
