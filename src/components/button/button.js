import { html, css, nothing, LitElement } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { Icon } from "../icon/icon.js"
import { defineElement } from "../../lib/defineElement.js"

/*
Design: https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=4-1444&mode=design&t=xu5Vii8jXKKCKDez-0
Live Demo: zh.ch
*/

/**
 * @tagname leu-button
 */
export class LeuButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }
    :host button {
      padding: 12px 24px;
      font-size: 16px;
      line-height: 24px;
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
    :host button.icon {
      padding: 12px;
    }
    :host button.round {
      border-radius: 50%;
    }
    :host button.small {
      padding: 6px 24px;
      font-size: 14px;
      line-height: 20px;
    }
    :host button.small.icon {
      padding: 8px;
    }
    :host button:disabled {
      cursor: not-allowed;
    }
    :host button:focus-visible {
      border: 1px solid var(--leu-color-black-0);
      outline: 2px solid var(--leu-color-func-cyan);
    }
    :host button.negative:focus-visible {
      border: 1px solid var(--leu-color-black-100);
      outline: 2px solid var(--leu-color-black-0);
    }

    /* stylelint-disable */

    /* primary */

    :host button {
      color: var(--leu-color-black-0);
      background: var(--leu-color-black-100);
    }
    :host button:hover {
      color: var(--leu-color-black-0);
      background: var(--leu-color-black-transp-80);
    }
    :host button.active {
      color: var(--leu-color-black-0);
      background: var(--leu-color-black-100);
    }
    :host button:disabled {
      color: var(--leu-color-black-0);
      background: var(--leu-color-black-transp-20);
    }

    /* secondary */

    :host button.secondary {
      color: var(--leu-color-black-transp-60);
      background: var(--leu-color-black-transp-10);
    }
    :host button.secondary:hover {
      color: var(--leu-color-black-100);
      background: var(--leu-color-black-transp-20);
    }
    :host button.secondary.active {
      color: var(--leu-color-black-0);
      background: var(--leu-color-black-100);
    }
    :host button.secondary:disabled {
      color: var(--leu-color-black-transp-20);
      background: var(--leu-color-black-transp-5);
    }

    /* primary + negative */

    :host button.negative {
      color: var(--leu-color-black-100);
      background: var(--leu-color-black-0);
    }
    :host button.negative:hover {
      color: var(--leu-color-black-100);
      background: var(--leu-color-white-transp-70);
    }
    :host button.negative.active {
      color: var(--leu-color-black-0);
      background: var(--leu-color-black-100);
    }
    :host button.negative:disabled {
      color: var(--leu-color-black-40);
      background: var(--leu-color-white-transp-70);
    }

    /* secondary + negative */

    :host button.secondary.negative {
      color: var(--leu-color-black-0);
      background: var(--leu-color-black-transp-20);
    }
    :host button.secondary.negative:hover {
      color: var(--leu-color-black-0);
      background: var(--leu-color-black-transp-40);
    }
    :host button.secondary.negative.active {
      color: var(--leu-color-black-100);
      background: var(--leu-color-black-0);
    }
    :host button.secondary.negative:disabled {
      color: var(--leu-color-white-transp-70);
      background: var(--leu-color-black-transp-10);
    }

    /* stylelint-enable */
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
    disabled: { type: Boolean },
    round: { type: Boolean },
    small: { type: Boolean },
    active: { type: Boolean },
    secondary: { type: Boolean },
    negative: { type: Boolean },
    icon: { type: String },
    iconAfter: { type: String },
    type: { type: String },
  }

  constructor() {
    super()
    /** @type {string} */
    this.label = null
    /** @type {boolean} - disabled state */
    this.disabled = false
    /** @type {boolean} - disabled state */
    this.round = false
    /** @type {boolean} - disabled state */
    this.small = false
    /** @type {boolean} - disabled state */
    this.active = false
    /** @type {boolean} - disabled state */
    this.secondary = false
    /** @type {boolean} - disabled state */
    this.negative = false
    /** @type {string} */
    this.icon = null
    /** @type {string} */
    this.iconAfter = false
    /** @type {string} */
    this.type = "button"
  }

  render() {
    const iconSize = this.small ? 16 : 24
    const cssClasses = {
      icon: !this.label && this.icon && !this.iconAfter,
      round: !this.label && this.icon && !this.iconAfter && this.round,
      small: this.small,
      secondary: this.secondary,
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
