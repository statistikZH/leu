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

    _hiddenItems: { state: true },
    _showBackOnly: { state: true },
  }

  static BACK_ONLY_BREAKPOINT = 100

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
    /** @internal */
    this._hiddenItems = 0
    /** @internal */
    this._showBackOnly = null
    /** @internal */
    this._lastContainerWidth = null

    this.resizeObserver = new ResizeObserver(() => {
      this._checkWidth()
    })
  }

  firstUpdated() {
    this.resizeObserver.observe(this._containerRef.value)
  }

  updated(changedProperties) {
    if (changedProperties.has("items")) {
      this._checkWidth()
    }

    if (
      changedProperties.has("_hiddenItems") &&
      changedProperties.get("_hiddenItems") > this._hiddenItems
    ) {
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
  get _dropdownItems() {
    return this.items.slice(1, 1 + this._hiddenItems)
  }

  _checkWidth() {
    const containerOffsetWidth = this._containerRef.value.offsetWidth
    const containerScrollWidth = this._containerRef.value.scrollWidth

    const sizeIsGrowing = containerOffsetWidth > this._lastContainerWidth

    this._lastContainerWidth = containerOffsetWidth

    if (containerOffsetWidth <= LeuBreadcrumb.BACK_ONLY_BREAKPOINT) {
      this._showBackOnly = true
      return
    }

    this._showBackOnly = false

    if (sizeIsGrowing) {
      this._hiddenItems = 0
      return
    }

    if (containerOffsetWidth === containerScrollWidth) return

    const listItems = this._containerRef.value.querySelectorAll("li")
    const listItemWidths = [...listItems].map((o) => o.offsetWidth)

    let hiddenItems = 0
    let nextItemWidthSum = containerScrollWidth

    while (
      hiddenItems < listItemWidths.length &&
      containerOffsetWidth < nextItemWidthSum
    ) {
      hiddenItems += 1

      nextItemWidthSum = listItemWidths
        .toSpliced(1, hiddenItems)
        .reduce((sum, itemWidth) => sum + itemWidth, 0)
    }

    this._hiddenItems += hiddenItems
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
   * Render the dropdown menu
   * @returns
   */
  renderDropdown() {
    if (this._dropdownItems.length === 0) return nothing

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
                ${this._dropdownItems.map(
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
    if (this.items.length < 2) return nothing

    const parentItem = this.items[this.items.length - 2]

    const showBackOnly =
      this._showBackOnly || this.items.length - this._hiddenItems < 2

    return html`
      <nav class="fontsize">
        <h2 class="visuallyhidden">Sie sind hier:</h2>
        <ol ref=${ref(this._containerRef)}>
          ${showBackOnly
            ? html`${Icon("arrowLeft")}<a href=${parentItem.href}
                  >${parentItem.label}</a
                >`
            : this._listItems.map(
                (item, index, list) =>
                  html`
                    <li>
                      ${index > 0
                        ? html`<span>${Icon("angleRight")}</span>` // First list item should not have an arrow
                        : nothing}
                      ${index === list.length - 1
                        ? item.label // Last list item should not be a link
                        : html`<a href=${item.href}>${item.label}</a>`}
                    </li>
                    ${index === 0 ? this.renderDropdown() : nothing}
                  `
              )}
        </ol>
      </nav>
    `
  }
}
