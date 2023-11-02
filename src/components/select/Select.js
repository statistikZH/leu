import { html, LitElement, nothing } from "lit"
import { classMap } from "lit/directives/class-map.js"

import { map } from "lit/directives/map.js"
import { ifDefined } from "lit/directives/if-defined.js"

import { Icon } from "../icon/icon.js"
import { defineElement } from "../../lib/defineElement.js"
import { HasSlotController } from "../../lib/hasSlotController.js"
import { defineButtonElements } from "../button/Button.js"
import { defineMenuElements } from "../menu/Menu.js"
import { defineMenuItemElements } from "../menu/MenuItem.js"

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
      filtervalue: { type: String, reflect: true },
      clearable: { type: Boolean, reflect: true },
      disabled: { type: Boolean, reflect: true },
      filterable: { type: Boolean, reflect: true },
      multiple: { type: Boolean, reflect: true },
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

    this._arrowIcon = Icon("angleDropDown")
    this._clearIcon = Icon("clear")
    this.filtervalue = ""
    this.clearable = false
    this.value = []
    this.deferedChangeEvent = false
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListeners()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListeners()
  }

  addEventListeners() {
    this.addEventListener("blur", this.handleBlur)
    this.addEventListener("keydown", this.handleKeyDown)
  }

  removeEventListeners() {
    this.removeEventListener("blur", this.handleBlur)
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
          this.close()
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
          this.value = [this.options.find((option) => !option.disabled)]
          break
        case "End":
          this.value = [this.options.findLast((option) => !option.disabled)]
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
        (o) => o.value === activeElement.value
      )
      switch (e.key) {
        case "Escape":
          this.close()
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

  getDisplayValue(value) {
    if (this.multiple) {
      return value.length === 0 ? `` : `${value.length} gewählt`
    }

    return LeuSelect.getOptionLabel(value[0])
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

  clearFilterValue() {
    // refocus before removing the button, otherwise closeDropdown is triggered
    document.activeElement.shadowRoot.getElementById("select-search").focus()
    this.filtervalue = ""
  }

  toggleDropdown() {
    if (!this.disabled) {
      this.open = !this.open
    }
  }

  closeDropdown() {
    this.open = false

    if (this.deferedChangeEvent) {
      this.emitChangeEvent()
      this.deferedChangeEvent = false
    }
  }

  handleBlur = (e) => {
    if (e.relatedTarget == null) {
      this.close()
    }
  }

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
      this.close()
    }
  }

  handleApplyClick() {
    this.close()
  }

  selectNextOption(currentOption, direction) {
    if (currentOption === "") {
      const [firstoption] = this.options
      this.value = [firstoption]
    } else {
      const optionindex = this.options.indexOf(currentOption)
      if (this.options[optionindex + direction] !== undefined) {
        this.value = [this.options[optionindex + direction]]
      }
    }

    this.emitUpdateEvents()
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
    return this.value.includes(option)
  }

  renderMenu() {
    return html`
      <leu-menu
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
          (option) => {
            const isSelected = this.isSelected(option)
            let beforeIcon

            if (this.multiple && isSelected) {
              beforeIcon = "check"
            } else if (this.multiple) {
              beforeIcon = "EMPTY"
            }

            return html`<leu-menu-item
              type="button"
              class="select-menu-option
                ${this.isSelected(option) ? `selected` : ``}
                ${this.multiple ? `multiple` : ``}"
              .value=${option}
              before=${ifDefined(beforeIcon)}
              @click=${() => this.selectOption(option)}
              tabindex=${this.multiple ? `0` : `-1`}
              role="option"
              ?active=${isSelected}
              aria-selected=${isSelected}
              aria-checked=${isSelected}
            >
              ${LeuSelect.getOptionLabel(option)}
            </leu-menu-item>`
          }
        )}
      </leu-menu>
    `
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
        <span class="label" id="select-label">${this.label}</span>
        <span class="value"> ${this.getDisplayValue(this.value)} </span>
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
              <input
                id="select-search"
                type="text"
                class="select-search"
                placeholder="Nach Stichwort filtern"
                @input=${this.handleFilterInput}
                .value=${this.filtervalue}
              />
              ${this.filtervalue !== ""
                ? html`<button
                    type="button"
                    class="clear-filter-button"
                    @click=${this.clearFilterValue}
                    aria-label="Filterfeld zurücksetzen"
                    tabindex="0"
                  >
                    ${this._clearIcon}
                  </button>`
                : nothing}
            </div>`
          : ``}
        ${this.renderMenu()}
        ${this.multiple
          ? html`<div class="apply-container">
              <leu-button
                type="button"
                class="apply-button"
                @click=${this.handleApplyClick}
                label="Anwenden"
                fluid
              ></leu-button>
            </div>`
          : ``}
        <slot name="after" class="after"></slot>
      </div>
    </div> `
  }
}

export function defineSelectElements() {
  defineButtonElements()
  defineMenuElements()
  defineMenuItemElements()
  defineElement("select", LeuSelect)
}
