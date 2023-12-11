import { html, LitElement, nothing } from "lit"
import { createRef, ref } from "lit/directives/ref.js"
import { defineElement } from "../../lib/defineElement.js"
import styles from "./breadcrumb.css"
import { Icon } from "../icon/icon.js"
import { defineMenuElements } from "../menu/Menu.js"
import { defineMenuItemElements } from "../menu/MenuItem.js"
import { debounce } from "../../lib/utils.js"

/**
 * A Breadcrumb Navigation.
 *
 * @prop {Array} items - Object array with { label, href }
 * @prop {Boolean} inverted - invert color on dark background
 *
 * @tagname leu-breadcrumb
 */
export class LeuBreadcrumb extends LitElement {
  static styles = styles

  static properties = {
    items: { type: Array },
    inverted: { type: Boolean, reflect: true },

    // allListElementWidths: will be calculated on items changed
    _allListElementWidths: { state: true },

    // visible and small will be calculated on debounced(resize) event
    _visible: { state: true },
    _small: { state: true },

    // hold the reference to resize listener for remove later
    _resizeListenerFunction: { state: true },
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
    this._dropdownRef = createRef()
    /** @internal - will only be calculated at beginning and items changed (set items) */

    this._allListElementWidths = null
    /** @internal */
    this._visible = null
    /** @internal */
    this._small = null
    /** @internal */
    this._resizeListenerFunction = null
  }

  firstUpdated() {
    this._calcAllListElementWidths()
  }

  connectedCallback() {
    super.connectedCallback()
    this._resizeListenerFunction = debounce(this._toggleListItemsVisible, 100)
    window.addEventListener("resize", this._resizeListenerFunction, true)
  }

  disconnectedCallback() {
    if (
      this._dropdownRef &&
      this._dropdownRef.value &&
      this._dropdownRef.value.classList.contains("show")
    ) {
      this._closeDropdown()
    }
    window.removeEventListener("resize", this._resizeListenerFunction, true)
    super.disconnectedCallback()
  }

  /**
   * Update Items
   * @param {Array} items
   */
  setItems(items) {
    this.items = items
    // one frame timeout to wait after rendered
    setTimeout(() => {
      this._calcAllListElementWidths()
    }, 0)
  }

  /** @internal */
  get _listItems() {
    return this._visible
      ? this.items.filter((_, i) => this._visible[i])
      : this.items
  }

  /** @internal */
  get _menuItems() {
    return this._visible ? this.items.filter((_, i) => !this._visible[i]) : []
  }

  /** @internal */
  _calcAllListElementWidths() {
    const allListElements = this._containerRef.value.querySelectorAll("li")
    this._allListElementWidths = [...allListElements].map((o) => o.offsetWidth)
    this._toggleListItemsVisible()
  }

  /** @internal */
  _toggleListItemsVisible = () => {
    // arrow function to use this in event listener
    const smallBreakpoint = 340
    this._small = window.innerWidth <= smallBreakpoint
    const ol = this._containerRef.value
    if (ol) {
      // after parent dom was manipulated, the ref is for one render cyclus not available
      const containerWidth = ol.offsetWidth - this._allListElementWidths[0]
      this._visible = this.items.map((o, i) => {
        if (this._small) {
          return i === this.items.length - 2
        }
        return (
          i === 0 ||
          this._allListElementWidths.slice(i).reduce((a, b) => a + b, 0) <
            containerWidth
        )
      })
    }
  }

  /** @internal */
  _openDropdown = (e) => {
    // arrow function to use this in event listener
    if (e) {
      e.stopPropagation()
    }
    this._dropdownRef.value.classList.add("show")
    window.addEventListener("click", this._closeDropdown)
  }

  /** @internal */
  _closeDropdown = (e) => {
    // arrow function to use this in event listener
    if (e) {
      e.stopPropagation()
    }
    this._dropdownRef.value.classList.remove("show")
    window.removeEventListener("click", this._closeDropdown)
  }

  /**
   * Render the ... Dowpdown-Menu
   * @returns
   */
  renderMenuItem() {
    return html`
      <li>
        <span>${Icon("angleRight")}</span>
        <div class="dropdown">
          <button class="menu" @click=${this._openDropdown} tabindex="0">
            ...
          </button>
          <div ref=${ref(this._dropdownRef)} class="dropdown-content">
            ${html`
              <leu-menu>
                ${this._menuItems.map(
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

  /**
   * A hidden copy is needed for calculation of width from li Elements
   * If items change with setItems(), the visible colapsed doesn't work
   * @returns
   */
  renderHiddenListForWidthCalc() {
    return html`
      <ol ref=${ref(this._containerRef)} class="hidden" aria-hidden="true">
        ${this.items.map((item) => html`<li>${item.label}</li>`)}
      </ol>
    `
  }

  render() {
    return html`
      <nav class="fontsize">
        <h2 class="visuallyhidden">Sie sind hier:</h2>
        ${this.renderHiddenListForWidthCalc()}
        <ol>
          ${this._listItems.map(
            (item, index) =>
              html`
                <li>
                  ${this._small || index > 0
                    ? html`${Icon(
                        this._small ? "arrowLeft" : "angleRight"
                      )}</span>`
                    : nothing}
                  ${this._small || index + 1 < this._listItems.length
                    ? html`<a href=${item.href}>${item.label}</a>`
                    : html`${item.label}`}
                </li>
                ${!this._small && this._menuItems.length && index === 0
                  ? this.renderMenuItem()
                  : nothing}
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
