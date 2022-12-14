import {addClass} from 'handsontable/helpers/dom/element';
import Menu from 'handsontable/plugins/contextMenu/menu';
import {clone, extend} from 'handsontable/helpers/object';
import {arrayFilter, arrayMap, arrayEach} from 'handsontable/helpers/array';
import {startsWith} from 'handsontable/helpers/string';
import {isKey} from 'handsontable/helpers/unicode';
import {partial} from 'handsontable/helpers/function';
import {stopImmediatePropagation} from 'handsontable/helpers/dom/event';
import BaseUI from './_base';
import InputUI from './input';
import {createArrayAssertion} from './../utils';

const privatePool = new WeakMap();
const MIN_WIDTH = 168;
const MIN_HEIGHT = 110;

/**
 * @class MultipleSelectUI
 * @util
 */
class MultipleSelectUI extends BaseUI {
  static get DEFAULTS() {
    return clone({
      className: 'htUIMultipleSelect',
      value: [],
    });
  }

  constructor(hotInstance, options) {
    super(hotInstance, extend(MultipleSelectUI.DEFAULTS, options));

    privatePool.set(this, {});
    /**
     * Input element.
     *
     * @type {InputUI}
     */
    this.searchInput = new InputUI(this.hot, {
      // placeholder: 'Search...',
      placeholder: '查找...',
      className: 'htUIMultipleSelectSearch'
    });
    /**
     * "Select all" UI element.
     *
     * @type {BaseUI}
     */
    this.selectAllUI = new BaseUI(this.hot, {
      tagName: 'a',
      textContent: '全选',
      // textContent: 'Select all',
      href: '#',
      className: 'htUISelectAll',
    });
    /**
     * "Clear" UI element.
     *
     * @type {BaseUI}
     */
    this.clearAllUI = new BaseUI(this.hot, {
      tagName: 'a',
      textContent: '清除',
      // textContent: 'Clear',
      href: '#',
      className: 'htUIClearAll',
    });
    /**
     * List of available select options.
     *
     * @type {Array}
     */
    this.items = [];
    /**
     * Handsontable instance used as items list element.
     *
     * @type {Handsontable}
     */
    this.itemsBox = null;

    this.registerHooks();
  }

  /**
   * Register all necessary hooks.
   */
  registerHooks() {
    this.searchInput.addLocalHook('keydown', (event) => this.onInputKeyDown(event));
    this.searchInput.addLocalHook('input', (event) => this.onInput(event));
    this.selectAllUI.addLocalHook('click', (event) => this.onSelectAllClick(event));
    this.clearAllUI.addLocalHook('click', (event) => this.onClearAllClick(event));
  }

  /**
   * Set available options.
   *
   * @param {Array} items Array of objects with `checked` and `label` property.
   */
  setItems(items) {
    this.items = items;

    if (this.itemsBox) {
      this.itemsBox.loadData(this.items);
    }
  }

  /**
   * Get all available options.
   *
   * @returns {Array}
   */
  getItems() {
    return [...this.items];
  }

  /**
   * Get element value.
   *
   * @returns {Array} Array of selected values.
   */
  getValue() {
    return itemsToValue(this.items);
  }

  /**
   * Check if all values listed in element are selected.
   *
   * @returns {Boolean}
   */
  isSelectedAllValues() {
    return this.items.length === this.getValue().length;
  }

  /**
   * Build DOM structure.
   */
  build() {
    super.build();

    const itemsBoxWrapper = document.createElement('div');
    const selectionControl = new BaseUI(this.hot, {
      className: 'htUISelectionControls',
      children: [this.selectAllUI, this.clearAllUI],
    });

    this._element.appendChild(this.searchInput.element);
    this._element.appendChild(selectionControl.element);
    this._element.appendChild(itemsBoxWrapper);

    let hotInitializer = (wrapper) => {
      if (!this._element) {
        return;
      }
      if (this.itemsBox) {
        this.itemsBox.destroy();
      }

      addClass(wrapper, 'htUIMultipleSelectHot');
      const hotSettings = this.hot.getSettings();
      this.itemsBox = new Handsontable(wrapper, {
        data: this.items,
        columns: [
          {data: 'checked', type: 'checkbox', width: 20},
          {data: 'visualValue', type: 'text'}
        ],
        // autoWrapCol: true,
        // colWidths: this.getColWidths(hotSettings.filtersWidth || MIN_WIDTH),
        autoColumnSize: true,
        autoColumnSizeRevise: 5,
        // stretchH: 'last',
        height: hotSettings.filtersHeight || MIN_HEIGHT,
        width: hotSettings.filtersWidth || MIN_WIDTH,
        copyPaste: false,
        disableVisualSelection: 'area',
        fillHandle: false,
        fragmentSelection: 'cell',
        tabMoves: {row: 1, col: 0},
        beforeKeyDown: (event) => this.onItemsBoxBeforeKeyDown(event)
      });
    };
    this.resetSize();
    hotInitializer(itemsBoxWrapper);
    setTimeout(() => {
      hotInitializer(itemsBoxWrapper);
      this.itemsBox.addHook('beforeOnCellMouseDown', (event, coords) => {
        let col = coords.col;
        let row = coords.row;
        if (col === 1) {
          event.stopImmediatePropagation();
          this.itemsBox.setDataAtCell(row, 0, !this.itemsBox.getDataAtCell(row, 0));
        }
      });
    }, 100);
  }

  resetSize() {
    const hotSettings = this.hot.getSettings();
    if (hotSettings.filtersWidth) {
      let dropdownMenu = this.hot.getPlugin('dropdownMenu');
      dropdownMenu.menu.hotMenu.updateSettings({width: this.getHotMenuWidth(hotSettings.filtersWidth), colWidths: this.getHotMenuColWidths(hotSettings.filtersWidth)});
    }
  }
  getColWidths(width) {
    return width - 18;
  }
  getHotMenuWidth(width) {
    return width + 56;
  }
  getHotMenuColWidths(width) {
    return [width + 32];
  }

  /**
   * Reset DOM structure.
   */
  reset() {
    this.searchInput.reset();
  }

  /**
   * Update DOM structure.
   */
  update() {
    if (!this.isBuilt()) {
      return;
    }
    this.itemsBox.loadData(valueToItems(this.items, this.options.value));
    super.update();
  }

  /**
   * Destroy instance.
   */
  destroy() {
    if (this.itemsBox) {
      this.itemsBox.destroy();
    }
    this.searchInput.destroy();
    this.clearAllUI.destroy();
    this.selectAllUI.destroy();

    this.searchInput = null;
    this.clearAllUI = null;
    this.selectAllUI = null;
    this.itemsBox = null;
    this.items = null;
    super.destroy();
  }

  /**
   * 'input' event listener for input element.
   *
   * @private
   * @param {Event} event DOM event.
   */
  onInput(event) {
    let value = event.target.value.toLowerCase();
    let filteredItems;

    if (value === '') {
      filteredItems = [...this.items];
    } else {
      filteredItems = arrayFilter(this.items, (item) => (item.visualValue + '').toLowerCase().indexOf(value) >= 0);
    }
    this.itemsBox.loadData(filteredItems);
  }

  /**
   * 'keydown' event listener for input element.
   *
   * @private
   * @param {Event} event DOM event.
   */
  onInputKeyDown(event) {
    this.runLocalHooks('keydown', event, this);

    const isKeyCode = partial(isKey, event.keyCode);

    if (isKeyCode('ARROW_DOWN|TAB') && !this.itemsBox.isListening()) {
      stopImmediatePropagation(event);
      this.itemsBox.listen();
      this.itemsBox.selectCell(0, 0);
    }
  }

  /**
   * On before key down listener (internal Handsontable).
   *
   * @private
   * @param {Event} event DOM event.
   */
  onItemsBoxBeforeKeyDown(event) {
    const isKeyCode = partial(isKey, event.keyCode);

    if (isKeyCode('ESCAPE')) {
      this.runLocalHooks('keydown', event, this);
    }
    // for keys different than below, unfocus Handsontable and focus search input
    if (!isKeyCode('ARROW_UP|ARROW_DOWN|ARROW_LEFT|ARROW_RIGHT|TAB|SPACE|ENTER')) {
      stopImmediatePropagation(event);
      this.itemsBox.unlisten();
      this.itemsBox.deselectCell();
      this.searchInput.focus();
    }
  }

  /**
   * On click listener for "Select all" link.
   *
   * @private
   * @param {DOMEvent} event
   */
  onSelectAllClick(event) {
    event.preventDefault();
    arrayEach(this.itemsBox.getSourceData(), (row) => {
      row.checked = true;
    });
    this.itemsBox.render();
  }

  /**
   * On click listener for "Clear" link.
   *
   * @private
   * @param {DOMEvent} event
   */
  onClearAllClick(event) {
    event.preventDefault();
    arrayEach(this.itemsBox.getSourceData(), (row) => {
      row.checked = false;
    });
    this.itemsBox.render();
  }
}

export default MultipleSelectUI;

/**
 * Pick up object items based on selected values.
 *
 * @param {Array} availableItems Base collection to compare values.
 * @param selectedValue Flat array with selected values.
 * @returns {Array}
 */
function valueToItems(availableItems, selectedValue) {
  const arrayAssertion = createArrayAssertion(selectedValue);

  return arrayMap(availableItems, (item) => {
    item.checked = arrayAssertion(item.value);

    return item;
  });
}

/**
 * Convert all checked items into flat array.
 *
 * @param {Array} availableItems Base collection.
 * @returns {Array}
 */
function itemsToValue(availableItems) {
  let items = [];

  arrayEach(availableItems, (item) => {
    if (item.checked) {
      items.push(item.value);
    }
  });

  return items;
}
