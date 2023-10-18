import { html, nothing, LitElement } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { Icon } from "../icon/icon.js"
import { defineElement } from "../../lib/defineElement.js"

import styles from "./button.css"

/*
Design: https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=4-1444&mode=design&t=xu5Vii8jXKKCKDez-0
Live Demo: zh.ch
*/

const BUTTON_VARIANTS = ["primary", "secondary"]
Object.freeze(BUTTON_VARIANTS)
export { BUTTON_VARIANTS }

const BUTTON_SIZES = ["normal", "small"]
Object.freeze(BUTTON_SIZES)
export { BUTTON_SIZES }

const BUTTON_TYPES = ["button", "submit", "reset"]
Object.freeze(BUTTON_TYPES)
export { BUTTON_TYPES }

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
    negative: { type: Boolean },
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
    this.negative = false
  }

  render() {
    const iconSize = this.size === "small" ? 16 : 24
    const cssClasses = {
      icon: !this.label && this.icon && !this.iconAfter,
      round: !this.label && this.icon && !this.iconAfter && this.round,
      active: this.active,
      negative: this.negative,
      [this.variant]: true,
      [this.size]: true,
    }
    return html`
      <button
        class=${classMap(cssClasses)}
        ?disabled=${this.disabled}
        type=${this.type}
      >
        ${this.icon ? Icon(this.icon, iconSize) : nothing} ${this.label}
        ${this.iconAfter && this.label && !this.icon
          ? Icon(this.iconAfter, iconSize)
          : nothing}
      </button>
    `
  }
}

export function defineButtonElements() {
  defineElement("button", LeuButton)
}
