import { html } from "lit"

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
  static properties = {
    ...LeuChipBase.properties,

    /**
     * The size of the chip
     * @type {keyof typeof SIZES}
     */
    size: { type: String, reflect: true },
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
      <span class="label">${this.label}</span>
    </a>`
  }
}
