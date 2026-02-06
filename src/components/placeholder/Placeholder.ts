import { html } from "lit"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./placeholder.css?inline"

/**
 * @summary * A placeholder to display when no content is available.
 * @tagname leu-placeholder
 * @slot title - The placeholders title. Use a heading tag (h1-6) depeneding on your context.
 * @slot description - A description of the placeholder. Content is wrapped in a `<p>` tag by the component.
 * @slot cta - A call to action button like "Reload" or "Create". Add a single `<leu-button>`.
 *
 * @todo Add pending state with a skeleton.
 */
export class LeuPlaceholder extends LeuElement {
  static styles = [LeuElement.styles, styles]

  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  render() {
    return html`
      <div class="placeholder">
        <slot class="placeholder__title" name="title"></slot>
        <p><slot class="placeholder__description" name="description"></slot></p>
        <slot name="cta"></slot>
      </div>
    `
  }
}
