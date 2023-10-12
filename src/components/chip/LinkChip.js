import { html, LitElement } from "lit"
import { defineElement } from "../../lib/defineElement.js"
import styles from "./chip.css"

import { LeuBaseChip } from "./Chip.js"

const SIZES = {
  small: "small",
  regular: "regular",
}

/**
 * @tagname leu-chip
 */
export class LeuLinkChip extends LeuBaseChip {
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

export function defineChipElements() {
  defineElement("chip", LeuLinkChip)
}
