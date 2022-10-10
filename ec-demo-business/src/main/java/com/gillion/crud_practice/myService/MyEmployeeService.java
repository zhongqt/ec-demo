package com.gillion.crud_practice.myService;

import com.gillion.crud_practice.model.vo.EmployeeVo;
import com.gillion.model.entity.Dept;
import com.gillion.crud_practice.model.entity.Employee;
import com.gillion.model.vo.EmployeeVO;
import com.gillion.ds.client.api.queryobject.model.Page;

import java.util.HashMap;
import java.util.List;

/**
 * @author liaowj
 * @version 1.0.0.0
 * @date 2018-09-04 17:11
 */
public interface MyEmployeeService {

    Employee findByCnameAndMobile(String cname, String mobile);

    void transactionTest();

    boolean saveEmployeeAndDept(Employee employee,String departmentName);
    boolean batchEmployee(List<EmployeeVo> employees);
    Page<Employee> queryEmployPage(int pageCurrent,int pageSize);
    boolean updateEmployeeById(Employee employee);
    boolean batchDeleteEmployee(List<Long> deleteEmployId );
    HashMap<Dept,List<Employee>> queryEmployeeAndDeptByEmployeeId(String deptName);

}
