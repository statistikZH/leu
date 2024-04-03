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

  /** @internal */
  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  static properties = {
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    value: { type: String, reflect: true },
    name: { type: String, reflect: true },
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
        id=${`checkbox-${this.name}`}
        class="checkbox"
        type="checkbox"
        name="${this.name}"
        @change=${this.handleChange}
        @input=${this.handleInput}
        .checked=${this.checked}
        ?disabled=${this.disabled}
        .value=${this.value}
      />
      <label for=${`checkbox-${this.name}`} class="label"><slot></slot></label>
      <leu-icon class="icon" name="check"></leu-icon>
    `
  }
}
