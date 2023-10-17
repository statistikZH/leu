import { html, css, LitElement } from "lit"
import { defineElement } from "../../lib/defineElement.js"
import { defineButtonElements } from "../button/Button.js"
import { defineInputElements } from "../input/Input.js"

/**
 * @tagname leu-pagination
 */
export class LeuPagination extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: end;
    }
  `

  static properties = {
    page: { type: Number },
  }

  constructor() {
    super()
    /** @type {number} */
    this.page = 1
  }

  get firstPage() {
    return this.page === 1
  }

  get lastPage() {
    return this.page === 10
  }

  render() {
    return html`
      <leu-input .value="${this.page}" label="Test"> </leu-input>
      <leu-button
        icon="angleLeft"
        variant="secondary"
        @click=${() => {
          this.page -= 1
        }}
        ?disabled=${this.firstPage}
      >
      </leu-button>
      <leu-button
        icon="angleRight"
        variant="secondary"
        @click=${() => {
          this.page += 1
        }}
        ?disabled=${this.lastPage}
      >
      </leu-button>
    `
  }
}

export function definePaginationElements() {
  defineButtonElements()
  defineInputElements()
  defineElement("pagination", LeuPagination)
}
