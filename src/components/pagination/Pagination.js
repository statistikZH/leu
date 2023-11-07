import { html, LitElement } from "lit"
import { defineElement } from "../../lib/defineElement.js"
import { defineButtonElements } from "../button/Button.js"

import styles from "./pagination.css"

const MIN_PAGE = 1

/**
 * @tagname leu-pagination
 */
export class LeuPagination extends LitElement {
  static styles = styles

  static events = {
    range: {},
  }

  static properties = {
    page: { type: Number, reflect: true },
    itemsOnAPage: { type: Number },
    dataLength: { type: Number },

    _minPage: { type: Number, state: true },
  }

  constructor() {
    super()
    /** @type {number} */
    this.page = 1
    /** @type {number} */
    this.dataLength = 0
    /** @type {number} */
    this.itemsOnAPage = 30
  }

  get maxPage() {
    return Math.ceil(this.dataLength / this.itemsOnAPage)
  }

  get firstPage() {
    return this.page === MIN_PAGE
  }

  get lastPage() {
    return this.page === this.maxPage
  }

  holdInRange(value) {
    return Math.min(Math.max(value, MIN_PAGE), this.maxPage)
  }

  numberUpdate(number) {
    this.page = this.holdInRange(number)

    const min = (this.page - 1) * this.itemsOnAPage
    const max = Math.min(min + this.itemsOnAPage, this.dataLength)
    this.dispatchEvent(
      new CustomEvent("range-updated", {
        detail: {
          min,
          max,
        },
        bubbles: false,
      })
    )
  }

  change(event) {
    // target.value = this.page // eslint-disable-line
    this.numberUpdate(parseInt(event.target.value, 10) || 0)
  }

  input(event) {
    if (event.target.value !== "") {
      event.preventDefault()
      this.change(event)
    }
  }

  keydown(event) {
    const specialKeys = [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "Backspace",
      "Enter",
      "Tab",
    ]
    const numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    if (!numberKeys.includes(event.key) && !specialKeys.includes(event.key)) {
      event.preventDefault()
    } else {
      if (event.key === "ArrowUp") {
        event.preventDefault()
        this.numberUpdate(this.page + 1)
      }
      if (event.key === "ArrowDown") {
        event.preventDefault()
        this.numberUpdate(this.page - 1)
      }
    }
  }

  firstUpdated() {
    this.numberUpdate(this.page)
  }

  requestUpdate(name, oldValue, newValue) {
    if (name === "itemsOnAPage") {
      this.numberUpdate(this.page)
    }
    return super.requestUpdate(name, oldValue, newValue)
  }

  render() {
    return html`
      <input
        class="input"
        .value=${`this.page`}
        @input=${this.input}
        @change=${this.change}
        @keydown=${this.keydown}
        type="number"
      />
      <div class="label">von ${this.maxPage}</div>
      <leu-button
        icon="angleLeft"
        variant="secondary"
        @click=${(_) => {
          this.numberUpdate(this.page - 1)
        }}
        ?disabled=${this.firstPage}
      ></leu-button>
      <leu-button
        icon="angleRight"
        variant="secondary"
        @click=${(_) => {
          this.numberUpdate(this.page + 1)
        }}
        ?disabled=${this.lastPage}
        style="margin-left:4px;"
      ></leu-button>
    `
  }
}

export function definePaginationElements() {
  defineButtonElements()
  defineElement("pagination", LeuPagination)
}
