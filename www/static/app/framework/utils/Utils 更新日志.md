# UtilsModule 更新日志

# 2015-10-22
+ `Arrays.exists` 支持 **谓词** 判断
    - `Arrays.exists([1, 2, 3], 4) => false`
    - `Arrays.exists([1, 2, 3], 2) => true`
    - `Arrays.exists([1, 2, 3], function(num){ return num < 2 }) => true`
    - `Arrays.exists([1, 2, 3], isNaN) => false`
+ `Functions` 添加方法引用函数 `funcRef`, 用于做方法引用 
```javascript
var strings = ['ABC', 'BCa', 'tdC'];
var lowers = Arrays.transform(source, Functions.funcRef(String.prototype.toLowerCase);
// lowers = ['ABC', 'BCA', 'TDC']
```