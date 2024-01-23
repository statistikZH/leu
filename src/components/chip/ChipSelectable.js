import { html } from "lit"

import { LeuChipBase } from "./Chip.js"

export const SIZES = {
  small: "small",
  regular: "regular",
}

export const VARIANTS = {
  default: "default",
  radio: "radio",
}

/**
 * A chip component that can be selected.
 * @slot - The content of the chip
 * @tagname leu-chip-selectable
 */
export class LeuChipSelectable extends LeuChipBase {
  static properties = {
    ...LeuChipBase.properties,

    /**
     * The size of the chip. Not supported for radio variant.
     * @type {keyof typeof SIZES}
     * @default "regular"
     */
    size: { type: String, reflect: true },

    /**
     * The variant of the chip. Has an effect not only on the visual appearance but also on the behavior.
     * - `default`: The chip behaves like a toggle button.
     * - `radio`: The chip behaves like a radio button.
     *
     * @type {keyof typeof VARIANTS}
     * @default "default"
     */
    variant: { type: String, reflect: true },

    selected: { type: Boolean, reflect: true },
    value: { type: String, reflect: true },
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
        new CustomEvent("input", {
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
      <span class="label">${this.label}</span>
    </button>`
  }
}
