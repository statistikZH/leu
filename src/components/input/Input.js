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
 * Creates an error list with an item for the given validity state.
 * @param {ValidityState} validityState
 * @param {Object} validationMessages
 * @param {String} idRef
 * @returns
 */
const ErrorList = (validityState, validationMessages, idRef) => {
  const errorMessages = Object.entries(validationMessages)
    .filter(([property]) => validityState[property])
    .map(([_, message]) => message)

  return html`
    <ul class="error" aria-errormessage=${idRef}>
      ${errorMessages.map(
        (message) => html`<li class="error-message">${message}</li>`
      )}
    </ul>
  `
}

/**
 * @attr {boolean} disabled - Disables the input element.
 * @attr {boolean} required - Marks the input element as required.
 * @attr {boolean} clearable - Adds a button to clear the input element.
 * @attr {string} value - The value of the input element.
 * @attr {string} name - The name of the input element.
 * @attr {string} label - The label of the input element.
 * @attr {string} prefix - A prefix that relates to the value of the input (e.g. CHF).
 * @attr {string} suffix - A suffix that relates to the value of the input (e.g. mm).
 * @attr {string} pattern - A regular expression that the value is checked against.
 * @attr {string} type - The type of the input element.
 * @attr {string} min - The minimum value of the input element.
 * @attr {string} max - The maximum value of the input element.
 * @attr {string} minlength - The minimum length of the input element.
 * @attr {string} maxlength - The maximum length of the input element.
 * @attr {object} validationMessages - Custom validation messages. The key is the name of the validity state and the value is the message.
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

    label: { type: String },
    prefix: { type: String },
    suffix: { type: String },
    size: { type: String },

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

  constructor() {
    super()

    this.disabled = false
    this.required = false
    this.clearable = false

    this.value = ""
    this.name = ""

    this.label = ""
    this.prefix = ""
    this.suffix = ""

    /** @type {keyof typeof SIZE_TYPES} */
    this.size = SIZE_TYPES.REGULAR

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

    function resolveMessage(message, refernceValue) {
      if (typeof message === "function") {
        return message(refernceValue)
      }

      return message
    }

    validationMessages.tooLong = resolveMessage(tooLong, this.maxlength)
    validationMessages.tooShort = resolveMessage(tooShort, this.minlength)
    validationMessages.rangeOverflow = resolveMessage(rangeOverflow, this.max)
    validationMessages.rangeUnderflow = resolveMessage(rangeUnderflow, this.min)

    return validationMessages
  }

  render() {
    const isInvalid =
      this._validity === null || this.novalidate ? false : !this._validity.valid

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
      ${isInvalid
        ? ErrorList(
            this._validity,
            this.getValidationMessages(),
            `input-${this.getId()}`
          )
        : nothing}
    `
  }
}

export function defineInputElements() {
  defineElement("input", LeuInput)
}
