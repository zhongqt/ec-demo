import {addClass} from 'handsontable/helpers/dom/element';
import {arrayEach} from 'handsontable/helpers/array';
import BaseComponent from './_base';
import InputUI from './../ui/input';

/**
 * @class ActionBarComponent
 * @plugin Filters
 */
class ActionBarComponent extends BaseComponent {
  static get BUTTON_OK() {
    return 'ok';
  }
  static get BUTTON_CANCEL() {
    return 'cancel';
  }

  constructor(hotInstance) {
    super(hotInstance);

    this.elements.push(
      new InputUI(this.hot, {
        // type: 'button', value: 'OK', className: 'htUIButton htUIButtonOK', identifier: ActionBarComponent.BUTTON_OK
        type: 'button', value: '确定', className: 'htUIButton htUIButtonOK', identifier: ActionBarComponent.BUTTON_OK
      })
    );
    this.elements.push(
      new InputUI(this.hot, {
        // type: 'button', value: 'Cancel', className: 'htUIButton htUIButtonCancel', identifier: ActionBarComponent.BUTTON_CANCEL
        type: 'button', value: '取消', className: 'htUIButton htUIButtonCancel', identifier: ActionBarComponent.BUTTON_CANCEL
      })
    );
    this.registerHooks();
  }

  /**
   * Register all necessary hooks.
   *
   * @private
   */
  registerHooks() {
    arrayEach(this.elements, (element) => {
      element.addLocalHook('click', (event, button) => this.onButtonClick(event, button));
    });
  }

  /**
   * Get menu object descriptor.
   *
   * @returns {Object}
   */
  getMenuItemDescriptor() {
    return {
      key: 'filter_action_bar',
      name: 'Action bar',
      isCommand: false,
      disableSelection: true,
      hidden: () => this.isHidden(),
      renderer: (hot, wrapper, row, col, prop, value) => {
        addClass(wrapper.parentNode, 'htFiltersMenuActionBar');

        arrayEach(this.elements, (ui) => wrapper.appendChild(ui.element));

        return wrapper;
      }
    };
  }

  /**
   * Fire accept event.
   */
  accept() {
    this.runLocalHooks('accept');
  }

  /**
   * Fire cancel event.
   */
  cancel() {
    this.runLocalHooks('cancel');
  }

  /**
   * On button click listener.
   *
   * @private
   * @param {Event} event DOM event
   * @param {InputUI} button InputUI object.
   */
  onButtonClick(event, button) {
    if (button.options.identifier === ActionBarComponent.BUTTON_OK) {
      this.accept();
    } else {
      this.cancel();
    }
  }
}

export default ActionBarComponent;
