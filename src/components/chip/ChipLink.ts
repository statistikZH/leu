import { html } from "lit"
import { property } from "lit/decorators.js"

import { LeuChipBase } from "./Chip.js"

/**
 * @tagname leu-chip-link
 * @slot - The content of the chip
 */
export class LeuChipLink extends LeuChipBase {
  /** The size of the chip */
  @property({ type: String, reflect: true })
  size: "regular" | "large" = "regular"

  /** The URL that the chip links to */
  @property({ type: String, reflect: true })
  href: string = ""

  render() {
    return html`<a href=${this.href} class="button">
      <span class="label"><slot></slot></span>
    </a>`
  }
}
