import { html, LitElement } from "lit"
import { defineElement } from "../../lib/defineElement.js"

import { LeuChipBase } from "./Chip.js"

const SIZES = {
  small: "small",
  regular: "regular",
}

const VARIANTS = {
  default: "default",
  radio: "radio",
}

/**
 * @tagname leu-chip-selectable
 */
export class LeuChipSelectable extends LeuChipBase {
  static styles = LeuChipBase.styles

  /** @internal */
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  }

  static properties = {
    ...LeuChipBase.properties,
    /**
     * @type {("small"|"regular")}
     */
    size: { type: String },

    /**
     * @type {("default"|"radio")}
     */
    variant: { type: String },

    selected: { type: Boolean, reflect: true },
    name: { type: String },
  }

  constructor() {
    super()
    this.size = SIZES.regular
    this.variant = VARIANTS.toggle
    this.selected = false

    if (this.variant === VARIANTS.radio && this.size === SIZES.small) {
      console.warn("Small size has no effect on radio variant")
    }
  }

  handleClick() {
    let nextSelectedState = this.selected

    if (this.variant === VARIANTS.radio) {
      nextSelectedState = true
    } else {
      nextSelectedState = !this.selected
    }

    if (nextSelectedState !== this.selected) {
      this.selected = nextSelectedState
      this.dispatchEvent(
        new CustomEvent("selected-changed", {
          detail: { selected: this.selected },
          bubbles: true,
          composed: true,
        })
      )
    }
  }

  render() {
    return html`<button
      @click=${(e) => this.handleClick(e)}
      class="button"
      aria-selected=${this.selected ? "true" : "false"}
    >
      <span class="label"><slot></slot></span>
    </button>`
  }
}

export function defineChipSelectableElements() {
  defineElement("chip-selectable", LeuChipSelectable)
}
