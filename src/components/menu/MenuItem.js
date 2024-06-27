import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"

import { LeuElement } from "../../lib/LeuElement.js"
import { LeuIcon } from "../icon/Icon.js"

import styles from "./menu-item.css"

/**
 * @typedef {'menuitem' | 'menuitemcheckbox' | 'menuitemradio' | 'option' | 'none'} MenuItemRole
 */

/**
 * @tagname leu-menu-item
 * @slot - The label of the menu item
 * @property {boolean} active - Defines if the item is selected or checked
 * @property {boolean} disabled - Disables the underlying button or link
 * @property {string} value - The value of the item. See `getValue()`
 * @property {string} href - The href of the underlying link
 * @property {boolean} tabbable - If the item should be focusable. Will be reflected as `tabindex` to the underlying button or link
 * @property {MenuItemRole} componentRole - The role of the item. This will be reflected as `role` to the underlying button or link. Default is `'menuitem'.`
 */
export class LeuMenuItem extends LeuElement {
  static dependencies = {
    "leu-icon": LeuIcon,
  }

  static styles = styles

  /**
   * @internal
   */
  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  static properties = {
    active: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    tabbable: { type: Boolean, reflect: true },
    href: { type: String, reflect: true },
    value: { type: String, reflect: true },
    componentRole: { type: String, reflect: true },
  }

  constructor() {
    super()

    this.active = false
    this.disabled = false
    this.value = undefined
    this.href = undefined
    this.tabbable = undefined

    /** @type {MenuItemRole} */
    this.componentRole = "menuitem"
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener("click", this._handleClick, true)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener("click", this._handleClick, true)
  }

  _handleClick(event) {
    if (this.disabled) {
      event.stopPropagation()
      event.preventDefault()
    }
  }

  /**
   * Returns the value of the item. If `value` is not set, it will return the inner text
   * @returns {string}
   */
  getValue() {
    return this.value || this.innerText
  }

  _getAria() {
    const commonAttributes = {
      disabled: this.disabled,
    }

    if (this.href) {
      return commonAttributes
    }

    return {
      ...commonAttributes,
      checked:
        this.componentRole === "menuitemcheckbox" ||
        this.componentRole === "menuitemradio"
          ? this.active
          : undefined,
      selected: this.componentRole === "option" ? this.active : undefined,
      role: this.componentRole === "none" ? undefined : this.componentRole,
    }
  }

  _getTabIndex() {
    if (typeof this.tabbable === "boolean") {
      return this.tabbable ? 0 : -1
    }

    return undefined
  }

  _renderLink(content) {
    const aria = this._getAria()

    return html`<a
      class="button"
      href=${this.href}
      aria-disabled=${ifDefined(aria.disabled)}
      aria-checked=${ifDefined(aria.checked)}
      aria-selected=${ifDefined(aria.selected)}
      role=${ifDefined(aria.role)}
      tabindex=${ifDefined(this._getTabIndex())}
      >${content}</a
    >`
  }

  _renderButton(content) {
    const aria = this._getAria()

    return html`<button
      class="button"
      aria-disabled=${ifDefined(aria.disabled)}
      aria-checked=${ifDefined(aria.checked)}
      aria-selected=${ifDefined(aria.selected)}
      role=${ifDefined(aria.role)}
      tabindex=${ifDefined(this._getTabIndex())}
    >
      ${content}
    </button>`
  }

  render() {
    const content = html`
      <slot class="before" name="before"></slot>
      <span class="label"><slot></slot></span>
      <slot class="after" name="after"></slot>
    `

    return this.href ? this._renderLink(content) : this._renderButton(content)
  }
}
