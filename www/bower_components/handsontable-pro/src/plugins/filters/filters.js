import BasePlugin from 'handsontable/plugins/_base';
import {arrayEach, arrayMap} from 'handsontable/helpers/array';
import {rangeEach} from 'handsontable/helpers/number';
import EventManager from 'handsontable/eventManager';
import {addClass, removeClass, closest} from 'handsontable/helpers/dom/element';
import {registerPlugin} from 'handsontable/plugins';
import {SEPARATOR} from 'handsontable/plugins/contextMenu/predefinedItems';
import ConditionComponent from './component/condition';
import ValueComponent from './component/value';
import ActionBarComponent from './component/actionBar';
import FormulaCollection from './formulaCollection';
import DataFilter from './dataFilter';
import FormulaUpdateObserver from './formulaUpdateObserver';
import {createArrayAssertion, toEmptyString, unifyColumnValues, toVisualValue} from './utils';
import {FORMULA_NONE} from './constants';

import './filters.css';

/**
 * This plugin allows filtering the table data either by the built-in component or with the API.
 *
 * @plugin Filters
 * @pro
 * @dependencies DropdownMenu TrimRows BindRowsWithHeaders
 */
class Filters extends BasePlugin {
  constructor(hotInstance) {
    super(hotInstance);
    /**
     * Instance of {@link EventManager}.
     *
     * @type {EventManager}
     */
    this.eventManager = new EventManager(this);
    /**
     * Instance of {@link TrimRows}.
     *
     * @type {TrimRows}
     */
    this.trimRowsPlugin = null;
    /**
     * Instance of {@link DropdownMenu}.
     *
     * @type {DropdownMenu}
     */
    this.dropdownMenuPlugin = null;
    /**
     * Instance of {@link FormulaCollection}.
     *
     * @type {FormulaCollection}
     */
    this.formulaCollection = null;
    /**
     * Instance of {@link FormulaUpdateObserver}.
     *
     * @type {FormulaUpdateObserver}
     */
    this.formulaUpdateObserver = null;
    /**
     * Instance of {@link ConditionComponent}.
     *
     * @type {ConditionComponent}
     */
    this.conditionComponent = null;
    /**
     * Instance of {@link ValueComponent}.
     *
     * @type {ValueComponent}
     */
    this.valueComponent = null;
    /**
     * Instance of {@link ActionBarComponent}.
     *
     * @type {ActionBarComponent}
     */
    this.actionBarComponent = null;
    /**
     * Last selected column physical index for added filter formulas.
     *
     * @type {Number}
     * @default null
     */
    this.lastSelectedColumn = null;

    // One listener for the enable/disable functionality
    this.hot.addHook('afterGetColHeader', (col, TH) => this.onAfterGetColHeader(col, TH));
  }

  /**
   * Check if the plugin is enabled in the Handsontable settings.
   *
   * @returns {Boolean}
   */
  isEnabled() {
    /* eslint-disable no-unneeded-ternary */
    return this.hot.getSettings().filters ? true : false;
  }

  /**
   * Enable plugin for this Handsontable instance.
   */
  enablePlugin() {
    if (this.enabled) {
      return;
    }
    this.trimRowsPlugin = this.hot.getPlugin('trimRows');
    this.dropdownMenuPlugin = this.hot.getPlugin('dropdownMenu');

    let addConfirmationHooks = (component) => {
      component.addLocalHook('accept', () => this.onActionBarSubmit('accept'));
      component.addLocalHook('cancel', () => this.onActionBarSubmit('cancel'));
      component.addLocalHook('change', (command) => this.onComponentChange(component, command));

      return component;
    };

    if (!this.conditionComponent) {
      const conditionComponent = new ConditionComponent(this.hot);
      conditionComponent.addLocalHook('afterClose', () => this.onSelectUIClosed());

      this.conditionComponent = addConfirmationHooks(conditionComponent);
    }
    if (!this.valueComponent) {
      this.valueComponent = addConfirmationHooks(new ValueComponent(this.hot));
    }
    if (!this.actionBarComponent) {
      this.actionBarComponent = addConfirmationHooks(new ActionBarComponent(this.hot));
    }
    if (!this.formulaCollection) {
      this.formulaCollection = new FormulaCollection();
    }
    if (!this.formulaUpdateObserver) {
      this.formulaUpdateObserver = new FormulaUpdateObserver(this.formulaCollection, (column) => this.getDataMapAtColumn(column), this.hot);
      this.formulaUpdateObserver.addLocalHook('update', (...params) => this.conditionComponent.updateState(...params));
      this.formulaUpdateObserver.addLocalHook('update', (...params) => this.valueComponent.updateState(...params));
    }
    this.conditionComponent.show();
    this.valueComponent.show();
    this.actionBarComponent.show();

    this.registerEvents();
    this.addHook('beforeDropdownMenuSetItems', (items) => this.onBeforeDropdownMenuSetItems(items));
    this.addHook('afterDropdownMenuDefaultOptions', (defaultOptions) => this.onAfterDropdownMenuDefaultOptions(defaultOptions));
    this.addHook('afterDropdownMenuShow', () => this.onAfterDropdownMenuShow());
    this.addHook('afterDropdownMenuHide', () => this.onAfterDropdownMenuHide());
    this.addHook('afterChange', (changes, source) => this.onAfterChange(changes));
    this.addHook('isFilter', (row) => this.isFilter(row));

    // force to enable dependent plugins
    this.hot.getSettings().trimRows = true;
    this.trimRowsPlugin.enablePlugin();

    // Temp. solution (extending menu items bug in contextMenu/dropdownMenu)
    if (this.hot.getSettings().dropdownMenu) {
      this.dropdownMenuPlugin.disablePlugin();
      this.dropdownMenuPlugin.enablePlugin();
    }

    super.enablePlugin();
  }

  /**
   * Register the DOM listeners.
   *
   * @private
   */
  registerEvents() {
    this.eventManager.addEventListener(this.hot.rootElement, 'click', (event) => this.onTableClick(event));
  }

  /**
   * Disable plugin for this Handsontable instance.
   */
  disablePlugin() {
    if (this.enabled) {
      this.conditionComponent.hide();
      this.valueComponent.hide();
      this.actionBarComponent.hide();
      this.formulaCollection.clean();
      this.trimRowsPlugin.untrimAll();
    }
    super.disablePlugin();
  }

  /**
   * @description
   * Add formula to the formulas collection at specified column index.
   *
   * Possible predefined formulas:
   *  * `begins_with` - Begins with
   *  * `between` - Between
   *  * `by_value` - By value
   *  * `contains` - Contains
   *  * `empty` - Empty
   *  * `ends_with` - Ends with
   *  * `eq` - Equal
   *  * `gt` - Greater than
   *  * `gte` - Greater than or equal
   *  * `lt` - Less than
   *  * `lte` - Less than or equal
   *  * `none` - None (no filter)
   *  * `not_between` - Not between
   *  * `not_contains` - Not contains
   *  * `not_empty` - Not empty
   *  * `neq` - Not equal
   *
   * @example
   * ```js
   * // Add filter "Greater than" 95 to column at index 1
   * hot.getPlugin('filters').addFormula(1, 'gt', [95]);
   * hot.getPlugin('filters').filter();
   *
   * // Add filter "Begins with" with value "de" and "Not contains" with value "ing"
   * hot.getPlugin('filters').addFormula(1, 'begins_with', ['de']);
   * hot.getPlugin('filters').addFormula(1, 'not_contains', ['ing']);
   * hot.getPlugin('filters').filter();
   *
   * // If you want to add filter formulas with OR operator you can use formula "by_value"
   * hot.getPlugin('filters').addFormula(1, 'by_value', [['ing', 'ed', 'as', 'on']]);
   * hot.getPlugin('filters').filter();
   * // In this case all value's that don't match will be filtered.
   * ```
   * @param {Number} column Visual column index.
   * @param {String} name Formula short name.
   * @param {Array} args Formula arguments.
   */
  addFormula(column, name, args) {
    const physicalColumn = this.t.toPhysicalColumn(column);

    this.formulaCollection.addFormula(physicalColumn, {command: {key: name}, args});
  }

  /**
   * Remove formulas at specified column index.
   *
   * @param {Number} column Visual column index.
   */
  removeFormulas(column) {
    const physicalColumn = this.t.toPhysicalColumn(column);

    this.formulaCollection.removeFormulas(physicalColumn);
  }

  /**
   * Clear all formulas previously added to the collection for the specified column index or, if the column index
   * was not passed, clear the formulas for all columns.
   *
   * @param {Number} [column] Visual column index.
   */
  clearFormulas(column) {
    const physicalColumn = this.t.toPhysicalColumn(column);

    if (column === void 0) {
      this.formulaCollection.clean();
    } else {
      this.formulaCollection.clearFormulas(physicalColumn);
    }
  }

  /**
   * Filter data based on added filter formulas.
   */
  filter() {
    let dataFilter = this._createDataFilter();
    let needToFilter = !this.formulaCollection.isEmpty();
    let visibleVisualRows = [];

    const formulas = this.formulaCollection.exportAllFormulas();
    const allowFiltering = this.hot.runHooks('beforeFilter', formulas);

    if (allowFiltering !== false) {
      if (needToFilter) {
        let trimmedRows = [];

        this.trimRowsPlugin.trimmedRows.length = 0;

        visibleVisualRows = arrayMap(dataFilter.filter(), (rowData) =>
          rowData.meta.visualRow
        );

        const visibleVisualRowsAssertion = createArrayAssertion(visibleVisualRows);

        rangeEach(this.hot.countSourceRows() - 1, (row) => {
          let isFilter = this.hot.runHooks("partakeFilter", row);
          if(isFilter === false) return;

          if (!visibleVisualRowsAssertion(row)) {
            trimmedRows.push(row);
          }
        });

        this.trimRowsPlugin.trimRows(trimmedRows);

        if (!visibleVisualRows.length) {
          this.hot.deselectCell();
        }
      } else {
        this.trimRowsPlugin.untrimAll();
      }
    }

    this.hot.view.wt.wtOverlays.adjustElementsSize(true);
    this.hot.render();
    this.clearColumnSelection();

    this.hot.runHooks('afterFilter', formulas);
  }

  /**
   * Get last selected column index.
   *
   * @returns {Object|null} Return `null` when column isn't selected otherwise
   * object containing information about selected column with keys `visualIndex` and `physicalIndex`
   */
  getSelectedColumn() {
    return this.lastSelectedColumn;
  }

  /**
   * Clear column selection.
   */
  clearColumnSelection() {
    let [row, col] = this.hot.getSelected() || [];

    if (row !== void 0 && col !== void 0) {
      this.hot.selectCell(row, col);
    }
  }

  /**
   * Get handsontable source data with cell meta based on current selection.
   *
   * @param {Number} [column] Column index. By default column index accept the value of the selected column.
   * @returns {Array} Returns array of objects where keys as row index.
   */
  getDataMapAtColumn(column) {
    const visualIndex = this.t.toVisualColumn(column);
    const data = [];

    var columnData = this.hot.runHooks("columnValues", visualIndex);
    if(!columnData || columnData == visualIndex) columnData = this.hot.getSourceDataAtCol(visualIndex);
    arrayEach(columnData, (value, rowIndex) => {
      let {row, col, visualCol, visualRow, type, instance, dateFormat} = this.hot.getCellMeta(rowIndex, visualIndex);

      data.push({
        meta: {row, col, visualCol, visualRow, type, instance, dateFormat},
        //value: toEmptyString(value),
        value: toVisualValue(toEmptyString(value), this.hot, column),
      });
    });

    return data;
  }

  /**
   * `afterChange` listener.
   *
   * @private
   * @param {Array} changes Array of changes.
   */
  onAfterChange(changes) {
    if (changes) {
      arrayEach(changes, (change) => {
        const [, prop] = change;
        const columnIndex = this.hot.propToCol(prop);

        this.updateValueComponentFormula(columnIndex);
      });
    }
  }

  /**
   * Update formula of ValueComponent basing on handled changes
   *
   * @private
   * @param {Number} columnIndex Column index of handled ValueComponent formula
   */
  updateValueComponentFormula(columnIndex) {
    const dataAtCol = this.hot.getFilterDataAtCol(columnIndex);
    const selectedValues = unifyColumnValues(dataAtCol);

    this.formulaUpdateObserver.updateStatesAtColumn(columnIndex, selectedValues);
  }

  /**
   * After dropdown menu show listener.
   *
   * @private
   */
  onAfterDropdownMenuShow() {
    const selectedColumn = this.getSelectedColumn();
    const physicalIndex = selectedColumn && selectedColumn.physicalIndex;
    const conditionComponent = this.conditionComponent;
    const valueComponent = this.valueComponent;

    if (!conditionComponent.isHidden()) {
      conditionComponent.restoreState(physicalIndex);
    }
    if (!valueComponent.isHidden()) {
      valueComponent.restoreState(physicalIndex);
      valueComponent.elements[0].resetSize();
    }
  }

  /**
   * After dropdown menu hide listener.
   *
   * @private
   */
  onAfterDropdownMenuHide() {
    this.conditionComponent.getSelectElement().closeOptions();
  }

  /**
   * Before dropdown menu set menu items listener.
   *
   * @private
   * @param {Array} items DropdownMenu items created based on predefined items and settings provided by user.
   */
  onBeforeDropdownMenuSetItems(items) {
    const menuKeys = arrayMap(items, (item) => item.key);
    const conditionComponent = this.conditionComponent;
    const valueComponent = this.valueComponent;

    conditionComponent[menuKeys.indexOf(conditionComponent.getMenuItemDescriptor().key) === -1 ? 'hide' : 'show']();
    valueComponent[menuKeys.indexOf(valueComponent.getMenuItemDescriptor().key) === -1 ? 'hide' : 'show']();
  }

  /**
   * After dropdown menu default options listener.
   *
   * @private
   * @param {Object} defaultOptions ContextMenu default item options.
   */
  onAfterDropdownMenuDefaultOptions(defaultOptions) {
    defaultOptions.items.push({name: SEPARATOR});
    defaultOptions.items.push(this.conditionComponent.getMenuItemDescriptor());
    defaultOptions.items.push(this.valueComponent.getMenuItemDescriptor());
    defaultOptions.items.push(this.actionBarComponent.getMenuItemDescriptor());
  }

  /**
   * On action bar submit listener.
   *
   * @private
   * @param {String} submitType
   */
  onActionBarSubmit(submitType) {
    if (submitType === 'accept') {
      const selectedColumn = this.getSelectedColumn();
      const physicalIndex = selectedColumn && selectedColumn.physicalIndex;
      const byConditionState = this.conditionComponent.getState();
      this.valueComponent.uncheckHiddenValues();
      const byValueState = this.valueComponent.getState();

      this.formulaUpdateObserver.groupChanges();
      this.formulaCollection.clearFormulas(physicalIndex);

      if (byConditionState.command.key === FORMULA_NONE && byValueState.command.key === FORMULA_NONE) {
        this.formulaCollection.removeFormulas(physicalIndex);
      }
      if (byConditionState.command.key !== FORMULA_NONE) {
        this.formulaCollection.addFormula(physicalIndex, byConditionState);
      }
      if (byValueState.command.key !== FORMULA_NONE) {
        this.formulaCollection.addFormula(physicalIndex, byValueState);
      }
      this.formulaUpdateObserver.flush();

      this.conditionComponent.saveState(physicalIndex);
      this.valueComponent.saveState(physicalIndex);

      this.filter();
    }
    this.dropdownMenuPlugin.close();
  }

  /**
   * On component change listener.
   *
   * @private
   * @param {BaseComponent} component Component inheriting BaseComponent
   * @param {Object} command Menu item object (command).
   */
  onComponentChange(component, command) {
    if (component === this.conditionComponent && !command.inputsCount) {
      this.setListeningDropdownMenu();
    }
  }

  /**
   * On component SelectUI closed listener.
   *
   * @private
   */
  onSelectUIClosed() {
    this.setListeningDropdownMenu();
  }

  /**
   * Listen to the keyboard input on document body and forward events to instance of Handsontable
   * created by DropdownMenu plugin
   *
   * @private
   */
  setListeningDropdownMenu() {
    this.dropdownMenuPlugin.setListening();
  }

  /**
   * On after get column header listener.
   *
   * @private
   * @param {Number} col
   * @param {HTMLTableCellElement} TH
   */
  onAfterGetColHeader(col, TH) {
    const physicalColumn = this.t.toPhysicalColumn(col);

    if (this.enabled && this.formulaCollection.hasFormulas(physicalColumn)) {
      addClass(TH, 'htFiltersActive');
    } else {
      removeClass(TH, 'htFiltersActive');
    }
  }

  /**
   * On table click listener.
   *
   * @private
   * @param {Event} event DOM Event.
   */
  onTableClick(event) {
    let th = closest(event.target, 'TH');

    if (th) {
      const visualIndex = this.hot.getCoords(th).col;
      const physicalIndex = this.t.toPhysicalColumn(visualIndex);

      this.lastSelectedColumn = {
        visualIndex,
        physicalIndex
      };
    }
  }

  isFilter(row){
    let dataFilter = this._createDataFilter();
    let needToFilter = !this.formulaCollection.isEmpty();
    let visibleVisualRows = [];

    if (needToFilter) {
      visibleVisualRows = arrayMap(dataFilter.filter(), (rowData) => rowData.meta.visualRow);
      const visibleVisualRowsAssertion = createArrayAssertion(visibleVisualRows);
      return !visibleVisualRowsAssertion(row);
    } else {
      return false;
    }
  }

  /**
   * Destroy plugin.
   */
  destroy() {
    if (this.enabled) {
      this.actionBarComponent.destroy();
      this.conditionComponent.destroy();
      this.valueComponent.destroy();

      this.formulaCollection.destroy();
      this.formulaUpdateObserver.destroy();
    }
    super.destroy();
  }

  /**
   * Create DataFilter instance based on formula collection.
   *
   * @private
   * @param {FormulaCollection} formulaCollection Formula collection object.
   * @returns {DataFilter}
   */
  _createDataFilter(formulaCollection = this.formulaCollection) {
    return new DataFilter(formulaCollection, (column) => this.getDataMapAtColumn(column), this.hot);
  }
}

registerPlugin('filters', Filters);

export default Filters;
