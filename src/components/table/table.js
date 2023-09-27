import { html, css, LitElement, nothing } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { styleMap } from "lit/directives/style-map.js"
import { createRef, ref } from "lit/directives/ref.js"
import { Icon } from "../icon/icon.js"

export class LeuTable extends LitElement {
  static styles = css`
    :host {
      position: relative;
      display: block;
    }
    :host div.scroll {
      display: inline-block;
      max-width: 100%;
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
      border-spacing: 0;
      color: rgba(0, 0, 0, 0.6);
      font-size: 16px;
      font-family: var(--leu-font-regular);
      line-height: 1.5;
    }
    :host td {
      padding: 12px;
    }
    :host td:first-child,
    :host th:first-child {
      left: 0;
      background: inherit;
      z-index: 1;
    }
    :host th {
      padding: 16px 16px 8px;
      text-align: left;
      font-size: 12px;
      font-family: var(--leu-font-black);
      background: var(--table-even-row-bg);
    }
    :host tr {
      background: #ffffff;
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
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      clip-path: inset(0px -15px 0px 0px);
    }
    :host div.shadow-left {
      box-shadow: inset 5px 0 5px -5px rgba(0, 0, 0, 0.5);
    }
    :host div.shadow-right {
      box-shadow: inset -5px 0 5px -5px rgba(0, 0, 0, 0.5);
    }
  `

  static properties = {
    columns: { type: Array },
    data: { type: Array },
    firstColumnSticky: { type: Boolean },
    sortIndex: { type: Number, reflect: true },
    sortOrderAsc: { type: Boolean, reflect: true },

    _shadowLeft: { type: Boolean, state: true },
    _shadowRight: { type: Boolean, state: true },
  }

  constructor() {
    super()
    this.firstColumnSticky = false
    this._sortArrowDown = Icon("arrowDown", 20)
    this._sortArrowUp = Icon("arrowUp", 20)

    this._shadowLeft = false
    this._shadowRight = false
    this._scrollRef = createRef()
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
    if (!this.columns) {
      return "Der Parameter 'columns' ist erforderlich !"
    }
    if (!this.data) {
      return "Der Parameter 'data' ist erforderlich !"
    }
    return null
  }

  isSorted(col) {
    return this.sortIndex === this.columns.indexOf(col)
  }

  sortClick(col) {
    const index = this.columns.indexOf(col)
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

  get sortedData() {
    if (this.sortIndex === null || this.sortIndex === undefined) {
      return this.data
    }
    const col = this.columns[this.sortIndex]
    return this.data.sort(this.sortOrderAsc ? col.sort.asc : col.sort.desc)
  }

  render() {
    const check = this.isOnePropNotValid()
    if (check) {
      return check
    }

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
              ${this.columns.map(
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
            ${this.sortedData.map(
              (row) =>
                html`<tr>
                  ${this.columns.map(
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
      </div>
      <div class=${classMap(shadowClasses)}></div>
    `
  }
}
