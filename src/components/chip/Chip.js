import { html, LitElement, nothing } from "lit"
import { defineElement } from "../../lib/defineElement.js"
import styles from "./chip.css"

import { Icon } from "../icon/icon.js"

const SIZES = {
  small: "small",
  regular: "regular",
}

const VARIANTS = {
  toggle: "toggle",
  radio: "radio",
  removeable: "removeable",
}

/**
 * @tagname leu-chip
 */
export class LeuChip extends LitElement {
  static styles = styles

  /** @internal */
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  }

  static properties = {
    inverted: { type: Boolean },

    /**
     * @type {("small"|"regular")}
     */
    size: { type: String },

    /**
     * @type {("toggle"|"radio"|"removeable")}
     */
    variant: { type: String },

    href: { type: String },
    selected: { type: Boolean, reflect: true },
  }

  constructor() {
    super()

    this.inverted = false
    this.size = SIZES.regular
    this.variant = VARIANTS.toggle
    this.selected = false

    /** @private */
    this._removeIcon = Icon("close", 16)
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
      ${this.renderRemoveIcon()}
    </button>`
  }
}

export function defineChipElements() {
  defineElement("chip", LeuChip)
}
