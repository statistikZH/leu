import { html, LitElement } from "lit"
import { classMap } from "lit/directives/class-map.js"
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

    _active: { state: true },
  }

  constructor() {
    super()
    /** @type {Array} */
    this.items = []

    /** @internal */
    this._active = null
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
    return html`
      <div class="anchornav-title lyt-wrapper">
        <div class="grid-x grid-margin-x">
          <div
            class="cell tiny-12 xsmall-12 small-10 medium-10 large-10 xlarge-10 small-offset-2 medium-offset-2 large-offset-2 xlarge-offset-2"
          >
            <h2 class="atm-heading">Inhaltsverzeichnis</h2>
          </div>
        </div>
      </div>
      <div class="anchornav-sticky">
        <div class="lyt-wrapper">
          <div class="grid-x grid-margin-x">
            <div
              class="cell tiny-12 xsmall-12 small-10 medium-10 large-10 xlarge-10 small-offset-2 medium-offset-2 large-offset-2 xlarge-offset-2"
            >
              <div class="scroll-wrapper">
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
