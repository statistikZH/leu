import { html } from "lit"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./radio.css"

/**
 * @tagname leu-radio
 */
export class LeuRadio extends LeuElement {
  static styles = styles

  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  static properties = {
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    value: { type: String, reflect: true },
    name: { type: String, reflect: true },
    label: { type: String, reflect: true },
  }

  constructor() {
    super()
    this.checked = false
    this.disabled = false
    this.name = ""
    this.value = ""
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
        id=${`radio-${this.name}`}
        class="radio"
        type="radio"
        name="${this.name}"
        @change=${this.handleChange}
        @input=${this.handleInput}
        .checked=${this.checked}
        ?disabled=${this.disabled}
        .value=${this.value}
      />
      <label for=${`radio-${this.name}`} class="label">${this.label}</label>
    `
  }
}
