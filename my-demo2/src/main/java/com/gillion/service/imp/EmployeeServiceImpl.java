package com.gillion.service.imp;

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
/*        Validate.notBlank(cname);
        Validate.notBlank(mobile);
        return QEmployee.employee.selectOne()
                .where(QEmployee.cname.eq(cname).and(QEmployee.mobile.eq$(mobile)))
                .execute();*/
        return null;
    }

    @Override
    public void transactionTest() {
       /* Employee employee = new Employee();
        employee.setEmployeeId(2L);
        employee.setMobile("1234567");
        employee.setCname("test2233");
        employee.setDeptId(1L);
        employee.setUsername("test225566");
        employee.setPassword("test677");

        employee.setRowStatus(RowStatusConstants.ROW_STATUS_ADDED);
        QEmployee.employee.save(employee);*/
    }


    /*
*   ① 保存员工信息的同时还可以添加部门
    ② 批量保存员工
    ③ 查询员工返回分页数据源
    ④ 根据员工id可更新员工信息
    ⑤ 可批量删除员工*/
    @Override
    public void saveEmployeeAndDept(Employee employee, Long deptId) {
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

        return QEmployee.employee.select(QEmployee.id,QEmployee.name,
                  QDept.deptName).paging(1,10).mapperTo(Employee.class).execute();
    }

    @Override
    public void updateEmployeeById(Long employeeId,Employee employee) {
        QEmployee.employee.update(QEmployee.age,QEmployee.name)
                .where(QEmployee.id.eq$(employeeId))
                .execute(employee.getAge(),employee.getName());
    }

    @Override
    public void batchDeleteEmployee(List<Long> deleteEmployId) {
        QEmployee.employee.deleteById(deleteEmployId);
    }
    //部门与员工为一对多关系，要求可通过部门名称或者员工名称查询出部门与员工关联关系信息列表。
    @Override
    public HashMap<Dept,List<Employee>> queryEmployeeAndDeptByEmployeeId(String deptName) {
        //根据部门名称查询出部门与员工关系列表
        HashMap<Dept,List<Employee>> relativeDeptAndEmployee=new HashMap<>();
        //查询员工信息
        Dept dept=QDept.dept.selectOne().where( QDept.deptName.eq$(deptName)).execute();
        List<Employee> employees=QEmployee.employee.select().where(QEmployee.id.eq$(dept.getDeptId())).execute();
        relativeDeptAndEmployee.put(dept,employees);
        return relativeDeptAndEmployee;
    }

    public Employee QueryByEmployeeId(Long id){
       return QEmployee.employee.selectOne().byId(id);
    }
}
