Grid批量操作
===========

 本篇所述是关于Grid批量删除的关键步骤，其它批量操作亦可参见

#### 1、定义表格

```html
<g-grid init-callback="empGridInitCallback" has-checkbox="true">
    ...
</g-grid>
```
    
> 释义：
> 1.  `g-grid`  是表格指令， 在html中使用以定义一个表格
> 2.  `init-callback` 属性的值是一个在`controller $scope`下的方法, 方法有一个入参， 为`grid`实例， 其中定义了一下API方法， 可操作表格， 还有一些属性获取表格的数据和状态， 在这个方法中定义表格操作最安全。
> 3.  `has-checkbox`  启用表格复选框

####2、在表格初始化callback中定义删除选中行的操作

```javascript
var Employees = Resource(window.basePath + '/system/employees/:id', {id: '@id'}, {
    destroyAll: {
        url: window.basePath + '/system/employees/destroyAll',
        method: 'delete'
    }
});

$scope.empGridInitCallback = function (grid) {
    $scope.deleteCheckedRows = function () {
        var checkedIds = Arrays.extractToArray(grid.getAllCheckedRows(), "id");
        Employees.destroyAll({ids:checkedIds});
    };
};
```
    
    
释义：
1.  使用`grid.getAllCheckedRows()`  获取所有选中行的数据， 返回结果数组类型
2.  使用 `Arrays.extractToArray(grid.getAllCheckedRows(), "id")` 将返回的实例数组的 `id`属性抽取出一个新的数组
3.  `Resource` 服务类第三个参数可定义除*增删改查*的其他方法, 上面代码的第一段定义 `destroyAll` 方法
4.  调用服务的`destroyAll`删除数据

####3、对应后台Controller编写

```java
@ResponseBody
@RequestMapping(value = "/destroyAll", method = RequestMethod.DELETE)
public Map<String, Object> destroyAll(@RequestParam String[] ids) {
  ...
}
```

释义： *action* 入参名对应前台 `destroyAll`  传入对象的属性值


##其他
*Arrays* 是JS数组操作工具类， 在 `Controller`  构造函数参数中注入即可使用