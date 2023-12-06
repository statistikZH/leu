import { html, LitElement } from "lit"
import { Icon } from "../icon/icon.js"
import { defineElement } from "../../lib/defineElement.js"

import styles from "./checkbox.css"

/**
 * @tagname leu-checkbox
 */
export class LeuCheckbox extends LitElement {
  static styles = styles

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  }

  static properties = {
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    identifier: { type: String, reflect: true },
    value: { type: String, reflect: true },
    name: { type: String, reflect: true },
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
