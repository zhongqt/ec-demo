package com.gillion.crud_practice.controller;

import com.gillion.crud_practice.model.entity.Employee;
import com.gillion.crud_practice.model.vo.EmployeeVo;
import com.gillion.crud_practice.myService.MyEmployeeService;
import com.gillion.ds.client.api.queryobject.model.Page;
import com.gillion.model.entity.Dept;
import javafx.geometry.Pos;
import oracle.jdbc.proxy.annotation.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/myEmployee")
public class TestController {
    @Autowired
    MyEmployeeService employeeService;
    @GetMapping("/queryEmployee/{pageCurrent}/{pageSize}")
    public Page<Employee> queryEmployee(@PathVariable("pageCurrent") int pageCurrent,@PathVariable("pageSize") int pageSize){
        Page<Employee> employeePage = employeeService.queryEmployPage(pageCurrent,pageSize);

        return employeePage;
    }
    @GetMapping("/queryDeptAndEmployeeInfo/{deptName}")
    public HashMap<Dept, List<Employee>> queryEmployeeAndDept(@PathVariable("deptName") String deptName){
        return employeeService.queryEmployeeAndDeptByEmployeeId(deptName);
    }
    @PostMapping("/updateEmployeeById")
    public String updateEmployeeById(@RequestBody Employee employee){
        if(employeeService.updateEmployeeById(employee)){
            return "success";
        }else{
            return "fail";
        }
    }

    @PostMapping("/batchAdd")
    public String batchAddEmployee(@RequestBody List<EmployeeVo> employees){
        if (employeeService.batchEmployee(employees)){
            return "success";
        }else{
            return "fail";
        }
    }
    @PostMapping("/add")
    public String addEmployee(@RequestBody EmployeeVo employee){
        Employee employee1=new Employee();
        employee1.setName(employee.getName());
        employee1.setCname(employee.getCname());
        employee1.setPassword(employee.getPassword());

        if(employeeService.saveEmployeeAndDept(employee1,employee.getDepartmentName())){
            return "success";
        }else{
            return "fail";
        }
    }
    @PostMapping("/batchDecEmployees")
    public  String batchDecEmployees(@RequestBody List<Long> deleteEmployId){
        if(employeeService.batchDeleteEmployee(deleteEmployId)){
            return "success";
        }else{
            return "fail";
        }
    }

}
