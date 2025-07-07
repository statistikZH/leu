import { html } from "lit"
import { property } from "lit/decorators.js"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./tab-panel.css"

/**
 * Tab Panel
 *
 * @prop {string} name - Name to link Button and Panel together
 *
 * @tagname leu-tab-panel
 */
export class LeuTabPanel extends LeuElement {
  static styles = [LeuElement.styles, styles]

  @property({ type: String })
  name = ""

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute("role", "tabpanel")
    this.setAttribute("id", this.name)
  }

  render() {
    return html` <slot></slot> `
  }
}
