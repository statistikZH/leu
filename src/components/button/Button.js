import { html, nothing, LitElement } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { ifDefined } from "lit/directives/if-defined.js"

import { HasSlotController } from "../../lib/hasSlotController.js"
import "../icon/leu-icon.js"

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
 * All roles that are associated with a aria-checked attribute
 * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-checked
 */
const ARIA_ROLES_CHECKED = [
  "checkbox",
  "menuitemcheckbox",
  "menuitemradio",
  "option",
  "radio",
  "switch",
]

/**
 * All roles that are associated with a aria-selected attribute
 * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected
 */
const ARIA_ROLES_SELECTED = [
  "gridcell",
  "option",
  "row",
  "tab",
  "columnheader",
  "rowheader",
  "treeitem",
]

/**
 * @tagname leu-button
 */
export class LeuButton extends LitElement {
  static styles = styles

  /**
   * @internal
   */
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  }

  /**
   * @internal
   */
  hasSlotController = new HasSlotController(this, ["[default]"])

  static properties = {
    label: { type: String, reflect: true },
    icon: { type: String, reflect: true },
    iconPosition: { type: String, reflect: true },
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
    this.icon = null
    /** @type {("before" | "after")} - Only taken into account if Label and no Icon is set */
    this.iconPosition = "before"
    /** @type {string} */
    this.size = "regular"
    /** @type {string} */
    this.variant = "primary"
    /** @type {"button" | "submit" | "reset"} */
    this.type = "button"

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

  getIconSize() {
    return this.size === "small" || this.variant === "ghost" ? 16 : 24
  }

  renderIconBefore() {
    if (this.icon && this.iconPosition === "before") {
      return html`<div class="icon-wrapper icon-wrapper--before">
        <leu-icon name=${this.icon} size=${this.getIconSize()}></leu-icon>
      </div>`
    }

    return nothing
  }

  renderIconAfter() {
    if (this.icon && this.iconPosition === "after") {
      return html`<div class="icon-wrapper icon-wrapper--after">
        <leu-icon name=${this.icon} size=${this.getIconSize()}></leu-icon>
      </div>`
    }

    return nothing
  }

  renderExpandingIcon() {
    if (typeof this.expanded !== "undefined" && this.variant === "ghost") {
      return html`<div class="icon-wrapper icon-wrapper--expanded">
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
      if (ARIA_ROLES_CHECKED.includes(this.componentRole)) {
        attributes.checked = this.active ? "true" : "false"
      } else if (ARIA_ROLES_SELECTED.includes(this.componentRole)) {
        attributes.selected = this.active ? "true" : "false"
      }
    }

    return attributes
  }

  render() {
    const hasContent = this.hasSlotController.test("[default]")
    const aria = this.getAriaAttributes()

    const cssClasses = {
      icon: !hasContent && this.icon,
      round: !hasContent && this.icon && this.round,
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
        role=${ifDefined(aria.role)}
        class=${classMap(cssClasses)}
        ?disabled=${this.disabled}
        type=${this.type}
      >
        ${this.renderIconBefore()}
        <span class="label"><slot></slot></span>
        ${this.renderIconAfter()} ${this.renderExpandingIcon()}
      </button>
    `
  }
}
