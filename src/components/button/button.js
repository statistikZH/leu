import { html, css, nothing, LitElement } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { Icon } from "../icon/icon.js"

export class LeuButton extends LitElement {
  static styles = css`
    :host button {
      padding: 12px 24px;
      color: #fff;
      background: var(--leu-color-black-100);
      font-size: 1rem;
      line-height: 24px;
      display: flex;
      align-items: center;
      font-family: var(--leu-font-black);
      appearance: none;
      transition: background 0.1s ease;
      cursor: pointer;
    }
    :host button:hover {
      background: var(--leu-color-black-80);
    }
    :host button.icon {
      padding: 12px;
    }
    :host button.round {
      border-radius: 50%;
    }
  `

  static properties = {
    label: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
    square: { type: Boolean, reflect: true },
    round: { type: Boolean, reflect: true },
    small: { type: Boolean, reflect: true },
    active: { type: Boolean, reflect: true },
    invert: { type: Boolean, reflect: true },
    icon: { type: String, reflect: true },
    iconAfter: { type: String, reflect: true },
    type: { type: String, reflect: true },
  }

  constructor() {
    super()

    this.label = null
    this.icon = null
    this.iconAfter = false
    this.disabled = false
    this.round = false
  }

  render() {
    const cssClasses = {
      icon: !this.label && this.icon,
      round: !this.label && this.icon && this.round,
    }
    return html`
      <button
        class=${classMap(cssClasses)}
        ?disabled=${this.disabled}
        type=${this.type}
        tabindex="${this.tabindex}"
      >
        ${this.icon && !this.iconAfter ? Icon(this.icon) : nothing}
        ${this.label} ${this.icon && this.iconAfter ? Icon(this.icon) : nothing}
      </button>
    `
  }
}
