import { html } from "lit"
import { property } from "lit/decorators.js"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./placeholder.css"

/**
 * @tagname leu-placeholder
 */
export class LeuPlaceholder extends LeuElement {
  static styles = [LeuElement.styles, styles]

  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  @property({ type: String })
  value: string = ""

  render() {
    return html`
      <div class="placeholder">
        <h1 class="placeholder__title"><slot name="title"></slot></h1>
        <slot name="text" class="placeholder__text"></slot>
        <slot name="cta"></slot>
      </div>
    `
  }
}
