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

const SELECT_ACTIONS = {
  Close: "Close",
  CloseSelect: "CloseSelect",
  First: "First",
  Last: "Last",
  Next: "Next",
  Open: "Open",
  Previous: "Previous",
  Select: "Select",
  Type: "Type",
}

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
      activeOptionId: { type: String, state: true },
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
    this.optionIds = new Map()

    /** @internal */
    this._arrowIcon = Icon("angleDropDown")

    /** @internal */
    this._clearIcon = Icon("clear")

    /** @internal */
    this.optionFilter = ""

    /** @internal */
    this.activeOptionId = ""

    /** @internal */
    this.deferedChangeEvent = false
  }

  updated(changedProperties) {
    if (changedProperties.has("options")) {
      this.optionIds = new Map()
      this.activeOptionId = ""
    }
  }

  getOptionId(option) {
    if (!this.optionIds.has(option)) {
      this.optionIds.set(option, crypto.randomUUID().slice(0, 8))
    }
    return this.optionIds.get(option)
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
  }

  removeEventListeners() {
    this.removeEventListener("blur", this.handleBlur)
  }

  getActionFromKey(event) {
    const { key, altKey, ctrlKey, metaKey } = event
    const openKeys = ["ArrowDown", "ArrowUp", "Enter", " "] // all keys that will do the default open action
    // handle opening when closed
    if (!this.open && openKeys.includes(key)) {
      return SELECT_ACTIONS.Open
    }

    // home and end move the selected option when open or closed
    if (key === "Home") {
      return SELECT_ACTIONS.First
    }
    if (key === "End") {
      return SELECT_ACTIONS.Last
    }

    // handle typing characters when open or closed
    if (
      key === "Backspace" ||
      key === "Clear" ||
      (key.length === 1 && key !== " " && !altKey && !ctrlKey && !metaKey)
    ) {
      return SELECT_ACTIONS.Type
    }

    // handle keys when open
    if (this.open) {
      if (key === "ArrowUp" && altKey) {
        return SELECT_ACTIONS.CloseSelect
      }

      if (key === "ArrowDown" && !altKey) {
        return SELECT_ACTIONS.Next
      }

      if (key === "ArrowUp") {
        return SELECT_ACTIONS.Previous
      }

      if (key === "Escape") {
        return SELECT_ACTIONS.Close
      }

      if (key === "Enter" || key === " ") {
        return SELECT_ACTIONS.CloseSelect
      }
    }

    return undefined
  }

  /**
   * Handling is copied from APG:
   * https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
   * The only modification is that PageUp and PageDown is NOT handled.
   *
   * @internal
   * @param {KeyboardEvent} e
   */
  handleKeyDown = (event) => {
    const action = this.getActionFromKey(event, this.open)

    switch (action) {
      case SELECT_ACTIONS.Last:
      case SELECT_ACTIONS.First:
        this.openDropdown()
        this.activateOption(action)
        break
      case SELECT_ACTIONS.Next:
      case SELECT_ACTIONS.Previous:
        event.preventDefault()
        this.activateOption(action)
        break
      case SELECT_ACTIONS.CloseSelect:
        event.preventDefault()
        this.selectOption(
          this.options.find(
            (option) => this.getOptionId(option) === this.activeOptionId
          )
        )
        break
      case SELECT_ACTIONS.Close:
        event.preventDefault()
        this.closeDropdown()
        break
      case SELECT_ACTIONS.Type:
        // return this.onComboType(key)
        break
      case SELECT_ACTIONS.Open:
        event.preventDefault()
        this.openDropdown()
        this.activateOption(action)
        break
      default:
    }

    return undefined
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
    document.activeElement.shadowRoot.getElementById("select-search").focus()
    this.optionFilter = ""
  }

  toggleDropdown() {
    if (!this.disabled) {
      this.open = !this.open

      if (this.open) {
        const activeOption =
          this.value.length > 0 ? this.value[0] : this.getFilteredOptions()[0]
        this.setActiveOptionId(activeOption)
      }
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
   * @internal
   * @param {FocusEvent} e
   */
  handleBlur = (e) => {
    if (e.relatedTarget == null) {
      this.closeDropdown()
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
      this.closeDropdown()
    }
  }

  handleApplyClick() {
    this.closeDropdown()
  }

  activateOption(action) {
    const filteredOptions = this.getFilteredOptions()
    const maxIndex = filteredOptions.length - 1
    const currentIndex = filteredOptions.findIndex(
      (option) => this.getOptionId(option) === this.activeOptionId
    )

    let nextActiveIndex

    switch (action) {
      case SELECT_ACTIONS.Open:
        /*
         * Display the last item in the value list as active
         * Fall back to the first item in the list if the value list is empty.
         */
        nextActiveIndex =
          this.value.length > 0
            ? filteredOptions.findLastIndex((o) => this.value.includes(o))
            : 0
        break
      case SELECT_ACTIONS.First:
        nextActiveIndex = 0
        break
      case SELECT_ACTIONS.Last:
        nextActiveIndex = maxIndex
        break
      case SELECT_ACTIONS.Previous:
        nextActiveIndex = Math.max(0, currentIndex - 1)
        break
      case SELECT_ACTIONS.Next:
        nextActiveIndex = Math.min(maxIndex, currentIndex + 1)
        break
      default:
        nextActiveIndex = currentIndex
        break
    }

    this.activeOptionId = this.getOptionId(filteredOptions[nextActiveIndex])
  }

  setActiveOptionId(option) {
    this.activeOptionId = this.getOptionId(option)
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
        id="select-menu"
        role="listbox"
        class=${classMap(menuClasses)}
        aria-multiselectable="${this.multiple}"
        aria-labelledby="select-label"
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
            class="select-menu-option"
            .value=${option}
            before=${ifDefined(beforeIcon)}
            @click=${() => this.selectOption(option)}
            role="option"
            ?active=${isSelected}
            aria-selected=${isSelected}
            id=${this.getOptionId(option)}
            ?highlighted=${this.getOptionId(option) === this.activeOptionId}
            tabindex="-1"
          >
            ${LeuSelect.getOptionLabel(option)}
          </leu-menu-item>`
        })}
      </leu-menu>
    `
  }

  render() {
    const selectClasses = {
      select: true,
      "select--has-before": this.hasSlotController.test("before"),
      "select--has-after": this.hasSlotController.test("after"),
    }

    const toggleClasses = {
      "select-toggle": true,
      open: this.open,
      empty: this.value.length === 0 || this.value === null,
      full: this.value.length !== 0 && this.value !== null,
      labeled: this.label !== "",
      unlabeled: this.label === "",
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
        class=${classMap(toggleClasses)}
        @click=${this.toggleDropdown}
        @keydown=${this.handleKeyDown}
        aria-controls="select-menu"
        aria-haspopup="listbox"
        aria-expanded="${this.open}"
        aria-activedescendant=${this.activeOptionId}
        role="combobox"
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
        aria-hidden=${!this.open}
      >
        <slot name="before" class="before"></slot>
        ${this.filterable
          ? html`<div class="select-search-wrapper">
              <input
                id="select-search"
                type="text"
                class="select-search"
                placeholder="Nach Stichwort filtern"
                @input=${this.handleFilterInput}
                .value=${this.optionFilter}
              />
              ${this.optionFilter !== ""
                ? html`<button
                    type="button"
                    class="clear-filter-button"
                    @click=${this.clearOptionFilter}
                    aria-label="Filterfeld zurücksetzen"
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
