import com.gillion.ds.client.api.queryobject.model.Page;
import com.gillion.model.entity.Employee;
import com.gillion.service.EmployeeService;
import com.gillion.service.imp.EmployeeServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class MyTest {
    @Autowired
    EmployeeServiceImpl service;
    @Test
    public void test1(){
        Page<Employee> employeePage = service.queryEmployPage();

    }
}
