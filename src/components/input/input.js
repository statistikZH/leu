import { html, css, LitElement, nothing } from "lit"
import { classMap } from "lit/directives/class-map.js"

import { Icon } from "../icon/icon.js"

/**
 * TODO:
 * - Add section to docs about how to mark up suffix and prefix for screenreaders
 * - Handle validation
 * - Infotext attribute or slot?
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

      position: relative;
      display: flex;
      gap: 0.5rem;
      padding-inline: 0.875rem;

      border: var(--input-border-width) solid var(--input-border-color);
      border-radius: 2px;

      font-family: var(--input-font-regular);

      line-height: 1;
    }

    :host(:focus-within),
    :host(:hover) {
      --input-border-color: var(--input-border-color-focus);
    }

    :host(:focus-within) {
      outline: 2px solid var(--input-color-focus);
      outline-offset: 2px;
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

    .input--invalid,
    .input--invalid:is(:hover, :focus) {
      --input-border-color: var(--input-border-color-invalid);
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
    .input--has-affix.input--empty:not(:focus) + .label {
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

    .input--has-affix.input--empty:not(:focus) + .label {
      top: calc(0.75rem - var(--input-border-width));

      font-family: var(--input-font-black);
      font-size: 0.75rem;
    }

    .input--empty:not(:focus) + .label {
      --input-label-color: var(--input-label-color-empty);
      font-family: var(--input-font-regular);
      font-size: 1rem;
      top: calc(1.5rem - var(--input-border-width));
    }

    .input:disabled + .label {
      --input-label-color: var(--input-label-color-disabled);
    }

    .error {
      font-size: 0.75rem;
      line-height: 1.5;
      border: 2px solid var(--input-color-invalid);
      border-radius: 2px;
      background-color: var(--input-color-invalid);
      color: var(--input-error-color);
      padding: 0.0625rem 0.875rem 0.1875rem;
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
    pattern: { type: String },
    prefix: { type: String },
    suffix: { type: String },
    type: { type: String },
  }

  constructor() {
    super()

    this.disabled = false
    this.clearable = false

    this.identifier = crypto.randomUUID()
    this.value = ""
    this.name = ""

    this.label = ""
    this.pattern = ""
    this.prefix = ""
    this.suffix = ""
    this.type = "text"

    this._clearIcon = Icon("clear")
  }

  handleChange(event) {
    this.value = event.target.value

    const customEvent = new CustomEvent(event.type, event)
    this.dispatchEvent(customEvent)
  }

  handleInput(event) {
    this.value = event.target.value

    // const customEvent = new CustomEvent(event.type, {...event, bubbles: true, composed: true, target: this});
    // this.dispatchEvent(customEvent)
  }

  clear() {
    this.value = ""
  }

  render() {
    // TODO: Replace with state
    const isInvalid = false

    const inputClasses = {
      input: true,
      "input--empty": this.value === "",
      "input--invalid": isInvalid,
      "input--has-affix": this.prefix.length > 0 || this.suffix.length > 0,
    }

    return html`
      <input
        id=${this.identifier}
        class=${classMap(inputClasses)}
        type=${this.type}
        name="${this.name}"
        @change=${this.handleChange}
        @input=${this.handleInput}
        ?disabled=${this.disabled}
        .value=${this.value}
      />
      <label for=${this.identifier} class="label"><slot></slot></label>
      ${this.prefix !== ""
        ? html`<div class="prefix" .aria-hidden=${true}>${this.prefix}</div>`
        : nothing}
      ${this.suffix !== ""
        ? html`<div class="suffix" .aria-hidden=${true}>${this.suffix}</div>`
        : nothing}
      ${isInvalid // TODO: add aria-describe-by or similiar?
        ? html`<div class="error">Bitte füllen Sie das Feld aus.</div>`
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
    `
  }
}
