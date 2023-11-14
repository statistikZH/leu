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
     * If no icon with this value is found, it will be displayed as text.
     * If the value is "EMPTY", an empty placeholder with the size of an icon will be displayed.
     */
    before: { type: String },
    /**
     * Can be either an icon name or a text
     * If no icon with this value is found, it will be displayed as text
     * If the value is "EMPTY", an empty placeholder with the size of an icon will be displayed.
     */
    after: { type: String },
    active: { type: Boolean, reflect: true },
    highlighted: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
  }

  constructor() {
    super()

    this.active = false
    this.disabled = false
    this.before = ""
    this.after = ""

    /**
     * A programmatic way to highlight the menu item like it is hovered.
     * This is just a visual effect and does not change the active state.
     */
    this.highlighted = false
  }

  static getIconOrText(name) {
    if (ICON_NAMES.includes(name)) {
      return Icon(name)
    }

    if (name === "EMPTY") {
      return html`<div class="icon-placeholder"></div>`
    }

    return name
  }

  renderBefore() {
    if (this.before !== "") {
      const content = LeuMenuItem.getIconOrText(this.before)
      return html`<span class="before">${content}</span>`
    }

    return nothing
  }

  renderAfter() {
    if (this.after !== "") {
      const content = LeuMenuItem.getIconOrText(this.after)
      return html`<span class="after">${content}</span>`
    }

    return nothing
  }

  render() {
    return html`<button class="button" ?disabled=${this.disabled}>
      ${this.renderBefore()}<span class="label"><slot></slot></span
      >${this.renderAfter()}
    </button>`
  }
}

export function defineMenuItemElements() {
  defineElement("menu-item", LeuMenuItem)
}
