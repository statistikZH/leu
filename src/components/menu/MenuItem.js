import { html, LitElement, nothing } from "lit"
import { defineElement } from "../../lib/defineElement.js"
import styles from "./menu-item.css"

import { Icon, ICON_NAMES } from "../icon/icon.js"

/**
 * @tagname leu-menu-item
 * @slot - The label of the menu item
 */
export class LeuMenuItem extends LitElement {
  static styles = styles

  /**
   * @internal
   */
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  }

  static properties = {
    /**
     * Can be either an icon name or a text
     * If no icon with this value is found, it will be displayed as text
     */
    before: { type: String },
    /**
     * Can be either an icon name or a text
     * If no icon with this value is found, it will be displayed as text
     */
    after: { type: String },
    active: { type: Boolean, reflect: true },
  }

  constructor() {
    super()

    this.active = false
    this.before = ""
    this.after = ""
  }

  static getIconOrText(name) {
    console.log("getIconOrText", name)
    if (ICON_NAMES.includes(name)) {
      return Icon(name)
    }

    return name
  }

  renderBefore() {
    if (this.before !== "") {
      return LeuMenuItem.getIconOrText(this.before)
    }

    return nothing
  }

  renderAfter() {
    if (this.after !== "") {
      return LeuMenuItem.getIconOrText(this.after)
    }

    return nothing
  }

  render() {
    return html`<button class="button">
      ${this.renderBefore()}<slot></slot>${this.renderAfter()}
    </button>`
  }
}

export function defineMenuItemElements() {
  defineElement("menu-item", LeuMenuItem)
}
