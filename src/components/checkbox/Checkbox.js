import { html, css, LitElement } from "lit"
import { Icon } from "../icon/icon.js"
import { defineElement } from "../../lib/defineElement.js"

/**
 * @tagname leu-checkbox
 */
export class LeuCheckbox extends LitElement {
  static styles = css`
    :host {
      --checkbox-color: var(--leu-color-black-40);
      --checkbox-color-disabled: var(--leu-color-black-20);
      --checkbox-color-focus: var(--leu-color-func-cyan);

      --checkbox-label-color: var(--leu-color-black-100);
      --checkbox-label-color-disabled: var(--checkbox-color-disabled);

      --checkbox-tick-color: var(--leu-color-black-0);

      --checkbox-font-regular: var(--leu-font-regular);

      position: relative;

      display: inline-flex;
      align-items: flex-start;
      gap: 0.5rem;

      font-family: var(--checkbox-font-regular);
    }

    .checkbox {
      --_length: 1.5rem;
      appearance: none;
      cursor: pointer;

      width: var(--_length);
      height: var(--_length);
      margin: 0;

      border: 2px solid var(--checkbox-color);
      border-radius: 2px;

      flex: 1 0 var(--_length);

      display: grid;
      place-items: center;
    }

    .checkbox:checked {
      background-color: var(--checkbox-color);
    }

    .checkbox:is(:hover, :checked, :focus) {
      --checkbox-color: var(--checkbox-color-focus);
    }

    .checkbox:focus-visible {
      outline: 2px solid var(--checkbox-color-focus);
      outline-offset: 2px;
    }

    .checkbox:disabled {
      --checkbox-color: var(--checkbox-color-disabled);
      cursor: not-allowed;
    }

    .label {
      cursor: pointer;
      color: var(--checkbox-label-color);
      font-size: 1rem;
      line-height: 1.5;
    }

    .checkbox:disabled + .label {
      --checkbox-label-color: var(--checkbox-label-color-disabled);
      cursor: not-allowed;
    }

    .icon {
      position: absolute;
      top: 0;
      left: 0;
      color: var(--checkbox-tick-color);
      pointer-events: none;
    }
  `

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  }

  static properties = {
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    identifier: { type: String },
    value: { type: String },
    name: { type: String },
  }

  constructor() {
    super()
    this.checked = false
    this.disabled = false

    this.checkIcon = Icon("check")
  }

  handleChange(event) {
    this.checked = event.target.checked

    const customEvent = new CustomEvent(event.type, event)
    this.dispatchEvent(customEvent)
  }

  handleInput(event) {
    this.checked = event.target.checked
  }

  render() {
    return html`
      <input
        id=${this.identifier}
        class="checkbox"
        type="checkbox"
        name="${this.name}"
        @change=${this.handleChange}
        @input=${this.handleInput}
        .checked=${this.checked}
        ?disabled=${this.disabled}
        .value=${this.value}
      />
      <label for=${this.identifier} class="label"><slot></slot></label>
      <div class="icon">${this.checkIcon}</div>
    `
  }
}

export function defineCheckboxElements() {
  defineElement("checkbox", LeuCheckbox)
}
