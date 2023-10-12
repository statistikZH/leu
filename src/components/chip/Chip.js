import { html, LitElement, nothing } from "lit"
import { defineElement } from "../../lib/defineElement.js"
import styles from "./chip.css"

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
export class LeuBaseChip extends LitElement {
  static styles = styles

  /** @internal */
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  }

  static properties = {
    inverted: { type: Boolean },
  }

  constructor() {
    super()

    this.inverted = false
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
  defineElement("chip", LeuBaseChip)
}
