import { html, LitElement } from "lit"
import { live } from "lit/directives/live.js"

import "../button/leu-button.js"
import styles from "./pagination.css"

import "../visually-hidden/leu-visually-hidden.js"

const MIN_PAGE = 1

/**
 * @tagname leu-pagination
 */
export class LeuPagination extends LitElement {
  static styles = styles

  /**
   * @internal
   */
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  }

  static events = {
    range: {},
  }

  static properties = {
    defaultPage: { type: Number, reflect: true },
    itemsPerPage: { type: Number, reflect: true },
    numOfItems: { type: Number, reflect: true },

    /**
     * Internal page state that contains an
     * already clamped page number. Should only
     * be accessed through the `page` getter and
     * setter.
     * @type {Number}
     * @internal
     */
    _page: { state: true },
  }

  constructor() {
    super()

    /** @type {Number} */
    this.numOfItems = 1
    /** @type {Number} */
    this.itemsPerPage = 1
    /** @type {Number} */
    this._page = 1
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal)

    if (name === "defaultpage" && newVal !== oldVal) {
      this.page = parseInt(newVal, 10)
    }
  }

  get page() {
    return this._page
  }

  set page(page) {
    this._page = this._clampPage(page)
  }

  get startIndex() {
    return (this.page - 1) * this.itemsPerPage
  }

  get endIndex() {
    return Math.min(this.startIndex + this.itemsPerPage, this.numOfItems)
  }

  get _maxPage() {
    return Math.ceil(this.numOfItems / this.itemsPerPage)
  }

  _isFirstPage() {
    return this.page === MIN_PAGE
  }

  _isLastPage() {
    return this.page === this._maxPage
  }

  _clampPage(page) {
    return Math.min(Math.max(page, MIN_PAGE), this._maxPage)
  }

  _updatePage(page) {
    const prevPage = this.page
    this.page = this._clampPage(page)

    if (this.page !== prevPage) {
      this.dispatchEvent(
        new CustomEvent("leu:pagechange", {
          detail: {
            startIndex: this.startIndex,
            endIndex: this.endIndex,
            page: this.page,
          },
          bubbles: false,
        })
      )
    }
  }

  _handleChange(event) {
    this._updatePage(parseInt(event.target.value, 10) || 0)
  }

  _handleInput(event) {
    if (event.target.value !== "") {
      event.preventDefault()
      this._handleChange(event)
    }
  }

  _handleKeyDown(event) {
    if (event.key === "ArrowUp") {
      event.preventDefault()
      this._updatePage(this.page + 1)
    }
    if (event.key === "ArrowDown") {
      event.preventDefault()
      this._updatePage(this.page - 1)
    }
  }

  render() {
    return html`
      <leu-visually-hidden>
        <label for="page-input">Aktuelle Seite</label>
      </leu-visually-hidden>
      <input
        id="page-input"
        class="input"
        min=${MIN_PAGE}
        max=${this._maxPage}
        .value=${live(this.page.toString())}
        @input=${this._handleInput}
        @change=${this._handleChange}
        @keydown=${this._handleKeyDown}
        type="number"
      />
      <div class="label">von ${this._maxPage}</div>
      <div class="button-group">
        <leu-button
          icon="angleLeft"
          variant="secondary"
          label="Vorherige Seite"
          @click=${(_) => {
            this._updatePage(this.page - 1)
          }}
          ?disabled=${this._isFirstPage()}
        ></leu-button>
        <leu-button
          icon="angleRight"
          variant="secondary"
          label="Nächste Seite"
          @click=${(_) => {
            this._updatePage(this.page + 1)
          }}
          ?disabled=${this._isLastPage()}
        ></leu-button>
      </div>
    `
  }
}
