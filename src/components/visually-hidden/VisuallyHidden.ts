import { html } from "lit"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./visually-hidden.css"

/**
 * @tagname leu-visually-hidden
 */
export class LeuVisuallyHidden extends LeuElement {
  static styles = [LeuElement.styles, styles]

  render() {
    return html`<slot></slot>`
  }
}
