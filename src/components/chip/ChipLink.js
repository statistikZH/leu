import { html } from "lit"
import { defineElement } from "../../lib/defineElement.js"
import styles from "./chip.css"

import { LeuChipBase } from "./Chip.js"

const SIZES = {
  small: "small",
  regular: "regular",
}

/**
 * @tagname leu-chip-link
 */
export class LeuChipLink extends LeuChipBase {
  static styles = styles

  static properties = {
    inverted: { type: Boolean },

    /**
     * @type {("small"|"regular")}
     */
    size: { type: String },

    href: { type: String },
  }

  constructor() {
    super()

    this.inverted = false
    this.size = SIZES.regular
  }

  render() {
    return html`<a href=${this.href} class="button">
      <span class="label"><slot></slot></span>
      ${this.renderRemoveIcon()}
    </button>`
  }
}

export function defineChipLinkElements() {
  defineElement("chip-link", LeuChipLink)
}
