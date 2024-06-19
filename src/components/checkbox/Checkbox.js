import { html } from "lit"

import { LeuElement } from "../../lib/LeuElement.js"
import { LeuIcon } from "../icon/Icon.js"

import styles from "./checkbox.css"

/**
 * @tagname leu-checkbox
 */
export class LeuCheckbox extends LeuElement {
  static dependencies = {
    "leu-icon": LeuIcon,
  }

  static styles = styles

  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  static properties = {
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    identifier: { type: String, reflect: true },
    value: { type: String, reflect: true },
    name: { type: String, reflect: true },
    label: { type: String, reflect: true },
  }

  constructor() {
    super()
    this.checked = false
    this.disabled = false
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
      <label for=${this.identifier} class="label">${this.label}</label>
      <leu-icon class="icon" name="check"></leu-icon>
    `
  }
}
