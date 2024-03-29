import { html } from "lit"

import { LeuChipBase } from "./Chip.js"
import { Icon } from "../icon/icon.js"

/**
 * @slot - The content of the chip
 * @tagname leu-chip-removable
 * @fires remove - Dispatched when the user clicks on the chip
 */
export class LeuChipRemovable extends LeuChipBase {
  static properties = {
    ...LeuChipBase.properties,
  }

  constructor() {
    super()

    /** @internal */
    this._removeIcon = Icon("close", 16)
  }

  handleClick() {
    const customEvent = new CustomEvent("leu:remove", {
      bubble: true,
      composed: true,
    })
    this.dispatchEvent(customEvent)
  }

  render() {
    return html`<button @click=${(e) => this.handleClick(e)} class="button">
      <span class="label">${this.label}</span>
      <div class="icon">${this._removeIcon}</div>
    </button>`
  }
}
