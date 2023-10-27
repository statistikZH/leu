import { html, css, LitElement, nothing } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { styleMap } from "lit/directives/style-map.js"
import { createRef, ref } from "lit/directives/ref.js"
import { Icon } from "../icon/icon.js"
import { defineElement } from "../../lib/defineElement.js"
import { definePaginationElements } from "../pagination/Pagination.js"

/**
 * @tagname leu-table
 */
export class LeuTable extends LitElement {
  static styles = css`
    :host {
      position: relative;
      display: block;
    }
    :host div.scroll {
      display: inline-block;
      width: 100%;
      overflow: auto;
    }
    :host div.shadow {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }
    :host table {
      width: 100%;
      border-spacing: 0;
      color: rgb(0 0 0 / 60%);
      font-size: 16px;
      font-family: var(--leu-font-regular);
      line-height: 1.5;
    }
    :host td {
      padding: 12px;
    }
    :host th {
      padding: 16px 16px 8px;
      text-align: left;
      font-size: 12px;
      font-family: var(--leu-font-black);
      background: var(--table-even-row-bg);
    }
    :host td:first-child,
    :host th:first-child {
      left: 0;
      background: inherit;
      z-index: 1;
    }
    :host tr {
      background: #fff;
    }
    :host tbody tr:nth-child(odd) {
      background: var(--leu-color-black-5);
    }
    :host button {
      background: none;
      cursor: pointer;
      line-height: 1.5;
      padding: 0;
      border: 0;
      width: 100%;
      display: flex;
      align-items: flex-center;
      font-size: inherit;
      font-family: inherit;
    }
    :host thead svg {
      display: inline-block;
      color: var(--leu-color-accent-blue);
      padding: 0;
    }

    :host table.sticky td:first-child,
    :host table.sticky th:first-child {
      position: sticky;
    }
    :host div.shadow-left table.sticky td:first-child,
    :host div.shadow-left table.sticky th:first-child {
      box-shadow: 0 0 5px rgb(0 0 0 / 50%);
      clip-path: inset(0 -15px 0 0);
    }
    :host div.shadow-left {
      box-shadow: inset 5px 0 5px -5px rgb(0 0 0 / 50%);
    }
    :host div.shadow-right {
      box-shadow: inset -5px 0 5px -5px rgb(0 0 0 / 50%);
    }
  `

  static properties = {
    columns: { type: Array },
    data: { type: Array },
    firstColumnSticky: { type: Boolean },
    itemsOnAPage: { type: Number },
    sortIndex: { type: Number },
    sortOrderAsc: { type: Boolean },

    _shadowLeft: { type: Boolean, state: true },
    _shadowRight: { type: Boolean, state: true },
    _min: { type: Number, state: true },
    _max: { type: Number, state: true },
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
    this.itemsOnAPage = null
    /** @type {number} */
    this.sortIndex = null
    /** @type {boolean} */
    this.sortOrderAsc = false

    /** @internal */
    this._sortArrowDown = Icon("arrowDown", 20)
    /** @internal */
    this._sortArrowUp = Icon("arrowUp", 20)
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
  }

  firstUpdated() {
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
      this.sortOrder = "asc"
    }
  }

  sortArrowIcon() {
    return html`${this.sortOrderAsc ? this._sortArrowDown : this._sortArrowUp}`
  }

  sortArrow(col) {
    return html` ${this.isSorted(col) ? this.sortArrowIcon() : nothing} `
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
    return this.itemsOnAPage && this.itemsOnAPage > 0
      ? this._sortedData.slice(this._min, this._max)
      : this._sortedData
  }

  render() {
    const scrollClasses = {
      scroll: true,
      "shadow-left": this.firstColumnSticky && this._shadowLeft,
    }

    const shadowClasses = {
      shadow: true,
      "shadow-left": !this.firstColumnSticky && this._shadowLeft,
      "shadow-right": this._shadowRight,
    }

    const stickyClass = {
      sticky: this.firstColumnSticky,
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
                  html`<th>
                    ${col.sort
                      ? html`<button @click=${(_) => this.sortClick(col)}>
                          <span>${col.name}</span>
                          ${this.sortArrow(col)}
                        </button>`
                      : col.name}
                  </th>`
              )}
            </tr>
          </thead>
          <tbody>
            ${this._data.map(
              (row) =>
                html`<tr>
                  ${this._columns.map(
                    (col) =>
                      html`<td
                        style=${col.style ? styleMap(col.style(row)) : nothing}
                      >
                        ${col.value(row)}
                      </td>`
                  )}
                </tr>`
            )}
          </tbody>
        </table>
        ${this.itemsOnAPage > 0
          ? html`
              <leu-pagination
                .dataLength=${this._sortedData.length}
                .itemsOnAPage=${this.itemsOnAPage}
                @range-updated=${(e) => {
                  this._min = e.detail.min
                  this._max = e.detail.max
                }}
              >
              </leu-pagination>
            `
          : nothing}
      </div>
      <div class=${classMap(shadowClasses)}></div>
    `
  }
}

export function defineTableElements() {
  definePaginationElements()
  defineElement("table", LeuTable)
}
