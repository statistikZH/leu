import { html, LitElement } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { defineElement } from "../../lib/defineElement.js"
import styles from "./scroll-top.css"
import { defineButtonElements } from "../button/Button.js"

/**
 * @tagname leu-scroll-top
 */
export class LeuScrollTop extends LitElement {
  static styles = styles

  static properties = {
    _yPos: { state: true },
    _showButton: { state: true },
    _scrollDown: { state: true },
  }

  constructor() {
    super()
    this._yPos = 0
    this._showButton = false
    this._scrollDown = false
  }

  scroll = () => {
    this._showButton = window.scrollY > window.innerHeight && !this._scrollDown
    const delta = window.scrollY - this._yPos
    if (this._scrollDown) {
      if (delta < 0) {
        this._scrollDown = false
      }
    } else if (delta > 0) {
      this._scrollDown = true
    }
    this._yPos = window.scrollY
  }

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener("scroll", this.scroll)
  }

  disconnectedCallback() {
    document.removeEventListener("scroll", this.scroll)
    super.disconnectedCallback()
  }

  static crollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }

  render() {
    const cssClasses = {
      "scroll-top": true,
      show: this._showButton,
      hide: !this._showButton,
    }
    return html`
      <div class=${classMap(cssClasses)}>
        <leu-button
          icon="arrowUp"
          round
          @click="${() => LeuScrollTop.crollToTop()}"
        >
        </leu-button>
      </div>
    `
  }
}

export function defineScrollTopElements() {
  defineButtonElements()
  defineElement("scroll-top", LeuScrollTop)
}
