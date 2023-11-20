import { html, LitElement, nothing } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { ifDefined } from "lit/directives/if-defined.js"
import { createRef, ref } from "lit/directives/ref.js"

import { Icon } from "../icon/icon.js"
import { defineElement } from "../../lib/defineElement.js"

import styles from "./input.css"

export const SIZE_TYPES = {
  SMALL: "small",
  REGULAR: "regular",
}

/**
 * TODO:
 * - Add section to docs about how to mark up suffix and prefix for screenreaders
 * - Handle validation
 * - Infotext attribute or slot?
 */

const VALIDATION_MESSAGES = {
  badInput: "Bitte überprüfen Sie das Format.",
  patternMismatch: "Bitte überprüfen Sie das Format.",
  rangeOverflow: (max) => `Der Wert darf nicht grösser als ${max} sein.`,
  rangeUnderflow: (min) => `Der Wert darf nicht kleiner als ${min} sein.`,
  stepMismatch: "Bitte überprüfen Sie das Format.",
  tooLong: (maxlength) =>
    `Die Eingabe muss kürzer als ${maxlength} Zeichen sein.`,
  tooShort: (minlength) =>
    `Die Eingabe muss länger als ${minlength} Zeichen sein.`,
  typeMismatch: "Bitte überprüfen Sie das Format.",
  valueMissing: "Bitte füllen Sie das Feld aus.",
}

/**
 * A text input element.
 *
 * @prop {boolean} disabled - Disables the input element.
 * @prop {boolean} required - Marks the input element as required.
 * @prop {boolean} clearable - Adds a button to clear the input element.
 * @prop {string} value - The value of the input element.
 * @prop {string} name - The name of the input element.
 * @prop {string} label - The label of the input element.
 * @prop {string} error - A custom error that is completely independent of the validity state. Useful for displaying server side errors.
 * @prop {string} size - The size of the input element.
 * @prop {string} icon - The icon that is displayed at the end of the input element.
 * @prop {string} prefix - A prefix that relates to the value of the input (e.g. CHF).
 * @prop {string} suffix - A suffix that relates to the value of the input (e.g. mm).
 * @prop {string} pattern - A regular expression that the value is checked against.
 * @prop {string} type - The type of the input element.
 * @prop {string} min - The minimum value of the input element.
 * @prop {string} max - The maximum value of the input element.
 * @prop {string} minlength - The minimum length of the input element.
 * @prop {string} maxlength - The maximum length of the input element.
 * @prop {object} validationMessages - Custom validation messages. The key is the name of the validity state and the value is the message.
 * @prop {boolean} novalidate - Disables the browser's validation.
 *
 * @fires {CustomEvent} input - Dispatched when the value of the input element changes.
 * @fires {CustomEvent} change - Dispatched when the value of the input element changes and the input element loses focus.
 *
 * @tagname leu-input
 */
export class LeuInput extends LitElement {
  static styles = styles

  static properties = {
    disabled: { type: Boolean, reflect: true },
    required: { type: Boolean, reflect: true },
    clearable: { type: Boolean, reflect: true },

    value: { type: String },
    name: { type: String },
    error: { type: String },

    label: { type: String },
    prefix: { type: String },
    suffix: { type: String },
    size: { type: String },
    icon: { type: String },

    /* Validation attributes */
    pattern: { type: String },
    type: { type: String },
    min: { type: Number },
    max: { type: Number },
    maxlength: { type: Number },
    minlength: { type: Number },
    validationMessages: { type: Object },
    novalidate: { type: Boolean },

    /** @type {ValidityState} */
    _validity: { state: true },
  }

  static resolveErrorMessage(message, refernceValue) {
    if (typeof message === "function") {
      return message(refernceValue)
    }

    return message
  }

  constructor() {
    super()

    this.disabled = false
    this.required = false
    this.clearable = false

    this.value = ""
    this.name = ""
    this.error = ""

    this.label = ""
    this.prefix = ""
    this.suffix = ""

    /** @type {keyof typeof SIZE_TYPES} */
    this.size = SIZE_TYPES.REGULAR

    this.icon = ""

    this.type = "text"
    this._validity = null
    this.validationMessages = {}
    this.novalidate = false

    /** @internal */
    this._identifier = ""

    /** @internal */
    this._clearIcon = Icon("clear")

    /**
     * @internal
     * @type {import("lit/directives/ref.js").Ref<HTMLInputElement>}
     */
    this._inputRef = createRef()
  }

  /**
   * Method for handling the click event of the wrapper element.
   * Redirect every click on the wrapper to the input element.
   * This is only necessary for click events because the wrapper element
   * looks like the input element. But the actual input field does not
   * completely fill the wrapper element. Keyboard events don't need to be
   * handled because the actual input element is focusable.
   * @private
   * @param {MouseEvent|PointerEvent} event
   * @returns {void}
   */
  handleWrapperClick(event) {
    if (event.target === event.currentTarget) {
      this._inputRef.value.focus()
    }
  }

  /**
   * Method for handling the blur event of the input element.
   * Checks validity of the input element and sets the validity state.
   * @private
   * @param {FocusEvent} event
   * @returns {void}
   */
  handleBlur(event) {
    this._validity = null

    if (!this.novalidate) {
      event.target.checkValidity()
    }
  }

  /**
   * Method for handling the invalid event of the input element.
   * Sets the validity state.
   * @private
   * @param {Event} event
   * @returns {void}
   */
  handleInvalid(event) {
    this._validity = event.target.validity
  }

  /**
   * Method for handling the change event of the input element.
   * Sets the value property and dispatches a change event so that
   * the event can be handled outside the shadow DOM.
   * @private
   * @param {Event} event
   * @fires {CustomEvent} change
   * @returns {void}
   */
  handleChange(event) {
    this.value = event.target.value

    const customEvent = new CustomEvent(event.type, event)
    this.dispatchEvent(customEvent)
  }

  /**
   * Method for handling the input event of the input element.
   * Sets the value property and dispatches an input event so that
   * the event can be handled outside the shadow DOM.
   * @private
   * @param {Event} event
   * @returns {void}
   */
  handleInput(event) {
    this.value = event.target.value
  }

  /**
   * Method for clearing the input element.
   * Sets the value property to an empty string and dispatches
   * an input and a change event.
   * @private
   * @returns {void}
   * @fires {CustomEvent} input
   * @fires {CustomEvent} change
   */
  clear() {
    this.value = ""

    this._inputRef.value.focus()

    this.dispatchEvent(
      new CustomEvent("input", { bubbles: true, composed: true })
    )
    this.dispatchEvent(
      new CustomEvent("change", { bubbles: true, composed: true })
    )
  }

  /**
   * Method for getting the id of the input element.
   * If the id attribute is set, the value of the id attribute is returned.
   * Otherwise a random id is generated and returned.
   *
   * @private
   * @returns {string} id
   */
  getId() {
    const id = this.getAttribute("id")

    if (id !== null && id !== "") {
      return id
    }

    if (this._identifier !== "") {
      return this._identifier
    }

    this._identifier = crypto.randomUUID()
    return this._identifier
  }

  /**
   * Merge custom and default validation messages.
   * A validation message can be a function or a string.
   * If it s a function, the function is called with the corresponding
   * attribute value as argument.
   * e.g.
   * `tooLong(this.maxlength)`
   * This way the framework user can create reasonable validation messages
   *
   * @returns {Object} validationMessages
   */
  getValidationMessages() {
    const validationMessages = {
      ...VALIDATION_MESSAGES,
      ...this.validationMessages,
    }

    const { tooLong, tooShort, rangeOverflow, rangeUnderflow } =
      validationMessages

    validationMessages.tooLong = LeuInput.resolveErrorMessage(
      tooLong,
      this.maxlength
    )
    validationMessages.tooShort = LeuInput.resolveErrorMessage(
      tooShort,
      this.minlength
    )
    validationMessages.rangeOverflow = LeuInput.resolveErrorMessage(
      rangeOverflow,
      this.max
    )
    validationMessages.rangeUnderflow = LeuInput.resolveErrorMessage(
      rangeUnderflow,
      this.min
    )

    return validationMessages
  }

  /**
   * Creates an error list with an item for the given validity state.
   * @param {ValidityState} validityState
   * @param {Object} validationMessages
   * @param {String} idRef
   * @returns
   */
  renderErrorMessages() {
    if (!this.isInvalid()) {
      return nothing
    }

    const validationMessages = this.getValidationMessages()
    let errorMessages = this._validity
      ? Object.entries(validationMessages)
          .filter(([property]) => this._validity[property])
          .map(([_, message]) => message)
      : []

    if (this.error !== "") {
      errorMessages = [this.error, errorMessages]
    }

    return html`
      <ul class="error" aria-errormessage=${`input-${this.getId()}`}>
        ${errorMessages.map(
          (message) => html`<li class="error-message">${message}</li>`
        )}
      </ul>
    `
  }

  /**
   * Determines the content that is displayed after the input element.
   * This can be either an icon, a clear button or an error indicator icon.
   *
   * @private
   * @returns {TemplateResult}
   */
  renderAfterContent() {
    if (this.isInvalid()) {
      return html`<div class="error-icon">${Icon("caution")}</div>`
    }

    if (this.clearable && this.value !== "") {
      return html`<button
        class="clear-button"
        @click=${this.clear}
        aria-label="Eingabefeld zurücksetzen"
        ?disabled=${this.disabled}
      >
        ${this._clearIcon}
      </button>`
    }

    if (this.icon !== "") {
      return html`<div class="icon">${Icon(this.icon)}</div>`
    }

    return nothing
  }

  isInvalid() {
    if (this.error !== "") {
      return true
    }

    return this._validity === null || this.novalidate
      ? false
      : !this._validity.valid
  }

  render() {
    const isInvalid = this.isInvalid()

    const inputWrapperClasses = {
      "input-wrapper": true,
      "input-wrapper--empty": this.value === "",
      "input-wrapper--invalid": isInvalid,
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
          aria-invalid=${isInvalid}
        />
        <label for="input-${this.getId()}" class="label"><slot></slot></label>
        ${this.prefix !== ""
          ? html`<div class="prefix" .aria-hidden=${true}>${this.prefix}</div>`
          : nothing}
        ${this.suffix !== ""
          ? html`<div class="suffix" .aria-hidden=${true}>${this.suffix}</div>`
          : nothing}
        ${this.renderAfterContent()}
      </div>
      ${this.renderErrorMessages()}
    `
  }
}

export function defineInputElements() {
  defineElement("input", LeuInput)
}
