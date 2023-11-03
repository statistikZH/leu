import { html, LitElement } from "lit"
import { defineElement } from "../../lib/defineElement.js"
import styles from "./menu.css"

/**
 * @tagname leu-menu
 */
export class LeuMenu extends LitElement {
  static styles = styles

  render() {
    return html`<slot></slot>`
  }
}

export function defineMenuElements() {
  defineElement("menu", LeuMenu)
}
