#数据校验使用手册(Bean Validation)

##概述
  数据校验旨在保持数据有效性， 我们开发了前后台统一的数据校验机制，同时提供自定义校验支持。开发人员可以使用已支持的 _JSR303_ 校验、 _hibernate-validator_ 校验和框架内置校验， 亦可以自行开发校验规则，整合到项目中。
   
##约定与限制
+ 由于Java语言的限制， 在Java8之前是不能在同一个位置定义多个同样的注解， __JSR303__  使用  _List_  注解规避这种限制
+ 自定义或框架内置校验规则中，如果一个校验规则需要计算多个属性的值， 必须使用 __Type__ 级别的校验 
+ 后端定义 *Type* 校验时， 如果校验注解有 `property` 属性， 错误信息将会发送到该属性指定的字段
+ 类级别效验注解中，单字段显示错误消息时， `annotation` 中该字段名必须由 `property="someField"` 指定， 多字段显示错误消息时， 由 `fields=["f1", "f2"]` 指定多个字段。

   
##已支持校验规则列表

| Annotation名称    | 类型      | F/T   | 目标数据类型                  | 规则说明                                                                                     | 
|------------------|-----------|-------|-----------------------------|---------------------------------------------------------------------------------------------|
| Pattern          | JSR303    | Field | String                      | 必须匹配预定义的正则表达式                                                                     |
| NotNull          | JSR303    | Field | Object                      | 必须不为空                                                                                   |                                                           
| Length           | Hibernate | Field | String                      | 限定字符串长度，可以只限定最大或最小                                                            | 
| Range            | Hibernate | Field | Number                      | 限定数值在某区间                                                                              |
| NotBlank         | Hibernate | Field | String                      | 限定字符串非空、非空格并且长度大于0                                                             |  
| NotEmpty         | Hibernate | Field | String/Array/Collection/Map | 限定字符串非空并且长度大于0                                                                    |  
| NotBlank         | Hibernate | Field | String                      | 限定字符串非空并且长度大于0                                                                    |  
| Mobile           | Custom    | Field | String                      | 第一位为 __1__ 的 *11* 位数字                                                                 |  
| Telephone        | Custom    | Field | String                      | 固定电话格式，区号3～4位可选，号码为7~8位                                                        |  
| Alphabet         | Custom    | Field | String                      | 字符串的所有字符必须为 __英文字母__                                                             |  
| AlphabetOrDigital| Custom    | Field | String                      | 字符串的所有字符必须为 __英文字母__ 或 __数字__                                                 |  
| Numeric          | Custom    | Field | String                      | 字符串所有字符必须为 __数字__ ， 可配置校验精度和正负数                                           |  
| DateMax          | Custom    | Field | Date                        | 用于限制日期字段 **最大值** ， 可限制为 __固定时间__ 或按 __当前时间偏移的日期__ 。                                                          |
| DateMin          | Custom    | Field | Date                        | 用于限制日期字段 **最小值** ， 可限制为 __固定时间__ 或按 __当前时间偏移的日期__ 。               |
| DateSpan         | Custom    | Type  | Date                        | 用于比较两个日期字段的值是否相差过大                                          |
| AllMatch         | Custom    | Type  | String                      | `property` 字段的值必须与 `fields` 字段集的值集完全匹配                                          |
| EitherNotBlank   | Custom    | Type  | String                      | `fields` 字段集的值集至少有一个不为空                                                           |
| Compare          | Custom    | Type  | String                      | `property` 字段指定的的值与 `compareTo` 字段的值相比较，大于或小于由 `than` 指定                  |

##自定义校验

###自定义效验定义步骤：
> 1. 根据效验的规则规划好使用在字段上或是类上
> 2. 定义效验注解
> 3. 需要时， 定义效验的效验器
> 4. 定义生成效验规则到前端JS的处理类， 并将其加入Spring容器
> 5. 定义前端规则效验函数

###示例
 以用户账户信息为例， 当用户银行账户卡号不为空时， 银行账号的其它字段比如开户行、开户人等都不能为空。我们需要一个效验， 定义当某字段值不为空时当前字段必填。

####规划

+ 因为效验的过程中需要判断两个字段的值， 该效验必须书写为类级别效验
+ 既定效验规则名为 `@RequireOnOtherNotEmpty`

####编码步骤如下

1. 定义验证注解
   
```java
package com.gillion.sebusiness.validation.annotation;

import com.gillion.sebusiness.validation.validator.RequireOnOtherNotEmptyValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import javax.validation.ReportAsSingleViolation;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Documented
@Retention(RUNTIME)
@ReportAsSingleViolation
// ↑↑↑ 以上样版代码， copy即可
@Target({TYPE}) // 定义 `type` 级别效验，因为此效验需要结果 Bean 的多个
@Constraint(validatedBy = RequireOnOtherNotEmptyValidator.class)
public @interface RequireOnOtherNotEmpty {

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};
  // ↑↑↑ 以上样版代码， copy即可

  // 默认错误消息， 暂未实现， 定义自定义效验请参照此定义， 便于后续统一实现
  String message() default "RequireOnOtherNotEmpty.message";

  // property 为效验的字段， 效验失败时将会在该字段上提示错误信息
  String property();

  // 用于组合效验的字段名称
  String otherProperty();

  @Target({TYPE}) // 与上保持一致
  @Retention(RUNTIME)
  @Documented
  @interface List {
      // 类型为当前注解类型， 在同一个地方需要定义多个相同类型的效验时
      // 用于规避JDK8以前不支持同类型多次注解的语法短板
      RequireOnOtherNotEmpty[] value();
  }
}
```



2. 定义后端规则效验器

```java
package com.gillion.sebusiness.validation.validator;

import com.gfa4j.validation.validator.AbstractCustomValidator;
import com.gillion.sebusiness.validation.annotation.RequireOnOtherNotEmpty;
import org.apache.commons.lang3.StringUtils;
import org.springside.modules.utils.Reflections;

import javax.validation.ConstraintValidatorContext;

// 泛型信息为 `<A, O>` `A` 为效验注解的类型， `O` 为效验的值得类型
// 效验注解为类级别是请定义为 `Object`
public class RequireOnOtherNotEmptyValidator
    extends AbstractCustomValidator<RequireOnOtherNotEmpty, Object> { 

    private String property;
    private String otherProperty;

    @Override
    protected boolean doValid(Object value, ConstraintValidatorContext context) {
        try {
            final Object propertyVal = Reflections.getFieldValue(value, property);
            final Object otherPropertyVal = Reflections.getFieldValue(value, otherProperty);
            if (isNotEmpty(otherPropertyVal)) {
                return isNotEmpty(propertyVal);
            }
        } catch (Exception ignored) {
            return false;
        }
        return true;
    }


    private boolean isNotEmpty(Object value) {
        if (value instanceof String) {
            return StringUtils.isNotEmpty((String) value);
        } else {
            return value != null;
        }
    }

    // 初始化方法， 不需要存储注解属性值时， 改方法可以不定义
    @Override
    protected void init(RequireOnOtherNotEmpty constraintAnnotation) {
        this.property = constraintAnnotation.property();
        this.otherProperty = constraintAnnotation.otherProperty();
    }
}
```

3. 定义生成效验规则到前端JS的处理类
    
```java
package com.gillion.sebusiness.validation.processor;

import com.gfa4j.validation.domain.support.AbstractTypeConstraintProcessor;
import com.gfa4j.validation.utils.ValidationUtils;
import com.gillion.sebusiness.validation.annotation.RequireOnOtherNotEmpty;
import org.springframework.stereotype.Component;

import java.util.Map;


@Component
public class RequireOnOtherNotEmptyConstraintProcessor extends AbstractTypeConstraintProcessor<RequireOnOtherNotEmpty> {
    @Override
    public Map<String, Object> generateRule(RequireOnOtherNotEmpty constraintsAnnotation) {
        // 创建 rule Map，自动添加 `ruleName` 
        final Map<String, Object> rule = ValidationUtils.generateRuleWithRuleNameByAnnotationClazz(RequireOnOtherNotEmpty.class);
        // 添加前端效验必要的属性
        rule.put("property", constraintsAnnotation.property());
        rule.put("otherProperty", constraintsAnnotation.otherProperty());
        // 如果不加入 listenProperties 默认只监听 `property` 字段
       // 当 `otherProperty` 字段更改时， 检验结果不会更改， 不能实时显示校验结果。
       rule.put( "listenProperties", new String[]{annotation.property(), annotation.otherProperty()});
        return rule;
    }
}
```

4. 实现生成校验规则 `List` 的类

```java
package com.gillion.sebusiness.validation.processor;

import com.gfa4j.validation.domain.support.AbstractTypeConstraintListProcessor;
import com.gillion.sebusiness.validation.annotation.RequireOnOtherNotEmpty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

// 该类基本为样本代码， 诸如上一步定义的规则生成实例， 在重载方法中返回即可
// 泛型信息必须定义， 第一个为效验注解类型，第二个为上一步定义的规则生成类的类型 
@Component
public class RequireOnOtherNotEmptyConstraintListProcessor
    extends AbstractTypeConstraintListProcessor<RequireOnOtherNotEmpty, RequireOnOtherNotEmptyConstraintProcessor> {

    @Autowired
    private RequireOnOtherNotEmptyConstraintProcessor component;

    @Override
    public RequireOnOtherNotEmptyConstraintProcessor getComponent() {
        return component;
    }
}
```

5. 在前端代码中实现效验规则效验函数

```javascript
// 前端规则效验与 `angular` 并无关系， 为 `ControlValidator` 添加一个成员方法即可 
define('someModule', [
    'angular',
    // 注入 `ControlValidator`
    'ControlValidator'
    //...
], function(angular, ControlValidator){

    ControlValidator.prototype.requireOnOtherNotEmpty = function(rawValue, modelControl){
        var me = this,
            isNotEmpty = me.require,
            form = me.form, // 获取表单对象
            rule = me.rule, // 获取规则实例
            validValue = me.getSameCombineControl(modelControl, rule.property).$viewValue,
            otherValue = me.getSameCombineControl(modelControl, rule.otherProperty).$viewValue;
        if (isNotEmpty(otherValue)){
            return isNotEmpty(rawValue);
        }
        return true;
    };

    angular.module('someModule', [])
        .controller(//...);
});
```

###关于异步效验

1. 生成的数据需要添加 `async:true`, 对应 **编码步骤#1**

```javascript
rule.put("async", true);
```

2. 前端效验方法中 **自行设置ngModel效验状态并自行发送错误消息**, 对应 **编码步骤#5**

```javascript
someAsyncValidation = function(value, modelControl){
    var me = this,
        messageParams;
    $http.get(...).success(function(result){
        var isValid = result && result.success === true;
        // 发送错误消息 并且 设置 ngModel效验状态
        me.setValidityAndSendMessage(isValid, modelControl);
    });
};
```
