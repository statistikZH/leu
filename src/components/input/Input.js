import { html, css, LitElement, nothing } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { ifDefined } from "lit/directives/if-defined.js"
import { createRef, ref } from "lit/directives/ref.js"

import { Icon } from "../icon/icon.js"
import { defineElement } from "../../lib/defineElement.js"

import styles from "./input.css"

/**
 * TODO:
 * - Add section to docs about how to mark up suffix and prefix for screenreaders
 * - Handle validation
 * - Infotext attribute or slot?
 */

const VALIDATION_MESSAGES = {
  badInput: "Bitte überprüfen Sie das Format.",
  patternMismatch: "Bitte überprüfen Sie das Format.",
  rangeOverflow: "Bitte geben Sie einen kleineren Wert ein.",
  rangeUnderflow: "Bitte geben Sie einen grösseren Wert ein.",
  stepMismatch: "Bitte überprüfen Sie das Format.",
  tooLong: "Der eingegebene Text ist zu lang.",
  tooShort: "Der eingegebene Text ist zu kurz.",
  typeMismatch: "Bitte überprüfen Sie das Format.",
  valueMissing: "Bitte füllen Sie das Feld aus.",
}

// TODO: add aria-describe-by or similiar?
const ErrorList = (validityState) => {
  const errorMessages = Object.entries(VALIDATION_MESSAGES)
    .filter(([property]) => validityState[property])
    .map(([_, message]) => message)

  return html`
    <ul class="error">
      ${errorMessages.map(
        (message) => html`<li class="error-message">${message}</li>`
      )}
    </ul>
  `
}

/**
 * @tagname leu-input
 */
export class LeuInput extends LitElement {
  static styles = styles

  static properties = {
    disabled: { type: Boolean, reflect: true },
    required: { type: Boolean, reflect: true },
    clearable: { type: Boolean, reflect: true },

    id: { type: String },
    value: { type: String },
    name: { type: String },

    label: { type: String },
    prefix: { type: String },
    suffix: { type: String },

    /* Validation attributes */
    pattern: { type: String },
    type: { type: String },
    min: { type: String },
    max: { type: String },
    maxlength: { type: String },
    minlength: { type: String },

    _validity: { state: true },
  }

  constructor() {
    super()

    this.disabled = false
    this.required = false
    this.clearable = false

    this.id = ""
    this.value = ""
    this.name = ""

    this.label = ""
    this.prefix = ""
    this.suffix = ""

    this.type = "text"
    this._validity = null

    this._identifier = ""
    this._clearIcon = Icon("clear")
    this._inputRef = createRef()
  }

  /**
   *  Redirect every click on the wrapper to the input element.
   *  This is only necessary for click events because the wrapper element
   *  looks like the input element. But the actual input field does not
   *  completely fill the wrapper element. Keyboard events don't need to be
   *  handled because the actual input element is focusable.
   */
  handleWrapperClick(event) {
    if (event.target === event.currentTarget) {
      this._inputRef.value.focus()
    }
  }

  handleBlur(event) {
    this._validity = null
    event.target.checkValidity()
  }

  handleInvalid(event) {
    this._validity = event.target.validity
  }

  handleChange(event) {
    this.value = event.target.value

    const customEvent = new CustomEvent(event.type, event)
    this.dispatchEvent(customEvent)
  }

  handleInput(event) {
    this.value = event.target.value
  }

  clear() {
    this.value = ""

    this.dispatchEvent(
      new CustomEvent("input", { bubbles: true, composed: true })
    )
    this.dispatchEvent(
      new CustomEvent("change", { bubbles: true, composed: true })
    )
  }

  getId() {
    if (this.id !== "") {
      return this.id
    }

    if (this._identifier !== "") {
      return this._identifier
    }

    this._identifier = crypto.randomUUID()
    return this._identifier
  }

  render() {
    const isInvalid = this._validity === null ? false : !this._validity.valid

    const inputWrapperClasses = {
      "input-wrapper": true,
      "input-wrapper--empty": this.value === "",
      "input-wrapper--invalid": isInvalid,
      "input-wrapper--has-affix":
        this.prefix.length > 0 || this.suffix.length > 0,
    }

    /* See the description of the handleWrapperClick method on why this rule is disabled */
    /* eslint-disable lit-a11y/click-events-have-key-events */
    return html`
      <div
        @click=${this.handleWrapperClick}
        class=${classMap(inputWrapperClasses)}
      >
        <input
          class="input"
          id="input-${this.getId()}"
          type=${this.type}
          name=${this.name}
          @change=${this.handleChange}
          @blur=${this.handleBlur}
          @input=${this.handleInput}
          @invalid=${this.handleInvalid}
          ?disabled=${this.disabled}
          ?required=${this.required}
          pattern=${ifDefined(this.pattern)}
          min=${ifDefined(this.min)}
          max=${ifDefined(this.max)}
          maxlength=${ifDefined(this.maxlength)}
          minlength=${ifDefined(this.minlength)}
          .value=${this.value}
          ref=${ref(this._inputRef)}
        />
        <label for="input-${this.getId()}" class="label"><slot></slot></label>
        ${this.prefix !== ""
          ? html`<div class="prefix" .aria-hidden=${true}>${this.prefix}</div>`
          : nothing}
        ${this.suffix !== ""
          ? html`<div class="suffix" .aria-hidden=${true}>${this.suffix}</div>`
          : nothing}
        ${this.clearable && this.value !== ""
          ? html`<button
              class="clear-button"
              @click=${this.clear}
              aria-label="Eingabefeld zurücksetzen"
            >
              ${this._clearIcon}
            </button>`
          : nothing}
      </div>
      ${isInvalid ? ErrorList(this._validity) : nothing}
    `
  }
}

export function defineInputElements() {
  defineElement("input", LeuInput)
}
