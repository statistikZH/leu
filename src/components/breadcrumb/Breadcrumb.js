import { html, LitElement, nothing } from "lit"
import { createRef, ref } from "lit/directives/ref.js"
import { classMap } from "lit/directives/class-map.js"
import { defineElement } from "../../lib/defineElement.js"
import styles from "./breadcrumb.css"
import { Icon } from "../icon/icon.js"
import { defineMenuElements } from "../menu/Menu.js"
import { defineMenuItemElements } from "../menu/MenuItem.js"

/**
 * A tBreadcrumb Navigation.
 *
 * @prop {Array} items - Object array with { label, href }
 *
 * @tagname leu-breadcrumb
 */
export class LeuBreadcrumb extends LitElement {
  static styles = styles

  static properties = {
    items: { type: Array },
    inverted: { type: Boolean, reflect: true },
    _widths: { type: Array },
    _visible: { type: Array },
    _small: { type: Array },
    _dropdown: { type: Object },
  }

  constructor() {
    super()
    /** @type {array} */
    this.items = []
    /** @type {boolean} - will be used on dark Background */
    this.inverted = false

    /** @internal */
    this._containerRef = createRef()
    /** @internal */
    this._widths = null
    /** @internal */
    this._visible = null
    /** @internal */
    this._small = null
    /** @internal */
    this._dropdown = null
  }

  firstUpdated() {
    const ol = this._containerRef.value
    this._widths = [...ol.querySelectorAll("li")].map((o) => o.offsetWidth)

    this.toggleVisible()
    window.addEventListener("resize", this.toggleVisible)
  }

  toggleVisible = () => {
    // arrow function to use this in event listener
    const smallBreakpoint = 340
    this._small = window.innerWidth <= smallBreakpoint
    const ol = this._containerRef.value
    if (ol) {
      // after parent dom was manipulated, the ref is for one render cyclus not available
      const containerWidth = ol.offsetWidth - this._widths[0]
      this._visible = this.items.map((o, i) => {
        if (this._small) {
          return i === this.items.length - 2
        }
        return (
          i === 0 ||
          this._widths.slice(i).reduce((a, b) => a + b, 0) < containerWidth
        )
      })
    }
  }

  static openDropdown(e) {
    const dropdown = e.target.parentNode.querySelector(".dropdown-content")
    dropdown.classList.toggle("show")
    e.stopPropagation()
    if (dropdown.classList.contains("show")) {
      window.addEventListener("click", () =>
        LeuBreadcrumb.closeDropdown(dropdown)
      )
    } else {
      window.removeEventListener("click", () =>
        LeuBreadcrumb.closeDropdown(dropdown)
      )
    }
  }

  static closeDropdown(dropdown) {
    dropdown.classList.remove("show")
  }

  renderMenuItem() {
    return html`
      <li>
        <span>${Icon("angleRight")}</span>
        <div class="dropdown">
          <button
            class="menu"
            @click=${LeuBreadcrumb.openDropdown}
            tabindex="0"
          >
            ...
          </button>
          <div class="dropdown-content">
            ${html`
              <leu-menu>
                ${this.menuItems.map(
                  (item) =>
                    html`
                      <a href=${item.href} tabindex="0">
                        <leu-menu-item> ${item.label} </leu-menu-item>
                      </a>
                    `
                )}
              </leu-menu>
            `}
          </div>
        </div>
      </li>
    `
  }

  get menuItems() {
    return this.items.filter((_, i) => !this._visible || !this._visible[i])
  }

  render() {
    return html`
      <nav class="fontsize">
        <h2 class="visuallyhidden">Sie sind hier:</h2>
        <ol ref=${ref(this._containerRef)}>
          ${this.items.map(
            (item, index) =>
              html`
                ${!this._small &&
                this._visible &&
                this._visible.filter((o) => !o).length &&
                index === 1
                  ? this.renderMenuItem()
                  : nothing}
                <li
                  class=${classMap({
                    hidden: !(!this._visible || this._visible[index]),
                  })}
                >
                  ${index > 0
                    ? html`
                        <span>
                          ${Icon(this._small ? "arrowLeft" : "angleRight")}
                        </span>
                      `
                    : nothing}
                  ${index + 1 < this.items.length
                    ? html` <a href=${item.href}> ${item.label} </a> `
                    : html`${item.label}`}
                </li>
              `
          )}
        </ol>
      </nav>
    `
  }
}

export function defineBreadcrumbElements() {
  defineMenuElements()
  defineMenuItemElements()
  defineElement("breadcrumb", LeuBreadcrumb)
}
