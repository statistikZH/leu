import { html, nothing, TemplateResult } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"
import { property } from "lit/decorators.js"

import { LeuElement } from "../../lib/LeuElement.js"
import { LeuIcon } from "../icon/Icon.js"

import styles from "./menu-item.css"

type MenuItemRole =
  | "menuitem"
  | "menuitemcheckbox"
  | "menuitemradio"
  | "option"
  | "none"

/**
 * @tagname leu-menu-item
 * @slot - The label of the menu item
 */
export class LeuMenuItem extends LeuElement {
  static dependencies = {
    "leu-icon": LeuIcon,
  }

  static styles = [LeuElement.styles, styles]

  /**
   * @internal
   */
  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  /** Defines if the item is selected or checked */
  @property({ type: Boolean, reflect: true })
  active: boolean = false

  /** If the item is part of a multiple selection. Renders a checkmark before the label when active */
  @property({ type: Boolean, reflect: true })
  multipleSelection: boolean = false

  /** Disables the underlying button or link */
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false

  /** If the item should be focusable. Will be reflected as `tabindex` to the underlying button or link */
  @property({ type: Boolean, reflect: true })
  tabbable: boolean

  /** The href of the underlying link */
  @property({ type: String, reflect: true })
  href: string

  /** The value of the item. It must not contain commas. See `getValue()` */
  @property({ type: String, reflect: true })
  value: string

  /** The role of the item. This will be reflected as `role` to the underlying button or link. Default is `'menuitem'.` */
  @property({ type: String, reflect: true })
  componentRole: MenuItemRole = "menuitem"

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener("click", this._handleClick, true)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener("click", this._handleClick, true)
  }

  protected _handleClick(event: MouseEvent) {
    if (this.disabled) {
      event.stopPropagation()
      event.preventDefault()
    }
  }

  /**
   * Returns the value of the item. If `value` is not set, it will return the inner text
   */
  getValue() {
    return this.value || this.textContent.trim()
  }

  protected _getAria() {
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

  protected _getTabIndex() {
    if (typeof this.tabbable === "boolean") {
      return this.tabbable ? 0 : -1
    }

    return undefined
  }

  protected _renderLink(content: TemplateResult) {
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

  protected _renderButton(content: TemplateResult) {
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

  _renderBeforeSlotDefault() {
    if (!this.multipleSelection) {
      return nothing
    }

    return this.active
      ? html`<leu-icon name="check"></leu-icon>`
      : html`<leu-icon></leu-icon>`
  }

  render() {
    const content = html`
      <slot class="before" name="before"
        >${this._renderBeforeSlotDefault()}</slot
      >
      <span class="label"><slot></slot></span>
      <slot class="after" name="after"></slot>
    `

    return this.href ? this._renderLink(content) : this._renderButton(content)
  }
}
