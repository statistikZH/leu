import { html, LitElement } from "lit"
import { createRef, ref } from "lit/directives/ref.js"

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

    /** @type {import("lit/directives/ref").Ref<HTMLButtonElement>} */
    this._toggleRef = createRef()
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener("keyup", this._keyUpHandler)
    document.addEventListener("click", this._documentClickHandler)

    const menu = this._getMenu()

    menu.addEventListener("keydown", this._keyDownMenuHandler)
    menu.addEventListener("click", this._menuItemClickHandler)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener("keyup", this._keyUpHandler)
    document.removeEventListener("click", this._documentClickHandler)

    const menu = this._getMenu()

    menu.removeEventListener("keydown", this._keyDownMenuHandler)
    menu.removeEventListener("click", this._menuItemClickHandler)
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

  async _keyUpToggleHandler(event) {
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      const menu = this._getMenu()
      const menuItems = menu.getMenuItems()

      this.expanded = true

      await this.updateComplete

      if (event.key === "ArrowDown" || event.key === "Home") {
        menu.setCurrentItem(0)
        menuItems[0].focus()
      } else if (event.key === "ArrowUp" || event.key === "End") {
        menu.setCurrentItem(menuItems.length - 1)
        menuItems[menuItems.length - 1].focus()
      }
    }
  }

  _menuItemClickHandler = (e) => {
    if (e.target.tagName.toLowerCase() === "leu-menu-item") {
      this.expanded = false
      this._toggleRef.value.focus()
    }
  }

  /**
   * Close the dropdown when the user presses the Escape or the Tab key.
   * Navigating the menu with the arrow keys is handled by the menu itself.
   * @param {KeyboardEvent} e
   */
  _keyDownMenuHandler = (e) => {
    if (e.key === "Escape" || e.key === "Tab") {
      e.preventDefault()
      this.expanded = false
      this._toggleRef.value.focus()
    }
  }

  _handleToggleClick() {
    this.expanded = !this.expanded
  }

  /**
   * @returns {import("../menu/Menu").LeuMenu}
   */
  _getMenu() {
    return this.querySelector("leu-menu")
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
          ref=${ref(this._toggleRef)}
          class="button"
          slot="anchor"
          variant="ghost"
          expanded=${this.expanded ? "true" : "false"}
          ?active=${this.expanded}
          @click=${this._handleToggleClick}
          @keyup=${this._keyUpToggleHandler}
        >
          <leu-icon name="download" slot="before"></leu-icon>${this
            .label}</leu-button
        >
        <div id="content" class="content" ?hidden=${!this.expanded}>
          <slot @slotchange=${this._handleSlotChange}></slot>
        </div>
      </leu-popup>
    `
  }
}
