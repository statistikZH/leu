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
    selected: { type: String, reflect: true },
  }

  constructor() {
    super()
    /** @type {Array} */
    this.items = []
    /** @type {string} */
    this.selected = null
  }

  render() {
    return html`
      <div role="group">
        ${this.items.map(
          (item) =>
            html`
              <leu-button
                label=${item}
                variant=${this.selected === item ? "primary" : "secondary"}
                @click=${() => {
                  this.selected = item
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
