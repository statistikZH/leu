import { html, css, LitElement, nothing } from "lit"
import { unsafeHTML } from "lit/directives/unsafe-html.js"

import { map } from "lit/directives/map.js"

import { Icon } from "../icon/icon.js"
import { defineElement } from "../../lib/defineElement.js"

/**
 * @tagname leu-select
 */
export class LeuSelect extends LitElement {
  static styles = css`
    :host,
    :host * {
      box-sizing: border-box;
    }

    :host {
      --select-color: var(--leu-color-black-100);
      --select-color-disabled: var(--leu-color-black-20);
      --select-color-invalid: var(--leu-color-func-red);
      --select-color-focus: var(--leu-color-func-cyan);
      --select-border-width: 2px;

      --select-label-color: var(--leu-color-black-100);
      --select-label-color-disabled: var(--select-color-disabled);
      --select-label-color-empty: var(--leu-color-black-60);

      --select-option-color: var(--leu-color-black-60);
      --select-option-color-focus: var(--select-color);

      --select-border-color: var(--leu-color-black-40);
      --select-border-color-focus: var(--select-color-focus);
      --select-border-color-disabled: var(--leu-color-black-20);
      --select-border-color-invalid: var(--select-color-invalid);

      --select-error-color: var(--leu-color-black-0);

      --select-clear-color: var(--leu-color-black-60);

      --select-font-regular: var(--leu-font-regular);
      --select-font-black: var(--leu-font-black);

      --select-apply-button-color: var(--leu-color-black-100);
      --select-apply-button-color-focus: var(--leu-color-black-80);
      --select-apply-button-font-color: var(--leu-color-black-0);

      position: relative;
      display: block;

      font-family: var(--select-font-regular);
    }

    .select[disabled] {
      --select-color: var(--select-color-disabled);
      --select-color-focus: var(--select-color-disabled);
      --select-border-color: var(--select-border-color-disabled);
      --select-label-color: var(--select-label-color-disabled);
      --select-border-color-focus: var(--select-border-color-disabled);
      --select-clear-color: var(--select-color-disabled);
    }

    .select-toggle {
      min-height: 4.5rem;
      display: block;
      width: 100%;

      appearance: none;
      border: var(--select-border-width) solid var(--select-border-color);
      border-radius: 2px;
      font-size: 1rem;
      line-height: 1.5;
      padding: 1.375rem 3rem 1.375rem 1rem;

      background: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      cursor: pointer;
      text-align: left;
    }

    .select[disabled] .select-toggle,
    .select[disabled] .clear-button {
      cursor: unset;
    }

    .select-toggle:hover,
    .select-toggle:focus {
      border-color: var(--select-border-color-focus);
    }

    .select-toggle.full.labeled {
      padding-bottom: 0.75rem;
      padding-top: 2rem;
      color: var(--select-color);
    }

    .select-toggle:focus-visible {
      outline: var(--select-border-width) solid var(--select-border-color-focus);
      outline-offset: 2px;
    }

    .label {
      position: absolute;
      top: 1.5rem;
      transition: top 0.1s ease;
      font-family: var(--select-font-regular);
    }

    .select[disabled] .label {
      color: var(--select-label-color);
    }

    .select:not([disabled]) .select-toggle:focus .label,
    .select:not([disabled]) .select-toggle:active:not([disabled]) .label,
    .select-toggle.open .label,
    .select-toggle.full .label {
      color: var(--select-label-color);
      font-family: var(--select-font-black);
      font-size: 0.75rem;

      top: 0.875rem;

      transition: top 0.1s ease;
    }

    .clear-button,
    .clear-filter-button {
      --_length: 1.5rem;

      width: var(--_length);
      height: var(--_length);
      padding: 0;

      position: absolute;
      top: calc(50% - var(--_length) / 2);
      right: 2.6rem;

      cursor: pointer;

      background: none;
      color: var(--select-clear-color);
      border: none;
      /* border-radius is only defined for a nice focus outline */
      border-radius: 2px;
    }

    .clear-button {
      right: 2.6rem;
    }

    .clear-filter-button {
      right: 0.75rem;
    }

    .clear-button:focus-visible,
    .clear-filter-button:focus-visible {
      outline: var(--select-border-width) solid var(--select-border-color-focus);
      outline-offset: 2px;
    }

    .arrow-icon {
      --_length: 1.5rem;

      width: var(--_length);
      height: var(--_length);
      padding: 0;

      position: absolute;
      top: calc(50% - var(--_length) / 2);
      right: 1rem;

      transform: rotate(0deg);
      transition: transform 0.25s ease;

      color: var(--select-color);
    }

    .select-toggle.open .arrow-icon {
      transform: rotate(180deg);
    }

    .select-menu-container {
      border-radius: 1px;
      position: absolute;
      left: 0;
      width: 100%;
      background-color: white;
      border: 0 solid black;
      padding: 0;
      margin: 0;
      top: calc(100% + 2px);
      z-index: 10;
      box-shadow: 0 0 16px rgba(0, 0, 0, 0.16), 0 0 2px rgba(0, 0, 0, 0.32);
      overflow: auto;
    }

    .select-menu {
      padding: 0;
      margin: 0;
      overflow: auto;
      scrollbar-color: var(--leu-color-black-40) var(--leu-color-black-10);
      scrollbar-width: thin;
      max-height: 24rem;
    }

    .select-menu.multiple {
      max-height: 21rem;
    }

    .select-menu::-webkit-scrollbar {
      width: 10px;
      border-radius: 10px;
      background-color: var(--leu-color-black-10);
    }

    .select-menu::-webkit-scrollbar-track {
      //-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      border-radius: 10px;
      background-color: var(--leu-color-black-10);
    }

    .select-menu::-webkit-scrollbar-thumb {
      border-radius: 10px;
      //-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: var(--leu-color-black-40);
    }

    .select-menu .select-menu-option {
      appearance: none;
      display: block;
      width: 100%;
      text-align: left;
      border: 0;
      background: none;

      color: var(--select-option-color);
      font-family: var(--select-font-regular);
      font-size: 1rem;
      height: 3rem;
      line-height: 3rem;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .select-menu .select-menu-option:focus-visible {
      border-radius: 5px;
      outline: var(--select-border-width) solid var(--select-border-color-focus);
      outline-offset: -5px;
    }

    .select-menu .select-menu-option:hover {
      background: var(--leu-color-black-transp-5);
      color: var(--select-option-color-focus);
    }

    .select-menu .select-menu-option.selected {
      border-radius: 1px;
      background: var(--select-color-focus);
      color: var(--select-option-color-focus);
    }

    .select-menu .select-menu-option.selected:focus-visible {
      border-radius: 5px;
      background: var(--select-color-focus);
      color: var(--select-option-color-focus);
      outline: var(--select-border-width) solid white;
      outline-offset: -5px;
    }

    .select-menu-option.multiple svg {
      align: center;
      color: transparent;
      vertical-align: middle;
    }

    .select-menu-option.multiple.selected svg {
      color: var(--select-option-color-focus);
    }

    .before,
    .after,
    .apply-container {
      margin: 0.75rem;
    }

    .apply-button {
      appearance: none;
      display: block;
      width: 100%;
      text-align: center;
      border: 0;
      border-radius: 1px;
      background: var(--select-apply-button-color);
      color: var(--select-apply-button-font-color);
      font-family: var(--select-font-black);
      font-size: 1rem;
      height: 48px;
      cursor: pointer;
    }

    .apply-button:hover {
      background: var(--select-apply-button-color-focus);
    }

    .apply-button:focus-visible {
      outline: var(--select-border-width) solid var(--select-border-color-focus);
      outline-offset: 2px;
    }

    .select-search-wrapper {
      position: relative;
      display: flex;
      gap: 0.5rem;
      //padding-inline: 0.75rem;
      border: var(--select-border-width) solid var(--select-border-color);
      border-radius: 2px;
      line-height: 1;
      margin: 0.75rem;
    }

    .select-search {
      appearance: none;
      display: block;
      width: 100%;
      font-size: 1rem;
      line-height: 1;
      color: var(--input-color);
      border: 0;
      min-width: 0;
      outline: 0 !important;
      padding: 0.75rem;
      font-family: var(--select-font-regular);
    }
  `

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
      before: { type: String },
      after: { type: String },
    }
  }

  constructor() {
    super()
    this.open = false

    this._arrowIcon = Icon("angleDropDown")
    this._clearIcon = Icon("clear")
    this._checkIcon = Icon("check")
    this.filtervalue = ""
    this.clearable = false
    this.before = ""
    this.after = ""
  }

  connectedCallback() {
    super.connectedCallback()
    this.handleEvents()
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

  handleEvents() {
    this.removeEventListeners()
    this.addEventListeners()
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
    /* eslint-disable lit-a11y/tabindex-no-positive */
    return html`<div
      class="select"
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
        ${this.before !== ""
          ? html`<div tabindex="-1" class="before">
              ${unsafeHTML(this.before)}
            </div>`
          : ``}
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
        ${this.after !== ""
          ? html`<div tabindex="-1" class="after">
              ${unsafeHTML(this.after)}
            </div>`
          : ``}
      </div>
    </div> `
    /* eslint-enable lit-a11y/tabindex-no-positive */
  }
}

export function defineSelectElements() {
  defineElement("select", LeuSelect)
}
