import { defineElement } from "../../lib/defineElement.js"

import { LeuBaseChip } from "./Chip.js"

import { Icon } from "../icon/icon.js"

export class LeuRemovableChip extends LeuBaseChip {
  static properties = {
    inverted: { type: Boolean },
  }

  constructor() {
    super()

    this.inverted = false

    /** @private */
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
    return html`<button
      @click=${(e) => this.handleClick(e)}
      class="button"
      ?aria-selected=${this.selected}
    >
      <span class="label"><slot></slot></span>
      <div class="icon">${this._removeIcon}</div>
    </button>`
  }
}

export function defineChipElements() {
  defineElement("removable-chip", LeuRemovableChip)
}
