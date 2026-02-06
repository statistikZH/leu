import { nothing } from "lit"
import { html, unsafeStatic } from "lit/static-html.js"
import { property } from "lit/decorators.js"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./accordion.css?inline"

/**
 * @tagname leu-accordion
 * @slot content - The content of the accordion. No styles will be applied to the content.
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

  /**
   * The heading level of the accordion title. Must be between 1 and 6.
   */
  @property({ type: Number, attribute: "heading-level", reflect: true })
  headingLevel = 2

  /**
   * The expanded state of the accordion.
   */
  @property({ type: Boolean, reflect: true })
  open = false

  /**
   * The label (title) of the accordion
   */
  @property({ type: String, reflect: true })
  label = ""

  /**
   * The prefix of the accordion label. e.g. "01"
   */
  @property({ type: String, attribute: "label-prefix", reflect: true })
  labelPrefix = ""

  /**
   * Determines the heading tag of the accordion toggle.
   * The headingLevel shouldn't be used directly to render the heading tag
   * in order to avoid XSS issues.
   * @internal
   */
  private _getHeadingTag(): string {
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
  private _handleToggleClick() {
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
