import { html, css, nothing, LitElement } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { Icon } from "../icon/icon.js"
import { defineElement } from "../../lib/defineElement.js"

/*
Design: https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=4-1444&mode=design&t=xu5Vii8jXKKCKDez-0
Live Demo: zh.ch
*/

const BUTTON_MODES = ["primary", "secondary"]
Object.freeze(BUTTON_MODES)
export { BUTTON_MODES }

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
  static styles = css`
    :host {
      display: inline-block;
    }

    button {
      font-family: var(--leu-font-black);
      appearance: none;
      transition: background 0.1s ease;
      cursor: pointer;
      border: 1px solid transparent;
      border-radius: 1px;
      display: flex;
      align-items: center;
      column-gap: 8px;
    }

    button.round {
      border-radius: 50%;
    }

    button:disabled {
      cursor: not-allowed;
    }

    /* stylelint-disable */

    /* normal --------------------------------------------------------------------------------------------------------------- */
    button.normal {
      padding: 12px 24px;
      font-size: 16px;
      line-height: 24px;
    }
    button.normal.icon {
      padding: 12px;
    }

    /* samll ---------------------------------------------------------------------------------------------------------------- */
    button.small {
      padding: 6px 24px;
      font-size: 14px;
      line-height: 20px;
    }
    button.small.icon {
      padding: 8px;
    }

    /* primary --------------------------------------------------------------------------------------------------------------- */
    button.primary {
      color: var(--leu-color-black-0);
      background: var(--leu-color-black-100);
    }
    button.primary:hover {
      color: var(--leu-color-black-0);
      background: var(--leu-color-black-transp-80);
    }
    button.primary.active {
      color: var(--leu-color-black-0);
      background: var(--leu-color-black-100);
    }
    button.primary:disabled {
      color: var(--leu-color-black-0);
      background: var(--leu-color-black-transp-20);
    }

    /* secondary ------------------------------------------------------------------------------------------------------------- */
    button.secondary {
      color: var(--leu-color-black-transp-60);
      background: var(--leu-color-black-transp-10);
    }
    button.secondary:hover {
      color: var(--leu-color-black-100);
      background: var(--leu-color-black-transp-20);
    }
    button.secondary.active {
      color: var(--leu-color-black-0);
      background: var(--leu-color-black-100);
    }
    button.secondary:disabled {
      color: var(--leu-color-black-transp-20);
      background: var(--leu-color-black-transp-5);
    }

    /* primary + negative ---------------------------------------------------------------------------------------------------- */
    button.primary.negative {
      color: var(--leu-color-black-100);
      background: var(--leu-color-black-0);
    }
    button.primary.negative:hover {
      color: var(--leu-color-black-100);
      background: var(--leu-color-white-transp-70);
    }
    button.primary.negative.active {
      color: var(--leu-color-black-0);
      background: var(--leu-color-black-100);
    }
    button.primary.negative:disabled {
      color: var(--leu-color-black-40);
      background: var(--leu-color-white-transp-70);
    }

    /* secondary + negative -------------------------------------------------------------------------------------------------- */
    button.secondary.negative {
      color: var(--leu-color-black-0);
      background: var(--leu-color-black-transp-20);
    }
    button.secondary.negative:hover {
      color: var(--leu-color-black-0);
      background: var(--leu-color-black-transp-40);
    }
    button.secondary.negative.active {
      color: var(--leu-color-black-100);
      background: var(--leu-color-black-0);
    }
    button.secondary.negative:disabled {
      color: var(--leu-color-white-transp-70);
      background: var(--leu-color-black-transp-10);
    }

    /* stylelint-enable */

    button:focus-visible {
      border: 1px solid var(--leu-color-black-0);
      outline: 2px solid var(--leu-color-func-cyan);
    }

    button.negative:focus-visible {
      border: 1px solid var(--leu-color-black-100);
      outline: 2px solid var(--leu-color-black-0);
    }
  `

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

    disabled: { type: Boolean },
    round: { type: Boolean },
    active: { type: Boolean },
    negative: { type: Boolean },

    size: { type: String },
    mode: { type: String },
    type: { type: String },
  }

  constructor() {
    super()
    /** @type {string} - label state */
    this.label = null
    /** @type {string} - icon state */
    this.icon = null
    /** @type {string} - iconAfter state */
    this.iconAfter = false

    /** @type {boolean} - disabled state */
    this.disabled = false
    /** @type {boolean} - round state */
    this.round = false
    /** @type {boolean} - active state */
    this.active = false
    /** @type {boolean} - negative state */
    this.negative = false

    /** @type {number} - size state ( default: 'normal' ) */
    this.size = "normal"
    /** @type {string} - mode state ( default: 'primary' ) */
    this.mode = "primary"
    /** @type {string} - type state ( default: 'button' ) */
    this.type = "button"
  }

  render() {
    const iconSize = this.small ? 16 : 24
    const cssClasses = {
      icon: !this.label && this.icon && !this.iconAfter,
      round: !this.label && this.icon && !this.iconAfter && this.round,
      [this.size]: true,
      [this.mode]: true,
      active: this.active,
      negative: this.negative,
    }
    return html`
      <button
        class=${classMap(cssClasses)}
        ?disabled=${this.disabled}
        .type=${this.type}
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
