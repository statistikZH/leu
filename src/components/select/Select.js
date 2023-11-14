import { html, LitElement, nothing } from "lit"
import { classMap } from "lit/directives/class-map.js"

import { map } from "lit/directives/map.js"
import { ifDefined } from "lit/directives/if-defined.js"
import { createRef, ref } from "lit/directives/ref.js"

import { Icon } from "../icon/icon.js"
import { defineElement } from "../../lib/defineElement.js"
import { HasSlotController } from "../../lib/hasSlotController.js"
import { defineButtonElements } from "../button/Button.js"
import { defineMenuElements } from "../menu/Menu.js"
import { defineMenuItemElements } from "../menu/MenuItem.js"
import { defineInputElements } from "../input/Input.js"

import styles from "./select.css"

/**
 * @tagname leu-select
 * @slot before - Optional content the appears before the option list
 * @slot after - Optional content the appears after the option list
 */
export class LeuSelect extends LitElement {
  static styles = styles

  static get properties() {
    return {
      open: { type: Boolean, attribute: "open" },

      label: { type: String },
      options: { type: Array },
      value: { type: Array },
      clearable: { type: Boolean, reflect: true },
      disabled: { type: Boolean, reflect: true },
      filterable: { type: Boolean, reflect: true },
      multiple: { type: Boolean, reflect: true },
      optionFilter: { type: String, state: true },
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
    this.clearable = false
    this.value = []
    this.options = []

    /** @internal */
    this._arrowIcon = Icon("angleDropDown")

    /** @internal */
    this._clearIcon = Icon("clear")

    /** @internal */
    this.optionFilter = ""

    /** @internal */
    this.deferedChangeEvent = false

    this.menuRef = createRef()
    this.optionFilterRef = createRef()
    this.toggleButtonRef = createRef()
  }

  updated(changedProperties) {
    if (changedProperties.has("open") && this.open) {
      if (this.multiple) {
        this.optionFilterRef.value.focus()
      } else {
        this.menuRef.value.focus()
      }
    } else if (changedProperties.has("open") && !this.open) {
      this.toggleButtonRef.value.focus()
    }
  }

  /**
   * @internal
   * @param {KeyboardEvent} e
   */
  handleKeyDown = (event) => {
    if (event.key === "Escape") {
      this.closeDropdown()
    }
  }

  getDisplayValue(value) {
    if (this.multiple) {
      return value.length === 0 ? `` : `${value.length} gewählt`
    }

    return LeuSelect.getOptionLabel(value[0])
  }

  getFilteredOptions() {
    return this.filterable && this.optionFilter.length > 0
      ? this.options.filter((option) => {
          const label = LeuSelect.getOptionLabel(option)
          return label.toLowerCase().includes(this.optionFilter.toLowerCase())
        })
      : this.options
  }

  emitUpdateEvents() {
    this.emitInputEvent()
    this.emitChangeEvent()
  }

  emitInputEvent() {
    const inputevent = new CustomEvent("input", {
      composed: true,
      bubbles: true,
    })
    this.dispatchEvent(inputevent)
  }

  emitChangeEvent() {
    const changeevent = new CustomEvent("change", {
      composed: true,
      bubbles: true,
    })
    this.dispatchEvent(changeevent)
  }

  clearValue(event) {
    if (!this.disabled) {
      event.stopPropagation()
      this.value = []
    }

    this.emitUpdateEvents()
  }

  clearOptionFilter() {
    // refocus before removing the button, otherwise closeDropdown is triggered
    this.optionFilterRef.value.focus()
    this.optionFilter = ""
  }

  toggleDropdown() {
    if (!this.disabled) {
      this.open = !this.open
    }
  }

  openDropdown() {
    this.open = true
  }

  closeDropdown() {
    this.open = false

    if (this.deferedChangeEvent) {
      this.emitChangeEvent()
      this.deferedChangeEvent = false
    }
  }

  /**
   * Adds or replaces the given option in the options array.
   *
   * @param {*} option
   */
  selectOption(option) {
    const isSelected = this.isSelected(option)

    if (this.multiple) {
      this.value = isSelected
        ? this.value.filter((v) => v !== option)
        : this.value.concat(option)

      this.deferedChangeEvent = true
    } else {
      this.value = isSelected ? [] : [option]
    }

    this.emitInputEvent()

    if (!this.multiple) {
      this.closeDropdown()
    }
  }

  handleApplyClick() {
    this.closeDropdown()
  }

  handleFilterInput(event) {
    this.optionFilter = event.target.value
  }

  isSelected(option) {
    return this.value.includes(option)
  }

  renderMenu() {
    const menuClasses = {
      "select-menu": true,
      multiple: this.multiple,
    }

    return html`
      <leu-menu
        role="listbox"
        class=${classMap(menuClasses)}
        aria-multiselectable="${this.multiple}"
        aria-labelledby="select-label"
        ref=${ref(this.menuRef)}
      >
        ${map(this.getFilteredOptions(), (option) => {
          const isSelected = this.isSelected(option)
          let beforeIcon

          if (this.multiple && isSelected) {
            beforeIcon = "check"
          } else if (this.multiple) {
            beforeIcon = "EMPTY"
          }

          return html`<leu-menu-item
            before=${ifDefined(beforeIcon)}
            @click=${() => this.selectOption(option)}
            role="option"
            ?active=${isSelected}
            aria-selected=${isSelected}
          >
            ${LeuSelect.getOptionLabel(option)}
          </leu-menu-item>`
        })}
      </leu-menu>
    `
  }

  renderFilterInput() {
    if (this.filterable) {
      return html` <leu-input
        class="select-search"
        size="small"
        @input=${this.handleFilterInput}
        clearable
        >Nach Stichwort filtern</leu-input
      >`
    }

    return nothing
  }

  renderApplyButton() {
    if (this.multiple) {
      return html`
        <leu-button
          type="button"
          class="apply-button"
          @click=${this.handleApplyClick}
          label="Anwenden"
          fluid
        ></leu-button>
      `
    }

    return nothing
  }

  renderToggleButton() {
    const toggleClasses = {
      "select-toggle": true,
      open: this.open,
      filled: this.value.length !== 0 && this.value !== null,
      labeled: this.label !== "",
    }

    return html`<button
      type="button"
      class=${classMap(toggleClasses)}
      @click=${this.toggleDropdown}
      aria-controls="select-dialog"
      aria-haspopup="dialog"
      aria-expanded="${this.open}"
      role="combobox"
      ref=${ref(this.toggleButtonRef)}
    >
      <span class="label" id="select-label">${this.label}</span>
      <span class="value"> ${this.getDisplayValue(this.value)} </span>
      <span class="arrow-icon"> ${this._arrowIcon} </span>
      ${this.clearable && this.value !== "" && this.value.length !== 0
        ? html`<button
            type="button"
            class="clear-button"
            @click=${this.clearValue}
            aria-label=${`${this.label} zurücksetzen`}
            ?disabled=${this.disabled}
          >
            ${this._clearIcon}
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
      ?disabled=${this.disabled}
      aria-readonly="${this.disabled}"
      aria-labelledby="select-label"
      @keydown=${this.handleKeyDown}
    >
      ${this.renderToggleButton()}
      <dialog
        id="select-dialog"
        class="select-menu-container"
        ?open=${this.open}
      >
        <slot name="before" class="before"></slot>
        ${this.renderFilterInput()} ${this.renderMenu()}
        ${this.renderApplyButton()}
        <slot name="after" class="after"></slot>
      </dialog>
    </div> `
  }
}

export function defineSelectElements() {
  defineButtonElements()
  defineMenuElements()
  defineMenuItemElements()
  defineInputElements()
  defineElement("select", LeuSelect)
}
