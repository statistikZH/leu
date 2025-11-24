import { html, nothing } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { ifDefined } from "lit/directives/if-defined.js"
import { live } from "lit/directives/live.js"
import { createRef, ref } from "lit/directives/ref.js"
import { property, state } from "lit/decorators.js"

import { LeuElement } from "../../lib/LeuElement.js"
import { LeuIcon } from "../icon/Icon.js"

import styles from "./input.css"
import { IconPathName } from "../icon/paths.js"

export const SIZES = Object.freeze({
  SMALL: "small",
  REGULAR: "regular",
})

type InputType =
  | "date"
  | "datetime-local"
  | "email"
  | "month"
  | "number"
  | "password"
  | "search"
  | "tel"
  | "text"
  | "time"
  | "week"

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
 * @fires {CustomEvent} input - Dispatched when the value of the input element changes.
 * @fires {CustomEvent} change - Dispatched when the value of the input element changes and the input element loses focus.
 *
 * @tagname leu-input
 */
export class LeuInput extends LeuElement {
  static dependencies = {
    "leu-icon": LeuIcon,
  }

  static styles = [LeuElement.styles, styles]

  /**
   * @internal
   */
  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  /** Disables the input element. */
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false

  /** Marks the input element as required */
  @property({ type: Boolean, reflect: true })
  required: boolean = false

  /** Adds a button to clear the input element */
  @property({ type: Boolean, reflect: true })
  clearable: boolean = false

  /** The value of the input element. */
  @property({ type: String, reflect: true })
  value: string = ""

  /** The name of the input element. */
  @property({ type: String, reflect: true })
  name: string = ""

  /** A custom error that is completely independent of the validity state. Useful for displaying server side errors. */
  @property({ type: String, reflect: true })
  error: string = ""

  /** The label of the input element */
  @property({ type: String, reflect: true })
  label: string = ""

  /** A prefix that relates to the value of the input (e.g. CHF)  */
  @property({ type: String, reflect: true })
  prefix: string

  /** A suffix that relates to the value of the input (e.g. mm). */
  @property({ type: String, reflect: true })
  suffix: string

  /** The size of the input element */
  @property({ type: String, reflect: true })
  size: "small" | "regular" = "regular"

  /** The icon that is displayed at the end of the input element */
  @property({ type: String, reflect: true })
  icon: IconPathName

  /** A regular expression that the value is checked against. */
  @property({ type: String, reflect: true })
  pattern: string

  /** The type of the input element. */
  @property({ type: String, reflect: true })
  type: InputType = "text"

  /** The minimum value of the input element. */
  @property({ type: Number, reflect: true })
  min: number

  /** The maximum value of the input element. */
  @property({ type: Number, reflect: true })
  max: number

  /** The step value of the input element. */
  @property({ type: Number, reflect: true })
  step: number

  /** The maximum length of the input element. */
  @property({ type: Number, reflect: true })
  maxlength: number

  /** The minimum length of the input element. */
  @property({ type: Number, reflect: true })
  minlength: number

  /** Custom validation messages. The key is the name of the validity state and the value is the message. */
  @property({ type: Object })
  validationMessages: Record<string, string> = {}

  /** Disables the browser's validation. */
  @property({ type: Boolean, reflect: true })
  novalidate: boolean = false

  @state()
  _validity: ValidityState | null = null

  static resolveErrorMessage(message, refernceValue) {
    if (typeof message === "function") {
      return message(refernceValue)
    }

    return message
  }

  protected _inputRef = createRef<HTMLInputElement>()

  get valueAsNumber() {
    if (this.value === "") {
      return NaN
    }
    return Number(this.value)
  }

  /**
   * Method for handling the click event of the wrapper element.
   * Redirect every click on the wrapper to the input element.
   * This is only necessary for click events because the wrapper element
   * looks like the input element. But the actual input field does not
   * completely fill the wrapper element. Keyboard events don't need to be
   * handled because the actual input element is focusable.
   */
  protected handleWrapperClick(event: MouseEvent | PointerEvent) {
    if (event.target === event.currentTarget) {
      this._inputRef.value.focus()
    }
  }

  /**
   * Method for handling the blur event of the input element.
   * Checks validity of the input element and sets the validity state.
   */
  protected handleBlur(event: FocusEvent & { target: HTMLInputElement }) {
    this._validity = null

    if (!this.novalidate) {
      event.target.checkValidity()
    }
  }

  /**
   * Method for handling the invalid event of the input element.
   * Sets the validity state.
   */
  protected handleInvalid(event: Event & { target: HTMLInputElement }) {
    this._validity = event.target.validity
  }

  /**
   * Method for handling the change event of the input element.
   * Sets the value property and dispatches a change event so that
   * the event can be handled outside the shadow DOM.
   * @fires {CustomEvent} change
   */
  protected handleChange(event: Event & { target: HTMLInputElement }) {
    if (event.target.validity.valid) {
      this.value = event.target.value
    }

    const customEvent = new CustomEvent(event.type, event)
    this.dispatchEvent(customEvent)
  }

  /**
   * Method for handling the input event of the input element.
   * Sets the value property and dispatches an input event so that
   * the event can be handled outside the shadow DOM.
   */
  protected handleInput(event: Event & { target: HTMLInputElement }) {
    this.value = event.target.value

    const customEvent = new CustomEvent("input", {
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(customEvent)
  }

  /**
   * Method for clearing the input element.
   * Sets the value property to an empty string and dispatches
   * an input and a change event.
   * @fires {CustomEvent} input
   * @fires {CustomEvent} change
   */
  protected clear() {
    this.value = ""

    this._inputRef.value.focus()

    this.dispatchEvent(
      new CustomEvent("input", { bubbles: true, composed: true }),
    )
    this.dispatchEvent(
      new CustomEvent("change", { bubbles: true, composed: true }),
    )
  }

  /**
   * Merge custom and default validation messages.
   * A validation message can be a function or a string.
   * If it s a function, the function is called with the corresponding
   * attribute value as argument.
   * e.g.
   * `tooLong(this.maxlength)`
   * This way the framework user can create reasonable validation messages
   */
  protected getValidationMessages() {
    const validationMessages = {
      ...VALIDATION_MESSAGES,
      ...this.validationMessages,
    }

    const { tooLong, tooShort, rangeOverflow, rangeUnderflow } =
      validationMessages

    validationMessages.tooLong = LeuInput.resolveErrorMessage(
      tooLong,
      this.maxlength,
    )
    validationMessages.tooShort = LeuInput.resolveErrorMessage(
      tooShort,
      this.minlength,
    )
    validationMessages.rangeOverflow = LeuInput.resolveErrorMessage(
      rangeOverflow,
      this.max,
    )
    validationMessages.rangeUnderflow = LeuInput.resolveErrorMessage(
      rangeUnderflow,
      this.min,
    )

    return validationMessages
  }

  isInvalid() {
    if (this.error) {
      return true
    }

    return this._validity === null || this.novalidate
      ? false
      : !this._validity.valid
  }

  /**
   * Check input validation
   */
  checkValidity() {
    return this._inputRef.value?.checkValidity() ?? false
  }

  /**
   * Creates an error list with an item for the given validity state.
   */
  protected renderErrorMessages() {
    if (!this.isInvalid()) {
      return nothing
    }

    const validationMessages = this.getValidationMessages()
    let errorMessages = this._validity
      ? Object.entries(validationMessages)
          .filter(([prop]) => this._validity[prop])
          .map(([_, message]) => message)
      : []

    if (this.error !== "") {
      errorMessages = [this.error, errorMessages]
    }

    return html`
      <ul class="error" aria-errormessage="input">
        ${errorMessages.map(
          (message) => html`<li class="error-message">${message}</li>`,
        )}
      </ul>
    `
  }

  /**
   * Determines the content that is displayed after the input element.
   * This can be either an icon, a clear button or an error indicator icon.
   */
  protected renderAfterContent() {
    if (this.isInvalid()) {
      return html`<div class="error-icon">
        <leu-icon name="caution"></leu-icon>
      </div>`
    }

    if (this.clearable && this.value) {
      return html`<button
        class="clear-button"
        @click=${this.clear}
        aria-label="Eingabefeld zurücksetzen"
        ?disabled=${this.disabled}
      >
        <leu-icon name="clear"></leu-icon>
      </button>`
    }

    if (this.icon) {
      return html`<div class="icon">
        <leu-icon name=${this.icon}></leu-icon>
      </div>`
    }

    return nothing
  }

  render() {
    const isInvalid = this.isInvalid()

    const inputWrapperClasses = {
      "input-wrapper": true,
      "input-wrapper--empty": !this.value,
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
          id="input"
          type=${this.type}
          name=${this.name}
          @change=${this.handleChange}
          @blur=${this.handleBlur}
          @input=${this.handleInput}
          @invalid=${this.handleInvalid}
          ?disabled=${this.disabled}
          ?required=${this.required}
          .value=${live(this.value ?? "")}
          pattern=${ifDefined(this.pattern)}
          min=${ifDefined(this.min)}
          max=${ifDefined(this.max)}
          maxlength=${ifDefined(this.maxlength)}
          minlength=${ifDefined(this.minlength)}
          step=${ifDefined(this.step)}
          ref=${ref(this._inputRef)}
          aria-invalid=${isInvalid}
        />
        <label for="input" class="label">${this.label}</label>
        ${this.prefix
          ? html`<div class="prefix" .aria-hidden=${true}>${this.prefix}</div>`
          : nothing}
        ${this.suffix
          ? html`<div class="suffix" .aria-hidden=${true}>${this.suffix}</div>`
          : nothing}
        ${this.renderAfterContent()}
      </div>
      ${this.renderErrorMessages()}
    `
  }
}
