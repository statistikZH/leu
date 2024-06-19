import { html } from "lit"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./menu.css"

/**
 * @typedef {'single' | 'multiple' | 'none'} SelectsType
 */

/**
 * @tagname leu-menu
 */
export class LeuMenu extends LeuElement {
  static styles = styles

  static properties = {
    selects: { type: String, reflect: true },
  }

  constructor() {
    super()

    /** @type {SelectsType} */
    this.selects = "none"
  }

  connectedCallback() {
    super.connectedCallback()

    if (!this.getAttribute("role")) {
      this.setAttribute("role", "menu")
    }

    this.addEventListener("keydown", this._handleKeyDown)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener("keydown", this._handleKeyDown)
  }

  _handleSlotChange() {
    this.setCurrentItem(0)
    this._setMenuItemRoles()
  }

  _setMenuItemRoles() {
    const menuRole = this.getAttribute("role")
    let menuItemRole

    if (menuRole === "menu") {
      if (this.selects === "multiple") {
        menuItemRole = "menuitemcheckbox"
      } else if (this.selects === "single") {
        menuItemRole = "menuitemradio"
      } else {
        menuItemRole = "menuitem"
      }
    } else if (menuRole === "listbox") {
      menuItemRole = "option"
    }

    if (menuItemRole) {
      this.getMenuItems().forEach((menuItem) => {
        menuItem.componentRole = menuItemRole // eslint-disable-line no-param-reassign
      })
    }
  }

  /**
   *
   * @returns {import("./MenuItem").LeuMenuItem[]}
   */
  getMenuItems() {
    const slot = this.shadowRoot.querySelector("slot")
    return slot
      .assignedElements({ flatten: true })
      .filter((el) => el.tagName.toLowerCase() === "leu-menu-item")
  }

  _handleKeyDown(event) {
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      const menuItems = this.getMenuItems()
      let index = menuItems.findIndex((menuItem) => menuItem.tabIndex === 0)

      if (event.key === "ArrowDown") {
        index += 1
      } else if (event.key === "ArrowUp") {
        index -= 1
      } else if (event.key === "Home") {
        index = 0
      } else if (event.key === "End") {
        index = menuItems.length - 1
      }

      // When the index is out of bounds, it will wrap around to allow
      // circular navigation
      index = (index + menuItems.length) % menuItems.length

      this.setCurrentItem(index)
      menuItems[index].focus()
    }
  }

  setCurrentItem(index) {
    this.getMenuItems().forEach((menuItem, i) => {
      menuItem.tabIndex = i === index ? 0 : -1 // eslint-disable-line no-param-reassign
    })
  }

  updated(changedProperties) {
    if (changedProperties.has("selects")) {
      this._setMenuItemRoles()
    }
  }

  render() {
    return html`<slot></slot>`
  }
}
