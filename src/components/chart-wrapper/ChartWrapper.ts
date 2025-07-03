import { html, nothing } from "lit"
import { property } from "lit/decorators.js"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./chart-wrapper.css"
import { HasSlotController } from "../../lib/hasSlotController.js"
import { LeuSpinner } from "../spinner/Spinner.js"

/**
 * A wrapper element for charts.
 * @tagname leu-chart-wrapper
 * @slot title - The title of the chart. Use a heading tag (h2-4) depending on your context.
 * @slot description - A description of the chart. Content is wrapped in a `<p>` tag by the component.
 * @slot chart - The actual chart
 * @slot caption - A caption for the chart, e.g. a source or explanation of the data.
 * @slot download - A download button or dropdown to export the chart in different formats.
 */
export class LeuChartWrapper extends LeuElement {
  static styles = [LeuElement.styles, styles]

  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  static dependencies = {
    "leu-spinner": LeuSpinner,
  }

  /**
   * Whether the chart is currently loading or not.
   * When set to `true`, a spinner will be shown in the chart container.
   */
  @property({ type: Boolean, reflect: true })
  pending: boolean = false

  hasSlotController = new HasSlotController(this, [
    "description",
    "caption",
    "download",
  ])

  render() {
    const hasDescription = this.hasSlotController.test("description")
    const hasCaption = this.hasSlotController.test("caption")
    const hasDownload = this.hasSlotController.test("download")

    return html`
      <figure class="chart-wrapper">
        <slot name="title" class="chart-wrapper__title"></slot>
        ${hasDescription
          ? html`<slot
              name="description"
              class="chart-wrapper__description"
            ></slot>`
          : nothing}
        <div class="chart-wrapper__container">
          <slot name="chart" class="chart-wrapper__chart"></slot>
          ${this.pending
            ? html`<div class="chart-wrapper__spinner-container">
                <leu-spinner class="chart-wrapper__spinner"></leu-spinner>
              </div>`
            : nothing}
        </div>
        ${hasCaption
          ? html`<figcaption>
              <slot name="caption" class="chart-wrapper__caption"></slot>
            </figcaption>`
          : nothing}
        <hr class="chart-wrapper__ruler" />
        ${hasDownload
          ? html`<slot name="download" class="chart-wrapper__download"></slot>`
          : nothing}
      </figure>
    `
  }
}
