import { html } from "lit"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./visualization.css"

/**
 * A wrapper for visualizations, such as charts or maps.
 * @tagname leu-visualization
 * @slot title - The title of the visualization. Use a heading tag (h1-6) depending on your context.
 * @slot description - A description of the visualization. Content is wrapped in a `<p>` tag by the component.
 * @slot visualization - The actual visualization
 * @slot legend - A legend for the visualization, e.g. a source or explanation of the data.
 * @slot download - A download button or dropdown to export the visualization in different formats.
 */
export class LeuVisualization extends LeuElement {
  static styles = [LeuElement.styles, styles]

  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  render() {
    return html`
      <slot name="title" class="title"></slot>
      <slot name="description" class="description"></slot>
      <slot name="visualization" class="visualization"></slot>
      <slot name="legend" class="legend"></slot>
      <hr class="ruler" />
      <slot name="download" class="download"></slot>
    `
  }
}
