import { html, PropertyValues } from "lit"
import { property } from "lit/decorators.js"
import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./tab.css?inline"

let nextId = 1

/**
 * Tab Button.
 *
 * @prop {string} name - Name to link Button and Panel together
 * @prop {boolean} active - Is active
 *
 * @tagname leu-tab
 */
export class LeuTab extends LeuElement {
  static styles = [LeuElement.styles, styles]

  protected readonly componentId = `leu-tab-${nextId++}`

  /**
   * Name of the tab. Apply the same name to the corresponding panel to link them together.
   * Has to be unique within the tab component.
   */
  @property({ type: String, reflect: true })
  name = ""

  @property({ type: Boolean, reflect: true })
  active = false

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute("role", "tab")
    this.addEventListener("click", this.handleClick)
    // Set an id if not already provided. The id is used by the tab-group
    // to set the aria-controls / aria-labelledby attributes.
    this.id = this.id.length > 0 ? this.id : this.componentId
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener("click", this.handleClick)
  }

  handleClick() {
    if (this.active) {
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
    if (changedProperties.has("active")) {
      this.ariaSelected = this.active ? "true" : "false"
      this.tabIndex = this.active ? 0 : -1
    }
  }

  render() {
    return html`<span class="label"><slot></slot></span>`
  }
}
