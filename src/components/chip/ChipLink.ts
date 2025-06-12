import { html } from "lit"

import { LeuChipBase } from "./Chip.js"

export const SIZES = {
  regular: "regular",
  large: "large",
}

/**
 * @tagname leu-chip-link
 * @slot - The content of the chip
 * @prop {keyof typeof SIZES} size - The size of the chip
 */
export class LeuChipLink extends LeuChipBase {
  static properties = {
    ...LeuChipBase.properties,
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
      <span class="label"><slot></slot></span>
    </a>`
  }
}
