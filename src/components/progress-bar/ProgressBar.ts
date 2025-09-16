import { html, nothing } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"
import { property } from "lit/decorators.js"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./progress-bar.css"

/**
 * An indicator showing the completion progress of a task
 *
 * @tagname leu-progress-bar
 */
export class LeuProgressBar extends LeuElement {
  static styles = [LeuElement.styles, styles]

  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  /** Progress as a percentage from 0 to 100 */
  @property({ type: Number, reflect: true })
  value: number = 0

  /** Label that is displayed below the progress bar */
  @property({ type: String, reflect: true })
  label: string = ""

  /** Whether the progress bar is in indeterminate state. */
  @property({ type: Boolean, reflect: true })
  indeterminate: boolean = false

  render() {
    return html`
      <progress
        class="progress"
        max=${ifDefined(!this.indeterminate ? 100 : undefined)}
        value=${ifDefined(!this.indeterminate ? this.value : undefined)}
        id="progress"
      ></progress>
      <div class="info">
        ${this.label
          ? html`<label class="label" for="progress">${this.label}</label>`
          : html`<div class="label label--placeholder"></div>`}
        ${this.indeterminate
          ? nothing
          : html`<span class="value">${Math.round(this.value)}&#8239;%</span>`}
      </div>
    `
  }
}
