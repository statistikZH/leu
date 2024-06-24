import { html, nothing } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { map } from "lit/directives/map.js"
import { createRef, ref } from "lit/directives/ref.js"

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
      open: { type: Boolean, reflect: true },
      label: { type: String, reflect: true },
      options: { type: Array },
      value: { type: Array },
      clearable: { type: Boolean, reflect: true },
      disabled: { type: Boolean, reflect: true },
      filterable: { type: Boolean, reflect: true },
      multiple: { type: Boolean, reflect: true },
      optionFilter: { state: true },
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
    this.options = []
    this.label = ""

    /** @internal */
    this.optionFilter = ""

    /** @internal */
    this.deferedChangeEvent = false

    /**
     * @type {import("lit/directives/ref").Ref<import("../menu/Menu").LeuMenu>}
     */
    this.menuRef = createRef()
    /**
     * @type {import("lit/directives/ref").Ref<import("../input/Input").LeuInput>}
     */
    this.optionFilterRef = createRef()
    /**
     * @type {import("lit/directives/ref").Ref<HTMLButtonElement>}
     */
    this.toggleButtonRef = createRef()
  }

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener("click", this.handleDocumentClick)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    document.removeEventListener("click", this.handleDocumentClick)
  }

  updated(changedProperties) {
    if (changedProperties.has("open") && this.open) {
      if (this.filterable) {
        this.optionFilterRef.value.focus()
      } else {
        this.querySelector("leu-menu")?.focus()
      }
    } else if (changedProperties.has("open") && !this.open) {
      this.toggleButtonRef.value.focus()
    }
  }

  /**
   * Handles clicks outside of the component to close the dropdown.
   * @internal
   * @param {MouseEvent} event
   */
  handleDocumentClick = (event) => {
    if (
      event.target instanceof Node &&
      !this.contains(event.target) &&
      this.open
    ) {
      this.closeDropdown()
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

  async _handleToggleKeyDown(event) {
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault()

      /** @type {LeuMenu} */
      const menu = this.querySelector("leu-menu")

      this.openDropdown()
      await this.updateComplete

      if (event.key === "ArrowDown" || event.key === "Home") {
        menu.focusItem(0)
      } else if (event.key === "ArrowUp" || event.key === "End") {
        menu.focusItem(-1)
      }
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

  handleMenuClick(event) {
    if (event.target instanceof LeuMenuItem && event.target.value) {
      this.selectOption(event.target.value)
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
      this.closeDropdown()
    }
  }

  renderMenu() {
    const menuClasses = {
      "select-menu": true,
      multiple: this.multiple,
    }

    const filteredOptions = this.getFilteredOptions()

    return html`
      <leu-menu
        role="listbox"
        class=${classMap(menuClasses)}
        aria-multiselectable="${this.multiple}"
        aria-labelledby="select-label"
        ref=${ref(this.menuRef)}
      >
        ${filteredOptions.length > 0
          ? map(this.getFilteredOptions(), (option) => {
              const isSelected = this.isSelected(option)
              let beforeIcon

              if (this.multiple && isSelected) {
                beforeIcon = "check"
              } else if (this.multiple) {
                beforeIcon = "EMPTY"
              }

              return html`<leu-menu-item
                @click=${() => this.selectOption(option)}
                role="option"
                ?active=${isSelected}
                aria-selected=${isSelected}
              >
                ${beforeIcon !== undefined
                  ? html`<leu-icon slot="before" name=${beforeIcon}></leu-icon>`
                  : nothing}
                ${LeuSelect.getOptionLabel(option)}
              </leu-menu-item>`
            })
          : html`<leu-menu-item disabled
              >${this.optionFilter === ""
                ? "Keine Optionen"
                : "Keine Resultate"}</leu-menu-item
            >`}
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
        ref=${ref(this.optionFilterRef)}
        label="Nach Stichwort filtern"
      ></leu-input>`
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
          fluid
          >Anwenden</leu-button
        >
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
      @keydown=${this._handleToggleKeyDown}
      ?disabled=${this.disabled}
      aria-controls="select-popup"
      aria-haspopup="listbox"
      aria-expanded="${this.open}"
      aria-labelledby="select-label"
      role="combobox"
      ref=${ref(this.toggleButtonRef)}
      slot="anchor"
    >
      <span class="label" id="select-label">${this.label}</span>
      <span class="value"> ${this.getDisplayValue(this.value)} </span>
      <span class="arrow-icon">
        <leu-icon name="angleDropDown"></leu-icon>
      </span>
      ${this.clearable && this.value.length !== 0
        ? html`<button
            type="button"
            class="clear-button"
            @click=${this.clearValue}
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
      @keydown=${this.handleKeyDown}
    >
      <leu-popup
        ?active=${this.open}
        placement="bottom-start"
        flip
        matchSize="width"
        autoSize="height"
        autoSizePadding="8"
      >
        ${this.renderToggleButton()}
        <div
          id="select-popup"
          class="select-menu-container"
          @focusout=${this._handlePopupFocusOut}
        >
          <slot name="before" class="before"></slot>
          ${this.renderFilterInput()}
          <slot name="menu" @click=${this.handleMenuClick}></slot>
          ${this.renderApplyButton()}
          <slot name="after" class="after"></slot>
        </div>
      </leu-popup>
    </div> `
    /* eslint-enable lit-a11y/click-events-have-key-events */
  }
}
