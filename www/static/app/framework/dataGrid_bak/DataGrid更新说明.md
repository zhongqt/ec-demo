#DataGrid 更新说明

##L2.1.9.0.B

###表格支持单选切换
- 表格早已支持单选， 自L2.1.8.0.B起单选选中会切换选中行颜色。
- 新属性 `can-toggle-selected="true"` 时， 单击选中行切换该行选中状态。
- **选中** 和 **选中前** 事件可传入参数 `isSelected`， 当切换为未选中状态时该值为 `false`， E: `on-selected="selectRole(record, isSelected)"`