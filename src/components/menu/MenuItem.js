import { LitElement } from "lit"
import { html, unsafeStatic } from "lit/static-html.js"
import { ifDefined } from "lit/directives/if-defined.js"

import styles from "./menu-item.css"

import "../icon/leu-icon.js"

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
    before: { type: String, reflect: true },
    /**
     * Can be either an icon name or a text
     * If no icon with this value is found, it will be displayed as text
     * If the value is "EMPTY", an empty placeholder with the size of an icon will be displayed.
     */
    after: { type: String, reflect: true },
    active: { type: Boolean, reflect: true },
    highlighted: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    label: { type: String, reflect: true },
    href: { type: String, reflect: true },
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
  }

  getTagName() {
    return this.href ? "a" : "button"
  }

  render() {
    /* The eslint rules don't recognize html import from lit/static-html.js */
    /* eslint-disable lit/binding-positions, lit/no-invalid-html */
    return html`<${unsafeStatic(
      this.getTagName()
    )} class="button" href=${ifDefined(this.href)} ?disabled=${this.disabled}>
      <slot class="before" name="before"></slot>
      <span class="label"><slot></slot></span>
      <slot class="after" name="after"></slot>
    </${unsafeStatic(this.getTagName())}>`
    /* eslint-enable lit/binding-positions, lit/no-invalid-html */
  }
}
