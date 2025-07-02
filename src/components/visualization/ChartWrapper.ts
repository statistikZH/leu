import { html, nothing } from "lit"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./chart-wrapper.css"
import { HasSlotController } from "../../lib/hasSlotController.js"

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
      <figure>
        <slot name="title" class="title"></slot>
        ${hasDescription
          ? html`<slot name="description" class="description"></slot>`
          : nothing}
        <slot name="chart" class="chart"></slot>
        ${hasCaption
          ? html`<figcaption>
              <slot name="caption" class="caption"></slot>
            </figcaption>`
          : nothing}
        <hr class="ruler" />
        ${hasDownload
          ? html`<slot name="download" class="download"></slot>`
          : nothing}
      </figure>
    `
  }
}
