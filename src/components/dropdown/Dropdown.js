import { html, LitElement } from "lit"
import styles from "./dropdown.css"

import "../button/leu-button.js"
import "../menu/leu-menu.js"
import "../menu/leu-menu-item.js"

/**
 * @tagname leu-dropdown
 */
export class LeuDropdown extends LitElement {
  static styles = styles

  static properties = {
    label: { type: String, reflect: true },
    expanded: { type: Boolean, reflect: true },
  }

  constructor() {
    super()

    this.label = ""
    this.expanded = false
    this.menuItems = []
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this._removeMenuItemListeners()
  }

  _handleSlotChange() {
    this._removeMenuItemListeners()
    this.menuItems = [...this.querySelectorAll("leu-menu > leu-menu-item")]

    this.menuItems.forEach((item) =>
      item.addEventListener("click", this._handleMenuItemClick)
    )
  }

  _removeMenuItemListeners() {
    this.menuItems.forEach((item) => {
      item.removeEventListener("click", this._handleMenuItemClick)
    })
  }

  _handleMenuItemClick = () => {
    this.expanded = false
  }

  _handleToggleClick() {
    this.expanded = !this.expanded
  }

  render() {
    return html`
      <leu-button
        icon="download"
        variant="ghost"
        label=${this.label}
        expanded=${this.expanded ? "open" : "closed"}
        aria-expanded=${this.expanded ? "true" : "false"}
        aria-controls="content"
        ?active=${this.expanded}
        @click=${this._handleToggleClick}
      ></leu-button>
      <div id="content" class="content" ?hidden=${!this.expanded}>
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `
  }
}
