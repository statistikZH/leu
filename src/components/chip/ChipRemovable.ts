import { html } from "lit"
import { property } from "lit/decorators.js"

import { LeuChipBase } from "./Chip.js"
import { LeuIcon } from "../icon/Icon.js"

/**
 * @slot - The content of the chip
 * @tagname leu-chip-removable
 * @fires remove - Dispatched when the user clicks on the chip
 * @prop {string} value - The value of the chip.
 */
export class LeuChipRemovable extends LeuChipBase {
  static dependencies = {
    "leu-icon": LeuIcon,
  }

  @property({ type: String, reflect: true })
  value: string = ""

  /**
   * Returns the value of the chip. If `value` is not set, it will return the text content
   */
  getValue() {
    return this.value || this.textContent.trim()
  }

  protected handleClick() {
    const customEvent = new CustomEvent("leu:remove", {
      bubbles: true,
      composed: true,
      detail: {
        value: this.getValue(),
      },
    })
    this.dispatchEvent(customEvent)
  }

  render() {
    return html`<button @click=${(e) => this.handleClick(e)} class="button">
      <span class="label"><slot></slot></span>
      <leu-icon name="close" class="icon"></leu-icon>
    </button>`
  }
}
