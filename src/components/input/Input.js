import { html, css, LitElement, nothing } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { ifDefined } from "lit/directives/if-defined.js"

import { Icon } from "../icon/icon.js"
import { defineElement } from "../../lib/defineElement.js"

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
  static styles = css`
    :host,
    :host * {
      box-sizing: border-box;
    }

    :host {
      --input-color: var(--leu-color-black-100);
      --input-color-disabled: var(--leu-color-black-20);
      --input-color-invalid: var(--leu-color-func-red);
      --input-color-focus: var(--leu-color-func-cyan);
      --input-border-width: 2px;

      --input-label-color: var(--leu-color-black-100);
      --input-label-color-disabled: var(--input-color-disabled);
      --input-label-color-empty: var(--leu-color-black-60);

      --input-affix-color: var(--leu-color-black-60);
      --input-affix-color-disabled: var(--input-color-disabled);

      --input-border-color: var(--leu-color-black-40);
      --input-border-color-focus: var(--input-color-focus);
      --input-border-color-disabled: var(--leu-color-black-20);
      --input-border-color-invalid: var(--input-color-invalid);

      --input-error-color: var(--leu-color-black-0);

      --input-clear-color: var(--leu-color-black-60);

      --input-font-regular: var(--leu-font-regular);
      --input-font-black: var(--leu-font-black);

      display: block;
      font-family: var(--input-font-regular);
    }

    .input-wrapper {
      position: relative;
      display: flex;
      gap: 0.5rem;
      padding-inline: 0.875rem;

      border: var(--input-border-width) solid var(--input-border-color);
      border-radius: 2px;

      line-height: 1;
    }

    .input-wrapper:focus-within,
    .input-wrapper:hover {
      --input-border-color: var(--input-border-color-focus);
    }

    .input-wrapper:focus-within {
      outline: 2px solid var(--input-color-focus);
      outline-offset: 2px;
    }

    .input-wrapper--invalid,
    .input-wrapper--invalid:is(:hover, :focus) {
      --input-border-color: var(--input-border-color-invalid);
      border-radius: 2px 2px 0 0;
    }

    .input {
      appearance: none;
      display: block;
      width: 100%;

      font-size: 1rem;
      line-height: 1;
      color: var(--input-color);

      border: 0;

      padding-block: 2rem 1rem;
    }

    .input:focus-visible {
      outline: none;
    }

    .input:disabled {
      --input-color: var(--input-color-disabled);
      --input-border-color: var(--input-border-color-disabled);
    }

    .prefix,
    .suffix {
      padding-block: 2rem 1rem;

      font-size: 1rem;
      line-height: 1.5;
      color: var(--input-affix-color);
      pointer-events: none;
    }

    .prefix {
      order: -1;
    }

    .input:disabled ~ :is(.prefix, .suffix) {
      --input-affix-color: var(--input-affix-color-disabled);
    }

    .label,
    .input-wrapper--has-affix.input-wrapper--empty .input:not(:focus) + .label {
      position: absolute;
      left: 1rem;
      top: calc(0.75rem - var(--input-border-width));

      color: var(--input-label-color);
      font-size: 0.75rem;
      line-height: 1.5;
      font-family: var(--input-font-black);

      transition: 0.15s ease-out;
      transition-property: font-size, top;
    }

    .input-wrapper--has-affix.input-wrapper--empty .input:not(:focus) + .label {
      top: calc(0.75rem - var(--input-border-width));

      font-family: var(--input-font-black);
      font-size: 0.75rem;
    }

    .input-wrapper--empty .input:not(:focus) + .label {
      --input-label-color: var(--input-label-color-empty);
      font-family: var(--input-font-regular);
      font-size: 1rem;
      top: calc(1.5rem - var(--input-border-width));
    }

    .input:disabled + .label {
      --input-label-color: var(--input-label-color-disabled);
    }

    .error {
      list-style: none;
      padding: 0.0625rem 1rem 0.1875rem;
      margin: 0;

      color: var(--input-error-color);
      font-size: 0.75rem;
      line-height: 1.5;

      border: 2px solid var(--input-color-invalid);
      border-radius: 0 0 2px 2px;

      background-color: var(--input-color-invalid);
    }

    .clear-button {
      --_length: 1.5rem;

      align-self: center;

      width: var(--_length);
      height: var(--_length);
      padding: 0;

      cursor: pointer;

      background: none;
      color: var(--input-clear-color);
      border: none;
      /* border-radius is only defined for a nice focus outline */
      border-radius: 2px;
    }

    .clear-button:focus-visible {
      outline: 2px solid var(--input-color-focus);
      outline-offset: 2px;
    }
  `

  static properties = {
    disabled: { type: Boolean, reflect: true },
    required: { type: Boolean, reflect: true },
    clearable: { type: Boolean, reflect: true },

    identifier: { type: String },
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

    this.identifier = crypto.randomUUID()
    this.value = ""
    this.name = ""

    this.label = ""
    this.prefix = ""
    this.suffix = ""

    this.type = "text"
    this._validity = null

    this._clearIcon = Icon("clear")
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
  }

  render() {
    const isInvalid = this._validity === null ? false : !this._validity.valid

    const inputWrapperClasses = {
      "input-wrapper": true,
      "input-wrapper--empty": this.value === "",
      "input-wrapper--invalid": isInvalid,
      "input-wrapper--has-affix":
        this.prefix.length > 0 || this.suffix.length > 0,
      "input-wrappper--disabled": this.disabled,
    }

    return html`
      <div class=${classMap(inputWrapperClasses)}>
        <input
          class="input"
          id=${this.identifier}
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
        />
        <label for=${this.identifier} class="label"><slot></slot></label>
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
