import { html } from "lit"
import { property } from "lit/decorators.js"

import { LeuChipBase } from "./Chip.js"

/**
 * A chip component that can be selected.
 * @tagname leu-chip-selectable
 * @slot - The content of the chip
 */
export class LeuChipSelectable extends LeuChipBase {
  static properties = {
    ...LeuChipBase.properties,
    size: { type: String, reflect: true },
    variant: { type: String, reflect: true },

    checked: { type: Boolean, reflect: true },
    value: { type: String, reflect: true },
  }

  /** The size of the chip. Has no effect when variant is "radio" */
  @property({ type: String, reflect: true })
  size: "small" | "regular" = "regular"

  /**
   * The variant of the chip. Determines if only one or multiple chips can be selected.
   * @default "toggle"
   */
  @property({ type: String, reflect: true })
  variant: "toggle" | "radio" = "toggle"

  /** Whether the chip is selected */
  @property({ type: Boolean, reflect: true })
  checked: boolean = false

  /** The value of the chip */
  @property({ type: String, reflect: true })
  value: string = ""

  constructor() {
    super()

    if (this.variant === "radio" && this.size === "small") {
      console.warn("Small size has no effect on radio variant")
    }
  }

  protected handleClick() {
    let nextcheckedState = this.checked

    if (this.variant === "radio") {
      nextcheckedState = true
    } else {
      nextcheckedState = !this.checked
    }

    if (nextcheckedState !== this.checked) {
      this.checked = nextcheckedState
      this.dispatchEvent(
        new CustomEvent("input", {
          detail: {
            checked: this.checked,
            value: this.getValue(),
          },
          bubbles: true,
          composed: true,
        }),
      )
    }
  }

  /**
   * Returns the value of the chip. If `value` is not set, it will return the text content
   * @returns {string}
   */
  getValue() {
    return this.value || this.textContent.trim()
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
