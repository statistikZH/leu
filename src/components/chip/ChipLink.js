import { html } from "lit"
import { defineElement } from "../../lib/defineElement.js"

import { LeuChipBase } from "./Chip.js"

export const SIZES = {
  regular: "regular",
  large: "large",
}

/**
 * @slot - The content of the chip
 * @tagname leu-chip-link
 */
export class LeuChipLink extends LeuChipBase {
  static styles = LeuChipBase.styles

  static properties = {
    ...LeuChipBase.properties,

    /**
     * The size of the chip
     * @type {keyof typeof SIZES}
     */
    size: { type: String },

    href: { type: String, reflect: true },
  }

  constructor() {
    super()

    this.inverted = false
    this.size = SIZES.regular
    this.href = ""
  }

  render() {
    return html`<a href=${this.href} class="button">
      <span class="label"><slot></slot></span>
    </a>`
  }
}

export function defineChipLinkElements() {
  defineElement("chip-link", LeuChipLink)
}
