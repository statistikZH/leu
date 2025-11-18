import { html, nothing } from "lit"
import { createRef, ref } from "lit/directives/ref.js"

import { LeuElement } from "../../lib/LeuElement.js"
import { HasSlotController } from "../../lib/hasSlotController.js"

import { LeuButton } from "../button/Button.js"
import { LeuMenu } from "../menu/Menu.js"
import { LeuMenuItem } from "../menu/MenuItem.js"
import { LeuPopup } from "../popup/Popup.js"

import styles from "./dropdown.css"

/**
 * @tagname leu-dropdown
 */
export class LeuDropdown extends LeuElement {
  static dependencies = {
    "leu-button": LeuButton,
    "leu-menu": LeuMenu,
    "leu-menu-item": LeuMenuItem,
    "leu-popup": LeuPopup,
  }

  static styles = [LeuElement.styles, styles]

  static properties = {
    label: { type: String, reflect: true },
    expanded: { type: Boolean, reflect: true },
    inverted: { type: Boolean, reflect: true },
  }

  hasSlotController = new HasSlotController(this, ["icon"])

  constructor() {
    super()

    this.label = ""
    this.expanded = false
    this.inverted = false

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
    if (!event.composedPath().includes(this)) {
      this.expanded = false
    }
  }

  _keyUpHandler(event) {
    if (event.key === "Escape") {
      this.expanded = false
    }
  }

  async _keyDownToggleHandler(event) {
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault()
      const menu = this._getMenu()

      this.expanded = true

      await this.updateComplete

      if (event.key === "ArrowDown" || event.key === "Home") {
        menu.focusItem(0)
      } else if (event.key === "ArrowUp" || event.key === "End") {
        menu.focusItem(-1)
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
    const hasIcon = this.hasSlotController.test("icon")
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
          ?inverted=${this.inverted}
          @click=${this._handleToggleClick}
          @keydown=${this._keyDownToggleHandler}
        >
          ${hasIcon ? html`<slot name="icon" slot="before"></slot>` : nothing}
          ${this.label}</leu-button
        >
        <div id="content" class="content" ?hidden=${!this.expanded}>
          <slot></slot>
        </div>
      </leu-popup>
    `
  }
}
