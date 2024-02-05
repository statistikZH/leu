import { html, LitElement, nothing } from "lit"
import { createRef, ref } from "lit/directives/ref.js"

import styles from "./breadcrumb.css"
import { Icon } from "../icon/icon.js"
import "../menu/leu-menu.js"
import "../menu/leu-menu-item.js"
// import { debounce } from "../../lib/utils.js"

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

    // itemWidths: will be calculated on items changed
    _itemWidths: { state: true },

    // visible and small will be calculated on debounced(resize) event
    _hiddenItems: { state: true },
    _small: { state: true },
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

    this._itemWidths = null
    /** @internal */
    this._hiddenItems = 0
    /** @internal */
    this._small = null
    /** @internal */
    this._resizeListenerFunction = null

    this._lastContainerWidth = null

    this.resizeObserver = new ResizeObserver(() => {
      this._calcItemWidths()
      this._checkWidth()
    })
  }

  firstUpdated() {
    this.resizeObserver.observe(this._containerRef.value)
  }

  updated(changedProperties) {
    if (changedProperties.has("items")) {
      this._calcItemWidths()
      this._checkWidth()
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    if (
      this._dropdownRef &&
      this._dropdownRef.value &&
      this._dropdownRef.value.classList.contains("show")
    ) {
      this._closeDropdown()
    }

    this.resizeObserver.disconnect()
  }

  /** @internal */
  get _listItems() {
    return this.items.toSpliced(1, this._hiddenItems)
  }

  /** @internal */
  get _menuItems() {
    return this.items.slice(1, this._hiddenItems)
  }

  _checkWidth() {
    const containerOffsetWidth = this._containerRef.value.offsetWidth
    const containerScrollWidth = this._containerRef.value.scrollWidth

    if (containerOffsetWidth === containerScrollWidth) return

    let hiddenItems = this._itemWidths.length - 2
    let nextItemWidthSum = containerScrollWidth

    while (hiddenItems > 0 && containerOffsetWidth < nextItemWidthSum) {
      nextItemWidthSum = this._itemWidths
        .toSpliced(1, hiddenItems)
        .reduce((sum, itemWidth) => sum + itemWidth, 0)

      if (containerOffsetWidth > nextItemWidthSum) {
        hiddenItems -= 1
      }
    }

    this._hiddenItems = hiddenItems
  }

  /** @internal */
  _calcItemWidths() {
    const listItems = this._containerRef.value.querySelectorAll("li")
    this._itemWidths = [...listItems].map((o) => o.offsetWidth)
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
            &hellip;
          </button>
          <div ref=${ref(this._dropdownRef)} class="dropdown-content">
            ${html`
              <leu-menu>
                ${this._menuItems.map(
                  (item) =>
                    html`
                      <leu-menu-item
                        label=${item.label}
                        href=${item.href}
                      ></leu-menu-item>
                    `
                )}
              </leu-menu>
            `}
          </div>
        </div>
      </li>
    `
  }

  render() {
    return html`
      <nav class="fontsize">
        <h2 class="visuallyhidden">Sie sind hier:</h2>
        <ol ref=${ref(this._containerRef)}>
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
