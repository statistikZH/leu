import { html, PropertyValues } from "lit"
import { property } from "lit/decorators.js"
import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./tab-button.css?inline"

/**
 * Tab Button.
 *
 * @prop {string} name - Name to link Button and Panel together
 * @prop {boolean} active - Is active
 * @prop {boolean} disabled - Not clickable
 *
 * @tagname leu-tab-button
 */
export class LeuTabButton extends LeuElement {
  static styles = [LeuElement.styles, styles]

  @property({ type: String, reflect: true })
  name = ""

  @property({ type: Boolean, reflect: true })
  active = false

  @property({ type: Boolean, reflect: true })
  disabled = false

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute("role", "tab")
    this.addEventListener("click", this.handleClick)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener("click", this.handleClick)
  }

  handleClick() {
    if (this.disabled || this.active) {
      return
    }

    this.active = true
    this.dispatchEvent(
      new CustomEvent("leu:tab-select", {
        detail: { name: this.name },
        bubbles: true,
        composed: true,
      }),
    )
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("active") || changedProperties.has("disabled")) {
      this.ariaSelected = this.active ? "true" : "false"
      this.tabIndex = this.active && !this.disabled ? 0 : -1
    }
  }

  render() {
    return html`<span class="label"><slot></slot></span>`
  }
}
