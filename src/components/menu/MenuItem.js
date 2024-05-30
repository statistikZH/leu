import { LitElement } from "lit"
import { html, unsafeStatic } from "lit/static-html.js"
import { ifDefined } from "lit/directives/if-defined.js"

import styles from "./menu-item.css"

import "../icon/leu-icon.js"

/**
 * @typedef {'menuitem' | 'menuitemcheckbox' | 'menuitemradio' | 'option' | 'none'} MenuItemRole
 */

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
    active: { type: Boolean, reflect: true },
    highlighted: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    label: { type: String, reflect: true },
    href: { type: String, reflect: true },
    componentRole: { type: String, reflect: true },
  }

  constructor() {
    super()

    this.active = false
    this.disabled = false

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

  getTagName() {
    return this.href ? "a" : "button"
  }

  getAria() {
    return {
      "aria-disabled": this.disabled,
      "aria-checked":
        this.componentRole === "menuitemcheckbox" ||
        this.componentRole === "menuitemradio"
          ? this.active
          : undefined,
      "aria-selected":
        this.componentRole === "option" ? this.active : undefined,
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
    )} aria-checked=${ifDefined(aria.checked)} aria-selected=${
      aria.selected
    } role=${ifDefined(aria.role)}>
      <slot class="before" name="before"></slot>
      <span class="label"><slot></slot></span>
      <slot class="after" name="after"></slot>
    </${unsafeStatic(this.getTagName())}>`
    /* eslint-enable lit/binding-positions, lit/no-invalid-html */
  }
}
