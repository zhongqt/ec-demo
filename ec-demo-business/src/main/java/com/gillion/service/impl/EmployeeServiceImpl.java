package com.gillion.service.impl;

import com.gillion.ds.client.api.queryobject.model.Page;
import com.gillion.ds.entity.base.RowStatusConstants;
import com.gillion.model.entity.Dept;
import com.gillion.model.entity.Employee;
import com.gillion.model.querymodels.QDept;
import com.gillion.model.querymodels.QEmployee;
import com.gillion.service.EmployeeService;
import org.apache.commons.lang3.Validate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

/**
 * @author liaowj
 * @version 1.0.0.0
 * @date 2018-09-04 17:11
 * generate by daoService use Easy Code
 */
@Service("employeeService")
public class EmployeeServiceImpl implements EmployeeService {


    @Override
    public Employee findByCnameAndMobile(String cname, String mobile) {
        Validate.notBlank(cname);
        Validate.notBlank(mobile);
        return QEmployee.employee.selectOne()
                .where(QEmployee.cname.eq(cname).and(QEmployee.mobile.eq$(mobile)))
                .execute();
    }

    @Override
    public void transactionTest() {

    }

/*
    @Override
    public void transactionTest() {
        Employee employee = new Employee();
        employee.setId(2L);
        employee.setMobile("1234567");
        employee.setName("test2233");
        employee.setDepartmentId(1L);
        employee.setUsername("test225566");
        employee.setPassword("test677");

        employee.setRowStatus(RowStatusConstants.ROW_STATUS_ADDED);
        QEmployee.employee.save(employee);
    }
*/


    @Override
    public void saveEmployeeAndDept(Employee employee, Long deptId) {
        QEmployee.employee.fieldContainer();
        employee.setRowStatus(RowStatusConstants.ROW_STATUS_ADDED);
        QEmployee.employee.save(employee);
    }

    @Override
    public void batchEmployee(List<Employee> employees) {
        employees.forEach(x->{x.setRowStatus(RowStatusConstants.ROW_STATUS_ADDED);});
        QEmployee.employee.save(employees);
    }

    @Override
    public  Page<Employee> queryEmployPage() {

        return QEmployee.employee.select(QEmployee.employeeId,QEmployee.cname,
                 QEmployee.cname, QDept.deptName).paging(1,1).mapperTo(Employee.class).execute();
    }

    @Override
    public void updateEmployeeById(Long employeeId,Employee employee) {
        QEmployee.employee.update(QEmployee.age,QEmployee.cname)
                .where(QEmployee.employeeId.eq$(employeeId))
                .execute(employee.getAge(),employee.getEmployeeId());
    }

    @Override
    public void batchDeleteEmployee(List<Long> deleteEmployId) {
        QEmployee.employee.deleteById(deleteEmployId);
    }
    //????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
    @Override
    public HashMap<Dept,List<Employee>> queryEmployeeAndDeptByEmployeeId(String deptName) {
        //??????????????????????????????????????????????????????
        HashMap<Dept,List<Employee>> relativeDeptAndEmployee=new HashMap<>();
        //??????????????????
        Dept dept=QDept.dept.selectOne().where( QDept.deptName.eq$(deptName)).execute();
//        List<Employee> employees=QEmployee.employee.select().where(QEmployee..eq$(dept.getDeptId())).execute();
//        relativeDeptAndEmployee.put(dept,employees);
        return relativeDeptAndEmployee;
    }

    public Employee QueryByEmployeeId(Long id){
       return QEmployee.employee.selectOne().byId(id);
    }
}
