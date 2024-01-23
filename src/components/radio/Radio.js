import { html, LitElement } from "lit"
import styles from "./radio.css"

/**
 * @tagname leu-radio
 */
export class LeuRadio extends LitElement {
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
        class="radio"
        type="radio"
        name="${this.name}"
        @change=${this.handleChange}
        @input=${this.handleInput}
        .checked=${this.checked}
        ?disabled=${this.disabled}
        .value=${this.value}
      />
      <label for=${this.identifier} class="label">${this.label}</label>
    `
  }
}
