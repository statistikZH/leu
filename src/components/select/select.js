import { html, css, LitElement, nothing } from "lit"

import { map } from "lit/directives/map.js"
import { Icon } from "../icon/icon.js"

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
      appearance: none;
      display: block;
      width: 100%;

      -webkit-appearance: none;
      border: 2px solid var(--select-border-color);
      border-radius: 2px;
      font-size: 1rem;
      line-height: 1.5;
      padding: 1.375rem 3rem 1.375rem 1rem;

      background: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      cursor: pointer;
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
      outline: 2px solid var(--select-border-color-focus);
      outline-offset: 2px;
    }

    .label {
      position: absolute;
      top: 1.5rem;
      transition: top 0.1s ease;
    }

    .select-toggle:focus .label,
    .select-toggle:active .label,
    .select-toggle.open .label,
    .select-toggle.full .label,
    .select[disabled] .label {
      color: var(--select-label-color);
      font-family: var(--select-font-black);
      font-size: 0.75rem;

      top: 0.875rem;

      transition: top 0.1s ease;
    }

    .clear-button {
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

    .clear-button:focus-visible {
      outline: 2px solid var(--select-border-color-focus);
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
    }

    .select-menu {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background-color: white;
      border: 0px solid black;
      border-radius: 1px;
      box-shadow: 0 0 16px rgba(0, 0, 0, 0.16), 0 0 2px rgba(0, 0, 0, 0.32);
      list-style: none;
      padding: 0;
      margin: 0;
      top: calc(100% + 2px);
      z-index: 10;
    }

    .select-menu li {
      color: var(--select-option-color);
      height: 3rem;
      line-height: 3rem;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .select-menu li:hover {
      background: var(--leu-color-black-transp-5);
      color: var(--select-option-color-focus);
    }

    .select-menu li.selected {
      background: var(--select-color-focus);
      color: var(--select-option-color-focus);
    }
  `

  static get properties() {
    return {
      open: { type: Boolean, attribute: "open" },

      label: { type: String },
      options: { type: Object },
      value: { type: String },
      clearable: { type: Boolean, reflect: true },
      disabled: { type: Boolean, reflect: true },
    }
  }

  constructor() {
    super()
    this.open = false

    this._arrowIcon = Icon("angleDropDown")
    this._clearIcon = Icon("clear")
    this.value = null
  }

  connectedCallback() {
    super.connectedCallback()
    this.handleEvents()
  }

  handleEvents() {
    this.removeEventListeners()
    this.addEventListeners()
  }

  addEventListeners() {
    this.addEventListener("blur", (e) => this.closeDropdown(e))
    this.addEventListener("keydown", this.handleKeyDown)
  }

  removeEventListeners() {
    this.removeEventListener("blur", (e) => this.closeDropdown(e))
    this.removeEventListener("keydown", this.handleKeyDown)
  }

  handleKeyDown = (e) => {
    const { activeElement } = document.activeElement.shadowRoot

    // the active element is the button
    if (activeElement.classList.contains("select-toggle") && !this.disabled) {
      switch (e.key) {
        case " ":
          this.open = true
          break
        case "Enter":
          this.open = !this.open
          break
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
  }

  static getDisplayValue(value) {
    if (
      typeof value === "object" &&
      Object.prototype.hasOwnProperty.call(value, "label")
    ) {
      return value.label
    }
    return value
  }

  clearValue(event) {
    if (!this.disabled) {
      event.stopPropagation()
      this.value = ""
    }
  }

  toggleDropdown() {
    if (!this.disabled) {
      this.open = !this.open
    }
  }

  closeDropdown(e) {
    if (e.relatedTarget == null) {
      this.open = false
    }
  }

  selectOption(option) {
    this.open = false
    this.value = option.target.optionvalue

    // Dispatch a change event
    const event = new CustomEvent("change", {
      detail: {
        option: this.value,
      },
    })
    this.dispatchEvent(event)
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
    // Dispatch a change event
    const event = new CustomEvent("change", {
      detail: {
        option: this.value,
      },
    })
    this.dispatchEvent(event)
  }

  getTabindex() {
    if (this.disabled) {
      return `-1`
    }
    return `0`
  }

  render() {
    /* eslint-disable lit-a11y/tabindex-no-positive */
    return html`
      <div class="select" .value=${this.value} ?disabled=${this.disabled}>
        <div
          id="select-button"
          class="select-toggle
          ${this.open ? `open` : ``}  
          ${this.value === "" || this.value == null ? `empty` : `full`}
          ${this.label === "" ? `unlabeled` : `labeled`}"
          @click=${this.toggleDropdown}
          @keyDown=${this.handleKeyDown}
          tabindex=${this.getTabindex()}
        >
          <span class="label"><slot name="label">${this.label}</slot></span>
          <span class="value"
            ><slot name="value"
              >${LeuSelect.getDisplayValue(this.value)}</slot
            ></span
          >
          <span class="arrow-icon"> ${this._arrowIcon} </span>
        </div>
        ${this.clearable && this.value !== ""
          ? html`<button
              class="clear-button"
              @click=${this.clearValue}
              @keyDown=${this.handleKeyDown}
              aria-label="Eingabefeld zurücksetzen"
              ?disabled=${this.disabled}
            >
              ${this._clearIcon}
            </button>`
          : nothing}
        <div class="select-menu-container">
          <ul class="select-menu" ?hidden=${!this.open}>
            ${map(
              this.options,
              (option) =>
                html`<li
                  class=${this.value === option ? `selected` : ``}
                  .optionvalue=${option}
                  @click=${this.selectOption}
                  @keyDown=${this.handleKeyDown}
                  tabindex="-1"
                >
                  ${LeuSelect.getDisplayValue(option)}
                </li>`
            )}
          </ul>
        </div>
      </div>
    `
    /* eslint-enable lit-a11y/tabindex-no-positive */
  }
}
