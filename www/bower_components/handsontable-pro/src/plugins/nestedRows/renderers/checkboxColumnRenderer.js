import {empty, addClass, hasClass} from 'handsontable/helpers/dom/element';
import {equalsIgnoreCase} from 'handsontable/helpers/string';
import EventManager from 'handsontable/eventManager';
import {isKey} from 'handsontable/helpers/unicode';
import {partial} from 'handsontable/helpers/function';
import {stopImmediatePropagation, isImmediatePropagationStopped} from 'handsontable/helpers/dom/event';
import {getRenderer} from 'handsontable/renderers/index';
import {rangeEach} from 'handsontable/helpers/number';
import {arrayEach} from 'handsontable/helpers/array';

const isListeningKeyDownEvent = new WeakMap();
const isCheckboxListenerAdded = new WeakMap();
const BAD_VALUE_CLASS = 'htBadValue';

/**
 * Checkbox renderer
 *
 * @private
 * @param {Object} instance Handsontable instance
 * @param {Element} TD Table cell where to render
 * @param {Number} row
 * @param {Number} col
 * @param {String|Number} prop Row object property name
 * @param value Value to render (remember to escape unsafe HTML before inserting to DOM!)
 * @param {Object} cellProperties Cell properties (shared by cell renderer and editor)
 */
function checkboxColumnRenderer(instance, TD, row, col, prop, value, cellProperties) {
  getRenderer('base').apply(this, arguments);

  let nestedRowsPlugin = instance.getPlugin("nestedRows");
  let trimRowsPlugin = nestedRowsPlugin.trimRowsPlugin;
  let dataManager = nestedRowsPlugin.dataManager;
  let physicalRow = instance.toPhysicalRow(row);
  const rowLevel = dataManager.getRowLevel(physicalRow);
  const rowObject = dataManager.getDataObject(physicalRow);
  const nodeInfo = dataManager.cache.nodeInfo.get(rowObject);
  if(nodeInfo == undefined) return;

  const eventManager = registerEvents(instance);

  empty(TD); // TODO identify under what circumstances this line can be removed

  let parentIndex = null;
  if(nodeInfo.parent){
    parentIndex = dataManager.getRowIndex(nodeInfo.parent);
    if(!trimRowsPlugin.isTrimmed(parentIndex)){
      rangeEach(0, rowLevel - 1, (i) => {
        var middleSep = createIconWrapper(true);
        TD.appendChild(middleSep);
      });
    }
  }

  var iconWrapper = createIconWrapper();
  if (dataManager.hasChildren(rowObject)) {
    let children = rowObject.__children;
    let flag = false;
    if(instance.hasHook("isFilter")){
      arrayEach(children, function (childrenRow) {
        let childrenIndex = dataManager.getRowIndex(childrenRow);
        let filterFlag = instance.runHooks("isFilter", childrenIndex);
        if(!filterFlag) flag = true;
      });
    } else if(children){
      flag = true;
    }

    if(flag){
      var icon = createIcon();

      if (!nestedRowsPlugin.collapsingUI.areChildrenCollapsed(physicalRow)) {
        addClass(icon, "expanded");
      }

      iconWrapper.appendChild(icon);
    }
  }
  let isLast = dataManager.isLast(physicalRow);
  if(isLast){
    let flag = false;
    if(parentIndex == null)
      flag = true;
    else if(parentIndex != null && (!trimRowsPlugin.isTrimmed(parentIndex) || dataManager.isLast(parentIndex)))
      flag = true;

    if(flag) addClass(iconWrapper, "is-last");
  }

  TD.appendChild(iconWrapper);

  let input = createInput();
  const labelOptions = cellProperties.label;
  let badValue = false;

  if (typeof cellProperties.checkedTemplate === 'undefined') {
    cellProperties.checkedTemplate = true;
  }
  if (typeof cellProperties.uncheckedTemplate === 'undefined') {
    cellProperties.uncheckedTemplate = false;
  }

  if (value === cellProperties.checkedTemplate || equalsIgnoreCase(value, cellProperties.checkedTemplate)) {
    input.checked = true;

  } else if (value === cellProperties.uncheckedTemplate || equalsIgnoreCase(value, cellProperties.uncheckedTemplate)) {
    input.checked = false;

  } else if (value === null) { // default value
    addClass(input, 'noValue');

  } else {
    input.style.display = 'none';
    addClass(input, BAD_VALUE_CLASS);
    badValue = true;
  }

  input.setAttribute('data-row', row);
  input.setAttribute('data-col', col);

  if (!badValue && labelOptions) {
    let labelText = '';

    if (labelOptions.value) {
      labelText = typeof labelOptions.value === 'function' ? labelOptions.value.call(this, row, col, prop, value) : labelOptions.value;

    } else if (labelOptions.property) {
      labelText = instance.getDataAtRowProp(row, labelOptions.property);
    }
    const label = createLabel(labelText);

    if (labelOptions.position === 'before') {
      label.appendChild(input);
    } else {
      label.insertBefore(input, label.firstChild);
    }
    input = label;
  }

  TD.appendChild(input);

  if (badValue) {
    TD.appendChild(document.createTextNode('#bad-value#'));
  }

  if (!isListeningKeyDownEvent.has(instance)) {
    isListeningKeyDownEvent.set(instance, true);
    instance.addHook('beforeKeyDown', onBeforeKeyDown);
  }

  instance.runHooks('afterCheckboxColumnRender', TD, row, col, prop, value, cellProperties);

  /**
   * On before key down DOM listener.
   *
   * @private
   * @param {Event} event
   */
  function onBeforeKeyDown(event) {
    const toggleKeys = 'SPACE|ENTER';
    const switchOffKeys = 'DELETE|BACKSPACE';
    const isKeyCode = partial(isKey, event.keyCode);

    if (isKeyCode(`${toggleKeys}|${switchOffKeys}`) && !isImmediatePropagationStopped(event)) {
      eachSelectedCheckboxCell(() => {
        stopImmediatePropagation(event);
      event.preventDefault();
    });
    }
    if (isKeyCode(toggleKeys)) {
      changeSelectedCheckboxesState();
    }
    if (isKeyCode(switchOffKeys)) {
      changeSelectedCheckboxesState(true);
    }
  }

  /**
   * Change checkbox checked property
   *
   * @private
   * @param {Boolean} [uncheckCheckbox=false]
   */
  function changeSelectedCheckboxesState(uncheckCheckbox = false) {
    const selRange = instance.getSelectedRange();

    if (!selRange) {
      return;
    }

    const topLeft = selRange.getTopLeftCorner();
    const bottomRight = selRange.getBottomRightCorner();
    const changes = [];

    for (let row = topLeft.row; row <= bottomRight.row; row += 1) {
      for (let col = topLeft.col; col <= bottomRight.col; col += 1) {
        const cellProperties = instance.getCellMeta(row, col);

        if (cellProperties.type !== 'checkbox') {
          return;
        }

        /* eslint-disable no-continue */
        if (cellProperties.readOnly === true) {
          continue;
        }

        if (typeof cellProperties.checkedTemplate === 'undefined') {
          cellProperties.checkedTemplate = true;
        }
        if (typeof cellProperties.uncheckedTemplate === 'undefined') {
          cellProperties.uncheckedTemplate = false;
        }

        const dataAtCell = instance.getDataAtCell(row, col);

        if (uncheckCheckbox === false) {
          if (dataAtCell === cellProperties.checkedTemplate) {
            changes.push([row, col, cellProperties.uncheckedTemplate]);

          } else if ([cellProperties.uncheckedTemplate, null, void 0].indexOf(dataAtCell) !== -1) {
            changes.push([row, col, cellProperties.checkedTemplate]);
          }

        } else {
          changes.push([row, col, cellProperties.uncheckedTemplate]);
        }
      }
    }

    if (changes.length > 0) {
      instance.setDataAtCell(changes);
    }
  }

  /**
   * Call callback for each found selected cell with checkbox type.
   *
   * @private
   * @param {Function} callback
   */
  function eachSelectedCheckboxCell(callback) {
    const selRange = instance.getSelectedRange();

    if (!selRange) {
      return;
    }
    const topLeft = selRange.getTopLeftCorner();
    const bottomRight = selRange.getBottomRightCorner();

    for (let row = topLeft.row; row <= bottomRight.row; row++) {
      for (let col = topLeft.col; col <= bottomRight.col; col++) {
        let cellProperties = instance.getCellMeta(row, col);

        if (cellProperties.type !== 'checkbox') {
          return;
        }

        let cell = instance.getCell(row, col);

        if (cell == null) {

          callback(row, col, cellProperties);

        } else {
          let checkboxes = cell.querySelectorAll('input[type=checkbox]');

          if (checkboxes.length > 0 && !cellProperties.readOnly) {
            callback(checkboxes);
          }
        }
      }
    }
  }
}

/**
 * Register checkbox listeners.
 *
 * @param {Handsontable} instance Handsontable instance.
 * @returns {EventManager}
 */
function registerEvents(instance) {
  let eventManager = isCheckboxListenerAdded.get(instance);

  if (!eventManager) {
    eventManager = new EventManager(instance);
    eventManager.addEventListener(instance.rootElement, 'click', (event) => onClick(event, instance));
    eventManager.addEventListener(instance.rootElement, 'mouseup', (event) => onMouseUp(event, instance));
    eventManager.addEventListener(instance.rootElement, 'change', (event) => onChange(event, instance));

    isCheckboxListenerAdded.set(instance, eventManager);
  }

  return eventManager;
}

function createIconWrapper(isMiddle) {
  let iconWrapper = document.createElement("div");
  var className = "table-tree";
  if(isMiddle) className += " is-middle";
  iconWrapper.className = className;
  return iconWrapper;
}

function createIcon() {
  let icon = document.createElement("div");
  icon.className = "expand-toggle";
  return icon;
}

/**
 * Create input element.
 *
 * @returns {Node}
 */
function createInput() {
  let input = document.createElement('input');

  input.className = 'htCheckboxRendererInput';
  input.type = 'checkbox';
  input.setAttribute('autocomplete', 'off');
  input.setAttribute('tabindex', '-1');

  return input.cloneNode(false);
}

/**
 * Create label element.
 *
 * @returns {Node}
 */
function createLabel(text) {
  let label = document.createElement('label');

  label.className = 'htCheckboxRendererLabel';
  label.appendChild(document.createTextNode(text));

  return label.cloneNode(true);
}

/**
 * `mouseup` callback.
 *
 * @private
 * @param {Event} event `mouseup` event.
 * @param {Object} instance Handsontable instance.
 */
function onMouseUp(event, instance) {
  if (!isCheckboxInput(event.target)) {
    return;
  }
  setTimeout(instance.listen, 10);
}

/**
 * `click` callback.
 *
 * @private
 * @param {Event} event `click` event.
 * @param {Object} instance Handsontable instance.
 */
function onClick(event, instance) {
  if (!isCheckboxInput(event.target)) {
    return false;
  }

  const row = parseInt(event.target.getAttribute('data-row'), 10);
  const col = parseInt(event.target.getAttribute('data-col'), 10);
  const cellProperties = instance.getCellMeta(row, col);

  if (cellProperties.readOnly) {
    event.preventDefault();
  }
}

/**
 * `change` callback.
 *
 * @param {Event} event `change` event.
 * @param {Object} instance Handsontable instance.
 * @param {Object} cellProperties Reference to cell properties.
 * @returns {Boolean}
 */
function onChange(event, instance) {
  if (!isCheckboxInput(event.target)) {
    return false;
  }

  const row = parseInt(event.target.getAttribute('data-row'), 10);
  const col = parseInt(event.target.getAttribute('data-col'), 10);
  const cellProperties = instance.getCellMeta(row, col);

  if (!cellProperties.readOnly) {
    let newCheckboxValue = null;

    if (event.target.checked) {
      newCheckboxValue = cellProperties.uncheckedTemplate === void 0 ? true : cellProperties.checkedTemplate;

    } else {
      newCheckboxValue = cellProperties.uncheckedTemplate === void 0 ? false : cellProperties.uncheckedTemplate;
    }

    instance.setDataAtCell(row, col, newCheckboxValue);
  }
}

/**
 * Check if the provided element is the checkbox input.
 *
 * @private
 * @param {HTMLElement} element The element in question.
 * @returns {Boolean}
 */
function isCheckboxInput(element) {
  return element.tagName === 'INPUT' && element.getAttribute('type') === 'checkbox';
}

export default checkboxColumnRenderer;
