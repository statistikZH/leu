import { html, LitElement } from "lit"
import { defineElement } from "../../lib/defineElement.js"
import styles from "./menu.css"

/**
 * @tagname leu-menu
 */
export class LeuMenu extends LitElement {
  static styles = styles

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  }

  static properties = {
    label: { type: String },
    before: { type: String },
    after: { type: String },
  }

  constructor() {
    super()
  }

  render() {
    return html` <p>Hello ${this.tagName}</p> `
  }
}

export function defineMenuElements() {
  defineElement("menu", LeuMenu)
}
