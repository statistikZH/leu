import { html, nothing, LitElement } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { Icon } from "../icon/icon.js"
import { defineElement } from "../../lib/defineElement.js"

import styles from "./button.css"

/*
Design: https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=4-1444&mode=design&t=xu5Vii8jXKKCKDez-0
Live Demo: zh.ch
*/

const BUTTON_VARIANTS = ["primary", "secondary", "ghost"]
Object.freeze(BUTTON_VARIANTS)
export { BUTTON_VARIANTS }

const BUTTON_SIZES = ["normal", "small"]
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

  static properties = {
    label: { type: String },
    icon: { type: String },
    iconAfter: { type: String },
    size: { type: String },
    variant: { type: String },
    type: { type: String },

    disabled: { type: Boolean },
    round: { type: Boolean },
    active: { type: Boolean },
    inverted: { type: Boolean },
    expanded: { type: String },
  }

  constructor() {
    super()
    /** @type {string} */
    this.label = null
    /** @type {string} */
    this.icon = null
    /** @type {string} - Only taken into account if Label and no Icon is set */
    this.iconAfter = null
    /** @type {string} */
    this.size = "normal"
    /** @type {string} */
    this.variant = "primary"
    /** @type {string} */
    this.type = "button"

    /** @type {boolean} */
    this.disabled = false
    /** @type {boolean} - Only taken into account if no Label and an Icon is set */
    this.round = false
    /** @type {boolean} */
    this.active = false
    /** @type {boolean} - will be used on dark Background */
    this.inverted = false

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
    if (this.icon) {
      return html`<div class="icon-wrapper icon-wrapper--before">
        ${Icon(this.icon, this.getIconSize())}
      </div>`
    }

    return nothing
  }

  renderIconAfter() {
    if (this.iconAfter && this.label && !this.icon) {
      return html`<div class="icon-wrapper icon-wrapper--after">
        ${Icon(this.iconAfter, this.getIconSize())}
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
    const cssClasses = {
      icon: !this.label && this.icon && !this.iconAfter,
      round: !this.label && this.icon && !this.iconAfter && this.round,
      active: this.active,
      inverted: this.inverted,
      [this.variant]: true,
      [this.size]: true,
    }
    return html`
      <button
        class=${classMap(cssClasses)}
        ?disabled=${this.disabled}
        type=${this.type}
      >
        ${this.renderIconBefore()} ${this.label} ${this.renderIconAfter()}
        ${this.renderExpandingIcon()}
      </button>
    `
  }
}

export function defineButtonElements() {
  defineElement("button", LeuButton)
}
