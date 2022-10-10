package com.gillion.service;

import com.gillion.ds.client.api.queryobject.model.Page;
import com.gillion.model.entity.Dept;
import com.gillion.model.entity.Employee;

import java.util.HashMap;
import java.util.List;

/**
 * @author liaowj
 * @version 1.0.0.0
 * @date 2018-09-04 17:11
 */
public interface EmployeeService {

    Employee findByCnameAndMobile(String cname, String mobile);

    void transactionTest();

    void saveEmployeeAndDept(Employee employee,Long deptId);
    void batchEmployee(List<Employee> employees);
    Page<Employee> queryEmployPage();
    void updateEmployeeById(Long employeeId,Employee employee);
    void batchDeleteEmployee(List<Long> deleteEmployId );
    HashMap<Dept,List<Employee>> queryEmployeeAndDeptByEmployeeId(String deptName);

}
