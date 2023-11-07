import { html, LitElement } from "lit"
import { defineElement } from "../../lib/defineElement.js"
import styles from "./button-group.css"
import { defineButtonElements } from "../button/Button.js"

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
      <div role="group">
        ${this.items.map(
          (item) =>
            html`
              <leu-button
                label=${item}
                variant=${this.value === item ? "primary" : "secondary"}
                @click=${() => {
                  this._setValue(item)
                }}
                role="menuitem"
              >
              </leu-button>
            `
        )}
      </div>
    `
  }
}

export function defineButtonGroupElements() {
  defineButtonElements()
  defineElement("button-group", LeuButtonGroup)
}
