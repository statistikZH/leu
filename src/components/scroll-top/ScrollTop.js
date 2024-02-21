import { html, LitElement } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { defineElement } from "../../lib/defineElement.js"
import styles from "./scroll-top.css"
import { defineButtonElements } from "../button/Button.js"
import { throttle } from "../../lib/utils.js"

/**
 * @tagname leu-scroll-top
 */
export class LeuScrollTop extends LitElement {
  static styles = styles

  static properties = {
    _yPos: { state: true },
    _showButton: { state: true },
    _scrollDown: { state: true },

    // hold the reference to resize listener for remove later
    _scrollListenerFunction: { state: true },
  }

  constructor() {
    super()
    /** @internal */
    this._yPos = 0
    /** @internal */
    this._showButton = false
    /** @internal */
    this._scrollDown = false

    /** @internal */
    this._scrollListenerFunction = null
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
    this._scrollListenerFunction = throttle(this.scroll, 100)
    document.addEventListener("scroll", this.scroll, true)
  }

  disconnectedCallback() {
    document.removeEventListener("scroll", this._scrollListenerFunction, true)
    super.disconnectedCallback()
  }

  static scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }

  render() {
    const cssClasses = {
      "scroll-top": true,
      hide: !this._showButton,
    }
    return html`
      <div class=${classMap(cssClasses)}>
        <leu-button
          icon="arrowUp"
          round
          @click="${() => LeuScrollTop.scrollToTop()}"
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
