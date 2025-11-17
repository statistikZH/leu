import { html, nothing } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { createRef, ref } from "lit/directives/ref.js"

import { LeuElement } from "../../lib/LeuElement.js"
import { styleMap } from "../../lib/styleMap.js"
import { LeuIcon } from "../icon/Icon.js"
import { LeuPagination } from "../pagination/Pagination.js"

import styles from "./table.css"

/**
 * @tagname leu-table
 */
export class LeuTable extends LeuElement {
  static dependencies = {
    "leu-icon": LeuIcon,
    "leu-pagination": LeuPagination,
  }

  static styles = [LeuElement.styles, styles]

  static properties = {
    columns: { type: Array },
    data: { type: Array },
    firstColumnSticky: { type: Boolean, reflect: true },
    itemsPerPage: { type: Number, reflect: true },
    sortIndex: { type: Number, reflect: true },
    sortOrderAsc: { type: Boolean, reflect: true },
    width: { type: Number, reflect: true },

    _shadowLeft: { state: true },
    _shadowRight: { state: true },
    _page: { state: true },
  }

  constructor() {
    super()
    /** @type {array} */
    this.columns = []
    /** @type {array} */
    this.data = []
    /** @type {boolean} */
    this.firstColumnSticky = false
    /** @type {number} */
    this.itemsPerPage = null
    /** @type {number} */
    this.sortIndex = null
    /** @type {boolean} */
    this.sortOrderAsc = false
    /** @type {number} */
    this.width = null

    /** @internal */
    this._shadowLeft = false
    /** @internal */
    this._shadowRight = false
    /** @internal */
    this._scrollRef = createRef()

    /** @internal */
    this._page = 1

    this._resizeObserver = new ResizeObserver(() => {
      this.shadowToggle(this._scrollRef.value)
    })
  }

  disconnectedCallback() {
    this._resizeObserver.disconnect()
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal)

    if (name === "itemsperpage" || name === "data") {
      this._page = 1
    }
  }

  firstUpdated() {
    this.shadowToggle(this._scrollRef.value)

    this._resizeObserver.observe(this._scrollRef.value)
  }

  shadowToggle(target) {
    this._shadowLeft = target.scrollLeftMax > 0 && target.scrollLeft > 0
    this._shadowRight =
      target.scrollLeftMax > 0 && target.scrollLeft < target.scrollLeftMax
  }

  scrollEvent(event) {
    this.shadowToggle(event.target)
  }

  isOnePropNotValid() {
    if (!this._columns) {
      return "Der Parameter 'columns' ist erforderlich !"
    }
    if (!this._sortedData) {
      return "Der Parameter 'data' ist erforderlich !"
    }
    return null
  }

  isSorted(col) {
    return this.sortIndex === this._columns.indexOf(col)
  }

  sortClick(col) {
    const index = this._columns.indexOf(col)
    if (this.sortIndex === index) {
      this.sortOrderAsc = !this.sortOrderAsc
    } else {
      this.sortIndex = index
      this.sortOrderAsc = false
    }
  }

  sortArrowIcon() {
    return html`<leu-icon
      name=${this.sortOrderAsc ? "arrowDown" : "arrowUp"}
    ></leu-icon>`
  }

  get _columns() {
    return this.columns
  }

  get _sortedData() {
    if (this.sortIndex === null || this.sortIndex === undefined) {
      return this.data
    }
    const col = this._columns[this.sortIndex]
    return this.data.sort(this.sortOrderAsc ? col.sort.asc : col.sort.desc)
  }

  get _data() {
    return this.itemsPerPage && this.itemsPerPage > 0
      ? this._sortedData.slice(
          (this._page - 1) * this.itemsPerPage,
          this._page * this.itemsPerPage,
        )
      : this._sortedData
  }

  render() {
    const scrollClasses = {
      scroll: true,
      "shadow-left": this.firstColumnSticky && this._shadowLeft,
    }

    const shadowClassesLeft = {
      shadow: true,
      "shadow-left": !this.firstColumnSticky && this._shadowLeft,
      pagination: this.itemsPerPage > 0,
    }

    const shadowClassesRight = {
      shadow: true,
      "shadow-right": this._shadowRight,
      pagination: this.itemsPerPage > 0,
    }

    const stickyClass = {
      sticky: this.firstColumnSticky,
    }

    function headerStyle(col) {
      if (col.headerStyle) {
        return styleMap({
          ...col.headerStyle(),
          textAlign: col.align === "right" ? "right" : undefined,
        })
      }
      return col.align === "right" ? styleMap({ textAlign: "right" }) : nothing
    }

    function bodyStyle(col, row) {
      if (col.style) {
        return styleMap({
          ...col.style(row),
          textAlign: col.align === "right" ? "right" : undefined,
        })
      }
      return col.align === "right" ? styleMap({ textAlign: "right" }) : nothing
    }

    return html`
      <div
        class=${classMap(scrollClasses)}
        @scroll="${this.scrollEvent}"
        ref=${ref(this._scrollRef)}
      >
        <table class=${classMap(stickyClass)}>
          <thead>
            <tr>
              ${this._columns.map(
                (col) =>
                  html`<th style=${headerStyle(col)}>
                    ${col.sort
                      ? html`<button
                          @click=${(_) => this.sortClick(col)}
                          class=${this.isSorted(col) ? "active" : nothing}
                        >
                          ${col.align === "right"
                            ? this.sortArrowIcon()
                            : nothing}
                          <span>${col.name}</span>
                          ${col.align !== "right"
                            ? this.sortArrowIcon()
                            : nothing}
                        </button>`
                      : col.name}
                  </th>`,
              )}
            </tr>
          </thead>
          <tbody>
            ${this._data.map(
              (row) =>
                html`<tr>
                  ${this._columns.map(
                    (col) =>
                      html`<td style=${bodyStyle(col, row)}>
                        ${col.value(row)}
                      </td>`,
                  )}
                </tr>`,
            )}
          </tbody>
        </table>
        <div class=${classMap(shadowClassesLeft)}></div>
        <div class=${classMap(shadowClassesRight)}></div>
      </div>

      ${this.itemsPerPage > 0
        ? html`
            <leu-pagination
              .numOfItems=${this._sortedData.length}
              .itemsPerPage=${this.itemsPerPage}
              page=${this._page}
              @leu:pagechange=${(e) => {
                this._page = e.detail.page
              }}
            >
            </leu-pagination>
          `
        : nothing}
    `
  }
}
