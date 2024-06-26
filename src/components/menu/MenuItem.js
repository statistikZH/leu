import { html, unsafeStatic } from "lit/static-html.js"
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
    highlighted: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
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

    /**
     * A programmatic way to highlight the menu item like it is hovered.
     * This is just a visual effect and does not change the active state.
     */
    this.highlighted = false

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

  getValue() {
    return this.value || this.textContent
  }

  getTagName() {
    return this.href ? "a" : "button"
  }

  getAria() {
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

  render() {
    const aria = this.getAria()

    /* The eslint rules don't recognize html import from lit/static-html.js */
    /* eslint-disable lit/binding-positions, lit/no-invalid-html */
    return html`<${unsafeStatic(
      this.getTagName()
    )} class="button" href=${ifDefined(this.href)} aria-disabled=${ifDefined(
      aria.disabled
    )} aria-checked=${ifDefined(aria.checked)} aria-selected=${ifDefined(
      aria.selected
    )} role=${ifDefined(aria.role)}>
      <slot class="before" name="before"></slot>
      <span class="label"><slot></slot></span>
      <slot class="after" name="after"></slot>
    </${unsafeStatic(this.getTagName())}>`
    /* eslint-enable lit/binding-positions, lit/no-invalid-html */
  }
}
