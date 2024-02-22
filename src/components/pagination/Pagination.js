import { html, LitElement } from "lit"
import { live } from "lit/directives/live.js"

import "../button/leu-button.js"
import styles from "./pagination.css"

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
    page: { type: Number, reflect: true },
    itemsPerPage: { type: Number, reflect: true },
    numOfItems: { type: Number, reflect: true },
  }

  constructor() {
    super()
    /** @type {number} */
    this.page = 1
    /** @type {number} */
    this.numOfItems = 1
    /** @type {number} */
    this.itemsPerPage = 1
  }

  get maxPage() {
    return Math.ceil(this.numOfItems / this.itemsPerPage)
  }

  get firstPage() {
    return this.boundPage === MIN_PAGE
  }

  get lastPage() {
    return this.boundPage === this.maxPage
  }

  /**
   * The boundPage getter is necessary to ensure that the current page (this.page) is always within the valid range of pages.
   * It prevents the page number from going below the minimum page limit (MIN_PAGE) or above the maximum page limit (this.maxPage).
   * This is important for the correct functioning of the pagination system, as it prevents users from navigating to non-existent pages.
   *
   * @returns {number}
   */
  get boundPage() {
    return Math.min(Math.max(this.page, MIN_PAGE), this.maxPage)
  }

  numberUpdate(number) {
    const prevPage = this.page
    this.page = number

    if (this.page !== prevPage) {
      const startIndex = (this.boundPage - 1) * this.itemsPerPage
      const endIndex = Math.min(startIndex + this.itemsPerPage, this.numOfItems)
      this.dispatchEvent(
        new CustomEvent("leu:pagechange", {
          detail: {
            startIndex,
            endIndex,
            page: this.boundPage,
          },
          bubbles: false,
        })
      )
    }
  }

  change(event) {
    this.numberUpdate(parseInt(event.target.value, 10) || 0)
  }

  input(event) {
    if (event.target.value !== "") {
      event.preventDefault()
      this.change(event)
    }
  }

  keydown(event) {
    if (event.key === "ArrowUp") {
      event.preventDefault()
      this.numberUpdate(this.boundPage + 1)
    }
    if (event.key === "ArrowDown") {
      event.preventDefault()
      this.numberUpdate(this.boundPage - 1)
    }
  }

  render() {
    return html`
      <input
        class="input"
        min=${MIN_PAGE}
        max=${this.maxPage}
        .value=${live(this.boundPage.toString())}
        @input=${this.input}
        @change=${this.change}
        @keydown=${this.keydown}
        type="number"
      />
      <div class="label">von ${this.maxPage}</div>
      <div class="button-group">
        <leu-button
          icon="angleLeft"
          variant="secondary"
          @click=${(_) => {
            this.numberUpdate(this.boundPage - 1)
          }}
          ?disabled=${this.firstPage}
        ></leu-button>
        <leu-button
          icon="angleRight"
          variant="secondary"
          @click=${(_) => {
            this.numberUpdate(this.boundPage + 1)
          }}
          ?disabled=${this.lastPage}
        ></leu-button>
      </div>
    `
  }
}
