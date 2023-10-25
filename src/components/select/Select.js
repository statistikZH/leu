import { html, LitElement, nothing } from "lit"
import { classMap } from "lit/directives/class-map.js"

import { map } from "lit/directives/map.js"

import { Icon } from "../icon/icon.js"
import { defineElement } from "../../lib/defineElement.js"
import { HasSlotController } from "../../lib/hasSlotController.js"

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
      value: { type: String },
      tempvalue: { type: Array },
      filtervalue: { type: String, reflect: true },
      clearable: { type: Boolean, reflect: true },
      disabled: { type: Boolean, reflect: true },
      filterable: { type: Boolean, reflect: true },
      multiple: { type: Boolean, reflect: true },
    }
  }

  /**
   * @internal
   */
  hasSlotController = new HasSlotController(this, ["before", "after"])

  constructor() {
    super()
    this.open = false

    this._arrowIcon = Icon("angleDropDown")
    this._clearIcon = Icon("clear")
    this._checkIcon = Icon("check")
    this.filtervalue = ""
    this.clearable = false
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListeners()

    // convert value from string to an array if the multiple is true
    if (this.multiple) {
      // if value is not provided when calling the class
      if (this.value === "") {
        this.value = []
        this.tempvalue = []
      } else {
        this.value = JSON.parse(this.value)
        this.tempvalue = this.value.map((x) => x)
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListeners()
  }

  addEventListeners() {
    this.addEventListener("blur", this.closeDropdown)
    this.addEventListener("keydown", this.handleKeyDown)
  }

  removeEventListeners() {
    this.removeEventListener("blur", this.closeDropdown)
    this.removeEventListener("keydown", this.handleKeyDown)
  }

  handleKeyDown = (e) => {
    const { activeElement } = document.activeElement.shadowRoot

    // the active element is the button
    if (
      activeElement.classList.contains("select-toggle") &&
      !this.disabled &&
      !this.multiple
    ) {
      switch (e.key) {
        case "Escape":
          this.open = false
          break
        case "ArrowUp":
        case "ArrowLeft":
          this.selectNextOption(this.value, -1)
          break
        case "ArrowDown":
        case "ArrowRight":
          this.selectNextOption(this.value, 1)
          break
        case "Home":
          this.value = this.options.find((option) => !option.disabled)
          break
        case "End":
          this.value = this.options.findLast((option) => !option.disabled)
          break
        default:
      }
    }
    if (
      activeElement.classList.contains("select-search") ||
      (activeElement.classList.contains("select-menu-option") &&
        !this.disabled &&
        this.multiple)
    ) {
      const availableOptions = this.shadowRoot.querySelectorAll(
        ".select-menu-option"
      )
      const currentOptionIndex = Array.from(availableOptions).findIndex(
        (o) => o.optionvalue === activeElement.optionvalue
      )
      switch (e.key) {
        case "Escape":
          this.open = false
          break
        case "ArrowUp":
        case "ArrowLeft":
          if (currentOptionIndex > 0) {
            availableOptions[currentOptionIndex - 1].focus()
          }
          break
        case "ArrowDown":
        case "ArrowRight":
          if (currentOptionIndex < availableOptions.length - 1) {
            availableOptions[currentOptionIndex + 1].focus()
          }
          break
        case "Home":
          availableOptions[0].focus()
          break
        case "End":
          availableOptions[availableOptions.length - 1].focus()
          break
        default:
      }
    }
  }

  getDisplayValue(value, showLength) {
    if (this.multiple && showLength) {
      if (value.length === 0) {
        return ``
      }
      return `${value.length} gewählt`
    }
    if (typeof value === "object" && value !== null) {
      return value.label
    }
    return value
  }

  emitEvents() {
    // Dispatch a input event
    const inputevent = new CustomEvent("input", {})
    this.dispatchEvent(inputevent)

    // Dispatch a change event
    const changeevent = new CustomEvent("change", {})
    this.dispatchEvent(changeevent)
  }

  clearValue(event) {
    if (!this.disabled) {
      event.stopPropagation()
      this.value = []
    }

    this.emitEvents()
  }

  clearFilterValue() {
    // refocus before removing the button, otherwise closeDropdown is triggered
    document.activeElement.shadowRoot.getElementById("select-search").focus()
    this.filtervalue = ""
  }

  toggleDropdown() {
    if (!this.disabled) {
      this.open = !this.open
      if (this.multiple) {
        this.tempvalue = this.value.map((x) => x)
      }
    }
  }

  closeDropdown = (e) => {
    if (e.relatedTarget == null) {
      this.open = false
      if (this.multiple) {
        this.tempvalue = this.value.map((x) => x)
      }
    }
  }

  selectOption(option) {
    this.open = false
    this.value = option.target.optionvalue

    this.emitEvents()
  }

  tempSelectOption(option) {
    // if(this.tempvalue === null) {this.tempvalue = []}
    if (this.tempvalue.includes(option.target.optionvalue)) {
      this.tempvalue.splice(
        this.tempvalue.indexOf(option.target.optionvalue),
        1
      )
    } else {
      this.tempvalue.push(option.target.optionvalue)
    }
    this.requestUpdate()
  }

  selectOptionMultiple() {
    this.open = false
    this.value = this.tempvalue.map((x) => x)
    this.emitEvents()
  }

  selectNextOption(currentOption, direction) {
    if (currentOption === "") {
      const [firstoption] = this.options
      this.value = firstoption
    } else {
      const optionindex = this.options.indexOf(currentOption)
      if (this.options[optionindex + direction] !== undefined) {
        this.value = this.options[optionindex + direction]
      }
    }

    this.emitEvents()
  }

  getTabindex() {
    if (this.disabled) {
      return `-1`
    }
    return `0`
  }

  handleFilterInput(event) {
    this.filtervalue = event.target.value
  }

  isSelected(option) {
    if (this.multiple && this.tempvalue.length !== 0) {
      if (this.tempvalue.includes(option)) {
        return true
      }
    }
    if (this.value === option) {
      return true
    }
    return false
  }

  render() {
    const selectClasses = {
      select: true,
      "select--has-before": this.hasSlotController.test("before"),
      "select--has-after": this.hasSlotController.test("after"),
    }

    return html`<div
      class=${classMap(selectClasses)}
      .value=${this.value}
      ?disabled=${this.disabled}
      aria-readonly="${this.disabled}"
      aria-labelledby="select-label"
    >
      <button
        type="button"
        class="select-toggle
        ${this.open ? `open` : ``}
        ${this.value.length === 0 || this.value == null ? `empty` : `full`}
        ${this.label === "" ? `unlabeled` : `labeled`}"
        @click=${this.toggleDropdown}
        tabindex=${this.getTabindex()}
        aria-controls="select-menu"
        aria-haspopup="listbox"
      >
        <span class="label" id="select-label"
          ><slot name="label">${this.label}</slot></span
        >
        <span class="value">
          <slot name="value">${this.getDisplayValue(this.value, true)}</slot>
        </span>
        <span class="arrow-icon"> ${this._arrowIcon} </span>
        ${this.clearable && this.value !== "" && this.value.length !== 0
          ? html`<button
              type="button"
              class="clear-button"
              @click=${this.clearValue}
              aria-label="Eingabefeld zurücksetzen"
              ?disabled=${this.disabled}
            >
              ${this._clearIcon}
            </button>`
          : nothing}
      </button>
      <div
        class="select-menu-container"
        ?hidden=${!this.open}
        tabindex="-1"
        aria-hidden=${!this.open}
      >
        <slot name="before" class="before"></slot>
        ${this.filterable
          ? html`<div class="select-search-wrapper" tabindex="-1">
          <input id="select-search" type="text" class="select-search" placeholder="Nach Stichwort filtern"
          @input=${this.handleFilterInput}
          .value=${this.filtervalue}></input>
          ${
            this.filtervalue !== ""
              ? html`<button
                  type="button"
                  class="clear-filter-button"
                  @click=${this.clearFilterValue}
                  aria-label="Filterfeld zurücksetzen"
                  tabindex="0"
                >
                  ${this._clearIcon}
                </button>`
              : nothing
          }
        </div>`
          : ``}
        <div
          id="select-menu"
          role="listbox"
          class="select-menu ${this.multiple ? `multiple` : ``}"
          aria-multiselectable="${this.multiple}"
          aria-labelledby="select-label"
        >
          ${map(
            this.options.filter((d) => {
              if (typeof d === "object") {
                return d.label
                  .toLowerCase()
                  .includes(this.filtervalue.toLowerCase())
              }
              return d.toLowerCase().includes(this.filtervalue.toLowerCase())
            }),
            (option) =>
              html`<button
                type="button"
                class="select-menu-option
                ${this.isSelected(option) ? `selected` : ``}
                ${this.multiple ? `multiple` : ``}"
                .optionvalue=${option}
                @click=${this.multiple
                  ? this.tempSelectOption
                  : this.selectOption}
                tabindex=${this.multiple ? `0` : `-1`}
                role="option"
                aria-selected=${this.isSelected(option)}
                aria-checked=${this.isSelected(option)}
              >
                ${this.multiple ? this._checkIcon : ``}
                ${this.getDisplayValue(option)}
              </button>`
          )}
        </div>
        ${this.multiple
          ? html`<div class="apply-container">
              <button
                type="button"
                class="apply-button"
                @click=${this.selectOptionMultiple}
              >
                Anwenden
              </button>
            </div>`
          : ``}
        <slot name="after" class="after"></slot>
      </div>
    </div> `
  }
}

export function defineSelectElements() {
  defineElement("select", LeuSelect)
}
