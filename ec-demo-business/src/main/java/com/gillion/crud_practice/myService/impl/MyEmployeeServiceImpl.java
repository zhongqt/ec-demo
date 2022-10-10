package com.gillion.crud_practice.myService.impl;

import com.gillion.crud_practice.model.vo.EmployeeVo;
import com.gillion.crud_practice.myService.MyEmployeeService;
import com.gillion.ds.client.api.queryobject.model.Page;
import com.gillion.ds.entity.base.RowStatusConstants;
import com.gillion.model.entity.Dept;
import com.gillion.crud_practice.model.entity.Employee;
import com.gillion.model.querymodels.QDept;
import com.gillion.crud_practice.model.querymodels.QEmployee;


import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.Validate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * @author liaowj
 * @version 1.0.0.0
 * @date 2018-09-04 17:11
 * generate by daoService use Easy Code
 */
@Service("MyEmployeeService")
@Slf4j
public class MyEmployeeServiceImpl implements MyEmployeeService {


    @Override
    public Employee findByCnameAndMobile(String cname, String mobile) {
        return null;
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
    public boolean saveEmployeeAndDept(Employee employee,String departmentName) {
        log.info("保存员工:{}的同时保存部门",departmentName);
        employee.setRowStatus(RowStatusConstants.ROW_STATUS_ADDED);
        int save=0;
            //判断部门是否存在
            int dept=QDept.dept.selectCount().where(QDept.deptName.eq$(departmentName)).execute();
            if(dept>0){

               save= QEmployee.employee.save(employee);
            }
            else{
                Dept dept1=new Dept();
               //不存在就保存部门同时保存
                dept1.setDeptName(departmentName);
                dept1.setRowStatus(RowStatusConstants.ROW_STATUS_ADDED);
                QDept.dept.save(dept1);
                dept1=QDept.dept.selectOne(QDept.deptId).where(QDept.deptName.eq$(departmentName)).execute();
                employee.setDepartmentId(dept1.getDeptId());
                save= QEmployee.employee.save(employee);
            }


        return save > 0;
    }

    @Override
    public boolean batchEmployee(List<EmployeeVo> employees) {
        log.info("批量增加员工");
        List<Employee> addEmployList= new ArrayList<>();
        employees.forEach(x->{


            Employee employee1=new Employee();
            employee1.setName(x.getName());
            employee1.setCname(x.getCname());
            employee1.setPassword(x.getPassword());

            int dept=QDept.dept.selectCount().where(QDept.deptName.eq$(x.getDepartmentName())).execute();
            if(dept<1){
                Dept dept1=new Dept();
                //不存在就保存部门同时保存
                dept1.setDeptName(x.getDepartmentName());
                dept1.setRowStatus(RowStatusConstants.ROW_STATUS_ADDED);
                QDept.dept.save(dept1);
                dept1=QDept.dept.selectOne(QDept.deptId).where(QDept.deptName.eq$(x.getDepartmentName())).execute();
                employee1.setDepartmentId(dept1.getDeptId());
            }else{
               Dept dept1=QDept.dept.selectOne(QDept.deptId).where(QDept.deptName.eq$(x.getDepartmentName())).execute();
                employee1.setDepartmentId(dept1.getDeptId());
            }
            employee1.setRowStatus(RowStatusConstants.ROW_STATUS_ADDED);
            addEmployList.add(employee1);
        });
        int save = QEmployee.employee.save(addEmployList);
        return save > 0;
    }

    @Override
    public  Page<Employee> queryEmployPage(int pageCurrent,int pageSize) {
        log.info("分页查询当前页：{},查询页面大小：{}",pageCurrent,pageSize);
        return QEmployee.employee.select(QEmployee.id,
                 QEmployee.name).paging(pageCurrent,pageSize).mapperTo(Employee.class).execute();
    }


    @Override
    public boolean updateEmployeeById(Employee employee) {
        log.info("根据员工id修改员工信息：{}",employee.getId());
        employee.setRowStatus(RowStatusConstants.ROW_STATUS_MODIFIED);
        int save = QEmployee.employee.save(employee);
        return save > 0;
    }

    @Override
    public boolean batchDeleteEmployee(List<Long> deleteEmployId) {
        boolean flag=true;
        for (int i=0;i<deleteEmployId.size();i++){
            //判断是否存在
            Employee employee=QEmployee.employee.selectOne(QEmployee.id).where(QEmployee.id.eq$(deleteEmployId.get(i))).execute();
            if(employee==null){
                log.info("需要删除对象:{}不存在",deleteEmployId.get(i));
                flag=false;
            }
        }
        int i;
       if(flag){
           return false;
       }else{
           i = QEmployee.employee.deleteById(deleteEmployId);
       }
       return i>0;
    }
    //部门与员工为一对多关系，要求可通过部门名称或者员工名称查询出部门与员工关联关系信息列表。
    @Override
    public HashMap<Dept,List<Employee>> queryEmployeeAndDeptByEmployeeId(String deptName) {
        log.info("获取部门：{}与员工关系",deptName);
        //根据部门名称查询出部门与员工关系列表
        HashMap<Dept,List<Employee>> relativeDeptAndEmployee=new HashMap<>();
        //查询员工信息
        Dept dept=QDept.dept.selectOne().where( QDept.deptName.eq$(deptName)).execute();
        List<Employee> employees=QEmployee.employee.select(QEmployee.name,QEmployee.id,QEmployee.mobile,QEmployee.email).where(QEmployee.departmentId.eq$(dept.getDeptId())).execute();
        relativeDeptAndEmployee.put(dept,employees);
        return relativeDeptAndEmployee;
    }


}
