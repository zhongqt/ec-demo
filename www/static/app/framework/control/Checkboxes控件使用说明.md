# Checkboxes控件使用说明

#### Checkboxes控件主要用于表单中的一组*checkbox*，能根据数据源自动生成多个*checkbox*, 可绑定到`angular`的`VM`, 能够直接支持校验。

### 属性

AttributeName   | Type                      | Demo                              | Desc
--------------- | ------------------------- | --------------------------------- | ---------------------------------------------------------------------
Source          | Array&lt;Object&gt;       | `[{roleId: 1, RoleName:'A}]`      | *checkboxes* 的数据源
SubmitName      | String                    | `submitName="roleIds"`            | 控件提交和绑定表单使用隐藏域， 该属性定义隐藏域的name
SubmitModel     | String                    | `submitModel="user.roleIds"`      | 该属性定义隐藏域的 `ng-model`
ValueProp       | Express                   | `valueProp="roleId"`              | 定义每个 *checkbox* 取对应对象的那个属性的值作为`value`
DisplayExpress  | Express                   | `displayExpress="roleName"`       | 定义每个 *checkbox* 取对应对象的那个属性的值作为显示 `Label` 的文本
ValueSeparator  | String                    | `displayProp="roleName"`          | 值的分隔符, 控件会将勾选的*checkbox*的值使用该分隔符串起来， __默认为半角逗号__


### 示例

1. *Controller* 中定义数据源（亦可请求后台赋值到 *controller* 的 *scope* 中）:
```javascript
$scope.roles = [
    {roleId: 1, roleName: '管理员'},
    {roleId: 2, roleName: '数据录入员'},
    {roleId: 3, roleName: '普通用户'}
];

```

2****__````____````__****. 页面中定义控件代码 :
```html
<form ...>
    ...
    <g-checkboxes source="roles" submit-name="roleIds" submit-model="newEmp.roleIds" display-prop="roleName" value-prop="roleId" />
    ...
</form>
```

### 其他提示
+ *VM* 即 *View Model*
+ *Express* 类型即 *Angular Express* , 故可在 *valueProp*  或 *displayProp* 属性上定义拼接属性、过滤器等一切 *Angular Express*  支持的形式， 例: `displayProp="roleName | limitTo :3"`, 角色名最长保留3个字符。