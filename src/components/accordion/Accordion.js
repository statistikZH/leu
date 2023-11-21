import { LitElement, nothing } from "lit"
import { html, unsafeStatic } from "lit/static-html.js"

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
    label: { type: String },
    labelPrefix: { type: String, attribute: "label-prefix" },
  }

  constructor() {
    super()
    this.headingLevel = 2
    this.open = false
    this.label = ""
    this.labelPrefix = ""
  }

  getHeadingTag() {
    let level = 2
    if (this.headingLevel > 0 && this.headingLevel < 7) {
      level = this.headingLevel
    }

    return `h${level}`
  }

  handleToggleClick() {
    this.open = !this.open
  }

  render() {
    const hTag = this.getHeadingTag()

    /* The eslint rules don't recognize html import from lit/static-html.js */
    /* eslint-disable lit/binding-positions, lit/no-invalid-html */
    return html`<${unsafeStatic(hTag)}><button
        id="toggle"
        type="button"
        class="button"
        aria-controls="content"
        aria-expanded="${this.open}"
        @click=${this.handleToggleClick}
      >
        ${
          this.labelPrefix
            ? html`<span class="label-prefix">${this.labelPrefix}</span>`
            : nothing
        }
        <span class="label">${this.label}</span>
        <div class="plus"></div>
      </button></${unsafeStatic(hTag)}>
      <div
        id="content"
        class="content"
        aria-labelledby="toggle"
        role="region"
        ?hidden=${!this.open}
      >
        <slot name="content"></slot>
      </div>
      <hr class="divider" />`
  }
  /* eslint-enable lit/binding-positions, lit/no-invalid-html */
}

export function defineAccordionElements() {
  defineElement("accordion", LeuAccordion)
}
