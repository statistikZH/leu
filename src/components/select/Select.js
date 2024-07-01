import { html, nothing } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { createRef, ref } from "lit/directives/ref.js"

import { ifDefined } from "lit/directives/if-defined.js"
import { LeuElement } from "../../lib/LeuElement.js"
import { HasSlotController } from "../../lib/hasSlotController.js"

import { LeuButton } from "../button/Button.js"
import { LeuMenu } from "../menu/Menu.js"
import { LeuMenuItem } from "../menu/MenuItem.js"
import { LeuIcon } from "../icon/Icon.js"
import { LeuInput } from "../input/Input.js"
import { LeuPopup } from "../popup/Popup.js"

// @ts-ignore
import styles from "./select.css"

/**
 * @tagname leu-select
 * @slot before - Optional content the appears before the option list
 * @slot after - Optional content the appears after the option list
 * @property {string} name - Reflects to the name attribute of the hidden input field that would be used in a form
 * @property {boolean} open - The expanded state of the popup
 * @property {string} label - The label of the select
 * @property {array} value - List of selected values. If they're set from outside the component, the select element tries to find all the options with the given values and selects them.
 * @property {boolean} clearable - Show a clearable button to reset the value
 * @property {boolean} disabled - If the select should be disabled
 * @property {boolean} filterable - Show an input field to filter the options inside the popup
 * @property {boolean} multiple - Allow multiple selections
 * @attribute {string} value - The selected values separated by commas.
 */
export class LeuSelect extends LeuElement {
  static dependencies = {
    "leu-button": LeuButton,
    "leu-menu": LeuMenu,
    "leu-menu-item": LeuMenuItem,
    "leu-icon": LeuIcon,
    "leu-input": LeuInput,
    "leu-popup": LeuPopup,
  }

  static styles = styles

  static get properties() {
    return {
      name: { type: String, reflect: true },
      open: { type: Boolean, reflect: true },
      label: { type: String, reflect: true },
      value: {
        type: Array,
        converter: {
          fromAttribute(value) {
            if (value) {
              return value.split(",").map((v) => v.trim())
            }
            return value
          },
        },
      },
      clearable: { type: Boolean, reflect: true },
      disabled: { type: Boolean, reflect: true },
      filterable: { type: Boolean, reflect: true },
      multiple: { type: Boolean, reflect: true },
      _optionFilter: { state: true },
      _hasFilterResults: { state: true },
      _displayValue: { state: true },
    }
  }

  static getOptionLabel(option) {
    if (typeof option === "object" && option !== null) {
      return option.label
    }
    return option
  }

  /**
   * @internal
   */
  hasSlotController = new HasSlotController(this, ["before", "after"])

  constructor() {
    super()
    this.open = false
    this.disabled = false
    this.open = false
    this.multiple = false
    this.clearable = false
    this.filterable = false
    this.value = []
    this.label = ""
    this.name = ""

    /** @internal */
    this._optionFilter = ""

    /** @internal */
    this._hasFilterResults = true

    /** @internal */
    this._deferedChangeEvent = false

    /** @internal */
    this._displayValue = ""

    /**
     * @type {import("lit/directives/ref").Ref<import("../input/Input").LeuInput>}
     */
    this._optionFilterRef = createRef()
    /**
     * @type {import("lit/directives/ref").Ref<HTMLButtonElement>}
     */
    this._toggleButtonRef = createRef()

    /**
     * @type {import("lit/directives/ref").Ref<import("../menu/Menu").LeuMenu>}
     */
    this._menuRef = createRef()
  }

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener("click", this._handleDocumentClick)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    document.removeEventListener("click", this._handleDocumentClick)
  }

  updated(changedProperties) {
    if (changedProperties.has("open") && this.open) {
      if (this.filterable) {
        this._optionFilterRef.value.focus()
      } else {
        this._menuRef.value.focusItem(0)
      }
    } else if (changedProperties.has("open") && !this.open) {
      // TODO: Check if the ref is guaranteed to be set
      // in the updated method.
      // According to the lit documentation, a ref callback
      // CAN be called with undefined.
      this._toggleButtonRef.value?.focus()
    }

    if (
      changedProperties.has("value") ||
      changedProperties.has("_optionFilter")
    ) {
      this._updateMenuItems({
        value: changedProperties.has("value"),
        optionFilter: changedProperties.has("_optionFilter"),
      })
    }
  }

  /**
   * Apply the current state to the menu items.
   * - Set the active property when the value property has changed.
   * - Hide menu items that do not match the filter.
   */
  async _updateMenuItems(changed) {
    /** @type {LeuMenu} */
    const menu = this._menuRef.value

    await menu.updateComplete

    const menuItems = menu.getMenuItems()
    let hasFilterResults = false

    /* eslint-disable no-param-reassign */
    menuItems.forEach((menuItem) => {
      if (changed.optionFilter) {
        menuItem.hidden =
          this._optionFilter !== "" &&
          !menuItem.textContent
            .toLowerCase()
            .includes(this._optionFilter.toLowerCase())

        hasFilterResults = hasFilterResults || !menuItem.hidden
      }

      if (changed.value) {
        menuItem.active = this._isSelected(menuItem.getValue())

        if (!this.multiple && menuItem.active) {
          this._displayValue = menuItem.textContent
        }
      }
    })
    /* eslint-enable no-param-reassign */

    if (changed.optionFilter) {
      this._hasFilterResults = hasFilterResults
      menu.setCurrentItem(0)
    }
  }

  /**
   * Handles clicks outside of the component to close the dropdown.
   * @internal
   * @param {MouseEvent} event
   */
  _handleDocumentClick = (event) => {
    if (
      event.target instanceof Node &&
      !this.contains(event.target) &&
      this.open
    ) {
      this._closeDropdown()
    }
  }

  /**
   * @internal
   * @param {KeyboardEvent} event
   */
  _handleKeyDown = (event) => {
    if (event.key === "Escape") {
      this._closeDropdown()
    }
  }

  /**
   * @internal
   * @param {KeyboardEvent} event
   */
  async _handleToggleKeyDown(event) {
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault()

      const menu = this._menuRef.value

      this.open = true
      await this.updateComplete

      if (event.key === "ArrowDown" || event.key === "Home") {
        menu.focusItem(0)
      } else if (event.key === "ArrowUp" || event.key === "End") {
        menu.focusItem(-1)
      }
    }
  }

  /**
   * @internal
   * @param {KeyboardEvent} event
   */
  _handleFilterInputKeyDown(event) {
    if (event.key === "ArrowDown") {
      this._menuRef.value.focusItem(0)
    } else if (event.key === "ArrowUp") {
      this._menuRef.value.focusItem(-1)
    }
  }

  /**
   * Determines the value or label that should be displayed inside the toggle button.
   * @returns {String | nothing}
   */
  _getDisplayValue() {
    if (this.multiple) {
      return this.value.length === 0 ? `` : `${this.value.length} gewählt`
    }

    return this._displayValue ?? nothing
  }

  _emitInputEvent() {
    const inputevent = new CustomEvent("input", {
      composed: true,
      bubbles: true,
    })
    this.dispatchEvent(inputevent)
  }

  _emitChangeEvent() {
    const changeevent = new CustomEvent("change", {
      composed: true,
      bubbles: true,
    })
    this.dispatchEvent(changeevent)
  }

  _clearValue(event) {
    if (!this.disabled) {
      event.stopPropagation()
      this.value = []
    }

    this._emitInputEvent()
    this._emitChangeEvent()
  }

  _toggleDropdown() {
    if (!this.disabled) {
      this.open = !this.open
    }
  }

  _closeDropdown() {
    this.open = false

    if (this._deferedChangeEvent) {
      this._emitChangeEvent()
      this._deferedChangeEvent = false
    }
  }

  _handleFilterInput(event) {
    this._optionFilter = event.target.value
  }

  /**
   * Checks if the given value is selected.
   * @param {String} menuItemValue
   * @returns {Boolean}
   */
  _isSelected(menuItemValue) {
    return this.value.includes(menuItemValue)
  }

  _handleMenuItemClick(event) {
    if (!(event.target instanceof LeuMenuItem) || event.target.disabled) {
      return
    }

    /** @type {LeuMenuItem} */
    const menuItem = event.target

    const value = menuItem.getValue()
    const isSelected = this._isSelected(value)

    if (this.multiple) {
      this.value = isSelected
        ? this.value.filter((v) => v !== value)
        : this.value.concat(value)

      this._deferedChangeEvent = true
    } else {
      this.value = isSelected ? [] : [value]
      this._displayValue = isSelected ? "" : menuItem.textContent
    }

    this._emitInputEvent()

    if (!this.multiple) {
      this._closeDropdown()
    }
  }

  /**
   * Close the dropdown if the focus moves outside the component.
   */
  _handlePopupFocusOut(event) {
    if (
      !this.contains(event.relatedTarget) &&
      !this.shadowRoot.contains(event.relatedTarget)
    ) {
      this._closeDropdown()
    }
  }

  _renderFilterInput() {
    if (this.filterable) {
      return html` <leu-input
        class="select-search"
        size="small"
        @input=${this._handleFilterInput}
        @keydown=${this._handleFilterInputKeyDown}
        clearable
        ref=${ref(this._optionFilterRef)}
        label="Nach Stichwort filtern"
      ></leu-input>`
    }

    return nothing
  }

  _renderApplyButton() {
    if (this.multiple) {
      return html`
        <div class="apply-button-wrapper">
          <leu-button
            type="button"
            class="apply-button"
            @click=${this._closeDropdown}
            fluid
            >Anwenden</leu-button
          >
        </div>
      `
    }

    return nothing
  }

  _renderToggleButton() {
    const toggleClasses = {
      "select-toggle": true,
      open: this.open,
      filled: this.value.length !== 0 && this.value !== null,
      labeled: this.label !== "",
    }

    return html`<button
      ${ref(this._toggleButtonRef)}
      type="button"
      class=${classMap(toggleClasses)}
      @click=${this._toggleDropdown}
      @keydown=${this._handleToggleKeyDown}
      ?disabled=${this.disabled}
      aria-controls="select-popup"
      aria-expanded="${this.open}"
      aria-labelledby="select-label"
      role="combobox"
      slot="anchor"
    >
      <span class="label" id="select-label">${this.label}</span>
      <span class="value"> ${this._getDisplayValue()} </span>
      <span class="arrow-icon">
        <leu-icon name="angleDropDown"></leu-icon>
      </span>
      ${this.clearable && this.value.length !== 0
        ? html`<button
            type="button"
            class="clear-button"
            @click=${this._clearValue}
            aria-label=${`${this.label} zurücksetzen`}
            ?disabled=${this.disabled}
          >
            <leu-icon name="clear"></leu-icon>
          </button>`
        : nothing}
    </button>`
  }

  render() {
    const selectClasses = {
      select: true,
      "select--has-before": this.hasSlotController.test("before"),
      "select--has-after": this.hasSlotController.test("after"),
    }

    /*
     * We use the click event listener with the event delegation pattern
     * so this is not a violation of the rule.
     */
    /* eslint-disable lit-a11y/click-events-have-key-events */
    return html`<div
        class=${classMap(selectClasses)}
        @keydown=${this._handleKeyDown}
      >
        <leu-popup
          ?active=${this.open}
          placement="bottom-start"
          flip
          matchSize="width"
          autoSize="height"
          autoSizePadding="8"
        >
          ${this._renderToggleButton()}
          <div
            id="select-popup"
            class="select-menu-container"
            @focusout=${this._handlePopupFocusOut}
          >
            <slot name="before" class="before"></slot>
            ${this._renderFilterInput()}
            <leu-menu
              ref=${ref(this._menuRef)}
              role="listbox"
              aria-multiselectable=${ifDefined(
                this.multiple ? "true" : undefined
              )}
              class="menu"
              @click=${this._handleMenuItemClick}
            >
              <slot></slot>
            </leu-menu>
            ${this._hasFilterResults
              ? nothing
              : html` <p class="filter-message-empty" aria-live="polite">
                  Keine Resultate
                </p>`}
            ${this._renderApplyButton()}
            <slot name="after" class="after"></slot>
          </div>
        </leu-popup>
      </div>
      <input type="hidden" name=${this.name} .value=${this.value.join(",")} />`
    /* eslint-enable lit-a11y/click-events-have-key-events */
  }
}
