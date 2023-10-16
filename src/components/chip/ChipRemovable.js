import { html } from "lit"
import { defineElement } from "../../lib/defineElement.js"

import { LeuChipBase } from "./Chip.js"
import { Icon } from "../icon/icon.js"

/**
 * @slot - The content of the chip
 * @tagname leu-chip-removable
 */
export class LeuChipRemovable extends LeuChipBase {
  static styles = LeuChipBase.styles

  static properties = {
    ...LeuChipBase.properties,
  }

  constructor() {
    super()

    /** @internal */
    this._removeIcon = Icon("close", 16)
  }

  handleClick() {
    const customEvent = new CustomEvent("remove", {
      bubble: true,
      composed: true,
    })
    this.dispatchEvent(customEvent)
  }

  render() {
    return html`<button @click=${(e) => this.handleClick(e)} class="button">
      <span class="label"><slot></slot></span>
      <div class="icon">${this._removeIcon}</div>
    </button>`
  }
}

export function defineChipRemovableElements() {
  defineElement("chip-removable", LeuChipRemovable)
}
