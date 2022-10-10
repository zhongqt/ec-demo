declare namespace ds {
  export interface Parameter {
    readonly placeHolder: string;
  }

  class SameWithFieldNamedParameter implements Parameter {
    readonly placeHolder: string;
  }

  const dsc: DaoServiceClient;

  abstract class OperatorExpression<T> {
    /**
     * 等于 '='
     *
     * @param namedParameter 具名参数对象
     */
    eq(namedParameter: string | Parameter): ConditionExpression<T>;

    /**
     * 等于 '='
     *
     * @param parameter 参数值
     */
    eq$(parameter: T): ConditionExpression<T>;

    /**
     * 不等于 '<>'
     *
     * @param namedParameter 具名参数对象
     */
    ne(namedParameter: string | Parameter): ConditionExpression<T>;

    /**
     * 不等于 '<>'
     *
     * @param parameter 参数值
     */
    ne$(parameter: T): ConditionExpression<T>;

    /**
     * 小于 '<'
     *
     * @param namedParameter 具名参数对象
     */
    lt(namedParameter: string | Parameter): ConditionExpression<T>;

    /**
     * 小于 '<'
     *
     * @param parameter 参数值
     */
    lt$(parameter: T): ConditionExpression<T>;

    /**
     * 小于等于 '<='
     *
     * @param namedParameter 具名参数对象
     */
    loe(namedParameter: string | Parameter): ConditionExpression<T>;

    /**
     * 小于等于 '<='
     *
     * @param parameter 参数值
     */
    loe$(parameter: T): ConditionExpression<T>;

    /**
     * 大于 '>'
     *
     * @param namedParameter 具名参数对象
     */
    gt(namedParameter: string | Parameter): ConditionExpression<T>;

    /**
     * 大于 '>'
     *
     * @param parameter 参数值
     */
    gt$(parameter: T): ConditionExpression<T>;

    /**
     * 大于等于 '>='
     *
     * @param namedParameter 具名参数对象
     */
    goe(namedParameter: string | Parameter): ConditionExpression<T>;

    /**
     * 大于等于 '>='
     *
     * @param parameter 参数值
     */
    goe$(parameter: T): ConditionExpression<T>;

    /**
     * 为空 'IS NULL'
     */
    isNull(): ConditionExpression<T>;

    /**
     * 不为空 'IS NOT NULL'
     */
    notNull(): ConditionExpression<T>;

    /**
     * 在 .. 之中 'IN (...)'
     *
     * @param namedParameters 具名参数对象
     */
    in(namedParameters: Array<string | Parameter>): ConditionExpression<T>;
    /**
     * 在 .. 之中 'IN (...)'
     *
     * @param namedParameter 具名参数对象
     */
    in(...namedParameter: Array<string | Parameter>): ConditionExpression<T>;

    /**
     * 在 .. 之中 'IN (...)'
     *
     * @param parameters 参数值
     */
    in$(parameters: Array<T>): ConditionExpression<T>;

    /**
     * 在 .. 之中 'IN (...)'
     *
     * @param parameter 参数值
     */
    in$(...parameter: Array<T>): ConditionExpression<T>;

    /**
     * 不在 .. 之中 'NOT IN (..)'
     *
     * @param namedParameters 具名参数对象
     */
    notIn(namedParameters: Array<string | Parameter>): ConditionExpression<T>;

    /**
     * 不在 .. 之中 'NOT IN (..)'
     *
     * @param namedParameter 具名参数对象
     */
    notIn(...namedParameter: Array<string | Parameter>): ConditionExpression<T>;

    /**
     * 不在 .. 之中 'NOT IN (..)'
     *
     * @param parameters 参数值
     */
    notIn$(parameters: Array<T>): ConditionExpression<T>;

    /**
     * 不在 .. 之中 'NOT IN (..)'
     *
     * @param parameter 参数值
     */
    notIn$(...parameter: Array<T>): ConditionExpression<T>;

    /**
     * LIKE 'LIKE'
     *
     * @param namedParameter 具名参数对象
     */
    like(namedParameter: string | Parameter): ConditionExpression<T>;

    /**
     * LIKE 'LIKE'
     *
     * @param parameter 参数值
     */
    like$(parameter: T): ConditionExpression<T>;

    /**
     * LIKE, 前模糊 "LIKE '%xx'"
     *
     * @param parameter 参数值
     */
    _like$(parameter: T): ConditionExpression<T>;

    /**
     * LIKE, 后模糊 "LIKE 'xx%'"
     *
     * @param parameter 参数值
     */
    like$_(parameter: T): ConditionExpression<T>;
    /**
     * LIKE, 前后模糊 "LIKE '%xx%'"
     *
     * @param parameter 参数值
     */
    _like$_(parameter: T): ConditionExpression<T>;

    /**
     * 在两者之间  'BETWEEN :start and :end'
     *
     * @param start 具名参数对象
     * @param end 具名参数对象
     */
    between(
      start: string | Parameter,
      end: string | Parameter
    ): ConditionExpression<T>;

    /**
     * 在两者之间  'BETWEEN :start and :end'
     *
     * @param start 参数值
     * @param end 参数值
     */
    between$(start: T, end: T): ConditionExpression<T>;
  }

  class ConditionExpression<T> extends OperatorExpression<T> {
    and(rightExpression: ConditionExpression<any>): AndExpression;

    or(rightExpression: ConditionExpression<any>): OrExpression;
  }

  class AndExpression extends ConditionExpression<any> {}

  class OrExpression extends ConditionExpression<any> {}

  export class FieldExpression<T> extends OperatorExpression<T>
    implements FunctionExpression<T> {
    /**
     * 字段名称
     */
    readonly fieldName: string;
    min: FunctionExpression<T>;
    max: FunctionExpression<T>;
    avg: FunctionExpression<T>;
    sum: FunctionExpression<T>;
    count: FunctionExpression<T>;
    desc: FunctionExpression<T>;

    as(alias: string): AliasExpression<T>;
  }

  class FunctionExpression<T> extends FieldExpression<T> {}

  class AliasExpression<T> extends FieldExpression<T> {}

  export class BasicFieldContainer implements Iterable<FieldExpression<any>> {
    append(...fields: Array<FieldExpression<any>>): this;
    exclude(...fields: Array<FieldExpression<any>>): this;

    [Symbol.iterator](): Iterator<ds.FieldExpression<any>>;
  }

  export abstract class ModelExpression<M, PK> {
    /**
     * @private
     */
    primaryKey(): FieldExpression<PK>;

    /**
     * 获取字段容器
     */
    fieldContainer(): BasicFieldContainer;

    /**
     * 联结关联模型的字段
     * @example
     * const employee = ds.QEmployee;
     *
     * employee.employeeId.hqlFragment(); // => employeeId
     * employee.dept.chain(dept.deptName); // => dept.deptName
     *
     * @param field 联结字段
     */
    chain(field: FieldExpression<any>): FieldExpression<any>;

    /**
     * 联结关联模型, 用于多级关联
     * @example
     * const employee = ds.QEmployee;
     * const role = ds.QRole;
     *
     * employee.employeeId.hqlFragment(); // => employeeId
     * employee.dept.chain(dept.deptName); // => dept.deptName
     * employee.chain(employee.roles).chain(role.resources).resourceUrl; // => roles.resources.resourceUrl
     * @param field 关联模型
     */
    chain<O, PK>(field: ModelExpression<O, PK>): ModelExpression<O, PK>;

    /* fluent function start */
    /**
     * 预定义流式指令的 tag.
     * @example
     * const employee = ds.QEmployee;
     * // 显示前置指定 tag 后, 后端可通过 tag 和参数结合进行校验.
     * employee.tag('updateEmployeeEmail')
     *    .update(employee.email)
     *    .execute({
     *        email: 'user1@gmail.com',
     *        confirmEmail: 'otherUser@gmail.com'
     *    })
     * @param tag
     */
    tag(tag: string): this;

    /**
     * 根据 rowStatus 持久化对象 {@link RowStatusEnum} <br>
     *
     * NOTE: 不保存关联对象
     *
     * @param record 持久化对象
     */
    save(record: M): Promise<{ success: boolean; data: M }>;

    /**
     * 根据 rowStatus 持久化对象 {@link RowStatusEnum}
     *
     * NOTE: 不保存关联对象
     *
     * @param records 持久化对象集
     */
    save(records: Array<M>): Promise<{ success: boolean; data: Array<M> }>;

    /**
     * 关联保存指令
     * @example
     * const record = {
     *   username: "张三",
     *   rowStatus: 4,
     *   // 关联对象会被保存
     *   dept: {
     *     deptName: "制造部",
     *     rowStatus: 4,
     *   }
     * };
     * ds.QEmployee.deep().save(record);
     */
    deep(): DeepSaveCommand<M, PK>;

    delete(primaryKeys: Array<PK>): Promise<{ success: boolean; data: number }>;

    /**
     * 删除对象
     * @example
     * ds.QEmployee.delete({employeeId: 1})
     *      .then(res => {
     *          console.log('count:' + res.data);
     *      }}
     * @param records 要删除的对象
     */
    delete(...records: Array<M>): Promise<{ success: boolean; data: number }>;

    deleteById(
      primaryKeys: Array<PK>
    ): Promise<{ success: boolean; data: number }>;

    /**
     * 按记录主键值删除对象
     *
     * @example
     * ds.QEmployee.deleteById(1)
     *      .then(res => {
     *          console.log('count:' + res.data);
     *      }};
     *
     * @param primaryKeys 主键值
     */
    deleteById(
      ...primaryKeys: Array<PK>
    ): Promise<{ success: boolean; data: number }>;

    /**
     * 指定更新字段
     *
     * @param fields 更新字段
     */
    selective(
      ...fields: Array<FieldExpression<any>>
    ): UpdateSelectiveCommand<M, PK>;

    /**
     * 查询列表, 查询该模型的所有字段
     */
    select(): SelectCollectCommand<M, PK>;

    /**
     * 查询列表, 通过 {@link BasicFieldContainer} 查询指定字段
     *
     * @param fieldContainer 字段容器
     */
    select(fieldContainer: BasicFieldContainer): SelectCollectCommand<M, PK>;

    /**
     * 查询列表, 查询指定字段集
     *
     * @param fields 指定字段集
     */
    select(...fields: Array<FieldExpression<any>>): SelectCollectCommand<M, PK>;
    /**
     * 查询列表, 查询该模型的所有字段
     */
    selectOne(): SelectOneCommand<M, PK>;

    /**
     * 查询列表, 通过 {@link BasicFieldContainer} 查询指定字段
     *
     * @param fieldContainer 字段容器
     */
    selectOne(fieldContainer: BasicFieldContainer): SelectOneCommand<M, PK>;

    /**
     * 查询列表, 查询指定字段集
     *
     * @param fields 指定字段集
     */
    selectOne(...fields: Array<FieldExpression<any>>): SelectOneCommand<M, PK>;
  }

  class DeepSaveCommand<M, PK> {
    /**
     * 依据 rowStatus 持久化对象
     *
     * @example
     * const record = {
     *   username: "张三",
     *   rowStatus: 4,
     *   // 关联对象会被保存
     *   dept: {
     *     deptName: "制造部",
     *     rowStatus: 4,
     *   }
     * };
     * ds.QEmployee.deep().save(record);
     *
     * @param record 要持久化的对象
     */
    save(record: M): Promise<{ success: boolean; data: M }>;

    /**
     * 依据 rowStatus 持久化对象集
     *
     * @example
     * const record = {
     *   username: "张三",
     *   rowStatus: 4,
     *   // 关联对象会被保存
     *   dept: {
     *     deptName: "制造部",
     *     rowStatus: 4,
     *   }
     * };
     * ds.QEmployee.deep().save(record);
     *
     * @param records 要持久化的对象集
     */
    save(records: Array<M>): Promise<{ success: boolean; data: Array<M> }>;
  }

  class UpdateSelectiveCommand<M, PK> {
    /**
     * 更新对象的指定字段
     * @example
     * const employee = ds.QEmployee;
     * employee.selective(employee.username, employee.password)
     *  .update({
     *    employeeId: 1,
     *    username: '张三',
     *    password: '123456'
     *  }}
     *
     * @param record 对象
     */
    update(record: M): Promise<{ success: boolean; data: M }>;
  }

  enum ActionType {}

  enum CrudType {}

  enum RowStatusEnum {}

  interface RequestParam {
    actionType: ActionType;
    crudType: CrudType;
    requestArguments: any;
  }

  interface IRecord {
    /**
     * 行状态
     */
    rowStatus?: number;

    /**
     * 乐观锁版本号
     */
    version?: number;
  }

  abstract class BaseModel implements IRecord {
    rowStatus?: number;
    version?: number;
  }

  type ConditionOrBinary = ConditionExpression<any>;
  type FieldOrFunction = FieldExpression<any> | FunctionExpression<any>;

  abstract class BaseCommand<M, PK, C extends BaseCommand<M, PK, C>> {
    tag(tag: string): C;
  }

  abstract class AbstractSelectCommand<
    M,
    PK,
    C extends AbstractSelectCommand<M, PK, C>> {
    /**
     * 为查询指令指定where条件
     * @example
     *  const employee = ds.QEmployee;
     *  const response = employee
     *      .select()
     *      // 等价于 SQL 条件: WHERE username LIKE '张%' OR (age >= 18 AND age <= 60)
     *      .where(employee.username.like(':username').and(
     *        employee.age.goe(':ageMin').or(employee.age.loe(':ageMax'))))
     *      .execute({
     *        username: '张%',
     *        ageMin: 18,
     *        ageMax: 60
     *      });
     * @param whereExpression
     */
    where(whereExpression: ConditionOrBinary): C;

    /**
     * 为查询指定查询分组表达式
     * @example
     *  const employee = ds.QEmployee
     *  const response = employee.select(employee.sex, employee.age.avg())
     *   .groupBy(employee.sex)
     *   .execute();
     *
     * @param groupByFields 分组字段
     */
    groupBy(...groupByFields: Array<FieldExpression<any>>): C;

    /**
     * 指定分组查询的 having 条件表达式
     * @example
     *  const employee = ds.QEmployee;
     *  const response = employee.select(employee.deptId, employee.age.avg())
     *   .groupBy(employee.deptId)
     *   .having(employee.age.avg().goe(20))
     *   .execute();
     * @param havingExpression having条件表达式
     */
    having(havingExpression: ConditionOrBinary): C;

    /**
     * 指定查询指定的排序
     *
     * @param orderFields 排序字段
     */
    sorting(...orderFields: Array<FieldOrFunction>): C;
  }

  /**
   * 查询列表指令 <br>
   *
   * @example
   *  const employee = ds.QEmployee
   *  const response = await dsc.withModel(employee)
   *     // 指定查询字段
   *     .select(employee.username, employee.sex, employee.sex)
   *     // 指定查询唯一标签
   *     .tag('DEMO#queryAllemployees')
   *     .execute();
   *   // 结果集
   *  const employeeList = response.data;
   *
   * 流畅式写法:
   * @example
   *  // 查询所有员工
   *  ds.QEmployee.select().execute();
   */
  class SelectCollectCommand<M, PK> extends AbstractSelectCommand<
    M,
    PK,
    SelectCollectCommand<M, PK>> {
    /**
     * 执行查询, 不需要传递参数. <br>
     * 即无where条件, 或条件中的参数已具备值
     * @example
     * const employee = ds.QEmployee;
     * const response = await dsc.withModel(employee)
     *  .select(employee.fieldContainer())
     *  .where(employee.username.like$('张三%'))
     *  .execute();
     */
    execute(): Promise<{ success: boolean; data: Array<M> }>;

    /**
     * 执行查询, 参数集与未具名参数一一对应
     * @example
     * import ds, {___} from '../utils/daoService/DaoServiceClientES6Adapter';
     *
     * const employee = ds.QEmployee;
     * const response = await dsc.withModel(employee)
     *  .select(employee.fieldContainer())
     *  .where(employee.username.like(___).or(employee.mobile.eq(___)))
     *  .execute('张三%', '13666666666');
     *
     * @param args 参数集
     */
    execute(...args: Array<any>): Promise<{ success: boolean; data: Array<M> }>;

    /**
     * 执行查询, 传入对象具名参数
     *
     * @example
     * import ds, {___} from '../utils/daoService/DaoServiceClientES6Adapter';
     *
     * const employee = ds.QEmployee;
     * const response = await dsc.withModel(employee)
     *  .select(employee.fieldContainer())
     *  .where(employee.username.like(___).and(
     *    employee.age.loe(':ageMin').and(employee.age.goe(':ageMax'))))
     *  .execute({
     *    username: '张%',
     *    ageMin: 18,
     *    ageMax: 60
     *  });
     *
     * @param arguments 具名参数对象
     */
    execute(arguments: Object): Promise<{ success: boolean; data: Array<M> }>;

    /**
     * 根据主键值查询列表, 可传入一个或多个主键值
     * @example
     * const employee = ds.QEmployee
     * // 查询主键为 1, 2, 3 的员工记录
     * const response = await employee.select().byId([1, 2, 3]);
     */
    byId(primaryKeys: Array<PK>): Promise<{ success: boolean; data: Array<M> }>;

    /**
     * 根据主键值查询列表, 可传入一个或多个主键值
     * @example
     * const employee = ds.QEmployee
     * // 查询主键为 1, 2, 3 的员工记录
     * const response = await employee.select().byId(1, 2, 3);
     */
    byId(
      ...primaryKeys: Array<PK>
    ): Promise<{ success: boolean; data: Array<M> }>;

    /**
     * 转换为分页查询
     *
     * @param currentPage 当前页数
     * @param pageSize 每页大小
     */
    paging(currentPage: number, pageSize: number): SelectPageCommand<M, PK>;
  }

  class Page<T> {
    success: boolean;
    data: {
      currentPage: number;
      totalRecord: number;
      pageSize: number;
      recordIndex: number;
      recordStart: number;
      recordEnd: number;
      records: Array<T>;
    };
  }

  class NotCountPage<T> {
    success: boolean;
    data: {
      currentPage: number;
      pageSize: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
      /**
       * 查询的数据集
       */
      records: Array<T>;
    };
  }

  class SelectPageCommand<M, PK> extends AbstractSelectCommand<
    M,
    PK,
    SelectPageCommand<M, PK>> {
    /**
     * 执行分页查询, 不需要传递参数. <br>
     * 即无where条件, 或条件中的参数已具备值
     * @example
     * const employee = ds.QEmployee;
     * const response = await dsc.withModel(employee)
     *  .select(employee.fieldContainer())
     *  .where(employee.username.like$('张三%'))
     *  .paging(1, 10)
     *  .execute();
     */
    execute(): Promise<{ success: boolean; data: Page<M> }>;

    /**
     * 执行分页查询, 参数集与未具名参数一一对应
     * @example
     * import ds, {___} from '../utils/daoService/DaoServiceClientES6Adapter';
     *
     * const employee = ds.QEmployee;
     * const response = await dsc.withModel(employee)
     *  .select(employee.fieldContainer())
     *  .where(employee.username.like(___).or(employee.mobile.eq(___)))
     *  .paging(1, 10)
     *  .execute('张三%', '13666666666');
     *
     * @param args 参数集
     */
    execute(...args: Array<any>): Promise<{ success: boolean; data: Page<M> }>;

    /**
     * 执行分页查询, 传入对象具名参数
     *
     * @example
     * import ds, {___} from '../utils/daoService/DaoServiceClientES6Adapter';
     *
     * const employee = ds.QEmployee;
     * const response = await dsc.withModel(employee)
     *  .select(employee.fieldContainer())
     *  .where(employee.username.like(___).and(
     *    employee.age.loe(':ageMin').and(employee.age.goe(':ageMax'))))
     *  .paging(1, 10)
     *  .execute({
     *    username: '张%',
     *    ageMin: 18,
     *    ageMax: 60
     *  });
     *
     * @param arguments 具名参数对象
     */
    execute(
      arguments: Object
    ): Promise<{ success: boolean; data: Page<Object> }>;

    /**
     * 如果查询惰分页(不需要总页数), 调用本方法后, 本指令转换为不查询总页数的分页请求
     */
    doNotNeedTotalPage(): SelectNotCountPageCommand<M, PK>;
  }

  class SelectNotCountPageCommand<M, PK> extends AbstractSelectCommand<
    M,
    PK,
    SelectNotCountPageCommand<M, PK>> {
    /**
     * 执行分页查询, 不需要传递参数. <br>
     * 即无where条件, 或条件中的参数已具备值
     * @example
     * const employee = ds.QEmployee;
     * const response = await dsc.withModel(employee)
     *  .select(employee.fieldContainer())
     *  .where(employee.username.like$('张三%'))
     *  .paging(1, 10)
     *  .doNotNeedTotalPage()
     *  .execute();
     */
    execute(): Promise<{ success: boolean; data: NotCountPage<M> }>;

    /**
     * 执行分页查询, 参数集与未具名参数一一对应
     * @example
     * import ds, {___} from '../utils/daoService/DaoServiceClientES6Adapter';
     *
     * const employee = ds.QEmployee;
     * const response = await dsc.withModel(employee)
     *  .select(employee.fieldContainer())
     *  .where(employee.username.like(___).or(employee.mobile.eq(___)))
     *  .paging(1, 10)
     *  .doNotNeedTotalPage()
     *  .execute('张三%', '13666666666');
     *
     * @param args 参数集
     */
    execute(
      ...args: Array<any>
    ): Promise<{ success: boolean; data: NotCountPage<M> }>;

    /**
     * 执行分页查询, 传入对象具名参数
     *
     * @example
     * import ds, {___} from '../utils/daoService/DaoServiceClientES6Adapter';
     *
     * const employee = ds.QEmployee;
     * const response = await dsc.withModel(employee)
     *  .select(employee.fieldContainer())
     *  .where(employee.username.like(___).and(
     *    employee.age.loe(':ageMin').and(employee.age.goe(':ageMax'))))
     *  .paging(1, 10)
     *  .doNotNeedTotalPage()
     *  .execute({
     *    username: '张%',
     *    ageMin: 18,
     *    ageMax: 60
     *  });
     *
     * @param arguments 具名参数对象
     */
    execute(
      arguments: Object
    ): Promise<{ success: boolean; data: NotCountPage<M> }>;
  }

  class SelectOneCommand<M, PK> extends AbstractSelectCommand<
    M,
    PK,
    SelectOneCommand<M, PK>> {
    /**
     * 执行查询, 不需要传递参数. <br>
     * 即无where条件, 或条件中的参数已具备值 <br>
     *
     * 如果结果集有多条记录会抛出异常
     *
     * @example
     * const employee = ds.QEmployee;
     * const response = await dsc.withModel(employee)
     *  .selectOne(employee.fieldContainer())
     *  .where(employee.username.like$('张三%'))
     *  .execute();
     */
    execute(): Promise<{ success: boolean; data: M }>;

    /**
     * 执行查询, 参数集与未具名参数一一对应 <br>
     * 如果结果集有多条记录会抛出异常
     *
     * @example
     * import ds, {___} from '../utils/daoService/DaoServiceClientES6Adapter';
     *
     * const employee = ds.QEmployee;
     * const response = await dsc.withModel(employee)
     *  .selectOne(employee.fieldContainer())
     *  .where(employee.username.like(___).or(employee.mobile.eq(___)))
     *  .execute('张三%', '13666666666');
     *
     * @param args 参数集
     */
    execute(...args: Array<any>): Promise<{ success: boolean; data: M }>;

    /**
     * 执行查询, 传入对象具名参数<br>
     * <i> 如果结果集有多条记录会抛出异常</i>
     *
     * @example
     * import ds, {___} from '../utils/daoService/DaoServiceClientES6Adapter';
     *
     * const employee = ds.QEmployee;
     * const response = await dsc.withModel(employee)
     *  .selectOne(employee.fieldContainer())
     *  .where(employee.username.like(___).and(
     *    employee.age.loe(':ageMin').and(employee.age.goe(':ageMax'))))
     *  .execute({
     *    username: '张%',
     *    ageMin: 18,
     *    ageMax: 60
     *  });
     *
     * @param arguments 具名参数对象
     */
    execute(arguments: Object): Promise<{ success: boolean; data: M }>;

    /**
     * 根据主键查询单个对象
     * @example
     * const employee = ds.QEmployee;
     * const response = await employee.selectOne().byId(1);
     * @param primaryKey 主键值
     */
    byId(primaryKey: PK): Promise<{ success: boolean; data: M }>;
  }

  class AddCommand<M, PK> extends BaseCommand<M, PK, AddCommand<M, PK>> {
    /**
     * 执行保存
     *
     * @param record 保存的数据行
     */
    execute<T>(record: T): Promise<{ success: boolean; data: T & IRecord }>;
  }

  class AddBatchCommand<M, PK> extends BaseCommand<
    M,
    PK,
    AddBatchCommand<M, PK>> {
    /**
     * 执行保存
     *
     * @param records 保存的数据集
     */
    execute<T>(
      records: Array<T>
    ): Promise<{ success: boolean; data: Array<T & IRecord> }>;
  }

  class UpdateCommand<M, PK> extends BaseCommand<M, PK, UpdateCommand<M, PK>> {
    execute<T>(record: T): Promise<{ success: boolean; data: T & IRecord }>;
  }

  abstract class BaseModelCommand<M, PK> {
    /**
     * 传入 {@link BasicFieldContainer} 或若干字段进行查询
     * @example
     * // 方式一: 传入 FieldContainer
     * dsc.withModel(employee)
     *  .select(employee.fieldContainer())
     *  .tag("DEMO#queryAllEmployee");
     *  .execute();
     *
     * @param fieldContainer 字段容器
     */
    select(fieldContainer: BasicFieldContainer): SelectCollectCommand<M, PK>;

    /**
     * 传入若干字段进行查询
     * @example
     * // 方式二: 按顺序传入字段
     * dsc.withModel(employee)
     *  .select(employee.employeeId, employee.username, employee.cname, employee.sex, employee.age)
     *  .tag("DEMO#queryAllEmployee");
     *  .execute();
     *
     *
     * @param fields 其它字段
     */
    select(...fields: Array<FieldExpression<any>>): SelectCollectCommand<M, PK>;

    /**
     * 通过字段容器查询单个对象
     *
     * @param fieldContainer 字段容器 {@link BasicFieldContainer}
     */
    selectOne(fieldContainer: BasicFieldContainer): SelectOneCommand<M, PK>;

    /**
     * 查询单个对象, 指定查询的字段
     *
     * @param fields 其它字段
     */
    selectOne(...fields: Array<FieldExpression<any>>): SelectOneCommand<M, PK>;

    /**
     * 新增对象
     */
    add(): AddCommand<M, PK>;

    /**
     * 批量新增
     */
    addBatch(): AddBatchCommand<M, PK>;

    /**
     * 更新指定字段
     *
     * @param fields 指定字段集
     */
    updateSelective(
      ...fields: Array<FieldExpression<any>>
    ): UpdateSelectiveCommand<M, PK>;

    /**
     * @deprecated 请使用 `queryModel.selective(field1, field2).update(record)`
     * @param fields
     */
    update(
      ...fields: Array<FieldExpression<any>>
    ): UpdateSelectiveCommand<M, PK>;

    /**
     * 更新对象指令
     */
    update(): UpdateCommand<M, PK>;

    updateBatch(
      fieldContainer: BasicFieldContainer
    ): UpdateSelectiveCommand<M, PK>;

    updateBatch(
      ...fields: Array<FieldExpression<any>>
    ): UpdateSelectiveCommand<M, PK>;
  }

  class UpdateBatchCommand<M, PK> extends BaseCommand<
    M,
    PK,
    UpdateBatchCommand<M, PK>> {
  }

  class DaoServiceClient {
    public readonly ___: SameWithFieldNamedParameter;

    /**
     * 构建模型执行指令, 所有基于数据服务的操作从模型指令开始
     *
     * @param modelExpression 模型表达式实例
     */
    withModel<M, PK, E extends ModelExpression<M, PK>>(
      modelExpression: E
    ): BaseModelCommand<M, PK>;
  }
}

declare const dsc: ds.DaoServiceClient;
