import { nothing } from "lit"
import { html, unsafeStatic } from "lit/static-html.js"
import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./accordion.css"

/**
 * @tagname leu-accordion
 * @slot content - The content of the accordion. No styles will be applied to the content.
 * @prop {Number} headingLevel - The heading level of the accordion title. Must be between 1 and 6.
 * @prop {Boolean} open - The expanded state of the accordion.
 * @prop {String} label - The label (title) of the accordion.
 * @prop {String} labelPrefix - The prefix of the accordion label. e.g. "01"
 * @attr {Number} heading-level - The heading level of the accordion title. Must be between 1 and 6.
 * @attr {String} label-prefix - The prefix of the accordion label. e.g. "01"
 */
export class LeuAccordion extends LeuElement {
  static styles = styles

  /** @internal */
  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  static properties = {
    headingLevel: { type: Number, attribute: "heading-level", reflect: true },
    open: { type: Boolean, reflect: true },
    label: { type: String, reflect: true },
    labelPrefix: { type: String, attribute: "label-prefix", reflect: true },
  }

  constructor() {
    super()
    this.headingLevel = 2
    this.open = false
    this.label = ""
  }

  /**
   * Determines the heading tag of the accordion toggle.
   * The headingLevel shouldn't be used directly to render the heading tag
   * in order to avoid XSS issues.
   * @returns {String} The heading tag of the accordion toggle.
   * @internal
   */
  _getHeadingTag() {
    let level = 2
    if (this.headingLevel > 0 && this.headingLevel < 7) {
      level = this.headingLevel
    }

    return `h${level}`
  }

  /**
   * Toggles the accordion open state.
   * @internal
   */
  _handleToggleClick() {
    this.open = !this.open
  }

  render() {
    const hTag = this._getHeadingTag()

    /* The eslint rules don't recognize html import from lit/static-html.js */
    /* eslint-disable lit/binding-positions, lit/no-invalid-html */
    return html`<${unsafeStatic(hTag)} class="heading"><button
        id="toggle"
        type="button"
        class="button"
        aria-controls="content"
        aria-expanded="${this.open}"
        @click=${this._handleToggleClick}
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
