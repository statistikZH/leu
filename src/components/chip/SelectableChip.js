import { html, LitElement, nothing } from "lit"
import { defineElement } from "../../lib/defineElement.js"
import styles from "./chip.css"

import { LeuBaseChip } from "./Chip.js"

const SIZES = {
  small: "small",
  regular: "regular",
}

const VARIANTS = {
  default: "default",
  radio: "radio",
}

/**
 * @tagname leu-chip
 */
export class LeuSelectableChip extends LitElement {
  static styles = styles

  /** @internal */
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  }

  static properties = {
    /**
     * @type {("small"|"regular")}
     */
    size: { type: String },

    /**
     * @type {("default"|"radio")}
     */
    variant: { type: String },

    selected: { type: Boolean, reflect: true },
  }

  constructor() {
    super()

    this.inverted = false
    this.size = SIZES.regular
    this.variant = VARIANTS.toggle
    this.selected = false
  }

  renderRemoveIcon() {
    if (this.variant === VARIANTS.removeable) {
      return html`<div class="icon">${this._removeIcon}</div>`
    }

    return nothing
  }

  handleClick() {
    this.selected = !this.selected
  }

  render() {
    return html`<button
      @click=${(e) => this.handleClick(e)}
      class="button"
      ?aria-selected=${this.selected}
    >
      <span class="label"><slot></slot></span>
    </button>`
  }
}

export function defineChipElements() {
  defineElement("chip", LeuSelectableChip)
}
