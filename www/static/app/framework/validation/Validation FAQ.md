#Validation FAQ

### Q: 如果获取表单实例
**A:** 表单实例是 `formController` 实例， 在表格外层作用域的 `$scope` 中.
假设如下文档结构 :

```html
<body ng-controller="UserController">
    <form id="saveUserForm" name="UserForm">
    ...
    </form>
</body>
```

获取方式:

```javascript
  UserModule.controller('UserController', function($scope) {
    
    var formController = $scope.UserForm;
    
  });
```

### Q: 如果重置表单效验
**A:**

```javascript
  UserModule.controller('UserController', function($scope) {
    
    var formController = $scope.UserForm;
    var formController.$validator.reset();
    
  });
```