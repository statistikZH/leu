import { html } from "lit"

import { LeuChipBase } from "./Chip.js"

export const SIZES = {
  small: "small",
  regular: "regular",
}

export const VARIANTS = {
  toggle: "toggle",
  radio: "radio",
}

/**
 * A chip component that can be selected.
 * @tagname leu-chip-selectable
 * @slot - The content of the chip
 * @prop {keyof typeof SIZES} size - The size of the chip. Not supported for radio variant.
 * @prop {keyof typeof VARIANTS} variant - `toggle` or `radio`. Determines if only one or multiple chips can be selected.
 * @prop {boolean} checked - Whether the chip is selected.
 * @prop {string} value - The value of the chip.
 */
export class LeuChipSelectable extends LeuChipBase {
  static properties = {
    ...LeuChipBase.properties,
    size: { type: String, reflect: true },
    variant: { type: String, reflect: true },

    checked: { type: Boolean, reflect: true },
    value: { type: String, reflect: true },
  }

  constructor() {
    super()
    this.size = SIZES.regular

    /**
     * The variant of the chip. Has an effect not only on the visual appearance but also on the behavior.
     * - `toggle`: The chip behaves like a toggle button.
     * - `radio`: The chip behaves like a radio button.
     * @default "toggle"
     */
    this.variant = VARIANTS.toggle
    this.checked = false

    if (this.variant === VARIANTS.radio && this.size === SIZES.small) {
      console.warn("Small size has no effect on radio variant")
    }
  }

  handleClick() {
    let nextcheckedState = this.checked

    if (this.variant === VARIANTS.radio) {
      nextcheckedState = true
    } else {
      nextcheckedState = !this.checked
    }

    if (nextcheckedState !== this.checked) {
      this.checked = nextcheckedState
      this.dispatchEvent(
        new CustomEvent("input", {
          detail: { checked: this.checked },
          bubbles: true,
          composed: true,
        })
      )
    }
  }

  render() {
    return html`<button
      @click=${() => this.handleClick()}
      class="button"
      aria-pressed=${this.checked ? "true" : "false"}
    >
      <span class="label"><slot></slot></span>
    </button>`
  }
}
