import { html, LitElement } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { createRef, ref } from "lit/directives/ref.js"
import { defineElement } from "../../lib/defineElement.js"
import styles from "./anchornav.css"
import grid from "./grid.css"

/**
 * @tagname leu-anchornav
 */
export class LeuAnchornav extends LitElement {
  static styles = [styles, grid]

  static properties = {
    itmes: { type: Array },

    _shadowLeft: { type: Boolean, state: true },
    _shadowRight: { type: Boolean, state: true },
    _min: { type: Number, state: true },
    _max: { type: Number, state: true },
    _active: { type: String, state: true },
  }

  constructor() {
    super()
    /** @type {Array} */
    this.items = []

    /** @internal */
    this._shadowLeft = false
    /** @internal */
    this._shadowRight = false
    /** @internal */
    this._scrollRef = createRef()
    /** @internal */
    this._min = 0
    /** @internal */
    this._max = null
    /** @internal */
    this._active = null
  }

  firstUpdated() {
    this._active =
      document.location.hash !== ""
        ? document.location.hash.substring(1)
        : this.items[0].id
    this.shadowToggle(this._scrollRef.value)
  }

  shadowToggle(target) {
    this._shadowLeft = target.scrollLeftMax > 0 && target.scrollLeft > 0
    this._shadowRight =
      target.scrollLeftMax > 0 && target.scrollLeft < target.scrollLeftMax
  }

  scrollEvent(event) {
    this.shadowToggle(event.target)
  }

  static click(event, id) {
    event.stopPropagation()
    const found = document.querySelector(`#${id}`)
    if (found) {
      const top = found.offsetY
      window.scrollTo({
        top,
        left: 0,
        behavior: "smooth",
      })
    }
  }

  render() {
    const shadowClassesLeft = {
      shadow: true,
      "shadow-left": this._shadowLeft,
      pagination: this.itemsOnAPage > 0,
    }

    const shadowClassesRight = {
      shadow: true,
      "shadow-right": this._shadowRight,
      pagination: this.itemsOnAPage > 0,
    }

    return html`
      <div class="anchornav">
        <div class="lyt-wrapper">
          <div class="grid-x grid-margin-x">
            <div
              class="cell tiny-12 xsmall-12 small-10 medium-10 large-10 xlarge-10 small-offset-2 medium-offset-2 large-offset-2 xlarge-offset-2"
            >
              <div ref=${ref(this._scrollRef)} @scroll="${this.scrollEvent}">
                <h2 class="atm-heading">Inhaltsverzeichnis</h2>
                <ul>
                  ${this.items.map(
                    (item) =>
                      html`
                        <li>
                          <a
                            class=${classMap({
                              active: this._active === item.i,
                            })}
                            href="#${item.id}"
                            @click=${(e) => LeuAnchornav.click(e, item.id)}
                          >
                            ${item.label}
                          </a>
                        </li>
                      `
                  )}
                </ul>
                <div class=${classMap(shadowClassesLeft)}></div>
                <div class=${classMap(shadowClassesRight)}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
}

export function defineAnchornavElements() {
  defineElement("anchornav", LeuAnchornav)
}
