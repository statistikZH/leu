import { nothing } from "lit"
import { html, unsafeStatic } from "lit/static-html.js"
import { LeuElement } from "../../lib/LeuElement.js"

// @ts-ignore
import styles from "./accordion.css"

/**
 * @tagname leu-accordion
 * @slot content - The content of the accordion. No styles will be applied to the content.
 * @prop {number} headingLevel - The heading level of the accordion title. Must be between 1 and 6.
 * @prop {boolean} open - The expanded state of the accordion.
 * @prop {string} label - The label (title) of the accordion.
 * @prop {string} labelPrefix - The prefix of the accordion label. e.g. "01"
 * @attr {number} heading-level - The heading level of the accordion title. Must be between 1 and 6.
 * @attr {string} label-prefix - The prefix of the accordion label. e.g. "01"
 */
export class LeuAccordion extends LeuElement {
  static styles = [LeuElement.styles, styles]

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
    this.labelPrefix = ""
  }

  /**
   * Determines the heading tag of the accordion toggle.
   * The headingLevel shouldn't be used directly to render the heading tag
   * in order to avoid XSS issues.
   * @returns {string} The heading tag of the accordion toggle.
   * @internal
   */
  _getHeadingTag() {
    let level = 2
    if (this.headingLevel > 0 && this.headingLevel < 7) {
      level = Math.floor(this.headingLevel)
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
        aria-controls="contentwrapper"
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
        id="contentwrapper"
        class="contentwrapper"
        ?hidden=${!this.open}
        aria-labelledby="toggle"
        role="region"
      >
        <div
          class="content"
        >
          <slot name="content"></slot>
        </div>
      </div>
      <hr class="divider" />`
  }
  /* eslint-enable lit/binding-positions, lit/no-invalid-html */
}
