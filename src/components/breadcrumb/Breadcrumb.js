import { html, LitElement, nothing } from "lit"
import { createRef, ref } from "lit/directives/ref.js"

import styles from "./breadcrumb.css"
import { Icon } from "../icon/icon.js"
import "../menu/leu-menu.js"
import "../menu/leu-menu-item.js"
import { debounce } from "../../lib/utils.js"

/**
 * A Breadcrumb Navigation.
 *
 * The breadcrumbs can be displayed in two different layouts.
 * Only the back link (the last item / parent of the current page)
 * is displayed when…
 * -  … the width of the container is smaller
 *      than the BACK_ONLY_BREAKPOINT.
 * -  … less then two breadcrumb items could be displayed
 *      without overflowing the container.
 *
 * Otherwise as many items as possible are displayed in an inline list
 * without overflowing the container. The remaining items are displayed
 * in a dropdown menu.
 *
 * In order to determine the exact numbers of items that have to be
 * hidden inside the dropdown, all of them have to be rendered first.
 * 1. Render all items
 * 2. Calculate (measure) the number of items that can be displayed
 *    without overflowing the container.
 * 3. Updating the state (_hiddeItems) which will trigger a rerender
 * 4. Render the items again with the new state.
 *
 * This results in multiple updates scheduled one after another. Lit
 * will also print a waring in the console beacause of that.
 * It's no a nice behaviour but the only one that works without
 * having duplicate and hidden markup to derive the sizes from that.
 *
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
    _isRecalculating: { state: true },
    _isDropdownOpen: { state: true },
  }

  static BACK_ONLY_BREAKPOINT = 100

  constructor() {
    super()
    /** @type {Array} */
    this.items = []
    /** @type {Boolean} - will be used on dark Background */
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
    /**
     * @internal
     * Forces the toggle button to be rendered
     * so that all possible inline items will be measured.
     * */
    this._isRecalculating = true
    /** @internal */
    this._isDropdownOpen = false

    this.resizeObserver = new ResizeObserver(
      debounce(() => {
        this._handleResize()
      }, 500)
    )
  }

  firstUpdated() {
    this.resizeObserver.observe(this._containerRef.value)
  }

  async updated(changedProperties) {
    if (changedProperties.has("items")) {
      this._hiddenItems = 0
      this._isRecalculating = true
      await this.updateComplete
      this._checkWidth()
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    window.removeEventListener("click", this._closeDropdown)
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

  _handleResize = async () => {
    const containerOffsetWidth = this._containerRef.value.offsetWidth
    const sizeIsGrowing = containerOffsetWidth > this._lastContainerWidth
    this._lastContainerWidth = containerOffsetWidth

    /**
     * Show only the back link (parent of the current page)
     * when the width of the container is smaller than the BACK_ONLY_BREAKPOINT
     */
    if (containerOffsetWidth <= LeuBreadcrumb.BACK_ONLY_BREAKPOINT) {
      this._showBackOnly = true
      this._isRecalculating = false
      return
    }

    /**
     *  In order to calculate how many items can be displayed
     *  when the container is growing, all items have to
     *  be marked as displayed (_hiddenItems = 0) and
     *  rendered.
     */
    if (sizeIsGrowing && this._hiddenItems > 0) {
      this._hiddenItems = 0
      this._isRecalculating = true
      await this.updateComplete
    }

    this._checkWidth()
  }

  /**
   * Calculate the number of items that can be displayed
   * without overflowing the container.
   * @internal
   * @returns {void}
   */
  _checkWidth() {
    const containerOffsetWidth = this._containerRef.value.offsetWidth
    const containerScrollWidth = this._containerRef.value.scrollWidth
    this._lastContainerWidth = containerOffsetWidth

    /** When the container is not overflowing, nothing has to be done */
    if (containerOffsetWidth === containerScrollWidth) {
      this._isRecalculating = false
      return
    }

    const listItems = this._containerRef.value.querySelectorAll(
      "li:not([data-dropdown-toggle])"
    )
    const listItemWidths = [...listItems].map((o) => o.offsetWidth)

    let hiddenItems = 0
    let hiddenItemsWidth = 0

    /**
     * Remove item by item until the sum of the remaining items
     * is smaller than the width of the container.
     * The first item will not be removed.
     */
    while (
      hiddenItems < listItemWidths.length &&
      containerOffsetWidth < containerScrollWidth - hiddenItemsWidth
    ) {
      hiddenItems += 1

      hiddenItemsWidth = listItemWidths
        .slice(1, 1 + hiddenItems)
        .reduce((sum, itemWidth) => sum + itemWidth, 0)
    }

    this._hiddenItems += hiddenItems
    this._isRecalculating = false
  }

  /** @internal */
  _openDropdown = (e) => {
    e.stopPropagation()
    this._isDropdownOpen = true
    window.addEventListener("click", this._closeDropdown)
  }

  /** @internal */
  _closeDropdown = (e) => {
    e.stopPropagation()
    this._isDropdownOpen = false
    window.removeEventListener("click", this._closeDropdown)
  }

  /**
   * Render the dropdown menu
   * @returns
   */
  renderDropdown() {
    if (this._dropdownItems.length === 0 && !this._isRecalculating)
      return nothing

    return html`
      <li class="breadcrumbs__item" data-dropdown-toggle>
        <span class="breadcrumbs__icon">${Icon("angleRight")}</span>
        <div class="dropdown">
          <button class="menu" @click=${this._openDropdown} tabindex="0">
            &hellip;
          </button>
          ${this._isDropdownOpen
            ? html`<div ref=${ref(this._dropdownRef)} class="dropdown-content">
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
              </div>`
            : nothing}
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
      <nav class="breadcrumbs">
        <h2 class="visuallyhidden">Sie sind hier:</h2>
        <ol class="breadcrumbs__list" ref=${ref(this._containerRef)}>
          ${showBackOnly
            ? html`<span class="breadrumbs__icon">${Icon("arrowLeft")}</span>
                <li class="breadcrumbs__item">
                  <a class="breadcrumbs__link" href=${parentItem.href}
                    >${parentItem.label}</a
                  >
                </li>`
            : this._listItems.map(
                (item, index, list) =>
                  html`
                    <li class="breadcrumbs__item">
                      ${index > 0
                        ? html`<span class="breadcrumbs__icon"
                            >${Icon("angleRight")}</span
                          >` // First list item doesn't have an arrow
                        : nothing}
                      ${index === list.length - 1
                        ? item.label // Last list item doesn't contain a link
                        : html`<a class="breadcrumbs__link" href=${item.href}
                            >${item.label}</a
                          >`}
                    </li>
                    ${index === 0 ? this.renderDropdown() : nothing}
                  `
              )}
        </ol>
      </nav>
    `
  }
}
