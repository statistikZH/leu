import { html } from "lit"
import {
  autoUpdate,
  computePosition,
  flip,
  shift,
  size,
} from "@floating-ui/dom"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./popup.css"

/**
 * @typedef {"top"|"top-start"|"top-end"|"bottom"|"bottom-start"|"bottom-end"|"left"|"left-start"|"left-end"|"right"|"right-start"|"right-end"} Placement
 */

/**
 * @tagname leu-popup
 */
export class LeuPopup extends LeuElement {
  static styles = [LeuElement.styles, styles]

  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  static properties = {
    anchor: {},
    active: { type: Boolean, reflect: true },
    placement: { type: String, reflect: true },
    flip: { type: Boolean, reflect: true },
    shift: { type: Boolean, reflect: true },
    shiftPadding: { type: Number, reflect: true },
    matchSize: { type: String, reflect: true },
    autoSize: { type: String, reflect: true },
    autoSizePadding: { type: Number, reflect: true },
  }

  constructor() {
    super()

    this.anchorEl = null
    this.cleanup = undefined
    this.flip = false
    this.shift = false

    this.active = false

    /** @type {Placement} */
    this.placement = undefined

    /** @type {"width" | "height" | "both"} */
    this.matchSize = undefined

    /** @type {"width" | "height" | "both"} */
    this.autoSize = undefined

    this.shiftPadding = 0
    this.autoSizePadding = 0

    /** @type {string | HTMLElement} */
    this.anchor = undefined
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.stop()
  }

  updated(changedProperties) {
    if (changedProperties.has("active")) {
      if (this.active) {
        this.start()
      } else {
        this.stop()
      }
    }

    if (changedProperties.has("anchor")) {
      this.handleAnchorChange()
    }

    if (this.active) {
      this.reposition()
    }
  }

  /**
   * @returns {HTMLElement | null}
   */
  get popupEl() {
    return this.renderRoot?.querySelector(".popup") ?? null
  }

  start() {
    if (!this.anchorEl || !this.active) return

    this.cleanup = autoUpdate(this.anchorEl, this.popupEl, () => {
      this.reposition()
    })
  }

  stop() {
    this.cleanup?.()

    this.style.removeProperty("--auto-size-available-width")
    this.style.removeProperty("--auto-size-available-height")
  }

  reposition() {
    if (!this.anchorEl || !this.popupEl || !this.active) return

    const middleware = []

    if (this.matchSize) {
      middleware.push(
        size({
          apply: ({ rects }) => {
            const matchWidth =
              this.matchSize === "width" || this.matchSize === "both"
            const matchHeight =
              this.matchSize === "height" || this.matchSize === "both"
            this.popupEl.style.width = matchWidth
              ? `${rects.reference.width}px`
              : ""
            this.popupEl.style.height = matchHeight
              ? `${rects.reference.height}px`
              : ""
          },
        }),
      )
    } else {
      // Cleanup styles if we're not matching width/height
      this.popupEl.style.width = ""
      this.popupEl.style.height = ""
    }

    if (this.flip) {
      middleware.push(flip())
    }

    if (this.shift) {
      middleware.push(shift({ padding: this.shiftPadding }))
    }

    if (this.autoSize) {
      middleware.push(
        size({
          padding: this.autoSizePadding,
          apply: ({ availableWidth, availableHeight }) => {
            const setMaxWidth =
              this.autoSize === "width" || this.autoSize === "both"
            const setMaxHeight =
              this.autoSize === "height" || this.autoSize === "both"

            if (setMaxHeight) {
              this.style.setProperty(
                "--auto-size-available-height",
                `${availableHeight}px`,
              )
            } else {
              this.style.removeProperty("--auto-size-available-height")
            }

            if (setMaxWidth) {
              this.style.setProperty(
                "--auto-size-available-width",
                `${availableWidth}px`,
              )
            } else {
              this.style.removeProperty("--auto-size-available-width")
            }
          },
        }),
      )
    } else {
      // Cleanup styles if we're not auto-sizing
      this.style.removeProperty("--auto-size-available-width")
      this.style.removeProperty("--auto-size-available-height")
    }

    computePosition(this.anchorEl, this.popupEl, {
      placement: this.placement,
      middleware,
    }).then(({ x, y }) => {
      Object.assign(this.popupEl.style, {
        left: `${x}px`,
        top: `${y}px`,
      })
    })
  }

  handleAnchorChange() {
    if (this.anchor && typeof this.anchor === "string") {
      const root = this.getRootNode()
      this.anchorEl = root.getElementById(this.anchor)
    } else if (this.anchor instanceof HTMLElement) {
      this.anchorEl = this.anchor
    } else {
      this.anchorEl = this.querySelector("[slot=anchor]")
    }

    if (this.anchorEl instanceof HTMLSlotElement) {
      ;[this.anchorEl] = this.anchorEl.assignedElements({ flatten: true })
    }

    if (this.anchorEl) {
      this.start()
    }
  }

  render() {
    return html`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>
      <div class="popup">
        <slot> </slot>
      </div>
    `
  }
}
