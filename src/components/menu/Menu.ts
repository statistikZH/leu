import { html, PropertyValues } from "lit"
import { property } from "lit/decorators.js"

import { LeuElement } from "../../lib/LeuElement.js"

import { LeuMenuItem } from "./MenuItem.js"

import styles from "./menu.css?inline"

/**
 * @typedef {'single' | 'multiple' | 'none'} SelectsType
 */

/**
 * @tagname leu-menu
 * @property {SelectsType} selects - This has only an effect when the role is 'menu'. It defines which role the menu items will get. Default is 'none'.
 */
export class LeuMenu extends LeuElement {
  static styles = [LeuElement.styles, styles]

  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  @property({ type: String, reflect: true })
  selects: "single" | "multiple" | "none" = "none"

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
      .filter((el) => el instanceof LeuMenuItem)
  }

  getVisibleMenuItems() {
    return this.getMenuItems().filter((menuItem) => !menuItem.hidden)
  }

  _handleKeyDown(event) {
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault()

      const menuItems = this.getVisibleMenuItems()
      let index = menuItems.findIndex((menuItem) => menuItem.tabbable)

      if (event.key === "ArrowDown") {
        index += 1
      } else if (event.key === "ArrowUp") {
        index -= 1
      } else if (event.key === "Home") {
        index = 0
      } else if (event.key === "End") {
        index = menuItems.length - 1
      }

      this.focusItem(index)
    }
  }

  setCurrentItem(index) {
    const menuItems = this.getVisibleMenuItems()
    let currentItem = null

    const currentItemIndex = (index + menuItems.length) % menuItems.length

    menuItems.forEach((menuItem, i) => {
      if (i === currentItemIndex) {
        currentItem = menuItem
        menuItem.tabbable = true // eslint-disable-line no-param-reassign
      } else {
        menuItem.tabbable = false // eslint-disable-line no-param-reassign
      }
    })

    return currentItem
  }

  focusItem(index) {
    const currentItem = this.setCurrentItem(index)

    currentItem?.focus()
  }

  firstUpdated() {
    this.setCurrentItem(0)
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("selects")) {
      this._setMenuItemRoles()
    }
  }

  render() {
    return html`
      <div class="container">
        <slot></slot>
      </div>
    `
  }
}
