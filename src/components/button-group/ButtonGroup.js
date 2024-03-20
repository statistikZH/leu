import { html, LitElement } from "lit"
import styles from "./button-group.css"
import "../button/leu-button.js"

/**
 * @tagname leu-button-group
 */
export class LeuButtonGroup extends LitElement {
  static styles = styles

  static properties = {
    items: { type: Array, reflect: true },
    value: { type: String, reflect: true },
  }

  constructor() {
    super()
    /** @type {Array} */
    this.items = []
    /** @type {string} */
    this.value = null
  }

  _setValue(newValue) {
    this.value = newValue

    this.dispatchEvent(
      new CustomEvent("input", {
        bubbles: true,
        composed: true,
        detail: { value: newValue },
      })
    )
  }

  render() {
    return html`
      <div role="menubar" class="group">
        ${this.items.map(
          (item) =>
            html`
              <leu-button
                variant=${this.value === item ? "primary" : "secondary"}
                @click=${() => {
                  this._setValue(item)
                }}
                role="menuitemradio"
                aria-checked=${this.value === item}
              >
                ${item}
              </leu-button>
            `
        )}
      </div>
    `
  }
}
