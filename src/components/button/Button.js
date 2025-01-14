import { html, nothing } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { ifDefined } from "lit/directives/if-defined.js"

import { LeuIcon } from "../icon/Icon.js"
import { LeuElement } from "../../lib/LeuElement.js"
import { HasSlotController } from "../../lib/hasSlotController.js"
import { ARIA_CHECKED_ROLES, ARIA_SELECTED_ROLES } from "../../lib/a11y.js"

// @ts-ignore
import styles from "./button.css"

/*
Design: https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=4-1444&mode=design&t=xu5Vii8jXKKCKDez-0
Live Demo: zh.ch
*/

const BUTTON_VARIANTS = ["primary", "secondary", "ghost"]
Object.freeze(BUTTON_VARIANTS)
export { BUTTON_VARIANTS }

const BUTTON_SIZES = ["regular", "small"]
Object.freeze(BUTTON_SIZES)
export { BUTTON_SIZES }

const BUTTON_TYPES = ["button", "submit", "reset"]
Object.freeze(BUTTON_TYPES)
export { BUTTON_TYPES }

export const BUTTON_EXPANDED_OPTIONS = ["true", "false"]
Object.freeze(BUTTON_EXPANDED_OPTIONS)

/**
 * @tagname leu-button
 * @slot before - The icon to display before the label
 * @slot after - The icon to display after the label
 * @slot - The label of the button or the icon if no label is set
 */
export class LeuButton extends LeuElement {
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

  /**
   * @internal
   */
  hasSlotController = new HasSlotController(this, [
    "before",
    "after",
    "[default]",
  ])

  static properties = {
    label: { type: String, reflect: true },
    size: { type: String, reflect: true },
    variant: { type: String, reflect: true },
    type: { type: String, reflect: true },
    componentRole: { type: String, reflect: true },

    disabled: { type: Boolean, reflect: true },
    round: { type: Boolean, reflect: true },
    active: { type: Boolean, reflect: true },
    inverted: { type: Boolean, reflect: true },
    expanded: { type: String, reflect: true },
    fluid: { type: Boolean, reflect: true },
  }

  constructor() {
    super()
    /** @type {string} */
    this.label = null
    /** @type {string} */
    this.size = "regular"
    /** @type {string} */
    this.variant = "primary"
    /** @type {"button" | "submit" | "reset"} */
    this.type = "button"

    /** @type {string} */
    this.componentRole = undefined

    /** @type {boolean} */
    this.disabled = false
    /** @type {boolean} - Only taken into account if no Label and an Icon is set */
    this.round = false
    /** @type {boolean} */
    this.active = false
    /** @type {boolean} - will be used on dark Background */
    this.inverted = false

    /** @type {boolean} - Alters the shape of the button to be full width of its parent container */
    this.fluid = false

    /**
     * Only taken into account if variant is "ghost"
     * @type {("true" | "false" | undefined)}
     */
    this.expanded = undefined
  }

  renderExpandingIcon() {
    if (typeof this.expanded !== "undefined" && this.variant === "ghost") {
      return html`<div class="icon-expanded">
        <leu-icon name="angleDropDown" size="24"></leu-icon>
      </div>`
    }

    return nothing
  }

  getAriaAttributes() {
    const attributes = {
      role: this.componentRole,
      label: this.label,
    }

    if (this.componentRole) {
      if (ARIA_CHECKED_ROLES.includes(this.componentRole)) {
        attributes.checked = this.active ? "true" : "false"
      } else if (ARIA_SELECTED_ROLES.includes(this.componentRole)) {
        attributes.selected = this.active ? "true" : "false"
      }
    }

    return attributes
  }

  hasTextContent() {
    return Array.from(this.childNodes).some(
      (node) =>
        node.nodeType === node.TEXT_NODE && node.textContent.trim() !== ""
    )
  }

  render() {
    const hasTextContent = this.hasTextContent()
    const hasIconDefault = Boolean(this.querySelector("leu-icon"))
    const hasIconBefore = this.hasSlotController.test("before")
    const hasIconAfter = this.hasSlotController.test("after")
    const aria = this.getAriaAttributes()

    const cssClasses = {
      "icon-only": hasIconDefault && !hasTextContent,
      "icon-before": hasIconBefore,
      "icon-after": hasIconAfter,
      round: this.round,
      active: this.active,
      inverted: this.inverted,
      [this.variant]: true,
      [this.size]: true,
    }
    return html`
      <button
        aria-label=${ifDefined(aria.label)}
        aria-selected=${ifDefined(aria.selected)}
        aria-checked=${ifDefined(aria.checked)}
        aria-expanded=${ifDefined(this.expanded)}
        role=${ifDefined(aria.role)}
        class=${classMap(cssClasses)}
        ?disabled=${this.disabled}
        type=${this.type}
      >
        <div class="icon-wrapper icon-wrapper--before">
          <slot name="before" class="icon-wrapper__slot"></slot>
        </div>
        <span class="content"><slot></slot></span>
        <div class="icon-wrapper icon-wrapper--after">
          <slot name="after" class="icon-wrapper__slot"></slot>
        </div>

        ${this.renderExpandingIcon()}
      </button>
    `
  }
}
