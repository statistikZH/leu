import { html, PropertyValues } from "lit"
import { property } from "lit/decorators.js"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./tab-panel.css?inline"

let nextId = 1

/**
 * Tab Panel
 *
 * @tagname leu-tab-panel
 * @fires leu:show-tab-panel - Fired when a tab panel is shown
 */
export class LeuTabPanel extends LeuElement {
  static styles = [LeuElement.styles, styles]

  protected readonly componentId = `leu-tab-panel-${nextId++}`

  /**
   * Name of the tab. Apply the same name to the corresponding tab button to link them together.
   * Has to be unique within the tab component.
   */
  @property({ type: String, reflect: true })
  name = ""

  @property({ type: Boolean, reflect: true })
  active = false

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute("role", "tabpanel")
    this.tabIndex = 0
    // Set an id if not already provided. The id is used by the tab-group
    // to set the aria-controls attribute on the corresponding tab button.
    this.id = this.id.length > 0 ? this.id : this.componentId
  }

  protected updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("active")) {
      this.ariaHidden = this.active ? "false" : "true"

      if (this.active) {
        this.dispatchEvent(
          new CustomEvent("leu:show-tab-panel", {
            detail: { name: this.name },
            bubbles: true,
            composed: true,
          }),
        )
      }
    }
  }

  render() {
    return html`<slot></slot>`
  }
}
