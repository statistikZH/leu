import { html, LitElement } from "lit"
import { unsafeHTML } from "lit/directives/unsafe-html.js"

import { defineElement } from "../../lib/defineElement.js"
import styles from "./accordion.css"

/**
 * @tagname leu-accordion
 */
export class LeuAccordion extends LitElement {
  static styles = styles

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  }

  static properties = {
    headingLevel: { type: Number, attribute: "heading-level" },
    open: { type: Boolean, reflect: true },
  }

  getHeadingTag() {
    let level = 2
    if (this.headingLevel > 0 && this.headingLevel < 7) {
      level = this.headingLevel
    }

    return { open: `<h${level} class="heading">`, close: `</h${level}>` }
  }

  handleToggleClick() {
    this.open = !this.open
  }

  render() {
    const hTag = this.getHeadingTag()

    return html` ${unsafeHTML(hTag.open)}<button
        id="toggle"
        type="button"
        class="button"
        aria-controls="content"
        aria-expanded="${this.open}"
        @click=${this.handleToggleClick}
      >
        <slot name="title-number"></slot>
        <slot name="title"></slot>
        <div class="plus"></div></button
      >${unsafeHTML(hTag.close)}
      <div
        id="content"
        class="content"
        aria-labelledby="toggle"
        role="region"
        ?hidden=${!this.open}
      >
        <slot name="content"></slot>
      </div>`
  }
}

export function defineAccordionElements() {
  defineElement("accordion", LeuAccordion)
}
