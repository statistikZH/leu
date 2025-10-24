import { html, PropertyValues } from "lit"
import { property } from "lit/decorators.js"
import {
  autoUpdate,
  computePosition,
  flip,
  Placement,
  shift,
  size,
} from "@floating-ui/dom"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./popup.css"

export interface VirtualElement {
  getBoundingClientRect: () => DOMRect
  contextElement?: Element
}

function isVirtualElement(el: unknown): el is VirtualElement {
  return (
    el !== null &&
    typeof el === "object" &&
    "getBoundingClientRect" in el &&
    ("contextElement" in el ? el instanceof Element : true)
  )
}

/**
 * @tagname leu-popup
 */
export class LeuPopup extends LeuElement {
  static styles = [LeuElement.styles, styles]

  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  @property() anchor: Element | string | VirtualElement

  @property({ type: Boolean, reflect: true })
  active: boolean = false

  @property({ type: String, reflect: true })
  placement?: Placement

  @property({ type: Boolean, reflect: true })
  flip: boolean = false

  @property({ type: Boolean, reflect: true })
  shift: boolean = false

  @property({ type: Number, reflect: true })
  shiftPadding: number = 0

  @property({ type: String, reflect: true })
  matchSize?: "width" | "height" | "both"

  @property({ type: String, reflect: true }) autoSize?:
    | "width"
    | "height"
    | "both"

  @property({ type: Number, reflect: true }) autoSizePadding: number = 0

  private anchorEl: Element | null

  private cleanup: ReturnType<typeof autoUpdate> | undefined

  disconnectedCallback() {
    super.disconnectedCallback()
    this.stop()
  }

  updated(changedProperties: PropertyValues<this>) {
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

  protected get popupEl() {
    return this.renderRoot?.querySelector<HTMLDivElement>(".popup") ?? null
  }

  protected start() {
    if (!this.anchorEl || !this.active) return

    this.cleanup = autoUpdate(this.anchorEl, this.popupEl, () => {
      this.reposition()
    })
  }

  protected stop() {
    this.cleanup?.()

    this.style.removeProperty("--auto-size-available-width")
    this.style.removeProperty("--auto-size-available-height")
  }

  public reposition() {
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
      const root = this.getRootNode() as Document | ShadowRoot
      this.anchorEl = root.getElementById(this.anchor)
    } else if (
      this.anchor instanceof HTMLElement ||
      isVirtualElement(this.anchor)
    ) {
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
