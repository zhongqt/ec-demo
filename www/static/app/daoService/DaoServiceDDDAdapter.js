import ds, { ___, dsc } from './DaoServiceClientES6Adapter';
import _ from 'lodash';

const autoTagging = ({ modelName, operator }) => `DS_${modelName}_${operator}`;

const { ModelExpression, DeleteCommand, SelectOneCommand, SelectCollectCommand } = ds.types;

ModelExpression.prototype.select = function([...rest]) {
  if (_.isEmpty(rest)) {
    return dsc.withModel(this).select(this.fieldContainer());
  } else {
    return dsc.withModel(this).select(rest);
  }
};

ModelExpression.prototype.selectOne = function() {
  return dsc.withModel(this).selectOne(this.fieldContainer());
};

SelectOneCommand.prototype.byId = function(pkValue) {
  const modelExpression = this.modelCommand.modelExpression;
  const _primaryKey = modelExpression._primaryKey;
  const modelName = modelExpression._modelName;
  const tag = autoTagging({
    modelName,
    operator: 'selectOneById',
  });
  return this.where(_primaryKey.eq$(pkValue))
    .tag(tag)
    .execute();
};

const oldSorting = SelectCollectCommand.prototype.sorting;
SelectCollectCommand.prototype.sorting = function() {
  // eslint-disable-next-line prefer-rest-params
  let orders = _.flatten(arguments);
  orders = _.filter(orders, _.negate(_.isEmpty));
  orders = _.compact(orders);
  if (_.isEmpty(orders)) {
    return this;
  }
  orders = orders.map(order => {
    if (_.isString(order)) {
      order = _.replace(order, 'ascend', '');
      order = _.replace(order, 'descend', 'DESC');
      order = _.trim(order);
    }
    // 兼容 antd 排序对象

    if (_.isObject(order) && order.field) {
      order = order.field;
      if (order.order === 'descend') {
        order += ' DESC';
      }
    }
    return order;
  });
  return oldSorting.apply(this, orders);
};

ModelExpression.prototype.saveOrUpdate = function(record) {
  const _primaryKey = this._primaryKey;
  const modelName = this._modelName;
  const pkName = _primaryKey.fieldName;
  if (record[pkName]) {
    return dsc
      .withModel(this)
      .update()
      .tag(
        autoTagging({
          modelName,
          operator: 'updateById',
        }),
      )
      .execute(record);
  } else {
    return dsc
      .withModel(this)
      .add()
      .tag(
        autoTagging({
          modelName,
          operator: 'saveNew',
        }),
      )
      .execute(record);
  }
};

ModelExpression.prototype.delete = function() {
  return dsc.withModel(this).delete();
};

DeleteCommand.prototype.byId = function(id) {
  const modelExpression = this.modelCommand.modelExpression;
  const modelName = modelExpression._modelName;
  const tag = autoTagging({
    modelName,
    operator: 'deleteById',
  });
  return this.id(id)
    .tag(tag)
    .execute();
};

export { ___, dsc };

export default ds;
