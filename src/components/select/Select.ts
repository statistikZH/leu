import { html, nothing, PropertyValues } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { createRef, ref } from "lit/directives/ref.js"
import { property, state } from "lit/decorators.js"

import { ifDefined } from "lit/directives/if-defined.js"
import { LeuElement } from "../../lib/LeuElement.js"
import { HasSlotController } from "../../lib/hasSlotController.js"
import { FormAssociatedMixin } from "../../lib/mixins/FormAssociatedMixin.js"

import { LeuButton } from "../button/Button.js"
import { LeuMenu } from "../menu/Menu.js"
import { LeuMenuItem } from "../menu/MenuItem.js"
import { LeuIcon } from "../icon/Icon.js"
import { LeuInput } from "../input/Input.js"
import { LeuPopup } from "../popup/Popup.js"

import styles from "./select.css?inline"

/**
 * @tagname leu-select
 * @slot before - Optional content the appears before the option list
 * @slot after - Optional content the appears after the option list
 * @attribute {string} value - The selected values separated by commas.
 */
export class LeuSelect extends FormAssociatedMixin(LeuElement) {
  static dependencies = {
    "leu-button": LeuButton,
    "leu-menu": LeuMenu,
    "leu-menu-item": LeuMenuItem,
    "leu-icon": LeuIcon,
    "leu-input": LeuInput,
    "leu-popup": LeuPopup,
  }

  static styles = [LeuElement.styles, styles]

  /**
   * @internal
   */
  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  /**
   * The label of the select
   */
  @property({ type: String, reflect: true })
  label: string = ""

  /**
   * The default value of the select. Corresponds to the `value` HTML attribute.
   */
  @property({
    reflect: true,
    attribute: "value",
    converter: {
      fromAttribute(value) {
        if (value) {
          return value.split(",").map((v) => v.trim())
        }
        return []
      },
      toAttribute(value: Array<string>) {
        return value.length > 0 ? value.join(",") : null
      },
    },
  })
  defaultValue: Array<string> = []

  /** @internal */
  protected _value: Array<string> | undefined

  /**
   * List of selected values. If they're set from outside the component, the select element
   * finds all the options that match the given values and selects them.
   */
  @property({ type: Array, attribute: false })
  set value(value: Array<string>) {
    /**
     * @todo Check if all of the value items are actually present in the options
     */
    this._value = value
  }

  get value(): Array<string> {
    return this._value ?? this.defaultValue
  }

  /**
   * Show a clearable button to reset the value
   */
  @property({ type: Boolean, reflect: true })
  clearable: boolean = false

  /**
   * Show an input field to filter the options inside the popup
   */
  @property({ type: Boolean, reflect: true })
  filterable: boolean = false

  /**
   * Allow multiple selections
   */
  @property({ type: Boolean, reflect: true })
  multiple: boolean = false

  /** Marks the input element as required */
  @property({ type: Boolean, reflect: true })
  required: boolean = false

  /**
   * The expanded state of the popup
   */
  @state()
  protected open: boolean = false

  @state()
  protected _optionFilter: string = ""

  @state()
  protected _hasFilterResults: boolean = true

  @state()
  protected _displayValue: string = ""

  static getOptionLabel(option) {
    if (typeof option === "object" && option !== null) {
      return option.label
    }
    return option
  }

  /** @internal */
  protected _deferedChangeEvent = false

  /** @internal */
  protected _optionFilterRef = createRef<LeuInput>()

  /** @internal */
  protected _toggleButtonRef = createRef<HTMLButtonElement>()

  /** @internal */
  protected _menuRef = createRef<LeuMenu>()

  /**
   * @internal
   */
  hasSlotController = new HasSlotController(this, ["before", "after"])

  protected setFormValue(): void {
    const isEmpty = this.value.length === 0 || !this.value.some((v) => v !== "") // At least one value is not an empty string

    if (isEmpty || this.disabled) {
      this.internals.setFormValue(null)
    } else if (this.multiple) {
      const formData = new FormData()
      this.value.forEach((v) => formData.append(this.name ?? "", v))
      this.internals.setFormValue(formData)
    } else {
      this.internals.setFormValue(this.value[0])
    }

    if (this.required && isEmpty) {
      this.internals.setValidity(
        { valueMissing: true },
        "Bitte wählen Sie eine Option aus.",
      )
    } else {
      this.internals.setValidity({})
    }
  }

  public formResetCallback() {
    super.formResetCallback()
    this.value = this.defaultValue
    this._displayValue = ""
  }

  protected willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties)

    if (
      changedProperties.has("defaultValue") &&
      !changedProperties.has("value") &&
      !this.hasInteracted
    ) {
      this.value = this.defaultValue
    }

    if (
      changedProperties.has("value") ||
      changedProperties.has("defaultValue") ||
      changedProperties.has("name") ||
      changedProperties.has("disabled") ||
      changedProperties.has("required")
    ) {
      this.setFormValue()
    }
  }

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener("click", this._handleDocumentClick)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    document.removeEventListener("click", this._handleDocumentClick)
  }

  updated(changedProperties: PropertyValues<this>) {
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
      changedProperties.has("_optionFilter") ||
      changedProperties.has("multiple")
    ) {
      this._updateMenuItems({
        value: changedProperties.has("value"),
        optionFilter: changedProperties.has("_optionFilter"),
        multiple: changedProperties.has("multiple"),
      })
    }
  }

  public click() {
    this._toggleButtonRef.value?.click()
  }

  /**
   * Apply the current state to the menu items.
   * - Set the active property when the value property has changed.
   * - Hide menu items that do not match the filter.
   */
  async _updateMenuItems(changed) {
    const menu = this._menuRef.value

    await menu.updateComplete

    const menuItems = menu.getMenuItems()
    let hasFilterResults = false

    if (changed.value && this.value.length === 0) {
      this._displayValue = ""
    }

    menuItems.forEach((menuItem) => {
      if (changed.multiple) {
        menuItem.multipleSelection = this.multiple
      }

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

    if (changed.optionFilter) {
      this._hasFilterResults = hasFilterResults
      menu.setCurrentItem(0)
    }
  }

  /**
   * Update all the menu items when the slot changes
   * to make sure that the menu items are in sync
   * with the state of the component.
   * @internal
   */
  _handleItemSlotChange() {
    this._updateMenuItems({
      value: true,
      optionFilter: true,
      multiple: true,
    })
  }

  /**
   * Handles clicks outside of the component to close the dropdown.
   * @internal
   */
  _handleDocumentClick = (event: MouseEvent) => {
    if (!event.composedPath().includes(this) && this.open) {
      this._closeDropdown()
    }
  }

  /**
   * @internal
   */
  _handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      this._closeDropdown()
    }
  }

  /**
   * @internal
   */
  async _handleToggleKeyDown(event: KeyboardEvent) {
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
   */
  _handleFilterInputKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowDown") {
      this._menuRef.value.focusItem(0)
    } else if (event.key === "ArrowUp") {
      this._menuRef.value.focusItem(-1)
    }
  }

  /**
   * Determines the value or label that should be displayed inside the toggle button.
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

  _clearValue(event: MouseEvent) {
    if (!this.disabled) {
      event.stopPropagation()
      this.hasInteracted = true
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

  _handleFilterInput(event: InputEvent) {
    this._optionFilter = (event.target as HTMLInputElement).value
  }

  /**
   * Checks if the given value is selected.
   */
  _isSelected(menuItemValue: string) {
    return this.value.includes(menuItemValue)
  }

  _handleMenuItemClick(event: MouseEvent) {
    if (!(event.target instanceof LeuMenuItem) || event.target.disabled) {
      return
    }

    const menuItem = event.target

    const value = menuItem.getValue()
    const isSelected = this._isSelected(value)

    this.hasInteracted = true

    if (this.multiple) {
      this.value = isSelected
        ? this.value.filter((v) => v !== value)
        : this.value.concat(value)

      this._deferedChangeEvent = true
    } else if (this.clearable || !isSelected) {
      // Only clear if clearable is true or if the value is not selected.
      this.value = isSelected ? [] : [value]
      this._displayValue = isSelected ? "" : menuItem.textContent
    }

    this._emitInputEvent()

    if (!this.multiple) {
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
        <div id="select-popup" class="select-menu-container">
          <slot name="before" class="before"></slot>
          ${this._renderFilterInput()}
          <leu-menu
            ref=${ref(this._menuRef)}
            role="listbox"
            aria-multiselectable=${ifDefined(
              this.multiple ? "true" : undefined,
            )}
            class="menu"
            @click=${this._handleMenuItemClick}
            aria-labelledby="select-label"
          >
            <slot @slotchange=${this._handleItemSlotChange}> </slot>
          </leu-menu>
          ${this._hasFilterResults || this._optionFilter === ""
            ? nothing
            : html` <p class="filter-message-empty" aria-live="polite">
                Keine Resultate
              </p>`}
          ${this._renderApplyButton()}
          <slot name="after" class="after"></slot>
        </div>
      </leu-popup>
    </div>`
  }
}
