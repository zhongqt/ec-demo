# DataGrid 控件 FAQ

#### Q: 表格有设置宽度的情况下，为什么显示出来挤成一团
**A:** 请确认表格是否是从隐藏状态通过脚本(ng-show)或控件(tabPanel切换)操作显示出来的， 如果是， 请在表格显示出来后再表格外层作用域调用如下代码:
```javascript
    // controller constructor 中
    $scope.someClickFn = function(){
        $scope.showGrid = true;     // 显示表格
        $scope.$broadcast('show')   // 发送表格显示事件， 表格会自动组织单元格宽度
    };
```

#### Q: 如何定义行单选表格
**A:**

- 表格早已支持单选， 自L2.1.8.0.B起单选选中会切换选中行颜色。
- 新属性 `can-toggle-selected="true"` 时， 单击选中行切换该行选中状态。
- 表格事件 `onBeforeSelect`, `onSelect` 为表格 **选中前** 和 **选中** 的事件
- `onBeforeSelect` 和 `onSelect` 事件可传入参数 `isSelected`， 当切换为未选中状态时该值为 `false`， E: `on-selected="selectRole(record, isSelected)"`
- 表格属性 `selectedRow` 可设置选中行双向绑定
    + 请注意命名， 因别名问题 IDE 可能提示为 `$selectedRow`
    
#### Q: 表格仅一列可编辑时， 双击列编辑
**A:**

需求及解决思路分析:

+ 表格仅为该列配置 `g-column-editor` 即编辑器模板
+ 单元格双击事件 `on-cell-dbclick` 支持绑定在表格上或 `g-column` 上， 可传入参数 表格对象: `grid`, 