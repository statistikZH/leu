import { html, LitElement } from "lit"
import styles from "./dropdown.css"

import "../button/leu-button.js"
import "../menu/leu-menu.js"
import "../menu/leu-menu-item.js"
import "../popup/leu-popup.js"

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

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener("keyup", this._keyUpHandler)
    document.addEventListener("click", this._documentClickHandler)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this._removeMenuItemListeners()
    this.removeEventListener("keyup", this._keyUpHandler)
    document.removeEventListener("click", this._documentClickHandler)
  }

  _documentClickHandler = (event) => {
    if (!this.contains(event.target)) {
      this.expanded = false
    }
  }

  _keyUpHandler(event) {
    if (event.key === "Escape") {
      this.expanded = false
    }
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
      <leu-popup
        ?active=${this.expanded}
        placement="bottom-start"
        shift
        shiftPadding="8"
        autoSize="width"
        autoSizePadding="8"
      >
        <leu-button
          class="button"
          slot="anchor"
          icon="download"
          variant="ghost"
          expanded=${this.expanded ? "true" : "false"}
          aria-expanded=${this.expanded ? "true" : "false"}
          aria-controls="content"
          ?active=${this.expanded}
          @click=${this._handleToggleClick}
          >${this.label}</leu-button
        >
        <div id="content" class="content" ?hidden=${!this.expanded}>
          <slot @slotchange=${this._handleSlotChange}></slot>
        </div>
      </leu-popup>
    `
  }
}
