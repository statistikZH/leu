import { html } from "lit"
import { property } from "lit/decorators.js"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./menu-label.css"

/**
 * @summary A label to discribe a group of `leu-menu-item` elements inside a `leu-menu`.
 * @tagname leu-menu-label
 * @slot - The menu label's content.
 */
export class LeuMenuLabel extends LeuElement {
  static styles = [LeuElement.styles, styles]

  @property({ type: Boolean, reflect: true })
  indented = false

  render() {
    return html`<slot class="label"></slot>`
  }
}
