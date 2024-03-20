import { html, nothing, LitElement } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { ifDefined } from "lit/directives/if-defined.js"

import { Icon } from "../icon/icon.js"
import { HasSlotController } from "../../lib/hasSlotController.js"

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

export const BUTTON_EXPANDED_OPTIONS = ["open", "closed"]
Object.freeze(BUTTON_EXPANDED_OPTIONS)

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
     * @type {("open" | "closed" | undefined)}
     */
    this.expanded = undefined
  }

  getIconSize() {
    return this.size === "small" || this.variant === "ghost" ? 16 : 24
  }

  renderIconBefore() {
    if (this.icon && this.iconPosition === "before") {
      return html`<div class="icon-wrapper icon-wrapper--before">
        ${Icon(this.icon, this.getIconSize())}
      </div>`
    }

    return nothing
  }

  renderIconAfter() {
    if (this.icon && this.iconPosition === "after") {
      return html`<div class="icon-wrapper icon-wrapper--after">
        ${Icon(this.icon, this.getIconSize())}
      </div>`
    }

    return nothing
  }

  renderExpandingIcon() {
    if (typeof this.expanded !== "undefined" && this.variant === "ghost") {
      return html`<div class="icon-wrapper icon-wrapper--expanded">
        ${Icon("angleDropDown", 24)}
      </div>`
    }

    return nothing
  }

  render() {
    const hasContent = this.hasSlotController.test("[default]")

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
        aria-label=${ifDefined(this.label)}
        class=${classMap(cssClasses)}
        ?disabled=${this.disabled}
        type=${this.type}
      >
        ${this.renderIconBefore()}
        <slot></slot>
        ${this.renderIconAfter()} ${this.renderExpandingIcon()}
      </button>
    `
  }
}
