import { html } from "lit"
import { classMap } from "lit/directives/class-map.js"

import { LeuElement } from "../../lib/LeuElement.js"
import { LeuButton } from "../button/Button.js"
import { LeuIcon } from "../icon/Icon.js"

import { throttle } from "../../lib/utils.js"

import styles from "./scroll-top.css"

/**
 * @tagname leu-scroll-top
 */
export class LeuScrollTop extends LeuElement {
  static dependencies = {
    "leu-button": LeuButton,
    "leu-icon": LeuIcon,
  }

  static styles = [LeuElement.styles, styles]

  static properties = {
    _showButton: { state: true },
  }

  constructor() {
    super()
    /** @internal */
    this._prevYPos = 0
    /** @internal */
    this._showButton = false
    /** @internal */
    this._scrollDown = false

    /** @internal */
    this._scrollListener = undefined
  }

  scroll = () => {
    const delta = window.scrollY - this._prevYPos

    if (this._scrollDown) {
      if (delta < 0) {
        this._scrollDown = false
      }
    } else if (delta > 0) {
      this._scrollDown = true
    }

    /**
     * Only show the button when
     * ... the current scroll position is greater than the window height (below-the-fold) and when
     * ... scrolling up
     */
    this._showButton = window.scrollY > window.innerHeight && !this._scrollDown
    this._prevYPos = window.scrollY
  }

  connectedCallback() {
    super.connectedCallback()
    this._scrollListener = throttle(this.scroll, 100)
    document.addEventListener("scroll", this._scrollListener, true)
  }

  disconnectedCallback() {
    document.removeEventListener("scroll", this._scrollListener, true)
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
          label="Zum Seitenanfang"
          round
          @click="${() => LeuScrollTop.scrollToTop()}"
        >
          <leu-icon name="arrowUp"></leu-icon>
        </leu-button>
      </div>
    `
  }
}
