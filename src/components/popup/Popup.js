import { html, LitElement } from "lit"
import {
  autoUpdate,
  computePosition,
  flip,
  shift,
  size,
} from "@floating-ui/dom"
import styles from "./popup.css"

/**
 * @tagname leu-popup
 */
export class LeuPopup extends LitElement {
  static styles = styles

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  }

  static properties = {
    anchor: {},
    active: { type: Boolean },
    /**
     * @type {"top"|"top-start"|"top-end"|"bottom"|"bottom-start"|"bottom-end"|"left"|"left-start"|"left-end"|"right"|"right-start"|"right-end"}
     */
    placement: { type: String },
    flip: { type: Boolean },
    shift: { type: Boolean },
    shiftPadding: { type: Number },
    /** @type {"width" | "height" | "both"} */
    matchSize: { type: String },
    /** @type {"width" | "height" | "both"} */
    autoSize: { type: String },
    autoSizePadding: { type: Number },
  }

  constructor() {
    super()

    this.anchorEl = null
    this.cleanup = undefined
    this.flip = false
    this.shift = false
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
        })
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
                `${availableHeight}px`
              )
            } else {
              this.style.removeProperty("--auto-size-available-height")
            }

            if (setMaxWidth) {
              this.style.setProperty(
                "--auto-size-available-width",
                `${availableWidth}px`
              )
            } else {
              this.style.removeProperty("--auto-size-available-width")
            }
          },
        })
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
