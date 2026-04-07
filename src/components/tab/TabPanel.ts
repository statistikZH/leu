import { html, PropertyValues } from "lit"
import { property } from "lit/decorators.js"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./tab-panel.css?inline"

/**
 * Tab Panel
 *
 * @tagname leu-tab-panel
 */
export class LeuTabPanel extends LeuElement {
  static styles = [LeuElement.styles, styles]

  /**
   * Name of the tab. Apply the same name to the corresponding tab button to link them together.
   * Has to be unique within the tab component.
   */
  @property({ type: String })
  name = ""

  @property({ type: Boolean, reflect: true })
  active = false

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute("role", "tabpanel")
    this.setAttribute("id", this.name)
    this.tabIndex = 0
  }

  protected updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("active")) {
      this.ariaHidden = this.active ? "false" : "true"
    }
  }

  render() {
    return html`<slot></slot>`
  }
}
