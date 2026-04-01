import { html } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { state } from "lit/decorators.js"

import { LeuElement } from "../../lib/LeuElement.js"
import { LeuButton } from "../button/Button.js"
import { LeuIcon } from "../icon/Icon.js"

import { throttle } from "../../lib/utils.js"

import styles from "./scroll-top.css?inline"

/**
 * @tagname leu-scroll-top
 */
export class LeuScrollTop extends LeuElement {
  static dependencies = {
    "leu-button": LeuButton,
    "leu-icon": LeuIcon,
  }

  static styles = [LeuElement.styles, styles]

  @state()
  protected showButton: boolean = false

  protected prevYPos: number = 0

  protected hasScrolledDown: boolean = false

  protected scrollListener: EventListener

  scroll = () => {
    const delta = window.scrollY - this.prevYPos

    if (this.hasScrolledDown) {
      if (delta < 0) {
        this.hasScrolledDown = false
      }
    } else if (delta > 0) {
      this.hasScrolledDown = true
    }

    /**
     * Only show the button when
     * ... the current scroll position is greater than the window height (below-the-fold) and when
     * ... scrolling up
     */
    this.showButton =
      window.scrollY > window.innerHeight && !this.hasScrolledDown
    this.prevYPos = window.scrollY
  }

  connectedCallback() {
    super.connectedCallback()
    this.scrollListener = throttle(this.scroll, 100)
    document.addEventListener("scroll", this.scrollListener, true)
  }

  disconnectedCallback() {
    document.removeEventListener("scroll", this.scrollListener, true)
    super.disconnectedCallback()
  }

  // eslint-disable-next-line class-methods-use-this
  scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }

  render() {
    const cssClasses = {
      "scroll-top": true,
      hide: !this.showButton,
    }
    return html`
      <div class=${classMap(cssClasses)}>
        <leu-button
          label="Zum Seitenanfang"
          round
          @click="${() => this.scrollToTop()}"
        >
          <leu-icon name="arrowUp"></leu-icon>
        </leu-button>
      </div>
    `
  }
}
